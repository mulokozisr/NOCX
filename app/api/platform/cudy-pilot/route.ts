import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { availabilitySamples, collectors, devices, incidents } from "../../../../db/schema";
import { authorizeRequest } from "../../../../lib/access-control";

export const dynamic = "force-dynamic";
const DEVICE_ID = "device-cudy-lt400-pilot";
const COLLECTOR_ID = "collector-doxa-vps";
const INCIDENT_TITLE = "Cudy LT400 connectivity outage";

const average = (values: number[]) => values.length ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1)) : null;
function percentile(values: number[], fraction: number) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * fraction))];
}

export async function GET(request: Request) {
  const decision = await authorizeRequest(request, "platform.read");
  if (!decision.ok) return decision.response;
  const db = getDb();
  const [samples, collector, device, outageRows] = await Promise.all([
    db.select().from(availabilitySamples).where(eq(availabilitySamples.deviceId, DEVICE_ID)).orderBy(desc(availabilitySamples.observedAt)).limit(5000),
    db.select().from(collectors).where(eq(collectors.id, COLLECTOR_ID)).limit(1),
    db.select().from(devices).where(eq(devices.id, DEVICE_ID)).limit(1),
    db.select().from(incidents).where(eq(incidents.title, INCIDENT_TITLE)).orderBy(desc(incidents.openedAt)).limit(25),
  ]);
  const ordered = [...samples].sort((a, b) => Date.parse(a.observedAt) - Date.parse(b.observedAt));
  const onlineCount = ordered.filter((sample) => sample.online).length;
  const latency = ordered.flatMap((sample) => sample.latencyMs === null ? [] : [sample.latencyMs]);
  const loss = ordered.map((sample) => sample.packetLossPct);
  const gaps = ordered.slice(1).flatMap((sample, index) => {
    const seconds = Math.round((Date.parse(sample.observedAt) - Date.parse(ordered[index].observedAt)) / 1000);
    return seconds > 10 ? [{ from: ordered[index].observedAt, to: sample.observedAt, seconds }] : [];
  });
  const latest = ordered.at(-1) ?? null;
  const newestAgeSeconds = latest ? Math.max(0, Math.round((Date.now() - Date.parse(latest.observedAt)) / 1000)) : null;
  const uptimePct = ordered.length ? Number(((onlineCount / ordered.length) * 100).toFixed(3)) : null;
  const avgLoss = average(loss);
  const gates = [
    { key:"freshness", label:"Latest sample is fresh", passed:newestAgeSeconds !== null && newestAgeSeconds <= 15, evidence:newestAgeSeconds === null ? "No sample received" : `${newestAgeSeconds}s old` },
    { key:"continuity", label:"No unexplained sampling gaps", passed:ordered.length >= 30 && gaps.length === 0, evidence:`${gaps.length} gap${gaps.length === 1 ? "" : "s"} over 10s` },
    { key:"availability", label:"Availability is at least 99%", passed:uptimePct !== null && uptimePct >= 99, evidence:uptimePct === null ? "No evidence" : `${uptimePct}%` },
    { key:"loss", label:"Average packet loss is below 5%", passed:avgLoss !== null && avgLoss < 5, evidence:avgLoss === null ? "No evidence" : `${avgLoss}% average` },
    { key:"incidents", label:"No unresolved Cudy outage", passed:!outageRows.some((item) => item.status !== "resolved"), evidence:`${outageRows.filter((item) => item.status !== "resolved").length} unresolved` },
  ];
  return Response.json({
    device:device[0] ?? null, collector:collector[0] ?? null,
    summary:{sampleCount:ordered.length,windowStart:ordered[0]?.observedAt ?? null,windowEnd:latest?.observedAt ?? null,newestAgeSeconds,uptimePct,onlineCount,offlineCount:ordered.length-onlineCount,averageLatencyMs:average(latency),p95LatencyMs:percentile(latency,.95),averagePacketLossPct:avgLoss,p95PacketLossPct:percentile(loss,.95),gapCount:gaps.length,longestGapSeconds:gaps.length?Math.max(...gaps.map((gap)=>gap.seconds)):0},
    gates,decision:gates.every((gate)=>gate.passed)?"passing":"hold",recentSamples:samples.slice(0,20),gaps:gaps.slice(-20).reverse(),incidents:outageRows,
    controls:{liveCudyEvidence:true,networkWrites:false,mikrotikProbes:false,ubiquitiProbes:false},
  });
}
