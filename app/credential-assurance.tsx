"use client";

import {
  Ban,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  EyeOff,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  RefreshCcw,
  RotateCw,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useMemo, useState } from "react";
import "./credential-assurance.css";

type ReferenceState = "Ready" | "Waiting" | "Review";

const references = [
  {
    id: "REF-CUDY-AVAIL-01",
    label: "Cudy availability collector",
    method: "Bearer token",
    scope: "DOXA collector → Cudy pilot",
    store: "Collector runtime environment",
    binding: "NOCX_COLLECTOR_TOKEN",
    state: "Ready" as ReferenceState,
    validated: "23 Jul · 09:14 EAT",
    rotation: "21 Aug 2026",
    version: "v3",
    detail: "The active collector uses a runtime-injected value. NOCX stores only this reference and validation evidence.",
  },
  {
    id: "REF-MT-SNMP-01",
    label: "MikroTik SNMPv3 monitoring",
    method: "SNMPv3 authPriv",
    scope: "Next MikroTik router · site pending",
    store: "Not assigned",
    binding: "Created after physical handover",
    state: "Waiting" as ReferenceState,
    validated: "Not tested",
    rotation: "Set after activation",
    version: "—",
    detail: "No credential exists yet. The reference remains blocked until the actual device, site and collector path are confirmed.",
  },
  {
    id: "REF-UBNT-SNMP-01",
    label: "Ubiquiti wireless monitoring",
    method: "SNMPv3 authPriv",
    scope: "Next airMAX / AirFiber radio · site pending",
    store: "Not assigned",
    binding: "Created after physical handover",
    state: "Waiting" as ReferenceState,
    validated: "Not tested",
    rotation: "Set after activation",
    version: "—",
    detail: "The planned radio has no secret value or active binding. RF polling cannot start from a placeholder reference.",
  },
];

const gates = [
  { label: "Exact scope match", detail: "Device, site and collector must match", state: "Ready" },
  { label: "Runtime injection", detail: "Value never enters the interface or database", state: "Ready" },
  { label: "Safe validation", detail: "Identity-only check with redacted evidence", state: "Ready" },
  { label: "Named approval", detail: "Activation and rotation need accountable owners", state: "Ready" },
  { label: "Equipment present", detail: "Required before creating new references", state: "Waiting" },
];

const rotationEvents = [
  { time: "23 Jul · 09:14", title: "Cudy reference validated", detail: "Runtime binding accepted; digest recorded without the token value", state: "Passed" },
  { time: "22 Jul · 18:40", title: "Prior Cudy version retired", detail: "Version v2 revoked after the v3 acceptance check", state: "Passed" },
  { time: "Next week", title: "MikroTik and Ubiquiti references", detail: "Create only after asset identity and management paths are confirmed", state: "Waiting" },
];

