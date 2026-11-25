CREATE TABLE `device_onboarding_waves` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'sealed' NOT NULL,
	`candidate_ids` text DEFAULT '[]' NOT NULL,
	`candidate_count` integer NOT NULL,
	`collector_snapshot` text DEFAULT '[]' NOT NULL,
	`credential_reference_ids` text DEFAULT '[]' NOT NULL,
	`manifest_digest` text NOT NULL,
	`prepared_by` text NOT NULL,
	`prepared_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`snmp_set_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_wave_digest_unique` ON `device_onboarding_waves` (`manifest_digest`);--> statement-breakpoint
CREATE INDEX `device_onboarding_wave_status_time_idx` ON `device_onboarding_waves` (`status`,`prepared_at`);