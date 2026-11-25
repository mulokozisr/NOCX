import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, r as Activity, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as BrainCircuit } from "./brain-circuit-DtP_ODe2.js";
import { t as GitBranch } from "./git-branch-BS9K82eP.js";
//#region node_modules/lucide-react/dist/esm/icons/file-search.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FileSearch = createLucideIcon("FileSearch", [
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3",
		key: "ms7g94"
	}],
	["path", {
		d: "m9 18-1.5-1.5",
		key: "1j6qii"
	}],
	["circle", {
		cx: "5",
		cy: "14",
		r: "3",
		key: "ufru5t"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/message-square.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var MessageSquare = createLucideIcon("MessageSquare", [["path", {
	d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
	key: "1lielz"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/send.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Send = createLucideIcon("Send", [["path", {
	d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
	key: "1ffxy3"
}], ["path", {
	d: "m21.854 2.147-10.94 10.939",
	key: "12cjpa"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/terminal.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Terminal = createLucideIcon("Terminal", [["polyline", {
	points: "4 17 10 11 4 5",
	key: "akl6gq"
}], ["line", {
	x1: "12",
	x2: "20",
	y1: "19",
	y2: "19",
	key: "q2wloq"
}]]);
//#endregion
//#region app/copilot-live.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/copilot.tsx
var import_jsx_runtime = require_jsx_runtime();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
var display = (value) => value.replaceAll("_", " ");
var time = (value) => value ? new Intl.DateTimeFormat(void 0, {
	dateStyle: "medium",
	timeStyle: "short",
	timeZone: "Africa/Dar_es_Salaam"
}).format(new Date(value)) : "Not recorded";
function acceptedSnapshotTime(value) {
	const timestamp = Date.parse(value), now = Date.now();
	return Number.isFinite(timestamp) && timestamp <= now ? timestamp : null;
}
function startingMessage(item) {
	return `${item.incident.id} has ${item.signalCount} preserved signals, ${item.impactedServices.length} linked service-impact records and ${item.roots.length} approved dependency candidates. No diagnosis probability or confirmed root cause has been generated.`;
}
function responseFor(input, item, published) {
	const normalized = input.toLowerCase();
	if (normalized.includes("customer") || normalized.includes("impact")) return `The incident record reports ${item.incident.affectedCustomers} affected customers. ${item.impactedServices.length} service-impact records are linked to this case. NOCX does not infer additional impact beyond those stored records.`;
	if (normalized.includes("cause") || normalized.includes("why") || normalized.includes("evidence")) return `${item.signalCount} preserved signals span ${item.evidenceKinds.length} evidence kinds. The dependency model currently shows “${item.candidateRoot}” as a review candidate, not a confirmed cause. No confidence percentage is calculated.`;
	if (normalized.includes("knowledge") || normalized.includes("runbook") || normalized.includes("procedure")) return `${published.length} independently published knowledge articles are available. NOCX has not automatically matched an article to ${item.incident.id}; an operator must inspect source scope and applicability before use.`;
	if (normalized.includes("action") || normalized.includes("next") || normalized.includes("review")) return `Review the ${item.signalCount} source signals, verify the ${item.roots.length} approved dependency candidates, and record any confirmed root cause through the governed post-incident review. This assistant cannot execute or stage network changes.`;
	return `${item.incident.id} is ${display(item.state)} with ${display(item.evidenceLevel)} evidence. Ask about stored evidence, customer impact, published knowledge or the next review step.`;
}
function SeverityBadge({ severity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `copilot-severity copilot-${slug(severity)}`,
		children: severity
	});
}
function NocCopilot() {
	const [tab, setTab] = (0, import_react.useState)("Live evidence");
	const [correlation, setCorrelation] = (0, import_react.useState)(null);
	const [reviews, setReviews] = (0, import_react.useState)(null);
	const [knowledge, setKnowledge] = (0, import_react.useState)(null);
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [knowledgeQuery, setKnowledgeQuery] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [conversationCaseId, setConversationCaseId] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const responses = await Promise.all([
				fetch("/api/platform/correlation", { cache: "no-store" }),
				fetch("/api/platform/reviews", { cache: "no-store" }),
				fetch("/api/platform/knowledge", { cache: "no-store" })
			]);
			const bodies = await Promise.all(responses.map((response) => response.json()));
			const failure = responses.findIndex((response) => !response.ok);
			if (failure >= 0) throw new Error(bodies[failure].error || "Operational evidence is unavailable");
			const snapshotTimes = bodies.map((body) => acceptedSnapshotTime(body.checkedAt));
			if (snapshotTimes.some((timestamp) => timestamp === null) || Math.max(...snapshotTimes) - Math.min(...snapshotTimes) > 5e3) throw new Error("Copilot evidence sources are not chronologically coherent");
			setCorrelation(bodies[0]);
			setReviews(bodies[1]);
			setKnowledge(bodies[2]);
			setSelectedId((current) => bodies[0].cases.some((item) => item.id === current) ? current : bodies[0].cases.find((item) => item.incident.status !== "resolved")?.id ?? bodies[0].cases[0]?.id ?? "");
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Operational evidence is unavailable");
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
	const cases = (0, import_react.useMemo)(() => (correlation?.cases ?? []).filter((item) => item.incident.status !== "resolved"), [correlation]);
	const selected = (0, import_react.useMemo)(() => cases.find((item) => item.id === selectedId) ?? cases[0] ?? null, [cases, selectedId]);
	const approvedReviews = (0, import_react.useMemo)(() => (reviews?.reviews ?? []).filter((item) => item.status === "approved"), [reviews]);
	const published = (0, import_react.useMemo)(() => (knowledge?.articles ?? []).filter((item) => item.status === "published"), [knowledge]);
	const filteredReviews = (0, import_react.useMemo)(() => approvedReviews.filter((item) => `${item.reviewNumber} ${item.incidentId} ${item.title} ${item.rootCause}`.toLowerCase().includes(query.toLowerCase())), [approvedReviews, query]);
	const filteredKnowledge = (0, import_react.useMemo)(() => published.filter((item) => `${item.articleNumber} ${item.title} ${item.category} ${item.current?.summary ?? ""}`.toLowerCase().includes(knowledgeQuery.toLowerCase())), [published, knowledgeQuery]);
	const notify = (text) => {
		setNotice(text);
		window.setTimeout(() => setNotice(""), 2800);
	};
	const visibleMessages = selected ? conversationCaseId === selected.id && messages.length ? messages : [{
		id: 1,
		role: "copilot",
		text: startingMessage(selected)
	}] : [];
	const choose = (item) => {
		setSelectedId(item.id);
		setConversationCaseId(item.id);
		setMessages([{
			id: 1,
			role: "copilot",
			text: startingMessage(item)
		}]);
		setMessage("");
	};
	const sendMessage = (text = message) => {
		const clean = text.trim();
		if (!clean || !selected) return;
		setConversationCaseId(selected.id);
		setMessages((items) => {
			const base = conversationCaseId === selected.id && items.length ? items : [{
				id: 1,
				role: "copilot",
				text: startingMessage(selected)
			}];
			const id = base.length + 1;
			return [
				...base,
				{
					id,
					role: "operator",
					text: clean
				},
				{
					id: id + 1,
					role: "copilot",
					text: responseFor(clean, selected, published)
				}
			];
		});
		setMessage("");
	};
	const changeTab = (next) => {
		setTab(next);
		setQuery("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "copilot-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "copilot-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "NOC Copilot & evidence review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "COHERENT MULTI-SOURCE EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Summarize stored incident, service-impact, dependency, review and knowledge evidence without inventing diagnoses, confidence scores or operational outcomes." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "copilot-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "copilot-model-status",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), "Read-only evidence"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), loading ? "Refreshing…" : "Refresh evidence"]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Copilot evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip copilot-boundary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Chronologically coherent production evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Correlation, review and knowledge snapshots must be valid, non-future and within five seconds of one another. No fictional incidents, probable causes, confidence percentages, time savings, recommended changes or analysis-usage counts are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "Atomic display gate"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "copilot-summary nocx-summary-grid",
				"aria-label": "Copilot evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => changeTab("Live evidence"),
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active evidence cases" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: correlation?.summary.activeCases ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Persistent incidents only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => changeTab("Live evidence"),
						tone: "green",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Preserved signals" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: correlation?.summary.evidenceSignals ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Nothing automatically suppressed" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => changeTab("Live evidence"),
						tone: "violet",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Reviewable cases" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: correlation?.summary.reviewableCases ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Two or more evidence kinds" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => changeTab("Approved reviews"),
						tone: "amber",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved root causes" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: reviews?.summary.approvedReviews ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Independent approval required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => changeTab("Knowledge"),
						tone: "green",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Published knowledge" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: knowledge?.summary.published ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved evidence sources only" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "copilot-tabs",
				"aria-label": "Copilot sections",
				children: [
					"Live evidence",
					"Approved reviews",
					"Knowledge"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: tab === item ? "copilot-tab-active" : "",
					onClick: () => changeTab(item),
					children: [item, item === "Live evidence" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cases.length })]
				}, item))
			}),
			tab === "Live evidence" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "copilot-workspace",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "panel copilot-incident-rail",
						"aria-label": "Active incident evidence",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "copilot-rail-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "LIVE REVIEW QUEUE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Active evidence cases" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [cases.length, " active"] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "copilot-analysis-list",
								children: cases.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: selected?.id === item.id ? "copilot-analysis-active" : "",
									onClick: () => choose(item),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `analysis-pulse pulse-${slug(item.incident.severity)}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 15 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
												item.incident.id,
												" · ",
												display(item.state)
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.incident.title }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 11 }),
												item.impactedServices.length,
												" linked services · ",
												item.signalCount,
												" signals"
											] })
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: item.incident.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [display(item.evidenceLevel), " evidence"] })] })
									]
								}, item.id))
							}),
							!loading && !cases.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "copilot-empty-live",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { size: 24 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No active incident evidence" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Cases appear only from the persistent incident register." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "copilot-rail-footer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Human review required" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Copilot cannot approve causes or execute changes." })] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "panel copilot-analysis-panel",
						children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "copilot-analysis-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "panel-kicker",
										children: [
											selected.incident.id,
											" · ",
											display(selected.state).toUpperCase()
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.incident.title }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This view preserves source notifications, customer impact and approved dependency evidence. A root candidate is not a confirmed diagnosis." })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: selected.incident.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `analysis-state state-${slug(selected.state)}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), display(selected.evidenceLevel)]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "copilot-diagnosis-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "diagnosis-icon",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { size: 20 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "REVIEWABLE DEPENDENCY CANDIDATE" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.candidateRoot }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
											"Evidence level: ",
											display(selected.evidenceLevel),
											" · no probability calculated"
										] }) })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "diagnosis-accepted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "Unapproved"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "copilot-section",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "copilot-section-head",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "panel-kicker",
											children: "APPROVED DEPENDENCIES"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Candidate service paths" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "evidence-count",
											children: [selected.roots.length, " candidates"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "causal-chain",
										children: selected.roots.map((root, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 14 }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
												root.deviceName,
												" · ",
												root.interfaceName
											] }),
											index < selected.roots.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })
										] }, root.key))
									}),
									!selected.roots.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "copilot-inline-empty",
										children: "No approved dependency identifies a root candidate yet."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "copilot-section evidence-section",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "copilot-section-head",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "panel-kicker",
											children: "PRESERVED SOURCE EVIDENCE"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Signals available for operator review" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "evidence-count",
											children: [selected.signalCount, " signals"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "evidence-list",
										children: selected.signals.map((signal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "evidence-strength evidence-supporting",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
													display(signal.kind),
													" · ",
													signal.label
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: signal.detail }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: time(signal.observedAt) })
											] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Preserved" })
										] }, `${signal.kind}:${signal.id}`))
									}),
									!selected.signals.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "copilot-inline-empty",
										children: "No linked source signals are stored for this incident."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "copilot-chat",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "copilot-chat-head",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { size: 14 }), "Ask about this incident"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Answers use linked NOCX evidence only" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "copilot-messages",
										"aria-live": "polite",
										children: visibleMessages.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `copilot-message message-${item.role}`,
											children: [item.role === "copilot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { size: 14 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.text })]
										}, item.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "copilot-prompts",
										children: [
											"What evidence is stored?",
											"What is the customer impact?",
											"What should I review next?"
										].map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => sendMessage(prompt),
											children: prompt
										}, prompt))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										className: "copilot-input",
										onSubmit: (event) => {
											event.preventDefault();
											sendMessage();
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { size: 15 }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: message,
												onChange: (event) => setMessage(event.target.value),
												placeholder: `Ask about ${selected.incident.id}…`,
												"aria-label": "Ask NOC Copilot about stored evidence"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "submit",
												"aria-label": "Send evidence question",
												disabled: !message.trim(),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 15 })
											})
										]
									})
								]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "copilot-empty-live copilot-detail-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrainCircuit, { size: 28 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No active evidence case selected" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX will not create an analysis without a stored production incident." })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "panel copilot-actions-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "panel-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "SAFE REVIEW SEQUENCE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Operator evidence checks" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "recommendation-count",
									children: "3"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "copilot-recommendations",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "recommendation-rank recommendation-low",
										children: "1"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Read-only · evidence" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Review every preserved signal" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confirm timestamps, source scope and missing evidence before forming a cause." })
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "recommendation-rank recommendation-low",
										children: "2"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Read-only · dependency" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Validate candidate service paths" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confirm that approved device-interface dependencies match the affected services." })
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "recommendation-rank recommendation-low",
										children: "3"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Governed · record" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Use approved review workflow" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Record root cause only after resolution and independent approval; the assistant cannot approve it." })
									] })] })
								]
							}),
							selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "copilot-impact-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "STORED CUSTOMER IMPACT" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									selected.incident.affectedCustomers,
									" reported · ",
									selected.impactedServices.length,
									" linked"
								] })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Counts come from the incident and service-impact registers. Missing dependencies remain unknown." })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
								className: "copilot-feedback",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }), "Automatic actions, diagnosis acceptance and feedback learning are not commissioned."] })
							})
						]
					})
				]
			}),
			tab === "Approved reviews" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel copilot-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "copilot-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "APPROVED ROOT-CAUSE EVIDENCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Post-incident review history" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only independently approved production reviews are shown; no inferred confidence or time-saved claim is added." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "copilot-learning-status",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "Immutable after approval"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "copilot-toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search approved reviews…",
								"aria-label": "Search approved root-cause reviews"
							}),
							query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQuery(""),
								"aria-label": "Clear review search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 12 }),
							approvedReviews.length,
							" approved records"
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "copilot-table-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "copilot-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Review" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Incident" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Title" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Approved root cause" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Approved by" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Approved at" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Downtime" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filteredReviews.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: item.reviewNumber }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.incidentId }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "copilot-root-cause-cell",
									children: item.rootCause || "Not recorded"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "history-outcome outcome-confirmed",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 11 }), "Approved"]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.approvedBy ?? "Not recorded" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: time(item.approvedAt) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [item.downtimeMinutes, " min"] })
							] }, item.id)) })]
						}), !loading && !filteredReviews.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "copilot-empty-live",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No approved reviews match" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Approved root causes appear only after independent review." })
							]
						})]
					})
				]
			}),
			tab === "Knowledge" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel copilot-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "copilot-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PUBLISHED OPERATIONAL KNOWLEDGE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Evidence-controlled knowledge" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only current published revisions derived from approved incident reviews or known errors are shown." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "copilot-learning-status",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 13 }), "No automatic matching"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "copilot-toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: knowledgeQuery,
								onChange: (event) => setKnowledgeQuery(event.target.value),
								placeholder: "Search published knowledge…",
								"aria-label": "Search published copilot knowledge"
							}),
							knowledgeQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setKnowledgeQuery(""),
								"aria-label": "Clear knowledge search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }),
							published.length,
							" published revisions"
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "knowledge-grid",
						children: filteredKnowledge.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => notify(`${item.articleNumber} is a controlled published source; inspect the Knowledge Base before applying it.`),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "knowledge-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										item.category,
										" · revision ",
										item.currentRevision
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.current?.summary ?? "No current revision summary is stored." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										item.articleNumber,
										" · source ",
										item.source?.label ?? "approved evidence",
										" · published ",
										time(item.publishedAt)
									] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })
							]
						}, item.id))
					}),
					!loading && !filteredKnowledge.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "copilot-empty-live",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 24 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No published knowledge matches" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Copilot will not use drafts or unapproved procedures." })
						]
					})
				]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "toast",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 18 }), notice]
			})
		]
	});
}
//#endregion
export { NocCopilot as default };
