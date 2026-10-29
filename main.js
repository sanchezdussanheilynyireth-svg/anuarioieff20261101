/* ===== Motor del anuario ===== NO necesitas editar este archivo: todo el contenido está en datos.js */
if(typeof CONFIG==="undefined"||typeof ESTUDIANTES==="undefined"){document.body.innerHTML='<p style="padding:24px;font:18px sans-serif">Falta el archivo <b>datos.js</b>: debe cargarse antes que main.js (revisa index.html).</p>';throw new Error("datos.js no encontrado")}
const CF=Object.assign({colegio:"I.E. Eugenio Ferro Falla",grado:"1101",anio:2026,lema:"Ciencia · Virtud · Progreso",escudo:"escudo1.gif",modoEdicion:true,cintaAutomatica:false,rutaFotoEstudiante:"fotos/estudiantes/{n}.jpg",rutaFotoDocente:"fotos/docentes/{n}.jpg",rutaFirma:"fotos/firmas/{n}.png"},CONFIG);
CF.mostrar=Object.assign({frase:true,recuerdo:true,aspiraciones:true,agradecimientos:true},CONFIG.mostrar);
CF.portada=Object.assign({foto:"",banda:"Grandes momentos, mejores personas ♡",chips:["Amistad","Respeto","Superación","Futuro"]},CONFIG.portada);
const BV=Object.assign({rector:"",director:"",frase:""},typeof BIENVENIDA!=="undefined"?BIENVENIDA:{});
const CI=Object.assign({agradecimiento:"",frase:""},typeof CIERRE!=="undefined"?CIERRE:{});
const ES=ESTUDIANTES,DC=typeof DOCENTES!=="undefined"?DOCENTES:[],MO=typeof MOMENTOS!=="undefined"?MOMENTOS:[];
const MODO_EDICION=CF.modoEdicion!==false,ESC=CF.escudo;
document.title=`Anuario Escolar ${CF.grado} · ${CF.anio} · ${CF.colegio}`;
const T={
 base:{n:"Institucional",acc:"#1f7a3a",soft:"#e3f1e6",em:["⭐","📖"]},
 bts:{n:"K-pop / BTS",acc:"#7b4bc4",soft:"#eadffb",em:["💜","🎤"]},
 anime:{n:"Anime / Manga",acc:"#d6366f",soft:"#fde1ec",em:["🌸","🍙"]},
 futbol:{n:"Deporte",acc:"#1c7d3b",soft:"#d9f2e0",em:["⚽","🏆"]},
 natura:{n:"Naturaleza",acc:"#3b8a55",soft:"#e2f3e3",em:["🌿","🦋"]},
 gamer:{n:"Gamer",acc:"#2b63e0",soft:"#dde8ff",em:["🎮","👾"]},
 arte:{n:"Arte / Dibujo",acc:"#d9701a",soft:"#ffe8d2",em:["🎨","✏️"]},
 rock:{n:"Rock / Urbano",acc:"#b3122c",soft:"#fbdde2",em:["🎸","🎧"]},
 profe:{n:"Docente",acc:"#8a5a00",soft:"#fff0c9",em:["📚","🍎"]},
 momento:{n:"Momento",acc:"#b3122c",soft:"#fde0e4",em:["📸","🎉"]}
};
/* Sueños profesionales: agrega más líneas con el mismo formato */
const PR={medicina:{n:"Medicina",em:["🩺","💊","🧬"]},enfermeria:{n:"Enfermería",em:["💉","🏥","❤️"]},psicologia:{n:"Psicología",em:["🧠","💭","🫶"]},derecho:{n:"Derecho",em:["⚖️","📜","🏛️"]},ingenieria:{n:"Ingeniería",em:["⚙️","📐","🏗️"]},sistemas:{n:"Sistemas / Tecnología",em:["💻","🖥️","🤖"]},arquitectura:{n:"Arquitectura",em:["📐","🏠","✏️"]},admin:{n:"Administración",em:["📊","💼","📈"]},conta:{n:"Contaduría",em:["🧮","💰","📒"]},educacion:{n:"Educación",em:["📚","🍎","✏️"]},arte:{n:"Arte y Diseño",em:["🎨","🖌️","🎭"]},musica:{n:"Música",em:["🎵","🎤","🎸"]},deporte:{n:"Deporte",em:["⚽","🏅","🏃"]},cocina:{n:"Gastronomía",em:["🍳","🍰","👨‍🍳"]},veterinaria:{n:"Veterinaria",em:["🐶","🐾","🩺"]},agro:{n:"Agronomía / Campo",em:["🌱","🚜","🌾"]},comunicacion:{n:"Comunicación",em:["🎬","📷","🎙️"]},fuerza:{n:"Policía / Fuerzas Militares",em:["🛡️","⭐","🎖️"]},aviacion:{n:"Aviación / Viajes",em:["✈️","🌍","🧭"]}};
const AV=["🐱 Gato","🦊 Zorro","🐼 Panda","🐰 Conejo","🦄 Unicornio","🐉 Dragón","🧙 Mago","🦸 Superhéroe","🥷 Ninja","🧚 Hada","🤖 Robot","👽 Alien","🐺 Lobo","🐻 Oso"];
const pad=n=>String(n).padStart(2,"0"),arr=x=>Array.isArray(x)?x.filter(Boolean):String(x||"").split(/\n|;/).map(s=>s.trim()).filter(Boolean);
const nt=s=>String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().split(/[^a-z]+/).filter(Boolean);
const prKey=v=>{if(!v)return"";if(PR[v])return v;const n=nt(v).join(" ");return Object.keys(PR).find(k=>nt(PR[k].n).join(" ")===n)||""};
/* Páginas: 0 portada · 1 bienvenida · índice (1 o más) · estudiantes · docentes · momentos · [dedicatorias si hace falta] · cierre · contraportada
   Todo se calcula según cuántos estudiantes, docentes y momentos haya en datos.js. El libro siempre tiene un número PAR de hojas interiores. */
