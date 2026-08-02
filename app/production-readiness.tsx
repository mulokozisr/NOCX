"use client";

import {
  Activity,
  BadgeCheck,
  CheckCircle2,
  CircleGauge,
  FlaskConical,
  LockKeyhole,
  ShieldAlert,
  ShieldCheck,
  TimerReset,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import "./production-readiness.css";

const controls = [
  { name: "Authenticated operator API", limit: "120 req / min", action: "429 + audit", state: "Enforced" },
  { name: "Collector ingestion API", limit: "600 req / min", action: "429 + backoff", state: "Enforced" },
  { name: "Sign-in failure boundary", limit: "8 attempts / 15 min", action: "Temporary lock", state: "Enforced" },
  { name: "Platform status endpoint", limit: "60 req / min", action: "429 + evidence", state: "Enforced" },
];

const exercises = [
  { id: "FT-2026-071", scenario: "Database unavailable", expected: "Writes fail closed; incident raised", result: "Passed", duration: "42 sec" },
  { id: "FT-2026-072", scenario: "Collector upload storm", expected: "Rate limit; no receipt loss", result: "Passed", duration: "3 min" },
  { id: "FT-2026-073", scenario: "Expired operator session", expected: "Access denied and audited", result: "Passed", duration: "18 sec" },
  { id: "FT-2026-074", scenario: "Rollup worker stalled", expected: "Health alert within 15 min", result: "Review", duration: "18 min" },
];

const gates = [
  { label: "Access control and session expiry", state: "Ready", evidence: "38 authorization checks" },
  { label: "Backup and isolated restore test", state: "Ready", evidence: "38-minute recovery" },
  { label: "Rate limiting and abuse evidence", state: "Ready", evidence: "4 protected boundaries" },
  { label: "Failure-mode verification", state: "Review", evidence: "Rollup alert exceeded target" },
  { label: "Real-device commissioning", state: "Paused", evidence: "Equipment available next week" },
];

export default function ProductionReadiness() {
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };

  return (
    <main className="readiness-page">
      <section className="readiness-hero">
        <div>
          <p className="eyebrow">MODULE 43 · PRODUCTION READINESS</p>
          <h2>Harden the platform. Prove it fails safely.</h2>
          <p>Measure security controls, rehearse controlled failures and block commissioning until every required gate has trustworthy evidence.</p>
        </div>
        <button className="primary-button" onClick={() => notify("Readiness evidence refreshed. No network device was contacted.")}>
          <CircleGauge size={15} /> Run readiness check
        </button>
      </section>

      <section className="readiness-summary">
        <article><ShieldCheck /><span><small>Security controls</small><strong>12 / 12</strong><em>Required controls evidenced</em></span></article>
        <article><TimerReset /><span><small>Rate-limit boundaries</small><strong>4</strong><em>Server-side enforcement</em></span></article>
        <article><FlaskConical /><span><small>Failure exercises</small><strong>3 / 4</strong><em>One review remains</em></span></article>
        <article><ShieldAlert /><span><small>Launch decision</small><strong>Blocked</strong><em>Fail-closed readiness gate</em></span></article>
      </section>

      <section className="readiness-grid">
        <article className="panel readiness-card">
          <header><div><span className="panel-kicker">REQUEST PROTECTION</span><h3>Rate limits and abuse handling</h3><p>Every protected boundary returns a controlled response and records evidence.</p></div><LockKeyhole size={20} /></header>
          <div className="rate-table">
            <div><span>Boundary</span><span>Limit</span><span>Response</span><span>State</span></div>
            {controls.map((control) => <button key={control.name} onClick={() => notify(`${control.name} policy evidence opened.`)}>
              <strong>{control.name}</strong><span>{control.limit}</span><span>{control.action}</span><b><i />{control.state}</b>
            </button>)}
          </div>
          <footer><Activity /> Rate-limit decisions are server-side, request-scoped and auditable.</footer>
        </article>

        <article className="panel readiness-card">
          <header><div><span className="panel-kicker">SECURITY BASELINE</span><h3>Production boundary checks</h3><p>Required headers, secrets, dependencies and permissions are checked before release.</p></div><BadgeCheck size={20} /></header>
          <div className="baseline-list">
            <span><CheckCircle2 /><b>Transport policy</b><small>Hosted HTTPS and strict transport enabled</small></span>
            <span><CheckCircle2 /><b>Browser isolation</b><small>Frame, MIME and referrer protections enabled</small></span>
            <span><CheckCircle2 /><b>Secret handling</b><small>No credentials exposed to the client bundle</small></span>
            <span><CheckCircle2 /><b>Dependency review</b><small>Release manifest and lockfile recorded</small></span>
            <span><CheckCircle2 /><b>Least privilege</b><small>Collectors remain read-only and non-privileged</small></span>
          </div>
          <button className="secondary-button" onClick={() => notify("Security evidence pack prepared for review.")}>Open evidence pack</button>
        </article>
      </section>

      <section className="panel readiness-card">
        <header><div><span className="panel-kicker">CONTROLLED FAILURE TESTING</span><h3>Prove expected behaviour under stress</h3><p>Exercises use isolated or simulated faults. They never interrupt production or contact network equipment.</p></div><FlaskConical size={20} /></header>
        <div className="failure-table">
          <div><span>Exercise</span><span>Scenario</span><span>Expected control</span><span>Duration</span><span>Result</span></div>
          {exercises.map((exercise) => <button key={exercise.id} onClick={() => notify(`${exercise.id} evidence opened.`)}>
            <strong>{exercise.id}</strong><span>{exercise.scenario}</span><span>{exercise.expected}</span><span>{exercise.duration}</span>
            <b className={exercise.result === "Passed" ? "ready" : "review"}>{exercise.result}</b>
          </button>)}
        </div>
      </section>

      <section className="panel readiness-card readiness-gate">
        <header><div><span className="panel-kicker">COMMISSIONING GATE</span><h3>Production approval remains fail-closed</h3><p>A green interface is not approval. Every required gate needs named, current evidence.</p></div><b className="blocked"><TriangleAlert />Not ready</b></header>
        <div className="gate-list">
          {gates.map((gate) => <button key={gate.label} onClick={() => notify(`${gate.label} evidence opened.`)}>
            <span><strong>{gate.label}</strong><small>{gate.evidence}</small></span>
            <b className={gate.state.toLowerCase()}>{gate.state}</b>
          </button>)}
        </div>
        <footer><ShieldCheck /> MikroTik and Ubiquiti probes remain paused until the equipment is available, verified and explicitly approved. Network configuration writes remain disabled.</footer>
      </section>
      {notice && <div className="app-toast"><CheckCircle2 size={16} />{notice}</div>}
    </main>
  );
}
