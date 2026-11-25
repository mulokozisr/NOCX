#!/usr/bin/env bash
set -euo pipefail
umask 077
if [[ "${EUID}" != 0 ]]; then echo 'Run this installer as root.' >&2; exit 1; fi
for tool in python3 wg ip ping systemctl snmpget; do command -v "$tool" >/dev/null || { echo "Missing required tool: $tool (Debian/Ubuntu: install the snmp package for snmpget)" >&2; exit 1; }; done
read -r -p 'NOC-X HTTPS origin: ' nocx_origin
[[ "$nocx_origin" =~ ^https://[A-Za-z0-9.-]+$ ]] || { echo 'Invalid HTTPS origin' >&2; exit 1; }
mkdir -p /opt/nocx-wireguard /var/lib/nocx-wireguard
chmod 700 /opt/nocx-wireguard /var/lib/nocx-wireguard
python3 - "$nocx_origin" <<'PY'
import sys, urllib.request, os
from pathlib import Path
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs):raise ValueError('Redirect refused')
opener=urllib.request.build_opener(NoRedirect())
with opener.open(sys.argv[1]+'/nocx-wireguard-agent.py',timeout=30) as r:
 content=r.read(100000)
 if r.status!=200 or not content.startswith(b'#!/usr/bin/env python3'):raise ValueError('Agent download failed')
p=Path('/opt/nocx-wireguard/agent.py');p.write_bytes(content);p.chmod(0o700)
PY
# Use /dev/tty for prompts, including the secret, so credentials never enter shell arguments.
python3 - "$nocx_origin" <<'PY'
import sys,json,getpass,os
from pathlib import Path
with open('/dev/tty','r+') as tty:
 def ask(label,default):
  tty.write(label+' ['+default+']: ');tty.flush();return tty.readline().strip() or default
 interface=ask('Existing WireGuard interface','wg0')
 pool=ask('VPN address pool (must match the existing interface subnet)','10.66.66.0/24')
 server=ask('Server VPN address','10.66.66.1')
 endpoint=ask('Public VPN endpoint (host:UDP-port)','')
 token=getpass.getpass('One-time service token from NOC-X: ',stream=tty)
p=Path('/etc/nocx-wireguard.json')
if p.exists():
 import shutil
 shutil.copy2(p,str(p)+'.backup');os.chmod(str(p)+'.backup',0o600)
p.write_text(json.dumps(dict(url=sys.argv[1],interface=interface,pool=pool,server_address=server,endpoint=endpoint,token=token)))
p.chmod(0o600)
PY
python3 /opt/nocx-wireguard/agent.py --check
cat > /etc/systemd/system/nocx-wireguard.service <<'UNIT'
[Unit]
Description=NOC-X WireGuard provisioning service
After=network-online.target
Wants=network-online.target
[Service]
Type=simple
ExecStart=/usr/bin/python3 /opt/nocx-wireguard/agent.py
Restart=on-failure
RestartSec=15
UMask=0077
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
PrivateTmp=true
ReadWritePaths=/etc/wireguard /var/lib/nocx-wireguard /run
CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_RAW
RestrictAddressFamilies=AF_INET AF_INET6 AF_NETLINK AF_UNIX
[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable --now nocx-wireguard.service
printf '%s\n' 'Service installed. Return to NOC-X and wait for VPS service: Connected.'