const IDXCAP=42; /* líneas por página de índice (un título cuenta 2) */
const SECS=[{t:"Estudiantes (orden de lista)",n:ES.length,k:"E"},{t:"Docentes",n:DC.length,k:"D"},{t:"Momentos importantes",n:MO.length,k:"m"}].filter(s=>s.n);
function packIndex(){const pg=[[]];let u=0;SECS.forEach((s,si)=>{let a=0,c=false;while(a<s.n){let room=IDXCAP-u-2;if(room<1){pg.push([]);u=0;room=IDXCAP-2}const take=Math.min(room,s.n-a);pg[pg.length-1].push({si,a,b:a+take,c});u+=2+take;a+=take;c=true}});return pg}
const IDXP=packIndex(),NI=IDXP.length;
const P=[{k:"cover"},{k:"wel"}];
for(let j=0;j<NI;j++)P.push({k:"idx",x:j,n:"Índice"});
ES.forEach((d,j)=>P.push({k:"p",t:"base",role:"E",no:j+1,d:d||{},n:"Estudiante "+pad(j+1)}));
DC.forEach((d,j)=>P.push({k:"p",t:"profe",role:"D",no:ES.length+j+1,d:d||{},n:"Docente "+(j+1)}));
MO.forEach((d,j)=>P.push({k:"m",t:"momento",d:d||{},n:"Momento "+(j+1)}));
if(P.length%2)P.push({k:"fill",n:"Dedicatorias"});
P.push({k:"end"},{k:"back"});
const LAST=P.length-1,EN=LAST-1;
const $=s=>document.querySelector(s),st=$("#stage"),sel=$("#th"),K="a4";
let wn=0;const sv=(k,v)=>{try{localStorage.setItem(K+k,v);return true}catch(e){if(!wn){wn=1;alert("⚠️ La memoria del navegador está llena y no se pudo guardar este cambio.")}return false}},ld=k=>{try{return localStorage.getItem(K+k)}catch(e){return null}},rm=k=>{try{localStorage.removeItem(K+k)}catch(e){}};
/* Si cambias los datos de una página en datos.js, lo que se había escrito a mano en el navegador para esa página se descarta (gana datos.js) */
const hsh=s=>{let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return h.toString(36)};
const hashFor=i=>{const p=P[i];return hsh(JSON.stringify([i,p.k,p.d||0,CF.mostrar,["cover","wel","end","back","fill"].includes(p.k)?[CF.colegio,CF.grado,CF.anio,CF.lema,CF.portada,BV,CI]:0]))};
const savedOf=i=>{if(ld("dh"+i)!==hashFor(i)){rm("pg"+i);rm("nm"+i);rm("dh"+i)}return ld("pg"+i)||""};
const nameOf=i=>ld("nm"+i)||(P[i].d&&P[i].d.nombre)||P[i].n;
const styleOf=i=>{const p=P[i],d=p.d||{};return{tk:ld("th"+i)||d.tema||p.t||"base",pk:ld("pf"+i)||d.profesion||(CF.cintaAutomatica?autoPr(i):""),ak:ld("av"+i)||d.personaje||"",ck:ld("ac"+i)||d.color||""}};
/* ===== Imágenes: las de datos.js se cargan por ruta; las que se suben desde la página se comprimen y guardan en IndexedDB ===== */
const IM={};let db=null;
const idb=()=>new Promise(r=>{try{const q=indexedDB.open("anuario_"+K,1);q.onupgradeneeded=()=>q.result.createObjectStore("i");q.onsuccess=()=>{db=q.result;r()};q.onerror=q.onblocked=()=>r()}catch(e){r()}});
const idbAll=()=>new Promise(r=>{if(!db)return r();try{const rq=db.transaction("i").objectStore("i").openCursor();rq.onsuccess=()=>{const c=rq.result;if(c){IM[c.key]=c.value;c.continue()}else r()};rq.onerror=()=>r()}catch(e){r()}});
const gi=k=>IM[k]||ld("im"+k);
function putImg(k,v){IM[k]=v;let ok=false;if(db){try{const tx=db.transaction("i","readwrite");tx.objectStore("i").put(v,k);tx.onerror=tx.onabort=()=>sv("im"+k,v);ok=true}catch(e){}}if(!ok)sv("im"+k,v)}
function shrink(file,max,q,png){return new Promise((ok,no)=>{const u=URL.createObjectURL(file),im=new Image();im.onload=()=>{const s=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement("canvas");c.width=Math.round(im.width*s);c.height=Math.round(im.height*s);const x=c.getContext("2d");if(!png){x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height)}x.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);ok(png?c.toDataURL("image/png"):c.toDataURL("image/jpeg",q||.85))};im.onerror=()=>{URL.revokeObjectURL(u);no()};im.src=u})}
function pick(cb){const f=document.createElement("input");f.type="file";f.accept="image/*";f.style.display="none";document.body.appendChild(f);f.onchange=()=>{const a=f.files[0];f.remove();if(a)cb(a)};f.addEventListener("cancel",()=>f.remove());f.click()}
const snap=g=>{const c=g.querySelector(".card").cloneNode(true);c.querySelectorAll("img[data-logo]").forEach(i=>{i.setAttribute("src",ESC);i.removeAttribute("class")});c.querySelectorAll("[data-ph]").forEach(e=>{e.style.backgroundImage="";e.style.backgroundPosition="";e.removeAttribute("data-fijo");if(!e.getAttribute("style"))e.removeAttribute("style")});c.querySelectorAll("canvas.sig").forEach(e=>e.removeAttribute("style"));return c.innerHTML};
/* Carga con memoria: una imagen ya cargada se pinta al instante (así las hojas que se pasan no salen vacías) */
const OK=new Set();let PEND=0;
function loadImg(u,ok,bad){if(OK.has(u)){ok();return}PEND++;const im=new Image();im.onload=()=>{OK.add(u);PEND--;ok()};im.onerror=()=>{PEND--;bad&&bad()};im.src=u}
const patt=(s,n)=>s?s.replace("{n}",pad(n)):"";
const fotoDe=p=>{const d=p.d||{};if(d.foto!=null)return d.foto;return p.role==="D"?patt(CF.rutaFotoDocente,p.no-ES.length):patt(CF.rutaFotoEstudiante,p.no)};
const firmaDe=p=>{const d=p.d||{};if(d.firma!=null)return d.firma;return patt(CF.rutaFirma,p.no)};
/* imagen que define datos.js para el espacio k de la página i */
const codeImg=(i,k)=>{const p=P[i];if(p.k==="cover")return k===0?(CF.portada.foto||""):"";if(p.k==="p")return k===0?fotoDe(p):"";if(p.k==="m")return(p.d.fotos&&p.d.fotos[k])||"";return""};
function paint(e,list,pos){const t=list.shift();if(!t)return;
 const go=()=>{e.style.backgroundImage=`url("${t.u}")`;if(pos)e.style.backgroundPosition=pos;e.classList.add("has");t.f?e.setAttribute("data-fijo",""):e.removeAttribute("data-fijo")};
 if(/^data:/.test(t.u))go();else loadImg(t.u,go,()=>{if(t.f)console.warn("[anuario] No se pudo cargar la imagen: "+t.u);paint(e,list,pos)})}
