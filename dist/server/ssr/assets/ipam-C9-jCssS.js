import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, s as Router, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronDown } from "./chevron-down-jG2qgWsF.js";
import { t as GitMerge } from "./git-merge-CfoqxhTI.js";
//#region node_modules/lucide-react/dist/esm/icons/circle-slash-2.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleSlash2 = createLucideIcon("CircleSlash2", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M22 2 2 22",
	key: "y4kqgn"
}]]);
//#endregion
//#region app/ipam.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
function formatAge(value) {
	if (!value) return "Never";
	const seconds = Math.max(0, Math.round((Date.now() - Date.parse(value)) / 1e3));
	if (seconds < 60) return `${seconds}s ago`;
	if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
	if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
	return `${Math.floor(seconds / 86400)}d ago`;
}
function NetworkIpam() {
	const [data, setData] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [query, setQuery] = (0, import_react.useState)("");
	const [source, setSource] = (0, import_react.useState)("all");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/ipam", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Address evidence is unavailable");
			setData(body);
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Address evidence is unavailable");
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
	const visible = (0, import_react.useMemo)(() => (data?.observations ?? []).filter((item) => {
		return `${item.address} ${item.label} ${item.recordId} ${item.detail} ${item.site ?? ""}`.toLowerCase().includes(query.toLowerCase()) && (source === "all" || item.recordType === source);
	}), [
		data,
		query,
		source
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "ipam-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ipam-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "IPAM & network resources" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT ADDRESS-EVIDENCE INTEGRITY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Review addresses stored on registered devices and customer services without inventing prefixes, pools, VLANs, utilization or allocation authority." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ipam-actions",
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Address evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Validated non-future address records only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Malformed addresses and future or invalid record timestamps are excluded. No fictional prefixes, pools, leases, VLANs, utilization, capacity risks, routing entries or reservations are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), data ? `${data.evidenceIntegrity.rejectedDeviceAddresses + data.evidenceIntegrity.rejectedServiceAddresses} rejected` : "Fail closed"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ipam-summary",
				"aria-label": "Address evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Network,
						label: "Observed addresses",
						value: String(data?.summary.observedAddresses ?? "—"),
						detail: `${data?.summary.uniqueAddresses ?? 0} unique values`,
						tab: "Address Observations",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Router,
						label: "Device addresses",
						value: String(data?.summary.deviceAddresses ?? "—"),
						detail: "Registered devices",
						tab: "Address Observations",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Database,
						label: "Service endpoints",
						value: String(data?.summary.serviceAddresses ?? "—"),
						detail: "Persistent customer services",
						tab: "Address Observations",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: GitMerge,
						label: "Duplicate values",
						value: String(data?.summary.duplicateAddresses ?? "—"),
						detail: "Exact stored-address match",
						tab: "Conflicts",
						setTab
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: CircleSlash2,
						label: "Managed prefixes",
						value: "0",
						detail: "Registry not commissioned",
						tab: "Coverage",
						setTab
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "ipam-tabs",
				"aria-label": "IPAM evidence sections",
				children: [
					"Overview",
					"Address Observations",
					"Conflicts",
					"Coverage"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: tab === item ? "ipam-tab-active" : "",
					onClick: () => {
						setTab(item);
						setQuery("");
					},
					children: [item, item === "Conflicts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.conflicts.length ?? 0 })]
				}, item))
			}),
			tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, { data }),
			tab === "Address Observations" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressRegister, {
				data: visible,
				query,
				setQuery,
				source,
				setSource
			}),
			tab === "Conflicts" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConflictRegister, { data: data?.conflicts ?? [] }),
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
		className: "ipam-overview",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "panel ipam-register",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ipam-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "OBSERVED ADDRESS SOURCES"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored assignments, not authoritative allocation" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Every row is linked to an existing device or customer service record." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ipam-synced",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }),
							"As of ",
							formatAge(data?.checkedAt ?? null)
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ipam-observed-kpis nocx-summary-grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							tone: "blue",
							icon: void 0,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Device records" }),
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.deviceAddresses ?? "—" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							tone: "blue",
							icon: void 0,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Service records" }),
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.serviceAddresses ?? "—" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							tone: "blue",
							icon: void 0,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Exact duplicates" }),
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.duplicateAddresses ?? "—" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
							tone: "blue",
							icon: void 0,
							label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Inferred prefixes" }),
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "0" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ipam-good",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Observed addresses are useful evidence, but they do not prove subnet ownership, available capacity, DHCP authority or routing intent." })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "panel ipam-register",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ipam-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "COVERAGE BOUNDARY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Commissioned inputs" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 19 })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ipam-evidence-list",
				children: data?.coverage.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `ipam-evidence-icon evidence-${slug(item.status)}`,
						children: item.status === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.detail })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: item.status === "active" ? item.records : "—" })
				] }, item.key))
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel ipam-register ipam-live-list",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ipam-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "panel-kicker",
				children: "LATEST ADDRESS OBSERVATIONS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Device and service endpoints" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "ipam-synced",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 }), "0 simulated records"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressTable, { data: (data?.observations ?? []).slice(0, 12) })]
	})] });
}
function AddressRegister({ data, query, setQuery, source, setSource }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel ipam-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ipam-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "PERSISTENT ADDRESS OBSERVATIONS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored device and service addresses" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX does not infer allocation, reservation or available address-space from these rows." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ipam-synced",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 }), "Read only"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ipam-toolbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ipam-search",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search address, device, service or site…",
								"aria-label": "Search address observations"
							}),
							query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setQuery(""),
								"aria-label": "Clear address search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ipam-select",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: source,
							onChange: (event) => setSource(event.target.value),
							"aria-label": "Filter address source",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "All sources"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "device",
									children: "Devices"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "customer_service",
									children: "Customer services"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ipam-synced",
						children: [data.length, " shown"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressTable, { data })
		]
	});
}
function AddressTable({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ipam-table-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "ipam-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Address" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Family" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Source record" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Type" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Site" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Evidence source" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Updated" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ipam-identity",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 15 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: item.address }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.id })] })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.family }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
					className: "ipam-cell-meta",
					children: [
						item.detail,
						" · ",
						item.recordId
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.recordType.replaceAll("_", " ") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.site ?? "Unassigned" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `ipam-badge badge-${slug(item.status)}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), item.status]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.source }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatAge(item.updatedAt) })
			] }, item.id)) })]
		}), !data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "No address observation",
			copy: "No stored device or service address matches this view."
		})]
	});
}
function ConflictRegister({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel ipam-register",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ipam-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "EXACT STORED-VALUE REVIEW"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Duplicate address observations" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A match is a review candidate, not proof of a live network conflict." })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "ipam-synced",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleSlash2, { size: 12 }), "Automatic resolution disabled"]
			})]
		}), data.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ipam-conflict-grid",
			children: data.map((conflict) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "finding-icon finding-warning",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 17 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						conflict.family,
						" · ",
						conflict.records.length,
						" stored records"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: conflict.address }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: conflict.records.map((record) => `${record.label} (${record.recordType.replaceAll("_", " ")})`).join(" · ") })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Review only" })
			] }, conflict.address))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "No duplicate stored address",
			copy: "No exact address value appears on more than one current device or customer-service record."
		})]
	});
}
function CoverageRegister({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel ipam-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ipam-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "IPAM DATA COVERAGE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Known authority boundaries" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Missing resource-management sources remain uncommissioned instead of being reconstructed from observations." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ipam-synced",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "Fail closed"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ipam-coverage-grid",
				children: data?.coverage.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `ipam-evidence-icon evidence-${slug(item.status)}`,
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
				className: "ipam-clear",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleSlash2, { size: 25 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Authoritative prefix, DHCP, VLAN and routing sources are not commissioned" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NOCX will not calculate utilization, exhaustion, free space, reservations, overlap, conflicts or routing exposure until those governed sources exist." })
				]
			})
		]
	});
}
function Empty({ title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ipam-clear",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 25 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })
		]
	});
}
//#endregion
export { NetworkIpam as default };
