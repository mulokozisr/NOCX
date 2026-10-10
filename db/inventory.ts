import { asc, sql } from "drizzle-orm";
import { getDb } from "./index";
import {
  availabilitySamples,
  collectors,
  devices,
  metricSamples,
  sites,
} from "./schema";
import { deviceHealth, isFresh } from "../lib/device-health";
export async function readInventory(db = getDb()) {
  const now = Date.now();
  // Latest rows per device/collector/key avoid two queries for every inventory device.
  const [records, siteRows, collectorRows, observations, samples] =
    await Promise.all([
      db.select().from(devices).orderBy(asc(devices.hostname)),
      db.select().from(sites).orderBy(asc(sites.name)),
      db.select().from(collectors),
      db
        .select()
        .from(availabilitySamples)
        .where(
          sql`${availabilitySamples.observedAt} = (select max(a.observed_at) from availability_samples a where a.device_id = ${availabilitySamples.deviceId} and a.collector_id = ${availabilitySamples.collectorId})`,
        ),
      db
        .select()
        .from(metricSamples)
        .where(
          sql`${metricSamples.observedAt} = (select max(m.observed_at) from metric_samples m where m.device_id = ${metricSamples.deviceId} and m.collector_id = ${metricSamples.collectorId} and m.metric_key = ${metricSamples.metricKey})`,
        ),
    ]);
  const rows = records.map((device) => {
    const latest = observations.find(
      (row) =>
        row.deviceId === device.id && row.collectorId === device.collectorId,
    );
    const collector = collectorRows.find(
      (row) => row.id === device.collectorId,
    );
    const health = deviceHealth(
      {
        ...device,
        collectorLastSeenAt: collector?.lastSeenAt ?? null,
        observedAt: latest?.observedAt ?? null,
        online: latest?.online ?? null,
      },
      now,
    );
    const current = samples.filter(
      (sample) =>
        sample.deviceId === device.id &&
        sample.collectorId === device.collectorId &&
        sample.quality === "valid" &&
        isFresh(sample.observedAt, now, device.pollIntervalSeconds),
    );
    const metric = (key: string) =>
      current.find((sample) => sample.metricKey === key)?.value ?? null;
    return {
      ...device,
      site:
        siteRows.find((row) => row.id === device.siteId)?.name ??
        device.site ??
        "Unassigned",
      health,
      observation: latest ?? null,
      cpu: metric("device.cpu.utilization.pct"),
      memory: metric("device.memory.utilization.pct"),
      metrics: current,
    };
  });
  return {
    devices: rows,
    sites: siteRows,
    collectors: collectorRows.map((row) => ({
      ...row,
      fresh: isFresh(row.lastSeenAt, now),
    })),
    summary: {
      total: rows.length,
      online: rows.filter((row) => row.health.status === "online").length,
      offline: rows.filter((row) => row.health.status === "offline").length,
      unknown: rows.filter((row) => row.health.status === "unknown").length,
      collectorsOnline: collectorRows.filter((row) =>
        isFresh(row.lastSeenAt, now),
      ).length,
    },
    checkedAt: new Date(now).toISOString(),
  };
}
