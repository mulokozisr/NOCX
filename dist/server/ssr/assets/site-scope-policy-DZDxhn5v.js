//#region lib/site-scope-policy.ts
var scopedRoles = ["role-field-technician", "role-support-agent"];
var access = " JOIN operator_site_access a ON a.site_id=n.id WHERE n.status='active' AND a.operator_id=";
"" + access, "" + access, "" + access, "" + access, "" + access.replace(" WHERE ", " WHERE julianday(i.opened_at)>=julianday(CASE WHEN EXISTS (SELECT 1 FROM site_assignment_history h WHERE h.device_id=d.id) THEN (SELECT CASE WHEN h.site_id=d.site_id THEN h.assigned_at ELSE NULL END FROM site_assignment_history h WHERE h.device_id=d.id ORDER BY julianday(h.assigned_at) DESC LIMIT 1) ELSE d.created_at END) AND "), "" + access;
var scopedModules = new Set([
	"command-center",
	"fleet-workbench",
	"devices",
	"sites",
	"site-reports",
	"monitoring",
	"topology",
	"performance",
	"alerts",
	"incidents",
	"customers",
	"reports"
]);
function assignedOnly(scope) {
	return scope?.mode === "assigned";
}
//#endregion
export { scopedModules as n, scopedRoles as r, assignedOnly as t };
