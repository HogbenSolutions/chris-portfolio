:root {
  --bg: #080a12;
  --bg-2: #0d0f1c;
  --text: #eef2ff;
  --muted: #a8b0c4;
  --accent: #7c5cff;
  --accent-2: #22d1ee;
  --accent-3: #ff7ad9;
  --accent-4: #5eead4;
  --glass: rgba(255, 255, 255, 0.06);
  --card: rgba(255, 255, 255, 0.08);
  --border: rgba(255, 255, 255, 0.14);
  --shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  --radius: 22px;
  --radius-lg: 28px;
  --container: 1200px;
  --gap: clamp(16px, 2vw, 28px);
}

/* Light mode variables */
:root.light {
  --bg: #f7f8fa;
  --bg-2: #eef2ff;
  --text: #181c2a;
  --muted: #5a627a;
  --accent: #7c5cff;
  --accent-2: #22d1ee;
  --accent-3: #ff7ad9;
  --accent-4: #5eead4;
  --glass: rgba(0, 0, 0, 0.04);
  --card: rgba(0, 0, 0, 0.06);
  --border: rgba(0, 0, 0, 0.12);
  --shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

/* Light mode background override */
body.light {
  background: #f7f8fa;
}

/* Optional: Light mode for aurora effect */
body.light .aurora {
  opacity: 0.18;
  filter: blur(60px) brightness(1.2);
}

/* Optional: Light mode for chart cards, pills, etc. */
body.light .chart-card,
body.light .logo-pill,
body.light .chip,
body.light .trust-inner,
body.light .card,
body.light .skill {
  background: var(--glass);
  border-color: var(--border);
  color: var(--text);
}

body.light .chart-title .chip {
  background: rgba(124, 92, 255, 0.1);
  border-color: rgba(124, 92, 255, 0.22);
  color: #7c5cff;
}

body.light .arrow {
  background: var(--glass);
  border-color: var(--border);
  color: var(--text);
}

body.light .btn.accent {
  color: #fff;
}

* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
html {
  scroll-behavior: smooth;
}
body {
  margin: 0;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
    "Helvetica Neue", Arial;
  color: var(--text);
  background: #0c0e18;
  background-image: none !important;
  box-shadow: none !important;
  border: none !important;
}

/* animated aurora */
.aurora {
  position: fixed;
  inset: -20% -10% -10% -10%;
  pointer-events: none;
  z-index: 0;
  filter: blur(50px);
  opacity: 0.45;
}
.aurora::before,
.aurora::after {
  content: "";
  position: absolute;
  inset: 0;
  background: conic-gradient(
    from 0deg,
    rgba(124, 92, 255, 0.45),
    rgba(34, 209, 238, 0.45),
    rgba(255, 122, 217, 0.45),
    rgba(94, 234, 212, 0.45),
    rgba(124, 92, 255, 0.45)
  );
  animation: spin 24s linear infinite;
  /* mix-blend: screen; */
}
.aurora::after {
  animation-duration: 38s;
  animation-direction: reverse;
  opacity: 0.6;
}
@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

.container {
  width: min(100% - 2 * var(--gap), var(--container));
  margin-inline: auto;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  color: var(--text);
  text-decoration: none;
  font-weight: 700;
  box-shadow: var(--shadow);
  transition: transform 0.2s ease, filter 0.2s ease, border-color 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.28);
}
.btn.accent {
  background: linear-gradient(
    135deg,
    var(--accent),
    var(--accent-2),
    var(--accent-3)
  );
  border: none;
  color: #0b0d15;
}
.btn.ghost {
  background: var(--glass);
}
.chip {
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 12px;
  color: var(--muted);
  background: var(--glass);
}

#announcementBar {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0px;
  width: 100%;
  position: relative;
  border-bottom: 1px solid var(--border);
}

#announcementBar p {
  flex: 1;
  margin: 0;
  text-align: center;
  padding: 4px;
  background: var(--glass);
}

#closeAnnouncement {
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
  background: transparent !important;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  padding: 0 8px;
  z-index: 2;
}

/* header */
header {
  position: sticky;
  top: 0;
  z-index: 50;
  /* background: transparent !important; */
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--gap);
  padding: 12px 0px var(--gap);
  border-radius: 22px;
}

