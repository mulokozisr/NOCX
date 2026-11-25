import json,pathlib,re,os,tempfile,datetime,sqlite3,secrets,base64

source=pathlib.Path('/root/nocx-upload/nocx-wireguard-credential-transfer.json')
assert source.is_file() and not source.is_symlink()
data=json.loads(source.read_text());legacy=data['legacy'];assert len(legacy)==3
db=sqlite3.connect('file:/var/lib/nocx/nocx.sqlite?mode=ro',uri=True)
expected={row[0] for row in db.execute("SELECT id FROM wireguard_enrollments WHERE vendor='MikroTik' AND status='monitoring_active'")}
assert expected==set(legacy),'Existing MikroTik enrollment IDs differ between old and new databases'
for ident,item in legacy.items():
    assert re.fullmatch(r'[a-f0-9-]{36}',ident)
    assert set(item)=={'username','authPassword','privacyPassword'}
    assert item['username']=='nocx-'+ident.replace('-','')[-16:]
    assert all(re.fullmatch(r'[a-f0-9]{32}',item[name]) for name in ('authPassword','privacyPassword'))
for job in data['jobs']:
    row=db.execute('SELECT vendor,status,address,public_key FROM wireguard_enrollments WHERE id=?',(job['id'],)).fetchone()
    assert row==(job['vendor'],job['status'],job['address'],job['public_key']),'Active enrollment metadata changed after the essential export'
db.close()
path=pathlib.Path('/etc/nocx/runtime.env');assert path.is_file() and not path.is_symlink()
existing=path.read_text()
assert not re.search(r'(?m)^NOCX_WG_SNMP_(KEY|LEGACY_B64|LEGACY_IDS)=',existing),'SNMP migration configuration already exists; refusing to replace it'
stamp=datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
backup=path.with_name('runtime.env.before-snmp-'+stamp)
fd=os.open(backup,os.O_WRONLY|os.O_CREAT|os.O_EXCL,0o600)
with os.fdopen(fd,'w') as f:f.write(existing)
future_key=secrets.token_hex(32);assert future_key not in existing
lines=[existing.rstrip(),'NOCX_WG_SNMP_KEY='+future_key,'NOCX_WG_SNMP_LEGACY_IDS='+json.dumps(sorted(legacy),separators=(',',':')),'NOCX_WG_SNMP_LEGACY_B64='+base64.b64encode(json.dumps(legacy,separators=(',',':')).encode()).decode()]
fd,tmp=tempfile.mkstemp(prefix='.runtime-snmp-',dir=path.parent);os.fchmod(fd,0o600)
with os.fdopen(fd,'w') as f:f.write('\n'.join(lines)+'\n')
os.replace(tmp,path)
record={'legacy_ids':sorted(legacy),'old_active_job_count':len(data['jobs']),'rollback_directory':data['rollback_directory'],'baseline':data['baseline'],'vps_environment_backup':str(backup)}
report=pathlib.Path('/root/nocx-upload/snmp-migration-record.json');report.write_text(json.dumps(record));report.chmod(0o600)
print(json.dumps({'preserved_snmp_credentials':len(legacy),'active_jobs_checked':len(data['jobs']),'future_device_key_generated':True,'existing_router_changes':False,'rollback_directory':data['rollback_directory']}))
