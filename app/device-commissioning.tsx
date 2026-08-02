"use client";

import {
  Ban,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  MapPin,
  PauseCircle,
  Printer,
  RadioTower,
  RotateCcw,
  Router,
  ShieldCheck,
  TriangleAlert,
  UserRoundCheck,
  Wifi,
} from "lucide-react";
import { useState } from "react";
import "./device-commissioning.css";

type Vendor = "MikroTik" | "Ubiquiti";

const runbooks = {
  MikroTik: {
    model: "RouterOS router",
    method: "SNMP GET · read-only",
    metrics: "Identity, uptime, CPU, memory, interfaces, traffic",
    owner: "Network Team",
    icon: Router,
  },
  Ubiquiti: {
    model: "airMAX / AirFiber radio",
    method: "SNMP GET · read-only",
    metrics: "Identity, uptime, signal, noise, CCQ, capacity",
    owner: "Wireless Team",
    icon: Wifi,
  },
} satisfies Record<Vendor, { model: string; method: string; metrics: string; owner: string; icon: typeof Router }>;

const phases = [
  { id: "01", name: "Asset handover", evidence: "Serial, model, site, management owner", state: "Waiting" },
  { id: "02", name: "Safe preflight", evidence: "Approved address, collector path, credential reference", state: "Locked" },
  { id: "03", name: "Identity verification", evidence: "sysObjectID, hostname, firmware and device match", state: "Locked" },
  { id: "04", name: "Metric validation", evidence: "Required OIDs return plausible read-only values", state: "Locked" },
  { id: "05", name: "Baseline observation", evidence: "30-minute stable sample window with no sequence gaps", state: "Locked" },
  { id: "06", name: "Operational acceptance", evidence: "Topology, alert and named approval evidence", state: "Locked" },
];

const abortRules = [
  "Target identity differs from the registered asset",
  "A requested OID is unsupported, unsafe or returns implausible data",
  "Collector clock drift, packet loss or sample gaps make evidence unreliable",
  "Any command would change device configuration or interrupt customer traffic",
];

const roleCards = [
  { role: "Commissioning lead", duty: "Owns the window and the go/no-go decision", icon: UserRoundCheck },
  { role: "Device custodian", duty: "Confirms asset identity and management path", icon: Router },
  { role: "NOC observer", duty: "Validates telemetry, topology and alert behaviour", icon: RadioTower },
  { role: "Approver", duty: "Accepts evidence after the observation period", icon: ShieldCheck },
];

export default function DeviceCommissioning() {
  const [vendor, setVendor] = useState<Vendor>("MikroTik");
  const [notice, setNotice] = useState("");
  const profile = runbooks[vendor];
  const VendorIcon = profile.icon;
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  return (
    <main className="commission-page">
      <section className="commission-hero">
        <div>
          <p className="eyebrow">MODULE 44 · DEVICE COMMISSIONING</p>
          <h2>Commission next week&apos;s equipment with evidence, not assumptions</h2>
          <p>Use one controlled runbook from physical handover to read-only monitoring acceptance. Every probe stays paused until the device is present and the commissioning window is approved.</p>
        </div>
        <div className="commission-hero-actions">
          <button className="secondary-button" onClick={() => window.print()}><Printer size={15} />Print runbook</button>
          <button className="primary-button" onClick={() => notify("Commissioning pack prepared. No device was contacted.")}><ClipboardCheck size={15} />Prepare pack</button>
        </div>
      </section>

      <section className="commission-summary" aria-label="Commissioning readiness summary">
        <article><FileCheck2 /><span><small>Approved templates</small><strong>2</strong><em>MikroTik and Ubiquiti</em></span></article>
        <article><Clock3 /><span><small>Equipment status</small><strong>Next week</strong><em>Physical handover pending</em></span></article>
        <article><PauseCircle /><span><small>Active device probes</small><strong>0</strong><em>Fail-closed until approval</em></span></article>
        <article><Ban /><span><small>Network writes</small><strong>Disabled</strong><em>Monitoring-only boundary</em></span></article>
      </section>

      <section className="commission-grid">
        <article className="panel commission-runbook">
          <header>
            <div><span className="panel-kicker">COMMISSIONING RUNBOOK</span><h3>Device-specific acceptance path</h3><p>Choose the equipment family to review its read-only collection contract.</p></div>
            <div className="vendor-tabs" role="tablist" aria-label="Commissioning device family">
              {(Object.keys(runbooks) as Vendor[]).map((name) => (
                <button key={name} role="tab" aria-selected={vendor === name} className={vendor === name ? "active" : ""} onClick={() => setVendor(name)}>{name}</button>
              ))}
            </div>
          </header>

          <div className="commission-profile">
            <VendorIcon />
            <span><small>Target profile</small><strong>{vendor} {profile.model}</strong><em>{profile.method}</em></span>
            <span><small>Required telemetry</small><strong>{profile.metrics}</strong><em>Unsupported fields remain unknown</em></span>
            <span><small>Technical owner</small><strong>{profile.owner}</strong><em>Named approval still required</em></span>
          </div>

          <div className="phase-list">
            {phases.map((phase) => (
              <button key={phase.id} onClick={() => notify(`${phase.name}: evidence requirements opened.`)}>
                <b>{phase.id}</b>
                <span><strong>{phase.name}</strong><small>{phase.evidence}</small></span>
                <em className={phase.state.toLowerCase()}>{phase.state}</em>
              </button>
            ))}
          </div>
          <footer><PauseCircle />Steps unlock sequentially only after the prior evidence is recorded and reviewed.</footer>
        </article>

        <article className="panel commission-gate">
          <header><div><span className="panel-kicker">GO / NO-GO GATE</span><h3>Commissioning remains blocked</h3><p>The current status is correct until the physical equipment is available.</p></div><b className="commission-blocked"><TriangleAlert />No-go</b></header>
          <div className="blocker-list">
            <span><i />Equipment not yet handed to the commissioning team</span>
            <span><i />Management address and site path not yet verified</span>
            <span><i />Protected SNMP credential reference not yet assigned</span>
            <span><i />Device-matched OID evidence not yet captured</span>
          </div>
          <div className="commission-window">
            <span><MapPin /><small>Location</small><strong>Confirm on arrival</strong></span>
            <span><Clock3 /><small>Window</small><strong>Schedule next week</strong></span>
          </div>
          <button className="primary-button" disabled><ShieldCheck size={15} />Approve live polling</button>
          <small className="gate-note">Approval becomes available only after all mandatory evidence passes.</small>
        </article>
      </section>

      <section className="commission-bottom">
        <article className="panel commission-roles">
          <header><div><span className="panel-kicker">NAMED OWNERSHIP</span><h3>Who must be present</h3></div><UserRoundCheck size={20} /></header>
          <div>{roleCards.map(({ role, duty, icon: Icon }) => <span key={role}><Icon /><b>{role}</b><small>{duty}</small></span>)}</div>
        </article>

        <article className="panel commission-abort">
          <header><div><span className="panel-kicker">ABORT & RECOVERY</span><h3>Stop safely when evidence is weak</h3></div><RotateCcw size={20} /></header>
          <ul>{abortRules.map((rule) => <li key={rule}><TriangleAlert />{rule}</li>)}</ul>
          <footer>Recovery action: stop the adapter, preserve the evidence, quarantine incomplete samples and return the device to its previous monitoring state. No network configuration is changed.</footer>
        </article>
      </section>

      {notice && <div className="app-toast"><CheckCircle2 size={16} />{notice}</div>}
    </main>
  );
}
