import { desc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { credentialReferences, credentialRotationEvents, credentialValidationEvidence } from "../../../../db/schema";
import { authorizeRequest } from "../../../../lib/access-control";

const forbiddenKeys = new Set(["secret","token","password","community","authkey","privkey","credentialvalue","value"]);

function containsSecretMaterial(input: unknown): boolean {
  if (!input || typeof input !== "object") return false;
  if (Array.isArray(input)) return input.some(containsSecretMaterial);
  return Object.entries(input as Record<string, unknown>).some(([key, value]) =>
    forbiddenKeys.has(key.toLowerCase().replaceAll("_", "")) || containsSecretMaterial(value),
  );
}

function safeText(value: unknown, max: number) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max ? value.trim() : null;
}

export async function GET(request: Request) {
  const decision = await authorizeRequest(request, "platform.read");
  if (!decision.ok) return decision.response;
  const db = getDb();
  const [references, validations, rotations] = await Promise.all([
    db.select().from(credentialReferences).orderBy(desc(credentialReferences.updatedAt)).limit(100),
    db.select().from(credentialValidationEvidence).orderBy(desc(credentialValidationEvidence.observedAt)).limit(50),
    db.select().from(credentialRotationEvents).orderBy(desc(credentialRotationEvents.requestedAt)).limit(50),
  ]);
  return Response.json({ references, validations, rotations, secretValuesStored: false, networkWrites: false });
}

export async function POST(request: Request) {
  const decision = await authorizeRequest(request, "platform.admin");
  if (!decision.ok) return decision.response;
  let payload: Record<string, unknown>;
  try {
    payload = await request.json() as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
  if (containsSecretMaterial(payload)) {
    return Response.json({ error: "Secret values are not accepted by NOCX" }, { status: 422 });
  }
  const label = safeText(payload.label, 120);
  const system = safeText(payload.system, 80);
  const scopeType = safeText(payload.scopeType, 50);
  const authenticationMethod = safeText(payload.authenticationMethod, 80);
  const storageProvider = safeText(payload.storageProvider, 80);
  const owner = safeText(payload.owner, 120);
  const rotationDays = Number(payload.rotationDays);
  if (!label || !system || !scopeType || !authenticationMethod || !storageProvider || !owner || !Number.isInteger(rotationDays) || rotationDays < 1 || rotationDays > 365) {
    return Response.json({ error: "Reference metadata validation failed" }, { status: 422 });
  }
  const id = `credref-${crypto.randomUUID()}`;
  await getDb().insert(credentialReferences).values({
    id,
    label,
    system,
    scopeType,
    scopeId: safeText(payload.scopeId, 120),
    authenticationMethod,
    storageProvider,
    bindingName: safeText(payload.bindingName, 120),
    status: "planned",
    owner,
    rotationDays,
    valueStored: false,
  });
  return Response.json({ accepted: true, id, status: "planned", secretValuesStored: false, networkWrites: false }, { status: 201 });
}
