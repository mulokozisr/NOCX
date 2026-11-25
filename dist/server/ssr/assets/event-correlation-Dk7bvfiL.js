import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as GitMerge } from "./git-merge-CfoqxhTI.js";
import { t as Link2 } from "./link-2-DD83a-mv.js";
//#region app/event-correlation.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/event-correlation.tsx
var import_jsx_runtime = require_jsx_runtime();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function time(value) {
	return new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(new Date(value));
}
function EventCorrelation() {
	const [data, setData] = (0, import_react.useState)(null), [selected, setSelected] = (0, import_react.useState)(null), [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)(""), [query, setQuery] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/correlation", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Correlation evidence is unavailable");
			setData(body);
			setSelected((current) => current ? body.cases.find((item) => item.id === current.id) ?? body.cases[0] ?? null : body.cases[0] ?? null);
			setError("");
		} catch (reason) {
			setData(null);
			setSelected(null);
			setError(reason instanceof Error ? reason.message : "Correlation evidence is unavailable");
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
	const filtered = (0, import_react.useMemo)(() => (data?.cases ?? []).filter((item) => `${item.incident.id} ${item.incident.title} ${item.candidateRoot}`.toLowerCase().includes(query.toLowerCase())), [data, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "correlation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "correlation-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Turn accepted incident evidence into reviewable candidates" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT CORRELATION-EVIDENCE CONTROL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Group only strict non-future notifications, service impacts and dependency approvals without inventing signals, suppressing alerts, or approving a root cause automatically." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: loading ? "refresh-spin" : "",
						size: 15
					}), "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Correlation evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict accepted grouping only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future, malformed, unsupported, late-approved or unregistered incident, notification, impact, service, dependency and device records are excluded." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 automatic suppressions"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "correlation-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitMerge, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active accepted cases" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.activeCases ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "One per accepted incident" : "Correlation evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted signals" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.acceptedSignals ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Strict chronology required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Reviewable cases" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.reviewableCases ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Two or more accepted kinds" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Root candidates" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.rootCandidates ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Pre-impact approvals only" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "correlation-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel correlation-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STRICT CORRELATION QUEUE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted incident evidence groups" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ranked only from strict incident chronology; collecting cases remain explicitly unapproved." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search accepted cases…",
							"aria-label": "Search accepted correlation cases"
						})] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "correlation-list",
							children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === item.id ? "active" : "",
								onClick: () => setSelected(item),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `correlation-severity ${slug(item.incident.severity)}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											item.incident.id,
											" · ",
											item.state.replaceAll("_", " ")
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.incident.title }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											item.candidateRoot,
											" · ",
											item.evidenceKinds.length,
											" accepted evidence kinds"
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mark", { children: [item.signalCount, " signals"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
								]
							}, item.id))
						}),
						data && !loading && !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "correlation-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitMerge, { size: 25 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted incident evidence to correlate" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query ? "No accepted case matches this search." : "Cases appear only when the strict incident register contains accepted evidence." })
							]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "correlation-empty correlation-unavailable",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 25 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Correlation queue unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated correlation snapshot before interpreting candidates." })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel correlation-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STRICT ROOT-CANDIDATE EVIDENCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.candidateRoot }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.incident.id,
								" · accepted evidence level ",
								selected.evidenceLevel
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "correlation-metrics",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Accepted signals" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.signalCount })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Evidence kinds" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.evidenceKinds.length })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Customers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.incident.affectedCustomers })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Pre-impact dependency candidates" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "correlation-path",
							children: [selected.roots.map((root, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: index + 1 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
									root.deviceName,
									" · ",
									root.interfaceName
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
									root.role,
									" · ",
									root.services,
									" services"
								] })
							] }, root.key)), !selected.roots.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No accepted pre-impact dependency identifies a root candidate yet." })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Accepted source evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: selected.signals.map((signal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								signal.kind.replaceAll("_", " "),
								" · ",
								signal.label
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								signal.detail,
								" · ",
								time(signal.observedAt)
							] })] })] }, `${signal.kind}:${signal.id}`)) }),
							!selected.signals.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No accepted notification, impact or dependency evidence is stored for this incident." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "correlation-links",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Accepted operational record" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { size: 12 }), selected.incident.id] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 12 }),
									selected.impactedServices.length,
									" impacted services"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 12 }),
									selected.roots.length,
									" dependency candidates"
								] })
							] })]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `correlation-empty ${data ? "" : "correlation-unavailable"}`,
						children: [
							data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitMerge, { size: 25 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Select an accepted evidence case" : "Correlation evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? "Strict root candidates and accepted source signals will appear here." : "Load an authenticated correlation snapshot before interpreting candidates." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel correlation-governance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "STRICT CORRELATION SAFEGUARDS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Reviewable accepted evidence without automated decisions" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Every accepted notification, impact and pre-impact dependency remains individually visible."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Correlation never suppresses an alert, changes an incident or writes to a device."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "A candidate remains unapproved until an operator records root-cause evidence elsewhere."] })
				] })]
			})
		]
	});
}
//#endregion
export { EventCorrelation as default };
