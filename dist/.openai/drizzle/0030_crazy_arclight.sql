CREATE TABLE `device_onboarding_release_decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`window_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`reason` text NOT NULL,
	`evidence_ids` text DEFAULT '[]' NOT NULL,
	`manifest_digest` text NOT NULL,
	`decided_by` text NOT NULL,
	`decided_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_contact_enabled` integer DEFAULT false NOT NULL,
	`credential_execution_enabled` integer DEFAULT false NOT NULL,
	`activation_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`window_id`) REFERENCES `device_onboarding_windows`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_release_window_time_idx` ON `device_onboarding_release_decisions` (`window_id`,`decided_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_release_decision_idx` ON `device_onboarding_release_decisions` (`decision`);