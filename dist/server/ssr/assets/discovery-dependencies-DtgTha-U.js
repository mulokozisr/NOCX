import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as History } from "./history-ClpmxT4G.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as GitBranch } from "./git-branch-BS9K82eP.js";
import { t as Radar } from "./radar-BnxOE1TP.js";
//#region node_modules/lucide-react/dist/esm/icons/route.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Route = createLucideIcon("Route", [
	["circle", {
		cx: "6",
		cy: "19",
		r: "3",
		key: "1kj8tv"
	}],
	["path", {
		d: "M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15",
		key: "1d8sl"
	}],
	["circle", {
		cx: "18",
		cy: "5",
		r: "3",
		key: "gq8acd"
	}]
]);
//#endregion
//#region app/discovery-dependencies.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/discovery-dependencies.tsx
var import_jsx_runtime = require_jsx_runtime();
function display(value) {
	return value.replaceAll("_", " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
function time(value) {
	if (!value) return "Unavailable";
	const parsed = new Date(value);
	return Number.isNaN(parsed.valueOf()) ? "Invalid stored time" : parsed.toLocaleString();
}
function DiscoveryDependencies() {
	const [data, setData] = (0, import_react.useState)(null);
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/discovery-evidence", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "Discovery evidence is unavailable.");
			setData(body);
			setSelectedId((current) => body.scopes.some((row) => row.id === current) ? current : body.scopes[0]?.id ?? "");
		} catch (reason) {
			setData(null);
			setError(reason instanceof Error ? reason.message : "Discovery evidence is unavailable.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(initial);
	}, [load]);
	const selected = data?.scopes.find((row) => row.id === selectedId) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "discovery-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "discovery-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Record exact scan boundaries without starting probes." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "GOVERNED DISCOVERY SCOPE INTENTS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Authorized scope intents require a registered collector, explicit non-wildcard boundary and approved read-only methods. Every new intent remains draft, unapproved and probe-disabled." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "discovery-live-strip discovery-live-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Discovery evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [error, ". No fallback scope, path or confidence claim was generated."] })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "discovery-live-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict referenced records only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Orphaned, future, invalid, self-referential and out-of-order evidence is excluded; stored status is never upgraded by this workspace." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Probes disabled"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "discovery-summary nocx-summary-grid",
				"aria-label": "Persistent discovery evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Discovery scopes" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.scopes ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Stored records" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Probe-enabled scopes" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.probeEnabledScopes ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No activation offered" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Evidence records" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.evidenceRecords ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Stored observations" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Dependency records" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.dependencyRecords ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.approvedDependencies} stored approved` : "Evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "discovery-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel discovery-scopes",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PERSISTENT SCOPE REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recorded discovery boundaries" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No subnet, range or device allowlist is supplied by the interface." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { size: 19 })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "scope-list",
							children: data?.scopes.map((scope) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === scope.id ? "active" : "",
								onClick: () => setSelectedId(scope.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
										className: "scope-state",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { size: 16 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											scope.id,
											" · ",
											scope.collector?.name ?? scope.collectorId
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: scope.name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: scope.targetBoundary })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: display(scope.status) })
								]
							}, scope.id))
						}),
						!loading && !data?.scopes.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "discovery-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent discovery scope" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No default collector, range or method is inferred." })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel discovery-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STORED SCOPE EVIDENCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.id,
								" · updated ",
								time(selected.updatedAt)
							] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "scope-badge",
							children: display(selected.status)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "discovery-gates",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Recorded boundary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.targetBoundary }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No range expansion" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Recorded collector" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.collector?.name ?? selected.collectorId }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: selected.collector ? display(selected.collector.status) : "Collector evidence unavailable" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Recorded methods" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.methods.length ? selected.methods.join(" · ") : "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Presence does not activate a probe" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Approval evidence" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.approvedBy ?? "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: time(selected.approvedAt) })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Probe flag" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.probesEnabled ? "Stored as enabled" : "Stored as disabled" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No activation action is exposed" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Evidence rows" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.evidenceCount }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Persistent records only" })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "discovery-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								disabled: true,
								children: "Dry run unavailable"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								disabled: true,
								children: "Probe activation disabled"
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "discovery-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No scope selected" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The inspector remains empty and fail closed." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel dependency-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "PERSISTENT DEPENDENCY REGISTER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored upstream and downstream relationships" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confidence, affected-customer and approval fields are shown as evidence, not recomputed decisions." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { size: 20 })] }), data?.dependencies.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dependency-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dependency-head",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upstream" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Downstream & relation" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Affected" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status & source" })
						]
					}), data.dependencies.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dependency-record",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.upstreamDevice?.hostname ?? row.upstreamDeviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: row.upstreamDevice?.site ?? "Site unavailable" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: row.downstreamDevice?.hostname ?? row.downstreamDeviceId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								display(row.relation),
								" · confidence ",
								row.confidence
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.affectedCustomers }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "stored value" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: display(row.status) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: row.sourceEvidence ? `${display(row.sourceEvidence.evidenceType)} · ${time(row.sourceEvidence.observedAt)}` : "Source evidence unavailable" })] })
						]
					}, row.id))]
				}) : !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "discovery-empty",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent dependency evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No topology path, service count or confidence value is invented." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel discovery-evidence-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "RECENT DISCOVERY EVIDENCE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored observations" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {})] }),
					data?.evidence.slice(0, 20).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: display(row.evidenceType) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							row.device?.hostname ?? row.deviceId ?? "No device reference",
							" · ",
							time(row.observedAt)
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: row.sourceCollector?.name ?? row.sourceCollectorId }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: display(row.status) })
					] }, row.id)),
					!loading && !data?.evidence.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "discovery-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No discovery evidence recorded" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel discovery-governance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "FAIL-CLOSED DISCOVERY BOUNDARY"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Scope intent cannot start a scan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Rejected evidence: ", data ? Object.values(data.evidenceIntegrity).reduce((total, value) => total + value, 0) : 0] })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "Draft intents require a registered collector, explicit boundary and read-only methods."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "No dry-run plan or browser-generated evidence."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "No probe activation or topology write."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "No automatic customer-impact or confidence decision."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "No credential values returned."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Network configuration writes remain disabled."] })
				] })]
			})
		]
	});
}
//#endregion
export { DiscoveryDependencies as default };
