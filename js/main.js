const book = document.querySelector('.book-link');
const reader = document.querySelector('#lector-valentina');
const pages = [...reader.querySelectorAll('.reader-page')];
const stage = reader.querySelector('.reader-stage');
const prev = reader.querySelector('#reader-prev');
const next = reader.querySelector('#reader-next');
const zoom = reader.querySelector('#reader-zoom');
let page = 0;
let returnFocus;
function renderPage(){
 pages.forEach((img,i)=>img.hidden=i!==page);
 prev.disabled=page===0; next.disabled=page===pages.length-1;
 reader.querySelector('.reader-count').textContent=`Página ${page+9} · ${page+1} de ${pages.length}`;
 stage.scrollTop=0;stage.scrollLeft=0;
}
function openReader(event){
 event?.preventDefault();
 returnFocus=document.activeElement;
 book.setAttribute('aria-expanded','true');
 page=0;renderPage();reader.showModal();document.body.classList.add('reading-open');
}
book.addEventListener('click',openReader);
document.querySelectorAll('.reader-trigger').forEach(b=>b.addEventListener('click',openReader));
reader.querySelector('#reader-close').addEventListener('click',()=>reader.close());
reader.addEventListener('close',()=>{document.body.classList.remove('reading-open');book.setAttribute('aria-expanded','false');returnFocus?.focus();});
prev.addEventListener('click',()=>{if(page>0){page--;renderPage();}});
next.addEventListener('click',()=>{if(page<pages.length-1){page++;renderPage();}});
reader.addEventListener('keydown',e=>{if(e.key==='ArrowRight'&&!stage.classList.contains('zoomed')){e.preventDefault();next.click();}if(e.key==='ArrowLeft'&&!stage.classList.contains('zoomed')){e.preventDefault();prev.click();}});
zoom.addEventListener('click',()=>{const on=stage.classList.toggle('zoomed');zoom.setAttribute('aria-pressed',String(on));zoom.textContent=on?'Ajustar':'Ampliar';});
renderPage();

const mediaTrack=document.querySelector('#media-track');
const mediaPrev=document.querySelector('#media-prev');
const mediaNext=document.querySelector('#media-next');
function mediaStep(){const card=mediaTrack.firstElementChild;return card.getBoundingClientRect().width+parseFloat(getComputedStyle(mediaTrack).gap);}
function mediaUpdate(){const max=mediaTrack.scrollWidth-mediaTrack.clientWidth;mediaPrev.disabled=mediaTrack.scrollLeft<=2;mediaNext.disabled=mediaTrack.scrollLeft>=max-2;}
mediaPrev.addEventListener('click',()=>mediaTrack.scrollBy({left:-mediaStep()}));
mediaNext.addEventListener('click',()=>mediaTrack.scrollBy({left:mediaStep()}));
mediaTrack.addEventListener('scroll',mediaUpdate,{passive:true});
mediaTrack.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();mediaNext.click();}else if(event.key==='ArrowLeft'){event.preventDefault();mediaPrev.click();}});
window.addEventListener('resize',mediaUpdate);mediaUpdate();
