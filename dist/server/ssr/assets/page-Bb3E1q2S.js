import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
import { r as scopedRoles } from "./site-scope-policy-DZDxhn5v.js";
import { r as OWNER_ROLE, t as RoleGuide } from "./role-guide-C4UVtxdY.js";
//#region app/staff/page.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function StaffManagement() {
	const [data, setData] = (0, import_react.useState)(null), [error, setError] = (0, import_react.useState)(""), [success, setSuccess] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false), [editing, setEditing] = (0, import_react.useState)(null), [email, setEmail] = (0, import_react.useState)(""), [name, setName] = (0, import_react.useState)(""), [roleId, setRoleId] = (0, import_react.useState)("role-noc-operator"), [status, setStatus] = (0, import_react.useState)("active"), [username, setUsername] = (0, import_react.useState)(""), [temporaryPassword, setTemporaryPassword] = (0, import_react.useState)(""), [siteScopeMode, setSiteScopeMode] = (0, import_react.useState)("all"), [siteIds, setSiteIds] = (0, import_react.useState)([]);
	const load = (0, import_react.useCallback)(async () => {
		setData(null);
		try {
			const r = await fetch("/api/platform/staff", { cache: "no-store" }), b = await r.json();
			if (!r.ok) throw new Error(b.error || "Staff management unavailable");
			setData(b);
		} catch (e) {
			setError(e instanceof Error ? e.message : "Staff management unavailable");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		queueMicrotask(() => void load());
	}, [load]);
	function clear() {
		setEditing(null);
		setEmail("");
		setName("");
		setRoleId("role-noc-operator");
		setStatus("active");
		setUsername("");
		setTemporaryPassword("");
		setSiteScopeMode("all");
		setSiteIds([]);
	}
	function edit(row) {
		setEditing(row);
		setEmail(row.email.endsWith("@nocx.internal") ? "" : row.email);
		setName(row.displayName);
		setRoleId(row.roleId);
		setStatus(row.status);
		setSiteScopeMode(row.siteScopeMode);
		setSiteIds(row.siteIds ?? []);
		setUsername(row.username ?? "");
		setTemporaryPassword("");
		setError("");
		setSuccess("");
	}
	async function save(e) {
		e.preventDefault();
		if (busy || !data) return;
		setBusy(true);
		setError("");
		setSuccess("");
		try {
			const r = await fetch("/api/platform/staff", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					action: editing ? "update" : "create",
					id: editing?.id,
					email,
					displayName: name,
					roleId,
					status,
					username,
					temporaryPassword,
					siteScopeMode: scopedRoles.includes(roleId) ? siteScopeMode : "all",
					siteIds: scopedRoles.includes(roleId) ? siteIds : []
				})
			}), b = await r.json();
			if (!r.ok) throw new Error(b.error || "Change failed");
			setSuccess(editing ? "Staff access updated." : "Staff registered. Give them their username and temporary password through your approved private channel.");
			clear();
			await load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "Change failed");
		} finally {
			setBusy(false);
		}
	}
	const owner = data?.actor.roleId === OWNER_ROLE;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "customer-portal",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				className: "portal-brand",
				href: "/",
				children: "NOC-X"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/",
				children: "Operator console"
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "portal-eyebrow",
						children: "STAFF ACCESS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Staff and roles" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The owner appoints administrators. Administrators manage staff. Staff cannot create accounts or promote themselves." })
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "/roles",
				children: "Open staff handbook and verified role configuration"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "View role responsibilities and limitations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGuide, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: editing ? "Edit staff access" : "Register staff" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => void save(e),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Display name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								maxLength: 100,
								value: name,
								onChange: (e) => setName(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Contact email (optional)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								maxLength: 254,
								disabled: !!editing,
								value: email,
								onChange: (e) => setEmail(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Username", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								minLength: 3,
								maxLength: 40,
								autoComplete: "off",
								disabled: !!editing?.username,
								value: username,
								onChange: (e) => setUsername(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [editing?.username ? "New temporary password (leave blank to keep current)" : "Temporary password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								required: !editing?.username,
								minLength: 12,
								maxLength: 128,
								autoComplete: "new-password",
								value: temporaryPassword,
								onChange: (e) => setTemporaryPassword(e.target.value)
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Role", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: roleId,
								onChange: (e) => setRoleId(e.target.value),
								children: data?.roles.filter((r) => r.id !== "role-platform-owner" && (owner || r.id !== "role-administrator")).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: r.id,
									children: r.name
								}, r.id))
							})] }),
							scopedRoles.includes(roleId) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", { children: "Site access" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Visibility", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: siteScopeMode,
									onChange: (e) => setSiteScopeMode(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "All sites"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "assigned",
										children: "Assigned sites only"
									})]
								})] }),
								siteScopeMode === "assigned" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Allowed sites", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									multiple: true,
									value: siteIds,
									onChange: (e) => setSiteIds([...e.target.selectedOptions].map((option) => option.value)),
									children: data?.sites.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: site.id,
										children: site.name
									}, site.id))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use Ctrl/Cmd to select multiple sites. No selection means no site data. Only observations since a device's latest site placement are visible. Changing access signs the user out." })] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Account status", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: status,
								onChange: (e) => setStatus(e.target.value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "active",
									children: "Active"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "suspended",
									children: "Suspended"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy || !data,
								children: busy ? "Saving…" : editing ? "Save staff access" : "Create staff access"
							}),
							editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy,
								onClick: clear,
								children: "Cancel edit"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Staff sign in with their NOC-X username and password. Temporary passwords must be changed at first login. Password resets and access changes revoke existing sessions. Passwords need 12–128 characters." }),
					!data && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/login",
						children: "Sign in with your owner or administrator account"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Registered staff" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy,
						onClick: () => {
							setError("");
							load();
						},
						children: "Refresh staff"
					}),
					data?.staff.map((row) => {
						const protectedAccount = row.roleId === "role-platform-owner" || row.email === data.actor.email || !owner && row.roleId === "role-administrator";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "portal-history",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.displayName }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									row.username || "Login not configured",
									" · ",
									row.email.endsWith("@nocx.internal") ? "No contact email" : row.email,
									" · ",
									row.role || "Unassigned",
									" · ",
									row.status,
									" · ",
									row.siteScopeMode === "assigned" ? `${row.siteIds?.length ?? 0} assigned sites` : "All sites"
								] }),
								protectedAccount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Protected account" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									disabled: busy,
									onClick: () => edit(row),
									children: ["Edit ", row.displayName]
								})
							]
						}, row.id);
					}),
					data && !data.staff.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No registered staff." }),
					data?.truncated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Account or site choices are limited to 1,000 rows. Refresh before changing access for omitted records." })
				]
			})
		]
	});
}
//#endregion
export { StaffManagement as default };
