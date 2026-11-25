CREATE TABLE `change_events` (
	`id` text PRIMARY KEY NOT NULL,
	`change_id` text NOT NULL,
	`event_type` text NOT NULL,
	`from_status` text,
	`to_status` text NOT NULL,
	`actor_email` text NOT NULL,
	`note` text,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`change_id`) REFERENCES `change_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `change_events_change_time_idx` ON `change_events` (`change_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `change_events_actor_time_idx` ON `change_events` (`actor_email`,`created_at`);--> statement-breakpoint
CREATE TABLE `change_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`change_number` text NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`change_type` text NOT NULL,
	`risk` text NOT NULL,
	`status` text DEFAULT 'pending_approval' NOT NULL,
	`requested_by` text NOT NULL,
	`approved_by` text,
	`maintenance_start` text NOT NULL,
	`maintenance_end` text NOT NULL,
	`rollback_plan` text NOT NULL,
	`validation_plan` text NOT NULL,
	`target_device_ids` text DEFAULT '[]' NOT NULL,
	`customer_impact_estimate` integer DEFAULT 0 NOT NULL,
	`submitted_at` text NOT NULL,
	`approved_at` text,
	`started_at` text,
	`completed_at` text,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `change_requests_number_unique` ON `change_requests` (`change_number`);--> statement-breakpoint
CREATE INDEX `change_requests_status_window_idx` ON `change_requests` (`status`,`maintenance_start`);--> statement-breakpoint
CREATE INDEX `change_requests_requester_idx` ON `change_requests` (`requested_by`);