/* prioridad: imagen de datos.js → imagen subida desde la página (solo si no hay una de datos.js que cargue) */
function applyImgs(){st.querySelectorAll(".pg").forEach(g=>{const i=+g.dataset.i,p=P[i];g.querySelectorAll("[data-ph]").forEach((e,k)=>{e.removeAttribute("data-fijo");const cu=codeImg(i,k),lu=gi("ph"+i+"_"+k),L=[];if(cu)L.push({u:cu,f:1});if(lu)L.push({u:lu,f:0});paint(e,L,p.k==="p"&&k===0?(p.d.fotoPos||""):"")})})}
/* firma: la de datos.js va de fondo (no se pierde al borrar trazos); lo dibujado o subido a mano va encima */
function drawSigs(root){root.querySelectorAll("canvas.sig").forEach(c=>{const i=+c.closest(".pg").dataset.i,p=P[i],u=p&&p.k==="p"?firmaDe(p):"";c.style.removeProperty("--firma");
 if(u)loadImg(u,()=>c.style.setProperty("--firma",`url("${u}")`));
 const d=ld("sg"+i);if(d){const im=new Image();im.onload=()=>c.getContext("2d").drawImage(im,0,0,c.width,c.height);im.src=d}})}
function preload(){const s=new Set();P.forEach((p,i)=>{for(let k=0;k<10;k++){const u=codeImg(i,k);if(u&&!/^data:/.test(u))s.add(u)}if(p.k==="p"){const f=firmaDe(p);if(f)s.add(f)}});s.forEach(u=>loadImg(u,()=>{}))}
function delImg(k){delete IM[k];if(db){try{db.transaction("i","readwrite").objectStore("i").delete(k)}catch(e){}}rm("im"+k)}
/* Sin logo: cualquier escudo que no cargue se oculta (y reaparece si subes uno) */
document.addEventListener("error",e=>{const t=e.target;if(t&&t.matches&&t.matches("img[data-logo]"))t.classList.add("nologo")},true);
document.addEventListener("load",e=>{const t=e.target;if(t&&t.matches&&t.matches("img[data-logo]"))t.classList.remove("nologo")},true);
function applyLogo(){const L=gi("logo")||ESC;st.querySelectorAll("img[data-logo]").forEach(i=>{i.onerror=()=>i.classList.add("nologo");i.onload=()=>i.classList.remove("nologo");if(i.getAttribute("src")!==L)i.setAttribute("src",L);else if(i.complete&&!i.naturalWidth)i.classList.add("nologo")})}
function upLogo(){pick(a=>shrink(a,500,.9,true).then(d=>{putImg("logo",d);applyLogo();lgb()}).catch(()=>alert("No se pudo leer esa imagen. Prueba con un PNG o JPG.")))}
const esc=t=>String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>");
const fz=(t,a)=>{const n=(t||"").length;return n>a[2]?' style="font-size:.64rem"':n>a[1]?' style="font-size:.74rem"':n>a[0]?' style="font-size:.84rem"':""};
const PRK=[[/psicolog/,"psicologia"],[/enfermer/,"enfermeria"],[/m[eé]dic|doctor|odont[oó]log/,"medicina"],[/derecho|abogad/,"derecho"],[/ingenier/,"ingenieria"],[/arquitect/,"arquitectura"],[/programad|sistemas/,"sistemas"],[/marketing|empres|administr/,"admin"],[/infante|polic[ií]a|militar/,"fuerza"],[/\bchef\b|gastronom|cocin/,"cocina"],[/multimedia|comunicaci/,"comunicacion"],[/pedagog|licenciad|educaci[oó]n|profesora|docente/,"educacion"],[/dise[ñn]o|dibuj/,"arte"],[/m[uú]sic|compon/,"musica"]];
const autoPr=i=>{const d=P[i].d;if(!d)return"";const t=arr(d.aspiraciones).join(" ; ").toLowerCase();let b=1e9,k="";PRK.forEach(([re,v])=>{const x=t.search(re);if(x>=0&&x<b){b=x;k=v}});return k};
let cur=0,act=0,editing=false;
sel.innerHTML=Object.entries(T).map(([k,v])=>`<option value="${k}">${v.n}</option>`).join("");
$("#pr").innerHTML='<option value="">🎓 Sueño profesional…</option>'+Object.entries(PR).map(([k,v])=>`<option value="${k}">${v.em[0]} ${v.n}</option>`).join("");
$("#av").innerHTML='<option value="">🐾 Sticker de personaje…</option>'+AV.map(a=>`<option value="${a.split(" ")[0]}">${a}</option>`).join("");
const patOf=e=>{const s=`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><text x='8' y='44' font-size='30'>${e[0]}</text><text x='66' y='104' font-size='26'>${e[1]||e[0]}</text></svg>`;return `<div class="pat" style="background:url(&quot;data:image/svg+xml,${encodeURIComponent(s)}&quot;)"></div>`};
const slot=(c,t)=>`<div class="ph ${c||""}" data-ph>${t||"📷 Toca para subir foto"}</div>`;
const li=a=>a.map(x=>`<li data-e>${x}</li>`).join("");
const sig=`<canvas class="sig" width="960" height="200"></canvas><div class="row"><button data-st>Aa Estilizar mi nombre</button><button data-si>🖼️ Subir imagen</button><button data-sc>Borrar</button></div><small>Dibuja tu firma con el dedo o el mouse, o sube una imagen.</small>`;

