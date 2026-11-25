import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity } from "./network-CaMqMjRB.js";
import { c as Gauge, d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { t as HeartPulse } from "./heart-pulse-BFWfGHC5.js";
import { t as RotateCcw } from "./rotate-ccw-DWTvIWC2.js";
//#region app/restoration-assurance.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/restoration-assurance.tsx
var import_jsx_runtime = require_jsx_runtime();
var gates = [
	{
		key: "network_health",
		label: "Network health",
		description: "Stored path and device evidence supports recovery."
	},
	{
		key: "service_telemetry",
		label: "Service telemetry",
		description: "Collected service evidence remains stable through observation."
	},
	{
		key: "customer_impact",
		label: "Customer impact",
		description: "Persistent service-impact records are cleared."
	},
	{
		key: "rollback_readiness",
		label: "Rollback readiness",
		description: "A tested fallback remains available if stability degrades."
	}
];
function time(value) {
	const parsed = Date.parse(value), delta = parsed - Date.now(), minutes = Math.max(0, Math.ceil(Math.abs(delta) / 6e4));
	if (!Number.isFinite(parsed)) return "Unknown";
	if (Math.abs(delta) < 6e4) return delta > 0 ? "less than 1 min remaining" : "complete";
	if (minutes < 60) return delta > 0 ? `${minutes} min remaining` : `completed ${minutes} min ago`;
	return new Date(value).toLocaleString();
}
function statusLabel(value) {
	return value.replaceAll("_", " ").replace(/\b\w/g, (match) => match.toUpperCase());
}
function RestorationAssurance() {
	const [data, setData] = (0, import_react.useState)(null), [selectedId, setSelectedId] = (0, import_react.useState)(""), [query, setQuery] = (0, import_react.useState)(""), [loading, setLoading] = (0, import_react.useState)(true), [busy, setBusy] = (0, import_react.useState)(false), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)(""), [showIntake, setShowIntake] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		majorIncidentId: "",
		ownerEmail: "",
		observationMinutes: "30",
		baselineNote: ""
	});
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		setData(null);
		setSelectedId("");
		setShowIntake(false);
		try {
			const response = await fetch("/api/platform/restoration", { cache: "no-store" }), payload = await response.json();
			if (!response.ok) throw new Error(payload.error ?? "Restoration evidence is unavailable");
			setData(payload);
			setSelectedId((current) => current && payload.records.some((row) => row.id === current) ? current : payload.records[0]?.id ?? "");
			setForm((current) => ({
				...current,
				majorIncidentId: current.majorIncidentId || payload.candidates[0]?.id || "",
				ownerEmail: current.ownerEmail || payload.operators[0]?.email || ""
			}));
		} catch (caught) {
			setData(null);
			setSelectedId("");
			setError(caught instanceof Error ? caught.message : "Restoration evidence is unavailable");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(timer);
	}, [load]);
	const filtered = (0, import_react.useMemo)(() => (data?.records ?? []).filter((row) => `${row.validationNumber} ${row.incident?.title ?? ""} ${row.ownerEmail}`.toLowerCase().includes(query.toLowerCase())), [data, query]);
	const selected = (data?.records ?? []).find((row) => row.id === selectedId) ?? null;
	const announce = (message) => {
		setNotice(message);
		window.setTimeout(() => setNotice(""), 3200);
	};
	const mutate = async (method, body, success) => {
		setBusy(true);
		setError("");
		try {
			const response = await fetch("/api/platform/restoration", {
				method,
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			}), payload = await response.json();
			if (!response.ok) throw new Error(payload.error ?? "Restoration action failed");
			announce(success);
			await load();
			return true;
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Restoration action failed");
			return false;
		} finally {
			setBusy(false);
		}
	};
	const start = async () => {
		if (await mutate("POST", {
			action: "start",
			...form,
			observationMinutes: Number(form.observationMinutes)
		}, "Restoration observation started from a persistent monitoring incident.")) {
			setShowIntake(false);
			setForm((current) => ({
				...current,
				baselineNote: ""
			}));
		}
	};
	const canStart = Boolean(data?.viewer.canAdmin && form.majorIncidentId && form.ownerEmail && form.baselineNote.trim().length >= 12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "restoration-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "restoration-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Prove recovery through the full observation window" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT RESTORATION-EVIDENCE CONTROL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Start only from strict unresolved command chronology in monitoring, accept gate evidence only from the active owner, require every gate and an assigned-role command update after observation, then record an explicit independent readiness evidence chain." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "restoration-hero-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), "Refresh"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						onClick: () => setShowIntake(true),
						disabled: !data?.viewer.canAdmin || !data.candidates.length,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 15 }), data && !data.viewer.canAdmin ? "Admin permission required" : "Start validation"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip restoration-boundary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict non-future restoration chronology only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future, invalid, incomplete or malformed command, timer, gate, service-impact and verification evidence is excluded; stale evidence is never retained after a failed refresh." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 incident changes"] })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "restoration-error",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setError(""),
						"aria-label": "Dismiss error",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "restoration-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted observations" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? data.summary.observing : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Exact strict timers only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Eligible strict commands" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? data.summary.eligibleMajorIncidents : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unresolved monitoring state" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Rejected records / evidence" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? `${data.summary.rejectedRecords} / ${data.summary.rejectedEvidence}` : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Never counted toward readiness" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Strict readiness verified" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? data.summary.ready : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Incident remains unchanged" }) })
					})
				]
			}),
			showIntake && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel restoration-intake",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT MONITORING-COMMAND INTAKE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Start an exact evidence observation" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This creates a validation record only from accepted unresolved command chronology; no incident, customer service, route or device state changes." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "icon-button",
						onClick: () => setShowIntake(false),
						"aria-label": "Close restoration intake",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "restoration-form-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Major incident", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.majorIncidentId,
								onChange: (event) => setForm({
									...form,
									majorIncidentId: event.target.value
								}),
								children: (data?.candidates ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: row.id,
									children: [
										row.majorNumber,
										" · ",
										row.incident?.title ?? row.incidentId
									]
								}, row.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Active validation owner", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.ownerEmail,
								onChange: (event) => setForm({
									...form,
									ownerEmail: event.target.value
								}),
								children: (data?.operators ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: row.email,
									children: [
										row.displayName,
										" · ",
										row.email
									]
								}, row.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Exact observation window", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.observationMinutes,
								onChange: (event) => setForm({
									...form,
									observationMinutes: event.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "15",
										children: "15 minutes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "30",
										children: "30 minutes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "60",
										children: "60 minutes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "90",
										children: "90 minutes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "120",
										children: "120 minutes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "180",
										children: "180 minutes"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "restoration-wide",
								children: ["Recovered baseline note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: form.baselineNote,
									onChange: (event) => setForm({
										...form,
										baselineNote: event.target.value
									}),
									placeholder: "Describe the stored device, path or service evidence that defines recovery…"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "restoration-form-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							onClick: () => setShowIntake(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: !canStart || busy,
							onClick: () => void start(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 14 }), busy ? "Starting…" : "Start observation"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "restoration-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel restoration-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT RESTORATION REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Evidence-gated recoveries" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only records with accepted command, timer, ownership, gate and lifecycle chronology are visible." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search restorations…",
						"aria-label": "Search restoration records",
						disabled: !data
					})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "restoration-list",
						children: [
							filtered.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === row.id ? "active" : "",
								onClick: () => setSelectedId(row.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `restoration-state ${row.status.replaceAll("_", "-")}`,
										children: statusLabel(row.status)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											row.validationNumber,
											" · ",
											row.majorIncident?.majorNumber ?? row.incidentId
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.incident?.title ?? row.incidentId }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											row.gatesPassed,
											"/4 accepted gates · ",
											time(row.observationEndsAt)
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
								]
							}, row.id)),
							!loading && data && !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "restoration-empty",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, { size: 24 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted restoration validations" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query ? "No accepted validation matches this search." : "Move a strict unresolved major incident to monitoring before starting restoration assurance." })
								]
							}),
							!loading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "restoration-empty",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Restoration register unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No timer, gate, impact-clear or readiness claim is inferred while strict evidence cannot be loaded." })
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel restoration-detail",
					children: selected && data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestorationDetail, {
						record: selected,
						busy,
						mutate,
						viewer: data.viewer
					}, `${selected.id}:${selected.updatedAt}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "restoration-empty restoration-detail-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 28 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "No validation selected" : loading ? "Loading strict evidence" : "Restoration evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? "Accepted gate evidence will appear here without demonstration records." : "Details and actions remain unavailable until the strict restoration register loads successfully." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel restoration-governance",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "STRICT RESTORATION SAFEGUARDS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Full-window evidence before independent readiness" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Complete strict customer-impact chronology must be present and every accepted impact must be resolved."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Every latest gate and an assigned-role command update must be recorded after the full observation window."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Only the active owner can append gates; a different active operator must record the explicit readiness evidence chain."] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Incident resolution, rollback execution and network writes remain disabled." }),
						" Readiness verification records evidence only; an operator must use the governed incident and change workflows separately."
					] })
				]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-toast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), notice]
			})
		]
	});
}
function RestorationDetail({ record, busy, mutate, viewer }) {
	const [gateKey, setGateKey] = (0, import_react.useState)("network_health"), [state, setState] = (0, import_react.useState)("passed"), [detail, setDetail] = (0, import_react.useState)("");
	const append = async () => {
		if (await mutate("PATCH", {
			action: "add_evidence",
			id: record.id,
			gateKey,
			state,
			detail
		}, "Restoration gate evidence appended without incident or network changes.")) setDetail("");
	};
	const ready = record.observationComplete && record.evidenceMature && record.gatesPassed === 4 && record.impactEvidenceComplete && record.activeImpacts === 0 && Boolean(record.latestCommandUpdate), canAppend = record.status === "observing" && viewer.canAdmin && viewer.email === record.ownerEmail, canVerify = record.status === "observing" && viewer.canAdmin && viewer.email !== record.ownerEmail && ready;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "panel-kicker",
				children: "STRICT APPEND-ONLY RESTORATION EVIDENCE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: record.incident?.title ?? record.incidentId }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				record.validationNumber,
				" · Active owner: ",
				record.ownerEmail
			] })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "restoration-score",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [record.gatesPassed, "/4"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "latest accepted gates" })]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "restoration-meta",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Exact observation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: time(record.observationEndsAt) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Service-impact evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: record.impactEvidenceComplete ? `${record.activeImpacts} active` : "Incomplete" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Post-window command update" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: record.latestCommandUpdate ? time(record.latestCommandUpdate.createdAt) : "Missing" })] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "restoration-baseline",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Accepted recovery baseline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: record.baselineNote })] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "restoration-gates",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Post-observation readiness gates" }), gates.map((gate) => {
				const item = record.latestGates.find((row) => row.key === gate.key)?.latest ?? null, mature = item && Date.parse(item.observedAt) >= Date.parse(record.observationEndsAt);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `gate-icon gate-${item?.state ?? "observing"}`,
						children: item?.state === "passed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 }) : item?.state === "blocked" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 15 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: gate.label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item?.detail ?? gate.description }),
						item && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
							new Date(item.observedAt).toLocaleString(),
							" · ",
							item.actorEmail,
							" · ",
							mature ? "post-window" : "pre-window only"
						] })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
						className: `gate-state gate-${item?.state ?? "observing"}`,
						children: item ? mature ? statusLabel(item.state) : "Not mature" : "No evidence"
					})
				] }, gate.key);
			})]
		}),
		record.status === "observing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "restoration-evidence-form",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Append owner-controlled gate evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: gateKey,
					onChange: (event) => setGateKey(event.target.value),
					disabled: !canAppend,
					children: gates.map((gate) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: gate.key,
						children: gate.label
					}, gate.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: state,
					onChange: (event) => setState(event.target.value),
					disabled: !canAppend,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "passed",
						children: "Passed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "blocked",
						children: "Blocked"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: detail,
					onChange: (event) => setDetail(event.target.value),
					placeholder: "Record the source, observation and result…",
					disabled: !canAppend
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					disabled: busy || !canAppend || detail.trim().length < 12,
					onClick: () => void append(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 14 }), !viewer.canAdmin ? "Admin permission required" : viewer.email !== record.ownerEmail ? "Assigned owner required" : "Append evidence"]
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "restoration-evidence",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Accepted evidence timeline" }),
				record.evidence.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
						statusLabel(item.gateKey),
						" · ",
						statusLabel(item.state)
					] }),
					item.detail,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						new Date(item.observedAt).toLocaleString(),
						" · ",
						item.actorEmail
					] })
				] }, item.id)),
				!record.evidence.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No accepted gate evidence has been appended." })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: `restoration-readiness ${ready ? "ready" : "blocked"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: ready ? "Ready for independent verification" : "Strict readiness remains blocked" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				!record.observationComplete ? "The full observation timer has not completed. " : "",
				!record.evidenceMature ? "Every latest gate needs passed evidence after observation. " : "",
				!record.impactEvidenceComplete ? "Customer-impact chronology is incomplete. " : record.activeImpacts ? `${record.activeImpacts} active service-impact record(s) remain. ` : "",
				!record.latestCommandUpdate ? "A valid assigned-role command update after observation is missing." : ""
			] })] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "restoration-actions",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "primary-button",
				disabled: busy || !canVerify,
				onClick: () => void mutate("PATCH", {
					action: "verify_readiness",
					id: record.id
				}, "Restoration readiness independently verified; the incident remains unchanged."),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), !viewer.canAdmin ? "Admin permission required" : viewer.email === record.ownerEmail ? "Independent operator required" : !ready ? "Strict evidence required" : "Verify readiness"]
			})
		}),
		record.status !== "observing" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "restoration-verified",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }),
				"Readiness evidence chain verified by ",
				record.readinessVerifiedBy,
				" at ",
				record.readinessVerifiedAt ? new Date(record.readinessVerifiedAt).toLocaleString() : "unknown time",
				". NOCX did not resolve the incident."
			]
		})
	] });
}
//#endregion
export { RestorationAssurance as default };
