import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import worker from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc=worker;
import {sourceURL,practicePresentation} from './sourcePolicy.js';
export async function prepareSource(claim,condition,mapping){
 if(claim.practice)return {practice:true,numPages:2};
 const url=sourceURL(claim,condition,mapping,{dev:import.meta.env.DEV,base:import.meta.env.BASE_URL});
 const pdf=await pdfjs.getDocument({url,isEvalSupported:false}).promise;
 if(pdf.numPages!==mapping.page_count)throw Error('Page count mismatch');
 // Cache every page at identical resolution for both conditions before timing.
 const pages=[];
 for(let n=1;n<=pdf.numPages;n++){const page=await pdf.getPage(n),viewport=page.getViewport({scale:1.7}),canvas=document.createElement('canvas');canvas.width=viewport.width;canvas.height=viewport.height;await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;pages.push(canvas);}
 await pdf.destroy();return {pages,numPages:pages.length};
}
export function openViewer({source,condition,mapping,t,onEvent,onClose}){
 if(!source.practice&&(!source.pages?.length||source.pages.length!==source.numPages))throw Error('Incomplete source; viewer refused');
 const practice=source.practice?practicePresentation(condition):null;
 const guided=practice?practice.highlighted:condition==='B'&&(!!mapping?.guided_asset||(import.meta.env.DEV&&mapping?.local_review_verified));
 let page=practice?practice.initialPage:guided?mapping.target_page:1,zoom=1;
 const dialog=document.createElement('dialog');dialog.className='reader';dialog.setAttribute('aria-label',t('source'));
 dialog.innerHTML=`<header><strong>${t('source')}</strong><button id="closeReader">${t('back')} ↗</button></header><nav><button id="prev">← ${t('prev')}</button><span id="pageCount" aria-live="polite"></span><button id="nextPage">${t('pageNext')} →</button><button id="zoomOut" aria-label="${t('zoomOut')}">−</button><button id="zoomIn" aria-label="${t('zoomIn')}">+</button></nav><div class="paper-scroll" tabindex="0"><div class="paper"></div></div>`;
 document.body.append(dialog);const scroll=dialog.querySelector('.paper-scroll'),paper=dialog.querySelector('.paper');
 function render(jump=false){paper.replaceChildren();paper.style.width=`${zoom*100}%`;if(source.pages){const copy=source.pages[page-1].cloneNode();copy.getContext('2d').drawImage(source.pages[page-1],0,0);copy.style.width='100%';copy.style.height='auto';copy.setAttribute('role','img');copy.setAttribute('aria-label',`${t('source')} ${t('page')} ${page}`);paper.append(copy);}else{const section=document.createElement('section');section.className='demo-paper';section.innerHTML=`<small>PSP404TC · ${t('practice')}</small><h2>${t('practiceSource')}</h2><p>${page===1?t('practicePage1'):(guided?'<mark>'+t('practiceBody')+'</mark>':t('practiceBody'))}</p>`;paper.append(section);}dialog.querySelector('#pageCount').textContent=`${t('page')} ${page} / ${source.numPages}`;dialog.querySelector('#prev').disabled=page===1;dialog.querySelector('#nextPage').disabled=page===source.numPages;requestAnimationFrame(()=>{scroll.scrollTop=jump?Math.max(0,paper.scrollHeight*mapping.target_scroll_anchor-40):0;});}
 dialog.querySelector('#prev').onclick=()=>{page--;render();onEvent('page',page);};dialog.querySelector('#nextPage').onclick=()=>{page++;render();onEvent('page',page);};
 for(const [id,delta] of [['zoomIn',.5],['zoomOut',-.5]])dialog.querySelector('#'+id).onclick=()=>{zoom=Math.max(1,Math.min(4,zoom+delta));paper.style.width=`${zoom*100}%`;onEvent('zoom',zoom);};
 let closed=false;const close=()=>{if(closed)return;closed=true;dialog.close();dialog.remove();onClose();};dialog.querySelector('#closeReader').onclick=close;dialog.addEventListener('cancel',e=>{e.preventDefault();close();});dialog.showModal();render(guided&&!source.practice);onEvent('page',page);return close;
}