function body(i){
 const p=P[i];
 if(p.k==="cover")return `<div class="cv"><i class="cv-rays"></i>
  <div class="cv-top"><span data-e>${esc(CF.colegio)}</span><span data-e>Promoción ${esc(CF.anio)}</span></div>
  <h1 class="cv-ttl">ANUARIO<small data-e>ESCOLAR · GRADO ${esc(CF.grado)}</small></h1>
  <div class="cv-ph"><div class="ph" data-ph>🏫 Foto del colegio</div></div>
  <div class="cv-band" data-e>${esc(CF.portada.banda)}</div>
  <ul class="cv-chips">${arr(CF.portada.chips).map(c=>`<li data-e>${esc(c)}</li>`).join("")}</ul>
  <div class="cv-lema" data-e>${esc(CF.lema)}</div>
  <button id="go">📖 Abrir el libro</button>
  <span class="stk" style="top:112px;left:16px">⭐</span><span class="stk" style="top:250px;right:14px">📖</span><span class="stk" style="bottom:96px;left:20px">🎓</span>
  <i class="cv-flag"></i></div>`;
 if(p.k==="back")return `<div class="mk" style="font-size:2.4rem;margin:14px 0">${esc(CF.lema)}</div><div data-e>Grado ${esc(CF.grado)} · Promoción ${esc(CF.anio)}</div><button id="re" style="margin-top:22px;font-size:1.05rem">↺ Abrir de nuevo</button>`;
 if(p.k==="wel")return `<div class="hdr"><img data-logo src="${ESC}" alt=""><h1 class="mk" data-e>Bienvenidos</h1></div>
  <div class="note ye"><h3>Mensaje de la institución</h3><p data-e>${esc(BV.rector||"Escribe aquí el saludo del rector o rectora a los estudiantes del grado once.")}</p></div>
  <div class="note"><h3>Palabras del director de grupo</h3><p data-e>${esc(BV.director||"Escribe aquí unas palabras para el curso: lo vivido, lo aprendido y lo que viene.")}</p></div>
  <div class="note gr"><h3>Nuestro curso en una frase</h3><p class="fr" data-e>${BV.frase?"“"+esc(BV.frase)+"”":"“Escribe aquí lo que define al "+esc(CF.grado)+".”"}</p></div>`;
 if(p.k==="idx"){
  const s0=s=>P.findIndex(q=>s.k==="m"?q.k==="m":q.role===s.k);
  const groups=(IDXP[p.x]||[]).map(g=>{const s=SECS[g.si],b0=s0(s),a=b0+g.a;
   return `<h3 style="margin-top:12px">${s.t}${g.c?" (continuación)":""}</h3><ul class="toc">${P.slice(a,b0+g.b).map((q,j)=>`<li><button data-i="${a+j}"><span>${q.no?pad(q.no)+" · ":""}${esc(nameOf(a+j))}</span><b>${a+j}</b></button></li>`).join("")}</ul>`}).join("");
  return `<div class="hdr"><img data-logo src="${ESC}" alt=""><h1 class="mk">Índice</h1></div>${groups}${p.x===NI-1?`<button data-i="${LAST-1}" style="margin-top:8px">Cierre y firmas del curso</button>`:""}`;
 }
 if(p.k==="end")return `<div class="hdr endh"><img data-logo src="${ESC}" alt=""><h1 class="mk" data-e>Gracias</h1></div>
  <div class="note gr"><h3>Agradecimientos del curso</h3><p data-e>${esc(CI.agradecimiento||"Gracias a nuestros profesores, familias y compañeros por acompañarnos en este camino.")}</p></div>
  <div class="note"><h3>Firmas del curso</h3>${sig}</div><div class="tag" data-e>${esc(CI.frase||"Más que compañeros, una familia ♡")}</div>
  <div class="endf"><span data-e>Grado ${esc(CF.grado)} · Promoción ${esc(CF.anio)}</span><b data-e>${esc(CF.lema)}</b></div>`;
 if(p.k==="fill")return `<div class="hdr"><img data-logo src="${ESC}" alt=""><h1 class="mk" data-e>Dedicatorias</h1></div>
  <div class="note ye"><h3>Un mensaje para el curso</h3><p data-e>Escribe aquí una dedicatoria, un recuerdo o un deseo para tus compañeros.</p></div>
  <div class="note"><h3>Firmas</h3>${sig}</div>`;
 if(p.k==="m"){const d=p.d,n=Array.isArray(d.fotos)?Math.min(d.fotos.length,8):4;
  return `<div class="hdr"><img data-logo src="${ESC}" alt=""><div><h1 class="mk" data-e>${esc(nameOf(i))}</h1><div class="tag" data-e style="text-align:left">${esc(d.titulo||"Título del recuerdo")}</div></div></div>
  ${n?`<div class="mom">${Array.from({length:n},()=>slot("")).join("")}</div>`:""}
  <div class="note ye"><h3>Lo que recordamos</h3><p data-e>${esc(d.texto||"Cuenta qué pasó y por qué fue especial.")}</p></div>
  <div class="note"><h3>Quiénes estuvimos</h3><p data-e>${esc(d.quienes||"Escribe los nombres o la fecha de este momento.")}</p></div>`}
 /* estudiante o docente */
 const D=p.role==="D",d=p.d||{},MS=CF.mostrar,
  L=D?["Así soy como docente","Lo que deseo para ustedes","Mi frase para mis estudiantes","Mi recuerdo favorito en el colegio"]:["Así soy yo","Mis aspiraciones","Mi frase favorita","Mi recuerdo favorito"],
  sd={f:MS.frase===false?"":String(d.frase||""),r:MS.recuerdo===false?"":String(d.recuerdo||""),a:MS.aspiraciones===false?[]:arr(d.aspiraciones),g:MS.agradecimientos===false?"":String(d.agradecimientos||"")},
  A=sd.a.length?sd.a:["Escribe aquí tus aspiraciones…"],stk=sd.r.length>420||sd.g.length>420,W=stk?[420,800,1250]:[170,280,400],
  RB=`<div class="note"><h3>${L[3]}</h3><p data-e data-fit${sd.r?fz(sd.r,W):""}>${sd.r?esc(sd.r):"Cuenta tu recuerdo favorito del colegio…"}</p></div>`,
  GB=`<div class="note ye"><h3>Agradecimientos</h3><p data-e data-fit${sd.g?fz(sd.g,W):""}>${sd.g?esc(sd.g):"Gracias a mi familia, a mis profesores y a mis amigos por…"}</p></div>`,RG=stk?RB+GB:`<div class="g2">${RB}${GB}</div>`;
 return `<div class="hdr"><img data-logo src="${ESC}" alt=""><h1 class="mk">MI ESENCIA</h1></div>
  <div class="g2 eg"><div>${slot("carn","📷 Foto tipo carné<br><small>3×4 · fondo claro</small>")}</div>
   <div><div class="note"><h3>${L[1]}</h3><ul class="ck" data-fit${fz(A.join(" "),[260,420,650])}>${li(A.map(esc))}</ul></div></div></div>
  <div class="note rs"><h3>Mi nombre completo</h3><p class="nm" data-e>${esc(nameOf(i))}</p></div>
  <div class="note gr"><h3>${L[2]}</h3><p class="fr" data-e>${sd.f?"“"+esc(sd.f)+"”":"“Escribe aquí tu frase favorita.”"}</p></div>
  ${RG}
  <div class="note"><h3>Mi firma</h3>${sig}</div>
  <div class="tag" data-e>Las grandes cosas también nacen de pequeños sueños…</div>`;
}
function pageHTML(i){
 const p=P[i],{tk,pk,ak,ck}=styleOf(i),th=T[tk]||T.base,pr=PR[prKey(pk)],em=pr?pr.em:th.em;
 const acc=ck||th.acc,soft=ck?`color-mix(in srgb,${ck} 16%,white)`:th.soft,fx=p.k!=="cover"&&p.k!=="back",saved=savedOf(i);
 return `<div class="pg ${p.k==="cover"?"cvp":p.k==="back"?"bkp":""} ${editing&&i===act?"act":""}" data-i="${i}" style="--acc:${acc};--soft:${soft}">
 <i class="gut"></i>${pr&&fx?patOf(pr.em):""}${fx?`<div class="rh"><span>Anuario ${esc(CF.grado)} · ${esc(CF.anio)}</span><span>${esc(CF.colegio)}</span></div>${pr?`<div class="rib">${pr.em[0]} Futuro/a en ${pr.n}</div>`:""}`:""}
 <div class="card">${saved||body(i)}</div>
 ${fx?`<div class="ft"><span>${esc(CF.lema)}</span><span>${i}</span></div><span class="stk" style="top:62px;right:12px">${em[0]}</span><span class="stk" style="bottom:50px;left:10px">${em[1]}</span><span class="stk" style="top:48%;right:6px">${em[2]||em[0]}</span>${ak?`<span class="av">${esc(ak)}</span>`:""}`:""}</div>`;
}
const wide=()=>innerWidth>=960;
function pages(i){return wide()&&i>=1&&i<=EN?[i%2?i:i-1,i%2?i+1:i]:[i]}
const cpc=(a,b)=>{const y=b.querySelectorAll("canvas");a.querySelectorAll("canvas").forEach((o,k)=>{try{y[k]&&y[k].getContext("2d").drawImage(o,0,0)}catch(e){}})};
const mk=(cls,r,sr)=>{const w=document.createElement("div");w.className=cls;w.setAttribute("aria-hidden","true");w.style.cssText=`left:${r.left-sr.left}px;top:${r.top-sr.top}px;width:${r.width}px;height:${r.height}px`;return w};
const cln=el=>{const c=el.cloneNode(true);c.classList.remove("act");cpc(el,c);return c};
const face=(cls,src)=>{const f=document.createElement("div");f.className="face "+cls;if(src)f.appendChild(cln(src));else f.innerHTML='<div class="pg blank"></div>';return f};
/* Pasar hoja en dos tiempos (sin cara trasera, así nunca se ve al revés):
   1) la hoja gira de 0° a 90° sobre el lomo hasta quedar de canto
   2) la otra página sale del lomo de 90° a 0°, siempre derecha */
