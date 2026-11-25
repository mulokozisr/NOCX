import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { c as Gauge, d as TriangleAlert } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as Lock } from "./lock-B6YytJe-.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Server } from "./server-DGu4Aqms.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { n as formatBps } from "./live-operations-ClF_13he.js";
import { t as ChartColumn } from "./chart-column-d7bLV2tJ.js";
//#region app/reports.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	"Overview",
	"SLA evidence",
	"Capacity evidence",
	"Boundaries"
];
async function getJson(url) {
	const response = await fetch(url, { cache: "no-store" });
	if (!response.ok) {
		const payload = await response.json().catch(() => null);
		throw new Error(response.status === 401 ? "Authentication required" : payload?.error || `Evidence request failed (${response.status})`);
	}
	return response.json();
}
function validateCrossSourceEvidence(operations, customers) {
	const operationsAtMs = Date.parse(operations.checkedAt), customersAtMs = Date.parse(customers.checkedAt), now = Date.now();
	if (!Number.isFinite(operationsAtMs) || !Number.isFinite(customersAtMs) || operationsAtMs > now || customersAtMs > now || !operations.controls.strictSnapshotValidation || !customers.controls.staleCurrentEvidenceExcluded) throw new Error("Reporting sources failed strict snapshot validation");
	const sourceSkewMs = Math.abs(operationsAtMs - customersAtMs);
	if (sourceSkewMs > 3e4) throw new Error("Reporting sources exceeded the 30-second coherence window");
	return {
		operations,
		customers,
		snapshot: {
			acceptedAt: new Date(Math.max(operationsAtMs, customersAtMs)).toISOString(),
			sourceSkewMs
		}
	};
}
function buildReportArtifactManifest(evidence) {
	return {
		artifactId: `nocx-report-${evidence.snapshot.acceptedAt.replaceAll(/[^0-9]/g, "")}`,
		schemaVersion: "nocx-report-manifest/v1",
		acceptedAt: evidence.snapshot.acceptedAt,
		sourceSkewMs: evidence.snapshot.sourceSkewMs,
		sources: [{
			name: "operations",
			checkedAt: evidence.operations.checkedAt
		}, {
			name: "customer-services",
			checkedAt: evidence.customers.checkedAt
		}],
		records: {
			devices: evidence.operations.summary.devices,
			incidents: evidence.operations.incidents.length,
			services: evidence.customers.services.length,
			interfaces: evidence.operations.interfacePerformance.length
		},
		exportGenerated: false,
		externalDelivery: false
	};
}
function formatDate(value) {
	if (!value) return "No evidence";
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-TZ", {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(date);
}
function formatDuration(seconds) {
	const absolute = Math.max(0, Math.round(Math.abs(seconds)));
	const hours = Math.floor(absolute / 3600);
	const minutes = Math.floor(absolute % 3600 / 60);
	return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}
