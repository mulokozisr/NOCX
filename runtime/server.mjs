import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { readFile,stat,realpath } from 'node:fs/promises';
import { resolve,sep,extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { isIP } from 'node:net';
import { SqliteD1 } from './sqlite-d1.mjs';

const origin=new URL(process.env.NOCX_PUBLIC_ORIGIN??'https://nms.bandokios.com');
if(origin.protocol!=='https:'||origin.pathname!=='/'||origin.search||origin.hash)throw new Error('Invalid public HTTPS origin');
const release=resolve(process.env.NOCX_RELEASE??'/opt/nocx/current');
const root=await realpath(resolve(release,'dist/client'));
const db=new SqliteD1(process.env.NOCX_DATABASE??'/var/lib/nocx/nocx.sqlite');
const {default:worker}=await import(pathToFileURL(resolve(release,'dist/server/index.js')).href);
const mime={'.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.woff2':'font/woff2','.jpg':'image/jpeg','.webp':'image/webp','.txt':'text/plain; charset=utf-8','.html':'text/html; charset=utf-8'};
async function asset(request){
 let path;try{path=decodeURIComponent(new URL(request.url).pathname)}catch{return new Response('Bad path',{status:400})}
 if(path.includes('\0')||path.includes('\\'))return new Response('Bad path',{status:400});
 const file=resolve(root,'.'+path);
 if(!file.startsWith(root+sep))return new Response('Not found',{status:404});
 try{
  const actual=await realpath(file);if(!actual.startsWith(root+sep)||(await stat(actual)).isDirectory())return new Response('Not found',{status:404});
  return new Response(request.method==='HEAD'?null:await readFile(actual),{headers:{'content-type':mime[extname(file)]??'application/octet-stream','x-content-type-options':'nosniff','cache-control':path.startsWith('/assets/')?'public,max-age=31536000,immutable':'public,max-age=300'}});
 }catch(error){if(['ENOENT','ENOTDIR'].includes(error.code))return new Response('Not found',{status:404});throw error}
}
const env={DB:db,ASSETS:{fetch:asset},NOCX_COLLECTOR_TOKEN:process.env.NOCX_COLLECTOR_TOKEN??'',NOCX_WG_SNMP_KEY:process.env.NOCX_WG_SNMP_KEY??''};
const pending=new Set();
const context={waitUntil(p){pending.add(p);p.catch(()=>console.error('Background task failed')).finally(()=>pending.delete(p))},passThroughOnException(){}};
const server=createServer(async(req,res)=>{
 try{
  if(!req.url?.startsWith('/')||req.url.startsWith('//')){res.writeHead(400).end();return}
  if(req.headers.host!==origin.host&&req.headers.host!=='127.0.0.1:3000'){res.writeHead(421).end();return}
  const headers=new Headers();for(const [name,v] of Object.entries(req.headers))if(v!==undefined&&!['host','connection','transfer-encoding','content-length','cf-connecting-ip','forwarded','x-forwarded-for','x-forwarded-host','x-forwarded-proto','x-nocx-client-ip','oai-authenticated-user-id','oai-authenticated-user-email','oai-authenticated-user-full-name'].includes(name))headers.set(name,Array.isArray(v)?v.join(', '):v);
  // Only a local proxy can connect; ignore all public client-IP/identity headers.
  // Caddy overwrites this dedicated header with its verified client address.
  const client=req.headers['x-nocx-client-ip'];headers.set('cf-connecting-ip',typeof client==='string'&&isIP(client)?client:req.socket.remoteAddress??'127.0.0.1');
  let size=0;const parts=[];for await(const part of req){size+=part.length;if(size>2*1024*1024){res.writeHead(413).end();return}parts.push(part)}
  const body=parts.length?Buffer.concat(parts):undefined;
  const request=new Request(origin.origin+req.url,{method:req.method,headers,...(body?{body,duplex:'half'}:{})});
  let response;
  if(req.url.split('?')[0]==='/_health')response=Response.json({status:'ok'},{headers:{'cache-control':'no-store'}});
  else{
   response=await worker.fetch(request,env,context);
   if(response.status===404&&['GET','HEAD'].includes(req.method))response=await asset(request);
  }
  const responseHeaders={};for(const [key,val] of response.headers)if(key!=='set-cookie'&&!['connection','transfer-encoding'].includes(key))responseHeaders[key]=val;
  const cookies=response.headers.getSetCookie();if(cookies.length)responseHeaders['set-cookie']=cookies;
  res.writeHead(response.status,responseHeaders);
  if(req.method==='HEAD'||!response.body)res.end();else Readable.fromWeb(response.body).pipe(res);
 }catch(error){console.error('Request failed:',error.name);if(!res.headersSent)res.writeHead(500,{'content-type':'application/json','cache-control':'no-store'});res.end('{"error":"Service temporarily unavailable"}')}
});
server.requestTimeout=30000;server.headersTimeout=15000;server.keepAliveTimeout=5000;
server.listen(3000,'127.0.0.1',()=>console.log('NOC-X listening on loopback port 3000'));
let running=false;
const timer=setInterval(()=>{if(running)return;running=true;const tasks=[];Promise.resolve(worker.scheduled({},env,{waitUntil:p=>tasks.push(p)})).then(()=>Promise.all(tasks)).catch(()=>console.error('Scheduled maintenance failed')).finally(()=>running=false)},3600000);timer.unref();
process.on('SIGTERM',()=>{clearInterval(timer);server.close(async()=>{await Promise.allSettled([...pending]);db.close();process.exit(0)})});
