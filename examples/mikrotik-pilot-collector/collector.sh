#!/usr/bin/env bash
set -Eeuo pipefail

: "${SNMP_COMMUNITY:?SNMP_COMMUNITY is required}"
: "${NOCX_COLLECTOR_TOKEN:?NOCX_COLLECTOR_TOKEN is required}"
: "${NOCX_ENDPOINT:?NOCX_ENDPOINT is required}"

TARGET="${DEVICE_ADDRESS:-10.66.66.5}"
AVAILABILITY_INTERVAL="${AVAILABILITY_INTERVAL_SECONDS:-30}"
PERFORMANCE_INTERVAL="${PERFORMANCE_INTERVAL_SECONDS:-60}"
DISCOVERY_INTERVAL="${DISCOVERY_INTERVAL_SECONDS:-900}"
CURL_MAX_TIME="${CURL_MAX_TIME_SECONDS:-30}"
DEVICE_ID="device-mikrotik-rb750gr3-pilot"
COLLECTOR_ID="collector-doxa-vps"
STATE_DIR="/var/lib/nocx/spool"
STATE_FILE="$STATE_DIR/counter-state"
INVENTORY_FILE="$STATE_DIR/interface-inventory"
QUARANTINE_DIR="$STATE_DIR/quarantine"
COLLECTOR_VERSION="1.3.2"

is_uint() {
  [[ "${1:-}" =~ ^[0-9]+$ ]]
}

for interval in "$AVAILABILITY_INTERVAL" "$PERFORMANCE_INTERVAL" "$DISCOVERY_INTERVAL" "$CURL_MAX_TIME"; do
  is_uint "$interval" && [[ "$interval" -gt 0 ]] || {
    printf 'Collector intervals must be positive whole seconds\n' >&2
    exit 64
  }
done

get_value() {
  snmpget -v2c -c "$SNMP_COMMUNITY" -Oqve -t 3 -r 1 \
    "$TARGET" "$1" 2>/dev/null | tr -d '"' | awk '{print $1}'
}

uptime_seconds() {
  awk -F: '
    NF == 4 {
      split($4, seconds, ".");
      print ($1 * 86400) + ($2 * 3600) + ($3 * 60) + seconds[1];
      exit
    }
    NF == 3 {
      split($3, seconds, ".");
      print ($1 * 3600) + ($2 * 60) + seconds[1];
      exit
    }
    /^[0-9]+$/ {
      print int($1 / 100);
      exit
    }
  '
}

metric() {
  printf '{"key":"%s","value":%s,"unit":"%s","oid":"%s"}' \
    "$1" "$2" "$3" "$4"
}

append_metric() {
  local next
  next="$(metric "$1" "$2" "$3" "$4")"
  if [[ -n "$METRICS" ]]; then
    METRICS="$METRICS,$next"
  else
    METRICS="$next"
  fi
}

safe_interface_name() {
  local name="$1" safe
  safe="$(
    printf '%s' "$name" |
      tr '[:upper:]' '[:lower:]' |
      sed 's/[^a-z0-9_]/_/g; s/__*/_/g; s/^_//; s/_$//'
  )"
  printf '%s' "${safe:-interface}"
}

refresh_interface_inventory() {
  local rows oid_line oid index name safe count=0
  local inventory_tmp="$INVENTORY_FILE.tmp"
  rows="$(
    snmpwalk -v2c -c "$SNMP_COMMUNITY" -One -t 3 -r 1 \
      "$TARGET" .1.3.6.1.2.1.31.1.1.1.1 2>/dev/null || true
  )"
  : > "$inventory_tmp"
  while IFS= read -r oid_line; do
    [[ "$oid_line" == *" = "* ]] || continue
    oid="${oid_line%% = *}"
    index="${oid##*.}"
    name="${oid_line#*= }"
    name="${name#*: }"
    name="${name#\"}"
    name="${name%\"}"
    is_uint "$index" || continue
    [[ -n "$name" ]] || continue
    safe="$(safe_interface_name "$name")"
    printf '%s %s\n' "$index" "$safe" >> "$inventory_tmp"
    count=$((count + 1))
  done <<< "$rows"
  if [[ "$count" -eq 0 ]]; then
    rm -f "$inventory_tmp"
    return 1
  fi
  sort -n -u "$inventory_tmp" -o "$inventory_tmp"
  mv "$inventory_tmp" "$INVENTORY_FILE"
}

