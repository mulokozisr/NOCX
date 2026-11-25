CREATE TABLE `network_sites` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`customer_id` text,
	`region` text,
	`address` text,
	`contact_name` text,
	`contact_phone` text,
	`timezone` text DEFAULT 'Africa/Dar_es_Salaam' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`archived_at` text,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `network_sites_name_unique` ON `network_sites` (`name`);--> statement-breakpoint
CREATE INDEX `network_sites_customer_idx` ON `network_sites` (`customer_id`);--> statement-breakpoint
CREATE INDEX `network_sites_status_idx` ON `network_sites` (`status`);