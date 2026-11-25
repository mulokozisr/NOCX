CREATE TABLE `device_onboarding_creation_executions` (
	`id` text PRIMARY KEY NOT NULL,
	`creation_decision_id` text NOT NULL,
	`creation_request_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`device_id` text NOT NULL,
	`status` text DEFAULT 'reserved' NOT NULL,
	`creation_decision_digest` text NOT NULL,
	`executed_by` text NOT NULL,
	`executed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_created` integer DEFAULT false NOT NULL,
	`monitoring_activated` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`creation_decision_id`) REFERENCES `device_onboarding_creation_decisions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`creation_request_id`) REFERENCES `device_onboarding_creation_requests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_creation_execution_decision_unique` ON `device_onboarding_creation_executions` (`creation_decision_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_creation_execution_device_unique` ON `device_onboarding_creation_executions` (`device_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_creation_execution_status_time_idx` ON `device_onboarding_creation_executions` (`status`,`executed_at`);