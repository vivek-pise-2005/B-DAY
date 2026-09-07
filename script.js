/* ============================================================
   OUR STORY — behavior
   ============================================================ */

document.title = `Our Story — ${STORY.herName}`;
document.querySelector("footer").innerHTML = `made with love, for ${STORY.herName}`;

/* ---------- Ambient particle background ---------- */
(function particles() {
  const canvas = document.getElementById("bg-particles");
  const ctx = canvas.getContext("2d");
  let w, h, points;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 18000));
  points = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.4 + 0.3,
    vy: Math.random() * 0.12 + 0.02,
    tw: Math.random() * Math.PI * 2
  }));

  function frame() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#c9a66b";
    points.forEach(p => {
      p.tw += 0.02;
      const alpha = 0.25 + Math.abs(Math.sin(p.tw)) * 0.4;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y -= p.vy;
      if (p.y < -5) p.y = h + 5;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ---------- Intro sequence ---------- */
(function intro() {
  const kicker = document.getElementById("intro-kicker");
  const l1 = document.getElementById("intro-line1");
  const l2 = document.getElementById("intro-line2");
  const nameEl = document.getElementById("her-name-reveal");
  const enterBtn = document.getElementById("enter-btn");

  l1.textContent = STORY.heroLine1;
  l2.textContent = STORY.heroLine2;
  enterBtn.textContent = STORY.heroButton;

  const tl = gsap.timeline({ delay: 0.3 });
  tl.to(kicker, { opacity: 1, duration: 1 })
    .to(l1, { opacity: 1, duration: 1 }, "+=0.2")
    .to(l2, { opacity: 1, duration: 1 }, "+=0.3")
    .call(() => typeName())
    .to(enterBtn, { opacity: 1, duration: 0.8 }, "+=1.6");

  function typeName() {
    nameEl.style.opacity = 1;
    const name = STORY.nickname || STORY.herName;
    let i = 0;
    nameEl.innerHTML = `<span id="name-typed"></span><span class="cursor"></span>`;
    const target = document.getElementById("name-typed");
    const iv = setInterval(() => {
      target.textContent += name[i];
      i++;
      if (i >= name.length) clearInterval(iv);
    }, 110);
  }

  enterBtn.addEventListener("click", () => {
    document.getElementById("intro").classList.add("hidden");
    document.body.classList.remove("locked");
    document.body.style.overflow = "";
    revealObserver.init();
  });
})();

/* ---------- Scroll reveal ---------- */
const revealObserver = {
  init() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("in-view");
      });
    }, { threshold: 0.2 });
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));

    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("active");
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".timeline-item").forEach(el => io2.observe(el));
  }
};

/* ---------- Countdown ----------
   PREVIEW MODE: add ?preview=bday to the URL (or press the "M" key
   on the page) to instantly see the birthday-finale state without
   waiting for the real date. Remove this block before sending the
   final link if you don't want that shortcut available to her. */
(function countdown() {
  const target = new Date(STORY.birthday + "T00:00:00");
  const days = document.getElementById("cd-days");
  const hours = document.getElementById("cd-hours");
  const mins = document.getElementById("cd-mins");
  const secs = document.getElementById("cd-secs");

  let fired = false;
  const urlPreview = new URLSearchParams(window.location.search).get("preview") === "bday";

  document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "m" && !fired) {
      fired = true;
      triggerBirthdayMode();
    }
  });

  function tick() {
    if (urlPreview && !fired) {
      fired = true;
      triggerBirthdayMode();
      return;
    }
    const now = new Date();
    let diff = target - now;

    if (diff <= 0) {
      if (!fired) {
        fired = true;
        triggerBirthdayMode();
      }
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    days.textContent = String(d).padStart(2, "0");
    hours.textContent = String(h).padStart(2, "0");
    mins.textContent = String(m).padStart(2, "0");
    secs.textContent = String(s).padStart(2, "0");
  }

  function triggerBirthdayMode() {
    document.getElementById("countdown-scene").classList.add("finale");
    document.getElementById("finale-headline").textContent = STORY.birthdayHeadline;
    document.getElementById("finale-sub").textContent = STORY.birthdaySub;
    burst();
    unlockContent();
  }

  tick();
  setInterval(tick, 1000);
})();

