import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as KeyRound } from "./key-round-CSmhIP5z.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { t as DatabaseZap } from "./database-zap-DYpQAJxB.js";
import { n as BadgeCheck, t as CircleGauge } from "./circle-gauge-DuuippXD.js";
//#region node_modules/lucide-react/dist/esm/icons/code-xml.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CodeXml = createLucideIcon("CodeXml", [
	["path", {
		d: "m18 16 4-4-4-4",
		key: "1inbqp"
	}],
	["path", {
		d: "m6 8-4 4 4 4",
		key: "15zrgr"
	}],
	["path", {
		d: "m14.5 4-5 16",
		key: "e7oirm"
	}]
]);
//#endregion
//#region app/release-assurance.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/release-assurance.tsx
var import_jsx_runtime = require_jsx_runtime();
var domainIcons = {
	build_artifact: CodeXml,
	production_readiness: CircleGauge,
	security_controls: LockKeyhole,
	failure_exercises: DatabaseZap,
	credential_assurance: KeyRound,
	device_commissioning: Network
};
function label(value) {
	return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
function date(value) {
	if (!value) return "No observation recorded";
	const parsed = Date.parse(value);
	return Number.isFinite(parsed) ? new Date(parsed).toLocaleString() : "Unknown timestamp";
}
function isPositive(status) {
	return [
		"approved",
		"evidence_available",
		"current",
		"validated"
	].includes(status);
}
function ReleaseAssurance() {
	const [data, setData] = (0, import_react.useState)(null), [selectedKey, setSelectedKey] = (0, import_react.useState)("build_artifact"), [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)("");
	const requestSequence = (0, import_react.useRef)(0), lastAcceptedSnapshot = (0, import_react.useRef)(0);
	const load = (0, import_react.useCallback)(async () => {
		const requestId = ++requestSequence.current;
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/release-assurance", { cache: "no-store" }), payload = await response.json();
			if (!response.ok) throw new Error(payload.error ?? "Release evidence is unavailable");
			if (requestId !== requestSequence.current) return;
			const checkedAtMs = Date.parse(payload.checkedAt);
			if (!Number.isFinite(checkedAtMs) || checkedAtMs > Date.now() || !payload.controls.strictTimestampValidation) throw new Error("Release-assurance snapshot failed strict validation");
			if (checkedAtMs < lastAcceptedSnapshot.current) return;
			lastAcceptedSnapshot.current = checkedAtMs;
			setData(payload);
			setSelectedKey((current) => payload.domains.some((domain) => domain.key === current) ? current : payload.domains[0]?.key ?? "");
		} catch (caught) {
			if (requestId === requestSequence.current) {
				setData(null);
				setError(caught instanceof Error ? caught.message : "Release evidence is unavailable");
			}
		} finally {
			if (requestId === requestSequence.current) setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(timer);
	}, [load]);
	const selected = (0, import_react.useMemo)(() => data?.domains.find((domain) => domain.key === selectedKey) ?? data?.domains[0] ?? null, [data, selectedKey]);
	const operationalReleaseEligible = data?.finalReadiness.operationalReleaseEligible === true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "release-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "release-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Determine product readiness from every required domain" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "FINAL PRODUCT READINESS ASSURANCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The final assurance contract is implemented. Operational release eligibility remains derived only from strict build, readiness, security, exercise, credential and commissioning evidence." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `release-decision ${data ? operationalReleaseEligible ? "" : "release-decision-blocked" : "release-decision-unavailable"}`,
					children: [operationalReleaseEligible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Operational release gate" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? label(data.finalReadiness.operationalReleaseState) : "Unavailable" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: data ? `${data.finalReadiness.passedDomains} of ${data.finalReadiness.requiredDomains} domains passed` : "Evidence unavailable" })
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `release-toolbar ${data ? "" : "release-toolbar-unavailable"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Final product-readiness contract" : "Release-assurance snapshot unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? "Implementation is complete; operational release remains fail-closed until every domain passes and an accepted release decision exists." : loading ? "Loading authenticated release evidence…" : "No authenticated release-assurance snapshot is loaded." })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), loading ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "release-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Release evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "release-summary nocx-summary-grid",
				"aria-label": "Strict release assurance summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleGauge, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Passed domains" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.finalReadiness.passedDomains} / ${data.finalReadiness.requiredDomains}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Every required domain must pass" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Open blockers" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.finalReadiness.blockedDomains ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Explicit evidence gaps only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Accepted release decision" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? data.finalReadiness.acceptedReleaseDecision ? "Yes" : "No" : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Owner, gates and evidence required" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Pipeline attestations" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.pipelineAttestations ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Build pipeline not connected" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "release-domain-grid",
				children: [(data?.domains ?? []).map((domain) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel release-domain",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(domainIcons[domain.key] ?? ShieldCheck, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
								className: isPositive(domain.status) ? "" : "release-domain-unknown",
								children: [isPositive(domain.status) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), label(domain.status)]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: domain.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								domain.evidenceCount,
								" accepted record",
								domain.evidenceCount === 1 ? "" : "s"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: domain.detail })
						]
					}, domain.key);
				}), !data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel release-domain-unavailable",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Release domains unavailable" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated release-assurance snapshot to inspect strict cross-domain evidence." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "release-evidence-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel release-findings",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT EVIDENCE DOMAIN REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Accepted release evidence and gaps" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every state preserves its source module's time, chronology, expiration and reference rules." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "release-finding-list",
						children: [(data?.domains ?? []).map((domain) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: selected?.key === domain.key ? "active" : "",
							onClick: () => setSelectedKey(domain.key),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: label(domain.status) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: domain.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
									domain.evidenceCount,
									" accepted record",
									domain.evidenceCount === 1 ? "" : "s",
									" · ",
									date(domain.latestObservedAt)
								] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})]
						}, domain.key)), !data?.domains.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "release-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "No accepted release domains" : "Release evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? "No domain record passed its strict source gates." : "Load an authenticated release-assurance snapshot." })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel release-finding-detail",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: selected ? label(selected.status) : data ? "UNKNOWN" : "UNAVAILABLE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected?.name ?? (data ? "No evidence domain selected" : "Release evidence unavailable") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Accepted records" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected?.evidenceCount ?? (data ? 0 : "—") })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Latest observation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected ? date(selected.latestObservedAt) : data ? "No observation recorded" : "Evidence unavailable" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Evidence interpretation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected?.detail ?? (data ? "No accepted evidence is available." : "Load an authenticated release-assurance snapshot.") })] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: selected && isPositive(selected.status) ? "" : "release-detail-warning",
							children: [selected && isPositive(selected.status) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected && isPositive(selected.status) ? "Strict evidence recorded" : data ? "Fail-closed state" : "Evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Missing or rejected evidence never becomes a passed check, release approval or deployment claim." })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							disabled: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { size: 14 }), "Evidence export not commissioned"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel release-roadmap",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "FINAL PRODUCT READINESS DETERMINATION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Implementation complete · operational evidence gated" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The assurance contract is complete; these blockers remain visible until authoritative evidence satisfies every release domain." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), data ? `${data.finalReadiness.blockedDomains} blockers` : "Unavailable"] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [(data?.finalReadiness.blockers ?? []).map((blocker, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(index + 1).padStart(2, "0") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: blocker.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: blocker.reason })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: label(blocker.status) })
					] }, blocker.key)), data && !data.finalReadiness.blockers.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✓" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "All required evidence domains passed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "An accepted release decision is still required for operational eligibility." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Passed" })
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Build claims, release writes, deployments, credential values, device probes and network configuration writes remain disabled."] })
				]
			})
		]
	});
}
//#endregion
export { ReleaseAssurance as default };
