import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { n as BellRing } from "./circle-alert-fwvsmlmG.js";
//#region node_modules/lucide-react/dist/esm/icons/sliders-horizontal.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var SlidersHorizontal = createLucideIcon("SlidersHorizontal", [
	["line", {
		x1: "21",
		x2: "14",
		y1: "4",
		y2: "4",
		key: "obuewd"
	}],
	["line", {
		x1: "10",
		x2: "3",
		y1: "4",
		y2: "4",
		key: "1q6298"
	}],
	["line", {
		x1: "21",
		x2: "12",
		y1: "12",
		y2: "12",
		key: "1iu8h1"
	}],
	["line", {
		x1: "8",
		x2: "3",
		y1: "12",
		y2: "12",
		key: "ntss68"
	}],
	["line", {
		x1: "21",
		x2: "16",
		y1: "20",
		y2: "20",
		key: "14d8ph"
	}],
	["line", {
		x1: "12",
		x2: "3",
		y1: "20",
		y2: "20",
		key: "m0wm8r"
	}],
	["line", {
		x1: "14",
		x2: "14",
		y1: "2",
		y2: "6",
		key: "14e1ph"
	}],
	["line", {
		x1: "8",
		x2: "8",
		y1: "10",
		y2: "14",
		key: "1i6ji0"
	}],
	["line", {
		x1: "16",
		x2: "16",
		y1: "18",
		y2: "22",
		key: "1lctlv"
	}]
]);
//#endregion
//#region app/alert-policies.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/alert-policies.tsx
var import_jsx_runtime = require_jsx_runtime();
function evidenceAge(value) {
	if (!value) return "No stored evidence";
	const timestamp = Date.parse(value), ageMs = Date.now() - timestamp;
	if (!Number.isFinite(timestamp)) return "Invalid time excluded";
	if (ageMs < 0) return "Future time excluded";
	const seconds = Math.round(ageMs / 1e3);
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function AlertPolicies() {
	const [data, setData] = (0, import_react.useState)(null);
	const [selectedMetricKey, setSelectedMetricKey] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/platform/alert-policies", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "Alert-policy evidence is unavailable.");
			setData(body);
			setSelectedMetricKey((current) => current || body.metrics[0]?.metricKey || "");
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Alert-policy evidence is unavailable.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(initial);
	}, [load]);
	const selected = (0, import_react.useMemo)(() => data?.metrics.find((metric) => metric.metricKey === selectedMetricKey) ?? data?.metrics[0] ?? null, [data, selectedMetricKey]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "policy-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "policy-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inspect operational evidence without inventing policy authority" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT POLICY-EVIDENCE STATE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Metrics, availability, incidents and notifications enter this view only with valid, non-future evidence times. They are inputs—not proof of a versioned rule, threshold, backtest or approval." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "policy-live-strip policy-live-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Alert-policy evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "policy-live-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict persistent operational evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future and invalid observation, incident and notification timestamps are excluded. No fictional rule IDs, thresholds, versions, approvals, backtests, scopes, alert totals or activation states are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Policy writes disabled"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "policy-summary nocx-summary-grid",
				"aria-label": "Persistent alert-policy evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed metric keys" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data?.summary.observedMetricKeys ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Last 24 hours" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Availability samples" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data?.summary.availabilitySamples ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Stored observations only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Incident records" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data?.summary.incidents ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Not attributed to a policy" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Notification records" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data?.summary.notifications ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "External delivery disabled here" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel policy-toolbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 15 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Policy registry" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Uncommissioned · no persistent definitions, thresholds, versions, tests or approvals" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "policy-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel policy-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "OBSERVED METRIC REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Keys present in stored samples" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Observation does not imply rule eligibility or approval." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 19 })] }),
						data?.metrics.map((metric) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: selected?.metricKey === metric.metricKey ? "active" : "",
							onClick: () => setSelectedMetricKey(metric.metricKey),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: metric.vendors.join(", ") || "Vendor unknown" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: metric.metricKey }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
									metric.samples,
									" samples · ",
									metric.devices,
									" devices"
								] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "draft",
								children: "Observed"
							})]
						}, metric.metricKey)),
						!loading && !data?.metrics.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "policy-empty",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No metric-key evidence" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No stored metric key is presented as an alert policy." })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel policy-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "METRIC EVIDENCE INSPECTOR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.metricKey }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Last observed ", evidenceAge(selected.lastObservedAt)] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Not a policy" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "policy-condition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observed collection evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								selected.validSamples,
								" valid of ",
								selected.samples,
								" samples"
							] })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Observed vendors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.vendors.join(", ") || "Unknown" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Observed units" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.units.join(", ") || "Unknown" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Observed targets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [selected.devices, " devices in the bounded evidence window"] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Trigger condition" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Unavailable · no persistent policy definition" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Validation evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Unavailable · no governed backtest register" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Approval and activation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Unavailable · observation grants no authority" })] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							disabled: true,
							children: "Backtest unavailable"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary-button",
							disabled: true,
							children: "Approval unavailable"
						})] })
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "policy-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No metric evidence selected" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No threshold or policy is inferred from missing evidence." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "policy-evidence-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel policy-domain",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "AVAILABILITY EVIDENCE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored observations" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Samples" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data?.availability.samples ?? "—" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Observed devices" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data?.availability.devices ?? "—" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Online / offline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data ? `${data.availability.onlineObservations} / ${data.availability.offlineObservations}` : "—" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Policy threshold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Unavailable" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Approval state" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "Unavailable" })] })
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel policy-domain",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "RECENT INCIDENT EVIDENCE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored outcomes" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "policy-incident-list",
						children: [data?.incidents.slice(0, 8).map((incident) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incident.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							incident.severity,
							" · opened ",
							evidenceAge(incident.openedAt)
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: incident.status })] }, incident.id)), !data?.incidents.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No incident evidence is available. No policy result is inferred." })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel policy-safety",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Fail-closed policy boundary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Policy creation, versioning, thresholds, scope, testing, approval, activation, incident creation, external notifications and network writes remain disabled. Stored operational outcomes are never substituted for missing governance records." })] })]
			})
		]
	});
}
//#endregion
export { AlertPolicies as default };
