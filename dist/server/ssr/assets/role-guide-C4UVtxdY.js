import { t as require_jsx_runtime } from "../index.js";
//#region lib/staff-hierarchy.ts
var OWNER_ROLE = "role-platform-owner";
var ADMIN_ROLE = "role-administrator";
var staffRoles = [
	{
		id: OWNER_ROLE,
		name: "Platform Owner",
		description: "Accountable for platform ownership and access governance.",
		scope: "All staff accounts and available operational management functions.",
		responsibilities: [
			"Appoint and manage administrators.",
			"Create, assign, suspend and reset staff access.",
			"Oversee sites, monitoring, incidents, audit evidence and change decisions."
		],
		limitations: [
			"Owner identity and ownership cannot be changed through staff management.",
			"Cannot retrieve anyone's stored password.",
			"Independent approval and evidence requirements still apply."
		],
		expectedPermissions: [
			"platform.read",
			"platform.admin",
			"users.manage",
			"roles.manage",
			"audit.read",
			"devices.read",
			"incidents.manage",
			"changes.approve",
			"telemetry.read"
		]
	},
	{
		id: ADMIN_ROLE,
		name: "Administrator",
		description: "Maintains staff access and operational setup.",
		scope: "Staff below administrator level, plus operational configuration across the network.",
		responsibilities: [
			"Create and manage supervisors, operators, engineers, technicians and support accounts.",
			"Set temporary passwords, suspend access and assign existing staff roles.",
			"Maintain sites, device onboarding, service mappings and operational registers."
		],
		limitations: [
			"Cannot create or manage administrators or the owner.",
			"Cannot change their own role or account through staff management.",
			"Cannot retrieve stored passwords or approve their own change requests."
		],
		expectedPermissions: [
			"platform.read",
			"platform.admin",
			"users.manage",
			"audit.read",
			"devices.read",
			"incidents.manage",
			"changes.approve",
			"telemetry.read"
		]
	},
	{
		id: "role-supervisor",
		name: "Supervisor",
		description: "Oversees incident response and independent change review.",
		scope: "Network-wide operational evidence, incident management and supported change approvals.",
		responsibilities: [
			"Review network health, incidents and operational evidence.",
			"Acknowledge incidents, record notes and resolve incidents with required evidence.",
			"Approve or reject supported change requests independently of the requester."
		],
		limitations: [
			"Cannot create users, reset other users' passwords or assign roles.",
			"Cannot change sites, service mappings or onboarding configuration.",
			"Cannot create field assignments or edit duty rosters with this role; those currently require operational administration."
		],
		expectedPermissions: [
			"platform.read",
			"audit.read",
			"devices.read",
			"incidents.manage",
			"changes.approve",
			"telemetry.read"
		]
	},
	{
		id: "role-noc-operator",
		name: "NOC Operator",
		description: "Handles monitoring and first-line incident response.",
		scope: "Network-wide monitoring and incident workflow.",
		responsibilities: [
			"Monitor device reachability, freshness, latency and packet loss.",
			"Acknowledge alerts, add investigation notes and track outages and recovery.",
			"Resolve incidents only when the workflow's required notes and evidence are satisfied; escalate technical faults to engineers."
		],
		limitations: [
			"Cannot create users, reset other users' passwords or assign roles.",
			"Cannot change site assignments, service mappings or onboarding configuration.",
			"Cannot approve change requests or edit field assignments and duty rosters."
		],
		expectedPermissions: [
			"platform.read",
			"devices.read",
			"incidents.manage",
			"telemetry.read"
		]
	},
	{
		id: "role-network-engineer",
		name: "Network Engineer",
		description: "Investigates technical faults and maintains monitoring configuration.",
		scope: "Network-wide evidence and broad operational configuration, including supported collector and credential-reference management.",
		responsibilities: [
			"Investigate device metrics, link faults and monitoring failures.",
			"Maintain sites, device onboarding and service dependencies.",
			"Manage supported operational registers and incident workflows; prepare technical change requests."
		],
		limitations: [
			"Cannot create users, reset staff passwords or assign roles.",
			"Cannot approve or reject governed change requests.",
			"Operational administration is currently broad; it is not restricted to selected sites or only device settings."
		],
		expectedPermissions: [
			"platform.read",
			"platform.admin",
			"devices.read",
			"incidents.manage",
			"telemetry.read"
		]
	},
	{
		id: "role-field-technician",
		name: "Field Technician",
		description: "Uses monitoring evidence to support physical site checks and repairs.",
		scope: "All sites or administrator-selected active sites; application access is read-only.",
		responsibilities: [
			"Review device status and monitoring evidence before a site visit.",
			"Perform assigned physical checks such as power, PoE, cabling and link alignment outside the application.",
			"Report findings and completed repairs to the operator or engineer."
		],
		limitations: [
			"Cannot create users, reset staff passwords or assign roles.",
			"Cannot edit devices, sites, incidents or change approvals.",
			"Technician job updates are not implemented; findings must be recorded by an authorized operator. Assigned-site access is read-only and excludes unsupported modules."
		],
		expectedPermissions: [
			"platform.read",
			"devices.read",
			"telemetry.read"
		]
	},
	{
		id: "role-support-agent",
		name: "Support Agent",
		description: "Uses service and outage evidence to respond to client enquiries.",
		scope: "All sites or administrator-selected active sites; application access is read-only.",
		responsibilities: [
			"Check service status, device reachability and recorded interruptions.",
			"Explain available evidence to clients and escalate faults to the NOC.",
			"Follow recovery progress and provide updates through the team's existing communication channels."
		],
		limitations: [
			"Cannot create users, reset staff passwords or assign roles.",
			"Cannot edit devices, sites, incidents or change approvals.",
			"Assigned-site access can limit visibility. Separate ticket-only visibility and automated external message delivery remain unavailable."
		],
		expectedPermissions: ["platform.read", "devices.read"]
	}
];
var sharedRoleLimits = [
	"Every staff role has network-wide visibility of core device, site, service and incident evidence. Advanced modules require the permissions defined for that role. Owners and administrators can restrict technician and support accounts to selected active sites. Unrestricted accounts retain network-wide access.",
	"Permissions control module access and actions on the server. A permission does not imply that an unimplemented feature is available.",
	"Passwords are never readable. Users change their own passwords; authorized managers set replacement temporary passwords for accounts they can manage.",
	"These roles govern NOC-X records. They do not grant router login credentials or execute network configuration changes.",
	"Suspension, password resets and account access changes invalidate existing sessions. Customer login is deferred."
];
//#endregion
//#region app/role-guide.tsx
var import_jsx_runtime = require_jsx_runtime();
function RoleGuide({ configuration }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Roles, responsibilities and limits" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Use these definitions when assigning access. Each role describes current application access and the team's day-to-day work." }),
			staffRoles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "portal-history",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: role.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: role.description }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Scope: " }), role.scope] }),
					configuration && configuration[role.id] !== true && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						children: "The stored permissions differ from this definition, or the role is missing. Ask the owner to review configuration before assigning this role."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Responsibilities" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: role.responsibilities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Limitations" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: role.limitations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) })
				]
			}, role.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Rules applying to every role" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: sharedRoleLimits.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item)) })
		]
	});
}
//#endregion
export { ADMIN_ROLE as n, OWNER_ROLE as r, RoleGuide as t };
