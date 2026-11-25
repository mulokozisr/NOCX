import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, r as Activity } from "./network-CaMqMjRB.js";
import { c as Gauge, d as TriangleAlert, l as Clock3, s as Router, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronDown } from "./chevron-down-jG2qgWsF.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Signal } from "./signal-CPXqs_sx.js";
import { t as CirclePause } from "./circle-pause-k3SfwKMX.js";
import { i as useLiveOperations, n as formatBps, r as formatUptime, t as formatAge } from "./live-operations-ClF_13he.js";
import { t as Cpu } from "./cpu-B1hcqFqC.js";
//#region node_modules/lucide-react/dist/esm/icons/circle-play.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CirclePlay = createLucideIcon("CirclePlay", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["polygon", {
	points: "10 8 16 12 10 16 10 8",
	key: "1cimsy"
}]]);
//#endregion
//#region app/live-monitoring.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function health(device) {
	return device.status === "online" ? "Healthy" : device.status === "degraded" ? "Degraded" : device.status === "offline" ? "Offline" : "Unknown";
}
function points(values, width = 700, height = 185) {
	const max = Math.max(1, ...values);
	return values.map((value, index) => `${values.length === 1 ? width : index / (values.length - 1) * width},${height - value / max * height}`).join(" ");
}
function LiveMonitoring() {
	const { data, error, loading, paused, setPaused, refresh } = useLiveOperations(10), [query, setQuery] = (0, import_react.useState)(""), [filter, setFilter] = (0, import_react.useState)("All health"), [selected, setSelected] = (0, import_react.useState)(null);
	const devices = data?.devices ?? [], filtered = devices.filter((device) => `${device.name} ${device.site ?? ""} ${device.vendor}`.toLowerCase().includes(query.toLowerCase()) && (filter === "All health" || health(device) === filter));
	const rx = data?.trafficSeries.map((item) => item.rxBps) ?? [], tx = data?.trafficSeries.map((item) => item.txBps) ?? [], max = Math.max(1, ...rx, ...tx), highest = [...devices].filter((device) => device.cpuPct !== null).sort((a, b) => (b.cpuPct ?? 0) - (a.cpuPct ?? 0)).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "monitor-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "monitor-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "RACE-SAFE CURRENT TELEMETRY SNAPSHOT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Real-time monitoring" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only the newest time-valid response can replace the current collector-backed availability, latency, resource and interface snapshot." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "monitor-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `stream-status ${paused ? "stream-paused" : data ? "stream-live" : "stream-unknown"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), paused ? "Refresh paused" : data ? "Auto-refresh active" : loading ? "Connecting" : "Evidence unavailable"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => setPaused(!paused),
							children: [
								paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePause, { size: 15 }),
								" ",
								paused ? "Resume" : "Pause"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => void refresh(),
							disabled: loading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								className: loading ? "refresh-spin" : "",
								size: 15
							}), "Refresh"]
						})
					]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Telemetry unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "monitor-summary nocx-summary-grid",
				"aria-label": "Monitoring summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Monitored targets" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.devices ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Verified inventory only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "green",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Collectors" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.collectorsOnline}/${data.summary.collectorsTotal}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Fresh heartbeat window" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "violet",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed availability" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.observedAvailabilityPct == null ? "—" : `${data.summary.observedAvailabilityPct}%` }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "24-hour samples" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "amber",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Average latency" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.averageLatencyMs == null ? "—" : `${data.summary.averageLatencyMs} ms` }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latest device samples" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "red",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Packet loss" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.averagePacketLossPct == null ? "—" : `${data.summary.averagePacketLossPct}%` }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latest device samples" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "monitor-grid-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel live-chart-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "COLLECTED INTERFACE TRAFFIC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Network traffic" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `live-status-pill ${data ? "" : "is-unavailable"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), data ? `${data.trafficSeries.length} stored points` : "Unavailable"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "monitor-chart-numbers",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-blue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(data?.summary.currentRxBps) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Receive" })] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-green" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(data?.summary.currentTxBps) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Transmit" })] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "monitor-capacity",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Capacity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Not configured" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "monitor-chart",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "monitor-y",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(max) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(max * .75) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(max * .5) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(max * .25) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 700 185",
								preserveAspectRatio: "none",
								"aria-label": "Collected traffic series",
								children: [
									[
										0,
										46.25,
										92.5,
										138.75,
										185
									].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "0",
										x2: "700",
										y1: y,
										y2: y,
										className: "chart-grid-line"
									}, y)),
									rx.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
										points: points(rx),
										className: "line-download"
									}),
									tx.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
										points: points(tx),
										className: "line-upload"
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel experience-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "RESOURCE PRESSURE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Highest CPU utilization" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { size: 17 })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "resource-devices",
						children: [highest.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelected(device),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
									className: "resource-device-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { size: 15 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: device.site || "Unassigned site" })] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
									className: (device.cpuPct ?? 0) >= 85 ? "metric-danger" : "",
									children: [device.cpuPct, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
									style: { width: `${device.cpuPct}%` },
									className: (device.cpuPct ?? 0) >= 85 ? "bar-danger" : ""
								}) })
							]
						}, device.id)), data && highest.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-live-state",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No CPU metrics collected yet." })]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "monitor-targets panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "monitor-targets-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "LIVE TARGETS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Monitored infrastructure" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "target-filters",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "target-search",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: query,
									onChange: (event) => setQuery(event.target.value),
									placeholder: "Search targets...",
									"aria-label": "Search monitoring targets"
								}),
								query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQuery(""),
									"aria-label": "Clear monitoring search",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "compact-select",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: filter,
								onChange: (event) => setFilter(event.target.value),
								"aria-label": "Filter monitoring health",
								children: [
									"All health",
									"Healthy",
									"Degraded",
									"Offline",
									"Unknown"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "target-table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "target-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Target" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Health" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Latency" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Packet loss" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "CPU / memory" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Throughput" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last poll" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((device) => {
							const throughput = device.interfaces.reduce((sum, item) => sum + (item.rxBps ?? 0) + (item.txBps ?? 0), 0);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => setSelected(device),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "target-identity",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 17 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											device.site || "Unassigned",
											" · ",
											device.vendor,
											" ",
											device.model || ""
										] })] })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `health-pill health-${health(device).toLowerCase()}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), health(device)]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: device.latencyMs == null ? "—" : `${device.latencyMs} ms` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: (device.packetLossPct ?? 0) >= 3 ? "metric-danger" : "",
										children: device.packetLossPct == null ? "—" : `${device.packetLossPct}%`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: device.cpuPct == null ? "—" : `${device.cpuPct}% / ${device.memoryPct == null ? "—" : `${device.memoryPct}%`}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(throughput) }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "poll-time",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }), formatAge(device.lastSeenAt)]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "row-action",
										onClick: (event) => {
											event.stopPropagation();
											setSelected(device);
										},
										"aria-label": `Inspect ${device.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
									}) })
								]
							}, device.id);
						}) })]
					})
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					"aria-label": "Close monitor details",
					onClick: () => setSelected(null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "monitor-drawer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "panel-kicker",
									children: ["LIVE TELEMETRY · ", selected.vendor]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.site || "Unassigned site" })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setSelected(null),
								"aria-label": "Close monitoring details",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "monitor-drawer-status",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `health-pill health-${health(selected).toLowerCase()}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), health(selected)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 13 }), paused ? "Refresh paused" : "Auto-refresh active"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "drawer-metric-grid nocx-summary-grid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
									tone: "blue",
									icon: void 0,
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latency" }),
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selected.latencyMs == null ? "—" : `${selected.latencyMs} ms` })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
									tone: "blue",
									icon: void 0,
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Packet loss" }),
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selected.packetLossPct == null ? "—" : `${selected.packetLossPct}%` })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
									tone: "blue",
									icon: void 0,
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "CPU" }),
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selected.cpuPct == null ? "—" : `${selected.cpuPct}%` })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
									tone: "blue",
									icon: void 0,
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Uptime" }),
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatUptime(selected.uptimeSeconds) })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "device-detail-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Collected interfaces" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", { children: selected.interfaces.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", { children: [
								item.name,
								" · ",
								item.operStatus === 1 ? "up" : item.operStatus === 2 ? "down" : "unknown"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatBps((item.rxBps ?? 0) + (item.txBps ?? 0)) })] }, item.name)) })]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LiveMonitoring as default };
