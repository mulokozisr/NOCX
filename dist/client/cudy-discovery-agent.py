#!/usr/bin/env python3
"""DOXA NOCX device agent. Cudy/MikroTik discovery plus read-only monitoring."""

import concurrent.futures
import hashlib
import ipaddress
import json
import os
import re
import ssl
import subprocess
import time
import threading
import urllib.error
import urllib.parse
import urllib.request

BASE_URL=os.environ["NOCX_BASE_URL"].rstrip("/")
TOKEN=os.environ["NOCX_COLLECTOR_TOKEN"]
COLLECTOR_ID=os.environ["NOCX_COLLECTOR_ID"]
VERSION=os.environ.get("NOCX_DEVICE_AGENT_VERSION",os.environ.get("NOCX_CUDY_AGENT_VERSION","1.4.3"))
INTERVAL=max(15,int(os.environ.get("NOCX_CUDY_AGENT_INTERVAL","30")))
SNMP_COMMUNITY=os.environ.get("NOCX_SNMP_COMMUNITY","")
SNMP_V3_USERNAME=os.environ.get("NOCX_SNMP_V3_USERNAME","")
SNMP_V3_AUTH_PASSWORD=os.environ.get("NOCX_SNMP_V3_AUTH_PASSWORD","")
SNMP_V3_PRIV_PASSWORD=os.environ.get("NOCX_SNMP_V3_PRIV_PASSWORD","")
HEADERS={"Authorization":f"Bearer {TOKEN}","X-Collector-Id":COLLECTOR_ID,"User-Agent":f"NOCX-Device-Agent/{VERSION}"}
API_TLS=ssl.create_default_context()
PROBE_TLS=ssl.create_default_context();PROBE_TLS.check_hostname=False;PROBE_TLS.verify_mode=ssl.CERT_NONE

def api(path,method="GET",payload=None):
    body=None if payload is None else json.dumps(payload,separators=(",",":")).encode()
    headers={**HEADERS,**({"Content-Type":"application/json"} if body else {})}
    request=urllib.request.Request(f"{BASE_URL}{path}",data=body,headers=headers,method=method)
    with urllib.request.urlopen(request,timeout=30,context=API_TLS) as response:
        return json.loads(response.read().decode())

def ping(address):
    started=time.monotonic()
    result=subprocess.run(["ping","-n","-c","1","-W","1",address],stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,check=False,timeout=3)
    elapsed=max(0,int((time.monotonic()-started)*1000))
    return result.returncode==0,elapsed

def fingerprint(address):
    reachable,latency=ping(address)
    if not reachable:return None
    evidence=["icmp_reachability"]
    for scheme,port,key in (("http",80,"http_cudy_fingerprint"),("https",443,"https_cudy_fingerprint")):
        try:
            root_url=f"{scheme}://{address}:{port}/"
            request=urllib.request.Request(root_url,headers={"User-Agent":HEADERS["User-Agent"]})
            with urllib.request.urlopen(request,timeout=2,context=PROBE_TLS) as response:
                content=response.read(65536)
            combined=content
            luci=re.search(br"(?:url\s*=\s*|href\s*=\s*[\"']?)(/?cgi-bin/luci/?)(?=[\"'\s;>])",content,re.I)
            if luci:
                luci_url=urllib.parse.urljoin(root_url,luci.group(1).decode("ascii"))
                luci_request=urllib.request.Request(luci_url,headers={"User-Agent":HEADERS["User-Agent"]})
                try:
                    with urllib.request.urlopen(luci_request,timeout=3,context=PROBE_TLS) as response:
                        combined+=b"\0"+response.read(65536)
                except (urllib.error.URLError,TimeoutError,OSError):
                    pass
            if re.search(br"cudy",combined,re.I):
                evidence.append(key)
                digest=hashlib.sha256(scheme.encode()+b"\0"+address.encode()+b"\0"+combined).hexdigest()
                return {"address":address,"fingerprintDigest":digest,"evidenceKeys":evidence,"confidence":95,"model":"Cudy device","latencyMs":latency}
            if luci:
                luci_key="http_luci_fingerprint" if scheme=="http" else "https_luci_fingerprint"
                evidence.append(luci_key)
                digest=hashlib.sha256(scheme.encode()+b"\0"+address.encode()+b"\0"+combined).hexdigest()
                return {"address":address,"fingerprintDigest":digest,"evidenceKeys":evidence,"confidence":75,"model":"Cudy-compatible LuCI device — confirm before registration","latencyMs":latency}
        except (urllib.error.URLError,TimeoutError,OSError):
            continue
    return None

