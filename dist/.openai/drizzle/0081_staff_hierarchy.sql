INSERT OR IGNORE INTO roles(id,name,permissions) VALUES ('role-administrator','Administrator','["platform.read","platform.admin","users.manage","audit.read","devices.read","incidents.manage","changes.approve","telemetry.read"]');
--> statement-breakpoint
INSERT OR IGNORE INTO roles(id,name,permissions) VALUES ('role-supervisor','Supervisor','["platform.read","audit.read","devices.read","incidents.manage","changes.approve","telemetry.read"]');
--> statement-breakpoint
INSERT OR IGNORE INTO roles(id,name,permissions) VALUES ('role-noc-operator','NOC Operator','["platform.read","devices.read","incidents.manage","telemetry.read"]');
--> statement-breakpoint
INSERT OR IGNORE INTO roles(id,name,permissions) VALUES ('role-network-engineer','Network Engineer','["platform.read","platform.admin","devices.read","incidents.manage","telemetry.read"]');
--> statement-breakpoint
INSERT OR IGNORE INTO roles(id,name,permissions) VALUES ('role-field-technician','Field Technician','["platform.read","devices.read","telemetry.read"]');
--> statement-breakpoint
INSERT OR IGNORE INTO roles(id,name,permissions) VALUES ('role-support-agent','Support Agent','["platform.read","devices.read"]');
