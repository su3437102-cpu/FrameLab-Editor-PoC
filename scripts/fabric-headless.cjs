const fs=require('fs'),path=require('path');
const ts=require('../repos/fabric-photo/node_modules/typescript');
const src=path.resolve(__dirname,'../repos/fabric-photo/packages/core/src');const out=path.resolve(__dirname,'../headless-generated');
for(const rel of ['model/doc','steps/step','steps/object-steps','state/editor-state','transform/transaction','plugins/history']){
 let text=ts.transpileModule(fs.readFileSync(path.join(src,rel+'.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 fs.mkdirSync(path.dirname(path.join(out,rel+'.js')),{recursive:true});fs.writeFileSync(path.join(out,rel+'.js'),text);
}
const {EditorState}=require(out+'/state/editor-state');const {Transaction}=require(out+'/transform/transaction');const {AddObject}=require(out+'/steps/object-steps');const {History}=require(out+'/plugins/history');const a=require('node:assert/strict');
const s=new EditorState();const obj={id:'cross',kind:'path',tool:'line',path:'M900 900 C1100 400 1700 2700 2300 2100',left:0,top:0,angle:0,scaleX:1,scaleY:1,stroke:'#fff',strokeWidth:2,fill:''};
const t=new Transaction(s).addStep(new AddObject(obj)).setSelection(['cross']);const next=s.apply(t);a.equal(next.doc.objects.length,1);a.equal(s.doc.objects.length,0);const h=new History(()=>{});h.onTransaction(t,s,next);const entry=h.popUndo();let undo=new Transaction(next);entry.inverse.forEach(x=>undo.addStep(x));a.equal(next.apply(undo).doc.objects.length,0);a.deepEqual(JSON.parse(JSON.stringify(next.doc)),next.doc);a.throws(()=>next.apply(new Transaction(next).addStep(new AddObject(obj))));
console.log(JSON.stringify({status:'通过',checks:['对象事务新增且旧状态不变','逆Step撤销对象','纯Doc JSON回环','重复ID拒绝'],scope:'仅六个TS模块转译后Node执行；非完整构建、非公开Editor集成、非渲染或钢笔UI验证',typescript:ts.version},null,2));
