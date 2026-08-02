import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, developmentPreviewMeta);
  assert.match(html, /href=["']#main-content["'][^>]*>Skip to main content</i);
  assert.match(html, /aria-current=["']page["']/i);
  assert.match(html, /id=["']main-content["']/i);
  assert.match(html, /role=["']tablist["'][^>]*aria-label=["']Chart time range["']/i);
});

test("integrates monitoring assurance and blocks untrusted operational evidence", async () => {
  const [page, assurance] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/monitoring-assurance.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /"Monitoring Assurance":\s*\{\s*slug:\s*"monitoring-assurance"/i);
  assert.match(page, /<MonitoringAssurance\s*\/>/i);
  assert.match(assurance, /MODULE 31 · MONITORING ASSURANCE/i);
  assert.match(assurance, /Stale or missing telemetry becomes unknown/i);
  assert.match(assurance, /SLA and restoration evidence is blocked/i);
  assert.match(assurance, /without changing network devices/i);
});

test("enforces the typography floor and readable faint color", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const subTenPixelRules = [...css.matchAll(/font-size\s*:\s*([0-9.]+)px/gi)]
    .map((match) => Number(match[1]))
    .filter((size) => size < 10);

  assert.deepEqual(subTenPixelRules, []);
  assert.match(css, /--type-micro:\s*clamp\(\.625rem,[^;]+\.6875rem\)/i);
  assert.match(css, /--faint:\s*#5f6f85/i);
  assert.match(css, /font-variant-numeric:\s*tabular-nums/i);
});

test("integrates controlled device onboarding and monitoring acceptance", async () => {
  const [page,onboarding]=await Promise.all([
    readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/device-onboarding.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(page,/"Device Onboarding":\s*\{\s*slug:\s*"device-onboarding"/i);
  assert.match(page,/<DeviceOnboarding\s*\/>/i);
  assert.match(onboarding,/MODULE 32 · CONTROLLED DEVICE ONBOARDING/i);
  assert.match(onboarding,/Protected SNMP credential reference/i);
  assert.match(onboarding,/Configuration writes remain disabled/i);
  assert.match(onboarding,/healthy baseline and topology mapping are required/i);
});

test("integrates governed baseline and threshold management", async () => {
  const [page,baseline]=await Promise.all([
    readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/baseline-management.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(page,/Baselines:\s*\{\s*slug:\s*"baseline-management"/i);
  assert.match(page,/<BaselineManagement\s*\/>/i);
  assert.match(baseline,/MODULE 33 · BASELINE & THRESHOLD MANAGEMENT/i);
  assert.match(baseline,/Recommended alert boundaries/i);
  assert.match(baseline,/Every approved threshold retains its prior version and evidence/i);
  assert.match(baseline,/network configuration writes remain disabled/i);
});

test("integrates versioned read-only monitoring profiles", async () => {
  const [page,profiles]=await Promise.all([readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),readFile(new URL("../app/monitoring-profiles.tsx",import.meta.url),"utf8")]);
  assert.match(page,/"Monitoring Profiles":\s*\{\s*slug:\s*"monitoring-profiles"/i);
  assert.match(page,/<MonitoringProfiles\s*\/>/i);
  assert.match(profiles,/MODULE 35 · MONITORING PROFILES/i);
  assert.match(profiles,/Normalized collection contract/i);
  assert.match(profiles,/Never substituted with invented values/i);
  assert.match(profiles,/cannot configure network devices/i);
});

test("integrates governed telemetry exploration and quality gates", async () => {
  const [page,explorer]=await Promise.all([readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),readFile(new URL("../app/telemetry-explorer.tsx",import.meta.url),"utf8")]);
  assert.match(page,/"Telemetry Explorer":\s*\{\s*slug:\s*"telemetry-explorer"/i);
  assert.match(page,/<TelemetryExplorer\s*\/>/i);
  assert.match(explorer,/MODULE 36 · TELEMETRY EXPLORER/i);
  assert.match(explorer,/Raw vendor values are retained for audit and replay/i);
  assert.match(explorer,/Unsupported fields remain unknown and are never invented/i);
  assert.match(explorer,/network configuration writes remain disabled/i);
});

test("integrates persistent telemetry storage and governed retention", async () => {
  const [page,lifecycle,schema]=await Promise.all([readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),readFile(new URL("../app/data-lifecycle.tsx",import.meta.url),"utf8"),readFile(new URL("../db/schema.ts",import.meta.url),"utf8")]);
  assert.match(page,/"Data Lifecycle":\s*\{\s*slug:\s*"data-lifecycle"/i);
  assert.match(page,/<DataLifecycle\s*\/>/i);
  assert.match(lifecycle,/MODULE 40 · MULTI-VENDOR ACTIVATION READINESS/i);
  assert.match(lifecycle,/Automated deletion stays disabled/i);
  assert.match(lifecycle,/Unknown metric quarantine/i);
  assert.match(schema,/metricSamples = sqliteTable/i);
  assert.match(schema,/metricRollups = sqliteTable/i);
  assert.match(schema,/ingestionReceipts = sqliteTable/i);
  assert.match(schema,/retentionPolicies = sqliteTable/i);
});
test("adds authenticated multi-vendor metric ingestion and scheduled rollups",async()=>{const [route,rollups,worker,lifecycle]=await Promise.all([readFile(new URL("../app/api/collector/v1/metrics/route.ts",import.meta.url),"utf8"),readFile(new URL("../db/rollups.ts",import.meta.url),"utf8"),readFile(new URL("../worker/index.ts",import.meta.url),"utf8"),readFile(new URL("../app/data-lifecycle.tsx",import.meta.url),"utf8")]);assert.match(route,/MAX_SAMPLES=100/);assert.match(route,/Collector is not registered/);assert.match(route,/ingestionReceipts/);assert.match(route,/networkWrites:false/);assert.match(rollups,/buildMetricRollups/);assert.match(rollups,/\["hourly",\s*"daily"\]/);assert.match(worker,/async scheduled/);assert.match(lifecycle,/Hourly and daily worker enabled/)});
test("enforces authenticated persistent role permissions on the server",async()=>{const [access,route,schema,admin]=await Promise.all([readFile(new URL("../lib/access-control.ts",import.meta.url),"utf8"),readFile(new URL("../app/api/platform/access/route.ts",import.meta.url),"utf8"),readFile(new URL("../db/schema.ts",import.meta.url),"utf8"),readFile(new URL("../app/administration.tsx",import.meta.url),"utf8")]);assert.match(access,/oai-authenticated-user-email/);assert.match(access,/operator_not_active_or_registered/);assert.match(access,/permission_missing/);assert.match(access,/auditEvents/);assert.match(route,/authorizeRequest\(request,"platform.read"\)/);assert.match(schema,/operatorSessions = sqliteTable/);assert.match(admin,/Server-side access enforcement active/);assert.match(admin,/Default-deny authorization/)});
test("ships read-only MikroTik and Ubiquiti adapters with activation gates",async()=>{const [adapter,compose,lifecycle]=await Promise.all([readFile(new URL("../examples/multi-vendor-collector/collector.py",import.meta.url),"utf8"),readFile(new URL("../examples/multi-vendor-collector/compose.yaml",import.meta.url),"utf8"),readFile(new URL("../app/data-lifecycle.tsx",import.meta.url),"utf8")]);assert.match(adapter,/"mikrotik"/);assert.match(adapter,/"ubiquiti"/);assert.match(adapter,/snmpget/);assert.doesNotMatch(adapter,/snmpset/);assert.match(adapter,/DRY_RUN/);assert.match(adapter,/SPOOL/);assert.match(compose,/cap_drop: \[ALL\]/);assert.match(compose,/read_only: true/);assert.match(lifecycle,/MikroTik RouterOS/);assert.match(lifecycle,/Ubiquiti airOS \/ AirMAX/);assert.match(lifecycle,/Configuration writes remain disabled/)});
test("integrates controlled discovery and dependency impact assurance",async()=>{const [page,discovery,schema]=await Promise.all([readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),readFile(new URL("../app/discovery-dependencies.tsx",import.meta.url),"utf8"),readFile(new URL("../db/schema.ts",import.meta.url),"utf8")]);assert.match(page,/"Discovery & Dependencies":\s*\{\s*slug:\s*"discovery-dependencies"/i);assert.match(page,/<DiscoveryDependencies\s*\/>/i);assert.match(discovery,/MODULE 41 · DISCOVERY & DEPENDENCY ASSURANCE/i);assert.match(discovery,/No broad subnet sweep is permitted/i);assert.match(discovery,/MikroTik and Ubiquiti probes remain disabled until next week/i);assert.match(discovery,/Network configuration writes remain disabled/i);assert.match(schema,/discoveryScopes = sqliteTable/i);assert.match(schema,/discoveryEvidence = sqliteTable/i);assert.match(schema,/topologyDependencies = sqliteTable/i)});

test("integrates the network automation module and its safety controls", async () => {
  const [page, automation] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/automation.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Automation:\s*\{\s*slug:\s*"automation"/i);
  assert.match(page, /<NetworkAutomation\s*\/>/i);
  assert.match(automation, /MODULE 12 · CONTROLLED AUTOMATION/i);
  assert.match(automation, /Two-person control enforced/i);
  assert.match(automation, /Automatic rollback/i);
  assert.match(automation, /Approval request created/i);
});

test("integrates the evidence-backed NOC copilot", async () => {
  const [page, copilot] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/copilot.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Copilot:\s*\{\s*slug:\s*"copilot"/i);
  assert.match(page, /<NocCopilot\s*\/>/i);
  assert.match(copilot, /MODULE 13 · ASSISTED OPERATIONS/i);
  assert.match(copilot, /Human review required/i);
  assert.match(copilot, /Copilot cannot execute network changes/i);
  assert.match(copilot, /Answers use linked NOCX evidence only/i);
});

test("integrates governed maintenance windows and safe alert suppression", async () => {
  const [page, maintenance] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/maintenance.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Maintenance:\s*\{\s*slug:\s*"maintenance"/i);
  assert.match(page, /<MaintenanceWindows\s*\/>/i);
  assert.match(maintenance, /MODULE 21 · PLANNED WORK/i);
  assert.match(maintenance, /No global muting allowed/i);
  assert.match(maintenance, /collector-health alerts remain active/i);
  assert.match(maintenance, /Network execution remains disabled/i);
});

test("integrates accountable shift handover and immutable duty evidence", async () => {
  const [page, handover] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/handover.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Handover:\s*\{\s*slug:\s*"handover"/i);
  assert.match(page, /<ShiftHandover\s*\/>/i);
  assert.match(handover, /MODULE 22 · OPERATIONAL CONTINUITY/i);
  assert.match(handover, /Accept operational responsibility/i);
  assert.match(handover, /linked to its source incident/i);
  assert.match(handover, /Accepted handovers are immutable/i);
});

test("integrates governed post-incident reviews and corrective action evidence", async () => {
  const [page, reviews] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/postmortems.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Reviews:\s*\{\s*slug:\s*"post-incident-reviews"/i);
  assert.match(page, /<PostIncidentReview\s*\/>/i);
  assert.match(reviews, /MODULE 24 · CONTINUOUS IMPROVEMENT/i);
  assert.match(reviews, /Validated root cause/i);
  assert.match(reviews, /Evidence is append-only after approval/i);
  assert.match(reviews, /Closing an action requires verification evidence/i);
});

test("integrates recurring problem management and known-error governance", async () => {
  const [page, problems] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/problems.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Problems:\s*\{\s*slug:\s*"problem-management"/i);
  assert.match(page, /<ProblemManagement\s*\/>/i);
  assert.match(problems, /MODULE 25 · PROBLEM MANAGEMENT/i);
  assert.match(problems, /KNOWN ERROR DATABASE/i);
  assert.match(problems, /Workarounds are guidance, not automatic changes/i);
  assert.match(problems, /permanent fix is verified/i);
});

test("integrates the governed network data source hub", async () => {
  const [page, integrations] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/integrations.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /"Data Sources":\s*\{\s*slug:\s*"data-sources"/i);
  assert.match(page, /<DataIntegrations\s*\/>/i);
  assert.match(integrations, /MODULE 14 · CONNECTED INFRASTRUCTURE/i);
  assert.match(integrations, /Seed mode is active/i);
  assert.match(
    integrations,
    /No controller or device credentials are requested or stored/i,
  );
  assert.match(integrations, /Protected credential handling/i);
});

test("integrates asset lifecycle, spares and replacement governance", async () => {
  const [page, assets] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/assets.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Assets:\s*\{\s*slug:\s*"asset-lifecycle"/i);
  assert.match(page, /<AssetLifecycle\s*\/>/i);
  assert.match(assets, /MODULE 15 · PHYSICAL ESTATE/i);
  assert.match(assets, /Asset lifecycle & spares/i);
  assert.match(assets, /Critical spares inventory/i);
  assert.match(assets, /Warranty & RMA register/i);
  assert.match(assets, /Lifecycle replacement plan/i);
  assert.match(assets, /Reconcile devices/i);
});

test("integrates governed IPAM and logical network resources", async () => {
  const [page, ipam] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ipam.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /IPAM:\s*\{\s*slug:\s*"ipam"/i);
  assert.match(page, /<NetworkIpam\s*\/>/i);
  assert.match(ipam, /MODULE 16 · LOGICAL NETWORK ESTATE/i);
  assert.match(ipam, /Prefix registry/i);
  assert.match(ipam, /Address pools & DHCP/i);
  assert.match(ipam, /VLAN & VRF assignments/i);
  assert.match(ipam, /Duplicate ARP ownership/i);
  assert.match(ipam, /Seed workflow · no live device configuration is changed/i);
});

test("integrates circuit, provider and peering governance", async () => {
  const [page, circuits] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/circuits.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Circuits:\s*\{\s*slug:\s*"circuits"/i);
  assert.match(page, /<CircuitProviderManagement\s*\/>/i);
  assert.match(circuits, /MODULE 17 · EXTERNAL CONNECTIVITY/i);
  assert.match(circuits, /Circuit & provider register/i);
  assert.match(circuits, /Peering & transit health/i);
  assert.match(circuits, /Contract & renewal risks/i);
  assert.match(circuits, /Seed workflow · no provider ticket is submitted/i);
});

test("integrates governed firmware and configuration compliance", async () => {
  const [page, firmware] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/firmware.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Firmware:\s*\{\s*slug:\s*"firmware"/i);
  assert.match(page, /<FirmwareCompliance\s*\/>/i);
  assert.match(firmware, /MODULE 18 · PLATFORM HYGIENE/i);
  assert.match(firmware, /Upgrade campaigns & rollout waves/i);
  assert.match(firmware, /Configuration & firmware controls/i);
  assert.match(firmware, /Compliance exceptions/i);
  assert.match(firmware, /Seed workflow · no live device is upgraded/i);
});

test("integrates governed service provisioning and activation", async () => {
  const [page, provisioning] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/provisioning.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Provisioning:\s*\{\s*slug:\s*"provisioning"/i);
  assert.match(page, /<ServiceProvisioning\s*\/>/i);
  assert.match(provisioning, /MODULE 19 · CONTROLLED SERVICE DELIVERY/i);
  assert.match(provisioning, /Vendor provisioning templates/i);
  assert.match(provisioning, /Suspend, restore & terminate services/i);
  assert.match(provisioning, /Failure triggers automatic rollback/i);
  assert.match(provisioning, /Seed workflow · no live network configuration is changed/i);
});

test("integrates the persistent production platform foundation", async () => {
  const [page, platform, schema, route, hosting] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/platform.tsx", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/platform/status/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Platform:\s*\{\s*slug:\s*"platform"/i);
  assert.match(page, /<PlatformFoundation\s*\/>/i);
  assert.match(platform, /PHASE 2 · PRODUCTION FOUNDATION/i);
  assert.match(platform, /Live device credentials and network writes remain disabled/i);
  assert.match(schema, /sqliteTable\("devices"/i);
  assert.match(schema, /sqliteTable\("audit_events"/i);
  assert.match(route, /authorizeRequest\(request,"platform\.read"\)/i);
  assert.equal(JSON.parse(hosting).d1, "DB");
});

test("adds a guarded Cudy availability ingestion boundary", async () => {
  const [route, schema, platform] = await Promise.all([
    readFile(new URL("../app/api/collector/v1/availability/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/platform.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(route, /NOCX_COLLECTOR_TOKEN/);
  assert.match(route, /Payload validation failed/);
  assert.match(route, /networkWrites:false/);
  assert.match(route, /device-cudy-lt400-pilot/);
  assert.match(schema, /sqliteTable\("availability_samples"/);
  assert.match(schema, /sqliteTable\("collectors"/);
  assert.match(platform, /Cudy LT400 is/);
  assert.match(platform, /24H AVAILABILITY/);
  assert.match(platform, /Outage history/);
  assert.match(route, /availabilitySamples/);
});

test("automatically opens and resolves Cudy incidents after confirmed probe state", async () => {
  const route = await readFile(new URL("../app/api/collector/v1/availability/route.ts", import.meta.url), "utf8");
  const alerts = await readFile(new URL("../app/alerts-incidents.tsx", import.meta.url), "utf8");
  assert.match(route, /FAILURE_THRESHOLD\s*=\s*3/);
  assert.match(route, /incidentAction=.*opened/s);
  assert.match(route, /incidentAction=.*resolved/s);
  assert.match(route, /status:\s*"resolved"/);
  assert.match(alerts, /Live Cudy incidents/);
  assert.match(alerts, /setInterval\(load,2000\)/);
});

test("creates durable deduplicated outage and recovery notifications", async () => {
  const [route,schema,center,api]=await Promise.all([
    readFile(new URL("../app/api/collector/v1/availability/route.ts",import.meta.url),"utf8"),
    readFile(new URL("../db/schema.ts",import.meta.url),"utf8"),
    readFile(new URL("../app/notification-center.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/api/notifications/route.ts",import.meta.url),"utf8"),
  ]);
  assert.match(schema,/sqliteTable\("notifications"/);
  assert.match(schema,/notification_incident_kind_unique/);
  assert.match(route,/kind:"opened"/);
  assert.match(route,/kind:"resolved"/);
  assert.match(route,/onConflictDoNothing/);
  assert.match(center,/setInterval\(load,2000\)/);
  assert.match(center,/Mark all as read/);
  assert.match(api,/authorizeRequest\(request,"platform\.read"\)/);
  assert.match(api,/authorizeRequest\(request,"incidents\.manage"\)/);
});

test("chunks full MikroTik performance samples below the D1 parameter limit", async () => {
  const route = await readFile(new URL("../app/api/collector/v1/mikrotik/route.ts", import.meta.url), "utf8");
  assert.match(route, /MAX_METRICS=100/);
  assert.match(route, /METRIC_INSERT_CHUNK_SIZE=8/);
  assert.match(route, /normalized\.slice\(i,i\+METRIC_INSERT_CHUNK_SIZE\)/);
  assert.match(route, /db\.insert\(metricSamples\)\.values\(chunk\.map/);
  assert.doesNotMatch(route, /db\.insert\(metricSamples\)\.values\(normalized\.map/);
});

test("integrates live customer and service monitoring", async () => {
  const [page,customers,route]=await Promise.all([
    readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/customers.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/api/platform/customer-services/route.ts",import.meta.url),"utf8"),
  ]);
  assert.match(page,/Customers:\s*\{\s*slug:\s*"customers"/i);
  assert.match(page,/<CustomerServiceMonitoring\s*\/>/i);
  assert.match(customers,/SERVICE ONBOARDING & SLA POLICY/i);
  assert.match(customers,/api\/platform\/customer-services/i);
  assert.match(customers,/15_000/);
  assert.match(customers,/Customer health score/i);
  assert.match(customers,/Approved service dependency path/i);
  assert.match(customers,/observation window/i);
  assert.doesNotMatch(customers,/Simulated telemetry/i);
  assert.match(route,/authorizeRequest\(request, "platform\.read"\)/);
  assert.match(route,/automaticIncidentCorrelation: true/);
  assert.match(route,/networkWrites: false/);
});

test("adds SLA and uptime reporting workspace", async () => {
  const reports=await readFile(new URL("../app/reports.tsx",import.meta.url),"utf8");
  assert.match(reports,/SLA & Uptime/);
  assert.match(reports,/Customer SLA & uptime reporting/);
  assert.match(reports,/BREACH EVIDENCE REGISTER/);
  assert.match(reports,/Simulated reporting dataset/);
  assert.match(reports,/Export evidence/);
});

test("adds capacity and performance reporting workspace", async () => {
  const reports=await readFile(new URL("../app/reports.tsx",import.meta.url),"utf8");
  assert.match(reports,/Capacity & Performance/);
  assert.match(reports,/Capacity & performance intelligence/);
  assert.match(reports,/24-HOUR DEMAND/);
  assert.match(reports,/LINK PERFORMANCE REGISTER/);
  assert.match(reports,/Simulated performance dataset/);
  assert.match(reports,/Export plan/);
});

test("adds an isolated telemetry simulation lab", async () => {
  const [page,lab]=await Promise.all([
    readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/simulation-lab.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(page,/Simulation Lab/);
  assert.match(page,/<TelemetrySimulationLab\s*\/>/);
  assert.match(lab,/Isolated from production/);
  assert.match(lab,/Three failed probes trigger the incident lifecycle/);
  assert.match(lab,/Network writes/);
  assert.match(lab,/Run scenario/);
  assert.match(lab,/Recent simulation runs/);
});

test("integrates on-call ownership and escalation evidence", async () => {
  const [page,onCall]=await Promise.all([
    readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/on-call.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(page,/"On Call":\s*\{\s*slug:\s*"on-call"/);
  assert.match(page,/<OnCallEscalation\s*\/>/);
  assert.match(onCall,/CURRENT DUTY ROSTER/);
  assert.match(onCall,/Escalation ladder/);
  assert.match(onCall,/5-minute acknowledgement/);
  assert.match(onCall,/RESPONSE EVIDENCE/);
  assert.match(onCall,/does not place external calls/);
});

test("adds a governed operations knowledge base", async () => {
  const [page,knowledge]=await Promise.all([
    readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/knowledge.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(page,/Knowledge:\s*\{\s*slug:\s*"knowledge-base"/);
  assert.match(page,/<KnowledgeBase\s*\/>/);
  assert.match(knowledge,/CONTROLLED ARTICLE LIBRARY/);
  assert.match(knowledge,/Approved restoration procedure/);
  assert.match(knowledge,/Linked evidence/);
  assert.match(knowledge,/Guidance does not authorize network changes/);
  assert.match(knowledge,/PUBLICATION GOVERNANCE/);
});

test("adds evidence-preserving event correlation", async () => {
  const [page,correlation]=await Promise.all([
    readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/event-correlation.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(page,/Correlation:\s*\{\s*slug:\s*"event-correlation"/);
  assert.match(page,/<EventCorrelation\s*\/>/);
  assert.match(correlation,/CORRELATED EVENT QUEUE/);
  assert.match(correlation,/ROOT-CAUSE EVIDENCE/);
  assert.match(correlation,/Dependency path/);
  assert.match(correlation,/Every grouped alert remains individually searchable and auditable/);
  assert.match(correlation,/never closes an incident or changes a device automatically/);
});

test("adds governed major incident command", async () => {
  const [page,major]=await Promise.all([readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),readFile(new URL("../app/major-incidents.tsx",import.meta.url),"utf8")]);
  assert.match(page,/"Major Incidents":\s*\{\s*slug:\s*"major-incidents"/);
  assert.match(page,/<MajorIncidentCommand\s*\/>/);
  assert.match(major,/MAJOR INCIDENT REGISTER/);
  assert.match(major,/Incident commander/);
  assert.match(major,/Decision log/);
  assert.match(major,/Every decision, status update and role transfer remains time-stamped and auditable/);
  assert.match(major,/Closure requires service restoration evidence and a linked post-incident review/);
});

test("adds governed service communications without external delivery", async () => {
  const [page,communications]=await Promise.all([
    readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/service-communications.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(page,/Communications:\s*\{\s*slug:\s*"service-communications"/);
  assert.match(page,/<ServiceCommunications\s*\/>/);
  assert.match(communications,/COMMUNICATION REGISTER/);
  assert.match(communications,/Customer-safe update/);
  assert.match(communications,/Technical facts must match the linked major-incident record/);
  assert.match(communications,/External email, SMS, WhatsApp and Slack delivery remain disabled/);
});

test("adds evidence-gated service restoration assurance", async () => {
  const [page,restoration]=await Promise.all([
    readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/restoration-assurance.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(page,/Restoration:\s*\{\s*slug:\s*"restoration-assurance"/);
  assert.match(page,/<RestorationAssurance\s*\/>/);
  assert.match(restoration,/RESTORATION QUEUE/);
  assert.match(restoration,/Closure gates/);
  assert.match(restoration,/Customer-impact records and support cases must be cleared/);
  assert.match(restoration,/A failed gate keeps the incident open and preserves the tested rollback path/);
});

test("gates real MikroTik and Ubiquiti activation on device-matched OID evidence",async()=>{const [adapter,lifecycle]=await Promise.all([readFile(new URL("../examples/multi-vendor-collector/collector.py",import.meta.url),"utf8"),readFile(new URL("../app/data-lifecycle.tsx",import.meta.url),"utf8")]);assert.match(adapter,/--verify-oids/);assert.match(adapter,/ACTIVATION_APPROVED/);assert.match(adapter,/OID_VALIDATION_FILE/);assert.match(adapter,/evidence.get\("address"\)!=TARGET/);assert.match(adapter,/expected_metrics\.issubset/);assert.match(adapter,/OID validation evidence does not approve this device/);assert.match(lifecycle,/MODULE 40 · MULTI-VENDOR ACTIVATION READINESS/);assert.match(lifecycle,/Registration & OID verification gate/);assert.match(lifecycle,/Wireless identity & RF metric verification gate/);assert.match(lifecycle,/Signal, noise and CCQ GET checks/);assert.match(lifecycle,/exact device ID, vendor, address and approved RF metric set/);assert.match(lifecycle,/NOT ACTIVATED/);assert.match(lifecycle,/A missing or mismatched record stops the adapter before polling begins/)});

test("adds durable collector queues and fail-closed takeover controls",async()=>{const [schema,resilience,screen]=await Promise.all([readFile(new URL("../db/schema.ts",import.meta.url),"utf8"),readFile(new URL("../db/collector-resilience.ts",import.meta.url),"utf8"),readFile(new URL("../app/collector-management.tsx",import.meta.url),"utf8")]);assert.match(schema,/collector_leases/);assert.match(schema,/collector_queue_checkpoints/);assert.match(schema,/collector_failover_events/);assert.match(resilience,/split-brain protection blocked takeover/);assert.match(resilience,/replayFromSequence/);assert.match(screen,/COLLECTOR RESILIENCE/);assert.match(screen,/Durable spool enabled/);assert.match(screen,/Lease \+ fencing token/);assert.match(screen,/Automatic takeover remains disabled/);assert.match(screen,/live Cudy path is unchanged/)});
test("adds evidence-backed backup recovery and NOCX self-monitoring",async()=>{const [page,schema,screen]=await Promise.all([readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),readFile(new URL("../db/schema.ts",import.meta.url),"utf8"),readFile(new URL("../app/platform-resilience.tsx",import.meta.url),"utf8")]);assert.match(page,/"Platform Resilience":\s*\{\s*slug:\s*"platform-resilience"/);assert.match(page,/<PlatformResilience\s*\/>/);assert.match(schema,/backup_runs/);assert.match(schema,/restore_exercises/);assert.match(schema,/platform_health_checks/);assert.match(screen,/PLATFORM RESILIENCE/);assert.match(screen,/RESTORE ASSURANCE/);assert.match(screen,/NOCX SELF-MONITORING/);assert.match(screen,/Automatic production restore remains disabled/);assert.match(screen,/No MikroTik or Ubiquiti probe is enabled/)});
test("adds fail-closed security and production readiness assurance",async()=>{const [page,schema,screen,worker]=await Promise.all([readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),readFile(new URL("../db/schema.ts",import.meta.url),"utf8"),readFile(new URL("../app/production-readiness.tsx",import.meta.url),"utf8"),readFile(new URL("../worker/index.ts",import.meta.url),"utf8")]);assert.match(page,/"Production Readiness":\s*\{\s*slug:\s*"production-readiness"/);assert.match(page,/<ProductionReadiness\s*\/>/);assert.match(schema,/rate_limit_policies/);assert.match(schema,/security_control_evidence/);assert.match(schema,/failure_exercises/);assert.match(schema,/readiness_decisions/);assert.match(worker,/Request rate exceeded/);assert.match(worker,/x-content-type-options/);assert.match(worker,/strict-transport-security/);assert.match(screen,/PRODUCTION READINESS/);assert.match(screen,/REQUEST PROTECTION/);assert.match(screen,/CONTROLLED FAILURE TESTING/);assert.match(screen,/Production approval remains fail-closed/);assert.match(screen,/MikroTik and Ubiquiti probes remain paused/);assert.match(screen,/Network configuration writes remain disabled/)});
test("adds evidence-gated MikroTik and Ubiquiti commissioning runbooks",async()=>{const [page,schema,screen]=await Promise.all([readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),readFile(new URL("../db/schema.ts",import.meta.url),"utf8"),readFile(new URL("../app/device-commissioning.tsx",import.meta.url),"utf8")]);assert.match(page,/Commissioning:\s*\{\s*slug:\s*"device-commissioning"/);assert.match(page,/<DeviceCommissioning\s*\/>/);assert.match(schema,/commissioning_plans/);assert.match(schema,/commissioning_evidence/);assert.match(schema,/commissioning_decisions/);assert.match(screen,/MODULE 44 · DEVICE COMMISSIONING/);assert.match(screen,/COMMISSIONING RUNBOOK/);assert.match(screen,/GO \/ NO-GO GATE/);assert.match(screen,/ABORT & RECOVERY/);assert.match(screen,/Every probe stays paused/);assert.match(screen,/No network configuration is changed/)});
test("adds metadata-only credential references and rotation assurance",async()=>{const [page,schema,screen,route]=await Promise.all([readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),readFile(new URL("../db/schema.ts",import.meta.url),"utf8"),readFile(new URL("../app/credential-assurance.tsx",import.meta.url),"utf8"),readFile(new URL("../app/api/platform/credentials/route.ts",import.meta.url),"utf8")]);assert.match(page,/"Credential Assurance":\s*\{\s*slug:\s*"credential-assurance"/);assert.match(page,/<CredentialAssurance\s*\/>/);assert.match(schema,/credential_references/);assert.match(schema,/credential_validation_evidence/);assert.match(schema,/credential_rotation_events/);assert.match(screen,/MODULE 45 · CREDENTIAL ASSURANCE/);assert.match(screen,/PROTECTED REFERENCE REGISTER/);assert.match(screen,/COMMISSIONING CREDENTIAL GATE/);assert.match(screen,/Secret values never enter the interface/);assert.match(screen,/MikroTik and Ubiquiti probes remain paused/);assert.match(route,/Secret values are not accepted by NOCX/);assert.match(route,/secretValuesStored:\s*false/);assert.match(route,/authorizeRequest\(request, "platform.admin"\)/);assert.match(route,/networkWrites:\s*false/)});
