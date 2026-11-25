import { a as require_react, o as __toESM } from "../index.js";
//#region lib/device-attention.ts
function deriveDeviceAttention(devices) {
	return devices.filter((d) => d.status !== "online" || d.activeIncidents > 0).map((d) => {
		const reasons = [];
		if (d.status === "offline") reasons.push("Collector reports device offline");
		if (d.status === "degraded") reasons.push("Current thresholds or interface evidence are degraded");
		if (!d.currentEvidenceFresh) reasons.push("Current telemetry is stale or unavailable");
		if (d.activeIncidents) reasons.push(`${d.activeIncidents} active incident${d.activeIncidents === 1 ? "" : "s"}`);
		if ((d.packetLossPct ?? 0) >= 3) reasons.push(`${d.packetLossPct}% packet loss`);
		if ((d.cpuPct ?? 0) >= 85) reasons.push(`${d.cpuPct}% CPU utilization`);
		const priority = d.status === "offline" ? "critical" : d.status === "degraded" || d.activeIncidents ? "high" : "medium";
		return {
			deviceId: d.id,
			deviceName: d.name,
			vendor: d.vendor,
			site: d.site,
			status: d.status,
			priority,
			score: (priority === "critical" ? 100 : priority === "high" ? 70 : 40) + d.activeIncidents * 10 + d.dependentServices * 2,
			dependentServices: d.dependentServices,
			activeIncidents: d.activeIncidents,
			lastSeenAt: d.lastSeenAt,
			reasons
		};
	}).sort((a, b) => b.score - a.score || a.deviceName.localeCompare(b.deviceName));
}
//#endregion
//#region app/live-operations.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var SERVER_CLOCK_SKEW_MS = 6e4;
var LOCAL_CLOCK_FALLBACK_SKEW_MS = 3e5;
function useLiveOperations(refreshSeconds = 15) {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [clockReference, setClockReference] = (0, import_react.useState)(0);
	const acceptedMonotonic = (0, import_react.useRef)(0);
	const requestSequence = (0, import_react.useRef)(0);
	const lastAcceptedSnapshot = (0, import_react.useRef)(0);
	const refresh = (0, import_react.useCallback)(async () => {
		const requestId = ++requestSequence.current;
		setError("");
		try {
			const response = await fetch("/api/platform/operations", { cache: "no-store" });
			const payload = await response.json();
			if (!response.ok) throw new Error(payload.error || "Live operations data is unavailable");
			if (requestId !== requestSequence.current) return;
			const checkedAtMs = Date.parse(payload.checkedAt), windowStartedAtMs = Date.parse(payload.observationWindowStartedAt), responseClockMs = Date.parse(response.headers.get("date") ?? ""), clockReferenceMs = Number.isFinite(responseClockMs) ? responseClockMs : Date.now(), allowedClockSkewMs = Number.isFinite(responseClockMs) ? SERVER_CLOCK_SKEW_MS : LOCAL_CLOCK_FALLBACK_SKEW_MS;
			if (!Number.isFinite(checkedAtMs) || checkedAtMs > clockReferenceMs + allowedClockSkewMs || !Number.isFinite(windowStartedAtMs) || windowStartedAtMs > checkedAtMs || !payload.controls.strictSnapshotValidation) throw new Error("Operations snapshot failed strict chronology validation");
			if (checkedAtMs < lastAcceptedSnapshot.current) return;
			lastAcceptedSnapshot.current = checkedAtMs;
			acceptedMonotonic.current = performance.now();
			setClockReference(checkedAtMs);
			setData(payload);
		} catch (value) {
			if (requestId === requestSequence.current) setError(value instanceof Error ? value.message : "Live operations data is unavailable");
		} finally {
			if (requestId === requestSequence.current) setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		queueMicrotask(() => void refresh());
	}, [refresh]);
	(0, import_react.useEffect)(() => {
		if (paused) return;
		const timer = window.setInterval(() => document.visibilityState !== "hidden" && void refresh(), refreshSeconds * 1e3);
		return () => window.clearInterval(timer);
	}, [
		paused,
		refresh,
		refreshSeconds
	]);
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => setClockReference(lastAcceptedSnapshot.current + Math.max(0, performance.now() - acceptedMonotonic.current)), 15e3);
		return () => window.clearInterval(timer);
	}, []);
	return {
		data: (() => {
			if (!data) return null;
			const now = Math.max(Date.parse(data.checkedAt), clockReference);
			const fresh = (at) => Boolean(at) && now - Date.parse(at) >= 0 && now - Date.parse(at) <= 18e4;
			const devices = data.devices.map((device) => fresh(device.lastSeenAt) ? device : {
				...device,
				status: "unknown",
				currentEvidenceFresh: false,
				healthReasons: ["Monitoring evidence is stale. Refresh or check the assigned agent."],
				latencyMs: null,
				packetLossPct: null,
				cpuPct: null,
				memoryPct: null,
				diskPct: null,
				uptimeSeconds: null,
				interfaces: device.interfaces.map((item) => ({
					...item,
					rxBps: null,
					txBps: null,
					operStatus: null,
					inErrors: null,
					outErrors: null
				}))
			});
			const counts = {
				online: devices.filter((d) => d.status === "online").length,
				degraded: devices.filter((d) => d.status === "degraded").length,
				offline: devices.filter((d) => d.status === "offline").length,
				unknown: devices.filter((d) => d.status === "unknown").length
			};
			const rollup = (field, rows) => rows.map((row) => {
				const subset = devices.filter((d) => (d[field] || "Unassigned") === row.label);
				return {
					...row,
					online: subset.filter((d) => d.status === "online").length,
					degraded: subset.filter((d) => d.status === "degraded").length,
					offline: subset.filter((d) => d.status === "offline").length,
					unknown: subset.filter((d) => d.status === "unknown").length
				};
			});
			const expired = now - Date.parse(data.checkedAt) > 18e4;
			return {
				...data,
				devices,
				summary: {
					...data.summary,
					...counts,
					...expired ? {
						collectorsOnline: 0,
						currentRxBps: null,
						currentTxBps: null,
						averageLatencyMs: null,
						averagePacketLossPct: null
					} : {}
				},
				fleet: {
					vendors: rollup("vendor", data.fleet.vendors),
					sites: rollup("site", data.fleet.sites)
				},
				interfacePerformance: data.interfacePerformance.map((item) => fresh(item.lastObservedAt) ? item : {
					...item,
					currentRxBps: null,
					currentTxBps: null
				}),
				attentionQueue: deriveDeviceAttention(devices)
			};
		})(),
		error,
		loading,
		paused,
		setPaused,
		refresh
	};
}
function formatAge(value, now = Date.now()) {
	if (!value) return "Never";
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) return "Invalid time excluded";
	if (timestamp > now) return "Future time excluded";
	const seconds = Math.round((now - timestamp) / 1e3);
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function formatBps(value) {
	if (value === null || value === void 0) return "—";
	if (value >= 1e9) return `${(value / 1e9).toFixed(2)} Gbps`;
	if (value >= 1e6) return `${(value / 1e6).toFixed(1)} Mbps`;
	if (value >= 1e3) return `${(value / 1e3).toFixed(1)} Kbps`;
	return `${value} bps`;
}
function formatUptime(value) {
	if (value === null) return "—";
	const days = Math.floor(value / 86400);
	const hours = Math.floor(value % 86400 / 3600);
	const minutes = Math.floor(value % 3600 / 60);
	return days ? `${days}d ${hours}h` : hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}
//#endregion
export { useLiveOperations as i, formatBps as n, formatUptime as r, formatAge as t };
