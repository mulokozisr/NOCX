import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronDown } from "./chevron-down-jG2qgWsF.js";
import { t as HardDrive } from "./hard-drive-ra7fzo_9.js";
//#region node_modules/lucide-react/dist/esm/icons/package-check.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PackageCheck = createLucideIcon("PackageCheck", [
	["path", {
		d: "m16 16 2 2 4-4",
		key: "gfu2re"
	}],
	["path", {
		d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
		key: "e7tb2h"
	}],
	["path", {
		d: "m7.5 4.27 9 5.15",
		key: "1c824w"
	}],
	["polyline", {
		points: "3.29 7 12 12 20.71 7",
		key: "ousv84"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "22",
		y2: "12",
		key: "a4e8g8"
	}]
]);
//#endregion
//#region app/firmware-live.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/firmware.tsx
var import_jsx_runtime = require_jsx_runtime();
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-");
var time = (value) => {
	if (!value) return "No evidence";
	const timestamp = Date.parse(value);
	if (!Number.isFinite(timestamp)) return "Invalid time excluded";
	if (timestamp > Date.now()) return "Future time excluded";
	return new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(new Date(timestamp));
};
function FirmwareCompliance() {
	const [data, setData] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("Registered devices");
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/assets", { cache: "no-store" });
			const body = await response.json();
			if (!response.ok) throw new Error(body.error || "Device evidence is unavailable");
			setData(body);
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Device evidence is unavailable");
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
	const devices = (0, import_react.useMemo)(() => (data?.assets ?? []).filter((device) => (status === "all" || device.status === status) && `${device.id} ${device.hostname} ${device.vendor} ${device.model ?? ""} ${device.site ?? ""}`.toLowerCase().includes(query.toLowerCase())), [
		data,
		query,
		status
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "firmware-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "firmware-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Firmware & configuration compliance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT ASSET STATE BOUNDARY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Inspect registered devices and collected evidence while preserving valid current Online, valid current Offline, or Unknown state and treating installed versions, approved baselines, vulnerabilities, backups, compatibility and upgrade execution as unknown." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
						className: loading ? "refresh-spin" : "",
						size: 15
					}), loading ? "Refreshing…" : "Refresh evidence"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Firmware evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip firmware-boundary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Registered production devices only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Device state inherits the asset API freshness gate; Degraded is unassessed and stale, future, invalid or missing registry state is Unknown. No fictional installed versions, target releases, exposures, backups, compatibility checks, compliance percentages, campaigns, rollout waves or maintenance windows are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 device writes"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "firmware-summary",
				"aria-label": "Firmware evidence summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: HardDrive,
						label: "Registered devices",
						value: String(data?.summary.registeredAssets ?? "—"),
						meta: "Persistent device registry",
						onClick: () => setTab("Registered devices")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: CircleCheck,
						label: "Observed devices",
						value: String(data?.summary.observedAssets ?? "—"),
						meta: "Availability or metrics stored",
						onClick: () => setTab("Registered devices")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: PackageCheck,
						label: "Versions collected",
						value: "0",
						meta: "Collection not commissioned",
						onClick: () => setTab("Evidence coverage")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: ShieldCheck,
						label: "Approved baselines",
						value: "0",
						meta: "Vendor policy not connected",
						onClick: () => setTab("Evidence coverage")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Clock3,
						label: "Upgrade campaigns",
						value: "0",
						meta: "Execution not commissioned",
						onClick: () => setTab("Upgrade boundaries")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "firmware-tabs",
				"aria-label": "Firmware sections",
				children: [
					"Registered devices",
					"Evidence coverage",
					"Upgrade boundaries"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: tab === item ? "firmware-tab-active" : "",
					onClick: () => setTab(item),
					children: [item, item === "Registered devices" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.assets.length ?? 0 })]
				}, item))
			}),
			tab === "Registered devices" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Register, {
				data: devices,
				query,
				setQuery,
				status,
				setStatus
			}),
			tab === "Evidence coverage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coverage, { data }),
			tab === "Upgrade boundaries" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boundaries, {})
		]
	});
}
function Register({ data, query, setQuery, status, setStatus }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel firmware-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
				kicker: "PERSISTENT DEVICE REGISTER",
				title: "Devices requiring authoritative firmware sources",
				copy: "Identity, site, source, freshness-gated state and observation counts are stored; version and compliance fields remain unknown."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "firmware-toolbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "Search registered devices…",
							"aria-label": "Search registered devices for firmware evidence"
						}),
						query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setQuery(""),
							"aria-label": "Clear device search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: status,
						onChange: (event) => setStatus(event.target.value),
						"aria-label": "Filter device state",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "All states"
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 12 }), "0 inferred versions"] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "firmware-table-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "firmware-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Device" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "State" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Site" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Source" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Installed version" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Target baseline" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Vulnerability state" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Backup evidence" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Latest observation" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "firmware-device",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { size: 15 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.hostname }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								device.id,
								" · ",
								device.vendor,
								" ",
								device.model ?? ""
							] })] })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { value: device.status }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: device.site ?? "Unassigned" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: device.source }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Unknown" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Unknown" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Unassessed" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Unknown" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: time(device.latestEvidenceAt) })
					] }, device.id)) })]
				}), !data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					title: "No registered devices match",
					copy: "Adjust the search or state filter; no demonstration fleet is added."
				})]
			})
		]
	});
}
function Coverage({ data }) {
	const rows = [
		[
			"Device identity",
			data?.summary.registeredAssets ?? 0,
			"active",
			"Persistent hostname, vendor, model, site and source"
		],
		[
			"Operational observations",
			data?.summary.observedAssets ?? 0,
			data?.summary.observedAssets ? "active" : "unknown",
			"Availability or metric samples linked to a device"
		],
		[
			"Installed firmware versions",
			0,
			"uncommissioned",
			"No authoritative version collector is connected"
		],
		[
			"Approved release baselines",
			0,
			"uncommissioned",
			"No vendor policy or signed baseline register is connected"
		],
		[
			"Vulnerability evidence",
			0,
			"uncommissioned",
			"No scanner, advisory feed or CVE mapping is connected"
		],
		[
			"Configuration backups",
			0,
			"uncommissioned",
			"No verified backup catalog or restore evidence is connected"
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel firmware-register",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
			kicker: "FIRMWARE DATA COVERAGE",
			title: "Known evidence boundaries",
			copy: "Operational telemetry does not prove an installed version, exposure, backup or safe upgrade target."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "firmware-coverage-live",
			children: rows.map(([label, records, state, detail]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: state === "active" ? "firmware-evidence-active" : "firmware-evidence-unknown",
					children: state === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 17 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 17 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: state }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: label }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: detail })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: state === "active" ? `${records} records` : "No claims" })
			] }, label))
		})]
	});
}
function Boundaries() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel firmware-register",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
				kicker: "FAIL-CLOSED UPGRADE CONTROLS",
				title: "Upgrade capabilities not commissioned",
				copy: "Registered device identity cannot authorize or simulate firmware work."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "firmware-boundary-list",
				children: [
					[
						"Compatibility validation",
						"Not commissioned",
						"NOCX cannot call a release compatible without device-matched vendor evidence."
					],
					[
						"Backup and rollback readiness",
						"Not commissioned",
						"No backup timestamp, restore test or rollback package is inferred."
					],
					[
						"Campaign approval and rollout waves",
						"Not commissioned",
						"No campaign, wave, progress, maintenance window or success outcome is created."
					],
					[
						"Firmware download and device upgrade",
						"Disabled",
						"NOCX cannot download packages, upload firmware, reboot a device or change configuration."
					],
					[
						"Compliance and vulnerability scoring",
						"Unavailable",
						"Fleet compliance, exposure severity and remediation deadlines remain unknown without authoritative sources."
					]
				].map(([label, state, detail]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: detail })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: state })
				] }, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "firmware-safety",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Firmware and configuration writes remain disabled." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Any future upgrade requires authoritative installed-version collection, an approved target baseline, device-specific compatibility, a verified backup, independent change approval and a maintenance window." })] })]
			})
		]
	});
}
function Head({ kicker, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "firmware-head",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: kicker }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy })
		] })
	});
}
function Summary({ icon: Icon, label, value, meta, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
		className: "firmware-summary-card",
		onClick,
		tone: "blue",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }),
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: label }),
		value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: value }),
		detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: meta }) })
	});
}
function Badge({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `firmware-badge firmware-${slug(value)}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), value]
	});
}
function Empty({ title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "firmware-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { size: 24 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })
		]
	});
}
//#endregion
export { FirmwareCompliance as default };
