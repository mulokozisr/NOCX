CREATE TABLE `device_onboarding_runtime_permits` (
	`id` text PRIMARY KEY NOT NULL,
	`permit_decision_id` text NOT NULL,
	`permit_request_id` text NOT NULL,
	`window_id` text NOT NULL,
	`status` text DEFAULT 'issued' NOT NULL,
	`executor_operator_id` text NOT NULL,
	`scope_candidate_ids` text DEFAULT '[]' NOT NULL,
	`permit_request_digest` text NOT NULL,
	`capability_policy` text DEFAULT '{}' NOT NULL,
	`issued_by` text NOT NULL,
	`issued_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`valid_from` text NOT NULL,
	`valid_until` text NOT NULL,
	`device_contact_authorized` integer DEFAULT true NOT NULL,
	`credential_execution_authorized` integer DEFAULT true NOT NULL,
	`activation_authorized` integer DEFAULT true NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`network_writes_authorized` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`permit_decision_id`) REFERENCES `device_onboarding_permit_decisions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`permit_request_id`) REFERENCES `device_onboarding_permit_requests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`window_id`) REFERENCES `device_onboarding_windows`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`executor_operator_id`) REFERENCES `operators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_runtime_permit_decision_unique` ON `device_onboarding_runtime_permits` (`permit_decision_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_runtime_permit_request_idx` ON `device_onboarding_runtime_permits` (`permit_request_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_runtime_permit_status_time_idx` ON `device_onboarding_runtime_permits` (`status`,`valid_from`,`valid_until`);