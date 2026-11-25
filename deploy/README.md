# Self-hosted VPS deployment

NOC-X runs on a VPS instead of Cloudflare. The built vinext worker
(`dist/server/index.js`) is served by a small Node HTTP server in `runtime/`,
with a local SQLite file standing in for the D1 binding.

These files were captured from the live server on 2026-11-26 (release
`20261124-redesign`) and match what is installed there.

## Layout on the server

| Path | Purpose |
| --- | --- |
| `/opt/nocx/releases/<date>-<name>/` | One release: `dist/`, `runtime/`, `lib/`, `tests/` |
| `/opt/nocx/current` | Symlink to the active release |
| `/opt/nocx-runtime/node-v24.22.2-linux-x64/` | Pinned Node runtime. `runtime/` needs Node 24+ (`node:sqlite` `setReturnArrays`); the adapter test fails on Node 22 |
| `/var/lib/nocx/nocx.sqlite` | Production database (owner `nocx`, mode 600) |
| `/etc/nocx/runtime.env` | Runtime secrets: `NOCX_COLLECTOR_TOKEN`, `NOCX_WG_SNMP_*` |
| `/etc/nocx/backup.env`, `backup-password`, `backup-ssh.conf`, `backup_ed25519` | Backup secrets |

Nothing under `/etc/nocx/` or the database is kept in this repository.

## Files here

- `../runtime/server.mjs`: Node HTTP server on `127.0.0.1:3000`. It loads the
  worker, serves `dist/client` assets, exposes `/_health`, strips spoofable
  client-IP and identity headers, and runs the worker's `scheduled()` hourly.
- `../runtime/sqlite-d1.mjs`: D1-compatible adapter over `node:sqlite`.
- `../runtime/*.test.mjs`: adapter test and a smoke test that runs against a
  copy of the production database.
- `../lib/wireguard-snmp.ts` and `../tests/wireguard-snmp-migration.test.mjs`:
  SNMPv3 credentials for WireGuard-enrolled routers, keeping the migrated
  legacy credentials unchanged.
- `systemd/`: `nocx.service` (app), plus hourly `nocx-backup` and weekly
  `nocx-backup-maintenance` (restic check/prune) units.
- `nginx/`: `nms.bandokios.com` HTTP→HTTPS redirect with ACME, HTTPS reverse
  proxy to port 3000, and Cloudflare real-IP ranges.
- `scripts/`:
  - `install-stage.sh`: the first install, run once on 2026-11-01.
  - `install-snmp-legacy.py`: one-time SNMP credential migration (already run).
  - `nocx-backup.py`: installed as `/usr/local/sbin/nocx-backup`.
  - `nocx-restic.sh`: installed as `/usr/local/sbin/nocx-restic`.
  - `reload-nginx.sh`: tests the nginx config, then reloads it.

## Deploying a new release

1. Build `dist/` and copy it, together with `runtime/`, `lib/` and `tests/`,
   to `/opt/nocx/releases/<date>-<name>/`.
2. Run the tests with the pinned Node:
   `node --test runtime/adapter.test.mjs runtime/smoke.test.mjs tests/wireguard-snmp-migration.test.mjs`
   (set `NOCX_RELEASE` to the new release directory).
3. Point `/opt/nocx/current` at the new release, run `systemctl restart nocx`,
   and check `curl -fsS http://127.0.0.1:3000/_health`.
4. To roll back, point the symlink at the previous release and restart.
