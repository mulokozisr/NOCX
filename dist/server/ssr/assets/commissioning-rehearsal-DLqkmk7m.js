import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as History } from "./history-ClpmxT4G.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
//#region node_modules/lucide-react/dist/esm/icons/file-warning.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileWarning = createLucideIcon("FileWarning", [
	["path", {
		d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
		key: "1rqfz7"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
//#endregion
//#region app/commissioning-rehearsal.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/commissioning-rehearsal.tsx
var import_jsx_runtime = require_jsx_runtime();
function display(value) {
	return value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
function time(value) {
	const parsed = new Date(value);
	return Number.isNaN(parsed.valueOf()) ? "Unavailable" : parsed.toLocaleString();
}
function CommissioningRehearsal() {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/commissioning-rehearsals", { cache: "no-store" });
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? "Persistent commissioning evidence is unavailable.");
			setData(result);
		} catch (reason) {
			setData(null);
			setError(reason instanceof Error ? reason.message : "Persistent commissioning evidence is unavailable.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(initial);
	}, [load]);
	const records = (0, import_react.useMemo)(() => data?.records ?? [], [data]);
	const unsafeClaims = (0, import_react.useMemo)(() => records.filter((record) => record.productionTelemetryWritten || record.probesEnabled || record.networkWritesEnabled).length, [records]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "rehearsal-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rehearsal-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Review recorded evidence. Keep scenario execution disabled." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT REHEARSAL-EVIDENCE CHRONOLOGY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No scenario, result, pass, device availability or hardware acceptance is fabricated by this workspace. Historical synthetic records remain visible only as non-authoritative audit evidence." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Strict chronology · register only"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rehearsal-summary nocx-summary-grid",
				"aria-label": "Commissioning evidence status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Persistent records" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.records ?? 0 }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "Loading evidence…" : "Stored rows only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileWarning, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Legacy synthetic" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.legacySynthetic ?? 0 }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Not production proof" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Production evidence" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.productionEvidence ?? 0 }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No claim inferred" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Hardware acceptances" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.hardwareAcceptanceGranted ?? 0 }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Granting disabled" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel rehearsal-runner rehearsal-boundary-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "FAIL-CLOSED COMMISSIONING BOUNDARY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "No executable rehearsal path" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The former fixed scenario runner has been removed because predetermined outcomes are not operational evidence." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "decision-blocked",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "Disabled"]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No seeded scenario definitions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "The interface does not present fixed MikroTik, Ubiquiti, RF or replay outcomes as tests." })] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No synthetic evidence generation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Refreshing this register cannot create a run, result, digest, approval or pass." })] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No production or device action" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Probes, telemetry writes, incident writes, hardware acceptance and network configuration writes remain disabled." })] })] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rehearsal-boundary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Historical synthetic records are not readiness evidence." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "A stored predetermined result proves only that the old workflow wrote a row. It does not prove device identity, reachability, telemetry stability, alert behavior or hardware acceptance." })] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel rehearsal-history",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT PERSISTENT EVIDENCE REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recorded commissioning rehearsal rows" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Invalid, future, incomplete or out-of-order evidence is excluded. Unsupported production conclusions remain zero and fail closed." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), loading ? "Refreshing…" : "Refresh evidence"]
					})] }),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rehearsal-empty rehearsal-error",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No fallback records or scenario claims were generated." })
						]
					}) : loading && !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rehearsal-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Loading persistent evidence…" })]
					}) : records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rehearsal-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent rehearsal evidence recorded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The register remains empty until an approved real-evidence source writes a record." })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rehearsal-table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Record" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Classification" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Vendor" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Expected" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Actual" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Recorded by" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Completed" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Digest" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: records.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: record.id.slice(-10) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: display(record.scenarioKey) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "run-failed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileWarning, {}), display(record.classification)]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: record.vendor }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: display(record.expectedDecision) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: display(record.actualDecision) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: record.executedBy }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: time(record.completedAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: record.evidenceDigest ? `${record.evidenceDigest.slice(0, 10)}…` : "Unavailable" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: display(record.status) })
						] }, record.id)) })] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						"Unsafe record flags: ",
						unsafeClaims,
						". Rejected chronology: ",
						data?.evidenceIntegrity.rejectedRecords ?? 0,
						". Scenario execution, synthetic evidence generation, device probes, hardware acceptance and network writes are disabled."
					] })
				]
			})
		]
	});
}
//#endregion
export { CommissioningRehearsal as default };
