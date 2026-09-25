import { site } from '@/lib/content';

// TODO (Phase 5): phone, address, legal links, social icons.
// Phase 6.11: "To top" → lenis.scrollTo(0, { duration: 2 }).
export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-4 py-12">
      <p>{site.name}</p>
    </footer>
  );
}
