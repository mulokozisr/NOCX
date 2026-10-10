import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { build } from "esbuild";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const directory = await mkdtemp(join(tmpdir(), "nocx-api-test-"));
const paths = {
  sites: "app/api/platform/sites/route.ts", devices: "app/api/platform/devices/route.ts",
  collectors: "app/api/platform/collectors/route.ts", activation: "app/api/platform/device-activation/route.ts",
  metrics: "app/api/collector/v1/metrics/route.ts", availability: "app/api/collector/v1/availability/route.ts",
  mikrotik: "app/api/collector/v1/mikrotik/route.ts", heartbeat: "app/api/collector/v1/heartbeat/route.ts", health: "lib/device-health.ts",
};
const modules = {};
for (const [name, path] of Object.entries(paths)) {
  const output = join(directory, `${name}.mjs`);
  await build({ entryPoints: [path], outfile: output, bundle: true, platform: "node", format: "esm" });
  modules[name] = await import(pathToFileURL(output).href);
}
process.on("exit", () => { void rm(directory, { recursive: true, force: true }); });

// SQLite-backed D1 adapter executes real route SQL, including transactional batches.
function binding(sqlite) {
  const wrap = (query, params = []) => ({
    bind(...values) { return wrap(query, values); },
    async raw() { const statement = sqlite.prepare(query); if (statement.setReturnArrays) { statement.setReturnArrays(true); return statement.all(...params); } return statement.all(...params).map(row => Object.values(row)); },
    async all() { return { success: true, results: sqlite.prepare(query).all(...params) }; },
    async run() { const result = sqlite.prepare(query).run(...params); return { success: true, results: [], meta: { changes: Number(result.changes) } }; },
  });
  return { prepare: wrap, async batch(statements) {
    sqlite.exec("BEGIN");
    try { const results = []; for (const statement of statements) results.push(await statement.all()); sqlite.exec("COMMIT"); return results; }
    catch (error) { sqlite.exec("ROLLBACK"); throw error; }
  } };
}
async function database(legacy = false) {
  const sqlite = new DatabaseSync(":memory:");
  const journal = JSON.parse(await readFile("drizzle/meta/_journal.json", "utf8"));
  for (const entry of journal.entries) {
    if (entry.idx === 15 && legacy) {
      sqlite.exec("INSERT INTO collectors(id,name) VALUES('collector-doxa-vps','DOXA VPS'); INSERT INTO devices(id,hostname,vendor,site) VALUES('device-cudy-lt400-pilot','legacy-cudy','Cudy',' Pilot '),('legacy-two','legacy-two','MikroTik','pilot');");
    }
    sqlite.exec(await readFile(`drizzle/${entry.tag}.sql`, "utf8"));
  }
  sqlite.exec("PRAGMA foreign_keys=ON; INSERT OR IGNORE INTO roles(id,name,permissions) VALUES('test-admin','Test Admin','[\"devices.read\",\"platform.admin\"]'); INSERT OR IGNORE INTO operators(id,email,display_name,role_id) VALUES('admin','test@example.com','Test','test-admin'); INSERT INTO collectors(id,name) VALUES('c1','Collector one'),('c2','Collector two');");
  globalThis.__NOCX_DB = binding(sqlite);
  process.env.NOCX_COLLECTOR_TOKEN = "test-token";
  return sqlite;
}
function human(body, method = "POST") { return new Request("http://localhost/api", { method, headers: { "oai-authenticated-user-email": "test@example.com", "content-type": "application/json" }, ...(method === "GET" ? {} : { body: JSON.stringify(body) }) }); }
function collector(body, requestId) { return new Request("http://localhost/api", { method: "POST", headers: { authorization: "Bearer test-token", "content-type": "application/json", ...(requestId ? { "x-request-id": requestId } : {}) }, body: JSON.stringify(body) }); }
const at = (seconds = 0) => new Date(Date.now() + seconds * 1000).toISOString();

