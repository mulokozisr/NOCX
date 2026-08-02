CREATE TABLE `discovery_evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`scope_id` text NOT NULL,
	`device_id` text,
	`evidence_type` text NOT NULL,
	`observed_at` text NOT NULL,
	`payload` text DEFAULT '{}' NOT NULL,
	`source_collector_id` text NOT NULL,
	`status` text DEFAULT 'candidate' NOT NULL,
	`reviewed_by` text,
	`reviewed_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`scope_id`) REFERENCES `discovery_scopes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`source_collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `discovery_evidence_scope_idx` ON `discovery_evidence` (`scope_id`,`observed_at`);--> statement-breakpoint
CREATE INDEX `discovery_evidence_status_idx` ON `discovery_evidence` (`status`);--> statement-breakpoint
CREATE TABLE `discovery_scopes` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`collector_id` text NOT NULL,
	`target_boundary` text NOT NULL,
	`methods` text DEFAULT '[]' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`approved_by` text,
	`approved_at` text,
	`probes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `discovery_scope_status_idx` ON `discovery_scopes` (`status`);--> statement-breakpoint
CREATE INDEX `discovery_scope_collector_idx` ON `discovery_scopes` (`collector_id`);--> statement-breakpoint
CREATE TABLE `topology_dependencies` (
	`id` text PRIMARY KEY NOT NULL,
	`upstream_device_id` text NOT NULL,
	`downstream_device_id` text NOT NULL,
	`relation` text NOT NULL,
	`confidence` integer NOT NULL,
	`source_evidence_id` text,
	`status` text DEFAULT 'candidate' NOT NULL,
	`affected_customers` integer DEFAULT 0 NOT NULL,
	`approved_by` text,
	`approved_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`upstream_device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`downstream_device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`source_evidence_id`) REFERENCES `discovery_evidence`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `topology_dependency_pair_unique` ON `topology_dependencies` (`upstream_device_id`,`downstream_device_id`,`relation`);--> statement-breakpoint
CREATE INDEX `topology_dependency_status_idx` ON `topology_dependencies` (`status`);--> statement-breakpoint
CREATE INDEX `topology_dependency_upstream_idx` ON `topology_dependencies` (`upstream_device_id`);