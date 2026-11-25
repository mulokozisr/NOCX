CREATE TABLE `device_onboarding_monitoring_authorization_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_activation_review_id` text NOT NULL,
	`monitoring_activation_request_id` text NOT NULL,
	`creation_execution_id` text NOT NULL,
	`device_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`monitoring_activation_request_digest` text NOT NULL,
	`monitoring_activation_review_digest` text NOT NULL,
	`requested_by` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`monitoring_activation_authorized` integer DEFAULT false NOT NULL,
	`device_contact_authorized` integer DEFAULT false NOT NULL,
	`credential_execution_authorized` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_activation_review_id`) REFERENCES `device_onboarding_monitoring_activation_reviews`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monitoring_activation_request_id`) REFERENCES `device_onboarding_monitoring_activation_requests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`creation_execution_id`) REFERENCES `device_onboarding_creation_executions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_monitoring_authorization_review_unique` ON `device_onboarding_monitoring_authorization_requests` (`monitoring_activation_review_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_authorization_device_time_idx` ON `device_onboarding_monitoring_authorization_requests` (`device_id`,`requested_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_authorization_status_time_idx` ON `device_onboarding_monitoring_authorization_requests` (`status`,`requested_at`);