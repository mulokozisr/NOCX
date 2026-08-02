import { and, eq, gte, lt, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { metricRollups, metricSamples } from "./schema";

function bucketStart(date: Date, bucket: "hourly" | "daily") {
  const result = new Date(date);
  result.setUTCMinutes(0, 0, 0);
  if (bucket === "daily") result.setUTCHours(0);
  return result;
}

export async function buildMetricRollups(binding: D1Database, now = new Date()) {
  const db = drizzle(binding);
  let written = 0;

  for (const bucket of ["hourly", "daily"] as const) {
    const end = bucketStart(now, bucket);
    const from = new Date(end);
    if (bucket === "hourly") {
      from.setUTCHours(from.getUTCHours() - 1);
    } else {
      from.setUTCDate(from.getUTCDate() - 1);
    }

    const rows = await db
      .select({
        deviceId: metricSamples.deviceId,
        metricKey: metricSamples.metricKey,
        sampleCount: sql<number>`count(*)`,
        minimum: sql<number>`min(${metricSamples.value})`,
        maximum: sql<number>`max(${metricSamples.value})`,
        average: sql<number>`round(avg(${metricSamples.value}))`,
      })
      .from(metricSamples)
      .where(
        and(
          gte(metricSamples.observedAt, from.toISOString()),
          lt(metricSamples.observedAt, end.toISOString()),
          eq(metricSamples.quality, "valid"),
        ),
      )
      .groupBy(metricSamples.deviceId, metricSamples.metricKey);

    for (const row of rows) {
      const values = {
        sampleCount: Number(row.sampleCount),
        minimum: Number(row.minimum),
        maximum: Number(row.maximum),
        average: Number(row.average),
      };
      await db
        .insert(metricRollups)
        .values({
          id: `rollup-${bucket}-${row.deviceId}-${row.metricKey}-${from.getTime()}`,
          deviceId: row.deviceId,
          metricKey: row.metricKey,
          bucket,
          bucketStart: from.toISOString(),
          ...values,
          quality: "valid",
        })
        .onConflictDoUpdate({
          target: [
            metricRollups.deviceId,
            metricRollups.metricKey,
            metricRollups.bucket,
            metricRollups.bucketStart,
          ],
          set: values,
        });
      written += 1;
    }
  }

  return { written, completedAt: now.toISOString() };
}
