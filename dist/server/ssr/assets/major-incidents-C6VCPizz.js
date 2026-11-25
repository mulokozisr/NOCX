import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, o as Radio, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { t as Link2 } from "./link-2-DD83a-mv.js";
//#region node_modules/lucide-react/dist/esm/icons/command.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Command = createLucideIcon("Command", [["path", {
	d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",
	key: "11bfej"
}]]);
//#endregion
//#region app/major-incidents.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/major-incidents.tsx
var import_jsx_runtime = require_jsx_runtime();
function when(value) {
	if (!value) return "Not scheduled";
	const time = Date.parse(value), delta = time - Date.now(), absolute = Math.abs(delta);
	if (!Number.isFinite(time)) return "Unknown time";
	if (absolute < 6e4) return delta >= 0 ? "due now" : "overdue now";
	const minutes = Math.round(absolute / 6e4);
	if (minutes < 60) return delta >= 0 ? `in ${minutes} min` : `${minutes} min overdue`;
	return new Date(value).toLocaleString();
}
function label(value) {
	return value.replaceAll("_", " ").replace(/\b\w/g, (match) => match.toUpperCase());
}
function MajorIncidentCommand() {
	const [data, setData] = (0, import_react.useState)(null), [selectedId, setSelectedId] = (0, import_react.useState)(""), [query, setQuery] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)(""), [showIntake, setShowIntake] = (0, import_react.useState)(false), [busy, setBusy] = (0, import_react.useState)(false);
	const [eventType, setEventType] = (0, import_react.useState)("status_update"), [eventBody, setEventBody] = (0, import_react.useState)(""), [closureEvidence, setClosureEvidence] = (0, import_react.useState)("");
	const [form, setForm] = (0, import_react.useState)({
		incidentId: "",
		severity: "SEV-2",
		objective: "",
		updateCadenceMinutes: "30",
		commanderEmail: "",
		technicalLeadEmail: "",
		communicationsLeadEmail: ""
	});
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/major-incidents", { cache: "no-store" });
			const payload = await response.json();
			if (!response.ok) throw new Error(payload.error ?? "Major-incident evidence is unavailable");
			setData(payload);
			setSelectedId((current) => current && payload.records.some((row) => row.id === current) ? current : payload.records[0]?.id ?? "");
			setForm((current) => ({
				...current,
				incidentId: current.incidentId || payload.candidates[0]?.id || "",
				commanderEmail: current.commanderEmail || payload.operators[0]?.email || "",
				technicalLeadEmail: current.technicalLeadEmail || payload.operators[1]?.email || "",
				communicationsLeadEmail: current.communicationsLeadEmail || payload.operators[2]?.email || ""
			}));
		} catch (caught) {
			setData(null);
			setSelectedId("");
			setError(caught instanceof Error ? caught.message : "Major-incident evidence is unavailable");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(timer);
	}, [load]);
	const filtered = (0, import_react.useMemo)(() => (data?.records ?? []).filter((row) => `${row.majorNumber} ${row.incident?.title ?? ""} ${row.commanderEmail}`.toLowerCase().includes(query.toLowerCase())), [data, query]);
	const selected = (data?.records ?? []).find((row) => row.id === selectedId) ?? null;
	const selectedRoles = selected ? [
		selected.commanderEmail,
		selected.technicalLeadEmail,
		selected.communicationsLeadEmail
	].map((email) => email.toLowerCase()) : [];
	const viewerEmail = data?.viewer.email.toLowerCase() ?? "", viewerIsAssigned = selectedRoles.includes(viewerEmail), viewerIsCommander = selectedRoles[0] === viewerEmail, viewerCanClose = Boolean(selected && data && !viewerIsAssigned);
	const announce = (message) => {
		setNotice(message);
		window.setTimeout(() => setNotice(""), 3200);
	};
	const mutate = async (method, body, success) => {
		setBusy(true);
		setError("");
		try {
			const response = await fetch("/api/platform/major-incidents", {
				method,
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			});
			const payload = await response.json();
			if (!response.ok) throw new Error(payload.error ?? "Major-incident action failed");
			announce(success);
			await load();
			return true;
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Major-incident action failed");
			return false;
		} finally {
			setBusy(false);
		}
	};
	const declare = async () => {
		if (await mutate("POST", {
			action: "declare",
			...form,
			updateCadenceMinutes: Number(form.updateCadenceMinutes)
		}, "Major incident declared from verified production evidence.")) {
			setShowIntake(false);
			setForm((current) => ({
				...current,
				objective: ""
			}));
		}
	};
	const addEvent = async () => {
		if (!selected) return;
		if (await mutate("PATCH", {
			action: "add_event",
			id: selected.id,
			eventType,
			body: eventBody
		}, eventType === "decision" ? "Decision appended to the immutable command log." : "Status update appended to the immutable command log.")) setEventBody("");
	};
	const updates = selected?.events.filter((row) => row.eventType === "status_update" || row.eventType === "declared" || row.eventType === "status_changed" || row.eventType === "closed") ?? [];
	const decisions = selected?.events.filter((row) => row.eventType === "decision" || row.eventType === "role_transferred") ?? [];
	const canDeclare = (data?.operators.length ?? 0) >= 3 && Boolean(form.incidentId && form.objective.trim().length >= 20 && new Set([
		form.commanderEmail,
		form.technicalLeadEmail,
		form.communicationsLeadEmail
	]).size === 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "major-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "major-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Command only accepted production incidents" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT MAJOR-INCIDENT EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Declare from strict unresolved incident chronology, preserve active distinct roles and ordered events, then require a strict approved review and written independent closure evidence." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "major-hero-actions",
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
						onClick: () => setShowIntake(true),
						disabled: !data?.candidates.length,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { size: 15 }), "Declare from incident"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip major-boundary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict accepted command evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future, malformed, unsupported, inactive-role, out-of-order or unverified incident, impact, review, event and closure records are excluded." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "major-error",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setError(""),
						"aria-label": "Dismiss error",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "major-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active accepted records" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.active ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Strict records only" : "Command evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Impacted services" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.impactedServices ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted impact links" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Overdue updates" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.overdueUpdates ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted event chronology" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Eligible incidents" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.eligibleCandidates ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Strict unresolved Critical / High" }) })
					})
				]
			}),
			showIntake && data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel major-intake",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT PRODUCTION INCIDENT INTAKE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Declare an evidence-backed command record" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Three different active operators and strict unresolved incident chronology are required." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "icon-button",
						onClick: () => setShowIntake(false),
						"aria-label": "Close declaration form",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "major-form-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Accepted source incident", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.incidentId,
								onChange: (event) => setForm({
									...form,
									incidentId: event.target.value
								}),
								children: data.candidates.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: row.id,
									children: [
										row.id,
										" · ",
										row.title,
										" · ",
										row.severity
									]
								}, row.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Command severity", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.severity,
								onChange: (event) => setForm({
									...form,
									severity: event.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "SEV-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "SEV-2" })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Approved update cadence", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.updateCadenceMinutes,
								onChange: (event) => setForm({
									...form,
									updateCadenceMinutes: event.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "10",
										children: "10 minutes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "15",
										children: "15 minutes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "20",
										children: "20 minutes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "30",
										children: "30 minutes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "45",
										children: "45 minutes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "60",
										children: "60 minutes"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Incident commander", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.commanderEmail,
								onChange: (event) => setForm({
									...form,
									commanderEmail: event.target.value
								}),
								children: data.operators.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: row.email,
									children: [
										row.displayName,
										" · ",
										row.email
									]
								}, row.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Technical lead", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.technicalLeadEmail,
								onChange: (event) => setForm({
									...form,
									technicalLeadEmail: event.target.value
								}),
								children: data.operators.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: row.email,
									children: [
										row.displayName,
										" · ",
										row.email
									]
								}, row.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Communications lead", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.communicationsLeadEmail,
								onChange: (event) => setForm({
									...form,
									communicationsLeadEmail: event.target.value
								}),
								children: data.operators.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: row.email,
									children: [
										row.displayName,
										" · ",
										row.email
									]
								}, row.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "major-objective",
								children: ["Current objective", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: form.objective,
									onChange: (event) => setForm({
										...form,
										objective: event.target.value
									}),
									placeholder: "State the bounded restoration and customer-protection objective…"
								})]
							})
						]
					}),
					data.operators.length < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "major-form-warning",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 14 }), "At least three active registered operators are required before declaration."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "major-form-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							onClick: () => setShowIntake(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: !canDeclare || busy,
							onClick: () => void declare(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { size: 14 }), busy ? "Declaring…" : "Declare command record"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "major-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel major-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT COMMAND REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted major-incident records" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every displayed record retains strict incident, role, event, state and closure chronology." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search accepted records…",
						"aria-label": "Search accepted major incidents"
					})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "major-list",
						children: [
							filtered.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === row.id ? "active" : "",
								onClick: () => {
									setSelectedId(row.id);
									setClosureEvidence("");
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `major-severity ${row.severity.toLowerCase()}`,
										children: row.severity
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											row.majorNumber,
											" · ",
											label(row.status)
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.incident?.title ?? row.incidentId }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											row.impactedServices,
											" accepted impacted services · declared ",
											when(row.declaredAt)
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
								]
							}, row.id)),
							data && !loading && !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "major-empty",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { size: 24 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted command records" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query ? "No accepted command record matches the current search." : "Declare only from an eligible strict unresolved production incident." })
								]
							}),
							!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "major-empty major-unavailable",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Command register unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated command snapshot before interpreting major-incident state." })
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel major-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "SELECTED STRICT COMMAND RECORD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.incident?.title ?? selected.incidentId }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.majorNumber,
								" · ",
								selected.severity,
								" · ",
								label(selected.status)
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "command-roles",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Incident commander" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.commanderEmail })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Technical lead" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.technicalLeadEmail })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Communications lead" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.communicationsLeadEmail })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Current objective" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.objective })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: `major-deadline ${selected.updateOverdue ? "overdue" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Next accepted evidence update" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								when(selected.nextUpdateAt),
								" · ",
								selected.updateCadenceMinutes,
								"-minute cadence"
							] })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "major-columns",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { size: 14 }), "Strict status timeline"] }),
								updates.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: new Date(row.createdAt).toLocaleString() }),
									row.body,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: row.actorEmail })
								] }, row.id)),
								!updates.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No accepted status update has been recorded." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 14 }), "Accepted decision log"] }),
								decisions.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: new Date(row.createdAt).toLocaleString() }),
									row.body,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: row.actorEmail })
								] }, row.id)),
								!decisions.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No accepted decision has been recorded." })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "major-links",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Strict linked evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { size: 12 }), selected.incidentId] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 12 }),
									selected.impactedServices,
									" services"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 12 }), selected.approvedReview?.reviewNumber ?? "Strict review not approved"] })
							] })]
						}),
						selected.status !== "closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "major-event-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: eventType,
									onChange: (event) => setEventType(event.target.value),
									"aria-label": "Command event type",
									disabled: !viewerIsAssigned,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "status_update",
										children: "Status update"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "decision",
										children: "Decision"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: eventBody,
									onChange: (event) => setEventBody(event.target.value),
									placeholder: "Record accepted evidence or a command decision…",
									"aria-label": "Command event detail",
									disabled: !viewerIsAssigned
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "primary-button",
									disabled: busy || !viewerIsAssigned || eventBody.trim().length < 12,
									onClick: () => void addEvent(),
									children: "Append to strict log"
								})
							]
						}),
						selected.status === "monitoring" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "major-closure-evidence",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explicit independent closure evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								minLength: 20,
								value: closureEvidence,
								onChange: (event) => setClosureEvidence(event.target.value),
								placeholder: "Describe the resolved incident, accepted post-resolution update and approved review evidence…",
								disabled: !viewerCanClose
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "major-detail-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "secondary-button",
								disabled: busy || !viewerIsCommander || selected.status !== "declared",
								onClick: () => void mutate("PATCH", {
									action: "set_status",
									id: selected.id,
									status: "monitoring"
								}, "Major incident moved forward to monitoring."),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 14 }), "Begin monitoring"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary-button",
								disabled: busy || selected.status !== "monitoring" || !viewerCanClose || closureEvidence.trim().length < 20,
								onClick: () => void mutate("PATCH", {
									action: "close",
									id: selected.id,
									closureEvidence
								}, "Major incident closed after explicit independent evidence verification."),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Verify closure"]
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `major-empty major-detail-empty ${data ? "" : "major-unavailable"}`,
						children: [
							data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 28 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 28 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "No accepted command record selected" : "Command evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? "Accepted production incident candidates and command records will appear here." : "Load an authenticated command snapshot before interpreting state or closure." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel major-governance",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "STRICT COMMAND SAFEGUARDS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Chronology-controlled declaration, monitoring and closure" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Declaration starts only from strict unresolved Critical or High production-incident chronology."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Distinct active operators own command, technical and communication duties."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Closure requires monitoring, strict resolution and review evidence, a post-resolution update, written evidence and an outside verifier."] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "External messages and network actions remain disabled." }),
						" Accepted command events preserve evidence but never send email, SMS, WhatsApp, Slack or device instructions."
					] })
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
export { MajorIncidentCommand as default };
