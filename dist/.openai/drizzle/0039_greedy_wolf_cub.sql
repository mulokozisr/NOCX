CREATE TABLE `device_onboarding_verification_decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`candidate_id` text NOT NULL,
	`runtime_permit_id` text NOT NULL,
	`permit_consumption_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`reason` text NOT NULL,
	`evidence_receipt_ids` text DEFAULT '[]' NOT NULL,
	`evidence_digest` text NOT NULL,
	`decided_by` text NOT NULL,
	`decided_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_created` integer DEFAULT false NOT NULL,
	`monitoring_activated` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`runtime_permit_id`) REFERENCES `device_onboarding_runtime_permits`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`permit_consumption_id`) REFERENCES `device_onboarding_permit_consumptions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_verification_candidate_time_idx` ON `device_onboarding_verification_decisions` (`candidate_id`,`decided_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_verification_permit_time_idx` ON `device_onboarding_verification_decisions` (`runtime_permit_id`,`decided_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_verification_decision_idx` ON `device_onboarding_verification_decisions` (`decision`);