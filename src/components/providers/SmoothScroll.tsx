'use client';

import { useEffect, useRef } from 'react';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  // Keep ScrollTrigger in sync with Lenis's scroll position.
  useLenis(ScrollTrigger.update);

  useEffect(() => {
    // Drive Lenis from GSAP's ticker so scroll and animations share one frame loop.
    const tick = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
