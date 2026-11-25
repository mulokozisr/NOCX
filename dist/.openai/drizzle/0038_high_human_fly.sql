CREATE TABLE `device_onboarding_execution_receipts` (
	`id` text PRIMARY KEY NOT NULL,
	`permit_consumption_id` text NOT NULL,
	`runtime_permit_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`idempotency_key` text NOT NULL,
	`operation` text NOT NULL,
	`outcome` text NOT NULL,
	`observed_at` text NOT NULL,
	`response_digest` text NOT NULL,
	`error_code` text,
	`device_contact_attempted` integer DEFAULT true NOT NULL,
	`credential_execution_attempted` integer DEFAULT true NOT NULL,
	`snmp_set_attempted` integer DEFAULT false NOT NULL,
	`network_writes_attempted` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`permit_consumption_id`) REFERENCES `device_onboarding_permit_consumptions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`runtime_permit_id`) REFERENCES `device_onboarding_runtime_permits`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_execution_idempotency_unique` ON `device_onboarding_execution_receipts` (`collector_id`,`idempotency_key`);--> statement-breakpoint
CREATE INDEX `device_onboarding_execution_permit_time_idx` ON `device_onboarding_execution_receipts` (`runtime_permit_id`,`observed_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_execution_candidate_time_idx` ON `device_onboarding_execution_receipts` (`candidate_id`,`observed_at`);