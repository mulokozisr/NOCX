CREATE TABLE `service_communication_events` (
	`id` text PRIMARY KEY NOT NULL,
	`communication_id` text NOT NULL,
	`event_type` text NOT NULL,
	`actor_email` text NOT NULL,
	`body` text NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`communication_id`) REFERENCES `service_communication_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `service_communication_events_record_time_idx` ON `service_communication_events` (`communication_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `service_communication_events_type_time_idx` ON `service_communication_events` (`event_type`,`created_at`);--> statement-breakpoint
CREATE TABLE `service_communication_records` (
	`id` text PRIMARY KEY NOT NULL,
	`communication_number` text NOT NULL,
	`major_incident_id` text NOT NULL,
	`incident_id` text NOT NULL,
	`audience` text NOT NULL,
	`owner_email` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`customer_message` text NOT NULL,
	`internal_context` text NOT NULL,
	`intended_channels` text DEFAULT '[]' NOT NULL,
	`update_due_at` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`approved_by` text,
	`approved_at` text,
	`external_delivery_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`major_incident_id`) REFERENCES `major_incident_records`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `service_communication_number_unique` ON `service_communication_records` (`communication_number`);--> statement-breakpoint
CREATE INDEX `service_communication_major_status_idx` ON `service_communication_records` (`major_incident_id`,`status`);--> statement-breakpoint
CREATE INDEX `service_communication_due_idx` ON `service_communication_records` (`status`,`update_due_at`);--> statement-breakpoint
CREATE INDEX `service_communication_owner_idx` ON `service_communication_records` (`owner_email`);