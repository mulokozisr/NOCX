CREATE TABLE `sites` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`name_key` text NOT NULL,
	`region` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sites_name_key_unique` ON `sites` (`name_key`);--> statement-breakpoint
ALTER TABLE `devices` ADD `site_id` text REFERENCES sites(id);--> statement-breakpoint
ALTER TABLE `devices` ADD `collector_id` text REFERENCES collectors(id);--> statement-breakpoint
ALTER TABLE `devices` ADD `monitoring_enabled` integer DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE `devices` ADD `poll_interval_seconds` integer DEFAULT 60 NOT NULL;--> statement-breakpoint
ALTER TABLE `devices` ADD `last_observed_at` text;
--> statement-breakpoint
-- Normalize legacy labels without deleting the original text columns.
INSERT INTO sites (id, name, name_key)
SELECT 'legacy-' || hex(lower(trim(site))), min(trim(site)), lower(trim(site))
FROM devices WHERE site IS NOT NULL AND trim(site) <> '' GROUP BY lower(trim(site));
--> statement-breakpoint
UPDATE devices SET site_id = (SELECT id FROM sites WHERE name_key = lower(trim(devices.site)));
--> statement-breakpoint
UPDATE devices SET collector_id = 'collector-doxa-vps'
WHERE id IN ('device-cudy-lt400-pilot', 'device-mikrotik-rb750gr3-pilot')
AND EXISTS (SELECT 1 FROM collectors WHERE id = 'collector-doxa-vps');
--> statement-breakpoint
UPDATE devices SET last_observed_at = (SELECT max(observed_at) FROM availability_samples WHERE device_id = devices.id);
--> statement-breakpoint
UPDATE devices SET last_seen_at = COALESCE((SELECT max(observed_at) FROM availability_samples WHERE device_id = devices.id AND online = 1), last_seen_at);
