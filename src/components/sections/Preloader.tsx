'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { CustomEase, gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';
import { preloader, svgs } from '@/lib/content';

const SEEN_KEY = 'preloader-seen';
const MAX_WAIT_MS = 4000;

// Width multiplier and top offset (as a fraction of --arch-w) of the outlines around the arch,
// chosen so each outline's rounded top shares the hole's center.
const ARCH_RINGS = [
  { width: 1.12, offset: 0.06 },
  { width: 1.04, offset: 0.02 },
];

// Read once per page load, so React's dev double-mount doesn't turn the first visit into a repeat.
let seenThisSession: boolean | undefined;
function hasSeenPreloader() {
  if (seenThisSession === undefined) {
    try {
      seenThisSession = sessionStorage.getItem(SEEN_KEY) === '1';
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      seenThisSession = false;
    }
  }
  return seenThisSession;
}

// Fonts and the hero image, capped at MAX_WAIT_MS so a failed asset never blocks the page.
function assetsReady(heroImage: HTMLImageElement | null | undefined) {
  const loaded = Promise.all([document.fonts.ready, heroImage?.decode().catch(() => {})]);
  const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS));
  return Promise.race([loaded, timeout]);
}

// First visit: text reveal, 4s progress line, then the arch opens onto the hero.
// Repeat visits in the same tab skip straight to the arch. Reduced motion just fades out.
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [done, setDone] = useState(false);

  // Hold the page at the top while the preloader is showing.
  useEffect(() => {
    if (!lenis) return;
    if (done) {
      lenis.start();
      ScrollTrigger.refresh();
    } else {
      lenis.scrollTo(0, { immediate: true });
      lenis.stop();
    }
  }, [lenis, done]);

  useGSAP(
    () => {
      const el = root.current!;
      const q = gsap.utils.selector(el);
      const content = q('[data-content]');
      const decor = q('[data-decor]');
      const hero = document.querySelector<HTMLElement>('[data-hero-image]');
      const ready = assetsReady(hero?.querySelector('img'));
      const desktop = window.matchMedia('(min-width: 1024px)').matches;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const firstVisit = !hasSeenPreloader();

      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);

      const exit = gsap.timeline({ paused: true, onComplete: () => setDone(true) });
      let intro: Promise<unknown> = Promise.resolve();

      if (reduceMotion) {
        gsap.set([content, decor], { autoAlpha: 1 });
        exit.to(el, { autoAlpha: 0, duration: 0.6, ease: 'none' });
      } else {
        const dive = CustomEase.create('preloader-dive', '0.6,0,0,1');
        gsap.set(el, { '--arch-w': desktop ? '24vw' : '40vw', '--arch-y': '104vh' });

        if (firstVisit) {
          // Fast start, a stall near 40%, then a steady finish, so it reads as real loading.
          const progress = CustomEase.create(
            'preloader-progress',
            'M0,0 C0.08,0.22 0.16,0.34 0.24,0.38 0.3,0.41 0.36,0.42 0.42,0.44 0.5,0.47 0.56,0.58 0.64,0.72 0.72,0.84 0.8,0.9 0.88,0.93 0.94,0.96 0.97,0.99 1,1',
          );
          const chars = SplitText.create(q('[data-split="chars"]'), {
            type: 'chars',
            tag: 'span',
          }).chars;
          const scriptChars = SplitText.create(q('[data-split="script"]'), {
            type: 'chars',
            tag: 'span',
          }).chars;

          gsap.set(content, { autoAlpha: 1 });
          intro = gsap
            .timeline({ delay: 0.3, defaults: { duration: 1.2 } })
            .fromTo(
              chars,
              { autoAlpha: 0, yPercent: 50, rotateY: 90, transformPerspective: 600 },
              { autoAlpha: 1, yPercent: 0, rotateY: 0, stagger: 0.05 },
              0,
            )
            .fromTo(
              scriptChars,
              { autoAlpha: 0, x: '4rem', rotateX: 90, transformOrigin: 'center bottom' },
              { autoAlpha: 1, x: 0, rotateX: 0, stagger: 0.1 },
              0.3,
            )
            .fromTo(q('[data-line]'), { yPercent: 110 }, { yPercent: 0, stagger: 0.1 }, 0)
            .fromTo(
              q('[data-rail]'),
              { clipPath: 'inset(0% 0% 100% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)' },
              0,
            )
            .fromTo(decor, { autoAlpha: 0 }, { autoAlpha: 1 }, 1.2)
            .fromTo(
              q('[data-fill]'),
              { yPercent: -100 },
              { yPercent: 0, duration: 4, ease: progress },
            )
            .then();
        } else {
          exit.fromTo(decor, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, 0);
        }

        exit
          .to(
            el,
            {
              '--arch-w': desktop ? '36vw' : '50vw',
              '--arch-y': '15vh',
              duration: 1.5,
              ease: 'power3.inOut',
            },
            0,
          )
          .to(el, { '--arch-w': '125vw', '--arch-y': '-100vh', duration: 2.4, ease: dive }, '<90%');

        if (hero) {
          exit.fromTo(
            hero,
            { scale: desktop ? 0.75 : 1.15, transformOrigin: 'center top' },
            {
              scale: 1,
              duration: 1.5,
              ease: 'power3.inOut',
              clearProps: 'transform,transformOrigin',
            },
            '<',
          );
        }
      }

      let cancelled = false;
      Promise.all([intro, ready]).then(() => {
        if (!cancelled) exit.play();
      });
      return () => {
        cancelled = true;
      };
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-100 overflow-hidden bg-plum arch-mask text-paper"
    >
      <div data-decor className="invisible absolute inset-6">
        <Image
          src={svgs.preloaderBg}
          alt=""
          fill
          loading="eager"
          className="object-cover opacity-5"
        />
        <Frame />
      </div>

      <div data-content className="invisible relative flex h-full flex-col p-6">
        {/* Top and bottom rows share the free space equally, keeping the middle row centered. */}
        {/* TODO: our logo goes in the top row. */}
        <div className="flex-1" />

        <div className="flex items-center justify-center gap-16">
          <p data-split="chars" className="hidden font-display text-3xl uppercase lg:block">
            {preloader.sideLeft}
          </p>

          <div className="flex flex-col items-center">
            <p className="text-center font-display text-6xl leading-none uppercase lg:text-8xl">
              {preloader.title.map((line) => (
                <span key={line} data-split="chars" className="block">
                  {line}
                </span>
              ))}
            </p>
            <p
              data-split="script"
              className="-mt-2 -ml-8 -rotate-12 font-display text-4xl italic lg:text-6xl"
            >
              {preloader.script}
            </p>
          </div>

          <p data-split="chars" className="hidden font-display text-3xl uppercase lg:block">
            {preloader.sideRight}
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-end gap-8">
          <div data-rail className="h-24 w-px overflow-hidden bg-paper/10">
            <div data-fill className="size-full bg-paper" />
          </div>
          <p className="text-center text-xs font-bold tracking-widest uppercase">
            {preloader.tagline.map((line) => (
              <span key={line} className="block overflow-hidden">
                <span data-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Plum-filled outlines that follow the hole, drawing thin rings around the arch. */}
      {ARCH_RINGS.map(({ width, offset }) => (
        <div
          key={width}
          className="pointer-events-none absolute left-1/2 h-[300vh] -translate-x-1/2 rounded-t-full border border-paper/10 bg-plum"
          style={{
            width: `calc(var(--arch-w) * ${width})`,
            top: `calc(var(--arch-y) - var(--arch-w) * ${offset})`,
          }}
        />
      ))}
    </div>
  );
}

// Thin frame with cut corners: a 3×3 grid of plain edges and diagonal corner squares.
function Frame() {
  return (
    <div className="absolute inset-0 grid grid-cols-[2rem_1fr_2rem] grid-rows-[2rem_1fr_2rem] text-paper/10">
      <Diagonal rising />
      <div className="border-t border-current" />
      <Diagonal />
      <div className="border-l border-current" />
      <div />
      <div className="border-r border-current" />
      <Diagonal />
      <div className="border-b border-current" />
      <Diagonal rising />
    </div>
  );
}

function Diagonal({ rising = false }: { rising?: boolean }) {
  return (
    <svg className="size-full overflow-visible">
      <line
        x1="0"
        y1={rising ? '100%' : '0'}
        x2="100%"
        y2={rising ? '0' : '100%'}
        stroke="currentColor"
      />
    </svg>
  );
}
