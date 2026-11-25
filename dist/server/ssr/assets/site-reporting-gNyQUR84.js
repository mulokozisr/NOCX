import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as Download } from "./download-CU5_C7Ji.js";
import { t as csvCell } from "./operational-evidence-BrfPkMWL.js";
import { t as CircleX } from "./circle-x-Hek0YvdJ.js";
//#region node_modules/lucide-react/dist/esm/icons/file-json.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileJson = createLucideIcon("FileJson", [
	["path", {
		d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
		key: "1rqfz7"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1",
		key: "1oajmo"
	}],
	["path", {
		d: "M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1",
		key: "mpwhp6"
	}]
]);
//#endregion
//#region app/site-reporting.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/site-reporting.tsx
var import_jsx_runtime = require_jsx_runtime();
function download(name, type, content) {
	const url = URL.createObjectURL(new Blob([content], { type })), anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = name;
	anchor.click();
	URL.revokeObjectURL(url);
}
function SiteReporting() {
	const [data, setData] = (0, import_react.useState)(null), [days, setDays] = (0, import_react.useState)(7), [siteId, setSiteId] = (0, import_react.useState)(""), [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)("");
	const sequence = (0, import_react.useRef)(0);
	const load = (0, import_react.useCallback)(async () => {
		const requestId = ++sequence.current;
		setLoading(true);
		setError("");
		try {
			const response = await fetch(`/api/platform/site-reports?days=${days}`, { cache: "no-store" }), payload = await response.json();
			if (!response.ok) throw new Error(payload.error || "Site reports are unavailable");
			if (requestId !== sequence.current) return;
			setData(payload);
			setSiteId((current) => current && payload.sites.some((site) => site.id === current) ? current : payload.sites[0]?.id ?? "");
		} catch (value) {
			if (requestId === sequence.current) setError(value instanceof Error ? value.message : "Site reports are unavailable");
		} finally {
			if (requestId === sequence.current) setLoading(false);
		}
	}, [days]);
	(0, import_react.useEffect)(() => {
		queueMicrotask(() => void load());
	}, [load]);
	const site = (0, import_react.useMemo)(() => data?.sites.find((item) => item.id === siteId) ?? null, [data, siteId]);
	const readiness = site ? Object.values(site.readiness).filter(Boolean).length : 0, totalReadiness = site ? Object.keys(site.readiness).length : 0;
	function exportJson() {
		if (site && data && !loading && !error) download(`${site.name}-nocx-report.json`, `application/json`, JSON.stringify({
			generatedAt: data.checkedAt,
			period: data.period,
			site
		}, null, 2));
	}
	function exportCsv() {
		if (!site || loading || error) return;
		const rows = [[
			"device",
			"latest_status",
			"last_observed",
			"latency_ms",
			"packet_loss_pct"
		], ...site.devices.map((device) => [
			device.deviceName,
			device.currentState,
			device.latest?.observedAt ?? "",
			device.latest?.latencyMs ?? "",
			device.latest?.packetLossPct ?? ""
		])];
		download(`${site.name}-nocx-report.csv`, `text/csv`, rows.map((row) => row.map(csvCell).join(",")).join("\n"));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "site-report-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "site-report-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "SITE REPORTS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Availability & outage reporting" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Observed availability and outage history. Unknown gaps are excluded from availability and shown as missing coverage." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "report-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => void load(),
							disabled: loading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							disabled: !site || loading || Boolean(error),
							onClick: exportCsv,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), "CSV"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							disabled: !site || loading || Boolean(error),
							onClick: exportJson,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileJson, { size: 15 }), "JSON"]
						})
					]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sites-message error",
				role: "alert",
				children: [
					error,
					" ",
					data ? `Showing cached report from ${new Date(data.checkedAt).toLocaleString()}. Exports are paused until refresh succeeds.` : "Select Refresh to retry."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "report-controls",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Site", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: siteId,
						onChange: (event) => setSiteId(event.target.value),
						children: data?.sites.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: item.id,
							children: item.name
						}, item.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Reporting period", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: days,
						onChange: (event) => setDays(Number(event.target.value)),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 1,
								children: "Last 24 hours"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 7,
								children: "Last 7 days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 30,
								children: "Last 30 days"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }),
						"Read-only report · ",
						site?.timezone ?? "Site timezone"
					] })
				]
			}),
			site && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				(!site.reportComplete || site.historicalAssignmentAssumed) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "report-note",
					role: "status",
					children: [
						site.truncated ? "Report is partial: query limits were reached. " : "",
						"Coverage ",
						site.coveragePct,
						"%. This is observed availability, not contractual SLA. ",
						site.historicalAssignmentAssumed ? "Devices without placement history use their current site; historical placement is unverified." : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "report-metrics",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observed availability" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: site.availabilityPct == null ? "—" : `${site.availabilityPct}%` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								site.coveragePct,
								"% time coverage · ",
								site.sampleCount,
								" samples"
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Devices" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: site.deviceCount }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [site.currentEvidenceDevices, " current"] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Outage periods" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: site.outageCount }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [site.unrecoveredOutages, " unrecovered"] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Operational readiness" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								readiness,
								"/",
								totalReadiness
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "evidence checks passed" })
						] })
					]
				}),
				site.activeMaintenance.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "active-maintenance-banner",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Planned maintenance recorded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						site.activeMaintenance[0].title,
						" · owner ",
						site.activeMaintenance[0].owner,
						" · ends ",
						new Date(site.activeMaintenance[0].endsAt).toLocaleString("en-GB", { timeZone: site.timezone }),
						" · alert suppression is not active"
					] })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "report-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "report-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Device evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [site.devices.length, " assigned"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "report-device-list",
							children: site.devices.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `#/devices?device=${encodeURIComponent(device.deviceId)}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `report-state ${device.currentState}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.deviceName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: device.latest ? `Last observed ${new Date(device.latest.observedAt).toLocaleString("en-GB", { timeZone: site.timezone })}` : "No evidence in period" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: device.currentState === "online" ? "Online" : device.currentState === "offline" ? "Offline" : "Unknown" })
								]
							}, device.deviceId))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "report-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Readiness checklist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: readiness === totalReadiness ? "Complete" : "Action required" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "readiness-list",
								children: Object.entries(site.readiness).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 17 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: key.replaceAll(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase()) })] }, key))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "report-note",
								children: "A complete checklist confirms NOCX configuration and evidence coverage. It does not authorize network changes or external notifications."
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "report-panel outage-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Outage history" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						data?.period.days,
						" day evidence window",
						site.outagesTruncated ? " · showing latest 100 outages" : ""
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "outage-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Device" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Started" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Recovered" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Duration" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "State" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: site.outages.map((outage) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: outage.deviceName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: new Date(outage.startedAt).toLocaleString("en-GB", { timeZone: site.timezone }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: outage.recoveredAt ? new Date(outage.recoveredAt).toLocaleString("en-GB", { timeZone: site.timezone }) : "Recovery not observed" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: outage.durationMinutes == null ? "Unverified" : `${outage.durationMinutes} min` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: outage.recoveredAt ? "recovered" : "ongoing",
								children: outage.state === "recovered" ? "Recovered" : outage.state === "ongoing" ? "Current offline evidence" : "Recovery not observed"
							}) })
						] }, `${outage.deviceId}-${outage.startedAt}`)) })] }), !site.outages.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "no-outages",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 20 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No offline samples in this evidence window" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This means no outage was observed in the retained samples; it is not a guarantee of uninterrupted service." })
							]
						})]
					})]
				})
			] })
		]
	});
}
//#endregion
export { SiteReporting as default };
