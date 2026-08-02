CREATE TABLE `device_intake_batches` (
	`id` text PRIMARY KEY NOT NULL,
	`file_name` text NOT NULL,
	`row_count` integer NOT NULL,
	`accepted_count` integer DEFAULT 0 NOT NULL,
	`rejected_count` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`submitted_by` text NOT NULL,
	`payload_digest` text NOT NULL,
	`validation_summary` text DEFAULT '{}' NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `device_intake_batch_status_idx` ON `device_intake_batches` (`status`);--> statement-breakpoint
CREATE INDEX `device_intake_batch_created_idx` ON `device_intake_batches` (`created_at`);--> statement-breakpoint
CREATE TABLE `device_intake_candidates` (
	`id` text PRIMARY KEY NOT NULL,
	`batch_id` text NOT NULL,
	`hostname` text NOT NULL,
	`vendor` text NOT NULL,
	`model` text NOT NULL,
	`serial` text NOT NULL,
	`site` text NOT NULL,
	`management_address` text NOT NULL,
	`collector_id` text NOT NULL,
	`snmp_mode` text NOT NULL,
	`credential_reference_id` text NOT NULL,
	`owner` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`batch_id`) REFERENCES `device_intake_batches`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`credential_reference_id`) REFERENCES `credential_references`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_intake_hostname_unique` ON `device_intake_candidates` (`hostname`);--> statement-breakpoint
CREATE UNIQUE INDEX `device_intake_vendor_serial_unique` ON `device_intake_candidates` (`vendor`,`serial`);--> statement-breakpoint
CREATE UNIQUE INDEX `device_intake_address_unique` ON `device_intake_candidates` (`management_address`);--> statement-breakpoint
CREATE INDEX `device_intake_batch_idx` ON `device_intake_candidates` (`batch_id`);--> statement-breakpoint
CREATE INDEX `device_intake_status_idx` ON `device_intake_candidates` (`status`);