'use client';

import type { RefObject } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/** Fades and lifts every `selector` match inside `scope` as it scrolls into view. */
export function useReveal(scope: RefObject<HTMLElement | null>, selector = '[data-reveal]') {
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(selector, scope.current).forEach((el) => {
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
