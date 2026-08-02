import { desc } from "drizzle-orm";
import { getDb } from "../../../../db";
import { commissioningRehearsals } from "../../../../db/schema";
import { authorizeRequest } from "../../../../lib/access-control";

type ScenarioDefinition = {
  vendor: "MikroTik" | "Ubiquiti" | "Platform";
  expectedDecision: "ready" | "blocked" | "alert" | "replay";
  actualDecision: "ready" | "blocked" | "alert" | "replay";
  gates: string[];
};

const scenarios: Record<string, ScenarioDefinition> = {
  "mikrotik-identity-mismatch": {
    vendor: "MikroTik",
    expectedDecision: "blocked",
    actualDecision: "blocked",
    gates: [
      "Synthetic sysObjectID was isolated from production",
      "Device and evidence identity mismatch was detected",
      "Activation remained blocked",
    ],
  },
  "mikrotik-normalization": {
    vendor: "MikroTik",
    expectedDecision: "ready",
    actualDecision: "ready",
    gates: [
      "Synthetic RouterOS fields mapped to approved metric keys",
      "No unsupported field entered alert evaluation",
      "Read-only readiness decision matched the runbook",
    ],
  },
  "ubiquiti-rf-degradation": {
    vendor: "Ubiquiti",
    expectedDecision: "alert",
    actualDecision: "alert",
    gates: [
      "Synthetic signal, noise and CCQ values stayed in the rehearsal namespace",
      "RF degradation crossed the approved warning boundary",
      "Production incident and telemetry tables were not changed",
    ],
  },
  "collector-offline-replay": {
    vendor: "Platform",
    expectedDecision: "replay",
    actualDecision: "replay",
    gates: [
      "Synthetic upload failure entered an isolated queue",
      "Replay checkpoint preserved sample order and request identity",
      "Duplicate protection accepted one logical batch",
    ],
  },
};

function allowedPayload(value: unknown): value is { scenarioKey: string } {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value as Record<string, unknown>);
  return keys.length === 1 && keys[0] === "scenarioKey" && typeof (value as Record<string, unknown>).scenarioKey === "string";
}

async function digest(value: unknown) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function GET(request: Request) {
  const decision = await authorizeRequest(request, "platform.read");
  if (!decision.ok) return decision.response;
  const runs = await getDb().select().from(commissioningRehearsals).orderBy(desc(commissioningRehearsals.completedAt)).limit(50);
  return Response.json({
    runs,
    scenarios: Object.keys(scenarios),
    controls: {
      syntheticOnly: true,
      productionTelemetryWritten: false,
      probesEnabled: false,
      networkWrites: false,
      hardwareAcceptanceGranted: false,
    },
  });
}

export async function POST(request: Request) {
  const decision = await authorizeRequest(request, "platform.admin");
  if (!decision.ok) return decision.response;

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
  }
  if (!allowedPayload(payload)) {
    return Response.json({ error: "Only a server-approved rehearsal scenario key is accepted; device addresses and credentials are rejected" }, { status: 422 });
  }

  const scenario = scenarios[payload.scenarioKey];
  if (!scenario) return Response.json({ error: "Unknown commissioning rehearsal scenario" }, { status: 404 });

  const startedAt = new Date().toISOString();
  const completedAt = new Date().toISOString();
  const evidence = {
    scenarioKey: payload.scenarioKey,
    gates: scenario.gates.map((gate) => ({ gate, status: "passed" })),
    expectedDecision: scenario.expectedDecision,
    actualDecision: scenario.actualDecision,
    syntheticOnly: true,
    productionTelemetryWritten: false,
    probesEnabled: false,
    networkWrites: false,
    hardwareAcceptanceGranted: false,
  };
  const evidenceDigest = await digest(evidence);
  const id = `rehearsal-${crypto.randomUUID()}`;
  const status = scenario.expectedDecision === scenario.actualDecision ? "passed" : "failed";

  await getDb().insert(commissioningRehearsals).values({
    id,
    scenarioKey: payload.scenarioKey,
    vendor: scenario.vendor,
    expectedDecision: scenario.expectedDecision,
    actualDecision: scenario.actualDecision,
    status,
    executedBy: decision.identity.email,
    startedAt,
    completedAt,
    evidenceDigest,
    evidence,
    syntheticData: true,
    productionTelemetryWritten: false,
    probesEnabled: false,
    networkWritesEnabled: false,
  });

  return Response.json({
    id,
    status,
    vendor: scenario.vendor,
    expectedDecision: scenario.expectedDecision,
    actualDecision: scenario.actualDecision,
    completedAt,
    evidenceDigest,
    gates: evidence.gates,
    controls: {
      syntheticOnly: true,
      productionTelemetryWritten: false,
      probesEnabled: false,
      networkWrites: false,
      hardwareAcceptanceGranted: false,
    },
  }, { status: 201 });
}
