CREATE TABLE `automation_runbook_events` (
	`id` text PRIMARY KEY NOT NULL,
	`runbook_id` text NOT NULL,
	`event_type` text NOT NULL,
	`actor_email` text NOT NULL,
	`body` text NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`runbook_id`) REFERENCES `automation_runbooks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `automation_runbook_events_record_time_idx` ON `automation_runbook_events` (`runbook_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `automation_runbook_events_type_time_idx` ON `automation_runbook_events` (`event_type`,`created_at`);--> statement-breakpoint
CREATE TABLE `automation_runbooks` (
	`id` text PRIMARY KEY NOT NULL,
	`runbook_number` text NOT NULL,
	`name` text NOT NULL,
	`purpose` text NOT NULL,
	`scope` text NOT NULL,
	`risk` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`owner_email` text NOT NULL,
	`source_change_id` text NOT NULL,
	`steps` text DEFAULT '[]' NOT NULL,
	`rollback_plan` text NOT NULL,
	`validation_plan` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`created_by` text NOT NULL,
	`approved_by` text,
	`approved_at` text,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`source_change_id`) REFERENCES `change_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `automation_runbooks_number_unique` ON `automation_runbooks` (`runbook_number`);--> statement-breakpoint
CREATE INDEX `automation_runbooks_status_risk_idx` ON `automation_runbooks` (`status`,`risk`);--> statement-breakpoint
CREATE INDEX `automation_runbooks_change_idx` ON `automation_runbooks` (`source_change_id`);--> statement-breakpoint
CREATE INDEX `automation_runbooks_owner_idx` ON `automation_runbooks` (`owner_email`);