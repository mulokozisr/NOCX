import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/customer/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CustomerPortal() {
	const [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [loading, setLoading] = (0, import_react.useState)(true), [signIn, setSignIn] = (0, import_react.useState)(false);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError("");
		setData(null);
		try {
			const r = await fetch("/api/customer/overview", { cache: "no-store" }), b = await r.json();
			setSignIn(r.status === 401);
			if (!r.ok) throw new Error(b.error || "Service data unavailable");
			setData(b);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Service data unavailable");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		let active = true;
		queueMicrotask(() => {
			if (active) load();
		});
		const timer = window.setInterval(() => void load(), 3e4);
		return () => {
			active = false;
			window.clearInterval(timer);
		};
	}, [load]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "customer-portal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "portal-brand",
				href: "/customer",
				children: "NOC-X"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				children: "Operator console"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/signout-with-chatgpt?return_to=%2Fcustomer",
				target: "_top",
				children: "Sign out"
			})] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "portal-eyebrow",
						children: "CUSTOMER PORTAL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: data?.customerName ? `Welcome, ${data.customerName}` : "Your services, clearly" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Review your service plans, monitored devices and recorded interruptions." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => void load(),
						disabled: loading,
						children: loading ? "Loading…" : "Refresh"
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-card",
				role: "alert",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: signIn ? "Sign in to continue" : "Data unavailable" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }),
					signIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "portal-button",
						href: "/signin-with-chatgpt?return_to=%2Fcustomer",
						target: "_top",
						children: "Sign in with ChatGPT"
					})
				]
			}),
			data?.access === "unassigned" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Link your customer account" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.message }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Your account ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						readOnly: true,
						value: data.accountId
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Send this ID to your network administrator. It identifies your account; it is not a password." })
				]
			}),
			data?.access === "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "portal-time",
					children: [
						"Updated ",
						new Date(data.checkedAt).toLocaleString(),
						". Device readings older than three minutes show Unknown. ",
						data.truncated && "Some records are omitted; contact support for a complete history."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "portal-grid",
					children: data.services?.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "portal-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "portal-eyebrow",
								children: service.serviceCode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: service.siteName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: service.planName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Monitored devices" }),
							data.devices?.filter((d) => d.serviceId === service.id).map((device) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "portal-device",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: device.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: device.observedAt ? new Date(device.observedAt).toLocaleString() : "No observation" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										"Latency ",
										device.latencyMs === null ? "—" : `${device.latencyMs} ms`,
										" · Packet loss ",
										device.packetLossPct === null ? "—" : `${device.packetLossPct}%`
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: device.qualityReason })
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: `portal-status ${device.status}`,
									children: device.status === "online" ? "Online" : device.status === "offline" ? "Offline" : "Unknown"
								})]
							}, device.id)),
							!data.devices?.some((d) => d.serviceId === service.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No device monitoring is mapped to this service yet." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Device reachability does not measure internet speed or prove end-to-end service availability." })
						]
					}, service.id))
				}),
				!data.services?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "portal-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No active services" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your administrator can link a service and site to this customer account." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "portal-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Recorded service interruptions" }),
						data.history?.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "portal-history",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [item.serviceCode, " · Service interruption"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									item.status,
									" · ",
									item.severity
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									"Started ",
									new Date(item.openedAt).toLocaleString(),
									item.resolvedAt ? ` · Recovered ${new Date(item.resolvedAt).toLocaleString()}` : ""
								] })
							]
						}, index)),
						!data.history?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No interruptions are linked to your services in the returned history." })
					]
				})
			] })
		]
	});
}
//#endregion
export { CustomerPortal as default };
