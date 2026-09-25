import { sections, site } from '@/lib/content';

// TODO (Phase 5): day/night images, scroll indicator, CTA. Motion in Phase 6.3.
export function Hero() {
  return (
    <section id={sections.hero.id} className="flex min-h-svh items-end px-4 pb-16">
      <h1 className="font-display text-hero">{site.name}</h1>
    </section>
  );
}
