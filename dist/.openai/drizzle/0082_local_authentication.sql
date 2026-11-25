CREATE TABLE local_credentials (
 operator_id text PRIMARY KEY NOT NULL REFERENCES operators(id),
 username text NOT NULL UNIQUE COLLATE NOCASE,
 password_hash text NOT NULL,
 must_change_password integer NOT NULL DEFAULT 1,
 version integer NOT NULL DEFAULT 1,
 updated_at text NOT NULL
);
--> statement-breakpoint
CREATE TABLE local_sessions (
 id text PRIMARY KEY NOT NULL,
 operator_id text NOT NULL REFERENCES operators(id),
 token_hash text NOT NULL UNIQUE,
 credential_version integer NOT NULL,
 created_at text NOT NULL,
 last_seen_at text NOT NULL,
 expires_at text NOT NULL,
 revoked_at text
);
--> statement-breakpoint
CREATE INDEX local_sessions_operator_idx ON local_sessions(operator_id);
--> statement-breakpoint
CREATE INDEX local_sessions_expiry_idx ON local_sessions(expires_at);
