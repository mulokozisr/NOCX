import { desc, eq, isNull } from "drizzle-orm";
import { getDb } from "../../../db";
import { auditEvents, incidentAcknowledgements, incidents, notifications } from "../../../db/schema";
import { authorizeRequest } from "../../../lib/access-control";

export const dynamic = "force-dynamic";

function routeFor(severity:string,kind:string,createdAt:string){
  if(kind==="resolved")return {target:"Incident owner",label:"Recovery notice",ackRequired:false,dueAt:null};
  const critical=severity==="critical";
  const minutes=critical?5:15;
  return {
    target:critical?"Primary on-call":"Network operations",
    label:critical?"Critical · 5-minute acknowledgement":"Warning · 15-minute acknowledgement",
    ackRequired:true,
    dueAt:new Date(Date.parse(createdAt)+minutes*60_000).toISOString(),
  };
}

export async function GET(request:Request){
  const decision=await authorizeRequest(request,"platform.read");
  if(!decision.ok)return decision.response;
  const now=new Date().toISOString();
  const rows=await getDb().select({
    id:notifications.id,incidentId:notifications.incidentId,kind:notifications.kind,title:notifications.title,message:notifications.message,severity:notifications.severity,readAt:notifications.readAt,createdAt:notifications.createdAt,
    acknowledgedAt:incidentAcknowledgements.acknowledgedAt,acknowledgedBy:incidentAcknowledgements.acknowledgedBy,
  }).from(notifications).leftJoin(incidentAcknowledgements,eq(notifications.incidentId,incidentAcknowledgements.incidentId)).orderBy(desc(notifications.createdAt)).limit(30);
  const items=rows.map(item=>{
    const routing=routeFor(item.severity,item.kind,item.createdAt);
    return {...item,routing,escalationOverdue:Boolean(routing.dueAt&&!item.acknowledgedAt&&Date.parse(routing.dueAt)<Date.parse(now))};
  });
  return Response.json({items,unread:items.filter(item=>!item.readAt).length,unacknowledged:items.filter(item=>item.routing.ackRequired&&!item.acknowledgedAt).length,checkedAt:now});
}

export async function PATCH(request:Request){
  const decision=await authorizeRequest(request,"incidents.manage");
  if(!decision.ok)return decision.response;
  const now=new Date().toISOString();
  await getDb().update(notifications).set({readAt:now}).where(isNull(notifications.readAt));
  return Response.json({acknowledged:true,readAt:now});
}

export async function POST(request:Request){
  const decision=await authorizeRequest(request,"incidents.manage");
  if(!decision.ok)return decision.response;
  let payload:{notificationId?:unknown};
  try{payload=await request.json() as {notificationId?:unknown}}catch{return Response.json({error:"Invalid JSON payload"},{status:400})}
  if(typeof payload.notificationId!=="string"||payload.notificationId.length<3||payload.notificationId.length>180)return Response.json({error:"A valid notificationId is required"},{status:422});
  const db=getDb();
  const row=(await db.select({notificationId:notifications.id,incidentId:notifications.incidentId,kind:notifications.kind,incidentStatus:incidents.status}).from(notifications).innerJoin(incidents,eq(notifications.incidentId,incidents.id)).where(eq(notifications.id,payload.notificationId)).limit(1))[0];
  if(!row)return Response.json({error:"Notification not found"},{status:404});
  if(row.kind!=="opened"||row.incidentStatus==="resolved")return Response.json({error:"Only active incident notifications can be acknowledged"},{status:409});
  const now=new Date().toISOString();
  const id=`ACK-${row.incidentId}`;
  await db.insert(incidentAcknowledgements).values({id,incidentId:row.incidentId,notificationId:row.notificationId,acknowledgedBy:decision.identity.email,acknowledgedAt:now}).onConflictDoNothing();
  await db.update(incidents).set({status:"acknowledged",updatedAt:now}).where(eq(incidents.id,row.incidentId));
  await db.update(notifications).set({readAt:now}).where(eq(notifications.id,row.notificationId));
  await db.insert(auditEvents).values({id:`incident-ack-${crypto.randomUUID()}`,actorEmail:decision.identity.email,action:"incident:acknowledge",resourceType:"incident",resourceId:row.incidentId,outcome:"allowed",requestId:request.headers.get("x-request-id"),metadata:{notificationId:row.notificationId,source:"notification-center"}});
  const acknowledgement=(await db.select().from(incidentAcknowledgements).where(eq(incidentAcknowledgements.incidentId,row.incidentId)).limit(1))[0];
  return Response.json({acknowledged:true,acknowledgement});
}
