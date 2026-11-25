import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as RadioTower } from "./radio-tower-ChIm1GPm.js";
import { t as Eye } from "./eye-UJ0AFJEc.js";
import { t as DatabaseZap } from "./database-zap-DYpQAJxB.js";
//#region app/monitoring-assurance.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/monitoring-assurance.tsx
var import_jsx_runtime = require_jsx_runtime();
function age(value) {
	if (!value) return "No stored evidence";
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) return "Invalid stored time";
	const seconds = Math.round((Date.now() - timestamp) / 1e3);
	if (seconds < 0) return "Future time excluded";
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function stateLabel(collector) {
	if (collector.operationalStatus === "online") return "Observed";
	if (collector.operationalStatus === "stale") return "Stale";
	return "Unknown";
}
function stateClass(collector) {
	const state = stateLabel(collector);
	return state === "Observed" ? "trusted" : state === "Stale" ? "at-risk" : "blind-spot";
}
function MonitoringAssurance() {
	const [data, setData] = (0, import_react.useState)(null);
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		setData(null);
		setSelectedId("");
		try {
			const response = await fetch("/api/platform/integrations", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Monitoring evidence is unavailable");
			setData(body);
			setSelectedId(body.collectors[0]?.id || "");
			setError("");
		} catch (reason) {
			setData(null);
			setSelectedId("");
			setError(reason instanceof Error ? reason.message : "Monitoring evidence is unavailable");
		} finally {
			if (!quiet) setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0);
		const timer = window.setInterval(() => void load(true), 3e4);
		return () => {
			window.clearTimeout(initial);
			window.clearInterval(timer);
		};
	}, [load]);
	const collectors = (0, import_react.useMemo)(() => data?.collectors ?? [], [data]);
	const filtered = (0, import_react.useMemo)(() => collectors.filter((collector) => `${collector.id} ${collector.name} ${collector.region ?? ""} ${collector.operationalStatus}`.toLowerCase().includes(query.toLowerCase())), [collectors, query]);
	const selected = collectors.find((collector) => collector.id === selectedId) ?? collectors[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "assurance-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "assurance-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "COVERAGE GAP REGISTER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Verify the whole evidence chain before trusting monitoring" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Inspect collectors, targets, samples, ingestion receipts and queue checkpoints only after chronology, referential integrity, counters and sequence state are validated. Missing or rejected evidence stays unknown." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Monitoring assurance unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict persistent production evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future, invalid, orphaned or malformed collector, target, sample, receipt and queue evidence is excluded. A failed background refresh clears trusted values instead of preserving stale state." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "assurance-summary nocx-summary-grid",
				"aria-label": "Monitoring evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Collectors observed" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? `${data.summary.collectorsOnline} / ${data.summary.collectors}` : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Fresh strict evidence only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Registered coverage" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? `${data.summary.coveredDevices} / ${data.summary.expectedDevices}` : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.coveragePct === null ? "No accepted denominator" : `${data?.summary.coveragePct ?? 0}% · ${data?.summary.coverageGapCount ?? 0} gaps` }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatabaseZap, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Availability integrity" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? `${data.availabilityIntegrity.accepted} accepted` : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.availabilityIntegrity.rejected} rejected · ${data.availabilityIntegrity.referencedDevices} devices` : "Referentially valid windows only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Metric integrity" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? `${data.metricIntegrity.accepted} accepted` : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.metricIntegrity.rejected} rejected · ${data.metricIntegrity.metricKeys} keys` : "Schema and value bounds required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Rejected source rows" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? Object.values(data.evidenceIntegrity).reduce((total, count) => total + count, 0) : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Excluded from every assurance claim" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "assurance-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel assurance-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT COLLECTOR EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Observed collection nodes" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only collectors with accepted registry chronology and referentially valid operational evidence appear." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search collectors…",
						"aria-label": "Search monitoring sources",
						disabled: !data
					})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "assurance-list",
						children: [
							filtered.map((collector) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === collector.id ? "active" : "",
								onClick: () => setSelectedId(collector.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `assurance-state ${stateClass(collector)}`,
										children: stateLabel(collector)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											collector.id,
											" · ",
											collector.region ?? "Unassigned region"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: collector.name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											collector.targetCount,
											" observed targets · ",
											age(collector.latestObservedAt)
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
								]
							}, collector.id)),
							!loading && data && !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "assurance-evidence",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted collector evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No strict collector matches this view. NOCX does not substitute demonstration records." })]
							}),
							!loading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "assurance-evidence",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Collector evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No collector total, target count, sample count, receipt, queue state or trust claim is inferred." })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel assurance-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "EVIDENCE INSPECTOR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.id,
								" · ",
								selected.region ?? "Unassigned region"
							] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `trust-score ${stateClass(selected)}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: stateLabel(selected) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "stored state" })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "assurance-meta",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Heartbeat evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: age(selected.heartbeatEvidenceAt) })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Chronology" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.heartbeatChronologyValid ? "Valid" : "Unknown" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Collector version" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.version ?? "Unknown" })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "trust-checks",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Stored evidence window" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Registered identity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [selected.id, " is present in the persistent collector register."] })] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Observed targets and samples" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									selected.targetCount,
									" targets · ",
									selected.availabilitySamples,
									" availability · ",
									selected.metricSamples,
									" metric samples"
								] })] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatabaseZap, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Ingestion receipts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									selected.accepted,
									" accepted · ",
									selected.rejected,
									" rejected · ",
									selected.duplicate,
									" duplicate in 24 hours"
								] })] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Heartbeat chronology" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [selected.heartbeatAgeSeconds === null ? "No accepted heartbeat age" : `${selected.heartbeatAgeSeconds}s old`, " · future or pre-registration evidence excluded"] })] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Queue checkpoint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									selected.queueDepth,
									" pending · oldest ",
									age(selected.oldestPendingAt)
								] })] })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "assurance-evidence",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Coverage and uncommissioned sources" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Expected target denominator: ",
									data?.summary.expectedDevices ?? 0,
									" accepted registered devices"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Coverage gaps: ",
									data?.summary.coverageGapCount ?? 0,
									"; unknown denominator fails closed"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Authoritative poll cadence and sequence ledger: unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collector clock synchronization and drift source: unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent trust approval workflow: unavailable" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "assurance-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "secondary-button",
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 14 }), "Open investigation unavailable"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary-button",
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Trust approval unavailable"]
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "assurance-evidence",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "No accepted collector selected" : loading ? "Loading strict evidence" : "Monitoring evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? "Monitoring assurance will populate when accepted collector identity and evidence exist." : "The inspector remains unavailable until the strict evidence source loads successfully." })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel assurance-governance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "REGISTERED DEVICES WITHOUT ACCEPTED SAMPLES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Coverage gap register" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every accepted registered device missing referentially valid availability or metric evidence is listed explicitly." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					data?.coverageGaps.map((gap) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						gap.hostname,
						" · ",
						gap.vendor,
						" · ",
						gap.siteId ?? "Unassigned site",
						" · ",
						gap.status
					] }, gap.id)),
					data && !data.coverageGaps.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "No registered-device coverage gaps in the accepted evidence window."] }),
					!data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Coverage gap register unavailable until authenticated monitoring evidence loads."] })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel assurance-governance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "FAIL-CLOSED MONITORING BOUNDARY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Missing or malformed telemetry never becomes healthy service" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioTower, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Collector and device chronology, source references, sample shape, receipt counters and queue sequences must all validate."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "A failed foreground or background refresh clears prior evidence; SLA and restoration claims remain blocked."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Stale or missing telemetry becomes unknown, and collector evidence is inspected without changing network devices."] })
				] })]
			})
		]
	});
}
//#endregion
export { MonitoringAssurance as default };
