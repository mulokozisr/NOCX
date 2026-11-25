ALTER TABLE operators ADD COLUMN site_scope_mode text NOT NULL DEFAULT 'all' CHECK (site_scope_mode IN ('all','assigned'));
--> statement-breakpoint
ALTER TABLE operators ADD COLUMN access_revision text NOT NULL DEFAULT '';
--> statement-breakpoint
CREATE TABLE operator_site_access (
 operator_id text NOT NULL REFERENCES operators(id),
 site_id text NOT NULL REFERENCES network_sites(id),
 granted_by text NOT NULL,
 created_at text NOT NULL,
 PRIMARY KEY(operator_id,site_id)
);
--> statement-breakpoint
CREATE INDEX operator_site_access_site_idx ON operator_site_access(site_id);
