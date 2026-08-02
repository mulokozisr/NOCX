CREATE TABLE `ingestion_receipts` (
	`id` text PRIMARY KEY NOT NULL,
	`collector_id` text NOT NULL,
	`received_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`accepted` integer DEFAULT 0 NOT NULL,
	`rejected` integer DEFAULT 0 NOT NULL,
	`duplicate` integer DEFAULT 0 NOT NULL,
	`request_id` text,
	`schema_version` text NOT NULL,
	`outcome` text NOT NULL,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `ingestion_collector_time_idx` ON `ingestion_receipts` (`collector_id`,`received_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `ingestion_request_unique` ON `ingestion_receipts` (`request_id`);--> statement-breakpoint
CREATE TABLE `metric_rollups` (
	`id` text PRIMARY KEY NOT NULL,
	`device_id` text NOT NULL,
	`metric_key` text NOT NULL,
	`bucket` text NOT NULL,
	`bucket_start` text NOT NULL,
	`sample_count` integer NOT NULL,
	`minimum` integer NOT NULL,
	`maximum` integer NOT NULL,
	`average` integer NOT NULL,
	`quality` text DEFAULT 'valid' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `metric_rollup_dedupe` ON `metric_rollups` (`device_id`,`metric_key`,`bucket`,`bucket_start`);--> statement-breakpoint
CREATE INDEX `metric_rollup_lookup_idx` ON `metric_rollups` (`device_id`,`metric_key`,`bucket`,`bucket_start`);--> statement-breakpoint
CREATE TABLE `metric_samples` (
	`id` text PRIMARY KEY NOT NULL,
	`collector_id` text NOT NULL,
	`device_id` text NOT NULL,
	`metric_key` text NOT NULL,
	`observed_at` text NOT NULL,
	`value` integer NOT NULL,
	`unit` text NOT NULL,
	`quality` text DEFAULT 'valid' NOT NULL,
	`source_field` text,
	`profile_version` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `metric_sample_dedupe` ON `metric_samples` (`collector_id`,`device_id`,`metric_key`,`observed_at`);--> statement-breakpoint
CREATE INDEX `metric_device_key_time_idx` ON `metric_samples` (`device_id`,`metric_key`,`observed_at`);--> statement-breakpoint
CREATE INDEX `metric_quality_time_idx` ON `metric_samples` (`quality`,`observed_at`);--> statement-breakpoint
CREATE TABLE `retention_policies` (
	`id` text PRIMARY KEY NOT NULL,
	`data_class` text NOT NULL,
	`raw_days` integer NOT NULL,
	`hourly_days` integer NOT NULL,
	`daily_days` integer NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`updated_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `retention_data_class_unique` ON `retention_policies` (`data_class`);--> statement-breakpoint
CREATE INDEX `retention_status_idx` ON `retention_policies` (`status`);