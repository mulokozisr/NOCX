"use client";

import {
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  Code2,
  DatabaseZap,
  FileCheck2,
  Gauge,
  LockKeyhole,
  Network,
  RadioTower,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import "./release-assurance.css";

const auditDomains = [
  { name: "Build & artifact integrity", checks: 11, icon: Code2, evidence: "Production worker, routes, manifest and generated assets validated" },
  { name: "Navigation & module wiring", checks: 9, icon: Network, evidence: "Every registered workspace resolves through a tested route" },
  { name: "Authentication & API policy", checks: 8, icon: LockKeyhole, evidence: "Human APIs use persistent roles; collectors use isolated tokens" },
  { name: "Telemetry & data lifecycle", checks: 8, icon: DatabaseZap, evidence: "Ingestion, deduplication, rollups, retention and recovery agree" },
  { name: "Accessibility & interaction", checks: 7, icon: BadgeCheck, evidence: "Keyboard, focus, dialogs, tables and status messages covered" },
  { name: "Read-only safety boundaries", checks: 7, icon: ShieldCheck, evidence: "Device probes paused and all network writes remain disabled" },
];

const resolvedFindings = [
  { id: "AUTH-01", title: "Platform status authorization", before: "Authenticated-header check only", after: "Persistent platform.read permission enforced" },
  { id: "AUTH-02", title: "Notification read authorization", before: "Authenticated-header check only", after: "Persistent platform.read permission enforced" },
  { id: "AUTH-03", title: "Notification mutation authorization", before: "Any authenticated operator", after: "incidents.manage permission required" },
  { id: "CODE-01", title: "Static-analysis cleanup", before: "32 code-quality warnings", after: "0 warnings across the release" },
  { id: "PERF-01", title: "Workspace loading boundary", before: "All workspaces in the initial bundle", after: "Operational modules load only when opened" },
  { id: "DATA-01", title: "Rollup worker clarity", before: "Ambiguous branch expression", after: "Explicit hourly and daily window logic" },
];

const nextVersions = [
  { version: "HW-01", title: "MikroTik commissioning", state: "Waiting", detail: "Register the real router, verify exact OIDs and activate read-only polling." },
  { version: "HW-02", title: "Ubiquiti commissioning", state: "Waiting", detail: "Verify airMAX/AirFiber identity, RF OIDs and wireless telemetry." },
  { version: "HW-03", title: "Pilot stability approval", state: "Planned", detail: "Observe real telemetry, failover, alert quality and operator workflow." },
];

export default function ReleaseAssurance() {
  const [selectedFinding, setSelectedFinding] = useState(resolvedFindings[0]);
  const [notice, setNotice] = useState("");
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };

  return (
    <main className="release-page">
      <section className="release-hero">
        <div>
          <p className="eyebrow">MODULE 46 · RELEASE ASSURANCE</p>
          <h2>Version 66 passes the pre-device release gate.</h2>
          <p>One evidence view for build integrity, integration coverage, authorization, data flow and read-only network safety.</p>
        </div>
        <div className="release-decision">
          <CheckCircle2 />
          <span><small>Audit decision</small><strong>Passed</strong><em>Ready for controlled device commissioning</em></span>
        </div>
      </section>

      <section className="release-summary" aria-label="Version 66 audit summary">
        <article><CircleGauge /><span><small>Integration checks</small><strong>50 / 50</strong><em>All required checks passed</em></span></article>
        <article><Gauge /><span><small>Code-quality findings</small><strong>0</strong><em>32 warnings removed</em></span></article>
        <article><FileCheck2 /><span><small>Resolved audit findings</small><strong>6</strong><em>Evidence retained below</em></span></article>
        <article><RadioTower /><span><small>Device probes</small><strong>Paused</strong><em>Equipment arrives next week</em></span></article>
      </section>

      <section className="release-domain-grid">
        {auditDomains.map(({ name, checks, icon: Icon, evidence }) => (
          <article className="panel release-domain" key={name}>
            <header><Icon /><b><CheckCircle2 />Passed</b></header>
            <h3>{name}</h3>
            <strong>{checks} checks</strong>
            <p>{evidence}</p>
          </article>
        ))}
      </section>

      <section className="release-evidence-grid">
        <article className="panel release-findings">
          <header>
            <div><span className="panel-kicker">RESOLVED FINDINGS</span><h3>Audit corrections included in version 66</h3><p>Each correction closes a measurable release risk rather than changing network equipment.</p></div>
            <ShieldCheck />
          </header>
          <div className="release-finding-list">
            {resolvedFindings.map((finding) => (
              <button className={selectedFinding.id === finding.id ? "active" : ""} key={finding.id} onClick={() => setSelectedFinding(finding)}>
                <span><small>{finding.id}</small><strong>{finding.title}</strong><em>{finding.after}</em></span>
                <ChevronRight />
              </button>
            ))}
          </div>
        </article>

        <article className="panel release-finding-detail">
          <span className="panel-kicker">{selectedFinding.id} · CLOSED</span>
          <h3>{selectedFinding.title}</h3>
          <dl>
            <div><dt>Audit observation</dt><dd>{selectedFinding.before}</dd></div>
            <div><dt>Release correction</dt><dd>{selectedFinding.after}</dd></div>
            <div><dt>Verification</dt><dd>Included in the production build and integration suite</dd></div>
          </dl>
          <div><CheckCircle2 /><span><strong>Correction verified</strong><small>No real device, credential value or network configuration was used.</small></span></div>
          <button className="secondary-button" onClick={() => notify(`${selectedFinding.id} evidence selected for export.`)}>Prepare evidence</button>
        </article>
      </section>

      <section className="panel release-roadmap">
        <header>
          <div><span className="panel-kicker">CONTROLLED PATH TO PRODUCTION</span><h3>Three device-backed checkpoints remain</h3><p>Draft intake and synthetic rehearsals reduce commissioning work, but they never substitute for these hardware-backed gates.</p></div>
          <b><TriangleAlert />External equipment required</b>
        </header>
        <div>
          {nextVersions.map((item) => (
            <article key={item.version}>
              <span>{item.version}</span>
              <div><strong>{item.title}</strong><p>{item.detail}</p></div>
              <b>{item.state}</b>
            </article>
          ))}
        </div>
        <footer><ShieldCheck /> Real-device polling, SNMP credential validation and network configuration writes remain disabled.</footer>
      </section>

      {notice && <div className="app-toast"><CheckCircle2 size={16} />{notice}</div>}
    </main>
  );
}
