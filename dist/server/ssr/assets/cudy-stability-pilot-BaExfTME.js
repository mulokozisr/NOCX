import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { c as Gauge, d as TriangleAlert, l as Clock3, s as Router } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as Download } from "./download-CU5_C7Ji.js";
import { t as Radar } from "./radar-BnxOE1TP.js";
import { t as Wifi } from "./wifi-SlipR1re.js";
//#region app/cudy-stability-pilot.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/cudy-stability-pilot.tsx
var import_jsx_runtime = require_jsx_runtime();
function showTime(value) {
	if (!value) return "No stored evidence";
	const parsed = new Date(value);
	if (Number.isNaN(parsed.valueOf())) return "Invalid stored time";
	return parsed.toLocaleString("en-GB", {
		timeZone: "Africa/Dar_es_Salaam",
		dateStyle: "medium",
		timeStyle: "medium"
	});
}
var metric = (value, suffix) => value === null || value === void 0 ? "—" : `${value}${suffix}`;
function CudyStabilityPilot() {
	const [data, setData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [selectedDeviceId, setSelectedDeviceId] = (0, import_react.useState)("");
	const [discoveryForm, setDiscoveryForm] = (0, import_react.useState)({
		cidr: "10.66.66.0/24",
		collectorId: "",
		site: "",
		owner: ""
	});
	const [discoveryError, setDiscoveryError] = (0, import_react.useState)("");
	const [requestingDiscovery, setRequestingDiscovery] = (0, import_react.useState)(false);
	const [registeringCandidateId, setRegisteringCandidateId] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch(`/api/platform/cudy-pilot${selectedDeviceId ? `?deviceId=${encodeURIComponent(selectedDeviceId)}` : ""}`, { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error ?? `Pilot evidence unavailable (${response.status})`);
			setData(body);
			setSelectedDeviceId((current) => current || body.registrations[0]?.deviceId || body.selectedDeviceId);
			setDiscoveryForm((current) => ({
				...current,
				collectorId: body.availableCollectors.some((item) => item.id === current.collectorId && item.current) ? current.collectorId : body.availableCollectors.find((item) => item.current)?.id ?? ""
			}));
		} catch (reason) {
			setData(null);
			setError(reason instanceof Error ? reason.message : "Pilot evidence unavailable");
		} finally {
			setLoading(false);
		}
	}, [selectedDeviceId]);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0);
		const timer = window.setInterval(() => void load(), 3e4);
		return () => {
			window.clearTimeout(initial);
			window.clearInterval(timer);
		};
	}, [load]);
	const hasStoredEvidence = Boolean(data?.controls.storedCudyEvidence);
	const requestDiscovery = async () => {
		if (requestingDiscovery) return;
		setRequestingDiscovery(true);
		setDiscoveryError("");
		try {
			const response = await fetch("/api/platform/cudy-pilot", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "request_cudy_range_discovery",
					...discoveryForm
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "The discovery range could not be authorized.");
			await load();
		} catch (reason) {
			setDiscoveryError(reason instanceof Error ? reason.message : "The discovery range could not be authorized.");
		} finally {
			setRequestingDiscovery(false);
		}
	};
	const registerCandidate = async (candidateId) => {
		if (registeringCandidateId) return;
		setRegisteringCandidateId(candidateId);
		setDiscoveryError("");
		try {
			const response = await fetch("/api/platform/cudy-pilot", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: "register_cudy_candidate",
					candidateId
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "The Cudy candidate could not be registered.");
			if (body.deviceId) setSelectedDeviceId(body.deviceId);
			await load();
		} catch (reason) {
			setDiscoveryError(reason instanceof Error ? reason.message : "The Cudy candidate could not be registered.");
		} finally {
			setRegisteringCandidateId("");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "cudy-pilot-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cudy-pilot-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "FRESHNESS-GATED CUDY OBSERVATIONS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inspect stored pilot measurements without inferring acceptance." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Availability, latency, loss, sampling continuity and incident rows come from the persistent store. NOCX does not invent a device, collector, threshold, pass decision, commissioning date or hardware-readiness claim." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: hasStoredEvidence ? "pilot-evidence" : "pilot-hold",
					children: [hasStoredEvidence ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: loading ? "Checking evidence" : hasStoredEvidence ? "Stored evidence loaded" : data ? "No stored observations" : "Fail closed" })]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pilot-error",
				role: "alert",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Persistent pilot evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [error, ". No fallback identity, measurements or acceptance result was generated."] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => void load(),
						children: "Retry"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel cudy-discovery-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "CUDY + LUCI REDIRECT DISCOVERY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Discover Cudy devices from an authorized WireGuard range" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Submit one private IPv4 /24–/32 range. DOXA follows the device's bounded LuCI login redirect and returns branded or operator-confirmed Cudy candidates for approval." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "cudy-discovery-form",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Private IP range" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: discoveryForm.cidr,
								onChange: (event) => setDiscoveryForm((current) => ({
									...current,
									cidr: event.target.value
								})),
								placeholder: "10.66.66.0/24"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current VPS collector" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: discoveryForm.collectorId,
								onChange: (event) => setDiscoveryForm((current) => ({
									...current,
									collectorId: event.target.value
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select collector"
								}), data?.availableCollectors.filter((item) => item.current).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: item.id,
									children: [
										item.name,
										" · ",
										item.version
									]
								}, item.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Site" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: discoveryForm.site,
								onChange: (event) => setDiscoveryForm((current) => ({
									...current,
									site: event.target.value
								})),
								placeholder: "Paje"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: discoveryForm.owner,
								onChange: (event) => setDiscoveryForm((current) => ({
									...current,
									owner: event.target.value
								})),
								placeholder: "Network Operations"
							})] })
						]
					}),
					discoveryError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pilot-error",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Discovery action blocked" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: discoveryError })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Maximum 256 private addresses. No credentials, SNMP, configuration changes or network writes."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "secondary-button",
						href: "/cudy-discovery-agent.py",
						download: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), "Download DOXA agent"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						disabled: requestingDiscovery || !discoveryForm.cidr || !discoveryForm.collectorId || !discoveryForm.site || !discoveryForm.owner,
						onClick: () => void requestDiscovery(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { size: 14 }), requestingDiscovery ? "Authorizing…" : "Authorize range discovery"]
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "cudy-discovery-register",
						children: data?.discoveryScopes.map((scope) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: scope.cidr }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							scope.site,
							" · ",
							scope.maxHosts,
							" addresses · ",
							scope.collectorId
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
							className: scope.status === "completed" ? "ready" : "blocked",
							children: scope.status
						})] }, scope.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "cudy-candidate-register",
						children: data?.discoveryCandidates.map((candidate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: candidate.address }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							candidate.model ?? "Cudy fingerprint",
							" · confidence ",
							candidate.confidence,
							"% · ",
							candidate.evidenceKeys.join(" · ")
						] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary-button",
							disabled: candidate.status !== "discovered" || registeringCandidateId === candidate.id,
							onClick: () => void registerCandidate(candidate.id),
							children: candidate.status === "registered" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), "Registered"] }) : registeringCandidateId === candidate.id ? "Registering…" : "Approve and register"
						})] }, candidate.id))
					})
				]
			}),
			data?.registrations.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cudy-device-picker",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Monitored Cudy device" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: selectedDeviceId,
					onChange: (event) => setSelectedDeviceId(event.target.value),
					children: data.registrations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: item.deviceId,
						children: [
							item.device.hostname,
							" · ",
							item.wireguardAddress,
							" · ",
							item.device.site
						]
					}, item.deviceId))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Authenticated availability intake only"] })]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cudy-pilot-summary nocx-summary-grid",
				"aria-label": "Persistent Cudy observation summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Window availability" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: metric(data?.summary.uptimePct, "%") }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.sampleCount} stored samples` : "No evidence loaded" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Average / p95 latency" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: metric(data?.summary.averageLatencyMs, " ms") }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["p95 ", metric(data?.summary.p95LatencyMs, " ms")] }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Average packet loss" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: metric(data?.summary.averagePacketLossPct, "%") }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["p95 ", metric(data?.summary.p95PacketLossPct, "%")] }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latest observation age" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: metric(data?.summary.newestAgeSeconds, "s") }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.gapCount} observed gaps` : "No continuity claim" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "cudy-pilot-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel pilot-gates",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "OBSERVED EVIDENCE COVERAGE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored measurement window" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Counts and times are descriptive only. No acceptance threshold or pass decision is configured." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						disabled: loading,
						onClick: () => void load(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: loading ? "refresh-spin" : "" }), loading ? "Refreshing…" : "Refresh"]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gate-hold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Observation count" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? `${data.summary.sampleCount} persistent rows` : "Evidence unavailable" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Observed" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gate-hold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Online / offline observations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? `${data.summary.onlineCount} online · ${data.summary.offlineCount} offline` : "Evidence unavailable" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Descriptive" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gate-hold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Observation window" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								showTime(data?.summary.windowStart ?? null),
								" → ",
								showTime(data?.summary.windowEnd ?? null)
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "No gate" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "gate-hold",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Longest observed gap" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: metric(data?.summary.longestGapSeconds, "s") })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "No threshold" })
						] })
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel pilot-identity",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PERSISTENT SOURCE IDENTITY"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: data?.device?.hostname ?? "No registered pilot device" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data?.device ? `${data.device.model} · ${data.device.site}` : "Identity is not inferred from the configured record key" })
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Stored device state" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data?.device?.status ?? "Unavailable" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Current device state" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data?.device?.operationalStatus ?? "Unknown" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Collector" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data?.collector?.name ?? "No registered collector evidence" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Stored collector state" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data?.collector?.status ?? "Unavailable" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Current collector state" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data?.collector?.operationalStatus ?? "Unknown" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Evidence start" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: showTime(data?.summary.windowStart ?? null) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Evidence end" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: showTime(data?.summary.windowEnd ?? null) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Stored matching incidents" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: data?.incidents.length ?? "—" })] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Observation-only boundary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Acceptance decisions, hardware readiness, incident writes, vendor probes and network configuration writes are disabled." })] })] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel pilot-samples",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "RECENT RAW EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Latest stored availability observations" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rows are presented without converting them into an acceptance or commissioning decision." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Auto-refresh 30s" })] }),
					data?.recentSamples.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Observed (EAT)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "State" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Latency" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Packet loss" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Evidence ID" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.recentSamples.map((sample) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: showTime(sample.observedAt) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: sample.online ? "sample-online" : "sample-offline",
							children: sample.online ? "Online" : "Offline"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: metric(sample.latencyMs, " ms") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [sample.packetLossPct, "%"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: sample.id }) })
					] }, sample.id)) })] }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pilot-empty",
						children: loading ? "Loading persistent observations…" : "No stored Cudy observations are available. No pilot result is inferred."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Acceptance thresholds, pass decisions, hardware readiness, incident writes, device probes and network writes remain disabled."] })
				]
			})
		]
	});
}
//#endregion
export { CudyStabilityPilot as default };