const rot=d=>`perspective(2800px) rotateY(${d}deg)`,TI="cubic-bezier(.5,0,.9,.55)",TO="cubic-bezier(.1,.45,.5,1)",TT=430;
function pl(el,r,org,sr,nodes){const w=mk("leaf",r,sr);w.style.transformOrigin=org;w.append(face("front",el));const s=document.createElement("i");s.className="sh";w.append(s);nodes.push(w);return w}
function sw(w,a,b,sa,sb,ease,ms){w.animate([{transform:rot(a)},{transform:rot(b)}],{duration:ms,easing:ease,fill:"both"});w.lastChild.animate([{opacity:sa},{opacity:sb}],{duration:ms,easing:ease,fill:"both"})}
function later(w,ms,f){w.style.visibility="hidden";setTimeout(()=>{w.style.visibility="";f()},ms)}
function leaf(op,fw,both){
 const sr=st.getBoundingClientRect(),sp=st.querySelector(":scope>.sp"),np=sp?[...sp.children]:[],P2=op.pgs,nodes=[];
 const done=ms=>setTimeout(()=>nodes.forEach(n=>n.remove()),ms);
 const deco=o=>{const D=mk("decoy",o.r,sr);D.appendChild(cln(o.el));nodes.push(D)};
 if(both&&np.length>1){
  const o=P2[fw?0:1],F=P2[fw?1:0],N=np[fw?0:1],a=pl(F.el,F.r,fw?"0 50%":"100% 50%",sr,nodes);
  deco(o);
  const b=pl(N,N.getBoundingClientRect(),fw?"100% 50%":"0 50%",sr,nodes);
  st.append(...nodes);
  sw(a,0,fw?-90:90,0,.55,TI,TT);
  later(b,TT,()=>sw(b,fw?90:-90,0,.55,0,TO,TT));
  setTimeout(()=>{const t=b.querySelector(".pg");if(t)cpc(N,t)},TT-30);
  done(TT*2+60);
 }else if(fw){
  const F=P2[P2.length>1?1:0],a=pl(F.el,F.r,"0 50%",sr,nodes);st.append(a);sw(a,0,-90,0,.6,TI,620);done(700);
 }else if(P2.length>1){
  const F=P2[0],a=pl(F.el,F.r,"100% 50%",sr,nodes);st.append(a);sw(a,0,90,0,.6,TI,620);done(700);
 }else{
  const N=np[np.length-1];deco(P2[0]);
  const b=pl(N,N.getBoundingClientRect(),"0 50%",sr,nodes);st.append(...nodes);sw(b,-90,0,.6,0,TO,620);done(700);
 }
}
/* Abrir el libro: la tapa gira sobre el lomo y el libro se despliega desde el centro */
function openAnim(op){
 const sp=st.querySelector(":scope>.sp"),pg=sp?[...sp.children]:[];
 if(pg.length<2){leaf(op,true,false);return}
 const sr=st.getBoundingClientRect(),R=pg[1].getBoundingClientRect(),Lr=pg[0].getBoundingClientRect(),dx=op.pgs[0].r.left-R.left,nodes=[],T2=TT*2,
  a=pl(op.pgs[0].el,R,"0 50%",sr,nodes),b=pl(pg[0],Lr,"100% 50%",sr,nodes);
 st.append(...nodes);
 pg[0].classList.add("lhid");sp.classList.add("opening");
 st.style.transition="none";st.style.transform=`translateX(${dx}px)`;void st.offsetWidth;
 st.style.transition=`transform ${T2}ms cubic-bezier(.4,.05,.3,1)`;st.style.transform="translateX(0)";
 sw(a,0,-90,0,.55,TI,TT);later(b,TT,()=>sw(b,90,0,.55,0,TO,TT));
 setTimeout(()=>{nodes.forEach(n=>n.remove());st.style.transition=st.style.transform="";sp.classList.remove("opening");pg[0].classList.remove("lhid")},T2+60);
}
/* Cerrar el libro: la última hoja se voltea sobre el lomo, el libro se cierra y se centra */
function closeAnim(op){
 const sp=st.querySelector(":scope>.sp");
 if(!sp||op.pgs.length<2){if(sp)sp.classList.add("shut");leaf(op,true,false);return}
 const sr=st.getBoundingClientRect(),A=op.pgs[0],B=op.pgs[1],Nn=sp.firstElementChild,N=Nn.getBoundingClientRect(),dx=N.left-A.r.left,nodes=[],
  D=mk("decoy",op.spr,sr),c=op.sp.cloneNode(true),rp=c.lastElementChild;
 cpc(op.sp,c);rp.className="pg blank";rp.innerHTML="";rp.removeAttribute("style");
 c.className="sp two closing";c.style.cssText="position:absolute;inset:0;margin:0;max-width:none;width:auto";
 D.appendChild(c);
 const a=pl(B.el,B.r,"0 50%",sr,nodes),b=pl(Nn,A.r,"100% 50%",sr,nodes);
 sp.style.visibility="hidden";
 st.append(D,...nodes);
 document.documentElement.style.overflowX="hidden";
 sw(a,0,-90,0,.55,TI,TT);later(b,TT,()=>sw(b,90,0,.55,0,TO,TT));
 setTimeout(()=>{st.style.transition="transform .45s ease-in-out";st.style.transform=`translateX(${dx}px)`},TT*2+30);
 setTimeout(()=>{D.remove();nodes.forEach(n=>n.remove());st.style.transition=st.style.transform="";document.documentElement.style.overflowX="";sp.style.visibility="";sp.classList.add("shut")},TT*2+530);
}
/* Tamaño único de página: el libro mide lo mismo cerrado y abierto */
function fit(){
 const W=st.clientWidth-16,pw=wide()?Math.min(600,Math.floor((W-36)/2)):Math.min(600,Math.max(240,W-32)),rs=document.documentElement.style;
 rs.setProperty("--pw",pw+"px");
 const m=document.createElement("div");m.style.cssText=`position:absolute;left:-99999px;top:0;width:${pw}px;visibility:hidden;pointer-events:none`;
 m.innerHTML=P.map((p,i)=>pageHTML(i)).join("").replace(/url\((?:&quot;|"|')?data:[^)]*\)/g,"none");
 document.body.appendChild(m);
 let h=Math.round(pw*1.38);
 const hs=[];[...m.children].forEach((g,i)=>{g.style.minHeight="0";g.style.height="auto";if(P[i].role==="E"&&!ld("pg"+i))hs.push(g.offsetHeight);else h=Math.max(h,g.offsetHeight)});
 if(hs.length){hs.sort((a,b)=>a-b);h=Math.max(h,hs[Math.floor(hs.length*.8)])}
 m.remove();{const L=Math.round(pw*11/8.5);h=pw>=520?L:Math.max(h,L)}rs.setProperty("--ph",h+"px");
}
let ac=null,au=null;
/* solo el sonido de pasar página (sintetizado); sin música ni mp3 */
let mute=ld("snd")==="0";
function syn(){try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();
 const t=ac.currentTime,sr=ac.sampleRate,n=Math.floor(sr*.5),buf=ac.createBuffer(1,n,sr),d=buf.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;
 const s=ac.createBufferSource();s.buffer=buf;const f=ac.createBiquadFilter();f.type="bandpass";f.Q.value=.7;f.frequency.setValueAtTime(900,t);f.frequency.exponentialRampToValueAtTime(5200,t+.26);f.frequency.exponentialRampToValueAtTime(2200,t+.48);
 const g=ac.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.3,t+.06);g.gain.linearRampToValueAtTime(.14,t+.24);g.gain.exponentialRampToValueAtTime(.001,t+.49);
 s.connect(f);f.connect(g);g.connect(ac.destination);s.start(t)}catch(e){}}
function snd(){if(mute)return;if(au){au.currentTime=0;const p=au.play();if(p&&p.catch)p.catch(()=>{au=null;syn()})}else syn()}
function show(i){
 const old=st.querySelector(":scope>.sp"),oc=cur,op=old&&{sp:old,spr:old.getBoundingClientRect(),pgs:[...old.children].map(el=>({el,r:el.getBoundingClientRect()}))};
 st.style.transition=st.style.transform="";document.documentElement.style.overflowX="";
 i=Math.max(0,Math.min(P.length-1,i));const l=pages(i);cur=l[0];
 if(!l.includes(act))act=l[0];
 $("#pn").textContent=l.length>1?`${l[0]}–${l[1]} / ${EN}`:(cur===0?"Portada":cur===LAST?"Final":cur+" / "+EN);
 $("#prev").disabled=cur<=0;$("#next").disabled=l[l.length-1]>=LAST;{const a=$("#nvp"),b=$("#nvn");if(a){a.disabled=cur<=0;b.disabled=l[l.length-1]>=LAST}}
 st.innerHTML=`<div class="sp ${l.length>1?"two":""}">${l.map(pageHTML).join("")}</div>`;
 applyImgs();applyLogo();drawSigs(st);st.classList.toggle("edit",editing);fitLong();
 if(op&&cur!==oc){if(!matchMedia("(prefers-reduced-motion:reduce)").matches){if(oc===0&&cur===1)openAnim(op);else if(cur===LAST&&oc>=LAST-2&&oc<LAST)closeAnim(op);else leaf(op,cur>oc,op.pgs.length>1&&l.length>1)}snd()}
 st.querySelectorAll("[data-ph]").forEach(e=>e.classList.toggle("has",!!e.style.backgroundImage));
 st.querySelectorAll("[data-e]").forEach(e=>e.contentEditable=editing);
 sync();window.scrollTo(0,0);
 if(location.hash!=="#p"+cur)history.replaceState(null,"","#p"+cur);
}
/* Si el contenido de una página no cabe en la altura del libro: primero se reduce la letra del texto más largo (hasta 9px) y, si aún no cabe, se escala toda la hoja un poco (nunca se corta texto) */
function fitLong(){const H=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--ph"))||0;if(!H)return;
 st.querySelectorAll(".pg").forEach(g=>{
  const cd=g.querySelector(".card"),nat=()=>{g.style.minHeight="0";g.style.height="auto";g.style.alignSelf="start";const x=g.offsetHeight;g.style.minHeight=g.style.height=g.style.alignSelf="";return x};
  if(cd){cd.style.zoom="";g.querySelectorAll("canvas.sig").forEach(c=>c.style.zoom="")}
  if(nat()<=H)return;
  const c=[...g.querySelectorAll("[data-fit]")].sort((a,b)=>b.textContent.length-a.textContent.length);
  for(let n=0;n<80&&nat()>H;n++){const e=c[0];if(!e)break;const fs=parseFloat(getComputedStyle(e).fontSize);if(!e.dataset.f0)e.dataset.f0=fs;const fl=e.textContent.length>300?9.2:e.dataset.f0*.8;if(fs<=fl)break;e.style.fontSize=(fs-.5)+"px"}
  if(cd&&nat()>H){const sg=[...g.querySelectorAll("canvas.sig")],Z=z=>{cd.style.zoom=z;sg.forEach(c=>c.style.zoom=1/z)};let lo=.5,hi=1;for(let k=0;k<7;k++){const mid=(lo+hi)/2;Z(mid);if(nat()>H)hi=mid;else lo=mid}Z(lo)}
 })}
function sync(){
 const p=P[act],ok=editing&&(p.k==="p"||p.k==="m"),s=styleOf(act),th=T[s.tk]||T.base;
 sel.value=T[s.tk]?s.tk:"base";$("#pr").value=prKey(s.pk);$("#av").value=s.ak;$("#co").value=/^#[0-9a-f]{6}$/i.test(s.ck)?s.ck:th.acc;
 sel.classList.toggle("hide",!ok);$("#pfx").classList.toggle("hide",!ok);
 st.querySelectorAll(".pg").forEach(g=>g.classList.toggle("act",editing&&+g.dataset.i===act));
}
const next=()=>{const l=pages(cur);show(l[l.length-1]+1)},prev=()=>show(cur<=1?0:cur-(wide()?2:1)),rsz=()=>show(cur);
function route(){const m=/^#p(\d+)$/.exec(location.hash);show(m?+m[1]:0)}
document.addEventListener("click",e=>{
  const pg=e.target.closest(".pg");if(editing&&pg){act=+pg.dataset.i;sync()}
  if(editing&&e.target.closest("img[data-logo]")){upLogo();return}
  const b=e.target.closest("button,.ph");if(!b)return;
  if(b.dataset.i!==undefined)show(+b.dataset.i);
  else if(b.id==="go")show(1);
  else if(b.id==="re")show(0);
 else if(b.dataset.si!==undefined){const c=b.closest(".note").querySelector("canvas"),i=b.closest(".pg").dataset.i,f=document.createElement("input");f.type="file";f.accept="image/*";f.onchange=()=>{if(!f.files[0])return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const q=c.getBoundingClientRect(),cw=q.width||c.width,ch=q.height||c.height,s=Math.min(cw/im.width,ch/im.height),x=c.getContext("2d"),kx=c.width/cw,ky=c.height/ch,w=im.width*s*kx,h=im.height*s*ky;x.clearRect(0,0,c.width,c.height);x.drawImage(im,(c.width-w)/2,(c.height-h)/2,w,h);sv("sg"+i,c.toDataURL())};im.src=r.result};r.readAsDataURL(f.files[0])};f.click()}
 else if(b.dataset.sc!==undefined){const c=b.closest(".note").querySelector("canvas"),i=b.closest(".pg").dataset.i;c.getContext("2d").clearRect(0,0,c.width,c.height);rm("sg"+i)}
 else if(b.dataset.st!==undefined){const c=b.closest(".note").querySelector("canvas"),i=+b.closest(".pg").dataset.i,x=c.getContext("2d");x.clearRect(0,0,c.width,c.height);x.fillStyle="#0f3d1e";x.font="112px Caveat,cursive";x.fillText(nameOf(i).replace(/^(Estudiante|Docente) /,""),28,148,c.width-56);sv("sg"+i,c.toDataURL())}
  else if(b.matches(".ph")){if(!MODO_EDICION)return;
   if(b.hasAttribute("data-fijo")){alert("Esta imagen viene de datos.js.\nPara cambiarla, edita su ruta en datos.js (o quita la línea para que se busque en la carpeta de fotos).");return}
   const g=b.closest(".pg"),k="ph"+g.dataset.i+"_"+[...g.querySelectorAll("[data-ph]")].indexOf(b),mx=b.closest(".cv-ph")?1600:1100;
   pick(a=>shrink(a,mx,.85).then(d=>{putImg(k,d);b.style.backgroundImage=`url("${d}")`;b.classList.add("has");sv("pg"+g.dataset.i,snap(g));sv("dh"+g.dataset.i,hashFor(+g.dataset.i))}).catch(()=>alert("No se pudo leer esa imagen. Prueba con otra foto (JPG o PNG).")))}
});
let dr=null;
const pt=(c,e)=>{const r=c.getBoundingClientRect();return{x:(e.clientX-r.left)*c.width/r.width,y:(e.clientY-r.top)*c.height/r.height}};
st.addEventListener("pointerdown",e=>{const c=e.target.closest("canvas.sig");if(!c)return;dr=c;const x=c.getContext("2d"),q=pt(c,e);x.lineWidth=5.6;x.lineCap=x.lineJoin="round";x.strokeStyle="#0f3d1e";x.beginPath();x.moveTo(q.x,q.y);c.setPointerCapture(e.pointerId)});
st.addEventListener("pointermove",e=>{if(!dr)return;const q=pt(dr,e),x=dr.getContext("2d");x.lineTo(q.x,q.y);x.stroke()});
addEventListener("pointerup",()=>{if(dr){sv("sg"+dr.closest(".pg").dataset.i,dr.toDataURL());dr=null}});
const lb=document.createElement("button"),lr=document.createElement("button"),lgb=()=>{lb.classList.toggle("hide",!editing);lr.classList.toggle("hide",!(editing&&gi("logo")))};
lb.id="lg";lb.textContent="🛡️ Logo";lb.title="Subir el logo del colegio como imagen";lr.id="lgr";lr.textContent="↺ Logo";lr.title="Volver al logo original";
lb.onclick=upLogo;lr.onclick=()=>{if(confirm("¿Volver al logo original del colegio?")){delImg("logo");applyLogo();lgb()}};
const sb=$("#sn");sb.after(lb,lr);sb.textContent=mute?"🔇":"🔊";sb.onclick=()=>{mute=!mute;sv("snd",mute?"0":"1");sb.textContent=mute?"🔇":"🔊"};
/* Libro final: sin barra superior ni opciones de edición */
if(!MODO_EDICION){document.body.classList.add("solo");
 const nv=document.createElement("div");nv.className="nv";nv.innerHTML='<button class="nvb" id="nvp" aria-label="Página anterior">‹</button><button class="nvb" id="nvn" aria-label="Página siguiente">›</button>';document.body.appendChild(nv);
 $("#nvp").onclick=()=>prev();$("#nvn").onclick=()=>next()}
