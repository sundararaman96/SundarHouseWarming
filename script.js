const sealButton = document.getElementById('sealButton');
const sealCover = document.querySelector('.seal-cover');
const instruction = document.querySelector('.instruction');
const invitationCard = document.getElementById('invitationCard');
const openingScreen = document.getElementById('openingScreen');
const peekDate = document.getElementById('peekDate');
const versesTop = document.getElementById('versesTop');
const kuralStage = document.getElementById('kuralStage');
const bibleStage = document.getElementById('bibleStage');
const houseFeature = document.getElementById('houseFeature');
const detailsStack = document.getElementById('detailsStack');
const photoModal = document.getElementById('photoModal');
const photoModalBackdrop = document.getElementById('photoModalBackdrop');
const closePhotoModal = document.getElementById('closePhotoModal');

let started = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runSequence() {
  if (started) return;
  started = true;

  sealButton.classList.add('is-hidden');
  sealCover.classList.add('is-hidden');
  instruction.classList.add('is-hidden');

  invitationCard.classList.add('visible');
  await wait(1400);

  invitationCard.classList.add('expanded');
  await wait(850);

  kuralStage.classList.add('active');
  bibleStage.classList.remove('active');
  await wait(3000);

  kuralStage.classList.remove('active');
  bibleStage.classList.add('active');
  await wait(3000);

  bibleStage.classList.remove('active');
  versesTop.classList.add('visible');
  houseFeature.classList.add('visible');
  await wait(1800);

  houseFeature.classList.add('compact');
  detailsStack.classList.add('visible');
  openingScreen.classList.add('details-ready');
}

sealButton.addEventListener('click', runSequence);

houseFeature.addEventListener('click', () => {
  photoModal.classList.add('visible');
  photoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
});

function hideModal() {
  photoModal.classList.remove('visible');
  photoModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

photoModalBackdrop.addEventListener('click', hideModal);
closePhotoModal.addEventListener('click', hideModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') hideModal();
});
