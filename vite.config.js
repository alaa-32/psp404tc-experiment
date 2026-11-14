import {defineConfig} from 'vite';
import fs from 'node:fs';
import path from 'node:path';
export default defineConfig({base:'./',server:{fs:{deny:['**/.env*','**/private_materials/**','**/research-data/**','**/researcher_tools/**','**/qa/**']}},plugins:[{name:'local-research-pdfs',configureServer(server){server.middlewares.use('/local-papers',(req,res,next)=>{const name=decodeURIComponent((req.url||'').split('?')[0]).replace(/^\//,'');if(!['cs.pdf','robotic.pdf','economic.pdf','edu.pdf',...['CS1','CS2','RB1','RB2','EC1','EC2','ED1','ED2'].map(id=>'guided-'+id+'.pdf')].includes(name))return next();const file=path.resolve('local-assets',name);if(!fs.existsSync(file))return next();res.setHeader('Content-Type','application/pdf');fs.createReadStream(file).pipe(res);});}}]});

