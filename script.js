const $ = s => document.querySelector(s);
const opening = $('#opening');
const frame = $('#openingFrame');
const seal = $('#sealButton');
const card = $('#emergingCard');
const eventView = $('#eventView');
const kuralView = $('#kuralView');
const bibleView = $('#bibleView');
const combinedView = $('#combinedView');
const dock = $('#blessingDock');
const houseSection = $('#houseSection');
const mainInvite = $('#mainInvite');
let started = false;
const later = (ms, fn) => setTimeout(fn, ms);

function showOnly(view){
  [eventView, kuralView, bibleView, combinedView].forEach(v => v.classList.remove('active'));
  view.classList.add('active');
}

function confetti(){
  const box = $('#confetti');
  const colours = ['#c59635','#8c1828','#2f6847','#efdca4'];
  for(let i=0;i<44;i++){
    const p = document.createElement('i');
    p.className = 'confetti-piece';
    p.style.left = (Math.random()*100) + '%';
    p.style.background = colours[i % colours.length];
    p.style.setProperty('--duration', (2.8 + Math.random()*2.3) + 's');
    p.style.setProperty('--drift', (Math.random()*140 - 70) + 'px');
    p.style.animationDelay = (Math.random()*.35) + 's';
    box.appendChild(p);
    setTimeout(() => p.remove(), 5700);
  }
}

function openInvitation(){
  if(started) return;
  started = true;
  seal.disabled = true;

  // House seal fades cleanly first.
  seal.classList.add('fade');

  // Invitation rises from the envelope while the thamboolam stays visible.
  later(480, () => {
    frame.classList.add('rising');
    card.classList.add('rise');
    showOnly(eventView);
    confetti();
  });
  later(1550, () => frame.classList.add('cleared'));

  // Event details are visible first.
  // Thirukkural then remains alone for 3 seconds.
  later(3500, () => showOnly(kuralView));

  // Isaiah remains alone for 3 seconds.
  later(6500, () => showOnly(bibleView));

  // Both verses briefly appear together before shrinking to the top.
  later(9500, () => showOnly(combinedView));
  later(10350, () => card.classList.add('dock'));

  // Cross-fade into the final invitation with the verses already docked at top.
  later(11350, () => {
    document.body.classList.add('app-ready');
    dock.classList.add('show');
  });
  later(11900, () => {
    opening.classList.add('hide');
    document.body.classList.remove('locked');
    window.scrollTo({top:0,behavior:'auto'});
  });

  // House appears only after the blessing is settled, so there is no overlap.
  later(12450, () => houseSection.classList.add('show'));

  // House shrinks to the centred clickable thumbnail.
  later(15050, () => houseSection.classList.add('collapsed'));

  // Event details reveal after the house transition completes.
  later(15850, () => mainInvite.classList.add('show'));
}

seal.addEventListener('click', openInvitation);

// House viewer.
const houseFull = $('#houseFull');
const houseThumb = $('#houseThumb');
const modal = $('#houseModal');
const modalClose = $('#modalClose');
function openHouse(){
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  modalClose.focus();
}
function closeHouse(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
houseFull.addEventListener('click', openHouse);
houseThumb.addEventListener('click', openHouse);
modalClose.addEventListener('click', closeHouse);
modal.addEventListener('click', e => { if(e.target === modal) closeHouse(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('open')) closeHouse(); });

// Reveal later sections naturally while scrolling.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Share invitation.
$('#shareButton').addEventListener('click', async () => {
  const data = {
    title:'Sundar & Family — House Warming',
    text:"You're invited to our House Warming on Friday, 2 October 2026 at 6:00 PM.",
    url:location.href
  };
  if(navigator.share){
    try{ await navigator.share(data); }catch(e){}
  }else{
    try{
      await navigator.clipboard.writeText(location.href);
      alert('Invitation link copied.');
    }catch(e){
      alert(location.href);
    }
  }
});
