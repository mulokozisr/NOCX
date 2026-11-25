DROP INDEX network_monitoring_address_unique;
--> statement-breakpoint
CREATE UNIQUE INDEX network_monitoring_address_unique ON network_monitoring_registrations(management_address) WHERE status <> 'disabled';
--> statement-breakpoint
CREATE TABLE wireguard_peer_inventory (
 provisioner_id TEXT NOT NULL REFERENCES wireguard_provisioners(id) ON DELETE CASCADE,
 public_key TEXT NOT NULL,
 address TEXT NOT NULL,
 observed_at TEXT NOT NULL,
 PRIMARY KEY(provisioner_id,public_key),
 UNIQUE(provisioner_id,address)
);
--> statement-breakpoint
CREATE INDEX wireguard_peer_inventory_address ON wireguard_peer_inventory(address);
