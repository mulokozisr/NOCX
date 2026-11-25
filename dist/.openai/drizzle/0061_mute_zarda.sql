CREATE TABLE `device_onboarding_monitoring_poll_completion_decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_poll_execution_start_id` text NOT NULL,
	`monitoring_poll_permit_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`reason` text NOT NULL,
	`operation_receipt_ids` text DEFAULT '[]' NOT NULL,
	`evidence_digest` text NOT NULL,
	`decided_by` text NOT NULL,
	`decided_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`recurring_monitoring_recommended` integer DEFAULT false NOT NULL,
	`recurring_monitoring_activated` integer DEFAULT false NOT NULL,
	`alerts_enabled` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_poll_execution_start_id`) REFERENCES `device_onboarding_monitoring_poll_execution_starts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monitoring_poll_permit_id`) REFERENCES `device_onboarding_monitoring_poll_permits`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_poll_completion_decision_start_unique` ON `device_onboarding_monitoring_poll_completion_decisions` (`monitoring_poll_execution_start_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_poll_completion_decision_time_idx` ON `device_onboarding_monitoring_poll_completion_decisions` (`decision`,`decided_at`);