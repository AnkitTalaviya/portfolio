# Ankit Talaviya Portfolio

Portfolio site for Ankit Talaviya, Full-Stack AI Engineer. Built with React, TypeScript, Vite and Three.js, and prerendered to static HTML at build time.

Live site: https://ankittalaviya.github.io/portfolio/

## What This Includes

- A portfolio home page with hero, about, projects, experience, skills, education and contact sections, in that order
- Three project pages: DeutschFlow AI / Sprako, the RAG chatbot for German learning, and the neural network IDS in P4
- Build-time prerendering, so every route ships as complete HTML instead of an empty `<div id="root">`
- A real-time 3D hero scene built with Three.js and `OrbitControls`, lazy-loaded after the page renders
- Theme switching with persisted user preference
- Content in English, German, French and Spanish
- GitHub Pages deployment from the `development` branch

## Prerendering

`npm run build` runs three steps after the type check:

1. `vite build` produces the client bundle and `dist/index.html`
2. `vite build --ssr src/entry-server.tsx` produces `dist-ssr/entry-server.js`
3. `scripts/prerender.mjs` renders every route in `src/data/routeMeta.ts` with `renderToString`, injects the markup into `dist/index.html`, rewrites the per-route title, description, canonical URL and social tags, and writes one `index.html` per route

The browser then hydrates that markup instead of discarding it (`src/main.tsx`). Two consequences to keep in mind when editing:

- The first client render has to match the prerendered markup, so state that depends on `localStorage` or `navigator` starts on its default value and is corrected in an effect. See `useActiveLanguage`, `useThemePreference` and `useOutfitTransition`.
- The stored theme is applied by a small boot script in `index.html` before the first paint, which is why the hook skips its first apply pass.

To add a route, add it to `src/data/routeMeta.ts` and to the `Routes` in `src/RouterApp.tsx`.

## Pages

- `/` main portfolio page
- `/projects` project hub
- `/projects/deutschflow-ai`
- `/projects/rag-chatbot-german`
- `/projects/neural-network-ids-in-p4-bmv2`

Each of these is a real directory with its own `index.html` in `dist`, so GitHub Pages serves deep links directly.

## Stack

- React 19
- TypeScript
- Vite
- Three.js
- Bootstrap 5
- Lucide React

## Local Development

```bash
npm install
npm run dev
```

The dev server renders on the client only; prerendering runs in the production build. To check the prerendered output locally:

```bash
npm run build
npm run preview
```

## Scripts

```bash
npm run dev
npm run build
npm run build:hero-animations
npm run build:ssr
npm run prerender
npm run preview
```

## Project Structure

```text
.
|-- public/
|   |-- documents/
|   |-- models/
|   `-- og-image.svg
|-- scripts/
|   |-- build-hero-animation-pack.mjs
|   `-- prerender.mjs
|-- src/
|   |-- components/
|   |   |-- portfolio/
|   |   `-- project-hub/
|   |-- data/
|   |   |-- routeMeta.ts
|   |   `-- siteConfig.ts
|   |-- lib/
|   |-- App.tsx
|   |-- HeroScene.tsx
|   |-- RouterApp.tsx
|   |-- entry-server.tsx
|   `-- main.tsx
`-- .github/workflows/deploy.yml
```

## Deployment

This repo is configured for GitHub Pages.

- The site is built with the project-site base path `/portfolio/`
- GitHub Actions deploys automatically when code is pushed to the `development` branch
- The deployment workflow lives in [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

## Notes For Maintenance

- The visible hero model lives in `public/models/Landing.glb`
- Shared animation clips are packed into `public/models/HeroAnimations.glb`
- Source animation files used to generate the animation pack are kept under `tools/source-models/hero/`
- If animations are updated, rerun `npm run build:hero-animations`
- `public/og-image.svg` is the link-preview image. Most social crawlers do not render SVG, so exporting it to a 1200x630 PNG and pointing the `og:image` and `twitter:image` tags at that file is the remaining step for rich previews.
