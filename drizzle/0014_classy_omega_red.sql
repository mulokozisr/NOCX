CREATE TABLE `customer_services` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_id` text NOT NULL,
	`service_code` text NOT NULL,
	`plan_name` text NOT NULL,
	`access_type` text NOT NULL,
	`site` text NOT NULL,
	`region` text,
	`endpoint_ip` text,
	`cpe_label` text,
	`lifecycle_state` text DEFAULT 'active' NOT NULL,
	`sla_target_bps` integer DEFAULT 9950 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customer_services_code_unique` ON `customer_services` (`service_code`);--> statement-breakpoint
CREATE INDEX `customer_services_customer_idx` ON `customer_services` (`customer_id`);--> statement-breakpoint
CREATE INDEX `customer_services_state_idx` ON `customer_services` (`lifecycle_state`);--> statement-breakpoint
CREATE INDEX `customer_services_site_idx` ON `customer_services` (`site`);--> statement-breakpoint
CREATE TABLE `service_dependencies` (
	`id` text PRIMARY KEY NOT NULL,
	`service_id` text NOT NULL,
	`device_id` text NOT NULL,
	`interface_name` text NOT NULL,
	`dependency_role` text DEFAULT 'access' NOT NULL,
	`status` text DEFAULT 'approved' NOT NULL,
	`approved_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`service_id`) REFERENCES `customer_services`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `service_dependency_unique` ON `service_dependencies` (`service_id`,`device_id`,`interface_name`);--> statement-breakpoint
CREATE INDEX `service_dependency_device_interface_idx` ON `service_dependencies` (`device_id`,`interface_name`);--> statement-breakpoint
CREATE INDEX `service_dependency_service_idx` ON `service_dependencies` (`service_id`);--> statement-breakpoint
CREATE TABLE `service_incident_impacts` (
	`id` text PRIMARY KEY NOT NULL,
	`service_id` text NOT NULL,
	`incident_id` text NOT NULL,
	`impact_state` text DEFAULT 'active' NOT NULL,
	`impact_type` text NOT NULL,
	`started_at` text NOT NULL,
	`ended_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`service_id`) REFERENCES `customer_services`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `service_incident_impact_unique` ON `service_incident_impacts` (`service_id`,`incident_id`);--> statement-breakpoint
CREATE INDEX `service_impact_incident_idx` ON `service_incident_impacts` (`incident_id`,`impact_state`);--> statement-breakpoint
CREATE INDEX `service_impact_service_time_idx` ON `service_incident_impacts` (`service_id`,`started_at`);