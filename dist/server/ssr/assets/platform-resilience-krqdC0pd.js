import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { d as TriangleAlert } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as DatabaseBackup } from "./database-backup-C8coOrG8.js";
import { t as RotateCcw } from "./rotate-ccw-DWTvIWC2.js";
//#region node_modules/lucide-react/dist/esm/icons/cloud-cog.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CloudCog = createLucideIcon("CloudCog", [
	["circle", {
		cx: "12",
		cy: "17",
		r: "3",
		key: "1spfwm"
	}],
	["path", {
		d: "M4.2 15.1A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2",
		key: "zaobp"
	}],
	["path", {
		d: "m15.7 18.4-.9-.3",
		key: "4qxpbn"
	}],
	["path", {
		d: "m9.2 15.9-.9-.3",
		key: "17q7o2"
	}],
	["path", {
		d: "m10.6 20.7.3-.9",
		key: "1pf4s2"
	}],
	["path", {
		d: "m13.1 14.2.3-.9",
		key: "1mnuqm"
	}],
	["path", {
		d: "m13.6 20.7-.4-1",
		key: "1jpd1m"
	}],
	["path", {
		d: "m10.8 14.3-.4-1",
		key: "17ugyy"
	}],
	["path", {
		d: "m8.3 18.6 1-.4",
		key: "s42vdx"
	}],
	["path", {
		d: "m14.7 15.8 1-.4",
		key: "2wizun"
	}]
]);
//#endregion
//#region app/platform-resilience.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/platform-resilience.tsx
var import_jsx_runtime = require_jsx_runtime();
function age(value) {
	if (!value) return "No timestamp";
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) return "Invalid stored time";
	const seconds = Math.round((Date.now() - timestamp) / 1e3);
	if (seconds < 0) return "Future time excluded";
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function statusClass(verified) {
	return verified ? "good" : "risk";
}
function PlatformResilience() {
	const [data, setData] = (0, import_react.useState)(null), [selectedBackupId, setSelectedBackupId] = (0, import_react.useState)(""), [selectedRestoreId, setSelectedRestoreId] = (0, import_react.useState)(""), [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/resilience", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Platform resilience evidence is unavailable");
			setData(body);
			setSelectedBackupId((current) => current || body.backups[0]?.id || "");
			setSelectedRestoreId((current) => current || body.restores[0]?.id || "");
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Platform resilience evidence is unavailable");
		} finally {
			if (!quiet) setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0), timer = window.setInterval(() => void load(true), 3e4);
		return () => {
			window.clearTimeout(initial);
			window.clearInterval(timer);
		};
	}, [load]);
	const backups = (0, import_react.useMemo)(() => data?.backups ?? [], [data]), restores = (0, import_react.useMemo)(() => data?.restores ?? [], [data]), health = (0, import_react.useMemo)(() => data?.health ?? [], [data]);
	const selectedBackup = backups.find((item) => item.id === selectedBackupId) ?? backups[0] ?? null, selectedRestore = restores.find((item) => item.id === selectedRestoreId) ?? restores[0] ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "resilience-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "resilience-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Prove recovery from valid, non-future evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT RESILIENCE-EVIDENCE STATE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Review backup records, isolated restore exercises and platform-health observations only after their evidence times pass strict validation." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Platform resilience evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `live-evidence-strip ${data ? "" : "is-unavailable"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Strict persistent resilience evidence" : "Resilience snapshot unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? "Future and invalid backup, restore and health timestamps are excluded. Component freshness is derived at read time." : loading ? "Loading authenticated resilience evidence…" : "No authenticated resilience snapshot is loaded." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] }) : "Unavailable" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "resilience-summary nocx-summary-grid",
				"aria-label": "Platform resilience evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatabaseBackup, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Verified backups" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.verifiedBackups} / ${data.summary.backupRecords}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted completion, checksum, copies and evidence required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Validated restores" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.validatedRestores} / ${data.summary.restoreExercises}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted timeline and independent validation required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudCog, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Healthy components" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.healthyComponents} / ${data.summary.observedComponents}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latest accepted observation; age derived at read" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Execution authority" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "None" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Backup, restore and probes disabled" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "resilience-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel resilience-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STRICT BACKUP REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored copy and integrity evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A record is independently recoverable only when its start and completion times, checksum, multiple copies and evidence are all accepted." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "backup-list",
							children: [
								backups.map((backup) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: selectedBackup?.id === backup.id ? "selected" : "",
									onClick: () => setSelectedBackupId(backup.id),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatabaseBackup, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: backup.id }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: backup.dataClass }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: ["Started ", age(backup.startedAt)] })
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
											className: statusClass(backup.independentlyRecoverable),
											children: backup.independentlyRecoverable ? "Verified" : "Unverified"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [backup.copyLocationCount, " recorded copies"] })] })
									]
								}, backup.id)),
								data && !backups.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "resilience-empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted backup evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX will not claim backup coverage until valid, non-future production records exist." })]
								}),
								!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "resilience-empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Backup evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated resilience snapshot to inspect backup records." })]
								})
							]
						}),
						selectedBackup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "resilience-evidence-detail",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Completion time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedBackup.completionEvidenceAccepted ? "Accepted" : "Missing or rejected" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Checksum" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedBackup.checksumRecorded ? "Recorded" : "Missing" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Retention" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedBackup.retentionUntil ?? "Unknown" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Evidence fields" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedBackup.evidenceKeys.join(" · ") || "None" })] })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel resilience-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STRICT RESTORE ASSURANCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Isolated exercises only" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only valid timelines with independent validation can produce a validated result; production restore remains disabled." })
						] }), selectedRestore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
							className: statusClass(selectedRestore.validatedResult),
							children: selectedRestore.validatedResult ? "Validated" : "Unvalidated"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "restore-register",
							children: [
								restores.map((restore) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: selectedRestore?.id === restore.id ? "selected" : "",
									onClick: () => setSelectedRestoreId(restore.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: restore.id }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: restore.environment }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: ["Backup ", restore.backupRunId] })
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: restore.validatedResult ? "Validated result" : "Validation incomplete" })]
								}, restore.id)),
								data && !restores.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "resilience-empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted restore-exercise evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Recovery time and objective compliance remain unknown." })]
								}),
								!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "resilience-empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Restore evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated resilience snapshot to inspect exercises." })]
								})
							]
						}),
						selectedRestore && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "restore-grid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Recovery point" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedRestore.recoveryPointAt ?? "Rejected or missing" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Must be valid and not after exercise start" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Actual / objective" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedRestore.actualMinutes === null ? "Unknown" : `${selectedRestore.actualMinutes}m / ${selectedRestore.rtoMinutes}m` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No result inferred when timing evidence fails" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Independent validation" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedRestore.independentlyValidated ? "Recorded" : "Missing" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Different approver and validator required" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Evidence fields" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedRestore.evidenceKeys.length }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: selectedRestore.evidenceKeys.join(" · ") || "None" })
								] })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel resilience-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "STRICT PLATFORM HEALTH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Latest accepted observation per component" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Future and invalid observations are excluded. Evidence age is derived at read time and compared with the stored objective." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
					className: "warn",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), data ? health.length ? `${health.filter((item) => !item.verifiedHealthy).length} review` : "No evidence" : "Unavailable"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "health-table",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Component" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "State" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Signal" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Last evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Age / objective" })
						] }),
						health.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "health-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.component }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: statusClass(item.verifiedHealthy),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), item.verifiedHealthy ? "verified healthy" : "review"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.signalType }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: age(item.observedAt) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									item.ageSeconds,
									"s / ",
									item.objectiveSeconds,
									"s"
								] })
							]
						}, item.id)),
						data && !health.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "resilience-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted platform-health evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Runtime, database, ingestion, authentication and worker health remain unknown." })]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "resilience-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Platform-health evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated resilience snapshot to review component observations." })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel resilience-card governance",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "FAIL-CLOSED RECOVERY BOUNDARY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Evidence visibility is not execution authority" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Only valid, non-future backup, restore and health rows enter totals."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Completion order and recovery-point order are checked before a result is validated."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Component freshness is derived from accepted observation time."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Backup scheduling and execution are uncommissioned."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Production restore and automatic rollback are disabled."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Synthetic health checks and automatic incident creation are disabled."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "No MikroTik, Cudy or Ubiquiti probe is sent."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Network configuration writes remain disabled."] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Refreshing this workspace reads stored NOCX evidence only."] })
				]
			})
		]
	});
}
//#endregion
export { PlatformResilience as default };
