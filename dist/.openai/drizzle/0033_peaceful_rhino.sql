CREATE TABLE `device_onboarding_permit_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`activation_review_id` text NOT NULL,
	`activation_request_id` text NOT NULL,
	`window_id` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`executor_operator_id` text NOT NULL,
	`proposed_start` text NOT NULL,
	`proposed_end` text NOT NULL,
	`scope_candidate_ids` text DEFAULT '[]' NOT NULL,
	`review_digest` text NOT NULL,
	`requested_by` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_contact_authorized` integer DEFAULT false NOT NULL,
	`credential_execution_authorized` integer DEFAULT false NOT NULL,
	`activation_authorized` integer DEFAULT false NOT NULL,
	`network_writes_authorized` integer DEFAULT false NOT NULL,
	`execution_permit_issued` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`activation_review_id`) REFERENCES `device_onboarding_activation_reviews`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`activation_request_id`) REFERENCES `device_onboarding_activation_requests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`window_id`) REFERENCES `device_onboarding_windows`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`executor_operator_id`) REFERENCES `operators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_permit_review_idx` ON `device_onboarding_permit_requests` (`activation_review_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_permit_window_status_idx` ON `device_onboarding_permit_requests` (`window_id`,`status`);--> statement-breakpoint
CREATE INDEX `device_onboarding_permit_time_idx` ON `device_onboarding_permit_requests` (`proposed_start`,`proposed_end`);