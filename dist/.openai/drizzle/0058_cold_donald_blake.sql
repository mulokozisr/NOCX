CREATE TABLE `device_onboarding_monitoring_poll_permit_consumptions` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_poll_execution_decision_id` text NOT NULL,
	`monitoring_poll_execution_request_id` text NOT NULL,
	`monitoring_poll_permit_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`execution_decision_digest` text NOT NULL,
	`consumed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`collector_authenticated` integer DEFAULT true NOT NULL,
	`permit_consumed` integer DEFAULT true NOT NULL,
	`polling_started` integer DEFAULT false NOT NULL,
	`device_contact_attempted` integer DEFAULT false NOT NULL,
	`credential_execution_attempted` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_poll_execution_decision_id`) REFERENCES `device_onboarding_monitoring_poll_execution_decisions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monitoring_poll_execution_request_id`) REFERENCES `device_onboarding_monitoring_poll_execution_requests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monitoring_poll_permit_id`) REFERENCES `device_onboarding_monitoring_poll_permits`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_poll_permit_consumption_decision_unique` ON `device_onboarding_monitoring_poll_permit_consumptions` (`monitoring_poll_execution_decision_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_poll_permit_consumption_permit_unique` ON `device_onboarding_monitoring_poll_permit_consumptions` (`monitoring_poll_permit_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_poll_permit_consumption_collector_time_idx` ON `device_onboarding_monitoring_poll_permit_consumptions` (`collector_id`,`consumed_at`);