CREATE TABLE `commissioning_decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`plan_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`decided_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`decided_by` text,
	`reason` text NOT NULL,
	`evidence_ids` text DEFAULT '[]' NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`plan_id`) REFERENCES `commissioning_plans`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `commissioning_decision_plan_time_idx` ON `commissioning_decisions` (`plan_id`,`decided_at`);--> statement-breakpoint
CREATE INDEX `commissioning_decision_state_idx` ON `commissioning_decisions` (`decision`);--> statement-breakpoint
CREATE TABLE `commissioning_evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`plan_id` text NOT NULL,
	`phase` text NOT NULL,
	`evidence_type` text NOT NULL,
	`observed_at` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`payload` text DEFAULT '{}' NOT NULL,
	`recorded_by` text,
	`validated_by` text,
	`validated_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`plan_id`) REFERENCES `commissioning_plans`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `commissioning_evidence_plan_phase_idx` ON `commissioning_evidence` (`plan_id`,`phase`);--> statement-breakpoint
CREATE INDEX `commissioning_evidence_status_idx` ON `commissioning_evidence` (`status`);--> statement-breakpoint
CREATE TABLE `commissioning_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`device_id` text,
	`vendor` text NOT NULL,
	`site` text,
	`scheduled_start` text,
	`scheduled_end` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`lead_operator_id` text,
	`probe_mode` text DEFAULT 'disabled' NOT NULL,
	`required_metrics` text DEFAULT '[]' NOT NULL,
	`abort_criteria` text DEFAULT '[]' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`lead_operator_id`) REFERENCES `operators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `commissioning_plan_status_idx` ON `commissioning_plans` (`status`);--> statement-breakpoint
CREATE INDEX `commissioning_plan_device_idx` ON `commissioning_plans` (`device_id`);--> statement-breakpoint
CREATE INDEX `commissioning_plan_window_idx` ON `commissioning_plans` (`scheduled_start`);