/* ================================================================
   script.js — Patanjali Wellness Hubli flyer gallery
   Sections in this file:
     1. Lenis smooth scroll setup
     2. Flyer + "Why choose us" data (rendered into the page)
     3. GSAP scroll-triggered animations
     4. Magnetic card tilt + ambient background parallax
     5. Falling snow canvas effect
     6. Fullscreen flyer modal/viewer logic
   To add real flyer images, jump to the `flyers` array below and
   fill in each `image:` field — look for "IMAGE LINK GOES HERE".
   ================================================================ */

document.getElementById('yr').textContent = new Date().getFullYear(); // footer copyright year
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- LENIS SMOOTH SCROLL ---------------- */
let lenis;
if(!reduceMotion && window.Lenis){
  lenis = new Lenis({ duration: 1.15, easing: (t)=> 1 - Math.pow(1-t, 3.2), smoothWheel:true });
  function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  lenis.on('scroll', ()=> ScrollTrigger && ScrollTrigger.update());
  gsap.ticker.add((time)=> lenis.raf(time*1000));
  gsap.ticker.lagSmoothing(0);
}
gsap.registerPlugin(ScrollTrigger);

/* in-page nav still works with Lenis */
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', (e)=>{
    const id = link.getAttribute('href');
    if(id.length < 2) return;
    const target = document.querySelector(id);
    if(!target) return;
    e.preventDefault();
    document.getElementById('mnav').classList.remove('open');
    if(lenis){ lenis.scrollTo(target, {offset:-88, duration:1.2}); }
    else target.scrollIntoView({behavior: reduceMotion?'auto':'smooth', block:'start'});
    history.pushState(null, '', id);
  });
});

/* ---------------- FLYER + WHY DATA ---------------- */
/* ADD YOUR IMAGES HERE.
   Each flyer below has its own "image:" line — put your image's
   file path or URL between the quotes, for example:
       image: "images/flyer-1.jpg"
   or:
       image: "https://yourdomain.com/flyers/flyer-1.jpg"
   Leave it as "" (empty quotes) to keep showing the placeholder
   gradient card until your real image is ready. */
