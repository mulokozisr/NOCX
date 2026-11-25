CREATE TABLE `device_onboarding_monitoring_poll_decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_poll_request_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`reason` text NOT NULL,
	`poll_request_digest` text NOT NULL,
	`decided_by` text NOT NULL,
	`decided_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`bounded_poll_authorized` integer DEFAULT false NOT NULL,
	`polling_started` integer DEFAULT false NOT NULL,
	`device_contact_attempted` integer DEFAULT false NOT NULL,
	`credential_execution_attempted` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_poll_request_id`) REFERENCES `device_onboarding_monitoring_poll_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_poll_decision_request_unique` ON `device_onboarding_monitoring_poll_decisions` (`monitoring_poll_request_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_poll_decision_time_idx` ON `device_onboarding_monitoring_poll_decisions` (`decision`,`decided_at`);