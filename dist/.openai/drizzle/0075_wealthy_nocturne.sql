CREATE TABLE `site_maintenance_windows` (
	`id` text PRIMARY KEY NOT NULL,
	`site_id` text NOT NULL,
	`title` text NOT NULL,
	`reason` text NOT NULL,
	`owner` text NOT NULL,
	`starts_at` text NOT NULL,
	`ends_at` text NOT NULL,
	`suppression_mode` text DEFAULT 'alerts_only' NOT NULL,
	`status` text DEFAULT 'scheduled' NOT NULL,
	`cancelled_at` text,
	`cancelled_by` text,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`site_id`) REFERENCES `network_sites`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `site_maintenance_windows_site_time_idx` ON `site_maintenance_windows` (`site_id`,`status`,`starts_at`,`ends_at`);--> statement-breakpoint
CREATE INDEX `site_maintenance_windows_end_idx` ON `site_maintenance_windows` (`ends_at`);