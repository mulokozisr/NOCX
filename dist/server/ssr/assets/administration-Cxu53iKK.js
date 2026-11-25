import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as KeyRound } from "./key-round-CSmhIP5z.js";
import { t as Lock } from "./lock-B6YytJe-.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Server } from "./server-DGu4Aqms.js";
import { t as UserCheck } from "./user-check-BKIWF-YP.js";
import { t as Users } from "./users-BADfTVSw.js";
//#region app/administration.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	"Overview",
	"Operators",
	"Integrations",
	"Audit & boundaries"
];
function formatDate(value) {
	if (!value) return "No evidence";
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-TZ", {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(date);
}
function statusClass(value) {
	return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
async function getJson(url) {
	const response = await fetch(url, { cache: "no-store" });
	if (!response.ok) {
		const payload = await response.json().catch(() => null);
		throw new Error(response.status === 401 ? "Authentication required" : payload?.error || `Evidence request failed (${response.status})`);
	}
	return response.json();
}
function assertCoherentAdministrationEvidence(security, integrations, access) {
	const checkedAt = [security.checkedAt, integrations.checkedAt].map((value) => Date.parse(value));
	if (checkedAt.some((value) => !Number.isFinite(value) || value > Date.now()) || Math.max(...checkedAt) - Math.min(...checkedAt) > 5e3) throw new Error("Administration evidence sources are not chronologically coherent");
	if (!access.identity.email || access.identity.email.toLowerCase() !== security.actor.email.toLowerCase()) throw new Error("Administration evidence identities do not match");
}
function Administration() {
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [evidence, setEvidence] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	async function refresh() {
		setLoading(true);
		setError("");
		try {
			const [security, integrations, access] = await Promise.all([
				getJson("/api/platform/security"),
				getJson("/api/platform/integrations"),
				getJson("/api/platform/access")
			]);
			assertCoherentAdministrationEvidence(security, integrations, access);
			setEvidence({
				security,
				integrations,
				access
			});
		} catch (requestError) {
			setEvidence(null);
			setError(requestError instanceof Error ? requestError.message : "Administration evidence is unavailable");
		} finally {
			setLoading(false);
		}
	}
	(0, import_react.useEffect)(() => {
		let active = true;
		Promise.all([
			getJson("/api/platform/security"),
			getJson("/api/platform/integrations"),
			getJson("/api/platform/access")
		]).then(([security, integrations, access]) => {
			assertCoherentAdministrationEvidence(security, integrations, access);
			if (active) setEvidence({
				security,
				integrations,
				access
			});
		}).catch((requestError) => {
			if (active) setError(requestError instanceof Error ? requestError.message : "Administration evidence is unavailable");
		}).finally(() => {
			if (active) setLoading(false);
		});
		return () => {
			active = false;
		};
	}, []);
	const operators = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return evidence?.security.operators ?? [];
		return (evidence?.security.operators ?? []).filter((operator) => `${operator.displayName} ${operator.email} ${operator.role ?? ""} ${operator.status}`.toLowerCase().includes(needle));
	}, [evidence, query]);
	const auditEvents = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		if (!needle) return evidence?.security.auditEvents ?? [];
		return (evidence?.security.auditEvents ?? []).filter((event) => `${event.actorEmail} ${event.action} ${event.resourceType} ${event.resourceId ?? ""} ${event.outcome}`.toLowerCase().includes(needle));
	}, [evidence, query]);
	const summary = evidence?.security.summary;
	const integrationSummary = evidence?.integrations.summary;
	const checkedAt = evidence ? [evidence.security.checkedAt, evidence.integrations.checkedAt].sort().at(-1) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "admin113-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "admin113-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Administration & platform evidence" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/staff",
						children: "Manage staff and roles"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "COHERENT ADMINISTRATION EVIDENCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Inspect registered operators, enforced roles, collector state, credential references and audit decisions without inventing users, sessions, integrations or compliance." })
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void refresh(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						size: 15,
						className: loading ? "spin" : ""
					}), " Refresh evidence"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "admin113-boundary-banner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Identity-bound coherent server-side evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Security and collector snapshots must be valid, non-future, closely timed, and bound to the same authenticated operator. No seeded identities, sessions, MFA percentages, integration health or security-success claims are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "0 external actions" })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "admin113-state",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: error }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign in as a registered operator to read production administration evidence." })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "admin113-summary nocx-summary-grid",
				"aria-label": "Administration evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active operators" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary?.activeOperators ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Registered identities only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Persistent roles" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary?.roles ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Enforced server-side" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Collectors online" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: integrationSummary ? `${integrationSummary.collectorsOnline}/${integrationSummary.collectors}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Recent stored evidence" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Credential references" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary?.credentialReferences ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Secret values excluded" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Audit decisions · 24h" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary?.auditEvents24h ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary ? `${summary.deniedAccess24h} denied` : "Persistent decisions" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "admin113-tabs",
				role: "tablist",
				"aria-label": "Administration evidence sections",
				children: tabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					role: "tab",
					"aria-selected": tab === item,
					className: tab === item ? "admin113-tab-active" : "",
					onClick: () => {
						setTab(item);
						setQuery("");
					},
					children: [
						item,
						item === "Operators" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: evidence?.security.operators.length ?? 0 }),
						item === "Integrations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: evidence?.integrations.collectors.length ?? 0 })
					]
				}, item))
			}),
			tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "admin113-overview-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel admin113-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "IDENTITY BOUNDARY"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Current authenticated context" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 17 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "admin113-definition-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Identity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: evidence?.access.identity.displayName || evidence?.access.identity.email || "Authentication required" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: evidence?.access.identity.role || "No role evidence" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Session source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: evidence?.access.session.source || "No session evidence" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Idle policy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: evidence ? `${evidence.access.session.idleTimeoutMinutes} minutes` : "No policy evidence" })] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel admin113-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "COLLECTOR EVIDENCE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Observed platform ingestion" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 17 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "admin113-definition-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Observed targets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: integrationSummary?.observedTargets ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Accepted · 24h" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: integrationSummary?.accepted ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Rejected · 24h" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: integrationSummary?.rejected ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Queue depth" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: integrationSummary?.queueDepth ?? "—" })] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel admin113-panel admin113-wide",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "panel-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "EVIDENCE FRESHNESS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "What this workspace can prove" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 17 })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "admin113-proof-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Authorization" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: summary ? `${summary.auditEventsTotal} persisted decisions` : "Authentication required" })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 15 }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Operator register" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: summary ? `${summary.activeOperators} active identities` : "Authentication required" })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 15 }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Collector observations" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: integrationSummary?.latestEvidenceAt ? formatDate(integrationSummary.latestEvidenceAt) : "No recent evidence" })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 15 }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Credential metadata" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: summary ? `${summary.referencesNeedingReview} need review` : "Authentication required" })
									] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: ["Evidence checked: ", formatDate(checkedAt)] })
						]
					})
				]
			}),
			tab === "Operators" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel admin113-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin113-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PERSISTENT IDENTITY REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Registered operators" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Status, assigned role and last-seen evidence from D1. Session counts and MFA enrollment are not inferred." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
							value: query,
							setValue: setQuery,
							label: "Search registered operators"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "admin113-table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "admin113-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Operator" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Role" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last seen" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: operators.map((operator) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: operator.displayName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									operator.email,
									" · ",
									operator.id
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: operator.role || "Unassigned" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `admin113-status status-${statusClass(operator.status)}`,
									children: operator.status
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDate(operator.lastSeenAt) })
							] }, operator.id)) })]
						})
					}),
					!operators.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "No operator evidence",
						detail: error || "No registered operator matches this search."
					})
				]
			}),
			tab === "Integrations" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "admin113-stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel admin113-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "admin113-register-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "LIVE COLLECTOR REGISTER"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Commissioned ingestion" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Health is derived only from recent persistent collector observations." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "admin113-readonly",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 13 }), " Read only"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "admin113-card-grid",
							children: (evidence?.integrations.collectors ?? []).map((collector) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "admin113-collector-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 17 }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											collector.vendor,
											" · ",
											collector.id
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: collector.name })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
											className: `admin113-status status-${statusClass(collector.operationalStatus)}`,
											children: collector.operationalStatus
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Targets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: collector.targetCount })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Accepted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: collector.accepted })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Rejected" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: collector.rejected })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Queue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: collector.queueDepth })] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: ["Last evidence: ", formatDate(collector.latestObservedAt)] })
								]
							}, collector.id))
						}),
						!evidence?.integrations.collectors.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No collector evidence",
							detail: error || "No collector is registered in persistent storage."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel admin113-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin113-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "SECRET-SAFE REFERENCES"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Credential metadata" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "References and validation dates only. Credential values never leave their storage provider." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "admin113-readonly",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 13 }), " Values excluded"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "admin113-table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "admin113-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Reference" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "System" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Method" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Owner" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last validated" })
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (evidence?.security.credentials ?? []).map((credential) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: credential.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									credential.id,
									" · v",
									credential.version
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: credential.system }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: credential.authenticationMethod }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: credential.owner }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `admin113-status status-${statusClass(credential.rotationOverdue ? "review" : credential.status)}`,
									children: credential.rotationOverdue ? "review" : credential.status
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDate(credential.lastValidatedAt) })
							] }, credential.id)) })]
						})
					})]
				})]
			}),
			tab === "Audit & boundaries" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "admin113-stack",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel admin113-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "admin113-register-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "APPEND-ONLY AUTHORIZATION EVIDENCE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recent access decisions" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Actor, action, resource and outcome persisted by the server authorization boundary." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBox, {
								value: query,
								setValue: setQuery,
								label: "Search audit evidence"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "admin113-table-wrap",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "admin113-table",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Time" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Actor" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Decision" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Resource" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Outcome" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Request" })
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: auditEvents.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDate(event.createdAt) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: event.actorEmail }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: event.action }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [event.resourceType, event.resourceId ? ` · ${event.resourceId}` : ""] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `admin113-status status-${statusClass(event.outcome)}`,
										children: event.outcome
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: event.requestId }) })
								] }, event.id)) })]
							})
						}),
						!auditEvents.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No audit evidence",
							detail: error || "No access decision matches this search."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel admin113-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin113-register-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "UNCOMMISSIONED CAPABILITIES"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Administrative actions fail closed" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Visible evidence does not imply an integration or a right to change the external system." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 18 })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin113-boundary-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
								title: "Operator invitation and identity lifecycle",
								detail: "No identity-provider write integration is commissioned",
								state: "Disabled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
								title: "MFA enrollment and verification",
								detail: "No authoritative MFA evidence feed is commissioned",
								state: "Unproven"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
								title: "Live session telemetry and revocation",
								detail: "No authoritative session-management integration is commissioned",
								state: "Unavailable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
								title: "Collector or connector setup",
								detail: "No external connection is created from this workspace",
								state: "Disabled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
								title: "Email, report and notification relay",
								detail: "No delivery system is commissioned here",
								state: "Disabled"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundary, {
								title: "Router, switch and radio actions",
								detail: "Network writes remain outside the administration boundary",
								state: "Disabled"
							})
						]
					})]
				})]
			})
		]
	});
}
function SearchBox({ value, setValue, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "admin113-search",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				onChange: (event) => setValue(event.target.value),
				placeholder: "Search persistent evidence…",
				"aria-label": label
			}),
			value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setValue(""),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
			})
		]
	});
}
function EmptyState({ title, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "admin113-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 24 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: detail })
		]
	});
}
function Boundary({ title, detail, state }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 16 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: detail })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: state })
	] });
}
//#endregion
export { Administration as default };
