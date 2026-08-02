"use client";

import {
  Activity,
  Ban,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DatabaseZap,
  FileCheck2,
  FlaskConical,
  Play,
  RadioTower,
  Router,
  ShieldCheck,
  TriangleAlert,
  Wifi,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "./commissioning-rehearsal.css";

type Scenario = {
  key: string;
  vendor: "MikroTik" | "Ubiquiti" | "Platform";
  title: string;
  purpose: string;
  expected: "Ready" | "Blocked" | "Alert" | "Replay";
  gates: string[];
  icon: typeof Router;
};

type RehearsalRun = {
  id: string;
  scenarioKey: string;
  vendor: string;
  expectedDecision: string;
  actualDecision: string;
  status: string;
  completedAt: string;
  evidenceDigest: string;
};

const scenarios: Scenario[] = [
  {
    key: "mikrotik-identity-mismatch",
    vendor: "MikroTik",
    title: "Identity mismatch blocks activation",
    purpose: "Prove that OID evidence from the wrong device cannot authorize polling.",
    expected: "Blocked",
    gates: ["Synthetic identity only", "Mismatch detected", "Activation refused"],
    icon: Router,
  },
  {
    key: "mikrotik-normalization",
    vendor: "MikroTik",
    title: "RouterOS metric normalization",
    purpose: "Verify that approved CPU, memory, uptime and interface fields map predictably.",
    expected: "Ready",
    gates: ["Approved metric keys", "Unknown fields quarantined", "No live samples written"],
    icon: Router,
  },
  {
    key: "ubiquiti-rf-degradation",
    vendor: "Ubiquiti",
    title: "Wireless degradation warning",
    purpose: "Validate the expected warning from synthetic signal, noise and CCQ evidence.",
    expected: "Alert",
    gates: ["RF evidence isolated", "Threshold crossed", "No incident created"],
    icon: Wifi,
  },
  {
    key: "collector-offline-replay",
    vendor: "Platform",
    title: "Offline queue and replay",
    purpose: "Confirm ordered replay and duplicate protection after a simulated upload failure.",
    expected: "Replay",
    gates: ["Isolated queue", "Order preserved", "One logical batch"],
    icon: DatabaseZap,
  },
];

function label(value: string) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : "Unknown";
}

