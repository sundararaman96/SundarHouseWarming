const $ = (s) => document.querySelector(s);
const opening = $("#opening");
const canvas = $("#openingCanvas");
const seal = $("#sealButton");
const plate = $("#plateCard");
const eventView = $("#eventView");
const kuralView = $("#kuralView");
const bibleView = $("#bibleView");
const combinedView = $("#combinedView");
const dock = $("#blessingDock");
const houseSection = $("#houseSection");
const houseMedia = $("#houseMedia");
const mainInvite = $("#mainInvite");
let started = false;

const later = (ms, fn) => window.setTimeout(fn, ms);

function showOnly(view) {
  [eventView, kuralView, bibleView, combinedView].forEach((v) => v.classList.remove("active"));
  view.classList.add("active");
}

function confetti() {
  const box = $("#confetti");
  const colours = ["#c59635", "#8d1828", "#2f6847", "#efdca4"];
  for (let i = 0; i < 46; i++) {
    const p = document.createElement("i");
    p.className = "confetti-piece";
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = colours[i % colours.length];
    p.style.setProperty("--duration", `${2.7 + Math.random() * 2.5}s`);
    p.style.setProperty("--drift", `${Math.random() * 140 - 70}px`);
    p.style.animationDelay = `${Math.random() * 0.4}s`;
    box.appendChild(p);
    later(5800, () => p.remove());
  }
}

function openInvitation() {
  if (started) return;
  started = true;
  seal.disabled = true;

  // 1. Only the visible house seal fades.
  seal.classList.add("fading");

  // 2. Invitation rises out of the plate/envelope.
  later(420, () => {
    canvas.classList.add("card-rising");
    plate.classList.add("rise");
    showOnly(eventView);
    confetti();
  });
  later(1450, () => canvas.classList.add("card-cleared"));

  // 3. Thirukkural is visible for 3 seconds.
  later(3400, () => showOnly(kuralView));

  // 4. Isaiah is visible for 3 seconds.
  later(6400, () => showOnly(bibleView));

  // 5. Both are shown together, then the card shrinks to the top.
  later(9400, () => showOnly(combinedView));
  later(10150, () => plate.classList.add("shrink-top"));

  // 6. Cross-fade into the clean, collision-free app layout.
  later(11150, () => {
    document.body.classList.add("app-visible");
    dock.classList.add("show");
  });
  later(11650, () => {
    opening.classList.add("fade-away");
    document.body.classList.remove("locked");
    window.scrollTo({ top: 0, behavior: "auto" });
  });

  // 7. House image appears full size.
  later(12150, () => houseSection.classList.add("show"));

  // 8. The SAME house component shrinks in normal flow; it never overlays the verses.
  later(14650, () => houseSection.classList.add("collapsed"));

  // 9. Event information appears underneath only after the house has finished shrinking.
  later(15550, () => mainInvite.classList.add("show"));
}

seal.addEventListener("click", openInvitation);

/* Full-size house photo viewer */
const modal = $("#houseModal");
const close = $("#modalClose");
function openHouse() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeHouse() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
houseMedia.addEventListener("click", openHouse);
close.addEventListener("click", closeHouse);
modal.addEventListener("click", (e) => { if (e.target === modal) closeHouse(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeHouse(); });

/* Reveal lower sections naturally as guests scroll. */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* Share */
$("#shareButton").addEventListener("click", async () => {
  const data = {
    title: "Sundar & Family — House Warming",
    text: "You're invited to our House Warming on Friday, 2 October 2026 at 6:00 PM.",
    url: location.href
  };
  if (navigator.share) {
    try { await navigator.share(data); } catch (e) {}
  } else {
    try {
      await navigator.clipboard.writeText(location.href);
      alert("Invitation link copied.");
    } catch (e) {
      alert(location.href);
    }
  }
});