const flyers = [
  {
    title: "International Yoga Day Camp",
    desc: "Free community yoga sessions marking International Yoga Day, open to all age groups.",
    tag: "Camp",
    icon: "om",
    grad: "linear-gradient(160deg,#0F2038,#2FD6A3)",
    image: ""   /* <<< PUT IMAGE 1 LINK HERE, e.g. "images/flyer-1.jpg" */
  },
  {
    title: "Ayurveda Health Checkup Camp",
    desc: "Complimentary Ayurvedic health screenings and consultations by certified practitioners.",
    tag: "Health Camp",
    icon: "leaf",
    grad: "linear-gradient(160deg,#0B1120,#164A3C)",
    image: ""   /* <<< PUT IMAGE 2 LINK HERE, e.g. "images/flyer-2.jpg" */
  },
  {
    title: "Patanjali Product Launch",
    desc: "Introducing new Patanjali Ayurveda products, now available at the Hubli store.",
    tag: "Launch",
    icon: "star",
    grad: "linear-gradient(160deg,#111B33,#5AA8FF)",
    image: ""   /* <<< PUT IMAGE 3 LINK HERE, e.g. "images/flyer-3.jpg" */
  },
  {
    title: "Free Health Consultation Drive",
    desc: "One-on-one consultations with Ayurveda experts — no appointment necessary.",
    tag: "Consultation",
    icon: "pulse",
    grad: "linear-gradient(160deg,#0B1120,#2C5B8F)",
    image: ""   /* <<< PUT IMAGE 4 LINK HERE, e.g. "images/flyer-4.jpg" */
  },
  {
    title: "Yoga & Wellness Workshop",
    desc: "A weekend workshop covering breathing techniques, posture and mindful living.",
    tag: "Workshop",
    icon: "lotus",
    grad: "linear-gradient(160deg,#070B14,#1E3E6E)",
    image: ""   /* <<< PUT IMAGE 5 LINK HERE, e.g. "images/flyer-5.jpg" */
  },
  {
    title: "Ayurvedic Immunity Booster Camp",
    desc: "Learn immunity-boosting Ayurvedic routines and take home a starter kit.",
    tag: "Camp",
    icon: "leaf",
    grad: "linear-gradient(160deg,#123A2E,#2FD6A3)",
    image: ""   /* <<< PUT IMAGE 6 LINK HERE, e.g. "images/flyer-6.jpg" */
  },
  {
    title: "Swadeshi Mela — Patanjali Store",
    desc: "A community mela celebrating Swadeshi products, crafts and Ayurveda essentials.",
    tag: "Community",
    icon: "star",
    grad: "linear-gradient(160deg,#0B1120,#F0B65C22)",
    image: ""   /* <<< PUT IMAGE 7 LINK HERE, e.g. "images/flyer-7.jpg" */
  },
  {
    title: "Community Wellness Awareness",
    desc: "An awareness drive on holistic wellness for families across Hubli‑Dharwad.",
    tag: "Awareness",
    icon: "pulse",
    grad: "linear-gradient(160deg,#111B33,#2C5B8F)",
    image: ""   /* <<< PUT IMAGE 8 LINK HERE, e.g. "images/flyer-8.jpg" */
  }
];
const icons = {
  om:'<svg class="poster-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.4"><circle cx="12" cy="12" r="9"/><path d="M8 9c1 3 4 3 4 0s-3-3-3-1 2 2 3 1 2-2 3 0-1 4-3 3"/></svg>',
  leaf:'<svg class="poster-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.4"><path d="M4 20c8 0 16-8 16-16C12 4 4 12 4 20z"/><path d="M4 20c4-8 8-12 16-16"/></svg>',
  star:'<svg class="poster-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.4"><path d="M12 3l2.6 5.9L21 10l-5 4.4L17.4 21 12 17.6 6.6 21 8 14.4 3 10l6.4-1.1z"/></svg>',
  pulse:'<svg class="poster-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.4"><path d="M3 12h4l2 6 4-14 2 8h6"/></svg>',
  lotus:'<svg class="poster-icon" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.4"><path d="M12 21c-5-2-8-6-8-10 3 0 6 2 8 5 2-3 5-5 8-5 0 4-3 8-8 10z"/><path d="M12 11V3"/></svg>'
};
function posterHTML(f, full){
  /* If a real image link has been added to this flyer's `image`
     field in the flyers array above, show that image instead of
     the placeholder gradient composition. */
  if(f.image){
    if(full){
      /* Fullscreen viewer: image is centered and scaled to fit
         entirely inside the modal — no scrollbars, whole flyer
         visible at once. Zoom (⤢ button) scales it up from here. */
      return `<img src="${f.image}" alt="${f.title} — Patanjali Wellness Hubli flyer">`;
    }
    /* Small gallery card preview: cropped cover image, unaffected by this change. */
    return `<div class="poster" style="padding-top:0;">
      <img src="${f.image}" alt="${f.title} — Patanjali Wellness Hubli flyer" loading="lazy"
           style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0;">
    </div>`;
  }
  /* Placeholder composition — shown until a real flyer image is added above. */
  if(full){
    /* Fullscreen viewer placeholder: everything centered inside one
       fixed-size panel, so it fits on screen with no scrolling. */
    return `<div class="poster-full" style="background:${f.grad};">
      <div class="poster-full-inner">
        ${icons[f.icon]}
        <div class="poster-full-title">${f.title}</div>
        <div class="poster-full-sub">${f.tag} · Patanjali Wellness Hubli</div>
        <div class="poster-full-note">This is a placeholder composition. Add your real flyer image to the <code>image</code> field for this flyer in script.js and it will appear here, scaled to fit, with zoom.</div>
      </div>
    </div>`;
  }
  /* Small gallery card preview placeholder (unchanged). */
  return `<div class="poster" style="background:${f.grad};">
    ${icons[f.icon]}
    <div class="poster-title">${f.title}</div>
    <div class="poster-sub">${f.tag} · Patanjali Wellness Hubli</div>
  </div>`;
}
/* Builds one .flyer-card element per entry in the `flyers` array
   above and drops it into <div id="flyerGrid"> in index.html. */
const grid = document.getElementById('flyerGrid');
flyers.forEach((f, i) => {
  const card = document.createElement('div');
  card.className = 'flyer-card';
  card.innerHTML = `
    <div class="flyer-preview">
      <span class="flyer-badge">${f.tag}</span>
      ${posterHTML(f,false)}
    </div>
    <div class="flyer-body">
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
      <button class="view-full-btn" data-idx="${i}">View Full Flyer <span aria-hidden="true">↗</span></button>
    </div>`;
  grid.appendChild(card);
});

/* "Why choose us" feature cards — text + emoji icon only, no images used.
   Edit the icon (i), title (t) or description (d) of any card here. */
const whyItems = [
  {t:"Modern Software", d:"Built with current tools and practices — nothing dated, nothing clunky.", i:"✦"},
  {t:"Easy to Use", d:"Interfaces designed around how people actually work, not how systems are built.", i:"◎"},
  {t:"Fast Support", d:"Quick, responsive help whenever something needs attention.", i:"⚡"},
  {t:"Trusted by Businesses", d:"Relied on by traders, retailers and manufacturers across Karnataka.", i:"✓"},
  {t:"Secure", d:"Your data and your customers' data, handled with care.", i:"⛨"},
  {t:"Innovative", d:"We look for better ways to solve problems, not just familiar ones.", i:"◆"}
];
/* Builds one .why-card element per entry in `whyItems` and drops
   it into <div id="whyGrid"> in index.html. */
