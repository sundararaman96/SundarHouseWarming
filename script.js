const $=s=>document.querySelector(s);
const opening=$("#opening"), seal=$("#sealButton"), cinema=$("#cinema"), mail=$("#mailScene"), card=$("#invitationCard");
const eventView=$("#eventView"), kuralView=$("#kuralView"), bibleView=$("#bibleView"), combined=$("#blessingCombined");
const settled=$("#settledFlow"), houseZone=settled.querySelector(".house-zone"), housePhoto=$("#housePhotoButton"), thumb=$("#houseThumb"), mainInvite=$("#mainInvite");
let started=false;
const later=(ms,fn)=>setTimeout(fn,ms);
function showOnly(view){[eventView,kuralView,bibleView,combined].forEach(v=>v.classList.remove("active"));view.classList.add("active")}
function confetti(){const box=$("#confetti"),c=["#c59635","#8d1828","#2f6847","#efdca4"];for(let i=0;i<54;i++){const p=document.createElement("i");p.className="confetti-piece";p.style.left=(Math.random()*100)+"%";p.style.background=c[i%c.length];p.style.setProperty("--duration",(2.8+Math.random()*2.8)+"s");p.style.setProperty("--drift",(Math.random()*180-90)+"px");p.style.animationDelay=(Math.random()*.45)+"s";box.appendChild(p);setTimeout(()=>p.remove(),6200)}}
function openInvitation(){if(started)return;started=true;seal.disabled=true;seal.classList.add("fading");later(470,()=>{opening.classList.add("hide");document.body.classList.add("open");confetti();mail.classList.add("open")});later(900,()=>showOnly(eventView));later(3200,()=>showOnly(kuralView));later(5400,()=>showOnly(bibleView));later(7900,()=>showOnly(combined));later(9800,()=>card.classList.add("compacting"));later(10600,()=>{cinema.classList.add("settled");document.body.classList.remove("locked");window.scrollTo({top:0,behavior:"smooth"})});later(13200,()=>houseZone.classList.add("collapsed"));later(14050,()=>mainInvite.classList.add("show"))}
seal.addEventListener("click",openInvitation);
const modal=$("#houseModal"),close=$("#modalClose");
function openHouse(){modal.classList.add("open");modal.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";close.focus()}
function closeHouse(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true");document.body.style.overflow=""}
housePhoto.addEventListener("click",openHouse);thumb.addEventListener("click",openHouse);close.addEventListener("click",closeHouse);modal.addEventListener("click",e=>{if(e.target===modal)closeHouse()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))closeHouse()});
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add("visible")})},{threshold:.14});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
$("#shareButton").addEventListener("click",async()=>{const data={title:"Sundar & Family — House Warming",text:"You're invited to our House Warming on Friday, 2 October 2026 at 6:00 PM.",url:location.href};if(navigator.share){try{await navigator.share(data)}catch(e){}}else{try{await navigator.clipboard.writeText(location.href);alert("Invitation link copied.")}catch(e){alert(location.href)}}});
