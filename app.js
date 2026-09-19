const q = (s) => document.querySelector(s);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const opening = q('#openingStage');
const sealTarget = q('#sealTarget');
const storyCard = q('#storyCard');
const envelopeForeground = q('#envelopeForeground');
const invitationPage = q('#invitationPage');
const blessingDock = q('#blessingDock');
const homeCard = q('#homeCard');
const detailsFlow = q('#detailsFlow');
const panels = [q('#datePanel'), q('#tamilPanel'), q('#englishPanel'), q('#combinedPanel')];
const modal = q('#photoModal');
const photoClose = q('#photoClose');
let running = false;

function showPanel(panel){
  panels.forEach(p => p.classList.toggle('is-active', p === panel));
}

async function runInvitation(){
  if(running) return;
  running = true;
  sealTarget.disabled = true;

  // 1. Cross-fade the printed seal into a clean no-seal copy of the same envelope.
  // Because this layer uses the exact same artwork coordinates, there is no beige circle or duplicate icon.
  opening.classList.add('seal-faded');
  await sleep(560);

  // 2. Raise the date ticket from behind the envelope. The date/time is deliberately placed
  // in the upper portion of the ticket, so the envelope can hide the lower portion without
  // hiding any text.
  storyCard.setAttribute('aria-hidden','false');
  showPanel(q('#datePanel'));
  storyCard.classList.add('date-risen');
  await sleep(2500);

  // 3. Move the ticket completely clear of the envelope BEFORE expanding to verse mode.
  // At this point the clean envelope foreground fades away and can no longer overlap text.
  opening.classList.add('focused');
  envelopeForeground.classList.add('recede');
  storyCard.classList.add('expanded');
  await sleep(1100);

  // 4. Full Thirukkural, with responsive line-height and no clipping, for 3 seconds.
  showPanel(q('#tamilPanel'));
  await sleep(3000);

  // 5. Full Isaiah verse for 3 seconds.
  showPanel(q('#englishPanel'));
  await sleep(3000);

  // 6. Combine both verses, then physically dock that same card at the top.
  showPanel(q('#combinedPanel'));
  await sleep(650);
  invitationPage.classList.add('is-visible');
  invitationPage.setAttribute('aria-hidden','false');
  invitationPage.scrollTop = 0;
  storyCard.classList.add('docking');
  await sleep(950);

  // Handoff from animated story card to the real in-page blessing card.
  blessingDock.classList.add('is-ready');
  storyCard.classList.add('handoff');
  await sleep(420);
  opening.classList.add('is-gone');

  // 7. House image appears large.
  homeCard.classList.add('is-shown');
  await sleep(2200);

  // 8. The SAME house card shrinks to the centre. No duplicate home icon exists.
  homeCard.classList.add('is-compact');
  await sleep(1050);

  // 9. House warming function message and the rest of the invitation follow.
  detailsFlow.classList.add('is-visible');
}

sealTarget.addEventListener('click', runInvitation);

function openPhoto(){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');}
function closePhoto(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');}
homeCard.addEventListener('click', openPhoto);
photoClose.addEventListener('click', closePhoto);
modal.addEventListener('click', e => { if(e.target === modal) closePhoto(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closePhoto(); });

// Developer preview only: file.html?preview=1 auto-runs the sequence for visual regression testing.
if(new URLSearchParams(location.search).has('preview')) setTimeout(runInvitation, 450);
