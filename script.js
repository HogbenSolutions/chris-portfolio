// Mobile nav
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
menuBtn?.addEventListener("click", () => {
  drawer.classList.toggle("open");
  menuBtn.classList.toggle("open");
});

// Fade header on scroll with delay
(() => {
  const header = document.querySelector("header");
  let faded = false;
  let timeout = null;
  let lastScrollY = window.scrollY;

  function fadeHeader() {
    if (!faded && window.scrollY > 20) {
      header.style.transition = "opacity 0.4s";
      timeout = setTimeout(() => {
        header.style.opacity = "0";
        faded = true;
      }, 120);
    }
    if (window.scrollY <= 20) {
      header.style.opacity = "1";
      faded = false;
      clearTimeout(timeout);
    }
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          fadeHeader();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  header.addEventListener("mouseenter", () => {
    header.style.opacity = "1";
  });
  header.addEventListener("mouseleave", () => {
    if (window.scrollY > 20) {
      header.style.opacity = "0";
      faded = true;
    }
  });
})();

// Slider logic
const slides = Array.from(document.querySelectorAll(".slide"));
const dotsWrap = document.getElementById("dots");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let index = 0;
let autoTimer = null;
const AUTOPLAY_MS = 6500;

function mountDots() {
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "dot-btn" + (i === index ? " active" : "");
    b.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(b);
  });
}

function goTo(i) {
  slides[index].classList.remove("active");
  index = (i + slides.length) % slides.length;
  slides[index].classList.add("active");
  updateDots();
  playChart(slides[index]);
  restartAutoplay();
}

function updateDots() {
  const dotBtns = dotsWrap.querySelectorAll(".dot-btn");
  dotBtns.forEach((d, i) => d.classList.toggle("active", i === index));
}
function next() {
  goTo(index + 1);
}
function prev() {
  goTo(index - 1);
}

nextBtn?.addEventListener("click", next);
prevBtn?.addEventListener("click", prev);

function startAutoplay() {
  stopAutoplay();
  autoTimer = setInterval(next, AUTOPLAY_MS);
}
function stopAutoplay() {
  if (autoTimer) clearInterval(autoTimer);
}
function restartAutoplay() {
  startAutoplay();
}

const slider = document.querySelector(".slider");
slider?.addEventListener("mouseenter", stopAutoplay);
slider?.addEventListener("mouseleave", startAutoplay);

// Keyboard + Touch
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});
let touchStartX = 0;
slider?.addEventListener(
  "touchstart",
  (e) => (touchStartX = e.touches[0].clientX),
  {
    passive: true,
  }
);
slider?.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
});

