import { a as require_react, o as __toESM, t as require_jsx_runtime } from "../index.js";
//#region lib/operator-request-access.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function operatorRequestAccess(grants, _key, permission) {
	return {
		canWrite: Array.isArray(grants) && grants.some((grant) => typeof grant === "string" && grant === permission),
		headers: { "content-type": "application/json" }
	};
}
//#endregion
//#region app/operator-access.tsx
var import_jsx_runtime = require_jsx_runtime();
function useOperatorAccess(permission = "platform.admin") {
	const [permissions, setPermissions] = (0, import_react.useState)([]);
	const refresh = (0, import_react.useCallback)(() => {
		setPermissions([]);
		fetch("/api/platform/access", { cache: "no-store" }).then(async (r) => {
			if (!r.ok) throw new Error();
			return r.json();
		}).then((r) => setPermissions(Array.isArray(r.identity?.permissions) ? r.identity.permissions : [])).catch(() => setPermissions([]));
	}, []);
	(0, import_react.useEffect)(() => {
		sessionStorage.removeItem("nocx-operator-key");
		sessionStorage.removeItem("nocx-temporary-operator-key");
		refresh();
		window.addEventListener("nocx-access-changed", refresh);
		const onVisible = () => {
			if (!document.hidden) refresh();
		};
		document.addEventListener("visibilitychange", onVisible);
		return () => {
			window.removeEventListener("nocx-access-changed", refresh);
			document.removeEventListener("visibilitychange", onVisible);
		};
	}, [refresh]);
	return {
		permissions,
		...operatorRequestAccess(permissions, "", permission)
	};
}
function OperatorAccess({ access }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "operator-access",
		role: "status",
		children: access.canWrite ? "Your account role allows these actions." : "Read-only access. Your role does not allow these actions."
	});
}
//#endregion
export { useOperatorAccess as n, OperatorAccess as t };
