ALTER TABLE wireguard_enrollments ADD COLUMN router_token_hash TEXT;
--> statement-breakpoint
ALTER TABLE wireguard_enrollments ADD COLUMN router_token_expires_at TEXT;
--> statement-breakpoint
ALTER TABLE wireguard_enrollments ADD COLUMN router_version TEXT;
--> statement-breakpoint
CREATE UNIQUE INDEX wireguard_router_token_hash_unique ON wireguard_enrollments(router_token_hash) WHERE router_token_hash IS NOT NULL;
