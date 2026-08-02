# NOCX multi-vendor collector adapter

Read-only SNMP adapters for MikroTik RouterOS and Ubiquiti airOS/AirMAX. Start with `DRY_RUN=true`, verify normalized output and firmware-specific OIDs, then activate with registered NOCX device/collector IDs. Failed batches are spooled and replayed with the same request ID. No SNMP SET or configuration API exists in this package.
