import { and, eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import {
  availabilitySamples,
  collectors,
  devices,
  ingestionReceipts,
  metricSamples,
} from "../../../../../db/schema";
import {
  recordHeartbeat,
  recordObservation,
} from "../../../../../db/observations";
import { collectorAuthenticated } from "../../../../../lib/collector-auth";
export const dynamic = "force-dynamic";
const MAX_BODY_BYTES = 65536,
  MAX_SAMPLES = 100;
const KEYS = new Set([
  "availability.online",
  "network.latency.ms",
  "network.packet_loss.pct",
  "device.cpu.utilization.pct",
  "device.memory.utilization.pct",
  "interface.rx.bps",
  "interface.tx.bps",
  "interface.utilization.pct",
  "wireless.signal.dbm",
  "wireless.noise.dbm",
  "wireless.ccq.pct",
  "wireless.capacity.bps",
  "device.temperature.celsius",
]);
type Sample = {
  deviceId?: unknown;
  metricKey?: unknown;
  observedAt?: unknown;
  value?: unknown;
  unit?: unknown;
  quality?: unknown;
  sourceField?: unknown;
  profileVersion?: unknown;
};
function text(value: unknown, max: number) {
  return typeof value === "string" && value.length > 0 && value.length <= max
    ? value
    : null;
}
function validate(sample: Sample) {
  if (!sample || typeof sample !== "object") return null;
  const deviceId = text(sample.deviceId, 80),
    metricKey = text(sample.metricKey, 100),
    unit = text(sample.unit, 24);
  const at =
      typeof sample.observedAt === "string"
        ? new Date(sample.observedAt)
        : new Date(NaN),
    age = Date.now() - at.getTime();
  if (
    !deviceId ||
    !metricKey ||
    !KEYS.has(metricKey) ||
    !unit ||
    !Number.isSafeInteger(sample.value) ||
    Math.abs(Number(sample.value)) > 9e12 ||
    !Number.isFinite(at.getTime()) ||
    age > 600000 ||
    age < -120000
  )
    return null;
  if (
    metricKey === "availability.online" &&
    sample.value !== 0 &&
    sample.value !== 1
  )
    return null;
  if (
    (metricKey.endsWith(".pct") &&
      (Number(sample.value) < 0 || Number(sample.value) > 100)) ||
    (metricKey === "network.latency.ms" && Number(sample.value) < 0)
  )
    return null;
  if (
    sample.quality !== undefined &&
    !["valid", "review", "unknown"].includes(String(sample.quality))
  )
    return null;
  return {
    deviceId,
    metricKey,
    unit,
    observedAt: at.toISOString(),
    value: Number(sample.value),
    quality:
      sample.quality === "review"
        ? "review"
        : sample.quality === "unknown"
          ? "unknown"
          : "valid",
    sourceField: text(sample.sourceField, 120),
    profileVersion: text(sample.profileVersion, 40),
  };
}
export async function POST(request: Request) {
  if (!collectorAuthenticated(request))
    return Response.json(
      { error: "Collector authentication failed" },
      { status: 401 },
    );
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES)
    return Response.json({ error: "Payload too large" }, { status: 413 });
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES)
    return Response.json({ error: "Payload too large" }, { status: 413 });
  let payload: {
    collectorId?: unknown;
    schemaVersion?: unknown;
    samples?: unknown;
  };
  try {
    payload = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
  const collectorId = text(payload?.collectorId, 80),
    schemaVersion = text(payload?.schemaVersion, 20);
  if (
    !collectorId ||
    schemaVersion !== "1.0" ||
    !Array.isArray(payload.samples) ||
    payload.samples.length < 1 ||
    payload.samples.length > MAX_SAMPLES
  )
    return Response.json({ error: "Batch validation failed" }, { status: 422 });
  const requestId =
      text(request.headers.get("x-request-id"), 100) ?? crypto.randomUUID(),
    db = getDb();
  if (
    !(
      await db
        .select()
        .from(collectors)
        .where(eq(collectors.id, collectorId))
        .limit(1)
    )[0]
  )
    return Response.json(
      { error: "Collector is not registered" },
      { status: 403 },
    );
  const receipt = (
    await db
      .select()
      .from(ingestionReceipts)
      .where(eq(ingestionReceipts.requestId, requestId))
      .limit(1)
  )[0];
  if (receipt) {
    if (receipt.collectorId !== collectorId)
      return Response.json(
        { error: "Request ID belongs to another collector" },
        { status: 409 },
      );
    await recordHeartbeat(db, collectorId);
    return Response.json(
      {
        accepted: receipt.rejected === 0,
        replayed: true,
        requestId,
        counts: {
          accepted: receipt.accepted,
          rejected: receipt.rejected,
          duplicate: receipt.duplicate,
        },
        outcome: receipt.outcome,
        networkWrites: false,
      },
      { status: 202 },
    );
  }
  let accepted = 0,
    rejected = 0,
    duplicate = 0;
  const errors: { index: number; reason: string }[] = [];
  for (const [index, input] of (payload.samples as Sample[]).entries()) {
    const sample = validate(input);
    const device = sample
      ? (
          await db
            .select()
            .from(devices)
            .where(eq(devices.id, sample.deviceId))
            .limit(1)
        )[0]
      : null;
    if (
      !sample ||
      !device ||
      device.collectorId !== collectorId ||
      !device.monitoringEnabled
    ) {
      rejected++;
      errors.push({
        index,
        reason: !sample
          ? "Invalid, unsupported or expired sample"
          : "Device not enabled for this collector",
      });
      continue;
    }
    const existing = (
      await db
        .select()
        .from(metricSamples)
        .where(
          and(
            eq(metricSamples.collectorId, collectorId),
            eq(metricSamples.deviceId, sample.deviceId),
            eq(metricSamples.metricKey, sample.metricKey),
            eq(metricSamples.observedAt, sample.observedAt),
          ),
        )
        .limit(1)
    )[0];
    if (existing) {
      duplicate++;
    }
    if (!existing)
      await db
        .insert(metricSamples)
        .values({
          id: `metric-${collectorId}-${sample.deviceId}-${sample.metricKey}-${Date.parse(sample.observedAt)}`,
          collectorId,
          ...sample,
        })
        .onConflictDoNothing();
    if (
      sample.metricKey === "availability.online" &&
      sample.quality === "valid"
    ) {
      await db
        .insert(availabilitySamples)
        .values({
          id: `sample-${collectorId}-${sample.deviceId}-${Date.parse(sample.observedAt)}`,
          collectorId,
          deviceId: sample.deviceId,
          observedAt: sample.observedAt,
          online: sample.value === 1,
          packetLossPct: sample.value === 1 ? 0 : 100,
        })
        .onConflictDoNothing();
      await recordObservation(
        db,
        sample.deviceId,
        sample.observedAt,
        sample.value === 1,
      );
    }
    if (!existing) accepted++;
  }
  await recordHeartbeat(db, collectorId);
  const outcome =
    rejected === payload.samples.length
      ? "rejected"
      : rejected
        ? "partial"
        : "accepted";
  await db
    .insert(ingestionReceipts)
    .values({
      id: `receipt-${requestId}`,
      collectorId,
      accepted,
      rejected,
      duplicate,
      requestId,
      schemaVersion,
      outcome,
    })
    .onConflictDoNothing();
  return Response.json(
    {
      accepted: rejected === 0,
      requestId,
      counts: { accepted, rejected, duplicate },
      errors,
      outcome,
      networkWrites: false,
    },
    { status: 202 },
  );
}
