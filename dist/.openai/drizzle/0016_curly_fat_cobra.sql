CREATE TABLE `handover_items` (
	`id` text PRIMARY KEY NOT NULL,
	`handover_id` text NOT NULL,
	`priority` text NOT NULL,
	`title` text NOT NULL,
	`detail` text NOT NULL,
	`source_type` text NOT NULL,
	`source_id` text,
	`owner` text NOT NULL,
	`due_at` text,
	`status` text DEFAULT 'open' NOT NULL,
	`evidence` text DEFAULT '{}' NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`handover_id`) REFERENCES `shift_handovers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `handover_items_handover_priority_idx` ON `handover_items` (`handover_id`,`priority`);--> statement-breakpoint
CREATE INDEX `handover_items_source_idx` ON `handover_items` (`source_type`,`source_id`);--> statement-breakpoint
CREATE INDEX `handover_items_status_idx` ON `handover_items` (`status`);--> statement-breakpoint
CREATE TABLE `handover_notes` (
	`id` text PRIMARY KEY NOT NULL,
	`handover_id` text NOT NULL,
	`note_type` text DEFAULT 'operator_note' NOT NULL,
	`body` text NOT NULL,
	`author_email` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`handover_id`) REFERENCES `shift_handovers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `handover_notes_handover_time_idx` ON `handover_notes` (`handover_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `handover_notes_author_idx` ON `handover_notes` (`author_email`);--> statement-breakpoint
CREATE TABLE `shift_handovers` (
	`id` text PRIMARY KEY NOT NULL,
	`handover_number` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`summary` text NOT NULL,
	`outgoing_operator` text NOT NULL,
	`incoming_operator` text,
	`evidence_as_of` text NOT NULL,
	`prepared_at` text NOT NULL,
	`ready_at` text,
	`accepted_at` text,
	`snapshot` text DEFAULT '{}' NOT NULL,
	`network_writes_enabled` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `shift_handovers_number_unique` ON `shift_handovers` (`handover_number`);--> statement-breakpoint
CREATE INDEX `shift_handovers_status_time_idx` ON `shift_handovers` (`status`,`prepared_at`);--> statement-breakpoint
CREATE INDEX `shift_handovers_outgoing_idx` ON `shift_handovers` (`outgoing_operator`);