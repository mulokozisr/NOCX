"use client";

import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Database,
  FileSearch,
  GitBranch,
  Lightbulb,
  MessageSquare,
  Network,
  Play,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  ThumbsDown,
  ThumbsUp,
  Timer,
  Users,
  Workflow,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type CopilotTab = "Live Analysis" | "History" | "Knowledge";
type Severity = "Critical" | "High" | "Warning";

type Evidence = {
  source: string;
  finding: string;
  time: string;
  strength: "Strong" | "Supporting" | "Contradicting";
};

type Action = {
  title: string;
  detail: string;
  type: "Runbook" | "Diagnostic" | "Communication";
  risk: "Low" | "Medium" | "High";
};

type Analysis = {
  id: string;
  title: string;
  site: string;
  severity: Severity;
  age: string;
  customers: number;
  alerts: number;
  confidence: number;
  status: "Analyzing" | "Ready" | "Monitoring";
  probableCause: string;
  summary: string;
  chain: string[];
  evidence: Evidence[];
  actions: Action[];
  impact: string;
};

type ChatMessage = {
  id: number;
  role: "operator" | "copilot";
  text: string;
};

const analyses: Analysis[] = [
  {
    id: "INC-2407",
    title: "North Backhaul degradation",
    site: "North Region",
    severity: "Critical",
    age: "22 minutes",
    customers: 126,
    alerts: 14,
    confidence: 94,
    status: "Ready",
    probableCause: "RF interference on North BH-01 secondary radio",
    summary: "The loss pattern begins at the secondary backhaul radio and propagates to four access sites. Power, routing and upstream transit remain healthy. A channel-width change recorded yesterday is the strongest correlated change.",
    chain: ["Channel-width change", "Noise floor +11 dB", "Modulation fallback", "Packet loss 11.8%", "126 services degraded"],
    evidence: [
      { source: "North BH-01 · RF telemetry", finding: "Noise floor rose from −92 dBm to −81 dBm before packet loss began.", time: "22 min ago", strength: "Strong" },
      { source: "Change CHG-1187", finding: "Channel width changed from 40 MHz to 80 MHz during yesterday’s maintenance.", time: "Yesterday · 23:14", strength: "Strong" },
      { source: "Topology dependency graph", finding: "All fourteen alerts share North BH-01 as the nearest common dependency.", time: "21 min ago", strength: "Supporting" },
      { source: "Kendwa POP power", finding: "Input voltage and UPS temperature are within the normal operating range.", time: "20 min ago", strength: "Contradicting" },
    ],
    actions: [
      { title: "Run backhaul recovery diagnostics", detail: "Collect spectrum, modulation and link-state evidence before making changes.", type: "Diagnostic", risk: "Low" },
      { title: "Restore approved 40 MHz profile", detail: "Stage RB-012 with approval and automatic rollback thresholds.", type: "Runbook", risk: "High" },
      { title: "Prepare customer incident update", detail: "Draft a service-impact message for the 126 affected customers.", type: "Communication", risk: "Low" },
    ],
    impact: "Four access sites and 126 customer services are degraded. No complete service outage is detected.",
  },
  {
    id: "INC-2404",
    title: "Paje Tower capacity saturation",
    site: "Paje · South East",
    severity: "High",
    age: "47 minutes",
    customers: 44,
    alerts: 6,
    confidence: 91,
    status: "Ready",
    probableCause: "Peak-hour demand exceeding safe backhaul capacity",
    summary: "Traffic is reaching 94% of the configured 500 Mbps backhaul during the evening peak. Device health and RF quality are stable, making capacity saturation substantially more likely than equipment failure.",
    chain: ["Demand +18%", "Backhaul at 94%", "Queue drops", "Latency 86 ms", "44 services degraded"],
    evidence: [
      { source: "Paje BH-02 · Interface telemetry", finding: "95th percentile utilization reached 451 Mbps on a 500 Mbps service.", time: "8 min ago", strength: "Strong" },
      { source: "Capacity forecast", finding: "The link entered the forecasted exhaustion window 12 days earlier than planned.", time: "Today · 18:05", strength: "Supporting" },
      { source: "Paje BH-02 · RF telemetry", finding: "Signal, CCQ and modulation remain within the healthy baseline.", time: "10 min ago", strength: "Contradicting" },
    ],
    actions: [
      { title: "Apply temporary traffic policy", detail: "Protect business and voice queues during the current peak window.", type: "Runbook", risk: "Medium" },
      { title: "Run capacity evidence pack", detail: "Capture peak, 95th percentile and customer-demand distribution.", type: "Diagnostic", risk: "Low" },
      { title: "Open 1 Gbps upgrade plan", detail: "Create a capacity change proposal for Network Planning.", type: "Communication", risk: "Low" },
    ],
    impact: "Forty-four services show elevated latency; priority business traffic remains within contracted limits.",
  },
  {
    id: "INC-2398",
    title: "Kendwa UPS temperature warning",
    site: "Kendwa POP",
    severity: "Warning",
    age: "1 hour 17 minutes",
    customers: 14,
    alerts: 3,
    confidence: 87,
    status: "Monitoring",
    probableCause: "Reduced cabinet airflow after filter obstruction",
    summary: "Battery temperature increased gradually while load and input voltage stayed stable. The pattern matches reduced airflow rather than electrical overload. A field inspection is already assigned.",
    chain: ["Airflow reduced", "Cabinet +8°C", "Battery 46°C", "UPS warning", "14 services at risk"],
    evidence: [
      { source: "UPS Battery Kendwa", finding: "Temperature rose from 37°C to 46°C over 48 minutes with stable load.", time: "1h 17m ago", strength: "Strong" },
      { source: "Cabinet environmental sensor", finding: "Internal air temperature increased while outdoor temperature was unchanged.", time: "1h 11m ago", strength: "Supporting" },
      { source: "Kendwa utility feed", finding: "Input voltage remained between 228 V and 232 V.", time: "59 min ago", strength: "Contradicting" },
    ],
    actions: [
      { title: "Run UPS health diagnostics", detail: "Capture battery, load and environmental telemetry for the field team.", type: "Diagnostic", risk: "Low" },
      { title: "Update field work order", detail: "Attach probable airflow cause and required filter inspection.", type: "Communication", risk: "Low" },
      { title: "Enable thermal protection policy", detail: "Prepare controlled load reduction if temperature reaches 50°C.", type: "Runbook", risk: "Medium" },
    ],
    impact: "No outage is active. Fourteen dependent customer services are at risk if the thermal trend continues.",
  },
];

