import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { c as Gauge, d as TriangleAlert, l as Clock3, o as Radio, s as Router } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as HardDrive } from "./hard-drive-ra7fzo_9.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Radar } from "./radar-BnxOE1TP.js";
import { t as Wifi } from "./wifi-SlipR1re.js";
import { t as MapPin } from "./map-pin-BYYZwnIv.js";
import { t as ListChecks } from "./list-checks-Bc5p-G5V.js";
import { i as useLiveOperations, n as formatBps, t as formatAge } from "./live-operations-ClF_13he.js";
import { t as OctagonAlert } from "./octagon-alert-C_rHr69G.js";
//#region app/operations-center.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function points(values, width = 700, height = 190) {
	const max = Math.max(1, ...values);
	return values.map((value, index) => `${values.length === 1 ? width : index / (values.length - 1) * width},${height - value / max * height}`).join(" ");
}
function handoffLabel(state) {
	return state === "current" ? "Current" : state === "collector_stale" ? "Collector stale" : state === "evidence_stale" ? "Evidence stale" : state === "awaiting_metrics" ? "Awaiting metrics" : "Awaiting availability";
}
function useOnboardingInbox() {
	const [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [loading, setLoading] = (0, import_react.useState)(true);
	const refresh = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/onboarding-summary", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "Device intake evidence is unavailable");
			setData(body);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Device intake evidence is unavailable");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void refresh(), 0);
		return () => window.clearTimeout(initial);
	}, [refresh]);
	return {
		data,
		error,
		loading,
		refresh
	};
}
function OperationsCenter() {
	const { data, error, loading, refresh } = useLiveOperations(15), intake = useOnboardingInbox(), summary = data?.summary;
	const rx = data?.trafficSeries.map((item) => item.rxBps) ?? [], tx = data?.trafficSeries.map((item) => item.txBps) ?? [], trafficSamples = [...rx, ...tx], maxTraffic = trafficSamples.length ? Math.max(...trafficSamples) : null, chartMax = maxTraffic ?? 0;
	const refreshAll = async () => {
		await Promise.all([refresh(), intake.refresh()]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "dashboard",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "dashboard-intro",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What needs attention" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Unknown means monitoring evidence is missing or stale." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void refreshAll(),
					disabled: loading || intake.loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: loading || intake.loading ? "refresh-spin" : "",
						size: 16
					}), loading || intake.loading ? "Refreshing…" : "Refresh data"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Live evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [error, ". The last verified snapshot remains visible when available."] })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `live-evidence-strip ${data ? "" : "is-unavailable"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Latest network data" : "Network data unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? `Checked ${formatAge(data.checkedAt)} · ${summary?.collectorsOnline}/${summary?.collectorsTotal} collectors current` : loading ? "Loading network data…" : "No network data is available." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 13 }), data ? "Read-only" : "Unavailable"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "metric-grid nocx-summary-grid",
				"aria-label": "Live network summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						className: "metric-card",
						href: "#/devices",
						tone: "green",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed availability" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary?.observedAvailabilityPct == null ? "—" : `${summary.observedAvailabilityPct}%` }),
						valueClassName: summary?.observedAvailabilityPct == null ? "" : "text-green",
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "24-hour collected samples" : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						className: "metric-card",
						href: "#/incidents",
						tone: "red",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active incidents" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary?.activeIncidents ?? "—" }),
						valueClassName: summary?.activeIncidents ? "text-red" : "",
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary ? `${summary.unacknowledgedIncidents} need acknowledgement` : loading ? "Loading incident evidence" : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						className: "metric-card",
						href: "#/devices?status=Offline",
						tone: "red",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Offline devices" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary?.offline ?? "—" }),
						valueClassName: summary ? summary.offline ? "text-red" : "text-green" : "",
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary ? `${summary.devices} verified inventory records` : "Evidence unavailable" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						className: "metric-card",
						href: "#/customers",
						tone: "amber",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Affected services" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary?.impactedServices ?? "—" }),
						valueClassName: summary ? summary.impactedServices ? "text-amber" : "text-green" : "",
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? "Approved dependency mappings only" : "Evidence unavailable" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel fleet-attention-panel",
				"aria-label": "Prioritized fleet attention queue",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "PRIORITIZED ATTENTION"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Devices requiring operator review" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `attention-count ${data?.attentionQueue.length ? "has-attention" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, { size: 15 }), data ? data.attentionQueue.length : "—"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fleet-attention-list",
					children: [
						data?.attentionQueue.slice(0, 8).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `#/devices?device=${encodeURIComponent(item.deviceId)}`,
							className: `attention-${item.priority}`,
							"aria-label": `Review ${item.deviceName} in device inventory`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "attention-rank",
									children: item.priority
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.deviceName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									item.vendor,
									" · ",
									item.site || "Unassigned site",
									" · ",
									item.reasons.join(" · ")
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "attention-impact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.dependentServices }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "services" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "attention-age",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }), formatAge(item.lastSeenAt)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
									className: "attention-open",
									size: 16
								})
							]
						}, item.deviceId)),
						data && !data.attentionQueue.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-live-state",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 22 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No devices currently require attention" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "All verified devices with current evidence are online and have no active incident links." })
							]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-live-state",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 22 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Attention evidence unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The queue will appear when a verified operations snapshot is available." })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel fleet-rollup-panel",
				"aria-label": "Fleet coverage by vendor and site",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "FLEET COVERAGE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Devices by vendor and site" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 18 })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fleet-rollup-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Vendors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fleet-rollup-list",
						children: [
							data?.fleet.vendors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `#/devices?vendor=${encodeURIComponent(item.label)}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 15 }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										item.devices,
										" devices · ",
										item.online,
										" online · ",
										item.offline,
										" offline"
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.unknown ? `${item.unknown} unknown` : item.degraded ? `${item.degraded} degraded` : "Observed" })
								]
							}, item.label)),
							data && !data.fleet.vendors.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No verified vendor records." }),
							!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Fleet evidence unavailable." })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Sites" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fleet-rollup-list",
						children: [
							data?.fleet.sites.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `#/devices?site=${encodeURIComponent(item.label)}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 15 }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										item.devices,
										" devices · ",
										item.online,
										" online · ",
										item.offline,
										" offline"
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.unknown ? `${item.unknown} unknown` : item.degraded ? `${item.degraded} degraded` : "Observed" })
								]
							}, item.label)),
							data && !data.fleet.sites.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No verified site records." }),
							!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Site evidence unavailable." })
						]
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "panel intake-inbox setup-queue",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
						"Device setup ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: intake.data ? `${intake.data.summary.pendingApprovals} pending review` : "Status unavailable" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "DEVICE INTAKE INBOX"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Cudy and MikroTik onboarding" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Review discovered routers before adding them." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "secondary-button",
							href: "#/device-onboarding",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { size: 15 }), "Open onboarding"]
						})]
					}),
					intake.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-inbox-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Device intake evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: intake.error })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-inbox-summary nocx-summary-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								href: "#/device-onboarding?tab=mikrotik_discovery",
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Pending review" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: intake.data?.summary.pendingApprovals ?? "—" }),
								detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: intake.data ? `${intake.data.summary.mikrotikCandidates} MikroTik · ${intake.data.summary.cudyCandidates} Cudy` : "Evidence unavailable" }) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								href: "#/device-onboarding?tab=mikrotik_discovery",
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active discovery jobs" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: intake.data?.summary.activeDiscoveryJobs ?? "—" }),
								detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: intake.data ? `${intake.data.summary.blockedDiscoveryJobs} require attention` : "Evidence unavailable" }) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								href: "#/device-onboarding?tab=registered",
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Registered targets" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: intake.data?.summary.registeredDevices ?? "—" }),
								detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: intake.data ? `${intake.data.summary.monitoringCurrent} reporting current evidence` : "Evidence unavailable" }) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								href: "#/collector-management",
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current collectors" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: intake.data?.summary.currentCollectors ?? "—" }),
								detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Heartbeat within three minutes" }) })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "intake-candidate-list",
						children: [
							intake.data?.candidates.slice(0, 6).map((candidate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `#/device-onboarding?tab=${candidate.onboardingTab}&candidate=${encodeURIComponent(candidate.id)}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `intake-vendor intake-${candidate.vendor.toLowerCase()}`,
										children: candidate.vendor === "Cudy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 16 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: candidate.hostname || candidate.address }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										candidate.address,
										" · ",
										candidate.model || `${candidate.vendor} device`,
										" · ",
										candidate.site || "Unassigned site"
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: candidate.collectorCurrent ? "collector-current" : "collector-stale",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), candidate.collectorCurrent ? "Collector current" : "Collector stale"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [candidate.confidence, "%"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
								]
							}, candidate.id)),
							intake.data && !intake.data.candidates.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intake-inbox-empty",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 21 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No supported candidates waiting for review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "New Cudy and MikroTik discoveries will appear here before registration." })] })]
							}),
							!intake.data && !intake.loading && !intake.error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "intake-inbox-empty",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 21 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Intake snapshot unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No pending total is inferred." })] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "monitoring-handoff",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "INTAKE-TO-MONITORING HANDOFF"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Registered targets awaiting current evidence" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Registration alone never creates an online or healthy state." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: intake.data ? `${intake.data.summary.monitoringPending} pending` : "Unavailable" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [intake.data?.monitoringHandoffs.filter((handoff) => !handoff.monitoringCurrent).slice(0, 8).map((handoff) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `#/devices?device=${encodeURIComponent(handoff.deviceId)}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `handoff-state handoff-${handoff.handoffState}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), handoffLabel(handoff.handoffState)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: handoff.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									handoff.vendor,
									" · ",
									handoff.site || "Unassigned site",
									" · ",
									handoff.address
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "handoff-evidence",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
											className: handoff.collectorCurrent ? "accepted" : "blocked",
											children: "Collector"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
											className: handoff.availabilityCurrent ? "accepted" : "blocked",
											children: "Availability"
										}),
										handoff.metricRequired && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
											className: handoff.metricCurrent ? "accepted" : "blocked",
											children: "Metrics"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: handoff.observedAt ? formatAge(handoff.observedAt) : "Never observed" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
							]
						}, handoff.registrationId)), intake.data && intake.data.summary.monitoringPending === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-inbox-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 21 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "All registered targets have current monitoring evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "This is evidence freshness only, not a network-health approval." })] })]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "device-lifecycle-control",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Onboarding progress and blockers" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "LIFECYCLE CONTROL"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Discovery-to-monitoring operating queue" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "One canonical record per address or device. Every incomplete record shows its first blocker and exact next action." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: intake.data ? `${intake.data.summary.lifecycleCompletionPct}% complete` : "Unavailable" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lifecycle-rollup",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Lifecycle records" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: intake.data?.summary.lifecycleRecords ?? "—" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Current monitoring" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: intake.data?.summary.lifecycleCurrent ?? "—" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Blocked or incomplete" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: intake.data?.summary.lifecycleBlocked ?? "—" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Site assignment pending" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: intake.data?.summary.lifecycleUnassigned ?? "—" })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lifecycle-list",
								children: [intake.data?.lifecycleItems.slice(0, 10).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: item.nextAction.href,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `intake-vendor intake-${item.vendor.toLowerCase()}`,
											children: item.vendor.toLowerCase() === "cudy" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 16 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "lifecycle-identity",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
												item.vendor,
												" · ",
												item.siteAssigned ? item.site : "Site unassigned",
												" · ",
												item.address
											] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "lifecycle-progress",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${item.completionPct}%` } }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
												item.completionPct,
												"% · ",
												item.recordType === "candidate" ? "Approval pending" : item.monitoringCurrent ? "Monitoring current" : "Evidence incomplete"
											] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "lifecycle-next",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.nextAction.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [item.blockers[0] ?? "All required evidence is current", item.blockers.length > 1 ? ` · +${item.blockers.length - 1} more` : ""] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
									]
								}, item.id)), intake.data && !intake.data.lifecycleItems.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "intake-inbox-empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { size: 21 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted lifecycle records" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Authorize a private-range discovery job to begin the controlled onboarding path." })] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Canonical evidence only · approval stays manual · stale data fails closed · no credential values, SNMP SET or network writes" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: intake.data ? `${intake.data.lifecycleProgram.capabilities.length} enforced controls` : "Fail closed" })
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Approval required · automatic enrollment disabled · credential values hidden · SNMP SET and network writes disabled" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: intake.data ? `Checked ${formatAge(intake.data.checkedAt)}` : "Fail closed" })
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "primary-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel traffic-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "COLLECTED INTERFACE TRAFFIC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Bandwidth" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `live-status-pill ${data ? "" : "is-unavailable"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), data ? `${data.trafficSeries.length} stored points` : "Unavailable"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "traffic-stats",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-blue" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(summary?.currentRxBps) }),
									" Receive · ",
									summary ? `${summary.currentRxInterfaces}/${summary.observedInterfaces}` : "—",
									" interfaces"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "legend-green" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(summary?.currentTxBps) }),
									" Transmit · ",
									summary ? `${summary.currentTxInterfaces}/${summary.observedInterfaces}` : "—",
									" interfaces"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "capacity-note",
									children: "No assumed link capacity"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "chart-area",
							"aria-label": "Collected interface traffic",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "y-axis",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(maxTraffic) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(maxTraffic === null ? null : chartMax * .75) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(maxTraffic === null ? null : chartMax * .5) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBps(maxTraffic === null ? null : chartMax * .25) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? "0" : "—" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "chart-plot",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									viewBox: "0 0 700 190",
									preserveAspectRatio: "none",
									role: "img",
									"aria-label": "Receive and transmit bandwidth trends",
									children: [
										[
											0,
											47.5,
											95,
											142.5,
											190
										].map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
											x1: "0",
											y1: y,
											x2: "700",
											y2: y,
											className: "chart-grid-line"
										}, y)),
										rx.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
											points: points(rx),
											className: "line-download"
										}),
										tx.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
											points: points(tx),
											className: "line-upload"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "x-axis",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? "Oldest" : "Unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? new Date(data.checkedAt).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit"
									}) : "—" })]
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel incidents-panel",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "ACTION REQUIRED"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Active incident evidence" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: summary ? `${summary.activeIncidents} open records` : loading ? "Loading" : "Unavailable" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "incident-list",
						children: [
							data?.incidents.slice(0, 5).map((incident) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "incident-row",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `incident-icon incident-${incident.severity.toLowerCase()}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 19 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "incident-copy",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incident.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											incident.id,
											" · ",
											formatAge(incident.openedAt),
											" · ",
											incident.affectedCustomers,
											" impacted"
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `severity-badge severity-${incident.severity.toLowerCase()}`,
										children: incident.severity
									})
								]
							}, incident.id)),
							data && data.incidents.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "empty-live-state",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 22 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No active incident evidence" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No active incident rows are stored. Monitoring coverage and network health remain separate evidence questions." })
								]
							}),
							!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "empty-live-state",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 22 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Incident evidence unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated operations snapshot to review active incident rows." })
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "secondary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel compact-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "DEVICE HEALTH"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Commissioned inventory" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 17 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "region-list",
							children: [
								data?.devices.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `region-dot region-${device.status === "online" ? "good" : device.status === "degraded" ? "warning" : device.status === "offline" ? "critical" : "unknown"}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										device.site || "Unassigned site",
										" · ",
										formatAge(device.lastSeenAt)
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: device.status })
								] }, device.id)),
								loading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "empty-live-state",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
										className: "refresh-spin",
										size: 20
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading verified devices…" })]
								}),
								!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "empty-live-state",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Inventory evidence unavailable" })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel compact-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "SERVICE EXPERIENCE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Current collection quality" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 17 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mini-stat-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Average latency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: summary?.averageLatencyMs == null ? "—" : `${summary.averageLatencyMs} ms` })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Average packet loss" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: summary?.averagePacketLossPct == null ? "—" : `${summary.averagePacketLossPct}%` })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Degraded devices" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: summary?.degraded ?? "—" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Unknown state" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: summary?.unknown ?? "—" })] })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel compact-panel",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "EVIDENCE SCOPE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Snapshot boundaries" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "control-boundary-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Collector records" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? `${data.summary.collectorsOnline} / ${data.scope.collectorRecords} current` : "Unavailable" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Recent sample rows" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? data.scope.availabilitySamples + data.scope.metricSamples : "Unavailable" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Active incident rows" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? data.scope.activeIncidentRecords : "Unavailable" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Approved dependencies" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? data.scope.approvedDependencies : "Unavailable" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Network writes" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Disabled" : "Unavailable" })
								] })
							]
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { OperationsCenter as default };