export default function CredentialAssurance() {
  const [selectedId, setSelectedId] = useState(references[0].id);
  const [filter, setFilter] = useState<"All" | ReferenceState>("All");
  const [notice, setNotice] = useState("");
  const selected = references.find((reference) => reference.id === selectedId) ?? references[0];
  const visibleReferences = useMemo(
    () => references.filter((reference) => filter === "All" || reference.state === filter),
    [filter],
  );
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };

  return (
    <main className="credential-page">
      <section className="credential-hero">
        <div>
          <p className="eyebrow">MODULE 45 · CREDENTIAL ASSURANCE</p>
          <h2>Reference monitoring secrets without exposing them</h2>
          <p>NOCX governs who may use a credential, where it is injected, when it was validated and when it must rotate. Secret values never enter the interface, audit log or operational database.</p>
        </div>
        <button className="primary-button" onClick={() => notify("Reference pack prepared. No secret value was created or requested.")}>
          <ClipboardCheck size={15} />Prepare next-week pack
        </button>
      </section>

      <section className="credential-summary" aria-label="Credential readiness summary">
        <article><ShieldCheck /><span><small>Ready references</small><strong>1</strong><em>Existing Cudy collector</em></span></article>
        <article><Clock3 /><span><small>Waiting for equipment</small><strong>2</strong><em>MikroTik and Ubiquiti</em></span></article>
        <article><EyeOff /><span><small>Secret values in NOCX</small><strong>0</strong><em>Metadata and evidence only</em></span></article>
        <article><RotateCw /><span><small>Rotation overdue</small><strong>0</strong><em>Next review 21 Aug</em></span></article>
      </section>

      <section className="credential-grid">
        <article className="panel credential-register">
          <header>
            <div>
              <span className="panel-kicker">PROTECTED REFERENCE REGISTER</span>
              <h3>Monitoring access assignments</h3>
              <p>References identify a secret without retrieving or displaying its value.</p>
            </div>
            <div className="credential-filters" aria-label="Filter credential references">
              {(["All", "Ready", "Waiting", "Review"] as const).map((item) => (
                <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>
              ))}
            </div>
          </header>
          <div className="credential-table">
            <div><span>Reference</span><span>Method</span><span>Scope</span><span>State</span></div>
            {visibleReferences.map((reference) => (
              <button key={reference.id} className={selectedId === reference.id ? "selected" : ""} onClick={() => setSelectedId(reference.id)}>
                <span><b>{reference.label}</b><small>{reference.id}</small></span>
                <span><b>{reference.method}</b><small>{reference.version}</small></span>
                <span><b>{reference.scope}</b><small>{reference.store}</small></span>
                <em className={reference.state.toLowerCase()}>{reference.state}</em>
              </button>
            ))}
          </div>
          <footer><LockKeyhole size={15} />Only logical references, ownership, policy and redacted evidence are persisted.</footer>
        </article>

        <article className="panel credential-detail">
          <header>
            <div>
              <span className="panel-kicker">REFERENCE INSPECTOR</span>
              <h3>{selected.label}</h3>
              <p>{selected.id}</p>
            </div>
            <span className={`credential-state ${selected.state.toLowerCase()}`}>{selected.state}</span>
          </header>
          <div className="credential-binding">
            <Fingerprint />
            <span><small>Runtime binding</small><strong>{selected.binding}</strong></span>
          </div>
          <dl>
            <div><dt>Authentication</dt><dd>{selected.method}</dd></div>
            <div><dt>Protected store</dt><dd>{selected.store}</dd></div>
            <div><dt>Last validation</dt><dd>{selected.validated}</dd></div>
            <div><dt>Next rotation</dt><dd>{selected.rotation}</dd></div>
          </dl>
          <p className="credential-detail-note">{selected.detail}</p>
          <button className="secondary-button" disabled={selected.state !== "Ready"} onClick={() => notify("Safe reference check recorded. No credential value was returned.")}>
            <RefreshCcw size={14} />Run safe reference check
          </button>
        </article>
      </section>

      <section className="panel credential-gates">
        <header>
          <div>
            <span className="panel-kicker">COMMISSIONING CREDENTIAL GATE</span>
            <h3>All five conditions must pass before read-only polling</h3>
          </div>
          <span className="credential-blocked"><Ban size={14} />New devices blocked</span>
        </header>
        <div>
          {gates.map((gate) => (
            <button key={gate.label} onClick={() => notify(`${gate.label}: ${gate.detail}.`)}>
              {gate.state === "Ready" ? <CheckCircle2 /> : <TriangleAlert />}
              <span><strong>{gate.label}</strong><small>{gate.detail}</small></span>
              <em className={gate.state.toLowerCase()}>{gate.state}</em>
            </button>
          ))}
        </div>
        <footer>Credential readiness does not authorize network changes. MikroTik and Ubiquiti probes remain paused until next week&apos;s approved commissioning window.</footer>
      </section>

      <section className="credential-bottom">
        <article className="panel credential-policy">
          <header><div><span className="panel-kicker">SECRET-HANDLING POLICY</span><h3>Fail closed at every boundary</h3></div><KeyRound /></header>
          <div>
            <span><CheckCircle2 /><b>No values in D1</b><small>Database records contain metadata and evidence digests only.</small></span>
            <span><CheckCircle2 /><b>No values in logs</b><small>Errors use stable codes and never echo authentication material.</small></span>
            <span><CheckCircle2 /><b>Least privilege</b><small>Each reference is restricted to an exact collector and target scope.</small></span>
            <span><CheckCircle2 /><b>Two-person recovery</b><small>Emergency access requires approval, expiry and post-use rotation.</small></span>
          </div>
        </article>

        <article className="panel credential-rotation">
          <header><div><span className="panel-kicker">ROTATION & VALIDATION EVIDENCE</span><h3>Append-only reference history</h3></div><RotateCw /></header>
          <div>
            {rotationEvents.map((event) => (
              <span key={`${event.time}-${event.title}`}>
                {event.state === "Passed" ? <CheckCircle2 /> : <Clock3 />}
                <time>{event.time}</time>
                <b>{event.title}</b>
                <small>{event.detail}</small>
              </span>
            ))}
          </div>
        </article>
      </section>
      {notice && <div className="app-toast"><CheckCircle2 size={16} />{notice}</div>}
    </main>
  );
}
