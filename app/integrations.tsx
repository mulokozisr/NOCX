"use client";

import {
  Activity,
  Antenna,
  Braces,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  Cloud,
  Database,
  Gauge,
  Globe2,
  KeyRound,
  Network,
  Pause,
  Play,
  PlugZap,
  Plus,
  Radio,
  RefreshCw,
  Router,
  Search,
  Server,
  Settings2,
  ShieldCheck,
  Signal,
  SlidersHorizontal,
  SquareTerminal,
  Workflow,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type IntegrationTab = "Overview" | "Connectors" | "Collectors" | "Event Streams" | "Data Mappings";
type ConnectorStatus = "Connected" | "Degraded" | "Not configured";
type CollectorStatus = "Healthy" | "Degraded" | "Offline";

type Connector = {
  id: string;
  name: string;
  vendor: string;
  kind: "Router API" | "Controller API" | "Telemetry" | "Event ingestion" | "Flow analytics";
  status: ConnectorStatus;
  endpoint: string;
  targets: number;
  metrics: string;
  lastSync: string;
  health: number;
  auth: string;
  collector: string;
  detail: string;
  capabilities: string[];
};

type Collector = {
  id: string;
  name: string;
  region: string;
  address: string;
  status: CollectorStatus;
  targets: number;
  events: string;
  queue: number;
  latency: string;
  cpu: number;
  memory: number;
  version: string;
  lastCheck: string;
};

type Stream = {
  id: string;
  name: string;
  source: string;
  protocol: string;
  events: string;
  queue: number;
  latency: string;
  state: "Streaming" | "Paused" | "Delayed";
  destination: string;
};

const connectorSeed: Connector[] = [
  { id: "CON-201", name: "MikroTik RouterOS API", vendor: "MikroTik", kind: "Router API", status: "Connected", endpoint: "api.nocx.internal:8729", targets: 126, metrics: "4,820 metrics / min", lastSync: "7 seconds ago", health: 99, auth: "TLS certificate + service account", collector: "Primary Collector", detail: "RouterOS device inventory, interfaces, routing, queues, system health and controlled configuration operations.", capabilities: ["Device discovery", "Interfaces and queues", "BGP and routes", "Configuration backup", "Safe command execution"] },
  { id: "CON-202", name: "UISP Network API", vendor: "Ubiquiti", kind: "Controller API", status: "Connected", endpoint: "uisp.zannet.internal/api/v2.1", targets: 184, metrics: "6,340 metrics / min", lastSync: "5 seconds ago", health: 100, auth: "Scoped API token", collector: "Primary Collector", detail: "AirMAX and AirFiber inventory, RF telemetry, link capacity, outages and firmware state from UISP.", capabilities: ["AirMAX discovery", "AirFiber telemetry", "RF and modulation", "Link capacity", "Outage synchronization"] },
  { id: "CON-203", name: "UniFi Network", vendor: "Ubiquiti", kind: "Controller API", status: "Connected", endpoint: "unifi.nocx.internal", targets: 72, metrics: "2,180 metrics / min", lastSync: "12 seconds ago", health: 98, auth: "Local API service account", collector: "Urban West Collector", detail: "UniFi gateways, switches, access points, clients, WLAN health and controller events.", capabilities: ["Site inventory", "AP and switch health", "Client sessions", "WLAN experience", "Controller alarms"] },
  { id: "CON-204", name: "TP-Link Omada", vendor: "TP-Link", kind: "Controller API", status: "Degraded", endpoint: "omada.nocx.internal:8043", targets: 38, metrics: "940 metrics / min", lastSync: "49 seconds ago", health: 83, auth: "Controller client credentials", collector: "South Collector", detail: "Omada gateways, switches, EAPs, wireless clients and controller alarms. Session refresh latency is elevated.", capabilities: ["Site inventory", "EAP telemetry", "Client sessions", "Portal events", "Adoption status"] },
  { id: "CON-205", name: "SNMP Polling", vendor: "Multi-vendor", kind: "Telemetry", status: "Connected", endpoint: "UDP 161 · v2c/v3", targets: 486, metrics: "3,420 metrics / min", lastSync: "8 seconds ago", health: 99, auth: "SNMPv3 profiles + protected v2c", collector: "All collectors", detail: "Multi-vendor polling for MikroTik, D-Link, TP-Link, UPS, environmental sensors and managed switches.", capabilities: ["Standard MIB polling", "Vendor MIB profiles", "Interface counters", "Environmental sensors", "SNMP traps"] },
  { id: "CON-206", name: "ICMP & TCP Probes", vendor: "NOCX", kind: "Telemetry", status: "Connected", endpoint: "Distributed probes", targets: 512, metrics: "512 checks / 30 sec", lastSync: "4 seconds ago", health: 100, auth: "No device credentials", collector: "All collectors", detail: "Distributed availability, latency, packet-loss and service-port probes from each regional collector.", capabilities: ["Reachability", "Latency and loss", "TCP service checks", "Regional path comparison", "Dependency suppression"] },
  { id: "CON-207", name: "Syslog Ingestion", vendor: "Multi-vendor", kind: "Event ingestion", status: "Degraded", endpoint: "UDP/TCP/TLS 514", targets: 229, metrics: "8,960 events / min", lastSync: "31 seconds ago", health: 86, auth: "mTLS for protected sources", collector: "South Collector", detail: "Central structured event ingestion with vendor parsing, deduplication and incident correlation.", capabilities: ["RFC 5424 ingestion", "Vendor parsers", "Deduplication", "Severity mapping", "Incident correlation"] },
  { id: "CON-208", name: "NetFlow / IPFIX", vendor: "Multi-vendor", kind: "Flow analytics", status: "Not configured", endpoint: "UDP 2055 / 4739", targets: 0, metrics: "Awaiting exporters", lastSync: "Never", health: 0, auth: "Source allowlist", collector: "Primary Collector", detail: "Traffic-flow visibility for top talkers, application mix, transit analysis and capacity evidence.", capabilities: ["NetFlow v5/v9", "IPFIX", "Top talkers", "Application mix", "Transit utilization"] },
];

const collectors: Collector[] = [
  { id: "COL-01", name: "Primary Collector", region: "Stone Town · Core", address: "10.10.2.11", status: "Healthy", targets: 486, events: "12,640 / min", queue: 64, latency: "1.4 sec", cpu: 38, memory: 57, version: "v2.8.4", lastCheck: "6 seconds ago" },
  { id: "COL-02", name: "North Collector", region: "Nungwi · North", address: "10.12.2.11", status: "Healthy", targets: 128, events: "3,280 / min", queue: 41, latency: "2.1 sec", cpu: 29, memory: 48, version: "v2.8.4", lastCheck: "9 seconds ago" },
  { id: "COL-03", name: "South Collector", region: "Paje · South East", address: "10.13.2.11", status: "Degraded", targets: 104, events: "2,140 / min", queue: 179, latency: "8.7 sec", cpu: 72, memory: 81, version: "v2.8.3", lastCheck: "28 seconds ago" },
  { id: "COL-04", name: "Urban West Collector", region: "Fumba · West", address: "10.14.2.11", status: "Healthy", targets: 96, events: "1,420 / min", queue: 0, latency: "1.8 sec", cpu: 22, memory: 42, version: "v2.8.4", lastCheck: "11 seconds ago" },
];

const streamSeed: Stream[] = [
  { id: "STR-901", name: "Device telemetry", source: "SNMP + vendor APIs", protocol: "Normalized metrics", events: "11,720 / min", queue: 42, latency: "1.8 sec", state: "Streaming", destination: "Real-Time Monitoring" },
  { id: "STR-902", name: "Network events", source: "Syslog + SNMP traps", protocol: "Structured events", events: "5,940 / min", queue: 179, latency: "8.7 sec", state: "Delayed", destination: "Alerts & Incidents" },
  { id: "STR-903", name: "Customer sessions", source: "RouterOS + controller APIs", protocol: "Session updates", events: "428 / min", queue: 18, latency: "2.4 sec", state: "Streaming", destination: "Customers & Services" },
  { id: "STR-904", name: "Configuration changes", source: "RouterOS + archive", protocol: "Versioned snapshots", events: "24 / hour", queue: 0, latency: "4.1 sec", state: "Streaming", destination: "Backups & Changes" },
  { id: "STR-905", name: "Security signals", source: "Auth + device events", protocol: "Security findings", events: "186 / min", queue: 7, latency: "2.9 sec", state: "Streaming", destination: "Security Operations" },
  { id: "STR-906", name: "Flow analytics", source: "NetFlow / IPFIX", protocol: "Flow records", events: "0 / min", queue: 0, latency: "—", state: "Paused", destination: "Performance & Capacity" },
];

const mappings = [
  { name: "MikroTik Router", source: "RouterOS API + SNMP", target: "NOCX network_device", fields: 42, coverage: 98, state: "Validated", updated: "Today · 10:42", examples: ["identity → device.name", "board-name → device.model", "routerboard.serial-number → device.serial"] },
  { name: "Ubiquiti AirMAX / AirFiber", source: "UISP Network API", target: "NOCX wireless_link", fields: 51, coverage: 100, state: "Validated", updated: "Today · 09:18", examples: ["signal → rf.signal_dbm", "txCapacity → link.tx_capacity", "airtime → rf.airtime_utilization"] },
  { name: "UniFi Access Point", source: "UniFi Network API", target: "NOCX access_point", fields: 37, coverage: 96, state: "Validated", updated: "Yesterday · 18:05", examples: ["name → device.name", "num_sta → ap.client_count", "satisfaction → ap.experience_score"] },
  { name: "Omada EAP", source: "Omada Controller API", target: "NOCX access_point", fields: 34, coverage: 89, state: "Review", updated: "Yesterday · 16:41", examples: ["deviceName → device.name", "clientNum → ap.client_count", "channelUtilization → rf.channel_utilization"] },
  { name: "Generic SNMP Interface", source: "IF-MIB", target: "NOCX network_interface", fields: 28, coverage: 100, state: "Validated", updated: "17 Jul · 14:22", examples: ["ifName → interface.name", "ifHCInOctets → traffic.bytes_in", "ifOperStatus → interface.oper_status"] },
  { name: "Structured Syslog Event", source: "RFC 5424 + vendor parser", target: "NOCX event", fields: 31, coverage: 94, state: "Validated", updated: "17 Jul · 12:08", examples: ["severity → event.severity", "app-name → event.source", "message → event.summary"] },
];

const eventBars = [42, 58, 49, 67, 62, 76, 69, 84, 79, 92, 86, 96, 82, 88, 91, 85, 94, 89];

function slug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-");
}

