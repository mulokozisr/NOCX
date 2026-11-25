import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity, t as Network } from "./network-CaMqMjRB.js";
import { c as Gauge, l as Clock3, s as Router } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as HardDrive } from "./hard-drive-ra7fzo_9.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as TimerReset } from "./timer-reset-cTDIq75g.js";
import { t as Cpu } from "./cpu-B1hcqFqC.js";
import { t as MemoryStick } from "./memory-stick-CvWx69oV.js";
//#region app/mikrotik-pilot.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/mikrotik-pilot.tsx
var import_jsx_runtime = require_jsx_runtime();
function parseInterfaceKey(metricKey) {
	const match = /^interface\.i(\d+)_([a-z0-9_]+)\.(rx\.bps|tx\.bps|oper\.status|in_errors\.delta|out_errors\.delta)$/.exec(metricKey);
	if (!match) return null;
	const label = match[2].replaceAll("_", "-");
	return {
		prefix: `interface.i${match[1]}_${match[2]}`,
		index: Number(match[1]),
		label
	};
}
function formatRate(value) {
	if (value === null) return "—";
	if (value >= 1e9) return `${(value / 1e9).toFixed(2)} Gbps`;
	if (value >= 1e6) return `${(value / 1e6).toFixed(2)} Mbps`;
	if (value >= 1e3) return `${(value / 1e3).toFixed(1)} Kbps`;
	return `${value} bps`;
}
function formatUptime(value) {
	if (value === null) return "—";
	const days = Math.floor(value / 86400);
	const hours = Math.floor(value % 86400 / 3600);
	const minutes = Math.floor(value % 3600 / 60);
	return days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`;
}
function MikrotikPilot() {
	const [live, setLive] = (0, import_react.useState)(null);
	const [loadError, setLoadError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		const load = async () => {
			try {
				const response = await fetch("/api/collector/v1/mikrotik", { cache: "no-store" });
				if (!response.ok) throw new Error("Live telemetry unavailable");
				if (active) {
					setLive(await response.json());
					setLoadError(false);
				}
			} catch {
				if (active) setLoadError(true);
			}
		};
		load();
		const timer = window.setInterval(() => void load(), 15e3);
		return () => {
			active = false;
			window.clearInterval(timer);
		};
	}, []);
	const metricMap = (0, import_react.useMemo)(() => new Map((live?.metrics ?? []).filter((sample) => sample.currentEvidenceFresh).map((sample) => [sample.metricKey, sample])), [live]);
	const metricValue = (key) => metricMap.get(key)?.value ?? null;
	const discoveredInterfaces = (0, import_react.useMemo)(() => {
		const found = /* @__PURE__ */ new Map();
		for (const sample of live?.metrics ?? []) {
			const parsed = parseInterfaceKey(sample.metricKey);
			if (parsed && !found.has(parsed.prefix)) found.set(parsed.prefix, parsed);
		}
		return [...found.values()].sort((a, b) => a.index - b.index);
	}, [live]);
	const alertEnabled = (0, import_react.useMemo)(() => new Set(live?.incidentAutomation.monitoredInterfaces ?? []), [live]);
	const latestObservedAt = live?.availability?.observedAt ?? live?.metrics.map((row) => row.observedAt).sort().at(-1) ?? null;
	const currentEvidenceFresh = Boolean(live?.currentEvidenceFresh);
	const currentAvailability = live?.availability?.currentEvidenceFresh ? live.availability : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mtp-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mtp-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "FRESHNESS-GATED MIKROTIK OBSERVATIONS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inspect device records and telemetry without inventing acceptance." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Device identity, availability, metrics, interfaces and incident history come from authenticated persistent records. No commissioning check, RouterOS version, activation package, credential state or acceptance decision is seeded by this screen." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: currentEvidenceFresh ? "mtp-ready" : "mtp-hold",
					children: [currentEvidenceFresh ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), currentEvidenceFresh ? "Current evidence" : loadError ? "Fail closed" : "Current evidence unavailable"]
				})]
			}),
			loadError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mtp-evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "MikroTik evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No fallback identity, metric, interface, readiness or acceptance claim was generated." })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mtp-evidence-boundary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Authenticated persistent observations only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observation and server-enforced incident evaluation do not establish commissioning acceptance or device-change authority." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Writes disabled"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mtp-summary nocx-summary-grid",
				"aria-label": "Persistent MikroTik observation summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Registered device" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: live?.device?.hostname ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: live?.device ? `${live.device.vendor} · ${live.device.model ?? "model unavailable"}` : "No persistent device record" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Management address" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: live?.device?.managementIp ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Stored inventory field" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed metric keys" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: live?.metrics.length ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latest persistent values" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latest evidence" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: latestObservedAt ? new Date(latestObservedAt).toLocaleString() : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No acceptance window inferred" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mtp-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel mtp-evidence",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PERSISTENT SOURCE EVIDENCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: live?.device?.hostname ?? "No registered device evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Inventory values are displayed as stored and are not converted into a passed commissioning check." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Device record" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: live?.device ? `${live.device.id} · ${live.device.status}` : "Unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Stored" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Source" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: live?.device?.source ?? "Unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Recorded" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Availability observation" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: live?.availability ? `${live.availability.online ? "Online" : "Offline"} · ${new Date(live.availability.observedAt).toLocaleString()}` : "Unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Descriptive" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Acceptance decision" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Not inferred" })
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Identity and telemetry presence are not commissioning approval." }) })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel mtp-gate",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "FAIL-CLOSED ACCEPTANCE BOUNDARY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "No activation action" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mtp-gate-state",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observation state" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentEvidenceFresh ? "Current observation present" : "Current observation unavailable" })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Persistent samples may support a later governed review, but this workspace cannot confirm an activation package, credential rotation, hardware readiness or production acceptance." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary-button",
							disabled: true,
							children: "Acceptance writes disabled"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "mtp-safe",
							children: "Credential values are never returned. RouterOS configuration writes remain disabled."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mtp-live",
				"aria-label": "Current MikroTik measurements",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "CURRENT DEVICE MEASUREMENTS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [live?.device?.model ?? "Registered device", " health and availability"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Values appear only when their authenticated observation is no older than three minutes." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `mtp-live-state ${currentEvidenceFresh ? "is-live" : "is-stale"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}), currentEvidenceFresh ? "Current" : "Unknown"]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mtp-live-cards",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Availability" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentAvailability ? currentAvailability.online ? "Online" : "Offline" : "Unknown" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: currentAvailability ? `${currentAvailability.packetLossPct}% packet loss` : "No fresh sample" })
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Latency" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentAvailability?.latencyMs === null || currentAvailability?.latencyMs === void 0 ? "—" : `${currentAvailability.latencyMs} ms` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: currentAvailability ? "Current ICMP average" : "No fresh sample" })
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerReset, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Uptime" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUptime(metricValue("device.uptime.seconds")) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "RouterOS uptime" })
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "CPU load" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: metricValue("device.cpu.utilization.pct") === null ? "—" : `${metricValue("device.cpu.utilization.pct")}%` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "4-core average" })
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryStick, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Memory used" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: metricValue("device.memory.utilization.pct") === null ? "—" : `${metricValue("device.memory.utilization.pct")}%` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Main memory" })
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "System disk" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: metricValue("device.disk.utilization.pct") === null ? "—" : `${metricValue("device.disk.utilization.pct")}%` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Storage used" })
							] })] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mtp-interface-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mtp-interface-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "All discovered interfaces" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Rates and error changes are calculated between collector polls. Alerts remain opt-in." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: live?.availability ? `Latest stored sample ${new Date(live.availability.observedAt).toLocaleString()}` : "No stored telemetry" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "mtp-interface-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Interface" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Receive" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Transmit" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Input errors" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Output errors" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [discoveredInterfaces.map((item) => {
								const prefix = item.prefix;
								const status = metricValue(`${prefix}.oper.status`);
								const inputErrors = metricValue(`${prefix}.in_errors.delta`);
								const outputErrors = metricValue(`${prefix}.out_errors.delta`);
								const monitored = alertEnabled.has(item.label);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										"ifIndex ",
										item.index,
										" · ",
										monitored ? "Alert monitoring enabled" : "Discovered only"
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `mtp-interface-status ${status === 1 ? "up" : status === 2 ? "down" : "unknown"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), status === 1 ? "Up" : status === 2 ? "Down" : "Unknown"]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatRate(metricValue(`${prefix}.rx.bps`)) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatRate(metricValue(`${prefix}.tx.bps`)) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: (inputErrors ?? 0) > 0 ? "has-errors" : "",
										children: inputErrors === null ? "—" : inputErrors === 0 ? "0" : `+${inputErrors}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: (outputErrors ?? 0) > 0 ? "has-errors" : "",
										children: outputErrors === null ? "—" : outputErrors === 0 ? "0" : `+${outputErrors}`
									})
								] }, item.prefix);
							}), discoveredInterfaces.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								children: "No persistent interface sample is available."
							}) })] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: "Current values require evidence no older than three minutes · Acceptance thresholds are not inferred · Network configuration writes: disabled" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mtp-automation",
				"aria-label": "Interface incident automation",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INCIDENT AUTOMATION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Evidence-backed interface alert lifecycle" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [live?.incidentAutomation.monitoredInterfaces.length ? live.incidentAutomation.monitoredInterfaces.join(", ") : "No interfaces", " configured for server-side incident evaluation. Discovered-only interfaces remain observational."] })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `mtp-live-state ${live?.incidentAutomation?.rulesConfigured ? "is-live" : "is-stale"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), live?.incidentAutomation?.rulesConfigured ? "Evaluation configured" : "Unconfigured"]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mtp-incident-history",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mtp-interface-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Recent automated incidents" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Open and resolved events created from stored collector evidence." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [live?.incidentAutomation?.history?.length ?? 0, " records"] })]
						}), (live?.incidentAutomation?.history ?? []).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "mtp-interface-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Incident" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Severity" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Opened" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Resolved" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: live.incidentAutomation.history.map((incident) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incident.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: incident.id })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: incident.severity }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `mtp-incident-state ${incident.status}`,
									children: incident.status
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: new Date(incident.openedAt).toLocaleString() }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: incident.resolvedAt ? new Date(incident.resolvedAt).toLocaleString() : "—" })
							] }, incident.id)) })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mtp-no-incidents",
							children: "No persistent interface-incident history is available."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: "Incident creation changes NOCX records only · RouterOS configuration writes remain disabled" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mtp-bottom",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel mtp-profile",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "OBSERVED METRIC REGISTER"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Latest stored keys" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [(live?.metrics ?? []).map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: sample.metricKey }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							sample.value,
							" ",
							sample.unit
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: new Date(sample.observedAt).toLocaleString() })
					] }, sample.metricKey)), (live?.metrics ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "No persistent metric keys are available." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Nothing was synthesized." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "—" })
					] })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel mtp-controls",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "FAIL-CLOSED SAFETY BOUNDARY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Controls preserved" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Authenticated platform read required"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "Credential values are never returned"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Acceptance and activation writes are unavailable"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Network configuration writes remain disabled"] })
					] })]
				})]
			})
		]
	});
}
//#endregion
export { MikrotikPilot as default };
