# Gautam Lasgotra — Portfolio

> Flutter app developer shipping production mobile experiences — with full-stack MERN range and a security foundation.

A premium, Apple-inspired developer portfolio built as a single static page. Glassmorphism UI, brand-logo tech grid, custom cursor, and scroll-triggered motion — engineered to lead with mobile/app development while keeping full-stack and security depth visible.

**Live:** [igautamlasgotra.dev](https://igautamlasgotra.dev)

## Tech Stack

Pure **HTML5 + CSS3 + Vanilla JavaScript** — zero dependencies, zero frameworks, no build step. All icons are inlined SVGs, so nothing is fetched from an icon CDN or font.

## Features

- **Glassmorphism UI** — frosted navbar, cards, and full-screen overlay menu via `backdrop-filter`, with hairline borders and a graceful `@supports` fallback where blur is unsupported.
- **Brand-logo tech grid** — skills grouped into Languages / Web / Databases & Backend / Developer Tools. Logos sit neutral and animate to their brand colour on hover; the core mobile stack (Flutter, Dart, Firebase) is highlighted.
- **Flagship project tile** — Shramik (Flutter/Firebase) leads as the visual hero with its real app logo; each card has a hover-reactive GitHub repo icon.
- **Custom glowing cursor** — dual-ring magnetic cursor on desktop (precise-pointer devices only).
- **Scroll-triggered reveals**, **3D tilt cards**, **hero parallax**, and **animated stat counters**.
- **Apple-style mobile menu** — glass icon button animating three lines → X, with a staggered overlay.
- **Fully responsive & accessible** — audited at phone widths with ≈44px tap targets; heavy effects are disabled on touch devices and `prefers-reduced-motion` is fully respected.

## Project Structure

```
Portfolio/
├── index.html          # Single-page site (all sections)
├── style.css           # All styles, design tokens, responsive + reduced-motion
├── script.js           # Interactions (capability-gated, zero-dep)
├── Resume_Gautam.pdf    # Resume
└── assets/
    ├── profile.png         # Profile photo
    ├── shramik_mark.svg    # Shramik app brand mark
    └── favicon-*.png       # Favicon suite
```

## Deployment

Git-based continuous deployment on **Vercel**:

```
Local → push to main → Vercel build → live on igautamlasgotra.dev
```

Every push to `main` triggers an automatic build and deploy. The custom `.dev` domain is managed by Vercel with automatic, zero-config HTTPS.

## Sections

- **Hero** — app-developer positioning with particle/parallax background
- **About** — mobile-first narrative, profile, and animated stats
- **Skills** — categorized brand-logo toolkit with mobile stack highlighted
- **Projects** — Shramik (flagship Flutter app) and CampusCrate (MERN)
- **Experience & Education** — IIT Jammu & CDAC Noida internships, SMVDU B.Tech
- **Contact** — GitHub, LinkedIn, WhatsApp, email, and resume download

---

*Designed & built by Gautam Lasgotra — coded from scratch, no frameworks, no templates.*
