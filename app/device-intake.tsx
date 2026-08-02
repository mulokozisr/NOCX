"use client";

import {
  Ban,
  CheckCircle2,
  ChevronRight,
  Download,
  FileCheck2,
  FileUp,
  KeyRound,
  ListChecks,
  RadioTower,
  Router,
  ShieldCheck,
  TriangleAlert,
  UploadCloud,
  Wifi,
} from "lucide-react";
import { ChangeEvent, useMemo, useRef, useState } from "react";
import "./device-intake.css";

type Vendor = "MikroTik" | "Ubiquiti";
type IntakeTemplate = {
  vendor: Vendor;
  family: string;
  collection: string;
  required: string[];
  metrics: string;
  icon: typeof Router;
};

type ParsedRow = {
  hostname: string;
  vendor: string;
  model: string;
  serial: string;
  site: string;
  managementAddress: string;
  collectorId: string;
  snmpMode: string;
  credentialReferenceId: string;
  owner: string;
};

const headers = [
  "hostname",
  "vendor",
  "model",
  "serial",
  "site",
  "management_address",
  "collector_id",
  "snmp_mode",
  "credential_reference_id",
  "owner",
];

const templates: IntakeTemplate[] = [
  {
    vendor: "MikroTik",
    family: "RouterOS router",
    collection: "SNMP GET · read-only",
    required: ["Exact model and serial", "Single management address", "Collector and site", "SNMP credential reference"],
    metrics: "Identity, uptime, CPU, memory and interfaces",
    icon: Router,
  },
  {
    vendor: "Ubiquiti",
    family: "airMAX / AirFiber",
    collection: "SNMP GET · read-only",
    required: ["Exact model and serial", "Single management address", "Link role and site", "SNMP credential reference"],
    metrics: "Identity, uptime, signal, noise, CCQ and capacity",
    icon: Wifi,
  },
];

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (quoted && line[index + 1] === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell.trim());
  return cells;
}

function parseCsv(source: string): ParsedRow[] {
  const lines = source.replaceAll("\r\n", "\n").split("\n").filter((line) => line.trim());
  if (lines.length < 2) return [];
  const incomingHeaders = parseCsvLine(lines[0]).map((value) => value.toLowerCase());
  if (headers.some((header) => !incomingHeaders.includes(header))) throw new Error("The CSV does not match the approved intake template.");
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const value = (header: string) => values[incomingHeaders.indexOf(header)]?.trim() ?? "";
    return {
      hostname: value("hostname"),
      vendor: value("vendor"),
      model: value("model"),
      serial: value("serial"),
      site: value("site"),
      managementAddress: value("management_address"),
      collectorId: value("collector_id"),
      snmpMode: value("snmp_mode"),
      credentialReferenceId: value("credential_reference_id"),
      owner: value("owner"),
    };
  });
}

function validateRows(rows: ParsedRow[]) {
  const errors: string[] = [];
  if (rows.length === 0) errors.push("No device rows were found.");
  if (rows.length > 100) errors.push("A batch cannot contain more than 100 devices.");
  const identityKeys = new Set<string>();
  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    const required = [row.hostname, row.vendor, row.model, row.serial, row.site, row.managementAddress, row.collectorId, row.snmpMode, row.credentialReferenceId, row.owner];
    if (required.some((value) => !value)) errors.push(`Row ${rowNumber}: every approved field is required.`);
    if (!["MikroTik", "Ubiquiti"].includes(row.vendor)) errors.push(`Row ${rowNumber}: vendor must be MikroTik or Ubiquiti.`);
    if (!["SNMPv3", "SNMPv2c-read-only"].includes(row.snmpMode)) errors.push(`Row ${rowNumber}: unsupported SNMP mode.`);
    if (/[/\\*]/.test(row.managementAddress)) errors.push(`Row ${rowNumber}: use one exact management address, not a range or wildcard.`);
    const identity = `${row.vendor.toLowerCase()}:${row.serial.toLowerCase()}`;
    if (identityKeys.has(identity)) errors.push(`Row ${rowNumber}: duplicate vendor and serial in this batch.`);
    identityKeys.add(identity);
  });
  return errors;
}

