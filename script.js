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
const AUTOPLAY_MS = 9000; // Main slides cycle every 9 seconds

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
  // Set a minimum width and height for the canvas to prevent negative radius
  const minSize = 80; // You can adjust this value as needed
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(rect.width, minSize);
  const height = Math.max(rect.height, minSize);
  canvas.width = width * DPR;
  canvas.height = height * DPR;
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

  // Ensure canvas is always large enough for a donut chart
  const minSize = 120;
  const w = Math.max(width, minSize);
  const h = Math.max(height, minSize);

  // Donut chart dimensions
  const cx = w / 2;
  const cy = h / 2;
  const outerRadius = Math.max(22, Math.min(w, h) / 2 - 10); // Always >= lineWidth
  const innerRadius = Math.max(1, outerRadius * 0.65); // Always positive

  // Colors (keep existing palette)
  const colors = ["#7c5cff", "#22d1ee", "#ff7ad9", "#5eead4"];
  const total = slices.reduce((a, b) => a + b, 0);

  animate(1000, (t) => {
    clearCanvas(ctx);

    // Draw donut slices
    let startAngle = -Math.PI / 2;
    slices.forEach((value, i) => {
      const sliceAngle = (value / total) * Math.PI * 2 * t;
      if (sliceAngle > 0) {
        ctx.beginPath();
        ctx.arc(
          cx,
          cy,
          outerRadius,
          startAngle,
          startAngle + sliceAngle,
          false
        );
        ctx.arc(cx, cy, innerRadius, startAngle + sliceAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = 0.92;
        ctx.fill();
      }
      startAngle += sliceAngle;
    });

    // Draw inner shadow for glass effect
    ctx.save();
    ctx.globalAlpha = 0.13;
    ctx.beginPath();
    ctx.arc(cx, cy, innerRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();

    // Optional: Draw a subtle border around the donut
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#22263a";
    ctx.stroke();
    ctx.restore();
  });
}

// Chart cycling for Analytics/Reports slide with header update
const chartTypes = [
  {
    type: "line",
    title: "Monthly Analytics",
    chip: "+18%",
    meta: "Line chart — user activity breakdown",
  },
  {
    type: "bar",
    title: "Monthly Analytics",
    chip: "+18%",
    meta: "Bar chart — user activity breakdown",
  },
  {
    type: "donut",
    title: "Monthly Analytics",
    chip: "+18%",
    meta: "Donut chart — user activity breakdown",
  },
];
let chartCycleIndex = 0;
let chartCycleTimer = null;

function cycleAnalyticsChart(slideEl, canvas) {
  clearInterval(chartCycleTimer);
  function showChart() {
    const chartInfo = chartTypes[chartCycleIndex % chartTypes.length];
    canvas.dataset.type = chartInfo.type;
    // Update chart header
    const chartTitle = slideEl.querySelector(".chart-title strong");
    const chartChip = slideEl.querySelector(".chart-title .chip");
    const chartMeta = slideEl.querySelector(".chart-meta");
    if (chartTitle) chartTitle.textContent = chartInfo.title;
    if (chartChip) chartChip.textContent = chartInfo.chip;
    if (chartMeta) chartMeta.textContent = chartInfo.meta;

    if (chartInfo.type === "line") {
      drawLineChart(canvas, canvas.dataset.points.split(",").map(Number));
    } else if (chartInfo.type === "bar") {
      drawBarChart(canvas, canvas.dataset.bars.split(",").map(Number));
    } else if (chartInfo.type === "donut") {
      drawDonutChart(canvas, canvas.dataset.slices.split(",").map(Number));
    }
    chartCycleIndex++;
  }
  showChart();
  chartCycleTimer = setInterval(showChart, 3000); // Chart slides cycle every 3 seconds
}

// Custom animation for Website slide
function animateWebsiteLaunch(canvas) {
  const ctx = setupCanvas(canvas);
  const { width, height } = canvas.getBoundingClientRect();

  const pageW = Math.max(80, width * 0.32);
  const pageH = Math.max(60, height * 0.45);
  const gap = 24;
  const pages = [
    { color: "#7c5cff" },
    { color: "#22d1ee" },
    { color: "#ff7ad9" },
  ];

  let start = null;
  function frame(now) {
    if (!start) start = now;
    const elapsed = (now - start) / 1000; // seconds
    const rotation = elapsed * Math.PI * 0.5; // adjust speed as needed

    clearCanvas(ctx);

    // Draw each page with a rotation effect
    pages.forEach((page, i) => {
      const angle = rotation + i * ((2 * Math.PI) / pages.length);
      const radius = pageW + gap;
      const x = width / 2 + Math.cos(angle) * radius;
      const y = height / 2 + Math.sin(angle) * 18;
      const scale = 0.7 + 0.3 * (1 + Math.sin(angle));

      ctx.save();
      ctx.globalAlpha = 0.88 * scale;
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = page.color;
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-pageW / 2, -pageH / 2, pageW, pageH, 18);
      ctx.fill();
      ctx.stroke();

      // Simulate page content with lines
      ctx.globalAlpha = 0.18 * scale;
      ctx.fillStyle = "#fff";
      for (let l = 0; l < 5; l++) {
        ctx.fillRect(-pageW / 2 + 18, -pageH / 2 + 18 + l * 16, pageW - 36, 7);
      }
      ctx.restore();
    });

    // Draw a browser bar above the pages
    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = "#181c2a";
    ctx.strokeStyle = "#22263a";
    ctx.lineWidth = 2;
    const barW = pageW * 3 + gap;
    const barH = 28;
    ctx.beginPath();
    ctx.roundRect(
      width / 2 - barW / 2,
      height / 2 - pageH / 2 - barH - 8,
      barW,
      barH,
      12
    );
    ctx.fill();
    ctx.stroke();

    // Browser "buttons"
    ctx.globalAlpha = 0.45;
    ["#ff7ad9", "#22d1ee", "#7c5cff"].forEach((c, i) => {
      ctx.beginPath();
      ctx.arc(
        width / 2 - barW / 2 + 18 + i * 18,
        height / 2 - pageH / 2 - barH / 2 - 8,
        6,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = c;
      ctx.fill();
    });
    ctx.restore();

    // Title text
    ctx.globalAlpha = 1;
    ctx.font = "bold 28px sans-serif";
    // Detect theme and set fillStyle accordingly
    const isLight = document.documentElement.classList.contains("light");
    ctx.fillStyle = isLight ? "#181c2a" : "#fff"; // dark text for light mode, white for dark mode
    ctx.textAlign = "center";
    ctx.fillText("Multi-page Website", width / 2, height / 2 + pageH / 2 + 80);

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// Declare these at the top level, outside any function
let shrink = 1;
let shrinkActive = false;
let shrinkStart = 0;
let shrinkDelayStarted = false;
let shrinkDelayStart = 0;

// Custom animation for Login/Permissions slide
function animateLockRoles(canvas) {
  const ctx = setupCanvas(canvas);
  const { width, height } = canvas.getBoundingClientRect();
  const inputW = 180,
    inputH = 32;
  const centerX = width / 2,
    centerY = height / 2;
  const username = "Admin";
  const password = "••••••••";
  const boxHeight = 170;

  animate(1200, (t) => {
    clearCanvas(ctx);

    // Draw login box
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = "#181c2a";
    ctx.strokeStyle = "#7c5cff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(
      centerX - inputW / 2 - 16,
      centerY - 70,
      inputW + 32,
      boxHeight,
      16
    );
    ctx.fill();
    ctx.stroke();

    // Username label
    ctx.globalAlpha = 1;
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";
    ctx.fillText("Username", centerX - inputW / 2, centerY - 42);

    // Username input
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "#22263a";
    ctx.strokeStyle = "#22d1ee";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(centerX - inputW / 2, centerY - 30, inputW, inputH, 8);
    ctx.fill();
    ctx.stroke();

    // Animate typing username first, then password
    ctx.globalAlpha = 1;
    ctx.font = "16px monospace";
    ctx.fillStyle = "#7c5cff";
    let usernameChars = Math.floor(username.length * Math.min(1, t * 2));
    ctx.fillText(
      username.slice(0, usernameChars),
      centerX - inputW / 2 + 12,
      centerY - 8
    );

    // Password label
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.fillText("Password", centerX - inputW / 2, centerY + 22);

    // Password input
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "#22263a";
    ctx.strokeStyle = "#ff7ad9";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(centerX - inputW / 2, centerY + 34, inputW, inputH, 8);
    ctx.fill();
    ctx.stroke();

    // Password value (animated typing after username is done)
    ctx.globalAlpha = 1;
    ctx.font = "16px monospace";
    ctx.fillStyle = "#ff7ad9";
    let passwordChars = 0;
    if (t > 0.5) {
      passwordChars = Math.floor(password.length * (t - 0.5) * 2);
    }
    ctx.fillText(
      password.slice(0, passwordChars),
      centerX - inputW / 2 + 12,
      centerY + 56
    );

    // Draw login button (always normal size)
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.translate(centerX, centerY + 96);
    ctx.fillStyle = "#22d1ee";
    ctx.beginPath();
    ctx.roundRect(-48, -16, 96, 32, 8);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("Login", 0, 6);
    ctx.restore();

    // Draw cursor LAST so it's above the button and click effect
    if (t > 0.7) {
      const cursorStartX = centerX + inputW / 2 + 40;
      const cursorStartY = centerY + 56;
      const cursorEndX = centerX;
      const cursorEndY = centerY + 96;
      const cursorProgress = Math.min(1, (t - 0.7) / 0.3);
      const curX = cursorStartX + (cursorEndX - cursorStartX) * cursorProgress;
      const curY = cursorStartY + (cursorEndY - cursorStartY) * cursorProgress;

      ctx.save();
      ctx.globalAlpha = 1;
      ctx.shadowColor = "rgba(0,0,0,0.15)";
      ctx.shadowBlur = 6;
      ctx.translate(curX, curY); // Move origin to cursor tip
      ctx.scale(0.8, 0.8); // Scale down to 80%
      // Draw white background triangle (slightly larger)
      ctx.beginPath();
      ctx.moveTo(-2, -6); // tip
      ctx.lineTo(28, 34); // bottom right
      ctx.lineTo(12, 34); // bottom middle
      ctx.lineTo(-2, 44); // bottom left
      ctx.closePath();
      ctx.fillStyle = "#fff";
      ctx.fill();
      // Draw black triangle cursor on top
      ctx.beginPath();
      ctx.moveTo(0, 0); // tip
      ctx.lineTo(24, 32); // bottom right
      ctx.lineTo(10, 32); // bottom middle
      ctx.lineTo(0, 40); // bottom left
      ctx.closePath();
      ctx.fillStyle = "#111";
      ctx.fill();
      ctx.restore();
    }
  });
}

// Play chart or custom animation based on slide
function playChart(slideEl) {
  const canvas = slideEl.querySelector("canvas.chart");
  if (!canvas) return;
  const slideIndex = Array.from(slideEl.parentNode.children).indexOf(slideEl);

  // Analytics/Reports slide (slide 2)
  if (slideIndex === 1) {
    cycleAnalyticsChart(slideEl, canvas);
    return;
  }
  clearInterval(chartCycleTimer);

  // Website slide (slide 1)
  if (slideIndex === 0) {
    animateWebsiteLaunch(canvas);
    // Optionally update header for this slide
    const chartTitle = slideEl.querySelector(".chart-title strong");
    const chartChip = slideEl.querySelector(".chart-title .chip");
    const chartMeta = slideEl.querySelector(".chart-meta");
    if (chartTitle) chartTitle.textContent = "Website Launches";
    if (chartChip) chartChip.textContent = "Live";
    if (chartMeta)
      chartMeta.textContent =
        "Single or multi-page websites like this one in as little as 2-3days";
    return;
  }

  // Login/Permissions slide (slide 3)
  if (slideIndex === 2) {
    animateLockRoles(canvas);
    // Optionally update header for this slide
    const chartTitle = slideEl.querySelector(".chart-title strong");
    const chartChip = slideEl.querySelector(".chart-title .chip");
    const chartMeta = slideEl.querySelector(".chart-meta");
    if (chartTitle) chartTitle.textContent = "User Roles";
    if (chartChip) chartChip.textContent = "Set Permissions";
    if (chartMeta)
      chartMeta.textContent =
        "Set roles for staff (Admins, Sales, Support etc), with varying permissions.";
    return;
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

// Theme toggle logic
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");

  // Load theme from localStorage
  let theme = localStorage.getItem("theme") || "dark";
  if (theme === "light") {
    root.classList.add("light");
    body.classList.add("light");
  }

  toggleBtn.addEventListener("click", () => {
    if (root.classList.contains("light")) {
      root.classList.remove("light");
      body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light");
      body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  });
});

// Theme toggle logic for switch
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const body = document.body;
  const themeSwitch = document.getElementById("themeSwitch");
  const themeKnob = document.getElementById("themeKnob");
  const themeBar = themeKnob.parentElement;

  // Load theme from localStorage
  let theme = localStorage.getItem("theme") || "dark";
  if (theme === "light") {
    root.classList.add("light");
    body.classList.add("light");
    themeSwitch.checked = true;
    themeBar.style.background = "#22d1ee";
    themeKnob.style.left = "20px";
  } else {
    themeSwitch.checked = false;
    themeBar.style.background = "#888";
    themeKnob.style.left = "2px";
  }

  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      root.classList.add("light");
      body.classList.add("light");
      themeBar.style.background = "#22d1ee";
      themeKnob.style.left = "20px";
      localStorage.setItem("theme", "light");
    } else {
      root.classList.remove("light");
      body.classList.remove("light");
      themeBar.style.background = "#888";
      themeKnob.style.left = "2px";
      localStorage.setItem("theme", "dark");
    }
  });

  // Mobile toggle logic
  const themeSwitchMobile = document.getElementById("themeSwitchMobile");
  const themeKnobMobile = document.getElementById("themeKnobMobile");
  const themeBarMobile = themeKnobMobile ? themeKnobMobile.parentElement : null;

  // Sync initial state
  let themeMobile = localStorage.getItem("theme") || "dark";
  if (themeSwitchMobile && themeKnobMobile && themeBarMobile) {
    if (themeMobile === "light") {
      themeSwitchMobile.checked = true;
      themeBarMobile.style.background = "#22d1ee";
      themeKnobMobile.style.left = "20px";
    } else {
      themeSwitchMobile.checked = false;
      themeBarMobile.style.background = "#888";
      themeKnobMobile.style.left = "2px";
    }

    themeSwitchMobile.addEventListener("change", () => {
      if (themeSwitchMobile.checked) {
        document.documentElement.classList.add("light");
        document.body.classList.add("light");
        themeBarMobile.style.background = "#22d1ee";
        themeKnobMobile.style.left = "20px";
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.remove("light");
        document.body.classList.remove("light");
        themeBarMobile.style.background = "#888";
        themeKnobMobile.style.left = "2px";
        localStorage.setItem("theme", "dark");
      }
      // Sync desktop toggle if present
      const themeSwitch = document.getElementById("themeSwitch");
      if (themeSwitch) themeSwitch.checked = themeSwitchMobile.checked;
    });
  }
});

// script.js
document.addEventListener("DOMContentLoaded", () => {
  const announcementBar = document.getElementById("announcementBar");
  const closeBtn = document.getElementById("closeAnnouncement");
  let closed = localStorage.getItem("announcementClosed") === "true";
  let hoverActive = false;

  function setAnnouncementSpace(visible) {
    document.body.classList.toggle("announcement-visible", visible);
  }

  // Show bar on load unless previously closed
  if (closed) {
    announcementBar.style.display = "none";
    setAnnouncementSpace(false);
  } else {
    announcementBar.style.display = "flex";
    setAnnouncementSpace(true);
  }

  closeBtn?.addEventListener("click", () => {
    announcementBar.style.display = "none";
    localStorage.setItem("announcementClosed", "true");
    closed = true;
    setAnnouncementSpace(false);
  });

  document.addEventListener("mousemove", (e) => {
    if (closed) {
      if (e.clientY < 40 && !hoverActive) {
        announcementBar.style.display = "flex";
        hoverActive = true;
        setAnnouncementSpace(true);
      } else if (e.clientY >= 40 && hoverActive) {
        announcementBar.style.display = "none";
        hoverActive = false;
        setAnnouncementSpace(false);
      }
    }
  });
});
