"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  FileCode2,
  Gauge,
  History,
  LockKeyhole,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  TimerReset,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type AutomationTab = "Overview" | "Runbooks" | "Executions" | "Approvals";
type RunbookStatus = "Active" | "Draft" | "Paused";
type Risk = "Low" | "Medium" | "High";
type ExecutionStatus = "Success" | "Running" | "Failed" | "Waiting approval";

type Runbook = {
  id: string;
  name: string;
  description: string;
  trigger: string;
  scope: string;
  owner: string;
  lastRun: string;
  executions: number;
  success: number;
  timeSaved: string;
  status: RunbookStatus;
  risk: Risk;
  approval: string;
  steps: string[];
};

type Execution = {
  id: string;
  runbook: string;
  target: string;
  started: string;
  duration: string;
  operator: string;
  status: ExecutionStatus;
  result: string;
};

type Approval = {
  id: string;
  runbook: string;
  target: string;
  requestedBy: string;
  requested: string;
  risk: Risk;
  reason: string;
  impact: string;
  state: "Pending" | "Approved" | "Declined";
};

const runbooks: Runbook[] = [
  { id: "RB-012", name: "Recover unstable wireless backhaul", description: "Validate RF conditions, safely restart the affected radio pair and confirm service recovery.", trigger: "Packet loss > 8% for 5 min", scope: "Wireless backhaul", owner: "Network Engineering", lastRun: "18 minutes ago", executions: 42, success: 95.2, timeSaved: "17h 30m", status: "Active", risk: "High", approval: "Required before restart", steps: ["Confirm correlated incident and maintenance state", "Capture RF, modulation and interface evidence", "Restart secondary radio, then primary radio", "Validate latency, loss and customer sessions"] },
  { id: "RB-011", name: "Clear stale PPPoE sessions", description: "Find orphaned customer sessions and clear them without interrupting active subscribers.", trigger: "Session stale > 20 min", scope: "Customer access", owner: "Service Assurance", lastRun: "31 minutes ago", executions: 186, success: 99.5, timeSaved: "23h 15m", status: "Active", risk: "Medium", approval: "Auto-approved under 10 sessions", steps: ["Query stale session candidates", "Exclude active accounting updates", "Clear validated stale sessions", "Confirm customer re-authentication"] },
  { id: "RB-010", name: "Collect incident diagnostics", description: "Gather reachability, interface, routing and device health evidence for a new incident.", trigger: "Critical incident created", scope: "All managed devices", owner: "NOC Operations", lastRun: "42 minutes ago", executions: 312, success: 98.7, timeSaved: "39h 40m", status: "Active", risk: "Low", approval: "Not required", steps: ["Resolve topology dependencies", "Run non-invasive diagnostic checks", "Attach evidence to the incident", "Notify the assigned response team"] },
  { id: "RB-009", name: "Fail over north transit", description: "Shift north-region traffic to the protected path after health and capacity checks pass.", trigger: "Manual or incident policy", scope: "North region", owner: "Network Engineering", lastRun: "12 Jul · 19:14", executions: 7, success: 100, timeSaved: "5h 10m", status: "Active", risk: "High", approval: "Two-person approval", steps: ["Confirm alternate path health", "Validate projected capacity", "Apply staged routing preference", "Verify traffic and rollback thresholds"] },
  { id: "RB-008", name: "Rebalance Nungwi access clients", description: "Move eligible clients from a congested AP to the protected neighboring radio.", trigger: "AP utilization > 82%", scope: "Nungwi managed Wi-Fi", owner: "Wireless Team", lastRun: "11 Jul · 20:05", executions: 15, success: 93.3, timeSaved: "8h 20m", status: "Paused", risk: "Medium", approval: "Required above 25 clients", steps: ["Identify eligible client radios", "Verify target AP capacity", "Apply preferred AP policy", "Measure session and signal recovery"] },
  { id: "RB-007", name: "Backup configuration before change", description: "Capture, validate and archive the latest device configuration before approved work begins.", trigger: "Change enters scheduled state", scope: "Change target devices", owner: "Change Management", lastRun: "Today · 08:46", executions: 94, success: 100, timeSaved: "11h 45m", status: "Active", risk: "Low", approval: "Inherited from change", steps: ["Verify scheduled change window", "Capture running configuration", "Validate archive integrity", "Attach restore point to change record"] },
  { id: "RB-006", name: "Rotate device credentials", description: "Rotate selected device credentials and verify collector access using a controlled batch.", trigger: "Quarterly policy", scope: "Managed network devices", owner: "Security Operations", lastRun: "Not run", executions: 0, success: 0, timeSaved: "—", status: "Draft", risk: "High", approval: "Security + platform owner", steps: ["Select approved device batch", "Create and escrow new credentials", "Update device and collector", "Verify access and revoke old credential"] },
];