$("#home").onclick=()=>show(2);$("#prev").onclick=prev;$("#next").onclick=next;
$("#ed").onclick=()=>{editing=!editing;lgb();$("#ed").textContent=editing?"✅ Listo":"✏️ Editar";if(!editing)fit();show(cur)};
sel.onchange=()=>{sv("th"+act,sel.value);show(cur)};
$("#pr").onchange=()=>{sv("pf"+act,$("#pr").value);fit();show(cur)};
$("#av").onchange=()=>{sv("av"+act,$("#av").value);show(cur)};
$("#co").onchange=()=>{sv("ac"+act,$("#co").value);show(cur)};
st.addEventListener("input",e=>{const g=e.target.closest(".pg");if(!g)return;const i=+g.dataset.i;sv("pg"+i,snap(g));sv("dh"+i,hashFor(i));if(e.target.classList.contains("nm"))sv("nm"+i,e.target.textContent.trim())});
/* Ventana "Datos": convierte filas de Excel / Google Sheets en código listo para pegar en datos.js */
$("#lst").onclick=()=>$("#md").classList.remove("hide");
$("#gen").onclick=()=>{const rows=$("#im").value.split(/\r?\n/).map(l=>l.split("\t")).filter(c=>(c[0]||"").trim());if(!rows.length){alert("Pega primero las filas de la hoja.");return}
 const q=s=>JSON.stringify((s||"").trim()),t=rows.map(c=>`  {\n   nombre:${q(c[0])},\n   frase:${q(c[1])},\n   recuerdo:${q(c[2])},\n   aspiraciones:${JSON.stringify((c[3]||"").split(";").map(x=>x.trim()).filter(Boolean))},\n   agradecimientos:${q(c[4])}\n  },`).join("\n");
 $("#out").value=`/* ${rows.length} estudiantes · foto y firma se buscan solas en fotos/estudiantes/NN.jpg y fotos/firmas/NN.png (o agrega foto:"…" a cada uno) */\nconst ESTUDIANTES=[\n${t}\n];`};
