import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, r as Activity, t as Network } from "./network-CaMqMjRB.js";
import { c as Gauge, d as TriangleAlert, l as Clock3, o as Radio, s as Router, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleAlert } from "./circle-alert-fwvsmlmG.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronDown } from "./chevron-down-jG2qgWsF.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
import { t as Download } from "./download-CU5_C7Ji.js";
import { n as useOperatorAccess, t as OperatorAccess } from "./operator-access-CJCL0tBn.js";
import { t as GitBranch } from "./git-branch-BS9K82eP.js";
import { t as Building2 } from "./building-2-BaJtSa-T.js";
import { t as csvCell } from "./operational-evidence-BrfPkMWL.js";
import { t as MapPin } from "./map-pin-BYYZwnIv.js";
import { t as Signal } from "./signal-CPXqs_sx.js";
import "./page-CY3TPLj0.js";
//#region app/service-mapping-form.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ServiceMappingForm({ onSaved, onCancel, initial, serviceId, expectedUpdatedAt }) {
	const access = useOperatorAccess(), [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [reload, setReload] = (0, import_react.useState)(0), [reason, setReason] = (0, import_react.useState)(""), [form, setForm] = (0, import_react.useState)(initial ?? {
		customerId: "",
		siteId: "",
		deviceId: "",
		serviceCode: "",
		planName: "",
		slaTargetPct: "99.5",
		mode: "availability",
		interfaces: []
	});
	(0, import_react.useEffect)(() => {
		let alive = true;
		fetch("/api/platform/service-mappings", { cache: "no-store" }).then(async (r) => {
			const b = await r.json();
			if (!r.ok) throw new Error(b.error);
			if (alive) setData(b);
		}).catch((e) => {
			if (alive) setError(e.message);
		});
		return () => {
			alive = false;
		};
	}, [reload]);
	const sites = data?.sites.filter((s) => s.customerId === form.customerId) ?? [], site = sites.find((s) => s.id === form.siteId), devices = data?.devices.filter((d) => d.siteId ? d.siteId === form.siteId : site && d.site === site.name) ?? [], device = devices.find((d) => d.id === form.deviceId);
	async function save(e) {
		e.preventDefault();
		setBusy(true);
		setError("");
		try {
			const r = await fetch("/api/platform/service-mappings", {
				method: serviceId ? "PATCH" : "POST",
				headers: access.headers,
				body: JSON.stringify({
					...form,
					id: serviceId,
					expectedUpdatedAt,
					reason,
					slaTargetPct: Number(form.slaTargetPct)
				})
			}), body = await r.json();
			if (!r.ok) throw new Error(body.error);
			onSaved();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Service could not be saved");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "workflow-form",
		onSubmit: save,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorAccess, { access }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "secondary-button",
				type: "button",
				disabled: busy,
				onClick: () => {
					setError("");
					setReload((v) => v + 1);
				},
				children: "Refresh choices"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Map an existing customer and site to one registered device. This saves monitoring relationships; it does not configure devices or start polling." }),
			!data && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: "Loading mapping choices…"
			}),
			data?.truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Some choices are omitted by the directory limit. Ask an administrator to narrow the directory before proceeding." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Customer", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				required: true,
				value: form.customerId,
				onChange: (e) => setForm({
					...form,
					customerId: e.target.value,
					siteId: "",
					deviceId: "",
					interfaces: []
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Select customer"
				}), data?.customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: c.id,
					children: c.name
				}, c.id))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Site", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				required: true,
				value: form.siteId,
				onChange: (e) => setForm({
					...form,
					siteId: e.target.value,
					deviceId: "",
					interfaces: []
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Select customer site"
				}), sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s.id,
					children: s.name
				}, s.id))]
			})] }),
			form.customerId && !sites.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Add a site from the customer directory first. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `#/sites?customer=${encodeURIComponent(form.customerId)}&new=1`,
				children: "Add site"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Device", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				required: true,
				value: form.deviceId,
				onChange: (e) => setForm({
					...form,
					deviceId: e.target.value,
					interfaces: []
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Select assigned device"
				}), devices.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: d.id,
					children: [
						d.name,
						" · ",
						d.ip ?? "No address"
					]
				}, d.id))]
			})] }),
			site && !devices.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Assign a registered device to this site first. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: `#/sites?site=${encodeURIComponent(form.siteId)}`,
				children: "Open site assignments"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Monitoring evidence", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: form.mode,
				onChange: (e) => setForm({
					...form,
					mode: e.target.value,
					interfaces: []
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "availability",
					children: "Device availability only"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "interfaces",
					disabled: !device?.interfaces.length,
					children: "Observed interfaces"
				})]
			})] }),
			form.mode === "interfaces" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Current observed interfaces" }), device?.interfaces.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				checked: form.interfaces.includes(i),
				onChange: (e) => setForm({
					...form,
					interfaces: e.target.checked ? [...form.interfaces, i] : form.interfaces.filter((v) => v !== i)
				})
			}), i] }, i))] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Unique service code", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				required: true,
				maxLength: 80,
				value: form.serviceCode,
				onChange: (e) => setForm({
					...form,
					serviceCode: e.target.value
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Package name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				required: true,
				minLength: 2,
				maxLength: 120,
				value: form.planName,
				onChange: (e) => setForm({
					...form,
					planName: e.target.value
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Availability target (%)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "number",
				required: true,
				min: "90",
				max: "99.99",
				step: "0.01",
				value: form.slaTargetPct,
				onChange: (e) => setForm({
					...form,
					slaTargetPct: e.target.value
				})
			})] }),
			serviceId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Reason for change", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				required: true,
				minLength: 8,
				maxLength: 1e3,
				value: reason,
				onChange: (e) => setReason(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Targets do not prove a contractual SLA. Unknown gaps remain excluded from verified uptime." }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "workflow-error",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "workflow-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "secondary-button",
					onClick: onCancel,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary-button",
					disabled: !access.canWrite || busy || !data,
					children: busy ? "Saving service…" : serviceId ? "Save service changes" : "Create service mapping"
				})]
			})
		]
	});
}
//#endregion
//#region app/service-lifecycle.tsx
function mappingSummary(value) {
	try {
		const parsed = JSON.parse(value), s = parsed.service ?? parsed;
		return `${s.serviceCode ?? "Service"} · ${s.planName ?? "Package unavailable"} · ${s.site ?? s.siteId ?? "Unassigned site"} · ${s.cpeLabel ?? s.deviceName ?? s.deviceId ?? "Endpoint unavailable"} · ${s.lifecycleState ?? "active"}`;
	} catch {
		return "Historical mapping unavailable";
	}
}
function ServiceLifecycle({ serviceId, onSaved }) {
	const access = useOperatorAccess(), [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [editing, setEditing] = (0, import_react.useState)(false), [archive, setArchive] = (0, import_react.useState)(false), [reason, setReason] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [reload, setReload] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let alive = true;
		fetch("/api/platform/service-mappings?id=" + encodeURIComponent(serviceId), { cache: "no-store" }).then(async (r) => {
			const b = await r.json();
			if (!r.ok) throw new Error(b.error);
			if (alive) {
				setData(b);
				setError("");
			}
		}).catch((e) => {
			if (alive) setError(e.message);
		});
		return () => {
			alive = false;
		};
	}, [serviceId, reload]);
	async function archiveService(e) {
		e.preventDefault();
		if (!data) return;
		setBusy(true);
		setError("");
		try {
			const r = await fetch("/api/platform/service-mappings", {
				method: "PATCH",
				headers: access.headers,
				body: JSON.stringify({
					id: serviceId,
					action: "archive",
					reason,
					expectedUpdatedAt: data.service.updatedAt
				})
			}), b = await r.json();
			if (!r.ok) throw new Error(b.error);
			onSaved();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Service was not archived");
		} finally {
			setBusy(false);
		}
	}
	const initial = data ? {
		customerId: data.service.customerId,
		siteId: data.service.siteId ?? "",
		deviceId: data.dependencies[0]?.deviceId ?? "",
		serviceCode: data.service.serviceCode,
		planName: data.service.planName,
		slaTargetPct: String(data.service.slaTargetBps / 100),
		mode: data.dependencies.every((d) => d.dependencyRole === "availability") ? "availability" : "interfaces",
		interfaces: data.dependencies.filter((d) => d.dependencyRole !== "availability").map((d) => d.interfaceName)
	} : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "device-detail-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Manage service" }),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				role: "alert",
				className: "workflow-error",
				children: [error, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary-button",
					onClick: () => {
						setEditing(false);
						setArchive(false);
						setReload((v) => v + 1);
					},
					children: "Reload service"
				})]
			}),
			!data && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: "Loading service controls…"
			}),
			data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Changes affect this service mapping. Device monitoring continues independently. Previous mappings remain in history." }),
				editing && initial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceMappingForm, {
					initial,
					serviceId,
					expectedUpdatedAt: data.service.updatedAt,
					onCancel: () => setEditing(false),
					onSaved
				}) : archive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "workflow-form",
					onSubmit: archiveService,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorAccess, { access }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Archive ",
							data.service.serviceCode,
							"? It will leave active service views. Its device and historical records will remain."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Reason", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							required: true,
							minLength: 8,
							maxLength: 1e3,
							value: reason,
							onChange: (e) => setReason(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "workflow-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "secondary-button",
								disabled: busy,
								onClick: () => setArchive(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								disabled: busy || !access.canWrite,
								children: busy ? "Archiving…" : "Confirm archive"
							})]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "workflow-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						onClick: () => setEditing(true),
						disabled: data.service.lifecycleState !== "active",
						children: "Edit or remap service"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						onClick: () => setArchive(true),
						disabled: data.service.lifecycleState !== "active",
						children: "Archive service"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
						"Mapping history (",
						data.history.filter((h) => h.action !== "commit").length,
						")"
					] }),
					data.history.filter((h) => h.action !== "commit").map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: h.action === "archive" ? "Archived" : "Mapping changed" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							h.createdAt,
							" · ",
							h.actor
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: h.reason }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Previous and saved mapping" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Before:" }),
								" ",
								mappingSummary(h.beforeSnapshot)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "After:" }),
								" ",
								mappingSummary(h.afterSnapshot)
							] })
						] })
					] }, h.id)),
					!data.history.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No mapping changes recorded." })
				] })
			] })
		]
	});
}
//#endregion
//#region app/archived-services.tsx
function ArchivedServices() {
	const [rows, setRows] = (0, import_react.useState)([]), [error, setError] = (0, import_react.useState)(""), [opened, setOpened] = (0, import_react.useState)(null), [truncated, setTruncated] = (0, import_react.useState)(false), [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let alive = true;
		fetch("/api/platform/service-mappings?view=archived", { cache: "no-store" }).then(async (r) => {
			const b = await r.json();
			if (!r.ok) throw new Error(b.error);
			if (alive) {
				setRows(b.services);
				setTruncated(b.truncated);
			}
		}).catch((e) => {
			if (alive) setError(e.message);
		}).finally(() => {
			if (alive) setLoading(false);
		});
		return () => {
			alive = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "device-detail-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Archived services and mapping history" }),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: "Loading archived services…"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: error
			}),
			!loading && !error && !rows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No archived services." }),
			truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Showing the first 500 archived services." }),
			rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "secondary-button",
				onClick: () => setOpened(opened === r.id ? null : r.id),
				children: [
					r.serviceCode,
					" · ",
					r.site
				]
			}), opened === r.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceLifecycle, {
				serviceId: r.id,
				onSaved: () => {}
			})] }, r.id))
		]
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/user-plus.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var UserPlus = createLucideIcon("UserPlus", [
	["path", {
		d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
		key: "1yyitq"
	}],
	["circle", {
		cx: "9",
		cy: "7",
		r: "4",
		key: "nufk8"
	}],
	["line", {
		x1: "19",
		x2: "19",
		y1: "8",
		y2: "14",
		key: "1bvyxn"
	}],
	["line", {
		x1: "22",
		x2: "16",
		y1: "11",
		y2: "11",
		key: "1shjgl"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/zap.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Zap = createLucideIcon("Zap", [["path", {
	d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
	key: "1xq2db"
}]]);
//#endregion
//#region app/customers.tsx
function statusClass(status) {
	return status.toLowerCase();
}
function formatRate(value) {
	if (value === null) return "—";
	if (value >= 1e9) return `${(value / 1e9).toFixed(2)} Gbps`;
	if (value >= 1e6) return `${(value / 1e6).toFixed(2)} Mbps`;
	if (value >= 1e3) return `${(value / 1e3).toFixed(1)} Kbps`;
	return `${value} bps`;
}
function formatTime(value) {
	return value ? new Date(value).toLocaleString() : "Waiting for telemetry";
}
function formatDuration(value) {
	const seconds = Math.max(0, Math.round(Math.abs(value)));
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor(seconds % 3600 / 60);
	const remainder = seconds % 60;
	if (hours > 0) return `${hours}h ${minutes}m`;
	if (minutes > 0) return `${minutes}m ${remainder}s`;
	return `${remainder}s`;
}
function errorBudget(value) {
	return value < 0 ? `${formatDuration(value)} over` : `${formatDuration(value)} left`;
}
function slaLabel(state) {
	if (state === "within_target") return "Within target";
	if (state === "at_risk") return "At risk";
	return "Collecting evidence";
}
function elapsed(value, referenceMs) {
	const minutes = Math.max(0, Math.floor((referenceMs - Date.parse(value)) / 6e4));
	if (minutes < 60) return `${minutes}m`;
	const hours = Math.floor(minutes / 60);
	return hours < 24 ? `${hours}h ${minutes % 60}m` : `${Math.floor(hours / 24)}d ${hours % 24}h`;
}
function CustomerServiceMonitoring() {
	const [payload, setPayload] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)("");
	const [tab, setTab] = (0, import_react.useState)("Customers");
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("All statuses");
	const [selectedServiceId, setSelectedServiceId] = (0, import_react.useState)(null);
	const [drawerTab, setDrawerTab] = (0, import_react.useState)("Overview");
	const [notice, setNotice] = (0, import_react.useState)("");
	const [onboardingOpen, setOnboardingOpen] = (0, import_react.useState)(false);
	const load = async () => {
		try {
			const response = await fetch("/api/platform/customer-services", { cache: "no-store" });
			if (!response.ok) throw new Error("Live service data is unavailable");
			setPayload(await response.json());
			setLoadError("");
		} catch (error) {
			setLoadError(error instanceof Error ? error.message : "Live service data is unavailable");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		let active = true;
		const refresh = async () => {
			if (!active) return;
			await load();
		};
		refresh();
		const timer = window.setInterval(() => void refresh(), 15e3);
		return () => {
			active = false;
			window.clearInterval(timer);
		};
	}, []);
	const services = (0, import_react.useMemo)(() => payload?.services ?? [], [payload]);
	const selected = (0, import_react.useMemo)(() => services.find((service) => service.serviceCode === selectedServiceId || service.serviceId === selectedServiceId) ?? null, [services, selectedServiceId]);
	const checkedAtMs = payload ? Date.parse(payload.checkedAt) : 0;
	const filtered = (0, import_react.useMemo)(() => services.filter((service) => `${service.name} ${service.id} ${service.serviceCode} ${service.site} ${service.endpointIp ?? ""}`.toLowerCase().includes(query.toLowerCase()) && (status === "All statuses" || service.status === status)), [
		services,
		query,
		status
	]);
	const representative = services[0] ?? null;
	const summary = payload?.summary ?? {
		activeServices: 0,
		operational: 0,
		degraded: 0,
		offline: 0,
		unknown: 0,
		impactedCustomers: 0
	};
	const notify = (message) => {
		setNotice(message);
		window.setTimeout(() => setNotice(""), 3e3);
	};
	const openService = (service) => {
		setSelectedServiceId(service.serviceCode);
		setDrawerTab("Overview");
	};
	(0, import_react.useEffect)(() => {
		const syncService = () => {
			const queryString = window.location.hash.split("?")[1] ?? "";
			setSelectedServiceId(new URLSearchParams(queryString).get("service"));
			setDrawerTab("Overview");
		};
		queueMicrotask(syncService);
		window.addEventListener("hashchange", syncService);
		return () => window.removeEventListener("hashchange", syncService);
	}, []);
	const exportImpactReport = () => {
		if (!payload) return;
		const csv = [[
			"Customer",
			"Service",
			"Status",
			"Incident",
			"Observed at"
		], ...payload.services.map((service) => [
			service.name,
			service.serviceCode,
			service.status,
			service.activeIncident?.id ?? "None",
			service.lastObservedAt ?? ""
		])].map((row) => row.map(csvCell).join(",")).join("\n");
		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = `nocx-customer-impact-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
		link.click();
		URL.revokeObjectURL(url);
		notify("Customer impact report exported.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "customers-page",
		children: [
			payload?.truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: "Evidence limits reached. Service coverage and target compliance are incomplete."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "workflow-note",
				children: "Availability coverage measures mapped device reachability. Interface history and contractual service SLA compliance are not verified."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "customers-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "CUSTOMER SERVICE HEALTH"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Customer & service monitoring" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Correlate stored MikroTik observations only with customer, service and dependency records submitted by an authenticated operator." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `customer-live-state ${loadError ? "is-error" : "is-live"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), loadError ? loadError : payload ? `Authenticated data · checked ${formatTime(payload.checkedAt)}` : "Loading authenticated service data"]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "customers-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							onClick: () => setOnboardingOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 15 }), "Assign service"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => {
								setLoading(true);
								load();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								size: 15,
								className: loading ? "spin" : ""
							}), "Refresh"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							onClick: exportImpactReport,
							disabled: !payload,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), "Impact report"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "customer-source-note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Evidence boundary:" }), " telemetry never creates a placeholder customer, service, SLA or approved dependency. Legacy placeholder quarantine remains enforced. Current device and interface values require valid evidence no older than three minutes; incomplete, stale, future or invalid evidence is Unknown."] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "customer-summary nocx-summary-grid",
				"aria-label": "Customer service summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setStatus("All statuses"),
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active services" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary.activeServices }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Persistent service mappings" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setStatus("Operational"),
						tone: "green",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Operational" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary.operational }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Fresh dependency evidence" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setStatus("Degraded"),
						tone: "amber",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Degraded" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary.degraded }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Incident or quality impact" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setStatus("Offline"),
						tone: "red",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Offline" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary.offline }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Fresh explicit down evidence" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setStatus("Unknown"),
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unknown" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary.unknown }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Stale or incomplete evidence" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						onClick: () => setTab("SLA"),
						tone: "violet",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 18 }),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Impacted customers" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: summary.impactedCustomers }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "From active incidents" }) })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "customer-grid-top",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel experience-trend-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "panel-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "STORED SERVICE OBSERVATIONS"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Latest mapped evidence" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `experience-current experience-${representative ? statusClass(representative.status) : "unknown"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
										"State ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: representative?.status ?? "Unmapped" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "experience-trend-stats",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observed availability" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: representative?.observedAvailabilityPct === null || representative?.observedAvailabilityPct === void 0 ? "—" : `${representative.observedAvailabilityPct}%` })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Latency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: representative?.latencyMs === null || representative?.latencyMs === void 0 ? "—" : `${representative.latencyMs} ms` })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Packet loss" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: representative?.packetLossPct === null || representative?.packetLossPct === void 0 ? "—" : `${representative.packetLossPct}%` })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Router uptime" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: representative?.sessionUptime ?? "—" })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "live-service-path",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 16 }), "Approved dependency"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 16 }), payload?.scope.deviceHostname ?? "No device evidence"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 16 }), representative?.serviceCode ?? "No service mapping"] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "customer-safe-note",
								children: "Rolling availability uses stored 30-second evidence buckets. Unknown gaps are shown as missing coverage and are never counted as uptime."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel customer-impact-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "panel-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "ACTIVE NETWORK IMPACT"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Customers by root incident" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-button",
									onClick: () => setStatus("All statuses"),
									children: "View all"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "customer-impact-list",
								children: [payload?.incidentImpact.map((incident) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setStatus("Degraded"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: incident.severity === "critical" ? "impact-rank impact-rank-critical" : "impact-rank impact-rank-warning",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { size: 15 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incident.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											incident.id,
											" · open ",
											elapsed(incident.openedAt, checkedAtMs)
										] })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: incident.affectedCustomers }), "customers"] })
									]
								}, incident.id)), payload && payload.incidentImpact.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "customer-impact-empty",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 24 }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No mapped customer impact" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Only incidents linked through approved persistent dependencies appear." })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "impact-total",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 17 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [summary.impactedCustomers, " customers currently impacted"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "From approved service dependencies" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: exportImpactReport,
										disabled: !payload,
										children: "Export"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel service-distribution",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "panel-heading",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "panel-kicker",
									children: "MONITORING SCOPE"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Registered device evidence" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "service-status service-operational",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), "Read only"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pilot-scope-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 25 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Source scope" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: payload?.scope.deviceHostname ?? "No registered record" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										payload?.scope.deviceModel ?? "Model unavailable",
										" · ",
										payload?.scope.customerAssignment ?? "unassigned"
									] })
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "distribution-legend",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setStatus("Operational"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dist-green" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Operational", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: summary.operational })] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setStatus("Degraded"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dist-amber" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Degraded", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: summary.degraded })] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setStatus("Offline"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dist-red" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Offline", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: summary.offline })] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setStatus("Unknown"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "dist-gray" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Unknown", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: summary.unknown })] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "session-footer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [payload?.scope.refreshSeconds ?? 15, "-second dashboard refresh"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Persistent samples only" })] })]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "customer-workspace panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "customer-tabs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: tab === "Customers" ? "customer-tab-active" : "",
								onClick: () => setTab("Customers"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 14 }), "Customers"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: tab === "Services" ? "customer-tab-active" : "",
								onClick: () => setTab("Services"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 14 }), "Services"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: tab === "SLA" ? "customer-tab-active" : "",
								onClick: () => setTab("SLA"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), "SLA"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "customer-toolbar",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "customer-search",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: query,
									onChange: (event) => setQuery(event.target.value),
									placeholder: "Search customer, service ID, IP or site...",
									"aria-label": "Search customers and services"
								}),
								query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQuery(""),
									"aria-label": "Clear customer search",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "customer-select",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: status,
								onChange: (event) => setStatus(event.target.value),
								"aria-label": "Filter customer status",
								children: [
									"All statuses",
									"Operational",
									"Degraded",
									"Offline",
									"Unknown"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })]
						})]
					}),
					loading && !payload && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "customer-loading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Loading live customer service data…" })]
					}),
					!loading && loadError && !payload && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "customer-loading customer-load-error",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 22 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: loadError }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								onClick: () => void load(),
								children: "Try again"
							})
						]
					}),
					tab === "Customers" && payload && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "customer-table-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "customer-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Location" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Service plan" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Current traffic" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Latency" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Packet loss" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Last evidence" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Active incident" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => openService(service),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "customer-identity",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 15 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [service.accountNumber, " · persistent record"] })] })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "customer-location",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 12 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.site }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: service.region })] })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "plan-cell",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.plan }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: service.access })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `service-status service-${statusClass(service.status)}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), service.status]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: service.statusReason })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "traffic-cell",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["↓ ", formatRate(service.downBps)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["↑ ", formatRate(service.upBps)] })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: service.latencyMs === null ? "—" : `${service.latencyMs} ms` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: service.packetLossPct !== null && service.packetLossPct >= 2 ? "metric-danger" : "",
										children: service.packetLossPct === null ? "—" : `${service.packetLossPct}%`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatTime(service.lastObservedAt) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: service.activeIncident ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "customer-incident",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 12 }), service.activeIncident.id]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "muted-value",
										children: "None"
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "row-action",
										"aria-label": `Open ${service.name}`,
										onClick: (event) => {
											event.stopPropagation();
											openService(service);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
									}) })
								]
							}, service.serviceId)) })]
						}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-devices",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 24 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: services.length ? "No services match these filters" : "No approved customer-service mapping" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: services.length ? "Adjust the status or search query." : payload.controls.legacyPlaceholderRecordsExcluded ? "A legacy placeholder remains quarantined. Submit a real customer assignment to replace it." : "Submit a real customer assignment to create the first persistent mapping." })
							]
						})]
					}),
					tab === "Services" && payload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "customer-table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "customer-table service-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Service ID" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customer" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Access" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "CPE / endpoint" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "IP address" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Router uptime" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Approved dependencies" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "SLA target" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => openService(service),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: service.serviceCode }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "customer-identity compact",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 14 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: service.plan })] })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: service.access }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "cpe-cell",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 13 }), service.cpe ?? "—"]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: service.endpointIp ?? "—" }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "customer-clock",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }), service.sessionUptime]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "path-cell",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { size: 12 }), service.dependencies.map((item) => item.interfaceName).join(" → ")]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `service-status service-${statusClass(service.status)}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), service.status]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: service.statusReason })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [service.slaTargetPct, "%"] }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "row-action",
										"aria-label": `Open service ${service.serviceCode}`,
										onClick: (event) => {
											event.stopPropagation();
											openService(service);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
									}) })
								]
							}, service.serviceCode)) })]
						})
					}),
					tab === "SLA" && payload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "customer-table-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "customer-table sla-table",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customer / service" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Target" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "24h availability" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Evidence coverage" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Measured downtime" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Allowed downtime" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Error budget" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Current incident" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Assessment" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
							] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								onClick: () => openService(service),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "customer-identity compact",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: service.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: service.serviceCode })] })]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [service.slaTargetPct, "%"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: service.rollingSla.state === "at_risk" ? "metric-danger" : "",
										children: service.rollingSla.availabilityPct === null ? "—" : `${service.rollingSla.availabilityPct}%`
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "sla-coverage",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [service.rollingSla.coveragePct, "%"] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { style: { width: `${Math.min(100, service.rollingSla.coveragePct)}%` } }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [formatDuration(service.rollingSla.unknownSeconds), " unknown"] })
										]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDuration(service.rollingSla.downtimeSeconds) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDuration(service.rollingSla.allowedDowntimeSeconds) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: service.rollingSla.remainingErrorBudgetSeconds < 0 ? "metric-danger" : "",
										children: errorBudget(service.rollingSla.remainingErrorBudgetSeconds)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: service.activeIncident?.id ?? "None" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `sla-assessment sla-assessment-${service.rollingSla.state.replaceAll("_", "-")}`,
										children: slaLabel(service.rollingSla.state)
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "row-action",
										"aria-label": `Open SLA ${service.name}`,
										onClick: (event) => {
											event.stopPropagation();
											openService(service);
											setDrawerTab("SLA");
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
									}) })
								]
							}, service.serviceCode)) })]
						})
					}),
					payload && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "customer-footer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Persistent mapped evidence · ",
							filtered.length,
							" service record · ",
							payload.controls.legacyPlaceholderRecordsExcluded,
							" legacy placeholder quarantined · network writes disabled"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: true,
								children: "Previous"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "page-current",
								children: "1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: true,
								children: "Next"
							})
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchivedServices, {}, payload?.checkedAt ? String(services.length) : "initial"),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "toast",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 18 }), notice]
			}),
			onboardingOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					"aria-label": "Close service assignment",
					onClick: () => setOnboardingOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "customer-drawer onboarding-drawer",
					"aria-label": "Assign customer service",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "drawer-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "panel-kicker",
								children: "CONTROLLED SERVICE ONBOARDING"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Assign a real customer service" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Register the customer, package, SLA and monitored dependency path from operator-provided facts." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "icon-button",
							onClick: () => setOnboardingOpen(false),
							"aria-label": "Close service assignment",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceMappingForm, {
						onCancel: () => setOnboardingOpen(false),
						onSaved: () => {
							setOnboardingOpen(false);
							notify("Service mapping created.");
							load();
						}
					})]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					"aria-label": "Close customer details",
					onClick: () => setSelectedServiceId(null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "customer-drawer",
					"aria-label": `${selected.name} service details`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "panel-kicker",
									children: [selected.accountNumber, " · PERSISTENT RECORD"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [selected.site, " · stored service mapping"] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setSelectedServiceId(null),
								"aria-label": "Close customer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceLifecycle, {
							serviceId: selected.serviceId,
							onSaved: () => {
								notify("Service change saved.");
								setSelectedServiceId(null);
								load();
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "customer-drawer-status",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `service-status service-${statusClass(selected.status)}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), selected.status]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.statusReason }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 12 }), selected.serviceCode] }),
								selected.activeIncident && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "correlated-badge",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 12 }), selected.activeIncident.id]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "customer-drawer-tabs",
							children: [
								"Overview",
								"Dependencies",
								"SLA",
								"Incidents"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: drawerTab === item ? "drawer-tab-active" : "",
								onClick: () => setDrawerTab(item),
								children: item
							}, item))
						}),
						drawerTab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "customer-health-hero",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "customer-health-ring",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 24 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Latest evidence state" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.status }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										selected.plan,
										" · ",
										selected.access,
										" · no synthetic health score"
									] })
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "drawer-metric-grid nocx-summary-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
										tone: "blue",
										icon: void 0,
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Download" }),
										value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatRate(selected.downBps) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
										tone: "blue",
										icon: void 0,
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Upload" }),
										value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: formatRate(selected.upBps) })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
										tone: "blue",
										icon: void 0,
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Latency" }),
										value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selected.latencyMs === null ? "—" : `${selected.latencyMs} ms` })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
										tone: "blue",
										icon: void 0,
										label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Packet loss" }),
										value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selected.packetLossPct === null ? "—" : `${selected.packetLossPct}%` }),
										valueClassName: selected.packetLossPct !== null && selected.packetLossPct >= 2 ? "metric-danger" : ""
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "device-detail-section",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Service information" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Service ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.serviceCode })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Endpoint IP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: selected.endpointIp ?? "—" }) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "CPE device" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.cpe ?? "—" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Last observed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatTime(selected.lastObservedAt) })] })
								] })]
							})
						] }),
						drawerTab === "Dependencies" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "customer-incidents",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Approved service dependency path" }), selected.dependencies.map((dependency) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: dependency.operStatus === 2 ? "impact-rank impact-rank-critical" : "impact-rank impact-rank-warning",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 15 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									dependency.deviceName,
									" · ",
									dependency.interfaceName
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [dependency.role, " dependency · approved"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Interface state: ",
									dependency.operStatus === 1 ? "up" : dependency.operStatus === 2 ? "down" : "waiting for sample",
									"."
								] })
							] })] }, `${dependency.deviceId}-${dependency.interfaceName}`))]
						}),
						drawerTab === "SLA" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "customer-sla-hero",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 22 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Rolling 24-hour availability" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.rollingSla.availabilityPct === null ? "—" : `${selected.rollingSla.availabilityPct}%` }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"Target: ",
											selected.slaTargetPct,
											"% · verified coverage: ",
											selected.rollingSla.coveragePct,
											"%"
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `sla-assessment sla-assessment-${selected.rollingSla.state.replaceAll("_", "-")}`,
										children: slaLabel(selected.rollingSla.state)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "sla-evidence-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Measured downtime" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatDuration(selected.rollingSla.downtimeSeconds) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Allowed downtime" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatDuration(selected.rollingSla.allowedDowntimeSeconds) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Error budget" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: selected.rollingSla.remainingErrorBudgetSeconds < 0 ? "metric-danger" : "",
										children: errorBudget(selected.rollingSla.remainingErrorBudgetSeconds)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Evidence buckets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.rollingSla.evidenceSamples })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Verified window" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatDuration(selected.rollingSla.coveredSeconds) })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Unknown time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatDuration(selected.rollingSla.unknownSeconds) })] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "customer-safe-note",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.rollingSla.stateReason }),
									" Unknown gaps are excluded from verified uptime; the assessment remains “Collecting evidence” until coverage reaches ",
									selected.rollingSla.requiredCoveragePct,
									"%."
								]
							})
						] }),
						drawerTab === "Incidents" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "customer-incidents",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Correlated service incidents" }), selected.activeIncident ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "impact-rank impact-rank-critical",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.activeIncident.id }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									selected.activeIncident.status,
									" · ",
									selected.activeIncident.impactType
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									selected.activeIncident.title,
									" has affected this service for ",
									elapsed(selected.activeIncident.openedAt, checkedAtMs),
									"."
								] })
							] })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "no-incidents",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 24 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No active mapped incidents" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confirmed interface incidents will appear automatically." })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary-button",
								onClick: () => {
									load();
									notify("Live service evidence refreshed.");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { size: 14 }), "Refresh evidence"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								onClick: exportImpactReport,
								children: "Export record"
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
//#region app/customer-directory.tsx
function CustomerDirectory() {
	const access = useOperatorAccess(), [customers, setCustomers] = (0, import_react.useState)([]), [selected, setSelected] = (0, import_react.useState)(""), [query, setQuery] = (0, import_react.useState)(""), [view, setView] = (0, import_react.useState)("directory"), [loading, setLoading] = (0, import_react.useState)(true), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)(""), [creating, setCreating] = (0, import_react.useState)(false), [busy, setBusy] = (0, import_react.useState)(false), [form, setForm] = (0, import_react.useState)({
		name: "",
		accountNumber: ""
	}), [truncated, setTruncated] = (0, import_react.useState)(false);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		try {
			const r = await fetch("/api/platform/customer-directory", { cache: "no-store" }), body = await r.json();
			if (!r.ok) throw new Error(body.error);
			setCustomers(body.customers);
			setTruncated(body.truncated);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Customers could not be loaded");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			const p = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
			setSelected(p.get("customer") ?? "");
			setView(p.has("service") ? "services" : "directory");
		};
		queueMicrotask(() => {
			sync();
			load();
		});
		window.addEventListener("hashchange", sync);
		return () => window.removeEventListener("hashchange", sync);
	}, [load]);
	async function create(e) {
		e.preventDefault();
		setBusy(true);
		setError("");
		try {
			const r = await fetch("/api/platform/customer-directory", {
				method: "POST",
				headers: access.headers,
				body: JSON.stringify(form)
			}), body = await r.json();
			if (!r.ok) throw new Error(body.error);
			setCreating(false);
			setForm({
				name: "",
				accountNumber: ""
			});
			await load();
			setSelected(body.id);
			setNotice("Customer created. You can now add their first site.");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Customer could not be created");
		} finally {
			setBusy(false);
		}
	}
	const current = customers.find((c) => c.id === selected), filtered = customers.filter((c) => `${c.name} ${c.accountNumber}`.toLowerCase().includes(query.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "workflow-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "workflow-heading",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "CUSTOMERS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Customers & service health" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create a customer, add locations, then map monitored services." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "primary-button",
					disabled: !access.canWrite,
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), "Add customer"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorAccess, { access }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "workflow-tabs",
				"aria-label": "Customer workspace",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-pressed": view === "directory",
					onClick: () => setView("directory"),
					children: "Customer directory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-pressed": view === "services",
					onClick: () => setView("services"),
					children: "Service health"
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "workflow-error",
				role: "alert",
				children: [error, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => void load(),
					children: "Retry"
				})]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "workflow-success",
				children: notice
			}),
			view === "services" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerServiceMonitoring, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "workflow-search",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Search customers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: query,
							onChange: (e) => setQuery(e.target.value),
							placeholder: "Search name or account number"
						})
					]
				}),
				loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					children: "Loading customers…"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "customer-directory-grid",
					children: filtered.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `customer-directory-card ${selected === c.id ? "selected" : ""}`,
						onClick: () => setSelected(c.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 20 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: c.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								c.accountNumber,
								" · ",
								c.sites.length,
								" sites"
							] })
						]
					}, c.id))
				}),
				!loading && !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "workflow-empty",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 24 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: query ? "No customers match" : "No customers yet" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query ? "Try a name or account number." : "Create your first customer, then add a location and its devices." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary-button",
							disabled: !access.canWrite,
							onClick: () => setCreating(true),
							children: "Add customer"
						})
					]
				}),
				truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "workflow-note",
					children: "Showing the first 1,000 customers. Narrow your search using the global record search."
				}),
				current && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "workflow-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: current.accountNumber }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: current.name })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "primary-button",
							href: `#/sites?customer=${encodeURIComponent(current.id)}&new=1`,
							children: "Add site"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Locations and support contacts" }),
						current.sites.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							className: "entity-link",
							href: `#/sites?site=${encodeURIComponent(site.id)}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: site.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [site.region ?? "Region not added", site.contactPhone ? ` · ${site.contactName ?? "Site contact"}: ${site.contactPhone}` : ""] })] })]
						}, site.id)),
						!current.sites.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No sites have been added. Add the first location to start placing devices." })
					]
				})
			] }),
			creating && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					"aria-label": "Cancel new customer",
					onClick: () => setCreating(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "device-drawer",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "new-customer-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "drawer-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "new-customer-title",
							children: "Add customer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "icon-button",
							"aria-label": "Close new customer",
							onClick: () => setCreating(false),
							children: "×"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "workflow-form",
						onSubmit: create,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Customer name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								minLength: 2,
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Account number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								minLength: 3,
								value: form.accountNumber,
								onChange: (e) => setForm({
									...form,
									accountNumber: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Site, package and monitoring can be added afterward." }),
							error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "alert",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "workflow-actions",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									type: "button",
									onClick: () => setCreating(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "primary-button",
									disabled: busy || !access.canWrite,
									children: busy ? "Creating…" : "Create customer"
								})]
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { CustomerDirectory as default };
