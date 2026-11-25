import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, s as Router, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { i as useLiveOperations, t as formatAge } from "./live-operations-ClF_13he.js";
//#region node_modules/lucide-react/dist/esm/icons/cloud.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Cloud = createLucideIcon("Cloud", [["path", {
	d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
	key: "p7xjir"
}]]);
//#endregion
//#region app/live-topology.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function LiveTopology() {
	const { data, error, loading, refresh } = useLiveOperations(20), [query, setQuery] = (0, import_react.useState)(""), [selected, setSelected] = (0, import_react.useState)(null);
	const devices = data?.devices ?? [], dependencies = data?.topology.dependencies ?? [], visible = devices.filter((device) => `${device.name} ${device.site ?? ""} ${device.vendor}`.toLowerCase().includes(query.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "topology-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "topology-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "REFERENTIALLY INTACT TOPOLOGY SNAPSHOT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Network topology evidence" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only approved, time-valid service edges bound to present devices and services enter the authenticated snapshot." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "topology-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "topology-live-search",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search loaded topology..."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void refresh(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), "Refresh"]
					})]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Topology evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `live-evidence-strip ${data ? "" : "is-unavailable"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Referentially intact dependency snapshot" : "Topology snapshot unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? `${devices.length} devices · ${dependencies.length} accepted edges · ${data.scope.rejectedDependencies} rejected · checked ${formatAge(data.checkedAt)}` : loading ? "Loading authenticated dependency evidence…" : "No authenticated operations snapshot is loaded." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: data ? "Read-only" : "Unavailable" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "topology-stats nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Commissioned devices" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? devices.length : "—" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Online devices" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.online ?? "—" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved service paths" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? dependencies.length : "—" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Impacted services" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.impactedServices ?? "—" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-topology-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel live-topology-map",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "COMMISSIONED NODES"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Operational graph" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `live-status-pill ${data ? "" : "is-unavailable"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), data ? "Snapshot loaded" : "Evidence unavailable"]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "live-node-grid",
						children: [
							visible.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: `live-node node-state-${device.status}`,
								onClick: () => setSelected(device),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 19 }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: device.site || "Unassigned site" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										device.status,
										" · ",
										device.interfaces.length,
										" interfaces"
									] })
								]
							}, device.id)),
							data && visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "empty-live-state",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 22 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: query ? "No nodes match" : "No commissioned nodes" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query ? "Adjust the current search." : "The authenticated snapshot contains no commissioned devices." })
								]
							}),
							!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "empty-live-state",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 22 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Topology evidence unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated operations snapshot to populate the graph." })
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel live-dependency-list",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "SERVICE EDGES"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Approved mappings" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 18 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						dependencies.map((dependency) => {
							const device = devices.find((item) => item.id === dependency.deviceId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { size: 14 }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: dependency.serviceCode }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									device?.name ?? dependency.deviceId,
									" · ",
									dependency.interfaceName
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: dependency.role }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })
							] }, dependency.id);
						}),
						data && dependencies.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-live-state",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 22 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No approved service edges" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Approve a customer-service dependency to populate this graph." })
							]
						}),
						!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-live-state",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 22 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Dependency evidence unavailable" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No authenticated dependency snapshot is loaded." })
							]
						})
					] })]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					"aria-label": "Close topology node",
					onClick: () => setSelected(null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "topology-drawer",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "VERIFIED DEVICE NODE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									selected.vendor,
									" ",
									selected.model || "",
									" · ",
									selected.site || "Unassigned site"
								] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setSelected(null),
								"aria-label": "Close node",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "topology-drawer-status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `health-pill health-${selected.status === "online" ? "healthy" : selected.status}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), selected.status]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "device-detail-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Dependency evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Approved services" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.dependentServices })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Collected interfaces" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.interfaces.length })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Active incidents" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.activeIncidents })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Last evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatAge(selected.lastSeenAt) })] })
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "dependency-path",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Service path" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { size: 14 }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 14 }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 14 }) })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Approved mapping → ",
									selected.name,
									" → ",
									selected.dependentServices,
									" service dependencies"
								] })
							]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LiveTopology as default };
