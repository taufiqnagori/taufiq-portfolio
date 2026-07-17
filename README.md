# Taufiq Rafik Nagori — 3D Motion Portfolio

A cinematic, dark-themed developer portfolio built with React, Three.js (via React Three Fiber), Framer Motion, GSAP/ScrollTrigger, and Tailwind CSS v4.

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
  context/SettingsContext.tsx  # low-power / reduced-motion toggle, persisted to localStorage
  hooks/useIsMobile.ts    # viewport helper used to degrade 3D on small screens
  three/
    HeroScene.tsx         # hero: wireframe icosahedron + node/edge particle field, mouse + scroll reactive
    ContactScene.tsx       # lightweight floating wireframe shapes behind the contact form
  components/
    LoadingScreen.tsx      # animated logo-reveal + progress bar shown before the 3D scene mounts
    CustomCursor.tsx        # magnetic/glow custom cursor (desktop only, disabled on touch + low-power)
    Navbar.tsx / SettingsToggle.tsx
    Hero.tsx, About.tsx, Skills.tsx, Projects.tsx, Experience.tsx, Certifications.tsx, Contact.tsx, Footer.tsx
  App.tsx                  # orchestrates loading screen → cursor → nav → sections → footer
public/
  resume.pdf                # wired to the "Download Resume" button in the Hero — replace with an updated file any time
  favicon.svg
```

## Customizing content

Everything text-based (name, bio, education, skills, projects, experience, certifications, contact info) lives in **`src/data/content.ts`**. Update that file and every section re-renders automatically — no need to touch component markup for a copy change.

## Wiring the contact form

`src/components/Contact.tsx` currently runs in demo mode (validates and simulates a send). To receive real submissions:

1. Create a form at [Formspree](https://formspree.io) (or use EmailJS instead).
2. Replace `FORM_ENDPOINT` near the top of `Contact.tsx` with your endpoint URL.

## The 3D scene, explained

`src/three/HeroScene.tsx` is the signature visual:

- **`CoreSolid`** — a double-layer wireframe icosahedron. Its rotation blends an idle auto-spin with a lerp toward the pointer position (`useFrame` reads a ref updated by a `pointermove` listener, so no state re-renders happen per frame — that's important for keeping 60fps in a React Three Fiber loop).
- **Scroll-driven camera** — the same `useFrame` callback also reads scroll progress (0–1) and dollies/tilts the camera, giving the "moving through the scene" feel as you scroll past the hero.
- **`NodeField` / `NodeLinks`** — a particle cloud distributed on a sphere shell around the solid, with a nearest-neighbor pass drawing faint connecting lines. This node/edge motif is intentionally echoed in the Skills section's hover-tilt cards, so the hero's centerpiece isn't a one-off — it's a visual language the rest of the site reuses.
- Both `NodeField` and `NodeLinks` are skipped entirely when `lowPower` is true, and the whole Canvas is skipped on mobile+low-power combined (see `Hero.tsx`), which is the main lever for keeping Lighthouse scores healthy on constrained devices.

`ContactScene.tsx` is a much cheaper second scene (3 meshes, no particles) used purely as ambient background texture behind the contact form.

## Performance & accessibility notes

- Both 3D scenes are lazy-loaded (`React.lazy`/`Suspense`) so Three.js never sits on the critical rendering path.
- The settings toggle in the navbar (and `prefers-reduced-motion` automatically) flips a `low-power` class on `<html>` that shortens all CSS transitions/animations and strips `backdrop-filter`, in addition to disabling the particle field and custom cursor.
- All interactive elements are real `<button>`/`<a>` tags with visible focus rings (`:focus-visible`) for keyboard navigation.
- Meta tags (title, description, Open Graph, Twitter card) are set in `index.html` for SEO/link previews.

## Tech stack

- React 19 + TypeScript, bundled with Vite
- `@react-three/fiber` + `@react-three/drei` for the 3D scenes
- `framer-motion` for page/section transitions and scroll reveals
- `gsap` + `ScrollTrigger` for the scroll-scrubbed education timeline in the About section
- Tailwind CSS v4 (CSS-first config via `@theme` in `src/index.css`)