const history = [
  { id: "RCA-681", incident: "INC-2394", title: "Bwejuu CPE reachability", cause: "Failed PoE injector", confidence: "96%", outcome: "Confirmed", resolved: "Today · 08:31", saved: "31 min" },
  { id: "RCA-680", incident: "INC-2391", title: "Michenzani core CPU spike", cause: "Route export loop", confidence: "93%", outcome: "Confirmed", resolved: "Yesterday · 22:18", saved: "48 min" },
  { id: "RCA-679", incident: "INC-2388", title: "Kibweni link instability", cause: "Loose outdoor Ethernet termination", confidence: "89%", outcome: "Confirmed", resolved: "Yesterday · 17:42", saved: "24 min" },
  { id: "RCA-678", incident: "INC-2382", title: "Fumba service latency", cause: "Upstream transit congestion", confidence: "82%", outcome: "Partially confirmed", resolved: "16 Jul · 19:05", saved: "19 min" },
  { id: "RCA-677", incident: "INC-2376", title: "Pongwe AP session drops", cause: "Firmware regression", confidence: "91%", outcome: "Confirmed", resolved: "16 Jul · 12:24", saved: "37 min" },
];

const knowledge = [
  { title: "Wireless backhaul degradation", category: "Diagnostic guide", uses: 38, updated: "2 days ago", description: "Evidence sequence for RF interference, alignment, capacity and Ethernet fault isolation." },
  { title: "MikroTik routing instability", category: "Troubleshooting playbook", uses: 24, updated: "5 days ago", description: "Safe checks for route loops, BGP session changes, CPU pressure and asymmetric paths." },
  { title: "Customer service impact rules", category: "Topology model", uses: 64, updated: "Today", description: "How NOCX maps device dependencies to services, SLA risk and notification groups." },
  { title: "UPS and cabinet thermal response", category: "Field procedure", uses: 17, updated: "1 week ago", description: "Thermal thresholds, remote checks, site inspection steps and load-protection policy." },
  { title: "Capacity saturation evidence", category: "Planning standard", uses: 29, updated: "Yesterday", description: "Peak, percentile, queue-drop and growth evidence required before capacity upgrades." },
  { title: "Incident communication standard", category: "Operations policy", uses: 51, updated: "3 days ago", description: "Audience-specific incident summaries, update cadence and restoration confirmation." },
];