const whyGrid = document.getElementById('whyGrid');
whyItems.forEach(w=>{
  const el = document.createElement('div');
  el.className = 'why-card';
  el.innerHTML = `<div class="why-icon">${w.i}</div><h3>${w.t}</h3><p>${w.d}</p>`;
  whyGrid.appendChild(el);
});

/* ---------------- GSAP SCROLL ANIMATIONS ---------------- */
if(!reduceMotion){
  // Hero: fade + scale + blur to sharp
  gsap.set('.hero-el', {opacity:0, y:26, scale:0.97, filter:'blur(8px)'});
  gsap.to('.hero-el', {opacity:1, y:0, scale:1, filter:'blur(0px)', duration:1.5, ease:'power3.out', stagger:0.12, delay:0.1});

  // Section headers fade up
  gsap.utils.toArray('.reveal').forEach(el=>{
    gsap.fromTo(el, {opacity:0, y:30}, {opacity:1, y:0, duration:1, ease:'power3.out',
      scrollTrigger:{trigger:el, start:'top 85%'}});
  });

  // Flyer cards: stagger, fade up, scale, slight rotation correction
  gsap.utils.toArray('.flyer-card').forEach((card,i)=>{
    const rot = (i % 2 === 0) ? -2.2 : 2.2;
    gsap.fromTo(card, {opacity:0, y:44, scale:0.95, rotate:rot},
      {opacity:1, y:0, scale:1, rotate:0, duration:0.9, ease:'power3.out', delay:(i%3)*0.1,
       scrollTrigger:{trigger:card, start:'top 90%'}});
  });

  // About: text from left, card from right
  gsap.fromTo('.reveal-left', {opacity:0, x:-50}, {opacity:1, x:0, duration:1.1, ease:'power3.out',
    scrollTrigger:{trigger:'#about', start:'top 75%'}});
  gsap.fromTo('.reveal-right', {opacity:0, x:50}, {opacity:1, x:0, duration:1.1, ease:'power3.out',
    scrollTrigger:{trigger:'#about', start:'top 75%'}});

  // Why cards appear one by one, then float
  gsap.utils.toArray('.why-card').forEach((card,i)=>{
    gsap.fromTo(card, {opacity:0, y:36}, {opacity:1, y:0, duration:0.8, ease:'power3.out', delay:i*0.12,
      scrollTrigger:{trigger:card, start:'top 88%',
        onEnter:()=>{
          gsap.to(card, {y:-8, duration:2.6+Math.random(), ease:'sine.inOut', yoyo:true, repeat:-1, delay:0.9+i*0.1});
        }}});
  });

  // Footer fade upward
  gsap.fromTo('.reveal-up', {opacity:0, y:40}, {opacity:1, y:0, duration:1, ease:'power3.out',
    scrollTrigger:{trigger:'footer', start:'top 90%'}});
}else{
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-up,.hero-el').forEach(el=>{el.style.opacity=1;});
}

/* ---------------- MAGNETIC TILT ON CARDS ---------------- */
if(!reduceMotion && window.matchMedia('(hover:hover)').matches){
  document.querySelectorAll('.flyer-card, .why-card').forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left)/r.width - 0.5;
      const py = (e.clientY - r.top)/r.height - 0.5;
      gsap.to(card, {rotateX: py*-6, rotateY: px*6, duration:0.5, ease:'power2.out', transformPerspective:800});
    });
    card.addEventListener('mouseleave', ()=>{
      gsap.to(card, {rotateX:0, rotateY:0, duration:0.6, ease:'power3.out'});
    });
  });

  /* Ambient blobs parallax with cursor */
  const blobs = [document.getElementById('blobA'), document.getElementById('blobB'), document.getElementById('blobC')];
  const strength = [26, 34, 18];
  window.addEventListener('mousemove', (e)=>{
    const cx = e.clientX / window.innerWidth - 0.5;
    const cy = e.clientY / window.innerHeight - 0.5;
    blobs.forEach((b,i)=>{
      if(!b) return;
      gsap.to(b, {x: cx*strength[i], y: cy*strength[i], duration:1.4, ease:'power2.out'});
    });
  });
}

/* slow ambient drift regardless of cursor */
if(!reduceMotion){
  gsap.to('#blobA', {y:'+=40', x:'+=20', duration:14, ease:'sine.inOut', yoyo:true, repeat:-1});
  gsap.to('#blobB', {y:'-=30', x:'-=24', duration:17, ease:'sine.inOut', yoyo:true, repeat:-1});
  gsap.to('#blobC', {y:'+=26', x:'+=30', duration:20, ease:'sine.inOut', yoyo:true, repeat:-1});
}

