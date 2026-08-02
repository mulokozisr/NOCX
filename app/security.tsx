"use client";

import {
  Activity,
  Ban,
  Bug,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  Fingerprint,
  Globe2,
  Lock,
  RefreshCw,
  Router,
  ScanLine,
  Search,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  UserCheck,
  UserX,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type Severity = "Critical" | "High" | "Medium" | "Low";
type ThreatStatus = "Open" | "Investigating" | "Contained" | "Blocked" | "Resolved";
type AccessResult = "Allowed" | "Denied" | "Challenged";

type Threat = {
  id: string;
  title: string;
  category: string;
  severity: Severity;
  status: ThreatStatus;
  source: string;
  country: string;
  target: string;
  site: string;
  firstSeen: string;
  events: number;
  confidence: number;
  action: string;
  detail: string;
};

type AccessEvent = {
  id: string;
  user: string;
  role: string;
  action: string;
  source: string;
  location: string;
  target: string;
  time: string;
  method: string;
  result: AccessResult;
  risk: "Normal" | "Elevated" | "High";
};

type Vulnerability = {
  id: string;
  title: string;
  cve: string;
  severity: Severity;
  score: string;
  device: string;
  site: string;
  vendor: string;
  exposed: boolean;
  age: string;
  status: "Open" | "Mitigated" | "Accepted";
  remediation: string;
};

const threats: Threat[] = [
  { id:"SEC-4418", title:"Distributed SSH credential attack", category:"Brute force", severity:"Critical", status:"Investigating", source:"185.220.101.44", country:"Multiple origins", target:"CORE-RTR-01", site:"Michenzani Core", firstSeen:"4 minutes ago", events:1842, confidence:98, action:"Rate limit applied; source group under review", detail:"A coordinated set of 46 addresses attempted privileged SSH authentication against the core routing management interface." },
  { id:"SEC-4417", title:"Volumetric UDP flood detected", category:"DDoS", severity:"Critical", status:"Contained", source:"Distributed", country:"Global", target:"Transit A · 196.32.240.0/24", site:"Mazizini Gateway", firstSeen:"11 minutes ago", events:68420, confidence:99, action:"Upstream scrubbing enabled", detail:"Traffic peaked at 3.8 Gbps across UDP/443 and was diverted to the upstream mitigation service." },
  { id:"SEC-4416", title:"Unauthorized BGP session attempt", category:"Routing security", severity:"High", status:"Blocked", source:"172.18.44.8", country:"Internal", target:"BNW-EDGE-02", site:"Bububu Edge", firstSeen:"26 minutes ago", events:7, confidence:96, action:"ACL denied session; peer not configured", detail:"An unrecognized internal address attempted to establish TCP/179 with the Bububu edge router." },
  { id:"SEC-4415", title:"Broadband management port scan", category:"Reconnaissance", severity:"Medium", status:"Open", source:"45.148.10.91", country:"Netherlands", target:"Access management subnet", site:"Zanzibar North", firstSeen:"42 minutes ago", events:684, confidence:91, action:"Observed by edge IDS", detail:"Sequential probing was observed across management ports on 38 access devices." },
  { id:"SEC-4414", title:"Rogue DHCP offer observed", category:"Layer 2", severity:"High", status:"Contained", source:"d4:3a:2f:81:09:bc", country:"Local network", target:"KNDW-SW-03 · VLAN 418", site:"Kendwa POP", firstSeen:"1 hour ago", events:23, confidence:97, action:"Access port quarantined", detail:"DHCP snooping identified unauthorized offers from a customer-facing access port." },
  { id:"SEC-4413", title:"SNMP community enumeration", category:"Credential exposure", severity:"Medium", status:"Resolved", source:"102.217.15.72", country:"Tanzania", target:"NUNGWI-AF-07", site:"Nungwi Sector 7", firstSeen:"2 hours ago", events:91, confidence:88, action:"Source blocked for 24 hours", detail:"Repeated read-community guesses were rejected by the radio management policy." },
  { id:"SEC-4412", title:"DNS tunneling pattern", category:"Data exfiltration", severity:"High", status:"Investigating", source:"10.44.18.206", country:"Subscriber network", target:"Recursive DNS cluster", site:"Fumba Exchange", firstSeen:"3 hours ago", events:318, confidence:83, action:"Subscriber session isolated for review", detail:"High-entropy subdomains and unusual query lengths matched the DNS tunneling detector." },
  { id:"SEC-4411", title:"Admin login outside normal hours", category:"Identity", severity:"Low", status:"Resolved", source:"41.222.88.19", country:"Tanzania", target:"NOCX Administration", site:"Remote access", firstSeen:"5 hours ago", events:1, confidence:74, action:"MFA challenge passed; operator confirmed", detail:"A valid operator session was established outside the user’s established access window." },
];

const accessEvents: AccessEvent[] = [
  { id:"AUD-9027", user:"Amina Juma", role:"Network Engineer", action:"Approved CHG-1062", source:"10.10.8.24", location:"NOC · Stone Town", target:"Change Management", time:"2 minutes ago", method:"SSO + MFA", result:"Allowed", risk:"Normal" },
  { id:"AUD-9026", user:"Unknown", role:"Unauthenticated", action:"SSH login attempt", source:"185.220.101.44", location:"Tor exit relay", target:"CORE-RTR-01", time:"4 minutes ago", method:"Password", result:"Denied", risk:"High" },
  { id:"AUD-9025", user:"Kassim Ali", role:"Senior NOC", action:"Exported device configuration", source:"10.10.8.31", location:"NOC · Stone Town", target:"BNW-EDGE-02", time:"18 minutes ago", method:"SSO + MFA", result:"Allowed", risk:"Normal" },
  { id:"AUD-9024", user:"Fatma Said", role:"Field Engineer", action:"Opened privileged session", source:"102.217.18.61", location:"Paje · Zanzibar", target:"PAJE-AGG-01", time:"31 minutes ago", method:"MFA challenge", result:"Challenged", risk:"Elevated" },
  { id:"AUD-9023", user:"automation-backup", role:"Service account", action:"Read running configuration", source:"10.10.2.12", location:"Management network", target:"486 devices", time:"1 hour ago", method:"SSH certificate", result:"Allowed", risk:"Normal" },
  { id:"AUD-9022", user:"Omar Khamis", role:"NOC Operator", action:"Changed alert suppression", source:"10.10.8.43", location:"NOC · Stone Town", target:"Alert policy ALT-P14", time:"1 hour ago", method:"SSO + MFA", result:"Allowed", risk:"Elevated" },
  { id:"AUD-9021", user:"admin", role:"Local account", action:"Web login attempt", source:"45.148.10.91", location:"Amsterdam, NL", target:"NUNGWI-AF-07", time:"2 hours ago", method:"Password", result:"Denied", risk:"High" },
];

const vulnerabilities: Vulnerability[] = [
  { id:"VUL-218", title:"RouterOS management service validation flaw", cve:"CVE-2026-18422", severity:"Critical", score:"9.8", device:"MBW-EDGE-01", site:"Mwanakwerekwe", vendor:"MikroTik", exposed:false, age:"2 days", status:"Open", remediation:"Upgrade to the approved RouterOS 7.20.3 release during the next maintenance window." },
  { id:"VUL-217", title:"Outdated SSH key exchange algorithms", cve:"POL-SSH-004", severity:"High", score:"8.1", device:"NUNGWI-AF-07", site:"Nungwi Sector 7", vendor:"Ubiquiti", exposed:false, age:"5 days", status:"Open", remediation:"Remove diffie-hellman-group1-sha1 and reissue the management policy baseline." },
  { id:"VUL-216", title:"Web administration exposed to transit", cve:"EXP-WEB-011", severity:"High", score:"8.6", device:"JMBN-SW-02", site:"Jambiani POP", vendor:"Cisco", exposed:true, age:"8 hours", status:"Open", remediation:"Restrict HTTPS administration to the management VRF and approved jump hosts." },
  { id:"VUL-215", title:"SNMPv2 community still enabled", cve:"POL-SNMP-002", severity:"Medium", score:"6.4", device:"PAJE-AGG-01", site:"Paje Tower", vendor:"Cisco", exposed:false, age:"11 days", status:"Mitigated", remediation:"The community is ACL restricted; migrate final collector to SNMPv3 before removal." },
  { id:"VUL-214", title:"Default TLS certificate near expiry", cve:"CERT-EXP-031", severity:"Medium", score:"5.7", device:"FUMBA-OLT-01", site:"Fumba Exchange", vendor:"Huawei", exposed:false, age:"3 days", status:"Open", remediation:"Install the managed device certificate before 24 July 2026." },
  { id:"VUL-213", title:"Legacy management interface required", cve:"POL-MGMT-008", severity:"Low", score:"3.2", device:"KNDW-SW-03", site:"Kendwa POP", vendor:"Cisco", exposed:false, age:"29 days", status:"Accepted", remediation:"Risk accepted until access switch replacement in the Q4 lifecycle program." },
];

const activity = [18,22,17,29,24,31,27,38,44,33,49,41,56,47,62,72,59,84,68,57,91,76,64,48];

function slug(value:string){return value.toLowerCase().replaceAll(" ","-")}

function SeverityPill({severity}:{severity:Severity}){
  return <span className={`security-severity security-${severity.toLowerCase()}`}><i/>{severity}</span>;
}

export default function SecurityMonitoring(){
  const [tab,setTab]=useState<"Overview"|"Threats"|"Access Audit"|"Vulnerabilities">("Overview");
  const [query,setQuery]=useState("");
  const [severity,setSeverity]=useState("All severities");
  const [threatStatus,setThreatStatus]=useState("All statuses");
  const [selectedThreat,setSelectedThreat]=useState<Threat|null>(null);
  const [selectedVulnerability,setSelectedVulnerability]=useState<Vulnerability|null>(null);
  const [selectedAccess,setSelectedAccess]=useState<AccessEvent|null>(null);
  const [notice,setNotice]=useState("");

  const notify=(message:string)=>{setNotice(message);window.setTimeout(()=>setNotice(""),2800)};
  const openThreat=(threat:Threat)=>{setSelectedThreat(threat);setSelectedVulnerability(null);setSelectedAccess(null)};
  const openVulnerability=(item:Vulnerability)=>{setSelectedThreat(null);setSelectedVulnerability(item);setSelectedAccess(null)};
  const openAccess=(item:AccessEvent)=>{setSelectedThreat(null);setSelectedVulnerability(null);setSelectedAccess(item)};
  const closeDrawer=()=>{setSelectedThreat(null);setSelectedVulnerability(null);setSelectedAccess(null)};

  const filteredThreats=useMemo(()=>threats.filter((threat)=>{
    const haystack=`${threat.id} ${threat.title} ${threat.source} ${threat.target} ${threat.site}`.toLowerCase();
    return haystack.includes(query.toLowerCase())&&(severity==="All severities"||threat.severity===severity)&&(threatStatus==="All statuses"||threat.status===threatStatus);
  }),[query,severity,threatStatus]);

  const filteredAccess=useMemo(()=>accessEvents.filter((item)=>`${item.id} ${item.user} ${item.action} ${item.source} ${item.target}`.toLowerCase().includes(query.toLowerCase())),[query]);
  const filteredVulnerabilities=useMemo(()=>vulnerabilities.filter((item)=>`${item.id} ${item.title} ${item.cve} ${item.device} ${item.site}`.toLowerCase().includes(query.toLowerCase())&&(severity==="All severities"||item.severity===severity)),[query,severity]);

  return <main className="security-page">
    <section className="security-hero"><div><p className="eyebrow">MODULE 08 · SECURITY OPERATIONS</p><h2>Security & threat monitoring</h2><p>Correlate network threats, privileged access and device vulnerabilities from a single operational view.</p></div><div className="security-actions"><button className="secondary-button" onClick={()=>notify("Security evidence package exported.")}><Download size={15}/>Export report</button><button className="primary-button" onClick={()=>notify("Active scan queued across 486 managed devices.")}><ScanLine size={15}/>Run security scan</button></div></section>

    <section className="security-summary" aria-label="Security summary">
      <button onClick={()=>{setTab("Threats");setSeverity("Critical")}}><span className="security-summary-icon sec-red"><ShieldAlert size={19}/></span><span><small>Critical threats</small><strong>3</strong><em>2 contained · 1 investigating</em></span></button>
      <button onClick={()=>setTab("Threats")}><span className="security-summary-icon sec-amber"><Activity size={19}/></span><span><small>Events · 24 hours</small><strong>148</strong><em>↓ 12% from yesterday</em></span></button>
      <button onClick={()=>setTab("Threats")}><span className="security-summary-icon sec-green"><Ban size={19}/></span><span><small>Attempts blocked</small><strong>1,248</strong><em>Across 83 source addresses</em></span></button>
      <button onClick={()=>setTab("Vulnerabilities")}><span className="security-summary-icon sec-violet"><Bug size={19}/></span><span><small>Open vulnerabilities</small><strong>17</strong><em>1 internet-exposed</em></span></button>
      <button onClick={()=>setTab("Overview")}><span className="security-summary-icon sec-blue"><ShieldCheck size={19}/></span><span><small>Security posture</small><strong>94 / 100</strong><em>Strong · 2 controls need review</em></span></button>
    </section>

    <nav className="security-tabs" aria-label="Security monitoring sections">{(["Overview","Threats","Access Audit","Vulnerabilities"] as const).map((item)=><button key={item} className={tab===item?"security-tab-active":""} onClick={()=>{setTab(item);setQuery("");setSeverity("All severities")}}>{item}{item==="Threats"&&<span>148</span>}{item==="Vulnerabilities"&&<span>17</span>}</button>)}</nav>

    {tab==="Overview"&&<>
      <section className="security-overview-grid">
        <article className="panel threat-activity-panel"><div className="panel-heading"><div><span className="panel-kicker">DETECTION VOLUME</span><h3>Security activity · 24 hours</h3></div><span className="security-live"><i/>Live</span></div><div className="threat-chart-stats"><div><small>Total events</small><strong>148</strong><em>12% below baseline</em></div><div><small>Peak rate</small><strong>91 / hr</strong><em>20:00 EAT</em></div><div><small>Blocked</small><strong>92%</strong><em>Automatic controls</em></div></div><div className="threat-bars" aria-label="Hourly security events">{activity.map((value,index)=><span key={index} className={value>75?"threat-bar-peak":""} style={{height:`${Math.max(12,value)}%`}} title={`${value} events`}/>)}</div><div className="threat-axis"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span></div></article>
        <article className="panel attack-sources-panel"><div className="panel-heading"><div><span className="panel-kicker">EVENT CLASSIFICATION</span><h3>Threat categories</h3></div><button className="text-button" onClick={()=>setTab("Threats")}>View events</button></div><div className="threat-donut"><div><strong>148</strong><span>events</span></div></div><div className="threat-legend">{[{name:"Brute force",value:"38%",color:"#ef4d56"},{name:"Reconnaissance",value:"26%",color:"#f29a16"},{name:"DDoS",value:"18%",color:"#6d5bd0"},{name:"Policy violations",value:"11%",color:"#2563eb"},{name:"Other",value:"7%",color:"#b8c1cd"}].map((item)=><div key={item.name}><i style={{background:item.color}}/><span>{item.name}</span><strong>{item.value}</strong></div>)}</div></article>
        <article className="panel posture-panel"><div className="panel-heading"><div><span className="panel-kicker">CONTROL HEALTH</span><h3>Security posture</h3></div><span className="posture-score">94</span></div><div className="posture-controls">{[{label:"Management ACL coverage",value:99,status:"good"},{label:"Secure protocol adoption",value:96,status:"good"},{label:"MFA for privileged access",value:100,status:"good"},{label:"Current firmware",value:91,status:"warn"},{label:"Vulnerability remediation",value:86,status:"warn"}].map((item)=><div key={item.label}><span><strong>{item.label}</strong><em>{item.value}%</em></span><i><b className={`posture-${item.status}`} style={{width:`${item.value}%`}}/></i></div>)}</div><button className="posture-action" onClick={()=>setTab("Vulnerabilities")}>Review security gaps <ChevronRight size={14}/></button></article>
      </section>
      <section className="panel live-threat-panel"><div className="panel-heading"><div><span className="panel-kicker">CORRELATED DETECTIONS</span><h3>Live threat feed</h3></div><button className="text-button" onClick={()=>setTab("Threats")}>Open threat register</button></div><div className="security-table-wrap"><table className="security-table"><thead><tr><th>Severity</th><th>Detection</th><th>Source</th><th>Target</th><th>First seen</th><th>Events</th><th>Status</th><th/></tr></thead><tbody>{threats.slice(0,6).map((threat)=><tr key={threat.id} onClick={()=>openThreat(threat)}><td><SeverityPill severity={threat.severity}/></td><td><span className="threat-title"><strong>{threat.title}</strong><small>{threat.id} · {threat.category}</small></span></td><td><span className="threat-source"><Globe2 size={13}/><span><strong>{threat.source}</strong><small>{threat.country}</small></span></span></td><td><span className="stacked-security-cell"><strong>{threat.target}</strong><small>{threat.site}</small></span></td><td>{threat.firstSeen}</td><td>{threat.events.toLocaleString()}</td><td><span className={`threat-status status-${slug(threat.status)}`}>{threat.status}</span></td><td><ChevronRight size={15}/></td></tr>)}</tbody></table></div></section>
    </>}

    {tab==="Threats"&&<section className="panel security-register"><div className="security-register-head"><div><span className="panel-kicker">THREAT REGISTER</span><h3>Correlated security events</h3><p>Prioritized detections from edge controls, device logs and traffic analytics.</p></div><button className="primary-button" onClick={()=>notify("Threat intelligence indicators refreshed.")}><RefreshCw size={14}/>Refresh intelligence</button></div><div className="security-toolbar"><label className="security-search"><Search size={14}/><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search threats, IPs or targets..." aria-label="Search threats"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear threat search"><X size={13}/></button>}</label><label className="security-select"><select value={severity} onChange={(event)=>setSeverity(event.target.value)} aria-label="Filter threat severity">{["All severities","Critical","High","Medium","Low"].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label><label className="security-select"><select value={threatStatus} onChange={(event)=>setThreatStatus(event.target.value)} aria-label="Filter threat status">{["All statuses","Open","Investigating","Contained","Blocked","Resolved"].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label><span className="security-stream"><i/>Streaming detections</span></div><div className="security-table-wrap"><table className="security-table"><thead><tr><th>Severity</th><th>Detection</th><th>Source</th><th>Target</th><th>First seen</th><th>Events</th><th>Confidence</th><th>Status</th><th/></tr></thead><tbody>{filteredThreats.map((threat)=><tr key={threat.id} onClick={()=>openThreat(threat)}><td><SeverityPill severity={threat.severity}/></td><td><span className="threat-title"><strong>{threat.title}</strong><small>{threat.id} · {threat.category}</small></span></td><td><span className="threat-source"><Globe2 size={13}/><span><strong>{threat.source}</strong><small>{threat.country}</small></span></span></td><td><span className="stacked-security-cell"><strong>{threat.target}</strong><small>{threat.site}</small></span></td><td>{threat.firstSeen}</td><td>{threat.events.toLocaleString()}</td><td><span className="confidence-cell"><i><b style={{width:`${threat.confidence}%`}}/></i><strong>{threat.confidence}%</strong></span></td><td><span className={`threat-status status-${slug(threat.status)}`}>{threat.status}</span></td><td><button className="row-action" onClick={(event)=>{event.stopPropagation();openThreat(threat)}} aria-label={`Inspect ${threat.id}`}><ChevronRight size={16}/></button></td></tr>)}</tbody></table>{filteredThreats.length===0&&<div className="security-empty"><Search size={25}/><strong>No threats match these filters</strong><p>Adjust the severity, status or search query.</p></div>}</div></section>}

    {tab==="Access Audit"&&<section className="panel security-register"><div className="security-register-head"><div><span className="panel-kicker">IDENTITY & ACCESS</span><h3>Privileged access audit</h3><p>Operator, service-account and device authentication activity.</p></div><button className="secondary-button" onClick={()=>notify("Access audit exported.")}><Download size={14}/>Export audit</button></div><div className="security-toolbar"><label className="security-search"><Search size={14}/><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search users, sources or actions..." aria-label="Search access audit"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear access search"><X size={13}/></button>}</label><span className="access-policy-badge"><ShieldCheck size={12}/>MFA policy healthy</span></div><div className="security-table-wrap"><table className="security-table access-table"><thead><tr><th>Identity</th><th>Action</th><th>Source</th><th>Target</th><th>Time</th><th>Method</th><th>Risk</th><th>Result</th><th/></tr></thead><tbody>{filteredAccess.map((item)=><tr key={item.id} onClick={()=>openAccess(item)}><td><span className="access-user"><i>{item.user==="Unknown"?<UserX size={14}/>:<UserCheck size={14}/>}</i><span><strong>{item.user}</strong><small>{item.role}</small></span></span></td><td><span className="stacked-security-cell"><strong>{item.action}</strong><small>{item.id}</small></span></td><td><span className="stacked-security-cell"><strong>{item.source}</strong><small>{item.location}</small></span></td><td>{item.target}</td><td>{item.time}</td><td>{item.method}</td><td><span className={`access-risk access-${item.risk.toLowerCase()}`}>{item.risk}</span></td><td><span className={`access-result result-${item.result.toLowerCase()}`}>{item.result}</span></td><td><button className="row-action" onClick={(event)=>{event.stopPropagation();openAccess(item)}} aria-label={`Inspect ${item.id}`}><ChevronRight size={16}/></button></td></tr>)}</tbody></table></div></section>}

    {tab==="Vulnerabilities"&&<section className="panel security-register"><div className="security-register-head"><div><span className="panel-kicker">EXPOSURE MANAGEMENT</span><h3>Device vulnerabilities</h3><p>Firmware, service exposure and policy findings across managed infrastructure.</p></div><button className="primary-button" onClick={()=>notify("Vulnerability scan started for 486 assets.")}><ScanLine size={14}/>Scan assets</button></div><div className="security-toolbar"><label className="security-search"><Search size={14}/><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search findings, CVEs or devices..." aria-label="Search vulnerabilities"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear vulnerability search"><X size={13}/></button>}</label><label className="security-select"><select value={severity} onChange={(event)=>setSeverity(event.target.value)} aria-label="Filter vulnerability severity">{["All severities","Critical","High","Medium","Low"].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label><span className="security-scan-time"><Clock3 size={12}/>Last scan 18 minutes ago</span></div><div className="security-table-wrap"><table className="security-table vulnerability-table"><thead><tr><th>Severity</th><th>Finding</th><th>Device</th><th>Score</th><th>Exposure</th><th>Detected</th><th>Status</th><th/></tr></thead><tbody>{filteredVulnerabilities.map((item)=><tr key={item.id} onClick={()=>openVulnerability(item)}><td><SeverityPill severity={item.severity}/></td><td><span className="threat-title"><strong>{item.title}</strong><small>{item.id} · {item.cve}</small></span></td><td><span className="vulnerability-device"><i>{item.vendor==="MikroTik"?<Router size={14}/>:<Server size={14}/>}</i><span><strong>{item.device}</strong><small>{item.site} · {item.vendor}</small></span></span></td><td><strong className={`vulnerability-score score-${item.severity.toLowerCase()}`}>{item.score}</strong></td><td>{item.exposed?<span className="internet-exposed"><Globe2 size={11}/>Internet</span>:<span className="internal-only"><Lock size={11}/>Internal</span>}</td><td>{item.age}</td><td><span className={`vuln-status vuln-${item.status.toLowerCase()}`}>{item.status}</span></td><td><button className="row-action" onClick={(event)=>{event.stopPropagation();openVulnerability(item)}} aria-label={`Inspect ${item.id}`}><ChevronRight size={16}/></button></td></tr>)}</tbody></table>{filteredVulnerabilities.length===0&&<div className="security-empty"><Search size={25}/><strong>No vulnerabilities match these filters</strong><p>Adjust the severity or search query.</p></div>}</div></section>}

    {(selectedThreat||selectedVulnerability||selectedAccess)&&<div className="security-drawer-layer" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)closeDrawer()}}><aside className="security-drawer" role="dialog" aria-modal="true" aria-label="Security detail"><div className="drawer-head"><div><span className="panel-kicker">{selectedThreat?"SECURITY DETECTION":selectedVulnerability?"VULNERABILITY FINDING":"ACCESS AUDIT EVENT"}</span><h2>{selectedThreat?.id||selectedVulnerability?.id||selectedAccess?.id}</h2><p>{selectedThreat?.title||selectedVulnerability?.title||selectedAccess?.action}</p></div><button className="icon-button" onClick={closeDrawer} aria-label="Close security details"><X size={19}/></button></div>
      {selectedThreat&&<><div className="security-drawer-badges"><SeverityPill severity={selectedThreat.severity}/><span className={`threat-status status-${slug(selectedThreat.status)}`}>{selectedThreat.status}</span><span className="confidence-badge">{selectedThreat.confidence}% confidence</span></div><p className="security-drawer-description">{selectedThreat.detail}</p><div className="security-detail-grid"><div><small>Source</small><strong>{selectedThreat.source}</strong><span>{selectedThreat.country}</span></div><div><small>Target</small><strong>{selectedThreat.target}</strong><span>{selectedThreat.site}</span></div><div><small>First seen</small><strong>{selectedThreat.firstSeen}</strong><span>{selectedThreat.events.toLocaleString()} events</span></div><div><small>Category</small><strong>{selectedThreat.category}</strong><span>Network detection</span></div></div><section className="security-drawer-section"><h3>Automated response</h3><div className="response-box"><ShieldCheck size={18}/><span><strong>{selectedThreat.action}</strong><small>Response policy executed successfully</small></span></div></section><section className="security-drawer-section"><h3>Investigation timeline</h3><div className="security-timeline"><article><span><Zap size={12}/></span><div><strong>Detection correlated</strong><small>{selectedThreat.firstSeen} · edge and device signals matched</small></div></article><article><span><Shield size={12}/></span><div><strong>Automated control applied</strong><small>{selectedThreat.action}</small></div></article><article><span><Eye size={12}/></span><div><strong>Analyst review</strong><small>{selectedThreat.status==="Investigating"?"Assigned to Security Operations":"Evidence reviewed and disposition recorded"}</small></div></article></div></section><div className="security-drawer-actions"><button className="secondary-button" onClick={()=>notify(`${selectedThreat.id} added to the block list.`)}><Ban size={14}/>Block indicator</button><button className="primary-button" onClick={()=>notify(`${selectedThreat.id} containment workflow started.`)}><ShieldCheck size={14}/>Contain threat</button></div></>}
      {selectedVulnerability&&<><div className="security-drawer-badges"><SeverityPill severity={selectedVulnerability.severity}/><span className={`vuln-status vuln-${selectedVulnerability.status.toLowerCase()}`}>{selectedVulnerability.status}</span>{selectedVulnerability.exposed&&<span className="internet-exposed"><Globe2 size={11}/>Internet exposed</span>}</div><div className="vulnerability-hero"><span className={`vulnerability-score score-${selectedVulnerability.severity.toLowerCase()}`}>{selectedVulnerability.score}</span><div><small>Risk score</small><strong>{selectedVulnerability.cve}</strong><p>{selectedVulnerability.device} · {selectedVulnerability.site}</p></div></div><section className="security-drawer-section"><h3>Recommended remediation</h3><div className="remediation-box"><CheckCircle2 size={17}/><p>{selectedVulnerability.remediation}</p></div></section><section className="security-drawer-section"><h3>Asset context</h3><div className="security-detail-grid"><div><small>Device</small><strong>{selectedVulnerability.device}</strong><span>{selectedVulnerability.vendor}</span></div><div><small>Location</small><strong>{selectedVulnerability.site}</strong><span>Managed infrastructure</span></div><div><small>Detected</small><strong>{selectedVulnerability.age} ago</strong><span>Latest scan</span></div><div><small>Exposure</small><strong>{selectedVulnerability.exposed?"Internet reachable":"Internal only"}</strong><span>Management plane</span></div></div></section><div className="security-drawer-actions"><button className="secondary-button" onClick={()=>notify(`${selectedVulnerability.id} risk exception draft created.`)}>Accept risk</button><button className="primary-button" onClick={()=>notify(`Remediation change created for ${selectedVulnerability.device}.`)}>Create remediation change</button></div></>}
      {selectedAccess&&<><div className="security-drawer-badges"><span className={`access-result result-${selectedAccess.result.toLowerCase()}`}>{selectedAccess.result}</span><span className={`access-risk access-${selectedAccess.risk.toLowerCase()}`}>{selectedAccess.risk} risk</span></div><div className="access-identity-hero"><span>{selectedAccess.user==="Unknown"?<UserX size={23}/>:<Fingerprint size={23}/>}</span><div><small>Identity</small><strong>{selectedAccess.user}</strong><p>{selectedAccess.role} · {selectedAccess.method}</p></div></div><div className="security-detail-grid"><div><small>Action</small><strong>{selectedAccess.action}</strong><span>{selectedAccess.time}</span></div><div><small>Target</small><strong>{selectedAccess.target}</strong><span>Protected resource</span></div><div><small>Source</small><strong>{selectedAccess.source}</strong><span>{selectedAccess.location}</span></div><div><small>Authentication</small><strong>{selectedAccess.method}</strong><span>{selectedAccess.result}</span></div></div><section className="security-drawer-section"><h3>Policy evaluation</h3><div className={selectedAccess.result==="Denied"?"policy-denied":"policy-allowed"}>{selectedAccess.result==="Denied"?<ShieldX size={18}/>:<ShieldCheck size={18}/>}<span><strong>{selectedAccess.result==="Denied"?"Access policy denied this request":"Access policy requirements satisfied"}</strong><small>{selectedAccess.result==="Denied"?"The source or credentials did not satisfy privileged access controls.":"Identity, device and multifactor requirements were evaluated."}</small></span></div></section><div className="security-drawer-actions"><button className="secondary-button" onClick={()=>notify(`${selectedAccess.id} audit evidence exported.`)}><Download size={14}/>Export evidence</button><button className="primary-button" onClick={()=>notify(`${selectedAccess.id} review case opened.`)}><Eye size={14}/>Open review</button></div></>}
    </aside></div>}
    {notice&&<div className="toast"><CheckCircle2 size={16}/>{notice}</div>}
  </main>;
}
