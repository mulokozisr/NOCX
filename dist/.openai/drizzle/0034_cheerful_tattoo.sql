CREATE TABLE `device_onboarding_permit_decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`permit_request_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`reason` text NOT NULL,
	`permit_request_digest` text NOT NULL,
	`decided_by` text NOT NULL,
	`decided_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_contact_authorized` integer DEFAULT false NOT NULL,
	`credential_execution_authorized` integer DEFAULT false NOT NULL,
	`activation_authorized` integer DEFAULT false NOT NULL,
	`network_writes_authorized` integer DEFAULT false NOT NULL,
	`execution_permit_issued` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`permit_request_id`) REFERENCES `device_onboarding_permit_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_permit_decision_request_time_idx` ON `device_onboarding_permit_decisions` (`permit_request_id`,`decided_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_permit_decision_idx` ON `device_onboarding_permit_decisions` (`decision`);