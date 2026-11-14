import {loadEnv} from 'vite';
import {collectionErrors} from '../src/storage/releaseConfig.js';
const env={...loadEnv('production',process.cwd(),''),...process.env};
import fs from 'node:fs';
import {verifyPublicPDF} from './approved-assets.mjs';
import {liveErrors} from '../src/experiment/core.js';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const claims=read('src/data/claims-public.json'),m=read('src/data/evidence-manifest.json'),a=read('src/data/approvals.json');
if(claims.length!==8||new Set(claims.map(c=>c.id)).size!==8)throw Error('Eight unique claims required');
if(/claim_supported|answer_correct|"supported"/.test(JSON.stringify(claims)))throw Error('Public answer key detected');
const errors=liveErrors(claims,m,a);const consent=read('src/data/consent.json');if(!consent.approved||['contact','recipient','retention','withdrawal'].some(k=>!consent[k]?.trim()))errors.push('consent:incomplete');
for(const v of Object.values(m))for(const k of ['original_asset','guided_asset'])if(v[k]&&!fs.existsSync('public/'+v[k]))errors.push('Missing public asset '+v[k]);
const publicFiles=fs.existsSync('public')?fs.readdirSync('public',{recursive:true}):[];
for(const p of publicFiles.filter(p=>/\.pdf$/i.test(p)))verifyPublicPDF(p.replaceAll('\\','/'),fs.readFileSync('public/'+p),m);
if(publicFiles.some(p=>/private|answer.key|survey|assignment/i.test(p)))throw Error('Private files in public directory');
if(process.argv.includes('--live')||env.VITE_COLLECTION_MODE==='live'){errors.push(...collectionErrors({mode:'live',endpoint:env.VITE_SUBMISSION_ENDPOINT,provider:env.VITE_SUBMISSION_PROVIDER,verification:read('src/data/submission-verification.json'),consent}));if(errors.length)throw Error('Live blocked:\n'+errors.join('\n'));}
console.log('Preview validation passed. Live blockers: '+errors.length);
