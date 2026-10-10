"use client";

import { Activity, CheckCircle2, CircleAlert, Cpu, Gauge, HardDrive, KeyRound, MemoryStick, Network, Router, ShieldCheck, TimerReset } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "./mikrotik-pilot.css";
import "./mikrotik-automation.css";

type LiveMetric = {
  metricKey: string;
  observedAt: string;
  value: number;
  unit: string;
};

type LivePayload = {
  live: boolean;
  health?: {status: string; reason: string};
  availability: null | {
    observedAt: string;
    latencyMs: number | null;
    online: boolean;
    packetLossPct: number;
  };
  metrics: LiveMetric[];
  incidentAutomation: {
    monitoredInterfaces: string[];
    rulesActive: boolean;
    history: Array<{
      id: string;
      title: string;
      severity: string;
      status: string;
      openedAt: string;
      resolvedAt: string | null;
    }>;
  };
};

const checks = [
  { label: "WireGuard path", value: "10.66.66.1 ↔ 10.66.66.5" },
  { label: "SNMP identity", value: "sysDescr.0 returned successfully" },
  { label: "Device match", value: "RB750Gr3 · RouterOS 7.23.2" },
  { label: "Access boundary", value: "SNMP GET only · collector /32" },
];

const metrics = [
  ["Availability", "ICMP + SNMP response"],
  ["Uptime", "1.3.6.1.2.1.1.3.0"],
  ["CPU", "RouterOS health profile"],
  ["Memory", "HOST-RESOURCES-MIB"],
  ["Interfaces", "IF-MIB counters and state"],
];

const alertEnabled = new Set(["ether1", "client", "nocx-wg"]);

function parseInterfaceKey(metricKey: string) {
  const match = /^interface\.i(\d+)_([a-z0-9_]+)\.(rx\.bps|tx\.bps|oper\.status|in_errors\.delta|out_errors\.delta)$/.exec(metricKey);
  if (!match) return null;
  const label = match[2].replaceAll("_", "-");
  return { prefix: `interface.i${match[1]}_${match[2]}`, index: Number(match[1]), label };
}

function formatRate(value: number | null) {
  if (value === null) return "—";
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)} Gbps`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)} Mbps`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)} Kbps`;
  return `${value} bps`;
}

function formatUptime(value: number | null) {
  if (value === null) return "—";
  const days = Math.floor(value / 86_400);
  const hours = Math.floor((value % 86_400) / 3_600);
  const minutes = Math.floor((value % 3_600) / 60);
  return days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`;
}