export default function CommissioningRehearsal() {
  const [selectedKey, setSelectedKey] = useState(scenarios[0].key);
  const [runs, setRuns] = useState<RehearsalRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [notice, setNotice] = useState("");
  const selected = useMemo(() => scenarios.find((scenario) => scenario.key === selectedKey) ?? scenarios[0], [selectedKey]);
  const SelectedIcon = selected.icon;

  useEffect(() => {
    let active = true;
    fetch("/api/platform/commissioning-rehearsals")
      .then(async (response) => {
        if (!response.ok) throw new Error("Persistent rehearsal history is unavailable.");
        return response.json() as Promise<{ runs?: RehearsalRun[] }>;
      })
      .then((result) => {
        if (active) setRuns(Array.isArray(result.runs) ? result.runs : []);
      })
      .catch(() => {
        if (active) setNotice("The workspace is ready, but persistent history could not be loaded.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const runScenario = async () => {
    if (running) return;
    setRunning(true);
    setNotice("");
    try {
      const response = await fetch("/api/platform/commissioning-rehearsals", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scenarioKey: selected.key }),
      });
      const result = await response.json() as RehearsalRun & { error?: string };
      if (!response.ok) throw new Error(result.error ?? "The rehearsal was not accepted.");
      setRuns((current) => [result, ...current].slice(0, 50));
      setNotice(`${selected.title} passed in the isolated rehearsal namespace.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "The rehearsal was not accepted.");
    } finally {
      setRunning(false);
      window.setTimeout(() => setNotice(""), 4200);
    }
  };

  const passed = runs.filter((run) => run.status === "passed").length;

  return (
    <main className="rehearsal-page">
      <section className="rehearsal-hero">
        <div>
          <p className="eyebrow">MODULE 48 · COMMISSIONING REHEARSAL</p>
          <h2>Rehearse the controls. Keep hardware acceptance blocked.</h2>
          <p>Exercise the MikroTik, Ubiquiti and collector decision paths with server-owned synthetic evidence before next week&apos;s physical commissioning.</p>
        </div>
        <span><ShieldCheck />Isolated evidence namespace</span>
      </section>

      <section className="rehearsal-summary" aria-label="Commissioning rehearsal status">
        <article><FlaskConical /><span><small>Controlled scenarios</small><strong>{scenarios.length}</strong><em>Server-owned definitions</em></span></article>
        <article><FileCheck2 /><span><small>Persisted passes</small><strong>{passed}</strong><em>{loading ? "Loading evidence…" : `${runs.length} total rehearsals`}</em></span></article>
        <article><RadioTower /><span><small>Device probes</small><strong>0</strong><em>Hardware not contacted</em></span></article>
        <article><Ban /><span><small>Production writes</small><strong>0</strong><em>Telemetry and network unchanged</em></span></article>
      </section>

      <section className="rehearsal-grid">
        <article className="panel rehearsal-library">
          <header>
            <div><span className="panel-kicker">REHEARSAL LIBRARY</span><h3>Choose an acceptance path</h3><p>Inputs are fixed by the server; addresses and credentials are not accepted.</p></div>
            <FlaskConical />
          </header>
          <div>
            {scenarios.map(({ key, vendor, title, purpose, expected, icon: Icon }) => (
              <button key={key} className={key === selected.key ? "active" : ""} onClick={() => setSelectedKey(key)}>
                <Icon />
                <span><small>{vendor} · expect {expected}</small><strong>{title}</strong><em>{purpose}</em></span>
                <ChevronRight />
              </button>
            ))}
          </div>
        </article>

        <article className="panel rehearsal-runner">
          <header>
            <div><span className="panel-kicker">EXPECTED CONTROL DECISION</span><h3>{selected.title}</h3><p>{selected.purpose}</p></div>
            <span className={`decision-${selected.expected.toLowerCase()}`}><SelectedIcon />{selected.expected}</span>
          </header>
          <section>
            {selected.gates.map((gate) => <div key={gate}><CheckCircle2 /><span><strong>{gate}</strong><small>Verified inside the isolated rehearsal only</small></span></div>)}
          </section>
          <div className="rehearsal-boundary">
            <TriangleAlert />
            <span><strong>This cannot approve real equipment.</strong><small>Real IP reachability, SNMP identity, vendor OIDs and telemetry stability still require the physical devices next week.</small></span>
          </div>
          <button className="primary-button" onClick={runScenario} disabled={running}>
            {running ? <Clock3 /> : <Play />}{running ? "Recording evidence…" : "Run controlled rehearsal"}
          </button>
        </article>
      </section>

      <section className="panel rehearsal-history">
        <header>
          <div><span className="panel-kicker">PERSISTENT REHEARSAL EVIDENCE</span><h3>Recent controlled runs</h3><p>Every run records its expected and actual decision plus an evidence digest.</p></div>
          <span><Activity />Hardware acceptance: blocked</span>
        </header>
        {loading ? (
          <div className="rehearsal-empty"><Clock3 /><strong>Loading evidence history…</strong></div>
        ) : runs.length === 0 ? (
          <div className="rehearsal-empty"><FlaskConical /><strong>No persistent rehearsal has been recorded</strong><p>Select a scenario to create the first isolated evidence record.</p></div>
        ) : (
          <div className="rehearsal-table-wrap">
            <table>
              <thead><tr><th>Run</th><th>Vendor</th><th>Expected</th><th>Actual</th><th>Completed</th><th>Evidence</th><th>Status</th></tr></thead>
              <tbody>
                {runs.map((run) => (
                  <tr key={run.id}>
                    <td><code>{run.id.slice(-8)}</code></td>
                    <td>{run.vendor}</td>
                    <td>{label(run.expectedDecision)}</td>
                    <td>{label(run.actualDecision)}</td>
                    <td>{new Date(run.completedAt).toLocaleString()}</td>
                    <td><code>{run.evidenceDigest.slice(0, 10)}…</code></td>
                    <td><span className={`run-${run.status}`}><CheckCircle2 />{label(run.status)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <footer><ShieldCheck />Synthetic data never enters production telemetry, alert, incident or topology records. Network configuration writes remain disabled.</footer>
      </section>

      {notice && <div className="app-toast"><CheckCircle2 />{notice}</div>}
    </main>
  );
}
