import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronDown } from "./chevron-down-jG2qgWsF.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as History } from "./history-ClpmxT4G.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
import { t as CalendarClock } from "./calendar-clock-D1QLh4hH.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { t as UserRoundCheck } from "./user-round-check-DlXOpisp.js";
//#region node_modules/lucide-react/dist/esm/icons/loader-circle.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LoaderCircle = createLucideIcon("LoaderCircle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]);
//#endregion
//#region app/change-control.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/changes.tsx
var import_jsx_runtime = require_jsx_runtime();
var statusLabels = {
	pending_approval: "Pending approval",
	approved: "Approved",
	in_progress: "In progress",
	completed: "Completed",
	failed: "Failed",
	rejected: "Rejected",
	rolled_back: "Rolled back",
	cancelled: "Cancelled"
};
var actionLabels = {
	record_dry_run: "Record dry-run evidence",
	dry_run: "Dry-run evidence",
	approve: "Approve",
	reject: "Reject",
	start: "Start change",
	complete: "Complete",
	fail: "Mark failed",
	rollback: "Record rollback",
	cancel: "Cancel"
};
function localInput(date) {
	return (/* @__PURE__ */ new Date(date.getTime() - date.getTimezoneOffset() * 6e4)).toISOString().slice(0, 16);
}
function emptyDraft() {
	const start = new Date(Date.now() + 36e5), end = new Date(start.getTime() + 36e5);
	return {
		title: "",
		summary: "",
		changeType: "Configuration",
		risk: "medium",
		maintenanceStart: localInput(start),
		maintenanceEnd: localInput(end),
		rollbackPlan: "",
		validationPlan: "",
		customerImpactEstimate: "0",
		targetDeviceIds: []
	};
}
function formatDate(value) {
	if (!value) return "—";
	return new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(new Date(value));
}
function availableActions(change) {
	if (change.status === "pending_approval") return [
		"record_dry_run",
		"approve",
		"reject",
		"cancel"
	];
	if (change.status === "approved") return [
		"record_dry_run",
		"start",
		"cancel"
	];
	if (change.status === "in_progress") return [
		"complete",
		"fail",
		"rollback"
	];
	if (change.status === "failed" || change.status === "completed") return ["rollback"];
	return [];
}
function permittedActions(change, viewer) {
	return availableActions(change).filter((action) => action === "approve" || action === "reject" ? viewer.canApprove && viewer.email !== change.requestedBy : action === "cancel" ? viewer.canAdmin && viewer.email === change.requestedBy : viewer.canAdmin);
}
function ChangeManagement() {
	const [data, setData] = (0, import_react.useState)(null), [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)(""), [query, setQuery] = (0, import_react.useState)(""), [filter, setFilter] = (0, import_react.useState)("all"), [selected, setSelected] = (0, import_react.useState)(null), [createOpen, setCreateOpen] = (0, import_react.useState)(false), [draft, setDraft] = (0, import_react.useState)(emptyDraft), [actionNote, setActionNote] = (0, import_react.useState)(""), [working, setWorking] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		setData(null);
		setSelected(null);
		setCreateOpen(false);
		try {
			const response = await fetch("/api/platform/changes", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Change register is unavailable");
			setData(body);
			setError("");
		} catch (reason) {
			setData(null);
			setSelected(null);
			setError(reason instanceof Error ? reason.message : "Change register is unavailable");
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
	const changes = (0, import_react.useMemo)(() => (data?.changes ?? []).filter((change) => `${change.changeNumber} ${change.title} ${change.changeType} ${change.requestedBy} ${change.targets.map((item) => item.hostname).join(" ")}`.toLowerCase().includes(query.toLowerCase()) && (filter === "all" || change.status === filter)), [
		data,
		filter,
		query
	]);
	async function createChange(event) {
		event.preventDefault();
		setWorking("create");
		setError("");
		try {
			const response = await fetch("/api/platform/changes", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					...draft,
					customerImpactEstimate: Number(draft.customerImpactEstimate),
					maintenanceStart: new Date(draft.maintenanceStart).toISOString(),
					maintenanceEnd: new Date(draft.maintenanceEnd).toISOString()
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Change request could not be submitted");
			setCreateOpen(false);
			setDraft(emptyDraft());
			setNotice(`${body.changeNumber} submitted for independent approval.`);
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Change request could not be submitted");
		} finally {
			setWorking("");
		}
	}
	async function performAction(action) {
		if (!selected) return;
		setWorking(action);
		setError("");
		try {
			const response = await fetch("/api/platform/changes", {
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					id: selected.id,
					action,
					note: actionNote
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Change action failed");
			setNotice(`${selected.changeNumber} is now ${statusLabels[body.status ?? ""]?.toLowerCase() ?? body.status}.`);
			setActionNote("");
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Change action failed");
		} finally {
			setWorking("");
		}
	}
	const summary = data?.summary;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "live-change-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-change-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "ROLLBACK AND DRY-RUN EXECUTION GATES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Block execution without rehearsal and recovery evidence" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A controlled action cannot enter execution without immutable dry-run evidence and a complete rollback plan. Rollback outcomes are preserved as verified ledger events with operator identity and chronology." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "live-change-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), "Refresh"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						onClick: () => setCreateOpen(true),
						disabled: !data?.viewer.canAdmin,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), data && !data.viewer.canAdmin ? "Admin permission required" : "New change"]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Change register unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict persistent production workflow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? `${summary?.acceptedRecords ?? 0} accepted requests · ${summary?.rejectedRecords ?? 0} rejected records · ${summary?.rejectedEvents ?? 0} rejected events` : loading ? "Loading strict change evidence…" : "No lifecycle state or window is inferred" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-change-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "violet",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRoundCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Pending approval" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? summary?.pendingApproval : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Four-eyes control" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? summary?.approved : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Replayed state only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "amber",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "In progress" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? summary?.inProgress : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Window-gated event" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "red",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "High-risk open" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? summary?.highRiskOpen : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted records only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "green",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Next strict window" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? summary?.nextWindow ? formatDate(summary.nextWindow.startsAt).split(",").at(-1) : "None" : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? summary?.nextWindow?.title ?? "No accepted window" : "Evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-change-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel live-change-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STRICT REPLAYED CHANGE REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Production change requests" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only records whose target, actor, timestamp, approval and transition evidence replay exactly are shown." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? `${changes.length} shown` : "Unavailable" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "live-change-toolbar",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: query,
									onChange: (event) => setQuery(event.target.value),
									placeholder: "Search changes or devices…",
									"aria-label": "Search change register",
									disabled: !data
								}),
								query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQuery(""),
									"aria-label": "Clear search",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: filter,
								onChange: (event) => setFilter(event.target.value),
								"aria-label": "Filter change status",
								disabled: !data,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All statuses"
								}), Object.entries(statusLabels).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value,
									children: label
								}, value))]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "live-change-table",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Change" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Risk" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Targets" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Window (EAT)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: changes.map((change) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => {
									setSelected(change);
									setActionNote("");
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: change.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										change.changeNumber,
										" · ",
										change.changeType
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `live-risk risk-${change.risk}`,
										children: change.risk
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [change.targets.length, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: change.targets[0]?.hostname ?? "No accepted target" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [formatDate(change.maintenanceStart), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [change.customerImpactEstimate, " customer impact estimate"] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `live-change-status status-${change.status}`,
										children: statusLabels[change.status] ?? change.status
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 }) })
								]
							}, change.id)) })] })
						}),
						!loading && data && changes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "live-change-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { size: 26 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.changes.length ? "No accepted changes match the filter" : "No accepted production changes" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.changes.length ? "Adjust the search or status filter." : "Create the first strict governed request when work is ready to schedule." })
							]
						}),
						!loading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "live-change-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 25 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Change evidence unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No request count, lifecycle state, target, approval or maintenance window is inferred." })
							]
						}),
						loading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "live-change-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
								className: "refresh-spin",
								size: 25
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading strict change records…" })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "panel live-change-policy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT ENFORCED CONTROLS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Execution boundary" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Deterministic lifecycle replay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Stored status is accepted only when every immutable transition replays in order." })] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Independent approval" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "An active requester cannot approve or reject their own change; approval must precede the window." })] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Target and window integrity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Every target retains strict registered-device chronology and execution starts only inside the approved gate." })] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Read-only orchestration" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "NOCX stores workflow evidence; router and switch writes remain disabled." })] })] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "live-change-policy-note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Configuration backup automation is not commissioned." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No backup coverage claim is shown until a verified backup adapter is connected." })] })]
						})
					]
				})]
			}),
			createOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					onClick: () => setCreateOpen(false),
					"aria-label": "Close new change form"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "live-change-drawer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "NEW GOVERNED REQUEST"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Create a change" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The request enters independent approval; it does not contact any device." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "icon-button",
						onClick: () => setCreateOpen(false),
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: createChange,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								minLength: 8,
								maxLength: 140,
								value: draft.title,
								onChange: (event) => setDraft({
									...draft,
									title: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scope and reason" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								minLength: 20,
								value: draft.summary,
								onChange: (event) => setDraft({
									...draft,
									summary: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "live-change-form-grid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: draft.changeType,
									onChange: (event) => setDraft({
										...draft,
										changeType: event.target.value
									}),
									children: [
										"Configuration",
										"Capacity",
										"Firmware",
										"Maintenance",
										"Provisioning",
										"Routing",
										"Security"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Risk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: draft.risk,
									onChange: (event) => setDraft({
										...draft,
										risk: event.target.value
									}),
									children: [
										"low",
										"medium",
										"high",
										"critical"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "live-change-form-grid",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Window start" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "datetime-local",
									required: true,
									value: draft.maintenanceStart,
									onChange: (event) => setDraft({
										...draft,
										maintenanceStart: event.target.value
									})
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Window end" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "datetime-local",
									required: true,
									value: draft.maintenanceEnd,
									onChange: (event) => setDraft({
										...draft,
										maintenanceEnd: event.target.value
									})
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Registered targets" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									multiple: true,
									required: true,
									value: draft.targetDeviceIds,
									onChange: (event) => setDraft({
										...draft,
										targetDeviceIds: [...event.target.selectedOptions].map((option) => option.value)
									}),
									children: data?.devices.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: device.id,
										children: [
											device.hostname,
											" · ",
											device.vendor,
											" · ",
											device.site ?? "Unassigned"
										]
									}, device.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Use Ctrl/Cmd to select multiple devices." })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Estimated customers affected" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								max: "1000000",
								value: draft.customerImpactEstimate,
								onChange: (event) => setDraft({
									...draft,
									customerImpactEstimate: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rollback plan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								minLength: 20,
								value: draft.rollbackPlan,
								onChange: (event) => setDraft({
									...draft,
									rollbackPlan: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Validation plan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								minLength: 20,
								value: draft.validationPlan,
								onChange: (event) => setDraft({
									...draft,
									validationPlan: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "live-change-form-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "secondary-button",
									onClick: () => setCreateOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "primary-button",
									disabled: working === "create",
									children: working === "create" ? "Submitting…" : "Submit for approval"
								})]
							})
						]
					})]
				})]
			}),
			selected && data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					onClick: () => setSelected(null),
					"aria-label": "Close change details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "live-change-drawer live-change-detail",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "panel-kicker",
								children: [
									selected.changeNumber,
									" · ",
									selected.changeType.toUpperCase()
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Submitted by active operator ", selected.requestedBy] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "icon-button",
							onClick: () => setSelected(null),
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "live-change-detail-badges",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `live-risk risk-${selected.risk}`,
								children: [selected.risk, " risk"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `live-change-status status-${selected.status}`,
								children: statusLabels[selected.status] ?? selected.status
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Strict operational scope" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.summary }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Window" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
									formatDate(selected.maintenanceStart),
									" – ",
									formatDate(selected.maintenanceEnd)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Accepted targets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.targets.map((item) => item.hostname).join(", ") || "None" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Customer estimate" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.customerImpactEstimate })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Approved by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.approvedBy ?? "Awaiting independent approval" })] })
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Rollback plan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.rollbackPlan })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Validation plan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.validationPlan })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Replayed immutable timeline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "live-change-timeline",
							children: selected.events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: actionLabels[event.eventType] ?? event.eventType }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									formatDate(event.createdAt),
									" · ",
									event.actorEmail
								] }),
								event.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: event.note })
							] })] }, event.id))
						})] }),
						permittedActions(selected, data.viewer).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "live-change-decision",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Operational note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: actionNote,
								onChange: (event) => setActionNote(event.target.value)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: permittedActions(selected, data.viewer).map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: action === "approve" || action === "start" || action === "complete" ? "primary-button" : "secondary-button",
								disabled: Boolean(working),
								onClick: () => void performAction(action),
								children: working === action ? "Saving…" : actionLabels[action]
							}, action)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "No workflow action changes network configuration."] })
					]
				})]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "simulation-toast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 }), notice]
			})
		]
	});
}
//#endregion
export { ChangeManagement as default };
