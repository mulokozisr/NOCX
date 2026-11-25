import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon, n as ShieldCheck } from "./network-CaMqMjRB.js";
import { d as TriangleAlert, l as Clock3, u as X } from "./settings-BHhlqS1D.js";
import { t as SummaryCard } from "./summary-card-DeZU_QQz.js";
import { t as RefreshCw } from "./refresh-cw-C8GJH9XS.js";
import { t as Search } from "./search-sutoz6q6.js";
import { t as Users } from "./users-BADfTVSw.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as ChevronRight } from "./chevron-right-Cag9IPDE.js";
import { t as FileCheck2 } from "./file-check-2-Bo8ysJZD.js";
import { t as Megaphone } from "./megaphone-ajqBvq5v.js";
//#region node_modules/lucide-react/dist/esm/icons/languages.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Languages = createLucideIcon("Languages", [
	["path", {
		d: "m5 8 6 6",
		key: "1wu5hv"
	}],
	["path", {
		d: "m4 14 6-6 2-3",
		key: "1k1g8d"
	}],
	["path", {
		d: "M2 5h12",
		key: "or177f"
	}],
	["path", {
		d: "M7 2h1",
		key: "1t2jsx"
	}],
	["path", {
		d: "m22 22-5-10-5 10",
		key: "don7ne"
	}],
	["path", {
		d: "M14 18h6",
		key: "1m8k6r"
	}]
]);
//#endregion
//#region app/service-communications.css
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region app/service-communications.tsx
var import_jsx_runtime = require_jsx_runtime();
var channelOptions = [
	["customer_status_page", "Customer status page"],
	["support_desk_brief", "Support desk brief"],
	["noc_handover", "NOC handover"],
	["internal_status_board", "Internal status board"]
];
function channelLabel(value) {
	return channelOptions.find(([key]) => key === value)?.[1] ?? value.replaceAll("_", " ");
}
function due(minutes = 30) {
	const value = new Date(Date.now() + minutes * 6e4);
	value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
	return value.toISOString().slice(0, 16);
}
function time(value) {
	if (!value) return "No command update";
	const parsed = Date.parse(value), delta = parsed - Date.now();
	if (!Number.isFinite(parsed)) return "Unknown";
	const minutes = Math.round(Math.abs(delta) / 6e4);
	if (minutes < 1) return delta >= 0 ? "due now" : "updated now";
	if (minutes < 60) return delta >= 0 ? `in ${minutes} min` : `${minutes} min ago`;
	return new Date(value).toLocaleString();
}
function validFutureDue(value) {
	const timestamp = Date.parse(value);
	return Number.isFinite(timestamp) && timestamp > Date.now() && timestamp <= Date.now() + 2880 * 6e4;
}
function ServiceCommunications() {
	const [data, setData] = (0, import_react.useState)(null), [selectedId, setSelectedId] = (0, import_react.useState)(""), [query, setQuery] = (0, import_react.useState)(""), [loading, setLoading] = (0, import_react.useState)(true), [busy, setBusy] = (0, import_react.useState)(false), [error, setError] = (0, import_react.useState)(""), [notice, setNotice] = (0, import_react.useState)(""), [showIntake, setShowIntake] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		majorIncidentId: "",
		audience: "",
		ownerEmail: "",
		customerMessage: "",
		internalContext: "",
		updateDueAt: due(),
		intendedChannels: ["customer_status_page", "support_desk_brief"]
	});
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		setData(null);
		setSelectedId("");
		setShowIntake(false);
		try {
			const response = await fetch("/api/platform/service-communications", { cache: "no-store" }), payload = await response.json();
			if (!response.ok) throw new Error(payload.error ?? "Service communication evidence is unavailable");
			setData(payload);
			setSelectedId((current) => current && payload.records.some((row) => row.id === current) ? current : payload.records[0]?.id ?? "");
			setForm((current) => ({
				...current,
				majorIncidentId: current.majorIncidentId || payload.activeMajors[0]?.id || "",
				ownerEmail: current.ownerEmail || payload.operators[0]?.email || ""
			}));
		} catch (caught) {
			setData(null);
			setSelectedId("");
			setError(caught instanceof Error ? caught.message : "Service communication evidence is unavailable");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = window.setTimeout(() => void load(), 0);
		return () => window.clearTimeout(timer);
	}, [load]);
	const filtered = (0, import_react.useMemo)(() => (data?.records ?? []).filter((row) => `${row.communicationNumber} ${row.incident?.title ?? ""} ${row.audience} ${row.ownerEmail}`.toLowerCase().includes(query.toLowerCase())), [data, query]);
	const selected = (data?.records ?? []).find((row) => row.id === selectedId) ?? null;
	const announce = (message) => {
		setNotice(message);
		window.setTimeout(() => setNotice(""), 3200);
	};
	const mutate = async (method, body, success) => {
		setBusy(true);
		setError("");
		try {
			const response = await fetch("/api/platform/service-communications", {
				method,
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			}), payload = await response.json();
			if (!response.ok) throw new Error(payload.error ?? "Communication action failed");
			announce(success);
			await load();
			return true;
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Communication action failed");
			return false;
		} finally {
			setBusy(false);
		}
	};
	const create = async () => {
		if (await mutate("POST", {
			action: "create",
			...form,
			updateDueAt: new Date(form.updateDueAt).toISOString()
		}, "Communication draft created from the persistent command record.")) {
			setShowIntake(false);
			setForm((current) => ({
				...current,
				audience: "",
				customerMessage: "",
				internalContext: "",
				updateDueAt: due()
			}));
		}
	};
	const toggleChannel = (channel) => setForm((current) => ({
		...current,
		intendedChannels: current.intendedChannels.includes(channel) ? current.intendedChannels.filter((item) => item !== channel) : [...current.intendedChannels, channel]
	}));
	const canCreate = Boolean(data?.viewer.canAdmin && form.majorIncidentId && form.ownerEmail && form.audience.trim().length >= 5 && form.customerMessage.trim().length >= 20 && form.internalContext.trim().length >= 12 && form.intendedChannels.length && validFutureDue(form.updateDueAt));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "communications-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "communications-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Trace approved wording to an explicit dispatch state" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "module-context",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "About this view" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "OUTBOUND COMMUNICATION ASSURANCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Reconcile every accepted draft and independently approved revision with intended destinations, dispatch attempts and delivery receipts—without implying that an approved message was sent." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "communications-hero-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "secondary-button",
						onClick: () => void load(),
						disabled: loading,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
							className: loading ? "refresh-spin" : "",
							size: 15
						}), "Refresh"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "primary-button",
						onClick: () => setShowIntake(true),
						disabled: !data?.viewer.canAdmin || !data.activeMajors.length,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { size: 15 }), data && !data.viewer.canAdmin ? "Admin permission required" : "Prepare update"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "live-evidence-strip communications-boundary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Strict non-future command and approval evidence only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Future, invalid, malformed or incomplete incident, command, communication and approval chronology is excluded; stale evidence is never retained after a failed refresh." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), "External delivery off"] })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "communications-error",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 16 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setError(""),
						"aria-label": "Dismiss error",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "communications-summary nocx-summary-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Overdue accepted drafts" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? data.summary.overdueDrafts : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Strict stored due chronology" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approved / dispatch attempts" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? `${data.outboundAssurance.independentlyApprovedArtifacts} / ${data.outboundAssurance.dispatchAttempts}` : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Approval never implies delivery" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Delivery receipts" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? data.outboundAssurance.deliveryReceipts : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Required before delivered state" }) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						tone: "blue",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, {}),
						label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Rejected records / events" }),
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: loading ? "…" : data ? `${data.summary.rejectedRecords} / ${data.summary.rejectedCommunicationEvents}` : "Unavailable" }),
						detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Never counted as valid evidence" }) })
					})
				]
			}),
			showIntake && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel communication-intake",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "PERSISTENT COMMAND INTAKE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Prepare a controlled service update" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Intended destinations are recorded for review only; NOCX does not transmit the message." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "icon-button",
						onClick: () => setShowIntake(false),
						"aria-label": "Close communication intake",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "communication-form-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Major incident", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.majorIncidentId,
								onChange: (event) => setForm({
									...form,
									majorIncidentId: event.target.value
								}),
								children: (data?.activeMajors ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: row.id,
									children: [
										row.majorNumber,
										" · ",
										row.incident?.title ?? row.incidentId
									]
								}, row.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Draft owner", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.ownerEmail,
								onChange: (event) => setForm({
									...form,
									ownerEmail: event.target.value
								}),
								children: (data?.operators ?? []).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: row.email,
									children: [
										row.displayName,
										" · ",
										row.email
									]
								}, row.id))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Update due", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "datetime-local",
								value: form.updateDueAt,
								onChange: (event) => setForm({
									...form,
									updateDueAt: event.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "communication-wide",
								children: ["Audience", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: form.audience,
									onChange: (event) => setForm({
										...form,
										audience: event.target.value
									}),
									placeholder: "Affected customers, service group or internal team"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "communication-wide",
								children: ["Customer-safe update", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: form.customerMessage,
									onChange: (event) => setForm({
										...form,
										customerMessage: event.target.value
									}),
									placeholder: "State verified impact and current work without unsupported restoration promises…"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "communication-wide",
								children: ["Internal operator context", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: form.internalContext,
									onChange: (event) => setForm({
										...form,
										internalContext: event.target.value
									}),
									placeholder: "Record technical context that must not appear in customer wording…"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "communication-channels",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Intended destinations — no automatic sending" }), channelOptions.map(([key, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: form.intendedChannels.includes(key),
							onChange: () => toggleChannel(key)
						}), text] }, key))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "communication-form-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "secondary-button",
							onClick: () => setShowIntake(false),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "primary-button",
							disabled: !canCreate || busy,
							onClick: () => void create(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { size: 14 }), busy ? "Creating…" : "Create draft"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "communications-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel communications-register",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "panel-kicker",
							children: "STRICT COMMUNICATION REGISTER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Controlled status updates" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Only records with accepted source, ownership, timestamp and event chronology are visible." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search updates…",
						"aria-label": "Search service communications",
						disabled: !data
					})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "communications-list",
						children: [
							filtered.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: selected?.id === row.id ? "active" : "",
								onClick: () => setSelectedId(row.id),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `communication-state ${row.status}`,
										children: row.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
											row.communicationNumber,
											" · ",
											row.majorIncident?.majorNumber ?? row.incidentId
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.incident?.title ?? row.incidentId }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
											row.audience,
											" · due ",
											time(row.updateDueAt)
										] })
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
								]
							}, row.id)),
							!loading && data && !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "communications-empty",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { size: 24 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "No accepted communication records" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: query ? "No accepted communication matches this search." : "Prepare an update from strict active major-incident chronology when verified wording is required." })
								]
							}),
							!loading && !data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "communications-empty",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { size: 24 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Communication register unavailable" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No count, record, source or mutation control is inferred while strict evidence cannot be loaded." })
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
					className: "panel communication-detail",
					children: selected && data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunicationDetail, {
						record: selected,
						busy,
						mutate,
						viewer: data.viewer
					}, `${selected.id}:${selected.updatedAt}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "communications-empty communication-detail-empty",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 28 }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data ? "No update selected" : loading ? "Loading strict evidence" : "Command evidence unavailable" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data ? "Accepted approved wording and drafts will appear here without demonstration records." : "Details and actions remain unavailable until the strict service-communication register loads successfully." })
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel communications-governance",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "panel-kicker",
					children: "STRICT COMMUNICATION SAFEGUARDS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Chronological, independent and deliberately unsent" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Technical facts require a valid, non-future update from a currently assigned major-incident command role."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "The active draft owner alone may edit; a different active operator must approve and freeze the exact wording."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Future, invalid and incomplete evidence is excluded. External email, SMS, WhatsApp, Slack and status-page delivery remain disabled."] })
				] })]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "app-toast",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), notice]
			})
		]
	});
}
function CommunicationDetail({ record, busy, mutate, viewer }) {
	const [draft, setDraft] = (0, import_react.useState)({
		audience: record.audience,
		customerMessage: record.customerMessage,
		internalContext: record.internalContext,
		updateDueAt: (() => {
			const value = new Date(record.updateDueAt);
			value.setMinutes(value.getMinutes() - value.getTimezoneOffset());
			return value.toISOString().slice(0, 16);
		})(),
		intendedChannels: [...record.intendedChannels]
	});
	const editable = record.status === "draft";
	const toggle = (channel) => setDraft((current) => ({
		...current,
		intendedChannels: current.intendedChannels.includes(channel) ? current.intendedChannels.filter((item) => item !== channel) : [...current.intendedChannels, channel]
	}));
	const body = () => ({
		id: record.id,
		...draft,
		updateDueAt: new Date(draft.updateDueAt).toISOString()
	});
	const dueAccepted = validFutureDue(draft.updateDueAt), canSave = editable && viewer.canAdmin && record.commandSourceActive && viewer.email === record.ownerEmail && dueAccepted, canApprove = editable && viewer.canAdmin && record.commandSourceActive && viewer.email !== record.ownerEmail && record.commandEvidenceFresh && dueAccepted;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "panel-kicker",
				children: editable ? "STRICT DRAFT APPROVAL RECORD" : "IMMUTABLE APPROVED WORDING"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: record.incident?.title ?? record.incidentId }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				record.communicationNumber,
				" · Active owner: ",
				record.ownerEmail
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "communication-meta",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Major incident" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: record.majorIncident?.majorNumber ?? record.majorIncidentId })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Update due" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: time(record.updateDueAt) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Command evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: record.commandEvidenceFresh ? `${record.commandEvidenceAgeMinutes} min old` : record.commandSourceActive ? "Missing or stale" : "Command source closed" })] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Audience" }), editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: draft.audience,
			onChange: (event) => setDraft({
				...draft,
				audience: event.target.value
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: record.audience })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Customer-safe update" }), editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			className: "customer-copy",
			value: draft.customerMessage,
			onChange: (event) => setDraft({
				...draft,
				customerMessage: event.target.value
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "customer-copy",
			children: record.customerMessage
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Internal operator context" }), editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value: draft.internalContext,
			onChange: (event) => setDraft({
				...draft,
				internalContext: event.target.value
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: record.internalContext })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "communication-evidence",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Intended destinations" }), editable ? channelOptions.map(([key, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "checkbox",
				checked: draft.intendedChannels.includes(key),
				onChange: () => toggle(key)
			}), text] }, key)) : record.intendedChannels.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 13 }), channelLabel(channel)] }, channel))] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Accepted evidence timeline" }), record.events.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: new Date(item.createdAt).toLocaleString() }),
				item.body,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.actorEmail })
			] }, item.id))] })]
		}),
		editable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "communication-due-edit",
			children: ["Future due time within 48 hours", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "datetime-local",
				value: draft.updateDueAt,
				onChange: (event) => setDraft({
					...draft,
					updateDueAt: event.target.value
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: `communication-command-evidence ${record.commandEvidenceFresh ? "fresh" : "stale"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Latest accepted assigned-role command evidence" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: record.latestCommandUpdate?.body ?? "No accepted status update has been recorded" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: record.latestCommandUpdate ? `${time(record.latestCommandUpdate.createdAt)} · ${record.latestCommandUpdate.actorEmail}` : "Approval remains blocked until a recent assigned-role update exists." })
			] })]
		}),
		editable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "communication-actions",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "secondary-button",
				disabled: busy || !canSave,
				onClick: () => void mutate("PATCH", {
					action: "save",
					...body()
				}, "Communication draft saved without external delivery."),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 14 }), !viewer.canAdmin ? "Admin permission required" : viewer.email !== record.ownerEmail ? "Assigned owner required" : !dueAccepted ? "Valid future due required" : "Save draft"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "primary-button",
				disabled: busy || !canApprove,
				onClick: () => void mutate("PATCH", {
					action: "approve",
					...body()
				}, "Communication wording independently approved and locked."),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheck2, { size: 14 }), !viewer.canAdmin ? "Admin permission required" : viewer.email === record.ownerEmail ? "Independent operator required" : !record.commandEvidenceFresh ? "Fresh command update required" : !dueAccepted ? "Valid future due required" : "Approve wording"]
			})]
		}),
		!editable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "communication-immutable",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }),
				"Approved by ",
				record.approvedBy,
				" at ",
				record.approvedAt ? new Date(record.approvedAt).toLocaleString() : "unknown time",
				". This evidence-linked wording is immutable and was not sent by NOCX."
			]
		})
	] });
}
//#endregion
export { ServiceCommunications as default };
