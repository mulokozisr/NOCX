"use client";

import {
  AlertTriangle,
  ArchiveRestore,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  Code2,
  Download,
  FileCheck2,
  FileClock,
  GitCompareArrows,
  HardDriveDownload,
  History,
  LockKeyhole,
  Play,
  Plus,
  RefreshCw,
  Router,
  Search,
  Server,
  ShieldCheck,
  UserRoundCheck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type BackupStatus = "Success" | "Failed" | "Running";
type DriftStatus = "In sync" | "Drift detected" | "Unreviewed";
type ChangeStatus = "Pending approval" | "Approved" | "Scheduled" | "In progress" | "Completed" | "Rejected";

type Backup = {
  id: string;
  device: string;
  site: string;
  vendor: string;
  model: string;
  address: string;
  version: string;
  lastBackup: string;
  ageMinutes: number;
  size: string;
  status: BackupStatus;
  drift: DriftStatus;
  changedLines: number;
  retention: string;
};

type Change = {
  id: string;
  title: string;
  description: string;
  type: string;
  risk: "Low" | "Medium" | "High" | "Critical";
  status: ChangeStatus;
  window: string;
  owner: string;
  approver: string;
  devices: number;
  customers: number;
  rollback: string;
};

const backups: Backup[] = [
  { id: "CFG-8874", device: "CORE-RTR-01", site: "Michenzani Core", vendor: "Juniper", model: "MX204", address: "10.20.0.1", version: "v184", lastBackup: "2 minutes ago", ageMinutes: 2, size: "1.8 MB", status: "Success", drift: "In sync", changedLines: 0, retention: "365 days" },
  { id: "CFG-8873", device: "BNW-EDGE-02", site: "Bububu Edge", vendor: "MikroTik", model: "CCR2116", address: "10.20.4.2", version: "v96", lastBackup: "8 minutes ago", ageMinutes: 8, size: "842 KB", status: "Success", drift: "Drift detected", changedLines: 12, retention: "180 days" },
  { id: "CFG-8872", device: "PAJE-AGG-01", site: "Paje Tower", vendor: "Cisco", model: "ASR1001-X", address: "10.21.8.1", version: "v142", lastBackup: "17 minutes ago", ageMinutes: 17, size: "2.4 MB", status: "Success", drift: "Unreviewed", changedLines: 5, retention: "365 days" },
  { id: "CFG-8871", device: "KNDW-SW-03", site: "Kendwa POP", vendor: "Cisco", model: "C9300-24T", address: "10.23.3.3", version: "v211", lastBackup: "34 minutes ago", ageMinutes: 34, size: "628 KB", status: "Success", drift: "In sync", changedLines: 0, retention: "180 days" },
  { id: "CFG-8870", device: "NUNGWI-AF-07", site: "Nungwi Sector 7", vendor: "Ubiquiti", model: "AF-5XHD", address: "10.24.7.7", version: "v61", lastBackup: "1 hour ago", ageMinutes: 64, size: "188 KB", status: "Failed", drift: "Unreviewed", changedLines: 0, retention: "90 days" },
  { id: "CFG-8869", device: "FUMBA-OLT-01", site: "Fumba Exchange", vendor: "Huawei", model: "MA5800-X7", address: "10.26.0.4", version: "v78", lastBackup: "1 hour ago", ageMinutes: 81, size: "3.1 MB", status: "Success", drift: "Drift detected", changedLines: 28, retention: "365 days" },
  { id: "CFG-8868", device: "MBW-EDGE-01", site: "Mwanakwerekwe", vendor: "MikroTik", model: "CCR2004", address: "10.27.1.1", version: "v113", lastBackup: "2 hours ago", ageMinutes: 126, size: "774 KB", status: "Running", drift: "In sync", changedLines: 0, retention: "180 days" },
  { id: "CFG-8867", device: "JMBN-SW-02", site: "Jambiani POP", vendor: "Cisco", model: "C9200L", address: "10.29.2.2", version: "v158", lastBackup: "3 hours ago", ageMinutes: 186, size: "512 KB", status: "Failed", drift: "Unreviewed", changedLines: 0, retention: "180 days" },
];

const changes: Change[] = [
  { id: "CHG-1062", title: "Increase Paje backhaul capacity", description: "Move the Paje aggregation uplink to the prepared 2 Gbps LAG and validate traffic distribution.", type: "Capacity", risk: "Medium", status: "Scheduled", window: "17 Jul · 23:00–23:45", owner: "Amina Juma", approver: "Salim Mussa", devices: 3, customers: 312, rollback: "Restore bundle CFG-8861 and remove the new LAG members." },
  { id: "CHG-1061", title: "BGP local-preference adjustment", description: "Prefer Transit B for selected CDN prefixes while the primary carrier completes maintenance.", type: "Routing", risk: "High", status: "Pending approval", window: "18 Jul · 01:00–01:20", owner: "Kassim Ali", approver: "Network Manager", devices: 2, customers: 2214, rollback: "Apply pre-change route-policy snapshot CFG-8858." },
  { id: "CHG-1060", title: "Nungwi sector firmware upgrade", description: "Upgrade four airFiber radios to the approved stable release and confirm link modulation.", type: "Firmware", risk: "Medium", status: "Approved", window: "18 Jul · 02:00–03:30", owner: "Fatma Said", approver: "Amina Juma", devices: 4, customers: 86, rollback: "Boot previous firmware partition and restore radio profiles." },
  { id: "CHG-1059", title: "Fumba OLT subscriber profile cleanup", description: "Remove unused service profiles and reconcile the running configuration with the golden baseline.", type: "Configuration", risk: "Low", status: "In progress", window: "17 Jul · 11:00–12:00", owner: "Omar Khamis", approver: "Salim Mussa", devices: 1, customers: 0, rollback: "Restore OLT profile export v77." },
  { id: "CHG-1058", title: "Kendwa access VLAN expansion", description: "Add VLANs 417–420 on the Kendwa access stack for new hospitality services.", type: "Provisioning", risk: "Low", status: "Completed", window: "17 Jul · 05:15–05:35", owner: "Neema Omar", approver: "Amina Juma", devices: 3, customers: 0, rollback: "Remove the VLANs and restore the v208 switch snapshots." },
  { id: "CHG-1057", title: "Disable legacy SNMP community", description: "Remove the deprecated read-only community after confirming all collectors use SNMPv3.", type: "Security", risk: "Critical", status: "Rejected", window: "Not scheduled", owner: "Hassan Suleiman", approver: "Security Review", devices: 42, customers: 0, rollback: "Reapply the community through the emergency automation job." },
];

const driftItems = [
  { device: "FUMBA-OLT-01", change: "28 lines", detail: "Service profile and AAA server order", age: "46m", severity: "High" },
  { device: "BNW-EDGE-02", change: "12 lines", detail: "NAT rule and address-list differences", age: "1h 12m", severity: "Medium" },
  { device: "PAJE-AGG-01", change: "5 lines", detail: "Interface description changed", age: "2h 06m", severity: "Low" },
];

function statusClass(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function BackupStatusPill({ status }: { status: BackupStatus }) {
  const Icon = status === "Success" ? CheckCircle2 : status === "Failed" ? CircleAlert : RefreshCw;
  return <span className={`change-status change-${statusClass(status)}`}><Icon size={12} />{status}</span>;
}

function RiskPill({ risk }: { risk: Change["risk"] }) {
  return <span className={`change-risk risk-${risk.toLowerCase()}`}><i />{risk}</span>;
}

export default function ChangeManagement() {
  const [tab, setTab] = useState<"Overview" | "Backups" | "Changes" | "Compliance">("Overview");
  const [query, setQuery] = useState("");
  const [backupFilter, setBackupFilter] = useState("All results");
  const [changeFilter, setChangeFilter] = useState("All statuses");
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
  const [selectedChange, setSelectedChange] = useState<Change | null>(null);
  const [notice, setNotice] = useState("");

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };

  const filteredBackups = useMemo(() => backups.filter((backup) => {
    const matchesQuery = `${backup.device} ${backup.site} ${backup.vendor} ${backup.address}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = backupFilter === "All results" || backup.status === backupFilter;
    return matchesQuery && matchesStatus;
  }), [query, backupFilter]);

  const filteredChanges = useMemo(() => changes.filter((change) => {
    const matchesQuery = `${change.id} ${change.title} ${change.owner} ${change.type}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = changeFilter === "All statuses" || change.status === changeFilter;
    return matchesQuery && matchesStatus;
  }), [query, changeFilter]);

  const openBackup = (backup: Backup) => {
    setSelectedChange(null);
    setSelectedBackup(backup);
  };

  const openChange = (change: Change) => {
    setSelectedBackup(null);
    setSelectedChange(change);
  };

  return <main className="changes-page">
    <section className="changes-hero">
      <div><p className="eyebrow">MODULE 07 · CHANGE CONTROL</p><h2>Configuration backup & change management</h2><p>Protect device configurations, review drift and move network changes through an auditable approval workflow.</p></div>
      <div className="changes-actions"><button className="secondary-button" onClick={() => notify("Backup job started for 486 managed devices.")}><HardDriveDownload size={15} />Back up now</button><button className="primary-button" onClick={() => notify("New change request draft created.")}><Plus size={15} />New change</button></div>
    </section>

    <section className="change-summary" aria-label="Configuration and change summary">
      <button onClick={() => setTab("Backups")}><span className="change-summary-icon summary-blue"><ArchiveRestore size={19} /></span><span><small>Backup coverage</small><strong>99.2%</strong><em>482 of 486 devices protected</em></span></button>
      <button onClick={() => { setTab("Backups"); setBackupFilter("Failed"); }}><span className="change-summary-icon summary-red"><AlertTriangle size={19} /></span><span><small>Backup failures</small><strong>4</strong><em>2 require credentials review</em></span></button>
      <button onClick={() => setTab("Overview")}><span className="change-summary-icon summary-amber"><GitCompareArrows size={19} /></span><span><small>Configuration drift</small><strong>3</strong><em>45 lines outside baseline</em></span></button>
      <button onClick={() => { setTab("Changes"); setChangeFilter("Pending approval"); }}><span className="change-summary-icon summary-violet"><UserRoundCheck size={19} /></span><span><small>Awaiting approval</small><strong>7</strong><em>2 high-risk requests</em></span></button>
      <button onClick={() => setTab("Changes")}><span className="change-summary-icon summary-green"><CalendarClock size={19} /></span><span><small>Next maintenance</small><strong>23:00</strong><em>Paje capacity upgrade</em></span></button>
    </section>

    <nav className="changes-tabs" aria-label="Change management sections">
      {(["Overview", "Backups", "Changes", "Compliance"] as const).map((item) => <button key={item} className={tab === item ? "changes-tab-active" : ""} onClick={() => { setTab(item); setQuery(""); }}>{item}{item === "Backups" && <span>486</span>}{item === "Changes" && <span>18</span>}</button>)}
    </nav>

    {tab === "Overview" && <>
      <section className="change-overview-grid">
        <article className="panel backup-health-panel">
          <div className="panel-heading"><div><span className="panel-kicker">LAST 24 HOURS</span><h3>Automated backup health</h3></div><button className="text-button" onClick={() => setTab("Backups")}>View all</button></div>
          <div className="backup-health-body">
            <div className="backup-donut" aria-label="99.2 percent successful backups"><div><strong>99.2%</strong><span>successful</span></div></div>
            <div className="backup-health-metrics"><div><i className="dot-green" /><span><small>Successful</small><strong>482</strong></span></div><div><i className="dot-red" /><span><small>Failed</small><strong>4</strong></span></div><div><i className="dot-blue" /><span><small>Median duration</small><strong>18 sec</strong></span></div></div>
          </div>
          <div className="backup-bars" aria-label="Seven day backup results">{[97,99,98,99,100,98,99].map((value,index)=><div key={index}><span style={{height:`${value * .55}px`}} /><small>{["Fri","Sat","Sun","Mon","Tue","Wed","Thu"][index]}</small></div>)}</div>
        </article>

        <article className="panel drift-panel">
          <div className="panel-heading"><div><span className="panel-kicker">BASELINE CONTROL</span><h3>Configuration drift</h3></div><span className="drift-count">3 detected</span></div>
          <div className="drift-list">{driftItems.map((item)=><button key={item.device} onClick={()=>openBackup(backups.find((backup)=>backup.device===item.device)!)}><span className={`drift-severity drift-${item.severity.toLowerCase()}`}><GitCompareArrows size={15}/></span><span><strong>{item.device}</strong><small>{item.detail}</small></span><span><strong>{item.change}</strong><small>{item.age}</small></span><ChevronRight size={15}/></button>)}</div>
          <button className="drift-review" onClick={()=>{setTab("Backups");setBackupFilter("All results")}}>Review all differences <ChevronRight size={14}/></button>
        </article>

        <article className="panel change-window-panel">
          <div className="panel-heading"><div><span className="panel-kicker">UPCOMING WINDOWS</span><h3>Change schedule</h3></div><button className="icon-button" aria-label="Open schedule" onClick={()=>setTab("Changes")}><CalendarClock size={17}/></button></div>
          <div className="change-date"><div><strong>17</strong><small>JUL</small></div><span>Today · EAT</span></div>
          <div className="window-timeline"><i/><button onClick={()=>openChange(changes[0])}><time>23:00</time><span><strong>CHG-1062 · Paje capacity</strong><small>45 min · 3 devices · Medium risk</small></span><ChevronRight size={15}/></button><button onClick={()=>openChange(changes[1])}><time>01:00</time><span><strong>CHG-1061 · BGP policy</strong><small>Tomorrow · Pending approval</small></span><ChevronRight size={15}/></button><button onClick={()=>openChange(changes[2])}><time>02:00</time><span><strong>CHG-1060 · Nungwi firmware</strong><small>Tomorrow · Approved</small></span><ChevronRight size={15}/></button></div>
        </article>
      </section>

      <section className="panel recent-change-panel">
        <div className="panel-heading"><div><span className="panel-kicker">CHANGE PIPELINE</span><h3>Active and upcoming changes</h3></div><button className="text-button" onClick={()=>setTab("Changes")}>Open change register</button></div>
        <div className="compact-change-table"><table><thead><tr><th>Change</th><th>Type</th><th>Risk</th><th>Window</th><th>Owner</th><th>Status</th><th/></tr></thead><tbody>{changes.slice(0,5).map((change)=><tr key={change.id} onClick={()=>openChange(change)}><td><span className="change-title-cell"><strong>{change.title}</strong><small>{change.id} · {change.devices} devices</small></span></td><td>{change.type}</td><td><RiskPill risk={change.risk}/></td><td>{change.window}</td><td>{change.owner}</td><td><span className={`workflow-status workflow-${statusClass(change.status)}`}>{change.status}</span></td><td><ChevronRight size={15}/></td></tr>)}</tbody></table></div>
      </section>
    </>}

    {tab === "Backups" && <section className="panel change-register-panel">
      <div className="change-register-head"><div><span className="panel-kicker">CONFIGURATION ARCHIVE</span><h3>Device backups</h3><p>Automatic encrypted snapshots with version history and drift comparison.</p></div><div className="change-table-actions"><button className="secondary-button" onClick={()=>notify("Backup inventory exported.")}><Download size={14}/>Export</button><button className="primary-button" onClick={()=>notify("Backup job queued for all managed devices.")}><Play size={14}/>Run backup</button></div></div>
      <div className="change-toolbar"><label className="change-search"><Search size={14}/><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search devices, sites or IPs..." aria-label="Search device backups"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear backup search"><X size={13}/></button>}</label><label className="change-select"><select value={backupFilter} onChange={(event)=>setBackupFilter(event.target.value)} aria-label="Filter backup result">{["All results","Success","Failed","Running"].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label><span className="change-last-run"><RefreshCw size={12}/>Last run 2 minutes ago</span></div>
      <div className="backup-table-wrap"><table className="backup-table"><thead><tr><th>Device</th><th>Vendor / model</th><th>Version</th><th>Last backup</th><th>Size</th><th>Result</th><th>Baseline</th><th/></tr></thead><tbody>{filteredBackups.map((backup)=><tr key={backup.id} onClick={()=>openBackup(backup)}><td><span className="backup-device"><i>{backup.vendor==="MikroTik"?<Router size={15}/>:<Server size={15}/>}</i><span><strong>{backup.device}</strong><small>{backup.site} · {backup.address}</small></span></span></td><td><span className="stacked-cell"><strong>{backup.vendor}</strong><small>{backup.model}</small></span></td><td><code>{backup.version}</code></td><td><span className="backup-age"><Clock3 size={12}/>{backup.lastBackup}</span></td><td>{backup.size}</td><td><BackupStatusPill status={backup.status}/></td><td><span className={`baseline-status baseline-${statusClass(backup.drift)}`}>{backup.drift==="In sync"?<Check size={11}/>:<GitCompareArrows size={11}/>} {backup.drift}{backup.changedLines>0&&` · ${backup.changedLines}`}</span></td><td><button className="row-action" onClick={(event)=>{event.stopPropagation();openBackup(backup)}} aria-label={`Inspect ${backup.device} backups`}><ChevronRight size={16}/></button></td></tr>)}</tbody></table>{filteredBackups.length===0&&<div className="change-empty"><Search size={25}/><strong>No backups match these filters</strong><p>Adjust the result filter or search query.</p></div>}</div>
    </section>}

    {tab === "Changes" && <section className="panel change-register-panel">
      <div className="change-register-head"><div><span className="panel-kicker">AUDITED WORKFLOW</span><h3>Change register</h3><p>Plan, approve, execute and verify every production network change.</p></div><button className="primary-button" onClick={()=>notify("New change request draft created.")}><Plus size={14}/>New change request</button></div>
      <div className="change-toolbar"><label className="change-search"><Search size={14}/><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search changes, owners or IDs..." aria-label="Search changes"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear change search"><X size={13}/></button>}</label><label className="change-select"><select value={changeFilter} onChange={(event)=>setChangeFilter(event.target.value)} aria-label="Filter change status">{["All statuses","Pending approval","Approved","Scheduled","In progress","Completed","Rejected"].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label><span className="change-last-run"><ShieldCheck size={12}/>18 changes this month</span></div>
      <div className="backup-table-wrap"><table className="backup-table changes-table"><thead><tr><th>Change</th><th>Type</th><th>Risk</th><th>Maintenance window</th><th>Owner</th><th>Impact</th><th>Status</th><th/></tr></thead><tbody>{filteredChanges.map((change)=><tr key={change.id} onClick={()=>openChange(change)}><td><span className="change-title-cell"><strong>{change.title}</strong><small>{change.id} · {change.devices} devices</small></span></td><td>{change.type}</td><td><RiskPill risk={change.risk}/></td><td>{change.window}</td><td>{change.owner}</td><td><span className={change.customers>0?"change-impact":"muted-value"}>{change.customers>0?`${change.customers} customers`:"No outage"}</span></td><td><span className={`workflow-status workflow-${statusClass(change.status)}`}>{change.status}</span></td><td><button className="row-action" onClick={(event)=>{event.stopPropagation();openChange(change)}} aria-label={`Inspect ${change.id}`}><ChevronRight size={16}/></button></td></tr>)}</tbody></table>{filteredChanges.length===0&&<div className="change-empty"><Search size={25}/><strong>No changes match these filters</strong><p>Adjust the status filter or search query.</p></div>}</div>
    </section>}

    {tab === "Compliance" && <section className="compliance-grid">
      <article className="panel compliance-score"><div className="compliance-ring"><strong>96</strong><span>/ 100</span></div><div><span className="panel-kicker">CONTROL POSTURE</span><h3>Configuration compliance</h3><p>Seven of eight controls meet the current NOC policy baseline.</p><button className="secondary-button" onClick={()=>notify("Compliance evidence pack prepared.")}><FileCheck2 size={14}/>Export evidence</button></div></article>
      {[{icon:LockKeyhole,title:"Encrypted archives",detail:"All device snapshots use encrypted storage.",score:"486 / 486",ok:true},{icon:History,title:"Retention policy",detail:"Four device groups require a longer retention period.",score:"482 / 486",ok:false},{icon:UserRoundCheck,title:"Four-eye approval",detail:"High and critical risk changes require two reviewers.",score:"Compliant",ok:true},{icon:FileClock,title:"Backup freshness",detail:"Four devices missed the 24-hour backup objective.",score:"99.2%",ok:false},{icon:Code2,title:"Golden baselines",detail:"Vendor templates are assigned to managed device classes.",score:"14 active",ok:true},{icon:ShieldCheck,title:"Audit evidence",detail:"Change events and restores are retained for 365 days.",score:"Compliant",ok:true}].map(({icon:Icon,title,detail,score,ok})=><article className="panel compliance-card" key={title}><span className={ok?"compliance-ok":"compliance-warn"}><Icon size={17}/></span><div><strong>{title}</strong><p>{detail}</p></div><span><strong>{score}</strong><small>{ok?"Control met":"Review needed"}</small></span></article>)}
    </section>}

    {(selectedBackup || selectedChange) && <div className="change-drawer-layer" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget){setSelectedBackup(null);setSelectedChange(null)}}}>
      <aside className="change-drawer" role="dialog" aria-modal="true" aria-label={selectedBackup?`${selectedBackup.device} backup details`:`${selectedChange?.id} change details`}>
        <div className="drawer-head"><div><span className="panel-kicker">{selectedBackup?"CONFIGURATION VERSION":"CHANGE REQUEST"}</span><h2>{selectedBackup?selectedBackup.device:selectedChange?.id}</h2><p>{selectedBackup?`${selectedBackup.site} · ${selectedBackup.address}`:selectedChange?.title}</p></div><button className="icon-button" aria-label="Close details" onClick={()=>{setSelectedBackup(null);setSelectedChange(null)}}><X size={19}/></button></div>
        {selectedBackup && <>
          <div className="drawer-config-hero"><span className={selectedBackup.status==="Success"?"drawer-config-good":"drawer-config-bad"}>{selectedBackup.status==="Success"?<ShieldCheck size={24}/>:<AlertTriangle size={24}/>}</span><div><small>Latest backup</small><strong>{selectedBackup.version} · {selectedBackup.status}</strong><p>{selectedBackup.lastBackup} · {selectedBackup.size} · retention {selectedBackup.retention}</p></div></div>
          <div className="drawer-action-row"><button className="secondary-button" onClick={()=>notify(`${selectedBackup.device} configuration downloaded.`)}><Download size={14}/>Download</button><button className="primary-button" onClick={()=>notify(`Restore validation started for ${selectedBackup.device}.`)}><ArchiveRestore size={14}/>Restore</button></div>
          <section className="drawer-section"><h3>Configuration baseline</h3><div className={`drawer-baseline baseline-${statusClass(selectedBackup.drift)}`}><GitCompareArrows size={17}/><span><strong>{selectedBackup.drift}</strong><small>{selectedBackup.changedLines>0?`${selectedBackup.changedLines} lines differ from the approved baseline.`:"The running configuration matches the approved baseline."}</small></span></div></section>
          <section className="drawer-section"><h3>Version history</h3><div className="version-history">{[0,1,2,3].map((item)=><article key={item}><span><FileCheck2 size={14}/></span><div><strong>{`v${Number(selectedBackup.version.slice(1))-item}`}</strong><small>{item===0?selectedBackup.lastBackup:`${item+1} days ago`} · automated backup</small></div><em>{item===0?selectedBackup.size:["1.7 MB","1.8 MB","1.6 MB"][item-1]}</em></article>)}</div></section>
          {selectedBackup.changedLines>0&&<section className="drawer-section"><h3>Difference preview</h3><pre className="config-diff"><span>- set services ssh root-login allow</span>{"\n"}<em>+ set services ssh root-login deny</em>{"\n"}<span>- set snmp community noc-public</span>{"\n"}<em>+ set snmp v3 usm local-engine</em></pre></section>}
        </>}
        {selectedChange && <>
          <div className="change-drawer-meta"><RiskPill risk={selectedChange.risk}/><span className={`workflow-status workflow-${statusClass(selectedChange.status)}`}>{selectedChange.status}</span></div>
          <p className="change-drawer-description">{selectedChange.description}</p>
          <div className="change-detail-grid"><div><small>Maintenance window</small><strong>{selectedChange.window}</strong></div><div><small>Change owner</small><strong>{selectedChange.owner}</strong></div><div><small>Approver</small><strong>{selectedChange.approver}</strong></div><div><small>Impact</small><strong>{selectedChange.devices} devices · {selectedChange.customers} customers</strong></div></div>
          <section className="drawer-section"><h3>Approval & execution</h3><div className="change-workflow"><article className="workflow-done"><span><Check size={13}/></span><div><strong>Request submitted</strong><small>16 Jul · 14:22 · {selectedChange.owner}</small></div></article><article className={selectedChange.status==="Pending approval"||selectedChange.status==="Rejected"?"workflow-current":"workflow-done"}><span>{selectedChange.status==="Rejected"?<X size={13}/>:selectedChange.status==="Pending approval"?<Clock3 size={13}/>:<Check size={13}/>}</span><div><strong>{selectedChange.status==="Rejected"?"Approval rejected":selectedChange.status==="Pending approval"?"Awaiting approval":"Change approved"}</strong><small>{selectedChange.approver}</small></div></article><article className={selectedChange.status==="In progress"?"workflow-current":selectedChange.status==="Completed"?"workflow-done":""}><span>{selectedChange.status==="Completed"?<Check size={13}/>:<Play size={13}/>}</span><div><strong>Implementation</strong><small>{selectedChange.window}</small></div></article><article className={selectedChange.status==="Completed"?"workflow-done":""}><span>{selectedChange.status==="Completed"?<Check size={13}/>:<FileCheck2 size={13}/>}</span><div><strong>Post-change validation</strong><small>Health, traffic and configuration checks</small></div></article></div></section>
          <section className="drawer-section"><h3>Rollback plan</h3><div className="rollback-box"><ArchiveRestore size={17}/><p>{selectedChange.rollback}</p></div></section>
          {selectedChange.status==="Pending approval"&&<div className="drawer-approval-actions"><button className="secondary-button" onClick={()=>notify(`${selectedChange.id} returned for revision.`)}><X size={14}/>Request changes</button><button className="primary-button" onClick={()=>notify(`${selectedChange.id} approved and added to the schedule.`)}><Check size={14}/>Approve change</button></div>}
        </>}
      </aside>
    </div>}
    {notice&&<div className="toast"><CheckCircle2 size={16}/>{notice}</div>}
  </main>;
}
