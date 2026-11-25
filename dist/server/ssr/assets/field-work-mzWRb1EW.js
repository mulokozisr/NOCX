import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { a as Wrench, d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as History } from "./history-ClpmxT4G.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
import { t as MapPin } from "./map-pin-BYYZwnIv.js";
//#region node_modules/lucide-react/dist/esm/icons/clipboard-list.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ClipboardList = createLucideIcon("ClipboardList", [
	["rect", {
		width: "8",
		height: "4",
		x: "8",
		y: "2",
		rx: "1",
		ry: "1",
		key: "tgr4d6"
	}],
	["path", {
		d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
		key: "116196"
	}],
	["path", {
		d: "M12 11h4",
		key: "1jrz19"
	}],
	["path", {
		d: "M12 16h4",
		key: "n85exb"
	}],
	["path", {
		d: "M8 11h.01",
		key: "1dfujw"
	}],
	["path", {
		d: "M8 16h.01",
		key: "18s6g9"
	}]
]);
//#endregion
//#region app/field-work.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var initial = {
	sourceKey: "",
	title: "",
	site: "",
	region: "",
	priority: "medium",
	objective: "",
	accessNote: "",
	requiredItems: "",
	dueAt: "",
	assignedOperatorId: ""
};
var display = (value) => value.replaceAll("_", " ");
var when = (value) => new Date(value).toLocaleString();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function FieldOperations() {
	const [data, setData] = (0, import_react.useState)(null), [tab, setTab] = (0, import_react.useState)("Overview"), [query, setQuery] = (0, import_react.useState)(""), [selected, setSelected] = (0, import_react.useState)(null), [creating, setCreating] = (0, import_react.useState)(false), [draft, setDraft] = (0, import_react.useState)(initial), [busy, setBusy] = (0, import_react.useState)(false), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		try {
			const response = await fetch("/api/platform/field-work", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Field-work evidence is unavailable");
			setError("");
			setData(body);
			setSelected((current) => current ? body.workOrders.find((item) => item.id === current.id) ?? null : null);
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Field-work evidence is unavailable");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(timer);
	}, [load]);
	const filtered = (0, import_react.useMemo)(() => (data?.workOrders ?? []).filter((item) => `${item.workNumber} ${item.title} ${item.site} ${item.assignee?.displayName ?? ""} ${item.source?.reference ?? ""}`.toLowerCase().includes(query.toLowerCase())), [data, query]);
	const events = (0, import_react.useMemo)(() => (data?.workOrders ?? []).flatMap((item) => item.events.map((event) => ({
		...event,
		workNumber: item.workNumber,
		title: item.title
	}))).sort((a, b) => b.createdAt.localeCompare(a.createdAt)), [data]);
	const mutate = async (method, body, success) => {
		setBusy(true);
		setError("");
		try {
			const response = await fetch("/api/platform/field-work", {
				method,
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error || "Field-work record could not be updated");
			await load();
			setNotice(success);
			window.setTimeout(() => setNotice(""), 3200);
			return true;
		} catch (cause) {
			setError(cause instanceof Error ? cause.message : "Field-work record could not be updated");
			return false;
		} finally {
			setBusy(false);
		}
	};
	const create = async () => {
		const source = data?.candidates.find((item) => `${item.sourceType}:${item.sourceId}` === draft.sourceKey);
		if (await mutate("POST", {
			...draft,
			sourceType: source?.sourceType,
			sourceId: source?.sourceId,
			requiredItems: draft.requiredItems.split("\n").map((item) => item.trim()).filter(Boolean),
			dueAt: draft.dueAt ? new Date(draft.dueAt).toISOString() : ""
		}, "Persistent field work order created; no message, stock change or device command was sent.")) {
			setDraft(initial);
			setCreating(false);
			setTab("Work Orders");
		}
	};
	const act = async (action, prompt) => {
		if (!selected) return;
		const note = window.prompt(prompt);
		if (note === null) return;
		await mutate("PATCH", {
			action,
			id: selected.id,
			note
		}, `Field-work ${display(action)} evidence recorded.`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "field-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "field-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Field operations & work orders" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "DETERMINISTIC FIELD-WORK LIFECYCLE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Coordinate accountable site work from real incidents and approved changes without inventing technicians, live locations, stock, SLA performance or dispatch activity." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void load(),
					disabled: busy,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), busy ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip field-boundary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Chronology-checked field lifecycle evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Assignment, acceptance, completion and independent verification must replay in valid non-future order. No fictional technicians, GPS locations, stock, SLA percentages, travel times, ratings or completed-job counts are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 external dispatches"] })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "field-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "field-summary nocx-summary-grid",
				"aria-label": "Field-work evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("Work Orders"),
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Persistent work orders" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.workOrders ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Never seeded" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("Work Orders"),
						tone: "amber",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Assigned" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.assigned ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Acceptance required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("Work Orders"),
						tone: "green",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.active ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Operator evidence only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("Work Orders"),
						tone: "violet",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Awaiting verification" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.awaitingVerification ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Independent closure" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("Overview"),
						tone: "red",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 19 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Eligible sources" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.eligibleSources ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Live incidents and changes" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "field-tabs",
				"aria-label": "Field operations sections",
				children: [
					"Overview",
					"Work Orders",
					"Evidence",
					"Boundaries"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: tab === item ? "field-tab-active" : "",
					onClick: () => setTab(item),
					children: [item, item === "Work Orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.summary.workOrders ?? 0 })]
				}, item))
			}),
			tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "field-overview-grid evidence-field-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel field-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PRODUCTION SOURCE INTAKE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Incidents and changes eligible for field work" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Each source can create one persistent work order with an accountable registered operator." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: !data?.candidates.length,
							onClick: () => setCreating(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "New work order"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field-source-list",
						children: [data?.candidates.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setDraft((current) => ({
									...current,
									sourceKey: `${item.sourceType}:${item.sourceId}`,
									title: item.title,
									priority: item.severity === "Critical" ? "emergency" : item.severity === "High" ? "high" : item.risk ?? current.priority
								}));
								setCreating(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.sourceType.toUpperCase(),
									" · ",
									item.reference,
									" · ",
									display(item.status)
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Stored production evidence" })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })]
						}, `${item.sourceType}:${item.sourceId}`)), data && !data.candidates.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { size: 25 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No eligible source evidence" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Field intake remains closed until an unresolved incident or approved change exists." })
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel field-boundary-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "ACCOUNTABILITY CONTROLS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Evidence-gated lifecycle" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "READ ONLY" })]
					}), [
						["Registered assignee", "Every order names an active NOCX operator"],
						["Assignee acceptance", "Only the assigned operator can accept and start"],
						["Independent completion", "Assignees cannot verify their own completion"],
						["External dispatch", "Email, SMS, WhatsApp and calls are disabled"]
					].map(([title, detail]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: detail })] })] }, title))]
				})]
			}),
			tab === "Work Orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel field-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PERSISTENT WORK REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Evidence-backed field work" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Assignments, acceptance, progress, blocks and independent completion verification are append-only." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: !data?.candidates.length,
							onClick: () => setCreating(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "New work order"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field-toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "field-search",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: query,
									onChange: (event) => setQuery(event.target.value),
									placeholder: "Search work orders, sites or assignees…",
									"aria-label": "Search persistent field work"
								}),
								query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQuery(""),
									"aria-label": "Clear field-work search",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "dispatch-sync",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "External dispatch disabled"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field-table-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "field-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Priority" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Work order" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Source" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Site" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Assignee" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Due" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => setSelected(item),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `field-priority priority-${slug(item.priority)}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), item.priority]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "work-title",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.workNumber })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.source?.reference ?? "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "field-location",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.site }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.region ?? "Region not recorded" })] })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.assignee?.displayName ?? "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: when(item.dueAt) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `work-status work-${slug(item.status)}`,
										children: display(item.status)
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "row-action",
										onClick: (event) => {
											event.stopPropagation();
											setSelected(item);
										},
										"aria-label": `Inspect ${item.workNumber}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
									}) })
								]
							}, item.id)) })]
						}), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { size: 25 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent work order recorded" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create one only from eligible production evidence." })
							]
						})]
					})
				]
			}),
			tab === "Evidence" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel field-register",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "field-register-head",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "APPEND-ONLY FIELD EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Assignment and lifecycle history" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No GPS, call, message, stock or device activity is inferred." })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field-table-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "field-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Time" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Work order" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Event" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Actor" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Evidence" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: events.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: when(item.createdAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.workNumber }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								item.title
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: display(item.eventType) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.actorEmail }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.body })
						] }, item.id)) })]
					}), !events.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No field-work evidence recorded" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The audit trail starts with the first real work order." })
						]
					})]
				})]
			}),
			tab === "Boundaries" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel field-boundary-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "UNCOMMISSIONED CAPABILITIES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "External and physical systems fail closed" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX records operator decisions but cannot infer or change the external world." })
				] }), [
					["GPS and live location", "Unavailable"],
					["Phone, SMS and WhatsApp dispatch", "Disabled"],
					["Vehicle and travel tracking", "Unavailable"],
					["Warehouse stock and reservations", "Unavailable"],
					["Purchase and transfer requests", "Disabled"],
					["Router, switch and radio actions", "Disabled"]
				].map(([label, state]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 15 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No authoritative integration is commissioned" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: state })
				] }, label))]
			}),
			creating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field-drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					onClick: () => setCreating(false),
					"aria-label": "Close field-work intake"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "field-drawer",
					"aria-label": "Create persistent field work order",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "EVIDENCE-LINKED INTAKE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "New field work order" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Stores accountable work evidence; sends no external dispatch." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setCreating(false),
								"aria-label": "Close intake",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Production source", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: draft.sourceKey,
									onChange: (event) => {
										const source = data?.candidates.find((item) => `${item.sourceType}:${item.sourceId}` === event.target.value);
										setDraft({
											...draft,
											sourceKey: event.target.value,
											title: draft.title || source?.title || ""
										});
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select incident or approved change"
									}), data?.candidates.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: `${item.sourceType}:${item.sourceId}`,
										children: [
											item.reference,
											" · ",
											item.title
										]
									}, `${item.sourceType}:${item.sourceId}`))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.title,
									onChange: (event) => setDraft({
										...draft,
										title: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Site", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.site,
									onChange: (event) => setDraft({
										...draft,
										site: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Region", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: draft.region,
									onChange: (event) => setDraft({
										...draft,
										region: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Priority", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: draft.priority,
									onChange: (event) => setDraft({
										...draft,
										priority: event.target.value
									}),
									children: [
										"low",
										"medium",
										"high",
										"emergency"
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Assigned registered operator", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: draft.assignedOperatorId,
									onChange: (event) => setDraft({
										...draft,
										assignedOperatorId: event.target.value
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select operator"
									}), data?.operators.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: item.id,
										children: [
											item.displayName,
											" · ",
											item.email
										]
									}, item.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Objective", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: draft.objective,
									onChange: (event) => setDraft({
										...draft,
										objective: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Access note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: draft.accessNote,
									onChange: (event) => setDraft({
										...draft,
										accessNote: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Required items (evidence only)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: draft.requiredItems,
									onChange: (event) => setDraft({
										...draft,
										requiredItems: event.target.value
									}),
									placeholder: "One expected item per line"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Due time", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "datetime-local",
									value: draft.dueAt,
									onChange: (event) => setDraft({
										...draft,
										dueAt: event.target.value
									})
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "field-safety-note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No dispatch or stock action" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Creating this record sends no message, makes no call, reserves no item and changes no network device." })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field-drawer-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								onClick: () => setCreating(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								disabled: busy,
								onClick: () => void create(),
								children: busy ? "Saving…" : "Create work order"
							})]
						})
					]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field-drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					onClick: () => setSelected(null),
					"aria-label": "Close work order"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "field-drawer",
					"aria-label": `${selected.workNumber} details`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "panel-kicker",
									children: [
										selected.workNumber,
										" · ",
										selected.source?.reference ?? selected.sourceId
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									selected.site,
									" · ",
									selected.region ?? "Region not recorded"
								] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setSelected(null),
								"aria-label": "Close work order",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field-drawer-badges",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `field-priority priority-${slug(selected.priority)}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), selected.priority]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `work-status work-${slug(selected.status)}`,
									children: display(selected.status)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "field-sla-badge",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "External dispatch disabled"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "field-drawer-description",
							children: selected.objective
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field-detail-grid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Assigned operator" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.assignee?.displayName ?? "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selected.assignee?.email })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Due" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: when(selected.dueAt) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No computed SLA claim" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Created by" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.createdBy }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: when(selected.createdAt) })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Completion verifier" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.verifiedBy ?? "Pending" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Independent verification required" })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "field-drawer-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "SITE ACCESS EVIDENCE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "site-access-box",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.site }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selected.accessNote || "No access note recorded" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GPS location is not collected." })
								] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "field-drawer-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "EXPECTED ITEMS · NO STOCK CLAIM" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "required-parts",
								children: [selected.requiredItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { size: 14 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 13 })
								] }, item)), !selected.requiredItems.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "field-drawer-description",
									children: "No required-item evidence recorded."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "field-drawer-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "APPEND-ONLY HISTORY" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "technician-activity",
								children: selected.events.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { size: 13 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									display(item.eventType),
									" · ",
									item.actorEmail
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.body,
									" · ",
									when(item.createdAt)
								] })] })] }, item.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field-drawer-actions",
							children: [
								selected.status === "assigned" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "primary-button",
									disabled: busy || selected.assignee?.email !== data?.viewer.email,
									onClick: () => void act("accept", "Add an acceptance note"),
									children: "Accept assignment"
								}),
								selected.status === "accepted" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "primary-button",
									disabled: busy || selected.assignee?.email !== data?.viewer.email,
									onClick: () => void act("start", "Add a start note"),
									children: "Start work"
								}),
								["accepted", "in_progress"].includes(selected.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									disabled: busy || selected.assignee?.email !== data?.viewer.email,
									onClick: () => void act("block", "Describe the field-work blocker"),
									children: "Record blocker"
								}),
								["in_progress", "blocked"].includes(selected.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "primary-button",
									disabled: busy || selected.assignee?.email !== data?.viewer.email,
									onClick: () => void act("complete", "Describe completion evidence"),
									children: "Submit completion"
								}),
								selected.status === "awaiting_verification" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "primary-button",
									disabled: busy || selected.assignee?.email === data?.viewer.email,
									onClick: () => void act("verify", "Add independent verification evidence"),
									children: "Verify completion"
								})
							]
						})
					]
				})]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "toast",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), notice]
			})
		]
	});
}
//#endregion
export { FieldOperations as default };
