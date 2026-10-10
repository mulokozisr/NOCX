# NOCX multi-vendor collector adapter

Read-only SNMP adapters for MikroTik RouterOS and Ubiquiti airOS/AirMAX. Start with `DRY_RUN=true`, verify normalized output and firmware-specific OIDs, then activate with registered NOCX device/collector IDs. Failed batches are spooled and replayed with the same request ID. No SNMP SET or configuration API exists in this package.

`HTTP 202` must include acknowledgement counts before a batch is removed. Transient failures retain the original payload and request ID; rejected or partial batches are preserved under `spool/rejected` with the server response. See [operational monitoring](../../docs/operational-monitoring.md) for registration, health semantics and upgrade steps.
