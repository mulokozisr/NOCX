export type DeviceHealth = {
  status: "online" | "offline" | "unknown";
  reason: string;
  stale: boolean;
};
export function freshnessSeconds(interval = 60) {
  return Math.max(120, interval * 3);
}
export function isFresh(
  at: string | null | undefined,
  now = Date.now(),
  interval = 60,
) {
  if (!at) return false;
  const age = now - Date.parse(at);
  return (
    Number.isFinite(age) &&
    age >= -120000 &&
    age <= freshnessSeconds(interval) * 1000
  );
}
export function deviceHealth(
  input: {
    monitoringEnabled: boolean;
    collectorId: string | null;
    collectorLastSeenAt: string | null;
    observedAt: string | null;
    online: boolean | null;
    pollIntervalSeconds: number;
  },
  now = Date.now(),
): DeviceHealth {
  if (!input.monitoringEnabled)
    return { status: "unknown", reason: "Monitoring disabled", stale: false };
  if (!input.collectorId)
    return { status: "unknown", reason: "No collector assigned", stale: false };
  if (!input.observedAt)
    return {
      status: "unknown",
      reason: "No availability observation received",
      stale: false,
    };
  if (!isFresh(input.collectorLastSeenAt, now, input.pollIntervalSeconds))
    return {
      status: "unknown",
      reason: "Collector heartbeat missing or stale",
      stale: true,
    };
  if (!isFresh(input.observedAt, now, input.pollIntervalSeconds))
    return {
      status: "unknown",
      reason: "Availability telemetry stale",
      stale: true,
    };
  if (input.online === null)
    return {
      status: "unknown",
      reason: "No availability result",
      stale: false,
    };
  return {
    status: input.online ? "online" : "offline",
    reason: input.online ? "Fresh successful probe" : "Fresh failed probe",
    stale: false,
  };
}
