CREATE TABLE `device_onboarding_creation_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`enrollment_review_id` text NOT NULL,
	`enrollment_request_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`enrollment_request_digest` text NOT NULL,
	`enrollment_review_digest` text NOT NULL,
	`requested_by` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_created` integer DEFAULT false NOT NULL,
	`monitoring_activation_authorized` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`enrollment_review_id`) REFERENCES `device_onboarding_enrollment_reviews`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`enrollment_request_id`) REFERENCES `device_onboarding_enrollment_requests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_creation_review_unique` ON `device_onboarding_creation_requests` (`enrollment_review_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_creation_candidate_time_idx` ON `device_onboarding_creation_requests` (`candidate_id`,`requested_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_creation_status_time_idx` ON `device_onboarding_creation_requests` (`status`,`requested_at`);