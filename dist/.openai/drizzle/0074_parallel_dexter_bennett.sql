CREATE TABLE `site_alert_contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`site_id` text NOT NULL,
	`name` text NOT NULL,
	`role` text,
	`email` text,
	`phone` text,
	`priority` integer DEFAULT 1 NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`site_id`) REFERENCES `network_sites`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `site_alert_contacts_site_status_idx` ON `site_alert_contacts` (`site_id`,`status`,`priority`);--> statement-breakpoint
CREATE TABLE `site_escalation_rules` (
	`id` text PRIMARY KEY NOT NULL,
	`site_id` text NOT NULL,
	`contact_id` text NOT NULL,
	`condition` text NOT NULL,
	`severity` text NOT NULL,
	`delay_minutes` integer DEFAULT 0 NOT NULL,
	`step` integer DEFAULT 1 NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`site_id`) REFERENCES `network_sites`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`contact_id`) REFERENCES `site_alert_contacts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `site_escalation_rule_step_unique` ON `site_escalation_rules` (`site_id`,`condition`,`step`);--> statement-breakpoint
CREATE INDEX `site_escalation_rules_site_status_idx` ON `site_escalation_rules` (`site_id`,`status`);--> statement-breakpoint
CREATE INDEX `site_escalation_rules_contact_idx` ON `site_escalation_rules` (`contact_id`);