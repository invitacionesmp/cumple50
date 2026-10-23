
/* ====== EDITÁ ESTOS DATOS ====== */
const WHATSAPP = "";                 // ej: "5493880000000" (código de país + número, sin + ni espacios)
const ALIAS    = "invitaciones.ivan";
const AUDIO_SRC = "audio/musica.mp3";
const AUDIO_INICIO = 17;             // segundo desde el que arranca la música
const AUDIO_LOOP = true;             // true = al terminar vuelve a empezar desde AUDIO_INICIO
const FOTO = "img/foto.jpg";                     // foto del anfitrión, ej: "img/foto.jpg". Vacío = círculo vacío.
const EVENTO   = "";                 // opcional: "2027-06-26T21:30". Vacío = próximo 26 de junio.
/* =============================== */
const $=id=>document.getElementById(id), RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('alias').textContent=ALIAS;
if(FOTO){const im=$('foto');im.addEventListener('error',()=>im.remove());im.setAttribute('href',FOTO)}
if(RM)document.querySelectorAll('animateTransform').forEach(e=>e.remove());
if(WHATSAPP)$('confirmar').href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent("¡Hola! Confirmo mi asistencia al cumpleaños.");
$('verdatos').onclick=function(){$('datos').style.display='block';this.style.display='none'};
$('alias').onclick=function(){navigator.clipboard&&navigator.clipboard.writeText(ALIAS).then(()=>{this.textContent="¡Copiado!";setTimeout(()=>this.textContent=ALIAS,1200)})};

/* aparición al hacer scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.12});
document.querySelectorAll('.rv').forEach(s=>io.observe(s));

/* cuenta regresiva */
const n0=new Date();let T=EVENTO?new Date(EVENTO):new Date(n0.getFullYear(),5,26,21,30);
if(!EVENTO&&T<n0)T=new Date(n0.getFullYear()+1,5,26,21,30);
function tick(){const s=Math.max(0,(T-new Date())/1000|0),v=[s/86400|0,s/3600%24|0,s/60%60|0,s%60];
  document.querySelectorAll('.cd b').forEach((e,i)=>e.textContent=String(v[i]).padStart(2,'0'))}
tick();setInterval(tick,1000);

/* partículas doradas y confeti */
const cv=$('fx'),c=cv.getContext('2d');let W,H,P=[],B=[];
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}addEventListener('resize',rs);rs();
const mk=()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.8+.4,v:Math.random()*.35+.1,a:Math.random()*6});
for(let i=0;i<(W<600?28:60);i++)P.push(mk());
function burst(x,y){for(let i=0;i<70;i++){const a=Math.random()*6.3,s=Math.random()*7+2;B.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-4,r:Math.random()*3+2,l:100,h:Math.random()<.5?'#f6d77a':'#e0a82e'})}}
(function draw(){c.clearRect(0,0,W,H);
  P.forEach(p=>{p.y-=p.v;p.a+=.02;p.x+=Math.sin(p.a)*.3;if(p.y<-5){p.y=H+5;p.x=Math.random()*W}
    c.globalAlpha=.35+.35*Math.sin(p.a*2);c.fillStyle='#f6d77a';c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill()});
  B=B.filter(b=>b.l>0);B.forEach(b=>{b.x+=b.vx;b.y+=b.vy;b.vy+=.18;b.vx*=.99;b.l--;c.globalAlpha=b.l/100;c.fillStyle=b.h;c.fillRect(b.x,b.y,b.r*1.6,b.r)});
  if(!RM)requestAnimationFrame(draw)})();

/* disco: gira y suena (desde AUDIO_INICIO) solo cuando se lo toca */
const vit=$('vit'),vid=$('vid'),snd=$('snd');let on=false,fade=null;
const audio=new Audio(AUDIO_SRC+'#t='+AUDIO_INICIO);audio.preload='metadata';
audio.addEventListener('loadedmetadata',()=>{if(audio.currentTime<AUDIO_INICIO)audio.currentTime=AUDIO_INICIO});
audio.addEventListener('ended',()=>{if(AUDIO_LOOP&&on){audio.currentTime=AUDIO_INICIO;audio.play().catch(stop)}else stop()});
audio.addEventListener('error',()=>stop());
function stop(){on=false;vit.classList.remove('on');vit.setAttribute('aria-pressed','false');clearInterval(fade);audio.pause();if(audio.readyState>0)audio.currentTime=AUDIO_INICIO}
function mute(m){vid.muted=m;snd.textContent=m?'🔇 Activar sonido':'🔊 Silenciar video'}
vit.onclick=function(){
  const r=vit.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/3);
  if(on){stop();return}
  on=true;vit.classList.add('on');vit.setAttribute('aria-pressed','true');mute(true);
  if(audio.readyState>0)audio.currentTime=AUDIO_INICIO;
  audio.volume=0;audio.play().catch(stop);
  let v=0;clearInterval(fade);fade=setInterval(()=>{v=Math.min(1,v+.1);audio.volume=v;if(v>=1)clearInterval(fade)},60)};
snd.onclick=()=>{if(vid.muted){stop();mute(false);vid.play()}else mute(true)};
