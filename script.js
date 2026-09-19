const $ = (s) => document.querySelector(s);
const sealTap = $('#sealTap');
const frontFrame = document.querySelector('.front-frame');
const inviteCard = $('#inviteCard');
const verseTamil = $('#verseTamil');
const verseEnglish = $('#verseEnglish');
const heroStage = $('#heroStage');
const contentSection = $('#contentSection');
const homeShowcase = $('#homeShowcase');
const photoModal = $('#photoModal');
const closeModal = $('#closeModal');
let running = false;
const wait = ms => new Promise(r => setTimeout(r, ms));

async function openInvitation(){
  if(running) return;
  running = true;
  sealTap.disabled = true;

  // 1. Fade the seal area, then bring out only the compact date ticket.
  frontFrame.classList.add('seal-faded');
  await wait(360);
  inviteCard.classList.add('show');
  inviteCard.setAttribute('aria-hidden','false');

  // 2. Let the date/time ticket breathe before expanding.
  await wait(2200);
  inviteCard.classList.add('expanded');

  // 3. Tamil verse for three seconds.
  await wait(700);
  verseTamil.classList.add('active');
  verseEnglish.classList.remove('active');
  await wait(3000);

  // 4. English verse for three seconds.
  verseTamil.classList.remove('active');
  verseEnglish.classList.add('active');
  await wait(3000);

  // 5. Same card contracts into the small blessing card.
  inviteCard.classList.add('mini');
  await wait(1050);

  // 6. Reveal the function message and house section cleanly.
  heroStage.classList.add('complete');
  contentSection.classList.add('show');
  contentSection.setAttribute('aria-hidden','false');
  document.body.classList.remove('stage-locked');
  window.scrollTo({top:0, behavior:'auto'});

  // 7. House photo remains large briefly, then the SAME component shrinks in the centre.
  await wait(2200);
  homeShowcase.classList.add('compact');
}

sealTap.addEventListener('click', openInvitation);

function openPhoto(){
  photoModal.classList.add('open');
  photoModal.setAttribute('aria-hidden','false');
  document.body.classList.add('stage-locked');
}
function closePhoto(){
  photoModal.classList.remove('open');
  photoModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('stage-locked');
}
homeShowcase.addEventListener('click', openPhoto);
homeShowcase.addEventListener('keydown', e => {
  if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); openPhoto(); }
});
closeModal.addEventListener('click', closePhoto);
photoModal.addEventListener('click', e => { if(e.target === photoModal) closePhoto(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closePhoto(); });
