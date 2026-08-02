"use client";

import {
  Activity,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  HardDrive,
  LoaderCircle,
  MapPin,
  Network,
  Plus,
  Radio,
  RefreshCw,
  Router,
  Search,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Wifi,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type DeviceStatus = "Online" | "Warning" | "Offline" | "Maintenance";

type Device = {
  id: string;
  name: string;
  vendor: "MikroTik" | "Ubiquiti" | "TP-Link" | "Fortinet";
  model: string;
  role: string;
  site: string;
  ip: string;
  status: DeviceStatus;
  availability: number;
  cpu: number | null;
  uptime: string;
  lastSeen: string;
  firmware: string;
  serial: string;
  customers: number;
  protocol: string;
};

const seedDevices: Device[] = [
  { id: "DEV-0001", name: "CORE-RTR-01", vendor: "MikroTik", model: "CCR2116-12G-4S+", role: "Core Router", site: "Michenzani Core", ip: "10.10.0.1", status: "Online", availability: 99.99, cpu: 28, uptime: "124d 08h", lastSeen: "8 sec ago", firmware: "RouterOS 7.19.1", serial: "HDG09Z7K2TR", customers: 2214, protocol: "API · SNMPv3" },
  { id: "DEV-0002", name: "NORTH-AF5XHD-01", vendor: "Ubiquiti", model: "airFiber 5XHD", role: "Backhaul Radio", site: "North Backhaul", ip: "10.20.1.11", status: "Warning", availability: 99.72, cpu: 61, uptime: "38d 14h", lastSeen: "12 sec ago", firmware: "WA.v1.5.2", serial: "AF5X-9A82K1", customers: 126, protocol: "UISP · SNMP" },
  { id: "DEV-0003", name: "PJE-RB4011-01", vendor: "MikroTik", model: "RB4011iGS+", role: "Distribution Router", site: "Paje Tower", ip: "10.30.4.1", status: "Warning", availability: 99.81, cpu: 74, uptime: "61d 02h", lastSeen: "9 sec ago", firmware: "RouterOS 7.18.2", serial: "D4K08MX91LA", customers: 184, protocol: "API · SNMPv3" },
  { id: "DEV-0004", name: "KND-SW-01", vendor: "MikroTik", model: "CRS317-1G-16S+", role: "Aggregation Switch", site: "Kendwa POP", ip: "10.40.2.2", status: "Online", availability: 99.98, cpu: 19, uptime: "92d 17h", lastSeen: "10 sec ago", firmware: "RouterOS 7.19.1", serial: "HGC0A7P4N22", customers: 312, protocol: "API · SNMPv3" },
  { id: "DEV-0005", name: "BWJ-LBE5AC-04", vendor: "Ubiquiti", model: "LiteBeam 5AC", role: "Customer CPE", site: "Bwejuu", ip: "10.51.8.24", status: "Offline", availability: 96.42, cpu: null, uptime: "—", lastSeen: "24 min ago", firmware: "WA.v8.7.12", serial: "LBE5-77C2F8", customers: 1, protocol: "UISP · ICMP" },
  { id: "DEV-0006", name: "KIB-PBE5AC-01", vendor: "Ubiquiti", model: "PowerBeam 5AC Gen2", role: "Wireless Bridge", site: "Kibweni", ip: "10.22.5.10", status: "Online", availability: 99.96, cpu: 36, uptime: "18d 11h", lastSeen: "7 sec ago", firmware: "WA.v8.7.14", serial: "PBE5-0D2A91", customers: 48, protocol: "UISP · SNMP" },
  { id: "DEV-0007", name: "HOTEL-OMADA-GW", vendor: "TP-Link", model: "ER7206", role: "Managed Gateway", site: "Mala Boutique", ip: "192.168.50.1", status: "Online", availability: 99.91, cpu: 22, uptime: "27d 06h", lastSeen: "19 sec ago", firmware: "1.4.0 Build 202501", serial: "224C0A900188", customers: 1, protocol: "Omada Controller" },
  { id: "DEV-0008", name: "HQ-FGT-01", vendor: "Fortinet", model: "FortiGate 100F", role: "Edge Firewall", site: "Zannet HQ", ip: "10.10.0.254", status: "Online", availability: 99.99, cpu: 31, uptime: "77d 20h", lastSeen: "6 sec ago", firmware: "FortiOS 7.4.7", serial: "FG100FTK22042811", customers: 2214, protocol: "REST API · SNMPv3" },
  { id: "DEV-0009", name: "NUN-UDMPRO-01", vendor: "Ubiquiti", model: "UniFi Dream Machine Pro", role: "Site Gateway", site: "Nungwi Resort", ip: "10.63.1.1", status: "Maintenance", availability: 99.88, cpu: 42, uptime: "3d 04h", lastSeen: "14 sec ago", firmware: "UniFi OS 4.1.13", serial: "UDM4A1220F8", customers: 1, protocol: "UniFi Controller" },
  { id: "DEV-0010", name: "JMB-RB960-01", vendor: "MikroTik", model: "RB960PGS", role: "Access Router", site: "Jambo Beach", ip: "10.71.2.1", status: "Warning", availability: 98.94, cpu: 88, uptime: "45d 22h", lastSeen: "11 sec ago", firmware: "RouterOS 7.17.2", serial: "CC9097L72MC", customers: 67, protocol: "API · SNMPv2" },
  { id: "DEV-0011", name: "FUN-AF60LR-01", vendor: "Ubiquiti", model: "airFiber 60 LR", role: "Backhaul Radio", site: "Fumba", ip: "10.82.1.10", status: "Online", availability: 99.97, cpu: 44, uptime: "33d 09h", lastSeen: "8 sec ago", firmware: "AF60.v2.6.4", serial: "AF60-3ED22A", customers: 93, protocol: "UISP · SNMP" },
  { id: "DEV-0012", name: "URA-ER605-01", vendor: "TP-Link", model: "ER605 v2", role: "Customer Gateway", site: "Uroa", ip: "192.168.88.1", status: "Online", availability: 99.84, cpu: 18, uptime: "12d 16h", lastSeen: "20 sec ago", firmware: "2.2.6 Build 202407", serial: "222B2E800432", customers: 1, protocol: "Omada Controller" },
];

const vendorColors: Record<Device["vendor"], string> = {
  MikroTik: "vendor-mikrotik",
  Ubiquiti: "vendor-ubiquiti",
  "TP-Link": "vendor-tplink",
  Fortinet: "vendor-fortinet",
};

function DeviceIcon({ role }: { role: string }) {
  if (role.includes("Radio") || role.includes("Bridge")) return <Radio size={18} />;
  if (role.includes("Switch")) return <Server size={18} />;
  if (role.includes("Firewall")) return <ShieldCheck size={18} />;
  if (role.includes("Gateway")) return <Wifi size={18} />;
  return <Router size={18} />;
}

export default function DeviceInventory() {
  const [query, setQuery] = useState("");
  const [vendor, setVendor] = useState("All vendors");
  const [status, setStatus] = useState("All statuses");
  const [site, setSite] = useState("All sites");
  const [selected, setSelected] = useState<Device | null>(null);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [discovering, setDiscovering] = useState(false);
  const [discoveryDone, setDiscoveryDone] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "status" | "availability">("name");

  const sites = useMemo(() => [...new Set(seedDevices.map((device) => device.site))].sort(), []);
  const filtered = useMemo(() => {
    const result = seedDevices.filter((device) => {
      const matchesQuery = `${device.name} ${device.ip} ${device.model} ${device.serial} ${device.site}`.toLowerCase().includes(query.toLowerCase());
      return matchesQuery && (vendor === "All vendors" || device.vendor === vendor) && (status === "All statuses" || device.status === status) && (site === "All sites" || device.site === site);
    });
    return result.sort((a, b) => sortBy === "availability" ? b.availability - a.availability : sortBy === "status" ? a.status.localeCompare(b.status) : a.name.localeCompare(b.name));
  }, [query, vendor, status, site, sortBy]);

  const runDiscovery = () => {
    setDiscovering(true);
    setDiscoveryDone(false);
    window.setTimeout(() => {
      setDiscovering(false);
      setDiscoveryDone(true);
    }, 1300);
  };

  return (
    <main className="inventory-page">
      <section className="inventory-hero">
        <div><p className="eyebrow">MODULE 01 · ASSET INTELLIGENCE</p><h2>Device discovery & inventory</h2><p>Discover, classify and monitor every managed device across your ISP network.</p></div>
        <div className="inventory-actions"><button className="secondary-button"><RefreshCw size={15} /> Sync inventory</button><button className="primary-button" onClick={() => { setDiscoverOpen(true); setDiscoveryDone(false); }}><Plus size={16} /> Discover devices</button></div>
      </section>

      <section className="inventory-stats" aria-label="Inventory summary">
        <article><span className="inventory-stat-icon stat-blue"><HardDrive size={19} /></span><div><small>Total devices</small><strong>486</strong><em>+8 this month</em></div></article>
        <article><span className="inventory-stat-icon stat-green"><CheckCircle2 size={19} /></span><div><small>Online</small><strong>461</strong><em>94.9% healthy</em></div></article>
        <article><span className="inventory-stat-icon stat-amber"><CircleAlert size={19} /></span><div><small>Warning</small><strong>13</strong><em>5 need attention</em></div></article>
        <article><span className="inventory-stat-icon stat-red"><Activity size={19} /></span><div><small>Offline</small><strong>12</strong><em>184 customers affected</em></div></article>
        <article><span className="inventory-stat-icon stat-violet"><Network size={19} /></span><div><small>Unclassified</small><strong>4</strong><em>Awaiting review</em></div></article>
      </section>

      <section className="inventory-panel">
        <div className="inventory-toolbar">
          <div className="inventory-search"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, IP, serial, model or site..." aria-label="Search device inventory" />{query && <button onClick={() => setQuery("")} aria-label="Clear device search"><X size={15} /></button>}</div>
          <label className="select-control"><span>Vendor</span><select value={vendor} onChange={(event) => setVendor(event.target.value)}>{["All vendors", "MikroTik", "Ubiquiti", "TP-Link", "Fortinet"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label>
          <label className="select-control"><span>Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}>{["All statuses", "Online", "Warning", "Offline", "Maintenance"].map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label>
          <label className="select-control site-select"><span>Site</span><select value={site} onChange={(event) => setSite(event.target.value)}><option>All sites</option>{sites.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label>
        </div>

        <div className="inventory-table-head"><span><strong>{filtered.length}</strong> seed devices shown</span><label><SlidersHorizontal size={14} /> Sort<select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)}><option value="name">Name</option><option value="status">Status</option><option value="availability">Availability</option></select></label></div>

        <div className="device-table-wrap">
          <table className="device-table">
            <thead><tr><th>Device</th><th>Vendor / model</th><th>Site</th><th>Management IP</th><th>Status</th><th>Availability</th><th>CPU</th><th>Last seen</th><th aria-label="Actions" /></tr></thead>
            <tbody>
              {filtered.map((device) => (
                <tr key={device.id} onClick={() => setSelected(device)}>
                  <td><span className="device-identity"><i><DeviceIcon role={device.role} /></i><span><strong>{device.name}</strong><small>{device.role}</small></span></span></td>
                  <td><span className="vendor-model"><i className={vendorColors[device.vendor]}>{device.vendor.slice(0, 1)}</i><span><strong>{device.vendor}</strong><small>{device.model}</small></span></span></td>
                  <td><span className="site-cell"><MapPin size={13} />{device.site}</span></td>
                  <td><code>{device.ip}</code></td>
                  <td><span className={`device-status status-${device.status.toLowerCase()}`}><i />{device.status}</span></td>
                  <td><span className="availability-cell"><strong>{device.availability}%</strong><i><em style={{ width: `${device.availability}%` }} /></i></span></td>
                  <td>{device.cpu === null ? <span className="muted-value">—</span> : <span className={device.cpu >= 80 ? "cpu-high" : ""}>{device.cpu}%</span>}</td>
                  <td><span className="last-seen"><Clock3 size={12} />{device.lastSeen}</span></td>
                  <td><button className="row-action" onClick={(event) => { event.stopPropagation(); setSelected(device); }} aria-label={`Open ${device.name}`}><ChevronRight size={17} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="empty-devices"><Search size={25} /><strong>No devices match these filters</strong><p>Clear one or more filters to view inventory records.</p><button className="text-button" onClick={() => { setQuery(""); setVendor("All vendors"); setStatus("All statuses"); setSite("All sites"); }}>Clear filters</button></div>}
        </div>

        <div className="inventory-footer"><span>Seed dataset · 12 representative devices from 486 assets</span><div><button disabled>Previous</button><button className="page-current">1</button><button>2</button><button>3</button><span>…</span><button>41</button><button>Next</button></div></div>
      </section>

      {selected && (
        <div className="drawer-layer">
          <button className="drawer-scrim" aria-label="Close device details" onClick={() => setSelected(null)} />
          <aside className="device-drawer" aria-label={`${selected.name} device details`}>
            <div className="drawer-head"><div><span className="panel-kicker">{selected.id} · {selected.vendor}</span><h2>{selected.name}</h2><p>{selected.model} · {selected.role}</p></div><button className="icon-button" onClick={() => setSelected(null)} aria-label="Close device"><X size={20} /></button></div>
            <div className="device-drawer-status"><span className={`device-status status-${selected.status.toLowerCase()}`}><i />{selected.status}</span><span><Clock3 size={13} /> Last seen {selected.lastSeen}</span></div>
            <section className="device-health-card"><div><small>30-day availability</small><strong>{selected.availability}%</strong></div><div><small>CPU load</small><strong className={selected.cpu && selected.cpu >= 80 ? "cpu-high" : ""}>{selected.cpu === null ? "—" : `${selected.cpu}%`}</strong></div><div><small>Uptime</small><strong>{selected.uptime}</strong></div></section>
            <section className="device-detail-section"><h3>Device information</h3><dl><div><dt>Management IP</dt><dd><code>{selected.ip}</code></dd></div><div><dt>Site</dt><dd>{selected.site}</dd></div><div><dt>Firmware</dt><dd>{selected.firmware}</dd></div><div><dt>Serial number</dt><dd>{selected.serial}</dd></div><div><dt>Monitoring</dt><dd>{selected.protocol}</dd></div><div><dt>Dependent customers</dt><dd>{selected.customers.toLocaleString()}</dd></div></dl></section>
            <section className="device-detail-section"><h3>Live resource health</h3><div className="resource-row"><span>CPU utilization</span><strong>{selected.cpu ?? 0}%</strong><i><em style={{ width: `${selected.cpu ?? 0}%` }} className={selected.cpu && selected.cpu >= 80 ? "resource-danger" : ""} /></i></div><div className="resource-row"><span>Memory utilization</span><strong>43%</strong><i><em style={{ width: "43%" }} /></i></div><div className="resource-row"><span>Storage utilization</span><strong>28%</strong><i><em style={{ width: "28%" }} /></i></div></section>
            <div className="drawer-actions"><button className="primary-button">Open full device profile</button><button className="secondary-button">Run diagnostics</button></div>
          </aside>
        </div>
      )}

      {discoverOpen && (
        <div className="modal-layer">
          <button className="drawer-scrim" aria-label="Close discovery" onClick={() => !discovering && setDiscoverOpen(false)} />
          <section className="discovery-modal" role="dialog" aria-modal="true" aria-labelledby="discovery-title">
            <div className="drawer-head"><div><span className="panel-kicker">GUIDED DISCOVERY</span><h2 id="discovery-title">Discover network devices</h2><p>Scan a trusted management subnet and add identified devices to inventory.</p></div><button className="icon-button" disabled={discovering} onClick={() => setDiscoverOpen(false)} aria-label="Close discovery"><X size={20} /></button></div>
            {!discoveryDone ? <>
              <label className="field-label">Discovery name<input defaultValue="Zanzibar management scan" /></label>
              <label className="field-label">IP range or CIDR<input defaultValue="10.20.0.0/16" /></label>
              <div className="discovery-protocols"><span>Discovery methods</span><label><input type="checkbox" defaultChecked /> ICMP</label><label><input type="checkbox" defaultChecked /> SNMP</label><label><input type="checkbox" defaultChecked /> MikroTik API</label><label><input type="checkbox" defaultChecked /> UISP</label></div>
              <div className="discovery-note"><ShieldCheck size={18} /><span><strong>Read-only discovery</strong><small>No configuration changes will be made to network devices.</small></span></div>
              <div className="modal-actions"><button className="secondary-button" disabled={discovering} onClick={() => setDiscoverOpen(false)}>Cancel</button><button className="primary-button" disabled={discovering} onClick={runDiscovery}>{discovering ? <><LoaderCircle className="spin" size={16} /> Scanning network...</> : <><Search size={16} /> Start discovery</>}</button></div>
            </> : <div className="discovery-result"><span><CheckCircle2 size={28} /></span><h3>Discovery completed</h3><p>31 addresses responded: 27 known devices, 3 new devices and 1 unclassified endpoint.</p><div><strong>3</strong><span>new devices ready for review</span></div><button className="primary-button" onClick={() => setDiscoverOpen(false)}>Review discovered devices</button></div>}
          </section>
        </div>
      )}
    </main>
  );
}