#desktopLinks {
  background: var(--glass);
  border-radius: 22px;
  border: 1px solid var(--border);
  transition: background 0.3s, opacity 0.4s;
  padding: 12px;
}
.brand {
  background: var(--glass);
  border-radius: 22px;
  border: 1px solid var(--border);
  transition: background 0.3s, opacity 0.4s;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 900;
  letter-spacing: 0.6px;
}
.logo {
  width: 39px;
  height: 39px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent-3), var(--accent-2));
  color: #0b0d15;
}
.links {
  display: flex;
  align-items: center;
  gap: 14px;
}
.links a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 700;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid transparent;
}
.links a:hover,
.links a.active {
  color: var(--text);
  border-color: var(--border);
  background: var(--glass);
}

/* hamburger with X animation */
.menu-toggle {
  display: none;
  width: calc(12px * 2 + 39px); /* Same as .brand: padding + logo width */
  height: 63px; /* Same as .brand: logo height + vertical padding */
  border-radius: 22px; /* Match .brand */
  border: 1px solid var(--border);
  background: var(--glass);
  color: var(--text);
  place-items: center;
  position: relative;
  transition: background 0.3s, opacity 0.4s;
  display: none; /* Only show on mobile */
}
.menu-toggle span {
  position: absolute;
  left: 12px;
  right: 12px;
  height: 4px; /* Thicker lines */
  background: #fff;
  border-radius: 2px;
  transition: 0.25s ease;
  top: 18px; /* Centralise the first line */
}
.menu-toggle span:nth-child(1) {
  top: 18px;
}
.menu-toggle span:nth-child(2) {
  top: 29px;
}
.menu-toggle span:nth-child(3) {
  top: 40px;
}
.menu-toggle.open span:nth-child(1) {
  transform: translateY(11px) rotate(45deg);
}
.menu-toggle.open span:nth-child(2) {
  opacity: 0;
}
.menu-toggle.open span:nth-child(3) {
  transform: translateY(-11px) rotate(-45deg);
}

@media (max-width: 900px) {
  .links {
    display: none;
  }
  .menu-toggle {
    display: grid;
    place-items: center;
  }
  .mobile-drawer {
    position: fixed;
    inset: 70px var(--gap) auto var(--gap);
    background: rgba(10, 12, 20, 0.9);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 18px;
    display: none;
    flex-direction: column;
    gap: 12px;
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow);
    z-index: 60;
  }
  .mobile-drawer a {
    color: var(--text);
    text-decoration: none;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--glass);
  }
  .mobile-drawer.open {
    display: flex;
  }
  .dots {
    display: none !important;
  }
  .mobile-drawer {
    margin-top: 16px; /* Default space (no announcement bar) */
  }
  body.announcement-visible .mobile-drawer {
    margin-top: calc(30px + 16px); /* Space for brand + announcement bar */
  }
}
.mobile-drawer {
  display: none;
}

/* slider */
.slider {
  position: relative;
  overflow: hidden;
  padding: 0px 0px 50px 0px;
}

.slides {
  position: relative;
  display: grid;
  z-index: 1;
}
.slide {
  position: relative;
  grid-area: 1/1;
  display: grid;
  place-items: center;
  padding: calc(40px + var(--gap)) var(--gap) var(--gap);
  opacity: 0;
  transform: scale(0.98);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.slide.active {
  opacity: 1;
  transform: scale(1);
  z-index: 2;
}
.slide::before {
  content: "";
  position: absolute;
  inset: -20% -10% -10% -10%;
  /* background: radial-gradient(
      700px 600px at 20% -10%,
      rgba(124, 92, 255, 0.25),
      transparent 60%
    ),
    radial-gradient(
      600px 500px at 120% 20%,
      rgba(34, 209, 238, 0.18),
      transparent 55%
    ); */
  filter: blur(10px);
  z-index: 0;
}
.slide-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: clamp(24px, 4vw, 56px);
  width: min(100%, 1200px);
  align-items: center;
  position: relative;
  z-index: 1;
}

