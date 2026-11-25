CREATE TABLE `api_rate_limit_counters` (
	`id` text PRIMARY KEY NOT NULL,
	`bucket_key` text NOT NULL,
	`window_started_at` integer NOT NULL,
	`request_count` integer DEFAULT 1 NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `api_rate_limit_window_idx` ON `api_rate_limit_counters` (`window_started_at`);--> statement-breakpoint
CREATE INDEX `api_rate_limit_bucket_idx` ON `api_rate_limit_counters` (`bucket_key`,`window_started_at`);--> statement-breakpoint
CREATE TABLE `collector_credentials` (
	`id` text PRIMARY KEY NOT NULL,
	`collector_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`token_prefix` text NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`rotated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`expires_at` text,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `collector_credentials_hash_unique` ON `collector_credentials` (`token_hash`);--> statement-breakpoint
CREATE INDEX `collector_credentials_collector_status_idx` ON `collector_credentials` (`collector_id`,`status`,`rotated_at`);