const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.resolve(__dirname, '..');
const data=vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8')+';({heroinesData,quizData})');
assert.equal(data.heroinesData.length,10);
for(const h of data.heroinesData){assert(fs.existsSync(path.join(root,h.image)));assert(h.source.startsWith('https://'));}
for(const q of data.quizData){assert(q.correct>=0&&q.correct<q.options.length);assert.equal(new Set(q.options).size,q.options.length);}
const src=fs.readFileSync(path.join(root,'script.js'),'utf8');
const shuffleCode=src.slice(src.indexOf('function shuffle('),src.indexOf('function showView('));
const algorithms=vm.runInNewContext(shuffleCode+';({shuffle,randomItem})');
for(let n=0;n<1000;n++){const values=[1,2,3,4,5];const out=algorithms.shuffle(values);assert.equal(out.length,5);assert.equal([...out].sort().join(),values.join());assert.equal(values.join(),'1,2,3,4,5');assert(values.includes(algorithms.randomItem(values)));}
const particleCode=src.slice(src.indexOf('class Particle'),src.indexOf('function fitCanvas'));
for(const mode of ['orbit','attract','repel']){
 const sandbox={width:960,height:430,mode,Math};vm.createContext(sandbox);
 vm.runInContext(particleCode+';this.Particle=Particle',sandbox);
 const particles=Array.from({length:140},()=>new sandbox.Particle());
 for(let i=0;i<1000;i++) for(const p of particles){p.step(.035,{x:480,y:215});assert(Number.isFinite(p.x)&&Number.isFinite(p.y));assert(p.x>=0&&p.x<=960&&p.y>=0&&p.y<=430);assert(Math.hypot(p.vx,p.vy)<=160.00001);}
 const p=new sandbox.Particle();p.x=480;p.y=215;p.vx=0;p.vy=0;p.step(.035,{x:480,y:215});assert(Number.isFinite(p.x));
}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
for(const match of src.matchAll(/\$\('([^']+)'\)/g)){if(match[1]!=='enlargeImage')assert(ids.includes(match[1]),'ID missing: '+match[1]);}
const source=src.slice(src.indexOf('const surpriseActions'),src.indexOf("$('surprise').addEventListener"));
assert(source.includes("showView('historia')")&&source.includes("showView('quiz')")&&source.includes("showView('laboratorio')"));
console.log('PASS: 10 imágenes locales; 5 preguntas consistentes; IDs únicos; referencias DOM; 1000 barajados; 420000 actualizaciones de partículas en 3 modos sin NaN ni salida de límites.');
// Pruebas de la calificación mediante un DOM simulado mínimo (no navegador).
const handlerStart=src.indexOf("$('quizForm').addEventListener('submit', event => {")+"$('quizForm').addEventListener('submit', event => {".length;
const handlerEnd=src.indexOf("\n$('resetQuiz').addEventListener",handlerStart);
const handlerBody=src.slice(handlerStart,handlerEnd).replace(/\}\);\s*$/,'');
function gradeCase(answers){
 const q=JSON.parse(JSON.stringify(data.quizData)).map(q=>({...q,choices:q.options.map((text,i)=>({text,correct:i===q.correct}))}));
 const result={textContent:''}, submit={disabled:false}, feedback=q.map(()=>({hidden:true,textContent:''}));let focused=false;
 const inputs=q.map((item,i)=>item.choices.map((_,j)=>({value:String(j),disabled:false,focus(){focused=true},closest(){return {classList:{add(){}}}}})));
 const form={querySelector(selector){if(selector==='[type=submit]')return submit;const i=Number(selector.match(/q(\d+)/)[1]);if(selector.endsWith(':checked'))return answers[i]===null?null:inputs[i][answers[i]];return inputs[i][0];},querySelectorAll(selector){return inputs[Number(selector.match(/q(\d+)/)[1])];}};
 const lookup=id=>id==='quizForm'?form:id==='quizResult'?result:feedback[Number(id.replace('feedback',''))];
 vm.runInNewContext('(function(event){'+handlerBody+'})({preventDefault(){}})',{$:lookup,questions:q,Number});
 return {result,submit,inputs,feedback,focused};
}
let outcome=gradeCase([null,0,1,1,0]);assert(outcome.focused);assert(!outcome.submit.disabled);assert(outcome.feedback.every(x=>x.hidden));
outcome=gradeCase(data.quizData.map(q=>q.correct));assert(outcome.result.textContent.startsWith('5 de 5'));assert(outcome.submit.disabled);assert(outcome.inputs.flat().every(x=>x.disabled));
outcome=gradeCase(data.quizData.map(q=>(q.correct+1)%q.options.length));assert(outcome.result.textContent.startsWith('0 de 5'));assert(outcome.feedback.every(x=>!x.hidden));
console.log('PASS: quiz incompleto sin revelar soluciones; 5/5 y 0/5; bloqueo posterior y feedback. DOM simulado, sin validación visual.');
