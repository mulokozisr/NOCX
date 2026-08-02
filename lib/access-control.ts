import { and, eq } from "drizzle-orm";
import { getDb } from "../db";
import { auditEvents, operators, roles } from "../db/schema";

export const permissions = ["platform.read","platform.admin","users.manage","roles.manage","audit.read","devices.read","incidents.manage","changes.approve","telemetry.read"] as const;
export type Permission = typeof permissions[number];
export type AccessIdentity = { email:string; displayName:string; role:string; permissions:Permission[] };

const EMAIL_HEADER="oai-authenticated-user-email";
const NAME_HEADER="oai-authenticated-user-full-name";

function decodedName(request:Request,email:string){const value=request.headers.get(NAME_HEADER);if(!value)return email;try{return decodeURIComponent(value)}catch{return email}}

async function record(request:Request,email:string,permission:Permission,outcome:"allowed"|"denied",reason:string){
  try{await getDb().insert(auditEvents).values({id:`access-${crypto.randomUUID()}`,actorEmail:email,action:`authorize:${permission}`,resourceType:"access_policy",outcome,requestId:request.headers.get("x-request-id"),metadata:{reason,path:new URL(request.url).pathname}})}catch{/* Authorization must fail closed even if audit storage is unavailable. */}
}

export async function authorizeRequest(request:Request,permission:Permission):Promise<{ok:true;identity:AccessIdentity}|{ok:false;response:Response}>{
  const email=request.headers.get(EMAIL_HEADER)?.trim().toLowerCase();
  if(!email){await record(request,"anonymous",permission,"denied","missing_authenticated_identity");return {ok:false,response:Response.json({error:"Authentication required"},{status:401})}}
  const db=getDb();
  const row=(await db.select({email:operators.email,displayName:operators.displayName,status:operators.status,role:roles.name,grants:roles.permissions}).from(operators).leftJoin(roles,eq(operators.roleId,roles.id)).where(and(eq(operators.email,email),eq(operators.status,"active"))).limit(1))[0];
  if(!row||!row.role){await record(request,email,permission,"denied","operator_not_active_or_registered");return {ok:false,response:Response.json({error:"Access denied"},{status:403})}}
  const grants=Array.isArray(row.grants)?row.grants.filter((item):item is Permission=>typeof item==="string"&&permissions.includes(item as Permission)):[];
  if(!grants.includes(permission)){await record(request,email,permission,"denied","permission_missing");return {ok:false,response:Response.json({error:"Access denied",required:permission},{status:403})}}
  await record(request,email,permission,"allowed","role_permission_match");
  return {ok:true,identity:{email,displayName:decodedName(request,email)||row.displayName,role:row.role,permissions:grants}};
}
