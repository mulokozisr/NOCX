#!/bin/bash
set -euo pipefail
umask 077
release=/opt/nocx/releases/20261101-essential-v356
if [ -e /var/lib/nocx/nocx.sqlite ] || [ -e /opt/nocx/current ]; then
 echo 'An existing deployment was found. Refusing to overwrite it.' >&2; exit 1
fi
cd /root/nocx-upload
printf '%s  %s\n' '86913ead4c261aee6b8d2181c6561cf912b54a9f33b64168412c26a0d7cc0c9f' restored.sqlite | sha256sum -c -
getent passwd nocx >/dev/null || useradd --system --home-dir /var/lib/nocx --shell /usr/sbin/nologin nocx
install -d -m 755 /opt/nocx /opt/nocx/releases "$release"
tar -xzf application.tar.gz -C "$release"
install -d -m 755 "$release/runtime"
install -m 644 sqlite-d1.mjs server.mjs adapter.test.mjs smoke.test.mjs "$release/runtime/"
chown -R root:root "$release"
chmod -R go-w "$release"
install -d -o nocx -g nocx -m 700 /var/lib/nocx
install -d -o root -g nocx -m 750 /etc/nocx
install -o nocx -g nocx -m 600 restored.sqlite /var/lib/nocx/nocx.sqlite
ln -s "$release" /opt/nocx/current
/opt/nocx-runtime/node-v24.22.2-linux-x64/bin/node --test "$release/runtime/adapter.test.mjs" "$release/runtime/smoke.test.mjs"
install -m 644 nocx.service /etc/systemd/system/nocx.service
systemctl daemon-reload
systemctl enable --now nocx
curl -fsS http://127.0.0.1:3000/_health
echo
echo 'Staged privately on 127.0.0.1:3000; no DNS, DOXA or collector cutover performed.'
