CREATE TABLE `device_onboarding_recurring_monitoring_schedules` (
	`id` text PRIMARY KEY NOT NULL,
	`recurring_monitoring_activation_decision_id` text NOT NULL,
	`recurring_monitoring_activation_request_id` text NOT NULL,
	`device_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`status` text DEFAULT 'registered' NOT NULL,
	`activation_decision_digest` text NOT NULL,
	`poll_interval_seconds` integer DEFAULT 60 NOT NULL,
	`allowed_operations` text DEFAULT '[]' NOT NULL,
	`registered_by` text NOT NULL,
	`registered_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`recurring_monitoring_authorized` integer DEFAULT true NOT NULL,
	`polling_started` integer DEFAULT false NOT NULL,
	`alerts_enabled` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`recurring_monitoring_activation_decision_id`) REFERENCES `device_onboarding_recurring_monitoring_activation_decisions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`recurring_monitoring_activation_request_id`) REFERENCES `device_onboarding_recurring_monitoring_activation_requests`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_recurring_schedule_decision_unique` ON `device_onboarding_recurring_monitoring_schedules` (`recurring_monitoring_activation_decision_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_recurring_schedule_device_unique` ON `device_onboarding_recurring_monitoring_schedules` (`device_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_recurring_schedule_collector_idx` ON `device_onboarding_recurring_monitoring_schedules` (`collector_id`,`registered_at`);