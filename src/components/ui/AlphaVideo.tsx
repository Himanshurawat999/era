'use client';

import { useEffect, useRef } from 'react';

/** Transparent looping video that only plays while near the viewport. */
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
      {/* Safari: HEVC with alpha. Others: VP9 with alpha. */}
      <source src={`${base}/${name}.mov`} type='video/mp4; codecs="hvc1"' />
      <source src={`${base}/${name}.webm`} type="video/webm" />
    </video>
  );
}
