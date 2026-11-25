CREATE TABLE `device_onboarding_monitoring_activation_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_activation_request_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`reason` text NOT NULL,
	`request_digest` text NOT NULL,
	`reviewed_by` text NOT NULL,
	`reviewed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`monitoring_activation_authorized` integer DEFAULT false NOT NULL,
	`device_contact_authorized` integer DEFAULT false NOT NULL,
	`credential_execution_authorized` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_activation_request_id`) REFERENCES `device_onboarding_monitoring_activation_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_activation_review_request_time_idx` ON `device_onboarding_monitoring_activation_reviews` (`monitoring_activation_request_id`,`reviewed_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_activation_review_decision_idx` ON `device_onboarding_monitoring_activation_reviews` (`decision`);