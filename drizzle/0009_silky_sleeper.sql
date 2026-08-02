CREATE TABLE `credential_references` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`system` text NOT NULL,
	`scope_type` text NOT NULL,
	`scope_id` text,
	`authentication_method` text NOT NULL,
	`storage_provider` text NOT NULL,
	`binding_name` text,
	`status` text DEFAULT 'planned' NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`owner` text NOT NULL,
	`rotation_days` integer NOT NULL,
	`last_validated_at` text,
	`next_rotation_at` text,
	`value_stored` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `credential_reference_label_unique` ON `credential_references` (`label`);--> statement-breakpoint
CREATE INDEX `credential_reference_status_idx` ON `credential_references` (`status`);--> statement-breakpoint
CREATE INDEX `credential_reference_scope_idx` ON `credential_references` (`scope_type`,`scope_id`);--> statement-breakpoint
CREATE TABLE `credential_rotation_events` (
	`id` text PRIMARY KEY NOT NULL,
	`credential_reference_id` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`completed_at` text,
	`from_version` integer NOT NULL,
	`to_version` integer NOT NULL,
	`status` text DEFAULT 'planned' NOT NULL,
	`requested_by` text NOT NULL,
	`approved_by` text,
	`evidence_digest` text,
	`emergency` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`credential_reference_id`) REFERENCES `credential_references`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `credential_rotation_reference_time_idx` ON `credential_rotation_events` (`credential_reference_id`,`requested_at`);--> statement-breakpoint
CREATE INDEX `credential_rotation_status_idx` ON `credential_rotation_events` (`status`);--> statement-breakpoint
CREATE TABLE `credential_validation_evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`credential_reference_id` text NOT NULL,
	`check_type` text NOT NULL,
	`observed_at` text NOT NULL,
	`outcome` text NOT NULL,
	`evidence_digest` text NOT NULL,
	`validated_by` text,
	`error_code` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`credential_reference_id`) REFERENCES `credential_references`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `credential_validation_reference_time_idx` ON `credential_validation_evidence` (`credential_reference_id`,`observed_at`);--> statement-breakpoint
CREATE INDEX `credential_validation_outcome_idx` ON `credential_validation_evidence` (`outcome`);