"use client";

import {
  Boxes,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  Download,
  FileWarning,
  HardDrive,
  PackageCheck,
  PackageOpen,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  ShieldCheck,
  Truck,
  Warehouse,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type AssetTab = "Overview" | "Asset Register" | "Spares" | "Warranty & RMA" | "Lifecycle Plan";
type AssetStatus = "In service" | "At risk" | "In repair" | "Cold spare" | "Retired";

type Asset = {
  id: string;
  name: string;
  vendor: string;
  model: string;
  serial: string;
  category: string;
  site: string;
  region: string;
  status: AssetStatus;
  age: string;
  installed: string;
  warranty: string;
  lifecycle: number;
  replacement: string;
  owner: string;
  source: string;
  detail: string;
};

type Spare = {
  id: string;
  name: string;
  part: string;
  category: string;
  warehouse: string;
  onHand: number;
  reserved: number;
  reorder: number;
  unitCost: string;
  leadTime: string;
  state: "Healthy" | "Low stock" | "Out of stock";
  compatible: string;
};

const assetSeed: Asset[] = [
  { id: "AST-00041", name: "CORE-STONE-01", vendor: "MikroTik", model: "CCR2116-12G-4S+", serial: "HDG09XK2M4P", category: "Core router", site: "Stone Town Core", region: "Urban West", status: "In service", age: "1y 8m", installed: "09 Nov 2024", warranty: "09 Nov 2027", lifecycle: 34, replacement: "FY2029", owner: "Core Network", source: "RouterOS API", detail: "Primary BGP and aggregation router for the Stone Town core. Configuration backup and support entitlement are current." },
  { id: "AST-00118", name: "NORTH-BH-01", vendor: "Ubiquiti", model: "airFiber 24HD", serial: "AF24-93K7-118", category: "Wireless backhaul", site: "Kendwa Tower", region: "Zanzibar North", status: "At risk", age: "5y 9m", installed: "22 Oct 2020", warranty: "Expired", lifecycle: 92, replacement: "Q3 2026", owner: "Wireless Team", source: "UISP Network API", detail: "High-capacity north backhaul radio. Replacement is prioritized due to age, intermittent RF chain alarms and expired vendor coverage." },
  { id: "AST-00174", name: "PAJE-AGG-02", vendor: "MikroTik", model: "RB4011iGS+", serial: "D52F09A77NK", category: "Aggregation router", site: "Paje Tower", region: "South East", status: "In repair", age: "4y 3m", installed: "11 Apr 2022", warranty: "Expired", lifecycle: 78, replacement: "Q4 2026", owner: "South Network", source: "SNMP + RouterOS", detail: "Removed after repeated power instability. Bench diagnostics are in progress while the protected spare carries traffic." },
  { id: "AST-00206", name: "MELIA-AP-14", vendor: "Ubiquiti", model: "UniFi U6-LR", serial: "U6LR-22B7K9", category: "Wireless access point", site: "Melia Zanzibar", region: "Zanzibar North", status: "In service", age: "2y 1m", installed: "18 Jun 2024", warranty: "18 Jun 2027", lifecycle: 42, replacement: "FY2029", owner: "Managed Wi-Fi", source: "UniFi Network", detail: "Guest Wi-Fi access point serving the east accommodation block. Current firmware is approved and coverage is within design." },
  { id: "AST-00262", name: "KIWENGWA-EAP-07", vendor: "TP-Link", model: "Omada EAP225-Outdoor", serial: "221E9A04M7", category: "Wireless access point", site: "Kiwengwa Beach", region: "North East", status: "At risk", age: "4y 11m", installed: "02 Aug 2021", warranty: "Expired", lifecycle: 86, replacement: "Q3 2026", owner: "Managed Wi-Fi", source: "TP-Link Omada", detail: "Outdoor guest access point with elevated retransmissions and an ageing enclosure. Replacement is bundled with the site refresh." },
  { id: "AST-00311", name: "FUMBA-UPS-02", vendor: "APC", model: "Smart-UPS 1500", serial: "AS214316602", category: "Power system", site: "Fumba POP", region: "Urban West", status: "At risk", age: "5y 2m", installed: "07 May 2021", warranty: "Expired", lifecycle: 89, replacement: "Aug 2026", owner: "Facilities", source: "SNMP Polling", detail: "Runtime has fallen below the 35-minute standard. A replacement battery kit is available at the Stone Town warehouse." },
  { id: "AST-00408", name: "SPARE-AF5X-04", vendor: "Ubiquiti", model: "airFiber 5XHD", serial: "AF5X-31P8-408", category: "Wireless backhaul", site: "Stone Town Warehouse", region: "Central Stores", status: "Cold spare", age: "0y 7m", installed: "Not installed", warranty: "03 Dec 2028", lifecycle: 12, replacement: "FY2031", owner: "Warehouse", source: "Manual register", detail: "Tested cold spare reserved for high-priority wireless backhaul recovery across all regions." },
  { id: "AST-00452", name: "DLINK-SW-OLD-03", vendor: "D-Link", model: "DGS-1210-28", serial: "Q3LM1C800452", category: "Access switch", site: "Retirement Cage", region: "Central Stores", status: "Retired", age: "8y 6m", installed: "15 Jan 2018", warranty: "Expired", lifecycle: 100, replacement: "Completed", owner: "Warehouse", source: "Manual register", detail: "Decommissioned access switch awaiting approved data sanitization and disposal certificate." },
];

const spareSeed: Spare[] = [
  { id: "SPR-201", name: "airFiber 5XHD radio", part: "AF-5XHD", category: "Backhaul radio", warehouse: "Stone Town", onHand: 4, reserved: 1, reorder: 2, unitCost: "TZS 2.85m", leadTime: "21–30 days", state: "Healthy", compatible: "AF-5XHD backhaul links" },
  { id: "SPR-202", name: "MikroTik 48V PSU", part: "48POW", category: "Power supply", warehouse: "Stone Town", onHand: 2, reserved: 1, reorder: 3, unitCost: "TZS 148k", leadTime: "14–21 days", state: "Low stock", compatible: "CCR / CRS rack devices" },
  { id: "SPR-203", name: "10G SFP+ LR module", part: "S+31DLC10D", category: "Optics", warehouse: "Fumba", onHand: 8, reserved: 2, reorder: 4, unitCost: "TZS 186k", leadTime: "10–14 days", state: "Healthy", compatible: "Single-mode 10 km uplinks" },
  { id: "SPR-204", name: "APC battery kit", part: "RBC7", category: "Power system", warehouse: "Stone Town", onHand: 1, reserved: 1, reorder: 2, unitCost: "TZS 620k", leadTime: "30–45 days", state: "Low stock", compatible: "Smart-UPS 1500" },
  { id: "SPR-205", name: "24V Gigabit PoE injector", part: "POE-24-24W-G", category: "PoE", warehouse: "Paje", onHand: 0, reserved: 0, reorder: 5, unitCost: "TZS 92k", leadTime: "14–21 days", state: "Out of stock", compatible: "Legacy AirMAX CPE" },
  { id: "SPR-206", name: "Omada EAP225-Outdoor", part: "EAP225-OUT", category: "Access point", warehouse: "Paje", onHand: 3, reserved: 2, reorder: 2, unitCost: "TZS 340k", leadTime: "21–30 days", state: "Low stock", compatible: "Managed Wi-Fi outdoor sites" },
];

const rmas = [
  { id: "RMA-0261", asset: "PAJE-AGG-02", vendor: "MikroTik", state: "Diagnostics", age: "3 days", owner: "Barak M.", next: "Bench test due today", exposure: "Spare deployed" },
  { id: "RMA-0258", asset: "NUNGWI-AF5X-02", vendor: "Ubiquiti", state: "Vendor review", age: "8 days", owner: "Kassim A.", next: "Awaiting UISP support reply", exposure: "Protected path" },
  { id: "RMA-0254", asset: "FUMBA-SW-05", vendor: "TP-Link", state: "Replacement shipped", age: "12 days", owner: "Fred J.", next: "ETA 24 July", exposure: "No customer impact" },
  { id: "RMA-0249", asset: "KENDWA-UPS-01", vendor: "APC", state: "Closed", age: "21 days", owner: "Abdul R.", next: "Credit received", exposure: "Resolved" },
];

const plans = [
  { quarter: "Q3 2026", title: "North backhaul resilience", assets: 3, budget: "TZS 31.8m", risk: "Critical", readiness: 78, driver: "Age + RF instability", owner: "Wireless Team" },
  { quarter: "Q3 2026", title: "Managed Wi-Fi outdoor refresh", assets: 14, budget: "TZS 8.4m", risk: "High", readiness: 54, driver: "Support expiry", owner: "Managed Wi-Fi" },
  { quarter: "Q4 2026", title: "South aggregation refresh", assets: 4, budget: "TZS 19.2m", risk: "High", readiness: 42, driver: "Capacity + age", owner: "South Network" },
  { quarter: "Q1 2027", title: "POP power modernization", assets: 8, budget: "TZS 24.6m", risk: "Medium", readiness: 31, driver: "Runtime standard", owner: "Facilities" },
];

const ageBands = [
  { label: "< 1 year", value: 74, pct: 15 },
  { label: "1–3 years", value: 191, pct: 39 },
  { label: "3–5 years", value: 147, pct: 30 },
  { label: "> 5 years", value: 74, pct: 15 },
];

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function AssetLifecycle() {
  const [tab, setTab] = useState<AssetTab>("Overview");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [category, setCategory] = useState("All categories");
  const [selected, setSelected] = useState<Asset | null>(null);
  const [spares, setSpares] = useState(spareSeed);
  const [notice, setNotice] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  const filteredAssets = useMemo(() => assetSeed.filter((asset) => {
    const text = `${asset.id} ${asset.name} ${asset.vendor} ${asset.model} ${asset.serial} ${asset.site}`.toLowerCase();
    return text.includes(query.trim().toLowerCase()) && (status === "All statuses" || asset.status === status) && (category === "All categories" || asset.category === category);
  }), [category, query, status]);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const changeTab = (next: AssetTab) => {
    setTab(next);
    window.setTimeout(() => document.querySelector<HTMLElement>(".asset-tabpanel")?.focus(), 0);
  };

  const reserveSpare = (spare: Spare) => {
    if (spare.onHand - spare.reserved <= 0) {
      notify(`${spare.name} has no available stock. A replenishment request was opened.`);
      return;
    }
    setSpares((items) => items.map((item) => item.id === spare.id ? { ...item, reserved: item.reserved + 1 } : item));
    notify(`One ${spare.name} reserved for a field work order.`);
  };

  useEffect(() => {
    if (!selected) return;
    const previous = document.activeElement as HTMLElement | null;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      previous?.focus();
    };
  }, [selected]);

  return <main className="asset-page">
    <section className="asset-hero">
      <div><p className="eyebrow">MODULE 15 · PHYSICAL ESTATE</p><h2>Asset lifecycle & spares</h2><p>Govern ownership, warranties, warehouse stock, repairs and replacement investment across the ISP estate.</p></div>
      <div className="asset-actions"><button className="secondary-button" onClick={() => notify("486 discovered devices reconciled with the asset register.")}><RefreshCw size={15} />Reconcile devices</button><button className="primary-button" onClick={() => notify("New asset registration form opened in seed mode.")}><Plus size={15} />Register asset</button></div>
    </section>

    <section className="asset-summary" aria-label="Asset lifecycle summary">
      <button onClick={() => changeTab("Asset Register")}><span className="asset-stat stat-blue"><HardDrive size={19} /></span><span><small>Managed assets</small><strong>486</strong><em>449 records fully reconciled</em></span></button>
      <button onClick={() => changeTab("Asset Register")}><span className="asset-stat stat-green"><CheckCircle2 size={19} /></span><span><small>Record completeness</small><strong>92.4%</strong><em>37 records need ownership data</em></span></button>
      <button onClick={() => changeTab("Warranty & RMA")}><span className="asset-stat stat-amber"><CalendarClock size={19} /></span><span><small>Warranty exposure</small><strong>23</strong><em>Expiring within 90 days</em></span></button>
      <button onClick={() => changeTab("Spares")}><span className="asset-stat stat-red"><Boxes size={19} /></span><span><small>Stock alerts</small><strong>4</strong><em>1 item currently out of stock</em></span></button>
      <button onClick={() => changeTab("Lifecycle Plan")}><span className="asset-stat stat-violet"><RotateCcw size={19} /></span><span><small>Replacement candidates</small><strong>18</strong><em>TZS 83.4m planned exposure</em></span></button>
    </section>

    <nav className="asset-tabs" role="tablist" aria-label="Asset lifecycle sections">{(["Overview", "Asset Register", "Spares", "Warranty & RMA", "Lifecycle Plan"] as const).map((item) => <button key={item} role="tab" aria-selected={tab === item} aria-controls="asset-tabpanel" tabIndex={tab === item ? 0 : -1} className={tab === item ? "asset-tab-active" : ""} onClick={() => changeTab(item)}>{item}{item === "Asset Register" && <span>486</span>}{item === "Spares" && <span>4</span>}</button>)}</nav>

    <div id="asset-tabpanel" className="asset-tabpanel" role="tabpanel" tabIndex={-1}>
    {tab === "Overview" && <>
      <section className="asset-overview-grid">
        <article className="panel asset-health-panel"><div className="panel-heading"><div><span className="panel-kicker">ESTATE POSTURE</span><h3>Lifecycle distribution</h3></div><button className="text-button" onClick={() => changeTab("Asset Register")}>Open register</button></div><div className="asset-health-body"><div className="asset-score" style={{ background: "conic-gradient(var(--green) 0 92%, #e4e9ef 92% 100%)" }}><span><strong>92%</strong><small>healthy records</small></span></div><div className="asset-age-bands">{ageBands.map((band) => <div key={band.label}><span><small>{band.label}</small><strong>{band.value} assets</strong></span><i><em style={{ width: `${band.pct * 2.35}%` }} /></i></div>)}</div></div><div className="asset-health-note"><ShieldCheck size={15} /><span><strong>449 assets are lifecycle-ready.</strong> Thirty-seven discovered devices still need purchase, owner or warranty evidence.</span></div></article>
        <article className="panel asset-risk-panel"><div className="panel-heading"><div><span className="panel-kicker">NEXT 90 DAYS</span><h3>Exposure requiring action</h3></div><span className="asset-risk-count">41 items</span></div><div className="asset-risk-list"><button onClick={() => changeTab("Lifecycle Plan")}><span className="risk-icon risk-critical"><FileWarning size={16} /></span><span><strong>18 replacement candidates</strong><small>Age, capacity and support risk</small></span><em>Q3–Q4</em><ChevronRight size={15} /></button><button onClick={() => changeTab("Warranty & RMA")}><span className="risk-icon risk-warning"><CalendarClock size={16} /></span><span><strong>23 warranties expiring</strong><small>Coverage ends before 20 October</small></span><em>90 days</em><ChevronRight size={15} /></button><button onClick={() => changeTab("Spares")}><span className="risk-icon risk-warning"><PackageOpen size={16} /></span><span><strong>4 spares below threshold</strong><small>PoE injector is unavailable</small></span><em>Reorder</em><ChevronRight size={15} /></button></div></article>
      </section>

      <section className="asset-lower-grid">
        <article className="panel asset-priority-panel"><div className="panel-heading"><div><span className="panel-kicker">PRIORITY ASSETS</span><h3>Replacement watchlist</h3></div><button className="text-button" onClick={() => changeTab("Lifecycle Plan")}>View plan</button></div><div className="asset-priority-list">{assetSeed.filter((asset) => asset.status === "At risk").map((asset) => <button key={asset.id} onClick={() => setSelected(asset)}><span className="asset-device-icon"><HardDrive size={15} /></span><span><small>{asset.id} · {asset.category}</small><strong>{asset.name}</strong><em>{asset.site} · {asset.model}</em></span><span><strong>{asset.lifecycle}%</strong><small>lifecycle used</small></span><span className={`asset-status status-${slug(asset.status)}`}><i />{asset.status}</span><ChevronRight size={15} /></button>)}</div></article>
        <article className="panel warehouse-panel"><div className="panel-heading"><div><span className="panel-kicker">WAREHOUSE COVERAGE</span><h3>Critical spares</h3></div><strong className="warehouse-value">TZS 28.6m</strong></div><div className="warehouse-locations"><span><Warehouse size={15} /><span><strong>Stone Town</strong><small>68 items · 3 reserved</small></span><em>Healthy</em></span><span><Warehouse size={15} /><span><strong>Paje</strong><small>24 items · 2 alerts</small></span><em className="warehouse-warning">Review</em></span><span><Warehouse size={15} /><span><strong>Fumba</strong><small>19 items · 2 reserved</small></span><em>Healthy</em></span></div><button className="warehouse-action" onClick={() => changeTab("Spares")}><Boxes size={14} />Manage stock and reservations<ChevronRight size={14} /></button></article>
      </section>
    </>}

    {tab === "Asset Register" && <section className="panel asset-register"><div className="asset-register-head"><div><span className="panel-kicker">DISCOVERED + GOVERNED ESTATE</span><h3>Asset register</h3><p>Physical identity, operational status, ownership, warranty and lifecycle state reconciled with Device Inventory.</p></div><button className="secondary-button" onClick={() => notify("Asset register export prepared with current filters.")}><Download size={14} />Export</button></div><div className="asset-toolbar"><label className="asset-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search asset, serial, site or model..." aria-label="Search asset register" />{query && <button onClick={() => setQuery("")} aria-label="Clear asset search"><X size={13} /></button>}</label><label className="asset-select"><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter asset status"><option>All statuses</option>{[...new Set(assetSeed.map((asset) => asset.status))].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} /></label><label className="asset-select"><select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter asset category"><option>All categories</option>{[...new Set(assetSeed.map((asset) => asset.category))].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={13} /></label><span className="asset-reconciled"><CheckCircle2 size={12} />Last reconciled 4 min ago</span></div><div className="asset-table-wrap"><table className="asset-table"><thead><tr><th>Asset</th><th>Status</th><th>Site</th><th>Category</th><th>Age</th><th>Warranty</th><th>Lifecycle</th><th>Replacement</th><th>Owner</th><th /></tr></thead><tbody>{filteredAssets.map((asset) => <tr key={asset.id}><td><button className="asset-identity" onClick={() => setSelected(asset)}><span><HardDrive size={15} /></span><span><strong>{asset.name}</strong><small>{asset.id} · {asset.vendor} {asset.model}</small></span></button></td><td><span className={`asset-status status-${slug(asset.status)}`}><i />{asset.status}</span></td><td><strong>{asset.site}</strong><small className="asset-cell-meta">{asset.region}</small></td><td>{asset.category}</td><td>{asset.age}</td><td className={asset.warranty === "Expired" ? "asset-expired" : ""}>{asset.warranty}</td><td><span className="lifecycle-meter"><strong>{asset.lifecycle}%</strong><i><em className={asset.lifecycle >= 80 ? "lifecycle-high" : ""} style={{ width: `${asset.lifecycle}%` }} /></i></span></td><td>{asset.replacement}</td><td>{asset.owner}</td><td><button className="row-action" onClick={() => setSelected(asset)} aria-label={`Inspect ${asset.name}`}><ChevronRight size={16} /></button></td></tr>)}</tbody></table></div>{filteredAssets.length === 0 && <div className="asset-empty"><Search size={25} /><strong>No assets match these filters</strong><p>Adjust the status, category or search query.</p></div>}</section>}

    {tab === "Spares" && <section className="panel asset-register"><div className="asset-register-head"><div><span className="panel-kicker">WAREHOUSE & FIELD STOCK</span><h3>Critical spares inventory</h3><p>Availability, reservations, reorder thresholds and procurement lead time for service-restoration parts.</p></div><button className="primary-button" onClick={() => notify("Stock receipt workflow opened in seed mode.")}><PackageCheck size={14} />Receive stock</button></div><div className="spares-grid">{spares.map((spare) => { const available = spare.onHand - spare.reserved; return <article key={spare.id}><div className="spare-card-head"><span className={`spare-icon spare-${slug(spare.state)}`}><PackageOpen size={18} /></span><span><small>{spare.id} · {spare.part}</small><strong>{spare.name}</strong><em>{spare.category}</em></span><span className={`stock-state stock-${slug(spare.state)}`}><i />{spare.state}</span></div><div className="spare-level"><span><small>Available</small><strong>{available}</strong></span><span><small>On hand</small><strong>{spare.onHand}</strong></span><span><small>Reserved</small><strong>{spare.reserved}</strong></span><span><small>Reorder at</small><strong>{spare.reorder}</strong></span></div><div className="spare-meta"><span><Warehouse size={12} />{spare.warehouse}</span><span><Truck size={12} />{spare.leadTime}</span><span>{spare.unitCost} / unit</span></div><div className="spare-compatible"><small>Compatibility</small><strong>{spare.compatible}</strong></div><div className="spare-actions"><button onClick={() => notify(`${spare.name} stock history opened.`)}>History</button><button onClick={() => reserveSpare(spare)} disabled={available === 0}><PackageCheck size={12} />{available === 0 ? "Unavailable" : "Reserve"}</button></div></article>; })}</div></section>}

    {tab === "Warranty & RMA" && <section className="asset-warranty-grid"><article className="panel warranty-panel"><div className="asset-register-head"><div><span className="panel-kicker">ACTIVE RETURN CASES</span><h3>Warranty & RMA register</h3><p>Track diagnostics, vendor decisions, shipments and customer exposure from failure to closure.</p></div><button className="primary-button" onClick={() => notify("New RMA case draft created.")}><Plus size={14} />Create RMA</button></div><div className="rma-list">{rmas.map((rma) => <button key={rma.id} onClick={() => notify(`${rma.id} case timeline opened.`)}><span className="rma-icon"><Wrench size={15} /></span><span><small>{rma.id} · {rma.vendor}</small><strong>{rma.asset}</strong><em>{rma.next}</em></span><span><small>Owner</small><strong>{rma.owner}</strong></span><span><small>Customer exposure</small><strong>{rma.exposure}</strong></span><span className={`rma-state rma-${slug(rma.state)}`}>{rma.state}</span><ChevronRight size={15} /></button>)}</div></article><aside className="panel warranty-exposure"><div className="panel-heading"><div><span className="panel-kicker">COVERAGE EXPOSURE</span><h3>Warranty horizon</h3></div><CalendarClock size={18} /></div><div className="warranty-metrics"><span><small>Expires in 30 days</small><strong className="text-red">6</strong></span><span><small>Expires in 90 days</small><strong className="text-amber">23</strong></span><span><small>Active coverage</small><strong className="text-green">301</strong></span><span><small>Coverage unknown</small><strong>37</strong></span></div><div className="warranty-note"><CircleAlert size={16} /><span><strong>Support gap detected</strong><p>Nine core or backhaul assets have expired coverage and no approved replacement project.</p></span></div><button onClick={() => changeTab("Lifecycle Plan")}><FileWarning size={14} />Review uncovered assets<ChevronRight size={14} /></button></aside></section>}

    {tab === "Lifecycle Plan" && <section className="panel asset-register"><div className="asset-register-head"><div><span className="panel-kicker">CAPITAL & RISK ROADMAP</span><h3>Lifecycle replacement plan</h3><p>Prioritized investments based on service criticality, age, support status, failure history and available spares.</p></div><button className="secondary-button" onClick={() => notify("Lifecycle planning report prepared for Finance review.")}><Download size={14} />Export plan</button></div><div className="lifecycle-plan-summary"><span><small>Planned assets</small><strong>29</strong></span><span><small>Forecast investment</small><strong>TZS 84.0m</strong></span><span><small>Critical exposure</small><strong className="text-red">3 assets</strong></span><span><small>Budget approved</small><strong className="text-green">TZS 31.8m</strong></span></div><div className="lifecycle-projects">{plans.map((plan) => <article key={plan.title}><div className="project-quarter"><CalendarClock size={16} /><strong>{plan.quarter}</strong></div><div><small>{plan.driver}</small><strong>{plan.title}</strong><p>{plan.assets} assets · {plan.owner}</p></div><span className={`project-risk project-${plan.risk.toLowerCase()}`}>{plan.risk}</span><div className="project-readiness"><span><small>Readiness</small><strong>{plan.readiness}%</strong></span><i><em style={{ width: `${plan.readiness}%` }} /></i></div><strong className="project-budget">{plan.budget}</strong><button className="row-action" onClick={() => notify(`${plan.title} project plan opened.`)} aria-label={`Open ${plan.title}`}><ChevronRight size={16} /></button></article>)}</div></section>}
    </div>

    {selected && <div className="asset-drawer-layer"><button className="drawer-scrim" onClick={() => setSelected(null)} aria-label="Close asset details" /><aside className="asset-drawer" role="dialog" aria-modal="true" aria-labelledby="asset-drawer-title"><div className="drawer-head"><div><span className="panel-kicker">{selected.id} · {selected.category.toUpperCase()}</span><h2 id="asset-drawer-title">{selected.name}</h2><p>{selected.vendor} {selected.model}</p></div><button ref={closeRef} className="icon-button" onClick={() => setSelected(null)} aria-label="Close asset details"><X size={20} /></button></div><div className="asset-drawer-hero"><span className="asset-device-icon"><HardDrive size={20} /></span><span><small>Lifecycle state</small><strong>{selected.status} · {selected.lifecycle}% used</strong><p>{selected.site} · {selected.region}</p></span><span className={`asset-status status-${slug(selected.status)}`}><i />{selected.status}</span></div><p className="asset-drawer-description">{selected.detail}</p><section className="asset-drawer-section"><h3>Asset identity</h3><dl className="asset-detail-grid"><div><dt>Serial number</dt><dd>{selected.serial}</dd></div><div><dt>Installed</dt><dd>{selected.installed}</dd></div><div><dt>Warranty until</dt><dd className={selected.warranty === "Expired" ? "asset-expired" : ""}>{selected.warranty}</dd></div><div><dt>Replacement window</dt><dd>{selected.replacement}</dd></div><div><dt>Accountable owner</dt><dd>{selected.owner}</dd></div><div><dt>Reconciled source</dt><dd>{selected.source}</dd></div></dl></section><section className="asset-drawer-section"><h3>Governance checks</h3><div className="asset-checks"><span><CheckCircle2 size={13} />Physical identity verified</span><span><CheckCircle2 size={13} />Monitoring record linked</span><span><CheckCircle2 size={13} />Configuration backup policy assigned</span><span className={selected.warranty === "Expired" ? "asset-check-warning" : ""}>{selected.warranty === "Expired" ? <CircleAlert size={13} /> : <CheckCircle2 size={13} />}{selected.warranty === "Expired" ? "Warranty coverage expired" : "Warranty evidence current"}</span></div></section><div className="asset-drawer-actions"><button className="secondary-button" onClick={() => notify(`${selected.name} history opened.`)}><Clock3 size={14} />View history</button><button className="primary-button" onClick={() => notify(`${selected.name} lifecycle record opened for editing.`)}><Wrench size={14} />Update record</button></div></aside></div>}

    {notice && <div className="toast" role="status"><CheckCircle2 size={18} />{notice}</div>}
  </main>;
}
