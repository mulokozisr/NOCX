import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp,copyFile,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join,resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { scryptSync,randomBytes } from 'node:crypto';
import { SqliteD1 } from './sqlite-d1.mjs';
test('production application works on the SQLite adapter without changing the staged database',async()=>{
 const dir=await mkdtemp(join(tmpdir(),'nocx-runtime-test-')),file=join(dir,'test.sqlite');
 await copyFile(process.env.NOCX_DATABASE??'/var/lib/nocx/nocx.sqlite',file);const db=new SqliteD1(file);
 try{
  const salt=randomBytes(32).toString('hex'),password=randomBytes(24).toString('hex'),hash='scrypt-v1$'+salt+'$'+scryptSync(password,salt,32,{N:16384,r:8,p:5,maxmem:33554432}).toString('hex');
  await db.prepare("INSERT INTO operators(id,email,display_name,role_id,status,site_scope_mode) VALUES('vps-smoke-owner','vps-smoke@example.invalid','Smoke test','role-platform-owner','active','all')").run();
  await db.prepare("INSERT INTO local_credentials(operator_id,username,password_hash,must_change_password,version,updated_at) VALUES('vps-smoke-owner','vps-smoke',?,0,1,CURRENT_TIMESTAMP)").bind(hash).run();
  const {default:worker}=await import(pathToFileURL(resolve(process.env.NOCX_RELEASE??'/opt/nocx/current','dist/server/index.js')).href);
  const secret=randomBytes(32).toString('hex'),env={DB:db,ASSETS:{fetch:async()=>new Response('Not found',{status:404})},NOCX_COLLECTOR_TOKEN:secret},ctx={waitUntil(p){p.catch(()=>{})},passThroughOnException(){}};
  const call=(path,options={})=>worker.fetch(new Request('https://nms.bandokios.com'+path,options),env,ctx);
  assert.equal((await call('/')).status,302);assert.equal((await call('/api/platform/operations')).status,401);
  const login=await call('/api/auth/login',{method:'POST',headers:{origin:'https://nms.bandokios.com','content-type':'application/json','cf-connecting-ip':'192.0.2.1'},body:JSON.stringify({username:'vps-smoke',password})});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie').split(';')[0];assert.match(login.headers.get('set-cookie'),/Secure; HttpOnly/);
  const home=await call('/',{headers:{cookie}});assert.equal(home.status,200);assert.match(await home.text(),/NOC/);
  for(const path of ['/api/auth/session','/api/platform/operations','/api/platform/sites','/api/platform/customer-services','/api/platform/wireguard-onboarding']){
   const result=await call(path,{headers:{cookie}});assert.equal(result.status,200,path);await result.text();
  }
  const collector=db.sqlite.prepare('SELECT id FROM collectors LIMIT 1').get().id;
  const targets=await call('/api/collector/v1/device-targets',{headers:{authorization:'Bearer '+secret,'x-collector-id':collector}});assert.equal(targets.status,200);const data=await targets.json();assert.ok(data.targets.length>0);assert.ok(data.targets.every(t=>t.deviceId&&t.address));
  const denied=await call('/api/collector/v1/device-targets',{headers:{authorization:'Bearer incorrect','x-collector-id':collector}});assert.equal(denied.status,401);
  const csrf=await call('/api/platform/device-edit',{method:'POST',headers:{cookie,origin:'https://evil.example','content-type':'application/json'},body:'{}'});assert.equal(csrf.status,403);
  assert.equal(db.sqlite.prepare('PRAGMA integrity_check').get().integrity_check,'ok');assert.deepEqual(db.sqlite.prepare('PRAGMA foreign_key_check').all(),[]);
  console.log('Verified login, dashboard, account/site/service/WireGuard reads, collector targets and CSRF protection on an isolated copy.');
 }finally{db.close();await rm(dir,{recursive:true,force:true})}
});
