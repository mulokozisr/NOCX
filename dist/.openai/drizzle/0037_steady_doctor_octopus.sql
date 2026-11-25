CREATE TABLE `device_onboarding_permit_consumptions` (
	`id` text PRIMARY KEY NOT NULL,
	`runtime_permit_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`candidate_ids` text DEFAULT '[]' NOT NULL,
	`runtime_permit_digest` text NOT NULL,
	`consumed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`device_contact_attempted` integer DEFAULT false NOT NULL,
	`credential_execution_attempted` integer DEFAULT false NOT NULL,
	`network_writes_attempted` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`runtime_permit_id`) REFERENCES `device_onboarding_runtime_permits`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_permit_consumption_unique` ON `device_onboarding_permit_consumptions` (`runtime_permit_id`,`collector_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_permit_consumption_time_idx` ON `device_onboarding_permit_consumptions` (`consumed_at`);