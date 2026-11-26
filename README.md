# AHMED KHALED® — Engineering & Full-Stack Portfolio

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-0A0A0A?style=for-the-badge&logo=github)](https://ahmedjulhaji-stack.github.io/)
[![Architecture](https://img.shields.io/badge/Architecture-Zero_Bloat_Vanilla-0A0A0A?style=for-the-badge&logo=html5)](#architecture--key-features)
[![License: MIT](https://img.shields.io/badge/License-MIT-0A0A0A?style=for-the-badge)](#license)

A high-contrast monochrome editorial portfolio website crafted for **Ahmed Khaled** (*Ahmed Khalid Faydullah*) — Computer Techniques Engineer (Electronics Branch, Stage 3 at Technical Engineering College / Kirkuk — Northern Technical University), Full-Stack Web Developer, and 2D/3D AutoCAD Designer.

---

## Architecture & Key Features

* **Zero-Bloat Vanilla Stack:** Engineered entirely with semantic **HTML5**, modern **CSS3** (Custom Properties, Grid, Flexbox), and modular **ES6+ JavaScript**—achieving zero Cumulative Layout Shift (`CLS = 0`) and instant load times without external framework overhead.
* **Monochrome Editorial Aesthetic:** Features a print-inspired newsprint palette (`#F5F5F5` / `#0A0A0A`), halftone dot-matrix textures, and bold display typography (*Barlow Condensed*, *Inter*, and *JetBrains Mono*).
* **Interactive & Accessible UI:**
  * Real-time 2px top scroll progress indicator powered by `requestAnimationFrame`.
  * Interactive project category filtering (`All`, `Web Development`, `AutoCAD 2D/3D`, `Game Dev`) with ARIA tablist compliance.
  * Scroll-spy navigation and scroll-reveal animations using `IntersectionObserver`, respecting `prefers-reduced-motion`.
  * Client-side validated contact form with instant feedback and pre-populated `mailto:` dispatch.
* **SEO & Security Ready:** Includes structured data (`Schema.org` JSON-LD), Open Graph metadata, and optional CSP/HSTS HTTP security headers for static hosting.

---

## Project Structure

```text
portfolio/
├── index.html          # Semantic HTML5 markup, SEO metadata & JSON-LD schema
├── css/
│   └── style.css       # Design tokens, halftone patterns, layout & responsive rules
├── js/
│   └── main.js         # Modular UI controllers (scroll-spy, filtering, validation)
└── README.md           # Project documentation
```

---

## Featured Engineering Work

1. **Academic File Repository Platform** — Full-stack student resource portal built with Vanilla JS and Firebase Firestore featuring role-based admin controls, live timetables, and CSP/HSTS hardening.
2. **Retro Arcade Table Tennis Game** — Real-time multiplayer HTML5 Canvas game powered by Node.js, Express, Socket.io, and MongoDB with sub-step physics and persistent leaderboards.
3. **Architectural & Geometric 2D/3D AutoCAD** — Technical blueprints, orthographic elevations, and 3D solid modeling showcases published on YouTube ([@Snow_059](https://www.youtube.com/@Snow_059)).

---

## Local Development & Deployment

No build tools, package managers, or bundlers are required.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmedjulhaji-stack/portfolio.git
   cd portfolio
   ```
2. **Run locally:**
   Open `index.html` directly in any modern browser, or serve it via VS Code Live Server / Python:
   ```bash
   python3 -m http.server 8080
   ```
3. **Deploy:**
   Push the root directory directly to **GitHub Pages** or **Netlify**.

---

## Connect

* **GitHub:** [@ahmedjulhaji-stack](https://github.com/ahmedjulhaji-stack)
* **YouTube:** [@Snow_059](https://www.youtube.com/@Snow_059)
* **Email:** [ahmedjulhaji@gmail.com](mailto:ahmedjulhaji@gmail.com)

---

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
