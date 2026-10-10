#!/usr/bin/env python3
"""Read-only MikroTik/Ubiquiti SNMP adapter for NOCX."""
import json,os,pathlib,subprocess,sys,time,urllib.error,urllib.request,uuid
SPOOL=pathlib.Path(os.getenv("NOCX_SPOOL_DIR","/var/lib/nocx/spool")); INTERVAL=max(30,int(os.getenv("POLL_INTERVAL_SECONDS","60")))
TARGET=os.getenv("DEVICE_ADDRESS",""); DEVICE=os.getenv("NOCX_DEVICE_ID",""); COLLECTOR=os.getenv("NOCX_COLLECTOR_ID",""); TOKEN=os.getenv("NOCX_COLLECTOR_TOKEN",""); ENDPOINT=os.getenv("NOCX_METRICS_ENDPOINT","").rstrip("/"); COMMUNITY=os.getenv("SNMP_COMMUNITY",""); VENDOR=os.getenv("DEVICE_VENDOR","").lower(); DRY_RUN=os.getenv("DRY_RUN","true").lower()=="true"
ACTIVATION_APPROVED=os.getenv("ACTIVATION_APPROVED","false").lower()=="true"; OID_EVIDENCE=pathlib.Path(os.getenv("OID_VALIDATION_FILE","/run/nocx/oid-validation.json"))
COMMON={"device.cpu.utilization.pct":(".1.3.6.1.2.1.25.3.3.1.2.1","%")}
FIELDS={"mikrotik":COMMON,"ubiquiti":{**COMMON,"wireless.signal.dbm":(".1.3.6.1.4.1.41112.1.4.5.1.3.1","dBm"),"wireless.noise.dbm":(".1.3.6.1.4.1.41112.1.4.5.1.4.1","dBm"),"wireless.ccq.pct":(".1.3.6.1.4.1.41112.1.4.5.1.7.1","%")}}
def validate():
 missing=[k for k,v in {"DEVICE_ADDRESS":TARGET,"NOCX_DEVICE_ID":DEVICE,"NOCX_COLLECTOR_ID":COLLECTOR}.items() if not v]
 if VENDOR not in FIELDS: missing.append("DEVICE_VENDOR=mikrotik|ubiquiti")
 if not DRY_RUN: missing += [k for k,v in {"SNMP_COMMUNITY":COMMUNITY,"NOCX_COLLECTOR_TOKEN":TOKEN,"NOCX_METRICS_ENDPOINT":ENDPOINT}.items() if not v]
 if not DRY_RUN and not ACTIVATION_APPROVED: missing.append("ACTIVATION_APPROVED=true")
 if not DRY_RUN and not OID_EVIDENCE.is_file(): missing.append("OID_VALIDATION_FILE")
 if missing: raise SystemExit("Missing/invalid settings: "+", ".join(missing))
 if not DRY_RUN:
  evidence=json.loads(OID_EVIDENCE.read_text())
  expected_metrics=set(FIELDS[VENDOR])
  evidenced_metrics={item.get("metricKey") for item in evidence.get("metrics",[]) if item.get("supported") is True}
  if evidence.get("deviceId")!=DEVICE or evidence.get("vendor")!=VENDOR or evidence.get("address")!=TARGET or evidence.get("result")!="passed" or not expected_metrics.issubset(evidenced_metrics):raise SystemExit("OID validation evidence does not approve this device")
def snmp_value(oid):
 if DRY_RUN:return {"mikrotik":24,"ubiquiti":-57}[VENDOR]
 try:return int(float(subprocess.run(["snmpget","-v2c","-c",COMMUNITY,"-Oqv","-t","3","-r","1",TARGET,oid],capture_output=True,text=True,timeout=8,check=True).stdout.strip().split()[0]))
 except (subprocess.SubprocessError,ValueError,IndexError):return None
