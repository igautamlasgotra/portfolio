/* ============================================================
   GAUTAM LASGOTRA PORTFOLIO — INTERACTIVE JAVASCRIPT
   Apple × Tesla × Linear × Arc Browser Inspired
   ============================================================ */

'use strict';

// ─── Capability detection ────────────────────────────────────
// The custom cursor and pointer-driven effects are gated purely on
// INPUT CAPABILITY — never on viewport width. We use `any-pointer: fine`
// (true whenever ANY mouse/trackpad is present) rather than `pointer: fine`
// (the PRIMARY pointer), because touchscreen laptops report a coarse
// primary pointer even with a mouse attached — which previously disabled
// the cursor on desktop. So: cursor runs on any device with a mouse, and
// is disabled only on pure-touch devices. Genuine ambient motion
// (particles, parallax) additionally respects reduced-motion.
const finePointer  = window.matchMedia('(any-pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Custom cursor, magnetic buttons, glow & 3D tilt (pointer devices) ─
if (finePointer) {
  const cursorDot  = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  (function animateCursor() {
    ringX = lerp(ringX, mouseX, 0.12);
    ringY = lerp(ringY, mouseY, 0.12);
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.addEventListener('mousedown', () => cursorRing.classList.add('clicked'));
  document.addEventListener('mouseup',   () => cursorRing.classList.remove('clicked'));
  document.addEventListener('mouseleave',() => { cursorDot.style.opacity = '0'; cursorRing.style.opacity = '0'; });
  document.addEventListener('mouseenter',() => { cursorDot.style.opacity = '1'; cursorRing.style.opacity = '1'; });

  // Expand cursor ring on interactive elements
  document.querySelectorAll('a, button, .btn, .skill-tile, .project-card, .timeline-card, .stat-card, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('expanded'));
  });

  // ─── Magnetic buttons ──────────────────────────────────────
  document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxR = 80;
      if (dist < maxR) {
        const pull = (1 - dist / maxR) * 10;
        this.style.transform = `translate(${dx * pull / maxR}px, ${dy * pull / maxR}px)`;
      }
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // ─── 3D tilt on project cards (subtle, deliberate) ─────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect  = this.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width  / 2);
      const dy    = (e.clientY - cy) / (rect.height / 2);
      const tiltX = dy * -5;
      const tiltY = dx *  5;
      this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
      this.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // ─── Cursor glow on hero ───────────────────────────────────
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.addEventListener('mousemove', (e) => {
      const rect = heroEl.getBoundingClientRect();
      heroEl.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width)  * 100 + '%');
      heroEl.style.setProperty('--mouse-y', ((e.clientY - rect.top)  / rect.height) * 100 + '%');
    });
  }
}

// ─── Ambient motion: particles & hero parallax ───────────────
// Genuine motion effects — disabled on touch AND when the user
// prefers reduced motion.
if (finePointer && !reduceMotion) {
  // ─── Floating particles ────────────────────────────────────
  const particleContainer = document.querySelector('.particles-container');
  if (particleContainer) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size    = Math.random() * 3 + 1;
      const left    = Math.random() * 100;
      const dur     = Math.random() * 12 + 8;
      const delay   = Math.random() * 10;
      const opacity = Math.random() * 0.5 + 0.1;
      const color   = Math.random() > 0.5
        ? `rgba(124, 58, 237, ${opacity})`
        : `rgba(37, 99, 235, ${opacity})`;
      p.style.cssText = `width:${size}px;height:${size}px;left:${left}%;background:${color};animation-duration:${dur}s;animation-delay:-${delay}s;`;
      particleContainer.appendChild(p);
    }
  }

  // ─── Hero parallax ─────────────────────────────────────────
  window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroBg      = document.querySelector('.hero-bg');
    const scrollY     = window.scrollY;
    if (heroContent && scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.25}px)`;
      heroContent.style.opacity   = 1 - scrollY / (window.innerHeight * 0.7);
    }
    if (heroBg && scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
  }, { passive: true });
}

// ─── Scroll Progress Bar ─────────────────────────────────────
const progressBar = document.querySelector('.nav-progress');
window.addEventListener('scroll', () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const pct = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + '%';
}, { passive: true });

// ─── Navbar Scroll Effect & Active Link ──────────────────────
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ─── Mobile Menu ─────────────────────────────────────────────
const hamburger   = document.querySelector('.nav-hamburger');
const mobileMenu  = document.querySelector('.nav-mobile-menu');
const mobileLinks = document.querySelectorAll('.nav-mobile-link');

// Stagger delays for links entering
const STAGGER_DELAYS = [0.08, 0.14, 0.20, 0.26, 0.32, 0.42];

function openMobileMenu() {
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // prevent scroll behind overlay
  mobileLinks.forEach((link, i) => {
    link.style.transitionDelay = (STAGGER_DELAYS[i] || 0) + 's';
  });
}

function closeMobileMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  mobileLinks.forEach(link => { link.style.transitionDelay = '0s'; });
}

hamburger?.addEventListener('click', () => {
  if (hamburger.classList.contains('open')) closeMobileMenu();
  else openMobileMenu();
});

// Close on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => closeMobileMenu());
});

// Close on escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && hamburger && hamburger.classList.contains('open')) closeMobileMenu();
});

// ─── Scroll-Triggered Reveal ──────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ─── Skill Tile Stagger ───────────────────────────────────────
// Stagger reveal within each category group so tiles cascade in.
document.querySelectorAll('.skill-group').forEach(group => {
  group.querySelectorAll('.skill-tile').forEach((tile, i) => {
    tile.style.transitionDelay = (i * 0.05) + 's';
  });
});

// ─── Smooth Scroll ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href.length < 2) return; // skip placeholder links
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
});

// ─── Counter Animation ────────────────────────────────────────
function animateCounter(el, target, suffix = '', duration = 1500) {
  if (reduceMotion) { el.textContent = target + suffix; return; }
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number[data-target]').forEach(n => {
        animateCounter(n, parseInt(n.dataset.target), n.dataset.suffix || '');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.about-stats');
if (statsGrid) statsObserver.observe(statsGrid);
