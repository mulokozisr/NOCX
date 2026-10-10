import { eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { collectors, devices, sites } from "../../../../db/schema";
import { readInventory } from "../../../../db/inventory";
import { authorizeRequest } from "../../../../lib/access-control";
export async function GET(request: Request) {
  const access = await authorizeRequest(request, "devices.read");
  if (!access.ok) return access.response;
  return Response.json(
    {
      ...(await readInventory()),
      canAdmin: access.identity.permissions.includes("platform.admin"),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
export async function PATCH(request: Request) {
  const access = await authorizeRequest(request, "platform.admin");
  if (!access.ok) return access.response;
  let payload: {
    deviceId?: string;
    siteId?: string | null;
    collectorId?: string | null;
    monitoringEnabled?: boolean;
  };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (
    !payload?.deviceId ||
    !(payload.siteId === null || typeof payload.siteId === "string") ||
    (payload.collectorId !== undefined &&
      payload.collectorId !== null &&
      typeof payload.collectorId !== "string") ||
    (payload.monitoringEnabled !== undefined &&
      typeof payload.monitoringEnabled !== "boolean")
  )
    return Response.json(
      { error: "Device ID and site ID (or null) required" },
      { status: 422 },
    );
  const db = getDb(),
    site = payload.siteId
      ? (
          await db
            .select()
            .from(sites)
            .where(eq(sites.id, payload.siteId))
            .limit(1)
        )[0]
      : null;
  if (payload.siteId && !site)
    return Response.json({ error: "Site not found" }, { status: 404 });
  if (
    payload.collectorId &&
    !(
      await db
        .select()
        .from(collectors)
        .where(eq(collectors.id, payload.collectorId))
        .limit(1)
    )[0]
  )
    return Response.json({ error: "Collector not found" }, { status: 404 });
  const current = (
    await db
      .select()
      .from(devices)
      .where(eq(devices.id, payload.deviceId))
      .limit(1)
  )[0];
  if (!current)
    return Response.json({ error: "Device not found" }, { status: 404 });
  const reassigned =
    payload.collectorId !== undefined &&
    payload.collectorId !== current.collectorId;
  const changed = await db
    .update(devices)
    .set({
      siteId: site?.id ?? null,
      site: site?.name ?? null,
      ...(payload.collectorId !== undefined
        ? { collectorId: payload.collectorId }
        : {}),
      ...(payload.monitoringEnabled !== undefined
        ? { monitoringEnabled: payload.monitoringEnabled }
        : {}),
      ...(reassigned ? { status: "unknown", lastObservedAt: null } : {}),
      updatedAt: new Date().toISOString(),
    })
    .where(eq(devices.id, payload.deviceId))
    .returning();
  return changed.length
    ? Response.json({ device: changed[0] })
    : Response.json({ error: "Device not found" }, { status: 404 });
}
