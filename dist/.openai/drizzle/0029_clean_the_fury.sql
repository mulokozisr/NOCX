CREATE TABLE `device_onboarding_preflight_evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`window_id` text NOT NULL,
	`check_key` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`evidence_digest` text NOT NULL,
	`details` text DEFAULT '{}' NOT NULL,
	`recorded_by` text NOT NULL,
	`recorded_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`validated_by` text,
	`validated_at` text,
	`device_contact_enabled` integer DEFAULT false NOT NULL,
	`credential_execution_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`window_id`) REFERENCES `device_onboarding_windows`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_preflight_window_check_idx` ON `device_onboarding_preflight_evidence` (`window_id`,`check_key`);--> statement-breakpoint
CREATE INDEX `device_onboarding_preflight_status_time_idx` ON `device_onboarding_preflight_evidence` (`status`,`recorded_at`);