"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Cloud,
  Eye,
  EyeOff,
  GitBranch,
  LocateFixed,
  Maximize2,
  Minus,
  Network,
  Plus,
  Radio,
  Router,
  Search,
  Server,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type NodeHealth = "Online" | "Degraded" | "Critical" | "Offline";
type TopologyNode = {
  id:string; name:string; type:string; site:string; health:NodeHealth; x:number; y:number;
  layer:"Upstream"|"Core"|"Backhaul"|"Access"|"Customer"; customers:number; ip:string; metric:string; incident?:string;
};
type TopologyLink = {from:string;to:string;health:NodeHealth;capacity:string;utilization:number;latency:number;medium:string};

const nodes:TopologyNode[] = [
  {id:"upstream-a",name:"Transit A",type:"Internet Upstream",site:"Dar es Salaam",health:"Online",x:8,y:30,layer:"Upstream",customers:2214,ip:"196.41.62.1",metric:"5 Gbps available"},
  {id:"upstream-b",name:"Transit B",type:"Backup Upstream",site:"Dar es Salaam",health:"Online",x:8,y:70,layer:"Upstream",customers:2214,ip:"41.59.84.1",metric:"2 Gbps available"},
  {id:"firewall",name:"HQ-FGT-01",type:"Edge Firewall",site:"Zannet HQ",health:"Online",x:25,y:50,layer:"Core",customers:2214,ip:"10.10.0.254",metric:"18,402 sessions"},
  {id:"core",name:"CORE-RTR-01",type:"Core Router",site:"Michenzani Core",health:"Online",x:42,y:50,layer:"Core",customers:2214,ip:"10.10.0.1",metric:"2.84 Gbps traffic"},
  {id:"north",name:"North AF5XHD",type:"Wireless Backhaul",site:"North Backhaul",health:"Critical",x:61,y:18,layer:"Backhaul",customers:126,ip:"10.20.1.11",metric:"8.4% packet loss",incident:"INC-2407"},
  {id:"kendwa",name:"Kendwa POP",type:"Aggregation Site",site:"Kendwa",health:"Degraded",x:61,y:40,layer:"Backhaul",customers:312,ip:"10.40.2.2",metric:"UPS temperature 49.2°C",incident:"INC-2398"},
  {id:"paje",name:"Paje Tower",type:"Distribution Site",site:"Paje",health:"Degraded",x:61,y:63,layer:"Backhaul",customers:184,ip:"10.30.4.1",metric:"88% backhaul use",incident:"INC-2404"},
  {id:"fumba",name:"Fumba AF60",type:"Wireless Backhaul",site:"Fumba",health:"Online",x:61,y:84,layer:"Backhaul",customers:93,ip:"10.82.1.10",metric:"94% link quality"},
  {id:"north-access",name:"North Access",type:"Access Network",site:"Nungwi / Kendwa",health:"Critical",x:80,y:20,layer:"Access",customers:126,ip:"10.21.0.1",metric:"126 services degraded",incident:"INC-2407"},
  {id:"kendwa-access",name:"Kendwa Access",type:"Access Network",site:"Kendwa",health:"Online",x:80,y:40,layer:"Access",customers:298,ip:"10.41.0.1",metric:"1.12 Gbps traffic"},
  {id:"paje-access",name:"Paje Access",type:"Access Network",site:"Paje / Bwejuu",health:"Degraded",x:80,y:63,layer:"Access",customers:184,ip:"10.31.0.1",metric:"44 services impacted",incident:"INC-2404"},
  {id:"fumba-access",name:"Fumba Access",type:"Access Network",site:"Fumba",health:"Online",x:80,y:84,layer:"Access",customers:93,ip:"10.83.0.1",metric:"412 Mbps traffic"},
  {id:"north-customers",name:"North Services",type:"Customer Services",site:"North Region",health:"Critical",x:95,y:20,layer:"Customer",customers:126,ip:"—",metric:"126 impacted",incident:"INC-2407"},
  {id:"kendwa-customers",name:"Kendwa Services",type:"Customer Services",site:"Kendwa",health:"Online",x:95,y:40,layer:"Customer",customers:298,ip:"—",metric:"99.96% available"},
  {id:"paje-customers",name:"Paje Services",type:"Customer Services",site:"South East",health:"Degraded",x:95,y:63,layer:"Customer",customers:184,ip:"—",metric:"44 impacted",incident:"INC-2404"},
  {id:"fumba-customers",name:"Fumba Services",type:"Customer Services",site:"West",health:"Online",x:95,y:84,layer:"Customer",customers:93,ip:"—",metric:"99.98% available"},
];

