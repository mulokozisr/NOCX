CREATE TABLE `mikrotik_installation_evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`token_id` text NOT NULL,
	`device_candidate_id` text NOT NULL,
	`event_type` text NOT NULL,
	`outcome` text NOT NULL,
	`script_digest` text NOT NULL,
	`request_id` text,
	`source_fingerprint` text,
	`observed_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`snmp_enabled` integer DEFAULT false NOT NULL,
	`details` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`token_id`) REFERENCES `mikrotik_installer_tokens`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`device_candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `mikrotik_installation_device_time_idx` ON `mikrotik_installation_evidence` (`device_candidate_id`,`observed_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `mikrotik_installation_token_unique` ON `mikrotik_installation_evidence` (`token_id`);--> statement-breakpoint
CREATE TABLE `mikrotik_installer_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`device_candidate_id` text NOT NULL,
	`token_digest` text NOT NULL,
	`token_hint` text NOT NULL,
	`status` text DEFAULT 'issued' NOT NULL,
	`expires_at` text NOT NULL,
	`consumed_at` text,
	`issued_by` text NOT NULL,
	`server_endpoint` text NOT NULL,
	`server_public_key` text NOT NULL,
	`tunnel_address` text NOT NULL,
	`collector_tunnel_address` text NOT NULL,
	`script_digest` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`device_candidate_id`) REFERENCES `device_intake_candidates`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `mikrotik_installer_token_digest_unique` ON `mikrotik_installer_tokens` (`token_digest`);--> statement-breakpoint
CREATE INDEX `mikrotik_installer_device_status_idx` ON `mikrotik_installer_tokens` (`device_candidate_id`,`status`);--> statement-breakpoint
CREATE INDEX `mikrotik_installer_expiry_idx` ON `mikrotik_installer_tokens` (`expires_at`);