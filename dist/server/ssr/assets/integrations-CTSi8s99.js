import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3 } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as KeyRound } from "./key-round-CSmhIP5z.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Server } from "./server-DGu4Aqms.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as Braces } from "./braces-DCCqR8eb.js";
//#region app/integrations.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function formatAge(value) {
	if (!value) return "Never";
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) return "Invalid stored time";
	const seconds = Math.round((Date.now() - timestamp) / 1e3);
	if (seconds < 0) return "Future time excluded";
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function DataIntegrations() {
	const [data, setData] = (0, import_react.useState)(null), [tab, setTab] = (0, import_react.useState)("Overview"), [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/integrations", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Integration evidence is unavailable");
			setData(body);
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Integration evidence is unavailable");
		} finally {
			if (!quiet) setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const initial = window.setTimeout(() => void load(), 0), timer = window.setInterval(() => void load(true), 3e4);
		return () => {
			window.clearTimeout(initial);
			window.clearInterval(timer);
		};
	}, [load]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "datahub-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "datahub-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Trace every ingestion delivery to receipt and queue acknowledgement" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "DELIVERY AND RECEIPT ASSURANCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Accepted, partial and rejected receipts are reconciled with enqueued, acknowledged and pending sequences using only strict non-future evidence." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "datahub-actions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "datahub-spin" : "",
							size: 15
						}), loading ? "Refreshing…" : "Refresh evidence"]
					})
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Integration evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict persistent production evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future or invalid sample, receipt and queue timestamps are excluded from totals, profiles and latest-evidence state. No seeded connector estate, event rate, health score, regional collector or data mapping is included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "datahub-summary",
				"aria-label": "Integration summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Server,
						label: "Collectors online",
						value: `${data?.summary.collectorsOnline ?? "—"} / ${data?.summary.collectors ?? "—"}`,
						detail: "Fresh stored evidence only",
						tab: "Collectors",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Network,
						label: "Observed targets",
						value: String(data?.summary.observedTargets ?? "—"),
						detail: "Last 60 minutes",
						tab: "Collectors",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Database,
						label: "Delivery receipts",
						value: String(data?.deliveryAssurance.receipts ?? "—"),
						detail: `${data?.deliveryAssurance.partialReceipts ?? 0} partial · ${data?.deliveryAssurance.rejectedReceipts ?? 0} rejected`,
						tab: "Streams",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: CircleCheck,
						label: "Acknowledged sequence",
						value: String(data?.deliveryAssurance.lastAcknowledgedSequence ?? "—"),
						detail: `${data?.deliveryAssurance.pendingRecords ?? 0} pending records`,
						tab: "Collectors",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Clock3,
						label: "Queue depth",
						value: String(data?.summary.queueDepth ?? "—"),
						detail: `Latest ${formatAge(data?.summary.latestEvidenceAt ?? null)}`,
						tab: "Collectors",
						setTab
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "datahub-tabs",
				"aria-label": "Data integration sections",
				children: [
					"Overview",
					"Collectors",
					"Streams",
					"Profiles",
					"Credentials"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: tab === item ? "datahub-tab-active" : "",
					onClick: () => setTab(item),
					children: [
						item,
						item === "Collectors" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.collectors.length ?? 0 }),
						item === "Credentials" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.credentials.length ?? 0 })
					]
				}, item))
			}),
			tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, { data }),
			tab === "Collectors" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collectors, { data: data?.collectors ?? [] }),
			tab === "Streams" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Streams, { data: data?.streams ?? [] }),
			tab === "Profiles" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profiles, { data: data?.profiles ?? [] }),
			tab === "Credentials" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Credentials, { data: data?.credentials ?? [] })
		]
	});
}
function Summary({ icon: Icon, label, value, detail, tab, setTab }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
		onClick: () => setTab(tab),
		tone: "blue",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 19 }),
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: label }),
		value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: value }),
		detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: detail }) })
	});
}
function Head({ kicker, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "datahub-register-head",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "panel-kicker",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })
		] })
	});
}
function Empty({ icon: Icon, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "datahub-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 25 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })
		]
	});
}
function Overview({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "datahub-overview-grid",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "panel connector-estate-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "COLLECTOR EVIDENCE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored collection nodes" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "datahub-freshness",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "No simulated nodes"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "connector-estate-grid",
					children: data?.collectors.map((collector) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `connector-vendor-icon connector-${slug(collector.operationalStatus)}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 17 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: collector.region ?? "Unassigned region" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: collector.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
								collector.targetCount,
								" observed targets · ",
								formatAge(collector.latestObservedAt)
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `connector-dot dot-${slug(collector.operationalStatus)}`,
							title: collector.operationalStatus
						})
					] }, collector.id))
				}),
				!data?.collectors.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					icon: Server,
					title: "No collector registered",
					copy: "Collectors appear only after a real ingestion identity is present."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "panel onboarding-readiness-panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "CONTROL BOUNDARY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Integration safety posture" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "readiness-list",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Connector creation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Disabled until a governed onboarding workflow is commissioned" })] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Stream controls" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Read-only; operators cannot pause production ingestion here" })] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Credential values" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Never returned to the browser" })] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Network changes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Disabled across every integration view" })] })] })
				]
			})]
		})]
	}) });
}
function Collectors({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel datahub-register",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
			kicker: "DISTRIBUTED COLLECTION",
			title: "Persistent collector evidence",
			copy: "Targets, receipts and queue depth exclude future and invalid operational timestamps."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "collector-table-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "collector-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Collector" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Targets" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Availability" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Metrics" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Accepted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Rejected" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Queue" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Version" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Latest evidence" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "collector-identity",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { size: 15 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							item.id,
							" · ",
							item.region ?? "Unassigned"
						] })] })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `collector-state collector-${slug(item.operationalStatus)}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), item.operationalStatus]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.targetCount }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.availabilitySamples }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.metricSamples }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.accepted }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: item.rejected ? "queue-warning" : "",
						children: item.rejected
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: item.queueDepth ? "queue-warning" : "",
						children: item.queueDepth
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: item.version ?? "—" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatAge(item.latestObservedAt) })
				] }, item.id)) })]
			}), !data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				icon: Server,
				title: "No collector evidence",
				copy: "No persistent collector record is available."
			})]
		})]
	});
}
function Streams({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel datahub-register",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
			kicker: "OBSERVED DATA PIPELINE",
			title: "Stored telemetry streams",
			copy: "Counts reflect valid, non-future timestamps from the last 60 minutes; NOCX does not infer events per minute or pipeline capacity."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "stream-grid",
			children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stream-card-head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `stream-icon stream-${item.samples ? "streaming" : "paused"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						item.id.toUpperCase(),
						" · ",
						item.quality
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `stream-state stream-state-${item.samples ? "streaming" : "paused"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), item.samples ? "Observed" : "No evidence"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stream-metrics",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Samples" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.samples })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Targets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.targets })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Latest" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatAge(item.lastObservedAt) })] })
				]
			})] }, item.id))
		})]
	});
}
function Profiles({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel datahub-register",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
			kicker: "COLLECTED PROFILE EVIDENCE",
			title: "Metric schema profiles",
			copy: "Profiles appear only when stored metric rows carry a profile version."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mapping-grid",
			children: [data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mapping-head",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Braces, { size: 17 }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.vendors.join(", ") || "Unknown vendor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.version })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mapping-state mapping-validated",
							children: "Observed"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mapping-coverage",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Valid sample quality" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.qualityPct === null ? "—" : `${item.qualityPct}%` })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { style: { width: `${item.qualityPct ?? 0}%` } }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							item.samples,
							" samples · ",
							item.devices,
							" devices · ",
							item.metricKeys.length,
							" metric keys"
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mapping-examples",
					children: item.metricKeys.slice(0, 5).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: key }, key))
				})
			] }, item.version)), !data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				icon: Braces,
				title: "No profile evidence",
				copy: "A profile will appear when collected metrics include a versioned mapping."
			})]
		})]
	});
}
function Credentials({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel datahub-register",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
			kicker: "METADATA-ONLY REFERENCES",
			title: "Protected credential references",
			copy: "Only reference metadata and validation status are visible; secret values never leave protected storage."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "collector-table-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "collector-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Reference" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "System" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Scope" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Authentication" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Storage" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Owner" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Version" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last validated" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "collector-identity",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 15 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.id })] })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.system }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [item.scopeType, item.scopeId ? ` · ${item.scopeId}` : ""] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.authenticationMethod }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.storageProvider }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `collector-state collector-${slug(item.status)}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), item.status]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.owner }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.version }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatAge(item.lastValidatedAt) })
				] }, item.id)) })]
			}), !data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				icon: KeyRound,
				title: "No credential reference",
				copy: "No secret value or demonstration credential is shown."
			})]
		})]
	});
}
//#endregion
export { DataIntegrations as default };
