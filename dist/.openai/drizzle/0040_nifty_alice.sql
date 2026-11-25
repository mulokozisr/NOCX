CREATE TABLE `device_onboarding_enrollment_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`verification_decision_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`runtime_permit_id` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`candidate_snapshot` text DEFAULT '{}' NOT NULL,
	`evidence_digest` text NOT NULL,
	`monitoring_profile_key` text DEFAULT 'snmp-read-only' NOT NULL,
	`requested_by` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_creation_authorized` integer DEFAULT false NOT NULL,
	`monitoring_activation_authorized` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`verification_decision_id`) REFERENCES `device_onboarding_verification_decisions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`runtime_permit_id`) REFERENCES `device_onboarding_runtime_permits`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_enrollment_verification_unique` ON `device_onboarding_enrollment_requests` (`verification_decision_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_enrollment_candidate_time_idx` ON `device_onboarding_enrollment_requests` (`candidate_id`,`requested_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_enrollment_status_time_idx` ON `device_onboarding_enrollment_requests` (`status`,`requested_at`);