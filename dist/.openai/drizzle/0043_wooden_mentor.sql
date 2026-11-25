CREATE TABLE `device_onboarding_creation_decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`creation_request_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`reason` text NOT NULL,
	`creation_request_digest` text NOT NULL,
	`decided_by` text NOT NULL,
	`decided_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_creation_authorized` integer DEFAULT false NOT NULL,
	`monitoring_activation_authorized` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`creation_request_id`) REFERENCES `device_onboarding_creation_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_creation_decision_request_time_idx` ON `device_onboarding_creation_decisions` (`creation_request_id`,`decided_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_creation_decision_idx` ON `device_onboarding_creation_decisions` (`decision`);