const $ = (s) => document.querySelector(s);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const opening = $('#opening');
const sealVisual = $('#sealVisual');
const sealHit = $('#sealHit');
const dateCard = $('#dateCard');
const envelopePocket = $('#envelopePocket');
const datePane = $('#datePane');
const versePane = $('#versePane');
const tamilVerse = $('#tamilVerse');
const englishVerse = $('#englishVerse');
const bothVerses = $('#bothVerses');
const mainInvite = $('#mainInvite');
const blessingDock = $('#blessingDock');
const houseStage = $('#houseStage');
const houseCard = $('#houseCard');
const functionMessage = $('#functionMessage');
const details = $('#details');
const actions = $('#actions');
let started = false;

function showVerse(which){
  [tamilVerse, englishVerse, bothVerses].forEach(v => v.classList.remove('active'));
  which.classList.add('active');
}

async function runSequence(){
  if(started) return;
  started = true;
  sealHit.disabled = true;

  // 1. The visible house seal itself fades.
  sealVisual.classList.add('fade');
  await sleep(620);

  // 2. A small date card rises only halfway out of the envelope pocket.
  dateCard.classList.add('date-reveal');
  await sleep(2200);

  // 3. The same card comes fully clear of the envelope and extends into the verse page.
  envelopePocket.classList.add('fade');
  dateCard.classList.add('full-card');
  await sleep(800);

  showVerse(tamilVerse);
  await sleep(3000);

  // 4. English verse, also for 3 seconds.
  showVerse(englishVerse);
  await sleep(3000);

  // 5. Brief combined view, then shrink the blessing page neatly.
  showVerse(bothVerses);
  await sleep(850);
  dateCard.classList.add('compact-card');
  await sleep(1000);

  // 6. Cross-fade into the full invitation page, with the verses fixed at the top.
  mainInvite.classList.add('show');
  mainInvite.setAttribute('aria-hidden','false');
  await sleep(500);
  opening.classList.add('fade-out');
  document.body.classList.remove('locked');
  window.scrollTo({top:0,behavior:'auto'});

  // 7. House appears large.
  await sleep(650);
  houseStage.classList.add('show');

  // 8. The SAME image shrinks to the centered clickable thumbnail.
  await sleep(2200);
  houseCard.classList.add('compact');

  // 9. Function message and details follow after the image has finished shrinking.
  await sleep(1050);
  functionMessage.classList.add('show');
  await sleep(450);
  details.classList.add('show');
  actions.classList.add('show');
}

sealHit.addEventListener('click', runSequence);

const modal = $('#photoModal');
const closeModal = $('#closeModal');
function openPhoto(){
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  closeModal.focus();
}
function closePhoto(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
houseCard.addEventListener('click', openPhoto);
closeModal.addEventListener('click', closePhoto);
modal.addEventListener('click',(e)=>{if(e.target===modal)closePhoto()});
document.addEventListener('keydown',(e)=>{if(e.key==='Escape'&&modal.classList.contains('open'))closePhoto()});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
