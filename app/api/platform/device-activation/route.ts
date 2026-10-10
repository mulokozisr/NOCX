import { and, eq, sql } from "drizzle-orm";
import { getDb } from "../../../../db";
import {
  collectors,
  credentialReferences,
  deviceIntakeCandidates,
  devices,
  sites,
} from "../../../../db/schema";
import { authorizeRequest } from "../../../../lib/access-control";
export async function POST(request: Request) {
  const access = await authorizeRequest(request, "platform.admin");
  if (!access.ok) return access.response;
  let payload: {
    candidateId?: string;
    siteId?: string;
    collectorId?: string;
    approved?: boolean;
  };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (
    !payload?.candidateId ||
    !payload.siteId ||
    !payload.collectorId ||
    payload.approved !== true
  )
    return Response.json(
      {
        error:
          "Candidate, site, collector and explicit activation approval required",
      },
      { status: 422 },
    );
  const db = getDb();
  const [candidate, site, collector] = await Promise.all([
    db
      .select()
      .from(deviceIntakeCandidates)
      .where(eq(deviceIntakeCandidates.id, payload.candidateId))
      .limit(1),
    db.select().from(sites).where(eq(sites.id, payload.siteId)).limit(1),
    db
      .select()
      .from(collectors)
      .where(eq(collectors.id, payload.collectorId))
      .limit(1),
  ]);
  if (!candidate[0] || !site[0] || !collector[0])
    return Response.json(
      { error: "Candidate, site or collector not found" },
      { status: 404 },
    );
  const id = `device-${candidate[0].id}`;
  if (candidate[0].status === "active")
    return Response.json({ deviceId: id, replayed: true });
  if (candidate[0].status !== "draft")
    return Response.json(
      { error: "Only draft candidates can be activated" },
      { status: 409 },
    );
  const credential = (
    await db
      .select()
      .from(credentialReferences)
      .where(eq(credentialReferences.id, candidate[0].credentialReferenceId))
      .limit(1)
  )[0];
  if (!credential || credential.status === "revoked")
    return Response.json(
      { error: "Non-revoked credential reference required" },
      { status: 422 },
    );
  try {
    // D1 batch is transactional: a failed registration cannot leave an active candidate.
    await db.batch([
      db
        .insert(devices)
        .values({
          id,
          hostname: candidate[0].hostname,
          vendor: candidate[0].vendor,
          model: candidate[0].model,
          managementIp: candidate[0].managementAddress,
          siteId: site[0].id,
          site: site[0].name,
          collectorId: collector[0].id,
          status: "unknown",
          source: "intake",
          monitoringEnabled: true,
        })
        .onConflictDoNothing({ target: devices.id }),
      db
        .update(deviceIntakeCandidates)
        .set({
          status: "active",
          site: sql`(select site from devices where id = ${id})`,
          collectorId: sql`(select collector_id from devices where id = ${id})`,
          probesEnabled: true,
          updatedAt: new Date().toISOString(),
        })
        .where(
          and(
            eq(deviceIntakeCandidates.id, candidate[0].id),
            eq(deviceIntakeCandidates.status, "draft"),
          ),
        ),
    ]);
  } catch {
    return Response.json(
      { error: "Device registration conflicts with existing inventory" },
      { status: 409 },
    );
  }
  return Response.json(
    {
      deviceId: id,
      status: "unknown",
      reason: "Waiting for first availability observation",
      networkWrites: false,
    },
    { status: 201 },
  );
}
