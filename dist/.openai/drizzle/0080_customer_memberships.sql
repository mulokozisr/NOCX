CREATE TABLE customer_memberships (
 subject_id TEXT PRIMARY KEY NOT NULL,
 customer_id TEXT NOT NULL REFERENCES customers(id),
 status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active','revoked')),
 granted_by TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX customer_memberships_customer_idx ON customer_memberships(customer_id,status);
