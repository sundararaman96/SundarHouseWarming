const $ = s => document.querySelector(s);
const cover = $('#cover');
const sealTap = $('#sealTap');
const cinema = $('#cinema');
const app = $('#app');
const panels = [$('#datePanel'), $('#tamilPanel'), $('#englishPanel'), $('#combinedPanel')];
const blessingDock = $('#blessingDock');
const homeStage = $('#homeStage');
const inviteDetails = $('#inviteDetails');
let started = false;
const wait = (ms, fn) => setTimeout(fn, ms);

function showPanel(panel){
  panels.forEach(p => p.classList.remove('active'));
  panel.classList.add('active');
}

function startInvitation(){
  if(started) return;
  started = true;
  sealTap.disabled = true;

  // 1. Seal fades cleanly. The whole cover then disappears, so no baked seal can remain visible.
  cover.classList.add('seal-fading');

  // 2. New isolated envelope scene fades in underneath the cover.
  wait(260, () => {
    cinema.classList.add('active');
    cinema.setAttribute('aria-hidden','false');
  });
  wait(470, () => cover.classList.add('cover-out'));

  // 3. Card rises exactly halfway from the envelope with date and time.
  wait(700, () => {
    cinema.classList.add('card-risen');
    showPanel($('#datePanel'));
  });

  // Keep the date/time readable before moving on.
  wait(3300, () => showPanel($('#tamilPanel')));

  // 4. Tamil verse stays for 3 seconds.
  wait(6300, () => showPanel($('#englishPanel')));

  // 5. English verse stays for 3 seconds.
  wait(9300, () => showPanel($('#combinedPanel')));

  // 6. Both verses combine, then glide and shrink to the top.
  wait(10350, () => cinema.classList.add('docking'));

  // 7. Cross-fade to the document layout with the same blessings docked at the top.
  wait(11450, () => {
    app.classList.add('visible');
    app.setAttribute('aria-hidden','false');
    blessingDock.classList.add('show');
  });
  wait(11900, () => {
    cinema.classList.add('fade-out');
    document.body.classList.remove('locked');
    window.scrollTo({top:0, behavior:'auto'});
  });

  // 8. House photo appears full size.
  wait(12450, () => homeStage.classList.add('show'));

  // 9. The SAME house-photo component shrinks smoothly. No duplicate icon remains behind.
  wait(14850, () => homeStage.classList.add('compact'));

  // 10. Details only appear after the photo has finished shrinking.
  wait(15950, () => inviteDetails.classList.add('show'));
}

sealTap.addEventListener('click', startInvitation);

// House modal
const homeCard = $('#homeCard');
const modal = $('#photoModal');
const closePhoto = $('#closePhoto');
function openPhoto(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
homeCard.addEventListener('click', openPhoto);
closePhoto.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

// Gentle reveal for lower sections.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
