CREATE TABLE `corrective_actions` (
	`id` text PRIMARY KEY NOT NULL,
	`action_number` text NOT NULL,
	`review_id` text NOT NULL,
	`title` text NOT NULL,
	`owner_email` text NOT NULL,
	`due_at` text NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`verification_evidence` text,
	`verified_by` text,
	`verified_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`review_id`) REFERENCES `incident_reviews`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `corrective_actions_number_unique` ON `corrective_actions` (`action_number`);--> statement-breakpoint
CREATE INDEX `corrective_actions_review_status_idx` ON `corrective_actions` (`review_id`,`status`);--> statement-breakpoint
CREATE INDEX `corrective_actions_owner_due_idx` ON `corrective_actions` (`owner_email`,`due_at`);--> statement-breakpoint
CREATE TABLE `incident_reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`review_number` text NOT NULL,
	`incident_id` text NOT NULL,
	`title` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`owner_email` text NOT NULL,
	`impact_summary` text DEFAULT '' NOT NULL,
	`root_cause` text DEFAULT '' NOT NULL,
	`contributing_factors` text DEFAULT '[]' NOT NULL,
	`downtime_minutes` integer DEFAULT 0 NOT NULL,
	`due_at` text NOT NULL,
	`approved_by` text,
	`approved_at` text,
	`revision` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `incident_reviews_number_unique` ON `incident_reviews` (`review_number`);--> statement-breakpoint
CREATE UNIQUE INDEX `incident_reviews_incident_unique` ON `incident_reviews` (`incident_id`);--> statement-breakpoint
CREATE INDEX `incident_reviews_status_due_idx` ON `incident_reviews` (`status`,`due_at`);--> statement-breakpoint
CREATE INDEX `incident_reviews_owner_idx` ON `incident_reviews` (`owner_email`);