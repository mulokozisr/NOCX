CREATE TABLE `device_onboarding_monitoring_collector_claims` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_registration_id` text NOT NULL,
	`device_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`status` text DEFAULT 'claimed' NOT NULL,
	`registration_digest` text NOT NULL,
	`claimed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`collector_authenticated` integer DEFAULT true NOT NULL,
	`polling_enabled` integer DEFAULT false NOT NULL,
	`device_contact_authorized` integer DEFAULT false NOT NULL,
	`credential_execution_authorized` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_registration_id`) REFERENCES `device_onboarding_monitoring_registrations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_collector_claim_registration_unique` ON `device_onboarding_monitoring_collector_claims` (`monitoring_registration_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_collector_claim_collector_time_idx` ON `device_onboarding_monitoring_collector_claims` (`collector_id`,`claimed_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_collector_claim_status_idx` ON `device_onboarding_monitoring_collector_claims` (`status`);