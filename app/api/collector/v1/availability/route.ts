import { and, desc, eq, ne } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { availabilitySamples, collectors, devices, incidents, notifications } from "../../../../../db/schema";

export const dynamic = "force-dynamic";
const MAX_BODY_BYTES = 2048;
const DEVICE_ID = "device-cudy-lt400-pilot";
const COLLECTOR_ID = "collector-doxa-vps";
const FAILURE_THRESHOLD = 3;
const CUDY_INCIDENT_TITLE = "Cudy LT400 connectivity outage";

type AvailabilityPayload = {
  deviceId?: unknown;
  collectorId?: unknown;
  observedAt?: unknown;
  online?: unknown;
  latencyMs?: unknown;
  packetLossPct?: unknown;
  handshakeAgeSeconds?: unknown;
  collectorVersion?: unknown;
};

function unauthorized() {
  return Response.json({ error: "Collector authentication failed" }, { status: 401 });
}

function validToken(request: Request) {
  const expected = process.env.NOCX_COLLECTOR_TOKEN;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!expected || !supplied || expected.length !== supplied.length) return false;
  let different = 0;
  for (let index = 0; index < expected.length; index += 1) different |= expected.charCodeAt(index) ^ supplied.charCodeAt(index);
  return different === 0;
}

function integerBetween(value: unknown, minimum: number, maximum: number) {
  return Number.isInteger(value) && Number(value) >= minimum && Number(value) <= maximum;
}

export async function POST(request: Request) {
  if (!validToken(request)) return unauthorized();
  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) return Response.json({ error: "Payload too large" }, { status: 413 });

  let payload: AvailabilityPayload;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return Response.json({ error: "Payload too large" }, { status: 413 });
    payload = JSON.parse(raw) as AvailabilityPayload;
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const observedAt = typeof payload.observedAt === "string" ? new Date(payload.observedAt) : new Date(Number.NaN);
  const ageMs = Math.abs(Date.now() - observedAt.getTime());
  const latencyValid = payload.latencyMs === null || integerBetween(payload.latencyMs, 0, 120000);
  const handshakeValid = payload.handshakeAgeSeconds === null || integerBetween(payload.handshakeAgeSeconds, 0, 604800);
  if (payload.deviceId !== DEVICE_ID || payload.collectorId !== COLLECTOR_ID || typeof payload.online !== "boolean" || !Number.isFinite(observedAt.getTime()) || ageMs > 10 * 60 * 1000 || !latencyValid || !integerBetween(payload.packetLossPct, 0, 100) || !handshakeValid) {
    return Response.json({ error: "Payload validation failed" }, { status: 422 });
  }

  const db = getDb();
  const now = new Date().toISOString();
  const version = typeof payload.collectorVersion === "string" ? payload.collectorVersion.slice(0, 32) : "unknown";
  await db.insert(collectors).values({ id:COLLECTOR_ID,name:"DOXA VPS",region:"WireGuard hub",status:"online",lastSeenAt:now,version }).onConflictDoUpdate({ target:collectors.id,set:{status:"online",lastSeenAt:now,version,updatedAt:now} });
  await db.insert(devices).values({ id:DEVICE_ID,hostname:"cudy-lt400-pilot",vendor:"Cudy",model:"LT400 V2.0",managementIp:"10.66.66.3",site:"WireGuard pilot",status:payload.online?"online":"offline",source:"nocx-collector",lastSeenAt:payload.online?payload.observedAt as string:null }).onConflictDoUpdate({ target:devices.id,set:{status:payload.online?"online":"offline",lastSeenAt:payload.online?payload.observedAt as string:null,updatedAt:now} });
  const sampleId = `sample-${COLLECTOR_ID}-${DEVICE_ID}-${observedAt.getTime()}`;
  await db.insert(availabilitySamples).values({ id:sampleId,collectorId:COLLECTOR_ID,deviceId:DEVICE_ID,observedAt:observedAt.toISOString(),online:payload.online,latencyMs:payload.latencyMs as number|null,packetLossPct:payload.packetLossPct as number,handshakeAgeSeconds:payload.handshakeAgeSeconds as number|null }).onConflictDoNothing();

  const recent = await db.select({ online:availabilitySamples.online, observedAt:availabilitySamples.observedAt })
    .from(availabilitySamples)
    .where(eq(availabilitySamples.deviceId,DEVICE_ID))
    .orderBy(desc(availabilitySamples.observedAt))
    .limit(FAILURE_THRESHOLD);
  const active = await db.select({ id:incidents.id, openedAt:incidents.openedAt })
    .from(incidents)
    .where(and(eq(incidents.title,CUDY_INCIDENT_TITLE),ne(incidents.status,"resolved")))
    .orderBy(desc(incidents.openedAt))
    .limit(1);
  let incidentAction:"none"|"opened"|"resolved"="none";
  if (!payload.online && recent.length === FAILURE_THRESHOLD && recent.every(sample=>!sample.online) && !active[0]) {
    const openedAt=recent[recent.length-1].observedAt;
    const incidentId=`INC-CUDY-${observedAt.getTime()}`;
    await db.insert(incidents).values({
      id:incidentId,
      title:CUDY_INCIDENT_TITLE,
      severity:"critical",
      status:"open",
      affectedCustomers:0,
      openedAt,
      updatedAt:now,
    });
    await db.insert(notifications).values({id:`NTF-${incidentId}-OPENED`,incidentId,kind:"opened",title:"Cudy LT400 outage confirmed",message:"Three consecutive probes failed. A critical incident was opened automatically.",severity:"critical",createdAt:now}).onConflictDoNothing();
    incidentAction="opened";
  } else if (payload.online && active[0]) {
    await db.update(incidents).set({status:"resolved",resolvedAt:observedAt.toISOString(),updatedAt:now}).where(eq(incidents.id,active[0].id));
    await db.insert(notifications).values({id:`NTF-${active[0].id}-RESOLVED`,incidentId:active[0].id,kind:"resolved",title:"Cudy LT400 service restored",message:`Connectivity recovered and the incident was resolved automatically. Latest latency: ${payload.latencyMs ?? "unavailable"} ms.`,severity:"recovery",createdAt:now}).onConflictDoNothing();
    incidentAction="resolved";
  }

  const stored = await db.select({id:availabilitySamples.id}).from(availabilitySamples).where(and(eq(availabilitySamples.collectorId,COLLECTOR_ID),eq(availabilitySamples.id,sampleId))).limit(1);
  return Response.json({ accepted:true,sampleId:stored[0]?.id ?? sampleId,deviceId:DEVICE_ID,incidentAction,networkWrites:false }, { status: 202 });
}