function ConnectorIcon({ connector, size = 17 }: { connector: Connector; size?: number }) {
  if (connector.vendor === "MikroTik") return <Router size={size} />;
  if (connector.name.includes("UISP") || connector.name.includes("UniFi")) return <Antenna size={size} />;
  if (connector.name.includes("Omada")) return <Radio size={size} />;
  if (connector.name.includes("SNMP")) return <Network size={size} />;
  if (connector.name.includes("ICMP")) return <Activity size={size} />;
  if (connector.name.includes("Syslog")) return <SquareTerminal size={size} />;
  return <Signal size={size} />;
}

export default function DataIntegrations() {
  const [tab, setTab] = useState<IntegrationTab>("Overview");
  const [connectors, setConnectors] = useState(connectorSeed);
  const [streams, setStreams] = useState(streamSeed);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [kind, setKind] = useState("All types");
  const [selected, setSelected] = useState<Connector | null>(null);
  const [testing, setTesting] = useState("");
  const [setupOpen, setSetupOpen] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [setupType, setSetupType] = useState("MikroTik RouterOS API");
  const [notice, setNotice] = useState("");

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };

  const filteredConnectors = useMemo(() => connectors.filter((item) => {
    const match = `${item.id} ${item.name} ${item.vendor} ${item.kind} ${item.endpoint}`.toLowerCase().includes(query.toLowerCase());
    return match && (status === "All statuses" || item.status === status) && (kind === "All types" || item.kind === kind);
  }), [connectors, query, status, kind]);

  const changeTab = (next: IntegrationTab) => {
    setTab(next);
    setQuery("");
    setStatus("All statuses");
    setKind("All types");
  };

  const testConnection = (connector: Connector) => {
    setTesting(connector.id);
    window.setTimeout(() => {
      setTesting("");
      notify(`${connector.name} passed endpoint, authentication and schema checks.`);
    }, 850);
  };

  const toggleStream = (stream: Stream) => {
    setStreams((items) => items.map((item) => item.id === stream.id ? { ...item, state: item.state === "Paused" ? "Streaming" : "Paused" } : item));
    notify(`${stream.name} ${stream.state === "Paused" ? "resumed" : "paused"} in seed mode.`);
  };

  const activateSeedConnector = () => {
    const existing = connectors.find((item) => item.name.includes("NetFlow"));
    if (setupType === "NetFlow / IPFIX" && existing) {
      setConnectors((items) => items.map((item) => item.id === existing.id ? { ...item, status: "Connected", health: 100, lastSync: "Just now", metrics: "Seed exporter ready" } : item));
    }
    setSetupOpen(false);
    setSetupStep(1);
    changeTab("Connectors");
    notify(`${setupType} seed connector activated. Add real credentials when the backend is ready.`);
  };

  return <main className="datahub-page">
    <section className="datahub-hero">
      <div><p className="eyebrow">MODULE 14 · CONNECTED INFRASTRUCTURE</p><h2>Data sources & integrations</h2><p>Connect controllers, devices and regional collectors to a governed telemetry pipeline built for ISP operations.</p></div>
      <div className="datahub-actions"><button className="secondary-button" onClick={() => notify("All connector health checks have been queued.")}><RefreshCw size={15} />Test all</button><button className="primary-button" onClick={() => { setSetupOpen(true); setSetupStep(1); }}><Plus size={15} />Add integration</button></div>
    </section>

    <section className="datahub-summary" aria-label="Integration summary">
      <button onClick={() => changeTab("Connectors")}><span className="datahub-stat stat-blue"><PlugZap size={19} /></span><span><small>Active connectors</small><strong>7 / 8</strong><em>2 reporting degraded health</em></span></button>
      <button onClick={() => changeTab("Collectors")}><span className="datahub-stat stat-green"><Server size={19} /></span><span><small>Managed targets</small><strong>486</strong><em>Across 4 regional collectors</em></span></button>
      <button onClick={() => changeTab("Event Streams")}><span className="datahub-stat stat-violet"><Activity size={19} /></span><span><small>Events per minute</small><strong>18,420</strong><em>Telemetry and network events</em></span></button>
      <button onClick={() => changeTab("Event Streams")}><span className="datahub-stat stat-green"><Clock3 size={19} /></span><span><small>Median data latency</small><strong>2.8 sec</strong><em>Target under 5 seconds</em></span></button>
      <button onClick={() => changeTab("Collectors")}><span className="datahub-stat stat-amber"><Database size={19} /></span><span><small>Queue depth</small><strong>284</strong><em>179 events in South region</em></span></button>
    </section>

    <nav className="datahub-tabs" aria-label="Data integration sections">{(["Overview", "Connectors", "Collectors", "Event Streams", "Data Mappings"] as const).map((item) => <button key={item} className={tab === item ? "datahub-tab-active" : ""} onClick={() => changeTab(item)}>{item}{item === "Connectors" && <span>{connectors.length}</span>}{item === "Collectors" && <span>{collectors.length}</span>}</button>)}</nav>

    {tab === "Overview" && <>
      <section className="datahub-overview-grid">
        <article className="panel connector-estate-panel"><div className="panel-heading"><div><span className="panel-kicker">CONNECTOR ESTATE</span><h3>Network data sources</h3></div><button className="text-button" onClick={() => changeTab("Connectors")}>Manage connectors</button></div><div className="connector-estate-grid">{connectors.map((connector) => <button key={connector.id} onClick={() => setSelected(connector)}><span className={`connector-vendor-icon connector-${slug(connector.status)}`}><ConnectorIcon connector={connector} /></span><span><small>{connector.vendor}</small><strong>{connector.name}</strong><em>{connector.targets || "No"} targets · {connector.lastSync}</em></span><span className={`connector-dot dot-${slug(connector.status)}`} title={connector.status} /></button>)}</div></article>
        <article className="panel ingestion-chart-panel"><div className="panel-heading"><div><span className="panel-kicker">LAST 90 MINUTES</span><h3>Ingestion throughput</h3></div><span className="ingestion-live"><i />Live</span></div><div className="ingestion-metrics"><span><small>Current</small><strong>18.4k/min</strong></span><span><small>Peak</small><strong>21.1k/min</strong></span><span><small>Rejected</small><strong>0.03%</strong></span></div><div className="ingestion-bars" role="img" aria-label="Event ingestion throughput over ninety minutes">{eventBars.map((value, index) => <span key={index}><i style={{ height: `${value}%` }} /><em>{index % 4 === 0 ? `${90 - index * 5}m` : ""}</em></span>)}</div><div className="ingestion-insight"><CheckCircle2 size={14} /><span><strong>Pipeline capacity is healthy.</strong> Current throughput uses 46% of the protected ingestion ceiling.</span></div></article>
      </section>

      <section className="datahub-lower-grid">
        <article className="panel collector-health-panel"><div className="panel-heading"><div><span className="panel-kicker">REGIONAL INGESTION</span><h3>Collector health</h3></div><button className="text-button" onClick={() => changeTab("Collectors")}>View all</button></div><div className="collector-health-list">{collectors.map((collector) => <button key={collector.id} onClick={() => changeTab("Collectors")}><span className={`collector-node node-${slug(collector.status)}`}><Server size={15} /></span><span><strong>{collector.name}</strong><small>{collector.region} · {collector.address}</small></span><span><strong>{collector.events}</strong><small>{collector.latency} latency</small></span><span className={`collector-state collector-${slug(collector.status)}`}><i />{collector.status}</span><ChevronRight size={14} /></button>)}</div></article>
        <article className="panel onboarding-readiness-panel"><div className="panel-heading"><div><span className="panel-kicker">PRODUCTION READINESS</span><h3>Connector onboarding</h3></div><strong className="readiness-score">82%</strong></div><div className="readiness-list"><div><CheckCircle2 size={14} /><span><strong>Device data model</strong><small>Vendor-neutral schema validated</small></span><em>Ready</em></div><div><CheckCircle2 size={14} /><span><strong>Secret handling</strong><small>Credential references never shown to operators</small></span><em>Ready</em></div><div><CheckCircle2 size={14} /><span><strong>Regional collectors</strong><small>Four protected collection points online</small></span><em>Ready</em></div><div><CircleAlert size={14} /><span><strong>Real controller credentials</strong><small>Seed connectors active until credentials are supplied</small></span><em>Pending</em></div></div><button onClick={() => { setSetupOpen(true); setSetupStep(1); }}><Workflow size={14} />Open guided setup<ChevronRight size={14} /></button></article>
      </section>
    </>}

    {tab === "Connectors" && <section className="panel datahub-register"><div className="datahub-register-head"><div><span className="panel-kicker">VENDOR & PROTOCOL CONNECTIONS</span><h3>Connector catalog</h3><p>Health, authentication method, scope and supported capabilities for every data source.</p></div><button className="primary-button" onClick={() => { setSetupOpen(true); setSetupStep(1); }}><Plus size={14} />Add connector</button></div><div className="datahub-toolbar"><label className="datahub-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search connectors, vendors or endpoints..." aria-label="Search integration connectors" />{query && <button onClick={() => setQuery("")} aria-label="Clear connector search"><X size={13} /></button>}</label><label className="datahub-select"><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter connector status">{["All statuses", "Connected", "Degraded", "Not configured"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} /></label><label className="datahub-select"><select value={kind} onChange={(event) => setKind(event.target.value)} aria-label="Filter connector type"><option>All types</option>{[...new Set(connectors.map((item) => item.kind))].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} /></label><span className="datahub-freshness"><ShieldCheck size={12} />Credentials protected</span></div><div className="connector-catalog-grid">{filteredConnectors.map((connector) => <article key={connector.id}><button className="connector-card-main" onClick={() => setSelected(connector)}><span className={`connector-vendor-icon connector-${slug(connector.status)} large-connector-icon`}><ConnectorIcon connector={connector} size={20} /></span><span><small>{connector.vendor} · {connector.kind}</small><strong>{connector.name}</strong><p>{connector.detail}</p></span><ChevronRight size={16} /></button><div className="connector-card-health"><span><i><b className={`health-${slug(connector.status)}`} style={{ width: `${connector.health}%` }} /></i><strong>{connector.health}%</strong></span><span className={`connector-status status-${slug(connector.status)}`}><i />{connector.status}</span></div><div className="connector-card-meta"><span><Server size={11} />{connector.targets} targets</span><span><Activity size={11} />{connector.metrics}</span><span><Clock3 size={11} />{connector.lastSync}</span></div><div className="connector-card-actions"><button onClick={() => setSelected(connector)}>Configure</button><button onClick={() => testConnection(connector)} disabled={testing === connector.id}><RefreshCw size={12} className={testing === connector.id ? "datahub-spin" : ""} />{testing === connector.id ? "Testing…" : "Test"}</button></div></article>)}</div>{filteredConnectors.length === 0 && <div className="datahub-empty"><Search size={25} /><strong>No connectors match these filters</strong><p>Adjust the type, status or search query.</p></div>}</section>}

    {tab === "Collectors" && <section className="panel datahub-register"><div className="datahub-register-head"><div><span className="panel-kicker">DISTRIBUTED COLLECTION</span><h3>Regional collector nodes</h3><p>Local polling, event buffering and protected forwarding from each network region.</p></div><button className="secondary-button" onClick={() => notify("Collector deployment package prepared for seed mode.")}><Plus size={14} />Deploy collector</button></div><div className="collector-table-wrap"><table className="collector-table"><thead><tr><th>Collector</th><th>Status</th><th>Targets</th><th>Events</th><th>Queue</th><th>Latency</th><th>CPU</th><th>Memory</th><th>Version</th><th>Last check</th><th /></tr></thead><tbody>{collectors.map((collector) => <tr key={collector.id}><td><span className="collector-identity"><i><Server size={15} /></i><span><strong>{collector.name}</strong><small>{collector.id} · {collector.region} · {collector.address}</small></span></span></td><td><span className={`collector-state collector-${slug(collector.status)}`}><i />{collector.status}</span></td><td>{collector.targets}</td><td><strong>{collector.events}</strong></td><td className={collector.queue > 100 ? "queue-warning" : ""}>{collector.queue}</td><td>{collector.latency}</td><td><span className="resource-meter"><strong>{collector.cpu}%</strong><i><em style={{ width: `${collector.cpu}%` }} /></i></span></td><td><span className="resource-meter"><strong>{collector.memory}%</strong><i><em className={collector.memory > 75 ? "resource-high" : ""} style={{ width: `${collector.memory}%` }} /></i></span></td><td><code>{collector.version}</code></td><td>{collector.lastCheck}</td><td><button className="row-action" onClick={() => notify(`${collector.name} diagnostics opened.`)} aria-label={`Inspect ${collector.name}`}><ChevronRight size={16} /></button></td></tr>)}</tbody></table></div></section>}

    {tab === "Event Streams" && <section className="panel datahub-register"><div className="datahub-register-head"><div><span className="panel-kicker">NORMALIZED DATA PIPELINE</span><h3>Event and telemetry streams</h3><p>Source, destination, volume, queue state and processing latency across NOCX.</p></div><button className="secondary-button" onClick={() => notify("Pipeline diagnostics completed with one delayed stream.")}><Gauge size={14} />Run diagnostics</button></div><div className="stream-grid">{streams.map((stream) => <article key={stream.id}><div className="stream-card-head"><span className={`stream-icon stream-${slug(stream.state)}`}>{stream.state === "Streaming" ? <Activity size={16} /> : stream.state === "Delayed" ? <Clock3 size={16} /> : <Pause size={16} />}</span><span><small>{stream.id} · {stream.protocol}</small><strong>{stream.name}</strong></span><span className={`stream-state stream-state-${slug(stream.state)}`}><i />{stream.state}</span></div><div className="stream-route"><span><Cloud size={13} />{stream.source}</span><i /><ChevronRight size={14} /><i /><span><Database size={13} />{stream.destination}</span></div><div className="stream-metrics"><span><small>Volume</small><strong>{stream.events}</strong></span><span><small>Queue</small><strong className={stream.queue > 100 ? "queue-warning" : ""}>{stream.queue}</strong></span><span><small>Latency</small><strong>{stream.latency}</strong></span></div><div className="stream-actions"><button onClick={() => notify(`${stream.name} pipeline details opened.`)}><Settings2 size={12} />Configure</button><button onClick={() => toggleStream(stream)}>{stream.state === "Paused" ? <Play size={12} /> : <Pause size={12} />}{stream.state === "Paused" ? "Resume" : "Pause"}</button></div></article>)}</div></section>}

    {tab === "Data Mappings" && <section className="panel datahub-register"><div className="datahub-register-head"><div><span className="panel-kicker">NORMALIZED NETWORK MODEL</span><h3>Vendor data mappings</h3><p>Translate vendor-specific fields into consistent NOCX devices, links, metrics and events.</p></div><button className="primary-button" onClick={() => notify("New mapping draft created.")}><Braces size={14} />Create mapping</button></div><div className="mapping-grid">{mappings.map((mapping) => <article key={mapping.name}><div className="mapping-head"><span><Braces size={17} /></span><div><small>{mapping.source}</small><strong>{mapping.name}</strong></div><span className={`mapping-state mapping-${mapping.state.toLowerCase()}`}>{mapping.state}</span></div><div className="mapping-target"><span>{mapping.source}</span><ChevronRight size={13} /><code>{mapping.target}</code></div><div className="mapping-coverage"><span><small>Field coverage</small><strong>{mapping.coverage}%</strong></span><i><em className={mapping.coverage < 95 ? "coverage-review" : ""} style={{ width: `${mapping.coverage}%` }} /></i><small>{mapping.fields} mapped fields · Updated {mapping.updated}</small></div><div className="mapping-examples">{mapping.examples.map((example) => <code key={example}>{example}</code>)}</div><button onClick={() => notify(`${mapping.name} mapping editor opened.`)}>Inspect mapping<ChevronRight size={13} /></button></article>)}</div></section>}

    {selected && <div className="connector-drawer-layer"><button className="drawer-scrim" onClick={() => setSelected(null)} aria-label="Close connector details" /><aside className="connector-drawer" aria-label={`${selected.name} connector details`}><div className="drawer-head"><div><span className="panel-kicker">{selected.id} · {selected.kind.toUpperCase()}</span><h2>{selected.name}</h2><p>{selected.vendor} · {selected.endpoint}</p></div><button className="icon-button" onClick={() => setSelected(null)} aria-label="Close connector"><X size={20} /></button></div><div className="connector-drawer-hero"><span className={`connector-vendor-icon connector-${slug(selected.status)}`}><ConnectorIcon connector={selected} size={23} /></span><div><small>Connector health</small><strong>{selected.status} · {selected.health}%</strong><p>{selected.lastSync}</p></div><span className={`connector-status status-${slug(selected.status)}`}><i />{selected.status}</span></div><p className="connector-drawer-description">{selected.detail}</p><section className="connector-drawer-section"><h3>Connection profile</h3><dl className="connector-detail-grid"><div><dt>Authentication</dt><dd><KeyRound size={12} />{selected.auth}</dd></div><div><dt>Assigned collector</dt><dd><Server size={12} />{selected.collector}</dd></div><div><dt>Managed targets</dt><dd>{selected.targets}</dd></div><div><dt>Current volume</dt><dd>{selected.metrics}</dd></div></dl></section><section className="connector-drawer-section"><h3>Enabled capabilities</h3><div className="connector-capabilities">{selected.capabilities.map((item) => <span key={item}><CheckCircle2 size={12} />{item}</span>)}</div></section><section className="connector-security-note"><ShieldCheck size={18} /><div><strong>Protected credential handling</strong><p>Only secret references and health results are shown. Operators cannot retrieve stored credentials from NOCX.</p></div></section><div className="connector-drawer-actions"><button className="secondary-button" onClick={() => testConnection(selected)} disabled={testing === selected.id}><RefreshCw size={14} className={testing === selected.id ? "datahub-spin" : ""} />{testing === selected.id ? "Testing…" : "Test connection"}</button><button className="primary-button" onClick={() => notify(`${selected.name} configuration editor opened in seed mode.`)}><SlidersHorizontal size={14} />Configure</button></div></aside></div>}

    {setupOpen && <div className="setup-layer"><button className="drawer-scrim" onClick={() => setSetupOpen(false)} aria-label="Close integration setup" /><section className="setup-dialog" role="dialog" aria-modal="true" aria-label="Add data integration"><div className="setup-head"><div><span className="panel-kicker">GUIDED CONNECTOR SETUP</span><h2>Add network integration</h2><p>Seed mode prepares the connector model without collecting real credentials.</p></div><button className="icon-button" onClick={() => setSetupOpen(false)} aria-label="Close setup"><X size={19} /></button></div><div className="setup-progress">{[1, 2, 3].map((step) => <span key={step} className={setupStep >= step ? "setup-step-active" : ""}><i>{step}</i><em>{step === 1 ? "Connector" : step === 2 ? "Scope" : "Review"}</em></span>)}</div>{setupStep === 1 && <div className="setup-body"><h3>Choose a connector</h3><p>Select the system or protocol NOCX should prepare.</p><div className="setup-options">{["MikroTik RouterOS API", "UISP Network API", "UniFi Network", "TP-Link Omada", "SNMP Polling", "Syslog Ingestion", "NetFlow / IPFIX"].map((item) => <button key={item} className={setupType === item ? "setup-option-active" : ""} onClick={() => setSetupType(item)}><span>{item.includes("MikroTik") ? <Router size={16} /> : item.includes("UISP") || item.includes("UniFi") ? <Antenna size={16} /> : item.includes("Omada") ? <Radio size={16} /> : item.includes("SNMP") ? <Network size={16} /> : item.includes("Syslog") ? <SquareTerminal size={16} /> : <Signal size={16} />}</span><strong>{item}</strong><CheckCircle2 size={15} /></button>)}</div></div>}{setupStep === 2 && <div className="setup-body"><h3>Confirm collection scope</h3><p>This seed setup models how the connector will reach devices and protect credentials.</p><div className="setup-scope"><div><Server size={17} /><span><small>Assigned collector</small><strong>Primary Collector · 10.10.2.11</strong></span><CheckCircle2 size={16} /></div><div><Globe2 size={17} /><span><small>Network scope</small><strong>All managed regions · filtered by allowlist</strong></span><CheckCircle2 size={16} /></div><div><KeyRound size={17} /><span><small>Credential policy</small><strong>Protected secret reference · credentials added later</strong></span><ShieldCheck size={16} /></div></div><div className="seed-mode-note"><CircleAlert size={16} /><span><strong>Seed mode is active</strong><p>No controller or device credentials are requested or stored in this prototype.</p></span></div></div>}{setupStep === 3 && <div className="setup-body"><h3>Review connector</h3><p>NOCX will activate a safe seed representation of this integration.</p><div className="setup-review"><span><PlugZap size={20} /></span><div><small>CONNECTOR</small><strong>{setupType}</strong><p>Primary Collector · All managed regions · Protected secret reference</p></div></div><div className="setup-checks"><span><CheckCircle2 size={14} />Connector schema validated</span><span><CheckCircle2 size={14} />Safe collection defaults applied</span><span><CheckCircle2 size={14} />Real credentials deferred</span></div></div>}<div className="setup-actions"><button className="secondary-button" onClick={() => setupStep === 1 ? setSetupOpen(false) : setSetupStep((step) => step - 1)}>{setupStep === 1 ? "Cancel" : "Back"}</button><button className="primary-button" onClick={() => setupStep < 3 ? setSetupStep((step) => step + 1) : activateSeedConnector()}>{setupStep < 3 ? "Continue" : "Activate seed connector"}<ChevronRight size={14} /></button></div></section></div>}

    {notice && <div className="toast" role="status"><CheckCircle2 size={18} />{notice}</div>}
  </main>;
}
