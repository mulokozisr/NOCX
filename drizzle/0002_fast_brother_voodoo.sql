CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`incident_id` text NOT NULL,
	`kind` text NOT NULL,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`severity` text NOT NULL,
	`read_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `notification_incident_kind_unique` ON `notifications` (`incident_id`,`kind`);--> statement-breakpoint
CREATE INDEX `notifications_read_created_idx` ON `notifications` (`read_at`,`created_at`);