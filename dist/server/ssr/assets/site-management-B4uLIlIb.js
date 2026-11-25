import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, r as Activity } from "./network-CaMqMjRB.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Server } from "./server-DGu4Aqms.js";
import { t as Users } from "./users-BADfTVSw.js";
import { n as BellRing, t as CircleAlert } from "./circle-alert-fwvsmlmG.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
import { t as CalendarClock } from "./calendar-clock-D1QLh4hH.js";
import { n as useOperatorAccess, t as OperatorAccess } from "./operator-access-CJCL0tBn.js";
import { t as Building2 } from "./building-2-BaJtSa-T.js";
import { t as MapPin } from "./map-pin-BYYZwnIv.js";
import { t as Archive } from "./archive-BV5F5FNi.js";
import { i as useLiveOperations, t as formatAge } from "./live-operations-ClF_13he.js";
import "./page-CY3TPLj0.js";
import { t as Trash2 } from "./trash-2-Z3MGkqFx.js";
import { t as CircleX } from "./circle-x-Hek0YvdJ.js";
//#region node_modules/lucide-react/dist/esm/icons/save.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Save = createLucideIcon("Save", [
	["path", {
		d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
		key: "1c8476"
	}],
	["path", {
		d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
		key: "1ydtos"
	}],
	["path", {
		d: "M7 3v4a1 1 0 0 0 1 1h7",
		key: "t51u73"
	}]
]);
//#endregion
//#region app/site-management.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/site-management.tsx
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	name: "",
	customerId: "",
	region: "",
	address: "",
	contactName: "",
	contactPhone: "",
	timezone: "Africa/Dar_es_Salaam"
};
function SiteManagement() {
	const access = useOperatorAccess();
	const [snapshotReady, setSnapshotReady] = (0, import_react.useState)(false), [loadingSites, setLoadingSites] = (0, import_react.useState)(true);
	const requestSequence = (0, import_react.useRef)(0);
	const { data: operations, error: operationsError, loading: operationsLoading, refresh: refreshOperations } = useLiveOperations(15);
	const [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [query, setQuery] = (0, import_react.useState)(""), [selectedSiteId, setSelectedSiteId] = (0, import_react.useState)(null), [selectedDevices, setSelectedDevices] = (0, import_react.useState)([]), [form, setForm] = (0, import_react.useState)(emptyForm), [editing, setEditing] = (0, import_react.useState)(false);
	const [contactForm, setContactForm] = (0, import_react.useState)({
		name: "",
		role: "Site owner",
		email: "",
		phone: "",
		priority: 1
	}), [ruleForm, setRuleForm] = (0, import_react.useState)({
		contactId: "",
		condition: "device_offline",
		severity: "critical",
		delayMinutes: 0,
		step: 1
	});
	const [success, setSuccess] = (0, import_react.useState)("");
	const [maintenanceForm, setMaintenanceForm] = (0, import_react.useState)({
		title: "",
		reason: "",
		owner: "",
		startsAt: "",
		endsAt: ""
	});
	const load = (0, import_react.useCallback)(async () => {
		const sequence = ++requestSequence.current;
		setSnapshotReady(false);
		setLoadingSites(true);
		setError("");
		try {
			const response = await fetch("/api/platform/sites", { cache: "no-store" }), payload = await response.json();
			if (!response.ok) throw new Error(payload.error || "Sites are unavailable");
			if (!Array.isArray(payload.sites) || !Array.isArray(payload.unassignedDevices) || !Array.isArray(payload.customers) || !Array.isArray(payload.audit) || !Number.isFinite(Date.parse(payload.checkedAt)) || !payload.sites.every((site) => site && typeof site.id === "string" && typeof site.name === "string" && Array.isArray(site.devices) && Array.isArray(site.alertContacts) && Array.isArray(site.escalationRules) && Array.isArray(site.maintenanceWindows))) throw new Error("Site data is incomplete. Refresh before making changes.");
			if (sequence !== requestSequence.current) return false;
			setData(payload);
			setSnapshotReady(true);
			setSelectedDevices([]);
			setSelectedSiteId((current) => current && payload.sites.some((site) => site.id === current && site.status === "active") ? current : payload.sites.find((site) => site.id === new URLSearchParams(window.location.hash.split("?")[1] ?? "").get("site") && site.status === "active")?.id ?? payload.sites.find((site) => site.status === "active")?.id ?? null);
			return true;
		} catch (value) {
			if (sequence === requestSequence.current) setError(value instanceof Error ? value.message : "Sites are unavailable");
			return false;
		} finally {
			if (sequence === requestSequence.current) setLoadingSites(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let active = true;
		queueMicrotask(() => {
			if (active) load();
		});
		return () => {
			active = false;
			requestSequence.current++;
		};
	}, [load]);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			const p = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
			if (p.get("site")) setSelectedSiteId(p.get("site"));
			if (p.get("new")) {
				setEditing(false);
				setForm({
					...emptyForm,
					customerId: p.get("customer") ?? ""
				});
			}
		};
		queueMicrotask(sync);
		window.addEventListener("hashchange", sync);
		return () => window.removeEventListener("hashchange", sync);
	}, []);
	const selected = data?.sites.find((site) => site.id === selectedSiteId) ?? null;
	const liveById = new Map((operations?.devices ?? []).map((device) => [device.id, device]));
	const customerById = new Map((data?.customers ?? []).map((customer) => [customer.id, customer]));
	const activeSites = data?.sites.filter((site) => site.status === "active") ?? [];
	const filtered = activeSites.filter((site) => `${site.name} ${site.region ?? ""} ${customerById.get(site.customerId ?? "")?.name ?? ""}`.toLowerCase().includes(query.toLowerCase()));
	const assignmentPool = (0, import_react.useMemo)(() => [...data?.unassignedDevices ?? [], ...data?.sites.flatMap((site) => site.devices) ?? []].filter((device, index, rows) => rows.findIndex((row) => row.id === device.id) === index), [data?.unassignedDevices, data?.sites]);
	const selectedLive = (selected?.devices ?? []).map((device) => liveById.get(device.id)).filter((device) => Boolean(device));
	const selectedCounts = {
		online: selectedLive.filter((device) => device.status === "online").length,
		degraded: selectedLive.filter((device) => device.status === "degraded").length,
		offline: selectedLive.filter((device) => device.status === "offline").length,
		unknown: (selected?.devices.length ?? 0) - selectedLive.filter((device) => device.status !== "unknown").length
	};
	const snapshotNow = Date.parse(operations?.checkedAt ?? data?.checkedAt ?? "");
	async function act(action, payload) {
		if (busy) return false;
		if (!snapshotReady) {
			setError("Refresh site data before making changes.");
			return false;
		}
		if (!access.canWrite) {
			setError("Operator permission or a valid temporary key is required to make changes.");
			return false;
		}
		setBusy(true);
		setError("");
		setSuccess("");
		try {
			const response = await fetch("/api/platform/sites", {
				method: "POST",
				headers: access.headers,
				body: JSON.stringify({
					action,
					...payload
				})
			}), result = await response.json();
			if (!response.ok) throw new Error(result.error || "Site change failed");
			const refreshed = await load();
			if ("id" in result && action === "create_site") setSelectedSiteId(String(result.id));
			setSuccess(action === "create_site" ? "Site created. Select devices below to assign them." : action === "assign_devices" ? "Device placement saved." : "Changes saved.");
			if (!refreshed) setError("The change was saved, but refreshed site data is unavailable. Refresh before making another change.");
			setSelectedDevices([]);
			return true;
		} catch (value) {
			setError(value instanceof Error ? value.message : "Site change failed");
			return false;
		} finally {
			setBusy(false);
		}
	}
	async function saveSite() {
		if (await act(editing ? "update_site" : "create_site", {
			...form,
			siteId: selected?.id
		})) {
			setForm(emptyForm);
			setEditing(false);
		}
	}
	function beginEdit(site) {
		setSelectedSiteId(site.id);
		setEditing(true);
		setForm({
			name: site.name,
			customerId: site.customerId ?? "",
			region: site.region ?? "",
			address: site.address ?? "",
			contactName: site.contactName ?? "",
			contactPhone: site.contactPhone ?? "",
			timezone: site.timezone
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "sites-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sites-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "SITE REGISTRY · LIVE OPERATIONAL ROLLUP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sites & device placement" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "module-context",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create operational sites, associate customers, and review the current evidence-backed health of every assigned Cudy or MikroTik device." })]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					disabled: busy || loadingSites,
					onClick: () => {
						setSuccess("");
						load();
						refreshOperations();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 16 }), loadingSites ? "Refreshing…" : "Refresh"]
				})]
			}),
			loadingSites && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: "Loading current sites and assignments…"
			}),
			!loadingSites && !snapshotReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: "Site changes are disabled until current data loads. Use Refresh to retry."
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sites-message error",
				role: "alert",
				children: error
			}),
			success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "workflow-success",
				role: "status",
				children: success
			}),
			operationsError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sites-message error",
				children: ["Live site health is unavailable: ", operationsError]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "site-stats nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Active sites" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? activeSites.length : "—" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Assigned devices" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data ? activeSites.reduce((sum, site) => sum + site.devices.length, 0) : "—" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unassigned queue" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.unassignedDevices.length ?? "—" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Customers" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: data?.customers.length ?? "—" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "operator-strip",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorAccess, { access }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 15 }), "Your role controls site changes"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sites-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "sites-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "SITE DIRECTORY"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Operational sites" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							onClick: () => {
								setEditing(false);
								setForm(emptyForm);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), "New site"]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "site-search",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								"aria-label": "Search sites",
								placeholder: "Search site, region or customer"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "site-list",
							children: [filtered.map((site) => {
								const live = site.devices.map((device) => liveById.get(device.id)).filter((device) => Boolean(device)), attention = live.filter((device) => device.status === "degraded" || device.status === "offline").length;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: selectedSiteId === site.id ? "selected" : "",
									onClick: () => {
										setSelectedSiteId(site.id);
										setSelectedDevices([]);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: site.name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											customerById.get(site.customerId ?? "")?.name ?? "No customer linked",
											" · ",
											site.region || "Region unassigned"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: operationsLoading ? "Checking health…" : attention ? `${attention} need attention` : !operations || operationsError ? "Health unavailable" : `${live.filter((device) => device.status === "online").length} online · ${site.devices.length - live.filter((device) => device.status !== "unknown").length} unknown` })
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: site.devices.length })]
								}, site.id);
							}), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No active sites match this search." })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "sites-panel site-editor",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: editing ? "EDIT SITE" : "NEW SITE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: editing && selected ? selected.name : "Site details" })] }), selected && !editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							onClick: () => beginEdit(selected),
							children: "Edit"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "site-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Site name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.name,
									onChange: (event) => setForm({
										...form,
										name: event.target.value
									}),
									placeholder: "e.g. Arusha Branch"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Customer", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: form.customerId,
									onChange: (event) => setForm({
										...form,
										customerId: event.target.value
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "No customer linked"
									}), data?.customers.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: customer.id,
										children: customer.name
									}, customer.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Region", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.region,
									onChange: (event) => setForm({
										...form,
										region: event.target.value
									}),
									placeholder: "Region or district"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Timezone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.timezone,
									onChange: (event) => setForm({
										...form,
										timezone: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "wide",
									children: ["Address", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: form.address,
										onChange: (event) => setForm({
											...form,
											address: event.target.value
										}),
										placeholder: "Physical or service address"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Contact name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.contactName,
									onChange: (event) => setForm({
										...form,
										contactName: event.target.value
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Contact phone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.contactPhone,
									onChange: (event) => setForm({
										...form,
										contactPhone: event.target.value
									})
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "site-editor-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "primary-button",
									disabled: busy || !form.name || !access.canWrite || !snapshotReady,
									onClick: () => void saveSite(),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 15 }), busy ? "Saving…" : editing ? "Save changes" : "Create site"]
								}),
								editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "secondary-button",
									onClick: () => {
										setEditing(false);
										setForm(emptyForm);
									},
									children: "Cancel"
								}),
								selected && !editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "danger-button",
									disabled: busy || !access.canWrite || !snapshotReady || selected.devices.length > 0,
									onClick: () => {
										if (window.confirm(`Archive ${selected.name}? You can no longer assign devices to this site.`)) act("archive_site", { siteId: selected.id });
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { size: 15 }), "Archive"]
								})
							]
						})
					]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sites-panel site-health-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "LIVE SITE HEALTH"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Current status uses fresh availability, incident, packet-loss, CPU, and interface-error evidence. Unused down ports are informational only." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "secondary-button",
						href: `#/devices?site=${encodeURIComponent(selected.name)}`,
						children: ["Open site devices", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "site-health-summary nocx-summary-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								className: "online",
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Online" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selectedCounts.online })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								className: "warning",
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Warning" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selectedCounts.degraded })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								className: "offline",
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Offline" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selectedCounts.offline })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								className: "unknown",
								tone: "blue",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, {}),
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Unknown" }),
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: selectedCounts.unknown })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "site-device-health",
						children: [selectedLive.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `#/devices?device=${encodeURIComponent(device.id)}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `site-health-dot ${device.status}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									device.healthReasons[0] ?? "No warning threshold crossed",
									" · last seen ",
									formatAge(device.lastSeenAt)
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: device.status === "degraded" ? "Warning" : device.status }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })
							]
						}, device.id)), !selectedLive.length && !operationsLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No current monitoring evidence is linked to devices at this site." })]
					})
				]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sites-panel site-escalation-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "SITE ALERT OWNERSHIP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Contacts & escalation rules" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Rules record who should respond and when. External email, SMS, and messaging delivery remains disabled." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "delivery-disabled",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { size: 15 }), "Delivery disabled"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "escalation-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Alert contacts" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "compact-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: contactForm.name,
									onChange: (event) => setContactForm({
										...contactForm,
										name: event.target.value
									}),
									placeholder: "Contact name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: contactForm.role,
									onChange: (event) => setContactForm({
										...contactForm,
										role: event.target.value
									}),
									placeholder: "Role"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "email",
									value: contactForm.email,
									onChange: (event) => setContactForm({
										...contactForm,
										email: event.target.value
									}),
									placeholder: "Email (optional)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: contactForm.phone,
									onChange: (event) => setContactForm({
										...contactForm,
										phone: event.target.value
									}),
									placeholder: "Phone (optional)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Priority", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "1",
									max: "20",
									value: contactForm.priority,
									onChange: (event) => setContactForm({
										...contactForm,
										priority: Number(event.target.value)
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "primary-button",
									disabled: busy || !access.canWrite || !snapshotReady || !contactForm.name || !contactForm.email && !contactForm.phone,
									onClick: () => void act("add_alert_contact", {
										siteId: selected.id,
										...contactForm
									}).then((ok) => {
										if (ok) setContactForm({
											name: "",
											role: "Site owner",
											email: "",
											phone: "",
											priority: 1
										});
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "Add contact"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "contact-list",
							children: [selected.alertContacts.map((contact) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: contact.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									contact.role || "Site contact",
									" · ",
									contact.email || contact.phone
								] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["Priority ", contact.priority] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": `Remove ${contact.name}`,
									disabled: busy || !access.canWrite || !snapshotReady,
									onClick: () => void act("remove_alert_contact", {
										siteId: selected.id,
										contactId: contact.id
									}),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
								})
							] }, contact.id)), !selected.alertContacts.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No alert contacts configured." })]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Escalation order" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "compact-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Contact", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: ruleForm.contactId,
									onChange: (event) => setRuleForm({
										...ruleForm,
										contactId: event.target.value
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select contact"
									}), selected.alertContacts.map((contact) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: contact.id,
										children: contact.name
									}, contact.id))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Condition", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: ruleForm.condition,
									onChange: (event) => setRuleForm({
										...ruleForm,
										condition: event.target.value
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "device_offline",
											children: "Device offline"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "device_warning",
											children: "Device warning"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "evidence_stale",
											children: "Evidence stale"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Severity", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: ruleForm.severity,
									onChange: (event) => setRuleForm({
										...ruleForm,
										severity: event.target.value
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "critical",
											children: "Critical"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "high",
											children: "High"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "medium",
											children: "Medium"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Delay (minutes)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "0",
									max: "1440",
									value: ruleForm.delayMinutes,
									onChange: (event) => setRuleForm({
										...ruleForm,
										delayMinutes: Number(event.target.value)
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Step", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "1",
									max: "20",
									value: ruleForm.step,
									onChange: (event) => setRuleForm({
										...ruleForm,
										step: Number(event.target.value)
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "primary-button",
									disabled: busy || !access.canWrite || !snapshotReady || !ruleForm.contactId,
									onClick: () => void act("add_escalation_rule", {
										siteId: selected.id,
										...ruleForm
									}).then((ok) => {
										if (ok) setRuleForm({
											...ruleForm,
											step: ruleForm.step + 1
										});
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "Add rule"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rule-list",
							children: [selected.escalationRules.sort((left, right) => left.step - right.step).map((rule) => {
								const contact = selected.alertContacts.find((item) => item.id === rule.contactId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: rule.step }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: rule.condition.replaceAll("_", " ") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										rule.severity,
										" · after ",
										rule.delayMinutes,
										" min · ",
										contact?.name || "Removed contact"
									] })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": `Remove escalation step ${rule.step}`,
										disabled: busy || !access.canWrite || !snapshotReady,
										onClick: () => void act("remove_escalation_rule", {
											siteId: selected.id,
											ruleId: rule.id
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 })
									})
								] }, rule.id);
							}), !selected.escalationRules.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No escalation rules configured." })]
						})
					] })]
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sites-panel maintenance-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "MAINTENANCE CONTROL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Planned maintenance" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Windows record planned work. Alert suppression is not active. Device health, telemetry, and incidents remain visible throughout the window." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "maintenance-boundary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 15 }), "Maximum 7 days"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "maintenance-layout",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "maintenance-form",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Window title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: maintenanceForm.title,
								onChange: (event) => setMaintenanceForm({
									...maintenanceForm,
									title: event.target.value
								}),
								placeholder: "e.g. Planned power maintenance"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Owner", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: maintenanceForm.owner,
								onChange: (event) => setMaintenanceForm({
									...maintenanceForm,
									owner: event.target.value
								}),
								placeholder: "Responsible operator"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Starts (your browser timezone)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "datetime-local",
								value: maintenanceForm.startsAt,
								onChange: (event) => setMaintenanceForm({
									...maintenanceForm,
									startsAt: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Ends (your browser timezone)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "datetime-local",
								value: maintenanceForm.endsAt,
								onChange: (event) => setMaintenanceForm({
									...maintenanceForm,
									endsAt: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "wide",
								children: ["Reason", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: maintenanceForm.reason,
									onChange: (event) => setMaintenanceForm({
										...maintenanceForm,
										reason: event.target.value
									}),
									placeholder: "Explain the planned work and expected impact"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "primary-button",
								disabled: busy || !access.canWrite || !snapshotReady || !maintenanceForm.title || !maintenanceForm.owner || !maintenanceForm.reason || !maintenanceForm.startsAt || !maintenanceForm.endsAt,
								onClick: () => void act("create_maintenance_window", {
									siteId: selected.id,
									...maintenanceForm,
									startsAt: new Date(maintenanceForm.startsAt).toISOString(),
									endsAt: new Date(maintenanceForm.endsAt).toISOString()
								}).then((ok) => {
									if (ok) setMaintenanceForm({
										title: "",
										reason: "",
										owner: "",
										startsAt: "",
										endsAt: ""
									});
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), "Schedule window"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "maintenance-list",
						children: [selected.maintenanceWindows.map((window) => {
							const active = window.status === "scheduled" && Date.parse(window.startsAt) <= snapshotNow && Date.parse(window.endsAt) > snapshotNow, upcoming = window.status === "scheduled" && Date.parse(window.startsAt) > snapshotNow;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: active ? "active-window" : "",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: window.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `window-state ${active ? "active" : upcoming ? "upcoming" : window.status}`,
										children: active ? "Active" : upcoming ? "Scheduled" : window.status === "scheduled" ? "Completed" : window.status
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: window.reason }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										new Date(window.startsAt).toLocaleString("en-GB", { timeZone: selected.timezone }),
										" – ",
										new Date(window.endsAt).toLocaleString("en-GB", { timeZone: selected.timezone }),
										" · owner ",
										window.owner
									] }),
									(active || upcoming) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "secondary-button",
										disabled: busy || !access.canWrite || !snapshotReady,
										onClick: () => void act("cancel_maintenance_window", {
											siteId: selected.id,
											windowId: window.id
										}),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 14 }), "Cancel window"]
									})
								]
							}, window.id);
						}), !selected.maintenanceWindows.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No maintenance windows recorded." })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sites-panel assignment-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "panel-kicker",
						children: "DEVICE ASSIGNMENT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: selected ? `Assign devices to ${selected.name}` : "Select a site" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Select devices from any site or the unassigned queue. Bulk moves update inventory metadata only." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "assignment-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						disabled: !selectedDevices.length || busy || !access.canWrite || !snapshotReady,
						onClick: () => void act("assign_devices", {
							siteId: null,
							deviceIds: selectedDevices
						}),
						children: "Unassign"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "primary-button",
						disabled: !selected || selected.status !== "active" || !selectedDevices.length || busy || !access.canWrite || !snapshotReady,
						onClick: () => void act("assign_devices", {
							siteId: selected?.id,
							deviceIds: selectedDevices
						}),
						children: "Assign to site"
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "assignment-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Device" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Vendor/model" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Current site" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Live status" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: assignmentPool.map((device) => {
						const live = liveById.get(device.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								disabled: busy || !snapshotReady,
								"aria-label": `Select ${device.hostname}`,
								checked: selectedDevices.includes(device.id),
								onChange: (event) => setSelectedDevices(event.target.checked ? [...selectedDevices, device.id] : selectedDevices.filter((id) => id !== device.id))
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.hostname }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: device.managementIp || "No management address" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								device.vendor,
								" · ",
								device.model || "Unreported"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: device.site || "Unassigned" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `assignment-status ${live?.status ?? "unknown"}`,
								children: live?.status === "degraded" ? "Warning" : live?.status ?? "Unknown"
							}) })
						] }, device.id);
					}) })] }), !assignmentPool.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "empty-site-list",
						children: "No devices are awaiting assignment."
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "sites-panel site-audit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "AUDIT HISTORY"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recent placement changes" })] }) }), data?.audit.slice(0, 12).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "audit-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.action }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.actorEmail })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { children: new Date(item.createdAt).toLocaleString() })]
				}, item.id))]
			})
		]
	});
}
//#endregion
export { SiteManagement as default };
