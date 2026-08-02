CREATE TABLE `operator_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`operator_id` text NOT NULL,
	`authenticated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`last_seen_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`expires_at` text NOT NULL,
	`revoked_at` text,
	`auth_source` text DEFAULT 'chatgpt' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`operator_id`) REFERENCES `operators`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `operator_sessions_operator_idx` ON `operator_sessions` (`operator_id`);
--> statement-breakpoint
CREATE INDEX `operator_sessions_expiry_idx` ON `operator_sessions` (`expires_at`);
--> statement-breakpoint
INSERT OR IGNORE INTO `roles` (`id`,`name`,`permissions`) VALUES ('role-platform-owner','Platform Owner','["platform.read","platform.admin","users.manage","roles.manage","audit.read","devices.read","incidents.manage","changes.approve","telemetry.read"]');
--> statement-breakpoint
INSERT OR IGNORE INTO `operators` (`id`,`email`,`display_name`,`role_id`,`status`) VALUES ('operator-scalion','gloryscalion@gmail.com','Scalion Mulokozi','role-platform-owner','active');
