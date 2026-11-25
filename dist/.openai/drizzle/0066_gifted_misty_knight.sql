CREATE TABLE `device_onboarding_recurring_monitoring_schedule_claims` (
	`id` text PRIMARY KEY NOT NULL,
	`recurring_monitoring_schedule_id` text NOT NULL,
	`device_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`status` text DEFAULT 'claimed' NOT NULL,
	`schedule_digest` text NOT NULL,
	`claimed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`collector_authenticated` integer DEFAULT true NOT NULL,
	`polling_started` integer DEFAULT false NOT NULL,
	`alerts_enabled` integer DEFAULT false NOT NULL,
	`credential_values_returned` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`recurring_monitoring_schedule_id`) REFERENCES `device_onboarding_recurring_monitoring_schedules`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_recurring_schedule_claim_unique` ON `device_onboarding_recurring_monitoring_schedule_claims` (`recurring_monitoring_schedule_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_recurring_schedule_claim_collector_idx` ON `device_onboarding_recurring_monitoring_schedule_claims` (`collector_id`,`claimed_at`);