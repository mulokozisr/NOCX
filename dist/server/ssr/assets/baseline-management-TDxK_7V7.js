import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { c as Gauge, d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
//#region app/baseline-management.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/baseline-management.tsx
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
function label(value) {
	return value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
function BaselineManagement() {
	const [data, setData] = (0, import_react.useState)(null);
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/baseline-evidence", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "Baseline evidence is unavailable.");
			setData(body);
			setSelectedId((current) => body.observations.some((row) => row.id === current) ? current : body.observations[0]?.id ?? "");
		} catch (reason) {
			setData(null);
			setError(reason instanceof Error ? reason.message : "Baseline evidence is unavailable.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(initial);
	}, [load]);
	const selected = data?.observations.find((row) => row.id === selectedId) ?? data?.observations[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "baseline-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "baseline-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Observe behavior without inventing a baseline." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT BASELINE-EVIDENCE BOUNDARY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Stored metric and availability records with valid, non-future observation times can describe what was observed. They do not establish normal behavior, approved thresholds, drift, alert eligibility or a device-specific baseline." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "baseline-live-strip baseline-live-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Persistent evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [error, ". No fallback profile, range, baseline, threshold or approval was generated."] })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "baseline-live-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict persistent observations only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future and invalid observation timestamps are excluded. Descriptive ranges come directly from accepted stored rows and are not approved operating limits." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Writes disabled"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "baseline-summary nocx-summary-grid",
				"aria-label": "Persistent baseline evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed metric series" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.observedSeries ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.metricSamples} stored rows inspected` : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Availability observations" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.availabilitySamples ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No availability floor inferred" }) })
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
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed devices" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.observedDevices ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.observedCollectors} observed collectors` : "Evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "baseline-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel baseline-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PERSISTENT OBSERVATION REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored metric series" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Each entry groups only the latest stored rows by device, metric key and unit." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 19 })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "baseline-list",
							children: data?.observations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === item.id ? "active" : "",
								onClick: () => setSelectedId(item.id),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.device?.hostname ?? item.deviceId }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.metricKey }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										item.sampleCount,
										" stored ",
										item.sampleCount === 1 ? "sample" : "samples",
										" · newest ",
										age(item.newestObservedAt)
									] })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "observed",
									children: "Observed"
								})]
							}, item.id))
						}),
						!loading && (data?.observations.length ?? 0) === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "baseline-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent metric observations" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No vendor template, sample profile or baseline is substituted for the empty register." })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel baseline-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "DESCRIPTIVE EVIDENCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.metricKey }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.device?.hostname ?? selected.deviceId,
								" · ",
								selected.sampleCount,
								" stored observations"
							] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "baseline-version",
							children: "NOT A BASELINE"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "baseline-metrics",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Stored minimum" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
										selected.minimum,
										" ",
										selected.unit
									] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Latest stored value" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
										selected.latest,
										" ",
										selected.unit
									] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Stored maximum" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
										selected.maximum,
										" ",
										selected.unit
									] })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "threshold-table",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Evidence interpretation boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Observation window" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
										age(selected.oldestObservedAt),
										" to ",
										age(selected.newestObservedAt)
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Record times only" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stored quality labels" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.qualityLabels.map(label).join(", ") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Not governance approval" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collector references" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.collectorIds.length }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No coverage claim inferred" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Approved baseline" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No baseline registry commissioned" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Alert threshold" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No recommendation inferred" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Drift decision" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No approved comparator exists" })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "baseline-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								disabled: true,
								children: "Capture unavailable"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								disabled: true,
								children: "Approval writes disabled"
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "baseline-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No observation evidence selected" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The inspector remains empty and fail closed." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel baseline-governance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "FAIL-CLOSED BASELINE BOUNDARY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Observation is not a policy decision" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "No seeded Cudy, MikroTik, Ubiquiti or vendor-template baseline is included."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Minimum and maximum values are descriptive records, not recommendations."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Baseline capture, comparison, drift and approval writes are disabled."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Alert-policy, credential-value and network configuration writes remain disabled."] })
				] })]
			})
		]
	});
}
//#endregion
export { BaselineManagement as default };
