CREATE TABLE nocx_migration_lock (
 id INTEGER PRIMARY KEY CHECK(id=1),
 export_id TEXT NOT NULL,
 token_hash TEXT NOT NULL,
 operator_id TEXT NOT NULL,
 session_id TEXT NOT NULL,
 credential_version INTEGER NOT NULL,
 started_at INTEGER NOT NULL,
 expires_at INTEGER NOT NULL,
 plan_json TEXT,
 cursor_json TEXT
);

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_api_rate_limit_counters" BEFORE INSERT ON "api_rate_limit_counters"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_api_rate_limit_counters" BEFORE UPDATE ON "api_rate_limit_counters"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_api_rate_limit_counters" BEFORE DELETE ON "api_rate_limit_counters"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_audit_events" BEFORE INSERT ON "audit_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_audit_events" BEFORE UPDATE ON "audit_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_audit_events" BEFORE DELETE ON "audit_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_automation_runbook_events" BEFORE INSERT ON "automation_runbook_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_automation_runbook_events" BEFORE UPDATE ON "automation_runbook_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_automation_runbook_events" BEFORE DELETE ON "automation_runbook_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_automation_runbooks" BEFORE INSERT ON "automation_runbooks"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_automation_runbooks" BEFORE UPDATE ON "automation_runbooks"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_automation_runbooks" BEFORE DELETE ON "automation_runbooks"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_availability_samples" BEFORE INSERT ON "availability_samples"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_availability_samples" BEFORE UPDATE ON "availability_samples"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_availability_samples" BEFORE DELETE ON "availability_samples"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_backup_runs" BEFORE INSERT ON "backup_runs"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_backup_runs" BEFORE UPDATE ON "backup_runs"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_backup_runs" BEFORE DELETE ON "backup_runs"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_change_events" BEFORE INSERT ON "change_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_change_events" BEFORE UPDATE ON "change_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_change_events" BEFORE DELETE ON "change_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_change_requests" BEFORE INSERT ON "change_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_change_requests" BEFORE UPDATE ON "change_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_change_requests" BEFORE DELETE ON "change_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_circuit_events" BEFORE INSERT ON "circuit_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_circuit_events" BEFORE UPDATE ON "circuit_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_circuit_events" BEFORE DELETE ON "circuit_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_collector_credentials" BEFORE INSERT ON "collector_credentials"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_collector_credentials" BEFORE UPDATE ON "collector_credentials"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_collector_credentials" BEFORE DELETE ON "collector_credentials"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_collector_failover_events" BEFORE INSERT ON "collector_failover_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_collector_failover_events" BEFORE UPDATE ON "collector_failover_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_collector_failover_events" BEFORE DELETE ON "collector_failover_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_collector_leases" BEFORE INSERT ON "collector_leases"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_collector_leases" BEFORE UPDATE ON "collector_leases"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_collector_leases" BEFORE DELETE ON "collector_leases"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_collector_queue_checkpoints" BEFORE INSERT ON "collector_queue_checkpoints"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_collector_queue_checkpoints" BEFORE UPDATE ON "collector_queue_checkpoints"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_collector_queue_checkpoints" BEFORE DELETE ON "collector_queue_checkpoints"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_collectors" BEFORE INSERT ON "collectors"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_collectors" BEFORE UPDATE ON "collectors"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_collectors" BEFORE DELETE ON "collectors"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_commissioning_decisions" BEFORE INSERT ON "commissioning_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_commissioning_decisions" BEFORE UPDATE ON "commissioning_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_commissioning_decisions" BEFORE DELETE ON "commissioning_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_commissioning_evidence" BEFORE INSERT ON "commissioning_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_commissioning_evidence" BEFORE UPDATE ON "commissioning_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_commissioning_evidence" BEFORE DELETE ON "commissioning_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_commissioning_plans" BEFORE INSERT ON "commissioning_plans"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_commissioning_plans" BEFORE UPDATE ON "commissioning_plans"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_commissioning_plans" BEFORE DELETE ON "commissioning_plans"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_commissioning_rehearsals" BEFORE INSERT ON "commissioning_rehearsals"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_commissioning_rehearsals" BEFORE UPDATE ON "commissioning_rehearsals"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_commissioning_rehearsals" BEFORE DELETE ON "commissioning_rehearsals"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_corrective_actions" BEFORE INSERT ON "corrective_actions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_corrective_actions" BEFORE UPDATE ON "corrective_actions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_corrective_actions" BEFORE DELETE ON "corrective_actions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_credential_references" BEFORE INSERT ON "credential_references"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_credential_references" BEFORE UPDATE ON "credential_references"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_credential_references" BEFORE DELETE ON "credential_references"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_credential_rotation_events" BEFORE INSERT ON "credential_rotation_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_credential_rotation_events" BEFORE UPDATE ON "credential_rotation_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_credential_rotation_events" BEFORE DELETE ON "credential_rotation_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_credential_validation_evidence" BEFORE INSERT ON "credential_validation_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_credential_validation_evidence" BEFORE UPDATE ON "credential_validation_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_credential_validation_evidence" BEFORE DELETE ON "credential_validation_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_cudy_discovery_candidates" BEFORE INSERT ON "cudy_discovery_candidates"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_cudy_discovery_candidates" BEFORE UPDATE ON "cudy_discovery_candidates"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_cudy_discovery_candidates" BEFORE DELETE ON "cudy_discovery_candidates"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_cudy_discovery_scopes" BEFORE INSERT ON "cudy_discovery_scopes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_cudy_discovery_scopes" BEFORE UPDATE ON "cudy_discovery_scopes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_cudy_discovery_scopes" BEFORE DELETE ON "cudy_discovery_scopes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_cudy_monitoring_registrations" BEFORE INSERT ON "cudy_monitoring_registrations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_cudy_monitoring_registrations" BEFORE UPDATE ON "cudy_monitoring_registrations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_cudy_monitoring_registrations" BEFORE DELETE ON "cudy_monitoring_registrations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_customer_memberships" BEFORE INSERT ON "customer_memberships"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_customer_memberships" BEFORE UPDATE ON "customer_memberships"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_customer_memberships" BEFORE DELETE ON "customer_memberships"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_customer_services" BEFORE INSERT ON "customer_services"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_customer_services" BEFORE UPDATE ON "customer_services"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_customer_services" BEFORE DELETE ON "customer_services"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_customers" BEFORE INSERT ON "customers"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_customers" BEFORE UPDATE ON "customers"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_customers" BEFORE DELETE ON "customers"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_intake_batches" BEFORE INSERT ON "device_intake_batches"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_intake_batches" BEFORE UPDATE ON "device_intake_batches"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_intake_batches" BEFORE DELETE ON "device_intake_batches"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_intake_candidates" BEFORE INSERT ON "device_intake_candidates"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_intake_candidates" BEFORE UPDATE ON "device_intake_candidates"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_intake_candidates" BEFORE DELETE ON "device_intake_candidates"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_activation_requests" BEFORE INSERT ON "device_onboarding_activation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_activation_requests" BEFORE UPDATE ON "device_onboarding_activation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_activation_requests" BEFORE DELETE ON "device_onboarding_activation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_activation_reviews" BEFORE INSERT ON "device_onboarding_activation_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_activation_reviews" BEFORE UPDATE ON "device_onboarding_activation_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_activation_reviews" BEFORE DELETE ON "device_onboarding_activation_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_creation_decisions" BEFORE INSERT ON "device_onboarding_creation_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_creation_decisions" BEFORE UPDATE ON "device_onboarding_creation_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_creation_decisions" BEFORE DELETE ON "device_onboarding_creation_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_creation_executions" BEFORE INSERT ON "device_onboarding_creation_executions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_creation_executions" BEFORE UPDATE ON "device_onboarding_creation_executions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_creation_executions" BEFORE DELETE ON "device_onboarding_creation_executions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_creation_requests" BEFORE INSERT ON "device_onboarding_creation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_creation_requests" BEFORE UPDATE ON "device_onboarding_creation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_creation_requests" BEFORE DELETE ON "device_onboarding_creation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_enrollment_requests" BEFORE INSERT ON "device_onboarding_enrollment_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_enrollment_requests" BEFORE UPDATE ON "device_onboarding_enrollment_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_enrollment_requests" BEFORE DELETE ON "device_onboarding_enrollment_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_enrollment_reviews" BEFORE INSERT ON "device_onboarding_enrollment_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_enrollment_reviews" BEFORE UPDATE ON "device_onboarding_enrollment_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_enrollment_reviews" BEFORE DELETE ON "device_onboarding_enrollment_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_execution_receipts" BEFORE INSERT ON "device_onboarding_execution_receipts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_execution_receipts" BEFORE UPDATE ON "device_onboarding_execution_receipts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_execution_receipts" BEFORE DELETE ON "device_onboarding_execution_receipts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_activation_requests" BEFORE INSERT ON "device_onboarding_monitoring_activation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_activation_requests" BEFORE UPDATE ON "device_onboarding_monitoring_activation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_activation_requests" BEFORE DELETE ON "device_onboarding_monitoring_activation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_activation_reviews" BEFORE INSERT ON "device_onboarding_monitoring_activation_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_activation_reviews" BEFORE UPDATE ON "device_onboarding_monitoring_activation_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_activation_reviews" BEFORE DELETE ON "device_onboarding_monitoring_activation_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_authorization_decisions" BEFORE INSERT ON "device_onboarding_monitoring_authorization_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_authorization_decisions" BEFORE UPDATE ON "device_onboarding_monitoring_authorization_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_authorization_decisions" BEFORE DELETE ON "device_onboarding_monitoring_authorization_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_authorization_requests" BEFORE INSERT ON "device_onboarding_monitoring_authorization_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_authorization_requests" BEFORE UPDATE ON "device_onboarding_monitoring_authorization_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_authorization_requests" BEFORE DELETE ON "device_onboarding_monitoring_authorization_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_collector_claims" BEFORE INSERT ON "device_onboarding_monitoring_collector_claims"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_collector_claims" BEFORE UPDATE ON "device_onboarding_monitoring_collector_claims"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_collector_claims" BEFORE DELETE ON "device_onboarding_monitoring_collector_claims"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_completion_decisions" BEFORE INSERT ON "device_onboarding_monitoring_poll_completion_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_completion_decisions" BEFORE UPDATE ON "device_onboarding_monitoring_poll_completion_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_completion_decisions" BEFORE DELETE ON "device_onboarding_monitoring_poll_completion_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_decisions" BEFORE INSERT ON "device_onboarding_monitoring_poll_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_decisions" BEFORE UPDATE ON "device_onboarding_monitoring_poll_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_decisions" BEFORE DELETE ON "device_onboarding_monitoring_poll_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_execution_decisions" BEFORE INSERT ON "device_onboarding_monitoring_poll_execution_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_execution_decisions" BEFORE UPDATE ON "device_onboarding_monitoring_poll_execution_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_execution_decisions" BEFORE DELETE ON "device_onboarding_monitoring_poll_execution_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_execution_requests" BEFORE INSERT ON "device_onboarding_monitoring_poll_execution_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_execution_requests" BEFORE UPDATE ON "device_onboarding_monitoring_poll_execution_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_execution_requests" BEFORE DELETE ON "device_onboarding_monitoring_poll_execution_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_execution_starts" BEFORE INSERT ON "device_onboarding_monitoring_poll_execution_starts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_execution_starts" BEFORE UPDATE ON "device_onboarding_monitoring_poll_execution_starts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_execution_starts" BEFORE DELETE ON "device_onboarding_monitoring_poll_execution_starts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_operation_receipts" BEFORE INSERT ON "device_onboarding_monitoring_poll_operation_receipts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_operation_receipts" BEFORE UPDATE ON "device_onboarding_monitoring_poll_operation_receipts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_operation_receipts" BEFORE DELETE ON "device_onboarding_monitoring_poll_operation_receipts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_permit_acknowledgements" BEFORE INSERT ON "device_onboarding_monitoring_poll_permit_acknowledgements"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_permit_acknowledgements" BEFORE UPDATE ON "device_onboarding_monitoring_poll_permit_acknowledgements"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_permit_acknowledgements" BEFORE DELETE ON "device_onboarding_monitoring_poll_permit_acknowledgements"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_permit_consumptions" BEFORE INSERT ON "device_onboarding_monitoring_poll_permit_consumptions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_permit_consumptions" BEFORE UPDATE ON "device_onboarding_monitoring_poll_permit_consumptions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_permit_consumptions" BEFORE DELETE ON "device_onboarding_monitoring_poll_permit_consumptions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_permits" BEFORE INSERT ON "device_onboarding_monitoring_poll_permits"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_permits" BEFORE UPDATE ON "device_onboarding_monitoring_poll_permits"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_permits" BEFORE DELETE ON "device_onboarding_monitoring_poll_permits"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_preflight_attestations" BEFORE INSERT ON "device_onboarding_monitoring_poll_preflight_attestations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_preflight_attestations" BEFORE UPDATE ON "device_onboarding_monitoring_poll_preflight_attestations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_preflight_attestations" BEFORE DELETE ON "device_onboarding_monitoring_poll_preflight_attestations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_poll_requests" BEFORE INSERT ON "device_onboarding_monitoring_poll_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_poll_requests" BEFORE UPDATE ON "device_onboarding_monitoring_poll_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_poll_requests" BEFORE DELETE ON "device_onboarding_monitoring_poll_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_monitoring_registrations" BEFORE INSERT ON "device_onboarding_monitoring_registrations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_monitoring_registrations" BEFORE UPDATE ON "device_onboarding_monitoring_registrations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_monitoring_registrations" BEFORE DELETE ON "device_onboarding_monitoring_registrations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_permit_consumptions" BEFORE INSERT ON "device_onboarding_permit_consumptions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_permit_consumptions" BEFORE UPDATE ON "device_onboarding_permit_consumptions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_permit_consumptions" BEFORE DELETE ON "device_onboarding_permit_consumptions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_permit_decisions" BEFORE INSERT ON "device_onboarding_permit_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_permit_decisions" BEFORE UPDATE ON "device_onboarding_permit_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_permit_decisions" BEFORE DELETE ON "device_onboarding_permit_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_permit_requests" BEFORE INSERT ON "device_onboarding_permit_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_permit_requests" BEFORE UPDATE ON "device_onboarding_permit_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_permit_requests" BEFORE DELETE ON "device_onboarding_permit_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_permit_revocations" BEFORE INSERT ON "device_onboarding_permit_revocations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_permit_revocations" BEFORE UPDATE ON "device_onboarding_permit_revocations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_permit_revocations" BEFORE DELETE ON "device_onboarding_permit_revocations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_preflight_evidence" BEFORE INSERT ON "device_onboarding_preflight_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_preflight_evidence" BEFORE UPDATE ON "device_onboarding_preflight_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_preflight_evidence" BEFORE DELETE ON "device_onboarding_preflight_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_recurring_monitoring_activation_decisions" BEFORE INSERT ON "device_onboarding_recurring_monitoring_activation_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_recurring_monitoring_activation_decisions" BEFORE UPDATE ON "device_onboarding_recurring_monitoring_activation_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_recurring_monitoring_activation_decisions" BEFORE DELETE ON "device_onboarding_recurring_monitoring_activation_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_recurring_monitoring_activation_requests" BEFORE INSERT ON "device_onboarding_recurring_monitoring_activation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_recurring_monitoring_activation_requests" BEFORE UPDATE ON "device_onboarding_recurring_monitoring_activation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_recurring_monitoring_activation_requests" BEFORE DELETE ON "device_onboarding_recurring_monitoring_activation_requests"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_recurring_monitoring_activation_reviews" BEFORE INSERT ON "device_onboarding_recurring_monitoring_activation_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_recurring_monitoring_activation_reviews" BEFORE UPDATE ON "device_onboarding_recurring_monitoring_activation_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_recurring_monitoring_activation_reviews" BEFORE DELETE ON "device_onboarding_recurring_monitoring_activation_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_recurring_monitoring_program_evidence" BEFORE INSERT ON "device_onboarding_recurring_monitoring_program_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_recurring_monitoring_program_evidence" BEFORE UPDATE ON "device_onboarding_recurring_monitoring_program_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_recurring_monitoring_program_evidence" BEFORE DELETE ON "device_onboarding_recurring_monitoring_program_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_recurring_monitoring_schedule_claims" BEFORE INSERT ON "device_onboarding_recurring_monitoring_schedule_claims"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_recurring_monitoring_schedule_claims" BEFORE UPDATE ON "device_onboarding_recurring_monitoring_schedule_claims"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_recurring_monitoring_schedule_claims" BEFORE DELETE ON "device_onboarding_recurring_monitoring_schedule_claims"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_recurring_monitoring_schedules" BEFORE INSERT ON "device_onboarding_recurring_monitoring_schedules"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_recurring_monitoring_schedules" BEFORE UPDATE ON "device_onboarding_recurring_monitoring_schedules"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_recurring_monitoring_schedules" BEFORE DELETE ON "device_onboarding_recurring_monitoring_schedules"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_release_decisions" BEFORE INSERT ON "device_onboarding_release_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_release_decisions" BEFORE UPDATE ON "device_onboarding_release_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_release_decisions" BEFORE DELETE ON "device_onboarding_release_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_runtime_permits" BEFORE INSERT ON "device_onboarding_runtime_permits"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_runtime_permits" BEFORE UPDATE ON "device_onboarding_runtime_permits"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_runtime_permits" BEFORE DELETE ON "device_onboarding_runtime_permits"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_verification_decisions" BEFORE INSERT ON "device_onboarding_verification_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_verification_decisions" BEFORE UPDATE ON "device_onboarding_verification_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_verification_decisions" BEFORE DELETE ON "device_onboarding_verification_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_waves" BEFORE INSERT ON "device_onboarding_waves"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_waves" BEFORE UPDATE ON "device_onboarding_waves"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_waves" BEFORE DELETE ON "device_onboarding_waves"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_device_onboarding_windows" BEFORE INSERT ON "device_onboarding_windows"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_device_onboarding_windows" BEFORE UPDATE ON "device_onboarding_windows"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_device_onboarding_windows" BEFORE DELETE ON "device_onboarding_windows"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_devices" BEFORE INSERT ON "devices"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_devices" BEFORE UPDATE ON "devices"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_devices" BEFORE DELETE ON "devices"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_discovery_evidence" BEFORE INSERT ON "discovery_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_discovery_evidence" BEFORE UPDATE ON "discovery_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_discovery_evidence" BEFORE DELETE ON "discovery_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_discovery_scopes" BEFORE INSERT ON "discovery_scopes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_discovery_scopes" BEFORE UPDATE ON "discovery_scopes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_discovery_scopes" BEFORE DELETE ON "discovery_scopes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_duty_assignments" BEFORE INSERT ON "duty_assignments"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_duty_assignments" BEFORE UPDATE ON "duty_assignments"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_duty_assignments" BEFORE DELETE ON "duty_assignments"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_failure_exercises" BEFORE INSERT ON "failure_exercises"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_failure_exercises" BEFORE UPDATE ON "failure_exercises"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_failure_exercises" BEFORE DELETE ON "failure_exercises"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_field_work_events" BEFORE INSERT ON "field_work_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_field_work_events" BEFORE UPDATE ON "field_work_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_field_work_events" BEFORE DELETE ON "field_work_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_field_work_orders" BEFORE INSERT ON "field_work_orders"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_field_work_orders" BEFORE UPDATE ON "field_work_orders"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_field_work_orders" BEFORE DELETE ON "field_work_orders"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_handover_items" BEFORE INSERT ON "handover_items"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_handover_items" BEFORE UPDATE ON "handover_items"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_handover_items" BEFORE DELETE ON "handover_items"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_handover_notes" BEFORE INSERT ON "handover_notes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_handover_notes" BEFORE UPDATE ON "handover_notes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_handover_notes" BEFORE DELETE ON "handover_notes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_incident_acknowledgements" BEFORE INSERT ON "incident_acknowledgements"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_incident_acknowledgements" BEFORE UPDATE ON "incident_acknowledgements"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_incident_acknowledgements" BEFORE DELETE ON "incident_acknowledgements"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_incident_escalations" BEFORE INSERT ON "incident_escalations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_incident_escalations" BEFORE UPDATE ON "incident_escalations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_incident_escalations" BEFORE DELETE ON "incident_escalations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_incident_notes" BEFORE INSERT ON "incident_notes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_incident_notes" BEFORE UPDATE ON "incident_notes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_incident_notes" BEFORE DELETE ON "incident_notes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_incident_reviews" BEFORE INSERT ON "incident_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_incident_reviews" BEFORE UPDATE ON "incident_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_incident_reviews" BEFORE DELETE ON "incident_reviews"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_incidents" BEFORE INSERT ON "incidents"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_incidents" BEFORE UPDATE ON "incidents"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_incidents" BEFORE DELETE ON "incidents"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_ingestion_receipts" BEFORE INSERT ON "ingestion_receipts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_ingestion_receipts" BEFORE UPDATE ON "ingestion_receipts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_ingestion_receipts" BEFORE DELETE ON "ingestion_receipts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_knowledge_articles" BEFORE INSERT ON "knowledge_articles"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_knowledge_articles" BEFORE UPDATE ON "knowledge_articles"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_knowledge_articles" BEFORE DELETE ON "knowledge_articles"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_knowledge_revisions" BEFORE INSERT ON "knowledge_revisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_knowledge_revisions" BEFORE UPDATE ON "knowledge_revisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_knowledge_revisions" BEFORE DELETE ON "knowledge_revisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_known_error_records" BEFORE INSERT ON "known_error_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_known_error_records" BEFORE UPDATE ON "known_error_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_known_error_records" BEFORE DELETE ON "known_error_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_local_credentials" BEFORE INSERT ON "local_credentials"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_local_credentials" BEFORE UPDATE ON "local_credentials"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_local_credentials" BEFORE DELETE ON "local_credentials"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_local_sessions" BEFORE INSERT ON "local_sessions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_local_sessions" BEFORE UPDATE ON "local_sessions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_local_sessions" BEFORE DELETE ON "local_sessions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_major_incident_events" BEFORE INSERT ON "major_incident_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_major_incident_events" BEFORE UPDATE ON "major_incident_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_major_incident_events" BEFORE DELETE ON "major_incident_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_major_incident_records" BEFORE INSERT ON "major_incident_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_major_incident_records" BEFORE UPDATE ON "major_incident_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_major_incident_records" BEFORE DELETE ON "major_incident_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_metric_rollups" BEFORE INSERT ON "metric_rollups"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_metric_rollups" BEFORE UPDATE ON "metric_rollups"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_metric_rollups" BEFORE DELETE ON "metric_rollups"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_metric_samples" BEFORE INSERT ON "metric_samples"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_metric_samples" BEFORE UPDATE ON "metric_samples"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_metric_samples" BEFORE DELETE ON "metric_samples"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_mikrotik_discovery_candidates" BEFORE INSERT ON "mikrotik_discovery_candidates"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_mikrotik_discovery_candidates" BEFORE UPDATE ON "mikrotik_discovery_candidates"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_mikrotik_discovery_candidates" BEFORE DELETE ON "mikrotik_discovery_candidates"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_mikrotik_discovery_scopes" BEFORE INSERT ON "mikrotik_discovery_scopes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_mikrotik_discovery_scopes" BEFORE UPDATE ON "mikrotik_discovery_scopes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_mikrotik_discovery_scopes" BEFORE DELETE ON "mikrotik_discovery_scopes"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_mikrotik_installation_evidence" BEFORE INSERT ON "mikrotik_installation_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_mikrotik_installation_evidence" BEFORE UPDATE ON "mikrotik_installation_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_mikrotik_installation_evidence" BEFORE DELETE ON "mikrotik_installation_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_mikrotik_installer_tokens" BEFORE INSERT ON "mikrotik_installer_tokens"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_mikrotik_installer_tokens" BEFORE UPDATE ON "mikrotik_installer_tokens"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_mikrotik_installer_tokens" BEFORE DELETE ON "mikrotik_installer_tokens"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_network_circuits" BEFORE INSERT ON "network_circuits"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_network_circuits" BEFORE UPDATE ON "network_circuits"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_network_circuits" BEFORE DELETE ON "network_circuits"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_network_monitoring_registrations" BEFORE INSERT ON "network_monitoring_registrations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_network_monitoring_registrations" BEFORE UPDATE ON "network_monitoring_registrations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_network_monitoring_registrations" BEFORE DELETE ON "network_monitoring_registrations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_network_sites" BEFORE INSERT ON "network_sites"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_network_sites" BEFORE UPDATE ON "network_sites"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_network_sites" BEFORE DELETE ON "network_sites"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_notifications" BEFORE INSERT ON "notifications"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_notifications" BEFORE UPDATE ON "notifications"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_notifications" BEFORE DELETE ON "notifications"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_operator_sessions" BEFORE INSERT ON "operator_sessions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_operator_sessions" BEFORE UPDATE ON "operator_sessions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_operator_sessions" BEFORE DELETE ON "operator_sessions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_operator_site_access" BEFORE INSERT ON "operator_site_access"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_operator_site_access" BEFORE UPDATE ON "operator_site_access"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_operator_site_access" BEFORE DELETE ON "operator_site_access"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_operators" BEFORE INSERT ON "operators"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_operators" BEFORE UPDATE ON "operators"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_operators" BEFORE DELETE ON "operators"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_platform_health_checks" BEFORE INSERT ON "platform_health_checks"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_platform_health_checks" BEFORE UPDATE ON "platform_health_checks"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_platform_health_checks" BEFORE DELETE ON "platform_health_checks"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_platform_settings" BEFORE INSERT ON "platform_settings"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_platform_settings" BEFORE UPDATE ON "platform_settings"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_platform_settings" BEFORE DELETE ON "platform_settings"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_problem_events" BEFORE INSERT ON "problem_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_problem_events" BEFORE UPDATE ON "problem_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_problem_events" BEFORE DELETE ON "problem_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_problem_incident_links" BEFORE INSERT ON "problem_incident_links"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_problem_incident_links" BEFORE UPDATE ON "problem_incident_links"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_problem_incident_links" BEFORE DELETE ON "problem_incident_links"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_problem_records" BEFORE INSERT ON "problem_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_problem_records" BEFORE UPDATE ON "problem_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_problem_records" BEFORE DELETE ON "problem_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_rate_limit_policies" BEFORE INSERT ON "rate_limit_policies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_rate_limit_policies" BEFORE UPDATE ON "rate_limit_policies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_rate_limit_policies" BEFORE DELETE ON "rate_limit_policies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_readiness_decisions" BEFORE INSERT ON "readiness_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_readiness_decisions" BEFORE UPDATE ON "readiness_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_readiness_decisions" BEFORE DELETE ON "readiness_decisions"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_restoration_evidence" BEFORE INSERT ON "restoration_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_restoration_evidence" BEFORE UPDATE ON "restoration_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_restoration_evidence" BEFORE DELETE ON "restoration_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_restoration_validations" BEFORE INSERT ON "restoration_validations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_restoration_validations" BEFORE UPDATE ON "restoration_validations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_restoration_validations" BEFORE DELETE ON "restoration_validations"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_restore_exercises" BEFORE INSERT ON "restore_exercises"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_restore_exercises" BEFORE UPDATE ON "restore_exercises"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_restore_exercises" BEFORE DELETE ON "restore_exercises"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_retention_policies" BEFORE INSERT ON "retention_policies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_retention_policies" BEFORE UPDATE ON "retention_policies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_retention_policies" BEFORE DELETE ON "retention_policies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_roles" BEFORE INSERT ON "roles"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_roles" BEFORE UPDATE ON "roles"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_roles" BEFORE DELETE ON "roles"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_security_control_evidence" BEFORE INSERT ON "security_control_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_security_control_evidence" BEFORE UPDATE ON "security_control_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_security_control_evidence" BEFORE DELETE ON "security_control_evidence"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_service_communication_events" BEFORE INSERT ON "service_communication_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_service_communication_events" BEFORE UPDATE ON "service_communication_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_service_communication_events" BEFORE DELETE ON "service_communication_events"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_service_communication_records" BEFORE INSERT ON "service_communication_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_service_communication_records" BEFORE UPDATE ON "service_communication_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_service_communication_records" BEFORE DELETE ON "service_communication_records"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_service_dependencies" BEFORE INSERT ON "service_dependencies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_service_dependencies" BEFORE UPDATE ON "service_dependencies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_service_dependencies" BEFORE DELETE ON "service_dependencies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_service_incident_impacts" BEFORE INSERT ON "service_incident_impacts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_service_incident_impacts" BEFORE UPDATE ON "service_incident_impacts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_service_incident_impacts" BEFORE DELETE ON "service_incident_impacts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_service_mapping_history" BEFORE INSERT ON "service_mapping_history"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_service_mapping_history" BEFORE UPDATE ON "service_mapping_history"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_service_mapping_history" BEFORE DELETE ON "service_mapping_history"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_shift_handovers" BEFORE INSERT ON "shift_handovers"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_shift_handovers" BEFORE UPDATE ON "shift_handovers"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_shift_handovers" BEFORE DELETE ON "shift_handovers"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_site_alert_contacts" BEFORE INSERT ON "site_alert_contacts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_site_alert_contacts" BEFORE UPDATE ON "site_alert_contacts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_site_alert_contacts" BEFORE DELETE ON "site_alert_contacts"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_site_assignment_history" BEFORE INSERT ON "site_assignment_history"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_site_assignment_history" BEFORE UPDATE ON "site_assignment_history"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_site_assignment_history" BEFORE DELETE ON "site_assignment_history"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_site_escalation_rules" BEFORE INSERT ON "site_escalation_rules"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_site_escalation_rules" BEFORE UPDATE ON "site_escalation_rules"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_site_escalation_rules" BEFORE DELETE ON "site_escalation_rules"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_site_maintenance_windows" BEFORE INSERT ON "site_maintenance_windows"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_site_maintenance_windows" BEFORE UPDATE ON "site_maintenance_windows"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_site_maintenance_windows" BEFORE DELETE ON "site_maintenance_windows"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_topology_dependencies" BEFORE INSERT ON "topology_dependencies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_topology_dependencies" BEFORE UPDATE ON "topology_dependencies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_topology_dependencies" BEFORE DELETE ON "topology_dependencies"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_wireguard_enrollments" BEFORE INSERT ON "wireguard_enrollments"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_wireguard_enrollments" BEFORE UPDATE ON "wireguard_enrollments"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_wireguard_enrollments" BEFORE DELETE ON "wireguard_enrollments"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_wireguard_mutation_guards" BEFORE INSERT ON "wireguard_mutation_guards"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_wireguard_mutation_guards" BEFORE UPDATE ON "wireguard_mutation_guards"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_wireguard_mutation_guards" BEFORE DELETE ON "wireguard_mutation_guards"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_wireguard_peer_inventory" BEFORE INSERT ON "wireguard_peer_inventory"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_wireguard_peer_inventory" BEFORE UPDATE ON "wireguard_peer_inventory"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_wireguard_peer_inventory" BEFORE DELETE ON "wireguard_peer_inventory"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_i_wireguard_provisioners" BEFORE INSERT ON "wireguard_provisioners"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_u_wireguard_provisioners" BEFORE UPDATE ON "wireguard_provisioners"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

--> statement-breakpoint
CREATE TRIGGER "nocx_export_d_wireguard_provisioners" BEFORE DELETE ON "wireguard_provisioners"
WHEN EXISTS(SELECT 1 FROM nocx_migration_lock WHERE id=1 AND expires_at>unixepoch())
BEGIN SELECT RAISE(ABORT,'NOCX_EXPORT_PAUSED'); END;

