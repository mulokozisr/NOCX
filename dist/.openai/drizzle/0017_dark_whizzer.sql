CREATE TABLE `duty_assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`operator_id` text NOT NULL,
	`duty_role` text NOT NULL,
	`starts_at` text NOT NULL,
	`ends_at` text NOT NULL,
	`status` text DEFAULT 'scheduled' NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`operator_id`) REFERENCES `operators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `duty_assignments_role_window_idx` ON `duty_assignments` (`duty_role`,`starts_at`,`ends_at`);--> statement-breakpoint
CREATE INDEX `duty_assignments_operator_window_idx` ON `duty_assignments` (`operator_id`,`starts_at`,`ends_at`);--> statement-breakpoint
CREATE INDEX `duty_assignments_status_idx` ON `duty_assignments` (`status`);--> statement-breakpoint
CREATE TABLE `incident_escalations` (
	`id` text PRIMARY KEY NOT NULL,
	`escalation_number` text NOT NULL,
	`incident_id` text NOT NULL,
	`level` integer DEFAULT 1 NOT NULL,
	`state` text DEFAULT 'open' NOT NULL,
	`assigned_operator_id` text,
	`raised_at` text NOT NULL,
	`acknowledged_at` text,
	`resolved_at` text,
	`raised_by` text NOT NULL,
	`acknowledged_by` text,
	`resolution_note` text,
	`external_notifications_sent` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`assigned_operator_id`) REFERENCES `operators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `incident_escalations_number_unique` ON `incident_escalations` (`escalation_number`);--> statement-breakpoint
CREATE INDEX `incident_escalations_incident_state_idx` ON `incident_escalations` (`incident_id`,`state`);--> statement-breakpoint
CREATE INDEX `incident_escalations_assignee_state_idx` ON `incident_escalations` (`assigned_operator_id`,`state`);--> statement-breakpoint
CREATE INDEX `incident_escalations_raised_idx` ON `incident_escalations` (`raised_at`);