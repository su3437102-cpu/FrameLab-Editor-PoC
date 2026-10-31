// Requires Playwright and its Chromium binary. Runs upstream suites, not FrameLab acceptance.
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'), out=path.join(root,'evidence/browser');
fs.mkdirSync(out,{recursive:true});
const log=fs.openSync(path.join(out,'server.log'),'w');
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','4174','--strictPort'],{cwd:path.join(root,'repos/pikado'),stdio:['ignore',log,log]});
let browser;
(async()=>{
 try{
  let ready=false;
  for(let i=0;i<50;i++){try{let r=await fetch('http://127.0.0.1:4174/');if(r.ok){ready=true;break}}catch{} await new Promise(r=>setTimeout(r,200));}
  if(!ready)throw Error('Server did not respond');
  browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});
  await page.screenshot({path:path.join(out,'startup.png')});
  await page.goto('http://127.0.0.1:4174/tests/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.__pikadoTestsDone===true,{},{timeout:300000});
  const report=await page.evaluate(()=>window.__pikadoTests);
  fs.writeFileSync(path.join(out,'upstream-tests.json'),JSON.stringify({report,errors},null,2));
  await page.screenshot({path:path.join(out,'upstream-tests.png')});
 }catch(e){fs.writeFileSync(path.join(out,'failure.txt'),String(e.stack||e));process.exitCode=1;}
 finally{if(browser)await browser.close();server.kill();fs.closeSync(log);}
})();
