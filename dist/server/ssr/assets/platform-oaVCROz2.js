import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Server } from "./server-DGu4Aqms.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as HardDrive } from "./hard-drive-ra7fzo_9.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as Fingerprint } from "./fingerprint-Cu9i3RAi.js";
//#region app/platform-live.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/platform.tsx
var import_jsx_runtime = require_jsx_runtime();
var recordLabels = {
	roles: "Roles",
	operators: "Operators",
	devices: "Devices",
	customers: "Customers",
	incidents: "Incidents",
	auditEvents: "Audit events",
	collectors: "Collectors",
	credentialReferences: "Credential references",
	metricSamples: "Metric samples",
	metricRollups: "Metric rollups",
	ingestionReceipts: "Ingestion receipts",
	retentionPolicies: "Retention policies"
};
var evidenceLabels = {
	availabilityObservedAt: "Availability observation",
	metricObservedAt: "Metric observation",
	auditCreatedAt: "Authorization audit event",
	ingestionReceivedAt: "Ingestion receipt",
	platformHealthObservedAt: "Platform-health record"
};
function time(value) {
	if (!value) return "No stored evidence";
	const parsed = new Date(value);
	return Number.isNaN(parsed.valueOf()) ? "Invalid stored time" : parsed.toLocaleString();
}
function PlatformFoundation() {
	const [status, setStatus] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/status", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "Platform evidence is unavailable.");
			const checkedAtMs = Date.parse(body.checkedAt);
			if (!Number.isFinite(checkedAtMs) || checkedAtMs > Date.now() || !body.snapshotIntegrity.coherent || !body.snapshotIntegrity.identityBound || !body.authenticatedAs) throw new Error("Platform snapshot failed strict coherence validation.");
			setStatus(body);
		} catch (reason) {
			setStatus(null);
			setError(reason instanceof Error ? reason.message : "Platform evidence is unavailable.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(initial);
	}, [load]);
	const total = (0, import_react.useMemo)(() => status ? Object.values(status.records).reduce((sum, value) => sum + value, 0) : null, [status]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "foundation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "foundation-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inspect the platform without inventing readiness." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "COHERENT AUTHENTICATED PLATFORM SNAPSHOT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Counts and latest timestamps are accepted only from one identity-bound, time-valid snapshot. They do not prove schema readiness, migration status, retention approval, device health, cutover completion or release approval." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						size: 16,
						className: loading ? "refresh-spin" : ""
					}), loading ? "Checking…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "foundation-live-strip foundation-live-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Platform evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [error, ". No fallback status, count, migration or cutover claim was generated."] })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "foundation-live-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Coherent authenticated snapshot only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future or invalid source times, identity mismatches and incoherent response metadata fail closed before any platform totals are displayed." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Writes disabled"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "foundation-summary nocx-summary-grid",
				"aria-label": "Persistent platform evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "DATABASE QUERY" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: status ? "Succeeded" : loading ? "Checking" : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No health objective inferred" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "STORED ROWS" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: total ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Across displayed tables" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "AUTHENTICATED AS" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: status ? "Verified" : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: status?.authenticatedAs ?? "Identity unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "NETWORK WRITES" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Disabled" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Evidence endpoint only" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "foundation-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel foundation-schema",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "PERSISTENT RECORD COUNTS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored evidence domains" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Counts are the result of the authenticated query and do not imply completeness or approval." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "foundation-unknown",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 14 }), "Observed only"]
							})]
						}),
						Object.entries(status?.records ?? {}).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "foundation-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 16 }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: recordLabels[key] ?? key }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Persistent rows returned by the database" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: value })
							]
						}, key)),
						!loading && !status && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "foundation-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No record-count evidence" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel foundation-controls",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "panel-heading",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "LATEST STORED EVIDENCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Record timestamps" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Timestamp presence does not establish freshness until an approved objective exists." })
						] })
					}), Object.entries(status?.latestEvidence ?? evidenceLabels).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: evidenceLabels[key] ?? key }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: status ? time(value) : "Evidence unavailable" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "RECORDED" })
					] }, key))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel foundation-cutover foundation-boundary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "FAIL-CLOSED PLATFORM BOUNDARY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Counts are not readiness decisions" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: status ? `${status.snapshotIntegrity.sourceCount} source clocks accepted · ${status.snapshotIntegrity.rejectedLatestEvidence} rejected` : "Snapshot integrity unavailable" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "foundation-boundary-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Schema and migration readiness are not inferred."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Retention rows are not upgraded to approved policies."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Device or collector health is not inferred from platform counts."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Credential values are never returned."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Cutover and release completion are not inferred."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Network configuration writes remain disabled."] })
					]
				})]
			})
		]
	});
}
//#endregion
export { PlatformFoundation as default };
