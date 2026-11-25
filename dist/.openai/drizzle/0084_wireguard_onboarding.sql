CREATE TABLE wireguard_provisioners (
 id TEXT PRIMARY KEY, token_hash TEXT NOT NULL, collector_id TEXT NOT NULL REFERENCES collectors(id),
 last_seen_at TEXT, created_by TEXT NOT NULL, updated_at TEXT NOT NULL
);
--> statement-breakpoint
CREATE TABLE wireguard_enrollments (
 id TEXT PRIMARY KEY, hostname TEXT NOT NULL, vendor TEXT NOT NULL CHECK(vendor IN ('Cudy','MikroTik')),
 model TEXT NOT NULL, site_id TEXT REFERENCES network_sites(id), provisioner_id TEXT NOT NULL REFERENCES wireguard_provisioners(id),
 public_key TEXT NOT NULL UNIQUE, status TEXT NOT NULL DEFAULT 'queued',
 device_id TEXT NOT NULL UNIQUE, address TEXT, server_public_key TEXT, endpoint TEXT, server_address TEXT,
 error TEXT, created_by TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
 expires_at TEXT NOT NULL, last_observed_at TEXT, online INTEGER, handshake_age_seconds INTEGER
);
--> statement-breakpoint
CREATE UNIQUE INDEX wireguard_enrollment_name_active ON wireguard_enrollments(lower(hostname)) WHERE status <> 'revoked';
--> statement-breakpoint
CREATE UNIQUE INDEX wireguard_enrollment_address_active ON wireguard_enrollments(address) WHERE status <> 'revoked' AND address IS NOT NULL;
--> statement-breakpoint
CREATE TABLE wireguard_mutation_guards(id TEXT PRIMARY KEY,allowed INTEGER NOT NULL CHECK(allowed=1));
