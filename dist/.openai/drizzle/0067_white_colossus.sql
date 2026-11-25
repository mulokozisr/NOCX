CREATE TABLE `device_onboarding_recurring_monitoring_program_evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`version` integer NOT NULL,
	`gate_key` text NOT NULL,
	`recurring_monitoring_schedule_claim_id` text NOT NULL,
	`parent_evidence_id` text,
	`state` text DEFAULT 'accepted' NOT NULL,
	`reason` text NOT NULL,
	`input_digest` text NOT NULL,
	`actor_email` text NOT NULL,
	`recorded_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`runtime_authority_granted` integer DEFAULT false NOT NULL,
	`polling_started` integer DEFAULT false NOT NULL,
	`alerts_enabled` integer DEFAULT false NOT NULL,
	`credential_values_stored` integer DEFAULT false NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`recurring_monitoring_schedule_claim_id`) REFERENCES `device_onboarding_recurring_monitoring_schedule_claims`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_recurring_program_claim_version_unique` ON `device_onboarding_recurring_monitoring_program_evidence` (`recurring_monitoring_schedule_claim_id`,`version`);--> statement-breakpoint
CREATE INDEX `device_onboarding_recurring_program_gate_time_idx` ON `device_onboarding_recurring_monitoring_program_evidence` (`gate_key`,`recorded_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_recurring_program_parent_idx` ON `device_onboarding_recurring_monitoring_program_evidence` (`parent_evidence_id`);