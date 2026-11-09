/* Volt IA landing v3: prédio-núcleo. JS leve, sem dependências */
(()=>{
const d=document, RM=matchMedia('(prefers-reduced-motion: reduce)').matches||d.documentElement.classList.contains('reduce-motion');
/* botão visível "Reduzir movimento": grava preferência e recarrega (o layout do palco muda) */
const mb=d.getElementById('btnMotion');
if(mb){
  const on=d.documentElement.classList.contains('reduce-motion');
  mb.setAttribute('aria-pressed',on?'true':'false'); mb.textContent=on?'Movimento reduzido ✓':'Reduzir movimento';
  mb.addEventListener('click',()=>{ try{localStorage.setItem('volt_reduce_motion',on?'0':'1')}catch(e){} if(on) d.documentElement.classList.remove('reduce-motion'); else d.documentElement.classList.add('reduce-motion'); location.reload(); });
}
const isMobile=()=>innerWidth<=860;
d.documentElement.classList.add('js');
const $=(s,c=d)=>c.querySelector(s), $$=(s,c=d)=>[...c.querySelectorAll(s)];
const svg=$('#bsvg'), cam=$('#cam'), stage=$('#predio'), panel=$('#panel'), tip=$('#tip');
buildVolt(svg);
const R=VOLT_ROOMS, FL=VOLT_FLOORS;

/* estados do painel: andares 04..01 */
const p5=$('.p5',panel);
FL.forEach((f,i)=>{
  const el=d.createElement('div'); el.className='pstate'; el.dataset.state=i+1;
  el.innerHTML=`<span class="floor-tag">ANDAR ${f.n}</span><h2>${f.t}</h2><p class="lead">${f.d}</p>
  <ul class="rooms-list">${[0,1].map(k=>{const r=R[i*2+k];return `<li data-room="${i*2+k}"><b>${String(i*2+k+1).padStart(2,'0')}</b><span><strong>${r.t}</strong>${r.l}</span></li>`}).join('')}</ul>`;
  panel.insertBefore(el,p5);
});
const states=$$('.pstate',panel).sort((a,b)=>a.dataset.state-b.dataset.state);
const prog=$('#progress'); states.forEach(()=>prog.appendChild(d.createElement('i')));
/* fallback estático */
$('#staticFloors').innerHTML=FL.map((f,i)=>`<div class="card"><span class="num">ANDAR ${f.n}</span><h3>${f.t}</h3><p>${R[i*2].t}: ${R[i*2].l}.<br>${R[i*2+1].t}: ${R[i*2+1].l}.</p></div>`).join('');

/* salas: acender, feixe, rótulo */
const rooms=$$('.room',svg), beams=$$('.beam',svg);
function light(idx,on){
  rooms[idx]?.classList.toggle('on',on); beams[idx]?.classList.toggle('on',on);
  $$(`.rooms-list li[data-room="${idx}"]`).forEach(li=>li.classList.toggle('on',on));
  svg.classList.toggle('hot',!!$('.room.on',svg));
}
let pinned=null;
function showTip(idx){ if(idx==null){tip.classList.remove('show');return} tip.innerHTML=`<b>${R[idx].t}</b>${R[idx].l}`; tip.classList.add('show') }
rooms.forEach((r,i)=>{
  r.addEventListener('pointerenter',e=>{ if(e.pointerType==='mouse'){stopAuto(); light(i,true)} });
  r.addEventListener('pointerleave',e=>{ if(e.pointerType==='mouse'){ if(pinned!==i) light(i,false); startAuto()} });
  r.addEventListener('click',()=>{ stopAuto(); if(pinned!=null&&pinned!==i) light(pinned,false); pinned = pinned===i?null:i; light(i,pinned===i); showTip(pinned); if(pinned==null) startAuto(); });
  r.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault(); r.dispatchEvent(new Event('click'))} });
  r.addEventListener('focus',()=>light(i,true)); r.addEventListener('blur',()=>{ if(pinned!==i) light(i,false) });
});
$$('.rooms-list li').forEach(li=>{const i=+li.dataset.room;
  li.addEventListener('pointerenter',()=>{stopAuto();light(i,true)}); li.addEventListener('pointerleave',()=>{light(i,false);startAuto()});
  li.addEventListener('click',()=>{stopAuto(); rooms.forEach((_,k)=>light(k,false)); light(i,true); showTip(i); setTimeout(startAuto,2500)});
});

/* acendimento automático da sala em foco */
let cur=0, autoT=null, autoK=0;
function autoStep(){
  rooms.forEach((_,k)=>{ if(k!==pinned) light(k,false) });
  if(paused) return;
  let list = cur>=1&&cur<=4 ? [(cur-1)*2,(cur-1)*2+1] : R.map((_,k)=>k);
  const k=list[autoK++%list.length]; light(k,true);
  if(cur===5){ beams.forEach(b=>b.classList.add('on')) }
}
function startAuto(){ if(RM||autoT) return; autoT=setInterval(autoStep,1500); autoStep() }
function stopAuto(){ clearInterval(autoT); autoT=null }

