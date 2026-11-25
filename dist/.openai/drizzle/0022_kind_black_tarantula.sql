CREATE TABLE `major_incident_events` (
	`id` text PRIMARY KEY NOT NULL,
	`major_incident_id` text NOT NULL,
	`event_type` text NOT NULL,
	`actor_email` text NOT NULL,
	`body` text NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`major_incident_id`) REFERENCES `major_incident_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `major_incident_events_record_time_idx` ON `major_incident_events` (`major_incident_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `major_incident_events_type_time_idx` ON `major_incident_events` (`event_type`,`created_at`);--> statement-breakpoint
CREATE TABLE `major_incident_records` (
	`id` text PRIMARY KEY NOT NULL,
	`major_number` text NOT NULL,
	`incident_id` text NOT NULL,
	`severity` text NOT NULL,
	`status` text DEFAULT 'declared' NOT NULL,
	`commander_email` text NOT NULL,
	`technical_lead_email` text NOT NULL,
	`communications_lead_email` text NOT NULL,
	`objective` text NOT NULL,
	`update_cadence_minutes` integer DEFAULT 30 NOT NULL,
	`declared_by` text NOT NULL,
	`declared_at` text NOT NULL,
	`closed_by` text,
	`closed_at` text,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`external_notifications_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `major_incident_number_unique` ON `major_incident_records` (`major_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `major_incident_source_unique` ON `major_incident_records` (`incident_id`);--> statement-breakpoint
CREATE INDEX `major_incident_status_time_idx` ON `major_incident_records` (`status`,`declared_at`);--> statement-breakpoint
CREATE INDEX `major_incident_commander_idx` ON `major_incident_records` (`commander_email`);