const executionSeed: Execution[] = [
  { id: "EXE-4821", runbook: "Recover unstable wireless backhaul", target: "North Backhaul · INC-2407", started: "18 minutes ago", duration: "3m 42s", operator: "M. Yusuf", status: "Success", result: "Packet loss reduced from 11.8% to 0.4%" },
  { id: "EXE-4820", runbook: "Clear stale PPPoE sessions", target: "BRAS-ZNZ-01 · 8 sessions", started: "31 minutes ago", duration: "48s", operator: "Policy engine", status: "Success", result: "8 sessions cleared; 7 reconnected" },
  { id: "EXE-4819", runbook: "Collect incident diagnostics", target: "Paje Tower · INC-2404", started: "42 minutes ago", duration: "1m 18s", operator: "Policy engine", status: "Success", result: "24 evidence items attached" },
  { id: "EXE-4818", runbook: "Fail over north transit", target: "North Transit A", started: "1 hour ago", duration: "—", operator: "K. Ali", status: "Waiting approval", result: "Awaiting second approver" },
  { id: "EXE-4817", runbook: "Collect incident diagnostics", target: "UPS Battery Kendwa · INC-2398", started: "1h 12m ago", duration: "57s", operator: "Policy engine", status: "Success", result: "Temperature evidence attached" },
  { id: "EXE-4816", runbook: "Rebalance Nungwi access clients", target: "Nungwi AP-03", started: "Yesterday · 20:12", duration: "2m 05s", operator: "A. Juma", status: "Failed", result: "Guardrail stopped run: AP-04 capacity below minimum" },
];

const approvalSeed: Approval[] = [
  { id: "APR-1048", runbook: "Fail over north transit", target: "North Transit A → North Transit B", requestedBy: "Kassim Ali", requested: "7 minutes ago", risk: "High", reason: "Primary path loss remains above the incident threshold.", impact: "126 customer services · expected convergence under 45 seconds", state: "Pending" },
  { id: "APR-1047", runbook: "Recover unstable wireless backhaul", target: "Paje BH-02 radio pair", requestedBy: "Mariam Salum", requested: "16 minutes ago", risk: "High", reason: "Capacity incident is active and remote diagnostics are complete.", impact: "44 customer services · estimated interruption 90 seconds", state: "Pending" },
  { id: "APR-1046", runbook: "Clear stale PPPoE sessions", target: "BRAS-ZNZ-01 · 14 sessions", requestedBy: "Policy engine", requested: "28 minutes ago", risk: "Medium", reason: "The automated threshold of ten sessions was exceeded.", impact: "14 sessions checked; only validated stale sessions will be cleared", state: "Pending" },
];

const activity = [22, 31, 27, 38, 44, 40, 52, 47, 58, 63, 55, 68];

function slug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function RunStatus({ status }: { status: ExecutionStatus }) {
  const Icon = status === "Success" ? CheckCircle2 : status === "Failed" ? CircleAlert : status === "Running" ? RefreshCw : Clock3;
  return <span className={`automation-run-status run-${slug(status)}`}><Icon size={12} className={status === "Running" ? "automation-spin" : ""} />{status}</span>;
}

