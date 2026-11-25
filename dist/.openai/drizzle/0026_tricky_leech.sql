CREATE TABLE `field_work_events` (
	`id` text PRIMARY KEY NOT NULL,
	`work_order_id` text NOT NULL,
	`event_type` text NOT NULL,
	`actor_email` text NOT NULL,
	`from_status` text,
	`to_status` text NOT NULL,
	`body` text NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`work_order_id`) REFERENCES `field_work_orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `field_work_events_order_time_idx` ON `field_work_events` (`work_order_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `field_work_events_type_time_idx` ON `field_work_events` (`event_type`,`created_at`);--> statement-breakpoint
CREATE TABLE `field_work_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`work_number` text NOT NULL,
	`title` text NOT NULL,
	`source_type` text NOT NULL,
	`source_id` text NOT NULL,
	`site` text NOT NULL,
	`region` text,
	`priority` text NOT NULL,
	`status` text DEFAULT 'assigned' NOT NULL,
	`objective` text NOT NULL,
	`access_note` text DEFAULT '' NOT NULL,
	`required_items` text DEFAULT '[]' NOT NULL,
	`due_at` text NOT NULL,
	`owner_email` text NOT NULL,
	`assigned_operator_id` text NOT NULL,
	`created_by` text NOT NULL,
	`accepted_by` text,
	`accepted_at` text,
	`completed_by` text,
	`completed_at` text,
	`verified_by` text,
	`verified_at` text,
	`external_dispatch_enabled` integer DEFAULT false NOT NULL,
	`inventory_actions_enabled` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`assigned_operator_id`) REFERENCES `operators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `field_work_orders_number_unique` ON `field_work_orders` (`work_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `field_work_orders_source_unique` ON `field_work_orders` (`source_type`,`source_id`);--> statement-breakpoint
CREATE INDEX `field_work_orders_status_due_idx` ON `field_work_orders` (`status`,`due_at`);--> statement-breakpoint
CREATE INDEX `field_work_orders_assignee_idx` ON `field_work_orders` (`assigned_operator_id`);--> statement-breakpoint
CREATE INDEX `field_work_orders_priority_idx` ON `field_work_orders` (`priority`);