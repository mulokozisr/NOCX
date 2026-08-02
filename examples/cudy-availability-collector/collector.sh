#!/bin/sh
set -eu

: "${NOCX_ENDPOINT:?NOCX_ENDPOINT is required}"
: "${NOCX_COLLECTOR_TOKEN:?NOCX_COLLECTOR_TOKEN is required}"
: "${SITES_BYPASS_TOKEN:?SITES_BYPASS_TOKEN is required}"

TARGET_IP="${TARGET_IP:-10.66.66.3}"
DEVICE_ID="${DEVICE_ID:-device-cudy-lt400-pilot}"
COLLECTOR_ID="${COLLECTOR_ID:-collector-doxa-vps}"
WG_INTERFACE="${WG_INTERFACE:-wg0}"
INTERVAL_SECONDS="${INTERVAL_SECONDS:-30}"

probe_once() {
  output="$(ping -n -c 5 -W 3 "$TARGET_IP" 2>&1 || true)"
  loss="$(printf '%s\n' "$output" | sed -n 's/.* \([0-9][0-9]*\)% packet loss.*/\1/p' | tail -n 1)"
  average="$(printf '%s\n' "$output" | sed -n 's#.* = [0-9.]*/\([0-9.]*\)/.*#\1#p' | tail -n 1)"
  loss="${loss:-100}"
  if [ "$loss" -lt 100 ] && [ -n "$average" ]; then
    online=true
    latency="$(printf '%.0f' "$average")"
  else
    online=false
    latency=null
  fi

  handshake_age=null
  peer="$(wg show "$WG_INTERFACE" allowed-ips 2>/dev/null | awk -v target="$TARGET_IP" '$0 ~ target {print $1; exit}' || true)"
  if [ -n "$peer" ]; then
    handshake="$(wg show "$WG_INTERFACE" latest-handshakes 2>/dev/null | awk -v key="$peer" '$1 == key {print $2; exit}' || true)"
    now_epoch="$(date +%s)"
    if [ -n "$handshake" ] && [ "$handshake" -gt 0 ] 2>/dev/null; then
      handshake_age="$((now_epoch - handshake))"
    fi
  fi

  payload="$(jq -nc \
    --arg deviceId "$DEVICE_ID" \
    --arg collectorId "$COLLECTOR_ID" \
    --arg observedAt "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    --argjson online "$online" \
    --argjson latencyMs "$latency" \
    --argjson packetLossPct "$loss" \
    --argjson handshakeAgeSeconds "$handshake_age" \
    '{deviceId:$deviceId,collectorId:$collectorId,observedAt:$observedAt,online:$online,latencyMs:$latencyMs,packetLossPct:$packetLossPct,handshakeAgeSeconds:$handshakeAgeSeconds,collectorVersion:"1.0.0"}')"

  code="$(curl --silent --show-error --output /tmp/nocx-response --write-out '%{http_code}' \
    --connect-timeout 10 --max-time 20 \
    -H "Authorization: Bearer $NOCX_COLLECTOR_TOKEN" \
    -H "OAI-Sites-Authorization: Bearer $SITES_BYPASS_TOKEN" \
    -H "Content-Type: application/json" \
    --data "$payload" "$NOCX_ENDPOINT" || true)"
  if [ "$code" = "202" ]; then
    printf '%s accepted online=%s latency_ms=%s loss_pct=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$online" "$latency" "$loss"
  else
    printf '%s rejected http=%s response=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "${code:-network-error}" "$(cat /tmp/nocx-response 2>/dev/null || true)" >&2
  fi
}

while true; do
  probe_once
  sleep "$INTERVAL_SECONDS"
done
