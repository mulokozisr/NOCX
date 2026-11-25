import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, o as Radio, s as Router } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as Database } from "./database-0OiwfrYJ.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Users } from "./users-BADfTVSw.js";
import { n as BellRing, t as CircleAlert } from "./circle-alert-fwvsmlmG.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronDown } from "./chevron-down-jG2qgWsF.js";
import { t as EyeOff } from "./eye-off-V-Zlj26F.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Download } from "./download-CU5_C7Ji.js";
import { t as Copy } from "./copy-Dw9Cpt9W.js";
import { t as Building2 } from "./building-2-BaJtSa-T.js";
import { t as csvCell } from "./operational-evidence-BrfPkMWL.js";
import { t as MapPin } from "./map-pin-BYYZwnIv.js";
import { t as ClipboardCheck } from "./clipboard-check-nsDYafU-.js";
import { t as ListChecks } from "./list-checks-Bc5p-G5V.js";
import { t as Link2 } from "./link-2-DD83a-mv.js";
import { t as Check } from "./check-sbrzV1HL.js";
import { t as Eye } from "./eye-UJ0AFJEc.js";
import { t as ShieldAlert } from "./shield-alert-Cfamcj-Z.js";
import { t as Siren } from "./siren-Ba9AcoWV.js";
import { i as useLiveOperations, t as formatAge } from "./live-operations-ClF_13he.js";
//#region node_modules/lucide-react/dist/esm/icons/filter-x.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var FilterX = createLucideIcon("FilterX", [
	["path", {
		d: "M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055",
		key: "1fi1da"
	}],
	["path", {
		d: "m22 3-5 5",
		key: "12jva0"
	}],
	["path", {
		d: "m17 3 5 5",
		key: "k36vhe"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/pause.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Pause = createLucideIcon("Pause", [["rect", {
	x: "14",
	y: "4",
	width: "4",
	height: "16",
	rx: "1",
	key: "zuxfzm"
}], ["rect", {
	x: "6",
	y: "4",
	width: "4",
	height: "16",
	rx: "1",
	key: "1okwgv"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/play.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Play = createLucideIcon("Play", [["polygon", {
	points: "6 3 20 12 6 21 6 3",
	key: "1oa8hb"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/printer.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Printer = createLucideIcon("Printer", [
	["path", {
		d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
		key: "143wyd"
	}],
	["path", {
		d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",
		key: "1itne7"
	}],
	["rect", {
		x: "6",
		y: "14",
		width: "12",
		height: "8",
		rx: "1",
		key: "1ue0tg"
	}]
]);
//#endregion
//#region app/fleet-workbench.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var blockOne = [
	[286, "Unified fleet workbench"],
	[287, "Authenticated live snapshot"],
	[288, "Device and address search"],
	[289, "Operational-status filter"],
	[290, "Vendor fleet filter"],
	[291, "Site fleet filter"],
	[292, "Shareable URL scope"],
	[293, "One-click status scopes"],
	[294, "Priority-aware sorting"],
	[295, "Exact device drilldown"]
];
var blockTwo = [
	[296, "Evidence-freshness filter"],
	[297, "Observation age bands"],
	[298, "Current versus insufficient counts"],
	[299, "Collector coverage visibility"],
	[300, "Accepted sample coverage"],
	[301, "Observed interface coverage"],
	[302, "Rejected-record visibility"],
	[303, "Observation-window provenance"],
	[304, "Pause and resume refresh"],
	[305, "Evidence-gap review queue"]
];
var blockThree = [
	[306, "Incident-linked fleet scope"],
	[307, "Active incident rollup"],
	[308, "Acknowledgement-gap visibility"],
	[309, "Impacted-service fleet scope"],
	[310, "Approved dependency scope"],
	[311, "Exact incident deep links"],
	[312, "Exact service deep links"],
	[313, "Priority reason labels"],
	[314, "Blast-radius summary"],
	[315, "Combined operational queue"]
];
var blockFour = [
	[316, "Client-view audience toggle"],
	[317, "Management-address masking"],
	[318, "Client-safe state wording"],
	[319, "Site-scoped client view"],
	[320, "Observed availability summary"],
	[321, "Impacted-service summary"],
	[322, "Current incident summary"],
	[323, "Evidence freshness disclosure"],
	[324, "Copyable scoped view link"],
	[325, "Print-friendly operating view"]
];
var blockFive = [
	[326, "Handoff completeness score"],
	[327, "Explicit blocker register"],
	[328, "Collector-current blocker"],
	[329, "Device-evidence blocker"],
	[330, "Acknowledgement blocker"],
	[331, "Rejected-record blocker"],
	[332, "Copyable handoff summary"],
	[333, "Scoped CSV evidence export"],
	[334, "Scoped JSON evidence export"],
	[335, "Fail-closed readiness checklist"]
];
function label(status) {
	return status === "online" ? "Online" : status === "degraded" ? "Degraded" : status === "offline" ? "Offline" : "Unknown";
}
function clientLabel(status) {
	return status === "online" ? "Available" : status === "degraded" ? "Attention" : status === "offline" ? "Unavailable" : "Evidence pending";
}
function attentionScore(device) {
	return (device.status === "offline" ? 40 : device.status === "degraded" ? 25 : device.status === "unknown" ? 15 : 0) + device.activeIncidents * 10 + device.dependentServices * 2;
}
function FleetWorkbench() {
	const { data, error, loading, paused, setPaused, refresh } = useLiveOperations(15);
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [vendor, setVendor] = (0, import_react.useState)("all");
	const [site, setSite] = (0, import_react.useState)("all");
	const [freshness, setFreshness] = (0, import_react.useState)("all");
	const [impact, setImpact] = (0, import_react.useState)("all");
	const [audience, setAudience] = (0, import_react.useState)("operations");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [handoffCopied, setHandoffCopied] = (0, import_react.useState)(false);
	const [sort, setSort] = (0, import_react.useState)("attention");
	const [filtersReady, setFiltersReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const parameters = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
		queueMicrotask(() => {
			setQuery(parameters.get("q") ?? "");
			setStatus(parameters.get("status") ?? "all");
			setVendor(parameters.get("vendor") ?? "all");
			setSite(parameters.get("site") ?? "all");
			setFreshness(parameters.get("freshness") ?? "all");
			setImpact(parameters.get("impact") ?? "all");
			setAudience(parameters.get("audience") === "client" ? "client" : "operations");
			const requestedSort = parameters.get("sort");
			setSort(requestedSort === "name" || requestedSort === "recent" ? requestedSort : "attention");
			setFiltersReady(true);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!filtersReady) return;
		const parameters = new URLSearchParams();
		if (query) parameters.set("q", query);
		if (status !== "all") parameters.set("status", status);
		if (vendor !== "all") parameters.set("vendor", vendor);
		if (site !== "all") parameters.set("site", site);
		if (freshness !== "all") parameters.set("freshness", freshness);
		if (impact !== "all") parameters.set("impact", impact);
		if (audience === "client") parameters.set("audience", "client");
		if (sort !== "attention") parameters.set("sort", sort);
		const suffix = parameters.size ? `?${parameters.toString()}` : "";
		window.history.replaceState(null, "", `#/fleet-workbench${suffix}`);
	}, [
		audience,
		filtersReady,
		freshness,
		impact,
		query,
		site,
		sort,
		status,
		vendor
	]);
	const devices = (0, import_react.useMemo)(() => data?.devices ?? [], [data?.devices]);
	const vendors = (0, import_react.useMemo)(() => [...new Set(devices.map((device) => device.vendor))].sort(), [devices]);
	const sites = (0, import_react.useMemo)(() => [...new Set(devices.map((device) => device.site).filter((value) => Boolean(value)))].sort(), [devices]);
	const filtered = (0, import_react.useMemo)(() => {
		const normalized = query.trim().toLowerCase();
		return devices.filter((device) => (!normalized || `${device.name} ${device.ip ?? ""} ${device.model ?? ""} ${device.site ?? ""}`.toLowerCase().includes(normalized)) && (status === "all" || device.status === status) && (vendor === "all" || device.vendor === vendor) && (site === "all" || device.site === site) && (freshness === "all" || (freshness === "current" ? device.currentEvidenceFresh : !device.currentEvidenceFresh)) && (impact === "all" || (impact === "incidents" ? device.activeIncidents > 0 : impact === "services" ? device.dependentServices > 0 : device.activeIncidents > 0 && device.dependentServices > 0))).sort((left, right) => {
			if (sort === "name") return left.name.localeCompare(right.name);
			if (sort === "recent") return Date.parse(right.lastSeenAt ?? "") - Date.parse(left.lastSeenAt ?? "");
			return attentionScore(right) - attentionScore(left) || left.name.localeCompare(right.name);
		});
	}, [
		devices,
		freshness,
		impact,
		query,
		site,
		sort,
		status,
		vendor
	]);
	const evidenceGaps = (0, import_react.useMemo)(() => devices.filter((device) => !device.currentEvidenceFresh || device.status === "unknown").sort((left, right) => attentionScore(right) - attentionScore(left)), [devices]);
	const operationalQueue = (0, import_react.useMemo)(() => devices.filter((device) => device.activeIncidents > 0 || device.dependentServices > 0).sort((left, right) => attentionScore(right) - attentionScore(left)), [devices]);
	const impactedServiceCodes = (0, import_react.useMemo)(() => new Set(devices.flatMap((device) => device.impactedServiceCodes)).size, [devices]);
	const clearFilters = () => {
		setQuery("");
		setStatus("all");
		setVendor("all");
		setSite("all");
		setFreshness("all");
		setImpact("all");
		setSort("attention");
	};
	const filterCount = Number(Boolean(query)) + Number(status !== "all") + Number(vendor !== "all") + Number(site !== "all") + Number(freshness !== "all") + Number(impact !== "all");
	const copyScopedView = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch {
			setCopied(false);
		}
	};
	const rejectedRecords = data ? data.scope.rejectedDevices + data.scope.rejectedIncidents + data.scope.rejectedDependencies + data.scope.rejectedAcknowledgements : null;
	const readinessChecks = [
		{
			label: "Verified snapshot loaded",
			ready: Boolean(data),
			detail: data ? formatAge(data.checkedAt) : "Unavailable"
		},
		{
			label: "Collectors current",
			ready: Boolean(data && data.summary.collectorsOnline === data.summary.collectorsTotal),
			detail: data ? `${data.summary.collectorsOnline}/${data.summary.collectorsTotal}` : "Unavailable"
		},
		{
			label: "Device evidence current",
			ready: Boolean(data && evidenceGaps.length === 0),
			detail: data ? `${evidenceGaps.length} gaps` : "Unavailable"
		},
		{
			label: "Incident acknowledgements complete",
			ready: Boolean(data && data.summary.unacknowledgedIncidents === 0),
			detail: data ? `${data.summary.unacknowledgedIncidents} pending` : "Unavailable"
		},
		{
			label: "No rejected linked records",
			ready: rejectedRecords === 0,
			detail: rejectedRecords === null ? "Unavailable" : `${rejectedRecords} rejected`
		}
	];
	const readinessScore = data ? Math.round(readinessChecks.filter((check) => check.ready).length / readinessChecks.length * 100) : null;
	const downloadEvidence = (format) => {
		const safeDevices = filtered.map((device) => ({
			name: device.name,
			vendor: device.vendor,
			model: audience === "client" ? null : device.model,
			site: device.site,
			managementAddress: audience === "client" ? null : device.ip,
			status: audience === "client" ? clientLabel(device.status) : label(device.status),
			evidenceFresh: device.currentEvidenceFresh,
			lastSeenAt: device.lastSeenAt,
			activeIncidents: device.activeIncidents,
			dependentServices: device.dependentServices
		}));
		const csv = [[
			"Device",
			"Vendor",
			"Model",
			"Site",
			"Management address",
			"Status",
			"Evidence current",
			"Last seen",
			"Active incidents",
			"Dependent services"
		], ...safeDevices.map((device) => [
			device.name,
			device.vendor,
			device.model ?? "",
			device.site ?? "",
			device.managementAddress ?? "",
			device.status,
			String(device.evidenceFresh),
			device.lastSeenAt ?? "",
			String(device.activeIncidents),
			String(device.dependentServices)
		])].map((row) => row.map(csvCell).join(",")).join("\n");
		const body = format === "csv" ? csv : JSON.stringify({
			checkedAt: data?.checkedAt ?? null,
			audience,
			filters: {
				query,
				status,
				vendor,
				site,
				freshness,
				impact,
				sort
			},
			devices: safeDevices,
			controls: {
				networkWrites: false,
				credentialValues: false
			}
		}, null, 2);
		const url = URL.createObjectURL(new Blob([body], { type: format === "csv" ? "text/csv;charset=utf-8" : "application/json" }));
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `nocx-fleet-evidence.${format}`;
		anchor.click();
		URL.revokeObjectURL(url);
	};
	const copyHandoff = async () => {
		if (!data) return;
		const blockers = readinessChecks.filter((check) => !check.ready).map((check) => `${check.label}: ${check.detail}`);
		const summary = `NOCX fleet handoff · checked ${data.checkedAt} · ${filtered.length}/${devices.length} devices in scope · completeness ${readinessScore}% · blockers: ${blockers.length ? blockers.join("; ") : "none in accepted evidence"} · read-only; no network writes`;
		try {
			await navigator.clipboard.writeText(summary);
			setHandoffCopied(true);
			window.setTimeout(() => setHandoffCopied(false), 1800);
		} catch {
			setHandoffCopied(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: `fleet-workbench ${audience === "client" ? "client-fleet-view" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "fleet-workbench-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "FLEET OPERATIONS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Fleet Operations Workbench" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Move from a verified fleet signal to the exact read-only device record without losing vendor, site, status or search scope." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fleet-hero-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => setAudience(audience === "client" ? "operations" : "client"),
							children: [
								audience === "client" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 15 }),
								" ",
								audience === "client" ? "Operations view" : "Client view"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => void copyScopedView(),
							children: [
								copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 15 }),
								" ",
								copied ? "Link copied" : "Copy view"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { size: 15 }), "Print"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => setPaused(!paused),
							children: [
								paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { size: 15 }),
								" ",
								paused ? "Resume refresh" : "Pause refresh"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => void refresh(),
							disabled: loading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								className: loading ? "refresh-spin" : "",
								size: 16
							}), loading ? "Refreshing…" : "Refresh evidence"]
						})
					]
				})]
			}),
			audience === "client" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "client-view-banner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Simplified service view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Technical addresses and IDs are hidden in this view. The dashboard is public; this is not an isolated customer account." })] })]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Fleet evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `live-evidence-strip ${data ? "" : "is-unavailable"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "Verified read-only fleet snapshot" : "Fleet snapshot unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: data ? `Checked ${formatAge(data.checkedAt)} · ${data.summary.collectorsOnline}/${data.summary.collectorsTotal} collectors current` : loading ? "Loading strict operational evidence…" : "No accepted snapshot is loaded." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: data ? "No writes" : "Unavailable" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "fleet-scope-cards",
				"aria-label": "Fleet status scopes",
				children: [
					[
						"all",
						"All devices",
						data?.summary.devices,
						Router
					],
					[
						"online",
						"Online",
						data?.summary.online,
						CircleCheck
					],
					[
						"degraded",
						"Degraded",
						data?.summary.degraded,
						CircleAlert
					],
					[
						"offline",
						"Offline",
						data?.summary.offline,
						TriangleAlert
					],
					[
						"unknown",
						"Unknown",
						data?.summary.unknown,
						Clock3
					]
				].map(([value, title, count, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: status === value ? "active" : "",
					onClick: () => setStatus(value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: audience === "client" && value !== "all" ? clientLabel(value) : title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: count ?? "—" })] })]
				}, value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "fleet-coverage-grid",
				"aria-label": "Fleet evidence coverage",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Collectors current" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? `${data.summary.collectorsOnline}/${data.summary.collectorsTotal}` : "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Strict heartbeat scope" })
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Accepted samples" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? data.scope.availabilitySamples + data.scope.metricSamples : "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Availability + metrics" })
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observed interfaces" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data?.summary.observedInterfaces ?? "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Current snapshot scope" })
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Rejected records" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? data.scope.rejectedDevices + data.scope.rejectedIncidents + data.scope.rejectedDependencies + data.scope.rejectedAcknowledgements : "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Never included in totals" })
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observation window" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? formatAge(data.observationWindowStartedAt) : "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: paused ? "Auto-refresh paused" : "15-second refresh" })
					] })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "fleet-impact-grid",
				"aria-label": "Operational impact summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#/incidents",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Siren, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Active incidents" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data?.summary.activeIncidents ?? "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [data?.summary.unacknowledgedIncidents ?? "—", " unacknowledged"] })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setImpact("incidents"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Incident-linked devices" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? devices.filter((device) => device.activeIncidents > 0).length : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Open exact fleet scope" })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setImpact("services"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Dependency-linked devices" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? devices.filter((device) => device.dependentServices > 0).length : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Approved mappings only" })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#/customers",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Impacted service codes" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? impactedServiceCodes : "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [data?.summary.impactedServices ?? "—", " mapped services impacted"] })
						] })]
					})
				]
			}),
			audience === "client" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "client-fleet-summary nocx-summary-grid",
				"aria-label": "Client-facing service summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: void 0,
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Selected site" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: site === "all" ? "All visible sites" : site }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Use the Site filter to create a client-specific view." }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: void 0,
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Observed availability" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.observedAvailabilityPct == null ? "—" : `${data.summary.observedAvailabilityPct}%` }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Based on accepted 24-hour samples." }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: void 0,
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Service impact" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.impactedServices ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved dependency mappings only." }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: void 0,
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Current incidents" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.summary.activeIncidents ?? "—" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Missing evidence does not mean a clear state." }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel fleet-workbench-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "CURRENT FLEET SCOPE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Verified devices" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? `${filtered.length} of ${devices.length} accepted records shown` : "Evidence unavailable" })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "fleet-filter-count",
						children: [
							filterCount,
							" active filter",
							filterCount === 1 ? "" : "s"
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fleet-workbench-toolbar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "fleet-search",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: query,
									onChange: (event) => setQuery(event.target.value),
									placeholder: "Search device, address, model or site…",
									"aria-label": "Search fleet workbench"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vendor" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: vendor,
									onChange: (event) => setVendor(event.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "All vendors"
									}), vendors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Site" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: site,
									onChange: (event) => setSite(event.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "All sites"
									}), sites.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: freshness,
									onChange: (event) => setFreshness(event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "all",
											children: "All evidence"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "current",
											children: "Current only"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "insufficient",
											children: "Insufficient only"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Impact" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: impact,
									onChange: (event) => setImpact(event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "all",
											children: "All impact"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "incidents",
											children: "Has incidents"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "services",
											children: "Has dependencies"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "both",
											children: "Incidents + services"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sort" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: sort,
									onChange: (event) => setSort(event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "attention",
											children: "Attention first"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "name",
											children: "Device name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "recent",
											children: "Most recently seen"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "secondary-button",
								onClick: clearFilters,
								disabled: !filterCount && sort === "attention",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterX, { size: 14 }), "Reset"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fleet-workbench-table-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "fleet-workbench-table",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Device" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Vendor / model" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Site" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Evidence" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Operational links" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: audience === "client" ? "Management address hidden" : device.ip ?? "No management address" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.vendor }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: audience === "client" ? "Managed network device" : device.model ?? "Model unreported" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "fleet-site",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 12 }), device.site ?? "Unassigned"]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `device-status status-${device.status}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), audience === "client" ? clientLabel(device.status) : label(device.status)]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.currentEvidenceFresh ? "Current" : "Insufficient" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: formatAge(device.lastSeenAt) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "fleet-operational-links",
										children: [device.incidentIds[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `#/incidents?incident=${encodeURIComponent(device.incidentIds[0])}`,
											children: [
												device.activeIncidents,
												" incident",
												device.activeIncidents === 1 ? "" : "s"
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "0 incidents" }), device.dependentServiceCodes[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `#/customers?service=${encodeURIComponent(device.dependentServiceCodes[0])}`,
											children: [
												device.dependentServices,
												" service",
												device.dependentServices === 1 ? "" : "s"
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "0 services" })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: `#/devices?device=${encodeURIComponent(device.id)}`,
										"aria-label": `Open ${device.name} device record`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 17 })
									}) })
								] }, device.id)) })]
							}),
							data && !loading && !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fleet-workbench-empty",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 24 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No verified devices match this scope" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Reset or adjust the fleet filters." })
								]
							}),
							!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fleet-workbench-empty",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 24 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Fleet evidence unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No device total or operational state is inferred." })
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel fleet-evidence-gaps",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "EVIDENCE-GAP REVIEW"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Devices without current operational evidence" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Unknown or insufficient evidence is queued for review; it is never converted into an offline or healthy claim." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? evidenceGaps.length : "—" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					evidenceGaps.slice(0, 8).map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `#/devices?device=${encodeURIComponent(device.id)}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 15 }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								device.vendor,
								" · ",
								device.site ?? "Unassigned site"
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: device.lastSeenAt ? formatAge(device.lastSeenAt) : "Never observed" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })
						]
					}, device.id)),
					data && !evidenceGaps.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fleet-gap-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No current evidence gaps in the accepted fleet snapshot" })]
					}),
					!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fleet-gap-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Gap evidence unavailable" })]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel fleet-operational-queue",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "COMBINED OPERATIONAL QUEUE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Incident and service-linked devices" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Priority combines observed status, active incident records and approved service dependencies. It never triggers a network action." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? operationalQueue.length : "—" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					operationalQueue.slice(0, 10).map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `queue-state state-${device.status}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), label(device.status)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
								device.vendor,
								" · ",
								device.site ?? "Unassigned site"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: [
								device.activeIncidents ? `${device.activeIncidents} active incident${device.activeIncidents === 1 ? "" : "s"}` : "",
								device.dependentServices ? `${device.dependentServices} approved dependenc${device.dependentServices === 1 ? "y" : "ies"}` : "",
								!device.currentEvidenceFresh ? "insufficient current evidence" : ""
							].filter(Boolean).join(" · ") })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "queue-links",
							children: [
								device.incidentIds[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `#/incidents?incident=${encodeURIComponent(device.incidentIds[0])}`,
									children: "Incident"
								}),
								device.dependentServiceCodes[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `#/customers?service=${encodeURIComponent(device.dependentServiceCodes[0])}`,
									children: "Service"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `#/devices?device=${encodeURIComponent(device.id)}`,
									children: "Device"
								})
							]
						})
					] }, device.id)),
					data && !operationalQueue.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fleet-gap-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No incident or service-linked device records in this snapshot" })]
					}),
					!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "fleet-gap-empty",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Operational queue unavailable" })]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel fleet-handoff",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "OPERATOR HANDOFF COMPLETENESS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Fail-closed readiness checklist" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This score describes evidence completeness for review. It does not prove network health, approve a release or authorize any action." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: readinessScore === 100 ? "handoff-complete" : "",
					children: readinessScore === null ? "—" : `${readinessScore}%`
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fleet-handoff-body",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "handoff-checks",
						children: readinessChecks.map((check) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: check.ready ? "ready" : "blocked",
							children: [
								check.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 17 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 17 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: check.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: check.detail })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: check.ready ? "Accepted" : "Blocked" })
							]
						}, check.label))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { size: 22 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Scoped handoff" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? `${filtered.length} of ${devices.length} verified devices are included in the current URL-preserved scope.` : "No verified snapshot is loaded." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "secondary-button",
								onClick: () => void copyHandoff(),
								disabled: !data,
								children: [
									handoffCopied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { size: 14 }),
									" ",
									handoffCopied ? "Summary copied" : "Copy summary"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "secondary-button",
								onClick: () => downloadEvidence("csv"),
								disabled: !data,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), "CSV"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "secondary-button",
								onClick: () => downloadEvidence("json"),
								disabled: !data,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), "JSON"]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Exports contain accepted scoped evidence only. Client view masks addresses and models." })
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "panel fleet-program-register",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Advanced capability register" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "50-VERSION PROGRAM COMPLETE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Versions 286–335" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: [
						...blockOne,
						...blockTwo,
						...blockThree,
						...blockFour,
						...blockFive
					].map(([version, capability]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["V", version] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: capability })] }, version)) })
				]
			})
		]
	});
}
//#endregion
export { FleetWorkbench as default };
