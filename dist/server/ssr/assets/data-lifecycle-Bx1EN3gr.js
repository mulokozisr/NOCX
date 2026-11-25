import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as HardDrive } from "./hard-drive-ra7fzo_9.js";
import { t as History } from "./history-ClpmxT4G.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as Archive } from "./archive-BV5F5FNi.js";
//#region node_modules/lucide-react/dist/esm/icons/layers.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Layers = createLucideIcon("Layers", [
	["path", {
		d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
		key: "zw3jo"
	}],
	["path", {
		d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
		key: "1wduqc"
	}],
	["path", {
		d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
		key: "kqbvx6"
	}]
]);
//#endregion
//#region app/data-lifecycle-live.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/data-lifecycle.tsx
var import_jsx_runtime = require_jsx_runtime();
function display(value) {
	return value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
function time(value) {
	if (!value) return "Unavailable";
	const parsed = new Date(value);
	return Number.isNaN(parsed.valueOf()) ? "Invalid stored time" : parsed.toLocaleString();
}
function DataLifecycle() {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/data-lifecycle", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "Data-lifecycle evidence is unavailable.");
			setData(body);
		} catch (reason) {
			setData(null);
			setError(reason instanceof Error ? reason.message : "Data-lifecycle evidence is unavailable.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(initial);
	}, [load]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "lifecycle-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "lifecycle-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inspect stored lifecycle records without inventing retention controls." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT RETENTION-AND-ROLLUP CHRONOLOGY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only valid, nonfuture and internally ordered rollup, receipt, retention-policy and backup evidence is accepted. NOCX does not infer an approved retention window, active rollup worker, immutable store, deletion job or device-activation readiness." })
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
				className: "lifecycle-warning",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Lifecycle evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [error, ". No fallback policies, counts or storage claims were generated."] })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "lifecycle-boundary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict chronological evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No fixed 30-day, 400-day or 5-year window is supplied by the interface. Invalid, future, reversed or internally inconsistent rows are excluded and never upgraded to approved." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Deletion disabled"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "lifecycle-kpis nocx-summary-grid",
				"aria-label": "Persistent lifecycle evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "METRIC SAMPLES" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.metricSamples ?? "—" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "METRIC ROLLUPS" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.metricRollups ?? "—" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "INGESTION RECEIPTS" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.ingestionReceipts ?? "—" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "RETENTION POLICIES" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.retentionPolicies ?? "—" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "lifecycle-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel lifecycle-policy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "PERSISTENT RETENTION REGISTER"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recorded policy definitions" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Windows and states are shown exactly as stored; presence does not prove approval, scheduling or deletion execution." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 14 }),
								data?.policies.length ?? 0,
								" rows"
							] })]
						}),
						data?.policies.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lifecycle-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 16 }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: display(item.dataClass) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									"Updated by ",
									item.updatedBy,
									" · ",
									time(item.updatedAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
									"Raw ",
									item.rawDays,
									"d · Hourly ",
									item.hourlyDays,
									"d · Daily ",
									item.dailyDays,
									"d"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: display(item.status) })
							]
						}, item.id)),
						!loading && !data?.policies.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lifecycle-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent retention policy" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No default window or approval state is substituted." })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel lifecycle-controls",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "panel-heading",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "FAIL-CLOSED CONTROL BOUNDARY"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Claims not established by row counts" })] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Rollup worker state unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Rollup rows do not prove a scheduled worker is enabled or current." })] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Immutability unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No append-only enforcement or storage-lock evidence is inferred." })] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Deletion execution disabled" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No expiry, purge or retention-policy write is exposed here." })] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Device activation out of scope" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Storage evidence does not authorize collectors, probes or hardware activation." })] })] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "lifecycle-evidence-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel lifecycle-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "panel-heading",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "RECENT INGESTION RECEIPTS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored batch outcomes" })] })
						}),
						data?.receipts.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.collectorId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								time(row.receivedAt),
								" · schema ",
								row.schemaVersion
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
								row.accepted,
								" accepted · ",
								row.rejected,
								" rejected · ",
								row.duplicate,
								" duplicate"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: display(row.outcome) })
						] }, row.id)),
						!loading && !data?.receipts.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lifecycle-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No ingestion receipt evidence" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel lifecycle-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "panel-heading",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "RECENT BACKUP RECORDS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored run evidence" })] })
						}),
						data?.backups.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: display(row.dataClass) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								time(row.startedAt),
								" · completed ",
								time(row.completedAt)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
								row.checksumRecorded ? "Checksum recorded" : "No checksum",
								" · ",
								row.copyLocationCount,
								" copy locations"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: display(row.status) })
						] }, row.id)),
						!loading && !data?.backups.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lifecycle-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No backup-run evidence" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No recoverability or retention claim is inferred." })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel lifecycle-safety",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evidence boundary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Rejected evidence: ",
					data ? Object.values(data.evidenceIntegrity).reduce((total, value) => total + value, 0) : 0,
					". Retention approval, rollup scheduling, immutable storage, automatic deletion, restore success, device activation and network writes remain unclaimed or disabled unless separate persistent evidence establishes them."
				] })] })]
			})
		]
	});
}
//#endregion
export { DataLifecycle as default };
