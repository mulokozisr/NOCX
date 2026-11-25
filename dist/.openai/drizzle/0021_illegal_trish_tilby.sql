CREATE TABLE `circuit_events` (
	`id` text PRIMARY KEY NOT NULL,
	`circuit_id` text NOT NULL,
	`event_type` text NOT NULL,
	`actor_email` text NOT NULL,
	`from_status` text,
	`to_status` text NOT NULL,
	`note` text,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`circuit_id`) REFERENCES `network_circuits`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `circuit_events_circuit_time_idx` ON `circuit_events` (`circuit_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `circuit_events_actor_time_idx` ON `circuit_events` (`actor_email`,`created_at`);--> statement-breakpoint
CREATE TABLE `network_circuits` (
	`id` text PRIMARY KEY NOT NULL,
	`circuit_number` text NOT NULL,
	`name` text NOT NULL,
	`provider` text NOT NULL,
	`service_type` text NOT NULL,
	`device_id` text NOT NULL,
	`interface_name` text NOT NULL,
	`endpoint_label` text NOT NULL,
	`capacity_bps` integer NOT NULL,
	`sla_target_bps` integer DEFAULT 9950 NOT NULL,
	`monthly_commit_minor` integer DEFAULT 0 NOT NULL,
	`currency` text DEFAULT 'TZS' NOT NULL,
	`renewal_at` text,
	`contract_reference` text,
	`owner_email` text NOT NULL,
	`description` text NOT NULL,
	`status` text DEFAULT 'pending_verification' NOT NULL,
	`created_by` text NOT NULL,
	`verified_by` text,
	`verified_at` text,
	`retired_by` text,
	`retired_at` text,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `network_circuits_number_unique` ON `network_circuits` (`circuit_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `network_circuits_device_interface_unique` ON `network_circuits` (`device_id`,`interface_name`);--> statement-breakpoint
CREATE INDEX `network_circuits_status_idx` ON `network_circuits` (`status`);--> statement-breakpoint
CREATE INDEX `network_circuits_provider_idx` ON `network_circuits` (`provider`);--> statement-breakpoint
CREATE INDEX `network_circuits_renewal_idx` ON `network_circuits` (`renewal_at`);