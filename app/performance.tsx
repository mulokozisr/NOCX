"use client";

import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  Gauge,
  Radio,
  Search,
  Server,
  TrendingUp,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

type CapacityStatus="Healthy"|"Moderate"|"Warning"|"Critical"|"Saturated";
type CapacityLink={name:string;site:string;type:string;capacity:number;current:number;peak:number;p95:number;growth:number;forecast:string;status:CapacityStatus;customers:number};

const capacityLinks:CapacityLink[]=[
  {name:"North Backhaul",site:"North Region",type:"Wireless Backhaul",capacity:1000,current:624,peak:958,p95:882,growth:11.8,forecast:"21 days",status:"Critical",customers:126},
  {name:"Paje Tower Backhaul",site:"Paje",type:"Wireless Backhaul",capacity:500,current:438,peak:472,p95:451,growth:8.4,forecast:"47 days",status:"Critical",customers:184},
  {name:"Core Transit A",site:"Michenzani Core",type:"Internet Transit",capacity:5000,current:2840,peak:3410,p95:3120,growth:6.2,forecast:"11 months",status:"Moderate",customers:2214},
  {name:"Kendwa POP Uplink",site:"Kendwa",type:"Fibre Uplink",capacity:1000,current:582,peak:721,p95:684,growth:5.1,forecast:"8 months",status:"Moderate",customers:312},
  {name:"Fumba 60 GHz",site:"Fumba",type:"Wireless Backhaul",capacity:1000,current:412,peak:534,p95:487,growth:4.3,forecast:"14 months",status:"Healthy",customers:93},
  {name:"Jambiani Distribution",site:"Jambiani",type:"Fibre Uplink",capacity:1000,current:318,peak:506,p95:461,growth:7.6,forecast:"10 months",status:"Healthy",customers:207},
  {name:"Nungwi Resort Access",site:"Nungwi",type:"Managed Wi-Fi",capacity:500,current:342,peak:414,p95:388,growth:9.2,forecast:"3 months",status:"Warning",customers:286},
  {name:"Core Transit B",site:"Michenzani Core",type:"Backup Transit",capacity:2000,current:361,peak:682,p95:521,growth:2.1,forecast:"> 24 months",status:"Healthy",customers:2214},
];

const trafficSets:Record<string,{down:number[];up:number[]}>= {
  "24H":{down:[.7,.62,.58,.61,.82,1.15,1.64,2.02,2.24,2.37,2.46,2.39,2.55,2.62,2.48,2.58,2.74,3.02,3.41,3.28,3.12,2.86,2.62,2.44],up:[.18,.16,.15,.17,.23,.29,.38,.45,.51,.55,.58,.56,.62,.64,.59,.61,.66,.72,.81,.78,.73,.68,.62,.58]},
  "7D":{down:[2.74,2.62,2.81,3.02,3.41,3.18,3.06],up:[.64,.59,.68,.71,.81,.75,.72]},
  "30D":{down:[2.22,2.31,2.28,2.44,2.51,2.46,2.62,2.57,2.71,2.67,2.82,2.76,2.91,2.84,3.04,3.12,3.41],up:[.46,.49,.47,.52,.54,.51,.58,.56,.61,.59,.65,.62,.68,.64,.70,.73,.81]},
  "12M":{down:[1.84,1.92,2.05,2.12,2.28,2.34,2.41,2.55,2.68,2.81,3.04,3.41],up:[.38,.41,.44,.46,.49,.52,.55,.59,.62,.67,.72,.81]},
};

const consumers=[
  {name:"Mala Boutique",plan:"Business 200 Mbps",traffic:"186 Mbps",share:93},
  {name:"Nungwi Resort",plan:"Dedicated 500 Mbps",traffic:"414 Mbps",share:83},
  {name:"Paje Soul",plan:"Business 300 Mbps",traffic:"238 Mbps",share:79},
  {name:"Sunshine Bay",plan:"Business 200 Mbps",traffic:"142 Mbps",share:71},
  {name:"Bamboo Zanzibar",plan:"Business 100 Mbps",traffic:"68 Mbps",share:68},
];

function points(values:number[],width:number,height:number,max:number){return values.map((v,i)=>`${(i/(values.length-1)*width).toFixed(1)},${(height-v/max*height).toFixed(1)}`).join(" ")}
function statusClass(status:CapacityStatus){return status.toLowerCase()}

