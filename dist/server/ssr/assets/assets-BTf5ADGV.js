import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Boxes } from "./boxes-ppOPgBng.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronDown } from "./chevron-down-jG2qgWsF.js";
import { t as EyeOff } from "./eye-off-V-Zlj26F.js";
import { t as HardDrive } from "./hard-drive-ra7fzo_9.js";
import { t as PackageSearch } from "./package-search-B5y21CLv.js";
//#region node_modules/lucide-react/dist/esm/icons/warehouse.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Warehouse = createLucideIcon("Warehouse", [
	["path", {
		d: "M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z",
		key: "gksnxg"
	}],
	["path", {
		d: "M6 18h12",
		key: "9pbo8z"
	}],
	["path", {
		d: "M6 14h12",
		key: "4cwo0f"
	}],
	["rect", {
		width: "12",
		height: "12",
		x: "6",
		y: "10",
		key: "apd30q"
	}]
]);
//#endregion
//#region app/assets.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function formatAge(value) {
	if (!value) return "Never";
	const timestamp = Date.parse(value), ageMs = Date.now() - timestamp;
	if (!Number.isFinite(timestamp)) return "Invalid time excluded";
	if (ageMs < 0) return "Future time excluded";
	const seconds = Math.round(ageMs / 1e3);
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function AssetLifecycle() {
	const [data, setData] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/assets", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Asset evidence is unavailable");
			setData(body);
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Asset evidence is unavailable");
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
	const visibleAssets = (0, import_react.useMemo)(() => (data?.assets ?? []).filter((asset) => {
		return `${asset.id} ${asset.hostname} ${asset.vendor} ${asset.model ?? ""} ${asset.site ?? ""} ${asset.managementIp ?? ""}`.toLowerCase().includes(query.toLowerCase()) && (status === "all" || asset.status === status);
	}), [
		data,
		query,
		status
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "asset-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "asset-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Asset lifecycle & spares" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT ASSET-EVIDENCE STATE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Inspect registered device identity and collected evidence while treating stale, future, invalid or missing operational state and missing physical, warehouse, warranty and replacement records as unknown." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "asset-actions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), loading ? "Refreshing…" : "Refresh evidence"]
					})
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Asset evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Registered production evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Online or Offline requires a valid, non-future availability observation no older than three minutes; stale, future, invalid or missing evidence is Unknown. Degraded is unassessed without fresh quality or incident evidence. No fictional estate size, serials, purchase dates, age, warranty, stock, RMA, lifecycle percentage or replacement cost is included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "asset-summary",
				"aria-label": "Asset evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: HardDrive,
						label: "Registered assets",
						value: String(data?.summary.registeredAssets ?? "—"),
						detail: "Persistent device registry",
						tab: "Registered Assets",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: CircleCheck,
						label: "Observed assets",
						value: String(data?.summary.observedAssets ?? "—"),
						detail: "Availability or metrics stored",
						tab: "Registered Assets",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: PackageSearch,
						label: "Intake candidates",
						value: String(data?.summary.intakeCandidates ?? "—"),
						detail: "Not yet registered assets",
						tab: "Overview",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Warehouse,
						label: "Spare items",
						value: "0",
						detail: "Inventory not commissioned",
						tab: "Coverage",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: EyeOff,
						label: "Lifecycle plans",
						value: "0",
						detail: "No approved evidence",
						tab: "Coverage",
						setTab
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "asset-tabs",
				"aria-label": "Asset lifecycle sections",
				children: [
					"Overview",
					"Registered Assets",
					"Coverage"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: tab === item ? "asset-tab-active" : "",
					onClick: () => {
						setTab(item);
						setQuery("");
					},
					children: [item, item === "Registered Assets" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.assets.length ?? 0 })]
				}, item))
			}),
			tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, { data }),
			tab === "Registered Assets" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssetRegister, {
				data: visibleAssets,
				query,
				setQuery,
				status,
				setStatus
			}),
			tab === "Coverage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageRegister, { data })
		]
	});
}
function Summary({ icon: Icon, label, value, detail, tab, setTab }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
		onClick: () => setTab(tab),
		tone: "blue",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }),
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: label }),
		value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: value }),
		detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: detail }) })
	});
}
function Overview({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "asset-overview-grid",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "panel asset-health-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-heading",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "REGISTERED DEVICE ESTATE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Asset evidence state" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "asset-risk-count",
						children: "No inferred lifecycle"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "asset-live-kpis nocx-summary-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							tone: "blue",
							icon: void 0,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Online" }),
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.online ?? "—" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							tone: "blue",
							icon: void 0,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Degraded" }),
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.degraded ?? "—" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							tone: "blue",
							icon: void 0,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Offline" }),
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.offline ?? "—" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							tone: "blue",
							icon: void 0,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unknown" }),
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.unknown ?? "—" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "asset-health-note",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Operational state requires valid current availability evidence." }), " Stale, future and invalid registry state is excluded; physical age, warranty and replacement risk remain unassessed until their own sources exist."] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "panel asset-risk-panel",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "EVIDENCE BOUNDARY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Commissioned records" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 19 })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "asset-evidence-list",
				children: data?.coverage.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `asset-evidence-icon evidence-${slug(item.status)}`,
						children: item.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.detail })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.status === "active" ? item.records : "—" })
				] }, item.key))
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel asset-priority-panel asset-live-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "LATEST REGISTERED ASSETS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Device-linked inventory" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "asset-reconciled",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }),
						"As of ",
						formatAge(data?.checkedAt ?? null)
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "asset-priority-list",
				children: data?.assets.slice(0, 8).map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "asset-live-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "asset-device-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { size: 15 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								asset.vendor,
								" · ",
								asset.model ?? "Model not recorded"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: asset.hostname }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
								asset.site ?? "Site not assigned",
								" · ",
								asset.id
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Latest evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatAge(asset.latestEvidenceAt) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `asset-status status-${slug(asset.status)}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), asset.status]
						})
					]
				}, asset.id))
			}),
			!data?.assets.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No registered asset",
				copy: "Assets appear only after a persistent device record exists."
			})
		]
	})] });
}
function AssetRegister({ data, query, setQuery, status, setStatus }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel asset-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "asset-register-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "PERSISTENT DEVICE-LINKED REGISTER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Registered assets" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Identity, source, status and sample counts come from stored production records." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "asset-reconciled",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 }), "0 simulated assets"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "asset-toolbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "asset-search",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search asset, device, site or address…",
								"aria-label": "Search registered assets"
							}),
							query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQuery(""),
								"aria-label": "Clear asset search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "asset-select",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: status,
							onChange: (event) => setStatus(event.target.value),
							"aria-label": "Filter asset status",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All statuses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "online",
									children: "Online"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "offline",
									children: "Offline"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "unknown",
									children: "Unknown"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "asset-reconciled",
						children: [data.length, " shown"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "asset-table-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "asset-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Asset" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Site" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Source" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Management address" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Availability samples" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Metric samples" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Latest evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Serial" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Warranty" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Lifecycle" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((asset) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "asset-identity",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { size: 15 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: asset.hostname }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								asset.id,
								" · ",
								asset.vendor,
								" ",
								asset.model ?? ""
							] })] })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `asset-status status-${slug(asset.status)}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), asset.status]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: asset.site ?? "Unassigned" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: asset.source }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: asset.managementIp ?? "Not recorded" }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: asset.availabilitySamples }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: asset.metricSamples }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatAge(asset.latestEvidenceAt) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Unknown" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Unknown" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Unassessed" })
					] }, asset.id)) })]
				}), !data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					title: "No assets match",
					copy: "No registered asset matches the current search and status filter."
				})]
			})
		]
	});
}
function CoverageRegister({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel asset-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "asset-register-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "ASSET DATA COVERAGE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Known inventory boundaries" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Missing physical and commercial records are shown as uncommissioned, not inferred from network telemetry." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "asset-reconciled",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "Fail closed"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "asset-coverage-grid",
				children: data?.coverage.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `asset-evidence-icon evidence-${slug(item.status)}`,
						children: item.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 17 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 17 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.status.replaceAll("_", " ") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.detail })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.status === "active" ? `${item.records} records` : "No claims" })
				] }, item.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "asset-empty",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { size: 25 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Warehouse, warranty and replacement workflows are not commissioned" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX will not claim stock levels, expiry exposure, RMA state, asset age, lifecycle percentages, budgets or replacement dates without a governed source." })
				]
			})
		]
	});
}
function Empty({ title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "asset-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageSearch, { size: 25 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })
		]
	});
}
//#endregion
export { AssetLifecycle as default };