/* ---------- Unlock the rest of the site once it's her birthday ---------- */
function unlockContent() {
  const locked = document.getElementById("locked-content");
  if (locked.classList.contains("unlocked")) return; // already unlocked
  locked.classList.add("unlocked");

  const heroImg = document.getElementById("hero-photo-img");
  const heroTitle = document.getElementById("hero-photo-title");
  if (STORY.heroPhoto) heroImg.src = STORY.heroPhoto;
  heroTitle.textContent = `Today is all about you, ${STORY.nickname || STORY.herName}.`;

  // Make sure the reveal observer is watching the newly-visible content
  if (typeof revealObserver !== "undefined") revealObserver.init();
}

/* ---------- Gallery + lightbox ---------- */
(function gallery() {
  const grid = document.getElementById("gallery-grid");
  grid.innerHTML = STORY.memories.map((m, i) => `
    <div class="gallery-item" data-i="${i}">
      <img src="${m.image}" alt="" loading="lazy">
      ${m.caption ? `<div class="gallery-caption">${m.caption}</div>` : ""}
    </div>
  `).join("");

  const strip = document.getElementById("keepsake-strip");
  strip.innerHTML = (STORY.keepsakes || []).map(src => `<img src="${src}" alt="" loading="lazy">`).join("");

  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCap = document.getElementById("lightbox-caption");

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item) return;
    const m = STORY.memories[+item.dataset.i];
    lbImg.src = m.image;
    lbCap.textContent = m.caption || "";
    lightbox.classList.add("open");
  });

  document.getElementById("lightbox-close").addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("open"); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lightbox.classList.remove("open"); });
})();

/* ---------- Love letter ---------- */
(function letter() {
  const wrap = document.getElementById("envelope-wrap");
  const paper = document.getElementById("letter-paper");
  const textEl = document.getElementById("letter-text");
  let opened = false;

  wrap.addEventListener("click", () => {
    if (opened) return;
    opened = true;
    wrap.style.display = "none";
    paper.classList.add("open");
    typeLetter();
  });

  function typeLetter() {
    const text = STORY.loveLetter;
    let i = 0;
    textEl.innerHTML = `<span id="letter-typed"></span><span class="letter-cursor"></span>`;
    const target = document.getElementById("letter-typed");
    const iv = setInterval(() => {
      target.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(iv);
        document.querySelector(".letter-cursor")?.remove();
      }
    }, 18);
  }
})();

/* ---------- Reasons ---------- */
(function reasons() {
  const grid = document.getElementById("reasons-grid");
  grid.innerHTML = STORY.reasons.map((r, i) => `
    <div class="reason-card">
      <div class="reason-inner">
        <div class="reason-face reason-front"><span>${String(i + 1).padStart(2, "0")} — tap</span></div>
        <div class="reason-face reason-back"><p>${r}</p></div>
      </div>
    </div>
  `).join("");

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".reason-card");
    if (card) card.classList.toggle("flipped");
  });
})();

/* ---------- Secret message ---------- */
(function secret() {
  document.getElementById("secret-hint-text").textContent = STORY.secretHint;
  document.getElementById("secret-message-text").textContent = STORY.secretMessage;

  const form = document.getElementById("secret-form");
  const input = document.getElementById("secret-input");
  const error = document.getElementById("secret-error");
  const unlocked = document.getElementById("secret-unlocked");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = input.value.trim().toLowerCase();
    if (val === STORY.secretPassword.trim().toLowerCase()) {
      form.style.display = "none";
      document.querySelector(".secret-hint").style.display = "none";
      error.textContent = "";
      unlocked.classList.add("open");
      burstSmall();
    } else {
      error.textContent = "Not quite — try again.";
    }
  });
})();

/* ---------- Future list ---------- */
(function futureList() {
  const list = document.getElementById("future-list");
  list.innerHTML = STORY.futureList.map(item => `
    <li><div class="future-check"></div><span class="label">${item}</span></li>
  `).join("");

  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    li.classList.toggle("checked");
  });
})();

/* ---------- Finale ---------- */
(function finale() {
  document.getElementById("finale-name").textContent = STORY.herName;
  document.getElementById("finale-btn").addEventListener("click", () => {
    burst();
    setTimeout(burst, 400);
    setTimeout(burst, 800);
  });
})();

/* ---------- Confetti / fireworks helpers ---------- */
function burst() {
  if (typeof confetti !== "function") return;
  const colors = ["#c9a66b", "#d98fa0", "#5c1a2b", "#f3ece4"];
  confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
  setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0 }, colors }), 200);
  setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1 }, colors }), 350);
}

function burstSmall() {
  if (typeof confetti !== "function") return;
  confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 }, colors: ["#c9a66b", "#d98fa0"] });
}
