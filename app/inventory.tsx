"use client";
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleAlert,
  HardDrive,
  MapPin,
  Network,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import {
  mutate,
  timestamp,
  useOperationalData,
  type OperationalDevice,
} from "./use-operational-data";

type Candidate = {
  id: string;
  hostname: string;
  status: string;
  collectorId: string;
};
export default function DeviceInventory() {
  const { data, error, loading, refresh } = useOperationalData();
  const [query, setQuery] = useState(""),
    [status, setStatus] = useState("all"),
    [site, setSite] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null),
    [siteId, setSiteId] = useState("");
  const [selectedCollector, setSelectedCollector] = useState(""),
    [enabled, setEnabled] = useState(true),
    [editSiteId, setEditSiteId] = useState(""),
    [collectorName, setCollectorName] = useState("");
  const [siteName, setSiteName] = useState(""),
    [region, setRegion] = useState("");
  const [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]),
    [candidateId, setCandidateId] = useState(""),
    [activationSite, setActivationSite] = useState(""),
    [collectorId, setCollectorId] = useState("");
  useEffect(() => {
    if (!data?.canAdmin) return;
    const controller = new AbortController();
    fetch("/api/platform/device-intake", { signal: controller.signal })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error);
        setCandidates(
          result.candidates.filter((row: Candidate) => row.status === "draft"),
        );
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setNotice(
            error instanceof Error
              ? error.message
              : "Intake could not be loaded",
          );
      });
    return () => controller.abort();
  }, [data?.canAdmin]);
  const selected = data?.devices.find((device) => device.id === selectedId);
  const rows = useMemo(
    () =>
      (data?.devices ?? []).filter(
        (device) =>
          `${device.hostname} ${device.managementIp} ${device.site} ${device.vendor}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (status === "all" || device.health.status === status) &&
          (site === "all" || (device.siteId ?? "") === site),
      ),
    [data, query, status, site],
  );
  const action = async (work: () => Promise<void>) => {
    setBusy(true);
    setNotice("");
    try {
      await work();
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Change failed");
    } finally {
      setBusy(false);
    }
  };
  const select = (device: OperationalDevice) => {
    setSelectedId(device.id);
    setSiteId(device.siteId ?? "");
    setSelectedCollector(device.collectorId ?? "");
    setEnabled(device.monitoringEnabled);
  };
  return (
    <main className="inventory-page">
      <section className="inventory-hero">
        <div>
          <p className="eyebrow">ASSET INTELLIGENCE</p>
          <h2>Devices & sites</h2>
          <p>
            Registered inventory, site assignments and observed device health.
          </p>
        </div>
        <button
          className="secondary-button"
          disabled={loading}
          onClick={() => void refresh()}
        >
          <RefreshCw size={15} />
          {loading ? "Loading…" : "Refresh inventory"}
        </button>
      </section>
      {error && (
        <p role="alert">{error}. Previously loaded data may be outdated.</p>
      )}
      {notice && <p role="status">{notice}</p>}
      <section className="inventory-stats" aria-label="Inventory summary">
        {[
          {
            label: "Total devices",
            value: data?.summary.total,
            icon: HardDrive,
          },
          { label: "Online", value: data?.summary.online, icon: CheckCircle2 },
          { label: "Offline", value: data?.summary.offline, icon: CircleAlert },
          { label: "Unknown", value: data?.summary.unknown, icon: Network },
          { label: "Sites", value: data?.sites.length, icon: MapPin },
        ].map((item) => (
          <article key={item.label}>
            <span className="inventory-stat-icon stat-blue">
              <item.icon size={19} />
            </span>
            <div>
              <small>{item.label}</small>
              <strong>{item.value ?? "—"}</strong>
            </div>
          </article>
        ))}
      </section>
      {data?.canAdmin && (
        <section className="panel" style={{ padding: 20, marginBottom: 20 }}>
          <h3>{editSiteId ? "Edit site" : "Create a site"}</h3>
          <label className="field-label">
            Site to edit
            <select
              value={editSiteId}
              onChange={(event) => {
                setEditSiteId(event.target.value);
                const item = data.sites.find(
                  (site) => site.id === event.target.value,
                );
                setSiteName(item?.name ?? "");
                setRegion(item?.region ?? "");
              }}
            >
              <option value="">Create new site</option>
              {data.sites.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void action(async () => {
                await mutate(
                  "/api/platform/sites",
                  editSiteId ? "PATCH" : "POST",
                  { id: editSiteId || undefined, name: siteName, region },
                );
                setSiteName("");
                setRegion("");
                setEditSiteId("");
                setNotice("Site saved.");
              });
            }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <label className="field-label">
              Site name
              <input
                required
                maxLength={120}
                value={siteName}
                onChange={(event) => setSiteName(event.target.value)}
              />
            </label>
            <label className="field-label">
              Region
              <input
                maxLength={120}
                value={region}
                onChange={(event) => setRegion(event.target.value)}
              />
            </label>
            <button className="primary-button" disabled={busy}>
              {editSiteId ? "Save site" : "Create site"}
            </button>
          </form>
        </section>
      )}
      {data?.canAdmin && (
        <section className="panel" style={{ padding: 20, marginBottom: 20 }}>
          <h3>Register a collector</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void action(async () => {
                await mutate("/api/platform/collectors", "POST", {
                  name: collectorName,
                });
                setCollectorName("");
                setNotice(
                  "Collector registered. Its ID is available when assigning a device.",
                );
              });
            }}
            style={{ display: "flex", gap: 12 }}
          >
            <label className="field-label">
              Collector name
              <input
                required
                maxLength={120}
                value={collectorName}
                onChange={(event) => setCollectorName(event.target.value)}
              />
            </label>
            <button className="primary-button" disabled={busy}>
              Register collector
            </button>
          </form>
        </section>
      )}
      <section className="inventory-panel">
        <div className="inventory-toolbar">
          <div className="inventory-search">
            <Search size={17} />
            <input
              aria-label="Search devices"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search device, IP or site"
            />
          </div>
          <label className="select-control">
            Status
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="all">All statuses</option>
              {["online", "offline", "unknown"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="select-control">
            Site
            <select
              value={site}
              onChange={(event) => setSite(event.target.value)}
            >
              <option value="all">All sites</option>
              <option value="">Unassigned</option>
              {data?.sites.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="device-table-wrap">
          <table className="device-table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Vendor / model</th>
                <th>Site</th>
                <th>Management IP</th>
                <th>Health</th>
                <th>Reason</th>
                <th>Last successful contact</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((device) => (
                <tr key={device.id}>
                  <td>
                    <strong>{device.hostname}</strong>
                  </td>
                  <td>
                    {device.vendor} / {device.model ?? "—"}
                  </td>
                  <td>{device.site}</td>
                  <td>
                    <code>{device.managementIp ?? "—"}</code>
                  </td>
                  <td>
                    <span
                      className={`device-status status-${device.health.status}`}
                    >
                      <i />
                      {device.health.status}
                    </span>
                  </td>
                  <td>{device.health.reason}</td>
                  <td>{timestamp(device.lastSeenAt)}</td>
                  <td>
                    <button
                      className="text-button"
                      onClick={() => select(device)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && !error && rows.length === 0 && (
            <p style={{ padding: 20 }}>
              No registered devices match these filters. Stage a device in
              Device Intake, then activate it below.
            </p>
          )}
        </div>
        <div className="inventory-footer">
          {rows.length} devices · Checked {timestamp(data?.checkedAt)}
        </div>
      </section>
      {data?.canAdmin && (
        <section className="panel" style={{ padding: 20, marginTop: 20 }}>
          <h3>Activate a staged device</h3>
          <p>
            Select its site and registered collector. Health remains Unknown
            until availability evidence arrives.
          </p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void action(async () => {
                await mutate("/api/platform/device-activation", "POST", {
                  candidateId,
                  siteId: activationSite,
                  collectorId,
                  approved: true,
                });
                setCandidates((value) =>
                  value.filter((row) => row.id !== candidateId),
                );
                setCandidateId("");
                setNotice(
                  "Device activated. Configure its assigned collector with the registered device ID shown in Details.",
                );
              });
            }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <label className="field-label">
              Draft device
              <select
                required
                value={candidateId}
                onChange={(event) => setCandidateId(event.target.value)}
              >
                <option value="">Select device</option>
                {candidates.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.hostname}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Site
              <select
                required
                value={activationSite}
                onChange={(event) => setActivationSite(event.target.value)}
              >
                <option value="">Select site</option>
                {data.sites.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Collector
              <select
                required
                value={collectorId}
                onChange={(event) => setCollectorId(event.target.value)}
              >
                <option value="">Select collector</option>
                {data.collectors.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="primary-button"
              disabled={busy || !candidates.length}
            >
              Approve activation
            </button>
          </form>
        </section>
      )}
      {selected && (
        <div className="drawer-layer">
          <button
            className="drawer-scrim"
            aria-label="Close device details"
            onClick={() => setSelectedId(null)}
          />
          <aside
            className="device-drawer"
            aria-label={`${selected.hostname} details`}
          >
            <div className="drawer-head">
              <div>
                <h2>{selected.hostname}</h2>
                <p>{selected.id}</p>
              </div>
              <button
                className="icon-button"
                aria-label="Close device"
                onClick={() => setSelectedId(null)}
              >
                <X size={20} />
              </button>
            </div>
            <section className="device-detail-section">
              <h3>{selected.health.status}</h3>
              <p>{selected.health.reason}</p>
              <dl>
                <div>
                  <dt>Collector</dt>
                  <dd>{selected.collectorId ?? "Unassigned"}</dd>
                </div>
                <div>
                  <dt>Last observation</dt>
                  <dd>{timestamp(selected.observation?.observedAt)}</dd>
                </div>
                <div>
                  <dt>Last successful contact</dt>
                  <dd>{timestamp(selected.lastSeenAt)}</dd>
                </div>
                <div>
                  <dt>Site</dt>
                  <dd>{selected.site}</dd>
                </div>
              </dl>
            </section>
            {data?.canAdmin && (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  void action(async () => {
                    await mutate("/api/platform/devices", "PATCH", {
                      deviceId: selected.id,
                      siteId: siteId || null,
                      collectorId: selectedCollector || null,
                      monitoringEnabled: enabled,
                    });
                    setNotice("Site assignment saved.");
                  });
                }}
              >
                <label className="field-label">
                  Assign site
                  <select
                    value={siteId}
                    onChange={(event) => setSiteId(event.target.value)}
                  >
                    <option value="">Unassigned</option>
                    {data.sites.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field-label">
                  Assigned collector
                  <select
                    value={selectedCollector}
                    onChange={(event) =>
                      setSelectedCollector(event.target.value)
                    }
                  >
                    <option value="">Unassigned</option>
                    {data.collectors.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field-label">
                  <span>
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(event) => setEnabled(event.target.checked)}
                    />{" "}
                    Monitoring enabled
                  </span>
                </label>
                <button className="primary-button" disabled={busy}>
                  Save assignment
                </button>
              </form>
            )}
            <section className="device-detail-section">
              <h3>Fresh metrics</h3>
              {selected.metrics.length ? (
                <dl>
                  {selected.metrics.map((metric) => (
                    <div key={metric.metricKey}>
                      <dt>{metric.metricKey}</dt>
                      <dd>
                        {metric.value} {metric.unit}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p>No fresh validated metrics.</p>
              )}
            </section>
          </aside>
        </div>
      )}
    </main>
  );
}