def collect():
 at=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()); samples=[]
 for key,(oid,unit) in FIELDS[VENDOR].items():
  value=snmp_value(oid)
  if key.endswith(".pct") and value is not None and not 0<=value<=100:value=None
  if value is not None:samples.append({"deviceId":DEVICE,"metricKey":key,"observedAt":at,"value":value,"unit":unit,"quality":"valid","sourceField":oid,"profileVersion":f"{VENDOR}-snmp-v1"})
 if not DRY_RUN:
  try:
   probe=subprocess.run(["ping","-n","-c","1","-W","3",TARGET],capture_output=True,timeout=5)
   samples.append({"deviceId":DEVICE,"metricKey":"availability.online","observedAt":at,"value":1 if probe.returncode==0 or samples else 0,"unit":"boolean","quality":"valid","sourceField":"icmp","profileVersion":"icmp-v1"})
  except (OSError,subprocess.TimeoutExpired):pass
 return {"collectorId":COLLECTOR,"schemaVersion":"1.0","samples":samples}
def verify_oids():
 results=[]
 for key,(oid,unit) in FIELDS[VENDOR].items():
  value=snmp_value(oid);results.append({"metricKey":key,"oid":oid,"unit":unit,"supported":value is not None,"sample":value})
 report={"deviceId":DEVICE,"vendor":VENDOR,"address":TARGET,"checkedAt":time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()),"operation":"SNMP GET only","result":"passed" if results and all(item["supported"] for item in results) else "review","metrics":results}
 print(json.dumps(report,indent=2));return 0 if report["result"]=="passed" else 2
def persist(payload,request_id):
 SPOOL.mkdir(parents=True,exist_ok=True)
 path=SPOOL/f"{request_id}.json";temporary=path.with_suffix(".tmp")
 temporary.write_text(json.dumps(payload));temporary.replace(path)
def send(payload,request_id=None):
 request_id=request_id or str(uuid.uuid4())
 if DRY_RUN:print(json.dumps({"requestId":request_id,**payload},indent=2));return "accepted"
 request=urllib.request.Request(ENDPOINT,data=json.dumps(payload).encode(),method="POST",headers={"Authorization":f"Bearer {TOKEN}","Content-Type":"application/json","X-Request-ID":request_id})
 try:
  with urllib.request.urlopen(request,timeout=15) as response:
   result=json.loads(response.read())
   counts=result.get("counts",{})
   if response.status==202 and result.get("accepted") is True and counts.get("rejected")==0 and counts.get("accepted",0)+counts.get("duplicate",0)==len(payload["samples"]):return "accepted"
   persist(payload,request_id)
   if counts.get("rejected",0)>0:
    quarantine=SPOOL/"rejected";quarantine.mkdir(parents=True,exist_ok=True)
    (SPOOL/f"{request_id}.json").replace(quarantine/f"{request_id}.json")
    (quarantine/f"{request_id}.response.json").write_text(json.dumps(result))
    return "rejected"
 except urllib.error.HTTPError as error:
  persist(payload,request_id)
  if error.code in (400,409,413,422):
   quarantine=SPOOL/"rejected";quarantine.mkdir(parents=True,exist_ok=True)
   (SPOOL/f"{request_id}.json").replace(quarantine/f"{request_id}.json")
   (quarantine/f"{request_id}.response.json").write_text(json.dumps({"status":error.code,"error":error.read().decode("utf-8",errors="replace")}))
   return "rejected"
  return "pending"
 except (urllib.error.URLError,RuntimeError,ValueError,TimeoutError,OSError) as error:
  print(f"Delivery pending: {type(error).__name__}",file=sys.stderr)
 persist(payload,request_id);return "pending"
def replay():
 if DRY_RUN or not SPOOL.exists():return
 for path in sorted(SPOOL.glob("*.json"))[:20]:
  try:
   outcome=send(json.loads(path.read_text()),path.stem)
   if outcome=="accepted":path.unlink()
   elif outcome=="pending":break
  except (OSError,ValueError):break
def main():
 validate()
 if "--verify-oids" in sys.argv:raise SystemExit(verify_oids())
 once=DRY_RUN or "--once" in sys.argv
 while True:
  replay();payload=collect()
  if payload["samples"]:send(payload)
  if once:return
  time.sleep(INTERVAL)
if __name__=="__main__":main()
