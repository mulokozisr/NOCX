import { eq } from "drizzle-orm";
import { getDb } from "../../../../../db";
import { collectors } from "../../../../../db/schema";
import { recordHeartbeat } from "../../../../../db/observations";
import { collectorAuthenticated } from "../../../../../lib/collector-auth";
export async function POST(request: Request) {
  if (!collectorAuthenticated(request))
    return Response.json(
      { error: "Collector authentication failed" },
      { status: 401 },
    );
  let payload: { collectorId?: string };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (
    !payload?.collectorId ||
    typeof payload.collectorId !== "string" ||
    payload.collectorId.length > 80
  )
    return Response.json({ error: "Collector ID required" }, { status: 422 });
  const db = getDb();
  if (
    !(
      await db
        .select()
        .from(collectors)
        .where(eq(collectors.id, payload.collectorId))
        .limit(1)
    )[0]
  )
    return Response.json(
      { error: "Collector not registered" },
      { status: 403 },
    );
  await recordHeartbeat(db, payload.collectorId);
  return Response.json({ accepted: true }, { status: 202 });
}
