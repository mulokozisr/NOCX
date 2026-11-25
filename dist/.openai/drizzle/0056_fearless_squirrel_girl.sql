CREATE TABLE `device_onboarding_monitoring_poll_execution_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_poll_preflight_attestation_id` text NOT NULL,
	`monitoring_poll_permit_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`preflight_digest` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`collector_authenticated` integer DEFAULT true NOT NULL,
	`execution_requested` integer DEFAULT true NOT NULL,
	`polling_authorized` integer DEFAULT false NOT NULL,
	`polling_started` integer DEFAULT false NOT NULL,
	`device_contact_attempted` integer DEFAULT false NOT NULL,
	`credential_execution_attempted` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_poll_preflight_attestation_id`) REFERENCES `device_onboarding_monitoring_poll_preflight_attestations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monitoring_poll_permit_id`) REFERENCES `device_onboarding_monitoring_poll_permits`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_poll_execution_request_preflight_unique` ON `device_onboarding_monitoring_poll_execution_requests` (`monitoring_poll_preflight_attestation_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_poll_execution_request_collector_time_idx` ON `device_onboarding_monitoring_poll_execution_requests` (`collector_id`,`requested_at`);