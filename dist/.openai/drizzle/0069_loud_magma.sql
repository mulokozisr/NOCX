CREATE TABLE `cudy_discovery_candidates` (
	`id` text PRIMARY KEY NOT NULL,
	`scope_id` text NOT NULL,
	`address` text NOT NULL,
	`hostname` text,
	`model` text,
	`fingerprint_digest` text NOT NULL,
	`evidence_keys` text DEFAULT '[]' NOT NULL,
	`confidence` integer NOT NULL,
	`status` text DEFAULT 'discovered' NOT NULL,
	`discovered_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`collector_authenticated` integer DEFAULT true NOT NULL,
	`credential_values_stored` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`scope_id`) REFERENCES `cudy_discovery_scopes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cudy_discovery_scope_address_unique` ON `cudy_discovery_candidates` (`scope_id`,`address`);--> statement-breakpoint
CREATE INDEX `cudy_discovery_candidate_status_idx` ON `cudy_discovery_candidates` (`status`,`confidence`);--> statement-breakpoint
CREATE TABLE `cudy_discovery_scopes` (
	`id` text PRIMARY KEY NOT NULL,
	`collector_id` text NOT NULL,
	`cidr` text NOT NULL,
	`site` text NOT NULL,
	`owner` text NOT NULL,
	`methods` text DEFAULT '[]' NOT NULL,
	`max_hosts` integer NOT NULL,
	`status` text DEFAULT 'queued' NOT NULL,
	`requested_by` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`expires_at` text NOT NULL,
	`completed_at` text,
	`probes_authorized` integer DEFAULT true NOT NULL,
	`credential_execution_authorized` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `cudy_discovery_scope_collector_status_idx` ON `cudy_discovery_scopes` (`collector_id`,`status`,`expires_at`);--> statement-breakpoint
CREATE INDEX `cudy_discovery_scope_time_idx` ON `cudy_discovery_scopes` (`requested_at`);