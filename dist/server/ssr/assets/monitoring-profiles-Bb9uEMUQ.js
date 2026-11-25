import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { c as Gauge, d as TriangleAlert, l as Clock3, o as Radio } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as FileCode2 } from "./file-code-2-3x_IW9e8.js";
//#region app/monitoring-profiles.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/monitoring-profiles.tsx
var import_jsx_runtime = require_jsx_runtime();
function age(value) {
	if (!value) return "No stored evidence";
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) return "Invalid stored time";
	const seconds = Math.round((Date.now() - timestamp) / 1e3);
	if (seconds < 0) return "Future time excluded";
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function MonitoringProfiles() {
	const [data, setData] = (0, import_react.useState)(null);
	const [selectedVersion, setSelectedVersion] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/integrations", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Profile evidence is unavailable");
			setData(body);
			setSelectedVersion((current) => current || body.profiles[0]?.version || "");
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Profile evidence is unavailable");
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
	const profiles = (0, import_react.useMemo)(() => data?.profiles ?? [], [data]);
	const selected = profiles.find((profile) => profile.version === selectedVersion) ?? profiles[0] ?? null;
	const metricKeys = new Set(profiles.flatMap((profile) => profile.metricKeys)).size;
	const validSamples = profiles.reduce((total, profile) => total + profile.validSamples, 0);
	const sampleCount = profiles.reduce((total, profile) => total + profile.samples, 0);
	const observedQuality = sampleCount ? Math.round(validSamples / sampleCount * 1e4) / 100 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "profile-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "profile-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inspect only profile versions observed in telemetry" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT PROFILE-EVIDENCE STATE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX derives this register only from stored metric rows with valid, non-future timestamps and a profile version. It does not invent vendor libraries, approvals, polling intervals or model compatibility." })
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Monitoring-profile evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict observed production profile versions only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future and invalid metric timestamps are excluded. No fictional profile library, approval state, protocol, poll interval, coverage percentage, supported model, firmware scope or assignment is included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "profile-summary nocx-summary-grid",
				"aria-label": "Observed monitoring profile summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCode2, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed profiles" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? profiles.length : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "From stored metric rows" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Profiled samples" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? sampleCount : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current one-hour window" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Valid quality" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: observedQuality === null ? "—" : `${observedQuality}%` }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Stored quality flags only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Metric keys" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? metricKeys : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed normalized names" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "profile-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel profile-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "OBSERVED PROFILE REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Versions present in collected metrics" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A profile appears only when production samples identify it." })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "profile-list",
						children: [profiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: selected?.version === profile.version ? "active" : "",
							onClick: () => setSelectedVersion(profile.version),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { size: 16 }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: profile.vendors.join(", ") || "Vendor unknown" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: profile.version }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										profile.samples,
										" samples · ",
										profile.devices,
										" devices"
									] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "approved",
									children: "Observed"
								})
							]
						}, profile.version)), !profiles.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "profile-controls",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No profile-version evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A profile will appear when stored metric samples carry a profileVersion value." })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel profile-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PROFILE EVIDENCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.version }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.vendors.join(", ") || "Vendor unknown",
								" · last observed ",
								age(selected.lastObservedAt)
							] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "profile-badge approved",
							children: "Observed"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "profile-metrics",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Latest sample" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: age(selected.lastObservedAt) })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Valid samples" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
										selected.validSamples,
										" / ",
										selected.samples
									] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observed devices" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.devices })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "profile-controls",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Normalized collection contract" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Stored profile version" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.version }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Reported by collected samples" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Observed metric keys" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.metricKeys.slice(0, 6).join(" · ") || "None" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [selected.metricKeys.length, " unique keys in window"] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Raw vendor mappings" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unavailable here" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Never substituted with invented values" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Poll interval and protocol" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unknown" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No authoritative configuration source connected" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Approval and assignment" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Observed use does not imply governance approval" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Device configuration" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Writes disabled" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "This profile workspace cannot configure network devices" })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "profile-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "secondary-button",
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 14 }), "Sample test unavailable"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary-button",
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), "Approval unavailable"]
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "profile-controls",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No profile selected" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No stored profile-version evidence is available." })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel profile-governance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "FAIL-CLOSED PROFILE BOUNDARY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Observation is not configuration authority" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Only versions, quality flags, metric keys, vendors and devices observed in stored samples are shown."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Missing protocol, cadence, model and firmware scope remain unknown."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Profile creation, editing, approval and assignment are uncommissioned."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Monitoring profiles remain read-only and cannot configure network devices."] })
				] })]
			})
		]
	});
}
//#endregion
export { MonitoringProfiles as default };
