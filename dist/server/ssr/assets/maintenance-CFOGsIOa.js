import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck } from "./network-CaMqMjRB.js";
import { a as Wrench, d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as CalendarClock } from "./calendar-clock-D1QLh4hH.js";
//#region app/maintenance.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/maintenance.tsx
var import_jsx_runtime = require_jsx_runtime();
var activeStates = new Set([
	"pending_approval",
	"approved",
	"in_progress"
]), executableStates = new Set(["approved", "in_progress"]);
var labels = {
	pending_approval: "Awaiting approval",
	approved: "Approved",
	in_progress: "In progress",
	completed: "Completed",
	failed: "Failed",
	rejected: "Rejected",
	rolled_back: "Rolled back",
	cancelled: "Cancelled"
};
var cls = (value) => value.toLowerCase().replaceAll("_", "-");
function formatDate(value) {
	return new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(new Date(value));
}
function duration(start, end) {
	const minutes = Math.max(0, Math.round((Date.parse(end) - Date.parse(start)) / 6e4));
	return minutes >= 60 ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : `${minutes} min`;
}
function MaintenanceWindows() {
	const [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [loading, setLoading] = (0, import_react.useState)(true), [query, setQuery] = (0, import_react.useState)(""), [filter, setFilter] = (0, import_react.useState)("active"), [selected, setSelected] = (0, import_react.useState)(null);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setData(null);
		setSelected(null);
		try {
			const response = await fetch("/api/platform/changes", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Maintenance schedule is unavailable");
			setData(body);
			setError("");
		} catch (reason) {
			setData(null);
			setSelected(null);
			setError(reason instanceof Error ? reason.message : "Maintenance schedule is unavailable");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0), timer = window.setInterval(() => void load(), 3e4);
		return () => {
			window.clearTimeout(initial);
			window.clearInterval(timer);
		};
	}, [load]);
	const windows = (0, import_react.useMemo)(() => (data?.changes ?? []).filter((change) => (filter === "all" || filter === "active" && activeStates.has(change.status) || change.status === filter) && `${change.changeNumber} ${change.title} ${change.targets.map((item) => item.hostname).join(" ")}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => a.maintenanceStart.localeCompare(b.maintenanceStart)), [
		data,
		filter,
		query
	]);
	const now = data ? Date.parse(data.checkedAt) : 0, next24 = (data?.changes ?? []).filter((change) => executableStates.has(change.status) && Date.parse(change.maintenanceStart) >= now && Date.parse(change.maintenanceStart) <= now + 864e5), inProgress = (data?.changes ?? []).filter((change) => change.status === "in_progress"), pending = (data?.changes ?? []).filter((change) => change.status === "pending_approval"), nextApproved = (data?.changes ?? []).filter((change) => change.status === "approved" && Date.parse(change.maintenanceEnd) >= now).sort((a, b) => a.maintenanceStart.localeCompare(b.maintenanceStart))[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "maintenance-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "maintenance-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Replayed approved maintenance windows" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT MAINTENANCE-SCHEDULE EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every window is derived only from the strict change lifecycle replay. Pending approvals remain visibly blocked, and unavailable evidence never becomes an empty or clear schedule." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: loading ? "refresh-spin" : "",
						size: 15
					}), "Refresh schedule"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Maintenance evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict change-controlled schedule" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? `${data.summary.acceptedRecords} accepted changes · ${data.summary.rejectedRecords} rejected records · ${data.summary.rejectedEvents} rejected events` : loading ? "Loading deterministic lifecycle evidence" : "No window or clear-state claim is available" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "maintenance-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved next 24 hours" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? next24.length : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${next24.reduce((sum, item) => sum + item.customerImpactEstimate, 0)} customers in accepted scope` : "Impact evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Strictly in progress" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? inProgress.length : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Replayed start event only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Awaiting approval" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? pending.length : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Excluded from approved work" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Execution boundary" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Read-only" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Network writes disabled" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "maintenance-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel maintenance-calendar",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "UPCOMING STRICTLY APPROVED WORK"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Operational timeline" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }), "EAT · UTC+3"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "maintenance-slots",
							children: windows.filter((item) => executableStates.has(item.status)).slice(0, 6).map((change) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSelected(change),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: formatDate(change.maintenanceStart) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: change.title }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										duration(change.maintenanceStart, change.maintenanceEnd),
										" · ",
										change.targets.length,
										" accepted targets"
									] })
								]
							}, change.id))
						}),
						data && windows.filter((item) => executableStates.has(item.status)).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "maintenance-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted executable windows" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pending requests remain outside the approved timeline." })
							]
						}),
						!loading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "maintenance-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Operational timeline unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No empty-schedule or clear-state claim is inferred." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "maintenance-guard",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Starting work is window-gated." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Approval alone never changes a device or suppresses an alert." })] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel maintenance-impact",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "panel-heading",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "NEXT STRICTLY APPROVED WINDOW"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Impact control" })] })
					}), nextApproved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: nextApproved.changeNumber }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: nextApproved.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							nextApproved.targets.length,
							" accepted devices and ",
							nextApproved.customerImpactEstimate,
							" estimated customer services are in scope."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 16 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: nextApproved.customerImpactEstimate }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Customers" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { size: 16 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: nextApproved.targets.length }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Devices" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 16 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: duration(nextApproved.maintenanceStart, nextApproved.maintenanceEnd) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Window" })
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => setSelected(nextApproved),
							children: ["Review evidence ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })]
						})
					] }) : data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "maintenance-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted approved work scheduled" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pending requests remain blocked from execution." })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "maintenance-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Impact evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No zero-impact or empty-schedule claim is inferred." })
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel maintenance-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT REPLAYED WINDOW REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Change-linked maintenance" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Accepted requests, targets, customer impact, rollback plans and lifecycle events only." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search windows…",
						disabled: !data
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filter,
						onChange: (event) => setFilter(event.target.value),
						disabled: !data,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "active",
								children: "Upcoming & active"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All windows"
							}),
							Object.entries(labels).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value,
								children: label
							}, value))
						]
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "maintenance-table",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Window" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "State" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Schedule" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Scope" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customers" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Requester" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: windows.map((change) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSelected(change),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: change.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									change.changeNumber,
									" · ",
									change.changeType
								] })]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `maintenance-state state-${cls(change.status)}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), labels[change.status] ?? change.status]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatDate(change.maintenanceStart) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: duration(change.maintenanceStart, change.maintenanceEnd) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [change.targets.length, " accepted devices"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: change.customerImpactEstimate.toLocaleString() }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: change.requestedBy }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "row-action",
								onClick: () => setSelected(change),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
							}) })
						] }, change.id)) })] })
					}),
					!loading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "maintenance-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Window register unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load strict change evidence before reviewing maintenance state." })
						]
					})
				]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "maintenance-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					onClick: () => setSelected(null),
					"aria-label": "Close"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "maintenance-drawer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CHANGE-CONTROLLED MAINTENANCE" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									selected.changeNumber,
									" · ",
									selected.changeType
								] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelected(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "maintenance-window",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Scheduled window" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									formatDate(selected.maintenanceStart),
									" · ",
									duration(selected.maintenanceStart, selected.maintenanceEnd)
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", {
									className: `maintenance-state state-${cls(selected.status)}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), labels[selected.status] ?? selected.status]
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Execution gates" }),
						[
							selected.approvedBy ? `Approved by ${selected.approvedBy}` : "Independent approval pending",
							`${selected.targets.length} registered targets verified`,
							`Rollback and validation plans stored`,
							"Network writes remain disabled"
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "maintenance-check",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 }), item]
						}, item)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Operational scope" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Requester" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.requestedBy })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Customers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.customerImpactEstimate.toLocaleString() })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Targets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.targets.map((item) => item.hostname).join(", ") || "None" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Rollback" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.rollbackPlan })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Validation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.validationPlan })] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "maintenance-guard",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Execution remains operator-controlled." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "This schedule cannot modify devices or mute alerts." })] })]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { MaintenanceWindows as default };
