import { getDb } from "../../../../db";
import { collectors } from "../../../../db/schema";
import { authorizeRequest } from "../../../../lib/access-control";
export async function POST(request: Request) {
  const access = await authorizeRequest(request, "platform.admin");
  if (!access.ok) return access.response;
  let payload: { name?: string; region?: string };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  if (
    !name ||
    name.length > 120 ||
    (payload.region &&
      (typeof payload.region !== "string" || payload.region.length > 120))
  )
    return Response.json(
      { error: "Valid collector name required" },
      { status: 422 },
    );
  const collector = {
    id: `collector-${crypto.randomUUID()}`,
    name,
    region: payload.region?.trim() || null,
  };
  const inserted = await getDb()
    .insert(collectors)
    .values(collector)
    .onConflictDoNothing()
    .returning();
  return inserted.length
    ? Response.json({ collector: inserted[0] }, { status: 201 })
    : Response.json(
        { error: "Collector name already registered" },
        { status: 409 },
      );
}