def run_discovery_jobs():
    feed=api("/api/collector/v1/cudy-discovery-jobs")
    for job in feed.get("jobs",[]):
        network=ipaddress.ip_network(job["cidr"],strict=False)
        addresses=[str(ip) for ip in network.hosts()][:int(job["maxHosts"])]
        with concurrent.futures.ThreadPoolExecutor(max_workers=min(16,max(1,len(addresses)))) as pool:
            results=[result for result in pool.map(fingerprint,addresses) if result]
        api("/api/collector/v1/cudy-discovery-jobs","POST",{"scopeId":job["id"],"results":results})

def clean_snmp_value(value):
    return value.strip().strip('"')

def snmp_base_command(mode,address):
    if mode=="SNMPv2c-read-only":
        if not SNMP_COMMUNITY:return None
        return ["snmpget","-v2c","-c",SNMP_COMMUNITY,"-Oqv","-t","2","-r","0",address]
    if mode=="SNMPv3":
        if not SNMP_V3_USERNAME:return None
        level="authPriv" if SNMP_V3_AUTH_PASSWORD and SNMP_V3_PRIV_PASSWORD else "authNoPriv" if SNMP_V3_AUTH_PASSWORD else "noAuthNoPriv"
        command=["snmpget","-v3","-l",level,"-u",SNMP_V3_USERNAME]
        if SNMP_V3_AUTH_PASSWORD:command += ["-a","SHA","-A",SNMP_V3_AUTH_PASSWORD]
        if SNMP_V3_PRIV_PASSWORD:command += ["-x","AES","-X",SNMP_V3_PRIV_PASSWORD]
        return command+["-Oqv","-t","2","-r","0",address]
    return None

def fingerprint_mikrotik(address,mode):
    reachable,latency=ping(address)
    if not reachable:return None
    command=snmp_base_command(mode,address)
    if not command:return None
    oids=[".1.3.6.1.2.1.1.2.0",".1.3.6.1.2.1.1.1.0",".1.3.6.1.2.1.1.5.0",".1.3.6.1.4.1.14988.1.1.7.8.0"]
    try:
        result=subprocess.run(command+oids,capture_output=True,text=True,check=False,timeout=12)
    except (OSError,subprocess.SubprocessError):return None
    if result.returncode!=0:return None
    values=[clean_snmp_value(line) for line in result.stdout.splitlines()]
    if len(values)<3:return None
    sys_object_id,sys_description,hostname=values[:3]
    board_name=values[3] if len(values)>3 and not re.search(r"no such|unknown object|null",values[3],re.I) else ""
    enterprise_oid="14988" in sys_object_id
    routeros_signature=bool(re.search(r"mikrotik|routeros",sys_description,re.I))
    if not enterprise_oid and not routeros_signature:return None
    evidence=["icmp_reachability","snmp_sysobjectid","snmp_sysdescr","snmp_sysname"]
    evidence.append("mikrotik_enterprise_oid" if enterprise_oid else "routeros_signature")
    if board_name:evidence.append("snmp_board_name")
    digest=hashlib.sha256((address+"\0"+sys_object_id+"\0"+sys_description+"\0"+hostname+"\0"+board_name).encode()).hexdigest()
    version_match=re.search(r"RouterOS\s+([0-9][A-Za-z0-9._-]*)",sys_description,re.I)
    return {"address":address,"hostname":hostname[:80] or None,"model":board_name[:80] or None,"routerOsVersion":version_match.group(1) if version_match else None,"sysObjectId":sys_object_id[:160],"sysDescription":sys_description[:500],"fingerprintDigest":digest,"evidenceKeys":evidence,"confidence":100 if enterprise_oid else 90,"latencyMs":latency}

def run_mikrotik_discovery_jobs():
    feed=api("/api/collector/v1/mikrotik-discovery-jobs")
    for job in feed.get("jobs",[]):
        network=ipaddress.ip_network(job["cidr"],strict=False)
        addresses=[str(ip) for ip in network.hosts()][:int(job["maxHosts"])]
        with concurrent.futures.ThreadPoolExecutor(max_workers=min(16,max(1,len(addresses)))) as pool:
            results=[result for result in pool.map(lambda address:fingerprint_mikrotik(address,job["snmpMode"]),addresses) if result]
        api("/api/collector/v1/mikrotik-discovery-jobs","POST",{"scopeId":job["id"],"results":results})

def numeric_snmp_value(value):
    ticks=re.search(r"\((\d+)\)",value)
    if ticks:return int(ticks.group(1))
    number=re.search(r"-?\d+",value)
    return int(number.group(0)) if number else None

def uptime_seconds(value):
    ticks=re.search(r"\((\d+)\)",value)
    if ticks:return int(ticks.group(1))//100
    duration=re.search(r"(?:(\d+)\s+days?,\s*)?(\d+):(\d+):(\d+)(?:\.(\d+))?",value,re.I)
    if duration:
        days,hours,minutes,seconds=duration.group(1),duration.group(2),duration.group(3),duration.group(4)
        return int(days or 0)*86400+int(hours)*3600+int(minutes)*60+int(seconds)
    return None

