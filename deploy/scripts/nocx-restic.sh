#!/bin/sh
set -eu
exec /usr/bin/restic -o 'sftp.command=ssh -F /etc/nocx/backup-ssh.conf nocx-backup-doxa -s sftp' "$@"
