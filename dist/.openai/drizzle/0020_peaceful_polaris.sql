CREATE TABLE `knowledge_articles` (
	`id` text PRIMARY KEY NOT NULL,
	`article_number` text NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`audience` text NOT NULL,
	`owner_email` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`source_type` text NOT NULL,
	`source_id` text NOT NULL,
	`current_revision` integer DEFAULT 1 NOT NULL,
	`review_due_at` text,
	`published_at` text,
	`published_by` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `knowledge_articles_number_unique` ON `knowledge_articles` (`article_number`);--> statement-breakpoint
CREATE INDEX `knowledge_articles_status_review_idx` ON `knowledge_articles` (`status`,`review_due_at`);--> statement-breakpoint
CREATE INDEX `knowledge_articles_owner_idx` ON `knowledge_articles` (`owner_email`);--> statement-breakpoint
CREATE INDEX `knowledge_articles_source_idx` ON `knowledge_articles` (`source_type`,`source_id`);--> statement-breakpoint
CREATE TABLE `knowledge_revisions` (
	`id` text PRIMARY KEY NOT NULL,
	`article_id` text NOT NULL,
	`revision` integer NOT NULL,
	`summary` text NOT NULL,
	`steps` text DEFAULT '[]' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_by` text NOT NULL,
	`approved_by` text,
	`approved_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`article_id`) REFERENCES `knowledge_articles`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `knowledge_revision_unique` ON `knowledge_revisions` (`article_id`,`revision`);--> statement-breakpoint
CREATE INDEX `knowledge_revision_article_status_idx` ON `knowledge_revisions` (`article_id`,`status`);