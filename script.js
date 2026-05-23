/* ============================================================
   GAUTAM LASGOTRA PORTFOLIO — INTERACTIVE JAVASCRIPT
   Apple × Tesla × Linear × Arc Browser Inspired
   ============================================================ */

'use strict';

// ─── Custom Cursor ───────────────────────────────────────────
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
let animationId;

const lerp = (a, b, t) => a + (b - a) * t;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

function animateCursor() {
  ringX = lerp(ringX, mouseX, 0.12);
  ringY = lerp(ringY, mouseY, 0.12);
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  animationId = requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousedown', () => cursorRing.classList.add('clicked'));
document.addEventListener('mouseup',   () => cursorRing.classList.remove('clicked'));
document.addEventListener('mouseleave',() => { cursorDot.style.opacity = '0'; cursorRing.style.opacity = '0'; });
document.addEventListener('mouseenter',() => { cursorDot.style.opacity = '1'; cursorRing.style.opacity = '1'; });

// Expand cursor on interactive elements
const interactiveEls = document.querySelectorAll('a, button, .btn, .skill-chip, .project-card, .timeline-card, .stat-card, .contact-link');
interactiveEls.forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('expanded'));
});

// ─── Magnetic Cursor Effect ───────────────────────────────────
document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = e.clientX - cx;
    const dy   = e.clientY - cy;
    const dist = Math.sqrt(dx*dx + dy*dy);
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

// ─── Scroll Progress Bar ─────────────────────────────────────
const progressBar = document.querySelector('.nav-progress');
window.addEventListener('scroll', () => {
  const scrolled  = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const pct       = (scrolled / maxScroll) * 100;
  if (progressBar) progressBar.style.width = pct + '%';
}, { passive: true });

// ─── Navbar Scroll Effect & Active Link ──────────────────────
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ─── Mobile Menu ─────────────────────────────────────────────
const hamburger    = document.querySelector('.nav-hamburger');
const mobileMenu   = document.querySelector('.nav-mobile-menu');
const mobileLinks  = document.querySelectorAll('.nav-mobile-link');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ─── Scroll-Triggered Reveal ──────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ─── 3D Tilt Effect on Project Cards ─────────────────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect   = this.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    const tiltX  = dy * -8;
    const tiltY  = dx *  8;
    this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    this.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});

// ─── Floating Particles ───────────────────────────────────────
function createParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size  = Math.random() * 3 + 1;
    const left  = Math.random() * 100;
    const dur   = Math.random() * 12 + 8;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.1;
    const color = Math.random() > 0.5
      ? `rgba(124, 58, 237, ${opacity})`
      : `rgba(37, 99, 235, ${opacity})`;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${left}%; background: ${color};
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
    `;
    container.appendChild(p);
  }
}
createParticles();

// ─── Smooth Scroll ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── Typing Effect (Hero Tagline) ────────────────────────────
function typeWriter(el, text, speed = 35) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i++];
    } else {
      clearInterval(timer);
    }
  }, speed);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
      const text = tagline.dataset.text || tagline.textContent;
      tagline.dataset.text = text;
      typeWriter(tagline, text, 30);
    }
  }, 900);
});

// ─── Parallax on Hero ─────────────────────────────────────────
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

// ─── Counter Animation ────────────────────────────────────────
function animateCounter(el, target, suffix = '', duration = 1500) {
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
      const nums = entry.target.querySelectorAll('.stat-number[data-target]');
      nums.forEach(n => {
        const target = parseInt(n.dataset.target);
        const suffix = n.dataset.suffix || '';
        animateCounter(n, target, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.about-stats');
if (statsGrid) statsObserver.observe(statsGrid);

// ─── Skill Chip Stagger ───────────────────────────────────────
document.querySelectorAll('.skill-chip').forEach((chip, i) => {
  chip.style.transitionDelay = (i * 0.04) + 's';
});

// ─── Cursor glow on hero ──────────────────────────────────────
const hero = document.getElementById('hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width)  * 100;
    const y    = ((e.clientY - rect.top)  / rect.height) * 100;
    hero.style.setProperty('--mouse-x', x + '%');
    hero.style.setProperty('--mouse-y', y + '%');
  });
}
