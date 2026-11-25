CREATE TABLE `device_onboarding_permit_revocations` (
	`id` text PRIMARY KEY NOT NULL,
	`permit_request_id` text NOT NULL,
	`permit_decision_id` text,
	`reason` text NOT NULL,
	`permit_request_digest` text NOT NULL,
	`revoked_by` text NOT NULL,
	`revoked_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_contact_authorized` integer DEFAULT false NOT NULL,
	`credential_execution_authorized` integer DEFAULT false NOT NULL,
	`activation_authorized` integer DEFAULT false NOT NULL,
	`network_writes_authorized` integer DEFAULT false NOT NULL,
	`execution_permit_issued` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`permit_request_id`) REFERENCES `device_onboarding_permit_requests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`permit_decision_id`) REFERENCES `device_onboarding_permit_decisions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_permit_revocation_request_unique` ON `device_onboarding_permit_revocations` (`permit_request_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_permit_revocation_time_idx` ON `device_onboarding_permit_revocations` (`revoked_at`);