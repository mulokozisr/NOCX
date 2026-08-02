CREATE TABLE `backup_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`data_class` text NOT NULL,
	`started_at` text NOT NULL,
	`completed_at` text,
	`status` text NOT NULL,
	`checksum` text,
	`copy_locations` text DEFAULT '[]' NOT NULL,
	`retention_until` text,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `backup_runs_class_time_idx` ON `backup_runs` (`data_class`,`started_at`);--> statement-breakpoint
CREATE INDEX `backup_runs_status_idx` ON `backup_runs` (`status`);--> statement-breakpoint
CREATE TABLE `platform_health_checks` (
	`id` text PRIMARY KEY NOT NULL,
	`component` text NOT NULL,
	`signal_type` text NOT NULL,
	`observed_at` text NOT NULL,
	`status` text NOT NULL,
	`freshness_seconds` integer NOT NULL,
	`objective_seconds` integer NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`incident_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `platform_health_component_time_idx` ON `platform_health_checks` (`component`,`observed_at`);--> statement-breakpoint
CREATE INDEX `platform_health_status_idx` ON `platform_health_checks` (`status`);--> statement-breakpoint
CREATE TABLE `restore_exercises` (
	`id` text PRIMARY KEY NOT NULL,
	`backup_run_id` text NOT NULL,
	`environment` text NOT NULL,
	`recovery_point_at` text NOT NULL,
	`started_at` text NOT NULL,
	`completed_at` text,
	`rto_minutes` integer NOT NULL,
	`actual_minutes` integer,
	`status` text DEFAULT 'planned' NOT NULL,
	`approved_by` text,
	`validated_by` text,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`backup_run_id`) REFERENCES `backup_runs`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `restore_exercises_status_idx` ON `restore_exercises` (`status`);--> statement-breakpoint
CREATE INDEX `restore_exercises_backup_idx` ON `restore_exercises` (`backup_run_id`);