curl_headers() {
  CURL_ARGS=(
    --silent
    --show-error
    --connect-timeout 5
    --max-time "$CURL_MAX_TIME"
    --request POST
    --header "Authorization: Bearer $NOCX_COLLECTOR_TOKEN"
    --header "Content-Type: application/json"
  )
  if [[ -n "${SITES_BYPASS_TOKEN:-}" ]]; then
    CURL_ARGS+=(--header "OAI-Sites-Authorization: Bearer $SITES_BYPASS_TOKEN")
  fi
}

post_payload() {
  local payload="$1"
  local request_id="$2"
  local response_file="/tmp/nocx-response-$$"
  local status

  curl_headers
  status="$(
    curl "${CURL_ARGS[@]}" \
      --header "X-Request-ID: $request_id" \
      --output "$response_file" \
      --write-out '%{http_code}' \
      --data "$payload" \
      "$NOCX_ENDPOINT" || true
  )"
  rm -f "$response_file"

  if [[ "$status" =~ ^2[0-9][0-9]$ ]]; then
    return 0
  fi

  if [[ "$status" =~ ^4[0-9][0-9]$ && "$status" != "408" && "$status" != "429" ]]; then
    printf 'NOCX ingestion permanently rejected (HTTP %s)\n' "$status" >&2
    return 2
  fi

  printf 'NOCX ingestion temporarily failed (HTTP %s); sample queued\n' "${status:-000}" >&2
  return 1
}

queue_payload() {
  local payload="$1"
  local request_id="$2"
  printf '%s' "$payload" > "$STATE_DIR/$request_id.json"
}

