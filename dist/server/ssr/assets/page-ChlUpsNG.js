import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { t as RoleGuide } from "./role-guide-C4UVtxdY.js";
//#region app/roles/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function Roles() {
	const [configuration, setConfiguration] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		fetch("/api/platform/role-definitions", { cache: "no-store" }).then(async (r) => {
			const b = await r.json();
			if (!r.ok) throw new Error(b.error || "Role configuration unavailable");
			setConfiguration(b.configuration);
		}).catch((e) => setError(e instanceof Error ? e.message : "Role configuration unavailable"));
	}, []);
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
				href: "/staff",
				children: "Manage staff"
			})] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "portal-eyebrow",
						children: "STAFF HANDBOOK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Staff roles and scope of work" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The owner appoints administrators. Administrators manage staff; each staff role has a defined operational responsibility." })
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				role: "alert",
				children: [error, " Stored permissions could not be verified."]
			}),
			!error && !configuration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: "Checking role configuration…"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGuide, { configuration: configuration ?? void 0 })
		]
	});
}
//#endregion
export { Roles as default };
