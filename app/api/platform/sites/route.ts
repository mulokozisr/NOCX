import { asc, eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { sites } from "../../../../db/schema";
import { authorizeRequest } from "../../../../lib/access-control";
export async function GET(request: Request) {
  const access = await authorizeRequest(request, "devices.read");
  if (!access.ok) return access.response;
  return Response.json(
    { sites: await getDb().select().from(sites).orderBy(asc(sites.name)) },
    { headers: { "cache-control": "no-store" } },
  );
}
export async function POST(request: Request) {
  const access = await authorizeRequest(request, "platform.admin");
  if (!access.ok) return access.response;
  let payload: { name?: unknown; region?: unknown };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  const region =
    typeof payload?.region === "string" ? payload.region.trim() : null;
  if (!name || name.length > 120 || (region && region.length > 120))
    return Response.json(
      { error: "A site name of 1–120 characters is required" },
      { status: 422 },
    );
  const nameKey = name.toLowerCase(),
    db = getDb();
  if (
    (
      await db.select().from(sites).where(eq(sites.nameKey, nameKey)).limit(1)
    )[0]
  )
    return Response.json({ error: "Site already exists" }, { status: 409 });
  const site = { id: `site-${crypto.randomUUID()}`, name, nameKey, region };
  const inserted = await db
    .insert(sites)
    .values(site)
    .onConflictDoNothing()
    .returning();
  if (!inserted.length)
    return Response.json({ error: "Site already exists" }, { status: 409 });
  return Response.json({ site: inserted[0] }, { status: 201 });
}
export async function PATCH(request: Request) {
  const access = await authorizeRequest(request, "platform.admin");
  if (!access.ok) return access.response;
  let payload: { id?: string; name?: string; region?: string };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  if (
    !payload?.id ||
    !name ||
    name.length > 120 ||
    (payload.region &&
      (typeof payload.region !== "string" || payload.region.length > 120))
  )
    return Response.json(
      { error: "Site ID and valid name required" },
      { status: 422 },
    );
  const db = getDb(),
    nameKey = name.toLowerCase();
  const conflict = (
    await db.select().from(sites).where(eq(sites.nameKey, nameKey)).limit(1)
  )[0];
  if (conflict && conflict.id !== payload.id)
    return Response.json({ error: "Site already exists" }, { status: 409 });
  try {
    const changed = await db
      .update(sites)
      .set({
        name,
        nameKey,
        region: payload.region?.trim() || null,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(sites.id, payload.id))
      .returning();
    return changed.length
      ? Response.json({ site: changed[0] })
      : Response.json({ error: "Site not found" }, { status: 404 });
  } catch {
    return Response.json(
      { error: "Site could not be updated; check for a duplicate name" },
      { status: 409 },
    );
  }
}
