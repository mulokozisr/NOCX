import test from 'node:test';
import assert from 'node:assert/strict';
import { SqliteD1 } from './sqlite-d1.mjs';
test('SQLite adapter preserves raw duplicate columns, immutable binding, FK enforcement and atomic changes guards',async()=>{
 const db=new SqliteD1(':memory:');try{
  await db.prepare('CREATE TABLE test(id INTEGER PRIMARY KEY,value TEXT UNIQUE)').run();
  const p=db.prepare('INSERT INTO test(id,value) VALUES(?,?)'),a=p.bind(1,'one'),b=p.bind(2,'two');await a.run();await b.run();
  assert.deepEqual(await db.prepare('SELECT a.id,b.id,a.value,b.value FROM test a,test b WHERE a.id=1 AND b.id=2').raw(),[[1,2,'one','two']]);
  assert.deepEqual(await db.prepare('SELECT 1 AS same,2 AS same').raw({columnNames:true}),[['same','same'],[1,2]]);
  const result=await db.batch([p.bind(3,'three'),db.prepare('SELECT changes() n')]);assert.equal(result[1].results[0].n,1);
  await assert.rejects(()=>db.batch([p.bind(4,'four'),p.bind(5,'one')]));assert.equal(await db.prepare('SELECT count(*) n FROM test WHERE id=4').first('n'),0);
  await db.prepare('CREATE TABLE child(parent INTEGER REFERENCES test(id))').run();await assert.rejects(()=>db.prepare('INSERT INTO child VALUES(99)').run());
  assert.deepEqual(await db.prepare("SELECT CAST(X'00FF' AS BLOB) b").raw(),[[[0,255]]]);
  await assert.rejects(()=>db.prepare('SELECT 9007199254740993').raw(),/safe JSON range/);
 }finally{db.close()}
});
