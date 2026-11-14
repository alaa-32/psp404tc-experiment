import {openViewer} from '../src/experiment/sourceViewer.js';
import en from '../src/i18n/en.json';import '../src/styles/app.css';
const pages=Array.from({length:3},(_,i)=>{const canvas=document.createElement('canvas');canvas.width=800;canvas.height=1600;const ctx=canvas.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,800,1600);ctx.fillStyle='#183d36';ctx.font='30px Arial';ctx.fillText('SYNTHETIC PAGE '+(i+1),60,80);ctx.fillText('Not research evidence',60,130);return canvas;});
const guided=pages.map(c=>{const copy=c.cloneNode();copy.getContext('2d').drawImage(c,0,0);return copy;});
const context=guided[2].getContext('2d');context.fillStyle='#eed279';context.fillRect(60,1200,650,45);context.fillRect(60,1320,650,45);
const mapping={guided_asset:'synthetic-fixture',target_page:3,target_scroll_anchor:.75};
for(const condition of ['A','B'])document.querySelector('#test'+condition).onclick=()=>openViewer({source:{pages:condition==='A'?pages:guided,numPages:3},condition,mapping,t:k=>en[k],onEvent:()=>{},onClose:()=>{}});
