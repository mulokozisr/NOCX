import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, r as Activity, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, s as Router, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleAlert } from "./circle-alert-fwvsmlmG.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronDown } from "./chevron-down-jG2qgWsF.js";
import { t as HardDrive } from "./hard-drive-ra7fzo_9.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { n as useOperatorAccess, t as OperatorAccess } from "./operator-access-CJCL0tBn.js";
import { i as useLiveOperations, n as formatBps, r as formatUptime, t as formatAge } from "./live-operations-ClF_13he.js";
import { n as CircleHelp, t as CloudOff } from "./cloud-off-Gpd4ndtJ.js";
import "./page-CY3TPLj0.js";
//#region node_modules/lucide-react/dist/esm/icons/pencil.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Pencil = createLucideIcon("Pencil", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}], ["path", {
	d: "m15 5 4 4",
	key: "1mk7zo"
}]]);
//#endregion
//#region app/device-editor.tsx
var import_jsx_runtime = require_jsx_runtime();
function DeviceEditor({ deviceId, onSaved }) {
	const access = useOperatorAccess(), [open, setOpen] = (0, import_react.useState)(false), [base, setBase] = (0, import_react.useState)(null), [addressEditable, setAddressEditable] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		hostname: "",
		model: "",
		managementIp: ""
	}), [confirmed, setConfirmed] = (0, import_react.useState)(false), [loading, setLoading] = (0, import_react.useState)(false), [busy, setBusy] = (0, import_react.useState)(false), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)("");
	const inFlight = (0, import_react.useRef)(false);
	const load = (0, import_react.useCallback)(async (signal) => {
		setLoading(true);
		setError("");
		setBase(null);
		setConfirmed(false);
		setNotice("");
		try {
			const response = await fetch("/api/platform/device-edit?device=" + encodeURIComponent(deviceId), {
				cache: "no-store",
				signal
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "Device details are unavailable.");
			if (body.device?.id !== deviceId) throw new Error("The device scope changed. Reload.");
			if (!signal?.aborted) {
				setBase(body.device);
				setForm({
					hostname: body.device.hostname,
					model: body.device.model ?? "",
					managementIp: body.device.managementIp ?? ""
				});
				setAddressEditable(body.addressEditable === true);
			}
		} catch (reason) {
			if (!signal?.aborted) setError(reason instanceof Error ? reason.message : "Device details are unavailable.");
		} finally {
			if (!signal?.aborted) setLoading(false);
		}
	}, [deviceId]);
	(0, import_react.useEffect)(() => {
		if (!open || !access.canWrite) return;
		const abort = new AbortController();
		load(abort.signal);
		return () => abort.abort();
	}, [
		open,
		access.canWrite,
		load
	]);
	const addressChanged = !!base && form.managementIp.trim() !== (base.managementIp ?? "");
	const dirty = !!base && (form.hostname.trim() !== base.hostname || (form.model.trim() || null) !== base.model || addressChanged);
	async function save(event) {
		event.preventDefault();
		if (inFlight.current || !base || !access.canWrite || !dirty || addressChanged && !confirmed) return;
		inFlight.current = true;
		setBusy(true);
		setError("");
		setNotice("");
		try {
			const response = await fetch("/api/platform/device-edit", {
				method: "POST",
				headers: access.headers,
				body: JSON.stringify({
					deviceId,
					hostname: form.hostname.trim(),
					model: form.model.trim() || null,
					managementIp: form.managementIp.trim() || null,
					expected: {
						hostname: base.hostname,
						model: base.model,
						managementIp: base.managementIp,
						updatedAt: base.updatedAt
					},
					confirmAddressChange: confirmed
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error ?? "Device save failed.");
			setBase({
				id: deviceId,
				hostname: body.hostname,
				model: body.model,
				managementIp: body.managementIp,
				updatedAt: body.updatedAt
			});
			setConfirmed(false);
			setNotice(body.addressChanged ? "Saved. The collector will use the new address after its next target refresh. Existing monitoring history is retained." : "Device details saved.");
			onSaved();
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Device save failed.");
		} finally {
			inFlight.current = false;
			setBusy(false);
		}
	}
	if (!access.canWrite) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "device-editor",
		onToggle: (event) => setOpen(event.currentTarget.open),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 14 }), "Edit device"] }), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => void save(event),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "device-edit-boundary",
					children: "Inventory only. Router settings and VPN configuration are not changed."
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					children: "Loading current details…"
				}),
				base && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					disabled: busy || loading,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Device name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							maxLength: 80,
							value: form.hostname,
							onChange: (event) => setForm((value) => ({
								...value,
								hostname: event.target.value
							}))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Model", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							maxLength: 80,
							value: form.model,
							onChange: (event) => setForm((value) => ({
								...value,
								model: event.target.value
							}))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Discovery may refresh reported model information later." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Management IP", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							disabled: !addressEditable,
							value: form.managementIp,
							spellCheck: false,
							onChange: (event) => {
								setConfirmed(false);
								setForm((value) => ({
									...value,
									managementIp: event.target.value
								}));
							}
						})] }),
						!addressEditable && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Assigned by WireGuard provisioning. This address is protected." }),
						addressChanged && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "device-edit-confirm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: confirmed,
								onChange: (event) => setConfirmed(event.target.checked)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I confirm this private IPv4 address is reachable by the collector. Changing the target may interrupt monitoring until the collector refreshes." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "device-edit-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "primary-button",
								disabled: !dirty || addressChanged && !confirmed,
								children: busy ? "Saving…" : "Save changes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "secondary-button",
								onClick: () => void load(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), "Reload details"]
							})]
						})
					]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					role: "alert",
					className: "device-edit-error",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }), !base && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "secondary-button",
						onClick: () => void load(),
						children: "Retry"
					})]
				}),
				notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					className: "device-edit-success",
					children: notice
				})
			]
		})]
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/arrow-left.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ArrowLeft = createLucideIcon("ArrowLeft", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]);
//#endregion
//#region app/operational-ui.tsx
function StatusBadge({ state }) {
	const canonical = state === "degraded" ? "warning" : state, Icon = canonical === "online" ? CircleCheck : canonical === "offline" ? CloudOff : canonical === "warning" || canonical === "critical" ? TriangleAlert : canonical === "maintenance" ? Clock3 : CircleHelp;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `operational-status operational-${canonical}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 15 }), canonical === "online" ? "Online" : canonical === "warning" ? "Warning" : canonical === "offline" ? "Offline" : canonical === "critical" ? "Critical" : canonical === "maintenance" ? "Maintenance" : "Unknown"]
	});
}
//#endregion
//#region app/device-statistics.tsx
var number = (v, unit) => v == null ? "Not observed" : `${Math.round(v * 10) / 10}${unit}`;
function Plot({ title, lines, unit, start, end }) {
	const [focus, setFocus] = (0, import_react.useState)(0);
	const values = lines.flatMap((l) => l.points.flatMap((p) => p.value === null ? [] : [p.value])), min = values.length && Math.max(...values) < 0 ? Math.min(...values) - 2 : Math.min(0, ...values), max = values.length && Math.max(...values) < 0 ? Math.max(...values) + 2 : Math.max(1, ...values), from = Date.parse(start), to = Date.parse(end), times = [...new Set(lines.flatMap((l) => l.points.map((p) => p.at)))].sort();
	const y = (v) => 150 - (v - min) / (max - min) * 125, x = (at) => 48 + (Date.parse(at) - from) / (to - from) * 690;
	const path = (points) => {
		let prev = null;
		return points.map((p) => {
			const at = Date.parse(p.at);
			if (p.value === null) {
				prev = null;
				return "";
			}
			const cmd = prev === null || at - prev > 18e4 ? "M" : "L";
			prev = at;
			return `${cmd}${x(p.at).toFixed(2)},${y(p.value).toFixed(2)}`;
		}).join(" ");
	};
	const selected = times[Math.min(focus, times.length - 1)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ds-plot",
		children: !values.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ds-empty",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 22 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
					"No accepted ",
					title.toLowerCase(),
					" observations"
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Measurements will appear when this device reports them." })
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 760 190",
				role: "img",
				"aria-label": `${title} in ${unit}. Gaps indicate missing observations.`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("title", { children: [title, ": recorded observations, gaps over 3 minutes are not connected"] }),
					[
						0,
						.5,
						1
					].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "48",
						x2: "738",
						y1: 25 + v * 125,
						y2: 25 + v * 125,
						stroke: "#e5ebf3"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "3",
						y: 29 + v * 125,
						fontSize: "12",
						fill: "#60718b",
						children: number(max - v * (max - min), "")
					})] }, v)),
					lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: path(l.points),
						fill: "none",
						stroke: l.color,
						strokeWidth: "2"
					}, l.name)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "48",
						y: "177",
						fontSize: "12",
						fill: "#60718b",
						children: new Date(start).toLocaleString()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "738",
						y: "177",
						textAnchor: "end",
						fontSize: "12",
						fill: "#60718b",
						children: new Date(end).toLocaleString()
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ds-legend",
				children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: l.color } }),
					l.name,
					" · ",
					unit
				] }, l.name))
			}),
			times.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ds-inspect",
				children: [
					"Inspect recorded time",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						"aria-label": `Inspect ${title} observations`,
						type: "range",
						min: 0,
						max: times.length - 1,
						value: Math.min(focus, times.length - 1),
						onChange: (e) => setFocus(Number(e.target.value))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						selected ? new Date(selected).toLocaleString() : "",
						" · ",
						lines.map((l) => `${l.name}: ${number(l.points.find((p) => p.at === selected)?.value, " " + unit)}`).join(" · ")
					] })
				]
			})
		] })
	});
}
function DeviceStatistics({ device, onBack, onDetails, refresh, refreshError }) {
	const [range, setRange] = (0, import_react.useState)("24H"), [custom, setCustom] = (0, import_react.useState)({
		start: "",
		end: ""
	}), [period, setPeriod] = (0, import_react.useState)({
		start: "",
		end: ""
	}), [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [loading, setLoading] = (0, import_react.useState)(true), [reload, setReload] = (0, import_react.useState)(0), [now, setNow] = (0, import_react.useState)(0), [diagnostics, setDiagnostics] = (0, import_react.useState)(false);
	const clock = (0, import_react.useRef)({
		server: 0,
		mono: 0
	});
	(0, import_react.useEffect)(() => {
		const abort = new AbortController();
		queueMicrotask(() => {
			if (abort.signal.aborted) return;
			setLoading(true);
			setError("");
			setData(null);
			if (range === "Custom" && (!period.start || !period.end)) {
				setLoading(false);
				return;
			}
			const p = new URLSearchParams({
				device: device.id,
				range
			});
			if (range === "Custom") {
				p.set("start", period.start);
				p.set("end", period.end);
			}
			fetch("/api/platform/device-statistics?" + p, {
				cache: "no-store",
				signal: abort.signal
			}).then(async (r) => {
				const b = await r.json();
				if (!r.ok) throw new Error(b.error);
				if (b.deviceId !== device.id) throw new Error("Device scope changed. Reload statistics.");
				if (!abort.signal.aborted) {
					clock.current = {
						server: Date.parse(b.checkedAt),
						mono: performance.now()
					};
					setNow(clock.current.server);
					setData(b);
				}
			}).catch((e) => {
				if (!abort.signal.aborted) setError(e.message);
			}).finally(() => {
				if (!abort.signal.aborted) setLoading(false);
			});
		});
		return () => abort.abort();
	}, [
		device.id,
		range,
		period.start,
		period.end,
		reload
	]);
	(0, import_react.useEffect)(() => {
		const t = window.setInterval(() => setNow(clock.current.server + Math.max(0, performance.now() - clock.current.mono)), 15e3);
		return () => window.clearInterval(t);
	}, []);
	const series = data?.series ?? {}, points = (key) => series[key] ?? [], latest = (key) => {
		const p = points(key).at(-1);
		return p && now - Date.parse(p.at) >= 0 && now - Date.parse(p.at) <= 18e4 ? p.value : null;
	};
	const sum = (field) => {
		const values = device.interfaces.flatMap((i) => i[field] === null ? [] : [i[field]]);
		return values.length ? values.reduce((a, b) => a + b, 0) : null;
	};
	const radio = /ubiquiti/i.test(device.vendor) && /rocket|prism|beam|air|radio/i.test(device.model ?? "") || points("wireless.signal.dbm").length > 0;
	const lines = (key, name, color = "#2563eb", scale = 1) => ({
		name,
		color,
		points: points(key).map((p) => ({
			...p,
			value: p.value === null ? null : p.value / scale
		}))
	});
	const plot = (title, unit, items) => data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plot, {
		title,
		unit,
		lines: items,
		start: data.start,
		end: data.end
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "ds-placeholder",
		children: loading ? "Loading recorded history…" : "History unavailable"
	});
	const insight = device.status === "unknown" ? "Monitoring evidence is missing or stale" : device.status === "offline" ? "Device reachability has failed" : device.healthReasons.length ? device.healthReasons[0] : "No current warning threshold is crossed";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "ds-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ds-context",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "secondary-button",
					onClick: onBack,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), "Back to devices"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					data?.mappings.map((m) => m.customerName).filter((v, i, a) => a.indexOf(v) === i).join(", ") || "No mapped customer",
					" / ",
					device.site || "Unassigned site",
					" / ",
					device.name
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "ds-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ds-device-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 32 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ds-identity",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ds-kicker",
								children: "DEVICE STATISTICS & DIAGNOSTICS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: device.model || device.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: device.model ? device.name : device.vendor }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ds-meta",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: device.vendor }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: device.ip || "No management IP" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: device.site || "Unassigned site" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "MAC not observed" })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ds-header-actions",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { state: device.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 13 }),
								"Last seen ",
								formatAge(device.lastSeenAt)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "primary-button",
								onClick: () => {
									setDiagnostics(true);
									document.getElementById("ds-diagnostics")?.scrollIntoView({
										behavior: "smooth",
										block: "center"
									});
								},
								children: "Open diagnostics"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								onClick: onDetails,
								children: "Device details & site assignment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceEditor, {
								deviceId: device.id,
								onSaved: refresh
							})
						]
					})
				]
			}),
			(error || refreshError) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ds-error",
				role: "alert",
				children: [
					error || refreshError,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						onClick: () => {
							setReload((v) => v + 1);
							refresh();
						},
						children: "Retry"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ds-freshness",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [device.currentEvidenceFresh ? "Current evidence available" : "Current evidence unknown", " · History is recorded data, not a live probe"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						disabled: loading,
						onClick: () => {
							setReload((v) => v + 1);
							refresh();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), loading ? "Loading…" : "Refresh statistics"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "ds-health-strip nocx-summary-grid",
				"aria-label": "Current device statistics",
				children: [
					[
						"Latency",
						number(device.latencyMs, " ms"),
						"network.latency.ms"
					],
					[
						"Packet loss",
						number(device.packetLossPct, "%"),
						"network.packet_loss.pct"
					],
					[
						"CPU",
						number(device.cpuPct, "%"),
						"device.cpu.utilization.pct"
					],
					[
						"Memory",
						number(device.memoryPct, "%"),
						"device.memory.utilization.pct"
					],
					["Uptime", device.uptimeSeconds == null ? "Not observed" : formatUptime(device.uptimeSeconds)],
					[
						"Interface RX",
						formatBps(sum("rxBps")),
						"traffic.rx"
					],
					[
						"Interface TX",
						formatBps(sum("txBps")),
						"traffic.tx"
					]
				].map(([name, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 18 }),
					label: name,
					value,
					detail: device.currentEvidenceFresh ? "Current observations" : "Unknown / stale"
				}, name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ds-period",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Recorded history" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "group",
						"aria-label": "Statistics time range",
						children: [
							"1H",
							"24H",
							"7D",
							"30D",
							"Custom"
						].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-pressed": range === r,
							onClick: () => {
								setData(null);
								setRange(r);
							},
							children: r
						}, r))
					}),
					range === "Custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							setData(null);
							setPeriod({
								start: new Date(custom.start).toISOString(),
								end: new Date(custom.end).toISOString()
							});
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Start", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "datetime-local",
								value: custom.start,
								onChange: (e) => setCustom({
									...custom,
									start: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["End", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "datetime-local",
								value: custom.end,
								onChange: (e) => setCustom({
									...custom,
									end: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "secondary-button",
								children: "Apply period"
							})
						]
					})
				]
			}),
			data?.truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ds-warning",
				role: "status",
				children: "This period exceeds the data limit. Charts show only returned observations; use a shorter period for a complete view."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ds-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "ds-card ds-traffic",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ds-card-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Traffic" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Observed interface sums · Mbps" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ds-note",
								children: "RX and TX across collected interfaces. This is not verified customer download/upload or WAN throughput."
							}),
							plot("Traffic", "Mbps", [lines("traffic.rx", "RX", "#2563eb", 1e6), lines("traffic.tx", "TX", "#0d9488", 1e6)])
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "ds-card ds-insight",
						id: "ds-diagnostics",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ds-card-head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Insight" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { state: device.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: insight }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								device.dependentServices,
								" mapped services · ",
								device.activeIncidents,
								" active incidents"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Suggested next step" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: device.status === "unknown" ? "Check the last accepted sample, monitoring configuration and management route." : device.status === "offline" ? "Review the management route and power/link condition before assuming a device fault." : device.status === "degraded" ? "Compare affected interfaces and related incident evidence before choosing a corrective action." : "Review trends and interface observations for the reported period." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ds-note",
								children: "A cause is not confirmed by these measurements alone."
							}),
							diagnostics && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								role: "status",
								className: "ds-diagnostic",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Diagnostic review" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										"1. Check freshness and reachability.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"2. Compare connectivity and interface errors.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"3. Open the related incident or customer service.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"4. Confirm recovery with new accepted evidence."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ping and configuration execution are not enabled in this view." })
								]
							}),
							device.incidentIds[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "secondary-button",
								href: `#/incidents?incident=${encodeURIComponent(device.incidentIds[0])}`,
								children: "Open related incident"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "ds-card ds-connectivity",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Connectivity" }),
							plot("Latency", "ms", [lines("network.latency.ms", "Latency")]),
							plot("Packet loss", "%", [lines("network.packet_loss.pct", "Packet loss", "#ea580c")])
						]
					}),
					radio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "ds-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Wireless link health" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ds-metric-list",
								children: [[
									[
										"Signal",
										"wireless.signal.dbm",
										" dBm"
									],
									[
										"Noise floor",
										"wireless.noise.dbm",
										" dBm"
									],
									[
										"CCQ",
										"wireless.ccq.pct",
										"%"
									]
								].map(([label, key, unit]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: number(latest(key), unit) })] }, key)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Capacity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(latest("wireless.capacity.bps")) })] })]
							}),
							plot("Wireless signal", "dBm", [lines("wireless.signal.dbm", "Signal")]),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ds-note",
								children: "Frequency, channel width and TX/RX link rates are not observed."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "ds-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Device health" }),
							plot("Device health", "%", [lines("device.cpu.utilization.pct", "CPU"), lines("device.memory.utilization.pct", "Memory", "#0d9488")]),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ds-metric-list",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Temperature" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: number(latest("device.temperature.celsius"), " °C") })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Voltage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Not observed" })] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "ds-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Location & service context" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ds-link-context",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Router, { size: 25 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: device.site || "Site not assigned" })
								]
							}),
							data?.mappings.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "ds-service-link",
								href: `#/customers?service=${encodeURIComponent(m.serviceCode)}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: m.customerName }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.serviceCode })]
							}, m.serviceId)),
							data && !data.mappings.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No active customer-service mapping." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ds-note",
								children: "Peer, distance, azimuth and survey data are not recorded. No physical link is inferred from service mappings."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "ds-card ds-interfaces",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Interfaces" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ds-table-scroll",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Interface" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Link speed" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "RX" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "TX" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Input errors" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Output errors" })
								] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: device.interfaces.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: (i.inErrors ?? 0) + (i.outErrors ?? 0) > 0 ? "ds-port-warning" : "",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: i.name }) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: i.operStatus === 1 ? "Up" : i.operStatus === 2 ? "Down" : "Unknown" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: "Not observed" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(i.rxBps) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(i.txBps) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: i.inErrors ?? "—" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: i.outErrors ?? "—" })
									]
								}, i.name)) })] })
							}),
							!device.interfaces.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No interface observations for this device." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ds-note",
								children: "Errors are observed polling deltas. Port speed and interface type are not inferred from traffic."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "ds-card ds-events",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Recent alerts & events" }),
							data?.events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								className: "ds-event",
								href: `#/incidents?incident=${encodeURIComponent(e.id)}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: e.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									e.status,
									" · ",
									e.severity,
									" · ",
									new Date(e.at).toLocaleString()
								] })] })]
							}, e.id)),
							data && !data.events.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No related incident records returned." }),
							data?.eventDirectoryTruncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ds-note",
								children: "The incident directory limit may omit older events."
							}),
							!data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: loading ? "Loading events…" : "Events unavailable" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "ds-footer",
				children: "Recorded observations only · Missing intervals stay unknown · No device commands executed"
			})
		]
	});
}
//#endregion
//#region app/device-inventory-list.tsx
function InventorySummary({ summary, status, onStatus }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "inventory-stats inventory-stats-compact nocx-summary-grid",
		"aria-label": "Filter devices by status",
		children: [
			{
				label: "All devices",
				filter: "All statuses",
				count: summary?.devices,
				icon: HardDrive,
				color: "blue"
			},
			{
				label: "Online",
				filter: "Online",
				count: summary?.online,
				icon: CircleCheck,
				color: "green"
			},
			{
				label: "Warning",
				filter: "Warning",
				count: summary?.degraded,
				icon: CircleAlert,
				color: "amber"
			},
			{
				label: "Offline",
				filter: "Offline",
				count: summary?.offline,
				icon: Activity,
				color: "red"
			},
			{
				label: "Unknown",
				filter: "Unknown",
				count: summary?.unknown,
				icon: Network,
				color: "violet"
			}
		].map(({ label, filter, count, icon: Icon, color }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 17 }),
			label,
			value: count ?? "—",
			tone: color,
			"aria-pressed": status === filter,
			disabled: !summary,
			onClick: () => onStatus(filter)
		}, filter))
	});
}
function DeviceInventoryTable({ devices, onOpen, formatLastSeen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "device-table device-table-compact",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
				className: "sr-only",
				children: "Device inventory. Open a device for hardware details, availability and performance."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: "Device"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: "IP address"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: "Site"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: "Status"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: "Last seen"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Open device"
					})
				})
			] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: devices.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				onClick: () => onOpen(device.id),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "device-name-button",
						onClick: (event) => {
							event.stopPropagation();
							onOpen(device.id);
						},
						children: device.name
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: device.ip || "—" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "inventory-site-cell",
						children: device.site || "Unassigned"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "device-status status-" + (device.status === "degraded" ? "warning" : device.status),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), device.status === "online" ? "Online" : device.status === "offline" ? "Offline" : device.status === "degraded" ? "Warning" : "Unknown"]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "inventory-seen-cell",
						children: formatLastSeen(device.lastSeenAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "row-action",
						onClick: (event) => {
							event.stopPropagation();
							onOpen(device.id);
						},
						"aria-label": "Open " + device.name,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
					}) })
				]
			}, device.id)) })
		]
	});
}
//#endregion
//#region lib/site-assignment-state.ts
function record(value) {
	return typeof value === "object" && value !== null;
}
function readSiteAssignment(value, deviceId) {
	const invalid = () => {
		throw new Error("Current site assignment could not be verified. Retry loading sites.");
	};
	if (!record(value) || !Array.isArray(value.sites) || !Array.isArray(value.unassignedDevices)) return invalid();
	const sites = [];
	let matches = 0, siteId = "";
	const ids = /* @__PURE__ */ new Set();
	for (const site of value.sites) {
		if (!record(site) || typeof site.id !== "string" || !site.id || ids.has(site.id) || typeof site.name !== "string" || !site.name || typeof site.status !== "string" || !Array.isArray(site.devices)) return invalid();
		ids.add(site.id);
		for (const device of site.devices) {
			if (!record(device) || typeof device.id !== "string") return invalid();
			if (device.id === deviceId) {
				if (site.status !== "active") return invalid();
				matches++;
				siteId = site.id;
			}
		}
		if (site.status === "active") sites.push({
			id: site.id,
			name: site.name,
			customerId: typeof site.customerId === "string" ? site.customerId : null
		});
	}
	for (const device of value.unassignedDevices) {
		if (!record(device) || typeof device.id !== "string") return invalid();
		if (device.id === deviceId) matches++;
	}
	if (matches !== 1) return invalid();
	return {
		sites,
		siteId
	};
}
//#endregion
//#region app/device-site-assignment.tsx
function DeviceSiteAssignment({ deviceId, onChanged }) {
	const access = useOperatorAccess(), [sites, setSites] = (0, import_react.useState)([]), [siteId, setSiteId] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)(""), [loadedFor, setLoadedFor] = (0, import_react.useState)(""), [retry, setRetry] = (0, import_react.useState)(0);
	const loaded = loadedFor === deviceId;
	(0, import_react.useEffect)(() => {
		let active = true;
		setLoadedFor("");
		setError("");
		setNotice("");
		fetch("/api/platform/sites", { cache: "no-store" }).then(async (r) => {
			const body = await r.json();
			if (!r.ok) throw new Error(body.error);
			const assignment = readSiteAssignment(body, deviceId);
			if (active) {
				setSites(assignment.sites);
				setSiteId(assignment.siteId);
				setLoadedFor(deviceId);
			}
		}).catch((e) => {
			if (active) setError(e instanceof Error ? e.message : "Sites unavailable");
		});
		return () => {
			active = false;
		};
	}, [deviceId, retry]);
	async function save() {
		if (!loaded || busy || !access.canWrite) return;
		setBusy(true);
		setError("");
		setNotice("");
		try {
			const r = await fetch("/api/platform/sites", {
				method: "POST",
				headers: access.headers,
				body: JSON.stringify({
					action: "assign_devices",
					siteId: siteId || null,
					deviceIds: [deviceId]
				})
			}), body = await r.json();
			if (!r.ok) throw new Error(body.error);
			setNotice(siteId ? "Site assignment saved." : "Device unassigned.");
			onChanged();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Assignment failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "device-assignment",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "Assign or move to a site" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorAccess, { access }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Site", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				disabled: !loaded || busy,
				value: siteId,
				onChange: (e) => {
					setSiteId(e.target.value);
					setNotice("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Unassigned"
				}), sites.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s.id,
					children: s.name
				}, s.id))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "workflow-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary-button",
					disabled: !access.canWrite || busy || !loaded,
					onClick: () => void save(),
					children: busy ? "Saving…" : "Save assignment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#/sites",
					children: "Create a site"
				})]
			}),
			!loaded && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: "Loading current site assignment…"
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "workflow-error",
				children: error
			}), !loaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setRetry((value) => value + 1),
				children: "Retry loading sites"
			})] }),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: notice
			})
		]
	});
}
//#endregion
//#region app/live-inventory.tsx
function label(status) {
	return status === "online" ? "Online" : status === "degraded" ? "Warning" : status === "offline" ? "Offline" : "Unknown";
}
function maxObservedBps(rx, tx) {
	const values = [rx, tx].filter((value) => value !== null);
	return values.length ? Math.max(...values) : null;
}
function LiveInventory() {
	const { data, error, loading, refresh } = useLiveOperations(15);
	const [query, setQuery] = (0, import_react.useState)(""), [vendor, setVendor] = (0, import_react.useState)("All vendors"), [status, setStatus] = (0, import_react.useState)("All statuses"), [site, setSite] = (0, import_react.useState)("All sites");
	const [selectedDeviceId, setSelectedDeviceId] = (0, import_react.useState)(null);
	const [detailTab, setDetailTab] = (0, import_react.useState)("Statistics");
	const devices = (0, import_react.useMemo)(() => data?.devices ?? [], [data?.devices]);
	const vendors = [...new Set(devices.map((device) => device.vendor))].sort();
	const sites = [...new Set(devices.map((device) => device.site).filter((value) => Boolean(value)))].sort();
	const filtered = devices.filter((device) => `${device.name} ${device.ip ?? ""} ${device.model ?? ""} ${device.site ?? ""}`.toLowerCase().includes(query.toLowerCase()) && (vendor === "All vendors" || device.vendor === vendor) && (status === "All statuses" || label(device.status) === status) && (site === "All sites" || device.site === site));
	(0, import_react.useEffect)(() => {
		const syncInventoryView = () => {
			const queryString = window.location.hash.split("?")[1] ?? "";
			const parameters = new URLSearchParams(queryString);
			setSelectedDeviceId(parameters.get("device"));
			setDetailTab("Statistics");
			setVendor(parameters.get("vendor") ?? "All vendors");
			setStatus(parameters.get("status") ?? "All statuses");
			setSite(parameters.get("site") ?? "All sites");
		};
		queueMicrotask(syncInventoryView);
		window.addEventListener("hashchange", syncInventoryView);
		return () => window.removeEventListener("hashchange", syncInventoryView);
	}, []);
	const selected = (0, import_react.useMemo)(() => devices.find((item) => item.id === selectedDeviceId) ?? null, [devices, selectedDeviceId]);
	if (selected && detailTab === "Statistics") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceStatistics, {
		device: selected,
		refresh: () => void refresh(),
		refreshError: error,
		onBack: () => {
			setSelectedDeviceId(null);
			if (window.location.hash.includes("device=")) window.location.hash = "/devices";
		},
		onDetails: () => setDetailTab("Overview")
	}, selected.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "inventory-page compact-inventory",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "inventory-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Inventory" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "inventory-freshness",
					role: "status",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 13 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data ? `Updated ${formatAge(data.checkedAt)}` : loading ? "Loading inventory…" : "Inventory unavailable" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inventory-read-only",
							children: "Read-only telemetry"
						}),
						data && data.scope.rejectedDevices > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
							"Data quality (",
							data.scope.rejectedDevices,
							" excluded)"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Records with invalid identity, address or chronology are excluded." }) })] })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inventory-actions",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void refresh(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), loading ? "Refreshing…" : "Refresh"]
					})
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Inventory refresh failed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventorySummary, {
				summary: data?.summary ?? null,
				status,
				onStatus: (next) => {
					setStatus(next);
					if (next === "All statuses") {
						setQuery("");
						setVendor("All vendors");
						setSite("All sites");
					}
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "inventory-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inventory-toolbar",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inventory-search",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 17 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: query,
										onChange: (event) => setQuery(event.target.value),
										placeholder: "Search name, IP, model or site...",
										"aria-label": "Search device inventory"
									}),
									query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQuery(""),
										"aria-label": "Clear device search",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "select-control",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vendor" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: vendor,
										onChange: (event) => setVendor(event.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All vendors" }), vendors.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "select-control",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: status,
										onChange: (event) => setStatus(event.target.value),
										children: [
											"All statuses",
											"Online",
											"Warning",
											"Offline",
											"Unknown"
										].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "select-control site-select",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Site" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: site,
										onChange: (event) => setSite(event.target.value),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All sites" }), sites.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inventory-table-head",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? filtered.length : "—" }), data ? ` of ${devices.length} devices` : " devices"] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "device-table-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceInventoryTable, {
								devices: filtered,
								onOpen: (deviceId) => {
									setDetailTab("Statistics");
									setSelectedDeviceId(deviceId);
								},
								formatLastSeen: formatAge
							}),
							data && !loading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "empty-devices",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 25 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No verified devices match" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Adjust the filters or add a device." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "primary-button",
										href: "#/device-onboarding",
										children: "Add device"
									})
								]
							}),
							!data && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "empty-devices",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 25 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Inventory evidence unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Load an authenticated operations snapshot to review registered devices." })
								]
							})
						]
					})
				]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "drawer-layer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "drawer-scrim",
					"aria-label": "Close device details",
					onClick: () => setSelectedDeviceId(null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "device-drawer",
					"aria-label": `${selected.name} device details`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "drawer-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "panel-kicker",
									children: [
										selected.id,
										" · ",
										selected.vendor
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									selected.model || "Model unreported",
									" · ",
									selected.site || "Unassigned site"
								] })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "icon-button",
								onClick: () => setSelectedDeviceId(null),
								"aria-label": "Close device",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "device-drawer-status",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { state: selected.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 13 }),
								"Last seen ",
								formatAge(selected.lastSeenAt)
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "workflow-tabs",
							"aria-label": "Device detail sections",
							children: [
								"Statistics",
								"Overview",
								"Interfaces",
								"Performance",
								"Connectivity",
								"Alerts"
							].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-pressed": detailTab === tab,
								onClick: () => setDetailTab(tab),
								children: tab
							}, tab))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceEditor, {
							deviceId: selected.id,
							onSaved: () => void refresh()
						}, selected.id),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceSiteAssignment, {
							deviceId: selected.id,
							onChanged: () => void refresh()
						}),
						detailTab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "device-health-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observed availability" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.availabilityPct == null ? "—" : `${selected.availabilityPct}%` })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "CPU load" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selected.cpuPct == null ? "—" : `${selected.cpuPct}%` })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Uptime" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatUptime(selected.uptimeSeconds) })] })
							]
						}),
						detailTab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "device-detail-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Current health reasons" }), selected.healthReasons.length ? selected.healthReasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "resource-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: reason }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Health reason" })]
							}, reason)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "muted-value",
								children: "No current warning threshold is crossed. Down or unused interfaces remain visible below but do not degrade the whole router."
							})]
						}),
						(detailTab === "Overview" || detailTab === "Connectivity") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "device-detail-section",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Device information" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Management IP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: selected.ip || "—" }) })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.source })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Dependent services" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.dependentServices })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Active incidents" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.activeIncidents })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Latency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.latencyMs == null ? "—" : `${selected.latencyMs} ms` })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Packet loss" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.packetLossPct == null ? "—" : `${selected.packetLossPct}%` })] })
							] })]
						}),
						detailTab === "Connectivity" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "device-detail-section",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Connectivity checks" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.currentEvidenceFresh ? "Recent availability evidence is present." : "Availability evidence is missing or stale. Check the VPN route and agent heartbeat." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use the authorized VPS to verify reachability. This view does not run a network probe." })
							]
						}),
						detailTab === "Performance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "device-detail-section",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Performance" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "CPU" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.cpuPct == null ? "Not observed" : `${selected.cpuPct}%` })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Memory" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.memoryPct == null ? "Not observed" : `${selected.memoryPct}%` })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Latency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.latencyMs == null ? "Not observed" : `${selected.latencyMs} ms` })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Packet loss" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected.packetLossPct == null ? "Not observed" : `${selected.packetLossPct}%` })] })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "secondary-button",
									href: `#/performance?device=${encodeURIComponent(selected.id)}`,
									children: "Open interface history"
								})
							]
						}),
						detailTab === "Alerts" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "device-detail-section",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Related operational evidence" }),
								selected.incidentIds.map((incidentId) => {
									const incident = data?.incidents.find((item) => item.id === incidentId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										className: "resource-row resource-link-row",
										href: `#/incidents?incident=${encodeURIComponent(incidentId)}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: incident?.title || incidentId }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [incident?.severity || "Recorded", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 13 })] })]
									}, incidentId);
								}),
								selected.dependentServiceCodes.map((serviceCode) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "resource-row resource-link-row",
									href: `#/customers?service=${encodeURIComponent(serviceCode)}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: serviceCode }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [selected.impactedServiceCodes.includes(serviceCode) ? "Impacted" : "Dependent", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 13 })] })]
								}, serviceCode)),
								!selected.incidentIds.length && !selected.dependentServiceCodes.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "muted-value",
									children: "No linked incident or approved service-dependency evidence."
								})
							]
						}),
						detailTab === "Interfaces" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "device-detail-section",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Collected interfaces" }),
								selected.interfaces.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "resource-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										item.name,
										" · ",
										item.operStatus === 1 ? "up" : item.operStatus === 2 ? "down" : "unknown"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatBps(maxObservedBps(item.rxBps, item.txBps)) })]
								}, item.name)),
								selected.interfaces.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "muted-value",
									children: "No interface metrics collected."
								})
							]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { LiveInventory as default };
