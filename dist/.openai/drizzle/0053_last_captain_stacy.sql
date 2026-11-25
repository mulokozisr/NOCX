CREATE TABLE `device_onboarding_monitoring_poll_permits` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_poll_decision_id` text NOT NULL,
	`monitoring_poll_request_id` text NOT NULL,
	`device_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`status` text DEFAULT 'issued' NOT NULL,
	`poll_decision_digest` text NOT NULL,
	`allowed_operations` text DEFAULT '[]' NOT NULL,
	`valid_from` text NOT NULL,
	`valid_until` text NOT NULL,
	`issued_by` text NOT NULL,
	`issued_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`bounded_poll_authorized` integer DEFAULT true NOT NULL,
	`polling_started` integer DEFAULT false NOT NULL,
	`device_contact_attempted` integer DEFAULT false NOT NULL,
	`credential_execution_attempted` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_poll_decision_id`) REFERENCES `device_onboarding_monitoring_poll_decisions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monitoring_poll_request_id`) REFERENCES `device_onboarding_monitoring_poll_requests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_poll_permit_decision_unique` ON `device_onboarding_monitoring_poll_permits` (`monitoring_poll_decision_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_poll_permit_collector_time_idx` ON `device_onboarding_monitoring_poll_permits` (`collector_id`,`valid_until`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_poll_permit_status_time_idx` ON `device_onboarding_monitoring_poll_permits` (`status`,`issued_at`);