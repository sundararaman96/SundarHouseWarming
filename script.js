const $ = (s) => document.querySelector(s);
const cover = $('#cover');
const stage = $('#coverStage');
const seal = $('#sealHit');
const story = $('#storyCard');
const eventView = $('#eventView');
const kuralView = $('#kuralView');
const bibleView = $('#bibleView');
const combinedView = $('#combinedView');
const app = $('#app');
const dock = $('#blessingDock');
const homeStage = $('#homeStage');
const homeCard = $('#homeCard');
const inviteDetails = $('#inviteDetails');
let started = false;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function showStory(view){
  [eventView, kuralView, bibleView, combinedView].forEach(v => v.classList.remove('is-active'));
  view.classList.add('is-active');
}

async function runOpening(){
  if(started) return;
  started = true;
  seal.disabled = true;

  // 1. Remove only the seal, leaving the plate and envelope untouched.
  stage.classList.add('seal-open');
  await wait(520);

  // 2. Card rises from the actual envelope position; date/time remains readable.
  stage.classList.add('card-rising');
  showStory(eventView);
  await wait(1150);
  stage.classList.add('card-cleared');
  await wait(1800);

  // 3. Thirukkural: exactly 3 seconds.
  showStory(kuralView);
  await wait(3000);

  // 4. Isaiah: exactly 3 seconds.
  showStory(bibleView);
  await wait(3000);

  // 5. Combine both verses, then glide the whole pair to the top.
  showStory(combinedView);
  await wait(650);
  story.classList.add('verse-docking');
  await wait(1250);

  // 6. Cross-fade the matching permanent dock into the main invitation.
  document.body.classList.add('app-ready');
  dock.classList.add('is-visible');
  await wait(480);
  cover.classList.add('is-gone');
  document.body.classList.remove('is-locked');
  window.scrollTo({top:0, behavior:'auto'});

  // 7. One single house photo appears at natural size.
  await wait(420);
  homeStage.classList.add('is-visible');

  // 8. The same component—not a duplicate icon—shrinks smoothly into a thumbnail.
  await wait(2600);
  homeStage.classList.add('is-compact');

  // 9. Details reveal only after the shrinking animation has completed.
  await wait(1000);
  inviteDetails.classList.add('is-visible');
}

seal.addEventListener('click', runOpening);

// House photo viewer.
const modal = $('#photoModal');
const modalClose = $('#modalClose');
function openPhoto(){
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  modalClose.focus({preventScroll:true});
}
function closePhoto(){
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  homeCard.blur();
}
homeCard.addEventListener('click', openPhoto);
modalClose.addEventListener('click', closePhoto);
modal.addEventListener('click', e => { if(e.target === modal) closePhoto(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('is-open')) closePhoto(); });

// Lower sections reveal naturally as the user scrolls.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.14});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Native sharing when available; clipboard fallback otherwise.
$('#shareButton').addEventListener('click', async () => {
  const data = {
    title:'Sundar & Family — House Warming',
    text:"You're invited to our House Warming on Friday, 2 October 2026 at 6:00 PM.",
    url:location.href
  };
  if(navigator.share){
    try{ await navigator.share(data); }catch(e){}
  } else {
    try{
      await navigator.clipboard.writeText(location.href);
      alert('Invitation link copied.');
    }catch(e){
      alert(location.href);
    }
  }
});
