/* Consentimiento técnico y Google Analytics 4, modo básico (etiqueta bloqueada hasta aceptar). */
(()=>{
 'use strict';
 const SELF=document.currentScript;
 const ROOT=(SELF&&SELF.dataset.root)||'';
 const ID='G-8SFV2TFR2V';
 const KEY='mz_cookie_consent';
 const lang=(document.documentElement.lang||'es').slice(0,2);
 const copy={
 es:{label:'Preferencias de privacidad',title:'Privacidad y cookies',text:'Usamos una preferencia técnica para recordar tu decisión. Google Analytics solo se activa si aceptas las cookies de medición.',more:'Política de cookies',privacy:'Privacidad',accept:'Aceptar',reject:'Rechazar',manage:'Gestionar cookies'},
 en:{label:'Privacy preferences',title:'Privacy and cookies',text:'We use a technical preference to remember your choice. Google Analytics will only load if you accept analytics cookies.',more:'Cookie policy',privacy:'Privacy',accept:'Accept',reject:'Reject',manage:'Cookie settings'},
 fr:{label:'Préférences de confidentialité',title:'Confidentialité et cookies',text:'Nous mémorisons votre choix grâce à un réglage technique. Google Analytics ne se charge que si vous acceptez les cookies de mesure.',more:'Politique de cookies',privacy:'Confidentialité',accept:'Accepter',reject:'Refuser',manage:'Gérer les cookies'}
 };
 const t=copy[lang]||copy.es;
 let preference=null;
 try {preference=localStorage.getItem(KEY);}catch(e){}
 window.dataLayer=window.dataLayer||[];
 window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
 window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 function gaConsent(granted){window.gtag('consent','update',{analytics_storage:granted?'granted':'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});}
 function loadAnalytics(){
   if(!/^https?:$/.test(location.protocol)||window.__mzAnalyticsLoaded)return;
   window.__mzAnalyticsLoaded=true;
   gaConsent(true);
   window.gtag('js',new Date());
   window.gtag('config',ID,{allow_google_signals:false,allow_ad_personalization_signals:false});
   const script=document.createElement('script');script.async=true;script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ID);document.head.appendChild(script);
 }
 function clearAnalyticsCookies(){
   let cookies='';try{cookies=document.cookie;}catch(e){}
   const names=cookies.split(';').map(s=>s.trim().split('=')[0]).filter(s=>s==='_ga'||s.startsWith('_ga_')||s==='_gid'||s==='_gat');
   const hostname=location.hostname;const parts=hostname.split('.');
   const domains=['',hostname,'.'+hostname];
   if(parts.length>=2){domains.push(parts.slice(-2).join('.'),'.'+parts.slice(-2).join('.'));}
   for(const name of names){
     for(const domain of domains){for(const path of ['/']){
       const domainAttr=domain?';domain='+domain:'';
       document.cookie=name+'=;expires=Thu, 01 Jan 1970 00:00:00 GMT;Max-Age=0;path='+path+domainAttr+';SameSite=Lax';
     }}
   }
 }
 const panel=document.createElement('section');panel.className='mz-consent-panel';panel.hidden=true;
 panel.setAttribute('role','dialog');panel.setAttribute('aria-label',t.label);panel.setAttribute('aria-modal','false');
 const body=document.createElement('div');body.className='mz-consent-inner';
 const intro=document.createElement('div');intro.className='mz-consent-copy';
 const title=document.createElement('strong');title.textContent=t.title;
 const desc=document.createElement('p');desc.textContent=t.text;
 const links=document.createElement('div');links.className='mz-consent-links';
 const linkCookie=document.createElement('a');linkCookie.href=ROOT+'politica-de-cookies.html';linkCookie.textContent=t.more;
 const linkPrivacy=document.createElement('a');linkPrivacy.href=ROOT+'politica-de-privacidad.html';linkPrivacy.textContent=t.privacy;
 links.append(linkCookie,linkPrivacy);intro.append(title,desc,links);
 const actions=document.createElement('div');actions.className='mz-consent-actions';
 const reject=document.createElement('button');reject.type='button';reject.className='mz-consent-reject';reject.textContent=t.reject;
 const accept=document.createElement('button');accept.type='button';accept.className='mz-consent-accept';accept.textContent=t.accept;
 actions.append(reject,accept);body.append(intro,actions);panel.append(body);document.body.append(panel);
 function show(focus){panel.hidden=false;if(focus)reject.focus();}
 function hide(){panel.hidden=true;}
 function save(value){preference=value;try{localStorage.setItem(KEY,value);}catch(e){}}
 reject.addEventListener('click',()=>{
   const hadLoaded=!!window.__mzAnalyticsLoaded;
   save('rejected');gaConsent(false);clearAnalyticsCookies();hide();
   if(hadLoaded)location.reload();
 });
 accept.addEventListener('click',()=>{save('accepted');hide();loadAnalytics();});
 window.openCookieSettings=function(){show(true);return false;};
 document.querySelectorAll('[data-mz-cookie-settings]').forEach(el=>el.addEventListener('click',event=>{event.preventDefault();show(true);}));
 if(preference==='accepted'){hide();loadAnalytics();}
 else if(preference==='rejected'){hide();}
 else{show(false);}
})();
