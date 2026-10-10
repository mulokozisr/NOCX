"use client";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { timestamp, useOperationalData } from "./use-operational-data";
export default function RealTimeMonitoring() {
  const [live, setLive] = useState(true),
    [status, setStatus] = useState("all");
  const { data, error, loading, refresh } = useOperationalData(live);
  const rows = (data?.devices ?? []).filter(
    (device) => status === "all" || device.health.status === status,
  );
  return (
    <main className="monitoring-page">
      <section className="inventory-hero">
        <div>
          <p className="eyebrow">OBSERVED DEVICE HEALTH</p>
          <h2>Network monitoring</h2>
          <p>Availability and validated metrics from registered collectors.</p>
        </div>
        <div className="inventory-actions">
          <button
            className="secondary-button"
            onClick={() => setLive((value) => !value)}
          >
            {live ? "Pause refresh" : "Resume refresh"}
          </button>
          <button
            className="secondary-button"
            disabled={loading}
            onClick={() => void refresh()}
          >
            <RefreshCw size={15} />
            Refresh observations
          </button>
        </div>
      </section>
      {error && (
        <p role="alert">{error}. Previously loaded data may be outdated.</p>
      )}
      <section className="inventory-stats" aria-label="Monitoring summary">
        {[
          { label: "Online", value: data?.summary.online },
          { label: "Offline", value: data?.summary.offline },
          { label: "Unknown", value: data?.summary.unknown },
          { label: "Fresh collectors", value: data?.summary.collectorsOnline },
        ].map((item) => (
          <article key={item.label}>
            <div>
              <small>{item.label}</small>
              <strong>{item.value ?? "—"}</strong>
            </div>
          </article>
        ))}
      </section>
      <section className="inventory-panel">
        <div className="inventory-toolbar">
          <label className="select-control">
            Health
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="all">All health</option>
              {["online", "offline", "unknown"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <span>
            {live ? "Refreshing every 15 seconds" : "Refresh paused"} · Checked{" "}
            {timestamp(data?.checkedAt)}
          </span>
        </div>
        <div className="device-table-wrap">
          <table className="device-table">
            <thead>
              <tr>
                <th>Device / site</th>
                <th>Health</th>
                <th>Reason</th>
                <th>Latency</th>
                <th>CPU / memory</th>
                <th>Last observation</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((device) => (
                <tr key={device.id}>
                  <td>
                    <strong>{device.hostname}</strong>
                    <p>{device.site}</p>
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
                  <td>
                    {device.health.stale ||
                    device.health.status === "unknown" ||
                    device.observation?.latencyMs == null
                      ? "—"
                      : `${device.observation.latencyMs} ms`}
                  </td>
                  <td>
                    {device.cpu === null ? "—" : `${device.cpu}%`} /{" "}
                    {device.memory === null ? "—" : `${device.memory}%`}
                  </td>
                  <td>{timestamp(device.observation?.observedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && !error && !rows.length && (
            <p style={{ padding: 20 }}>No monitored devices match this view.</p>
          )}
        </div>
      </section>
      <section className="panel" style={{ padding: 20, marginTop: 20 }}>
        <h3>Collectors</h3>
        {data?.collectors.map((collector) => (
          <p key={collector.id}>
            <strong>{collector.name}</strong> ·{" "}
            {collector.fresh ? "Fresh heartbeat" : "Missing or stale heartbeat"}{" "}
            · {timestamp(collector.lastSeenAt)}
          </p>
        ))}
        {data?.collectors.length === 0 && <p>No collectors registered.</p>}
      </section>
    </main>
  );
}