export default function PerformanceAnalytics(){
  const [range,setRange]=useState("24H");
  const [status,setStatus]=useState("All statuses");
  const [type,setType]=useState("All types");
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState<CapacityLink|null>(null);
  const [notice,setNotice]=useState("");
  const chart=trafficSets[range];
  const filtered=useMemo(()=>capacityLinks.filter((link)=>`${link.name} ${link.site} ${link.type}`.toLowerCase().includes(query.toLowerCase())&&(status==="All statuses"||link.status===status)&&(type==="All types"||link.type===type)),[query,status,type]);
  const notify=(message:string)=>{setNotice(message);window.setTimeout(()=>setNotice(""),2500)};

  return <main className="performance-page">
    <section className="performance-hero"><div><p className="eyebrow">MODULE 06 · CAPACITY INTELLIGENCE</p><h2>Performance & capacity analytics</h2><p>Find congestion, understand traffic growth and plan upgrades before customers are affected.</p></div><div className="performance-actions"><button className="secondary-button" onClick={()=>notify("Capacity report prepared.")}><Download size={15}/>Export report</button><button className="primary-button" onClick={()=>notify("Forecast model recalculated with the latest seed metrics.")}><TrendingUp size={15}/>Recalculate forecast</button></div></section>

    <section className="performance-summary" aria-label="Capacity summary"><article><span className="perf-stat stat-blue"><Gauge size={18}/></span><div><small>Total capacity</small><strong>10.5 Gbps</strong><em>3.48 Gbps current traffic</em></div></article><article><span className="perf-stat stat-amber"><Zap size={18}/></span><div><small>Peak utilization</small><strong>68%</strong><em>Today at 19:00</em></div></article><article><span className="perf-stat stat-red"><AlertTriangle size={18}/></span><div><small>Congested links</small><strong>3</strong><em>354 customers exposed</em></div></article><article><span className="perf-stat stat-violet"><BarChart3 size={18}/></span><div><small>95th percentile</small><strong>4.12 Gbps</strong><em>Current billing period</em></div></article><article><span className="perf-stat stat-red"><CalendarClock size={18}/></span><div><small>Next exhaustion</small><strong>21 days</strong><em>North backhaul</em></div></article></section>

    <section className="performance-grid-top">
      <article className="panel capacity-chart-panel"><div className="panel-heading"><div><span className="panel-kicker">AGGREGATE UTILIZATION</span><h3>Bandwidth demand</h3></div><div className="range-control">{Object.keys(trafficSets).map((item)=><button key={item} className={range===item?"range-active":""} onClick={()=>setRange(item)}>{item}</button>)}</div></div><div className="capacity-chart-metrics"><span><i className="legend-blue"/><strong>3.41 Gbps</strong>Peak download</span><span><i className="legend-green"/><strong>810 Mbps</strong>Peak upload</span><span><i className="legend-amber"/><strong>4.12 Gbps</strong>95th percentile</span></div><div className="capacity-chart"><div><span>5G</span><span>4G</span><span>3G</span><span>2G</span><span>1G</span><span>0</span></div><svg viewBox="0 0 760 210" preserveAspectRatio="none" aria-label={`Bandwidth demand for ${range}`}>{[0,42,84,126,168,210].map((y)=><line key={y} x1="0" x2="760" y1={y} y2={y} className="chart-grid-line"/>)}<line x1="0" x2="760" y1="37" y2="37" className="p95-line"/><polyline points={points(chart.down,760,210,5)} className="line-download"/><polyline points={points(chart.up,760,210,5)} className="line-upload"/></svg></div><div className="chart-period-labels"><span>Start</span><span>Mid-period</span><span>Latest</span></div></article>
      <article className="panel forecast-panel"><div className="panel-heading"><div><span className="panel-kicker">CAPACITY FORECAST</span><h3>Upgrade horizon</h3></div><button className="text-button" onClick={()=>notify("Upgrade plan selected.")}>View plan</button></div><div className="forecast-priority"><span><AlertTriangle size={18}/></span><div><strong>North Backhaul</strong><small>Projected to exceed 95% safe capacity</small></div><em>21 days</em></div><div className="forecast-list"><button onClick={()=>setSelected(capacityLinks[1])}><span><strong>Paje Tower</strong><small>500 Mbps → recommended 1 Gbps</small></span><em>47 days</em><ChevronRight size={14}/></button><button onClick={()=>setSelected(capacityLinks[6])}><span><strong>Nungwi Resort Access</strong><small>Peak hour utilization above 80%</small></span><em>3 months</em><ChevronRight size={14}/></button><button onClick={()=>setSelected(capacityLinks[3])}><span><strong>Kendwa POP</strong><small>Growth within expected baseline</small></span><em>8 months</em><ChevronRight size={14}/></button></div><div className="forecast-confidence"><span>Forecast confidence</span><strong>High · 92%</strong><i><em style={{width:"92%"}}/></i></div></article>
    </section>

    <section className="performance-grid-mid">
      <article className="panel peak-panel"><div className="panel-heading"><div><span className="panel-kicker">PEAK-HOUR PATTERN</span><h3>Weekly demand heatmap</h3></div><span className="peak-window">Peak 18:00–22:00</span></div><div className="heatmap"><div className="heat-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div className="heat-grid">{Array.from({length:84},(_,i)=>{const hour=i%12;const day=Math.floor(i/12);const level=hour>=7&&hour<=10?Math.min(4,2+(day>3?1:0)+(hour===9?1:0)):hour>=3&&hour<=6?2:1;return <i key={i} className={`heat-${level}`} title={`${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][day]} ${hour+12}:00`}/>})}</div><div className="heat-hours"><span>12:00</span><span>15:00</span><span>18:00</span><span>21:00</span><span>23:00</span></div></div><div className="peak-insight"><TrendingUp size={15}/><span><strong>Friday is the busiest day</strong><small>Average evening traffic is 18% above the weekly baseline.</small></span></div></article>
      <article className="panel consumer-panel"><div className="panel-heading"><div><span className="panel-kicker">BANDWIDTH DISTRIBUTION</span><h3>Top customer demand</h3></div><button className="text-button" onClick={()=>notify("Customer bandwidth report selected.")}>View all</button></div><div className="consumer-list">{consumers.map((customer,index)=><button key={customer.name}><span className="consumer-rank">{index+1}</span><span><strong>{customer.name}</strong><small>{customer.plan}</small></span><span className="consumer-usage"><strong>{customer.traffic}</strong><i><em style={{width:`${customer.share}%`}}/></i></span></button>)}</div></article>
      <article className="panel recommendation-panel"><div className="panel-heading"><div><span className="panel-kicker">OPERATING ACTIONS</span><h3>Recommendations</h3></div><span className="recommendation-count">4</span></div><div className="recommendation-list"><button onClick={()=>setSelected(capacityLinks[0])}><span className="rec-icon rec-critical"><ArrowUpRight size={15}/></span><span><strong>Upgrade North backhaul</strong><small>Customer risk: 126 services</small></span><em>Critical</em></button><button onClick={()=>setSelected(capacityLinks[1])}><span className="rec-icon rec-warning"><Radio size={15}/></span><span><strong>Expand Paje capacity</strong><small>Peak use has reached 94%</small></span><em>High</em></button><button onClick={()=>setSelected(capacityLinks[6])}><span className="rec-icon rec-blue"><Wifi size={15}/></span><span><strong>Rebalance Nungwi clients</strong><small>Move 48 clients to AP-04</small></span><em>Medium</em></button><button onClick={()=>setSelected(capacityLinks[2])}><span className="rec-icon rec-green"><CheckCircle2 size={15}/></span><span><strong>Core capacity sufficient</strong><small>No upgrade needed this quarter</small></span><em>Healthy</em></button></div></article>
    </section>

    <section className="capacity-table-panel panel"><div className="capacity-table-head"><div><span className="panel-kicker">MONITORED CAPACITY</span><h3>Link and interface utilization</h3></div><div><label className="capacity-search"><Search size={14}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search capacity..." aria-label="Search capacity links"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear capacity search"><X size={13}/></button>}</label><label className="capacity-select"><select value={status} onChange={(e)=>setStatus(e.target.value)} aria-label="Filter capacity status">{["All statuses","Healthy","Moderate","Warning","Critical","Saturated"].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label><label className="capacity-select"><select value={type} onChange={(e)=>setType(e.target.value)} aria-label="Filter capacity type"><option>All types</option>{[...new Set(capacityLinks.map((item)=>item.type))].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label></div></div><div className="capacity-table-wrap"><table className="capacity-table"><thead><tr><th>Link / interface</th><th>Capacity</th><th>Current</th><th>Peak</th><th>95th percentile</th><th>Utilization</th><th>Growth</th><th>Forecast</th><th>Status</th><th/></tr></thead><tbody>{filtered.map((link)=>{const utilization=Math.round(link.current/link.capacity*100);return <tr key={link.name} onClick={()=>setSelected(link)}><td><span className="capacity-identity"><i>{link.type.includes("Wireless")?<Radio size={15}/>:<Server size={15}/>}</i><span><strong>{link.name}</strong><small>{link.site} · {link.type}</small></span></span></td><td>{link.capacity>=1000?`${link.capacity/1000} Gbps`:`${link.capacity} Mbps`}</td><td><strong>{link.current>=1000?`${(link.current/1000).toFixed(2)} Gbps`:`${link.current} Mbps`}</strong></td><td>{link.peak} Mbps</td><td>{link.p95} Mbps</td><td><span className="capacity-util"><strong>{utilization}%</strong><i><em className={`util-${statusClass(link.status)}`} style={{width:`${Math.min(100,utilization)}%`}}/></i></span></td><td><span className={link.growth>=8?"growth-high":"growth-normal"}><TrendingUp size={12}/>{link.growth}%</span></td><td><span className="forecast-cell"><Clock3 size={12}/>{link.forecast}</span></td><td><span className={`capacity-status capacity-${statusClass(link.status)}`}><i/>{link.status}</span></td><td><button className="row-action" aria-label={`Inspect capacity ${link.name}`} onClick={(e)=>{e.stopPropagation();setSelected(link)}}><ChevronRight size={16}/></button></td></tr>})}</tbody></table>{filtered.length===0&&<div className="empty-devices"><Search size={24}/><strong>No capacity links found</strong><p>Adjust the search or status filters.</p></div>}</div></section>

    {notice&&<div className="toast" role="status"><CheckCircle2 size={18}/>{notice}</div>}
    {selected&&<div className="drawer-layer"><button className="drawer-scrim" aria-label="Close capacity details" onClick={()=>setSelected(null)}/><aside className="capacity-drawer" aria-label={`${selected.name} capacity details`}><div className="drawer-head"><div><span className="panel-kicker">{selected.type.toUpperCase()} · {selected.site.toUpperCase()}</span><h2>{selected.name}</h2><p>{selected.customers} dependent customers</p></div><button className="icon-button" onClick={()=>setSelected(null)} aria-label="Close capacity link"><X size={20}/></button></div><div className="capacity-drawer-status"><span className={`capacity-status capacity-${statusClass(selected.status)}`}><i/>{selected.status}</span><span><TrendingUp size={12}/>{selected.growth}% monthly growth</span></div><section className="capacity-gauge"><div><span style={{height:`${Math.min(100,selected.current/selected.capacity*100)}%`}}/><i className="gauge-safe"/><i className="gauge-warning"/></div><section><small>Current utilization</small><strong>{Math.round(selected.current/selected.capacity*100)}%</strong><p>{selected.current} Mbps of {selected.capacity} Mbps configured capacity</p></section></section><section className="drawer-metric-grid"><article><small>Peak traffic</small><strong>{selected.peak} Mbps</strong></article><article><small>95th percentile</small><strong>{selected.p95} Mbps</strong></article><article><small>Monthly growth</small><strong>{selected.growth}%</strong></article><article><small>Exhaustion forecast</small><strong>{selected.forecast}</strong></article></section><section className="capacity-advice"><AlertTriangle size={18}/><div><strong>{selected.status==="Critical"?"Upgrade action required":"Continue capacity monitoring"}</strong><p>{selected.status==="Critical"?`Increase ${selected.name} capacity before the forecasted exhaustion window to protect ${selected.customers} customer services.`:"Historical growth remains within the current planning horizon."}</p></div></section><div className="drawer-actions"><button className="primary-button" onClick={()=>notify(`Upgrade plan created for ${selected.name}.`)}>Create upgrade plan</button><button className="secondary-button">Open monitoring</button></div></aside></div>}
  </main>;
}
