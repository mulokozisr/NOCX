CREATE TABLE `device_onboarding_monitoring_registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_authorization_decision_id` text NOT NULL,
	`monitoring_authorization_request_id` text NOT NULL,
	`device_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`credential_reference_id` text NOT NULL,
	`monitoring_profile_key` text DEFAULT 'snmp-read-only' NOT NULL,
	`status` text DEFAULT 'registered' NOT NULL,
	`authorization_decision_digest` text NOT NULL,
	`registered_by` text NOT NULL,
	`registered_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`monitoring_target_registered` integer DEFAULT true NOT NULL,
	`polling_enabled` integer DEFAULT false NOT NULL,
	`device_contact_attempted` integer DEFAULT false NOT NULL,
	`credential_execution_attempted` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_authorization_decision_id`) REFERENCES `device_onboarding_monitoring_authorization_decisions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monitoring_authorization_request_id`) REFERENCES `device_onboarding_monitoring_authorization_requests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`credential_reference_id`) REFERENCES `credential_references`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_registration_decision_unique` ON `device_onboarding_monitoring_registrations` (`monitoring_authorization_decision_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_registration_device_unique` ON `device_onboarding_monitoring_registrations` (`device_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_registration_status_time_idx` ON `device_onboarding_monitoring_registrations` (`status`,`registered_at`);