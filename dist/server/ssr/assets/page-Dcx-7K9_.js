import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon } from "./network-CaMqMjRB.js";
import { t as CircleAlert } from "./circle-alert-fwvsmlmG.js";
import { t as CircleCheck } from "./circle-check-BoBsLU8l.js";
import { t as AuthShell } from "./auth-shell-iOlVE3Fd.js";
//#region node_modules/lucide-react/dist/esm/icons/log-out.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LogOut = createLucideIcon("LogOut", [
	["path", {
		d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1uf3rs"
	}],
	["polyline", {
		points: "16 17 21 12 16 7",
		key: "1gabdz"
	}],
	["line", {
		x1: "21",
		x2: "9",
		y1: "12",
		y2: "12",
		key: "1uyos4"
	}]
]);
//#endregion
//#region app/logout/page.tsx
var import_jsx_runtime = require_jsx_runtime();
function Logout() {
	const [error, setError] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [done, setDone] = (0, import_react.useState)(false);
	async function logout() {
		setBusy(true);
		setError("");
		try {
			if (!(await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: "{}"
			})).ok) throw new Error("Sign-out failed. Try again.");
			setDone(true);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Sign-out failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthShell, { children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "auth-icon-badge done",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 22 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "auth-kicker",
			children: "Signed out"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "You're signed out" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "auth-lead",
			children: "Your NOC-X session has ended on this device. Close the browser if this is a shared computer."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "primary-button auth-submit",
			href: "/login",
			children: "Sign in again"
		})
	] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "auth-icon-badge",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 22 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "auth-kicker",
			children: "Account"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Sign out of NOC-X" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "auth-lead",
			children: "You'll need your username and password to sign in again."
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "auth-alert",
			role: "alert",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 16 }), error]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "primary-button auth-submit",
			disabled: busy,
			onClick: () => void logout(),
			children: busy ? "Signing out…" : "Sign out"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "auth-links",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				children: "Back to operations"
			})
		})
	] }) });
}
//#endregion
export { Logout as default };
