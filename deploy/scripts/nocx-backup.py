#!/usr/bin/python3
import datetime,fcntl,json,os,pathlib,sqlite3,subprocess,tempfile

os.umask(0o077)
state=pathlib.Path('/var/lib/nocx-backup')
state.mkdir(mode=0o700,exist_ok=True)
with (state/'backup.lock').open('w') as lock:
    try:fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
    except BlockingIOError:raise SystemExit('A backup is already running')
    with tempfile.TemporaryDirectory(prefix='snapshot-',dir=state) as staging:
        target=pathlib.Path(staging)/'nocx.sqlite'
        source=sqlite3.connect('file:/var/lib/nocx/nocx.sqlite?mode=ro',uri=True,timeout=30)
        copy=sqlite3.connect(target)
        source.backup(copy,pages=256,sleep=0.05)
        if copy.execute('PRAGMA integrity_check').fetchall()!=[('ok',)]:raise RuntimeError('Database snapshot integrity failed')
        if copy.execute('PRAGMA foreign_key_check').fetchall():raise RuntimeError('Database snapshot relationships failed')
        tables=[row[0] for row in copy.execute("SELECT name FROM sqlite_schema WHERE type='table' AND name NOT GLOB 'sqlite_*'")]
        counts={name:copy.execute('SELECT count(*) FROM "'+name.replace('"','""')+'"').fetchone()[0] for name in tables}
        manifest={'created_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'table_counts':counts,'sqlite_integrity':'ok','foreign_key_errors':0}
        copy.close();source.close()
        (pathlib.Path(staging)/'manifest.json').write_text(json.dumps(manifest,indent=2))
        command=['/usr/local/sbin/nocx-restic','backup','--host','nocx-vps','--tag','nocx-hourly',staging,'/opt/nocx/releases','/etc/nocx','/etc/nginx','/etc/letsencrypt','/etc/systemd/system/nocx.service','/etc/systemd/system/nocx-backup.service','/etc/systemd/system/nocx-backup.timer','/etc/systemd/system/nocx-backup-maintenance.service','/etc/systemd/system/nocx-backup-maintenance.timer','/usr/local/sbin/nocx-backup','/usr/local/sbin/nocx-restic','--exclude','/etc/nocx/backup-password','--exclude','/etc/nocx/*.before-*']
        subprocess.run(command,check=True)
    subprocess.run(['/usr/local/sbin/nocx-restic','forget','--host','nocx-vps','--tag','nocx-hourly','--group-by','host,tags','--keep-hourly','24','--keep-daily','30','--keep-weekly','8','--keep-monthly','6'],check=True)
    print('Encrypted off-server backup completed successfully')
