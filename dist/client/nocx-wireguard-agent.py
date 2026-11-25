#!/usr/bin/env python3
"""NOC-X outbound-only WireGuard provisioning agent. Python 3.10+, Linux."""
import argparse
import base64
import datetime
import fcntl
import ipaddress
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import time
import urllib.error
import urllib.request
import urllib.parse
import uuid
from concurrent.futures import ThreadPoolExecutor, wait, FIRST_COMPLETED

VERSION = '1.2'
KEY = re.compile(r'^[A-Za-z0-9+/]{43}=$')
JOB = re.compile(r'^[a-f0-9-]{36}$')

def command(args):
    return subprocess.run(args, check=True, capture_output=True, text=True, timeout=15).stdout.strip()

def atomic_write(path, data):
    path = Path(path)
    fd, name = tempfile.mkstemp(dir=path.parent, prefix='.nocx-')
    try:
        os.fchmod(fd, 0o600)
        with os.fdopen(fd, 'w') as f:
            f.write(data)
            f.flush()
            os.fsync(f.fileno())
        os.replace(name, path)
        directory = os.open(path.parent, os.O_DIRECTORY)
        try:
            os.fsync(directory)
        finally:
            os.close(directory)
    finally:
        if os.path.exists(name):
            os.unlink(name)

def check_key(key):
    if not isinstance(key, str) or not KEY.fullmatch(key) or len(base64.b64decode(key, validate=True)) != 32:
        raise ValueError('Invalid public key')
    return key

def peer_blocks(text):
    return re.split(r'(?=^\[Peer\]\s*$)', text, flags=re.M)

def public_key(block):
    m = re.search(r'^\s*PublicKey\s*=\s*(\S+)\s*$', block, re.M)
    return m.group(1) if m else None

def allowed_networks(text):
    result = []
    for match in re.finditer(r'^\s*AllowedIPs\s*=\s*([^#\n]+)', text, re.M):
        result.extend(ipaddress.ip_network(x.strip(), strict=False) for x in match.group(1).split(','))
    return result

def allocate(pool, used, reserved, server):
    if pool.num_addresses > 4096:
        raise ValueError('Pool must contain at most 4096 addresses')
    for address in pool.hosts():
        if address != server and str(address) not in reserved and not any(address in net for net in used if net.version == 4):
            return str(address)
    raise ValueError('VPN address pool is full')