export default function NetworkAutomation() {
  const [tab, setTab] = useState<AutomationTab>("Overview");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [risk, setRisk] = useState("All risks");
  const [selected, setSelected] = useState<Runbook | null>(null);
  const [executions, setExecutions] = useState(executionSeed);
  const [approvals, setApprovals] = useState(approvalSeed);
  const [notice, setNotice] = useState("");

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };

  const filteredRunbooks = useMemo(() => runbooks.filter((item) => {
    const match = `${item.id} ${item.name} ${item.scope} ${item.owner}`.toLowerCase().includes(query.toLowerCase());
    return match && (status === "All statuses" || item.status === status) && (risk === "All risks" || item.risk === risk);
  }), [query, status, risk]);

  const filteredExecutions = useMemo(() => executions.filter((item) => {
    const match = `${item.id} ${item.runbook} ${item.target} ${item.operator}`.toLowerCase().includes(query.toLowerCase());
    return match && (status === "All statuses" || item.status === status);
  }), [executions, query, status]);

  const pendingApprovals = approvals.filter((item) => item.state === "Pending");

  const changeTab = (next: AutomationTab) => {
    setTab(next);
    setQuery("");
    setStatus("All statuses");
    setRisk("All risks");
  };

  const runNow = (runbook: Runbook) => {
    if (runbook.status !== "Active") {
      notify(`${runbook.name} is ${runbook.status.toLowerCase()} and cannot run yet.`);
      return;
    }
    const needsApproval = runbook.risk === "High";
    const execution: Execution = {
      id: `EXE-${4822 + executions.length}`,
      runbook: runbook.name,
      target: runbook.scope,
      started: "Just now",
      duration: "—",
      operator: "Scalion Mulokozi",
      status: needsApproval ? "Waiting approval" : "Running",
      result: needsApproval ? "Approval request created" : "Preflight checks running",
    };
    setExecutions((items) => [execution, ...items]);
    setSelected(null);
    setTab("Executions");
    notify(needsApproval ? "Execution staged and sent for approval." : "Runbook execution started safely.");
  };

  const reviewApproval = (approval: Approval, decision: "Approved" | "Declined") => {
    setApprovals((items) => items.map((item) => item.id === approval.id ? { ...item, state: decision } : item));
    setExecutions((items) => items.map((item) => item.runbook === approval.runbook && item.status === "Waiting approval" ? {
      ...item,
      status: decision === "Approved" ? "Running" : "Failed",
      result: decision === "Approved" ? "Approved; preflight checks running" : "Approval declined; no changes applied",
    } : item));
    notify(`${approval.id} ${decision.toLowerCase()}. ${decision === "Approved" ? "Guarded execution started." : "No network changes were made."}`);
  };

  return <main className="automation-page">
    <section className="automation-hero">
      <div><p className="eyebrow">MODULE 12 · CONTROLLED AUTOMATION</p><h2>Network automation & runbooks</h2><p>Automate repeatable diagnostics and recovery while approvals, guardrails and audit evidence keep every change safe.</p></div>
      <div className="automation-actions"><button className="secondary-button" onClick={() => notify("Runbook package import opened.")}><FileCode2 size={15} />Import runbook</button><button className="primary-button" onClick={() => notify("New automation draft created from the approved template.")}><Plus size={15} />New automation</button></div>
    </section>

    <section className="automation-summary" aria-label="Automation summary">
      <button onClick={() => changeTab("Runbooks")}><span className="automation-stat stat-blue"><Workflow size={19} /></span><span><small>Active runbooks</small><strong>5</strong><em>1 paused · 1 draft</em></span></button>
      <button onClick={() => changeTab("Executions")}><span className="automation-stat stat-green"><Play size={19} /></span><span><small>Executions today</small><strong>68</strong><em>64 completed successfully</em></span></button>
      <button onClick={() => changeTab("Executions")}><span className="automation-stat stat-violet"><Gauge size={19} /></span><span><small>Success rate</small><strong>97.8%</strong><em>↑ 1.4% this month</em></span></button>
      <button onClick={() => changeTab("Overview")}><span className="automation-stat stat-amber"><TimerReset size={19} /></span><span><small>Operator time saved</small><strong>8h 42m</strong><em>Last 24 hours</em></span></button>
      <button onClick={() => changeTab("Approvals")}><span className="automation-stat stat-red"><LockKeyhole size={19} /></span><span><small>Awaiting approval</small><strong>{pendingApprovals.length}</strong><em>2 high-risk actions</em></span></button>
    </section>

    <nav className="automation-tabs" aria-label="Automation sections">
      {(["Overview", "Runbooks", "Executions", "Approvals"] as const).map((item) => <button key={item} className={tab === item ? "automation-tab-active" : ""} onClick={() => changeTab(item)}>{item}{item === "Runbooks" && <span>{runbooks.length}</span>}{item === "Approvals" && <span>{pendingApprovals.length}</span>}</button>)}
    </nav>

    {tab === "Overview" && <>
      <section className="automation-overview-grid">
        <article className="panel automation-activity-panel">
          <div className="panel-heading"><div><span className="panel-kicker">LAST 12 HOURS</span><h3>Automation activity</h3></div><span className="automation-health"><i />All runners healthy</span></div>
          <div className="automation-chart-metrics"><span><small>Executions</small><strong>68</strong></span><span><small>Successful</small><strong>64</strong></span><span><small>Guardrail stops</small><strong>3</strong></span><span><small>Failed</small><strong>1</strong></span></div>
          <div className="automation-bars" role="img" aria-label="Hourly automation executions over the last twelve hours">{activity.map((value, index) => <span key={index}><i style={{ height: `${value}%` }} /><em>{index % 3 === 0 ? `${index + 1}h` : ""}</em></span>)}</div>
          <div className="automation-chart-note"><ShieldCheck size={14} /><span><strong>100% of network-changing actions passed preflight.</strong> Three unsafe attempts were stopped before execution.</span></div>
        </article>

        <article className="panel automation-guardrail-panel">
          <div className="panel-heading"><div><span className="panel-kicker">SAFETY CONTROLS</span><h3>Guardrail posture</h3></div><strong className="guardrail-score">96 / 100</strong></div>
          <div className="guardrail-list">
            <div><span className="guardrail-good"><CheckCircle2 size={14} /></span><span><strong>Change-window enforcement</strong><small>Protected actions blocked outside approval windows</small></span><em>On</em></div>
            <div><span className="guardrail-good"><CheckCircle2 size={14} /></span><span><strong>Automatic rollback</strong><small>Health checks trigger safe configuration restore</small></span><em>On</em></div>
            <div><span className="guardrail-good"><CheckCircle2 size={14} /></span><span><strong>Customer-impact threshold</strong><small>Approval required above 25 customer services</small></span><em>On</em></div>
            <div><span className="guardrail-warning"><AlertTriangle size={14} /></span><span><strong>Lab validation coverage</strong><small>One draft runbook has not passed simulation</small></span><em>Review</em></div>
          </div>
          <button className="automation-policy-link" onClick={() => notify("Automation policy editor opened.")}>Review automation policies<ChevronRight size={14} /></button>
        </article>
      </section>

      <section className="automation-lower-grid">
        <article className="panel recommended-automation-panel">
          <div className="panel-heading"><div><span className="panel-kicker">RECOMMENDED NEXT ACTIONS</span><h3>Automation opportunities</h3></div><span className="automation-opportunity-count">3</span></div>
          <div className="automation-opportunities">
            <button onClick={() => setSelected(runbooks[0])}><span className="opportunity-icon opportunity-red"><Zap size={16} /></span><span><strong>Stage backhaul recovery</strong><small>North Backhaul remains above the loss threshold</small></span><em>Save ~24 min</em><ChevronRight size={14} /></button>
            <button onClick={() => setSelected(runbooks[1])}><span className="opportunity-icon opportunity-amber"><Users size={16} /></span><span><strong>Clear 14 stale sessions</strong><small>Validated candidates on BRAS-ZNZ-01</small></span><em>Save ~18 min</em><ChevronRight size={14} /></button>
            <button onClick={() => setSelected(runbooks[5])}><span className="opportunity-icon opportunity-blue"><ShieldCheck size={16} /></span><span><strong>Finish credential rotation runbook</strong><small>Simulation and rollback steps still required</small></span><em>Draft</em><ChevronRight size={14} /></button>
          </div>
        </article>

        <article className="panel recent-automation-panel">
          <div className="panel-heading"><div><span className="panel-kicker">LATEST ACTIVITY</span><h3>Recent executions</h3></div><button className="text-button" onClick={() => changeTab("Executions")}>View history</button></div>
          <div className="recent-automation-list">{executions.slice(0, 5).map((item) => <button key={item.id} onClick={() => changeTab("Executions")}><span className={`execution-icon execution-${slug(item.status)}`}>{item.status === "Success" ? <CheckCircle2 size={15} /> : item.status === "Failed" ? <CircleAlert size={15} /> : <Clock3 size={15} />}</span><span><strong>{item.runbook}</strong><small>{item.target} · {item.started}</small></span><RunStatus status={item.status} /><ChevronRight size={14} /></button>)}</div>
        </article>
      </section>
    </>}

    {tab === "Runbooks" && <section className="panel automation-register">
      <div className="automation-register-head"><div><span className="panel-kicker">RUNBOOK LIBRARY</span><h3>Controlled operational workflows</h3><p>Versioned steps, triggers, approvals and rollback controls for repeatable network work.</p></div><button className="primary-button" onClick={() => notify("New runbook draft created.")}><Plus size={14} />Create runbook</button></div>
      <div className="automation-toolbar"><label className="automation-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search runbooks, owners or scope..." aria-label="Search automation runbooks" />{query && <button onClick={() => setQuery("")} aria-label="Clear runbook search"><X size={13} /></button>}</label><label className="automation-select"><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter runbook status">{["All statuses", "Active", "Paused", "Draft"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} /></label><label className="automation-select"><select value={risk} onChange={(event) => setRisk(event.target.value)} aria-label="Filter automation risk">{["All risks", "Low", "Medium", "High"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} /></label><span className="automation-freshness"><ShieldCheck size={12} />7 versioned runbooks</span></div>
      <div className="automation-table-wrap"><table className="automation-table"><thead><tr><th>Runbook</th><th>Trigger</th><th>Scope</th><th>Risk</th><th>Executions</th><th>Success</th><th>Time saved</th><th>Last run</th><th>Status</th><th /></tr></thead><tbody>{filteredRunbooks.map((item) => <tr key={item.id} onClick={() => setSelected(item)}><td><span className="automation-identity"><i><Workflow size={15} /></i><span><strong>{item.name}</strong><small>{item.id} · {item.owner}</small></span></span></td><td>{item.trigger}</td><td>{item.scope}</td><td><span className={`automation-risk risk-${slug(item.risk)}`}>{item.risk}</span></td><td>{item.executions}</td><td><strong>{item.executions === 0 ? "—" : `${item.success}%`}</strong></td><td>{item.timeSaved}</td><td>{item.lastRun}</td><td><span className={`runbook-status runbook-${slug(item.status)}`}><i />{item.status}</span></td><td><button className="row-action" onClick={(event) => { event.stopPropagation(); setSelected(item); }} aria-label={`Inspect ${item.name}`}><ChevronRight size={16} /></button></td></tr>)}</tbody></table>{filteredRunbooks.length === 0 && <div className="automation-empty"><Search size={24} /><strong>No runbooks match these filters</strong><p>Adjust the status, risk, or search query.</p></div>}</div>
    </section>}

    {tab === "Executions" && <section className="panel automation-register">
      <div className="automation-register-head"><div><span className="panel-kicker">EXECUTION AUDIT</span><h3>Runbook execution history</h3><p>Every request, approval, action, result and guardrail decision in one evidence trail.</p></div><button className="secondary-button" onClick={() => notify("Execution audit exported.")}><History size={14} />Export audit</button></div>
      <div className="automation-toolbar"><label className="automation-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search executions, targets or operators..." aria-label="Search automation executions" />{query && <button onClick={() => setQuery("")} aria-label="Clear execution search"><X size={13} /></button>}</label><label className="automation-select"><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter execution status">{["All statuses", "Success", "Running", "Failed", "Waiting approval"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} /></label><span className="automation-freshness"><CheckCircle2 size={12} />Immutable evidence enabled</span></div>
      <div className="automation-table-wrap"><table className="automation-table execution-table"><thead><tr><th>Status</th><th>Execution</th><th>Runbook</th><th>Target</th><th>Started</th><th>Duration</th><th>Operator</th><th>Result</th><th /></tr></thead><tbody>{filteredExecutions.map((item) => <tr key={item.id}><td><RunStatus status={item.status} /></td><td><code>{item.id}</code></td><td><strong>{item.runbook}</strong></td><td>{item.target}</td><td>{item.started}</td><td>{item.duration}</td><td>{item.operator}</td><td><span className="execution-result">{item.result}</span></td><td><button className="row-action" onClick={() => notify(`${item.id} evidence opened.`)} aria-label={`Open execution ${item.id}`}><ChevronRight size={16} /></button></td></tr>)}</tbody></table></div>
    </section>}

    {tab === "Approvals" && <section className="panel automation-register approval-register">
      <div className="automation-register-head"><div><span className="panel-kicker">HUMAN CONTROL POINTS</span><h3>Automation approval queue</h3><p>Review scope, impact and safeguards before high-risk network actions can proceed.</p></div><span className="approval-policy"><LockKeyhole size={13} />Two-person control enforced</span></div>
      <div className="approval-list">{approvals.map((item) => <article key={item.id} className={item.state !== "Pending" ? "approval-reviewed" : ""}><div className="approval-main"><span className={`approval-risk-icon approval-${slug(item.risk)}`}><LockKeyhole size={17} /></span><span><small>{item.id} · REQUESTED {item.requested.toUpperCase()}</small><strong>{item.runbook}</strong><p>{item.reason}</p></span><span className={`automation-risk risk-${slug(item.risk)}`}>{item.risk} risk</span></div><dl><div><dt>Target</dt><dd>{item.target}</dd></div><div><dt>Requested by</dt><dd>{item.requestedBy}</dd></div><div><dt>Expected impact</dt><dd>{item.impact}</dd></div></dl>{item.state === "Pending" ? <div className="approval-actions"><button className="approval-decline" onClick={() => reviewApproval(item, "Declined")}>Decline</button><button className="approval-approve" onClick={() => reviewApproval(item, "Approved")}><CheckCircle2 size={14} />Approve & run</button></div> : <div className={`approval-decision decision-${slug(item.state)}`}><CheckCircle2 size={14} />{item.state} by Scalion Mulokozi · just now</div>}</article>)}</div>
    </section>}

    {selected && <div className="automation-drawer-layer"><button className="drawer-scrim" onClick={() => setSelected(null)} aria-label="Close runbook details" /><aside className="automation-drawer" aria-label={`${selected.name} runbook details`}>
      <div className="drawer-head"><div><span className="panel-kicker">{selected.id} · VERSION 3.4</span><h2>{selected.name}</h2><p>{selected.owner} · {selected.scope}</p></div><button className="icon-button" onClick={() => setSelected(null)} aria-label="Close runbook"><X size={20} /></button></div>
      <div className="automation-drawer-badges"><span className={`runbook-status runbook-${slug(selected.status)}`}><i />{selected.status}</span><span className={`automation-risk risk-${slug(selected.risk)}`}>{selected.risk} risk</span><span><ShieldCheck size={12} />Guardrails enforced</span></div>
      <p className="automation-drawer-description">{selected.description}</p>
      <section className="automation-drawer-section"><h3>Execution policy</h3><dl className="automation-detail-grid"><div><dt>Trigger</dt><dd>{selected.trigger}</dd></div><div><dt>Approval</dt><dd>{selected.approval}</dd></div><div><dt>Success rate</dt><dd>{selected.executions === 0 ? "Not established" : `${selected.success}% across ${selected.executions} runs`}</dd></div><div><dt>Time saved</dt><dd>{selected.timeSaved}</dd></div></dl></section>
      <section className="automation-drawer-section"><h3>Controlled workflow</h3><div className="automation-step-list">{selected.steps.map((step, index) => <div key={step}><span>{index + 1}</span><i /><p><strong>{step}</strong><small>{index === 0 ? "Preflight and policy validation" : index === selected.steps.length - 1 ? "Post-change verification and evidence" : "Stops automatically if guardrails fail"}</small></p></div>)}</div></section>
      <section className="automation-safety-note"><ShieldCheck size={18} /><div><strong>Safe execution policy</strong><p>Dry-run checks, customer-impact limits and automatic rollback apply before this workflow can change the network.</p></div></section>
      <div className="automation-drawer-actions"><button className="secondary-button" onClick={() => notify(`${selected.id} opened in the runbook editor.`)}>Edit runbook</button><button className="primary-button" onClick={() => runNow(selected)} disabled={selected.status !== "Active"}>{selected.status === "Paused" ? <Pause size={14} /> : <Play size={14} />}{selected.status === "Active" ? "Run now" : selected.status}</button></div>
    </aside></div>}

    {notice && <div className="toast" role="status"><CheckCircle2 size={18} />{notice}</div>}
  </main>;
}
