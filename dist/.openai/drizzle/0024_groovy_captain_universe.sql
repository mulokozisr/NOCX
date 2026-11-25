CREATE TABLE `restoration_evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`validation_id` text NOT NULL,
	`gate_key` text NOT NULL,
	`state` text NOT NULL,
	`detail` text NOT NULL,
	`actor_email` text NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`observed_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`validation_id`) REFERENCES `restoration_validations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `restoration_evidence_validation_gate_time_idx` ON `restoration_evidence` (`validation_id`,`gate_key`,`observed_at`);--> statement-breakpoint
CREATE INDEX `restoration_evidence_state_time_idx` ON `restoration_evidence` (`state`,`observed_at`);--> statement-breakpoint
CREATE TABLE `restoration_validations` (
	`id` text PRIMARY KEY NOT NULL,
	`validation_number` text NOT NULL,
	`major_incident_id` text NOT NULL,
	`incident_id` text NOT NULL,
	`owner_email` text NOT NULL,
	`status` text DEFAULT 'observing' NOT NULL,
	`observation_minutes` integer NOT NULL,
	`started_at` text NOT NULL,
	`observation_ends_at` text NOT NULL,
	`baseline_note` text NOT NULL,
	`readiness_verified_by` text,
	`readiness_verified_at` text,
	`incident_changes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`major_incident_id`) REFERENCES `major_incident_records`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `restoration_validation_number_unique` ON `restoration_validations` (`validation_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `restoration_validation_major_unique` ON `restoration_validations` (`major_incident_id`);--> statement-breakpoint
CREATE INDEX `restoration_validation_status_end_idx` ON `restoration_validations` (`status`,`observation_ends_at`);--> statement-breakpoint
CREATE INDEX `restoration_validation_owner_idx` ON `restoration_validations` (`owner_email`);