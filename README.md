# Era landing

Single-page landing site. The build plan is in [docs/roadmap.md](docs/roadmap.md), and asset slots are mapped in [docs/assets-map.md](docs/assets-map.md).

**Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind CSS 4 · GSAP · Lenis · Embla Carousel · Resend

## Getting started

```bash
pnpm install
cp .env.example .env.local   # then fill in the keys
pnpm dev                      # http://localhost:3000
```

The alpha videos are git-ignored. For local dev, put them in `public/videos/` (`NEXT_PUBLIC_ASSETS_URL=/videos`). Deployed builds load them from Cloudflare R2.

## Scripts

| Script                              | What it does                                            |
| ----------------------------------- | ------------------------------------------------------- |
| `pnpm dev`                          | Dev server                                              |
| `pnpm build` / `pnpm start`         | Production build / serve it                             |
| `pnpm lint`                         | ESLint                                                  |
| `pnpm format` / `pnpm format:check` | Prettier, with Tailwind class sorting                   |
| `pnpm analyze`                      | Turbopack bundle analyzer (`next experimental-analyze`) |

## Conventions

- Import GSAP from `@/lib/gsap`, never from `gsap` directly.
- Animated components are `'use client'` and use `useGSAP()` with a `scope` ref.
- Animate only `transform`, `opacity` and `clip-path`.
- Keep copy, data and asset paths in `src/lib/content.ts`.
- Use `svh`/`dvh` rather than `vh` for full-screen sections.

## Layout

```
src/app/                  layout (fonts, SmoothScroll), page (section order), actions (Book a call), globals.css (tokens)
src/components/sections/  one file per page section
src/components/ui/        RollButton, AlphaVideo, SplitHeading, SlideCounter, Modal, BookCallForm, CookieBanner
src/components/providers/ SmoothScroll (Lenis driven by the GSAP ticker)
src/hooks/                useLenis, useReveal
src/lib/                  gsap (plugin registration), content
public/                   images/, svg/, videos/ (git-ignored)
```
