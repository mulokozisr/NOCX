import { and, count, desc, eq, gte } from "drizzle-orm";
import { getDb } from "../../../../db";
import { auditEvents, availabilitySamples, collectors, customers, devices, incidents, ingestionReceipts, metricRollups, metricSamples, operators, retentionPolicies, roles } from "../../../../db/schema";
import { authorizeRequest } from "../../../../lib/access-control";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const decision=await authorizeRequest(request,"platform.read");
  if(!decision.ok)return decision.response;
  const actor=decision.identity.email;
  try{
    const db=getDb();
    const results=await Promise.all([roles,operators,devices,customers,incidents,auditEvents,metricSamples,metricRollups,ingestionReceipts,retentionPolicies].map(table=>db.select({value:count()}).from(table)));
    const deviceId="device-cudy-lt400-pilot",collectorId="collector-doxa-vps",dayAgo=new Date(Date.now()-24*60*60*1000).toISOString();
    const [deviceRows,collectorRows,samples,cudyIncidents]=await Promise.all([
      db.select().from(devices).where(eq(devices.id,deviceId)).limit(1),
      db.select().from(collectors).where(eq(collectors.id,collectorId)).limit(1),
      db.select({observedAt:availabilitySamples.observedAt,online:availabilitySamples.online,latencyMs:availabilitySamples.latencyMs,packetLossPct:availabilitySamples.packetLossPct,handshakeAgeSeconds:availabilitySamples.handshakeAgeSeconds}).from(availabilitySamples).where(and(eq(availabilitySamples.deviceId,deviceId),gte(availabilitySamples.observedAt,dayAgo))).orderBy(desc(availabilitySamples.observedAt)).limit(2880),
      db.select({id:incidents.id,title:incidents.title,severity:incidents.severity,status:incidents.status,affectedCustomers:incidents.affectedCustomers,openedAt:incidents.openedAt,resolvedAt:incidents.resolvedAt,updatedAt:incidents.updatedAt}).from(incidents).where(eq(incidents.title,"Cudy LT400 connectivity outage")).orderBy(desc(incidents.openedAt)).limit(20)
    ]);
    const latest=samples[0]??null,onlineSamples=samples.filter(sample=>sample.online),uptimePct=samples.length?Math.round((onlineSamples.length/samples.length)*10000)/100:null;
    const outages:{startedAt:string;restoredAt:string|null;durationSeconds:number|null}[]=[];
    let offlineEnd:string|null=null;
    for(const sample of samples){if(sample.online){if(offlineEnd===null)offlineEnd=sample.observedAt;continue}const older=samples[samples.indexOf(sample)+1];if(!older||older.online){outages.push({startedAt:sample.observedAt,restoredAt:offlineEnd,durationSeconds:offlineEnd?Math.max(0,Math.round((new Date(offlineEnd).getTime()-new Date(sample.observedAt).getTime())/1000)):null});offlineEnd=null}}
    const stale=latest?Date.now()-new Date(latest.observedAt).getTime()>120000:true;
    return Response.json({mode:"persistent",database:"connected",authenticatedAs:actor,records:{roles:results[0][0].value,operators:results[1][0].value,devices:results[2][0].value,customers:results[3][0].value,incidents:results[4][0].value,auditEvents:results[5][0].value,metricSamples:results[6][0].value,metricRollups:results[7][0].value,ingestionReceipts:results[8][0].value,retentionPolicies:results[9][0].value},controls:{networkWrites:false,credentialsStored:false,auditRequired:true,ownerOnly:true},storage:{rawTelemetryDays:30,hourlyRollupDays:400,dailyRollupDays:1825,deduplication:"collector + device + metric + timestamp",unknownMetrics:"quarantined",automaticDeletion:false},cudy:{device:deviceRows[0]??null,collector:collectorRows[0]??null,latest,stale,uptimePct,sampleCount:samples.length,outages:outages.slice(0,8),incidents:cudyIncidents,latencyHistory:samples.slice(0,40).reverse().map(sample=>({observedAt:sample.observedAt,latencyMs:sample.latencyMs,online:sample.online}))},checkedAt:new Date().toISOString()});
  }catch(error){return Response.json({error:error instanceof Error?error.message:"Database health check failed"},{status:503});}
}