export default function DeviceIntake() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor>("MikroTik");
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const selected = useMemo(() => templates.find((template) => template.vendor === selectedVendor) ?? templates[0], [selectedVendor]);
  const SelectedIcon = selected.icon;

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3000);
  };

  const downloadTemplate = () => {
    const example = [
      headers.join(","),
      "router-example,MikroTik,RB4011,REPLACE-SERIAL,REPLACE-SITE,10.0.0.10,COLLECTOR-ID,SNMPv3,CREDENTIAL-REFERENCE-ID,Network Team",
      "radio-example,Ubiquiti,REPLACE-MODEL,REPLACE-SERIAL,REPLACE-SITE,10.0.0.11,COLLECTOR-ID,SNMPv3,CREDENTIAL-REFERENCE-ID,Wireless Team",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([example], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "nocx-device-intake-template.csv";
    link.click();
    URL.revokeObjectURL(url);
    notify("Approved CSV template downloaded. Replace every example value before staging.");
  };

  const loadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = parseCsv(await file.text());
      const findings = validateRows(parsed);
      setFileName(file.name);
      setRows(parsed);
      setErrors(findings);
    } catch (error) {
      setFileName(file.name);
      setRows([]);
      setErrors([error instanceof Error ? error.message : "The CSV could not be read."]);
    }
  };

  const stageDraft = async () => {
    if (errors.length || !rows.length || submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/platform/device-intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fileName, rows }),
      });
      const result = await response.json() as { error?: string; accepted?: number; status?: string };
      if (!response.ok) throw new Error(result.error ?? "The intake batch was not accepted.");
      notify(`${result.accepted ?? rows.length} devices staged as draft. Polling remains disabled.`);
      setRows([]);
      setErrors([]);
      setFileName("");
      if (fileInput.current) fileInput.current.value = "";
    } catch (error) {
      setErrors([error instanceof Error ? error.message : "The intake batch was not accepted."]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="intake-page">
      <section className="intake-hero">
        <div>
          <p className="eyebrow">MODULE 47 · PRE-COMMISSIONING INTAKE</p>
          <h2>Prepare next week&apos;s devices without contacting them</h2>
          <p>Stage exact MikroTik and Ubiquiti inventory as draft records, detect unsafe or duplicate input, and preserve the live-device acceptance gate.</p>
        </div>
        <div className="intake-hero-actions">
          <button className="secondary-button" onClick={downloadTemplate}><Download size={15} />Download CSV template</button>
          <button className="primary-button" onClick={() => fileInput.current?.click()}><FileUp size={15} />Select completed CSV</button>
          <input ref={fileInput} type="file" accept=".csv,text/csv" onChange={loadFile} aria-label="Select completed device intake CSV" />
        </div>
      </section>

      <section className="intake-summary" aria-label="Pre-commissioning intake status">
        <article><ListChecks /><span><small>Prepared vendor paths</small><strong>2</strong><em>MikroTik and Ubiquiti</em></span></article>
        <article><RadioTower /><span><small>Active probes</small><strong>0</strong><em>Hardware not yet available</em></span></article>
        <article><KeyRound /><span><small>Secret values accepted</small><strong>0</strong><em>References only</em></span></article>
        <article><Ban /><span><small>Network writes</small><strong>Disabled</strong><em>Draft intake cannot activate devices</em></span></article>
      </section>

      <section className="intake-grid">
        <article className="panel intake-templates">
          <header>
            <div><span className="panel-kicker">VENDOR INTAKE CONTRACT</span><h3>Choose a preparation path</h3><p>Both paths remain draft-only until physical handover.</p></div>
            <ShieldCheck />
          </header>
          <div className="intake-template-list">
            {templates.map(({ vendor, family, icon: Icon }) => (
              <button key={vendor} className={vendor === selectedVendor ? "active" : ""} onClick={() => setSelectedVendor(vendor)}>
                <Icon /><span><strong>{vendor}</strong><small>{family}</small></span><ChevronRight />
              </button>
            ))}
          </div>
          <section className="intake-template-detail">
            <div><SelectedIcon /><span><small>Collection contract</small><strong>{selected.collection}</strong></span></div>
            <p>{selected.metrics}</p>
            {selected.required.map((item) => <span key={item}><CheckCircle2 />{item}</span>)}
          </section>
        </article>

        <article className="panel intake-upload">
          <header>
            <div><span className="panel-kicker">BATCH VALIDATION</span><h3>{fileName || "No CSV selected"}</h3><p>Maximum 100 exact device records per batch.</p></div>
            <UploadCloud />
          </header>
          {!fileName ? (
            <div className="intake-empty">
              <FileCheck2 />
              <strong>Use the approved template</strong>
              <p>Complete it after the device model, serial, site, management address, collector and credential reference are known.</p>
            </div>
          ) : (
            <div className="intake-validation">
              <div className={errors.length ? "blocked" : "passed"}>
                {errors.length ? <TriangleAlert /> : <CheckCircle2 />}
                <span><strong>{errors.length ? "Validation blocked" : "Ready to stage"}</strong><small>{rows.length} device rows inspected</small></span>
              </div>
              {errors.length > 0 ? <ul>{errors.slice(0, 6).map((error) => <li key={error}>{error}</li>)}</ul> : (
                <ul>
                  <li>All required fields are present.</li>
                  <li>Vendor, SNMP mode and exact-address rules pass.</li>
                  <li>No duplicate vendor and serial pair exists in this file.</li>
                </ul>
              )}
            </div>
          )}
          <footer>
            <button className="secondary-button" onClick={() => fileInput.current?.click()}>Choose another file</button>
            <button className="primary-button" disabled={!rows.length || errors.length > 0 || submitting} onClick={stageDraft}>
              <FileCheck2 size={14} />{submitting ? "Staging…" : "Stage as draft"}
            </button>
          </footer>
        </article>
      </section>

      <section className="panel intake-safeguards">
        <header><div><span className="panel-kicker">FAIL-CLOSED INTAKE BOUNDARY</span><h3>A draft is not a commissioned device</h3></div><ShieldCheck /></header>
        <div>
          <span><CheckCircle2 />Duplicate hostnames, serials and management addresses are rejected.</span>
          <span><CheckCircle2 />Secret, password, token and SNMP community values are rejected.</span>
          <span><CheckCircle2 />CIDR ranges, wildcards and broad scan targets are not accepted.</span>
          <span><CheckCircle2 />Staging never enables polling, activation or network configuration writes.</span>
        </div>
      </section>

      {notice && <div className="app-toast"><CheckCircle2 size={16} />{notice}</div>}
    </main>
  );
}
