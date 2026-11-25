CREATE TABLE `network_monitoring_registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`device_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`management_address` text NOT NULL,
	`vendor` text NOT NULL,
	`owner` text NOT NULL,
	`monitoring_profile` text NOT NULL,
	`snmp_mode` text,
	`credential_reference_id` text,
	`status` text DEFAULT 'enabled' NOT NULL,
	`registered_by` text NOT NULL,
	`registered_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`availability_intake_enabled` integer DEFAULT true NOT NULL,
	`metric_intake_enabled` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `network_monitoring_device_unique` ON `network_monitoring_registrations` (`device_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `network_monitoring_address_unique` ON `network_monitoring_registrations` (`management_address`);--> statement-breakpoint
CREATE INDEX `network_monitoring_collector_status_idx` ON `network_monitoring_registrations` (`collector_id`,`status`);--> statement-breakpoint
CREATE INDEX `network_monitoring_vendor_idx` ON `network_monitoring_registrations` (`vendor`,`status`);