replay_queue() {
  local queued request_id replayed=0 result
  shopt -s nullglob
  for queued in "$STATE_DIR"/*.json; do
    request_id="$(basename "$queued" .json)"
    if post_payload "$(cat "$queued")" "$request_id"; then
      rm -f "$queued"
      replayed=$((replayed + 1))
    else
      result=$?
      if [[ "$result" -eq 2 ]]; then
        mkdir -p "$QUARANTINE_DIR"
        mv "$queued" "$QUARANTINE_DIR/"
        printf 'Permanently rejected queued sample moved to quarantine\n' >&2
        continue
      fi
      break
    fi
    [[ "$replayed" -ge 20 ]] && break
  done
  shopt -u nullglob
}

verify_oids() {
  local description ticks
  description="$(
    snmpget -v2c -c "$SNMP_COMMUNITY" -Oqv -t 3 -r 1 \
      "$TARGET" .1.3.6.1.2.1.1.1.0 2>/dev/null || true
  )"
  ticks="$(get_value .1.3.6.1.2.1.1.3.0 || true)"
  [[ -n "$description" && -n "$ticks" ]] || {
    printf 'OID verification failed for %s\n' "$TARGET" >&2
    return 1
  }
  printf '{"result":"passed","deviceId":"%s","address":"%s","operation":"SNMP GET only","uptimeTicks":"%s"}\n' \
    "$DEVICE_ID" "$TARGET" "$ticks"
}

collect_payload() {
  local include_performance="${1:-1}"
  local at epoch ping_output received loss latency ticks seconds
  local cpu cpu_sum=0 cpu_count=0 cpu_pct
  local mem_total mem_used disk_total disk_used mem_pct disk_pct
  local old_epoch=0 elapsed new_state
  local index safe rx tx in_errors out_errors status
  local old_rx old_tx old_in_errors old_out_errors
  local rx_bps tx_bps in_errors_delta out_errors_delta

  at="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  epoch="$(date +%s)"
  ping_output="$(ping -c 3 -W 2 "$TARGET" 2>/dev/null || true)"
  received="$(
    printf '%s' "$ping_output" |
      awk -F',' '/packets transmitted/{gsub(/[^0-9]/,"",$2);print $2+0}'
  )"
  received="${received:-0}"
  loss=$((100 - received * 100 / 3))
  latency="$(
    printf '%s' "$ping_output" |
      awk -F'/' '/round-trip|rtt/{printf "%.0f",$5}'
  )"
  is_uint "$latency" || latency="null"

  ticks="$(get_value .1.3.6.1.2.1.1.3.0 || true)"
  METRICS=""

  if [[ -z "$ticks" ]]; then
    printf '{"deviceId":"%s","collectorId":"%s","observedAt":"%s","online":false,"latencyMs":%s,"packetLossPct":%s,"collectorVersion":"%s","metrics":[]}' \
      "$DEVICE_ID" "$COLLECTOR_ID" "$at" "$latency" "$loss" "$COLLECTOR_VERSION"
    return
  fi

  if [[ "$include_performance" -eq 1 ]]; then
    seconds="$(printf '%s\n' "$ticks" | uptime_seconds)"
    is_uint "$seconds" || seconds=0
    append_metric device.uptime.seconds "$seconds" seconds .1.3.6.1.2.1.1.3.0

    for index in 1 2 3 4; do
      cpu="$(get_value ".1.3.6.1.2.1.25.3.3.1.2.$index" || true)"
      if is_uint "$cpu"; then
        cpu_sum=$((cpu_sum + cpu))
        cpu_count=$((cpu_count + 1))
      fi
    done
    if [[ "$cpu_count" -gt 0 ]]; then
      cpu_pct=$((cpu_sum / cpu_count))
      append_metric device.cpu.utilization.pct "$cpu_pct" percent .1.3.6.1.2.1.25.3.3.1.2
    fi

    mem_total="$(get_value .1.3.6.1.2.1.25.2.3.1.5.65536 || true)"
    mem_used="$(get_value .1.3.6.1.2.1.25.2.3.1.6.65536 || true)"
    if is_uint "$mem_total" && is_uint "$mem_used" && [[ "$mem_total" -gt 0 ]]; then
      mem_pct=$((mem_used * 100 / mem_total))
      append_metric device.memory.utilization.pct "$mem_pct" percent .1.3.6.1.2.1.25.2.3.1.6.65536
    fi

    disk_total="$(get_value .1.3.6.1.2.1.25.2.3.1.5.131072 || true)"
    disk_used="$(get_value .1.3.6.1.2.1.25.2.3.1.6.131072 || true)"
    if is_uint "$disk_total" && is_uint "$disk_used" && [[ "$disk_total" -gt 0 ]]; then
      disk_pct=$((disk_used * 100 / disk_total))
      append_metric device.disk.utilization.pct "$disk_pct" percent .1.3.6.1.2.1.25.2.3.1.6.131072
    fi

    if [[ -f "$STATE_FILE" ]]; then
      old_epoch="$(awk '$1=="epoch"{print $2}' "$STATE_FILE" 2>/dev/null || true)"
    fi
    is_uint "$old_epoch" || old_epoch=0
    elapsed=$((epoch - old_epoch))
    new_state="epoch $epoch"
  fi

  while read -r index safe; do
    is_uint "$index" || continue
    [[ -n "$safe" ]] || continue
    status="$(get_value ".1.3.6.1.2.1.2.2.1.8.$index" || true)"
    is_uint "$status" || continue
    append_metric "interface.i${index}_${safe}.oper.status" "$status" state ".1.3.6.1.2.1.2.2.1.8.$index"

    if [[ "$include_performance" -ne 1 ]]; then
      continue
    fi

    rx="$(get_value ".1.3.6.1.2.1.31.1.1.1.6.$index" || true)"
    tx="$(get_value ".1.3.6.1.2.1.31.1.1.1.10.$index" || true)"
    in_errors="$(get_value ".1.3.6.1.2.1.2.2.1.14.$index" || true)"
    out_errors="$(get_value ".1.3.6.1.2.1.2.2.1.20.$index" || true)"
    if ! is_uint "$rx" || ! is_uint "$tx" || ! is_uint "$in_errors" ||
      ! is_uint "$out_errors"; then
      continue
    fi

    old_rx=0
    old_tx=0
    old_in_errors=0
    old_out_errors=0
    if [[ -f "$STATE_FILE" ]]; then
      read -r old_rx old_tx old_in_errors old_out_errors < <(
        awk -v interface="i${index}_${safe}" \
          '$1==interface{print $2, $3, $4, $5}' "$STATE_FILE"
      ) || true
    fi
    is_uint "$old_rx" || old_rx=0
    is_uint "$old_tx" || old_tx=0
    is_uint "$old_in_errors" || old_in_errors=0
    is_uint "$old_out_errors" || old_out_errors=0

    rx_bps=0
    tx_bps=0
    in_errors_delta=0
    out_errors_delta=0
    if [[ "$old_epoch" -gt 0 && "$elapsed" -gt 0 ]]; then
      [[ "$rx" -ge "$old_rx" ]] && rx_bps=$(((rx - old_rx) * 8 / elapsed))
      [[ "$tx" -ge "$old_tx" ]] && tx_bps=$(((tx - old_tx) * 8 / elapsed))
      [[ "$in_errors" -ge "$old_in_errors" ]] &&
        in_errors_delta=$((in_errors - old_in_errors))
      [[ "$out_errors" -ge "$old_out_errors" ]] &&
        out_errors_delta=$((out_errors - old_out_errors))
    fi

    append_metric "interface.i${index}_${safe}.rx.bps" "$rx_bps" bps ".1.3.6.1.2.1.31.1.1.1.6.$index"
    append_metric "interface.i${index}_${safe}.tx.bps" "$tx_bps" bps ".1.3.6.1.2.1.31.1.1.1.10.$index"
    append_metric "interface.i${index}_${safe}.in_errors.delta" "$in_errors_delta" errors ".1.3.6.1.2.1.2.2.1.14.$index"
    append_metric "interface.i${index}_${safe}.out_errors.delta" "$out_errors_delta" errors ".1.3.6.1.2.1.2.2.1.20.$index"
    new_state+=$'\n'"i${index}_${safe} $rx $tx $in_errors $out_errors"
  done < <(cat "$INVENTORY_FILE" 2>/dev/null || true)

  if [[ "$include_performance" -eq 1 ]]; then
    printf '%s\n' "$new_state" > "$STATE_FILE.tmp"
    mv "$STATE_FILE.tmp" "$STATE_FILE"
  fi

  printf '{"deviceId":"%s","collectorId":"%s","observedAt":"%s","online":true,"latencyMs":%s,"packetLossPct":%s,"collectorVersion":"%s","metrics":[%s]}' \
    "$DEVICE_ID" "$COLLECTOR_ID" "$at" "$latency" "$loss" "$COLLECTOR_VERSION" "$METRICS"
}

run_sample() {
  local include_performance="${1:-1}" payload request_id result
  mkdir -p "$STATE_DIR"
  replay_queue
  payload="$(collect_payload "$include_performance")"
  request_id="$(
    cat /proc/sys/kernel/random/uuid 2>/dev/null ||
      printf '%s-%s' "$(date +%s)" "$$"
  )"
  if post_payload "$payload" "$request_id"; then
    printf 'NOCX sample accepted (collector %s)\n' "$COLLECTOR_VERSION"
    return 0
  fi
  result=$?
  if [[ "$result" -eq 2 ]]; then
    printf 'Current sample was not queued because the rejection is permanent\n' >&2
    return 1
  fi
  queue_payload "$payload" "$request_id"
  return 1
}

case "${1:-}" in
  --verify-oids)
    verify_oids
    ;;
  --once)
    mkdir -p "$STATE_DIR"
    refresh_interface_inventory
    run_sample 1
    ;;
  "")
    mkdir -p "$STATE_DIR"
    last_performance=0
    last_discovery=0
    while true; do
      now="$(date +%s)"
      if [[ ! -s "$INVENTORY_FILE" ||
        $((now - last_discovery)) -ge "$DISCOVERY_INTERVAL" ]]; then
        if refresh_interface_inventory; then
          last_discovery="$now"
        fi
      fi
      include_performance=0
      if [[ $((now - last_performance)) -ge "$PERFORMANCE_INTERVAL" ]]; then
        include_performance=1
        last_performance="$now"
      fi
      run_sample "$include_performance" || true
      sleep "$AVAILABILITY_INTERVAL"
    done
    ;;
  *)
    printf 'Usage: %s [--verify-oids|--once]\n' "$0" >&2
    exit 64
    ;;
esac
