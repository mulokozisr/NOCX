CREATE TABLE `device_onboarding_monitoring_authorization_decisions` (
	`id` text PRIMARY KEY NOT NULL,
	`monitoring_authorization_request_id` text NOT NULL,
	`decision` text DEFAULT 'blocked' NOT NULL,
	`reason` text NOT NULL,
	`authorization_request_digest` text NOT NULL,
	`decided_by` text NOT NULL,
	`decided_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`monitoring_activation_authorized` integer DEFAULT false NOT NULL,
	`device_contact_authorized` integer DEFAULT false NOT NULL,
	`credential_execution_authorized` integer DEFAULT false NOT NULL,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`monitoring_authorization_request_id`) REFERENCES `device_onboarding_monitoring_authorization_requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_authorization_decision_request_time_idx` ON `device_onboarding_monitoring_authorization_decisions` (`monitoring_authorization_request_id`,`decided_at`);--> statement-breakpoint
CREATE INDEX `device_onboarding_monitoring_authorization_decision_idx` ON `device_onboarding_monitoring_authorization_decisions` (`decision`);