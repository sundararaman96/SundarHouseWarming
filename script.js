const RSVP="61478586537";
const seal=document.getElementById("seal"), env=document.getElementById("envelope"), cover=document.getElementById("cover"), stage=document.getElementById("introStage");
seal.onclick=()=>{
  seal.disabled=true;

  // 1) Seal fades with no blue tap square.
  seal.classList.add("seal-fade");

  // 2) Envelope opens.
  setTimeout(()=>env.classList.add("open"),430);

  // 3) Mail fades away.
  setTimeout(()=>cover.classList.add("fading"),1300);

  // 4) Celebration papers + blessing/verse appear.
  setTimeout(()=>{
    cover.classList.add("cover-open");
    document.body.classList.remove("locked");
    document.body.classList.add("invitation-visible");
    window.scrollTo({top:0,behavior:"auto"});
    confetti();
  },1850);

  // 5) Tamil praise + Joshua 24:15 shrink together to top.
  setTimeout(()=>stage.classList.add("ready"),4200);

  // 6) House appears at natural size, with no zoom.
  setTimeout(()=>stage.classList.add("house-visible"),5050);

  // 7) House changes to a small clickable thumbnail.
  setTimeout(()=>stage.classList.add("house-collapsed"),6900);

  // 8) House Warming invitation appears.
  setTimeout(()=>stage.classList.add("invite-visible"),7550);
};
function confetti(){let box=document.getElementById("confetti"),c=["#d5a541","#f2dd9e","#2f6a39","#b87322"];for(let i=0;i<100;i++){let x=document.createElement("i");x.className="conf";x.style.left=Math.random()*100+"vw";x.style.background=c[i%4];x.style.setProperty("--t",(2.7+Math.random()*3)+"s");x.style.setProperty("--x",(Math.random()*220-110)+"px");x.style.animationDelay=Math.random()*.6+"s";box.appendChild(x);setTimeout(()=>x.remove(),6500)}}
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("visible")),{threshold:.12});document.querySelectorAll(".reveal").forEach(x=>io.observe(x));
const target=new Date("2026-10-03T17:00:00+10:00").getTime();function tick(){let z=Math.max(0,target-Date.now()),v=[Math.floor(z/86400000),Math.floor(z/3600000)%24,Math.floor(z/60000)%60,Math.floor(z/1000)%60];["d","h","m","s"].forEach((id,i)=>document.getElementById(id).textContent=String(v[i]).padStart(2,"0"))}tick();setInterval(tick,1000);
document.getElementById("rsvp").onsubmit=e=>{e.preventDefault();let n=encodeURIComponent(document.getElementById("name").value),g=encodeURIComponent(document.getElementById("guests").value),m=encodeURIComponent(document.getElementById("msg").value);window.open(`https://wa.me/${RSVP}?text=House%20Warming%20RSVP%0AName:%20${n}%0AAttending:%20${g}%0AMessage:%20${m}`,"_blank")};
document.getElementById("share").onclick=async()=>{let x={title:"Sundar & Family — House Warming",text:"You're invited to our House Warming on 3 October 2026 at 5:00 PM.",url:location.href};if(navigator.share)try{await navigator.share(x)}catch(e){}else{await navigator.clipboard.writeText(location.href);alert("Invitation link copied.")}};
const houseThumb=document.getElementById("houseThumb");
const houseModal=document.getElementById("houseModal");
const modalClose=document.getElementById("modalClose");
houseThumb.addEventListener("click",()=>{
  houseModal.classList.add("open");
  houseModal.setAttribute("aria-hidden","false");
});
function closeHouse(){
  houseModal.classList.remove("open");
  houseModal.setAttribute("aria-hidden","true");
}
modalClose.addEventListener("click",closeHouse);
houseModal.addEventListener("click",e=>{if(e.target===houseModal)closeHouse()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeHouse()});
