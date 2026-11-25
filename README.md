# NOC-X Network Operations Center

This repository is an exact copy of the NOC-X system running in production at
`https://nms.bandokios.com`, taken from the VPS on 2026-11-26 (release
`20261124-redesign`, served from `/opt/nocx/current`).

## Contents

| Path | What it is |
| --- | --- |
| `dist/` | The built application as it runs on the server: the vinext worker (`dist/server/index.js`), client assets (`dist/client/`), and database migrations (`dist/.openai/drizzle/`) |
| `runtime/` | Node HTTP server and D1-compatible SQLite adapter that run `dist/` on the VPS, with tests |
| `lib/`, `tests/` | WireGuard SNMPv3 credential module and its migration test |
| `deploy/` | systemd, nginx and backup configuration plus install scripts. See [deploy/README.md](deploy/README.md) |

`dist/` is compiled output. The page source the redesign was built from isn't
on the server, so this repository can't be used to edit the pages directly.

## What's not here

Secrets and data stay on the server only: `/etc/nocx/` (runtime and backup
secrets, SSH keys) and `/var/lib/nocx/nocx.sqlite` (the database). The
build-time `prerenderSecret` in `dist/server/vinext-server.json` is redacted;
the production worker doesn't read it.

## Running

The runtime requires Node 24+:

```sh
NOCX_RELEASE=$PWD NOCX_DATABASE=/path/to/nocx.sqlite NOCX_PUBLIC_ORIGIN=https://nms.bandokios.com \
  node runtime/server.mjs   # listens on 127.0.0.1:3000
node --test runtime/adapter.test.mjs tests/wireguard-snmp-migration.test.mjs
```