@media (max-width: 900px) {
  .slide-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.kicker .dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 0 6px rgba(124, 92, 255, 0.12);
}
h1 {
  font-size: clamp(36px, 5.2vw, 68px);
  line-height: 1.05;
  margin: 0 0 10px;
  letter-spacing: -0.02em;
}
p.lead {
  color: var(--muted);
  font-size: clamp(15px, 1.4vw, 18px);
  margin: 0 0 26px;
}
.cta-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .cta-row {
    justify-content: center;
  }
}

/* chart card */
.chart-card {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.03)
  );
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 18px;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}
.chart-card header {
  position: relative;
  inset: auto;
  padding: 0 0 10px;
}
.chart-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.chart-title .chip {
  background: rgba(124, 92, 255, 0.15);
  border-color: rgba(124, 92, 255, 0.35);
  color: #cbb8ff;
}
.chart-meta {
  color: var(--muted);
  font-size: 12px;
  margin-top: 4px;
}
canvas.chart {
  width: 100%;
  height: 320px;
  display: block;
}

/* slider controls */
.controls {
  position: absolute;
  inset: auto 0 20px 0;
  display: grid;
  place-items: center;
  gap: 10px;
  z-index: 10;
}
.dots {
  display: inline-flex;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
}
.dot-btn {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.38);
  border: none;
  cursor: pointer;
}
.dot-btn.active {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.arrows {
  position: absolute;
  inset: 50% var(--gap) auto;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;
}

@media (max-width: 900px) {
  .arrows {
    top: 660px;
  }
}

.arrow {
  pointer-events: auto;
  width: 46px;
  height: 46px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--glass);
  display: grid;
  place-items: center;
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow);
  cursor: pointer;
  opacity: 0.6; /* Add this for default lower opacity */
  transition: opacity 0.25s;
}
.arrow:hover,
.arrow:focus {
  opacity: 1;
}

/* trust bar */
.trust {
  position: relative;
  z-index: 2;
  margin-top: 0px;
}
.trust-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0px;
  gap: 12px;
  padding: 12px 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 16px;
}
/* Center and move the <b> element to the top inside .trust-inner */
.trust-inner > b {
  width: 100%;
  text-align: center;
  display: block;
  margin-bottom: 0.5em;
  order: -1; /* Ensure it's first in flex order */
}
.trust b {
  opacity: 0.9;
}
.trust .logo-pill {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--glass);
  color: var(--muted);
}

/* Ensure images inside .logo-pill fit nicely */
.logo-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--glass);
  color: var(--muted);
  box-sizing: border-box;
  white-space: nowrap;
}

.logo-pill img {
  width: 1.2em;
  height: 1.2em;
  object-fit: contain;
  display: inline-block;
  vertical-align: middle;
}

/* sections */
section {
  padding: 60px 0;
  position: relative;
}
.section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: var(--gap);
  margin-bottom: 26px;
}

@media screen and (max-width: 900px) {
  .section-head {
    /* display: flex; */
    align-items: center;
    flex-direction: column;
  }

  #contact .grid {
    display: flex;
    flex-direction: column;
  }
}

section h2 {
  font-size: clamp(28px, 3.5vw, 40px);
  margin: 0;
  letter-spacing: -0.02em;
}
section p.sub {
  color: var(--muted);
  max-width: 680px;
}

