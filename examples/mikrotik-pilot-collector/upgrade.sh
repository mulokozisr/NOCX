#!/usr/bin/env bash
set -Eeuo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_DIR="${1:-/opt/nocx/mikrotik-pilot-collector}"
BACKUP_DIR=""
ROLLED_BACK=0
EXPECTED_VERSION="$(
  sed -n 's/^COLLECTOR_VERSION="\([^"]*\)"/\1/p' "$SOURCE_DIR/collector.sh"
)"

collector_version() {
  sed -n 's/^COLLECTOR_VERSION="\([^"]*\)"/\1/p' "$1"
}

fail() {
  printf 'ERROR: %s\n' "$*" >&2
  if [[ -n "$BACKUP_DIR" && -d "$BACKUP_DIR" ]]; then
    rollback 1
  fi
  exit 1
}

rollback() {
  local exit_code="${1:-$?}"
  [[ "$ROLLED_BACK" -eq 0 ]] || exit "$exit_code"
  ROLLED_BACK=1
  trap - ERR

  if [[ -n "$BACKUP_DIR" && -d "$BACKUP_DIR" ]]; then
    printf 'Upgrade failed; restoring the previous collector.\n' >&2
    cp "$BACKUP_DIR/collector.sh" "$TARGET_DIR/collector.sh"
    cp "$BACKUP_DIR/Dockerfile" "$TARGET_DIR/Dockerfile"
    cp "$BACKUP_DIR/compose.yaml" "$TARGET_DIR/compose.yaml"
    chmod 0755 "$TARGET_DIR/collector.sh"
    (
      cd "$TARGET_DIR"
      docker compose build --no-cache mikrotik-pilot
      docker compose up -d --no-deps --force-recreate mikrotik-pilot
    ) || true
  fi
  exit "$exit_code"
}

[[ -n "$EXPECTED_VERSION" ]] || fail "Release package has no collector version"
[[ -d "$TARGET_DIR" ]] || fail "Collector directory not found: $TARGET_DIR"
[[ -f "$TARGET_DIR/.env" ]] || fail "Existing .env was not found; upgrade stopped"
for file in collector.sh Dockerfile compose.yaml; do
  [[ -f "$TARGET_DIR/$file" ]] || fail "Existing $file was not found; upgrade stopped"
  [[ -f "$SOURCE_DIR/$file" ]] || fail "Release package is missing $file"
done

for variable in SNMP_COMMUNITY NOCX_COLLECTOR_TOKEN NOCX_ENDPOINT; do
  grep -q "^${variable}=.\+" "$TARGET_DIR/.env" ||
    fail "$variable is missing from .env"
done

timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
BACKUP_DIR="$TARGET_DIR/.rollback-$timestamp"
mkdir -m 0700 "$BACKUP_DIR"
cp "$TARGET_DIR/collector.sh" "$BACKUP_DIR/collector.sh"
cp "$TARGET_DIR/Dockerfile" "$BACKUP_DIR/Dockerfile"
cp "$TARGET_DIR/compose.yaml" "$BACKUP_DIR/compose.yaml"
trap 'rollback $?' ERR

install -m 0755 "$SOURCE_DIR/collector.sh" "$TARGET_DIR/collector.sh"
install -m 0644 "$SOURCE_DIR/Dockerfile" "$TARGET_DIR/Dockerfile"
install -m 0644 "$SOURCE_DIR/compose.yaml" "$TARGET_DIR/compose.yaml"
[[ "$(collector_version "$TARGET_DIR/collector.sh")" == "$EXPECTED_VERSION" ]] ||
  fail "Installed collector file does not match release $EXPECTED_VERSION"

cd "$TARGET_DIR"
docker compose config --quiet
docker compose build --no-cache mikrotik-pilot
image_version="$(
  docker compose run --rm --no-deps --entrypoint sh mikrotik-pilot \
    -c 'sed -n '\''s/^COLLECTOR_VERSION="\([^"]*\)"/\1/p'\'' /usr/local/bin/collector.sh' \
    2>/dev/null
)"
[[ "$image_version" == "$EXPECTED_VERSION" ]] ||
  fail "Built image is collector ${image_version:-unknown}, expected $EXPECTED_VERSION"
docker compose run --rm --no-deps mikrotik-pilot --verify-oids
docker compose run --rm --no-deps mikrotik-pilot --once
docker compose up -d --no-deps --force-recreate mikrotik-pilot
sleep 15

container_id="$(docker compose ps -q mikrotik-pilot)"
[[ -n "$container_id" ]] || fail "Collector container was not created"
[[ "$(docker inspect --format '{{.State.Running}}' "$container_id")" == "true" ]] ||
  fail "Collector container is not running"
running_version="$(
  docker compose exec -T mikrotik-pilot sh -c \
    'sed -n '\''s/^COLLECTOR_VERSION="\([^"]*\)"/\1/p'\'' /usr/local/bin/collector.sh'
)"
[[ "$running_version" == "$EXPECTED_VERSION" ]] ||
  fail "Running container is collector ${running_version:-unknown}, expected $EXPECTED_VERSION"

recent_logs="$(docker compose logs --since=2m --no-color mikrotik-pilot 2>&1 || true)"
if grep -Eqi '401|syntax error|read-only file system|permission denied' <<< "$recent_logs"; then
  printf '%s\n' "$recent_logs" >&2
  fail "Collector health gate found a runtime error"
fi

trap - ERR
printf 'NOCX MikroTik collector %s is running. Rollback backup: %s\n' \
  "$EXPECTED_VERSION" "$BACKUP_DIR"
