CREATE TABLE `service_mapping_history` (
	`id` text PRIMARY KEY NOT NULL,
	`service_id` text NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`before_snapshot` text NOT NULL,
	`after_snapshot` text NOT NULL,
	`reason` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`service_id`) REFERENCES `customer_services`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `service_mapping_history_service_time_idx` ON `service_mapping_history` (`service_id`,`created_at`);
--> statement-breakpoint
CREATE TRIGGER devices_legacy_active_site_insert BEFORE INSERT ON devices WHEN NEW.site_id IS NULL
BEGIN
 SELECT RAISE(ABORT, 'Legacy device site must be active') WHERE EXISTS (SELECT 1 FROM network_sites WHERE name=NEW.site AND status<>'active');
END;
--> statement-breakpoint
CREATE TRIGGER devices_legacy_active_site_update BEFORE UPDATE OF site,site_id ON devices WHEN NEW.site_id IS NULL
BEGIN
 SELECT RAISE(ABORT, 'Legacy device site must be active') WHERE EXISTS (SELECT 1 FROM network_sites WHERE name=NEW.site AND status<>'active');
END;
--> statement-breakpoint
CREATE TRIGGER services_active_site_insert BEFORE INSERT ON customer_services WHEN NEW.lifecycle_state='active'
BEGIN
 SELECT RAISE(ABORT, 'Service site must be active and owned by its customer') WHERE NEW.site_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM network_sites WHERE id=NEW.site_id AND status='active' AND customer_id=NEW.customer_id);
 SELECT RAISE(ABORT, 'Legacy service site must be active and owned by its customer') WHERE NEW.site_id IS NULL AND EXISTS (SELECT 1 FROM network_sites WHERE name=NEW.site AND (status<>'active' OR customer_id IS NOT NEW.customer_id));
END;
--> statement-breakpoint
CREATE TRIGGER services_active_site_update BEFORE UPDATE OF site,site_id,customer_id,lifecycle_state ON customer_services WHEN NEW.lifecycle_state='active'
BEGIN
 SELECT RAISE(ABORT, 'Service site must be active and owned by its customer') WHERE NEW.site_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM network_sites WHERE id=NEW.site_id AND status='active' AND customer_id=NEW.customer_id);
 SELECT RAISE(ABORT, 'Legacy service site must be active and owned by its customer') WHERE NEW.site_id IS NULL AND EXISTS (SELECT 1 FROM network_sites WHERE name=NEW.site AND (status<>'active' OR customer_id IS NOT NEW.customer_id));
END;

--> statement-breakpoint
CREATE TRIGGER service_mapping_history_no_update BEFORE UPDATE ON service_mapping_history BEGIN SELECT RAISE(ABORT, 'Service mapping history is immutable'); END;
--> statement-breakpoint
CREATE TRIGGER service_mapping_history_no_delete BEFORE DELETE ON service_mapping_history BEGIN SELECT RAISE(ABORT, 'Service mapping history is immutable'); END;
