CREATE TABLE `known_error_records` (
	`id` text PRIMARY KEY NOT NULL,
	`known_error_number` text NOT NULL,
	`problem_id` text NOT NULL,
	`symptom` text NOT NULL,
	`workaround` text NOT NULL,
	`status` text DEFAULT 'published' NOT NULL,
	`published_by` text NOT NULL,
	`published_at` text NOT NULL,
	`retired_by` text,
	`retired_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`problem_id`) REFERENCES `problem_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `known_error_records_number_unique` ON `known_error_records` (`known_error_number`);--> statement-breakpoint
CREATE INDEX `known_error_problem_status_idx` ON `known_error_records` (`problem_id`,`status`);--> statement-breakpoint
CREATE TABLE `problem_events` (
	`id` text PRIMARY KEY NOT NULL,
	`problem_id` text NOT NULL,
	`event_type` text NOT NULL,
	`actor_email` text NOT NULL,
	`from_status` text,
	`to_status` text NOT NULL,
	`note` text,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`problem_id`) REFERENCES `problem_records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `problem_events_problem_time_idx` ON `problem_events` (`problem_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `problem_events_actor_time_idx` ON `problem_events` (`actor_email`,`created_at`);--> statement-breakpoint
CREATE TABLE `problem_incident_links` (
	`id` text PRIMARY KEY NOT NULL,
	`problem_id` text NOT NULL,
	`incident_id` text NOT NULL,
	`linked_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`problem_id`) REFERENCES `problem_records`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `problem_incident_link_unique` ON `problem_incident_links` (`problem_id`,`incident_id`);--> statement-breakpoint
CREATE INDEX `problem_incident_incident_idx` ON `problem_incident_links` (`incident_id`);--> statement-breakpoint
CREATE INDEX `problem_incident_problem_idx` ON `problem_incident_links` (`problem_id`);--> statement-breakpoint
CREATE TABLE `problem_records` (
	`id` text PRIMARY KEY NOT NULL,
	`problem_number` text NOT NULL,
	`title` text NOT NULL,
	`domain` text NOT NULL,
	`priority` text NOT NULL,
	`status` text DEFAULT 'investigating' NOT NULL,
	`owner_email` text NOT NULL,
	`suspected_cause` text DEFAULT '' NOT NULL,
	`root_cause` text DEFAULT '' NOT NULL,
	`workaround` text DEFAULT '' NOT NULL,
	`permanent_fix` text DEFAULT '' NOT NULL,
	`observation_started_at` text,
	`observation_days` integer DEFAULT 7 NOT NULL,
	`closed_at` text,
	`closed_by` text,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `problem_records_number_unique` ON `problem_records` (`problem_number`);--> statement-breakpoint
CREATE INDEX `problem_records_status_priority_idx` ON `problem_records` (`status`,`priority`);--> statement-breakpoint
CREATE INDEX `problem_records_owner_idx` ON `problem_records` (`owner_email`);