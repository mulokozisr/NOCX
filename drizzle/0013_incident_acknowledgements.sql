CREATE TABLE `incident_acknowledgements` (
	`id` text PRIMARY KEY NOT NULL,
	`incident_id` text NOT NULL,
	`notification_id` text NOT NULL,
	`acknowledged_by` text NOT NULL,
	`acknowledged_at` text NOT NULL,
	`source` text DEFAULT 'notification-center' NOT NULL,
	`note` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`notification_id`) REFERENCES `notifications`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `incident_ack_incident_unique` ON `incident_acknowledgements` (`incident_id`);--> statement-breakpoint
CREATE INDEX `incident_ack_time_idx` ON `incident_acknowledgements` (`acknowledged_at`);--> statement-breakpoint
CREATE INDEX `incident_ack_operator_idx` ON `incident_acknowledgements` (`acknowledged_by`);