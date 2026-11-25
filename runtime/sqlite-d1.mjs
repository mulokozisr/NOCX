import { DatabaseSync } from 'node:sqlite';
import { performance } from 'node:perf_hooks';

function value(input){
 if(typeof input==='boolean')return Number(input);
 if(input instanceof ArrayBuffer)return new Uint8Array(input);
 if(input===null||typeof input==='string'||typeof input==='number'||typeof input==='bigint'||ArrayBuffer.isView(input))return input;
 throw new TypeError('Unsupported database parameter');
}
function output(input){
 if(typeof input==='bigint'){
  const result=Number(input);if(!Number.isSafeInteger(result))throw new RangeError('Database integer exceeds safe JSON range');return result;
 }
 if(input instanceof Uint8Array)return [...input];
 return input;
}
class Prepared {
 constructor(binding,sql,params=[]){this.binding=binding;this.sql=sql;this.params=params}
 bind(...params){return new Prepared(this.binding,this.sql,params.map(value))}
 execute(arrays=false){
  const db=this.binding.sqlite,start=performance.now(),before=db.prepare('SELECT total_changes() n').get().n;
  const statement=db.prepare(this.sql);statement.setReadBigInts(true);statement.setReturnArrays(arrays);
  const results=statement.all(...this.params).map(row=>arrays?row.map(output):Object.fromEntries(Object.entries(row).map(([k,v])=>[k,output(v)])));
  const changes=db.prepare('SELECT total_changes() n,last_insert_rowid() id').get();
  return {results,success:true,meta:{changes:Number(changes.n)-Number(before),last_row_id:Number(changes.id),duration:performance.now()-start,served_by:'nocx-sqlite'}};
 }
 async all(){return this.execute()}
 async run(){return this.execute()}
 async first(column){const row=this.execute().results[0];if(!row)return null;if(column===undefined)return row;if(!(column in row))throw new Error('Unknown result column');return row[column]}
 async raw(options){
  const rows=this.execute(true).results;
  if(options?.columnNames)return [this.binding.sqlite.prepare(this.sql).columns().map(c=>c.name),...rows];return rows;
 }
}
export class SqliteD1 {
 constructor(file){
  this.sqlite=new DatabaseSync(file,{enableForeignKeyConstraints:true,enableDoubleQuotedStringLiterals:false,allowExtension:false});
  this.sqlite.exec('PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=5000; PRAGMA foreign_keys=ON;');
 }
 prepare(sql){if(typeof sql!=='string'||!sql.trim())throw new TypeError('SQL is required');return new Prepared(this,sql)}
 async batch(statements){
  // No await between BEGIN and COMMIT: requests cannot interleave inside a batch.
  this.sqlite.exec('BEGIN IMMEDIATE');
  try{const result=statements.map(s=>{if(!(s instanceof Prepared)||s.binding!==this)throw new TypeError('Foreign database statement');return s.execute()});this.sqlite.exec('COMMIT');return result}
  catch(error){this.sqlite.exec('ROLLBACK');throw error}
 }
 close(){this.sqlite.close()}
}
