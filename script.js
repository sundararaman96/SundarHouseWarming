const opening = document.getElementById('opening');
const openInvite = document.getElementById('openInvite');
const story = document.getElementById('story');
const revealCard = document.getElementById('revealCard');
const dateStep = document.getElementById('dateStep');
const kuralStep = document.getElementById('kuralStep');
const bibleStep = document.getElementById('bibleStep');
const invitation = document.getElementById('invitation');
const houseCard = document.getElementById('houseCard');
const functionDetails = document.getElementById('functionDetails');
const photoModal = document.getElementById('photoModal');
const closeModal = document.getElementById('closeModal');
let running = false;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
function showStep(target){
  [dateStep,kuralStep,bibleStep].forEach(el => el.classList.remove('is-visible'));
  target.classList.add('is-visible');
}

async function startInvitation(){
  if(running) return;
  running = true;
  opening.classList.add('is-leaving');
  await sleep(650);
  story.classList.add('is-active');
  story.setAttribute('aria-hidden','false');
  await sleep(300);
  story.classList.add('is-rising');
  showStep(dateStep);
  await sleep(2400);
  story.classList.add('is-expanded');
  await sleep(900);
  showStep(kuralStep);
  await sleep(3000);
  showStep(bibleStep);
  await sleep(3000);
  story.style.opacity = '0';
  await sleep(650);
  story.style.display = 'none';
  invitation.classList.add('is-visible');
  invitation.setAttribute('aria-hidden','false');
  document.body.classList.remove('is-locked');
  window.scrollTo({top:0,behavior:'instant'});
  await sleep(1800);
  houseCard.classList.remove('house-card--large');
  houseCard.classList.add('house-card--small');
  await sleep(850);
  functionDetails.classList.add('is-visible');
}

openInvite.addEventListener('click', startInvitation);

function openHouse(){
  photoModal.classList.add('is-open');
  photoModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  closeModal.focus();
}
function closeHouse(){
  photoModal.classList.remove('is-open');
  photoModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
houseCard.addEventListener('click', openHouse);
closeModal.addEventListener('click', closeHouse);
photoModal.addEventListener('click', e => { if(e.target === photoModal) closeHouse(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeHouse(); });

// Optional test helper, harmless in normal use.
if(new URLSearchParams(location.search).get('autoplay') === '1'){
  setTimeout(startInvitation,250);
}
