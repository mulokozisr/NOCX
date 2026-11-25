CREATE TABLE `device_onboarding_activation_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`release_decision_id` text NOT NULL,
	`window_id` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`change_reference` text NOT NULL,
	`rollback_owner` text NOT NULL,
	`rollback_evidence_reference` text NOT NULL,
	`scope_candidate_ids` text DEFAULT '[]' NOT NULL,
	`manifest_digest` text NOT NULL,
	`requested_by` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`expires_at` text NOT NULL,
	`device_contact_authorized` integer DEFAULT false NOT NULL,
	`credential_execution_authorized` integer DEFAULT false NOT NULL,
	`activation_authorized` integer DEFAULT false NOT NULL,
	`network_writes_authorized` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`release_decision_id`) REFERENCES `device_onboarding_release_decisions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`window_id`) REFERENCES `device_onboarding_windows`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_activation_release_idx` ON `device_onboarding_activation_requests` (`release_decision_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_activation_window_status_idx` ON `device_onboarding_activation_requests` (`window_id`,`status`);--> statement-breakpoint
CREATE INDEX `device_onboarding_activation_expiry_idx` ON `device_onboarding_activation_requests` (`expires_at`);