await test("migration preserves legacy devices and normalizes duplicate site labels", async () => {
  const db = await database(true);
  assert.equal(db.prepare("SELECT count(*) n FROM sites").get().n, 1);
  const rows = db.prepare("SELECT site_id,collector_id FROM devices ORDER BY id").all();
  assert.equal(rows[0].site_id, rows[1].site_id);
  assert.equal(rows[0].collector_id, "collector-doxa-vps");
  db.close();
});
await test("site creation, rename and device assignment persist across independent reads", async () => {
  const db = await database();
  assert.equal((await modules.sites.POST(new Request("http://localhost/api", { method: "POST", body: "{}" }))).status, 401);
  const response = await modules.sites.POST(human({ name: "Paje", region: "South" })); assert.equal(response.status, 201);
  const site = (await response.json()).site;
  assert.equal((await modules.sites.POST(human({ name: " paje " }))).status, 409);
  db.prepare("INSERT INTO devices(id,hostname,vendor,collector_id) VALUES('d1','router-one','MikroTik','c1')").run();
  assert.equal((await modules.devices.PATCH(human({ deviceId: "d1", siteId: "missing" }, "PATCH"))).status, 404);
  assert.equal((await modules.devices.PATCH(human({ deviceId: "d1", siteId: site.id }, "PATCH"))).status, 200);
  let view = await (await modules.devices.GET(human(null, "GET"))).json(); assert.equal(view.devices[0].site, "Paje");
  assert.equal((await modules.sites.PATCH(human({ id: site.id, name: "Paje Tower" }, "PATCH"))).status, 200);
  view = await (await modules.devices.GET(human(null, "GET"))).json(); assert.equal(view.devices[0].site, "Paje Tower");
  db.close();
});
await test("generic observations transition Unknown to Online, stale to Unknown, failure to Offline and recovery to Online", async () => {
  const db = await database();
  db.prepare("INSERT INTO devices(id,hostname,vendor,collector_id) VALUES('d1','router-one','MikroTik','c1')").run();
  const inventory = async () => (await (await modules.devices.GET(human(null, "GET"))).json()).devices[0];
  assert.equal((await inventory()).health.status, "unknown");
  const onlineAt = at(-30);
  assert.equal((await modules.availability.POST(collector({ deviceId: "d1", collectorId: "c1", observedAt: onlineAt, online: true, latencyMs: 2, packetLossPct: 0, handshakeAgeSeconds: null }))).status, 202);
  assert.equal((await inventory()).health.status, "online");
  await modules.availability.POST(collector({ deviceId: "d1", collectorId: "c1", observedAt: at(-60), online: false, latencyMs: null, packetLossPct: 100, handshakeAgeSeconds: null }));
  assert.equal((await inventory()).health.status, "online", "older failure cannot overwrite current state");
  const failAt = at(-10);
  await modules.availability.POST(collector({ deviceId: "d1", collectorId: "c1", observedAt: failAt, online: false, latencyMs: null, packetLossPct: 100, handshakeAgeSeconds: null }));
  assert.equal((await inventory()).health.status, "offline"); assert.equal((await inventory()).lastSeenAt, onlineAt);
  db.prepare("UPDATE collectors SET last_seen_at=? WHERE id='c1'").run(at(-400));
  assert.equal((await inventory()).health.status, "unknown");
  assert.match((await inventory()).health.reason, /heartbeat/);
  await modules.heartbeat.POST(collector({ collectorId: "c1" }));
  assert.equal((await inventory()).health.status, "offline");
  await modules.availability.POST(collector({ deviceId: "d1", collectorId: "c1", observedAt: at(), online: true, latencyMs: 2, packetLossPct: 0, handshakeAgeSeconds: null }));
  assert.equal((await inventory()).health.status, "online");
  assert.equal((await modules.availability.POST(collector({ deviceId: "d1", collectorId: "c2", observedAt: at(), online: true, latencyMs: 2, packetLossPct: 0, handshakeAgeSeconds: null }))).status, 403);
  assert.equal((await modules.availability.POST(collector({ deviceId: "d1", collectorId: "c1", observedAt: at(300), online: true, latencyMs: 2, packetLossPct: 0, handshakeAgeSeconds: null }))).status, 422);
  assert.equal((await modules.devices.PATCH(human({ deviceId: "d1", siteId: null, collectorId: "c2" }, "PATCH"))).status, 200);
  assert.equal((await inventory()).health.status, "unknown", "old collector history does not establish health after reassignment");
  db.close();
});
await test("metrics require assigned collectors and replay rejected counts honestly", async () => {
  const db = await database(); db.prepare("INSERT INTO devices(id,hostname,vendor,collector_id) VALUES('d1','router-one','MikroTik','c1')").run();
  const sample = { deviceId: "d1", metricKey: "availability.online", observedAt: at(), value: 1, unit: "boolean" };
  const batch = { collectorId: "c1", schemaVersion: "1.0", samples: [sample, { ...sample, metricKey: "not-supported" }] };
  const result = await (await modules.metrics.POST(collector(batch, "batch-one"))).json();
  assert.deepEqual(result.counts, { accepted: 1, rejected: 1, duplicate: 0 }); assert.equal(result.accepted, false);
  const replay = await (await modules.metrics.POST(collector(batch, "batch-one"))).json(); assert.deepEqual(replay.counts, result.counts); assert.equal(replay.accepted, false);
  const wrong = await (await modules.metrics.POST(collector({ ...batch, collectorId: "c2", samples: [sample] }, "wrong-collector"))).json(); assert.equal(wrong.counts.rejected, 1);
  assert.equal(db.prepare("SELECT status FROM devices WHERE id='d1'").get().status, "online");
  db.close();
});
await test("activation is approved, atomic and idempotent", async () => {
  const db = await database();
  const site = (await (await modules.sites.POST(human({ name: "Paje" }))).json()).site;
  db.exec("INSERT INTO credential_references(id,label,system,scope_type,scope_id,authentication_method,storage_provider,owner,rotation_days) VALUES('cred','Test SNMP','snmp','device','candidate','SNMPv3','env','Team',90); INSERT INTO device_intake_batches(id,file_name,row_count,submitted_by,payload_digest) VALUES('batch','test.csv',1,'Test','digest'); INSERT INTO device_intake_candidates(id,batch_id,hostname,vendor,model,serial,site,management_address,collector_id,snmp_mode,credential_reference_id,owner) VALUES('candidate','batch','new-router','MikroTik','RB750','serial','Paje','10.90.1.1','c1','SNMPv3','cred','Team');");
  const payload = { candidateId: "candidate", siteId: site.id, collectorId: "c1", approved: true };
  assert.equal((await modules.activation.POST(human({ ...payload, approved: false }))).status, 422);
  assert.equal((await modules.activation.POST(human(payload))).status, 201);
  assert.equal((await modules.activation.POST(human(payload))).status, 200);
  assert.equal(db.prepare("SELECT count(*) n FROM devices WHERE id='device-candidate'").get().n, 1);
  assert.equal(db.prepare("SELECT status FROM device_intake_candidates WHERE id='candidate'").get().status, "active");
  db.exec("INSERT INTO devices(id,hostname,vendor) VALUES('existing-device','conflict-router','MikroTik'); INSERT INTO device_intake_candidates(id,batch_id,hostname,vendor,model,serial,site,management_address,collector_id,snmp_mode,credential_reference_id,owner) VALUES('conflict','batch','conflict-router','MikroTik','RB750','serial-two','Paje','10.90.1.2','c1','SNMPv3','cred','Team');");
  assert.equal((await modules.activation.POST(human({ ...payload, candidateId: "conflict" }))).status, 409);
  assert.equal(db.prepare("SELECT status FROM device_intake_candidates WHERE id='conflict'").get().status, "draft");
  assert.equal(db.prepare("SELECT count(*) n FROM devices WHERE id='device-conflict'").get().n, 0);
  db.close();
});
await test("pilot exposes every fresh metric key and hides stale metrics", async () => {
  const db = await database();
  const insert = db.prepare("INSERT INTO metric_samples(id,collector_id,device_id,metric_key,observed_at,value,unit) VALUES(?,?,?,?,?,?,?)");
  db.exec("INSERT OR IGNORE INTO collectors(id,name) VALUES('collector-doxa-vps','DOXA VPS'); INSERT INTO devices(id,hostname,vendor,collector_id) VALUES('device-mikrotik-rb750gr3-pilot','pilot','MikroTik','collector-doxa-vps');");
  for (let i = 1; i <= 240; i++) insert.run(`metric-${i}`, "collector-doxa-vps", "device-mikrotik-rb750gr3-pilot", `interface.i${i}_port.oper.status`, at(-10), 1, "enum");
  insert.run("old-metric", "collector-doxa-vps", "device-mikrotik-rb750gr3-pilot", "device.cpu.utilization.pct", at(-400), 23, "%");
  const result = await (await modules.mikrotik.GET()).json();
  assert.equal(result.metrics.length, 240); assert.equal(result.health.status, "unknown");
  db.close();
});
await test("freshness uses poll interval and never turns silent devices into Offline", () => {
  const { deviceHealth } = modules.health;
  const input = { monitoringEnabled: true, collectorId: "c1", collectorLastSeenAt: at(), observedAt: at(-400), online: true, pollIntervalSeconds: 60 };
  assert.equal(deviceHealth(input).status, "unknown");
  assert.equal(deviceHealth({ ...input, pollIntervalSeconds: 180 }).status, "online");
  assert.match(deviceHealth({ ...input, monitoringEnabled: false }).reason, /disabled/);
});
await rm(directory, { recursive: true, force: true });
