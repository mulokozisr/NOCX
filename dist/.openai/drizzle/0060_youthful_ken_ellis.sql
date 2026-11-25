CREATE TABLE `device_onboarding_monitoring_poll_operation_receipts` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_poll_execution_start_id` text NOT NULL,
	`monitoring_poll_permit_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`execution_start_digest` text NOT NULL,
	`operation_key` text NOT NULL,
	`outcome` text NOT NULL,
	`evidence_digest` text NOT NULL,
	`value_count` integer DEFAULT 0 NOT NULL,
	`observed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`collector_authenticated` integer DEFAULT true NOT NULL,
	`raw_payload_stored` integer DEFAULT false NOT NULL,
	`secret_values_stored` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_poll_execution_start_id`) REFERENCES `device_onboarding_monitoring_poll_execution_starts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monitoring_poll_permit_id`) REFERENCES `device_onboarding_monitoring_poll_permits`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_poll_operation_receipt_unique` ON `device_onboarding_monitoring_poll_operation_receipts` (`monitoring_poll_execution_start_id`,`operation_key`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_poll_operation_receipt_collector_time_idx` ON `device_onboarding_monitoring_poll_operation_receipts` (`collector_id`,`observed_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_poll_operation_receipt_outcome_idx` ON `device_onboarding_monitoring_poll_operation_receipts` (`outcome`,`operation_key`);