const $ = (s) => document.querySelector(s);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const opening = $('#openingStage');
const seal = $('#sealHotspot');
const card = $('#storyCard');
const lip = $('#envelopeLip');
const panels = [$('#datePanel'), $('#tamilPanel'), $('#englishPanel'), $('#compactPanel')];
const page = $('#invitationPage');
const house = $('#houseHero');
let started = false;

function showPanel(target){
  panels.forEach(p => p.classList.toggle('active', p === target));
}

async function runInvitation(){
  if(started) return;
  started = true;
  seal.disabled = true;

  // 1. Fade only the seal area already present in the artwork.
  opening.classList.add('seal-gone');
  await sleep(430);

  // 2. The small date ticket rises halfway from the envelope.
  opening.classList.add('rising');
  showPanel($('#datePanel'));
  card.classList.add('date-visible');
  await sleep(1500);

  // Clear the temporary envelope lip once the card is visibly above it.
  opening.classList.add('clear-lip');
  await sleep(750);

  // 3. The same card expands; Tamil appears for 3 seconds.
  card.classList.add('expanded');
  await sleep(760);
  showPanel($('#tamilPanel'));
  await sleep(3000);

  // 4. English appears for 3 seconds.
  showPanel($('#englishPanel'));
  await sleep(3000);

  // 5. Both blessings become one compact card and move to the top.
  showPanel($('#compactPanel'));
  await sleep(500);
  card.classList.add('docked');
  await sleep(1050);

  // 6. Move into the clean invitation page while keeping the blessing at the top.
  page.classList.add('show');
  page.setAttribute('aria-hidden','false');
  await sleep(650);
  opening.classList.add('story-finished');

  // 7. House photo appears large.
  await sleep(550);

  // 8. Same photo shrinks smoothly to the centred clickable card.
  await sleep(1700);
  house.classList.add('compact');
  await sleep(900);

  // 9. Details follow in the approved wireframe order.
  const reveals = [...document.querySelectorAll('.content-reveal')];
  for (const el of reveals){
    el.classList.add('show');
    await sleep(260);
  }

  document.body.classList.remove('locked');
  window.scrollTo({top:0,behavior:'auto'});
}

seal.addEventListener('click', runInvitation);

const modal = $('#photoModal');
const close = $('#modalClose');
function openPhoto(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closePhoto(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
house.addEventListener('click', openPhoto);
house.addEventListener('keydown', e => { if(e.key==='Enter'||e.key===' '){e.preventDefault();openPhoto();} });
close.addEventListener('click', closePhoto);
modal.addEventListener('click', e => { if(e.target===modal) closePhoto(); });
document.addEventListener('keydown', e => { if(e.key==='Escape' && modal.classList.contains('open')) closePhoto(); });
