import assert from 'node:assert/strict';
import * as p from '../repos/pikado/src/vector/path.js';
import {Selection} from '../repos/pikado/src/core/selection.js';
const results=[];
function test(name,fn){try{fn();results.push({name,status:'通过',scope:'Node模块实测，非浏览器交互'});}catch(e){results.push({name,status:'失败',error:e.stack});}}
test('路径控制点JSON与深复制',()=>{const path=p.createPath('cross-cell');const sp=p.createSubpath(false);sp.points.push(p.createPoint(900,900,null,{x:1100,y:400}),p.createPoint(2300,2100,{x:1700,y:2700},null));path.subpaths.push(sp);const c=p.clonePath(path);assert.deepEqual(c,path);c.subpaths[0].points[0].out.x=1;assert.equal(path.subpaths[0].points[0].out.x,1100);assert.deepEqual(JSON.parse(JSON.stringify(path)),path);});
test('曲线端点与中点计算',()=>{let path=p.createPath();path.subpaths=[{closed:false,points:[p.createPoint(0,0,null,{x:0,y:100}),p.createPoint(100,0,{x:100,y:100},null)]}];assert.deepEqual(p.pointOnSegment(path,0,0,0),{x:0,y:0});assert.deepEqual(p.pointOnSegment(path,0,0,1),{x:100,y:0});assert.deepEqual(p.pointOnSegment(path,0,0,.5),{x:50,y:75});});
test('3240平方选区蒙版深复制',()=>{let s=new Selection(3240,3240);s.mask=new Uint8ClampedArray(3240*3240);s.mask[1080*3240+1080]=128;let c=s.clone();assert.equal(c.mask.length,10497600);assert.equal(c.mask[3500280],128);c.mask[3500280]=255;assert.equal(s.mask[3500280],128);});
console.log(JSON.stringify({runtime:process.version,results},null,2));
