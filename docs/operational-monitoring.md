# Sites and observed device health

This change connects Command Center, Devices and Monitoring to the persistent inventory. Other existing workspaces may still contain demonstration data. It does not deploy a collector or change router configuration.

## Upgrade

1. Back up the production database and identify the deployed commit/runtime. This repository uses a Cloudflare Worker and D1; do not assume it matches a separate VPS deployment.
2. Apply the migrations in `drizzle/meta/_journal.json` order, including `0015_noisy_whirlwind.sql`, before serving the updated Worker. The new migration adds sites and monitoring metadata, preserves original site labels, normalizes existing device sites, and assigns the existing pilot devices to DOXA when that collector exists. Other legacy devices require an explicit collector assignment.
3. Deploy the verified build using the existing deployment process. Keep `NOCX_COLLECTOR_TOKEN` configured for existing collector authentication. Human APIs continue to use the authenticated workspace identity and database role permissions.
4. Open Devices. Create/edit a site, assign an existing device, refresh and confirm persistence. Register a collector if needed. Device Details shows the registered device and collector IDs.
5. Stage devices through Device Intake. In Devices, explicitly approve activation with a site and registered collector. Activation registers the target; it does not install collector software, supply credentials or change the network. Configure the assigned collector separately with that device ID and its validated profile.

## API contracts

- `GET /api/platform/devices`: inventory, sites, collectors, current health, counts and checked timestamp; requires `devices.read`.
- `POST/PATCH /api/platform/sites`: create/rename sites; requires `platform.admin`.
- `PATCH /api/platform/devices`: `{ deviceId, siteId, collectorId?, monitoringEnabled? }`; null site/collector removes the assignment. Changing a collector clears the current status marker. Historical samples remain stored and only observations from the assigned collector inform health.
- `POST /api/platform/collectors`: `{ name, region? }`; registers an identity, not a running process.
- `POST /api/platform/device-activation`: `{ candidateId, siteId, collectorId, approved: true }`; atomically registers a draft candidate and marks it active. Repeated activation is idempotent.
- `POST /api/collector/v1/availability`: `{ deviceId, collectorId, observedAt, online, latencyMs, packetLossPct, handshakeAgeSeconds }`; Bearer authentication, registered enabled device and matching collector required. Nullable measurement fields must be supplied as null when unavailable. Existing Cudy pilot payloads remain supported.
- `POST /api/collector/v1/heartbeat`: `{ collectorId }`; authenticated liveness without changing device availability.
- `POST /api/collector/v1/metrics`: existing schema `1.0`; accepts `availability.online` as valid integer 0/1 evidence. CPU/performance metrics alone do not prove availability. Inspect `counts`, `outcome` and per-sample errors, including for a replayed receipt. A HTTP 202 does not mean every sample was accepted.

The existing shared collector token authenticates the installation; assignment validation restricts payloads to the named collector's enabled devices. This does not provide independent per-collector credentials. Rotate and distribute the token through the existing secret-management process.

## Health semantics

Current health is derived on every read. The stored `devices.status` is the most recent observed result, not a guarantee of present availability.

Unknown reasons include monitoring disabled, no collector assignment, no availability observation, stale collector heartbeat, stale availability and a failed UI health request. Silence never becomes Offline without a failed availability probe. Freshness is `max(120 seconds, 3 × polling interval)`, with a 60-second default. Last successful contact is preserved during failed probes. Delayed observations are stored but cannot overwrite a newer status.

The Cudy stability commissioning gates retain their stricter 15-second evidence criterion. That acceptance criterion is distinct from current device health. Existing pilot incident rules remain pilot-specific; generalizing incident policies to all devices is separate work.

## Collector delivery

The generic SNMP example defaults to dry run and still requires activation and device-matched OID validation. It supplies CPU and validated vendor wireless fields; arbitrary HOST-RESOURCES storage indices and unscaled sensor values are not presented as RAM percentages or temperature. An ICMP success or successful validated SNMP metric confirms reachability; a failed ICMP probe with no successful SNMP metrics supplies failure evidence. A blocked ICMP path can therefore require a different validated availability profile.

Failed delivery is retained with the original request ID. Replay removes a batch only when the response acknowledges every sample with zero rejections. Partial rejection and permanent validation errors move the original payload plus response to `spool/rejected`; inspect them rather than blindly replaying. Samples older than the server's existing ten-minute admission window are rejected and retained there. Disk retention/alerting for this directory remains an operational responsibility.

## Validation

Run `npm run lint`, `npx tsc --noEmit`, and `npm test` (Node and Python 3 required). The SQLite-backed API tests execute actual route SQL and cover migration preservation, site assignment and rename persistence, approved activation, collector scope, failed heartbeats, stale health, delayed delivery and recovery. Python tests cover failed replay retention, acknowledged deletion, partial rejection, permanent HTTP rejection and malformed acknowledgements.
