CREATE TABLE `cudy_monitoring_registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`device_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`wireguard_address` text NOT NULL,
	`owner` text NOT NULL,
	`status` text DEFAULT 'enabled' NOT NULL,
	`registered_by` text NOT NULL,
	`registered_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`availability_intake_enabled` integer DEFAULT true NOT NULL,
	`credential_required` integer DEFAULT false NOT NULL,
	`snmp_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cudy_monitoring_device_unique` ON `cudy_monitoring_registrations` (`device_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `cudy_monitoring_wireguard_unique` ON `cudy_monitoring_registrations` (`wireguard_address`);--> statement-breakpoint
CREATE INDEX `cudy_monitoring_collector_status_idx` ON `cudy_monitoring_registrations` (`collector_id`,`status`);