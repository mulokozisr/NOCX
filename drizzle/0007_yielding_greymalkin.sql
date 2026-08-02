CREATE TABLE `failure_exercises` (
	`id` text PRIMARY KEY NOT NULL,
	`scenario` text NOT NULL,
	`environment` text NOT NULL,
	`expected_control` text NOT NULL,
	`started_at` text NOT NULL,
	`completed_at` text,
	`status` text DEFAULT 'planned' NOT NULL,
	`approved_by` text,
	`validated_by` text,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `failure_exercise_status_idx` ON `failure_exercises` (`status`);--> statement-breakpoint
CREATE INDEX `failure_exercise_started_idx` ON `failure_exercises` (`started_at`);--> statement-breakpoint
CREATE TABLE `rate_limit_policies` (
	`id` text PRIMARY KEY NOT NULL,
	`boundary` text NOT NULL,
	`window_seconds` integer NOT NULL,
	`request_limit` integer NOT NULL,
	`block_seconds` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`approved_by` text,
	`approved_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rate_limit_boundary_unique` ON `rate_limit_policies` (`boundary`);--> statement-breakpoint
CREATE INDEX `rate_limit_status_idx` ON `rate_limit_policies` (`status`);--> statement-breakpoint
CREATE TABLE `readiness_decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`scope` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`decided_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`decided_by` text,
	`required_gates` text DEFAULT '[]' NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `readiness_scope_time_idx` ON `readiness_decisions` (`scope`,`decided_at`);--> statement-breakpoint
CREATE INDEX `readiness_decision_idx` ON `readiness_decisions` (`decision`);--> statement-breakpoint
CREATE TABLE `security_control_evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`control_key` text NOT NULL,
	`observed_at` text NOT NULL,
	`status` text NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`validated_by` text,
	`expires_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `security_control_time_idx` ON `security_control_evidence` (`control_key`,`observed_at`);--> statement-breakpoint
CREATE INDEX `security_control_status_idx` ON `security_control_evidence` (`status`);