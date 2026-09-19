const $ = s => document.querySelector(s);
const opening = $('#opening');
const sealTap = $('#sealTap');
const panels = [$('#eventPanel'), $('#tamilPanel'), $('#englishPanel'), $('#combinedPanel')];
const app = $('#app');
const blessingDock = $('#blessingDock');
const homeStage = $('#homeStage');
const inviteDetails = $('#inviteDetails');
let started = false;

const later = (ms, fn) => window.setTimeout(fn, ms);
function show(panel){ panels.forEach(p => p.classList.remove('active')); panel.classList.add('active'); }

function start(){
  if(started) return;
  started = true;
  sealTap.disabled = true;

  // 1) The actual visible seal fades where it sits on the pictured envelope.
  opening.classList.add('seal-fade');

  // 2) The card rises from behind the pictured envelope and stops half-way out.
  later(700, () => {
    opening.classList.add('card-up');
    show($('#eventPanel'));
  });

  // Date/time gets a calm reading beat before the verses.
  later(3600, () => show($('#tamilPanel')));

  // 3) Thirukkural remains for a full 3 seconds.
  later(6600, () => show($('#englishPanel')));

  // 4) Isaiah remains for a full 3 seconds.
  later(9600, () => show($('#combinedPanel')));

  // 5) Both verses combine, then the same card glides and shrinks to the top.
  later(10650, () => opening.classList.add('dock-card'));

  // 6) Cross-fade to the clean body at the exact point the blessing has docked.
  later(11700, () => {
    app.classList.add('visible');
    app.setAttribute('aria-hidden','false');
    blessingDock.classList.add('show');
  });
  later(12250, () => {
    opening.classList.add('exit');
    document.body.classList.remove('locked');
    window.scrollTo({top:0,behavior:'auto'});
  });

  // 7) House photo appears full size.
  later(12850, () => homeStage.classList.add('show'));

  // 8) The same photo component shrinks smoothly into the centred thumbnail.
  later(15400, () => homeStage.classList.add('compact'));

  // 9) Details appear only after the house-photo shrink is complete.
  later(16650, () => inviteDetails.classList.add('show'));
}

sealTap.addEventListener('click', start);

// House image viewer
const homeCard = $('#homeCard');
const photoModal = $('#photoModal');
const photoClose = $('#photoClose');
function openPhoto(){ photoModal.classList.add('open'); photoModal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closePhoto(){ photoModal.classList.remove('open'); photoModal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
homeCard.addEventListener('click', openPhoto);
photoClose.addEventListener('click', closePhoto);
photoModal.addEventListener('click', e => { if(e.target === photoModal) closePhoto(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape' && photoModal.classList.contains('open')) closePhoto(); });

// Lower sections reveal naturally as the guest scrolls.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
