import { sections, site } from '@/lib/content';
import { MenuOverlay } from './MenuOverlay';

// TODO (Phase 5): Menu/Close toggle. Phase 6.2: hide on scroll down, show on scroll up.
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4">
      <a href={`#${sections.hero.id}`} className="font-display text-xl">
        {site.name}
      </a>
      <MenuOverlay />
    </header>
  );
}
