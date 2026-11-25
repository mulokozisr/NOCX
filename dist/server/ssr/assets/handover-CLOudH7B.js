import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as UserCheck } from "./user-check-BKIWF-YP.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ClipboardCheck } from "./clipboard-check-nsDYafU-.js";
//#region node_modules/lucide-react/dist/esm/icons/message-square-text.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageSquareText = createLucideIcon("MessageSquareText", [
	["path", {
		d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
		key: "1lielz"
	}],
	["path", {
		d: "M13 8H7",
		key: "14i4kc"
	}],
	["path", {
		d: "M17 12H7",
		key: "16if0g"
	}]
]);
//#endregion
//#region app/handover.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/handover.tsx
var import_jsx_runtime = require_jsx_runtime();
var labels = {
	draft: "Draft",
	ready: "Ready for acceptance",
	accepted: "Accepted",
	open: "Open",
	monitoring: "Monitoring",
	acknowledged: "Acknowledged"
};
var cls = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function formatDate(value) {
	if (!value) return "—";
	return new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(new Date(value));
}
function ShiftHandover() {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [working, setWorking] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/handovers", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Shift handover is unavailable");
			setData(body);
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Shift handover is unavailable");
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
	const record = data?.active ?? data?.latest ?? null;
	const openItems = (0, import_react.useMemo)(() => record?.items.filter((item) => item.status === "open").length ?? 0, [record]);
	const criticalItems = (0, import_react.useMemo)(() => record?.items.filter((item) => item.priority === "critical").length ?? 0, [record]);
	async function prepare() {
		setWorking("prepare");
		setError("");
		try {
			const response = await fetch("/api/platform/handovers", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ action: "prepare" })
			});
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Handover could not be prepared");
			setNotice(`${body.handoverNumber} prepared from live evidence with ${body.itemCount ?? 0} carry-over items.`);
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Handover could not be prepared");
		} finally {
			setWorking("");
		}
	}
	async function transition(action) {
		if (!record) return;
		setWorking(action);
		setError("");
		try {
			const response = await fetch("/api/platform/handovers", {
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					id: record.id,
					action
				})
			});
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Handover action failed");
			setNotice(action === "ready" ? "Evidence package is ready for the incoming shift." : "Operational responsibility was accepted and audit-recorded.");
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Handover action failed");
		} finally {
			setWorking("");
		}
	}
	async function addNote(event) {
		event.preventDefault();
		if (!record) return;
		setWorking("note");
		setError("");
		try {
			const response = await fetch("/api/platform/handovers", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "note",
					handoverId: record.id,
					body: note
				})
			});
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Handover note could not be stored");
			setNote("");
			setNotice(body.noteType === "correction" ? "Correction appended without changing the accepted record." : "Handover note appended.");
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Handover note could not be stored");
		} finally {
			setWorking("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "handover-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "handover-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Shift handover & duty log" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT COLLECTOR-RISK SNAPSHOT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Freeze verified operational evidence, transfer accountable actions, and record independent acceptance without changing network devices." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "handover-hero-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), "Refresh"]
					}), !data?.active && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						onClick: () => void prepare(),
						disabled: Boolean(working),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { size: 15 }), working === "prepare" ? "Preparing…" : "Prepare handover"]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Handover evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict live evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Collector health requires a valid, non-future heartbeat no older than two minutes; stale, future, invalid or missing evidence becomes a risk." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "handover-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active incidents" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.posture.activeIncidents ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							data?.posture.criticalIncidents ?? 0,
							"critical · ",
							data?.posture.impactedCustomers ?? 0,
							"customers"
						] }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Governed changes" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.posture.activeChanges ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [data?.posture.approvedMaintenance ?? 0, "approved or in progress"] }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Collector risks" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.posture.collectorRisks ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							data?.posture.collectorsCurrent ?? 0,
							"/",
							data?.posture.collectorsTotal ?? 0,
							"collectors current"
						] }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Handover state" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: record ? labels[record.status] : "Not prepared" }),
						valueClassName: "handover-state-value",
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: record ? record.handoverNumber : "Prepare from current evidence" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "handover-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel handover-brief",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "OUTGOING SHIFT SUMMARY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: record ? record.handoverNumber : "No evidence package prepared" })] }), record && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `handover-state state-${record.status}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), labels[record.status]]
					})] }), record ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "handover-briefing",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Operating posture:" }),
								" ",
								record.summary
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Carry-over scope:" }),
								" ",
								record.items.length,
								" linked items; ",
								criticalItems,
								" critical and ",
								openItems,
								" open."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evidence cutoff:" }),
								" Customer impact, incident state, changes and collector health are preserved as they were at ",
								formatDate(record.evidenceAsOf),
								"."
							] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { size: 15 }),
						"Prepared by ",
						record.outgoingOperator
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 15 }),
						"Evidence frozen ",
						formatDate(record.evidenceAsOf)
					] })] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "handover-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { size: 26 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No handover in progress" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Prepare the first package from verified production evidence when the outgoing shift is ready." })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel handover-accept",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "INCOMING SHIFT CONTROL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accept operational responsibility" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Acceptance records who received the risks, actions and escalation obligations for this shift. The outgoing operator cannot accept their own package." }),
						record && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "handover-parties",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "OUT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								record.outgoingOperator,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Outgoing operator"
							] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "IN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								record.incomingOperator ?? "Independent operator required",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Incoming operator"
							] })] })]
						}),
						record?.status === "draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							onClick: () => void transition("ready"),
							disabled: Boolean(working),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { size: 15 }), working === "ready" ? "Saving…" : "Mark evidence ready"]
						}),
						record?.status === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							onClick: () => void transition("accept"),
							disabled: Boolean(working),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { size: 15 }), working === "accept" ? "Accepting…" : "Review and accept handover"]
						}),
						record?.status === "accepted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "handover-accepted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Responsibility accepted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								record.incomingOperator,
								" · ",
								formatDate(record.acceptedAt)
							] })] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel handover-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "CARRY-OVER REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Risks and accountable actions" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every generated item remains linked to its source incident, governed change or collector record." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [record?.items.length ?? 0, " evidence-linked records"] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "handover-table",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Priority" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Carry-over item" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Source evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Owner" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Due" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: record?.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `handover-priority priority-${cls(item.priority)}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), item.priority]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.detail })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", { children: [
								item.sourceType,
								":",
								item.sourceId ?? "unassigned"
							] }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.owner }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.dueAt ? formatDate(item.dueAt) : "Continuous" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `handover-status status-${cls(item.status)}`,
								children: labels[item.status] ?? item.status
							}) })
						] }, item.id)) })] })
					}),
					record && record.items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "handover-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Clean handover" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No active incident, governed change or collector risk required carry-over at the evidence cutoff." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Accepted handovers are immutable; corrections are appended as new, time-stamped notes."] })
				]
			}),
			record && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel handover-notes",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "APPEND-ONLY DUTY LOG"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Operator notes and acceptance history" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [record.notes.length, " entries"] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "handover-note-list",
						children: record.notes.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: entry.noteType.replaceAll("_", " ") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: entry.body }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								entry.authorEmail,
								" · ",
								formatDate(entry.createdAt)
							] })
						] })] }, entry.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: addNote,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							minLength: 8,
							maxLength: 1600,
							value: note,
							onChange: (event) => setNote(event.target.value),
							placeholder: record.status === "accepted" ? "Append a correction or follow-up note…" : "Add operational context for the incoming shift…"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							disabled: working === "note",
							children: working === "note" ? "Saving…" : "Append note"
						})]
					})
				]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-toast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), notice]
			})
		]
	});
}
//#endregion
export { ShiftHandover as default };
