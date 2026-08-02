"use client";

import {
  Activity,
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  Download,
  Gauge,
  GitBranch,
  MapPin,
  Network,
  Radio,
  RefreshCw,
  Router,
  Search,
  ShieldCheck,
  Signal,
  Users,
  UserPlus,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";

type ServiceStatus = "Operational" | "Degraded" | "Offline";
type Dependency = {
  deviceId: string;
  deviceName: string;
  interfaceName: string;
  role: string;
  operStatus: number | null;
};
type Service = {
  id: string;
  accountNumber: string;
  name: string;
  serviceId: string;
  serviceCode: string;
  plan: string;
  access: string;
  site: string;
  region: string;
  endpointIp: string | null;
  cpe: string | null;
  lifecycleState: string;
  status: ServiceStatus;
  downBps: number | null;
  upBps: number | null;
  latencyMs: number | null;
  packetLossPct: number;
  health: number;
  slaTargetPct: number;
  observedAvailabilityPct: number | null;
  observationStartedAt: string | null;
  sessionUptime: string;
  dependencies: Dependency[];
  activeIncident: null | {
    id: string;
    title: string;
    severity: string;
    status: string;
    openedAt: string;
    impactType: string;
  };
  lastObservedAt: string | null;
};
type Payload = {
  source: "live";
  checkedAt: string;
  scope: {
    label: string;
    deviceId: string;
    customerAssignment: string;
    refreshSeconds: number;
    performancePollSeconds: number;
  };
  summary: {
    activeServices: number;
    operational: number;
    degraded: number;
    offline: number;
    impactedCustomers: number;
  };
  services: Service[];
  incidentImpact: Array<{
    id: string;
    title: string;
    severity: string;
    status: string;
    openedAt: string;
    affectedServices: number;
    affectedCustomers: number;
  }>;
  controls: {
    persistentMappings: boolean;
    automaticIncidentCorrelation: boolean;
    networkWrites: boolean;
    externalNotifications: boolean;
  };
};

function statusClass(status: ServiceStatus) {
  return status.toLowerCase();
}

function formatRate(value: number | null) {
  if (value === null) return "—";
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)} Gbps`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)} Mbps`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)} Kbps`;
  return `${value} bps`;
}

function formatTime(value: string | null) {
  return value ? new Date(value).toLocaleString() : "Waiting for telemetry";
}

function elapsed(value: string, referenceMs: number) {
  const minutes = Math.max(0, Math.floor((referenceMs - Date.parse(value)) / 60_000));
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return hours < 24 ? `${hours}h ${minutes % 60}m` : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}

export default function CustomerServiceMonitoring() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [tab, setTab] = useState<"Customers" | "Services" | "SLA">("Customers");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [selected, setSelected] = useState<Service | null>(null);
  const [drawerTab, setDrawerTab] =
    useState<"Overview" | "Dependencies" | "SLA" | "Incidents">("Overview");
  const [notice, setNotice] = useState("");
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [savingAssignment, setSavingAssignment] = useState(false);
  const [assignmentError, setAssignmentError] = useState("");
  const [assignment, setAssignment] = useState({
    customerName: "", accountNumber: "", planName: "", site: "",
    region: "Zanzibar", slaTargetPct: "99.5", ether1: true, client: true,
  });

  const load = async () => {
    try {
      const response = await fetch("/api/platform/customer-services", { cache: "no-store" });
      if (!response.ok) throw new Error("Live service data is unavailable");
      const next = (await response.json()) as Payload;
      setPayload(next);
      setLoadError("");
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Live service data is unavailable");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      if (!active) return;
      await load();
    };
    void refresh();
    const timer = window.setInterval(() => void refresh(), 15_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  const services = useMemo(() => payload?.services ?? [], [payload]);
  const checkedAtMs = payload ? Date.parse(payload.checkedAt) : 0;
  const filtered = useMemo(
    () =>
      services.filter(
        (service) =>
          `${service.name} ${service.id} ${service.serviceCode} ${service.site} ${service.endpointIp ?? ""}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (status === "All statuses" || service.status === status),
      ),
    [services, query, status],
  );
  const representative = services[0] ?? null;
  const summary = payload?.summary ?? {
    activeServices: 0,
    operational: 0,
    degraded: 0,
    offline: 0,
    impactedCustomers: 0,
  };

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };
  const openService = (service: Service) => {
    setSelected(service);
    setDrawerTab("Overview");
  };
  const exportImpactReport = () => {
    if (!payload) return;
    const rows = [
      ["Customer", "Service", "Status", "Incident", "Observed at"],
      ...payload.services.map((service) => [
        service.name,
        service.serviceCode,
        service.status,
        service.activeIncident?.id ?? "None",
        service.lastObservedAt ?? "",
      ]),
    ];
    const csv = rows
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `nocx-customer-impact-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    notify("Customer impact report exported.");
  };
  const saveAssignment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingAssignment(true);
    setAssignmentError("");
    try {
      const response = await fetch("/api/platform/customer-services", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          customerName: assignment.customerName,
          accountNumber: assignment.accountNumber,
          planName: assignment.planName,
          site: assignment.site,
          region: assignment.region,
          slaTargetPct: Number(assignment.slaTargetPct),
          dependencyInterfaces: [
            ...(assignment.ether1 ? ["ether1"] : []),
            ...(assignment.client ? ["client"] : []),
          ],
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Service assignment failed");
      setOnboardingOpen(false);
      notify("Pilot customer and SLA assignment saved.");
      await load();
    } catch (error) {
      setAssignmentError(error instanceof Error ? error.message : "Service assignment failed");
    } finally {
      setSavingAssignment(false);
    }
  };

  return (
    <main className="customers-page">
      <section className="customers-hero">
        <div>
          <p className="eyebrow">VERSION 86 · SERVICE ONBOARDING & SLA POLICY</p>
          <h2>Customer & service monitoring</h2>
          <p>
            Live MikroTik telemetry is now correlated with persistent customer, service and
            dependency records.
          </p>
          <span className={`customer-live-state ${loadError ? "is-error" : "is-live"}`}>
            <i />
            {loadError
              ? loadError
              : payload
                ? `Live data · updated ${formatTime(payload.checkedAt)}`
                : "Connecting to live service data"}
          </span>
        </div>
        <div className="customers-actions">
          <button className="primary-button" onClick={() => setOnboardingOpen(true)}>
            <UserPlus size={15} />
            Assign pilot
          </button>
          <button
            className="secondary-button"
            onClick={() => {
              setLoading(true);
              void load();
            }}
          >
            <RefreshCw size={15} className={loading ? "spin" : ""} />
            Refresh
          </button>
          <button className="primary-button" onClick={exportImpactReport} disabled={!payload}>
            <Download size={15} />
            Impact report
          </button>
        </div>
      </section>

      <section className="customer-source-note">
        <CircleAlert size={17} />
        <span>
          <strong>Pilot scope:</strong> one commissioned MikroTik service. Assignment changes
          NOCX monitoring records only; no configuration is written to the router.
        </span>
      </section>

      <section className="customer-summary" aria-label="Customer service summary">
        <button onClick={() => setStatus("All statuses")}>
          <span className="customer-stat stat-blue"><Users size={18} /></span>
          <div><small>Active services</small><strong>{summary.activeServices}</strong><em>Persistent service mappings</em></div>
        </button>
        <button onClick={() => setStatus("Operational")}>
          <span className="customer-stat stat-green"><CheckCircle2 size={18} /></span>
          <div><small>Operational</small><strong>{summary.operational}</strong><em>Dependencies healthy</em></div>
        </button>
        <button onClick={() => setStatus("Degraded")}>
          <span className="customer-stat stat-amber"><AlertTriangle size={18} /></span>
          <div><small>Degraded</small><strong>{summary.degraded}</strong><em>Incident or quality impact</em></div>
        </button>
        <button onClick={() => setStatus("Offline")}>
          <span className="customer-stat stat-red"><Zap size={18} /></span>
          <div><small>Offline</small><strong>{summary.offline}</strong><em>Device or dependency down</em></div>
        </button>
        <button onClick={() => setTab("SLA")}>
          <span className="customer-stat stat-violet"><ShieldCheck size={18} /></span>
          <div><small>Impacted customers</small><strong>{summary.impactedCustomers}</strong><em>From active incidents</em></div>
        </button>
      </section>

      <section className="customer-grid-top">
        <article className="panel experience-trend-panel">
          <div className="panel-heading">
            <div><span className="panel-kicker">LIVE SERVICE EXPERIENCE</span><h3>MikroTik pilot health</h3></div>
            <span className="experience-current"><i />Health <strong>{representative?.health ?? "—"}</strong></span>
          </div>
          <div className="experience-trend-stats">
            <span><small>Observed availability</small><strong>{representative?.observedAvailabilityPct === null || representative?.observedAvailabilityPct === undefined ? "—" : `${representative.observedAvailabilityPct}%`}</strong></span>
            <span><small>Latency</small><strong>{representative?.latencyMs === null || representative?.latencyMs === undefined ? "—" : `${representative.latencyMs} ms`}</strong></span>
            <span><small>Packet loss</small><strong>{representative ? `${representative.packetLossPct}%` : "—"}</strong></span>
            <span><small>Router uptime</small><strong>{representative?.sessionUptime ?? "—"}</strong></span>
          </div>
          <div className="live-service-path">
            <span><Network size={16} />Core / upstream</span><i />
            <span><Router size={16} />RB750Gr3</span><i />
            <span><Building2 size={16} />Pilot service</span>
          </div>
          <p className="customer-safe-note">
            Availability uses stored samples from the current observation window. It is not yet a
            billing-month SLA calculation.
          </p>
        </article>

        <article className="panel customer-impact-panel">
          <div className="panel-heading">
            <div><span className="panel-kicker">ACTIVE NETWORK IMPACT</span><h3>Customers by root incident</h3></div>
            <button className="text-button" onClick={() => setStatus("All statuses")}>View all</button>
          </div>
          <div className="customer-impact-list">
            {payload?.incidentImpact.map((incident) => (
              <button key={incident.id} onClick={() => setStatus("Degraded")}>
                <span className={incident.severity === "critical" ? "impact-rank impact-rank-critical" : "impact-rank impact-rank-warning"}>
                  <Radio size={15} />
                </span>
                <span><strong>{incident.title}</strong><small>{incident.id} · open {elapsed(incident.openedAt, checkedAtMs)}</small></span>
                <em><strong>{incident.affectedCustomers}</strong>customers</em>
              </button>
            ))}
            {payload && payload.incidentImpact.length === 0 && (
              <div className="customer-impact-empty">
                <CheckCircle2 size={24} />
                <strong>No mapped customer impact</strong>
                <small>New MikroTik incidents will correlate automatically.</small>
              </div>
            )}
          </div>
          <div className="impact-total">
            <Users size={17} />
            <span><strong>{summary.impactedCustomers} customers currently impacted</strong><small>From approved service dependencies</small></span>
            <button onClick={exportImpactReport}>Export</button>
          </div>
        </article>

        <article className="panel service-distribution">
          <div className="panel-heading">
            <div><span className="panel-kicker">MONITORING SCOPE</span><h3>Current pilot</h3></div>
            <span className="service-status service-operational"><i />Live</span>
          </div>
          <div className="pilot-scope-card">
            <Router size={25} />
            <span><small>Source device</small><strong>NOCX-MT-PILOT-001</strong><em>RB750Gr3 · collector 1.3.2</em></span>
          </div>
          <div className="distribution-legend">
            <button onClick={() => setStatus("Operational")}><i className="dist-green" /><span>Operational<strong>{summary.operational}</strong></span></button>
            <button onClick={() => setStatus("Degraded")}><i className="dist-amber" /><span>Degraded<strong>{summary.degraded}</strong></span></button>
            <button onClick={() => setStatus("Offline")}><i className="dist-red" /><span>Offline<strong>{summary.offline}</strong></span></button>
          </div>
          <div className="session-footer">
            <Signal size={15} />
            <span><strong>15-second dashboard refresh</strong><small>60-second performance samples</small></span>
          </div>
        </article>
      </section>

      <section className="customer-workspace panel">
        <div className="customer-tabs">
          <button className={tab === "Customers" ? "customer-tab-active" : ""} onClick={() => setTab("Customers")}><Users size={14} />Customers</button>
          <button className={tab === "Services" ? "customer-tab-active" : ""} onClick={() => setTab("Services")}><Network size={14} />Services</button>
          <button className={tab === "SLA" ? "customer-tab-active" : ""} onClick={() => setTab("SLA")}><ShieldCheck size={14} />SLA</button>
        </div>
        <div className="customer-toolbar">
          <label className="customer-search">
            <Search size={14} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customer, service ID, IP or site..." aria-label="Search customers and services" />
            {query && <button onClick={() => setQuery("")} aria-label="Clear customer search"><X size={13} /></button>}
          </label>
          <label className="customer-select">
            <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter customer status">
              {["All statuses", "Operational", "Degraded", "Offline"].map((item) => <option key={item}>{item}</option>)}
            </select>
            <ChevronDown size={13} />
          </label>
        </div>

        {loading && !payload && <div className="customer-loading"><Activity size={22} /><strong>Loading live customer service data…</strong></div>}
        {!loading && loadError && !payload && <div className="customer-loading customer-load-error"><CircleAlert size={22} /><strong>{loadError}</strong><button className="secondary-button" onClick={() => void load()}>Try again</button></div>}

        {tab === "Customers" && payload && (
          <div className="customer-table-wrap">
            <table className="customer-table">
              <thead><tr><th>Customer</th><th>Location</th><th>Service plan</th><th>Status</th><th>Current traffic</th><th>Latency</th><th>Packet loss</th><th>Health</th><th>Active incident</th><th /></tr></thead>
              <tbody>
                {filtered.map((service) => (
                  <tr key={service.serviceId} onClick={() => openService(service)}>
                    <td><span className="customer-identity"><i><Building2 size={15} /></i><span><strong>{service.name}</strong><small>{service.accountNumber} · owner pending</small></span></span></td>
                    <td><span className="customer-location"><MapPin size={12} /><span><strong>{service.site}</strong><small>{service.region}</small></span></span></td>
                    <td><span className="plan-cell"><strong>{service.plan}</strong><small>{service.access}</small></span></td>
                    <td><span className={`service-status service-${statusClass(service.status)}`}><i />{service.status}</span></td>
                    <td><span className="traffic-cell"><strong>↓ {formatRate(service.downBps)}</strong><small>↑ {formatRate(service.upBps)}</small></span></td>
                    <td>{service.latencyMs === null ? "—" : `${service.latencyMs} ms`}</td>
                    <td className={service.packetLossPct >= 2 ? "metric-danger" : ""}>{service.packetLossPct}%</td>
                    <td><span className="health-score"><strong>{service.health}</strong><i><em className={service.health < 60 ? "health-low" : service.health < 80 ? "health-mid" : ""} style={{ width: `${service.health}%` }} /></i></span></td>
                    <td>{service.activeIncident ? <span className="customer-incident"><AlertTriangle size={12} />{service.activeIncident.id}</span> : <span className="muted-value">None</span>}</td>
                    <td><button className="row-action" aria-label={`Open ${service.name}`} onClick={(event) => { event.stopPropagation(); openService(service); }}><ChevronRight size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty-devices"><Search size={24} /><strong>No services match these filters</strong><p>Adjust the status or search query.</p></div>}
          </div>
        )}

        {tab === "Services" && payload && (
          <div className="customer-table-wrap">
            <table className="customer-table service-table">
              <thead><tr><th>Service ID</th><th>Customer</th><th>Access</th><th>CPE / endpoint</th><th>IP address</th><th>Router uptime</th><th>Approved dependencies</th><th>Status</th><th>SLA target</th><th /></tr></thead>
              <tbody>
                {filtered.map((service) => (
                  <tr key={service.serviceCode} onClick={() => openService(service)}>
                    <td><code>{service.serviceCode}</code></td>
                    <td><span className="customer-identity compact"><i><Users size={14} /></i><span><strong>{service.name}</strong><small>{service.plan}</small></span></span></td>
                    <td>{service.access}</td>
                    <td><span className="cpe-cell"><Router size={13} />{service.cpe ?? "—"}</span></td>
                    <td><code>{service.endpointIp ?? "—"}</code></td>
                    <td><span className="customer-clock"><Clock3 size={12} />{service.sessionUptime}</span></td>
                    <td><span className="path-cell"><GitBranch size={12} />{service.dependencies.map((item) => item.interfaceName).join(" → ")}</span></td>
                    <td><span className={`service-status service-${statusClass(service.status)}`}><i />{service.status}</span></td>
                    <td><strong>{service.slaTargetPct}%</strong></td>
                    <td><button className="row-action" aria-label={`Open service ${service.serviceCode}`} onClick={(event) => { event.stopPropagation(); openService(service); }}><ChevronRight size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "SLA" && payload && (
          <div className="customer-table-wrap">
            <table className="customer-table sla-table">
              <thead><tr><th>Customer / service</th><th>Target</th><th>Observed availability</th><th>Observation start</th><th>Current incident</th><th>Impact duration</th><th>Latency</th><th>Assessment</th><th /></tr></thead>
              <tbody>
                {filtered.map((service) => {
                  const enoughEvidence = Boolean(service.observationStartedAt && checkedAtMs - Date.parse(service.observationStartedAt) >= 24 * 60 * 60 * 1000);
                  const belowTarget = enoughEvidence && service.observedAvailabilityPct !== null && service.observedAvailabilityPct < service.slaTargetPct;
                  return (
                    <tr key={service.serviceCode} onClick={() => openService(service)}>
                      <td><span className="customer-identity compact"><i><ShieldCheck size={14} /></i><span><strong>{service.name}</strong><small>{service.serviceCode}</small></span></span></td>
                      <td>{service.slaTargetPct}%</td>
                      <td><strong className={belowTarget ? "metric-danger" : ""}>{service.observedAvailabilityPct === null ? "—" : `${service.observedAvailabilityPct}%`}</strong></td>
                      <td>{formatTime(service.observationStartedAt)}</td>
                      <td>{service.activeIncident?.id ?? "None"}</td>
                      <td>{service.activeIncident ? elapsed(service.activeIncident.openedAt, checkedAtMs) : "—"}</td>
                      <td>{service.latencyMs === null ? "—" : `${service.latencyMs} ms`}</td>
                      <td>{!enoughEvidence ? <span className="service-status service-maintenance"><i />Observation</span> : belowTarget ? <span className="sla-breach-pill">At risk</span> : <span className="sla-compliant">Within target</span>}</td>
                      <td><button className="row-action" aria-label={`Open SLA ${service.name}`} onClick={(event) => { event.stopPropagation(); openService(service); setDrawerTab("SLA"); }}><ChevronRight size={16} /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {payload && <div className="customer-footer"><span>Live persistent dataset · {filtered.length} service record · network writes disabled</span><div><button disabled>Previous</button><button className="page-current">1</button><button disabled>Next</button></div></div>}
      </section>

      {notice && <div className="toast" role="status"><CheckCircle2 size={18} />{notice}</div>}
      {onboardingOpen && (
        <div className="drawer-layer">
          <button className="drawer-scrim" aria-label="Close pilot assignment" onClick={() => setOnboardingOpen(false)} />
          <aside className="customer-drawer onboarding-drawer" aria-label="Assign pilot service">
            <div className="drawer-head">
              <div><span className="panel-kicker">CONTROLLED SERVICE ONBOARDING</span><h2>Assign the MikroTik pilot</h2><p>Register the real customer, package, SLA and monitored dependency path.</p></div>
              <button className="icon-button" onClick={() => setOnboardingOpen(false)} aria-label="Close pilot assignment"><X size={20} /></button>
            </div>
            <form className="customer-onboarding-form" onSubmit={saveAssignment}>
              <div className="onboarding-safety"><ShieldCheck size={17} /><span><strong>Monitoring records only</strong><small>This workflow cannot change MikroTik configuration or billing.</small></span></div>
              <label>Customer name<input required minLength={2} value={assignment.customerName} onChange={(event) => setAssignment({...assignment, customerName:event.target.value})} placeholder="Real customer or internal service owner" /></label>
              <label>Account number<input required minLength={3} value={assignment.accountNumber} onChange={(event) => setAssignment({...assignment, accountNumber:event.target.value.toUpperCase()})} placeholder="e.g. ZAN-000123" /></label>
              <label>Subscribed package<input required minLength={2} value={assignment.planName} onChange={(event) => setAssignment({...assignment, planName:event.target.value})} placeholder="e.g. Business Internet 50 Mbps" /></label>
              <div className="onboarding-field-grid">
                <label>Site<input required minLength={2} value={assignment.site} onChange={(event) => setAssignment({...assignment, site:event.target.value})} placeholder="Customer site" /></label>
                <label>Region<input required minLength={2} value={assignment.region} onChange={(event) => setAssignment({...assignment, region:event.target.value})} /></label>
              </div>
              <label>Availability SLA target<select value={assignment.slaTargetPct} onChange={(event) => setAssignment({...assignment, slaTargetPct:event.target.value})}><option value="99">99.0%</option><option value="99.5">99.5%</option><option value="99.9">99.9%</option><option value="99.95">99.95%</option></select></label>
              <fieldset>
                <legend>Verified monitored interfaces</legend>
                <label><input type="checkbox" checked={assignment.ether1} onChange={(event) => setAssignment({...assignment, ether1:event.target.checked})} /><span><strong>ether1</strong><small>Upstream dependency</small></span></label>
                <label><input type="checkbox" checked={assignment.client} onChange={(event) => setAssignment({...assignment, client:event.target.checked})} /><span><strong>client</strong><small>Customer access dependency</small></span></label>
              </fieldset>
              {assignmentError && <div className="onboarding-error"><CircleAlert size={15} />{assignmentError}</div>}
              <div className="drawer-actions"><button className="primary-button" type="submit" disabled={savingAssignment}>{savingAssignment ? "Validating assignment…" : "Validate and assign"}</button><button className="secondary-button" type="button" onClick={() => setOnboardingOpen(false)}>Cancel</button></div>
            </form>
          </aside>
        </div>
      )}
      {selected && (
        <div className="drawer-layer">
          <button className="drawer-scrim" aria-label="Close customer details" onClick={() => setSelected(null)} />
          <aside className="customer-drawer" aria-label={`${selected.name} service details`}>
            <div className="drawer-head">
              <div><span className="panel-kicker">{selected.accountNumber} · PILOT</span><h2>{selected.name}</h2><p>{selected.site} · assignment pending</p></div>
              <button className="icon-button" onClick={() => setSelected(null)} aria-label="Close customer"><X size={20} /></button>
            </div>
            <div className="customer-drawer-status">
              <span className={`service-status service-${statusClass(selected.status)}`}><i />{selected.status}</span>
              <span><Network size={12} />{selected.serviceCode}</span>
              {selected.activeIncident && <span className="correlated-badge"><AlertTriangle size={12} />{selected.activeIncident.id}</span>}
            </div>
            <div className="customer-drawer-tabs">
              {(["Overview", "Dependencies", "SLA", "Incidents"] as const).map((item) => (
                <button key={item} className={drawerTab === item ? "drawer-tab-active" : ""} onClick={() => setDrawerTab(item)}>{item}</button>
              ))}
            </div>

            {drawerTab === "Overview" && (
              <>
                <section className="customer-health-hero">
                  <div className={`customer-health-ring health-ring-${selected.health < 60 ? "low" : selected.health < 80 ? "mid" : "good"}`}><span>{selected.health}</span></div>
                  <div><small>Customer health score</small><strong>{selected.status}</strong><p>{selected.plan} · {selected.access}</p></div>
                </section>
                <section className="drawer-metric-grid">
                  <article><small>Download</small><strong>{formatRate(selected.downBps)}</strong></article>
                  <article><small>Upload</small><strong>{formatRate(selected.upBps)}</strong></article>
                  <article><small>Latency</small><strong>{selected.latencyMs === null ? "—" : `${selected.latencyMs} ms`}</strong></article>
                  <article><small>Packet loss</small><strong className={selected.packetLossPct >= 2 ? "metric-danger" : ""}>{selected.packetLossPct}%</strong></article>
                </section>
                <section className="device-detail-section"><h3>Service information</h3><dl><div><dt>Service ID</dt><dd>{selected.serviceCode}</dd></div><div><dt>Endpoint IP</dt><dd><code>{selected.endpointIp ?? "—"}</code></dd></div><div><dt>CPE device</dt><dd>{selected.cpe ?? "—"}</dd></div><div><dt>Last observed</dt><dd>{formatTime(selected.lastObservedAt)}</dd></div></dl></section>
              </>
            )}

            {drawerTab === "Dependencies" && (
              <section className="customer-incidents">
                <h3>Approved service dependency path</h3>
                {selected.dependencies.map((dependency) => (
                  <article key={`${dependency.deviceId}-${dependency.interfaceName}`}>
                    <span className={dependency.operStatus === 2 ? "impact-rank impact-rank-critical" : "impact-rank impact-rank-warning"}><Router size={15} /></span>
                    <div><strong>{dependency.deviceName} · {dependency.interfaceName}</strong><small>{dependency.role} dependency · approved</small><p>Interface state: {dependency.operStatus === 1 ? "up" : dependency.operStatus === 2 ? "down" : "waiting for sample"}.</p></div>
                  </article>
                ))}
              </section>
            )}

            {drawerTab === "SLA" && (
              <>
                <section className="customer-sla-hero"><ShieldCheck size={22} /><div><small>Observed availability</small><strong>{selected.observedAvailabilityPct === null ? "—" : `${selected.observedAvailabilityPct}%`}</strong><p>Target: {selected.slaTargetPct}% · observation window only</p></div><span className="service-status service-maintenance"><i />Pilot</span></section>
                <section className="customer-safe-note">Billing SLA assessment remains pending until a complete measurement period and the real customer contract are assigned.</section>
              </>
            )}

            {drawerTab === "Incidents" && (
              <section className="customer-incidents">
                <h3>Correlated service incidents</h3>
                {selected.activeIncident ? (
                  <article><span className="impact-rank impact-rank-critical"><AlertTriangle size={15} /></span><div><strong>{selected.activeIncident.id}</strong><small>{selected.activeIncident.status} · {selected.activeIncident.impactType}</small><p>{selected.activeIncident.title} has affected this service for {elapsed(selected.activeIncident.openedAt, checkedAtMs)}.</p></div></article>
                ) : (
                  <div className="no-incidents"><CheckCircle2 size={24} /><strong>No active mapped incidents</strong><p>Confirmed interface incidents will appear automatically.</p></div>
                )}
              </section>
            )}
            <div className="drawer-actions"><button className="primary-button" onClick={() => { void load(); notify("Live service evidence refreshed."); }}><Gauge size={14} />Refresh evidence</button><button className="secondary-button" onClick={exportImpactReport}>Export record</button></div>
          </aside>
        </div>
      )}
    </main>
  );
}
