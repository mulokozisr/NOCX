# NOCX MikroTik pilot collector

This read-only service polls `10.66.66.5` through WireGuard and sends availability,
CPU, memory, disk and interface telemetry to NOCX. It uses only ICMP and SNMP GET;
no RouterOS write operation exists.

Polling is tiered to keep detection responsive without adding unnecessary load:

- Availability and cached interface status: every 30 seconds
- CPU, memory, disk, traffic and error counters: every 60 seconds
- Full IF-MIB interface discovery: every 15 minutes

## Upgrade an existing DOXA pilot

Extract the release package, then run:

```bash
sudo ./upgrade.sh
```

The upgrader preserves `.env`, backs up the existing collector, validates Docker
Compose, checks the real OIDs, sends one authenticated sample, and only then
force-recreates the service. It verifies the release file, built image, and
running container all report the same collector version. If any gate fails, it
automatically restores the previous collector files.

## Manual verification

```bash
docker compose run --rm --no-deps mikrotik-pilot --verify-oids
docker compose run --rm --no-deps mikrotik-pilot --once
docker compose up -d --build
```

Do not print or copy `.env`; it contains the SNMP community and authentication
tokens.