$("#cp").onclick=()=>{const o=$("#out");if(!o.value)return;o.select();try{navigator.clipboard.writeText(o.value).catch(()=>document.execCommand("copy"))}catch(x){document.execCommand("copy")}};
$("#rs").onclick=()=>{if(!confirm("¿Borrar lo editado en ESTE navegador (textos, fotos subidas, firmas y estilos)?\nLos datos de datos.js no se tocan."))return;
 try{Object.keys(localStorage).filter(k=>k.indexOf(K)===0).forEach(k=>localStorage.removeItem(k))}catch(x){}
 const fin=()=>location.reload();if(db){try{const tx=db.transaction("i","readwrite");tx.objectStore("i").clear();tx.oncomplete=fin;tx.onerror=tx.onabort=fin;return}catch(x){}}fin()};
$("#cl").onclick=()=>$("#md").classList.add("hide");
document.addEventListener("keydown",e=>{
 if(!$("#md").classList.contains("hide")||e.ctrlKey||e.metaKey||e.altKey)return;
 const t=e.target;if(t&&(t.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))return;
 if(e.key==="ArrowRight"){e.preventDefault();next()}else if(e.key==="ArrowLeft"){e.preventDefault();prev()}
});
/* al elegir en un menú se suelta el foco para que las flechas vuelvan a pasar página */
document.addEventListener("change",e=>{if(e.target.matches&&e.target.matches("select,input[type=color]"))e.target.blur()});
/* deslizar el dedo: izquierda = siguiente, derecha = anterior (no afecta la firma ni el scroll vertical) */
st.style.touchAction="pan-y pinch-zoom";
let sw0=null;
st.addEventListener("touchstart",e=>{if(e.touches.length!==1||e.target.closest("canvas.sig")){sw0=null;return}const t=e.touches[0];sw0={x:t.clientX,y:t.clientY,t:Date.now()}},{passive:true});
st.addEventListener("touchcancel",()=>{sw0=null},{passive:true});
st.addEventListener("touchend",e=>{if(!sw0)return;const t=e.changedTouches[0],dx=t.clientX-sw0.x,dy=t.clientY-sw0.y,dt=Date.now()-sw0.t;sw0=null;
 if(Math.abs(dx)<60||Math.abs(dx)<Math.abs(dy)*1.6||dt>800)return;
 if(String(getSelection()||""))return;
 dx<0?next():prev()},{passive:true});
