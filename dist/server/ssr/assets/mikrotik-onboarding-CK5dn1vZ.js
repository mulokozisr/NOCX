import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as KeyRound } from "./key-round-CSmhIP5z.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Ban } from "./ban-Dzkuy3l_.js";
import { t as LockKeyhole } from "./lock-keyhole-CV41FWao.js";
//#region app/mikrotik-onboarding.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/mikrotik-onboarding.tsx
var import_jsx_runtime = require_jsx_runtime();
function time(value) {
	return value ? new Date(value).toLocaleString() : "Unavailable";
}
function MikrotikOnboarding() {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const load = async () => {
		setLoading(true);
		setError("");
		try {
			const response = await fetch("/api/platform/mikrotik-onboarding", { cache: "no-store" });
			if (!response.ok) throw new Error("Protected onboarding evidence unavailable");
			setData(await response.json());
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Evidence load failed");
			setData(null);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(timer);
	}, []);
	const latestEvidence = data?.evidence[0]?.observedAt ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mt-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inspect legacy onboarding records without generating router changes." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT MIKROTIK ENROLLMENT CHRONOLOGY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only time-valid tokens bound to registered candidates and matching historical evidence are displayed. Issuance, installer downloads, RouterOS script generation, credential return and network configuration writes are disabled." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), "Orphans and unsafe evidence excluded"] })]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), error]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-summary nocx-summary-grid",
				"aria-label": "MikroTik onboarding evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Stored token records" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.tokens.length ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Metadata only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Download evidence" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.evidence.length ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Does not prove installation" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latest evidence" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: latestEvidence ? time(latestEvidence) : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Recorded timestamp" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Router writes" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Disabled" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "No installer returned" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-command",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "FAIL-CLOSED EXECUTION BOUNDARY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "No one-command bootstrap is available" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					disabled: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, {}), "Installer downloads disabled"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The former download path could generate RouterOS commands that added a WireGuard interface, peer, address, firewall rule and rollback script while reporting network writes as disabled. That contradiction is closed: this workspace now preserves only historical metadata and never returns an executable router script." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-history",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "PERSISTENT TOKEN REGISTER"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored metadata" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [data?.tokens.length ?? 0, " records"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [(data?.tokens ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: row.deviceCandidateId }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.tokenHint }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.status }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						"Issued ",
						time(row.createdAt),
						" · expires ",
						time(row.expiresAt),
						" · consumed ",
						time(row.consumedAt)
					] })
				] }, row.id)), !loading && !data?.tokens.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No persistent installer-token metadata is available." })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-history",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "PERSISTENT DOWNLOAD REGISTER"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Historical request evidence" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [data?.evidence.length ?? 0, " records"] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [(data?.evidence ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: row.deviceCandidateId }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.eventType }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.outcome }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						time(row.observedAt),
						" · digest ",
						row.scriptDigest.slice(0, 12),
						"…"
					] })
				] }, row.id)), !loading && !data?.evidence.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No persistent installer-download evidence is available." })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-command",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "READ-ONLY CONTROL CONTRACT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Unsupported actions remain unavailable" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), loading ? "Checking…" : "Refresh evidence"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }),
					" Token values and credential values are never returned. Rejected chronology: ",
					data ? data.evidenceIntegrity.rejectedTokens + data.evidenceIntegrity.rejectedEvidence : 0,
					". Token issuance, installer downloads, RouterOS script generation, SNMP enablement, polling activation and network configuration writes remain disabled."
				] })]
			})
		]
	});
}
//#endregion
export { MikrotikOnboarding as default };
