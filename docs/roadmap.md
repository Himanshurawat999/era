# Landing Page Replication Roadmap — Next.js

**Reference:** https://www.era-residence.com/ (landing page only)
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · GSAP (ScrollTrigger, SplitText, Draggable, DrawSVG) · Lenis · Embla Carousel · Resend · Vercel · Cloudflare R2
**Estimated duration:** ~3–4 weeks for one developer (assets ready)

> The live site is the design spec. Replicate its layout, motion and interactions using **your own assets, copy and branding**. Don't copy their source code, images or text.

---

## Table of Contents

1. [Phase 1 — Reference Analysis](#phase-1--reference-analysis-days-12)
2. [Phase 2 — Project Setup](#phase-2--project-setup-day-3)
3. [Phase 3 — Design Tokens & Base Components](#phase-3--design-tokens--base-components-days-34)
4. [Phase 4 — Animation Foundation](#phase-4--animation-foundation-day-5)
5. [Phase 5 — Static Build of All Sections](#phase-5--static-build-of-all-sections-days-69)
6. [Phase 6 — Animations Section by Section](#phase-6--animations-section-by-section-days-1016)
7. [Phase 7 — Media Pipeline](#phase-7--media-pipeline-parallel-with-phase-6)
8. [Phase 8 — Book a Call Form & Cookie Banner](#phase-8--book-a-call-form--cookie-banner-day-17)
9. [Phase 9 — Performance & Accessibility](#phase-9--performance--accessibility-day-18)
10. [Phase 10 — Cross-Browser & Device QA](#phase-10--cross-browser--device-qa-days-1920)
11. [Phase 11 — Production Deployment](#phase-11--production-deployment-day-21)
12. [Phase 12 — Post-Launch](#phase-12--post-launch)

---

## Phase 1 — Reference Analysis (Days 1–2)

Since there's no Figma file, the live site _is_ the spec. Spend these two days extracting everything you need so you never have to guess while coding.

### 1.1 Section inventory

Scroll through the reference site and confirm this list (top to bottom):

| #   | Section                       | Key interactions                                                                 |
| --- | ----------------------------- | -------------------------------------------------------------------------------- |
| 0   | **Preloader**                 | Landscape SVG, "A place to return to" tagline, 00→100 counter, reveal transition |
| 0   | **Cookie banner**             | Accept / Decline                                                                 |
| 0   | **Header + full-screen menu** | Menu/Close toggle, nav links, 3 feature cards in overlay                         |
| 1   | **Hero**                      | Big title, day/night image toggle, "Scroll" indicator, CTA                       |
| 2   | **Three reasons to choose**   | 3-card slider with 00/00 counter                                                 |
| 3   | **The concept**               | Cut-out (alpha) building image, text reveal, flower video                        |
| 4   | **New Golden Mile**           | Image + text, CTA, flower video                                                  |
| 5   | **Location map**              | Parallax cloud layers, SVG path + labels drawn on scroll                         |
| 6   | **Master plan**               | Large aerial image, "Drag to see more"                                           |
| 7   | **Apartment types**           | 3-slide slider (bedrooms, area, CTA), 00/00 counter                              |
| 8   | **Amenities**                 | 5 tabs (Gated community, Pool, Parking, Spa & gym, Landscaping) with image swap  |
| 9   | **The space to live in**      | Image, optional upgrades list, specs text                                        |
| 10  | **Interior gallery**          | 4-image slider with 00/00 counter                                                |
| 11  | **Architecture & credits**    | Text blocks, developer / sales logos, construction status                        |
| 12  | **Final CTA**                 | "Perfect sea views" full-width image + CTA                                       |
| 13  | **Footer**                    | Phone, address, legal links, social icons, "To top"                              |
| —   | **Book a call modal**         | Form with success / error states                                                 |
| —   | **Floating flower videos**    | 7 transparent `.webm` videos scattered across sections                           |

### 1.2 Measure the layout

- [ ] Open DevTools → **Computed** tab and record font sizes, line heights, letter spacing, colors and spacing for each section.
- [ ] Identify the fonts with the **WhatFont** or **Fonts Ninja** extension. Buy a web license for the same font or pick a close alternative.
- [ ] Record measurements at **1440px**, **1024px**, **768px** and **390px** widths.
- [ ] Drag the browser width slowly to find the exact **breakpoints** where the layout changes.
- [ ] Note which font sizes scale fluidly (they'll become `clamp()` values).

### 1.3 Capture the motion

- [ ] Screen-record every section at **60fps** on desktop and mobile (OBS or QuickTime).
- [ ] Scrub each recording frame by frame to estimate **durations**, **delays**, **stagger** and **easing** for each animation.
- [ ] Write a one-line motion spec per animation, e.g.:
      `Hero title — chars slide up from 100%, stagger 0.03s, duration 1.2s, ease power4.out, after preloader`
- [ ] Note what triggers each animation: page load, scroll into view, scroll-scrubbed, hover or click.

### 1.4 Map your assets

- [ ] Create an `assets-map.md` listing each slot on the reference page and which of your files fills it.
- [ ] Flag any missing assets now (e.g. a night version of the hero image, transparent cut-out of the building, map SVG).

**Deliverable:** section inventory, measurements sheet, motion spec, asset map.

---

## Phase 2 — Project Setup (Day 3)

### 2.1 Create the project

```bash
npx create-next-app@latest era-landing --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd era-landing

npm i gsap @gsap/react lenis embla-carousel-react clsx zod resend
npm i -D prettier prettier-plugin-tailwindcss @next/bundle-analyzer
```

All GSAP plugins (SplitText, DrawSVG, Draggable, Inertia) ship in the free `gsap` package.

### 2.2 Git + Vercel from day one

- [ ] Push to GitHub.
- [ ] Import the repo in Vercel. Every push now gets a **preview URL** you can open on real phones.

### 2.3 Folder structure

```
src/
  app/
    layout.tsx            # fonts, SmoothScroll provider, basic <title> + favicon
    page.tsx              # assembles all sections in order
    actions.ts            # "Book a call" server action
    globals.css           # Tailwind + @theme tokens
  components/
    sections/
      Preloader.tsx
      Header.tsx
      MenuOverlay.tsx
      Hero.tsx
      Reasons.tsx
      Concept.tsx
      GoldenMile.tsx
      LocationMap.tsx
      MasterPlan.tsx
      ApartmentTypes.tsx
      Amenities.tsx
      LiveIn.tsx
      InteriorGallery.tsx
      Architecture.tsx
      FinalCta.tsx
      Footer.tsx
    ui/
      RollButton.tsx      # text-roll hover button
      AlphaVideo.tsx      # transparent video (Safari + Chrome)
      SplitHeading.tsx    # SplitText reveal heading
      SlideCounter.tsx    # 00 / 00 counter
      Modal.tsx
      BookCallForm.tsx
      CookieBanner.tsx
    providers/
      SmoothScroll.tsx
  hooks/
    useReveal.ts
    useLenis.ts
  lib/
    gsap.ts               # plugin registration + defaults
    content.ts            # all copy and data
public/
  images/
  svg/
```

### 2.4 Environment variables

Create `.env.local`:

```
RESEND_API_KEY=
SALES_EMAIL=
NEXT_PUBLIC_ASSETS_URL=https://assets.yourdomain.com
```

---

## Phase 3 — Design Tokens & Base Components (Days 3–4)

### 3.1 Tokens

Put the values from your Phase 1 measurements into `globals.css`:

```css
@import 'tailwindcss';

@theme {
  --color-sky: #your-color;
  --color-blossom: #your-color;
  --color-ink: #your-color;
  --color-paper: #your-color;

  --font-display: var(--font-display), serif;
  --font-body: var(--font-body), sans-serif;

  --ease-roll: cubic-bezier(0.65, 0, 0.35, 1);
}

.text-hero {
  font-size: clamp(3rem, 10vw, 11rem);
  line-height: 0.9;
}
```

### 3.2 Fonts

Load the fonts locally with `next/font/local` in `layout.tsx`. This avoids layout shift and external requests.

### 3.3 Base components

**RollButton** — the duplicated-label hover effect (pure CSS, no GSAP needed):

```tsx
export function RollButton({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="group relative inline-flex overflow-hidden">
      <span className="block transition-transform duration-500 ease-roll group-hover:-translate-y-full">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 translate-y-full transition-transform duration-500 ease-roll group-hover:translate-y-0"
      >
        {label}
      </span>
    </a>
  );
}
```

**AlphaVideo** — transparent video with lazy play/pause:

```tsx
'use client';
import { useEffect, useRef } from 'react';

export function AlphaVideo({ name, className }: { name: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { rootMargin: '200px' },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const base = process.env.NEXT_PUBLIC_ASSETS_URL;
  return (
    <video ref={ref} className={className} muted loop playsInline preload="none" aria-hidden="true">
      <source src={`${base}/${name}.mov`} type='video/mp4; codecs="hvc1"' />
      <source src={`${base}/${name}.webm`} type="video/webm" />
    </video>
  );
}
```

Also build now: `SplitHeading`, `SlideCounter` (formats numbers as `01`, `02`…), `Modal` (focus trap, Escape to close).

---

## Phase 4 — Animation Foundation (Day 5)

### 4.1 Central GSAP setup — `lib/gsap.ts`

```ts
'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin, DrawSVGPlugin, useGSAP);
gsap.defaults({ ease: 'power3.out', duration: 1 });

export { gsap, ScrollTrigger, SplitText, Draggable, useGSAP };
```

Always import GSAP from `@/lib/gsap`, never directly, so plugins are registered once.

### 4.2 Smooth scroll — `providers/SmoothScroll.tsx`

```tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({ lerp: 0.1 });
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
```

The context lets the preloader and modal call `lenis.stop()` / `lenis.start()`, and the "To top" link call `lenis.scrollTo(0)`.

### 4.3 Reusable reveal hook — `hooks/useReveal.ts`

```ts
import { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

export function useReveal(scope: RefObject<HTMLElement | null>, selector = '[data-reveal]') {
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    },
    { scope },
  );
}
```

### 4.4 Rules for every animated component

- [ ] `'use client'` at the top.
- [ ] Use `useGSAP()` with a `scope` ref (automatic cleanup on unmount).
- [ ] Animate only `transform`, `opacity` and `clip-path`. Never `width`, `height`, `top` or `left`.
- [ ] Wrap animations in `gsap.matchMedia()` to provide a **reduced-motion** version and separate **desktop/mobile** behavior.
- [ ] Call `ScrollTrigger.refresh()` once after the preloader finishes and fonts are loaded.

---

## Phase 5 — Static Build of All Sections (Days 6–9)

Build every section **without any animation**. Match the reference at all four measured widths before adding motion.

- [ ] Build mobile-first, then scale up to 1440px.
- [ ] Use `svh` / `dvh` instead of `100vh` for full-screen sections (fixes the iOS address-bar jump).
- [ ] Pull all text and data from `lib/content.ts`.
- [ ] Use semantic HTML: one `<h1>` in the hero, `<section>` with headings, real `<button>` elements.
- [ ] Position the flower videos with `absolute` inside `relative` sections and `pointer-events: none`.
- [ ] Wire the sliders with **Embla Carousel** (Reasons, Apartment Types, Interior Gallery) and connect `SlideCounter` to `emblaApi.selectedScrollSnap()`.
- [ ] Side-by-side check each section against the reference in two browser windows.

**Checkpoint:** the full page looks right at every width with zero animation.

---

## Phase 6 — Animations Section by Section (Days 10–16)

Build one section at a time and test it on a real phone (via the Vercel preview URL) before moving on. Use your Phase 1 motion spec for timings.

### 6.1 Preloader

- [ ] Lock scroll with `lenis.stop()`.
- [ ] Wait for hero images and fonts: `Promise.all([document.fonts.ready, ...imagePromises])`.
- [ ] Animate the counter:
  ```ts
  const counter = { value: 0 };
  tl.to(counter, {
    value: 100,
    duration: 2,
    ease: 'power2.inOut',
    onUpdate: () => {
      el.textContent = String(Math.round(counter.value)).padStart(2, '0');
    },
  });
  ```
- [ ] Reveal the page (clip-path or translate-up of the preloader panel).
- [ ] `lenis.start()` → `ScrollTrigger.refresh()` → trigger the hero intro.
- [ ] Don't block the page forever: add a max timeout (e.g. 4s) in case an asset fails.

### 6.2 Header & menu overlay

- [ ] Header hides on scroll down, shows on scroll up (ScrollTrigger `onUpdate` checking `self.direction`).
- [ ] Menu open: overlay clip-path reveal, links and 3 cards stagger in. Stop Lenis while open.
- [ ] Menu/Close label uses the roll effect.

### 6.3 Hero

- [ ] Title reveal with SplitText:
  ```ts
  const split = SplitText.create(titleRef.current, { type: 'chars,lines', mask: 'lines' });
  gsap.from(split.chars, { yPercent: 100, stagger: 0.03, duration: 1.2, ease: 'power4.out' });
  ```
- [ ] Day/night toggle — stack both images and wipe the night image:
  ```ts
  gsap.to(nightRef.current, {
    clipPath: isNight ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
    duration: 1.2,
    ease: 'power3.inOut',
  });
  ```
- [ ] Subtle scroll parallax on the hero image (`yPercent`, `scrub: true`).
- [ ] Looping "Scroll" indicator.

### 6.4 Generic scroll reveals

- [ ] Add `data-reveal` to headings, paragraphs and images, and call `useReveal` in each section.
- [ ] Use `SplitHeading` for the large section headings.

### 6.5 Concept & Golden Mile

- [ ] Scale-in or clip-path reveal on the cut-out building image.
- [ ] Parallax on images with `scrub`.

### 6.6 Location map

- [ ] Cloud layers move at different speeds:
  ```ts
  gsap.utils.toArray<HTMLElement>('.cloud').forEach((cloud, i) => {
    gsap.to(cloud, {
      xPercent: i % 2 ? 20 : -20,
      scrollTrigger: { trigger: sectionRef.current, scrub: true },
    });
  });
  ```
- [ ] Draw the route path on scroll:
  ```ts
  gsap.from('.map-path', {
    drawSVG: '0%',
    ease: 'none',
    scrollTrigger: { trigger: mapRef.current, start: 'top 70%', end: 'bottom 40%', scrub: true },
  });
  ```
- [ ] Fade labels in along the path.

### 6.7 Master plan (drag to explore)

- [ ] Make the image draggable inside its container:
  ```ts
  Draggable.create(imageRef.current, { type: 'x', bounds: containerRef.current, inertia: true });
  ```
- [ ] Hide the "Drag to see more" hint after the first drag.
- [ ] On touch devices, consider native `overflow-x: auto` instead.

### 6.8 Horizontal scroll sections

If the reference pins any section and moves horizontally while scrolling:

```ts
const distance = () => trackRef.current!.scrollWidth - window.innerWidth;

gsap.to(trackRef.current, {
  x: () => -distance(),
  ease: 'none',
  scrollTrigger: {
    trigger: sectionRef.current,
    pin: true,
    scrub: 1,
    end: () => `+=${distance()}`,
    invalidateOnRefresh: true,
  },
});
```

Use `gsap.matchMedia()` to switch to a normal swipe slider on mobile.

### 6.9 Apartment types, Reasons & Interior gallery sliders

- [ ] Animate the active slide's text on change (Embla `select` event → short GSAP timeline).
- [ ] Animate the `00 / 00` counter digits with a roll (same technique as the button).

### 6.10 Amenities tabs

- [ ] Crossfade/clip-path between images on tab change.
- [ ] Animate the tab description text in and out.
- [ ] Keyboard support: arrow keys between tabs, `role="tablist"` / `role="tab"` / `aria-selected`.

### 6.11 Final CTA & footer

- [ ] Image scale-down reveal as the CTA enters.
- [ ] "To top" → `lenis.scrollTo(0, { duration: 2 })`.

### 6.12 Flower videos

- [ ] Already lazy via `AlphaVideo`. Add a gentle scroll parallax (`y`) to each so they float.

---

## Phase 7 — Media Pipeline (parallel with Phase 6)

### 7.1 Images

- [ ] Export at 2x the largest display size.
- [ ] Use `next/image` everywhere (automatic AVIF/WebP and responsive sizes).
- [ ] Set `priority` on the hero day image only.
- [ ] Always set `sizes`, e.g. `sizes="(max-width: 768px) 100vw, 50vw"`.
- [ ] Use `placeholder="blur"` for large photos.

### 7.2 Transparent videos

Start from ProRes 4444 (with alpha) exports, then create two versions of each:

```bash
# Chrome / Firefox / Edge — VP9 with alpha
ffmpeg -i flower_01.mov -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 32 -an flower_01.webm

# Safari — HEVC with alpha (must run on a Mac)
ffmpeg -i flower_01.mov -c:v hevc_videotoolbox -allow_sw 1 -alpha_quality 0.75 -vtag hvc1 -an flower_01.mov
```

- [ ] Keep each video short and small (aim for under 1–2 MB).
- [ ] Test in Safari that the background is actually transparent (not black).

### 7.3 Hosting

- [ ] Create a **Cloudflare R2** bucket, connect a custom domain (`assets.yourdomain.com`).
- [ ] Upload the videos; set `Cache-Control: public, max-age=31536000, immutable`.
- [ ] Keep videos out of the Git repo.

---

## Phase 8 — Book a Call Form & Cookie Banner (Day 17)

### 8.1 Server action — `app/actions.ts`

```ts
'use server';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().max(2000).optional(),
  company: z.string().max(0), // honeypot, must stay empty
});

export async function bookCall(_: unknown, formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: 'Please check your details.' };

  const { name, email, phone, message } = parsed.data;
  try {
    await resend.emails.send({
      from: 'Website <leads@yourdomain.com>',
      to: process.env.SALES_EMAIL!,
      replyTo: email,
      subject: `New call request — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message ?? ''}`,
    });
    return { ok: true };
  } catch {
    return { ok: false, error: 'Something went wrong. Please try again.' };
  }
}
```

- [ ] Verify your sending domain in Resend.
- [ ] In `BookCallForm`, use `useActionState(bookCall, null)` for idle / submitting / success / error states.
- [ ] Animate the success state in the modal (matching the reference's "Thank you" screen).
- [ ] Optional: add Cloudflare Turnstile if spam appears; forward leads to your CRM.

### 8.2 Cookie banner

- [ ] Show on first visit; store the choice in `localStorage`.
- [ ] Load analytics / GTM **only after Accept** (required for EU visitors under GDPR).
- [ ] Animate in/out like the reference.

---

## Phase 9 — Performance & Accessibility (Day 18)

### Performance

- [ ] Lighthouse on mobile profile: target **90+**.
- [ ] Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- [ ] Run the bundle analyzer: `ANALYZE=true npm run build`.
- [ ] Lazy-load heavy below-the-fold sections with `next/dynamic` if needed.
- [ ] Confirm no layout shift when the preloader exits.
- [ ] Check the Performance panel while scrolling: no long frames during animations.

### Accessibility

- [ ] Reduced-motion users get simple fades (no parallax, no pinning, no smooth scroll).
- [ ] Full keyboard navigation: menu, modal, tabs, sliders, day/night toggle.
- [ ] Visible focus styles.
- [ ] Meaningful `alt` on content images; `alt=""` on decorative ones (clouds, flowers).
- [ ] Color contrast meets WCAG AA.

---

## Phase 10 — Cross-Browser & Device QA (Days 19–20)

### Test matrix

| Device               | Browser               | Watch for                                                      |
| -------------------- | --------------------- | -------------------------------------------------------------- |
| Desktop              | Chrome, Firefox, Edge | Baseline behavior                                              |
| Desktop              | Safari                | Alpha videos, clip-path, font rendering                        |
| iPhone (real device) | Safari                | Alpha videos, `svh`, pinned sections, Lenis on touch, autoplay |
| Mid-range Android    | Chrome                | Scroll performance (your realistic floor)                      |
| iPad                 | Safari                | In-between breakpoint layouts                                  |

### Checklist

- [ ] Resize the window and rotate devices: ScrollTrigger positions recalculate correctly.
- [ ] Side-by-side comparison with the reference at all 4 widths.
- [ ] Every animation matches the motion spec timing.
- [ ] Form: real submission arrives in the inbox; error and success states display correctly.
- [ ] Preloader works on a slow connection (DevTools → Network → Slow 4G).
- [ ] Menu and modal lock scrolling and restore it on close.

---

## Phase 11 — Production Deployment (Day 21)

- [ ] Add environment variables in Vercel (Production + Preview).
- [ ] Connect the custom domain; configure DNS; confirm HTTPS.
- [ ] Set the `www` ↔ root redirect.
- [ ] Add security headers in `next.config.ts`:
  ```ts
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }];
  },
  ```
- [ ] Final Lighthouse run on the **production URL**.
- [ ] Final test submission of the form from production.

---

## Phase 12 — Post-Launch

- [ ] Error monitoring with **Sentry** (free tier).
- [ ] Core Web Vitals in **Vercel Analytics / Speed Insights**.
- [ ] Uptime monitoring (e.g. UptimeRobot).
- [ ] Watch form submissions for the first week.

---

## Timeline Summary

| Phase                       | Days            |
| --------------------------- | --------------- |
| 1. Reference analysis       | 1–2             |
| 2. Project setup            | 3               |
| 3. Tokens & base components | 3–4             |
| 4. Animation foundation     | 5               |
| 5. Static build             | 6–9             |
| 6. Animations               | 10–16           |
| 7. Media pipeline           | parallel with 6 |
| 8. Form & cookie banner     | 17              |
| 9. Performance & a11y       | 18              |
| 10. QA                      | 19–20           |
| 11. Deployment              | 21              |

**Buffer:** add 3–5 days. Phase 6 (animations) and iPhone Safari fixes are where timelines usually slip.
