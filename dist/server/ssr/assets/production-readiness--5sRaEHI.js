import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { d as TriangleAlert } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as ShieldAlert } from "./shield-alert-Cfamcj-Z.js";
import { t as FlaskConical } from "./flask-conical-KMqTSzIk.js";
import { n as BadgeCheck, t as CircleGauge } from "./circle-gauge-DuuippXD.js";
//#region app/production-readiness.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/production-readiness.tsx
var import_jsx_runtime = require_jsx_runtime();
function age(value) {
	if (!value) return "No timestamp";
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) return "Invalid stored time";
	const seconds = Math.round((Date.now() - timestamp) / 1e3);
	if (seconds < 0) return "Future time excluded";
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function ProductionReadiness() {
	const [data, setData] = (0, import_react.useState)(null), [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/readiness", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Production-readiness evidence is unavailable");
			setData(body);
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Production-readiness evidence is unavailable");
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
	const policies = (0, import_react.useMemo)(() => data?.policies ?? [], [data]), controls = (0, import_react.useMemo)(() => data?.controls ?? [], [data]), exercises = (0, import_react.useMemo)(() => data?.exercises ?? [], [data]);
	const latest = data?.latestDecision ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "readiness-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "readiness-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Assess launch evidence by required workstream" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "RECOVERY, LOAD & UAT ASSURANCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Classify only accepted, independently validated exercises as recovery, load or user-acceptance evidence and block the launch gate until all three are supported." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Production-readiness evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `live-evidence-strip ${data ? "" : "is-unavailable"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Strict persistent readiness evidence" : "Readiness snapshot unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? "Future and invalid approval, control, exercise and decision times are excluded. Missing expiration evidence fails closed." : loading ? "Loading authenticated readiness evidence…" : "No authenticated readiness snapshot is loaded." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] }) : "Unavailable" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "readiness-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved policies" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.approvedPolicies} / ${data.summary.policies}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Valid definition and accepted approval time required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current controls" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.currentControls} / ${data.summary.controls}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Validated, evidenced, and valid unexpired time required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Recovery / load / UAT" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.launchEvidenceAssurance.supportedWorkstreams} / ${data.launchEvidenceAssurance.requiredWorkstreams}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "All three evidence workstreams required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latest decision" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? latest ? latest.decisionSupported ? latest.decision : "Unsupported" : "No record" : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? latest ? `${latest.scope} · ${age(latest.decidedAt)}` : "No accepted decision record" : "Evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "readiness-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel readiness-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STRICT REQUEST POLICIES"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Registered boundaries and approval evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A policy counts as approved only with a valid definition, accepted non-future approval time and stored approver." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 20 })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rate-table",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Boundary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Limit" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Window" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence state" })
								] }),
								policies.map((policy) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "readiness-row",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: policy.boundary }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [policy.requestLimit, " requests"] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											policy.windowSeconds,
											"s · block ",
											policy.blockSeconds,
											"s"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
											className: policy.approvedPolicy ? "ready" : "review",
											children: policy.approvedPolicy ? "approved evidence" : "review"
										})
									]
								}, policy.id)),
								data && !policies.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "readiness-empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No request-policy evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Limits and enforcement coverage remain unknown." })]
								}),
								!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "readiness-empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Policy evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated readiness snapshot to inspect registered policies." })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}), "Runtime request protection is not inferred from stored policy metadata."] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel readiness-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT SECURITY CONTROL EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Latest accepted observation per control" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Future, invalid, expired, unvalidated, evidence-free or expiry-free observations remain incomplete." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "baseline-list",
						children: [
							controls.map((control) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								control.verifiedCurrent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: control.controlKey }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									control.verifiedCurrent ? "verified current" : "review",
									" · ",
									age(control.observedAt),
									" · ",
									control.evidenceKeys.length,
									" evidence fields"
								] })
							] }, control.id)),
							data && !controls.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "readiness-empty",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted security-control evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Header, secret, dependency and permission readiness remain unassessed." })]
							}),
							!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "readiness-empty",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Control evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated readiness snapshot to inspect security controls." })]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel readiness-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "STRICT LAUNCH-EVIDENCE MATRIX"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recovery, load and user acceptance" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A workstream is supported only by accepted exercise chronology, independent validation and stored evidence fields. Keyword classification never turns an incomplete exercise into passing evidence." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "gate-list",
					children: [data?.readinessEvidenceWorkstreams.map((workstream) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: workstream.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						workstream.validatedEvidence,
						" validated / ",
						workstream.storedEvidence,
						" classified · ",
						workstream.gateSupported ? "supported" : "blocked"
					] })] }, workstream.key)), !data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "The launch-evidence matrix fails closed." })] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel readiness-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "STRICT CONTROLLED-FAILURE EVIDENCE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted isolated exercises" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Future or invalid starts and malformed completion order are excluded from validated results. This workspace cannot inject a fault." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "failure-table",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Exercise" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scenario" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Expected control" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Result" })
						] }),
						exercises.map((exercise) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "readiness-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: exercise.id }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [exercise.scenario, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: exercise.environment })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: exercise.expectedControl }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [exercise.evidenceKeys.length, " fields"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: exercise.validatedResult ? "ready" : "review",
									children: exercise.validatedResult ? "validated" : "review"
								})
							]
						}, exercise.id)),
						data && !exercises.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "readiness-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted failure-exercise evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Resilience behaviour and recovery timing remain unknown." })]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "readiness-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Exercise evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated readiness snapshot to inspect failure exercises." })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel readiness-card readiness-gate",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT READINESS DECISION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Production approval remains fail-closed" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only a valid non-future record with a named owner, required gates and evidence can support its stored decision." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
						className: data && latest?.decision === "approved" && latest.decisionSupported ? "ready" : "blocked",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleGauge, { size: 14 }), data ? latest ? latest.decisionSupported ? latest.decision : "Unsupported" : "Unassessed" : "Unavailable"]
					})] }),
					data && latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "gate-list",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Scope" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: latest.scope })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Decision evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: latest.evidenceKeys.join(" · ") || "None" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Required gates" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: latest.requiredGates.join(" · ") || "None recorded" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Decision owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: latest.decidedBy ?? "Unknown" })] })
						]
					}) : data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "readiness-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted readiness decision" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX remains unassessed; no launch or commissioning approval is inferred." })]
					}) : !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "readiness-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Readiness-decision evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated readiness snapshot to inspect decision records." })]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Policy changes, failure execution, release approval, commissioning and network configuration writes remain disabled."] })
				]
			})
		]
	});
}
//#endregion
export { ProductionReadiness as default };