addEventListener("hashchange",route);
let rt,w0=wide();addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(()=>{fit();if(wide()!==w0){w0=wide();rsz()}else fitLong()},250)});
addEventListener("load",fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().catch(()=>{});
/* Imprimir / guardar PDF: abre index.html?imprimir -> todas las páginas, una por hoja carta (21,59 × 27,94 cm) */
function printAll(){document.body.classList.add("prt");const rs=document.documentElement.style;rs.setProperty("--pw","600px");rs.setProperty("--ph",Math.round(600*11/8.5)+"px");
 st.innerHTML=P.map((p,i)=>pageHTML(i)).join("");applyImgs();applyLogo();drawSigs(st);
 st.querySelectorAll("[data-ph]").forEach(e=>e.classList.toggle("has",!!e.style.backgroundImage));
 fitLong();let n=0;
 const fin=()=>{fitLong();setTimeout(()=>{window.__listo=1;if(!/[?&]sinprint/.test(location.search))print()},800)},w=()=>{if(PEND>0&&n++<80)setTimeout(w,250);else fin()};
 (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(()=>setTimeout(w,400))}
idb().then(idbAll).catch(()=>{}).then(()=>{P.forEach((p,i)=>savedOf(i));if(/[?&]imprimir/.test(location.search)){printAll();return}fit();route();lgb();setTimeout(preload,700)});
