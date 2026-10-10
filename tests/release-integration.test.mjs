import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const fromProject = (path) => new URL(`../${path}`, import.meta.url);

test("integrates the version 66 release-assurance workspace", async () => {
  const [page, screen] = await Promise.all([
    readFile(fromProject("app/page.tsx"), "utf8"),
    readFile(fromProject("app/release-assurance.tsx"), "utf8"),
  ]);

  assert.match(page, /"Release Assurance":\s*\{\s*slug:\s*"release-assurance"/);
  assert.match(page, /<ReleaseAssurance\s*\/>/);
  assert.match(screen, /MODULE 46 · RELEASE ASSURANCE/);
  assert.match(screen, /50 \/ 50/);
  assert.match(screen, /Ready for controlled device commissioning/);
  assert.match(screen, /Real-device polling, SNMP credential validation and network configuration writes remain disabled/);
});

test("enforces persistent permissions on every human-facing API boundary", async () => {
  const routes = {
    status: await readFile(fromProject("app/api/platform/status/route.ts"), "utf8"),
    access: await readFile(fromProject("app/api/platform/access/route.ts"), "utf8"),
    credentials: await readFile(fromProject("app/api/platform/credentials/route.ts"), "utf8"),
    notifications: await readFile(fromProject("app/api/notifications/route.ts"), "utf8"),
  };

  assert.match(routes.status, /authorizeRequest\(request,"platform\.read"\)/);
  assert.match(routes.access, /authorizeRequest\(request,"platform\.read"\)/);
  assert.match(routes.credentials, /authorizeRequest\(request, "platform\.read"\)/);
  assert.match(routes.credentials, /authorizeRequest\(request, "platform\.admin"\)/);
  assert.match(routes.notifications, /authorizeRequest\(request,"platform\.read"\)/);
  assert.match(routes.notifications, /authorizeRequest\(request,"incidents\.manage"\)/);
  assert.doesNotMatch(routes.status, /if\s*\(\s*!actor\s*\)/);
  assert.doesNotMatch(routes.notifications, /function actor\(/);
});

test("keeps client API references wired to concrete route handlers", async () => {
  const clientFiles = [
    "app/notification-center.tsx",
    "app/platform.tsx",
    "app/data-lifecycle.tsx",
    "app/alerts-incidents.tsx",
    "app/commissioning-rehearsal.tsx",
  ];
  const references = new Set();

  for (const file of clientFiles) {
    const source = await readFile(fromProject(file), "utf8");
    for (const match of source.matchAll(/fetch\(["'](\/api\/[^"'?#]+)/g)) references.add(match[1]);
  }

  assert.ok(references.size >= 2);
  for (const reference of references) {
    await assert.doesNotReject(
      access(fromProject(`app${reference}/route.ts`)),
      `${reference} must have a route handler`,
    );
  }
});

test("keeps workspace slugs unique and release navigation searchable", async () => {
  const page = await readFile(fromProject("app/page.tsx"), "utf8");
  const slugs = [...page.matchAll(/\{\s*slug:\s*"([^"]+)"/g)].map((match) => match[1]);

  assert.ok(slugs.length >= 40);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.match(page, /\{ label: "Release Assurance", icon: ShieldCheck \}/);
  assert.match(page, /Version 66 release audit and integration evidence/);
  assert.match(page, /viewBySlug/);
});

test("loads operational workspaces behind isolated client boundaries", async () => {
  const page = await readFile(fromProject("app/page.tsx"), "utf8");
  const lazyModules = [...page.matchAll(/const\s+\w+\s*=\s*lazy\(\(\)\s*=>\s*import\(/g)];

  assert.ok(lazyModules.length >= 40);
  assert.match(page, /<Suspense\s+fallback=/);
  assert.match(page, /Loading operational workspace/);
  assert.doesNotMatch(page, /import DeviceInventory from "\.\/inventory"/);
  assert.doesNotMatch(page, /import CredentialAssurance from "\.\/credential-assurance"/);
});

test("preserves the cross-layer read-only network safety contract", async () => {
  const [availability, metrics, credentials, adapter, commissioning] = await Promise.all([
    readFile(fromProject("app/api/collector/v1/availability/route.ts"), "utf8"),
    readFile(fromProject("app/api/collector/v1/metrics/route.ts"), "utf8"),
    readFile(fromProject("app/api/platform/credentials/route.ts"), "utf8"),
    readFile(fromProject("examples/multi-vendor-collector/collector.py"), "utf8"),
    readFile(fromProject("app/device-commissioning.tsx"), "utf8"),
  ]);

  assert.match(availability, /networkWrites:false/);
  assert.match(metrics, /networkWrites:\s*false/);
  assert.match(credentials, /networkWrites:\s*false/);
  assert.doesNotMatch(adapter, /snmpset/i);
  assert.match(adapter, /DRY_RUN/);
  assert.match(commissioning, /Every probe stays paused/);
  assert.match(commissioning, /No network configuration is changed/);
});

test("adds persistent fail-closed pre-commissioning device intake", async () => {
  const [page, screen, schema, route] = await Promise.all([
    readFile(fromProject("app/page.tsx"), "utf8"),
    readFile(fromProject("app/device-intake.tsx"), "utf8"),
    readFile(fromProject("db/schema.ts"), "utf8"),
    readFile(fromProject("app/api/platform/device-intake/route.ts"), "utf8"),
  ]);

  assert.match(page, /"Commissioning Intake":\s*\{\s*slug:\s*"commissioning-intake"/);
  assert.match(page, /<DeviceIntake\s*\/>/);
  assert.match(screen, /MODULE 47 · PRE-COMMISSIONING INTAKE/);
  assert.match(screen, /Prepare next week&apos;s devices without contacting them/);
  assert.match(screen, /Staging never enables polling, activation or network configuration writes/);
  assert.match(schema, /device_intake_batches/);
  assert.match(schema, /device_intake_candidates/);
  assert.match(route, /authorizeRequest\(request, "platform\.admin"\)/);
  assert.match(route, /Secret and SNMP community values are not accepted/);
  assert.match(route, /ranges, wildcards and broad scan targets are rejected/);
  assert.match(route, /status: "draft"/);
  assert.match(route, /probesEnabled: false/);
  assert.match(route, /networkWrites: false/);
  assert.match(route, /activationAllowed: false/);
});

test("adds persistent isolated commissioning rehearsals without granting hardware acceptance", async () => {
  const [page, screen, schema, route] = await Promise.all([
    readFile(fromProject("app/page.tsx"), "utf8"),
    readFile(fromProject("app/commissioning-rehearsal.tsx"), "utf8"),
    readFile(fromProject("db/schema.ts"), "utf8"),
    readFile(fromProject("app/api/platform/commissioning-rehearsals/route.ts"), "utf8"),
  ]);

  assert.match(page, /"Commissioning Rehearsal":\s*\{\s*slug:\s*"commissioning-rehearsal"/);
  assert.match(page, /<CommissioningRehearsal\s*\/>/);
  assert.match(screen, /MODULE 48 · COMMISSIONING REHEARSAL/);
  assert.match(screen, /Keep hardware acceptance blocked/);
  assert.match(screen, /Synthetic data never enters production telemetry, alert, incident or topology records/);
  assert.match(schema, /commissioning_rehearsals/);
  assert.match(route, /authorizeRequest\(request, "platform\.read"\)/);
  assert.match(route, /authorizeRequest\(request, "platform\.admin"\)/);
  assert.match(route, /device addresses and credentials are rejected/);
  assert.match(route, /productionTelemetryWritten: false/);
  assert.match(route, /probesEnabled: false/);
  assert.match(route, /networkWrites: false/);
  assert.match(route, /hardwareAcceptanceGranted: false/);
});

test("adds a live read-only Cudy stability pilot backed by stored collector evidence", async () => {
  const [page, screen, route] = await Promise.all([
    readFile(fromProject("app/page.tsx"), "utf8"),
    readFile(fromProject("app/cudy-stability-pilot.tsx"), "utf8"),
    readFile(fromProject("app/api/platform/cudy-pilot/route.ts"), "utf8"),
  ]);

  assert.match(page, /"Cudy Stability Pilot":\s*\{\s*slug:\s*"cudy-stability-pilot"/);
  assert.match(page, /<CudyStabilityPilot\s*\/>/);
  assert.match(screen, /MODULE 49 · LIVE CUDY STABILITY PILOT/);
  assert.match(screen, /Every gate is calculated from stored collector samples and incidents/);
  assert.match(route, /authorizeRequest\(request, "platform\.read"\)/);
  assert.match(route, /availabilitySamples/);
  assert.match(route, /newestAgeSeconds/);
  assert.match(route, /uptimePct/);
  assert.match(route, /networkWrites:false/);
  assert.match(route, /mikrotikProbes:false/);
  assert.match(route, /ubiquitiProbes:false/);
});
test("adds NOCX-owned one-command MikroTik onboarding with one-use safety gates",async()=>{const[page,screen,schema,issue,install,migration]=await Promise.all([readFile(fromProject("app/page.tsx"),"utf8"),readFile(fromProject("app/mikrotik-onboarding.tsx"),"utf8"),readFile(fromProject("db/schema.ts"),"utf8"),readFile(fromProject("app/api/platform/mikrotik-onboarding/route.ts"),"utf8"),readFile(fromProject("app/api/router/v1/[deviceId]/scripts/install/route.ts"),"utf8"),readFile(fromProject("drizzle/0012_mikrotik_one_command_onboarding.sql"),"utf8")]);assert.match(page,/"MikroTik Onboarding":\s*\{/);assert.match(page,/<MikrotikOnboarding\s*\/>/);assert.match(screen,/VERSION 70 · MIKROTIK ONE-COMMAND ONBOARDING/);assert.match(screen,/check-certificate=yes/);assert.match(screen,/dry-run=yes/);assert.match(schema,/mikrotik_installer_tokens/);assert.match(issue,/authorizeRequest\(request,"platform\.admin"\)/);assert.match(issue,/15\*60_000/);assert.match(issue,/tokenDigest:await hash\(raw\)/);assert.match(install,/status:"consumed"/);assert.match(install,/system backup save/);assert.match(install,/nocx-rollback-/);assert.match(install,/SNMP remains disabled/);assert.doesNotMatch(install,/snmpset|\/ip route add|\/ip firewall nat add/i);assert.match(migration,/mikrotik_installer_token_digest_unique/)});

test("records the first real MikroTik pilot without storing its credential",async()=>{const[page,screen]=await Promise.all([readFile(fromProject("app/page.tsx"),"utf8"),readFile(fromProject("app/mikrotik-pilot.tsx"),"utf8")]);assert.match(page,/"MikroTik Pilot":\s*\{/);assert.match(page,/<MikrotikPilot\s*\/>/);assert.match(screen,/VERSION 71 · FIRST MIKROTIK PILOT/);assert.match(screen,/RB750Gr3/);assert.match(screen,/10\.66\.66\.5/);assert.match(screen,/RouterOS 7\.23\.2/);assert.match(screen,/SNMP GET only/);assert.match(screen,/credential rotation required/i);assert.doesNotMatch(screen,/NocxMtPilot_7Kp9Vx4Qm2Ls8/);});
test("ships authenticated live MikroTik ingestion and a read-only DOXA collector",async()=>{const[r,c,d,s]=await Promise.all([readFile(fromProject("app/api/collector/v1/mikrotik/route.ts"),"utf8"),readFile(fromProject("examples/mikrotik-pilot-collector/collector.sh"),"utf8"),readFile(fromProject("examples/mikrotik-pilot-collector/compose.yaml"),"utf8"),readFile(fromProject("app/mikrotik-pilot.tsx"),"utf8")]);assert.match(r,/NOCX_COLLECTOR_TOKEN/);assert.match(r,/networkWrites:false/);assert.match(c,/snmpget -v2c/);assert.doesNotMatch(c,/snmpset/);assert.match(c,/--verify-oids/);assert.match(d,/read_only: true/);assert.match(s,/Live polling active/);});
test("keeps the expanded MikroTik collector state writable and upgrades with rollback",async()=>{const[c,u]=await Promise.all([readFile(fromProject("examples/mikrotik-pilot-collector/collector.sh"),"utf8"),readFile(fromProject("examples/mikrotik-pilot-collector/upgrade.sh"),"utf8")]);assert.match(c,/STATE_FILE="\$STATE_DIR\/counter-state"/);assert.match(c,/COLLECTOR_VERSION="1\.3\.2"/);assert.match(c,/OAI-Sites-Authorization/);assert.match(c,/--once/);assert.match(c,/snmpwalk -v2c/);assert.match(c,/interface\.i\$\{index\}_\$\{safe\}\.out_errors\.delta/);assert.doesNotMatch(c,/snmpset/i);assert.match(u,/trap 'rollback \$\?' ERR/);assert.match(u,/docker compose run --rm --no-deps mikrotik-pilot --once/);assert.match(u,/--force-recreate mikrotik-pilot/);assert.match(u,/Running container is collector/);assert.match(u,/\.rollback-\$timestamp/);assert.doesNotMatch(u,/cat "\$TARGET_DIR\/\.env"/);});
test("quarantines permanent collector rejections and batches MikroTik metric writes",async()=>{const[c,r]=await Promise.all([readFile(fromProject("examples/mikrotik-pilot-collector/collector.sh"),"utf8"),readFile(fromProject("app/api/collector/v1/mikrotik/route.ts"),"utf8")]);assert.match(c,/QUARANTINE_DIR/);assert.match(c,/status.*=~.*4\[0-9\]\[0-9\]/);assert.match(c,/Permanently rejected queued sample moved to quarantine/);assert.match(c,/--max-time "\$CURL_MAX_TIME"/);assert.match(r,/METRIC_INSERT_CHUNK_SIZE=8/);assert.match(r,/insert\(metricSamples\)\.values\(chunk\.map/);assert.doesNotMatch(r,/for\(const s of normalized\)await db\.insert\(metricSamples\)/);});
test("renders expanded MikroTik health and interface telemetry",async()=>{const s=await readFile(fromProject("app/mikrotik-pilot.tsx"),"utf8");assert.match(s,/LIVE DEVICE MEASUREMENTS/);assert.match(s,/device\.cpu\.utilization\.pct/);assert.match(s,/device\.memory\.utilization\.pct/);assert.match(s,/device\.disk\.utilization\.pct/);assert.match(s,/metricValue\(`\$\{prefix\}\.rx\.bps`\)/);assert.match(s,/metricValue\(`\$\{prefix\}\.out_errors\.delta`\)/);assert.match(s,/Network configuration writes: disabled/);});
test("reads newest MikroTik metrics per key without truncating interfaces",async()=>{const s=await readFile(fromProject("app/api/collector/v1/mikrotik/route.ts"),"utf8");const getter=s.slice(s.indexOf("export async function GET"),s.indexOf("export async function POST"));assert.match(getter,/max\(m\.observed_at\)/);assert.match(getter,/m\.metric_key/);assert.doesNotMatch(getter,/limit\(200\)/);assert.match(getter,/isFresh\(sample\.observedAt\)/);});
test("discovers and renders every MikroTik interface while alerts remain opt-in",async()=>{const[c,r,s]=await Promise.all([readFile(fromProject("examples/mikrotik-pilot-collector/collector.sh"),"utf8"),readFile(fromProject("app/api/collector/v1/mikrotik/route.ts"),"utf8"),readFile(fromProject("app/mikrotik-pilot.tsx"),"utf8")]);assert.match(c,/\.1\.3\.6\.1\.2\.1\.31\.1\.1\.1\.1/);assert.doesNotMatch(c,/ether1:1 client:7 nocx-wg:9/);assert.match(r,/MAX_METRICS=100/);assert.match(r,/INTERFACE_METRIC=.*interface/);assert.match(s,/All discovered interfaces/);assert.match(s,/parseInterfaceKey/);assert.match(s,/Discovered only/);assert.match(s,/alertEnabled/);});
test("uses tiered MikroTik polling without increasing router discovery load",async()=>{const[c,s]=await Promise.all([readFile(fromProject("examples/mikrotik-pilot-collector/collector.sh"),"utf8"),readFile(fromProject("app/mikrotik-pilot.tsx"),"utf8")]);assert.match(c,/AVAILABILITY_INTERVAL=.*30/);assert.match(c,/PERFORMANCE_INTERVAL=.*60/);assert.match(c,/DISCOVERY_INTERVAL=.*900/);assert.match(c,/INVENTORY_FILE=.*interface-inventory/);assert.match(c,/refresh_interface_inventory/);assert.match(c,/collect_payload "\$include_performance"/);assert.match(s,/setInterval\(\(\) => void load\(\), 15_000\)/);assert.match(s,/Availability and interface status: 30 seconds/);assert.match(s,/Discovery: 15 minutes/);});
test("automates incidents only for monitored MikroTik interfaces",async()=>{const[r,s]=await Promise.all([readFile(fromProject("app/api/collector/v1/mikrotik/route.ts"),"utf8"),readFile(fromProject("app/mikrotik-pilot.tsx"),"utf8")]);assert.ok(r.includes('MONITORED=new Set(["ether1","client","nocx-wg"])'));assert.match(r,/Three consecutive polls reported the monitored interface down/);assert.match(r,/Five consecutive polls completed without new interface errors/);assert.match(r,/850_000_000/);assert.match(r,/incidentActions/);assert.match(s,/INCIDENT AUTOMATION/);assert.match(s,/Automatic resolution/);assert.match(s,/Recent automated incidents/);});
test("routes and durably acknowledges active incident notifications",async()=>{const[schema,api,center]=await Promise.all([readFile(fromProject("db/schema.ts"),"utf8"),readFile(fromProject("app/api/notifications/route.ts"),"utf8"),readFile(fromProject("app/notification-center.tsx"),"utf8")]);assert.match(schema,/incident_acknowledgements/);assert.match(schema,/incident_ack_incident_unique/);assert.match(api,/Critical · 5-minute acknowledgement/);assert.match(api,/Warning · 15-minute acknowledgement/);assert.match(api,/action:"incident:acknowledge"/);assert.match(api,/status:"acknowledged"/);assert.match(center,/Reading does not acknowledge an incident/);assert.match(center,/Acknowledge incident/);});
test("maps live services to MikroTik dependencies and incident impact",async()=>{const[schema,helper,api,screen,migration,collector]=await Promise.all([readFile(fromProject("db/schema.ts"),"utf8"),readFile(fromProject("db/customer-services.ts"),"utf8"),readFile(fromProject("app/api/platform/customer-services/route.ts"),"utf8"),readFile(fromProject("app/customers.tsx"),"utf8"),readFile(fromProject("drizzle/0014_classy_omega_red.sql"),"utf8"),readFile(fromProject("app/api/collector/v1/mikrotik/route.ts"),"utf8")]);assert.match(schema,/customer_services/);assert.match(schema,/service_dependencies/);assert.match(schema,/service_incident_impacts/);assert.match(migration,/service_dependency_device_interface_idx/);assert.match(helper,/Unassigned MikroTik pilot/);assert.match(helper,/syncServiceIncidentImpact/);assert.match(collector,/ensureMikrotikPilotService/);assert.match(collector,/syncServiceIncidentImpact/);assert.match(api,/automaticIncidentCorrelation: true/);assert.match(api,/networkWrites: false/);assert.match(screen,/SERVICE ONBOARDING & SLA POLICY/);assert.match(screen,/Live persistent dataset/);assert.doesNotMatch(screen,/Simulated telemetry/);});
test("governs pilot customer and SLA assignment",async()=>{const[api,screen]=await Promise.all([readFile(fromProject("app/api/platform/customer-services/route.ts"),"utf8"),readFile(fromProject("app/customers.tsx"),"utf8")]);assert.match(api,/export async function POST/);assert.match(api,/authorizeRequest\(request, "platform.admin"\)/);assert.match(api,/PILOT_INTERFACES/);assert.match(api,/customer_service\.assign/);assert.match(api,/networkWrites: false/);assert.match(screen,/SERVICE ONBOARDING & SLA POLICY/);assert.match(screen,/Assign the MikroTik pilot/);assert.match(screen,/Monitoring records only/);});