const links:TopologyLink[] = [
  {from:"upstream-a",to:"firewall",health:"Online",capacity:"5 Gbps",utilization:57,latency:6,medium:"Fibre"},
  {from:"upstream-b",to:"firewall",health:"Online",capacity:"2 Gbps",utilization:18,latency:11,medium:"Fibre"},
  {from:"firewall",to:"core",health:"Online",capacity:"10 Gbps",utilization:31,latency:1,medium:"10G SFP+"},
  {from:"core",to:"north",health:"Critical",capacity:"1 Gbps",utilization:64,latency:86,medium:"airFiber"},
  {from:"core",to:"kendwa",health:"Online",capacity:"1 Gbps",utilization:72,latency:7,medium:"Fibre"},
  {from:"core",to:"paje",health:"Degraded",capacity:"500 Mbps",utilization:88,latency:32,medium:"airFiber"},
  {from:"core",to:"fumba",health:"Online",capacity:"1 Gbps",utilization:41,latency:5,medium:"60 GHz"},
  {from:"north",to:"north-access",health:"Critical",capacity:"1 Gbps",utilization:62,latency:84,medium:"Ethernet"},
  {from:"kendwa",to:"kendwa-access",health:"Online",capacity:"1 Gbps",utilization:58,latency:2,medium:"Fibre"},
  {from:"paje",to:"paje-access",health:"Degraded",capacity:"1 Gbps",utilization:79,latency:28,medium:"Fibre"},
  {from:"fumba",to:"fumba-access",health:"Online",capacity:"1 Gbps",utilization:39,latency:2,medium:"Ethernet"},
  {from:"north-access",to:"north-customers",health:"Critical",capacity:"—",utilization:0,latency:91,medium:"Wireless"},
  {from:"kendwa-access",to:"kendwa-customers",health:"Online",capacity:"—",utilization:0,latency:12,medium:"Mixed"},
  {from:"paje-access",to:"paje-customers",health:"Degraded",capacity:"—",utilization:0,latency:38,medium:"Wireless"},
  {from:"fumba-access",to:"fumba-customers",health:"Online",capacity:"—",utilization:0,latency:14,medium:"Wireless"},
];

const layerOrder=["Upstream","Core","Backhaul","Access","Customer"] as const;

function NodeIcon({type}:{type:string}){
  if(type.includes("Upstream"))return <Cloud size={18}/>;
  if(type.includes("Firewall")||type.includes("Router"))return <Router size={18}/>;
  if(type.includes("Wireless"))return <Radio size={18}/>;
  if(type.includes("Customer"))return <Users size={18}/>;
  if(type.includes("Access"))return <Wifi size={18}/>;
  return <Server size={18}/>;
}

