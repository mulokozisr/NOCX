import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as KeyRound } from "./key-round-CSmhIP5z.js";
import { t as Lock } from "./lock-B6YytJe-.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as UserCheck } from "./user-check-BKIWF-YP.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as EyeOff } from "./eye-off-V-Zlj26F.js";
import { t as Fingerprint } from "./fingerprint-Cu9i3RAi.js";
import { t as ShieldAlert } from "./shield-alert-Cfamcj-Z.js";
//#region app/security.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function formatAge(value) {
	if (!value) return "Never";
	const seconds = Math.max(0, Math.round((Date.now() - Date.parse(value)) / 1e3));
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function SecurityMonitoring() {
	const [data, setData] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [query, setQuery] = (0, import_react.useState)("");
	const [outcome, setOutcome] = (0, import_react.useState)("all");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/security", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Security evidence is unavailable");
			setData(body);
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Security evidence is unavailable");
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
	const visibleAudit = (0, import_react.useMemo)(() => (data?.auditEvents ?? []).filter((event) => {
		return `${event.id} ${event.actorEmail} ${event.action} ${event.resourceType} ${event.resourceId ?? ""}`.toLowerCase().includes(query.toLowerCase()) && (outcome === "all" || event.outcome === outcome);
	}), [
		data,
		outcome,
		query
	]);
	const visibleCredentials = (0, import_react.useMemo)(() => (data?.credentials ?? []).filter((reference) => `${reference.id} ${reference.label} ${reference.system} ${reference.owner}`.toLowerCase().includes(query.toLowerCase())), [data, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "security-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "security-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Security operations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "SECURITY ASSURANCE ROLLUP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Roll strict identity, authorization, credential, threat-detection and vulnerability evidence into one fail-closed assurance gate without inventing posture." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "security-actions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), loading ? "Refreshing…" : "Refresh evidence"]
					})
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Security evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict non-future audit and credential evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Invalid or future authorization and validation timestamps are excluded. Security assurance remains blocked until every required domain has accepted evidence." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), data ? `${data.securityAssurance.activeDomains} / ${data.securityAssurance.evaluatedDomains} domains` : "Fail closed"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "security-summary",
				"aria-label": "Security evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: ShieldAlert,
						label: "Denied access · 24h",
						value: String(data?.summary.deniedAccess24h ?? "—"),
						detail: "Stored authorization decisions",
						tab: "Access Audit",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Fingerprint,
						label: "Audit events · 24h",
						value: String(data?.summary.auditEvents24h ?? "—"),
						detail: `${data?.summary.auditEventsTotal ?? 0} retained events`,
						tab: "Access Audit",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: UserCheck,
						label: "Active operators",
						value: String(data?.summary.activeOperators ?? "—"),
						detail: `${data?.summary.roles ?? 0} registered roles`,
						tab: "Overview",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: KeyRound,
						label: "Credential references",
						value: String(data?.summary.credentialReferences ?? "—"),
						detail: `${data?.summary.referencesNeedingReview ?? 0} require review`,
						tab: "Credential Health",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: EyeOff,
						label: "Security assurance",
						value: data ? `${data.securityAssurance.activeDomains}/${data.securityAssurance.evaluatedDomains}` : "—",
						detail: data?.securityAssurance.releaseGate === "supported" ? "Release gate supported" : "Evidence gate blocked",
						tab: "Coverage",
						setTab
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "security-tabs",
				"aria-label": "Security operations sections",
				children: [
					"Overview",
					"Access Audit",
					"Credential Health",
					"Coverage"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: tab === item ? "security-tab-active" : "",
					onClick: () => {
						setTab(item);
						setQuery("");
					},
					children: [
						item,
						item === "Access Audit" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.auditEvents.length ?? 0 }),
						item === "Credential Health" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.credentials.length ?? 0 })
					]
				}, item))
			}),
			tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, { data }),
			tab === "Access Audit" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditRegister, {
				data: visibleAudit,
				query,
				setQuery,
				outcome,
				setOutcome
			}),
			tab === "Credential Health" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialRegister, {
				data: visibleCredentials,
				query,
				setQuery
			}),
			tab === "Coverage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRegister, { data })
		]
	});
}
function Summary({ icon: Icon, label, value, detail, tab, setTab }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
		onClick: () => setTab(tab),
		tone: "blue",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 19 }),
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: label }),
		value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: value }),
		detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: detail }) })
	});
}
function Overview({ data }) {
	const activeCoverage = data?.coverage.filter((item) => item.status === "active").length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "security-overview-grid",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "panel threat-activity-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "AUTHENTICATED OPERATOR"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Current access decision" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "access-policy-badge",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 }), "Allowed"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "access-identity-hero",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { size: 22 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data?.actor.role ?? "Loading role" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data?.actor.displayName ?? "Checking identity…" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data?.actor.email ?? "Server-side identity pending" })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "security-control-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Granted permissions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data?.actor.permissions.length ?? "—" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Policy model" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Default deny" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Audit storage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Required" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Session source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ChatGPT identity" })] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "panel attack-sources-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "EVIDENCE COVERAGE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Commissioned inputs" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 19 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "security-evidence-list",
						children: data?.coverage.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `coverage-dot coverage-${slug(item.status)}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.detail })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.status === "active" ? item.evidenceCount : "—" })
						] }, item.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "security-evidence-note",
						children: [activeCoverage, " evidence sources are active. Missing feeds remain unknown, never healthy."]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "panel posture-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "ENFORCEMENT BOUNDARY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Security controls" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 19 })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "posture-controls",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
							label: "Server-side authorization",
							detail: "Active"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
							label: "Credential values returned",
							detail: "No"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
							label: "Automatic blocking",
							detail: "Disabled"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
							label: "External security actions",
							detail: "Disabled"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Control, {
							label: "Network configuration writes",
							detail: "Disabled"
						})
					]
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel live-threat-panel",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel-heading",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "panel-kicker",
				children: "RECENT AUDIT EVIDENCE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Latest persisted decisions and actions" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "security-scan-time",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }),
					"As of ",
					formatAge(data?.checkedAt ?? null)
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditTable, { data: (data?.auditEvents ?? []).slice(0, 10) })]
	})] });
}
function Control({ label, detail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: detail })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
		className: "posture-good",
		style: { width: "100%" }
	}) })] });
}
function AuditRegister({ data, query, setQuery, outcome, setOutcome }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel security-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "security-register-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "PERSISTENT ACCESS & ACTION AUDIT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored authorization evidence" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Entries are created by server-side permission checks and governed operator actions." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "access-policy-badge",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { size: 12 }), "Append-only evidence"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "security-toolbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "security-search",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search actor, action or resource…",
								"aria-label": "Search security audit"
							}),
							query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQuery(""),
								"aria-label": "Clear audit search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "security-select",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: outcome,
							onChange: (event) => setOutcome(event.target.value),
							"aria-label": "Filter audit outcome",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All outcomes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "allowed",
									children: "Allowed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "denied",
									children: "Denied"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "security-scan-time",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }),
							data.length,
							" shown"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuditTable, { data })
		]
	});
}
function AuditTable({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "security-table-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "security-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Outcome" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Actor" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Action" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Resource" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Resource ID" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Recorded" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Request" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `access-result result-${slug(event.outcome)}`,
					children: event.outcome
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "access-user",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, { size: 14 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: event.actorEmail }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: event.id })] })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: event.action }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: event.resourceType }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: event.resourceId ?? "—" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatAge(event.createdAt) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: event.requestId ?? "—" }) })
			] }, event.id)) })]
		}), !data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "No audit evidence matches",
			copy: "No stored authorization or operator action is available for this filter."
		})]
	});
}
function CredentialRegister({ data, query, setQuery }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel security-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "security-register-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "PROTECTED REFERENCE METADATA"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Credential assurance evidence" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX shows ownership, scope, rotation and validation state without returning secret values." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "access-policy-badge",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 12 }), "0 secret values"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "security-toolbar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "security-search",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search reference, system or owner…",
							"aria-label": "Search credential references"
						}),
						query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setQuery(""),
							"aria-label": "Clear credential search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "security-scan-time",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }),
						data.length,
						" shown"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "security-table-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "security-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Reference" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "System" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Scope" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Authentication" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Owner" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Validation" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Rotation" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "access-user",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 14 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								item.id,
								" · v",
								item.version
							] })] })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.system }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [item.scopeType, item.scopeId ? ` · ${item.scopeId}` : ""] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.authenticationMethod }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `access-result ${item.status === "active" && !item.rotationOverdue ? "result-allowed" : "result-challenged"}`,
							children: item.rotationOverdue ? "rotation overdue" : item.status
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.owner }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.latestValidation ? `${item.latestValidation.outcome} · ${formatAge(item.latestValidation.observedAt)}` : "No evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.nextRotationAt ? formatAge(item.nextRotationAt) : "Not scheduled" })
					] }, item.id)) })]
				}), !data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					title: "No credential reference",
					copy: "No demonstration credential or secret value is shown."
				})]
			})
		]
	});
}
function CoverageRegister({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel security-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "security-register-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "SECURITY INPUT COVERAGE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Known evidence boundaries" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX reports an input only when a persistent production source exists." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "access-policy-badge",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "Fail closed"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "security-coverage-grid",
				children: data?.coverage.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `coverage-icon coverage-${slug(item.status)}`,
						children: item.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 18 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.status.replaceAll("_", " ") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.detail })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.status === "active" ? `${item.evidenceCount} records` : "No claims" })
				] }, item.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "security-empty",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 25 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No network threat or vulnerability feed is commissioned" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Until a governed source is connected, NOCX will not display attack counts, CVEs, confidence scores, exposure claims or automated remediation." })
				]
			})
		]
	});
}
function Empty({ title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "security-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 25 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })
		]
	});
}
//#endregion
export { SecurityMonitoring as default };
