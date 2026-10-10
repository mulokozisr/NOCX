"use client";
import { timestamp, useOperationalData } from "./use-operational-data";
export default function OperationalOverview() {
  const { data, error, loading, refresh } = useOperationalData();
  return (
    <main className="dashboard">
      <section className="dashboard-intro">
        <div>
          <p className="eyebrow">LIVE OPERATIONS</p>
          <h2>Network overview</h2>
          <p>Registered devices and fresh availability evidence.</p>
        </div>
        <button
          className="secondary-button"
          disabled={loading}
          onClick={() => void refresh()}
        >
          {loading ? "Loading…" : "Refresh data"}
        </button>
      </section>
      {error && (
        <p role="alert">{error}. Previously loaded data may be outdated.</p>
      )}
      <section className="inventory-stats" aria-label="Network health summary">
        {[
          { label: "Managed devices", value: data?.summary.total },
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
      <section className="panel" style={{ padding: 24 }}>
        <h3>Devices needing attention</h3>
        <p>
          Checked {timestamp(data?.checkedAt)} · {data?.sites.length ?? "—"}{" "}
          sites
        </p>
        <div className="device-table-wrap">
          <table className="device-table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Site</th>
                <th>Status</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {data?.devices
                .filter((device) => device.health.status !== "online")
                .map((device) => (
                  <tr key={device.id}>
                    <td>{device.hostname}</td>
                    <td>{device.site}</td>
                    <td>{device.health.status}</td>
                    <td>{device.health.reason}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {data && data.summary.total === 0 && (
          <p>
            No devices registered. Open Devices to activate a staged device.
          </p>
        )}
        <a className="text-button" href="#/devices">
          Open devices & sites
        </a>
        <p>
          Unknown means availability cannot currently be confirmed. Open
          Monitoring for observation timestamps and collector health.
        </p>
      </section>
    </main>
  );
}
