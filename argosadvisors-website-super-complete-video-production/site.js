
document.addEventListener('DOMContentLoaded',()=>{
 const nav=document.querySelector('[data-nav]'), menu=document.querySelector('[data-nav-toggle]');
 menu?.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(o));menu.textContent=o?'Close':'Menu'});
 const theme=document.querySelector('[data-theme-toggle]'), key='argos-theme'; if(localStorage.getItem(key)==='dark')document.body.classList.add('theme-dark');
 theme?.addEventListener('click',()=>{document.body.classList.toggle('theme-dark');localStorage.setItem(key,document.body.classList.contains('theme-dark')?'dark':'light')});
 const toast=document.querySelector('[data-toast]'); let timer; const notify=m=>{if(!toast)return;toast.textContent=m;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),2200)};
 const briefKey='argos-selected-services'; const getSaved=()=>JSON.parse(localStorage.getItem(briefKey)||'[]'); const setSaved=a=>localStorage.setItem(briefKey,JSON.stringify(a));
 function updateSaved(){const a=getSaved();document.querySelectorAll('[data-saved-count]').forEach(x=>x.textContent=a.length);const ta=document.querySelector('[data-brief-services]');if(ta)ta.value=a.join('\n')}
 document.querySelectorAll('[data-save-service]').forEach(btn=>btn.addEventListener('click',()=>{let a=getSaved(),n=btn.dataset.service;if(!a.includes(n)){a.push(n);setSaved(a);notify('Added to production brief')}else notify('Already in your brief');updateSaved()})); updateSaved();
 const search=document.querySelector('[data-service-search]'), cards=[...document.querySelectorAll('[data-category]')], filters=[...document.querySelectorAll('[data-filter]')]; let active='all';
 function apply(){let q=(search?.value||'').toLowerCase();cards.forEach(c=>{let ok=(active==='all'||c.dataset.category===active)&&(!q||c.textContent.toLowerCase().includes(q));c.hidden=!ok})}
 search?.addEventListener('input',apply);filters.forEach(f=>f.addEventListener('click',()=>{active=f.dataset.filter;filters.forEach(x=>x.classList.toggle('active',x===f));apply()}));
 document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();const st=form.querySelector('.form-status');if(st)st.textContent='Demo only — no information was transmitted. Connect a real CRM/form endpoint before launch.';notify('Demo form prepared — nothing sent.')}));
 document.querySelectorAll('details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open&&d.parentElement?.classList.contains('accordion'))[...d.parentElement.children].filter(x=>x!==d&&x.tagName==='DETAILS').forEach(x=>x.open=false)}));
 const els=[...document.querySelectorAll('main > section')];els.forEach(e=>e.classList.add('reveal'));if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('visible');io.unobserve(x.target)}}),{threshold:.05});els.forEach(e=>io.observe(e))}else els.forEach(e=>e.classList.add('visible'));
});