// Simple Canvas Charts
const DPR = Math.min(2, window.devicePixelRatio || 1);
function setupCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * DPR;
  canvas.height = rect.height * DPR;
  const ctx = canvas.getContext("2d");
  ctx.scale(DPR, DPR);
  return ctx;
}
function animate(duration, draw) {
  const start = performance.now();
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    draw(t);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
function clearCanvas(ctx) {
  const c = ctx.canvas;
  ctx.clearRect(0, 0, c.width, c.height);
}

function drawLineChart(canvas, points) {
  const ctx = setupCanvas(canvas);
  const { width, height } = canvas.getBoundingClientRect();
  const pad = 20;
  const h = height - pad * 2;
  const w = width - pad * 2;
  const max = Math.max(...points) * 1.1;
  animate(900, (t) => {
    clearCanvas(ctx);
    ctx.globalAlpha = 0.9;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    for (let i = 0; i < 5; i++) {
      const y = pad + (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(pad + w, y);
      ctx.stroke();
    }
    ctx.beginPath();
    points.forEach((v, i) => {
      const x = pad + (w / (points.length - 1)) * i;
      const y = pad + h - h * (v / max) * t;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    });
    const grad = ctx.createLinearGradient(pad, 0, pad + w, 0);
    grad.addColorStop(0, "#7c5cff");
    grad.addColorStop(1, "#22d1ee");
    ctx.strokeStyle = grad;
    ctx.stroke();
    points.forEach((v, i) => {
      const x = pad + (w / (points.length - 1)) * i;
      const y = pad + h - h * (v / max) * t;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
    });
  });
}

function drawBarChart(canvas, bars) {
  const ctx = setupCanvas(canvas);
  const { width, height } = canvas.getBoundingClientRect();
  const pad = 20;
  const h = height - pad * 2;
  const w = width - pad * 2;
  const max = Math.max(...bars) * 1.2;
  const gap = 12;
  const bw = (w - gap * (bars.length - 1)) / bars.length;
  animate(900, (t) => {
    clearCanvas(ctx);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      const y = pad + (h / 4) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(pad + w, y);
      ctx.stroke();
    }
    bars.forEach((v, i) => {
      const x = pad + i * (bw + gap);
      const by =
        pad +
        h -
        h * (v / max) * Math.min(1, t * 1.1 * (0.6 + i / bars.length));
      const bh = pad + h - by;
      const grad = ctx.createLinearGradient(0, by, 0, by + bh);
      grad.addColorStop(0, "#22d1ee");
      grad.addColorStop(1, "#7c5cff");
      ctx.fillStyle = grad;
      ctx.fillRect(x, by, bw, bh);
      ctx.fillStyle = "rgba(255,255,255,.10)";
      ctx.fillRect(x + bw * 0.7, by, bw * 0.3, bh);
    });
  });
}

function drawDonutChart(canvas, slices) {
  const ctx = setupCanvas(canvas);
  const { width, height } = canvas.getBoundingClientRect();
  const r = Math.min(width, height) / 2 - 18;
  const cx = width / 2;
  const cy = height / 2 + 10;
  const total = slices.reduce((a, b) => a + b, 0);
  const colors = ["#7c5cff", "#22d1ee", "#ff7ad9", "#5eead4"];
  animate(1000, (t) => {
    clearCanvas(ctx);
    let start = -Math.PI / 2;
    slices.forEach((v, i) => {
      const angle = (v / total) * Math.PI * 2 * t;
      ctx.beginPath();
      ctx.arc(cx, cy, r, start, start + angle);
      ctx.lineWidth = 22;
      ctx.strokeStyle = colors[i % colors.length];
      ctx.stroke();
      start += angle;
    });
    ctx.fillStyle = "rgba(255,255,255,.08)";
    ctx.beginPath();
    ctx.arc(cx, cy, r - 18, 0, Math.PI * 2);
    ctx.fill();
  });
}

function playChart(slideEl) {
  const canvas = slideEl.querySelector("canvas.chart");
  if (!canvas) return;
  const type = canvas.dataset.type;
  if (type === "line") {
    drawLineChart(canvas, canvas.dataset.points.split(",").map(Number));
  } else if (type === "bar") {
    drawBarChart(canvas, canvas.dataset.bars.split(",").map(Number));
  } else if (type === "donut") {
    drawDonutChart(canvas, canvas.dataset.slices.split(",").map(Number));
  }
}

// Initialize
if (slides.length) {
  mountDots();
  playChart(slides[0]);
  startAutoplay();
}

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Skill bars
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const p = e.target.querySelector(".progress > i");
        const v = e.target.querySelector(".progress").dataset.value;
        p.style.transition = "width 1.2s ease";
        p.style.width = v + "%";
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll(".skill").forEach((el) => skillObserver.observe(el));

// Resize canvas on window resize
let resizeT;
window.addEventListener("resize", () => {
  clearTimeout(resizeT);
  resizeT = setTimeout(() => playChart(slides[index]), 200);
});

// Scroll spy for nav
const navLinks = [...document.querySelectorAll("#desktopLinks a")].filter(
  (a) => !a.classList.contains("btn")
);
const sections = navLinks.map((a) =>
  document.querySelector(a.getAttribute("href"))
);
function onScroll() {
  const y = window.scrollY + 120;
  let active = 0;
  sections.forEach((sec, i) => {
    if (sec && sec.offsetTop <= y) active = i;
  });
  navLinks.forEach((a, i) => a.classList.toggle("active", i === active));
}
window.addEventListener("scroll", () => {
  window.requestAnimationFrame(onScroll);
});
onScroll();

// Hide "Start a Project" button when in #contact section
(function () {
  const ctaBtn = document.querySelector(".sticky-cta");
  const contactSection = document.getElementById("contact");
  if (!ctaBtn || !contactSection) return;

  function toggleCTA() {
    const rect = contactSection.getBoundingClientRect();
    // If top of contact section is within viewport, hide button
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      ctaBtn.style.display = "none";
    } else {
      ctaBtn.style.display = "";
    }
  }

  window.addEventListener("scroll", toggleCTA, { passive: true });
  window.addEventListener("resize", toggleCTA);
  toggleCTA();
})();
