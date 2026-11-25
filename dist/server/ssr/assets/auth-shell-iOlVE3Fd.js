import { t as require_jsx_runtime } from "../index.js";
import { n as ShieldCheck, r as Activity, t as Network } from "./network-CaMqMjRB.js";
import { n as BellRing } from "./circle-alert-fwvsmlmG.js";
//#region app/auth-shell.tsx
var import_jsx_runtime = require_jsx_runtime();
function Brand({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		className: "auth-brand " + (className ?? ""),
		href: "/login",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "auth-brand-mark",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, {
				size: 21,
				strokeWidth: 2.4,
				color: "#fff"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "NOC-X" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Network Operations" })] })]
	});
}
/** Two-column layout shared by sign in, sign out, password change and owner setup. */
function AuthShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "auth-page",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "auth-aside",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-pitch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your whole network, one calm view." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Monitor routers and links, respond to incidents and keep customers informed from a single operations workspace." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "auth-points",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 15 }) }), "Live availability and performance"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { size: 15 }) }), "Incidents with customer impact"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 15 }) }), "Role-based access for every operator"] })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "auth-main",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "auth-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { className: "auth-mobile-brand" }),
					children,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "auth-footer",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" NOC-X Network Operations Center"
						]
					})
				]
			})
		})]
	});
}
//#endregion
export { AuthShell as t };
