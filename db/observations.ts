import { and, eq, isNull, lt, or, sql } from "drizzle-orm";
import { getDb } from "./index";
import { collectors, devices } from "./schema";

export async function recordHeartbeat(
  db: ReturnType<typeof getDb>,
  collectorId: string,
) {
  const now = new Date().toISOString();
  await db
    .update(collectors)
    .set({ status: "online", lastSeenAt: now, updatedAt: now })
    .where(eq(collectors.id, collectorId));
}
// Compare in SQL so concurrent or delayed deliveries cannot overwrite newer state.
export async function recordObservation(
  db: ReturnType<typeof getDb>,
  deviceId: string,
  observedAt: string,
  online: boolean,
) {
  const changed = await db
    .update(devices)
    .set({
      status: online ? "online" : "offline",
      lastObservedAt: observedAt,
      lastSeenAt: online ? observedAt : sql`${devices.lastSeenAt}`,
      updatedAt: new Date().toISOString(),
    })
    .where(
      and(
        eq(devices.id, deviceId),
        or(
          isNull(devices.lastObservedAt),
          lt(devices.lastObservedAt, observedAt),
        ),
      ),
    )
    .returning({ id: devices.id });
  return changed.length > 0;
}
