import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { i as createLucideIcon } from "./network-CaMqMjRB.js";
import { t as KeyRound } from "./key-round-CSmhIP5z.js";
import { t as CircleAlert } from "./circle-alert-fwvsmlmG.js";
import { t as AuthShell } from "./auth-shell-iOlVE3Fd.js";
//#region node_modules/lucide-react/dist/esm/icons/log-in.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LogIn = createLucideIcon("LogIn", [
	["path", {
		d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",
		key: "u53s6r"
	}],
	["polyline", {
		points: "10 17 15 12 10 7",
		key: "1ail0h"
	}],
	["line", {
		x1: "15",
		x2: "3",
		y1: "12",
		y2: "12",
		key: "v6grx8"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/shield-plus.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShieldPlus = createLucideIcon("ShieldPlus", [
	["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}],
	["path", {
		d: "M9 12h6",
		key: "1c52cq"
	}],
	["path", {
		d: "M12 9v6",
		key: "199k2o"
	}]
]);
//#endregion
//#region app/auth-form.tsx
var import_jsx_runtime = require_jsx_runtime();
function PasswordField({ label, value, onChange, autoComplete, minLength }) {
	const [visible, setVisible] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "auth-field",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "auth-password",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: visible ? "text" : "password",
				required: true,
				minLength,
				maxLength: 128,
				autoComplete,
				value,
				onChange: (e) => onChange(e.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setVisible((v) => !v),
				"aria-label": visible ? "Hide password" : "Show password",
				children: visible ? "Hide" : "Show"
			})]
		})]
	});
}
function AuthForm({ mode }) {
	const [username, setUsername] = (0, import_react.useState)(""), [password, setPassword] = (0, import_react.useState)(""), [newPassword, setNewPassword] = (0, import_react.useState)(""), [confirmation, setConfirmation] = (0, import_react.useState)(""), [setupCode, setSetupCode] = (0, import_react.useState)(""), [error, setError] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false);
	const setup = mode === "owner-setup", change = mode === "change-password";
	const [setupReady, setSetupReady] = (0, import_react.useState)(!setup);
	(0, import_react.useEffect)(() => {
		if (!setup) return;
		fetch("/api/auth/owner-setup", { cache: "no-store" }).then(async (r) => {
			const b = await r.json();
			if (!r.ok) throw new Error(b.error);
			if (b.configured) {
				setError("Owner login is already configured. Use the sign-in page.");
				return;
			}
			if (!b.setupAvailable) throw new Error("Owner setup is unavailable or the setup code has expired. Contact the platform maintainer.");
			setSetupReady(true);
		}).catch((e) => setError(e instanceof Error ? e.message : "Owner setup is unavailable"));
	}, [setup]);
	async function submit(e) {
		e.preventDefault();
		setError("");
		if ((setup ? password : change ? newPassword : null) !== null && confirmation !== (setup ? password : newPassword)) {
			setError("The new passwords do not match.");
			return;
		}
		setBusy(true);
		try {
			const r = await fetch(`/api/auth/${mode}`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					username,
					password,
					setupCode,
					currentPassword: password,
					newPassword
				})
			}), b = await r.json();
			if (!r.ok) throw new Error(b.error || "Request failed");
			setPassword("");
			setNewPassword("");
			setConfirmation("");
			setSetupCode("");
			window.location.assign(b.mustChangePassword ? "/change-password" : "/");
		} catch (e) {
			setError(e instanceof Error ? e.message : "Request failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "auth-icon-badge",
			"aria-hidden": "true",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(setup ? ShieldPlus : change ? KeyRound : LogIn, { size: 22 })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "auth-kicker",
			children: setup ? "First-time setup" : change ? "Account security" : "Welcome back"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: setup ? "Set up owner login" : change ? "Change your password" : "Sign in to NOC-X" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "auth-lead",
			children: setup ? "Choose the owner's independent username and password. Setup is available once with the private setup code." : change ? "Temporary passwords must be replaced before accessing operations." : "Use the username and password provided by your NOC-X administrator."
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "auth-alert",
			role: "alert",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 16 }), error]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "auth-form",
			onSubmit: (e) => void submit(e),
			children: [
				setup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "auth-field",
					children: ["Owner setup code", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						required: true,
						autoComplete: "off",
						value: setupCode,
						onChange: (e) => setSetupCode(e.target.value)
					})]
				}),
				!change && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "auth-field",
					children: ["Username", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						autoComplete: "username",
						autoCapitalize: "none",
						spellCheck: false,
						minLength: 3,
						maxLength: 40,
						value: username,
						onChange: (e) => setUsername(e.target.value),
						autoFocus: !setup
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
					label: change ? "Current password" : setup ? "New owner password" : "Password",
					value: password,
					onChange: setPassword,
					autoComplete: setup ? "new-password" : "current-password",
					minLength: setup ? 12 : void 0
				}),
				change && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
					label: "New password",
					value: newPassword,
					onChange: setNewPassword,
					autoComplete: "new-password",
					minLength: 12
				}),
				(setup || change) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
					label: "Confirm new password",
					value: confirmation,
					onChange: setConfirmation,
					autoComplete: "new-password",
					minLength: 12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "primary-button auth-submit",
					disabled: busy || !setupReady,
					children: busy ? "Please wait…" : setup ? "Activate owner login" : change ? "Save new password" : "Sign in"
				})
			]
		}),
		(setup || change) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "auth-hint",
			children: "Use 12–128 characters. A longer, unique passphrase is recommended."
		}),
		!setup && !change && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "auth-hint",
			children: "Forgot your password? Ask your administrator to set a new temporary password."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "auth-links",
			children: [
				!setup && !change && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/owner-setup",
					children: "First owner setup"
				}),
				change && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					children: "Back to operations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/logout",
					children: "Sign out"
				})] }),
				setup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/login",
					children: "Back to sign in"
				})
			]
		})
	] });
}
//#endregion
export { AuthForm };