/* câmera: keyframes calculados pelo tamanho da tela */
const VBX=-40,VBY=-40,VW=840; // 1 unidade = 1px em escala 1
const FY0=150,FH=250,RY=FY0+2*FH-5;
function keys(){
  const W=innerWidth,H=innerHeight;
  if(isMobile()){
    const pt=panel.getBoundingClientRect().top+scrollY-(stage.getBoundingClientRect().top+scrollY);
    const bot=i=>Math.min(H*0.62, 84+states[i].offsetHeight+18); // fundo do texto de cada estado
    const sFit=Math.min((W-16)/840,(H-bot(0)-10)/1000), sF=(W-14)/700;
    const mid=(i,hh)=>bot(i)+Math.max(hh/2,(H-bot(i))/2);
    return [
      {s:sF*0.92,x:380,y:-30,cx:W/2,cy:bot(0)+8,top:true},
      ...[0,1,2,3].map(i=>({s:sF,x:380,y:FY0+i*FH+115,cx:W/2,cy:mid(i+1,FH*sF)})),
      {s:sF*0.9,x:380,y:RY,cx:W/2,cy:mid(5,300*sF)},
    ];
  }
  const sFit=Math.min(0.86*(H-70)/1340,0.5*W/840), sF=Math.min(1.25,0.56*W/840,0.8*(H-70)/300), cxR=W*0.68;
  return [
    {s:Math.min(0.5*W/840,(H-100)/1060),x:380,y:-30,cx:cxR,cy:100},
    ...[0,1,2,3].map(i=>({s:sF,x:380,y:FY0+i*FH+120,cx:W*0.66,cy:70+(H-70)/2})),
    {s:Math.min(1.5,sF*1.15),x:380,y:RY,cx:W*0.66,cy:70+(H-70)/2},
  ];
}
let K=keys(); addEventListener('resize',()=>{K=keys();frame()},{passive:true});
const ss=t=>t*t*(3-2*t), clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function place(k){ const tx=k.cx-(k.x-VBX)*k.s, ty=k.cy-(k.y-VBY)*k.s; cam.style.transform=`translate3d(${tx.toFixed(1)}px,${ty.toFixed(1)}px,0) scale(${k.s.toFixed(4)})` }
function frame(){
  if(RM) return;
  const r=stage.getBoundingClientRect(), total=stage.offsetHeight-innerHeight;
  const p=clamp(-r.top/total,0,1), u=p*(K.length-1), k=Math.min(Math.floor(u),K.length-2), f=u-k;
  const e=ss(clamp((f-0.2)/0.6,0,1)), A=K[k], B=K[k+1];
  place({s:A.s+(B.s-A.s)*e,x:A.x+(B.x-A.x)*e,y:A.y+(B.y-A.y)*e,cx:A.cx+(B.cx-A.cx)*e,cy:A.cy+(B.cy-A.cy)*e});
  const st=Math.round(u);
  if(st!==cur){ cur=st; states.forEach((s,i)=>s.classList.toggle('cur',i===cur)); $$('i',prog).forEach((x,i)=>x.classList.toggle('cur',i===cur));
    rooms.forEach((rm,i)=>rm.classList.toggle('focus',cur>=1&&cur<=4&&Math.floor(i/2)===cur-1));
    svg.classList.toggle('focusing',cur>=1&&cur<=4); if(cur!==5) beams.forEach((b,i)=>{ if(!rooms[i].classList.contains('on')) b.classList.remove('on') });
    autoK=0; if(autoT){autoStep()} pinned=null; showTip(null);
    $('#hint').style.opacity=cur===0?1:0;
    if(!RM) panel.style.height=states[cur].offsetHeight+'px';
  }
}
$$('i',prog)[0].classList.add('cur'); if(!RM) panel.style.height=states[0].offsetHeight+'px';
let tick=false; addEventListener('scroll',()=>{ if(tick) return; tick=true; requestAnimationFrame(()=>{frame(); tick=false; d.querySelector('.nav').classList.toggle('scrolled',scrollY>10)}) },{passive:true});

/* pausar fora da tela / aba oculta */
let paused=false, inView=true;
function setPause(){ paused=!inView||d.hidden; svg.classList.toggle('paused',paused); paused?stopAuto():startAuto() }
new IntersectionObserver(es=>{inView=es[0].isIntersecting; setPause()},{threshold:0}).observe(stage);
d.addEventListener('visibilitychange',setPause);

/* montagem do prédio */
const go=()=>requestAnimationFrame(()=>svg.classList.add('built'));
if(RM){ svg.classList.add('built'); rooms.forEach(r=>r.classList.remove('focus')) }
else { (d.fonts&&d.fonts.ready?d.fonts.ready:Promise.resolve()).then(()=>setTimeout(go,150)); setTimeout(()=>{startAuto()},2200) }
frame();

/* reveal, contadores, brilho nos cards (seções seguintes) */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.reveal').forEach(e=>RM?e.classList.add('in'):io.observe(e));
const cio=new IntersectionObserver(es=>es.forEach(e=>{ if(!e.isIntersecting) return; cio.unobserve(e.target);
  const b=e.target,end=+b.dataset.count,pre=b.dataset.prefix||''; if(RM||end===0){b.textContent=pre+end;return}
  const t0=performance.now(); const st=t=>{const q=Math.min(1,(t-t0)/1300); b.textContent=pre+String(Math.round(end*(1-Math.pow(1-q,3)))).padStart(2,'0'); if(q<1) requestAnimationFrame(st)}; requestAnimationFrame(st);
}),{threshold:.6});
$$('[data-count]').forEach(b=>RM?(b.textContent=(b.dataset.prefix||'')+(+b.dataset.count>0?String(b.dataset.count).padStart(2,'0'):b.dataset.count)):cio.observe(b));
if(!isMobile()) $$('.card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect(); c.style.setProperty('--mx',(e.clientX-r.left)+'px'); c.style.setProperty('--my',(e.clientY-r.top)+'px')}));
})();
