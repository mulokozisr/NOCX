CREATE TABLE `device_onboarding_windows` (
	`id` text PRIMARY KEY NOT NULL,
	`wave_id` text NOT NULL,
	`lead_operator_id` text NOT NULL,
	`scheduled_start` text NOT NULL,
	`scheduled_end` text NOT NULL,
	`status` text DEFAULT 'scheduled' NOT NULL,
	`required_checks` text DEFAULT '[]' NOT NULL,
	`abort_criteria` text DEFAULT '[]' NOT NULL,
	`created_by` text NOT NULL,
	`device_contact_enabled` integer DEFAULT false NOT NULL,
	`credential_execution_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`wave_id`) REFERENCES `device_onboarding_waves`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`lead_operator_id`) REFERENCES `operators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_window_wave_idx` ON `device_onboarding_windows` (`wave_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_window_status_start_idx` ON `device_onboarding_windows` (`status`,`scheduled_start`);--> statement-breakpoint
CREATE INDEX `device_onboarding_window_lead_idx` ON `device_onboarding_windows` (`lead_operator_id`);