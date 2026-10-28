'use strict';
const $ = id => document.getElementById(id);
let currentPage = 0;
let activeView = 'historia';
// Fisher-Yates: cada permutación tiene la misma probabilidad. O(n).
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
function randomItem(items) { return items[Math.floor(Math.random() * items.length)]; }
function showView(name) {
  activeView = name;
  document.querySelectorAll('.view').forEach(view => { view.hidden = view.id !== name; });
  document.querySelectorAll('.section-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.view === name);
    if (button.dataset.view === name) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  syncAnimation();
}
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => showView(button.dataset.view)));
heroinesData.forEach((h, index) => {
  const button = document.createElement('button');
  button.className = 'tab-btn';
  button.innerHTML = `<span class="number">${String(index + 1).padStart(2, '0')}</span>${h.name}`;
  button.addEventListener('click', () => goToPage(index));
  $('navTabs').append(button);
});
function goToPage(index) {
  currentPage = Math.max(0, Math.min(index, heroinesData.length - 1));
  const h = heroinesData[currentPage];
  $('pagesContainer').innerHTML = `<article aria-labelledby="heroineName"><div class="heroine-header"><h2 id="heroineName">${h.name}</h2><span class="field">${h.field}</span></div><div class="comic-grid"><figure class="portrait"><button id="enlargeImage" aria-label="Ampliar ilustración de ${h.name}"><img src="${h.image}" alt="Ilustración de ${h.name} en un entorno asociado con su trabajo" width="512" height="768"></button><figcaption>Ilustración recreada · Pulsa para ampliar</figcaption></figure><div class="story-panel"><span class="eyebrow">01 / EL CONTEXTO</span><p>${h.panel1Text}</p><p class="speech">${h.panel2Speech}</p></div><div class="story-panel"><span class="eyebrow">02 / UNA VOZ IMAGINADA</span><p>${h.panel4Speech}</p><a class="read-source" href="${h.source}" target="_blank" rel="noopener noreferrer">Profundizar en ${h.sourceLabel} ↗</a></div><div class="contribution"><h3>Su contribución</h3><p>${h.panel3Text}</p></div></div></article>`;
  $('pageIndicator').textContent = `${String(currentPage + 1).padStart(2, '0')} / ${heroinesData.length}`;
  $('prevBtn').disabled = currentPage === 0;
  $('nextBtn').disabled = currentPage === heroinesData.length - 1;
  [...$('navTabs').children].forEach((button, i) => {
    button.classList.toggle('active', i === currentPage);
    if(i === currentPage) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  $('enlargeImage').addEventListener('click', () => {
    $('largeImage').src = h.image; $('largeImage').alt = `Ilustración de ${h.name}`;
    $('imageCaption').textContent = h.name; $('imageDialog').showModal();
  });
}
$('prevBtn').addEventListener('click', () => goToPage(currentPage - 1));
$('nextBtn').addEventListener('click', () => goToPage(currentPage + 1));
$('closeImage').addEventListener('click', () => $('imageDialog').close());
$('imageDialog').addEventListener('click', event => { if(event.target === $('imageDialog')) $('imageDialog').close(); });
$('sourceList').innerHTML = heroinesData.map(h => `<li><a href="${h.source}" target="_blank" rel="noopener noreferrer">${h.name}</a><span>${h.sourceLabel}</span></li>`).join('');
// Invocación aleatoria de funciones, además de selección aleatoria de datos.
const surpriseActions = [
  () => { showView('historia'); goToPage(randomItem(heroinesData.map((_, i) => i).filter(i => i !== currentPage))); },
  () => { showView('quiz'); resetQuiz(); },
  () => { showView('laboratorio'); chooseRandomMode(); }
];
$('surprise').addEventListener('click', () => randomItem(surpriseActions)());
let questions = [];
function resetQuiz() {
  questions = shuffle(quizData).map(q => ({...q, choices: shuffle(q.options.map((text, index) => ({text, correct: index === q.correct})))}));
  $('quizContainer').innerHTML = questions.map((q, i) => `<fieldset><legend>${i + 1}. ${q.question}</legend>${q.choices.map((o, j) => `<label class="option"><input type="radio" name="q${i}" value="${j}"><span>${o.text}</span></label>`).join('')}<p class="feedback" id="feedback${i}" hidden></p></fieldset>`).join('');
  $('quizResult').textContent = '';
  $('quizForm').querySelector('[type=submit]').disabled = false;
}
$('quizForm').addEventListener('submit', event => {
  event.preventDefault();
  const selected = questions.map((_, i) => $('quizForm').querySelector(`input[name=q${i}]:checked`));
  if(selected.some(value => !value)) {
    $('quizResult').textContent = 'Responde todas las preguntas antes de calificar. Aún no se han mostrado las soluciones.';
    const missing = selected.findIndex(value => !value);
    $('quizForm').querySelector(`input[name=q${missing}]`).focus(); return;
  }
  let score = 0;
  questions.forEach((q, i) => {
    const right = q.choices.findIndex(o => o.correct);
    const chosen = Number(selected[i].value);
    const inputs = [...$('quizForm').querySelectorAll(`input[name=q${i}]`)];
    inputs[right].closest('label').classList.add('correct');
    if(chosen === right) score++;
    else inputs[chosen].closest('label').classList.add('incorrect');
    inputs.forEach(input => {input.disabled = true;});
    $(`feedback${i}`).hidden = false;
    $(`feedback${i}`).textContent = chosen === right ? 'Respuesta correcta.' : `Respuesta correcta: ${q.choices[right].text}.`;
  });
  $('quizResult').textContent = `${score} de ${questions.length} aciertos. ${score === questions.length ? '¡Conoces muy bien estas historias!' : 'Puedes repasar la historieta y volver a intentarlo.'}`;
  $('quizForm').querySelector('[type=submit]').disabled = true;
});
$('resetQuiz').addEventListener('click', resetQuiz);
// Motor de partículas basado en fuerzas y vectores de The Nature of Code.
// Adaptación original, sin p5.js: Canvas 2D evita dependencias de red.
const canvas = $('artCanvas');
const ctx = canvas.getContext('2d');
let width = 960, height = 430, particles = [], mode = 'orbit', pointer = null;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches, animation = null, lastTime = 0;
const modes = {orbit: 'Órbita', attract: 'Atracción', repel: 'Repulsión'};
class Particle {
  constructor() { this.x = Math.random()*width; this.y = Math.random()*height; this.vx = (Math.random()-.5)*45; this.vy = (Math.random()-.5)*45; this.mass = .8+Math.random()*1.8; }
  step(dt, target) {
    const dx = target.x-this.x, dy = target.y-this.y;
    const dist = Math.max(30, Math.hypot(dx,dy));
    const strength = Math.min(280, 45000/(dist*dist)) * (mode === 'repel' ? -1 : 1);
    let ax = dx/dist*strength/this.mass, ay = dy/dist*strength/this.mass;
    if(mode === 'orbit') { ax += -dy/dist*40; ay += dx/dist*40; }
    // Euler semimplícito: velocidad primero, posición después; amortiguación temporal.
    this.vx = (this.vx+ax*dt)*Math.exp(-.12*dt); this.vy = (this.vy+ay*dt)*Math.exp(-.12*dt);
    const speed = Math.hypot(this.vx,this.vy); if(speed>160){this.vx*=160/speed;this.vy*=160/speed;}
    this.x += this.vx*dt; this.y += this.vy*dt;
    if(this.x<0){this.x=0;this.vx=Math.abs(this.vx);}if(this.x>width){this.x=width;this.vx=-Math.abs(this.vx);}
    if(this.y<0){this.y=0;this.vy=Math.abs(this.vy);}if(this.y>height){this.y=height;this.vy=-Math.abs(this.vy);}
  }
}
function fitCanvas() {
  if(activeView !== 'laboratorio' || !ctx) return;
  const rect = canvas.getBoundingClientRect(); width=rect.width; height=rect.height;
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(width*ratio); canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
  particles=Array.from({length: width<600 ? 70 : 140},()=>new Particle()); draw(0);
}
function draw(dt) {
  if(!ctx) return;
  ctx.fillStyle='#1e2e34';ctx.fillRect(0,0,width,height);
  const target=pointer || {x:width/2,y:height/2};
  particles.forEach(p => {
    p.step(dt,target);ctx.beginPath();ctx.fillStyle=p.mass>1.8?'#d6b778':'#b6cbc8';ctx.arc(p.x,p.y,p.mass*1.3,0,Math.PI*2);ctx.fill();
    // Una arista por partícula hacia el atractor: coste O(n), sin comparaciones por pares.
    if(Math.hypot(target.x-p.x,target.y-p.y)<165){ctx.beginPath();ctx.strokeStyle='#abc5be26';ctx.moveTo(p.x,p.y);ctx.lineTo(target.x,target.y);ctx.stroke();}
  });
  ctx.beginPath();ctx.strokeStyle='#d6b778';ctx.arc(target.x,target.y,8,0,Math.PI*2);ctx.stroke();
}
function tick(time) {
  animation=null;
  if(activeView!=='laboratorio'||paused||document.hidden) return;
  draw(lastTime ? Math.min((time-lastTime)/1000,.035) : 0);lastTime=time;
  animation=requestAnimationFrame(tick);
}
function syncAnimation() {
  if(animation!==null){cancelAnimationFrame(animation);animation=null;} lastTime=0;
  if(activeView==='laboratorio' && ctx){fitCanvas();if(!paused&&!document.hidden)animation=requestAnimationFrame(tick);}
}
function setMode(value) {
  mode=value;$('artStatus').textContent=`Modo: ${modes[mode]}`;
  document.querySelectorAll('[data-mode]').forEach(button=>button.setAttribute('aria-pressed', String(button.dataset.mode===mode)));
  if(paused)draw(0);
}
function chooseRandomMode(){setMode(randomItem(Object.keys(modes).filter(value=>value!==mode)));}
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.mode)));
$('randomMode').addEventListener('click',chooseRandomMode);
function updatePauseButton(){$('pause').textContent=paused?'Reanudar':'Pausar';$('pause').setAttribute('aria-pressed',String(paused));}
$('pause').addEventListener('click',()=>{paused=!paused;updatePauseButton();syncAnimation();});
reducedMotion.addEventListener('change',()=>{paused=reducedMotion.matches;updatePauseButton();syncAnimation();});
canvas.addEventListener('pointermove',event=>{const rect=canvas.getBoundingClientRect();pointer={x:event.clientX-rect.left,y:event.clientY-rect.top};if(paused)draw(0);});
canvas.addEventListener('pointerleave',()=>{pointer=null;});
window.addEventListener('resize',fitCanvas);document.addEventListener('visibilitychange',syncAnimation);
if(!ctx){$('artStatus').textContent='Canvas 2D no está disponible en este navegador.';$('pause').disabled=true;}
updatePauseButton();goToPage(0);resetQuiz();showView('historia');
