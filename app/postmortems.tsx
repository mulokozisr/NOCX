"use client";
import { AlertTriangle, BookOpenCheck, CheckCircle2, ChevronRight, Clock3, FileCheck2, Link2, ShieldCheck, Target, Users } from "lucide-react";
import { useState } from "react";
import "./postmortems.css";

const reviews=[
 {id:"PIR-2407",incident:"INC-2407",title:"North backhaul packet loss",severity:"Critical",status:"Review in progress",owner:"Scalion Mulokozi",downtime:"38 min",customers:"126",cause:"RF interference and channel reuse",due:"23 Jul · 16:00",actions:3,closed:1},
 {id:"PIR-2398",incident:"INC-2398",title:"Kendwa UPS thermal alarm",severity:"High",status:"Actions tracked",owner:"Fatma Said",downtime:"12 min",customers:"14",cause:"Battery module ventilation blocked",due:"24 Jul · 10:00",actions:2,closed:1},
 {id:"PIR-2396",incident:"INC-2396",title:"Paje tower power loss",severity:"Critical",status:"Approved",owner:"Kassim Ali",downtime:"47 min",customers:"88",cause:"ATS control relay failure",due:"Completed 20 Jul",actions:2,closed:2},
];
const actions=[
 {id:"CA-781",action:"Re-plan North backhaul channel allocation",source:"PIR-2407",owner:"Network Team",due:"23 Jul",state:"In progress"},
 {id:"CA-782",action:"Add interference threshold to monitoring",source:"PIR-2407",owner:"NOC Platform",due:"25 Jul",state:"Open"},
 {id:"CA-779",action:"Add cabinet airflow inspection to PM checklist",source:"PIR-2398",owner:"Field Team",due:"24 Jul",state:"In progress"},
 {id:"CA-774",action:"Replace ATS relay and validate generator transfer",source:"PIR-2396",owner:"Power Team",due:"20 Jul",state:"Verified"},
];
const slug=(s:string)=>s.toLowerCase().replaceAll(" ","-");

export default function PostIncidentReview(){
 const [selected,setSelected]=useState(reviews[0]); const [notice,setNotice]=useState("");
 const notify=(message:string)=>{setNotice(message);window.setTimeout(()=>setNotice(""),2600)};
 return <main className="pir-page">
  <section className="pir-hero"><div><p className="eyebrow">MODULE 24 · CONTINUOUS IMPROVEMENT</p><h2>Post-incident review & corrective actions</h2><p>Turn every material outage into an evidence-backed root cause, owned prevention work and a verifiable learning record.</p></div><button className="primary-button" onClick={()=>notify("Review draft created from the latest resolved incident.")}><BookOpenCheck size={15}/>Start review</button></section>
  <section className="pir-summary"><article><BookOpenCheck/><span><small>Open reviews</small><strong>3</strong><em>2 require approval</em></span></article><article><Target/><span><small>Corrective actions</small><strong>7</strong><em>4 still open</em></span></article><article><Clock3/><span><small>Median review time</small><strong>1.8 days</strong><em>Target under 3 days</em></span></article><article><CheckCircle2/><span><small>Actions verified</small><strong>86%</strong><em>Last 30 days</em></span></article></section>
  <section className="pir-grid"><article className="panel pir-register"><header><div><span className="panel-kicker">REVIEW REGISTER</span><h3>Recent service-impacting incidents</h3><p>Each review remains linked to the original incident timeline, customers and operational evidence.</p></div><span>Last 30 days</span></header><div className="pir-list">{reviews.map(item=><button key={item.id} className={selected.id===item.id?"active":""} onClick={()=>setSelected(item)}><span className={`pir-icon pir-${slug(item.severity)}`}>{item.severity==="Critical"?<AlertTriangle size={16}/>:<FileCheck2 size={16}/>}</span><span><small>{item.id} · {item.incident}</small><strong>{item.title}</strong><em>{item.owner} · {item.downtime} downtime</em></span><mark className={`pir-status pir-${slug(item.status)}`}>{item.status}</mark><ChevronRight size={16}/></button>)}</div></article>
  <article className="panel pir-detail"><header><span className="panel-kicker">SELECTED REVIEW</span><h3>{selected.title}</h3><p>{selected.id} · linked to {selected.incident}</p></header><div className="pir-impact"><span><small>Customer impact</small><strong>{selected.customers}</strong></span><span><small>Downtime</small><strong>{selected.downtime}</strong></span><span><small>Action closure</small><strong>{selected.closed}/{selected.actions}</strong></span></div><section><h4>Validated root cause</h4><p>{selected.cause}</p></section><section><h4>Review governance</h4><dl><div><dt>Review owner</dt><dd>{selected.owner}</dd></div><div><dt>Due / completed</dt><dd>{selected.due}</dd></div><div><dt>Status</dt><dd>{selected.status}</dd></div></dl></section><div className="pir-evidence"><ShieldCheck size={16}/><span><strong>Evidence is append-only after approval.</strong><small>Corrections create a new audited revision; the original review remains preserved.</small></span></div></article></section>
  <section className="panel pir-actions"><header><div><span className="panel-kicker">PREVENTION TRACKING</span><h3>Corrective-action register</h3><p>Actions require named ownership, a due date and independent verification before closure.</p></div><button className="secondary-button" onClick={()=>notify("Corrective-action export prepared.")}>Export evidence</button></header><div className="pir-table"><table><thead><tr><th>Action</th><th>Source review</th><th>Owner</th><th>Due</th><th>State</th></tr></thead><tbody>{actions.map(item=><tr key={item.id}><td><strong>{item.action}</strong><small>{item.id}</small></td><td><Link2 size={12}/>{item.source}</td><td><Users size={12}/>{item.owner}</td><td>{item.due}</td><td><span className={`action-${slug(item.state)}`}>{item.state}</span></td></tr>)}</tbody></table></div><footer><ShieldCheck size={14}/>Closing an action requires verification evidence; NOCX does not mark work complete automatically.</footer></section>
  {notice&&<div className="app-toast"><CheckCircle2 size={16}/>{notice}</div>}
 </main>;
}
