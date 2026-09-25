import Image from 'next/image';
import { images, sections, site } from '@/lib/content';

// TODO (Phase 5): night image, scroll indicator, CTA. Motion in Phase 6.3.
export function Hero() {
  return (
    <section
      id={sections.hero.id}
      className="relative flex min-h-svh items-end overflow-hidden bg-plum px-4 pb-16"
    >
      {/* Taller than the screen so it still fills it while the preloader scales it up from 75%. */}
      <div data-hero-image className="absolute inset-x-0 top-0 h-[134svh]">
        <Image src={images.heroDay} alt="" fill preload sizes="100vw" className="object-cover" />
      </div>
      <h1 className="relative font-display text-hero">{site.name}</h1>
    </section>
  );
}
