# Taufiq Nagori — Portfolio

A dark, monochrome developer portfolio built with React, Three.js (via React Three Fiber), Framer Motion, GSAP/ScrollTrigger, and Tailwind CSS v4.

**Live site:** https://taufiqnagori.github.io/

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

Build for production:

```bash
npm run build       # outputs to dist/
npm run preview     # serve the production build locally
```

Requires Node.js 18+.

## Project structure

```
src/
  data/content.ts        # every piece of real resume content lives here — edit this file to update copy
  context/SettingsContext.tsx  # low-power / reduced-motion state, persisted to localStorage
  hooks/
    useReveal.ts          # scroll-reveal trigger (IntersectionObserver + fallback checks, never leaves content stuck invisible)
    useMagnetic.ts         # pointer-follow "magnetic" pull for buttons, spring-driven
  three/
    ContactScene.tsx       # lightweight floating wireframe shapes behind the contact form
  components/
    LoadingScreen.tsx      # brief animated logo-reveal shown on first load
    CustomCursor.tsx        # magnetic/glow custom cursor (desktop only, disabled on touch + low-power)
    ScrollProgress.tsx      # thin gradient bar tracking scroll position
    SectionHeader.tsx       # shared numbered eyebrow + heading used by every section
    Navbar.tsx, Footer.tsx
    Hero.tsx, About.tsx, Skills.tsx, Projects.tsx, Experience.tsx, Certifications.tsx, Contact.tsx
  App.tsx                  # orchestrates loading screen → cursor → nav → sections → footer
public/
  resume.pdf                # wired to the "Download Resume" button in the Hero — replace with an updated file any time
  favicon.svg
.github/workflows/deploy.yml  # builds and deploys to GitHub Pages on every push to master
```

## Customizing content

Everything text-based (name, bio, education, skills, projects, experience, certifications, contact info) lives in **`src/data/content.ts`**. Update that file and every section re-renders automatically — no need to touch component markup for a copy change.

## The contact form

`src/components/Contact.tsx` submits directly to Formspree (`FORM_ENDPOINT` near the top of the file) — messages are delivered to taufiqnagori99@gmail.com. Formspree's free tier requires a one-time confirmation click on the first-ever submission; check spam if it doesn't show up. If `FORM_ENDPOINT` is ever reset to a placeholder, the form automatically falls back to opening the visitor's own email client instead of failing silently.

## Deployment

The site deploys to **GitHub Pages** automatically via `.github/workflows/deploy.yml` — every push to `master` triggers a build and redeploy, live within ~1–2 minutes. No manual deploy step. The repo is named `taufiqnagori.github.io`, which GitHub treats specially as a *user site* served at the domain root (`base: '/'` in `vite.config.ts`) rather than a project-site subpath.

## Performance & accessibility notes

- The contact page's 3D scene is lazy-loaded (`React.lazy`/`Suspense`) so Three.js never sits on the critical rendering path for the initial page load.
- `prefers-reduced-motion` (and the low-power state it drives) shortens CSS transitions/animations, strips `backdrop-filter`, and disables the custom cursor and heavier motion effects.
- Scroll-linked effects (parallax, scroll progress) are driven entirely by `transform`/`opacity` via Framer Motion's `useScroll`/`useTransform`, never by React state — so scrolling never triggers re-renders or layout thrash.
- All interactive elements are real `<button>`/`<a>` tags with visible focus rings (`:focus-visible`) for keyboard navigation.
- Meta tags (title, description, Open Graph, Twitter card) are set in `index.html` for SEO/link previews.

## Tech stack

- React 19 + TypeScript, bundled with Vite
- `@react-three/fiber` + `@react-three/drei` for the contact page's 3D scene
- `framer-motion` for page/section transitions, scroll reveals, and cursor-follow effects
- `gsap` + `ScrollTrigger` for the scroll-scrubbed education timeline in the About section
- Tailwind CSS v4 (CSS-first config via `@theme` in `src/index.css`)
- Formspree for contact form delivery
- GitHub Actions + GitHub Pages for hosting and CI/CD
