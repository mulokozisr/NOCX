import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, r as Activity, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as KeyRound } from "./key-round-CSmhIP5z.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Server } from "./server-DGu4Aqms.js";
import { t as Boxes } from "./boxes-ppOPgBng.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as HardDrive } from "./hard-drive-ra7fzo_9.js";
import { t as DatabaseBackup } from "./database-backup-C8coOrG8.js";
import { t as Copy } from "./copy-Dw9Cpt9W.js";
import { n as useOperatorAccess } from "./operator-access-CJCL0tBn.js";
//#region node_modules/lucide-react/dist/esm/icons/git-pull-request-arrow.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var GitPullRequestArrow = createLucideIcon("GitPullRequestArrow", [
	["circle", {
		cx: "5",
		cy: "6",
		r: "3",
		key: "1qnov2"
	}],
	["path", {
		d: "M5 9v12",
		key: "ih889a"
	}],
	["circle", {
		cx: "19",
		cy: "18",
		r: "3",
		key: "1qljk2"
	}],
	["path", {
		d: "m15 9-3-3 3-3",
		key: "1lwv8l"
	}],
	["path", {
		d: "M12 6h5a2 2 0 0 1 2 2v7",
		key: "1yj91y"
	}]
]);
//#endregion
//#region app/collector-management.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/collector-credentials.tsx
var import_jsx_runtime = require_jsx_runtime();
function CollectorCredentials({ collectors }) {
	const access = useOperatorAccess();
	const [collectorId, setCollectorId] = (0, import_react.useState)("");
	const [confirmed, setConfirmed] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [token, setToken] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const rotate = async () => {
		if (busy || !access.canWrite || !collectorId || !confirmed) return;
		setBusy(true);
		setError("");
		setToken(null);
		setCopied(false);
		try {
			const response = await fetch("/api/platform/device-fleet-onboarding", {
				method: "POST",
				headers: access.headers,
				body: JSON.stringify({
					action: "rotate_collector_token",
					collectorId
				})
			});
			const body = await response.json();
			if (!response.ok || !body.collectorId || !body.token) throw new Error(body.error ?? "Credential rotation failed.");
			setToken({
				collectorId: body.collectorId,
				value: body.token
			});
			setConfirmed(false);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Credential rotation failed.");
		} finally {
			setBusy(false);
		}
	};
	if (!access.canWrite) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "panel credential-settings",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 17 }), "Collector credentials"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "credential-settings-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rotate a collector token only when you can update its agent configuration." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Collector", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: collectorId,
					disabled: busy,
					onChange: (event) => {
						setCollectorId(event.target.value);
						setConfirmed(false);
						setError("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Select collector"
					}), collectors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item.id,
						children: item.name
					}, item.id))]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "credential-confirm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: confirmed,
						disabled: busy,
						onChange: (event) => setConfirmed(event.target.checked)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I can update this collector now. Rotation replaces its token and disables the shared fallback; collection may stop until the agent is updated." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary-button",
					disabled: busy || !collectorId || !confirmed || token !== null,
					onClick: () => void rotate(),
					children: busy ? "Rotating…" : "Rotate token"
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					role: "alert",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 }), error]
				}),
				token && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "collector-token-once",
					role: "status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Save this token now" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: token.value }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Update NOCX_COLLECTOR_TOKEN on ",
							token.collectorId,
							", then restart its agent. This token cannot be retrieved again."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: async () => {
								try {
									await navigator.clipboard.writeText(token.value);
									setCopied(true);
								} catch {
									setError("Copy failed. Select and copy the token manually.");
								}
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 14 }), copied ? "Copied" : "Copy token"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => setToken(null),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 }), "Hide token"]
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region app/collector-management.tsx
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
function state(collector) {
	if (collector.operationalStatus === "online") return "Live";
	if (collector.operationalStatus === "stale") return "Stale";
	return "Unknown";
}
function stateClass(collector) {
	const label = state(collector);
	return label === "Live" ? "live" : label === "Stale" ? "standby" : "planned";
}
function CollectorManagement() {
	const [data, setData] = (0, import_react.useState)(null);
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/integrations", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Collector evidence is unavailable");
			setData(body);
			setSelectedId((current) => current || body.collectors[0]?.id || "");
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Collector evidence is unavailable");
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
	const collectors = (0, import_react.useMemo)(() => data?.collectors ?? [], [data]);
	const selected = collectors.find((collector) => collector.id === selectedId) ?? collectors[0] ?? null;
	const storedSamples = (data?.summary.availabilitySamples ?? 0) + (data?.summary.metricSamples ?? 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "collector-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "collector-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Manage only collectors NOCX can prove exist" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT COLLECTOR-EVIDENCE STATE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Review registered collector identities, target observations, ingestion receipts and queue checkpoints after future and invalid operational timestamps are excluded." })
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Collector evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict persistent production collectors only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future and invalid samples, receipts and queue checkpoints are excluded. No fictional regional collectors, standby nodes, target capacity, host load, failure domains, spool enablement, leases, fencing or failover drills are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "collector-summary nocx-summary-grid",
				"aria-label": "Collector evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Fresh collectors" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.collectorsOnline} / ${data.summary.collectors}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Registered evidence only" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed targets" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.observedTargets} / ${data.summary.expectedDevices}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Evidence in the last hour" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Stored samples" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? storedSamples : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current evidence windows" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Rejected / queued" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? `${data.summary.rejected} / ${data.summary.queueDepth}` : "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Receipts · queue checkpoints" }) })
					})
				]
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel collector-coverage",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "MONITORING COVERAGE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [data.summary.coverageGapCount, " devices without recent evidence"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Checked ",
							new Date(data.checkedAt).toLocaleString(),
							". Reachability remains Unknown for these records."
						] })
					] }) }),
					data.coverageGaps.map((gap) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "collector-coverage-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: gap.hostname }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [gap.managementIp ?? "No management IP", " · Unknown"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: gap.statusReason }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								"Inventory last seen: ",
								gap.registryLastSeenAt ? new Date(gap.registryLastSeenAt).toLocaleString() : "Unavailable",
								"; this is historical metadata."
							] }),
							gap.sharedAddressDevices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "collector-address-warning",
								children: [
									"Shared management IP with ",
									gap.sharedAddressDevices.map((other) => `${other.hostname}${other.observedInWindow ? " (recent evidence)" : ""}`).join(", "),
									". Verify device identity before merging or retiring records."
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "secondary-button",
							href: `#/devices?device=${encodeURIComponent(gap.id)}`,
							children: "Review device"
						})]
					}, gap.id)),
					!data.coverageGaps.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every registered device has evidence in the last hour. This does not mean every device is online." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "collector-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel collector-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "PERSISTENT COLLECTOR REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Observed identities and freshness" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rows originate only from stored collector records." })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "collector-fleet",
						children: [collectors.map((collector) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: selected?.id === collector.id ? "active" : "",
							onClick: () => setSelectedId(collector.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
									className: `collector-state ${stateClass(collector)}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 16 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										collector.id,
										" · ",
										collector.region ?? "Unassigned region"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: collector.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										collector.targetCount,
										" observed targets · ",
										age(collector.latestObservedAt)
									] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: state(collector) })
							]
						}, collector.id)), !collectors.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "collector-controls",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No registered collector evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX does not create a demonstration collector estate." })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel collector-detail",
					children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "COLLECTED RUNTIME EVIDENCE"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								selected.id,
								" · ",
								selected.region ?? "Unassigned region"
							] })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `collector-badge ${stateClass(selected)}`,
							children: state(selected)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "collector-metrics",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Latest evidence" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: age(selected.latestObservedAt) })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observed targets" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.targetCount })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Stored samples" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.availabilitySamples + selected.metricSamples })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "collector-controls",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Evidence boundary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ingestion receipts" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [selected.accepted, " accepted"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										selected.rejected,
										" rejected · ",
										selected.duplicate,
										" duplicate"
									] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Queue checkpoint" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [selected.queueDepth, " pending"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: ["Oldest ", age(selected.oldestPendingAt)] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Collector version" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.version ?? "Unknown" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Reported metadata only" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Capacity and host load" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No authoritative host metrics connected" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Target ownership" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No commissioned assignment register" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Network writes" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Disabled" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Collector configuration is not editable here" })
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "collector-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "secondary-button",
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 14 }), "Heartbeat test unavailable"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary-button",
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), "Assignment change unavailable"]
							})]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "collector-controls",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No collector selected" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A collector will appear only after its identity is stored by production ingestion." })]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel collector-governance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "COLLECTOR CONTROL BOUNDARY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Observed evidence does not imply management authority" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Collector creation, deletion and target reassignment are unavailable."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Host capacity and failure-domain health stay unknown without authoritative sources."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Existing credentials are never retrieved. New tokens are shown once after authorized rotation."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "The live MikroTik and Cudy collection paths remain unchanged."] })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel collector-resilience",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "COLLECTOR RESILIENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Separate stored queue evidence from uncommissioned failover" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Queue checkpoints are visible; runtime durability, takeover and fencing claims require independent evidence that NOCX does not yet store." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }), " FAIL-CLOSED"] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "resilience-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								className: "resilience-good",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { size: 17 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Queue checkpoints" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? `${data.summary.queueDepth} pending` : "Unknown" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Oldest pending time is shown per collector" })
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								className: "resilience-warn",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatabaseBackup, { size: 17 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Durable spool runtime" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Uncommissioned" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No runtime-health evidence connected" })
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								className: "resilience-warn",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitPullRequestArrow, { size: 17 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Standby takeover" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Uncommissioned" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No standby identity or drill evidence stored" })
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								className: "resilience-warn",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Lease and fencing state" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unobserved" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "No active lease source exposed to operators" })
							] })] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "failover-gates",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Stored queue depth remains visible"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Runtime durability evidence unavailable"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Independent standby evidence unavailable"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), "Observed failover drill unavailable"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Automatic takeover remains disabled. The live Cudy path is unchanged, and this workspace cannot alter the MikroTik collector." })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectorCredentials, { collectors })
		]
	});
}
//#endregion
export { CollectorManagement as default };