/* grid + cards */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--gap);
}
.card {
  grid-column: span 4;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
  position: relative;
  overflow: hidden;
}
.card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.28);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
}
.thumb {
  aspect-ratio: 16/10;
  background: linear-gradient(
    135deg,
    rgba(124, 92, 255, 0.38),
    rgba(34, 209, 238, 0.3),
    rgba(255, 122, 217, 0.3)
  );
  border-radius: 16px;
  box-shadow: inset 0 0 120px rgba(0, 0, 0, 0.3);
  margin-bottom: 14px;
  position: relative;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.thumb::after {
  content: "";
  position: absolute;
  inset: -40% -20% auto -20%;
  height: 70%;
  background: radial-gradient(
    600px 200px at 20% 10%,
    rgba(255, 255, 255, 0.32),
    transparent 60%
  );
  transform: rotate(-8deg);
}
.card h3 {
  margin: 0 0 6px;
}
.card p {
  margin: 0 0 12px;
  color: var(--muted);
}
.card img {
  max-width: 100%;
  display: block;
}
.centered-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tag-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
@media (max-width: 1100px) {
  .card {
    grid-column: span 6;
  }
}
@media (max-width: 700px) {
  .card {
    grid-column: span 12;
  }
}

/* skills */
.skill {
  grid-column: span 3;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px;
}
.skill h4 {
  margin: 0 0 8px;
}
.progress {
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
}
.progress > i {
  display: block;
  height: 100%;
  width: 0;
  background: linear-gradient(
    135deg,
    var(--accent),
    var(--accent-2),
    var(--accent-3)
  );
}
@media (max-width: 1100px) {
  .skill {
    grid-column: span 6;
  }
}
@media (max-width: 700px) {
  .skill {
    grid-column: span 12;
  }
}

/* contact */
form {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
}
form .field {
  grid-column: span 1;
}
form .field.full {
  grid-column: span 2;
}
input,
textarea {
  width: 100%;
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 12px;
  outline: none;
}
textarea {
  min-height: 120px;
  resize: vertical;
}
input:focus,
textarea:focus {
  border-color: rgba(255, 255, 255, 0.32);
}
@media (max-width: 700px) {
  form {
    grid-template-columns: 1fr;
  }
  form .field.full {
    grid-column: span 1;
  }
}

footer {
  padding: 26px var(--gap) 60px;
  color: var(--muted);
  text-align: center;
}

/* reveal on scroll */
.reveal {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* sticky CTA */
.sticky-cta {
  position: fixed;
  right: 18px;
  bottom: 18px;
  z-index: 60;
}

@media (max-width: 560px) {
  .btn {
    padding: 12px 16px;
  }
  .arrow {
    width: 42px;
    height: 42px;
  }
}

/* Hamburger menu: same gradient and size as .brand in light mode */
body.light .menu-toggle {
  background: linear-gradient(135deg, #22d1ee 60%, #7c5cff 100%) !important;
  border-radius: 22px !important;
  border: none !important;
}

/* Light mode backgrounds for nav, links, brand (desktop & mobile) */
body.light .brand,
body.light #desktopLinks,
body.light .mobile-drawer .brand {
  background: linear-gradient(135deg, #22d1ee 60%, #7c5cff 100%) !important;
  border: none !important;
}

body.light .mobile-drawer {
  border: 1px solid var(--border);
}
body.light #announcementBar p {
  background: linear-gradient(135deg, #7c5cff 60%, #22d1ee 100%) !important;
  border: none !important;
}

/* Light mode: make links in nav, mobile drawer, and announcement bar white */
body.light .nav a,
body.light #desktopLinks a,
body.light .mobile-drawer a,
body.light #announcementBar a,
body.light .brand span,
body.light .mobile-drawer .brand span {
  color: #fff !important;
  border: none !important;
}

body.light .mobile-drawer {
  background: #f7f8fa !important;
}
body.light .mobile-drawer a {
  background: linear-gradient(135deg, #22d1ee 60%, #7c5cff 100%) !important;
}

/* Light mode: toggle switch bar color */
body.light input[type="checkbox"] + span {
  background: #ff7ad9 !important;
}

/* Place media queries at the end of your CSS file */
@media (max-width: 900px) {
  .links {
    display: none;
  }
  .menu-toggle {
    display: grid;
    place-items: center;
  }
  .mobile-drawer {
    position: fixed;
    inset: 70px var(--gap) auto var(--gap);
    background: rgba(10, 12, 20, 0.9);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 18px;
    display: none;
    flex-direction: column;
    gap: 12px;
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow);
    z-index: 60;
  }
  .mobile-drawer a {
    color: var(--text);
    text-decoration: none;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--glass);
  }
  .mobile-drawer.open {
    display: flex;
  }
  .dots {
    display: none !important;
  }
  .mobile-drawer {
    margin-top: 16px; /* Default space (no announcement bar) */
  }
  body.announcement-visible .mobile-drawer {
    margin-top: calc(30px + 16px); /* Space for brand + announcement bar */
  }
}
@media (max-width: 560px) {
  .btn {
    padding: 12px 16px;
  }
  .arrow {
    width: 42px;
    height: 42px;
  }
}
