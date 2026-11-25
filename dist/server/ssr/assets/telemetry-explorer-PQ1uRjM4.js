import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as Braces } from "./braces-DCCqR8eb.js";
//#region node_modules/lucide-react/dist/esm/icons/filter.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Filter = createLucideIcon("Filter", [["polygon", {
	points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",
	key: "1yg77f"
}]]);
//#endregion
//#region app/telemetry-explorer.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/telemetry-explorer.tsx
var import_jsx_runtime = require_jsx_runtime();
function age(value) {
	if (!value) return "No stored observation";
	const timestamp = Date.parse(value), milliseconds = Date.now() - timestamp;
	if (!Number.isFinite(timestamp)) return "Invalid time excluded";
	if (milliseconds < 0) return "Future time excluded";
	const seconds = Math.round(milliseconds / 1e3);
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function display(value) {
	return value ? value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase()) : "Unavailable";
}
function TelemetryExplorer() {
	const [data, setData] = (0, import_react.useState)(null);
	const [quality, setQuality] = (0, import_react.useState)("All");
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/telemetry-evidence", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "Telemetry evidence is unavailable.");
			setData(body);
			setSelectedId((current) => body.metrics.some((row) => row.id === current) ? current : body.metrics[0]?.id ?? "");
		} catch (reason) {
			setData(null);
			setError(reason instanceof Error ? reason.message : "Telemetry evidence is unavailable.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(initial);
	}, [load]);
	const qualities = (0, import_react.useMemo)(() => ["All", ...new Set((data?.metrics ?? []).map((row) => row.quality))], [data]);
	const visible = (0, import_react.useMemo)(() => quality === "All" ? data?.metrics ?? [] : (data?.metrics ?? []).filter((row) => row.quality === quality), [data, quality]);
	const selected = data?.metrics.find((row) => row.id === selectedId) ?? visible[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "telemetry-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "telemetry-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inspect stored observations without inventing validation authority." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT TELEMETRY-EVIDENCE STATE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Metric keys, source fields, values, quality labels, devices and collectors come only from records with valid, non-future observation times. No sample, mapping approval, baseline, freshness claim, alert eligibility or review task is fabricated." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "telemetry-live-strip telemetry-live-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Telemetry evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [error, ". No fallback samples or validation claims were generated."] })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "telemetry-live-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict persistent observations only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future and invalid observation timestamps are excluded. Stored quality labels are displayed as data; they are not converted into mapping approval or policy eligibility." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Writes disabled"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "telemetry-summary nocx-summary-grid",
				"aria-label": "Persistent telemetry evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Metric samples" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.metricSamples ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latest stored rows" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Availability samples" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.availabilitySamples ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latest stored rows" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Newest observation" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? age(data.summary.newestObservedAt) : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No freshness threshold inferred" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Braces, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed sources" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.observedCollectors ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.observedDevices} devices` : "Evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "telemetry-toolbar panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, { size: 15 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stored quality label" }),
					qualities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: quality === item ? "active" : "",
						onClick: () => setQuality(item),
						children: display(item)
					}, item)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read-only evidence view" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "telemetry-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel telemetry-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PERSISTENT METRIC REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recent stored observations" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rows remain linked to their recorded source field, metric key, device and collector." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 19 })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "telemetry-list",
							children: visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === item.id ? "active" : "",
								onClick: () => setSelectedId(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										item.id,
										" · ",
										item.collector?.name ?? item.collectorId
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.device?.hostname ?? item.deviceId }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										item.sourceField ?? "No source field",
										" → ",
										item.metricKey
									] })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "unknown",
									children: display(item.quality)
								})]
							}, item.id))
						}),
						!loading && visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "telemetry-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent metric evidence" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No sample or mapping decision is substituted for the empty register." })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel telemetry-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STORED EVIDENCE INSPECTOR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.metricKey }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.id,
								" · observed ",
								age(selected.observedAt)
							] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "telemetry-badge unknown",
							children: display(selected.quality)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "telemetry-value",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Braces, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Recorded source field" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.sourceField ?? "Unavailable" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Recorded value" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									selected.value,
									" ",
									selected.unit
								] })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Source device" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.device ? `${selected.device.hostname} · ${selected.device.vendor}` : selected.deviceId })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Collector" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.collector?.name ?? selected.collectorId })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Profile version" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.profileVersion ?? "Unavailable" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Stored quality label" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [display(selected.quality), " · not an approval"] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Mapping approval" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Unavailable · no governance register is inferred" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Alert eligibility" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Unavailable · no policy decision is inferred" })] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "telemetry-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								disabled: true,
								children: "Validation unavailable"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								disabled: true,
								children: "Review-task writes disabled"
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "telemetry-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No metric evidence selected" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The inspector remains empty and fail closed." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel telemetry-safety",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "FAIL-CLOSED DATA BOUNDARY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Observation is not approval" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "No seeded sample or demonstration row is included."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Stored quality does not grant mapping or policy authority."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Validation and review-task writes are disabled."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Credential values and network configuration writes remain disabled."] })
				] })]
			})
		]
	});
}
//#endregion
export { TelemetryExplorer as default };
