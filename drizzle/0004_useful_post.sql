CREATE TABLE `collector_failover_events` (
	`id` text PRIMARY KEY NOT NULL,
	`failure_domain` text NOT NULL,
	`from_collector_id` text,
	`to_collector_id` text,
	`reason` text NOT NULL,
	`outcome` text NOT NULL,
	`fencing_token` integer NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`approved_by` text,
	`occurred_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`from_collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`to_collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `collector_failover_domain_time_idx` ON `collector_failover_events` (`failure_domain`,`occurred_at`);--> statement-breakpoint
CREATE INDEX `collector_failover_outcome_idx` ON `collector_failover_events` (`outcome`);--> statement-breakpoint
CREATE TABLE `collector_leases` (
	`id` text PRIMARY KEY NOT NULL,
	`failure_domain` text NOT NULL,
	`collector_id` text NOT NULL,
	`role` text NOT NULL,
	`fencing_token` integer NOT NULL,
	`acquired_at` text NOT NULL,
	`expires_at` text NOT NULL,
	`released_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `collector_active_lease` ON `collector_leases` (`failure_domain`,`fencing_token`);--> statement-breakpoint
CREATE INDEX `collector_lease_expiry_idx` ON `collector_leases` (`failure_domain`,`expires_at`);--> statement-breakpoint
CREATE TABLE `collector_queue_checkpoints` (
	`id` text PRIMARY KEY NOT NULL,
	`collector_id` text NOT NULL,
	`queue_name` text NOT NULL,
	`last_enqueued_sequence` integer DEFAULT 0 NOT NULL,
	`last_acknowledged_sequence` integer DEFAULT 0 NOT NULL,
	`pending_count` integer DEFAULT 0 NOT NULL,
	`oldest_pending_at` text,
	`last_replay_at` text,
	`checksum` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `collector_queue_checkpoint_unique` ON `collector_queue_checkpoints` (`collector_id`,`queue_name`);--> statement-breakpoint
CREATE INDEX `collector_queue_backlog_idx` ON `collector_queue_checkpoints` (`pending_count`,`oldest_pending_at`);
