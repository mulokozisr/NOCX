CREATE TABLE `device_onboarding_recurring_monitoring_activation_decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`recurring_monitoring_activation_review_id` text NOT NULL,
	`recurring_monitoring_activation_request_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`reason` text NOT NULL,
	`activation_review_digest` text NOT NULL,
	`decided_by` text NOT NULL,
	`decided_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`recurring_monitoring_authorized` integer DEFAULT false NOT NULL,
	`polling_started` integer DEFAULT false NOT NULL,
	`alerts_enabled` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`recurring_monitoring_activation_review_id`) REFERENCES `device_onboarding_recurring_monitoring_activation_reviews`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recurring_monitoring_activation_request_id`) REFERENCES `device_onboarding_recurring_monitoring_activation_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_recurring_activation_decision_review_unique` ON `device_onboarding_recurring_monitoring_activation_decisions` (`recurring_monitoring_activation_review_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_recurring_activation_decision_time_idx` ON `device_onboarding_recurring_monitoring_activation_decisions` (`decision`,`decided_at`);