CREATE TABLE `mikrotik_discovery_candidates` (
	`id` text PRIMARY KEY NOT NULL,
	`scope_id` text NOT NULL,
	`address` text NOT NULL,
	`hostname` text,
	`model` text,
	`routeros_version` text,
	`sys_object_id` text NOT NULL,
	`sys_description` text,
	`fingerprint_digest` text NOT NULL,
	`evidence_keys` text DEFAULT '[]' NOT NULL,
	`confidence` integer NOT NULL,
	`status` text DEFAULT 'pending_approval' NOT NULL,
	`discovered_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`reviewed_by` text,
	`reviewed_at` text,
	`collector_authenticated` integer DEFAULT true NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`credential_values_stored` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`scope_id`) REFERENCES `mikrotik_discovery_scopes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mikrotik_discovery_scope_address_unique` ON `mikrotik_discovery_candidates` (`scope_id`,`address`);--> statement-breakpoint
CREATE INDEX `mikrotik_discovery_candidate_status_idx` ON `mikrotik_discovery_candidates` (`status`,`confidence`);--> statement-breakpoint
CREATE INDEX `mikrotik_discovery_candidate_address_idx` ON `mikrotik_discovery_candidates` (`address`);--> statement-breakpoint
CREATE TABLE `mikrotik_discovery_scopes` (
	`id` text PRIMARY KEY NOT NULL,
	`collector_id` text NOT NULL,
	`cidr` text NOT NULL,
	`site` text NOT NULL,
	`owner` text NOT NULL,
	`snmp_mode` text NOT NULL,
	`credential_reference_id` text NOT NULL,
	`methods` text DEFAULT '[]' NOT NULL,
	`max_hosts` integer NOT NULL,
	`status` text DEFAULT 'queued' NOT NULL,
	`requested_by` text NOT NULL,
	`requested_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`expires_at` text NOT NULL,
	`completed_at` text,
	`probes_authorized` integer DEFAULT true NOT NULL,
	`snmp_get_only` integer DEFAULT true NOT NULL,
	`credential_values_stored` integer DEFAULT false NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `mikrotik_discovery_scope_collector_status_idx` ON `mikrotik_discovery_scopes` (`collector_id`,`status`,`expires_at`);--> statement-breakpoint
CREATE INDEX `mikrotik_discovery_scope_time_idx` ON `mikrotik_discovery_scopes` (`requested_at`);