CREATE TABLE `incident_notes` (
	`id` text PRIMARY KEY NOT NULL,
	`incident_id` text NOT NULL,
	`author` text NOT NULL,
	`body` text NOT NULL,
	`kind` text DEFAULT 'note' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `incident_notes_incident_time_idx` ON `incident_notes` (`incident_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `site_assignment_history` (
	`id` text PRIMARY KEY NOT NULL,
	`device_id` text NOT NULL,
	`site_id` text,
	`previous_site_id` text,
	`previous_site_name` text,
	`assigned_at` text NOT NULL,
	`assigned_by` text NOT NULL,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`site_id`) REFERENCES `network_sites`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `site_assignment_device_time_idx` ON `site_assignment_history` (`device_id`,`assigned_at`);--> statement-breakpoint
ALTER TABLE `devices` ADD `site_id` text REFERENCES network_sites(id);--> statement-breakpoint
ALTER TABLE `incidents` ADD `device_id` text REFERENCES devices(id);--> statement-breakpoint
ALTER TABLE `incidents` ADD `interface_name` text;