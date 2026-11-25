import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronDown } from "./chevron-down-jG2qgWsF.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Rocket } from "./rocket-DT9BdmN0.js";
//#region app/provisioning-live.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/provisioning.tsx
var import_jsx_runtime = require_jsx_runtime();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
var display = (value) => value.replaceAll("_", " ");
var time = (value) => value ? new Intl.DateTimeFormat(void 0, {
	dateStyle: "medium",
	timeStyle: "short",
	timeZone: "Africa/Dar_es_Salaam"
}).format(new Date(value)) : "No telemetry";
function ServiceProvisioning() {
	const [payload, setPayload] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("Registered services");
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("All states");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const closeRef = (0, import_react.useRef)(null);
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/customer-services", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Service evidence is unavailable");
			setPayload(body);
			setSelected((current) => current ? body.services.find((item) => item.id === current.id) ?? null : null);
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Service evidence is unavailable");
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
	(0, import_react.useEffect)(() => {
		if (!selected) return;
		const previous = document.activeElement;
		requestAnimationFrame(() => closeRef.current?.focus());
		const key = (event) => event.key === "Escape" && setSelected(null);
		window.addEventListener("keydown", key);
		return () => {
			window.removeEventListener("keydown", key);
			previous?.focus();
		};
	}, [selected]);
	const services = (0, import_react.useMemo)(() => payload?.services ?? [], [payload]);
	const filtered = (0, import_react.useMemo)(() => services.filter((service) => (status === "All states" || service.status === status) && `${service.name} ${service.accountNumber} ${service.serviceCode} ${service.plan} ${service.site} ${service.endpointIp ?? ""}`.toLowerCase().includes(query.toLowerCase())), [
		services,
		query,
		status
	]);
	const withDependencies = services.filter((service) => service.dependencies.length > 0).length;
	const withEndpoint = services.filter((service) => Boolean(service.endpointIp)).length;
	const withTelemetry = services.filter((service) => Boolean(service.lastObservedAt)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "provision-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "provision-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Service provisioning & activation readiness" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT DELIVERY-DEPENDENCY CHRONOLOGY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Inspect registered customer services, approved device dependencies and collected telemetry while treating orders, VLAN allocation, templates and controller activation as uncommissioned." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "provision-actions",
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Provisioning evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip provision-boundary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Chronology-valid approved dependencies only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Dependency creation, approval and update times must be valid, non-future and ordered. No fictional activation orders, VLANs, reserved addresses, vendor templates, preflight passes, success rate, timing metrics or lifecycle queues are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), payload ? `${payload.evidenceIntegrity.rejectedDependencies} rejected` : "Fail closed"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "provision-summary",
				"aria-label": "Provisioning evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Rocket,
						tone: "blue",
						label: "Registered services",
						value: String(payload?.summary.activeServices ?? "—"),
						meta: "Persistent customer-service records",
						onClick: () => setTab("Registered services")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Network,
						tone: "green",
						label: "Approved dependencies",
						value: `${withDependencies}/${services.length}`,
						meta: "Device-interface mappings present",
						onClick: () => setTab("Readiness coverage")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: CircleCheck,
						tone: "violet",
						label: "Observed endpoints",
						value: `${withEndpoint}/${services.length}`,
						meta: "Stored address values only",
						onClick: () => setTab("Readiness coverage")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Clock3,
						tone: "amber",
						label: "Telemetry evidence",
						value: `${withTelemetry}/${services.length}`,
						meta: "At least one observation",
						onClick: () => setTab("Readiness coverage")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: ShieldCheck,
						tone: "red",
						label: "Controller writes",
						value: "Disabled",
						meta: "Activation not commissioned",
						onClick: () => setTab("Lifecycle boundaries")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "provision-tabs",
				role: "tablist",
				"aria-label": "Provisioning sections",
				children: [
					"Registered services",
					"Readiness coverage",
					"Lifecycle boundaries"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					role: "tab",
					"aria-selected": tab === item,
					tabIndex: tab === item ? 0 : -1,
					className: tab === item ? "provision-tab-active" : "",
					onClick: () => setTab(item),
					children: [item, item === "Registered services" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: services.length })]
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "tabpanel",
				tabIndex: -1,
				children: [
					tab === "Registered services" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "panel provision-register",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
								kicker: "PERSISTENT SERVICE REGISTER",
								title: "Observed customer services",
								copy: "Customer, plan, site, endpoint, dependency, status and SLA evidence come from stored production records."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
								query,
								setQuery,
								status,
								setStatus
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceTable, {
								data: filtered,
								setSelected
							})
						]
					}),
					tab === "Readiness coverage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Readiness, { services }),
					tab === "Lifecycle boundaries" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundaries, {})
				]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceDrawer, {
				service: selected,
				closeRef,
				close: () => setSelected(null)
			})
		]
	});
}
function Readiness({ services }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel provision-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
				kicker: "EVIDENCE COVERAGE",
				title: "Service delivery readiness boundaries",
				copy: "Recorded evidence is shown separately from uncommissioned allocation, configuration and controller capabilities."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "provision-readiness-live",
				children: services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						service.serviceCode,
						" · ",
						service.site
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Evidence, {
						label: "Service record",
						value: "Recorded",
						ready: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Evidence, {
						label: "Approved dependency",
						value: service.dependencies.length ? `${service.dependencies.length} mapped` : "Unknown",
						ready: service.dependencies.length > 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Evidence, {
						label: "Endpoint address",
						value: service.endpointIp ?? "Unknown",
						ready: Boolean(service.endpointIp)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Evidence, {
						label: "Telemetry",
						value: time(service.lastObservedAt),
						ready: Boolean(service.lastObservedAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Evidence, {
						label: "VLAN / template",
						value: "Uncommissioned",
						ready: false
					})
				] }, service.id))
			}),
			!services.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No registered services",
				copy: "Provisioning readiness appears only after a customer service is stored."
			})
		]
	});
}
function Boundaries() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel provision-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
				kicker: "FAIL-CLOSED DELIVERY CONTROLS",
				title: "Capabilities not yet commissioned",
				copy: "Unknown delivery state remains unknown; the service register cannot authorize a network change."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "provision-boundary-list",
				children: [
					[
						"Customer order and billing approval",
						"Not connected",
						"No order, billing or commercial approval is inferred from the service register."
					],
					[
						"Authoritative IP and VLAN allocation",
						"Not commissioned",
						"Observed endpoint addresses do not prove ownership, reservation or free capacity."
					],
					[
						"Vendor configuration templates",
						"Not commissioned",
						"No RouterOS, UniFi, Omada or UISP template is approved or counted here."
					],
					[
						"Controller and device activation",
						"Disabled",
						"NOCX does not push configuration, suspend, restore or terminate a service."
					],
					[
						"Rollback and post-activation validation",
						"Not commissioned",
						"No backup, rollback or success-rate claim is made without execution evidence."
					]
				].map(([title, state, copy]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: state })
				] }, title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "provision-safety",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Lifecycle actions remain unavailable." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Creating an activation order, reserving a VLAN or address, pushing a template, suspending service, restoring service and reclaiming resources require governed sources that are not connected." })] })]
			})
		]
	});
}
function ServiceTable({ data, setSelected }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "provision-table-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "provision-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customer / service" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "State" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Plan" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Access" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Observed endpoint" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Approved dependencies" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Latest evidence" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "provision-identity",
					onClick: () => setSelected(service),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { size: 15 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						service.serviceCode,
						" · ",
						service.site
					] })] })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { value: service.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.plan }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "provision-cell-meta",
					children: service.lifecycleState
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: service.access }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: service.endpointIp ?? "Unknown" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: service.dependencies.length }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: time(service.lastObservedAt) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "row-action",
					onClick: () => setSelected(service),
					"aria-label": `Inspect ${service.serviceCode}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
				}) })
			] }, service.id)) })]
		}), !data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "No registered services match",
			copy: "Adjust the search or state filter; NOCX does not add demonstration services."
		})]
	});
}
function ServiceDrawer({ service, closeRef, close }) {
	const checks = [
		[
			"Persistent customer service",
			"Recorded",
			true
		],
		[
			"Approved device-interface dependency",
			service.dependencies.length ? `${service.dependencies.length} recorded` : "Unknown",
			service.dependencies.length > 0
		],
		[
			"Observed endpoint address",
			service.endpointIp ?? "Unknown",
			Boolean(service.endpointIp)
		],
		[
			"Recent telemetry evidence",
			time(service.lastObservedAt),
			Boolean(service.lastObservedAt)
		],
		[
			"Authoritative VLAN allocation",
			"Uncommissioned",
			false
		],
		[
			"Vendor template compatibility",
			"Uncommissioned",
			false
		],
		[
			"Network configuration execution",
			"Disabled",
			false
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "provision-layer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "drawer-scrim",
			"aria-label": "Close service evidence",
			onClick: close
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "provision-drawer",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "provision-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "drawer-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "REGISTERED SERVICE EVIDENCE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "provision-title",
							children: service.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							service.serviceCode,
							" · ",
							service.site,
							" · account ",
							service.accountNumber
						] })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						ref: closeRef,
						onClick: close,
						"aria-label": "Close service evidence",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "provision-drawer-hero",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 20 }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Recorded service" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.plan }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								service.access,
								" · ",
								service.lifecycleState
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { value: service.status })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Stored service fields" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "provision-details",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Endpoint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: service.endpointIp ?? "Unknown" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "CPE label" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: service.cpe ?? "Unknown" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Region" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: service.region || "Unknown" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "SLA evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
							display(service.rollingSla.state),
							" · ",
							service.rollingSla.coveragePct,
							"% coverage"
						] })] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Delivery evidence gates" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "provision-checks",
					children: checks.map(([label, value, ready]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: ready ? "check-passed" : "check-pending",
							children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 14 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { value })
					] }, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "provision-safety",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Read-only evidence · no activation order is created." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Missing allocation, template, billing, controller and rollback evidence remains unknown. No network configuration is changed." })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "provision-drawer-actions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						onClick: close,
						children: "Close"
					})
				})
			]
		})]
	});
}
function Evidence({ label, value, ready }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: ready ? "provision-evidence-ready" : "provision-evidence-unknown",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: value })]
	});
}
function Empty({ title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "provision-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 22 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy })
		]
	});
}
function Head({ kicker, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "provision-head",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: kicker }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy })
		] })
	});
}
function Summary({ icon: Icon, tone, label, value, meta, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
		className: "provision-summary-card",
		onClick,
		tone,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }),
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: label }),
		value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: value }),
		detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: meta }) })
	});
}
function Toolbar({ query, setQuery, status, setStatus }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "provision-toolbar",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "provision-search",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search customer, service, plan or site…",
						"aria-label": "Search registered services"
					}),
					query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setQuery(""),
						"aria-label": "Clear search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "provision-select",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: status,
					onChange: (event) => setStatus(event.target.value),
					"aria-label": "Filter observed service state",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All states" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Operational" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Degraded" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Offline" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "provision-synced",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "Live records · no inferred orders"]
			})
		]
	});
}
function Badge({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `provision-badge badge-${slug(value)}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), value]
	});
}
//#endregion
export { ServiceProvisioning as default };
