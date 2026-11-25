import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck } from "./network-CaMqMjRB.js";
import { a as Wrench, d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { t as Link2 } from "./link-2-DD83a-mv.js";
import { t as CircleDot } from "./circle-dot-BELXb-XR.js";
import { t as Target } from "./target-DhNgcuPf.js";
//#region app/problems.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/problems.tsx
var import_jsx_runtime = require_jsx_runtime();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function formatDate(value) {
	if (!value) return "—";
	return new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(new Date(value));
}
function draftFrom(problem) {
	return problem ? {
		suspectedCause: problem.suspectedCause,
		rootCause: problem.rootCause,
		workaround: problem.workaround,
		permanentFix: problem.permanentFix
	} : {
		suspectedCause: "",
		rootCause: "",
		workaround: "",
		permanentFix: ""
	};
}
function ProblemManagement() {
	const [data, setData] = (0, import_react.useState)(null), [selected, setSelected] = (0, import_react.useState)(null), [loading, setLoading] = (0, import_react.useState)(true), [working, setWorking] = (0, import_react.useState)(""), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)(""), [query, setQuery] = (0, import_react.useState)("");
	const [showCreate, setShowCreate] = (0, import_react.useState)(false), [createDraft, setCreateDraft] = (0, import_react.useState)({
		title: "",
		domain: "",
		priority: "high",
		incidentIds: []
	});
	const [analysis, setAnalysis] = (0, import_react.useState)(draftFrom(null)), [symptom, setSymptom] = (0, import_react.useState)(""), [closureEvidence, setClosureEvidence] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/problems", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Problem records are unavailable");
			setData(body);
			setSelected((current) => {
				const next = current ? body.problems.find((item) => item.id === current.id) ?? body.problems[0] ?? null : body.problems[0] ?? null;
				if (!quiet) setAnalysis(draftFrom(next));
				return next;
			});
			setError("");
		} catch (reason) {
			setData(null);
			setSelected(null);
			setError(reason instanceof Error ? reason.message : "Problem records are unavailable");
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
	const filtered = (0, import_react.useMemo)(() => (data?.problems ?? []).filter((problem) => `${problem.problemNumber} ${problem.title} ${problem.domain} ${problem.ownerEmail}`.toLowerCase().includes(query.toLowerCase())), [data, query]);
	const closureWindowMature = selected?.status === "observation" && selected.observationMaturesAt && data?.checkedAt ? Date.parse(data.checkedAt) >= Date.parse(selected.observationMaturesAt) : false;
	function choose(problem) {
		setSelected(problem);
		setAnalysis(draftFrom(problem));
		setSymptom("");
		setClosureEvidence("");
	}
	function toggleIncident(id) {
		setCreateDraft((current) => ({
			...current,
			incidentIds: current.incidentIds.includes(id) ? current.incidentIds.filter((item) => item !== id) : [...current.incidentIds, id]
		}));
	}
	async function request(method, body, key, success) {
		setWorking(key);
		setError("");
		try {
			const response = await fetch("/api/platform/problems", {
				method,
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			}), payload = await response.json();
			if (!response.ok) throw new Error(payload.error || "Problem action failed");
			setNotice(success);
			window.setTimeout(() => setNotice(""), 3200);
			await load(true);
			return true;
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Problem action failed");
			return false;
		} finally {
			setWorking("");
		}
	}
	async function openProblem(event) {
		event.preventDefault();
		if (await request("POST", createDraft, "create", "Problem opened from production incident evidence.")) {
			setShowCreate(false);
			setCreateDraft({
				title: "",
				domain: "",
				priority: "high",
				incidentIds: []
			});
		}
	}
	async function act(action, extras = {}) {
		if (!selected) return;
		await request("PATCH", {
			id: selected.id,
			action,
			...extras
		}, action, action === "save_analysis" ? "Investigation evidence saved." : action === "publish_known_error" ? "Known-error guidance independently approved." : action === "start_observation" ? "Seven-day recurrence observation started." : "Problem closure independently verified from explicit evidence.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "problem-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "problem-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Recurring faults & known errors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT RECURRENCE-EVIDENCE CONTROL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Accept recurrence, guidance, observation and closure claims only from strict incident chronology, registered ownership, independent publication and explicit closure evidence." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "problem-hero-actions",
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
						onClick: () => setShowCreate((value) => !value),
						disabled: !data,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), "Open problem"]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Problem evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict recurrence evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future, malformed, unsupported or inactive-owner incident, link, known-error and closure records are excluded. External publishing and network writes remain disabled." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			showCreate && data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel problem-create",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "STRICT RECURRENCE INTAKE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Open an evidence-backed problem" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Select at least two distinct incidents with accepted non-future chronology." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary-button",
					onClick: () => setShowCreate(false),
					children: "Cancel"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: openProblem,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Problem title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							minLength: 12,
							value: createDraft.title,
							onChange: (event) => setCreateDraft({
								...createDraft,
								title: event.target.value
							}),
							placeholder: "Describe the recurring operational fault…"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Domain" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							minLength: 3,
							value: createDraft.domain,
							onChange: (event) => setCreateDraft({
								...createDraft,
								domain: event.target.value
							}),
							placeholder: "Wireless, power, access, platform…"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Priority" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: createDraft.priority,
							onChange: (event) => setCreateDraft({
								...createDraft,
								priority: event.target.value
							}),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "critical",
									children: "Critical"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "high",
									children: "High"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "medium",
									children: "Medium"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [
								"Accepted incident evidence · ",
								createDraft.incidentIds.length,
								" selected"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: data.incidents.map((incident) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "problem-incident-option",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: createDraft.incidentIds.includes(incident.id),
									onChange: () => toggleIncident(incident.id)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incident.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									incident.id,
									" · ",
									incident.status,
									" · ",
									incident.affectedCustomers,
									" customers"
								] })] })]
							}, incident.id)) }),
							!loading && !data.incidents.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No accepted production incident is available." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: working === "create" || createDraft.incidentIds.length < 2,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { size: 15 }), working === "create" ? "Opening…" : "Open governed problem"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "problem-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Open accepted problems" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.openProblems ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.criticalProblems} critical priority` : "Problem evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted incident links" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.acceptedIncidentLinks ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Strict chronology required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Published known errors" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.publishedKnownErrors ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Independent approval required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Under observation" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.observationProblems ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Exact 7-day evidence window" : "Observation evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "problem-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel problem-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STRICT PROBLEM REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted production recurrence records" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every displayed record retains strict incident links, active ownership, state chronology and supporting publication or closure evidence." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search accepted problems…",
							"aria-label": "Search accepted problems"
						})] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "problem-list",
							children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === item.id ? "active" : "",
								onClick: () => choose(item),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `problem-icon problem-${slug(item.priority)}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											item.problemNumber,
											" · ",
											item.domain
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											item.incidents.length,
											" accepted incidents · ",
											item.ownerEmail
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
										className: `problem-state state-${slug(item.status)}`,
										children: item.status.replaceAll("_", " ")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
								]
							}, item.id))
						}),
						data && !loading && !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "problem-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { size: 25 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted production problem" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query ? "No accepted problem matches this search." : "Open one only when at least two strict incident records demonstrate recurrence." })
							]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "problem-empty problem-unavailable",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 25 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Problem register unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated problem snapshot before interpreting recurrence state." })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel problem-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "SELECTED ACCEPTED PROBLEM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.problemNumber,
								" · owned by ",
								selected.ownerEmail
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "problem-impact",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Accepted incidents" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.incidents.length })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Customer exposure" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.customerExposure })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Active incidents" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.activeIncidents })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "problem-analysis-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Suspected cause" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									minLength: 12,
									value: analysis.suspectedCause,
									onChange: (event) => setAnalysis({
										...analysis,
										suspectedCause: event.target.value
									}),
									disabled: selected.status !== "investigating"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Validated root cause" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: analysis.rootCause,
									onChange: (event) => setAnalysis({
										...analysis,
										rootCause: event.target.value
									}),
									disabled: selected.status !== "investigating"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Safe operator workaround" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: analysis.workaround,
									onChange: (event) => setAnalysis({
										...analysis,
										workaround: event.target.value
									}),
									disabled: selected.status !== "investigating"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Permanent fix and verification" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: analysis.permanentFix,
									onChange: (event) => setAnalysis({
										...analysis,
										permanentFix: event.target.value
									}),
									disabled: selected.status !== "investigating"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									onClick: () => void act("save_analysis", analysis),
									disabled: Boolean(working) || selected.status !== "investigating",
									children: "Save investigation"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "problem-linked",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Strict linked incident evidence" }), selected.incidents.map((incident) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { size: 12 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: incident.id }),
								incident.title,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: incident.status })
							] }, incident.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "problem-governed-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Controlled lifecycle" }), selected.status !== "closed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Recognition symptom for independently approved known-error guidance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: symptom,
									onChange: (event) => setSymptom(event.target.value),
									placeholder: "What operators will observe…",
									disabled: selected.status !== "investigating"
								})] }),
								selected.status === "observation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explicit recurrence-observation closure evidence" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Earliest independent verification: ", formatDate(selected.observationMaturesAt)] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										minLength: 20,
										value: closureEvidence,
										onChange: (event) => setClosureEvidence(event.target.value),
										placeholder: `Describe evidence collected through ${formatDate(selected.observationMaturesAt)}…`
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "secondary-button",
										onClick: () => void act("publish_known_error", { symptom }),
										disabled: Boolean(working) || selected.status !== "investigating" || Boolean(selected.knownErrors.find((item) => item.status === "published")),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 14 }), "Approve known error"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "secondary-button",
										onClick: () => void act("start_observation"),
										disabled: Boolean(working) || !["investigating", "known_error"].includes(selected.status),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 14 }), "Start observation"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "primary-button",
										onClick: () => void act("close_problem", { closureEvidence }),
										disabled: Boolean(working) || !closureWindowMature || closureEvidence.trim().length < 20,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), "Verify closure"]
									})
								] })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "problem-safety",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Guidance is never executed automatically." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Publication and closure require active independent operators, strict chronology and explicit evidence; external publishing and network writes remain disabled." })] })]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `problem-empty ${data ? "" : "problem-unavailable"}`,
						children: [
							data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { size: 25 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Select an accepted problem" : "Problem evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? "Evidence, guidance and lifecycle controls will appear here." : "Load an authenticated problem snapshot before interpreting recurrence or closure." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel known-error-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT KNOWN-ERROR REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted recognition & restoration guidance" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only strict, independently published records are visible; external publication remains disabled." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? `${data.knownErrors.length} active` : "Unavailable" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "known-error-table",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Known error" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Linked problem" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Recognition symptom" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Approved workaround" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Approved by" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data?.knownErrors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.knownErrorNumber }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { size: 12 }), data.problems.find((problem) => problem.id === item.problemId)?.problemNumber ?? item.problemId] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.symptom }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.workaround }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [item.publishedBy, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: formatDate(item.publishedAt) })] })
						] }, item.id)) })] })
					}),
					data && !loading && !data.knownErrors.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "problem-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted known-error guidance" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Guidance appears only after independent review of strict stored root-cause evidence." })
						]
					}),
					!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "problem-empty problem-unavailable",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Known-error evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated problem snapshot before interpreting operator guidance." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), "Closure requires strict resolved incidents, the exact seven-day observation window, explicit recurrence evidence and an independent verifier."] })
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
export { ProblemManagement as default };
