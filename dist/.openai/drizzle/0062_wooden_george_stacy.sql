CREATE TABLE `device_onboarding_recurring_monitoring_activation_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_poll_completion_decision_id` text NOT NULL,
	`monitoring_poll_execution_start_id` text NOT NULL,
	`device_id` text NOT NULL,
	`candidate_id` text NOT NULL,
	`collector_id` text NOT NULL,
	`status` text DEFAULT 'requested' NOT NULL,
	`completion_decision_digest` text NOT NULL,
	`poll_interval_seconds` integer DEFAULT 60 NOT NULL,
	`allowed_operations` text DEFAULT '[]' NOT NULL,
	`requested_by` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`recurring_monitoring_authorized` integer DEFAULT false NOT NULL,
	`polling_started` integer DEFAULT false NOT NULL,
	`alerts_enabled` integer DEFAULT false NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`snmp_set_allowed` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_poll_completion_decision_id`) REFERENCES `device_onboarding_monitoring_poll_completion_decisions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`monitoring_poll_execution_start_id`) REFERENCES `device_onboarding_monitoring_poll_execution_starts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `device_onboarding_recurring_activation_completion_unique` ON `device_onboarding_recurring_monitoring_activation_requests` (`monitoring_poll_completion_decision_id`);--> statement-breakpoint
CREATE INDEX `device_onboarding_recurring_activation_status_time_idx` ON `device_onboarding_recurring_monitoring_activation_requests` (`status`,`requested_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_recurring_activation_collector_idx` ON `device_onboarding_recurring_monitoring_activation_requests` (`collector_id`,`requested_at`);