# Counter baselines are process-local: restart, reboot, renamed interfaces and
# discontinuities require two clean polls before any traffic rate is reported.
INTERFACE_BASELINES={}

def interface_continuity(elapsed,uptime,old_uptime,discontinuity,old_discontinuity):
    if uptime is None or old_uptime is None or not 0<elapsed<=300 or uptime<=old_uptime:return False
    # Some RouterOS agents expose HC counters but omit discontinuity time.
    # Missing on both polls uses uptime; a change in marker availability resets.
    return discontinuity==old_discontinuity

def interface_rate(previous,current,elapsed,uptime,old_uptime,discontinuity,old_discontinuity):
    if previous is None or current is None or uptime is None or old_uptime is None:return None
    if not interface_continuity(elapsed,uptime,old_uptime,discontinuity,old_discontinuity) or current<previous:return None
    rate=round((current-previous)*8/elapsed)
    return rate if 0<=rate<=9000000000000 else None

def mikrotik_interfaces(target,observed,uptime):
    command=snmp_base_command(target.get("snmpMode"),target["address"])
    if not command:return []
    name_oid=".1.3.6.1.2.1.31.1.1.1.1"
    walk=["snmpwalk"]+[arg for arg in command[1:-1] if arg!="-Oqv"]+["-On","-Oq",command[-1],name_oid]
    try:
        result=subprocess.run(walk,capture_output=True,text=True,check=False,timeout=12)
    except (OSError,subprocess.SubprocessError):return []
    if result.returncode or len(result.stdout)>65536:return []
    interfaces=[]
    for line in result.stdout.splitlines():
        match=re.fullmatch(re.escape(name_oid)+r"\.(\d+)\s+(.+)",line.strip())
        if not match:continue
        index=int(match.group(1));name=clean_snmp_value(match.group(2))
        if 1<=index<=99999 and name and not name.startswith("No Such"):interfaces.append((index,name))
    interfaces=sorted(dict(interfaces).items())[:128]
    columns=[".1.3.6.1.2.1.2.2.1.8", ".1.3.6.1.2.1.31.1.1.1.6", ".1.3.6.1.2.1.31.1.1.1.10", ".1.3.6.1.2.1.31.1.1.1.19", ".1.3.6.1.2.1.2.2.1.14", ".1.3.6.1.2.1.2.2.1.20"]
    samples=[]
    for offset in range(0,len(interfaces),4):
        chunk=interfaces[offset:offset+4]
        oids=[f"{oid}.{index}" for index,_ in chunk for oid in columns]
        try:result=subprocess.run(command[:-1]+["-Ot",command[-1]]+oids,capture_output=True,text=True,check=False,timeout=12)
        except (OSError,subprocess.SubprocessError):continue
        lines=result.stdout.splitlines()
        if result.returncode or len(lines)!=len(oids):continue
        stamp=time.monotonic()
        for position,(index,name) in enumerate(chunk):
            values=[None if "No Such" in line or "NULL" in line else numeric_snmp_value(line) for line in lines[position*6:position*6+6]]
            status,rx,tx,discontinuity,in_errors,out_errors=values
            safe=re.sub(r"[^a-z0-9]+","_",name.lower()).strip("_")[:48] or "interface"
            prefix=f"interface.i{index}_{safe}"
            key=(target["deviceId"],target["address"],target.get("snmpMode"),index)
            previous=INTERFACE_BASELINES.get(key)
            def add(suffix,value,unit):
                if value is not None:samples.append({"deviceId":target["deviceId"],"metricKey":prefix+"."+suffix,"observedAt":observed,"value":value,"unit":unit,"quality":"valid","sourceField":"snmp-if-mib-uptime-fallback" if discontinuity is None else "snmp-if-mib","profileVersion":"mikrotik-read-only-v3"})
            if status is not None and 1<=status<=7:add("oper.status",status,"state")
            if previous and previous["name"]==name:
                elapsed=stamp-previous["at"]
                add("rx.bps",interface_rate(previous["rx"],rx,elapsed,uptime,previous["uptime"],discontinuity,previous["discontinuity"]),"bps")
                add("tx.bps",interface_rate(previous["tx"],tx,elapsed,uptime,previous["uptime"],discontinuity,previous["discontinuity"]),"bps")
                valid=interface_continuity(elapsed,uptime,previous["uptime"],discontinuity,previous["discontinuity"])
                for label,current,old in [("in_errors.delta",in_errors,previous["in_errors"]),("out_errors.delta",out_errors,previous["out_errors"])]:
                    if valid and current is not None and old is not None and 0<=current-old<=9000000000000:add(label,current-old,"count")
            INTERFACE_BASELINES[key]={"name":name,"at":stamp,"rx":rx,"tx":tx,"uptime":uptime,"discontinuity":discontinuity,"in_errors":in_errors,"out_errors":out_errors}
    return samples

