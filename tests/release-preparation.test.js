import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {verifyPublicPDF} from '../scripts/approved-assets.mjs';
import {createSession} from '../src/experiment/core.js';
import {save,restore,RETENTION_MS} from '../src/storage/localProgress.js';
test('coursework approval alone never allows public PDF publication',()=>{
 const bytes=Buffer.from('fixture'),file='papers/test.pdf';
 const m={original_asset:file,coursework_use_approved:true};
 assert.throws(()=>verifyPublicPDF(file,bytes,{x:m}));
 Object.assign(m,{rights_clearance:true,researcher_approval:true,content_equivalence_verified:true,publication_permission_reference:'test fixture permission',asset_sha256:{[file]:createHash('sha256').update(bytes).digest('hex')}});
 verifyPublicPDF(file,bytes,{x:m});
 assert.throws(()=>verifyPublicPDF(file,Buffer.from('changed'),{x:m}));
 assert.throws(()=>verifyPublicPDF('papers/../test.pdf',bytes,{x:m}));
 assert.throws(()=>verifyPublicPDF('papers/unregistered.pdf',bytes,{x:m}));
});
test('local retention expires at 30 days and retries do not extend it',()=>{
 const data=new Map(),storage={getItem:k=>data.get(k),setItem:(k,v)=>data.set(k,v),removeItem:k=>data.delete(k)};
 const session=createSession('en',42);const start=Date.parse(session.session_start);
 save(session,storage);assert.ok(restore(storage,start+RETENTION_MS-1));assert.equal(restore(storage,start+RETENTION_MS),null);assert.equal(data.size,0);
 session.first_submission_at=new Date(start+1000).toISOString();save(session,storage);
 assert.ok(restore(storage,start+RETENTION_MS));save(session,storage);
 assert.equal(restore(storage,start+1000+RETENTION_MS),null);
});
