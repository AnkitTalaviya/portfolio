# Ankit Talaviya Portfolio

A multi-page portfolio site built with React, TypeScript, Vite, and Three.js.

Live site: https://ankittalaviya.github.io/portfolio/

This project is designed as a portfolio experience rather than a single static landing page. It combines a customizable 3D hero scene, multilingual content, theme switching, project detail pages, and interactive demo surfaces that showcase product thinking as well as frontend execution.

## What This Includes

- A modular React portfolio home page with dedicated hero, about, experience, projects, skills, education, and contact sections
- A real-time 3D hero scene built with Three.js and `OrbitControls`
- Keyboard and mobile movement controls for the hero scene
- Theme switching with persisted user preference
- Outfit palette switching for the hero character
- Multilingual content support for English, German, French, and Spanish
- A separate project hub page with focused project cards and detail links
- A standalone React CRUD workspace demo
- GitHub Pages deployment from the `development` branch

## Experience Highlights

- The home page is componentized instead of being kept in one large file, which makes the portfolio easier to maintain and extend
- The heavy hero scene is lazy-loaded so the main portfolio bundle stays lighter on initial load
- Character animations are consolidated into a shared animation pack instead of shipping duplicate full GLB files
- Asset and document URLs are GitHub Pages-safe through shared base-path helpers
- Mobile interaction has dedicated touch controls and iPhone-specific scene fixes for smoother use

## Pages

- `/` or `index.html`: main portfolio site
- `/projects.html`: project hub with concept builds and workflow projects
- `/crud-workspace.html`: standalone CRUD workspace demo
- `/demos/*`: static demo pages used by project cards

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

The dev script also rebuilds the shared hero animation pack before starting Vite.

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run build:hero-animations
npm run install:all
npm run dev:crud-workspace
npm run build:crud-workspace
```

## Project Structure

```text
.
|-- public/
|   |-- documents/
|   |-- demos/
|   |-- models/
|   `-- projects/
|-- scripts/
|   `-- build-hero-animation-pack.mjs
|-- src/
|   |-- components/
|   |   |-- portfolio/
|   |   `-- project-hub/
|   |-- data/
|   |-- lib/
|   |-- App.tsx
|   |-- HeroScene.tsx
|   `-- ProjectsPage.tsx
|-- apps/
|   `-- react-crud-workspace/
`-- .github/workflows/deploy.yml
```

## Deployment

This repo is configured for GitHub Pages.

- The site is built with the correct project-site base path for `/portfolio/`
- GitHub Actions deploys automatically when code is pushed to the `development` branch
- The deployment workflow lives in [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

## Notes For Maintenance

- The visible hero model lives in `public/models/Landing.glb`
- Shared animation clips are packed into `public/models/HeroAnimations.glb`
- Source animation files used to generate the animation pack are kept under `tools/source-models/hero/`
- If animations are updated, rerun `npm run build:hero-animations`

## Why This Portfolio Is Different

This portfolio is built to feel like a product, not just a resume page. The goal is to present engineering work through interaction, motion, demos, and system design choices that show both implementation skill and product thinking.