def mikrotik_metrics(target,observed):
    mode=target.get("snmpMode")
    address=target["address"]
    command=snmp_base_command(mode,address)
    if not command:return []
    oids=[".1.3.6.1.2.1.1.3.0",".1.3.6.1.2.1.25.3.3.1.2.1",".1.3.6.1.4.1.14988.1.1.3.10.0",".1.3.6.1.4.1.14988.1.1.3.11.0"]
    try:
        result=subprocess.run(command+oids,capture_output=True,text=True,check=False,timeout=12)
    except (OSError,subprocess.SubprocessError):return []
    if result.returncode!=0:return []
    lines=result.stdout.splitlines()
    if len(lines)<4:return []
    uptime,cpu,total_memory,free_memory=uptime_seconds(lines[0]),numeric_snmp_value(lines[1]),numeric_snmp_value(lines[2]),numeric_snmp_value(lines[3])
    metrics=[]
    def add(key,value,unit):
        if value is not None:metrics.append({"deviceId":target["deviceId"],"metricKey":key,"observedAt":observed,"value":int(value),"unit":unit,"quality":"valid","sourceField":"snmp","profileVersion":"mikrotik-read-only-v2"})
    add("device.uptime.seconds",uptime,"seconds")
    if cpu is not None and 0<=cpu<=100:add("device.cpu.utilization.pct",cpu,"percent")
    if total_memory and free_memory is not None and 0<=free_memory<=total_memory:add("device.memory.utilization.pct",round((total_memory-free_memory)*100/total_memory),"percent")
    return metrics+mikrotik_interfaces(target,observed,uptime)

def monitoring_error(stage,target,error):
    # Never include command arguments, headers or credential values in logs.
    code=f" HTTP {error.code}" if isinstance(error,urllib.error.HTTPError) else ""
    print(f"Monitoring {stage} failed for {target['address']}: {type(error).__name__}{code}; continuing other targets.",flush=True)

def availability_target(target):
    try:online,latency=ping(target["address"])
    except Exception as error:
        monitoring_error("ping",target,error);return False
    observed=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime())
    try:api("/api/collector/v1/availability","POST",{"deviceId":target["deviceId"],"collectorId":COLLECTOR_ID,"observedAt":observed,"online":online,"latencyMs":latency if online else None,"packetLossPct":0 if online else 100,"handshakeAgeSeconds":None,"collectorVersion":VERSION})
    except Exception as error:monitoring_error("availability upload",target,error)
    return online

def monitor_targets(include_metrics=True,include_availability=True,parallel=False):
    feed=api("/api/collector/v1/device-targets")
    targets=feed.get("targets",[])
    if include_availability:
        if parallel:
            with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:online=list(pool.map(availability_target,targets))
        else:online=[availability_target(target) for target in targets]
    else:
        # The independent availability loop owns all availability submissions.
        online=[True]*len(targets)
    if not include_metrics:return
    metric_targets=[target for target,is_online in zip(targets,online) if is_online and target.get("profile")=="mikrotik-snmp-read-only" and target.get("metricsEnabled")]
    for target in metric_targets:
        observed=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime())
        try:metrics=mikrotik_metrics(target,observed)
        except Exception as error:
            monitoring_error("SNMP collection",target,error);continue
        for offset in range(0,len(metrics),20):
            try:
                reply=api("/api/collector/v1/metrics","POST",{"collectorId":COLLECTOR_ID,"schemaVersion":"1.0","samples":metrics[offset:offset+20]})
                if reply.get("counts",{}).get("rejected",0):print(f"Metric ingestion rejected samples for {target['address']}; check registration and profile permissions.",flush=True)
            except Exception as error:
                monitoring_error("metrics upload",target,error);break

def availability_loop():
    while True:
        started=time.monotonic()
        try:monitor_targets(include_metrics=False,parallel=True)
        except Exception as error:print(f"Availability target retrieval failed: {type(error).__name__}; retrying next cycle.",flush=True)
        time.sleep(max(1,INTERVAL-(time.monotonic()-started)))

def main():
    threading.Thread(target=availability_loop,name="nocx-availability",daemon=True).start()
    while True:
        try:run_discovery_jobs()
        except Exception as error:print(f"Cudy discovery error: {error}",flush=True)
        try:run_mikrotik_discovery_jobs()
        except Exception as error:print(f"MikroTik discovery error: {error}",flush=True)
        try:monitor_targets(include_availability=False)
        except Exception as error:print(f"monitoring error: {error}",flush=True)
        time.sleep(INTERVAL)

if __name__=="__main__":main()
