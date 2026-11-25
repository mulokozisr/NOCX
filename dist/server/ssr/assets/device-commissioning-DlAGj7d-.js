import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, s as Router, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { t as UserRoundCheck } from "./user-round-check-DlXOpisp.js";
import { t as ClipboardCheck } from "./clipboard-check-nsDYafU-.js";
import { t as CirclePause } from "./circle-pause-k3SfwKMX.js";
//#region app/device-commissioning.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/device-commissioning.tsx
var import_jsx_runtime = require_jsx_runtime();
function age(value) {
	if (!value) return "Unknown";
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) return "Invalid stored time";
	const seconds = Math.round((Date.now() - timestamp) / 1e3);
	if (seconds < 0) return "Future time excluded";
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function localTime(value = /* @__PURE__ */ new Date()) {
	const copy = new Date(value);
	copy.setMinutes(copy.getMinutes() - copy.getTimezoneOffset());
	return copy.toISOString().slice(0, 16);
}
function DeviceCommissioning() {
	const [data, setData] = (0, import_react.useState)(null), [selectedId, setSelectedId] = (0, import_react.useState)(""), [loading, setLoading] = (0, import_react.useState)(true), [busy, setBusy] = (0, import_react.useState)(false), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)(""), [showPlanForm, setShowPlanForm] = (0, import_react.useState)(false), [showBurnInForm, setShowBurnInForm] = (0, import_react.useState)(false), [approvalReason, setApprovalReason] = (0, import_react.useState)("");
	const [planForm, setPlanForm] = (0, import_react.useState)({
		deviceId: "",
		leadOperatorId: "",
		site: "",
		scheduledStart: "",
		scheduledEnd: "",
		requiredMetrics: "availability, latency, packet loss",
		abortCriteria: "collector authentication failure, unauthorized write attempt"
	});
	const [burnInForm, setBurnInForm] = (0, import_react.useState)({
		windowStartedAt: "",
		windowCompletedAt: "",
		expectedSamples: "",
		receivedSamples: "",
		maximumGapSeconds: "",
		collectorRestarts: "0",
		evidenceDigest: "",
		incidentLifecycleVerified: false,
		readOnlyCollectionVerified: true
	});
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/commissioning", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Commissioning evidence is unavailable");
			setData(body);
			setSelectedId((current) => current || body.plans[0]?.id || "");
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Commissioning evidence is unavailable");
		} finally {
			if (!quiet) setLoading(false);
		}
	}, []);
	const mutate = (0, import_react.useCallback)(async (method, body) => {
		setBusy(true);
		setError("");
		try {
			const response = await fetch("/api/platform/commissioning", {
				method,
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			}), payload = await response.json();
			if (!response.ok) throw new Error(payload.error || "Onboarding action failed");
			setNotice(payload.message || "Onboarding evidence updated.");
			setShowPlanForm(false);
			setShowBurnInForm(false);
			setApprovalReason("");
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Onboarding action failed");
		} finally {
			setBusy(false);
		}
	}, [load]);
	const openPlanForm = () => {
		const now = /* @__PURE__ */ new Date();
		setPlanForm((current) => ({
			...current,
			scheduledStart: localTime(now),
			scheduledEnd: localTime(new Date(now.getTime() + 10080 * 6e4))
		}));
		setShowPlanForm(true);
	};
	const openBurnInForm = () => {
		const now = /* @__PURE__ */ new Date();
		setBurnInForm((current) => ({
			...current,
			windowStartedAt: localTime(/* @__PURE__ */ new Date(now.getTime() - 4320 * 6e4)),
			windowCompletedAt: localTime(now)
		}));
		setShowBurnInForm(true);
	};
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0), timer = window.setInterval(() => void load(true), 3e4);
		return () => {
			window.clearTimeout(initial);
			window.clearInterval(timer);
		};
	}, [load]);
	const plans = (0, import_react.useMemo)(() => data?.plans ?? [], [data]), selected = plans.find((plan) => plan.id === selectedId) ?? plans[0] ?? null, validatedEvidenceIds = selected?.evidence.filter((item) => item.independentlyValidated).map((item) => item.id) ?? [], validatedPhases = new Set(selected?.evidence.filter((item) => item.independentlyValidated).map((item) => item.phase.toLowerCase()) ?? []), readyForDecision = Boolean(selected && data?.controls.requiredActivationPhases.every((phase) => validatedPhases.has(phase)) && !selected.latestDecision?.decisionSupported);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "commission-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "commission-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "CONTROLLED ONBOARDING CONTINUATION"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Turn the completed 72-hour pilot into governed onboarding evidence" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create real device plans, record sample and incident results, require an independent validator, and approve the evidence chain without activating probes or changing network configuration." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "commission-hero-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh evidence"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						onClick: openPlanForm,
						disabled: !data?.viewer.canAdmin,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), "Start onboarding plan"]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Commissioning evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `live-evidence-strip ${data ? "" : "is-unavailable"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Strict persistent commissioning evidence" : "Commissioning snapshot unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? "Future and invalid plan, phase and decision times are excluded. Approval requires accepted referenced evidence and a complete schedule window." : loading ? "Loading authenticated commissioning evidence…" : "No authenticated commissioning snapshot is loaded." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] }) : "Unavailable" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "commission-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted plans" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.plans ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Valid, non-future registration time required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Onboarding eligible" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.onboardingReadiness.eligible} / ${data.summary.plans}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Five independently validated phases required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "72-hour burn-in" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selected?.acceptedBurnIn ? `${selected.acceptedBurnIn.sampleCoveragePct}%` : "Required" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selected?.acceptedBurnIn ? `${selected.acceptedBurnIn.durationHours}h accepted` : "Independent validation required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Probe and network writes" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Disabled" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approval is not device execution" }) })
					})
				]
			}),
			showPlanForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel commission-action-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "NEW CONTROLLED ONBOARDING PLAN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Register a real device evidence window" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This creates a governance record only. It does not contact or configure the device." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "icon-button",
						onClick: () => setShowPlanForm(false),
						"aria-label": "Close onboarding plan form",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 17 })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "commission-form-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Registered device", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: planForm.deviceId,
								onChange: (event) => setPlanForm({
									...planForm,
									deviceId: event.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select device"
								}), data?.availableDevices.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: device.id,
									children: [
										device.hostname,
										" · ",
										device.vendor,
										" ",
										device.model
									]
								}, device.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Lead operator", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: planForm.leadOperatorId,
								onChange: (event) => setPlanForm({
									...planForm,
									leadOperatorId: event.target.value
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select active operator"
								}), data?.activeOperators.map((operator) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: operator.id,
									children: [
										operator.displayName,
										" · ",
										operator.email
									]
								}, operator.id))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Site", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: planForm.site,
								onChange: (event) => setPlanForm({
									...planForm,
									site: event.target.value
								}),
								placeholder: "Tower, client or POP"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Evidence window start", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "datetime-local",
								value: planForm.scheduledStart,
								onChange: (event) => setPlanForm({
									...planForm,
									scheduledStart: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Evidence window end", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "datetime-local",
								value: planForm.scheduledEnd,
								onChange: (event) => setPlanForm({
									...planForm,
									scheduledEnd: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "commission-wide",
								children: [
									"Required metrics",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: planForm.requiredMetrics,
										onChange: (event) => setPlanForm({
											...planForm,
											requiredMetrics: event.target.value
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Comma-separated" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "commission-wide",
								children: [
									"Abort criteria",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: planForm.abortCriteria,
										onChange: (event) => setPlanForm({
											...planForm,
											abortCriteria: event.target.value
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Comma-separated" })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						onClick: () => setShowPlanForm(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "primary-button",
						disabled: busy || !planForm.deviceId || !planForm.leadOperatorId,
						onClick: () => void mutate("POST", {
							action: "create_plan",
							...planForm,
							scheduledStart: new Date(planForm.scheduledStart).toISOString(),
							scheduledEnd: new Date(planForm.scheduledEnd).toISOString(),
							requiredMetrics: planForm.requiredMetrics.split(",").map((item) => item.trim()).filter(Boolean),
							abortCriteria: planForm.abortCriteria.split(",").map((item) => item.trim()).filter(Boolean)
						}),
						children: busy ? "Creating…" : "Create read-only plan"
					})] })
				]
			}),
			showBurnInForm && selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel commission-action-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "COMPLETED 72-HOUR PILOT EVIDENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
							"Record ",
							selected.device?.hostname ?? selected.id,
							" burn-in results"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use exact collector totals and a digest from the completed evidence package. A different operator must validate this record." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "icon-button",
						onClick: () => setShowBurnInForm(false),
						"aria-label": "Close burn-in evidence form",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 17 })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "commission-form-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Window started", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "datetime-local",
								value: burnInForm.windowStartedAt,
								onChange: (event) => setBurnInForm({
									...burnInForm,
									windowStartedAt: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Window completed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "datetime-local",
								value: burnInForm.windowCompletedAt,
								onChange: (event) => setBurnInForm({
									...burnInForm,
									windowCompletedAt: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Expected samples", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "1",
								value: burnInForm.expectedSamples,
								onChange: (event) => setBurnInForm({
									...burnInForm,
									expectedSamples: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Received samples", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								value: burnInForm.receivedSamples,
								onChange: (event) => setBurnInForm({
									...burnInForm,
									receivedSamples: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Maximum gap · seconds", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								value: burnInForm.maximumGapSeconds,
								onChange: (event) => setBurnInForm({
									...burnInForm,
									maximumGapSeconds: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Collector restarts", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: "0",
								value: burnInForm.collectorRestarts,
								onChange: (event) => setBurnInForm({
									...burnInForm,
									collectorRestarts: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "commission-wide",
								children: ["Evidence digest", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: burnInForm.evidenceDigest,
									onChange: (event) => setBurnInForm({
										...burnInForm,
										evidenceDigest: event.target.value
									}),
									placeholder: "SHA-256 or immutable evidence-package digest"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "commission-check",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: burnInForm.incidentLifecycleVerified,
									onChange: (event) => setBurnInForm({
										...burnInForm,
										incidentLifecycleVerified: event.target.checked
									})
								}), "Outage incident opened and resolved correctly"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "commission-check",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: burnInForm.readOnlyCollectionVerified,
									onChange: (event) => setBurnInForm({
										...burnInForm,
										readOnlyCollectionVerified: event.target.checked
									})
								}), "Collection remained read-only"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						onClick: () => setShowBurnInForm(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "primary-button",
						disabled: busy || !burnInForm.evidenceDigest || !burnInForm.incidentLifecycleVerified,
						onClick: () => void mutate("POST", {
							action: "record_burn_in",
							planId: selected.id,
							...burnInForm,
							windowStartedAt: new Date(burnInForm.windowStartedAt).toISOString(),
							windowCompletedAt: new Date(burnInForm.windowCompletedAt).toISOString(),
							expectedSamples: Number(burnInForm.expectedSamples),
							receivedSamples: Number(burnInForm.receivedSamples),
							maximumGapSeconds: Number(burnInForm.maximumGapSeconds),
							collectorRestarts: Number(burnInForm.collectorRestarts)
						}),
						children: busy ? "Recording…" : "Record for validation"
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "commission-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel commission-runbook",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT PLAN REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted commissioning plans" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only plans with valid, non-future registration evidence enter this register." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "plan-list",
						children: [
							plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === plan.id ? "active" : "",
								onClick: () => setSelectedId(plan.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 16 }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											plan.id,
											" · ",
											plan.site ?? "Site unknown"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: plan.device?.hostname ?? "Unassigned device" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											plan.vendor,
											" · ",
											plan.status
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: plan.latestDecision ? plan.latestDecision.decisionSupported ? plan.latestDecision.decision : "Unsupported" : "No decision" })
								]
							}, plan.id)),
							data && !plans.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "commission-empty",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted commissioning plans" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX does not create demonstration runbooks or accept invalid registration times." })]
							}),
							!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "commission-empty",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Plan evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated commissioning snapshot to inspect plans." })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel commission-gate",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "STRICT LATEST DECISION"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected ? selected.device?.hostname ?? selected.id : data ? "No plan selected" : "Evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected ? `${selected.vendor} · ${selected.site ?? "Site unknown"}` : data ? "No commissioning decision can be inferred." : "Load an authenticated commissioning snapshot." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
							className: selected?.latestDecision?.decision === "approved" && selected.latestDecision.decisionSupported ? "commission-approved" : "commission-blocked",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), selected?.latestDecision ? selected.latestDecision.decisionSupported ? selected.latestDecision.decision : "Unsupported" : data ? "Unassessed" : "Unavailable"]
						})] }),
						selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "commission-window",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Scheduled start" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.scheduledWindowValid ? selected.scheduledStart : "Invalid or missing" })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePause, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Probe mode" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.probeMode })
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "blocker-list",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									"Registered device: ",
									selected.device ? `${selected.device.vendor} ${selected.device.model}` : "unassigned"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									"Active lead operator: ",
									selected.lead?.status === "active" ? selected.lead.displayName : "unavailable"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									"72-hour burn-in: ",
									selected.acceptedBurnIn ? `${selected.acceptedBurnIn.sampleCoveragePct}% samples · independently validated` : "missing or pending validation"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									"Referenced evidence: ",
									selected.latestDecision?.referencedEvidenceAccepted ? "accepted and independently validated" : "missing or rejected"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									"Network-write flag: ",
									selected.latestDecision?.networkWritesEnabledRecorded ? "unsafe value detected" : "false or unavailable"
								] })
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "commission-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "No accepted decision evidence" : "Decision evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? "Commissioning remains unassessed." : "Load an authenticated commissioning snapshot to inspect decisions." })]
						}),
						selected && data?.viewer.canAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "commission-decision-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "secondary-button",
									disabled: busy || Boolean(selected.acceptedBurnIn),
									onClick: openBurnInForm,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 14 }), selected.acceptedBurnIn ? "Burn-in accepted" : "Record 72-hour evidence"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: approvalReason,
									onChange: (event) => setApprovalReason(event.target.value),
									placeholder: "Independent onboarding decision reason…",
									disabled: !readyForDecision
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "primary-button",
									disabled: busy || !readyForDecision || approvalReason.trim().length < 12,
									onClick: () => void mutate("POST", {
										action: "approve_onboarding",
										planId: selected.id,
										reason: approvalReason,
										evidenceIds: validatedEvidenceIds
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }), readyForDecision ? "Approve onboarding evidence" : "Complete five evidence phases"]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "commission-bottom",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel commission-roles",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "STRICT PLAN SCOPE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored requirements only" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRoundCheck, { size: 20 })] }), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Required metrics" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selected.requiredMetrics.join(" · ") || "None recorded" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Abort criteria" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selected.abortCriteria.join(" · ") || "None recorded" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Management address" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selected.device?.managementIp ?? "Unknown" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePause, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Scheduled end" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: selected.scheduledWindowValid ? selected.scheduledEnd : "Invalid or missing" })
						] })
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "commission-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "No plan scope" : "Plan-scope evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? "Metrics, abort rules and ownership remain unknown." : "Load an authenticated commissioning snapshot to inspect scope." })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel commission-abort",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT PHASE EVIDENCE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted observations for the selected plan" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 20 })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "evidence-list",
							children: [
								selected?.evidence.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										item.phase,
										" · ",
										item.evidenceType
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.status }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: item.burnIn ? `${item.burnIn.durationHours}h · ${item.burnIn.sampleCoveragePct}% samples · max gap ${item.burnIn.maximumGapSeconds}s` : `${age(item.observedAt)} · ${item.payloadKeys.length} payload fields` })
								] }), item.phase.toLowerCase() === "burn_in" && item.status === "pending" && data?.viewer.canAdmin && item.recordedBy?.toLowerCase() !== data.viewer.email.toLowerCase() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									disabled: busy,
									onClick: () => void mutate("PATCH", {
										action: "validate_burn_in",
										evidenceId: item.id
									}),
									children: "Validate independently"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.independentlyValidated ? "Validated" : "Review" })] }, item.id)),
								selected && !selected.evidence.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "commission-empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted phase evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No identity, connectivity, telemetry, rollback or 72-hour burn-in result is inferred." })]
								}),
								!selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "commission-empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "No plan selected" : "Phase evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? "Select an accepted plan to review phase evidence." : "Load an authenticated commissioning snapshot." })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: "Governed plan, evidence and decision records are enabled. Probe activation, credential execution and network configuration writes remain disabled." })
					]
				})]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-toast",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }),
					notice,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setNotice(""),
						"aria-label": "Dismiss onboarding notice",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
					})
				]
			})
		]
	});
}
//#endregion
export { DeviceCommissioning as default };
