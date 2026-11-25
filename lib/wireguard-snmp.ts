// Independent runtime secret; never reuse a collector/API authentication token.
type SnmpCredentials={username:string;authPassword:string;privacyPassword:string};
const enrollmentId=/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
function legacySnmpCredentials(id:string):SnmpCredentials|null|undefined {
 const encoded=process.env.NOCX_WG_SNMP_LEGACY_B64,idsValue=process.env.NOCX_WG_SNMP_LEGACY_IDS;
 if(encoded===undefined&&idsValue===undefined)return undefined;
 // Any incomplete or malformed migration configuration fails closed, never
 // silently deriving replacement credentials for an already configured router.
 try{
  if(!encoded||encoded.length>32768||!idsValue||idsValue.length>8192||!/^[A-Za-z0-9+/]+={0,2}$/.test(encoded))return null;
  const ids:unknown=JSON.parse(idsValue),entries:unknown=JSON.parse(Buffer.from(encoded,'base64').toString('utf8'));
  if(!Array.isArray(ids)||!ids.length||ids.length>128||ids.some(k=>typeof k!=='string'||!enrollmentId.test(k))||new Set(ids).size!==ids.length||!entries||typeof entries!=='object'||Array.isArray(entries))return null;
  const map=entries as Record<string,SnmpCredentials>;
  if(Object.keys(map).length!==ids.length||ids.some(k=>!Object.hasOwn(map,k)))return null;
  for(const key of ids){
   const item=map[key];if(!item||typeof item!=='object'||Object.keys(item).sort().join(',')!=='authPassword,privacyPassword,username'||item.username!=='nocx-'+key.replaceAll('-','').slice(-16)||typeof item.authPassword!=='string'||!/^[a-f0-9]{32}$/.test(item.authPassword)||typeof item.privacyPassword!=='string'||!/^[a-f0-9]{32}$/.test(item.privacyPassword))return null;
  }
  return Object.hasOwn(map,id)?{...map[id]}:undefined;
 }catch{return null}
}
export async function wireguardSnmpCredentials(id:string) {
 if(!enrollmentId.test(id))return null;
 const preserved=legacySnmpCredentials(id);if(preserved!==undefined)return preserved;
 const secret=process.env.NOCX_WG_SNMP_KEY;
 if(!secret||!/^[a-f0-9]{64}$/.test(secret))return null;
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const derive=async(label:string)=>Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode('nocx-snmp-v1:'+id+':'+label))),b=>b.toString(16).padStart(2,'0')).join('').slice(0,32);
 return {username:'nocx-'+id.replaceAll('-','').slice(-16),authPassword:await derive('auth'),privacyPassword:await derive('privacy')};
}
export function wireguardSnmpScript(iface:string,server:string,address:string,id:string,credentials:{username:string;authPassword:string;privacyPassword:string}) {
 // Inputs are validated enrollment metadata or generated hex credentials.
 const comment='NOCX SNMP '+id;
 const properties=`addresses=${server}/32 security=private authentication-protocol=SHA1 authentication-password="${credentials.authPassword}" encryption-protocol=AES encryption-password="${credentials.privacyPassword}" read-access=yes write-access=no`;
 return `:if ([:len [/snmp community find where name="${credentials.username}"]] = 0) do={ /snmp community add name="${credentials.username}" ${properties} } else={ /snmp community set [find where name="${credentials.username}"] ${properties} }\n`+
 `:if (![/snmp get enabled]) do={ /snmp community set [find where name="public"] addresses=127.0.0.1/32 read-access=no write-access=no }\n`+
 `:if ([:len [/ip firewall filter find where comment="${comment}"]] = 0) do={ /ip firewall filter add chain=input action=accept protocol=udp dst-port=161 in-interface="${iface}" src-address=${server}/32 dst-address=${address}/32 comment="${comment}" }\n`+
 `:if ([:len [/ip firewall filter find]] > 1) do={ /ip firewall filter move [find where comment="${comment}"] 0 }\n/snmp set enabled=yes\n`;
}
