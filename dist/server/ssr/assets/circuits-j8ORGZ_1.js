import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck, t as Network } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronDown } from "./chevron-down-jG2qgWsF.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as Plus } from "./plus-M3dz1mQn.js";
import { t as Cable } from "./cable-CjfFfYNl.js";
import { t as Download } from "./download-CU5_C7Ji.js";
import { t as Earth } from "./earth-CJS-wRfe.js";
//#region node_modules/lucide-react/dist/esm/icons/circle-dollar-sign.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleDollarSign = createLucideIcon("CircleDollarSign", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",
		key: "1h4pet"
	}],
	["path", {
		d: "M12 18V6",
		key: "zqpxq5"
	}]
]);
//#endregion
//#region app/circuits.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var blankDraft = {
	name: "",
	provider: "",
	serviceType: "Internet",
	deviceId: "",
	interfaceName: "",
	endpointLabel: "",
	capacityMbps: "",
	slaTargetPct: "99.50",
	monthlyCommit: "",
	currency: "TZS",
	renewalAt: "",
	contractReference: "",
	description: ""
};
var slug = (value) => value.toLowerCase().replaceAll("_", "-").replaceAll(" ", "-").replace(/[^a-z-]/g, "");
function formatBps(value) {
	if (value === null) return "—";
	if (value >= 1e9) return `${(value / 1e9).toFixed(2)} Gbps`;
	if (value >= 1e6) return `${(value / 1e6).toFixed(1)} Mbps`;
	return `${(value / 1e3).toFixed(1)} Kbps`;
}
function formatDate(value) {
	if (!value) return "—";
	return new Intl.DateTimeFormat(void 0, {
		dateStyle: "medium",
		timeZone: "Africa/Dar_es_Salaam"
	}).format(new Date(value));
}
function formatCurrency(minor, currency) {
	return new Intl.NumberFormat(void 0, {
		style: "currency",
		currency,
		maximumFractionDigits: currency === "TZS" ? 0 : 2
	}).format(minor / 100);
}
function formatCommitments(values) {
	if (!values.length) return "—";
	if (values.length === 1) return formatCurrency(values[0].minor, values[0].currency);
	return `${values.length} currencies`;
}
function CircuitProviderManagement() {
	const [data, setData] = (0, import_react.useState)(null), [tab, setTab] = (0, import_react.useState)("Overview"), [query, setQuery] = (0, import_react.useState)(""), [state, setState] = (0, import_react.useState)("All states"), [selected, setSelected] = (0, import_react.useState)(null), [showCreate, setShowCreate] = (0, import_react.useState)(false), [draft, setDraft] = (0, import_react.useState)(blankDraft), [loading, setLoading] = (0, import_react.useState)(true), [working, setWorking] = (0, import_react.useState)(""), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)("");
	const closeRef = (0, import_react.useRef)(null);
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (!quiet) setLoading(true);
		try {
			const response = await fetch("/api/platform/circuits", { cache: "no-store" }), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Circuit register is unavailable");
			setData(body);
			setSelected((current) => current ? body.circuits.find((item) => item.id === current.id) ?? null : null);
			setError("");
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Circuit register is unavailable");
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
		return () => previous?.focus();
	}, [selected]);
	const circuits = data?.circuits ?? [], filtered = circuits.filter((item) => (state === "All states" || item.status === state) && `${item.circuitNumber} ${item.name} ${item.provider} ${item.endpointLabel} ${item.interfaceName}`.toLowerCase().includes(query.toLowerCase()));
	const attention = circuits.filter((item) => item.status === "pending_verification" || [
		"Down",
		"Capacity risk",
		"Unknown"
	].includes(item.health));
	function notify(message) {
		setNotice(message);
		window.setTimeout(() => setNotice(""), 3200);
	}
	async function register(event) {
		event.preventDefault();
		setWorking("create");
		setError("");
		try {
			const response = await fetch("/api/platform/circuits", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					...draft,
					capacityBps: Math.round(Number(draft.capacityMbps) * 1e6),
					slaTargetBps: Math.round(Number(draft.slaTargetPct) * 100),
					monthlyCommitMinor: Math.round(Number(draft.monthlyCommit || 0) * 100)
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Circuit could not be registered");
			setDraft(blankDraft);
			setShowCreate(false);
			notify("Circuit registered for independent evidence verification.");
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Circuit could not be registered");
		} finally {
			setWorking("");
		}
	}
	async function verify() {
		if (!selected) return;
		setWorking("verify");
		setError("");
		try {
			const response = await fetch("/api/platform/circuits", {
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					id: selected.id,
					action: "verify"
				})
			}), body = await response.json();
			if (!response.ok) throw new Error(body.error || "Circuit verification failed");
			notify("Circuit activated from independently verified interface evidence.");
			await load(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Circuit verification failed");
		} finally {
			setWorking("");
		}
	}
	function exportCsv() {
		if (!circuits.length) return;
		const rows = [[
			"circuit",
			"name",
			"provider",
			"service_type",
			"device",
			"interface",
			"capacity_bps",
			"status",
			"observed_availability_pct",
			"current_rx_bps",
			"current_tx_bps",
			"renewal"
		], ...circuits.map((item) => [
			item.circuitNumber,
			item.name,
			item.provider,
			item.serviceType,
			item.device?.hostname ?? item.deviceId,
			item.interfaceName,
			item.capacityBps,
			item.status,
			item.availabilityEvidence.observedAvailabilityPct ?? "",
			item.interfaceEvidence.currentRxBps ?? "",
			item.interfaceEvidence.currentTxBps ?? "",
			item.renewalAt ?? ""
		])];
		const blob = new Blob([rows.map((row) => row.map((value) => `"${String(value).replaceAll("\"", "\"\"")}"`).join(",")).join("\n")], { type: "text/csv" }), url = URL.createObjectURL(blob), anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `nocx-circuits-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
		anchor.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "carrier-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "carrier-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Circuits, providers & peering" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "STRICT CIRCUIT-EVIDENCE STATE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Register carrier services against valid, non-future device-interface evidence without inventing capacity, SLA, contract or BGP results." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "carrier-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: exportCsv,
							disabled: !circuits.length,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 15 }), "Export"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "secondary-button",
							onClick: () => void load(),
							disabled: loading,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
								className: loading ? "refresh-spin" : "",
								size: 15
							}), "Refresh"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							onClick: () => setShowCreate((value) => !value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 15 }), "Register circuit"]
						})
					]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip evidence-error",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Circuit evidence unavailable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: error })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Persistent production evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "No demonstration carriers, peers, SLA breaches, utilization, costs or tickets are included." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "0 network writes"] })
				]
			}),
			showCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircuitForm, {
				draft,
				setDraft,
				devices: data?.devices ?? [],
				working,
				submit: register,
				close: () => setShowCreate(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "carrier-summary",
				"aria-label": "Carrier management summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Cable,
						tone: "blue",
						label: "Registered circuits",
						value: String(data?.summary.total ?? "—"),
						meta: `${data?.summary.active ?? 0} independently active`,
						onClick: () => setTab("Circuits")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Earth,
						tone: "green",
						label: "Verified capacity",
						value: formatBps(data?.summary.verifiedCapacityBps ?? null),
						meta: `${data?.summary.telemetryLinked ?? 0} with stored interface evidence`,
						onClick: () => setTab("Circuits")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: TriangleAlert,
						tone: "red",
						label: "Observed SLA risks",
						value: String(data?.summary.observedSlaRisks ?? "—"),
						meta: "Fresh observations only · no automatic claims",
						onClick: () => setTab("SLA & Tickets")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: CircleDollarSign,
						tone: "violet",
						label: "Registered commit",
						value: formatCommitments(data?.summary.commitments ?? []),
						meta: "Operator-entered contract metadata",
						onClick: () => setTab("Contracts")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
						icon: Clock3,
						tone: "amber",
						label: "Renewals due",
						value: String(data?.summary.renewalsDue ?? "—"),
						meta: "Within the next 120 days",
						onClick: () => setTab("Contracts")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "carrier-tabs",
				role: "tablist",
				"aria-label": "Circuit and provider sections",
				children: [
					"Overview",
					"Circuits",
					"Peering",
					"SLA & Tickets",
					"Contracts"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					role: "tab",
					"aria-selected": tab === item,
					tabIndex: tab === item ? 0 : -1,
					className: tab === item ? "carrier-tab-active" : "",
					onClick: () => setTab(item),
					children: [item, item === "SLA & Tickets" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.summary.observedSlaRisks ?? 0 })]
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "tabpanel",
				tabIndex: -1,
				children: [
					tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {
						circuits,
						attention,
						setSelected,
						setTab
					}),
					tab === "Circuits" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "panel carrier-register",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
								kicker: "PERSISTENT CIRCUIT REGISTER",
								title: "Verified carrier service records",
								copy: "Activation requires an independent operator and collected evidence from the linked device interface."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
								query,
								setQuery,
								state,
								setState,
								checkedAt: data?.checkedAt ?? null
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircuitTable, {
								data: filtered,
								setSelected
							})
						]
					}),
					tab === "Peering" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "panel carrier-register",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
							kicker: "BGP EVIDENCE BOUNDARY",
							title: "Peering sessions are not yet collected",
							copy: "NOCX will not report peers, routes, diversity or session health until an approved BGP telemetry source is commissioned."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
							icon: Network,
							title: "No verified peering evidence",
							copy: "Registered IP transit and IX circuits remain visible in the circuit register, but they are not treated as BGP sessions."
						})]
					}),
					tab === "SLA & Tickets" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "panel carrier-register",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
								kicker: "OBSERVED AVAILABILITY",
								title: "Evidence review without automatic claims",
								copy: "Device availability is shown as an observation. Stale, future or invalid evidence is Unknown; NOCX does not submit provider tickets or assert contractual breach automatically."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "carrier-issues",
								children: circuits.filter((item) => item.status === "active").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `carrier-issue-icon carrier-${item.availabilityEvidence.assessment === "observed" && (item.availabilityEvidence.observedAvailabilityPct ?? 100) * 100 < item.slaTargetBps ? "critical" : "warning"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 17 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { value: item.availabilityEvidence.assessment === "observed" ? "Observed" : item.availabilityEvidence.assessment === "stale_evidence" ? "Unknown" : "Collecting" })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											item.circuitNumber,
											" · ",
											item.provider
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											item.availabilityEvidence.sampleCount,
											" device samples · objective ",
											(item.slaTargetBps / 100).toFixed(2),
											"%"
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Observed availability" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.availabilityEvidence.observedAvailabilityPct === null ? "—" : `${item.availabilityEvidence.observedAvailabilityPct.toFixed(3)}%` })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "secondary-button",
										onClick: () => setSelected(item),
										children: "Review"
									})
								] }, item.id))
							}),
							!circuits.some((item) => item.status === "active") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
								icon: ShieldCheck,
								title: "No active circuit evidence",
								copy: "An independently verified circuit will appear here after current collected interface-status evidence is available."
							})
						]
					}),
					tab === "Contracts" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "panel carrier-register",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
							kicker: "OPERATOR-ENTERED COMMERCIAL METADATA",
							title: "Contract & renewal register",
							copy: "Costs and renewal dates appear only when an operator records them; no budget or savings claims are inferred."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircuitTable, {
							data: filtered,
							setSelected,
							commercial: true
						})]
					})
				]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircuitDrawer, {
				item: selected,
				closeRef,
				close: () => setSelected(null),
				verify,
				working,
				viewer: data?.viewer.email ?? ""
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-toast",
				role: "status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), notice]
			})
		]
	});
}
function CircuitForm({ draft, setDraft, devices, working, submit, close }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel circuit-create",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "panel-kicker",
				children: "CIRCUIT INTAKE"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Register a device-linked carrier service" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The record remains pending until another operator verifies collected evidence for the interface." })
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "secondary-button",
			onClick: close,
			children: "Cancel"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Circuit name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					minLength: 6,
					value: draft.name,
					onChange: (event) => setDraft({
						...draft,
						name: event.target.value
					}),
					placeholder: "Provider service name…"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Provider" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					minLength: 2,
					value: draft.provider,
					onChange: (event) => setDraft({
						...draft,
						provider: event.target.value
					}),
					placeholder: "Carrier or upstream…"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Service type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: draft.serviceType,
					onChange: (event) => setDraft({
						...draft,
						serviceType: event.target.value
					}),
					children: [
						"Internet",
						"IP Transit",
						"Metro Ethernet",
						"Wavelength",
						"IX Access",
						"MPLS",
						"Private Line",
						"Wireless Backhaul"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: item }, item))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Registered device" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					required: true,
					value: draft.deviceId,
					onChange: (event) => setDraft({
						...draft,
						deviceId: event.target.value
					}),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Select device…"
					}), devices.map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: device.id,
						children: [
							device.hostname,
							" · ",
							device.site ?? "Unassigned"
						]
					}, device.id))]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Monitored interface" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: draft.interfaceName,
					onChange: (event) => setDraft({
						...draft,
						interfaceName: event.target.value
					}),
					placeholder: "ether5, sfp-sfpplus1…"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Endpoint label" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					minLength: 3,
					value: draft.endpointLabel,
					onChange: (event) => setDraft({
						...draft,
						endpointLabel: event.target.value
					}),
					placeholder: "Site or handoff location…"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contracted capacity (Mbps)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					min: "0.001",
					step: "0.001",
					type: "number",
					value: draft.capacityMbps,
					onChange: (event) => setDraft({
						...draft,
						capacityMbps: event.target.value
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SLA objective (%)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					min: "90",
					max: "100",
					step: "0.01",
					type: "number",
					value: draft.slaTargetPct,
					onChange: (event) => setDraft({
						...draft,
						slaTargetPct: event.target.value
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Monthly commitment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					min: "0",
					step: "0.01",
					type: "number",
					value: draft.monthlyCommit,
					onChange: (event) => setDraft({
						...draft,
						monthlyCommit: event.target.value
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Currency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: draft.currency,
					onChange: (event) => setDraft({
						...draft,
						currency: event.target.value
					}),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "TZS" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "USD" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "EUR" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Renewal date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: draft.renewalAt,
					onChange: (event) => setDraft({
						...draft,
						renewalAt: event.target.value
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contract reference" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: draft.contractReference,
					onChange: (event) => setDraft({
						...draft,
						contractReference: event.target.value
					}),
					placeholder: "Reference only; no document upload"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "circuit-form-wide",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Operational description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						minLength: 20,
						value: draft.description,
						onChange: (event) => setDraft({
							...draft,
							description: event.target.value
						}),
						placeholder: "Purpose, path, handoff and operational ownership…"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "circuit-form-wide",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No credentials, provider messages, BGP changes or device configuration are created." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "primary-button",
							disabled: working === "create",
							children: working === "create" ? "Registering…" : "Register for verification"
						})
					]
				})
			]
		})]
	});
}
function Overview({ circuits, attention, setSelected, setTab }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "carrier-overview",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel carrier-focus",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
					kicker: "CONNECTIVITY EVIDENCE",
					title: "Items requiring operator review",
					copy: "Only stored circuit metadata and collected observations are listed."
				}),
				attention.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSelected(item),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `carrier-issue-icon carrier-${item.health === "Down" ? "critical" : "warning"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 17 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							item.status.replaceAll("_", " "),
							" · ",
							item.health,
							" · ",
							item.interfaceEvidence.sampleCount,
							" interface samples"
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { value: item.health }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
					]
				}, item.id)),
				!attention.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					icon: CircleCheck,
					title: circuits.length ? "No circuit requires review" : "No circuit registered",
					copy: circuits.length ? "Every active record has valid current observations within the configured evidence boundary." : "Register a real carrier service and link it to a monitored device interface."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel carrier-cost",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head, {
					kicker: "SAFETY BOUNDARY",
					title: "External actions remain disabled",
					copy: "This workspace records and assesses evidence; it does not control providers or routers."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "circuit-control-list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Independent activation" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Current status required" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 15 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "BGP session collection" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Not commissioned" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 15 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Automatic SLA claims" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Disabled" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cable, { size: 15 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Network configuration" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Disabled" })
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "secondary-button",
					onClick: () => setTab("Circuits"),
					children: "Review register"
				})
			]
		})]
	});
}
function Head({ kicker, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "carrier-head",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: kicker }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy })
		] })
	});
}
function Summary({ icon: Icon, tone, label, value, meta, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
		className: "carrier-summary-card",
		onClick,
		tone,
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }),
		label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: label }),
		value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: value }),
		detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: meta }) })
	});
}
function Toolbar({ query, setQuery, state, setState, checkedAt }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "carrier-toolbar",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "carrier-search",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search circuit, provider or endpoint…",
						"aria-label": "Search circuit register"
					}),
					query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setQuery(""),
						"aria-label": "Clear search",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "carrier-select",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: state,
					onChange: (event) => setState(event.target.value),
					"aria-label": "Filter circuit state",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All states" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "active",
							children: "Active"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "pending_verification",
							children: "Pending verification"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "retired",
							children: "Retired"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 13 })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "carrier-synced",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 12 }), checkedAt ? `Checked ${formatDate(checkedAt)}` : "Loading evidence…"]
			})
		]
	});
}
function CircuitTable({ data, setSelected, commercial = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "carrier-table-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "carrier-table",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Circuit" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "State" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Provider / type" }),
				commercial ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Monthly" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Renewal" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Owner" })
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Capacity" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Utilization" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Current RX / TX" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Evidence" })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "carrier-identity",
					onClick: () => setSelected(item),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cable, { size: 15 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						item.circuitNumber,
						" · ",
						item.endpointLabel
					] })] })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { value: item.status }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.provider }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
					className: "carrier-cell-meta",
					children: [
						item.serviceType,
						" · ",
						item.device?.hostname ?? "Unknown device",
						"/",
						item.interfaceName
					]
				})] }),
				commercial ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatCurrency(item.monthlyCommitMinor, item.currency) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDate(item.renewalAt) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.ownerEmail })
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatBps(item.capacityBps) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, { value: item.utilizationPct }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
						formatBps(item.interfaceEvidence.currentRxBps),
						" / ",
						formatBps(item.interfaceEvidence.currentTxBps)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [item.interfaceEvidence.sampleCount, " samples"] })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "row-action",
					onClick: () => setSelected(item),
					"aria-label": `Inspect ${item.name}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
				}) })
			] }, item.id)) })]
		}), !data.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			icon: Search,
			title: "No circuit records found",
			copy: "Register a production carrier service or adjust the current filters."
		})]
	});
}
function CircuitDrawer({ item, closeRef, close, verify, working, viewer }) {
	const canVerify = item.status === "pending_verification" && item.createdBy !== viewer;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "carrier-layer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "drawer-scrim",
			"aria-label": "Close circuit details",
			onClick: close
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "carrier-drawer",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "circuit-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "drawer-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "PERSISTENT CIRCUIT RECORD" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "circuit-title",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							item.circuitNumber,
							" · ",
							item.provider
						] })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						ref: closeRef,
						onClick: close,
						"aria-label": "Close circuit details",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "carrier-drawer-hero",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cable, { size: 19 }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Current evidence posture" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.health }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								formatBps(item.capacityBps),
								" · ",
								item.interfaceEvidence.sampleCount,
								" interface samples"
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { value: item.status })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "carrier-description",
					children: item.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Service, evidence & commercial record" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "carrier-details",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Device / interface" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
							item.device?.hostname ?? item.deviceId,
							" / ",
							item.interfaceName
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Endpoint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.endpointLabel })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Observed availability" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.availabilityEvidence.observedAvailabilityPct === null ? "Insufficient evidence" : `${item.availabilityEvidence.observedAvailabilityPct.toFixed(3)}%` })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "SLA objective" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [(item.slaTargetBps / 100).toFixed(2), "% · no automatic claim"] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Observed RX / TX" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
							formatBps(item.interfaceEvidence.currentRxBps),
							" / ",
							formatBps(item.interfaceEvidence.currentTxBps)
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Observed P95 RX / TX" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
							formatBps(item.interfaceEvidence.p95RxBps),
							" / ",
							formatBps(item.interfaceEvidence.p95TxBps)
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Monthly commitment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatCurrency(item.monthlyCommitMinor, item.currency) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Renewal date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(item.renewalAt) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Created by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.createdBy })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Verified by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.verifiedBy ?? "Pending independent verification" })] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "carrier-safety",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Read-only operational evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Activation changes only the NOCX record. It does not change the interface, open a provider ticket or send a contractual claim." })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "carrier-drawer-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "secondary-button",
						onClick: close,
						children: "Close"
					}), item.status === "pending_verification" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						onClick: () => void verify(),
						disabled: !canVerify || working === "verify",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), working === "verify" ? "Verifying…" : canVerify ? "Verify & activate" : "Independent operator required"]
					})]
				})
			]
		})]
	});
}
function Meter({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "carrier-meter",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value === null ? "—" : `${value}%` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: value === null ? "No evidence" : value >= 85 ? "Review" : "Observed" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
			className: (value ?? 0) >= 85 ? "meter-critical" : "",
			style: { width: `${Math.min(100, value ?? 0)}%` }
		}) })]
	});
}
function Badge({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `carrier-badge badge-${slug(value)}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), value.replaceAll("_", " ")]
	});
}
function Empty({ icon: Icon, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "carrier-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 24 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy })
		]
	});
}
//#endregion
export { CircuitProviderManagement as default };
