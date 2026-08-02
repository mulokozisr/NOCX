CREATE TABLE `commissioning_rehearsals` (
	`id` text PRIMARY KEY NOT NULL,
	`scenario_key` text NOT NULL,
	`vendor` text NOT NULL,
	`expected_decision` text NOT NULL,
	`actual_decision` text NOT NULL,
	`status` text NOT NULL,
	`executed_by` text NOT NULL,
	`started_at` text NOT NULL,
	`completed_at` text NOT NULL,
	`evidence_digest` text NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`synthetic_data` integer DEFAULT true NOT NULL,
	`production_telemetry_written` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `commissioning_rehearsal_status_idx` ON `commissioning_rehearsals` (`status`);--> statement-breakpoint
CREATE INDEX `commissioning_rehearsal_scenario_time_idx` ON `commissioning_rehearsals` (`scenario_key`,`completed_at`);--> statement-breakpoint
CREATE INDEX `commissioning_rehearsal_vendor_time_idx` ON `commissioning_rehearsals` (`vendor`,`completed_at`);