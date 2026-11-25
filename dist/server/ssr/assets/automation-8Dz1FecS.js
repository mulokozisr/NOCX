import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as FileCode2 } from "./file-code-2-3x_IW9e8.js";
import { t as History } from "./history-ClpmxT4G.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
//#region node_modules/lucide-react/dist/esm/icons/workflow.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Workflow = createLucideIcon("Workflow", [
	["rect", {
		width: "8",
		height: "8",
		x: "3",
		y: "3",
		rx: "2",
		key: "by2w9f"
	}],
	["path", {
		d: "M7 11v4a2 2 0 0 0 2 2h4",
		key: "xkn7yn"
	}],
	["rect", {
		width: "8",
		height: "8",
		x: "13",
		y: "13",
		rx: "2",
		key: "1cgmvn"
	}]
]);
//#endregion
//#region app/automation.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var initialDraft = {
	sourceChangeId: "",
	name: "",
	purpose: "",
	scope: "",
	risk: "medium",
	ownerEmail: "",
	steps: ""
};
var display = (value) => value.replaceAll("_", " ");
var time = (value) => new Date(value).toLocaleString();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function NetworkAutomation() {
	const [data, setData] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [query, setQuery] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)(initialDraft);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		try {
			const response = await fetch("/api/platform/automation", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Automation evidence is unavailable");
			setError("");
			setData(body);
			setSelected((current) => current ? body.runbooks.find((item) => item.id === current.id) ?? null : null);
			setDraft((current) => current.ownerEmail || !body.viewer.email ? current : {
				...current,
				ownerEmail: body.viewer.email
			});
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Automation evidence is unavailable");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(timer);
	}, [load]);
	const filtered = (0, import_react.useMemo)(() => (data?.runbooks ?? []).filter((item) => `${item.runbookNumber} ${item.name} ${item.scope} ${item.ownerEmail} ${item.sourceChange?.changeNumber ?? ""}`.toLowerCase().includes(query.toLowerCase())), [data, query]);
	const events = (0, import_react.useMemo)(() => (data?.runbooks ?? []).flatMap((item) => item.events.map((event) => ({
		...event,
		runbookNumber: item.runbookNumber,
		runbookName: item.name
	}))).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [data]);
	const mutate = async (method, body, success) => {
		setBusy(true);
		setError("");
		try {
			const response = await fetch("/api/platform/automation", {
				method,
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error || "Automation record could not be updated");
			await load();
			setNotice(success);
			window.setTimeout(() => setNotice(""), 3200);
			return true;
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Automation record could not be updated");
			return false;
		} finally {
			setBusy(false);
		}
	};
	const create = async () => {
		const source = data?.candidates.find((item) => item.id === draft.sourceChangeId);
		if (await mutate("POST", {
			...draft,
			steps: draft.steps.split("\n").map((item) => item.trim()).filter(Boolean),
			rollbackPlan: source?.rollbackPlan,
			validationPlan: source?.validationPlan
		}, "Persistent runbook draft created; no command was executed.")) {
			setCreating(false);
			setDraft({
				...initialDraft,
				ownerEmail: data?.viewer.email ?? ""
			});
			setTab("Runbooks");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "automation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "automation-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Network automation & runbooks" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "DETERMINISTIC RUNBOOK-EVIDENCE REPLAY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Govern reusable operational procedures against independently approved change evidence without claiming execution, success, time savings or rollback capability." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void load(),
					disabled: busy,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), busy ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip automation-boundary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Deterministic chronology-checked runbook evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Runbooks, source approvals and append-only events must replay in valid non-future order. No fictional executions, success rates, time savings, guardrail stops, runner health or recommended network actions are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 device commands"] })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "automation-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "automation-summary nocx-summary-grid",
				"aria-label": "Automation evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("Runbooks"),
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Persistent runbooks" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.runbooks ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Never seeded" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("Runbooks"),
						tone: "amber",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Drafts" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.drafts ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Execution blocked" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("Runbooks"),
						tone: "green",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Rehearsal approved" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.approvedForRehearsal ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Not production activation" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("Evidence"),
						tone: "violet",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Evidence events" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.evidenceEvents ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Append-only history" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("Overview"),
						tone: "red",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Eligible changes" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.eligibleChanges ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved source required" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "automation-tabs",
				"aria-label": "Automation sections",
				children: [
					"Overview",
					"Runbooks",
					"Evidence",
					"Boundaries"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: tab === item ? "automation-tab-active" : "",
					onClick: () => setTab(item),
					children: [item, item === "Runbooks" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.summary.runbooks ?? 0 })]
				}, item))
			}),
			tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "automation-overview-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel automation-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "automation-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "APPROVED CHANGE INTAKE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Evidence eligible for runbook drafting" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only independently approved, in-progress or completed change records can support a reusable draft." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: !data?.candidates.length,
							onClick: () => setCreating(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "Draft runbook"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "automation-change-list",
						children: [data?.candidates.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setDraft((current) => ({
									...current,
									sourceChangeId: item.id,
									name: item.title,
									risk: item.risk
								}));
								setCreating(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.changeNumber,
									" · ",
									display(item.status)
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: ["Approved by ", item.approvedBy] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })]
						}, item.id)), data && !data.candidates.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "automation-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode2, { size: 25 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No eligible approved change" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Runbook intake stays closed until independent change evidence exists." })
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel automation-guardrail-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "FAIL-CLOSED CONTROLS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Execution boundary" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "guardrail-score",
							children: "READ ONLY"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "guardrail-list",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "guardrail-good",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Change evidence required" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Every draft links to an independently approved change" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "On" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "guardrail-good",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Four-eyes rehearsal approval" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Creators cannot approve their own runbook" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "On" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "guardrail-warning",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 14 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Production execution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No runner, controller or device command is commissioned" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Off" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "guardrail-warning",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 14 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Automatic rollback" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Plans are evidence only; NOCX does not execute them" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Off" })
							] })
						]
					})]
				})]
			}),
			tab === "Runbooks" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel automation-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "automation-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PERSISTENT RUNBOOK REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Change-linked operational procedures" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Definitions, owners, source approvals and append-only decisions. Rehearsal approval never authorizes execution." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: !data?.candidates.length,
							onClick: () => setCreating(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "Draft runbook"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "automation-toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "automation-search",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: query,
									onChange: (event) => setQuery(event.target.value),
									placeholder: "Search runbooks or source changes…",
									"aria-label": "Search persistent runbooks"
								}),
								query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQuery(""),
									"aria-label": "Clear runbook search",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "automation-freshness",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "Persistent records only"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "automation-table-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "automation-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Runbook" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Source change" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Scope" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Risk" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Owner" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Version" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => setSelected(item),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "automation-identity",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { size: 15 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.runbookNumber })] })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.sourceChange?.changeNumber ?? "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.scope }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `automation-risk risk-${slug(item.risk)}`,
										children: item.risk
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.ownerEmail }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.version }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `runbook-status runbook-${slug(item.status)}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), display(item.status)]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "row-action",
										onClick: (event) => {
											event.stopPropagation();
											setSelected(item);
										},
										"aria-label": `Inspect ${item.name}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
									}) })
								]
							}, item.id)) })]
						}), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "automation-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Workflow, { size: 25 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent runbook recorded" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create one only from eligible approved change evidence." })
							]
						})]
					})
				]
			}),
			tab === "Evidence" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel automation-register",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "automation-register-head",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "APPEND-ONLY EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Runbook decision history" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Creation and independent rehearsal approval are recorded; no execution history is fabricated." })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "automation-table-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "automation-table execution-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Time" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Runbook" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Event" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Actor" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Evidence" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: events.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: time(item.createdAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.runbookNumber }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								item.runbookName
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: display(item.eventType) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.actorEmail }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.body })
						] }, item.id)) })]
					}), !events.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "automation-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No automation evidence recorded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The register begins with the first real runbook draft." })
						]
					})]
				})]
			}),
			tab === "Boundaries" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel automation-boundary-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "UNCOMMISSIONED CAPABILITIES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Automation remains evidence-only" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "These capabilities fail closed until separate runners, credentials, device policies, dry-run validation and production authorization are commissioned." })
				] }), [
					["Runbook package import", "Disabled"],
					["Dry-run execution", "Disabled"],
					["Production execution", "Disabled"],
					["Device and controller commands", "Disabled"],
					["Automatic rollback", "Disabled"],
					["External notification", "Disabled"]
				].map(([label, state]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 15 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No supporting production evidence" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: state })
				] }, label))]
			}),
			creating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "automation-drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					onClick: () => setCreating(false),
					"aria-label": "Close runbook draft"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "automation-drawer",
					"aria-label": "Create persistent runbook draft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "CHANGE-LINKED INTAKE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Draft operational runbook" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Stores governance evidence only; no command will run." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setCreating(false),
								"aria-label": "Close draft",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "automation-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Approved source change", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: draft.sourceChangeId,
									onChange: (event) => {
										const source = data?.candidates.find((item) => item.id === event.target.value);
										setDraft({
											...draft,
											sourceChangeId: event.target.value,
											name: draft.name || source?.title || "",
											risk: source?.risk || draft.risk
										});
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select eligible change"
									}), data?.candidates.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: item.id,
										children: [
											item.changeNumber,
											" · ",
											item.title
										]
									}, item.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.name,
									onChange: (event) => setDraft({
										...draft,
										name: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Purpose", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: draft.purpose,
									onChange: (event) => setDraft({
										...draft,
										purpose: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Scope", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.scope,
									onChange: (event) => setDraft({
										...draft,
										scope: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Risk", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
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
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Owner", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: draft.ownerEmail,
									onChange: (event) => setDraft({
										...draft,
										ownerEmail: event.target.value
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select active operator"
									}), data?.operators.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: item.email,
										children: [
											item.displayName,
											" · ",
											item.email
										]
									}, item.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Controlled steps", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: draft.steps,
									onChange: (event) => setDraft({
										...draft,
										steps: event.target.value
									}),
									placeholder: "One evidence-backed step per line"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "automation-safety-note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Execution remains unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The source change supplies rollback and validation plans, but NOCX stores them as evidence and sends no device commands." })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "automation-drawer-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								onClick: () => setCreating(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								onClick: () => void create(),
								disabled: busy,
								children: busy ? "Saving…" : "Create draft"
							})]
						})
					]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "automation-drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					onClick: () => setSelected(null),
					"aria-label": "Close runbook details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "automation-drawer",
					"aria-label": `${selected.name} runbook details`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "panel-kicker",
									children: [
										selected.runbookNumber,
										" · VERSION ",
										selected.version
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									selected.ownerEmail,
									" · ",
									selected.scope
								] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setSelected(null),
								"aria-label": "Close runbook",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "automation-drawer-badges",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `runbook-status runbook-${slug(selected.status)}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), display(selected.status)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `automation-risk risk-${slug(selected.risk)}`,
									children: [selected.risk, " risk"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "Execution disabled"] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "automation-drawer-description",
							children: selected.purpose
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "automation-drawer-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "SOURCE GOVERNANCE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "automation-detail-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Source change" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.sourceChange?.changeNumber ?? "Unavailable" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Approved by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.sourceChange?.approvedBy ?? "Unavailable" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Created by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.createdBy })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Rehearsal approver" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.approvedBy ?? "Pending independent review" })] })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "automation-drawer-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "CONTROLLED STEPS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "automation-step-list",
								children: selected.steps.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: index + 1 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: step }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Evidence definition only · no automated action" })] })
								] }, `${step}-${index}`))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "automation-drawer-section",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "ROLLBACK & VALIDATION EVIDENCE" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "automation-drawer-description",
									children: ["Rollback: ", selected.rollbackPlan]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "automation-drawer-description",
									children: ["Validation: ", selected.validationPlan]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "automation-safety-note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No production execution path" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rehearsal approval locks this version for controlled validation only. It does not activate a runner, rollback, controller or network write." })] })]
						}),
						selected.status === "draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "automation-drawer-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								onClick: () => setSelected(null),
								children: "Close"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary-button",
								disabled: busy || selected.createdBy === data?.viewer.email,
								onClick: () => void mutate("PATCH", {
									action: "approve_rehearsal",
									id: selected.id
								}, "Runbook independently approved for rehearsal only; execution remains disabled."),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), "Approve rehearsal"]
							})]
						})
					]
				})]
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
export { NetworkAutomation as default };