def snmp_metrics(address, credentials):
    """SNMPv3 authPriv GET only. Secrets live in a private temporary config, not argv."""
    if not shutil.which('snmpget'):
        raise RuntimeError('SNMP client is not installed')
    user = credentials.get('username', '')
    auth = credentials.get('authPassword', '')
    privacy = credentials.get('privacyPassword', '')
    if not re.fullmatch(r'nocx-[a-f0-9]{16}', user) or not all(re.fullmatch(r'[a-f0-9]{32}', x) for x in (auth, privacy)):
        raise ValueError('Invalid SNMP credentials')
    if not ipaddress.ip_address(address).is_private:
        raise ValueError('Private target required')
    oids = ['.1.3.6.1.2.1.1.3.0'] + ['.1.3.6.1.2.1.25.3.3.1.2.' + str(i) for i in range(1, 5)] + [
        '.1.3.6.1.2.1.25.2.3.1.5.65536', '.1.3.6.1.2.1.25.2.3.1.6.65536',
        '.1.3.6.1.2.1.25.2.3.1.5.131072', '.1.3.6.1.2.1.25.2.3.1.6.131072']
    with tempfile.TemporaryDirectory(prefix='nocx-snmp-') as folder:
        path = Path(folder) / 'snmp.conf'
        path.write_text('defVersion 3\ndefSecurityLevel authPriv\ndefSecurityName ' + user +
            '\ndefAuthType SHA\ndefAuthPassphrase ' + auth + '\ndefPrivType AES\ndefPrivPassphrase ' + privacy + '\n')
        path.chmod(0o600)
        result = subprocess.run(['snmpget', '-v3', '-Oqvt', '-t', '2', '-r', '0', address] + oids,
            env={**os.environ, 'SNMPCONFPATH': folder, 'MIBS': ''}, capture_output=True, text=True, timeout=12)
    if result.returncode:
        return []
    lines = result.stdout.strip().splitlines()
    if len(lines) != len(oids):
        return []
    values = [int(x) if re.fullmatch(r'[0-9]+', x.strip()) else None for x in lines]
    samples = []
    def add(key, value, unit, index):
        samples.append({'metricKey': key, 'value': value, 'unit': unit, 'sourceField': oids[index]})
    if values[0] is not None:
        add('device.uptime.seconds', values[0] // 100, 'seconds', 0)
    cpu = [x for x in values[1:5] if x is not None and 0 <= x <= 100]
    if cpu:
        add('device.cpu.utilization.pct', sum(cpu) // len(cpu), 'percent', 1)
    for total, used, key in [(5, 6, 'device.memory.utilization.pct'), (7, 8, 'device.disk.utilization.pct')]:
        if values[total] and values[used] is not None and values[used] <= values[total]:
            add(key, values[used] * 100 // values[total], 'percent', used)
    return samples

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        raise ValueError('API redirects are not permitted')

class Agent:
    def __init__(self, config, run=command):
        self.config = config
        self.run = run
        self.interface = config['interface']
        if not re.fullmatch(r'[A-Za-z0-9_-]{1,15}', self.interface):
            raise ValueError('Invalid WireGuard interface')
        self.path = Path('/etc/wireguard') / (self.interface + '.conf')
        self.state_path = Path('/var/lib/nocx-wireguard/state.json')
        self.state_path.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
        self.state = json.loads(self.state_path.read_text()) if self.state_path.exists() else {}
        self.pool = ipaddress.ip_network(config['pool'], strict=True)
        if self.pool.version != 4 or not self.pool.is_private or self.pool.num_addresses > 4096:
            raise ValueError('Use a private IPv4 pool of at most 4096 addresses')
        self.server = ipaddress.ip_address(config['server_address'])
        if self.server not in self.pool:
            raise ValueError('Server address must be inside the pool')
        if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9.-]{0,252}:[0-9]{1,5}', config['endpoint']):
            raise ValueError('Expected an endpoint hostname or IPv4 address and UDP port')
        if not 0 < int(config['endpoint'].rsplit(':', 1)[1]) < 65536:
            raise ValueError('Invalid endpoint port')
        if not config['url'].startswith('https://') or not re.fullmatch(r'[a-f0-9]{64}', config['token']):
            raise ValueError('HTTPS NOC-X origin and service token required')
        url = urllib.parse.urlsplit(config['url'])
        if url.username or url.password or url.query or url.fragment or url.path not in ('', '/'):
            raise ValueError('Use only the HTTPS NOC-X origin')
        self.opener = urllib.request.build_opener(NoRedirect())
        self.inventory_signature = None
        self.inventory_synced_at = 0.0

    def api(self, payload=None):
        request = urllib.request.Request(self.config['url'].rstrip('/') + '/api/provisioner/v1/jobs',
            data=None if payload is None else json.dumps(payload).encode(),
            headers={'Authorization': 'Bearer ' + self.config['token'], 'Content-Type': 'application/json', 'User-Agent': 'NOCX-WireGuard/' + VERSION})
        with self.opener.open(request, timeout=25) as response:
            return json.load(response)

    def persist(self):
        atomic_write(self.state_path, json.dumps(self.state))

    def enqueue_metrics(self, payload):
        folder = self.state_path.parent / 'metric-outbox'
        folder.mkdir(mode=0o700, exist_ok=True)
        if sum(1 for _ in folder.glob('*.json')) >= 1000:
            raise RuntimeError('Metric outbox is full; existing evidence retained')
        path = folder / (payload['id'] + '-' + uuid.uuid4().hex + '.json')
        atomic_write(path, json.dumps(payload))
        return path

    def deliver_metrics(self, path):
        payload = json.loads(path.read_text())
        observed = datetime.datetime.fromisoformat(payload['observedAt'].replace('Z', '+00:00')).timestamp()
        # Match the server's ten-minute intake window; never timestamp old data as new.
        if time.time() - observed > 570:
            path.unlink(missing_ok=True)
            print('Expired queued metric evidence discarded', flush=True)
            return
        try:
            result = self.api(payload)
            if result.get('outcome') == 'rejected':
                raise RuntimeError('Metric evidence rejected')
        except urllib.error.HTTPError as error:
            # Revocation/unknown ownership and invalid old evidence are permanent.
            if error.code in (400, 401, 403, 404, 409, 422):
                if error.code in (401, 403):
                    raise  # Keep evidence if the service credential needs repair.
                path.unlink(missing_ok=True)
                print('Queued metrics no longer eligible:', error.code, flush=True)
                return
            raise
        path.unlink(missing_ok=True)

    def replay_metrics(self):
        folder = self.state_path.parent / 'metric-outbox'
        for path in sorted(folder.glob('*.json'))[:40]:
            try:
                self.deliver_metrics(path)
            except Exception:
                # Preserve the queue and avoid repeatedly delaying all polling on an outage.
                print('Metric replay deferred; queued evidence retained', flush=True)
                break

    def peer_inventory(self):
        peers = []
        for line in self.run(['wg', 'show', self.interface, 'allowed-ips']).splitlines():
            parts = line.split()
            if not parts:
                continue
            key = check_key(parts[0])
            addresses = []
            for token in parts[1:]:
                if token == '(none)':
                    continue
                for value in token.split(','):
                    network = ipaddress.ip_network(value, strict=False)
                    if network.version == 4 and network.prefixlen == 32 and network.network_address in self.pool:
                        addresses.append(str(network.network_address))
            if len(addresses) > 1:
                raise ValueError('A peer has multiple addresses inside the managed pool')
            if addresses:
                peers.append({'publicKey': key, 'address': addresses[0]})
        return sorted(peers, key=lambda peer: (ipaddress.ip_address(peer['address']), peer['publicKey']))

    def sync_inventory(self):
        peers = self.peer_inventory()
        signature = json.dumps(peers, sort_keys=True, separators=(',', ':'))
        now = time.monotonic()
        if signature != self.inventory_signature or now - self.inventory_synced_at >= 60:
            try:
                self.api({'action': 'sync_inventory', 'peers': peers})
            except urllib.error.HTTPError as error:
                # Older NOC-X releases do not have inventory reconciliation yet.
                if error.code not in (404, 422):
                    raise
            self.inventory_signature = signature
            self.inventory_synced_at = now

    def preflight(self):
        if not self.path.is_file() or self.path.is_symlink():
            raise ValueError('An existing regular wg-quick configuration is required')
        configured = json.loads(self.run(['ip', '-j', '-4', 'address', 'show', 'dev', self.interface]))
        addresses = [ipaddress.ip_interface(str(a['local']) + '/' + str(a['prefixlen'])) for row in configured for a in row.get('addr_info', [])]
        if not any(a.ip == self.server and self.pool.subnet_of(a.network) for a in addresses):
            raise ValueError('Pool must be inside the existing interface subnet and use its server address')
        check_key(self.run(['wg', 'show', self.interface, 'public-key']))
        if re.search(r'^\s*SaveConfig\s*=\s*true\s*$', self.path.read_text(), re.M | re.I):
            raise ValueError('Set SaveConfig=false first, so wg-quick cannot overwrite managed peer persistence')

    def provision(self, job, reserved_addresses=()):
        ident, key = job['id'], check_key(job['public_key'])
        if not JOB.fullmatch(ident):
            raise ValueError('Invalid enrollment id')
        content = self.path.read_text()
        peers = self.run(['wg', 'show', self.interface, 'allowed-ips'])
        record = self.state.get(ident)
        if record and record['public_key'] != key:
            raise ValueError('Enrollment public key changed')
        if not record:
            if key in [public_key(b) for b in peer_blocks(content)] or any(line.split()[0] == key for line in peers.splitlines() if line.split()):
                raise ValueError('Refusing to adopt an existing unmanaged peer')
            used = allowed_networks(content)
            # Inventory can reserve an address even when it has no WireGuard peer.
            for address in [*self.config.get('reserved_addresses', []), *reserved_addresses]:
                used.append(ipaddress.ip_network(str(ipaddress.IPv4Address(address)) + '/32'))
            for line in peers.splitlines():
                parts = line.split()
                for token in parts[1:]:
                    if token != '(none)':
                        used.extend(ipaddress.ip_network(x, strict=False) for x in token.split(','))
            address = allocate(self.pool, used, {x['address'] for x in self.state.values()}, self.server)
            record = {'public_key': key, 'address': address}
            self.state[ident] = record
            self.persist()  # Reserve before any network change; safe across retries and crashes.
        address = record['address']
        existing = [b for b in peer_blocks(content) if public_key(b) == key]
        if existing and allowed_networks(existing[0]) != [ipaddress.ip_network(address + '/32')]:
            raise ValueError('Managed peer configuration changed externally; manual review required')
        if not existing:
            shutil.copy2(self.path, str(self.path) + '.nocx-backup')
            os.chmod(str(self.path) + '.nocx-backup', 0o600)
            atomic_write(self.path, content.rstrip() + '\n\n[Peer]\n# NOCX ' + ident + '\nPublicKey = ' + key + '\nAllowedIPs = ' + address + '/32\n')
        # Disk is committed first: a crash before wg set is repaired by this idempotent retry.
        self.run(['wg', 'set', self.interface, 'peer', key, 'allowed-ips', address + '/32'])
        return {'id': ident, 'action': 'provisioned', 'address': address,
                'serverAddress': str(self.server), 'serverPublicKey': check_key(self.run(['wg', 'show', self.interface, 'public-key'])), 'endpoint': self.config['endpoint']}

    def discard_provisional_peer(self, job):
        """Remove only the peer created for this still-queued enrollment."""
        record = self.state.get(job['id'])
        if not record or record['public_key'] != job['public_key']:
            raise ValueError('Local enrollment state does not match queued request')
        key = check_key(record['public_key'])
        content = self.path.read_text()
        retained = ''.join(block for block in peer_blocks(content) if public_key(block) != key)
        atomic_write(self.path, retained)
        self.run(['wg', 'set', self.interface, 'peer', key, 'remove'])
        del self.state[job['id']]
        self.persist()

    def provision_confirmed(self, job, reserved_addresses=()):
        """Retry another free address when inventory rejects an otherwise free WG address."""
        skipped = list(reserved_addresses)
        for _ in range(min(256, self.pool.num_addresses)):
            payload = self.provision(job, skipped)
            try:
                return self.api(payload)
            except urllib.error.HTTPError as error:
                try:
                    detail = json.loads(error.read(8192)).get('error')
                except Exception:
                    detail = None
                if error.code != 409 or detail != 'This VPN address is already used by another inventory device':
                    raise
                skipped.append(payload['address'])
                self.discard_provisional_peer(job)
                print('Enrollment', job.get('id'), 'skipped an inventory-reserved address', flush=True)
        raise ValueError('No unreserved VPN address is available')

    def revoke(self, job):
        record = self.state.get(job['id'])
        if record:
            key = check_key(record['public_key'])
            if key != job['public_key']:
                raise ValueError('Revocation key mismatch')
            content = self.path.read_text()
            retained = ''.join(block for block in peer_blocks(content) if public_key(block) != key)
            atomic_write(self.path, retained)
            self.run(['wg', 'set', self.interface, 'peer', key, 'remove'])
            del self.state[job['id']]
            self.persist()
        else:
            key = check_key(job['public_key'])
            if any(public_key(b) == key for b in peer_blocks(self.path.read_text())) or key in self.run(['wg', 'show', self.interface, 'peers']).split():
                raise ValueError('Peer exists without local ownership record; manual review required')
        # A never-provisioned queued request has no peer to remove.
        self.api({'id': job['id'], 'action': 'revoked'})

    def observe(self, job):
        record = self.state.get(job['id'])
        if not record or record['public_key'] != job['public_key'] or record['address'] != job['address']:
            raise ValueError('Local enrollment state does not match NOC-X')
        handshakes = dict(line.split() for line in self.run(['wg', 'show', self.interface, 'latest-handshakes']).splitlines() if line.strip())
        stamp = int(handshakes.get(record['public_key'], '0'))
        age = min(604800, max(0, int(time.time()) - stamp)) if stamp else None
        started = time.monotonic()
        try:
            output = self.run(['ping', '-n', '-c', '1', '-W', '2', '-I', self.interface, record['address']])
            online = True
        except subprocess.CalledProcessError:
            online = False
        match = re.search(r'time[=<]([0-9.]+)', output) if online else None
        latency = min(120000, round(float(match.group(1)))) if match else (min(120000, round((time.monotonic() - started) * 1000)) if online else None)
        online = online and age is not None and age <= 180
        self.api({'id': job['id'], 'action': 'observe', 'observedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='milliseconds').replace('+00:00', 'Z'),
                  'online': online, 'latencyMs': latency, 'packetLossPct': 0 if online else 100, 'handshakeAgeSeconds': age})

        last = getattr(self, 'snmp_last', {})
        if online and job.get('snmp') and time.monotonic() - last.get(job['id'], 0) >= 60:
            last[job['id']] = time.monotonic()
            self.snmp_last = last
            samples = snmp_metrics(record['address'], job['snmp'])
            if samples:
                path = self.enqueue_metrics({'id': job['id'], 'action': 'metrics', 'observedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(timespec='milliseconds').replace('+00:00', 'Z'), 'samples': samples})
                self.deliver_metrics(path)
            else:
                print('Enrollment', job['id'], 'SNMP pending: no validated response', flush=True)

    def tick(self):
        self.replay_metrics()
        self.sync_inventory()
        response = self.api()
        jobs = response['jobs']
        reserved_addresses = response.get('reservedAddresses', [])
        heartbeat = time.monotonic()
        observations = []
        for job in jobs:
            if time.monotonic() - heartbeat > 45:
                self.api()
                heartbeat = time.monotonic()
            try:
                expires = datetime.datetime.fromisoformat(job['expires_at'].replace('Z', '+00:00')).timestamp()
                if job['status'] == 'revoke_pending' or job['status'] != 'monitoring_active' and expires <= time.time():
                    self.revoke(job)
                elif job['status'] == 'queued':
                    self.provision_confirmed(job, reserved_addresses)
                else:
                    observations.append(job)
            except urllib.error.HTTPError as error:
                print('Enrollment', job.get('id'), 'API status', error.code, flush=True)
                if job['status'] == 'queued' and error.code == 409:
                    try:
                        self.api({'id': job['id'], 'action': 'failed'})
                    except Exception:
                        pass

            except Exception as error:
                # Do not log configuration, tokens, subprocess output or keys.
                print('Enrollment', job.get('id'), 'needs review:', type(error).__name__, flush=True)
                if job['status'] == 'queued':
                    try:
                        self.api({'id': job['id'], 'action': 'failed'})
                    except Exception:
                        pass

        self.poll_observations(observations)

    def poll_observations(self, jobs):
        # Only reads/metric delivery run concurrently. Peer/state mutation stays serial.
        with ThreadPoolExecutor(max_workers=16) as pool:
            pending = {pool.submit(self.observe, job): job['id'] for job in jobs}
            heartbeat = time.monotonic()
            while pending:
                done, _ = wait(pending, timeout=30, return_when=FIRST_COMPLETED)
                if time.monotonic() - heartbeat >= 30:
                    self.api()  # Keep the VPS heartbeat current during slow probes.
                    heartbeat = time.monotonic()
                for future in done:
                    ident = pending.pop(future)
                    try:
                        future.result()
                    except Exception as error:
                        print('Enrollment', ident, 'observation deferred:', type(error).__name__, flush=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', default='/etc/nocx-wireguard.json')
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    os.umask(0o077)
    with open('/run/nocx-wireguard.lock', 'w') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        agent = Agent(json.loads(Path(args.config).read_text()))
        agent.preflight()
        if args.check:
            print('Local WireGuard preflight passed; no peer changes made.')
            return
        while True:
            try:
                agent.tick()
            except Exception as error:
                print('Provisioning service could not poll:', type(error).__name__, flush=True)
            time.sleep(15)

if __name__ == '__main__':
    main()
