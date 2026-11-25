import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, i as Bell, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { n as useOperatorAccess, t as OperatorAccess } from "./operator-access-CJCL0tBn.js";
import { i as useLiveOperations, t as formatAge } from "./live-operations-ClF_13he.js";
import { t as OctagonAlert } from "./octagon-alert-C_rHr69G.js";
import "./page-CY3TPLj0.js";
//#region node_modules/lucide-react/dist/esm/icons/ticket-check.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var TicketCheck = createLucideIcon("TicketCheck", [["path", {
	d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
	key: "qn84l0"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/user-round.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserRound = createLucideIcon("UserRound", [["circle", {
	cx: "12",
	cy: "8",
	r: "5",
	key: "1hypcn"
}], ["path", {
	d: "M20 21a8 8 0 0 0-16 0",
	key: "rfgkzh"
}]]);
//#endregion
//#region app/incident-actions.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function IncidentActions({ id, onChanged }) {
	const access = useOperatorAccess("incidents.manage"), [data, setData] = (0, import_react.useState)(null), [note, setNote] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(""), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		try {
			const r = await fetch(`/api/platform/incident-workflow?id=${encodeURIComponent(id)}`, { cache: "no-store" }), body = await r.json();
			if (!r.ok) throw new Error(body.error);
			setData(body);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Incident detail unavailable");
		}
	}, [id]);
	(0, import_react.useEffect)(() => {
		queueMicrotask(() => void load());
	}, [load]);
	async function act(action) {
		setBusy(action);
		setError("");
		try {
			const r = await fetch("/api/platform/incident-workflow", {
				method: "POST",
				headers: access.headers,
				body: JSON.stringify({
					id,
					action,
					note
				})
			}), body = await r.json();
			if (!r.ok) throw new Error(body.error);
			setNotice(action === "resolve" ? "Incident resolved and recorded in history." : action === "note" ? "Investigation note saved." : "Incident acknowledged.");
			setNote("");
			await load();
			onChanged?.();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Action failed");
		} finally {
			setBusy("");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "incident-workflow",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Investigate & act" }),
			data?.device && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "entity-link",
				href: `#/devices?device=${encodeURIComponent(data.device.id)}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.device.hostname }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [data.device.site ?? "Unassigned site", " · Open device health and interfaces"] })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorAccess, { access }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "workflow-error",
				role: "alert",
				children: error
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: notice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Investigation or resolution note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: note,
				onChange: (e) => setNote(e.target.value),
				placeholder: "What happened, what you checked, and the next step",
				maxLength: 2e3
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "workflow-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "primary-button",
						disabled: !access.canWrite || Boolean(busy) || !data || data.incident.status === "resolved" || Boolean(data.acknowledgement),
						onClick: () => void act("acknowledge"),
						children: busy === "acknowledge" ? "Acknowledging…" : "Acknowledge"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !access.canWrite || Boolean(busy) || note.trim().length < 8,
						onClick: () => void act("note"),
						children: busy === "note" ? "Saving…" : "Save note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !access.canWrite || Boolean(busy) || !data || data.incident.status === "resolved" || note.trim().length < 8,
						onClick: () => void act("resolve"),
						children: busy === "resolve" ? "Resolving…" : "Resolve incident"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "workflow-note",
				children: "Resolution needs a note and fresh online evidence for a linked device. Notes never execute commands."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Investigation history" }),
			data?.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "incident-history-note",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						n.kind,
						" · ",
						n.author
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: n.body }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", { children: [new Date(n.createdAt).toLocaleString("en-GB", { timeZone: "Africa/Dar_es_Salaam" }), " EAT"] })
				]
			}, n.id)),
			data && !data.notes.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No investigation notes yet." })
		]
	});
}
//#endregion
//#region app/live-alerts-incidents.tsx
function LiveAlertsIncidents({ initialTab = "alerts" }) {
	const { data, error, loading, refresh } = useLiveOperations(10), [query, setQuery] = (0, import_react.useState)(""), [selectedIncidentId, setSelectedIncidentId] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([]), [historyError, setHistoryError] = (0, import_react.useState)(""), [showHistory, setShowHistory] = (0, import_react.useState)(false);
	const loadHistory = (0, import_react.useCallback)(async () => {
		try {
			const r = await fetch("/api/platform/incident-workflow", { cache: "no-store" }), body = await r.json();
			if (!r.ok) throw new Error(body.error);
			setHistory(body.incidents);
			setHistoryError("");
		} catch (e) {
			setHistoryError(e instanceof Error ? e.message : "History unavailable");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		queueMicrotask(() => void loadHistory());
	}, [loadHistory]);
	const incidents = (0, import_react.useMemo)(() => data?.incidents ?? [], [data?.incidents]), filtered = (showHistory ? history : incidents).filter((incident) => `${incident.id} ${incident.title} ${incident.severity} ${incident.status}`.toLowerCase().includes(query.toLowerCase()));
	const selected = (0, import_react.useMemo)(() => incidents.find((incident) => incident.id === selectedIncidentId) ?? history.find((incident) => incident.id === selectedIncidentId) ?? null, [
		incidents,
		history,
		selectedIncidentId
	]);
	(0, import_react.useEffect)(() => {
		const syncIncident = () => {
			const queryString = window.location.hash.split("?")[1] ?? "";
			setSelectedIncidentId(new URLSearchParams(queryString).get("incident"));
		};
		queueMicrotask(syncIncident);
		window.addEventListener("hashchange", syncIncident);
		return () => window.removeEventListener("hashchange", syncIncident);
	}, []);
	const registerBoundary = initialTab === "alerts" ? "A separate alert-event ledger is not commissioned. Verified-rule incident records are shown below." : "Only unresolved records from the persistent incident register are shown.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "events-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "events-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "ALERTS & INCIDENTS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Alerts & incidents" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Review impact, investigate the linked device, and record acknowledgement or resolution." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => {
						refresh();
						loadHistory();
					},
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: loading ? "refresh-spin" : "",
						size: 15
					}), loading ? "Refreshing…" : "Refresh"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Incident refresh failed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `live-evidence-strip ${data ? "" : "is-unavailable"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Strict race-safe incident snapshot" : "Incident snapshot unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? `${incidents.length} active · ${data.summary.unacknowledgedIncidents} unacknowledged · ${data.scope.rejectedIncidents + data.scope.rejectedAcknowledgements} rejected · checked ${formatAge(data.checkedAt)}` : loading ? "Loading authenticated incident evidence…" : "No authenticated operations snapshot is loaded." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: data ? "0 seeded" : "Unavailable" })
				]
			}),
			historyError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: historyError
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "workflow-tabs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-pressed": !showHistory,
					onClick: () => setShowHistory(false),
					children: "Active incidents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-pressed": showHistory,
					onClick: () => setShowHistory(true),
					children: "Incident history"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "event-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active incidents" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.activeIncidents ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Unresolved records" : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unacknowledged" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.unacknowledgedIncidents ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Acknowledge in incident details" : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Impacted services" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.impactedServices ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Approved mappings only" : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Acknowledged" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? incidents.filter((item) => item.acknowledgedBy).length : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Operator-attributed" : "Evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel live-incident-register",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "incident-register-title",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "PERSISTENT INCIDENT REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Active incident evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: registerBoundary })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search incident records...",
						"aria-label": "Search active incident evidence"
					}),
					query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setQuery(""),
						"aria-label": "Clear search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
					})
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "live-incident-table",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Incident" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Severity" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Acknowledgement" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Impact" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Opened" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((incident) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							onClick: () => setSelectedIncidentId(incident.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "live-incident-title",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
										className: `incident-${incident.severity.toLowerCase()}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incident.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: incident.id })] })]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `severity-badge severity-${incident.severity.toLowerCase()}`,
									children: incident.severity
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "incident-status status-open",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), incident.status]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: incident.acknowledgedBy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "acknowledged",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketCheck, { size: 13 }), incident.acknowledgedBy]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "unacknowledged",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 13 }), "Required"]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: incident.impactEstimateUnavailable ? "Not calculated" : `${incident.affectedCustomers} services` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "poll-time",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }), formatAge(incident.openedAt)]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "row-action",
									onClick: (event) => {
										event.stopPropagation();
										setSelectedIncidentId(incident.id);
									},
									"aria-label": `Inspect ${incident.id}`,
									children: "›"
								}) })
							]
						}, incident.id)) })] }),
						data && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-live-state",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incidents.length ? "No incident records match this search" : "No active incident evidence" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: incidents.length ? "Adjust or clear the search to inspect stored incident records." : "No active incident rows are stored. This does not establish monitoring coverage or network health." })
							]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-live-state",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Incident register unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated operations snapshot to review active incident rows." })
							]
						})
					]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					"aria-label": "Close incident",
					onClick: () => setSelectedIncidentId(null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "incident-drawer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "panel-kicker",
									children: [selected.id, " · LIVE INCIDENT"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Opened ", formatAge(selected.openedAt)] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setSelectedIncidentId(null),
								"aria-label": "Close incident",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "incident-drawer-banner",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `incident-icon incident-${selected.severity.toLowerCase()}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, { size: 20 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Current state" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								selected.severity,
								" · ",
								selected.status
							] })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "device-detail-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Incident evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Affected services" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.impactEstimateUnavailable ? "Not calculated for this scope" : selected.affectedCustomers })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Acknowledged by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.acknowledgedBy || "Not acknowledged" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Acknowledged at" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.acknowledgedAt ? formatAge(selected.acknowledgedAt) : "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Network writes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Disabled" })] })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "incident-owner",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.acknowledgedBy ? "Operator acknowledgement recorded" : "Acknowledgement required" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selected.acknowledgedBy ? "The attribution is stored in the audit trail." : "Acknowledge below to record operator ownership." })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncidentActions, {
							id: selected.id,
							onChanged: () => {
								refresh();
								loadHistory();
							}
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LiveAlertsIncidents as default };
