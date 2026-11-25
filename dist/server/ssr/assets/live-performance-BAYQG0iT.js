import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { c as Gauge, d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Server } from "./server-DGu4Aqms.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Download } from "./download-CU5_C7Ji.js";
import { t as csvCell } from "./operational-evidence-BrfPkMWL.js";
import { i as useLiveOperations, n as formatBps, t as formatAge } from "./live-operations-ClF_13he.js";
import { t as ChartColumn } from "./chart-column-d7bLV2tJ.js";
//#region node_modules/lucide-react/dist/esm/icons/trending-up.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TrendingUp = createLucideIcon("TrendingUp", [["polyline", {
	points: "22 7 13.5 15.5 8.5 10.5 2 17",
	key: "126l90"
}], ["polyline", {
	points: "16 7 22 7 22 13",
	key: "kwv8wd"
}]]);
//#endregion
//#region app/live-performance.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function points(values, width = 760, height = 210, scale = 1) {
	const max = Math.max(1, scale);
	return values.map((value, index) => `${values.length === 1 ? width : index / (values.length - 1) * width},${height - value / max * height}`).join(" ");
}
function LivePerformance() {
	const [deviceScope, setDeviceScope] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const sync = () => setDeviceScope(new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("device") ?? "");
		queueMicrotask(sync);
		window.addEventListener("hashchange", sync);
		return () => window.removeEventListener("hashchange", sync);
	}, []);
	const { data, error, loading, refresh } = useLiveOperations(15), [query, setQuery] = (0, import_react.useState)(""), [selected, setSelected] = (0, import_react.useState)(null);
	const interfaces = data?.interfacePerformance ?? [], filtered = interfaces.filter((item) => (!deviceScope || item.deviceId === deviceScope) && `${item.deviceName} ${item.interfaceName} ${item.site ?? ""}`.toLowerCase().includes(query.toLowerCase()));
	const rx = deviceScope ? [] : data?.trafficSeries.map((item) => item.rxBps) ?? [], tx = deviceScope ? [] : data?.trafficSeries.map((item) => item.txBps) ?? [], samples = [...rx, ...tx], peak = samples.length ? Math.max(...samples) : null, p95 = samples.length ? [...samples].sort((a, b) => a - b)[Math.floor((samples.length - 1) * .95)] ?? null : null, chartPeak = peak ?? 0;
	const scopedInterfaces = interfaces.filter((item) => !deviceScope || item.deviceId === deviceScope);
	const currentRx = scopedInterfaces.flatMap((item) => item.currentRxBps === null ? [] : [item.currentRxBps]), currentTx = scopedInterfaces.flatMap((item) => item.currentTxBps === null ? [] : [item.currentTxBps]);
	const receive = deviceScope ? currentRx.length ? currentRx.reduce((a, b) => a + b, 0) : null : data?.summary.currentRxBps, transmit = deviceScope ? currentTx.length ? currentTx.reduce((a, b) => a + b, 0) : null : data?.summary.currentTxBps;
	const scopeName = deviceScope ? data?.devices.find((d) => d.id === deviceScope)?.name ?? deviceScope : "All monitored devices";
	const exportCsv = () => {
		if (!data || !interfaces.length || !data.controls.performanceExportProvenanceRequired) return;
		const rows = [
			["nocx_snapshot_checked_at", data.checkedAt],
			["nocx_observation_window_started_at", data.observationWindowStartedAt],
			["nocx_source", data.source],
			["nocx_export_generated_at", (/* @__PURE__ */ new Date()).toISOString()],
			[],
			[
				"device",
				"site",
				"interface",
				"current_rx_bps",
				"current_tx_bps",
				"peak_rx_bps",
				"peak_tx_bps",
				"p95_rx_bps",
				"p95_tx_bps",
				"samples",
				"last_observed_at"
			],
			...filtered.map((item) => [
				item.deviceName,
				item.site ?? "",
				item.interfaceName,
				item.currentRxBps ?? "",
				item.currentTxBps ?? "",
				item.peakRxBps,
				item.peakTxBps,
				item.p95RxBps,
				item.p95TxBps,
				item.sampleCount,
				item.lastObservedAt ?? ""
			])
		];
		const blob = new Blob([rows.map((row) => row.map(csvCell).join(",")).join("\n")], { type: "text/csv" });
		const url = URL.createObjectURL(blob), anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `nocx-interface-performance-${data.checkedAt.replaceAll(":", "-")}.csv`;
		anchor.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "performance-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "performance-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "PERFORMANCE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Performance & capacity analytics" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Scope: ",
						scopeName,
						" ",
						deviceScope && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#/performance",
							children: "View fleet"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Observed traffic, peak and 95th-percentile evidence from the newest accepted snapshot, with source and window provenance embedded in every export." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "performance-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: exportCsv,
						disabled: !data || !filtered.length || loading || Boolean(error),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), "Export evidence"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						onClick: () => void refresh(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), "Refresh"]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Performance evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `live-evidence-strip ${data ? "" : "is-unavailable"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Provenance-bound, capacity-safe reporting" : "Performance snapshot unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? `Snapshot ${data.checkedAt} · window starts ${data.observationWindowStartedAt}. Utilization forecasts remain withheld.` : loading ? "Loading authenticated performance evidence…" : "No authenticated operations snapshot is loaded." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: data ? "0 assumptions" : "Unavailable" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "performance-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current receive" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatBps(receive) }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${currentRx.length}/${scopedInterfaces.length} interfaces fresh` : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "green",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current transmit" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatBps(transmit) }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${currentTx.length}/${scopedInterfaces.length} interfaces fresh` : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "amber",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed peak" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatBps(peak) }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Loaded telemetry window" : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "violet",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed P95" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatBps(p95) }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Loaded telemetry window" : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "red",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Capacity coverage" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "0%" : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Metadata required" : "Evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "performance-grid-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel capacity-chart-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "AGGREGATE OBSERVED TRAFFIC"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: deviceScope ? "Device history unavailable" : "Bandwidth demand" }),
								deviceScope && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Aggregate device history is unavailable in this snapshot. The interface table below contains scoped historical statistics." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `live-status-pill ${data ? "" : "is-unavailable"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), data ? `${rx.length} stored points` : "Unavailable"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "capacity-chart-metrics",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-blue" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(receive) }),
									"Receive"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-green" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(transmit) }),
									"Transmit"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-amber" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(p95) }),
									"P95"
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "capacity-chart",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(peak) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(peak === null ? null : chartPeak * .75) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(peak === null ? null : chartPeak * .5) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(peak === null ? null : chartPeak * .25) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? "0" : "—" })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								viewBox: "0 0 760 210",
								preserveAspectRatio: "none",
								children: [
									[
										0,
										52.5,
										105,
										157.5,
										210
									].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: "0",
										x2: "760",
										y1: y,
										y2: y,
										className: "chart-grid-line"
									}, y)),
									rx.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
										points: points(rx, 760, 210, chartPeak),
										className: "line-download"
									}),
									tx.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
										points: points(tx, 760, 210, chartPeak),
										className: "line-upload"
									})
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel forecast-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "PLANNING GATE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Capacity metadata required" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "empty-live-state",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 28 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No unverified forecasts" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Configure verified interface capacity before NOCX calculates utilization, headroom, or exhaustion dates." })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "capacity-table-panel panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "capacity-table-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "MONITORED INTERFACES"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Observed throughput evidence" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "capacity-search",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search interface..."
							}),
							query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQuery(""),
								"aria-label": "Clear search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "capacity-table-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "capacity-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Device / interface" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Current RX" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Current TX" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Peak RX" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Peak TX" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "P95 RX" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "P95 TX" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Samples" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last evidence" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => setSelected(item),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "capacity-identity",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 15 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.interfaceName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											item.deviceName,
											" · ",
											item.site || "Unassigned"
										] })] })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(item.currentRxBps) }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(item.currentTxBps) }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.peakRxBps) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.peakTxBps) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.p95RxBps) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.p95TxBps) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.sampleCount }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "forecast-cell",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }), formatAge(item.lastObservedAt)]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "row-action",
										"aria-label": `Open ${item.deviceName} ${item.interfaceName} performance`,
										onClick: (event) => {
											event.stopPropagation();
											setSelected(item);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
									}) })
								]
							}, `${item.deviceId}:${item.interfaceName}`)) })]
						}),
						data && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-devices",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 24 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No interface evidence found" })]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-devices",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Performance evidence unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated operations snapshot to review interface evidence." })
							]
						})
					]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					"aria-label": "Close performance details",
					onClick: () => setSelected(null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "capacity-drawer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "OBSERVED INTERFACE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.interfaceName }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									selected.deviceName,
									" · ",
									selected.site || "Unassigned site"
								] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setSelected(null),
								"aria-label": "Close",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "drawer-metric-grid nocx-summary-grid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
									tone: "blue",
									icon: void 0,
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current RX" }),
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatBps(selected.currentRxBps) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
									tone: "blue",
									icon: void 0,
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current TX" }),
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatBps(selected.currentTxBps) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
									tone: "blue",
									icon: void 0,
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Peak RX" }),
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatBps(selected.peakRxBps) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
									tone: "blue",
									icon: void 0,
									label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "P95 RX" }),
									value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatBps(selected.p95RxBps) })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "capacity-advice",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Capacity decision withheld" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX will not infer utilization until a verified capacity value is assigned to this interface." })] })]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LivePerformance as default };