function slug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function SeverityBadge({ severity }: { severity: Severity }) {
  return <span className={`copilot-severity copilot-${severity.toLowerCase()}`}>{severity}</span>;
}

function responseFor(input: string, analysis: Analysis) {
  const normalized = input.toLowerCase();
  if (normalized.includes("customer") || normalized.includes("impact")) return `${analysis.customers} customer services are affected. ${analysis.impact} The dependency graph shows ${analysis.alerts} correlated alerts under ${analysis.id}.`;
  if (normalized.includes("evidence") || normalized.includes("why")) return `The strongest evidence is: ${analysis.evidence[0].finding} Confidence is ${analysis.confidence}% because topology, telemetry and change history agree, while alternative causes have contradicting evidence.`;
  if (normalized.includes("action") || normalized.includes("next") || normalized.includes("runbook")) return `Start with “${analysis.actions[0].title}”. It is ${analysis.actions[0].risk.toLowerCase()} risk and preserves evidence before any network-changing action. Human approval remains required for high-risk remediation.`;
  return `For ${analysis.id}, the current probable cause is ${analysis.probableCause.toLowerCase()} at ${analysis.confidence}% confidence. I can explain the evidence, customer impact, or safest next action.`;
}

export default function NocCopilot() {
  const [tab, setTab] = useState<CopilotTab>("Live Analysis");
  const [selected, setSelected] = useState(analyses[0]);
  const [query, setQuery] = useState("");
  const [knowledgeQuery, setKnowledgeQuery] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: "copilot", text: "I correlated telemetry, topology, recent changes and customer impact for INC-2407. Ask me about the evidence or the safest next action." },
  ]);
  const [accepted, setAccepted] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const notify = (text: string) => {
    setNotice(text);
    window.setTimeout(() => setNotice(""), 2800);
  };

  const filteredHistory = useMemo(() => history.filter((item) => `${item.id} ${item.incident} ${item.title} ${item.cause}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const filteredKnowledge = useMemo(() => knowledge.filter((item) => `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(knowledgeQuery.toLowerCase())), [knowledgeQuery]);

  const selectAnalysis = (analysis: Analysis) => {
    setSelected(analysis);
    setMessages([{ id: 1, role: "copilot", text: `I loaded ${analysis.id} with ${analysis.confidence}% evidence confidence. Ask about the probable cause, impact or next action.` }]);
  };

  const sendMessage = (text = message) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((items) => {
      const id = items.length + 1;
      return [...items, { id, role: "operator", text: clean }, { id: id + 1, role: "copilot", text: responseFor(clean, selected) }];
    });
    setMessage("");
  };

  const changeTab = (next: CopilotTab) => {
    setTab(next);
    setQuery("");
  };

  return <main className="copilot-page">
    <section className="copilot-hero">
      <div><p className="eyebrow">MODULE 13 · ASSISTED OPERATIONS</p><h2>NOC Copilot & root-cause analysis</h2><p>Correlate telemetry, topology, changes and customer impact into explainable diagnoses and safer operator decisions.</p></div>
      <div className="copilot-actions"><span className="copilot-model-status"><i />Evidence engine online</span><button className="primary-button" onClick={() => notify("A fresh cross-module analysis has started for all open incidents.")}><Sparkles size={15} />Analyze open incidents</button></div>
    </section>

    <section className="copilot-summary" aria-label="Copilot summary">
      <button onClick={() => changeTab("Live Analysis")}><span className="copilot-stat stat-blue"><BrainCircuit size={19} /></span><span><small>Active analyses</small><strong>3</strong><em>2 ready for operator review</em></span></button>
      <button onClick={() => changeTab("History")}><span className="copilot-stat stat-green"><Timer size={19} /></span><span><small>Median triage time</small><strong>2m 18s</strong><em>↓ 61% this month</em></span></button>
      <button onClick={() => changeTab("Live Analysis")}><span className="copilot-stat stat-violet"><FileSearch size={19} /></span><span><small>Evidence confidence</small><strong>92%</strong><em>Across active analyses</em></span></button>
      <button onClick={() => changeTab("Live Analysis")}><span className="copilot-stat stat-amber"><Lightbulb size={19} /></span><span><small>Suggested actions</small><strong>9</strong><em>6 low-risk actions</em></span></button>
      <button onClick={() => changeTab("Knowledge")}><span className="copilot-stat stat-green"><Database size={19} /></span><span><small>Evidence sources</small><strong>128</strong><em>Telemetry, changes and topology</em></span></button>
    </section>

    <nav className="copilot-tabs" aria-label="Copilot sections">{(["Live Analysis", "History", "Knowledge"] as const).map((item) => <button key={item} className={tab === item ? "copilot-tab-active" : ""} onClick={() => changeTab(item)}>{item}{item === "Live Analysis" && <span>3</span>}</button>)}</nav>

    {tab === "Live Analysis" && <section className="copilot-workspace">
      <aside className="panel copilot-incident-rail" aria-label="Active incident analyses">
        <div className="copilot-rail-head"><div><span className="panel-kicker">PRIORITY QUEUE</span><h3>Active analyses</h3></div><span>3 active</span></div>
        <div className="copilot-analysis-list">{analyses.map((analysis) => <button key={analysis.id} className={selected.id === analysis.id ? "copilot-analysis-active" : ""} onClick={() => selectAnalysis(analysis)}><span className={`analysis-pulse pulse-${analysis.severity.toLowerCase()}`}><Activity size={15} /></span><span><small>{analysis.id} · {analysis.age}</small><strong>{analysis.title}</strong><em><Users size={11} />{analysis.customers} impacted · {analysis.alerts} alerts</em></span><span><SeverityBadge severity={analysis.severity} /><small>{analysis.confidence}% confidence</small></span></button>)}</div>
        <div className="copilot-rail-footer"><ShieldCheck size={14} /><span><strong>Human review required</strong><small>Copilot cannot execute network changes.</small></span></div>
      </aside>

      <article className="panel copilot-analysis-panel">
        <div className="copilot-analysis-head"><div><span className="panel-kicker">{selected.id} · {selected.site.toUpperCase()}</span><h3>{selected.title}</h3><p>{selected.summary}</p></div><div><SeverityBadge severity={selected.severity} /><span className={`analysis-state state-${selected.status.toLowerCase()}`}><i />{selected.status}</span></div></div>

        <section className="copilot-diagnosis-card">
          <span className="diagnosis-icon"><BrainCircuit size={20} /></span><div><small>PROBABLE ROOT CAUSE</small><strong>{selected.probableCause}</strong><span><i><em style={{ width: `${selected.confidence}%` }} /></i><b>{selected.confidence}% confidence</b></span></div>{accepted.includes(selected.id) ? <span className="diagnosis-accepted"><CheckCircle2 size={14} />Accepted</span> : <button onClick={() => { setAccepted((items) => [...items, selected.id]); notify(`${selected.id} diagnosis accepted and added to the incident timeline.`); }}><CheckCircle2 size={14} />Accept diagnosis</button>}
        </section>

        <section className="copilot-section"><div className="copilot-section-head"><div><span className="panel-kicker">CAUSAL CHAIN</span><h3>How the fault propagates</h3></div><button onClick={() => notify("The dependency path was opened in Network Topology.")}><GitBranch size={13} />Open topology</button></div><div className="causal-chain">{selected.chain.map((item, index) => <div key={item}><span className={index === selected.chain.length - 1 ? "causal-impact" : ""}>{index === 0 ? <CircleAlert size={14} /> : index === selected.chain.length - 1 ? <Users size={14} /> : <Network size={14} />}</span><strong>{item}</strong>{index < selected.chain.length - 1 && <ChevronRight size={14} />}</div>)}</div></section>

        <section className="copilot-section evidence-section"><div className="copilot-section-head"><div><span className="panel-kicker">EXPLAINABLE EVIDENCE</span><h3>Signals supporting this diagnosis</h3></div><span className="evidence-count">{selected.evidence.length} sources</span></div><div className="evidence-list">{selected.evidence.map((item) => <article key={`${selected.id}-${item.source}`}><span className={`evidence-strength evidence-${item.strength.toLowerCase()}`}>{item.strength === "Strong" ? <CheckCircle2 size={14} /> : item.strength === "Contradicting" ? <X size={14} /> : <Activity size={14} />}</span><span><strong>{item.source}</strong><p>{item.finding}</p><small>{item.time}</small></span><em>{item.strength}</em></article>)}</div></section>

        <section className="copilot-chat">
          <div className="copilot-chat-head"><span><MessageSquare size={14} />Ask about this incident</span><em>Answers use linked NOCX evidence only</em></div>
          <div className="copilot-messages" aria-live="polite">{messages.map((item) => <div key={item.id} className={`copilot-message message-${item.role}`}>{item.role === "copilot" && <span><BrainCircuit size={14} /></span>}<p>{item.text}</p></div>)}</div>
          <div className="copilot-prompts">{["Why this cause?", "What is the customer impact?", "What should I do next?"].map((prompt) => <button key={prompt} onClick={() => sendMessage(prompt)}>{prompt}</button>)}</div>
          <form className="copilot-input" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}><Terminal size={15} /><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={`Ask about ${selected.id}...`} aria-label="Ask NOC Copilot" /><button type="submit" aria-label="Send question" disabled={!message.trim()}><Send size={15} /></button></form>
        </section>
      </article>

      <aside className="panel copilot-actions-panel">
        <div className="panel-heading"><div><span className="panel-kicker">OPERATOR DECISION SUPPORT</span><h3>Recommended actions</h3></div><span className="recommendation-count">{selected.actions.length}</span></div>
        <div className="copilot-recommendations">{selected.actions.map((action, index) => <article key={action.title}><span className={`recommendation-rank recommendation-${slug(action.risk)}`}>{index + 1}</span><span><small>{action.type} · {action.risk} risk</small><strong>{action.title}</strong><p>{action.detail}</p></span><button onClick={() => notify(action.type === "Runbook" ? `${action.title} staged in Network Automation for human review.` : `${action.title} started with seed evidence.`)}>{action.type === "Runbook" ? <Workflow size={13} /> : action.type === "Diagnostic" ? <Play size={13} /> : <MessageSquare size={13} />}{action.type === "Runbook" ? "Stage" : "Start"}</button></article>)}</div>
        <section className="copilot-impact-card"><div><Users size={17} /><span><small>CUSTOMER IMPACT</small><strong>{selected.customers} services</strong></span></div><p>{selected.impact}</p><button onClick={() => notify("Customer impact list opened in Customer & Service Monitoring.")}>View impacted customers<ChevronRight size={13} /></button></section>
        <section className="copilot-feedback"><span><BrainCircuit size={15} />Was this analysis useful?</span><div><button onClick={() => notify("Positive feedback recorded for this analysis.")}><ThumbsUp size={14} />Yes</button><button onClick={() => notify("Feedback editor opened for this analysis.")}><ThumbsDown size={14} />Needs work</button></div></section>
      </aside>
    </section>}

    {tab === "History" && <section className="panel copilot-register">
      <div className="copilot-register-head"><div><span className="panel-kicker">ROOT-CAUSE AUDIT</span><h3>Investigation history</h3><p>Compare proposed diagnoses with confirmed operational outcomes and time saved.</p></div><span className="copilot-learning-status"><CheckCircle2 size={13} />Operator feedback enabled</span></div>
      <div className="copilot-toolbar"><label><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search analyses, incidents or causes..." aria-label="Search root-cause history" />{query && <button onClick={() => setQuery("")} aria-label="Clear history search"><X size={13} /></button>}</label><span><Database size={12} />90-day analysis history</span></div>
      <div className="copilot-table-wrap"><table className="copilot-table"><thead><tr><th>Analysis</th><th>Incident</th><th>Investigation</th><th>Proposed cause</th><th>Confidence</th><th>Outcome</th><th>Resolved</th><th>Time saved</th><th /></tr></thead><tbody>{filteredHistory.map((item) => <tr key={item.id}><td><code>{item.id}</code></td><td><strong>{item.incident}</strong></td><td>{item.title}</td><td>{item.cause}</td><td><span className="history-confidence">{item.confidence}</span></td><td><span className={`history-outcome outcome-${slug(item.outcome)}`}><CheckCircle2 size={11} />{item.outcome}</span></td><td>{item.resolved}</td><td><strong className="time-saved">{item.saved}</strong></td><td><button className="row-action" onClick={() => notify(`${item.id} evidence opened.`)} aria-label={`Open ${item.id}`}><ChevronRight size={16} /></button></td></tr>)}</tbody></table></div>
    </section>}

    {tab === "Knowledge" && <section className="panel copilot-register">
      <div className="copilot-register-head"><div><span className="panel-kicker">TRUSTED OPERATIONAL KNOWLEDGE</span><h3>Diagnostic knowledge base</h3><p>Reviewed procedures and network-specific context used to ground copilot analysis.</p></div><button className="primary-button" onClick={() => notify("New knowledge source draft created for technical review.")}><Database size={14} />Add knowledge</button></div>
      <div className="copilot-toolbar"><label><Search size={14} /><input value={knowledgeQuery} onChange={(event) => setKnowledgeQuery(event.target.value)} placeholder="Search guides, playbooks or policies..." aria-label="Search copilot knowledge" />{knowledgeQuery && <button onClick={() => setKnowledgeQuery("")} aria-label="Clear knowledge search"><X size={13} /></button>}</label><span><ShieldCheck size={12} />All sources reviewed by technical owners</span></div>
      <div className="knowledge-grid">{filteredKnowledge.map((item) => <button key={item.title} onClick={() => notify(`${item.title} opened in the knowledge viewer.`)}><span className="knowledge-icon"><FileSearch size={18} /></span><span><small>{item.category}</small><strong>{item.title}</strong><p>{item.description}</p><em>{item.uses} analysis uses · Updated {item.updated}</em></span><ChevronRight size={15} /></button>)}</div>
    </section>}

    {notice && <div className="toast" role="status"><CheckCircle2 size={18} />{notice}</div>}
  </main>;
}