/* ---------------- SNOW EFFECT ---------------- */
(function(){
  const canvas = document.getElementById('snow');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, flakes, dpr;
  const FLAKE_COUNT = window.matchMedia('(max-width:640px)').matches ? 55 : 110;

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w+'px'; canvas.style.height = h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  function makeFlake(randomY){
    return {
      x: Math.random()*w,
      y: randomY ? Math.random()*h : -10,
      r: Math.random()*2.4 + 0.8,
      speedY: Math.random()*0.6 + 0.35,
      speedX: Math.random()*0.4 - 0.2,
      drift: Math.random()*Math.PI*2,
      driftSpeed: Math.random()*0.015 + 0.005,
      opacity: Math.random()*0.5 + 0.35
    };
  }
  function init(){
    resize();
    flakes = Array.from({length: FLAKE_COUNT}, ()=> makeFlake(true));
  }
  function step(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#EFF4FF';
    for(const f of flakes){
      f.drift += f.driftSpeed;
      f.x += f.speedX + Math.sin(f.drift)*0.3;
      f.y += f.speedY;
      if(f.y > h + 10){ Object.assign(f, makeFlake(false)); }
      if(f.x > w + 10) f.x = -10;
      if(f.x < -10) f.x = w + 10;
      ctx.globalAlpha = f.opacity;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(step);
  }
  let raf;
  window.addEventListener('resize', ()=>{ resize(); });

  if(reduceMotion){
    // Draw a single static snowfall frame, no animation loop
    init();
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#EFF4FF';
    flakes.forEach(f=>{ ctx.globalAlpha = f.opacity; ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill(); });
    ctx.globalAlpha = 1;
  } else {
    init();
    step();
  }
})();

/* ---------------- MODAL LOGIC ---------------- */
const modal = document.getElementById('modal');
const modalInner = document.getElementById('modalInner');
const modalCanvas = document.getElementById('modalCanvas');
const modalTitle = document.getElementById('modalTitle');
const modalCount = document.getElementById('modalCount');
let current = 0;

function openModal(idx){
  current = idx;
  renderModal();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if(lenis) lenis.stop();
  requestAnimationFrame(()=>{
    modal.classList.add('blurred');
    modalInner.classList.add('show');
  });
}
function renderModal(){
  const f = flyers[current];
  modalCanvas.classList.remove('zoomed');
  modalCanvas.style.opacity = 0;
  modalCanvas.innerHTML = posterHTML(f, true);
  modalTitle.textContent = f.title;
  modalCount.textContent = `${current+1} / ${flyers.length}`;
  gsap.fromTo(modalCanvas, {opacity:0, filter:'blur(14px)'}, {opacity:1, filter:'blur(0px)', duration:0.6, ease:'power2.out'});
}
function closeModal(){
  modal.classList.remove('blurred');
  modalInner.classList.remove('show');
  setTimeout(()=>{
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if(lenis) lenis.start();
  }, reduceMotion? 0 : 480);
}
document.getElementById('closeBtn').onclick = closeModal;
document.getElementById('prevBtn').onclick = ()=>{ current = (current-1+flyers.length)%flyers.length; renderModal(); };
document.getElementById('nextBtn').onclick = ()=>{ current = (current+1)%flyers.length; renderModal(); };
document.getElementById('zoomBtn').onclick = ()=> modalCanvas.classList.toggle('zoomed');
modalCanvas.onclick = (e)=>{ if(e.target===modalCanvas || e.target.closest('.poster-full')) modalCanvas.classList.toggle('zoomed'); };
document.getElementById('downloadBtn').onclick = ()=>{
  const f = flyers[current];
  if(f.image){
    /* Real image present: trigger an actual download */
    const a = document.createElement('a');
    a.href = f.image;
    a.download = f.title.replace(/\s+/g,'-').toLowerCase() + '.jpg';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }else{
    alert('Add a real flyer image link in script.js (the `image` field on this flyer) to enable downloads. This preview uses a placeholder composition.');
  }
};
modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
document.addEventListener('keydown', (e)=>{
  if(!modal.classList.contains('open')) return;
  if(e.key==='Escape') closeModal();
  if(e.key==='ArrowLeft') document.getElementById('prevBtn').click();
  if(e.key==='ArrowRight') document.getElementById('nextBtn').click();
});
grid.addEventListener('click', (e)=>{
  const btn = e.target.closest('.view-full-btn');
  const card = e.target.closest('.flyer-card');
  if(btn){ openModal(Number(btn.dataset.idx)); }
  else if(card){ openModal(Array.from(grid.children).indexOf(card)); }
});
