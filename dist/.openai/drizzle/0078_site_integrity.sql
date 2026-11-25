CREATE TRIGGER devices_active_site_insert BEFORE INSERT ON devices WHEN NEW.site_id IS NOT NULL
BEGIN
 SELECT RAISE(ABORT, 'Device site must be active') WHERE NOT EXISTS (SELECT 1 FROM network_sites WHERE id=NEW.site_id AND status='active');
END;
--> statement-breakpoint
CREATE TRIGGER devices_active_site_update BEFORE UPDATE OF site_id ON devices WHEN NEW.site_id IS NOT NULL
BEGIN
 SELECT RAISE(ABORT, 'Device site must be active') WHERE NOT EXISTS (SELECT 1 FROM network_sites WHERE id=NEW.site_id AND status='active');
END;
--> statement-breakpoint
CREATE TRIGGER site_archive_requires_empty BEFORE UPDATE OF status ON network_sites WHEN NEW.status='archived' AND OLD.status<>'archived'
BEGIN
 SELECT RAISE(ABORT, 'Move or unassign devices before archiving') WHERE EXISTS (SELECT 1 FROM devices WHERE site_id=OLD.id OR (site_id IS NULL AND site=OLD.name));
 SELECT RAISE(ABORT, 'Site has active service mappings') WHERE EXISTS (SELECT 1 FROM customer_services WHERE lifecycle_state='active' AND (site_id=OLD.id OR (site_id IS NULL AND site=OLD.name)));
END;
--> statement-breakpoint
CREATE TRIGGER site_customer_requires_service_consistency BEFORE UPDATE OF customer_id ON network_sites WHEN NEW.customer_id IS NOT OLD.customer_id
BEGIN
 SELECT RAISE(ABORT, 'Remap active services before changing site customer') WHERE EXISTS (SELECT 1 FROM customer_services WHERE lifecycle_state='active' AND (site_id=OLD.id OR (site_id IS NULL AND site=OLD.name)) AND customer_id IS NOT NEW.customer_id);
END;
