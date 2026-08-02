CREATE TABLE `availability_samples` (
	`id` text PRIMARY KEY NOT NULL,
	`collector_id` text NOT NULL,
	`device_id` text NOT NULL,
	`observed_at` text NOT NULL,
	`online` integer NOT NULL,
	`latency_ms` integer,
	`packet_loss_pct` integer NOT NULL,
	`handshake_age_seconds` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `availability_sample_dedupe` ON `availability_samples` (`collector_id`,`device_id`,`observed_at`);--> statement-breakpoint
CREATE INDEX `availability_device_time_idx` ON `availability_samples` (`device_id`,`observed_at`);--> statement-breakpoint
CREATE INDEX `availability_collector_time_idx` ON `availability_samples` (`collector_id`,`observed_at`);--> statement-breakpoint
CREATE TABLE `collectors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`region` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`last_seen_at` text,
	`version` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `collectors_name_unique` ON `collectors` (`name`);--> statement-breakpoint
CREATE INDEX `collectors_status_idx` ON `collectors` (`status`);