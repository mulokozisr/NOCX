CREATE TABLE `device_onboarding_enrollment_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`enrollment_request_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`reason` text NOT NULL,
	`request_digest` text NOT NULL,
	`reviewed_by` text NOT NULL,
	`reviewed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_creation_authorized` integer DEFAULT false NOT NULL,
	`monitoring_activation_authorized` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`enrollment_request_id`) REFERENCES `device_onboarding_enrollment_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_enrollment_review_request_time_idx` ON `device_onboarding_enrollment_reviews` (`enrollment_request_id`,`reviewed_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_enrollment_review_decision_idx` ON `device_onboarding_enrollment_reviews` (`decision`);