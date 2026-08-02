"use client";

import {
  AlertOctagon,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Filter,
  GitMerge,
  MessageSquare,
  Radio,
  Search,
  Server,
  ShieldAlert,
  TicketCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Severity = "Emergency" | "Critical" | "High" | "Warning" | "Information";
type AlertStatus = "Unacknowledged" | "Acknowledged" | "Suppressed";
type AlertItem = {
  id: string;
  title: string;
  source: string;
  site: string;
  severity: Severity;
  status: AlertStatus;
  age: string;
  metric: string;
  threshold: string;
  customers: number;
  rootCause?: string;
};
type IncidentStatus = "Open" | "Investigating" | "Monitoring" | "Resolved";
type IncidentItem = {
  id: string;
  title: string;
  severity: Exclude<Severity,"Information">;
  status: IncidentStatus;
  owner: string;
  age: string;
  sla: string;
  customers: number;
  alerts: number;
  rootCause: string;
  site: string;
};

const seedAlerts: AlertItem[] = [
  { id:"ALT-4821", title:"Backhaul packet loss above threshold", source:"NORTH-AF5XHD-01", site:"North Backhaul", severity:"Critical", status:"Unacknowledged", age:"18 min", metric:"8.4% packet loss", threshold:"> 3% for 5 minutes", customers:126, rootCause:"INC-2407" },
  { id:"ALT-4818", title:"Interface utilization sustained above 85%", source:"PJE-RB4011-01", site:"Paje Tower", severity:"Warning", status:"Acknowledged", age:"42 min", metric:"88% utilization", threshold:"> 85% for 15 minutes", customers:44, rootCause:"INC-2404" },
  { id:"ALT-4813", title:"UPS battery temperature critical", source:"KND-UPS-01", site:"Kendwa POP", severity:"High", status:"Acknowledged", age:"1h 12m", metric:"49.2°C", threshold:"> 45°C for 10 minutes", customers:14, rootCause:"INC-2398" },
  { id:"ALT-4809", title:"Device CPU load persistently high", source:"JMB-RB960-01", site:"Jambo Beach", severity:"High", status:"Unacknowledged", age:"1h 38m", metric:"88% CPU", threshold:"> 80% for 20 minutes", customers:67 },
  { id:"ALT-4802", title:"Customer CPE unreachable", source:"BWJ-LBE5AC-04", site:"Bwejuu", severity:"Warning", status:"Unacknowledged", age:"24 min", metric:"No ICMP response", threshold:"3 consecutive polls", customers:1 },
  { id:"ALT-4794", title:"Wireless signal degradation", source:"PJE-SECTOR-02", site:"Paje Tower", severity:"Warning", status:"Suppressed", age:"2h 06m", metric:"−76 dBm", threshold:"< −72 dBm", customers:18, rootCause:"INC-2404" },
  { id:"ALT-4779", title:"Configuration backup completed", source:"CORE-RTR-01", site:"Michenzani Core", severity:"Information", status:"Acknowledged", age:"3h 24m", metric:"Checksum verified", threshold:"Scheduled task", customers:0 },
  { id:"ALT-4772", title:"Edge firewall session spike", source:"HQ-FGT-01", site:"Zannet HQ", severity:"High", status:"Acknowledged", age:"4h 10m", metric:"18,402 sessions", threshold:"> 18,000 sessions", customers:0 },
];

const seedIncidents: IncidentItem[] = [
  { id:"INC-2407", title:"North backhaul service degradation", severity:"Critical", status:"Investigating", owner:"Network Team", age:"18 min", sla:"42 min remaining", customers:126, alerts:7, rootCause:"High packet loss on airFiber 5XHD link", site:"North Backhaul" },
  { id:"INC-2404", title:"Paje tower capacity saturation", severity:"Warning", status:"Monitoring", owner:"Scalion M.", age:"42 min", sla:"2h 18m remaining", customers:44, alerts:4, rootCause:"Sustained backhaul utilization above 85%", site:"Paje Tower" },
  { id:"INC-2398", title:"Kendwa UPS battery overheating", severity:"High", status:"Open", owner:"Field Team", age:"1h 12m", sla:"48 min remaining", customers:14, alerts:3, rootCause:"Battery bank temperature above safe limit", site:"Kendwa POP" },
  { id:"INC-2391", title:"Kibweni wireless link interruption", severity:"High", status:"Resolved", owner:"Network Team", age:"Resolved 10:15", sla:"Met · 12m MTTR", customers:48, alerts:6, rootCause:"Remote radio restarted after watchdog lock", site:"Kibweni" },
];

const severityRank: Record<Severity,number> = {Emergency:5,Critical:4,High:3,Warning:2,Information:1};

function incidentAge(openedAt:string,resolvedAt:string|null) {
  if(resolvedAt)return `Resolved ${new Date(resolvedAt).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}`;
  const seconds=Math.max(0,Math.round((Date.now()-new Date(openedAt).getTime())/1000));
  if(seconds<60)return `${seconds}s`;
  if(seconds<3600)return `${Math.floor(seconds/60)} min`;
  return `${Math.floor(seconds/3600)}h ${Math.floor((seconds%3600)/60)}m`;
}

function SeverityPill({severity}:{severity:Severity}) { return <span className={`severity-pill sev-${severity.toLowerCase()}`}><i/>{severity}</span>; }

export default function AlertsIncidents({initialTab="alerts"}:{initialTab?:"alerts"|"incidents"}) {
  const [tab,setTab] = useState<"alerts"|"incidents">(initialTab);
  const [query,setQuery] = useState("");
  const [severity,setSeverity] = useState("All severities");
  const [alertStatus,setAlertStatus] = useState("All statuses");
  const [selectedAlert,setSelectedAlert] = useState<AlertItem|null>(null);
  const [selectedIncident,setSelectedIncident] = useState<IncidentItem|null>(null);
  const [acknowledged,setAcknowledged] = useState<string[]>([]);
  const [notice,setNotice] = useState("");
  const [liveIncidents,setLiveIncidents] = useState<IncidentItem[]>([]);

  useEffect(()=>{
    let active=true;
    const load=()=>void fetch("/api/platform/status",{cache:"no-store"}).then(response=>response.ok?response.json():Promise.reject(new Error("Live incidents unavailable"))).then(data=>{
      if(!active)return;
      const items:IncidentItem[]=(data.cudy?.incidents??[]).map((incident:{id:string;title:string;severity:string;status:string;affectedCustomers:number;openedAt:string;resolvedAt:string|null})=>({
        id:incident.id,
        title:incident.title,
        severity:"Critical",
        status:incident.status==="resolved"?"Resolved":"Open",
        owner:"NOC Automation",
        age:incidentAge(incident.openedAt,incident.resolvedAt),
        sla:incident.status==="resolved"?"Automatically restored":"Detection confirmed",
        customers:incident.affectedCustomers,
        alerts:3,
        rootCause:"Three consecutive Cudy ICMP probes failed through the DOXA WireGuard path",
        site:"WireGuard pilot",
      }));
      setLiveIncidents(items);
    }).catch(()=>{});
    load();const timer=window.setInterval(load,2000);return()=>{active=false;window.clearInterval(timer)};
  },[]);

  const allIncidents=useMemo(()=>[...liveIncidents,...seedIncidents],[liveIncidents]);

  const filteredAlerts = useMemo(()=>seedAlerts.filter((alert)=>{
    const text=`${alert.id} ${alert.title} ${alert.source} ${alert.site}`.toLowerCase();
    const effectiveStatus=acknowledged.includes(alert.id)?"Acknowledged":alert.status;
    return text.includes(query.toLowerCase())&&(severity==="All severities"||alert.severity===severity)&&(alertStatus==="All statuses"||effectiveStatus===alertStatus);
  }).sort((a,b)=>severityRank[b.severity]-severityRank[a.severity]),[query,severity,alertStatus,acknowledged]);

  const filteredIncidents = useMemo(()=>allIncidents.filter((incident)=>`${incident.id} ${incident.title} ${incident.site} ${incident.owner}`.toLowerCase().includes(query.toLowerCase())&&(severity==="All severities"||incident.severity===severity)),[allIncidents,query,severity]);
  const openIncidentCount=allIncidents.filter(item=>item.status!=="Resolved").length;

  const notify=(message:string)=>{setNotice(message);window.setTimeout(()=>setNotice(""),2600)};
  const acknowledge=(alert:AlertItem)=>{setAcknowledged((items)=>[...items,alert.id]);setSelectedAlert({...alert,status:"Acknowledged"});notify(`${alert.id} acknowledged.`)};

  return <main className="alert-page">
    <section className="alert-hero"><div><p className="eyebrow">MODULE 03 · EVENT OPERATIONS</p><h2>Alerts & incident management</h2><p>Detect, correlate and resolve network problems before service impact grows.</p></div><div className="alert-hero-actions"><button className="secondary-button" onClick={()=>notify("Alert rules refreshed successfully.")}><Filter size={15}/> Alert rules</button><button className="primary-button" onClick={()=>{setTab("incidents");notify("New incident workspace opened.")}}><TicketCheck size={15}/> Create incident</button></div></section>

    <section className="alert-summary" aria-label="Alert and incident summary">
      <button onClick={()=>{setTab("alerts");setSeverity("All severities");}}><span className="alert-stat-icon stat-blue"><Bell size={18}/></span><div><small>Active alerts</small><strong>27</strong><em>12 unacknowledged</em></div></button>
      <button onClick={()=>{setTab("alerts");setSeverity("Critical");}}><span className="alert-stat-icon stat-red"><AlertOctagon size={18}/></span><div><small>Critical</small><strong>3</strong><em>1 emergency escalation</em></div></button>
      <button onClick={()=>setTab("incidents")}><span className="alert-stat-icon stat-amber"><ShieldAlert size={18}/></span><div><small>Open incidents</small><strong>{openIncidentCount}</strong><em>{liveIncidents.some(item=>item.status!=="Resolved")?"Cudy incident active":"Live monitoring clear"}</em></div></button>
      <button onClick={()=>setTab("incidents")}><span className="alert-stat-icon stat-violet"><Clock3 size={18}/></span><div><small>Mean acknowledge</small><strong>4m 18s</strong><em>Target under 5 minutes</em></div></button>
      <button onClick={()=>setTab("incidents")}><span className="alert-stat-icon stat-red"><Users size={18}/></span><div><small>Customers affected</small><strong>184</strong><em>Across 4 active incidents</em></div></button>
    </section>

    <section className="correlation-strip"><span className="correlation-icon"><GitMerge size={18}/></span><div><strong>Root-cause correlation active</strong><p>14 downstream alerts are grouped under 3 root incidents. Duplicate notifications are being suppressed.</p></div><div className="correlation-counts"><span><strong>14</strong> correlated</span><span><strong>9</strong> suppressed</span><span><strong>3</strong> root causes</span></div><button className="text-button" onClick={()=>notify("Correlation view selected.")}>Review groups</button></section>

    <section className="event-workspace panel">
      <div className="event-tabs"><button className={tab==="alerts"?"event-tab-active":""} onClick={()=>setTab("alerts")}><Bell size={15}/>Alert queue<span>27</span></button><button className={tab==="incidents"?"event-tab-active":""} onClick={()=>setTab("incidents")}><TicketCheck size={15}/>Incidents<span>{allIncidents.length}</span></button></div>
      <div className="event-toolbar"><label className="event-search"><Search size={15}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={`Search ${tab}...`} aria-label={`Search ${tab}`}/>{query&&<button aria-label="Clear event search" onClick={()=>setQuery("")}><X size={13}/></button>}</label><label className="event-select"><select value={severity} onChange={(e)=>setSeverity(e.target.value)} aria-label="Filter severity">{["All severities","Emergency","Critical","High","Warning","Information"].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label>{tab==="alerts"&&<label className="event-select"><select value={alertStatus} onChange={(e)=>setAlertStatus(e.target.value)} aria-label="Filter alert status">{["All statuses","Unacknowledged","Acknowledged","Suppressed"].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label>}<span className="event-live"><i/>Live updates</span></div>

      {tab==="alerts"?<div className="alert-table-wrap"><table className="alert-table"><thead><tr><th>Severity</th><th>Alert</th><th>Source</th><th>Site</th><th>Status</th><th>Age</th><th>Impact</th><th/></tr></thead><tbody>{filteredAlerts.map((alert)=>{const status=acknowledged.includes(alert.id)?"Acknowledged":alert.status;return <tr key={alert.id} onClick={()=>setSelectedAlert({...alert,status})}><td><SeverityPill severity={alert.severity}/></td><td><span className="alert-title"><strong>{alert.title}</strong><small>{alert.id} · {alert.metric}</small></span></td><td><span className="alert-source"><i>{alert.source.includes("AF")||alert.source.includes("LBE")?<Radio size={14}/>:<Server size={14}/>}</i><span><strong>{alert.source}</strong><small>{alert.threshold}</small></span></span></td><td>{alert.site}</td><td><span className={`event-status event-${status.toLowerCase()}`}>{status}</span></td><td><span className="event-age"><Clock3 size={12}/>{alert.age}</span></td><td>{alert.customers>0?<span className="impact-count"><Users size={12}/>{alert.customers}</span>:<span className="muted-value">None</span>}</td><td><button className="row-action" aria-label={`Open ${alert.id}`} onClick={(e)=>{e.stopPropagation();setSelectedAlert({...alert,status})}}><ChevronRight size={16}/></button></td></tr>})}</tbody></table>{filteredAlerts.length===0&&<div className="empty-devices"><Search size={24}/><strong>No alerts match these filters</strong><p>Change the severity, status or search query.</p></div>}</div>:
      <div className="incident-list-view">{filteredIncidents.map((incident)=><button key={incident.id} className="incident-card" onClick={()=>setSelectedIncident(incident)}><span className={`incident-accent accent-${incident.severity.toLowerCase()}`}/><div className="incident-main"><span><SeverityPill severity={incident.severity}/><em>{incident.id}</em></span><h3>{incident.title}</h3><p>{incident.rootCause}</p><div className="incident-meta"><span><Server size={12}/>{incident.site}</span><span><Users size={12}/>{incident.customers} customers</span><span><Bell size={12}/>{incident.alerts} correlated alerts</span></div></div><div className="incident-owner"><small>Status</small><span className={`incident-state state-${incident.status.toLowerCase()}`}>{incident.status}</span><small>Owner</small><strong><UserRound size={12}/>{incident.owner}</strong></div><div className="incident-sla"><small>SLA target</small><strong>{incident.sla}</strong><span><Clock3 size={12}/>{incident.age}</span></div><ChevronRight size={17} className="incident-card-arrow"/></button>)}</div>}
      <div className="event-footer"><span>Live Cudy incidents plus operational seed data · Refreshes every 2 seconds</span><div><button disabled>Previous</button><button className="page-current">1</button><button>2</button><button>Next</button></div></div>
    </section>

    {notice&&<div className="toast" role="status"><CheckCircle2 size={18}/>{notice}</div>}

    {selectedAlert&&<div className="drawer-layer"><button className="drawer-scrim" aria-label="Close alert details" onClick={()=>setSelectedAlert(null)}/><aside className="event-drawer" aria-label={`${selectedAlert.id} alert details`}><div className="drawer-head"><div><span className="panel-kicker">{selectedAlert.id} · DETECTED {selectedAlert.age.toUpperCase()} AGO</span><h2>{selectedAlert.title}</h2><p>{selectedAlert.source} · {selectedAlert.site}</p></div><button className="icon-button" aria-label="Close alert" onClick={()=>setSelectedAlert(null)}><X size={20}/></button></div><div className="event-drawer-badges"><SeverityPill severity={selectedAlert.severity}/><span className={`event-status event-${selectedAlert.status.toLowerCase()}`}>{selectedAlert.status}</span>{selectedAlert.rootCause&&<span className="correlated-badge"><GitMerge size={12}/>Correlated to {selectedAlert.rootCause}</span>}</div><section className="event-metric-card"><span><small>Observed value</small><strong>{selectedAlert.metric}</strong></span><ChevronRight size={17}/><span><small>Trigger threshold</small><strong>{selectedAlert.threshold}</strong></span></section><section className="device-detail-section"><h3>Operational impact</h3><dl><div><dt>Affected customers</dt><dd>{selectedAlert.customers}</dd></div><div><dt>Detection source</dt><dd>Real-time monitoring</dd></div><div><dt>Dependency suppression</dt><dd>{selectedAlert.rootCause?"Active":"Not required"}</dd></div><div><dt>Notification state</dt><dd>{selectedAlert.status==="Suppressed"?"Suppressed":"NOC notified"}</dd></div></dl></section><section className="alert-activity"><h3>Alert activity</h3><div><i/><span><strong>Threshold breached</strong><small>{selectedAlert.age} ago · NOCX collector</small></span></div><div><i/><span><strong>Customer impact calculated</strong><small>{selectedAlert.customers} dependent services identified</small></span></div><div><i className="activity-pending"/><span><strong>{selectedAlert.status==="Acknowledged"?"Acknowledged by operator":"Awaiting acknowledgement"}</strong><small>{selectedAlert.status==="Acknowledged"?"Response workflow active":"Escalates automatically in 3 minutes"}</small></span></div></section><div className="drawer-actions">{selectedAlert.status!=="Acknowledged"&&<button className="primary-button" onClick={()=>acknowledge(selectedAlert)}>Acknowledge alert</button>}<button className="secondary-button" onClick={()=>{setSelectedAlert(null);setTab("incidents");notify("Incident created from alert.")}}>Create incident</button></div></aside></div>}

    {selectedIncident&&<div className="drawer-layer"><button className="drawer-scrim" aria-label="Close incident details" onClick={()=>setSelectedIncident(null)}/><aside className="incident-detail-drawer" aria-label={`${selectedIncident.id} incident details`}><div className="drawer-head"><div><span className="panel-kicker">{selectedIncident.id} · {selectedIncident.age.toUpperCase()}</span><h2>{selectedIncident.title}</h2><p>{selectedIncident.site}</p></div><button className="icon-button" aria-label="Close incident" onClick={()=>setSelectedIncident(null)}><X size={20}/></button></div><div className="event-drawer-badges"><SeverityPill severity={selectedIncident.severity}/><span className={`incident-state state-${selectedIncident.status.toLowerCase()}`}>{selectedIncident.status}</span></div><section className="incident-impact-banner"><Users size={20}/><div><strong>{selectedIncident.customers} customers affected</strong><small>{selectedIncident.alerts} alerts correlated under this root incident</small></div><span>{selectedIncident.sla}</span></section><section className="device-detail-section"><h3>Incident ownership</h3><dl><div><dt>Assigned team</dt><dd>{selectedIncident.owner}</dd></div><div><dt>Root cause</dt><dd>{selectedIncident.rootCause}</dd></div></dl></section><section className="incident-timeline"><h3>Timeline</h3><div><i/><span><strong>Incident automatically created</strong><small>Root-cause correlation grouped dependent alerts</small></span></div><div><i/><span><strong>Customer impact calculated</strong><small>{selectedIncident.customers} services linked through topology</small></span></div><div><i/><span><strong>Assigned to {selectedIncident.owner}</strong><small>Escalation policy applied</small></span></div><div><i className="timeline-current"/><span><strong>{selectedIncident.status}</strong><small>Technical investigation and recovery in progress</small></span></div></section><section className="incident-comment"><MessageSquare size={15}/><input placeholder="Add an operational update..." aria-label="Incident comment"/><button onClick={()=>notify("Incident update added.")}>Add</button></section><div className="drawer-actions"><button className="primary-button" onClick={()=>notify(`${selectedIncident.id} moved to monitoring.`)}>Update status</button><button className="secondary-button">Assign team</button></div></aside></div>}
  </main>;
}