export default function NetworkTopology(){
  const [selectedNode,setSelectedNode]=useState<TopologyNode|null>(null);
  const [selectedLink,setSelectedLink]=useState<TopologyLink|null>(null);
  const [visibleLayers,setVisibleLayers]=useState<string[]>([...layerOrder]);
  const [healthFilter,setHealthFilter]=useState("All health");
  const [query,setQuery]=useState("");
  const [zoom,setZoom]=useState(1);
  const [showLabels,setShowLabels]=useState(true);
  const [impactPath,setImpactPath]=useState(true);
  const [notice,setNotice]=useState("");

  const visibleNodes=useMemo(()=>nodes.filter((node)=>visibleLayers.includes(node.layer)&&(healthFilter==="All health"||node.health===healthFilter)&&`${node.name} ${node.site} ${node.type}`.toLowerCase().includes(query.toLowerCase())),[visibleLayers,healthFilter,query]);
  const visibleIds=new Set(visibleNodes.map((node)=>node.id));
  const notify=(message:string)=>{setNotice(message);window.setTimeout(()=>setNotice(""),2500)};
  const toggleLayer=(layer:string)=>setVisibleLayers((current)=>current.includes(layer)?current.filter((item)=>item!==layer):[...current,layer]);

  return <main className="topology-page">
    <section className="topology-hero"><div><p className="eyebrow">MODULE 04 · NETWORK DEPENDENCIES</p><h2>Network topology</h2><p>Trace infrastructure relationships, service paths and customer impact in real time.</p></div><div className="topology-hero-actions"><button className={`secondary-button ${impactPath?"button-selected":""}`} onClick={()=>setImpactPath((value)=>!value)}><GitBranch size={15}/>{impactPath?"Impact path on":"Impact path off"}</button><button className="primary-button" onClick={()=>notify("Topology rediscovery queued.")}><LocateFixed size={15}/>Rediscover topology</button></div></section>

    <section className="topology-summary" aria-label="Topology summary"><article><span className="topology-stat stat-blue"><Network size={18}/></span><div><small>Topology nodes</small><strong>486</strong><em>16 visible in this view</em></div></article><article><span className="topology-stat stat-green"><GitBranch size={18}/></span><div><small>Active links</small><strong>512</strong><em>98.6% operational</em></div></article><article><span className="topology-stat stat-red"><AlertTriangle size={18}/></span><div><small>Degraded paths</small><strong>3</strong><em>North path critical</em></div></article><article><span className="topology-stat stat-amber"><Users size={18}/></span><div><small>Impacted customers</small><strong>184</strong><em>Across 2 service paths</em></div></article><article><span className="topology-stat stat-violet"><CircleDot size={18}/></span><div><small>Unknown neighbors</small><strong>4</strong><em>Awaiting classification</em></div></article></section>

    <section className="topology-workspace">
      <aside className="topology-sidebar panel">
        <div className="topology-side-section"><span className="panel-kicker">VIEW CONTROLS</span><h3>Topology layers</h3>{layerOrder.map((layer)=><button key={layer} className={visibleLayers.includes(layer)?"layer-active":""} onClick={()=>toggleLayer(layer)}>{visibleLayers.includes(layer)?<Eye size={14}/>:<EyeOff size={14}/>}<span>{layer}</span><em>{nodes.filter((node)=>node.layer===layer).length}</em></button>)}</div>
        <div className="topology-side-section"><h3>Health filter</h3><label className="topology-select"><select value={healthFilter} onChange={(e)=>setHealthFilter(e.target.value)} aria-label="Filter topology health">{["All health","Online","Degraded","Critical","Offline"].map((item)=><option key={item}>{item}</option>)}</select><ChevronDown size={13}/></label></div>
        <div className="topology-side-section topology-legend-list"><h3>Link status</h3><span><i className="topo-online"/>Operational</span><span><i className="topo-degraded"/>Degraded</span><span><i className="topo-critical"/>Critical / down</span><span><i className="topo-impact"/>Customer impact path</span></div>
        <div className="topology-side-section"><h3>Display</h3><label className="topology-switch"><span>Node labels</span><input type="checkbox" checked={showLabels} onChange={(e)=>setShowLabels(e.target.checked)}/><i/></label><label className="topology-switch"><span>Customer impact</span><input type="checkbox" checked={impactPath} onChange={(e)=>setImpactPath(e.target.checked)}/><i/></label></div>
      </aside>

      <section className="topology-canvas panel">
        <div className="topology-toolbar"><label><Search size={14}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search topology..." aria-label="Search network topology"/>{query&&<button onClick={()=>setQuery("")} aria-label="Clear topology search"><X size={13}/></button>}</label><div><button onClick={()=>setZoom(Math.max(.75,zoom-.1))} aria-label="Zoom out"><Minus size={15}/></button><span>{Math.round(zoom*100)}%</span><button onClick={()=>setZoom(Math.min(1.25,zoom+.1))} aria-label="Zoom in"><Plus size={15}/></button><button onClick={()=>setZoom(1)} aria-label="Fit topology"><Maximize2 size={15}/></button></div></div>
        <div className="topology-map-shell">
          <div className="topology-map" style={{transform:`scale(${zoom})`}}>
            <div className="layer-labels"><span style={{left:"7%"}}>UPSTREAM</span><span style={{left:"32%"}}>CORE</span><span style={{left:"58%"}}>BACKHAUL</span><span style={{left:"78%"}}>ACCESS</span><span style={{left:"92%"}}>SERVICES</span></div>
            <svg viewBox="0 0 1000 520" preserveAspectRatio="none" aria-label="ISP network dependency map">
              {links.filter((link)=>visibleIds.has(link.from)&&visibleIds.has(link.to)).map((link)=>{const from=nodes.find((node)=>node.id===link.from)!;const to=nodes.find((node)=>node.id===link.to)!;const affected=impactPath&&(link.health==="Critical"||link.health==="Degraded");return <line key={`${link.from}-${link.to}`} x1={from.x*10} y1={from.y*5.2} x2={to.x*10} y2={to.y*5.2} className={`topology-link link-${link.health.toLowerCase()} ${affected?"link-impact-path":""}`} onClick={()=>setSelectedLink(link)}/>})}
            </svg>
            {visibleNodes.map((node)=><button key={node.id} className={`map-node node-${node.health.toLowerCase()} ${impactPath&&node.incident?"node-impacted":""}`} style={{left:`${node.x}%`,top:`${node.y}%`}} onClick={()=>{setSelectedLink(null);setSelectedNode(node)}} aria-label={`Inspect ${node.name}`}><span className="map-node-icon"><NodeIcon type={node.type}/></span>{showLabels&&<span className="map-node-label"><strong>{node.name}</strong><small>{node.metric}</small></span>}{node.incident&&<i className="incident-pin">!</i>}</button>)}
          </div>
          <div className="topology-map-footer"><span><i className="live-dot"/>Topology live · Updated 9 seconds ago</span><span>Drag to pan · Scroll to zoom · Select a node or link</span></div>
        </div>
      </section>

      <aside className="topology-impact panel">
        <div className="impact-heading"><span className="panel-kicker">ACTIVE IMPACT</span><h3>Service paths</h3><button aria-label="Impact menu"><MoreDots/></button></div>
        <div className="impact-card impact-critical"><div><span><AlertTriangle size={15}/></span><div><strong>North backhaul path</strong><small>INC-2407 · Critical</small></div></div><p>Packet loss on airFiber 5XHD is degrading all dependent access services.</p><div className="impact-metrics"><span><strong>126</strong>customers</span><span><strong>8.4%</strong>loss</span><span><strong>86ms</strong>latency</span></div><button onClick={()=>setSelectedNode(nodes.find((node)=>node.id==="north")!)}>Trace path<ChevronRight size={13}/></button></div>
        <div className="impact-card impact-warning"><div><span><AlertTriangle size={15}/></span><div><strong>Paje capacity path</strong><small>INC-2404 · Warning</small></div></div><p>Sustained capacity pressure is reducing customer experience during peak periods.</p><div className="impact-metrics"><span><strong>44</strong>customers</span><span><strong>88%</strong>use</span><span><strong>32ms</strong>latency</span></div><button onClick={()=>setSelectedNode(nodes.find((node)=>node.id==="paje")!)}>Trace path<ChevronRight size={13}/></button></div>
        <div className="impact-card impact-healthy"><div><span><CheckCircle2 size={15}/></span><div><strong>Core redundancy</strong><small>Healthy</small></div></div><p>Both upstream providers and the core failover path are operational.</p><div className="impact-metrics"><span><strong>2</strong>upstreams</span><span><strong>31%</strong>use</span><span><strong>1ms</strong>latency</span></div></div>
      </aside>
    </section>

    {notice&&<div className="toast" role="status"><CheckCircle2 size={18}/>{notice}</div>}
    {selectedNode&&<div className="drawer-layer"><button className="drawer-scrim" aria-label="Close topology node" onClick={()=>setSelectedNode(null)}/><aside className="topology-drawer" aria-label={`${selectedNode.name} topology details`}><div className="drawer-head"><div><span className="panel-kicker">{selectedNode.layer.toUpperCase()} · {selectedNode.type.toUpperCase()}</span><h2>{selectedNode.name}</h2><p>{selectedNode.site}</p></div><button className="icon-button" onClick={()=>setSelectedNode(null)} aria-label="Close node details"><X size={20}/></button></div><div className="topology-drawer-status"><span className={`health-pill health-${selectedNode.health.toLowerCase()}`}><i/>{selectedNode.health}</span>{selectedNode.incident&&<span className="correlated-badge"><AlertTriangle size={12}/>{selectedNode.incident}</span>}</div><section className="topology-node-hero"><span className={`node-hero-icon node-${selectedNode.health.toLowerCase()}`}><NodeIcon type={selectedNode.type}/></span><div><small>Primary metric</small><strong>{selectedNode.metric}</strong></div></section><section className="device-detail-section"><h3>Dependency information</h3><dl><div><dt>Management IP</dt><dd>{selectedNode.ip}</dd></div><div><dt>Dependent customers</dt><dd>{selectedNode.customers.toLocaleString()}</dd></div><div><dt>Layer</dt><dd>{selectedNode.layer}</dd></div><div><dt>Connected links</dt><dd>{links.filter((link)=>link.from===selectedNode.id||link.to===selectedNode.id).length}</dd></div></dl></section><section className="dependency-path"><h3>Service dependency path</h3><div><span><Cloud size={14}/></span><i/><span><Router size={14}/></span><i/><span className={selectedNode.health!=="Online"?"path-problem":""}><NodeIcon type={selectedNode.type}/></span><i/><span><Users size={14}/></span></div><p>Upstream → Core → {selectedNode.name} → {selectedNode.customers} customer services</p></section><div className="drawer-actions"><button className="primary-button" onClick={()=>notify(`${selectedNode.name} opened in monitoring.`)}>Open live monitoring</button><button className="secondary-button">View incidents</button></div></aside></div>}
    {selectedLink&&<div className="drawer-layer"><button className="drawer-scrim" aria-label="Close topology link" onClick={()=>setSelectedLink(null)}/><aside className="topology-drawer" aria-label="Topology link details"><div className="drawer-head"><div><span className="panel-kicker">NETWORK LINK</span><h2>{nodes.find((node)=>node.id===selectedLink.from)?.name} → {nodes.find((node)=>node.id===selectedLink.to)?.name}</h2><p>{selectedLink.medium}</p></div><button className="icon-button" onClick={()=>setSelectedLink(null)} aria-label="Close link details"><X size={20}/></button></div><div className="topology-drawer-status"><span className={`health-pill health-${selectedLink.health.toLowerCase()}`}><i/>{selectedLink.health}</span></div><section className="drawer-metric-grid"><article><small>Capacity</small><strong>{selectedLink.capacity}</strong></article><article><small>Utilization</small><strong>{selectedLink.utilization}%</strong></article><article><small>Latency</small><strong>{selectedLink.latency} ms</strong></article><article><small>Medium</small><strong>{selectedLink.medium}</strong></article></section><div className="drawer-actions"><button className="primary-button">Open link monitoring</button><button className="secondary-button">View traffic</button></div></aside></div>}
  </main>;
}

function MoreDots(){return <span aria-hidden="true">•••</span>}