export default function MikrotikPilot() {
  const [notice, setNotice] = useState("");
  const [live, setLive] = useState<LivePayload | null>(null);
  const [loadError, setLoadError] = useState(false);
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch("/api/collector/v1/mikrotik", { cache: "no-store" });
        if (!response.ok) throw new Error("Live telemetry unavailable");
        if (active) {
          setLive(await response.json() as LivePayload);
          setLoadError(false);
        }
      } catch {
        if (active) setLoadError(true);
      }
    };
    void load();
    const timer = window.setInterval(() => void load(), 15_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);
  const metricMap = useMemo(
    () => new Map((live?.metrics ?? []).map((sample) => [sample.metricKey, sample])),
    [live],
  );
  const metricValue = (key: string) => metricMap.get(key)?.value ?? null;
  const discoveredInterfaces = useMemo(() => {
    const found = new Map<string, { prefix: string; index: number; label: string }>();
    for (const sample of live?.metrics ?? []) {
      const parsed = parseInterfaceKey(sample.metricKey);
      if (parsed && !found.has(parsed.prefix)) found.set(parsed.prefix, parsed);
    }
    return [...found.values()].sort((a, b) => a.index - b.index);
  }, [live]);
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  };

  return (
    <main className="mtp-page">
      <section className="mtp-hero">
        <div>
          <p className="eyebrow">VERSION 71 · FIRST MIKROTIK PILOT</p>
          <h2>Device-backed commissioning evidence</h2>
          <p>The DOXA collector reached the real router through WireGuard and completed a read-only SNMP identity check. No RouterOS configuration writes are enabled.</p>
        </div>
        <span className="mtp-ready"><CheckCircle2 />SNMP verified</span>
      </section>

      <section className="mtp-summary" aria-label="MikroTik pilot summary">
        <article><Router /><span><small>Device</small><strong>RB750Gr3</strong><em>NOCX-MT-PILOT-001</em></span></article>
        <article><Network /><span><small>Management path</small><strong>10.66.66.5</strong><em>WireGuard · nocx-wg</em></span></article>
        <article><Cpu /><span><small>RouterOS</small><strong>7.23.2</strong><em>Stable channel</em></span></article>
        <article><ShieldCheck /><span><small>Collection mode</small><strong>Read-only</strong><em>SNMPv2c over VPN</em></span></article>
      </section>

      <section className="mtp-grid">
        <article className="panel mtp-evidence">
          <header><div><span className="panel-kicker">COMMISSIONING EVIDENCE</span><h3>Four acceptance checks passed</h3><p>Evidence is bound to the exact router address, model and collector path.</p></div><Activity /></header>
          <div>{checks.map((check) => <span key={check.label}><CheckCircle2 /><b>{check.label}</b><small>{check.value}</small><em>Verified</em></span>)}</div>
          <footer><code>iso.3.6.1.2.1.1.1.0</code><strong>RouterOS RB750Gr3 7.23.2 (stable)</strong></footer>
        </article>

        <article className="panel mtp-gate">
          <header><div><span className="panel-kicker">PRODUCTION GATE</span><h3>Polling activation prepared</h3></div><CircleAlert /></header>
          <div className="mtp-gate-state"><span><small>Current state</small><strong>{live?.live?"Live polling active":"Ready for collector activation"}</strong></span></div>
          {live?.availability&&<p>Last sample: {new Date(live.availability.observedAt).toLocaleString()} · latency {live.availability.latencyMs??"—"} ms · {live.availability.online?"online":"offline"}.</p>}
          <p>The existing SNMP community was exposed during troubleshooting. Testing may continue temporarily, but production acceptance remains conditional on rotation.</p>
          <button className="primary-button" onClick={() => notify("Activation package confirmed. Deploy it on DOXA after rotating the SNMP community.")}><Activity />Confirm activation package</button>
          <small className="mtp-safe">Secrets stay on DOXA. NOCX stores only a protected credential reference.</small>
        </article>
      </section>

      <section className="panel mtp-live" aria-label="Live MikroTik measurements">
        <header>
          <div>
            <span className="panel-kicker">LIVE DEVICE MEASUREMENTS</span>
            <h3>RB750Gr3 health and availability</h3>
            <p>Current values received from collector 1.3.2 through the read-only, tiered SNMP profile.</p>
          </div>
          <span className={`mtp-live-state ${live?.live ? "is-live" : "is-stale"}`}>
            <Activity />{live?.live ? "Live" : loadError ? "Unavailable" : "Waiting"}
          </span>
        </header>
        <div className="mtp-live-cards">
          <article>
            <CheckCircle2 />
            <span><small>Availability</small><strong>{loadError || !live?.live ? "Unknown" : live.availability?.online ? "Online" : "Offline"}</strong><em>{loadError ? "Telemetry request failed" : live?.health?.reason ?? "No sample"}</em></span>
          </article>
          <article>
            <Gauge />
            <span><small>Latency</small><strong>{loadError || !live?.live || live?.availability?.latencyMs === null || live?.availability?.latencyMs === undefined ? "—" : `${live.availability.latencyMs} ms`}</strong><em>ICMP average</em></span>
          </article>
          <article>
            <TimerReset />
            <span><small>Uptime</small><strong>{formatUptime(metricValue("device.uptime.seconds"))}</strong><em>RouterOS uptime</em></span>
          </article>
          <article>
            <Cpu />
            <span><small>CPU load</small><strong>{metricValue("device.cpu.utilization.pct") === null ? "—" : `${metricValue("device.cpu.utilization.pct")}%`}</strong><em>4-core average</em></span>
          </article>
          <article>
            <MemoryStick />
            <span><small>Memory used</small><strong>{metricValue("device.memory.utilization.pct") === null ? "—" : `${metricValue("device.memory.utilization.pct")}%`}</strong><em>Main memory</em></span>
          </article>
          <article>
            <HardDrive />
            <span><small>System disk</small><strong>{metricValue("device.disk.utilization.pct") === null ? "—" : `${metricValue("device.disk.utilization.pct")}%`}</strong><em>Storage used</em></span>
          </article>
        </div>
        <div className="mtp-interface-wrap">
          <div className="mtp-interface-heading">
            <span><b>All discovered interfaces</b><small>Rates and error changes are calculated between collector polls. Alerts remain opt-in.</small></span>
            <em>{live?.availability ? `Last sample ${new Date(live.availability.observedAt).toLocaleString()}` : "Waiting for telemetry"}</em>
          </div>
          <table className="mtp-interface-table">
            <thead><tr><th>Interface</th><th>Status</th><th>Receive</th><th>Transmit</th><th>Input errors</th><th>Output errors</th></tr></thead>
            <tbody>
              {discoveredInterfaces.map((item) => {
                const prefix = item.prefix;
                const status = metricValue(`${prefix}.oper.status`);
                const inputErrors = metricValue(`${prefix}.in_errors.delta`);
                const outputErrors = metricValue(`${prefix}.out_errors.delta`);
                const monitored = alertEnabled.has(item.label);
                return (
                  <tr key={item.prefix}>
                    <td><strong>{item.label}</strong><small>ifIndex {item.index} · {monitored ? "Alert monitoring enabled" : "Discovered only"}</small></td>
                    <td><span className={`mtp-interface-status ${status === 1 ? "up" : status === 2 ? "down" : "unknown"}`}><i />{status === 1 ? "Up" : status === 2 ? "Down" : "Unknown"}</span></td>
                    <td>{formatRate(metricValue(`${prefix}.rx.bps`))}</td>
                    <td>{formatRate(metricValue(`${prefix}.tx.bps`))}</td>
                    <td className={(inputErrors ?? 0) > 0 ? "has-errors" : ""}>{inputErrors === null ? "—" : inputErrors === 0 ? "0" : `+${inputErrors}`}</td>
                    <td className={(outputErrors ?? 0) > 0 ? "has-errors" : ""}>{outputErrors === null ? "—" : outputErrors === 0 ? "0" : `+${outputErrors}`}</td>
                  </tr>
                );
              })}
              {discoveredInterfaces.length === 0 && <tr><td colSpan={6}>Waiting for the first full interface sample from collector 1.3.2.</td></tr>}
            </tbody>
          </table>
        </div>
        <footer>Dashboard refresh: 15 seconds · Availability and interface status: 30 seconds · Performance: 60 seconds · Discovery: 15 minutes · Network configuration writes: disabled</footer>
      </section>

      <section className="panel mtp-automation" aria-label="Interface incident automation">
        <header>
          <div>
            <span className="panel-kicker">INCIDENT AUTOMATION</span>
            <h3>Evidence-backed interface alert lifecycle</h3>
            <p>Only ether1, client and nocx-wg can open incidents. Discovered-only interfaces remain visible without creating noise.</p>
          </div>
          <span className={`mtp-live-state ${live?.incidentAutomation?.rulesActive ? "is-live" : "is-stale"}`}><ShieldCheck />{live?.incidentAutomation?.rulesActive ? "Rules active" : "Waiting"}</span>
        </header>
        <div className="mtp-rule-grid">
          <article><CircleAlert /><span><small>Interface down</small><strong>3 consecutive polls</strong><em>Critical · recover after 2 up</em></span></article>
          <article><Activity /><span><small>Error growth</small><strong>3 consecutive increases</strong><em>Warning · clear after 5 clean</em></span></article>
          <article><Gauge /><span><small>ether1 utilization</small><strong>85% for 5 polls</strong><em>95% for 3 becomes critical</em></span></article>
          <article><CheckCircle2 /><span><small>Recovery</small><strong>Automatic resolution</strong><em>Recorded in incident history</em></span></article>
        </div>
        <div className="mtp-incident-history">
          <div className="mtp-interface-heading"><span><b>Recent automated incidents</b><small>Open and resolved events created from stored collector evidence.</small></span><em>{live?.incidentAutomation?.history?.length ?? 0} records</em></div>
          {(live?.incidentAutomation?.history ?? []).length > 0 ? (
            <table className="mtp-interface-table">
              <thead><tr><th>Incident</th><th>Severity</th><th>Status</th><th>Opened</th><th>Resolved</th></tr></thead>
              <tbody>{live!.incidentAutomation.history.map((incident) => <tr key={incident.id}><td><strong>{incident.title}</strong><small>{incident.id}</small></td><td>{incident.severity}</td><td><span className={`mtp-incident-state ${incident.status}`}>{incident.status}</span></td><td>{new Date(incident.openedAt).toLocaleString()}</td><td>{incident.resolvedAt ? new Date(incident.resolvedAt).toLocaleString() : "—"}</td></tr>)}</tbody>
            </table>
          ) : <p className="mtp-no-incidents">No interface incidents have been opened. Critical status is evaluated every 30 seconds.</p>}
        </div>
        <footer>Incident creation changes NOCX records only · RouterOS configuration writes remain disabled</footer>
      </section>

      <section className="mtp-bottom">
        <article className="panel mtp-profile">
          <header><div><span className="panel-kicker">READ-ONLY PROFILE</span><h3>Initial measurements</h3></div><Router /></header>
          <div>{metrics.map(([name, source]) => <span key={name}><b>{name}</b><small>{source}</small><em>{name === "Availability" || name === "Interfaces" ? "30 s" : "60 s"}</em></span>)}</div>
        </article>
        <article className="panel mtp-controls">
          <header><div><span className="panel-kicker">SAFETY BOUNDARY</span><h3>Controls preserved</h3></div><KeyRound /></header>
          <div>
            <span><CheckCircle2 />Collector source restricted to <code>10.66.66.1/32</code></span>
            <span><CheckCircle2 />SNMP write access disabled</span>
            <span><CheckCircle2 />No NAT, DHCP, route or firewall automation</span>
            <span><CircleAlert />Credential rotation required before production sign-off</span>
          </div>
        </article>
      </section>
      {notice && <div className="toast"><CheckCircle2 size={16} />{notice}</div>}
    </main>
  );
}
