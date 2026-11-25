import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as UserCheck } from "./user-check-BKIWF-YP.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
import { t as Headphones } from "./headphones-D2PP1JaX.js";
//#region node_modules/lucide-react/dist/esm/icons/timer.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Timer = createLucideIcon("Timer", [
	["line", {
		x1: "10",
		x2: "14",
		y1: "2",
		y2: "2",
		key: "14vaq8"
	}],
	["line", {
		x1: "12",
		x2: "15",
		y1: "14",
		y2: "11",
		key: "17fdiu"
	}],
	["circle", {
		cx: "12",
		cy: "14",
		r: "8",
		key: "1e1u0o"
	}]
]);
//#endregion
//#region app/on-call.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/on-call.tsx
var import_jsx_runtime = require_jsx_runtime();
var roleLabels = {
	primary_noc: "Primary NOC",
	network_escalation: "Network escalation",
	field_response: "Field response",
	service_assurance: "Service assurance"
};
var stateLabels = {
	open: "Open",
	acknowledged: "Acknowledged",
	resolved: "Resolved",
	scheduled: "Scheduled",
	active: "On duty",
	completed: "Completed",
	cancelled: "Cancelled"
};
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function initials(name) {
	return name.split(/\s+/).slice(0, 2).map((item) => item[0]).join("").toUpperCase() || "OP";
}
function formatDate(value) {
	if (!value) return "—";
	return new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(new Date(value));
}
function localInput(date) {
	return (/* @__PURE__ */ new Date(date.getTime() - date.getTimezoneOffset() * 6e4)).toISOString().slice(0, 16);
}
function defaultSchedule() {
	const start = /* @__PURE__ */ new Date(), end = new Date(start.getTime() + 480 * 6e4);
	return {
		operatorId: "",
		dutyRole: "primary_noc",
		startsAt: localInput(start),
		endsAt: localInput(end)
	};
}
function OnCallEscalation() {
	const [data, setData] = (0, import_react.useState)(null), [loading, setLoading] = (0, import_react.useState)(true), [working, setWorking] = (0, import_react.useState)(""), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)("");
	const [scheduleOpen, setScheduleOpen] = (0, import_react.useState)(false), [schedule, setSchedule] = (0, import_react.useState)(defaultSchedule), [selected, setSelected] = (0, import_react.useState)(null), [resolutionNote, setResolutionNote] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/on-call", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "On-call control is unavailable");
			setData(body);
			setSelected((current) => current ? body.escalations.find((item) => item.id === current.id) ?? null : null);
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "On-call control is unavailable");
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
	const dutyRows = (0, import_react.useMemo)(() => (data?.assignments ?? []).filter((item) => ["active", "scheduled"].includes(item.effectiveStatus)).sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)), [data]);
	const incidentCandidates = (0, import_react.useMemo)(() => (data?.incidents ?? []).filter((incident) => !incident.escalationActive), [data]);
	async function createAssignment(event) {
		event.preventDefault();
		setWorking("schedule");
		setError("");
		try {
			const response = await fetch("/api/platform/on-call", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "schedule",
					...schedule,
					startsAt: new Date(schedule.startsAt).toISOString(),
					endsAt: new Date(schedule.endsAt).toISOString()
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Duty assignment could not be scheduled");
			setScheduleOpen(false);
			setSchedule(defaultSchedule());
			setNotice("Duty assignment stored in the governed roster.");
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Duty assignment could not be scheduled");
		} finally {
			setWorking("");
		}
	}
	async function escalate(incidentId) {
		setWorking(`escalate-${incidentId}`);
		setError("");
		try {
			const response = await fetch("/api/platform/on-call", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "escalate",
					incidentId
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Escalation could not be created");
			setNotice(`${body.escalationNumber} created${body.assigned ? " and assigned to the active primary" : " without an active primary assignment"}.`);
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Escalation could not be created");
		} finally {
			setWorking("");
		}
	}
	async function transition(action) {
		if (!selected) return;
		setWorking(action);
		setError("");
		try {
			const response = await fetch("/api/platform/on-call", {
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					id: selected.id,
					action,
					note: resolutionNote
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Escalation action failed");
			setResolutionNote("");
			setNotice(action === "acknowledge" ? "Response ownership acknowledged." : "Escalation resolved with operator evidence.");
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Escalation action failed");
		} finally {
			setWorking("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "oncall-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "oncall-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "On-call roster & escalation control" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT RESPONSE-OWNERSHIP EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Accept duty coverage and response ownership only after strict timestamp, chronology, operator, incident and state validation." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "oncall-hero-actions",
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
						onClick: () => setScheduleOpen(true),
						disabled: !data,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), "Schedule duty"]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "On-call evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict in-app response evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future, malformed, contradictory or inactive-owner records are excluded. External calls, messages and network actions are not commissioned." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "oncall-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Primary responder" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? data.summary.currentPrimary?.operator?.displayName ?? "Unassigned" : "Evidence unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.currentPrimary ? `On duty until ${formatDate(data.summary.currentPrimary.endsAt)}` : data ? data.summary.ambiguousRoles.includes("primary_noc") ? "Ambiguous primary coverage rejected" : "No accepted primary window" : "Load an authenticated snapshot" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Critical acknowledgement" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `< ${data.policy.criticalAcknowledgementMinutes} min` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Measured from accepted escalation creation" : "Policy unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Acknowledged · 24h" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.acknowledgedLast24Hours ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Strict chronology required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unowned escalations" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.unownedEscalations ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.overdueEscalations} acknowledgement overdue` : "Escalation evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "oncall-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel roster-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT DUTY ROSTER · UPCOMING WINDOWS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted coverage windows" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `coverage ${!data ? "coverage-unavailable" : data.summary.coveredRoles === 4 ? "" : "coverage-gap"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), data ? `${data.summary.coveredRoles} of 4 roles covered` : "Coverage unavailable"]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "roster-list",
							children: dutyRows.map((assignment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: initials(assignment.operator?.displayName ?? "Operator") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: roleLabels[assignment.dutyRole] ?? assignment.dutyRole }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: assignment.operator?.displayName ?? "Unknown operator" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										formatDate(assignment.startsAt),
										" – ",
										formatDate(assignment.endsAt)
									] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
									className: `roster-${assignment.effectiveStatus}`,
									children: stateLabels[assignment.effectiveStatus] ?? assignment.effectiveStatus
								})
							] }, assignment.id))
						}),
						data && !loading && dutyRows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "oncall-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted duty windows" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Coverage remains unassigned until a valid window names an active operator without role ambiguity." })
							]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "oncall-empty oncall-unavailable",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Duty evidence unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated on-call snapshot before interpreting coverage." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Future limits, chronology, role uniqueness and active operators are enforced before coverage is counted."] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel policy-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "AUTHENTICATED TIMING POLICY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Escalation ladder" }),
						[
							[
								"1",
								data ? `Critical · ${data.policy.criticalAcknowledgementMinutes}-minute acknowledgement` : "Critical · policy unavailable",
								"Primary NOC owns the in-app acknowledgement."
							],
							[
								"2",
								data ? `Other incidents · ${data.policy.otherAcknowledgementMinutes}-minute acknowledgement` : "Other incidents · policy unavailable",
								"A registered operator records ownership and response."
							],
							[
								"3",
								data ? `Level ceiling · ${data.policy.maxEscalationLevel}` : "Level ceiling · policy unavailable",
								"Reassignment or field dispatch remains an operator action."
							]
						].map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "policy-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `policy-step step-${index}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: step[0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: step[1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: step[2] })] })]
							}), index < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "policy-line" })]
						}, step[0])),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "oncall-policy-guard",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "External notifications disabled" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "NOCX records the response path but does not place external calls." })] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel incident-candidates",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT INCIDENT INTAKE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted active incidents awaiting escalation" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Valid non-future incident chronology and no accepted active escalation are required." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? `${incidentCandidates.length} candidates` : "Unavailable" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: incidentCandidates.map((incident) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `esc-severity sev-${slug(incident.severity)}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), incident.severity]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incident.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							incident.id,
							" · ",
							incident.affectedCustomers,
							" affected customers · opened ",
							formatDate(incident.openedAt)
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							disabled: Boolean(working),
							onClick: () => void escalate(incident.id),
							children: working === `escalate-${incident.id}` ? "Creating…" : "Create escalation"
						})
					] }, incident.id)) }),
					data && !loading && incidentCandidates.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "oncall-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted incident candidate" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This means no eligible stored row is available; it does not establish network health or monitoring coverage." })
						]
					}),
					!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "oncall-empty oncall-unavailable",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Incident intake unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated snapshot before interpreting the incident queue." })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel escalation-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT RESPONSE EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted escalation register" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "State-specific chronology, linked incident evidence and external-notification safety are required." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? `${data.escalations.length} accepted records` : "Unavailable" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "escalation-table",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Severity" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Event" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Responder" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Raised" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Policy target" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "State" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data?.escalations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `esc-severity sev-${slug(item.incident?.severity ?? "warning")}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), item.incident?.severity ?? "unknown"]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.incident?.title ?? "Incident unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.escalationNumber,
								" · ",
								item.incidentId
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.assignedOperator?.displayName ?? "Unowned" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatDate(item.raisedAt) }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: item.overdue ? "target-overdue" : "",
								children: [
									item.targetMinutes,
									" minutes",
									item.overdue ? " · overdue" : ""
								]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `esc-state esc-${slug(item.state)}`,
								children: stateLabels[item.state] ?? item.state
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "row-action",
								onClick: () => {
									setSelected(item);
									setResolutionNote("");
								},
								"aria-label": `Open ${item.escalationNumber}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
							}) })
						] }, item.id)) })] })
					}),
					data && !loading && !data.escalations.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "oncall-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted escalation evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create a response record only from an accepted active incident with accountable ownership." })
						]
					}),
					!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "oncall-empty oncall-unavailable",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Escalation evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated snapshot before interpreting response state." })
						]
					})
				]
			}),
			scheduleOpen && data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "oncall-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					onClick: () => setScheduleOpen(false),
					"aria-label": "Close schedule form"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "oncall-drawer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "GOVERNED DUTY ASSIGNMENT" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Schedule coverage" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Overlapping assignments for the same role are rejected." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setScheduleOpen(false),
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "oncall-form",
							onSubmit: createAssignment,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Registered operator" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									required: true,
									value: schedule.operatorId,
									onChange: (event) => setSchedule({
										...schedule,
										operatorId: event.target.value
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select operator"
									}), data.operators.map((operator) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: operator.id,
										children: [
											operator.displayName,
											" · ",
											operator.email
										]
									}, operator.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Duty role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: schedule.dutyRole,
									onChange: (event) => setSchedule({
										...schedule,
										dutyRole: event.target.value
									}),
									children: Object.entries(roleLabels).map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value,
										children: label
									}, value))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Starts" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "datetime-local",
									required: true,
									value: schedule.startsAt,
									onChange: (event) => setSchedule({
										...schedule,
										startsAt: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ends" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "datetime-local",
									required: true,
									value: schedule.endsAt,
									onChange: (event) => setSchedule({
										...schedule,
										endsAt: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "secondary-button",
									onClick: () => setScheduleOpen(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "primary-button",
									disabled: working === "schedule",
									children: working === "schedule" ? "Scheduling…" : "Schedule duty"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-guard",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Roster only." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No external call, message, or device operation is triggered." })] })]
						})
					]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "oncall-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					onClick: () => setSelected(null),
					"aria-label": "Close"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "oncall-drawer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "ESCALATION EVIDENCE" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.incident?.title ?? selected.incidentId }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								selected.escalationNumber,
								" · level ",
								selected.level
							] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelected(null),
							"aria-label": "Close",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-call",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Assigned responder" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.assignedOperator?.displayName ?? "Unowned escalation" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
									stateLabels[selected.state] ?? selected.state,
									" · target ",
									selected.targetMinutes,
									" minutes"
								] })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recorded response path" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-event",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Escalation created" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								formatDate(selected.raisedAt),
								" by ",
								selected.raisedBy
							] })] })]
						}),
						selected.acknowledgedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-event",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Ownership acknowledged" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								formatDate(selected.acknowledgedAt),
								" by ",
								selected.acknowledgedBy
							] })] })]
						}),
						selected.state === "open" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary-button drawer-action",
							onClick: () => void transition("acknowledge"),
							disabled: Boolean(working),
							children: working === "acknowledge" ? "Saving…" : "Acknowledge response"
						}),
						["open", "acknowledged"].includes(selected.state) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "resolve-control",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Resolution evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								minLength: 8,
								value: resolutionNote,
								onChange: (event) => setResolutionNote(event.target.value),
								placeholder: "Describe the verified response or handoff…"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								onClick: () => void transition("resolve"),
								disabled: Boolean(working),
								children: working === "resolve" ? "Saving…" : "Resolve escalation"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-guard",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evidence is append-only." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "NOCX records the path but does not place external calls." })] })]
						})
					]
				})]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-toast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), notice]
			})
		]
	});
}
//#endregion
export { OnCallEscalation as default };
