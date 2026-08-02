import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import {
  credentialReferences,
  deviceIntakeBatches,
  deviceIntakeCandidates,
  devices,
} from "../../../../db/schema";
import { authorizeRequest } from "../../../../lib/access-control";

const forbiddenKeys = new Set(["secret", "token", "password", "community", "authkey", "privkey", "credentialvalue", "value"]);
const vendors = new Set(["MikroTik", "Ubiquiti"]);
const snmpModes = new Set(["SNMPv3", "SNMPv2c-read-only"]);

type IntakeRow = {
  hostname: string;
  vendor: string;
  model: string;
  serial: string;
  site: string;
  managementAddress: string;
  collectorId: string;
  snmpMode: string;
  credentialReferenceId: string;
  owner: string;
};

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

function exactAddress(value: string) {
  if (value.includes("/") || value.includes("*") || value.includes(" ") || value.includes("\\")) return false;
  const ipv4 = value.split(".");
  if (ipv4.length === 4 && ipv4.every((part) => /^\d{1,3}$/.test(part) && Number(part) >= 0 && Number(part) <= 255)) {
    return value !== "0.0.0.0" && !value.startsWith("224.") && !value.startsWith("255.");
  }
  return /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(value);
}

function normalizeRow(input: unknown): IntakeRow | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const row = input as Record<string, unknown>;
  const normalized = {
    hostname: safeText(row.hostname, 120),
    vendor: safeText(row.vendor, 40),
    model: safeText(row.model, 120),
    serial: safeText(row.serial, 120),
    site: safeText(row.site, 120),
    managementAddress: safeText(row.managementAddress, 253),
    collectorId: safeText(row.collectorId, 120),
    snmpMode: safeText(row.snmpMode, 40),
    credentialReferenceId: safeText(row.credentialReferenceId, 160),
    owner: safeText(row.owner, 120),
  };
  return Object.values(normalized).every(Boolean) ? normalized as IntakeRow : null;
}

async function digest(value: unknown) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function GET(request: Request) {
  const decision = await authorizeRequest(request, "devices.read");
  if (!decision.ok) return decision.response;
  const db = getDb();
  const [batches, candidates] = await Promise.all([
    db.select().from(deviceIntakeBatches).orderBy(desc(deviceIntakeBatches.createdAt)).limit(50),
    db.select().from(deviceIntakeCandidates).orderBy(desc(deviceIntakeCandidates.createdAt)).limit(200),
  ]);
  return Response.json({ batches, candidates, probesEnabled: false, networkWrites: false, activationAllowed: false });
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
    return Response.json({ error: "Secret and SNMP community values are not accepted by device intake" }, { status: 422 });
  }
  const fileName = safeText(payload.fileName, 180);
  const incoming = Array.isArray(payload.rows) ? payload.rows : [];
  if (!fileName || incoming.length < 1 || incoming.length > 100) {
    return Response.json({ error: "A named intake batch must contain between 1 and 100 rows" }, { status: 422 });
  }

  const rows = incoming.map(normalizeRow);
  if (rows.some((row) => !row)) return Response.json({ error: "Every approved intake field is required" }, { status: 422 });
  const normalizedRows = rows as IntakeRow[];
  if (normalizedRows.some((row) => !vendors.has(row.vendor) || !snmpModes.has(row.snmpMode))) {
    return Response.json({ error: "Vendor or read-only SNMP mode is not approved" }, { status: 422 });
  }
  if (normalizedRows.some((row) => !exactAddress(row.managementAddress))) {
    return Response.json({ error: "Use one exact management address; ranges, wildcards and broad scan targets are rejected" }, { status: 422 });
  }

  const serials = new Set<string>();
  const hostnames = new Set<string>();
  const addresses = new Set<string>();
  for (const row of normalizedRows) {
    const serialKey = `${row.vendor.toLowerCase()}:${row.serial.toLowerCase()}`;
    const hostnameKey = row.hostname.toLowerCase();
    const addressKey = row.managementAddress.toLowerCase();
    if (serials.has(serialKey) || hostnames.has(hostnameKey) || addresses.has(addressKey)) {
      return Response.json({ error: "Duplicate hostname, vendor/serial or management address exists inside the batch" }, { status: 409 });
    }
    serials.add(serialKey);
    hostnames.add(hostnameKey);
    addresses.add(addressKey);
  }

  const db = getDb();
  const [knownCandidates, knownDevices, knownCredentials] = await Promise.all([
    db.select({
      hostname: deviceIntakeCandidates.hostname,
      vendor: deviceIntakeCandidates.vendor,
      serial: deviceIntakeCandidates.serial,
      address: deviceIntakeCandidates.managementAddress,
    }).from(deviceIntakeCandidates),
    db.select({ hostname: devices.hostname, address: devices.managementIp }).from(devices),
    db.select({ id: credentialReferences.id, status: credentialReferences.status }).from(credentialReferences),
  ]);
  const knownHostname = new Set([...knownCandidates.map((row) => row.hostname.toLowerCase()), ...knownDevices.map((row) => row.hostname.toLowerCase())]);
  const knownAddress = new Set([...knownCandidates.map((row) => row.address.toLowerCase()), ...knownDevices.flatMap((row) => row.address ? [row.address.toLowerCase()] : [])]);
  const knownSerial = new Set(knownCandidates.map((row) => `${row.vendor.toLowerCase()}:${row.serial.toLowerCase()}`));
  const credentialIds = new Set(knownCredentials.filter((row) => row.status !== "revoked").map((row) => row.id));
  if (normalizedRows.some((row) => knownHostname.has(row.hostname.toLowerCase()) || knownAddress.has(row.managementAddress.toLowerCase()) || knownSerial.has(`${row.vendor.toLowerCase()}:${row.serial.toLowerCase()}`))) {
    return Response.json({ error: "A staged or registered device already uses this hostname, serial or management address" }, { status: 409 });
  }
  if (normalizedRows.some((row) => !credentialIds.has(row.credentialReferenceId))) {
    return Response.json({ error: "Every device must reference an existing, non-revoked credential record" }, { status: 422 });
  }

  const batchId = `intake-batch-${crypto.randomUUID()}`;
  await db.insert(deviceIntakeBatches).values({
    id: batchId,
    fileName,
    rowCount: normalizedRows.length,
    acceptedCount: 0,
    rejectedCount: 0,
    status: "staging",
    submittedBy: decision.identity.email,
    payloadDigest: await digest(normalizedRows),
    validationSummary: { exactAddresses: true, duplicates: false, secretsStored: false },
    probesEnabled: false,
    networkWritesEnabled: false,
  });

  try {
    for (const row of normalizedRows) {
      await db.insert(deviceIntakeCandidates).values({
        id: `intake-device-${crypto.randomUUID()}`,
        batchId,
        ...row,
        status: "draft",
        probesEnabled: false,
        networkWritesEnabled: false,
      });
    }
    await db.update(deviceIntakeBatches).set({ status: "draft", acceptedCount: normalizedRows.length }).where(eq(deviceIntakeBatches.id, batchId));
  } catch {
    await db.update(deviceIntakeBatches).set({ status: "failed", rejectedCount: normalizedRows.length }).where(eq(deviceIntakeBatches.id, batchId));
    return Response.json({ error: "The batch could not be staged safely; no activation was attempted" }, { status: 500 });
  }

  return Response.json({
    accepted: normalizedRows.length,
    batchId,
    status: "draft",
    probesEnabled: false,
    networkWrites: false,
    activationAllowed: false,
  }, { status: 201 });
}
