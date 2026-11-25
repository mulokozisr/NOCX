import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as KeyRound } from "./key-round-CSmhIP5z.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as EyeOff } from "./eye-off-V-Zlj26F.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as Fingerprint } from "./fingerprint-Cu9i3RAi.js";
//#region node_modules/lucide-react/dist/esm/icons/rotate-cw.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RotateCw = createLucideIcon("RotateCw", [["path", {
	d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",
	key: "1p45f6"
}], ["path", {
	d: "M21 3v5h-5",
	key: "1q7to0"
}]]);
//#endregion
//#region app/credential-assurance.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/credential-assurance.tsx
var import_jsx_runtime = require_jsx_runtime();
function label(value) {
	return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function date(value) {
	if (!value) return "Unknown";
	const parsed = Date.parse(value);
	return Number.isFinite(parsed) ? new Date(parsed).toLocaleString() : "Unknown";
}
function isRecorded(value) {
	return Boolean(value && value.trim());
}
function stateClass(value) {
	return value === "active" ? "ready" : value === "planned" ? "waiting" : "review";
}
function CredentialAssurance() {
	const [data, setData] = (0, import_react.useState)(null), [selectedId, setSelectedId] = (0, import_react.useState)(""), [filter, setFilter] = (0, import_react.useState)("All"), [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/credentials", { cache: "no-store" }), payload = await response.json();
			if (!response.ok) throw new Error(payload.error ?? "Credential evidence is unavailable");
			setData(payload);
			setSelectedId((current) => current && payload.references.some((row) => row.id === current) ? current : payload.references[0]?.id ?? "");
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Credential evidence is unavailable");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(timer);
	}, [load]);
	const statuses = (0, import_react.useMemo)(() => ["All", ...Array.from(new Set((data?.references ?? []).map((row) => row.status)))], [data]);
	const visible = (0, import_react.useMemo)(() => (data?.references ?? []).filter((row) => filter === "All" || row.status === filter), [data, filter]);
	const selected = (data?.references ?? []).find((row) => row.id === selectedId) ?? visible[0] ?? null;
	const selectedValidations = (data?.validations ?? []).filter((row) => row.credentialReferenceId === selected?.id);
	const selectedRotations = (data?.rotations ?? []).filter((row) => row.credentialReferenceId === selected?.id);
	const gates = selected ? [
		[
			"Exact scope metadata",
			isRecorded(selected.scopeType) && isRecorded(selected.scopeId),
			selected.scopeId ? `${selected.scopeType} · ${selected.scopeId}` : "Scope identifier is unknown"
		],
		[
			"Vault-provider contract",
			selected.providerContractReady,
			selected.providerContractReady ? `${selected.storageProvider} · ${selected.bindingName}` : "Active provider, binding and validation digest required"
		],
		[
			"Runtime binding",
			isRecorded(selected.bindingName),
			selected.bindingName || "Binding name is not recorded"
		],
		[
			"Validation evidence",
			Boolean(selected.latestValidation),
			selected.latestValidation ? `${label(selected.latestValidation.outcome)} · ${date(selected.latestValidation.observedAt)}` : "No validation evidence recorded"
		],
		[
			"Rotation deadline",
			Boolean(selected.nextRotationAt),
			selected.nextRotationAt ? date(selected.nextRotationAt) : "No rotation deadline recorded"
		]
	] : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "credential-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "credential-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "VAULT-PROVIDER CONTRACT READINESS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Verify provider contracts without exposing values" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Readiness requires an active metadata reference, named protected provider, runtime binding and digested validation evidence. Secret values never enter the interface." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), loading ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Credential evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict referential and chronological metadata only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future, invalid, orphaned or out-of-order validation and rotation evidence is excluded. No fictional credential references, secret stores, readiness gates or commissioning windows are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 secret values returned"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "credential-summary nocx-summary-grid",
				"aria-label": "Credential evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Provider contracts ready" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.providerContractReady} / ${data.summary.references}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Provider, binding and digest required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Validation records" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.validations ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Redacted evidence only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Rotation records" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.rotations ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No execution capability" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unsafe value flags" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.unsafeValueFlags ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Values never returned" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "credential-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel credential-register",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "PERSISTENT PROTECTED REFERENCE REGISTER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Protected access metadata" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A reference appears only when it exists in the platform database." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "credential-filters",
							"aria-label": "Filter credential references",
							children: statuses.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: filter === item ? "active" : "",
								onClick: () => setFilter(item),
								children: label(item)
							}, item))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "credential-table",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reference" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Method" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scope" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "State" })
								] }),
								visible.map((reference) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: selected?.id === reference.id ? "selected" : "",
									onClick: () => setSelectedId(reference.id),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: reference.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: reference.id })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: reference.authenticationMethod }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Version ", reference.version] })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: reference.scopeId ?? "Identifier unknown" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											reference.scopeType,
											" · ",
											reference.system
										] })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
											className: stateClass(reference.status),
											children: label(reference.status)
										})
									]
								}, reference.id)),
								!visible.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "No credential references" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "NOCX does not create placeholder identities." })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 15 }), "Credential values, validation execution, rotation execution, secret-store writes and network writes remain disabled."] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel credential-detail",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "REFERENCE INSPECTOR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected?.label ?? "No reference selected" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected?.id ?? "No stored identity" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `credential-state ${selected ? stateClass(selected.status) : "waiting"}`,
						children: selected ? label(selected.status) : "Unknown"
					})] }), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "credential-binding",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Runtime binding metadata" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.bindingName ?? "Not recorded" })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Authentication" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.authenticationMethod })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Protected store" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.storageProvider })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.owner })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Last validation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: date(selected.lastValidatedAt) })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Next rotation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: date(selected.nextRotationAt) })] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "credential-detail-note",
							children: [
								selected.validationCount,
								" validation record(s) and ",
								selected.rotationCount,
								" rotation record(s) are linked to this reference. Secret values and evidence digests are not rendered."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							disabled: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { size: 14 }), "Safe-check execution unavailable"]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "credential-detail-note",
						children: "No reference evidence exists. Scope, storage, binding, validation and rotation state remain unknown."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel credential-gates",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "COMMISSIONING CREDENTIAL GATE · EVIDENCE COVERAGE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recorded facts are not commissioning approval" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "credential-blocked",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { size: 14 }), "Polling activation disabled"]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: gates.map(([gateLabel, ready, detail]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: true,
						children: [
							ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: gateLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: detail })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: ready ? "ready" : "waiting",
								children: ready ? "Recorded" : "Unknown"
							})
						]
					}, gateLabel)) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: "MikroTik and Ubiquiti probes remain paused. Credential metadata does not authorize read-only polling or network changes; commissioning requires separate governed device, collector, change and maintenance evidence." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "credential-bottom",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel credential-policy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "FAIL-CLOSED CAPABILITY BOUNDARY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "What this workspace cannot do" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Retrieve credential values" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Values are never returned by the API or rendered in the browser." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Execute validation" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No SNMP, RouterOS, HTTP or device probe can start here." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Rotate or inject secrets" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "External stores and collector runtimes remain untouched." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Change the network" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Router, switch, radio and firewall writes remain disabled." })
						] })
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel credential-rotation",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "PERSISTENT EVIDENCE HISTORY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected ? `Validation and rotation · ${selected.label}` : "No reference selected" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						selectedValidations.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: date(event.observedAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								label(event.checkType),
								" · ",
								label(event.outcome)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								event.validatedBy ?? "Validator unknown",
								" · digest ",
								event.evidenceDigestRecorded ? "recorded" : "missing"
							] })
						] }, event.id)),
						selectedRotations.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: date(event.requestedAt) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
								"Version ",
								event.fromVersion,
								" → ",
								event.toVersion,
								" · ",
								label(event.status)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [event.approvedBy ? `Approved by ${event.approvedBy}` : "Approval unknown", " · execution not available here"] })
						] }, event.id)),
						selected && !selectedValidations.length && !selectedRotations.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: "Unknown" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "No linked history" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No validation or rotation outcome is inferred." })
						] })
					] })]
				})]
			})
		]
	});
}
//#endregion
export { CredentialAssurance as default };
