# NOCX Cudy availability collector

Read-only probe for the Cudy LT400 pilot at `10.66.66.3` through `wg0`. It performs five ICMP probes every 30 seconds and posts only availability, average latency, packet loss, observation time, and WireGuard handshake age.

The container uses host networking only to reach the existing WireGuard interface. It opens no port, mounts no host directory, runs with a read-only filesystem, and has no router credentials.

Copy `.env.example` to `.env`, replace both token placeholders, then run `docker compose up -d --build`. Inspect startup with `docker compose logs --tail=20`.
