"use client";

import {
  Activity,
  AlertTriangle,
  BatteryCharging,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CirclePause,
  CirclePlay,
  Clock3,
  Cpu,
  Gauge,
  MemoryStick,
  Radio,
  RefreshCw,
  Router,
  Search,
  Server,
  Signal,
  Thermometer,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type Health = "Healthy" | "Degraded" | "Critical" | "Offline";
type MonitorTarget = {
  name: string;
  site: string;
  type: string;
  health: Health;
  latency: number | null;
  loss: number;
  cpu: number | null;
  memory: number | null;
  throughput: string;
  lastPoll: string;
  primaryMetric: string;
  secondaryMetric: string;
};

const targets: MonitorTarget[] = [
  { name: "CORE-RTR-01", site: "Michenzani Core", type: "Core Router", health: "Healthy", latency: 2, loss: 0, cpu: 28, memory: 43, throughput: "2.84 Gbps", lastPoll: "8 sec ago", primaryMetric: "9.1 Gbps capacity", secondaryMetric: "124d uptime" },
  { name: "NORTH-AF5XHD-01", site: "North Backhaul", type: "Wireless Backhaul", health: "Critical", latency: 86, loss: 8.4, cpu: 61, memory: 54, throughput: "624 Mbps", lastPoll: "12 sec ago", primaryMetric: "−67 dBm signal", secondaryMetric: "48% link quality" },
  { name: "PJE-RB4011-01", site: "Paje Tower", type: "Distribution Router", health: "Degraded", latency: 32, loss: 1.8, cpu: 74, memory: 67, throughput: "438 Mbps", lastPoll: "9 sec ago", primaryMetric: "88% interface use", secondaryMetric: "184 customers" },
  { name: "JMB-RB960-01", site: "Jambo Beach", type: "Access Router", health: "Degraded", latency: 18, loss: 0.6, cpu: 88, memory: 76, throughput: "92 Mbps", lastPoll: "11 sec ago", primaryMetric: "88% CPU load", secondaryMetric: "67 customers" },
  { name: "HQ-FGT-01", site: "Zannet HQ", type: "Edge Firewall", health: "Healthy", latency: 1, loss: 0, cpu: 31, memory: 48, throughput: "3.12 Gbps", lastPoll: "6 sec ago", primaryMetric: "18,402 sessions", secondaryMetric: "0 blocked threats" },
  { name: "KIB-PBE5AC-01", site: "Kibweni", type: "Wireless Bridge", health: "Healthy", latency: 5, loss: 0.1, cpu: 36, memory: 39, throughput: "312 Mbps", lastPoll: "7 sec ago", primaryMetric: "−51 dBm signal", secondaryMetric: "94% link quality" },
  { name: "KND-UPS-01", site: "Kendwa POP", type: "Power System", health: "Degraded", latency: 4, loss: 0, cpu: null, memory: null, throughput: "1.8 kW load", lastPoll: "14 sec ago", primaryMetric: "41 min runtime", secondaryMetric: "49.2°C battery" },
  { name: "BWJ-LBE5AC-04", site: "Bwejuu", type: "Customer CPE", health: "Offline", latency: null, loss: 100, cpu: null, memory: null, throughput: "0 bps", lastPoll: "24 min ago", primaryMetric: "No ICMP response", secondaryMetric: "1 customer" },
];

const trafficByRange: Record<string, number[]> = {
  "1H": [2.12, 2.28, 2.21, 2.46, 2.38, 2.62, 2.51, 2.73, 2.68, 2.84],
  "6H": [2.02, 2.28, 1.94, 2.37, 2.18, 2.51, 2.24, 2.44, 2.2, 2.62, 2.34, 2.91, 2.55, 2.41, 2.08, 2.42, 2.12, 2.39],
  "24H": [0.72, 0.58, 0.62, 0.91, 1.42, 2.08, 2.34, 2.21, 2.51, 2.43, 2.71, 3.04, 2.86, 2.62, 2.42],
  "7D": [2.62, 2.48, 2.71, 2.91, 3.12, 2.84, 2.76],
};

const latencySeries = [18, 20, 19, 23, 21, 26, 22, 24, 31, 29, 38, 34, 42, 39, 44, 41, 37, 35];

function makePoints(values: number[], width: number, height: number, max: number) {
  return values.map((value, index) => `${(index / (values.length - 1) * width).toFixed(1)},${(height - value / max * height).toFixed(1)}`).join(" ");
}

function TargetIcon({ type }: { type: string }) {
  if (type.includes("Wireless")) return <Radio size={17} />;
  if (type.includes("Power")) return <BatteryCharging size={17} />;
  if (type.includes("Firewall")) return <Server size={17} />;
  if (type.includes("CPE")) return <Wifi size={17} />;
  return <Router size={17} />;
}

export default function RealTimeMonitoring() {
  const [live, setLive] = useState(true);
  const [range, setRange] = useState("6H");
  const [health, setHealth] = useState("All health");
  const [type, setType] = useState("All types");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MonitorTarget | null>(null);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => targets.filter((target) => {
    const matchesSearch = `${target.name} ${target.site} ${target.type}`.toLowerCase().includes(query.toLowerCase());
    return matchesSearch && (health === "All health" || target.health === health) && (type === "All types" || target.type === type);
  }), [health, type, query]);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  return (
    <main className="monitor-page">
      <section className="monitor-hero">
        <div><p className="eyebrow">MODULE 02 · LIVE TELEMETRY</p><h2>Real-time monitoring</h2><p>Unified performance telemetry from every active network collector.</p></div>
        <div className="monitor-actions"><span className={`stream-status ${live ? "stream-live" : "stream-paused"}`}><i />{live ? "Streaming live" : "Stream paused"}</span><button className="secondary-button" onClick={() => setLive((value) => !value)}>{live ? <CirclePause size={15} /> : <CirclePlay size={15} />}{live ? "Pause" : "Resume"}</button><button className="secondary-button" onClick={() => notify("All collectors polled successfully.")}><RefreshCw size={15} /> Poll now</button></div>
      </section>

      <section className="monitor-summary" aria-label="Monitoring summary">
        <article><div><small>Monitored targets</small><strong>486</strong><em>100% inventory coverage</em></div><span className="summary-spark spark-blue"><Activity size={19} /></span></article>
        <article><div><small>Collectors</small><strong>8/8</strong><em>All regions reporting</em></div><span className="summary-spark spark-green"><Signal size={19} /></span></article>
        <article><div><small>Metrics received</small><strong>1.26M</strong><em>Last 24 hours</em></div><span className="summary-spark spark-violet"><Gauge size={19} /></span></article>
        <article><div><small>Average latency</small><strong>24 ms</strong><em className="summary-warning">↑ 6 ms in last hour</em></div><span className="summary-spark spark-amber"><Clock3 size={19} /></span></article>
        <article><div><small>Packet loss</small><strong>0.82%</strong><em className="summary-danger">North backhaul elevated</em></div><span className="summary-spark spark-red"><AlertTriangle size={19} /></span></article>
      </section>

      <section className="monitor-grid-top">
        <article className="panel live-chart-panel">
          <div className="panel-heading"><div><span className="panel-kicker">AGGREGATE BANDWIDTH</span><h3>Network traffic</h3></div><div className="range-control">{Object.keys(trafficByRange).map((item) => <button key={item} className={range === item ? "range-active" : ""} onClick={() => setRange(item)}>{item}</button>)}</div></div>
          <div className="monitor-chart-numbers"><div><i className="legend-blue" /><span><strong>2.84 Gbps</strong><small>Download</small></span></div><div><i className="legend-green" /><span><strong>642 Mbps</strong><small>Upload</small></span></div><div className="monitor-capacity"><span>Peak capacity</span><strong>68%</strong></div></div>
          <div className="monitor-chart">
            <div className="monitor-y"><span>4G</span><span>3G</span><span>2G</span><span>1G</span><span>0</span></div>
            <svg viewBox="0 0 700 185" preserveAspectRatio="none" aria-label={`Network traffic for ${range}`}>
              {[0,46.25,92.5,138.75,185].map((y) => <line key={y} x1="0" x2="700" y1={y} y2={y} className="chart-grid-line" />)}
              <polyline points={makePoints(trafficByRange[range], 700, 185, 4)} className="line-download" />
              <polyline points={makePoints(trafficByRange[range].map((value) => value * .22), 700, 185, 4)} className="line-upload" />
            </svg>
          </div>
        </article>

        <article className="panel experience-panel">
          <div className="panel-heading"><div><span className="panel-kicker">SERVICE EXPERIENCE</span><h3>Latency & packet loss</h3></div><button className="text-button" onClick={() => notify("Performance report selected.")}>View report</button></div>
          <div className="experience-score"><div><span>Network experience</span><strong>91</strong><small>Good</small></div><div className="score-ring"><span>91</span></div></div>
          <svg className="latency-mini-chart" viewBox="0 0 320 85" preserveAspectRatio="none" aria-label="Latency trend"><line x1="0" y1="58" x2="320" y2="58" className="latency-target" /><polyline points={makePoints(latencySeries,320,75,60)} /></svg>
          <div className="experience-metrics"><span><i className="dot-blue" />Latency<strong>24 ms</strong></span><span><i className="dot-red" />Loss<strong>0.82%</strong></span><span><i className="dot-amber" />Jitter<strong>8 ms</strong></span></div>
          <div className="experience-alert"><AlertTriangle size={16} /><span><strong>North region is outside baseline</strong><small>Latency +34 ms · Packet loss +7.6%</small></span></div>
        </article>
      </section>

      <section className="monitor-grid-mid">
        <article className="panel resource-panel">
          <div className="panel-heading"><div><span className="panel-kicker">RESOURCE PRESSURE</span><h3>Highest device utilization</h3></div><button className="text-button" onClick={() => setType("Access Router")}>Inspect</button></div>
          <div className="resource-devices">
            <button onClick={() => setSelected(targets[3])}><span><i className="resource-device-icon"><Cpu size={15} /></i><span><strong>JMB-RB960-01</strong><small>CPU utilization</small></span></span><b className="metric-danger">88%</b><em><i style={{width:"88%"}} className="bar-danger" /></em></button>
            <button onClick={() => setSelected(targets[2])}><span><i className="resource-device-icon"><Cpu size={15} /></i><span><strong>PJE-RB4011-01</strong><small>CPU utilization</small></span></span><b>74%</b><em><i style={{width:"74%"}} className="bar-warning" /></em></button>
            <button onClick={() => setSelected(targets[1])}><span><i className="resource-device-icon"><MemoryStick size={15} /></i><span><strong>NORTH-AF5XHD-01</strong><small>Memory utilization</small></span></span><b>54%</b><em><i style={{width:"54%"}} /></em></button>
          </div>
        </article>
        <article className="panel wireless-panel">
          <div className="panel-heading"><div><span className="panel-kicker">WIRELESS HEALTH</span><h3>Backhaul quality</h3></div><button className="text-button" onClick={() => setType("Wireless Backhaul")}>All links</button></div>
          <div className="wireless-comparison"><button onClick={() => setSelected(targets[1])}><span className="wireless-icon wireless-bad"><Radio size={18} /></span><span><strong>North airFiber</strong><small>−67 dBm · 48% quality</small></span><em className="wireless-down">Critical</em></button><button onClick={() => setSelected(targets[5])}><span className="wireless-icon wireless-good"><Radio size={18} /></span><span><strong>Kibweni PowerBeam</strong><small>−51 dBm · 94% quality</small></span><em className="wireless-up">Healthy</em></button></div>
          <div className="wireless-stats"><span>Modulation<strong>8x / 6x</strong></span><span>Capacity<strong>936 Mbps</strong></span><span>Noise floor<strong>−94 dBm</strong></span></div>
        </article>
        <article className="panel power-panel">
          <div className="panel-heading"><div><span className="panel-kicker">POWER & ENVIRONMENT</span><h3>Site conditions</h3></div><button className="text-button" onClick={() => setSelected(targets[6])}>Details</button></div>
          <div className="power-main"><span className="power-icon"><BatteryCharging size={22} /></span><div><strong>Kendwa UPS</strong><small>Battery temperature above threshold</small></div><em>49.2°C</em></div>
          <div className="power-metrics"><div><Zap size={15} /><span>Load<strong>1.8 kW</strong></span></div><div><BatteryCharging size={15} /><span>Runtime<strong>41 min</strong></span></div><div><Thermometer size={15} /><span>Room<strong>31.4°C</strong></span></div></div>
        </article>
      </section>

      <section className="monitor-targets panel">
        <div className="monitor-targets-head"><div><span className="panel-kicker">LIVE TARGETS</span><h3>Monitored infrastructure</h3></div><div className="target-filters"><label className="target-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search targets..." aria-label="Search monitoring targets" />{query && <button onClick={() => setQuery("")} aria-label="Clear monitoring search"><X size={13} /></button>}</label><label className="compact-select"><select value={health} onChange={(event) => setHealth(event.target.value)} aria-label="Filter monitoring health">{["All health","Healthy","Degraded","Critical","Offline"].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13} /></label><label className="compact-select"><select value={type} onChange={(event) => setType(event.target.value)} aria-label="Filter monitoring type"><option>All types</option>{[...new Set(targets.map((target)=>target.type))].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13} /></label></div></div>
        <div className="target-table-wrap"><table className="target-table"><thead><tr><th>Target</th><th>Health</th><th>Latency</th><th>Packet loss</th><th>CPU / memory</th><th>Throughput</th><th>Last poll</th><th /></tr></thead><tbody>{filtered.map((target)=><tr key={target.name} onClick={()=>setSelected(target)}><td><span className="target-identity"><i><TargetIcon type={target.type} /></i><span><strong>{target.name}</strong><small>{target.site} · {target.type}</small></span></span></td><td><span className={`health-pill health-${target.health.toLowerCase()}`}><i />{target.health}</span></td><td>{target.latency === null ? "—" : `${target.latency} ms`}</td><td className={target.loss >= 5 ? "metric-danger" : ""}>{target.loss}%</td><td>{target.cpu === null ? "—" : `${target.cpu}% / ${target.memory}%`}</td><td><strong>{target.throughput}</strong></td><td><span className="poll-time"><Clock3 size={12} />{target.lastPoll}</span></td><td><button className="row-action" onClick={(event)=>{event.stopPropagation();setSelected(target)}} aria-label={`Inspect ${target.name}`}><ChevronRight size={16} /></button></td></tr>)}</tbody></table>{filtered.length===0&&<div className="empty-devices"><Search size={24}/><strong>No monitoring targets found</strong><p>Adjust the health, type or search filters.</p></div>}</div>
      </section>

      {notice && <div className="toast" role="status"><CheckCircle2 size={18}/>{notice}</div>}
      {selected && <div className="drawer-layer"><button className="drawer-scrim" aria-label="Close monitor details" onClick={()=>setSelected(null)}/><aside className="monitor-drawer" aria-label={`${selected.name} monitoring details`}><div className="drawer-head"><div><span className="panel-kicker">LIVE TELEMETRY · {selected.type}</span><h2>{selected.name}</h2><p>{selected.site}</p></div><button className="icon-button" aria-label="Close monitoring details" onClick={()=>setSelected(null)}><X size={20}/></button></div><div className="monitor-drawer-status"><span className={`health-pill health-${selected.health.toLowerCase()}`}><i/>{selected.health}</span><span><Activity size={13}/>{live ? "Streaming live" : "Stream paused"}</span></div><section className="drawer-metric-grid"><article><small>Latency</small><strong>{selected.latency===null?"—":`${selected.latency} ms`}</strong></article><article><small>Packet loss</small><strong className={selected.loss>=5?"metric-danger":""}>{selected.loss}%</strong></article><article><small>CPU</small><strong className={selected.cpu&&selected.cpu>=80?"metric-danger":""}>{selected.cpu===null?"—":`${selected.cpu}%`}</strong></article><article><small>Throughput</small><strong>{selected.throughput}</strong></article></section><section className="drawer-live-chart"><h3>Last 60 minutes</h3><svg viewBox="0 0 370 120" preserveAspectRatio="none"><line x1="0" y1="30" x2="370" y2="30" className="chart-grid-line"/><line x1="0" y1="60" x2="370" y2="60" className="chart-grid-line"/><line x1="0" y1="90" x2="370" y2="90" className="chart-grid-line"/><polyline points={makePoints([22,25,21,27,24,31,29,35,32,39,36,43,38,41],370,110,60)} className="line-download"/></svg></section><section className="device-detail-section"><h3>Operational context</h3><dl><div><dt>Primary metric</dt><dd>{selected.primaryMetric}</dd></div><div><dt>Secondary metric</dt><dd>{selected.secondaryMetric}</dd></div><div><dt>Last successful poll</dt><dd>{selected.lastPoll}</dd></div><div><dt>Polling interval</dt><dd>30 seconds</dd></div></dl></section><div className="drawer-actions"><button className="primary-button" onClick={()=>notify(`${selected.name} diagnostics queued.`)}>Run diagnostics</button><button className="secondary-button">Open device profile</button></div></aside></div>}
    </main>
  );
}
