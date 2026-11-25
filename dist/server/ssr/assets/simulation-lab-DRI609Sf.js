import { t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { d as TriangleAlert } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as History } from "./history-ClpmxT4G.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as FlaskConical } from "./flask-conical-KMqTSzIk.js";
//#region app/simulation-lab.tsx
var import_jsx_runtime = require_jsx_runtime();
var SIMULATION_CAPABILITY = Object.freeze({
	scenarioRegistry: 0,
	persistentRuns: 0,
	approvedThresholds: 0,
	isolatedNamespaceCommissioned: false,
	telemetryEmission: false,
	incidentCreation: false,
	validationWrites: false,
	productionWrites: false
});
function TelemetrySimulationLab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "simulation-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "simulation-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "IMMUTABLE SIMULATION CAPABILITY CONTRACT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No executable telemetry simulation is commissioned." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX does not supply seeded network conditions, probe failures, thresholds, customer impacts, expected alerts or validation passes. A simulation becomes evidence only after governed scenario definitions and a persistent isolated run ledger exist." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "simulation-isolated",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 15 }), "Execution disabled · all write capabilities false"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "simulation-summary nocx-summary-grid",
				"aria-label": "Simulation capability status",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Scenario definitions" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: SIMULATION_CAPABILITY.scenarioRegistry }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No persistent registry" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Persistent runs" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: SIMULATION_CAPABILITY.persistentRuns }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No run ledger" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved thresholds" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: SIMULATION_CAPABILITY.approvedThresholds }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No policy source" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Production writes" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: SIMULATION_CAPABILITY.productionWrites ? "Enabled" : "Disabled" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Boundary enforced" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "simulation-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel simulation-scenarios",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "SCENARIO REGISTRY"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Uncommissioned" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No scenario ID, condition, metric value, severity or customer impact is seeded by the interface." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "simulation-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { size: 25 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent scenario definitions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A governed definition requires a source, version, owner, approved expected result and isolation contract." })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel simulation-runner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "EXECUTION BOUNDARY"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Runner unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A browser-only calculation cannot prove monitoring, alerting or customer-impact behavior." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "simulation-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { size: 25 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No run action" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The workspace cannot emit simulated telemetry, open simulated incidents, calculate a pass or write validation evidence." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "simulation-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								disabled: true,
								children: "Reset unavailable"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								disabled: true,
								children: "Run unavailable"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel simulation-history",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "PERSISTENT VALIDATION EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "No run ledger commissioned" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Session-only results are not retained, independently verifiable or safe to label as passed." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fail closed · no production records" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "simulation-empty",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 25 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No persistent simulation evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No result, customer impact, execution time or pass state is invented for this empty register." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel simulation-history simulation-boundary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "REQUIRED BEFORE ENABLEMENT"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Governance and isolation gaps" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "simulation-requirements",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "Persistent versioned scenario registry"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "Approved expected-result source"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}),
							"Provably isolated ingestion and event namespace: ",
							SIMULATION_CAPABILITY.isolatedNamespaceCommissioned ? "commissioned" : "not commissioned"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "Append-only run evidence with independent review"] })
					]
				})]
			})
		]
	});
}
//#endregion
export { TelemetrySimulationLab as default };
