const {chromium}=require(process.env.PLAYWRIGHT_PATH||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 try{for(const group of ['A','B']){
  const context=await browser.newContext({viewport:{width:390,height:844}});
  await context.route('**/formsubmit.app/**',route=>route.abort());
  await context.addInitScript(g=>{delete Promise.withResolvers;Math.random=()=>g==='A'?0.1:0.9;},group);
  const page=await context.newPage();const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto((process.env.LOCAL_QA_URL||'http://127.0.0.1:5173')+'/?test='+group);
  await page.locator('#begin').click();await page.locator('#agree').check();
  await page.locator('#agreeNext').click();await page.locator('#practice').click();
  await page.locator('#source').click();
  assert.equal(await page.locator('#pageCount').innerText(),`Page ${group==='A'?1:2} / 2`);
  assert.equal(await page.locator('mark').count(),group==='A'?0:1);
  if(group==='A'){await page.locator('#nextPage').click();assert.equal(await page.locator('mark').count(),0);}
  await page.locator('#closeReader').click();await page.locator('input[value=include]').check();
  await page.locator('#answer').click();await page.locator('#start').click();
  for(let i=0;i<8;i++){
   await page.locator('#source').click();await page.locator('canvas').waitFor();
   await page.locator('#closeReader').click();await page.locator('input[value=include]').check();await page.locator('#answer').click();
  }
  await page.getByRole('heading',{name:'Thank you for taking part.'}).waitFor();
  const session=await page.evaluate(g=>JSON.parse(localStorage.getItem('psp404tc.live.v1')||localStorage.getItem('psp404tc.preview.v1.test'+g)||localStorage.getItem('psp404tc.preview.v1')),group);
  assert.equal(session.trials.length,8);assert.equal(session.condition,group);assert.deepEqual(errors,[]);
  console.log(`Group ${group}: correct practice, eight PDF trials completed without native Promise.withResolvers; no live submission.`);
  await context.close();
 }}finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