function statusClass(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
function ReportCenter() {
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [evidence, setEvidence] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const requestSequence = (0, import_react.useRef)(0);
	const lastAcceptedSnapshot = (0, import_react.useRef)(0);
	const refresh = (0, import_react.useCallback)(async () => {
		const requestId = ++requestSequence.current;
		setLoading(true);
		setError("");
		try {
			const [operations, customers] = await Promise.all([getJson("/api/platform/operations"), getJson("/api/platform/customer-services")]);
			if (requestId !== requestSequence.current) return;
			const accepted = validateCrossSourceEvidence(operations, customers), acceptedAtMs = Date.parse(accepted.snapshot.acceptedAt);
			if (acceptedAtMs < lastAcceptedSnapshot.current) return;
			lastAcceptedSnapshot.current = acceptedAtMs;
			setEvidence(accepted);
		} catch (requestError) {
			if (requestId === requestSequence.current) {
				setEvidence(null);
				setError(requestError instanceof Error ? requestError.message : "Reporting evidence is unavailable");
			}
		} finally {
			if (requestId === requestSequence.current) setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => void refresh(), 0);
		return () => window.clearTimeout(timer);
	}, [refresh]);
	const operations = evidence?.operations;
	const customers = evidence?.customers;
	const checkedAt = evidence?.snapshot.acceptedAt ?? null;
	const artifactManifest = evidence ? buildReportArtifactManifest(evidence) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "reports114-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reports114-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Operational evidence reports" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "GOVERNED REPORT ARTIFACT PROVENANCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Review collector-backed network, incident, service, SLA and interface evidence without inventing templates, schedules, recipients, delivery activity or export success." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void refresh(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						size: 15,
						className: loading ? "spin" : ""
					}), " Refresh evidence"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reports114-boundary-banner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Coherent authenticated evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Operations and customer-service sources must be time-valid, pass their own freshness gates, and remain within a 30-second coherence window. Slower stale responses cannot overwrite newer accepted evidence." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "0 external deliveries" })
				]
			}),
			evidence && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reports114-state",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Report provenance manifest accepted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					artifactManifest?.artifactId,
					" · ",
					artifactManifest?.schemaVersion,
					" · ",
					artifactManifest?.sources.length,
					" time-bound sources · export and delivery remain disabled"
				] })] })]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reports114-state",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: error }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign in as a registered operator to read production reporting evidence." })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reports114-summary nocx-summary-grid",
				"aria-label": "Live report evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed devices" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: operations?.summary.devices ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: operations ? `${operations.summary.collectorsOnline}/${operations.summary.collectorsTotal} collectors online` : "Authentication required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active incidents" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: operations?.summary.activeIncidents ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: operations ? `${operations.summary.unacknowledgedIncidents} unacknowledged` : "Persistent evidence" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active services" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: customers?.summary.activeServices ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: customers ? `${customers.summary.impactedCustomers} impacted customers` : "Persistent mappings only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed availability" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: operations?.summary.observedAvailabilityPct == null ? "—" : `${operations.summary.observedAvailabilityPct}%` }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Collected samples only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed interfaces" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: operations?.interfacePerformance.length ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No assumed link capacity" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "reports114-tabs",
				role: "tablist",
				"aria-label": "Reporting evidence sections",
				children: tabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					role: "tab",
					"aria-selected": tab === item,
					className: tab === item ? "reports114-tab-active" : "",
					onClick: () => setTab(item),
					children: [
						item,
						item === "SLA evidence" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: customers?.services.length ?? 0 }),
						item === "Capacity evidence" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: operations?.interfacePerformance.length ?? 0 })
					]
				}, item))
			}),
			tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "reports114-overview-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel reports114-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "NETWORK OBSERVATION"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Collector-backed state" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 17 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "reports114-definition-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Online devices" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: operations?.summary.online ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Degraded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: operations?.summary.degraded ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Offline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: operations?.summary.offline ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Unknown" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: operations?.summary.unknown ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Receive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatBps(operations?.summary.currentRxBps) })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Transmit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatBps(operations?.summary.currentTxBps) })] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel reports114-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "SERVICE OBSERVATION"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Persistent service mappings" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 17 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "reports114-definition-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Operational" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: customers?.summary.operational ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Degraded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: customers?.summary.degraded ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Offline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: customers?.summary.offline ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Unknown" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: customers?.summary.unknown ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Impacted customers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: customers?.summary.impactedCustomers ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "SLA window" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: customers ? `${customers.controls.rollingSlaWindowHours} hours` : "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Unknown gaps" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: customers ? "Never counted as uptime" : "—" })] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel reports114-panel reports114-wide",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "panel-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "CURRENT INCIDENT EVIDENCE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Persistent operational incidents" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 17 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "reports114-incident-list",
								children: (operations?.incidents ?? []).map((incident) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `reports114-status status-${statusClass(incident.severity)}`,
										children: incident.severity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incident.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										incident.id,
										" · Opened ",
										formatDate(incident.openedAt)
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: `reports114-status status-${statusClass(incident.status)}`,
										children: incident.status
									})
								] }, incident.id))
							}),
							!operations?.incidents.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								title: "No incident evidence",
								detail: error || "No persistent incident is currently available."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: ["Evidence checked: ", formatDate(checkedAt)] })
						]
					})
				]
			}),
			tab === "SLA evidence" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel reports114-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reports114-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "GUARDED ROLLING SLA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Service evidence register" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Availability is calculated only from covered 30-second buckets and approved outage impact. Unknown gaps are excluded from verified uptime." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "reports114-readonly",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 13 }), " Read only"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "reports114-table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "reports114-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Service" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Target" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Verified availability" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Coverage" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Measured downtime" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Error budget" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "SLA state" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last evidence" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (customers?.services ?? []).map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									service.serviceCode,
									" · ",
									service.site
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `reports114-status status-${statusClass(service.status)}`,
									children: service.status
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [service.slaTargetPct, "%"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: service.rollingSla.availabilityPct == null ? "—" : `${service.rollingSla.availabilityPct}%` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
									service.rollingSla.coveragePct,
									"% ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										"of ",
										service.rollingSla.requiredCoveragePct,
										"% required"
									] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDuration(service.rollingSla.downtimeSeconds) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
									formatDuration(service.rollingSla.remainingErrorBudgetSeconds),
									" ",
									service.rollingSla.remainingErrorBudgetSeconds < 0 ? "over" : "left"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `reports114-status status-${statusClass(service.rollingSla.state)}`,
									children: service.rollingSla.state.replaceAll("_", " ")
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDate(service.lastObservedAt) })
							] }, service.id)) })]
						})
					}),
					!customers?.services.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "No service SLA evidence",
						detail: error || "No active persistent service mapping is available."
					})
				]
			}),
			tab === "Capacity evidence" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel reports114-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "reports114-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "COLLECTED INTERFACE PERFORMANCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Observed demand register" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Current, peak and p95 values come from stored samples. Utilization and exhaustion cannot be claimed without authoritative link capacity." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "reports114-readonly",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 13 }), " No capacity assumptions"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "reports114-table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "reports114-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Device / interface" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Current receive" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Current transmit" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Peak receive" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Peak transmit" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "p95 receive" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "p95 transmit" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Samples" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last evidence" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (operations?.interfacePerformance ?? []).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.deviceName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.interfaceName,
									" · ",
									item.site || "No site evidence"
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.currentRxBps) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.currentTxBps) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.peakRxBps) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.peakTxBps) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.p95RxBps) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.p95TxBps) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.sampleCount }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDate(item.lastObservedAt) })
							] }, `${item.deviceId}:${item.interfaceName}`)) })]
						})
					}),
					!operations?.interfacePerformance.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "No interface performance evidence",
						detail: error || "No stored interface sample is available."
					})
				]
			}),
			tab === "Boundaries" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel reports114-register",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reports114-register-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "UNCOMMISSIONED REPORTING CAPABILITIES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Generation and delivery fail closed" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Viewing persistent evidence does not create a report artifact or prove any external delivery." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 18 })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "reports114-boundary-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
							title: "Report template and saved-report catalog",
							detail: "No persistent report-definition register is commissioned",
							state: "Unavailable"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
							title: "Scheduled generation",
							detail: "No governed reporting scheduler is commissioned",
							state: "Disabled"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
							title: "PDF, CSV and spreadsheet export",
							detail: "No artifact-generation pipeline is commissioned",
							state: "Disabled"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
							title: "Recipient lists and access tracking",
							detail: "No authoritative distribution register is commissioned",
							state: "Unavailable"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
							title: "Email, portal and secure-link delivery",
							detail: "No external delivery integration is commissioned",
							state: "Disabled"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
							title: "Customer service-credit decisions",
							detail: "SLA evidence does not authorize credits or contractual claims",
							state: "Human review"
						})
					]
				})]
			})
		]
	});
}
function EmptyState({ title, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "reports114-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 24 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: detail })
		]
	});
}
function Boundary({ title, detail, state }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: detail })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: state })
	] });
}
//#endregion
export { ReportCenter as default };
