CREATE TABLE `device_onboarding_monitoring_poll_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_collector_claim_id` text NOT NULL,
	`monitoring_registration_id` text NOT NULL,
	`device_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`collector_claim_digest` text NOT NULL,
	`allowed_operations` text DEFAULT '[]' NOT NULL,
	`proposed_start` text NOT NULL,
	`proposed_end` text NOT NULL,
	`requested_by` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`polling_authorized` integer DEFAULT false NOT NULL,
	`device_contact_authorized` integer DEFAULT false NOT NULL,
	`credential_execution_authorized` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_collector_claim_id`) REFERENCES `device_onboarding_monitoring_collector_claims`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monitoring_registration_id`) REFERENCES `device_onboarding_monitoring_registrations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_poll_claim_unique` ON `device_onboarding_monitoring_poll_requests` (`monitoring_collector_claim_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_poll_collector_time_idx` ON `device_onboarding_monitoring_poll_requests` (`collector_id`,`proposed_start`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_poll_status_time_idx` ON `device_onboarding_monitoring_poll_requests` (`status`,`requested_at`);