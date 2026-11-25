import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region app/customer-access/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function CustomerAccess() {
	const [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [success, setSuccess] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [accountId, setAccountId] = (0, import_react.useState)(""), [customerId, setCustomerId] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		setData(null);
		try {
			const r = await fetch("/api/platform/customer-access", { cache: "no-store" }), b = await r.json();
			if (!r.ok) throw new Error(b.error || "Access management unavailable");
			setData(b);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Access management unavailable");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		queueMicrotask(() => void load());
	}, [load]);
	async function change(action, id) {
		if (busy || !data) return;
		setBusy(true);
		setError("");
		setSuccess("");
		try {
			const r = await fetch("/api/platform/customer-access", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action,
					accountId: id,
					customerId
				})
			}), b = await r.json();
			if (!r.ok) throw new Error(b.error || "Change failed");
			setSuccess(action === "grant" ? "Customer account linked." : "Customer access revoked.");
			await load();
			setAccountId("");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Change failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "customer-portal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "portal-brand",
				href: "/",
				children: "NOC-X"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				children: "Operator console"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/customer",
				children: "Customer portal"
			})] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "portal-eyebrow",
						children: "ACCOUNT ACCESS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Customer memberships" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Customers sign in at /customer and provide their account ID. Link each verified account to its customer record." })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: error
			}),
			success && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: success
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Customer", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: customerId,
						onChange: (e) => setCustomerId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Select customer"
						}), data?.customers.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: c.id,
							children: [
								c.name,
								" · ",
								c.accountNumber
							]
						}, c.id))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Customer's account ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: accountId,
						onChange: (e) => setAccountId(e.target.value),
						placeholder: "Copy from the customer's signed-in portal"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy || !data || !customerId || !accountId.trim(),
						onClick: () => void change("grant", accountId),
						children: "Grant customer access"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Requires users.manage permission. Temporary operator keys cannot grant customer access." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/signin-with-chatgpt?return_to=%2Fcustomer-access",
						target: "_top",
						children: "Sign in with your administrator account"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Existing memberships" }),
					data?.members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "portal-history",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								m.customerName,
								" · ",
								m.status
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: m.accountId }),
							m.status === "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: busy,
								onClick: () => {
									if (window.confirm(`Revoke customer portal access for ${m.customerName}?`)) change("revoke", m.accountId);
								},
								children: "Revoke access"
							})
						]
					}, m.accountId)),
					data && !data.members.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No customer memberships yet." }),
					data?.truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This list is limited. Refine access through the administrator before provisioning omitted accounts." })
				]
			})
		]
	});
}
//#endregion
export { CustomerAccess as default };
