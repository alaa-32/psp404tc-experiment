import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const files=execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
assert.ok(files.length,'No tracked source files');
for(const file of files){
 assert.ok(!/(^|\/)(private_materials|local-assets|research-data|qa|node_modules|dist|researcher_tools)(\/|$)|\.(pdf|csv|xlsx|docx|pem|key|p12)$/i.test(file),'Private file tracked: '+file);
 assert.ok(!/(^|\/)\.env/.test(file)||['.env.example','.env.development','.env.production'].includes(file),'Unapproved environment file: '+file);
 const text=fs.readFileSync(file,'utf8');
 assert.ok(!/-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|AKIA[0-9A-Z]{16}/.test(text),'Possible credential: '+file);
}
console.log(`Public source audit passed: ${files.length} tracked files; no datasets, PDFs or private key files.`);
