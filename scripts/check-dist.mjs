import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {verifyPublicPDF} from './approved-assets.mjs';
const manifest=JSON.parse(fs.readFileSync('src/data/evidence-manifest.json','utf8'));
const files=fs.readdirSync('dist',{recursive:true}).filter(f=>fs.statSync(path.join('dist',f)).isFile());
assert.ok(!files.some(f=>/private|answer.key|research-data|survey|assignment/i.test(f)),'Private artifact in build');
for(const file of files.filter(f=>/\.pdf$/i.test(f))){assert.notEqual(process.env.VITE_PUBLIC_PREVIEW,'true','Public preview must contain no PDFs');verifyPublicPDF(file.replaceAll('\\','/'),fs.readFileSync(path.join('dist',file)),manifest);}
const html=fs.readFileSync('dist/index.html','utf8');
for(const [,ref] of html.matchAll(/(?:src|href)="([^"]+)"/g)){assert.ok(ref.startsWith('./assets/'),'Nonrelative build asset');const url=new URL(ref,'https://example.invalid/psp404tc-experiment/');assert.ok(url.pathname.startsWith('/psp404tc-experiment/assets/'));assert.ok(fs.existsSync(path.join('dist',ref)));}
for(const file of files.filter(f=>f.endsWith('.js'))){const content=fs.readFileSync(path.join('dist',file),'utf8');for(const token of ['claim_supported','answer_correct','answer-key.json','private_materials/','C:/M1_XJTLU'])assert.ok(!content.includes(token),'Private/scoring token '+token);}
console.log('Build audit passed: relative assets, only explicitly approved PDFs, no keys or private/scoring data.');
