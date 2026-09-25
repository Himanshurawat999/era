import { sections } from '@/lib/content';

// TODO (Phase 5): static layout. Motion comes in Phase 6.
export function MasterPlan() {
  const { id, label } = sections.masterPlan;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex min-h-svh items-center justify-center border-t border-ink/10 px-4"
    >
      <h2 id={`${id}-title`} className="font-display text-5xl">
        {label}
      </h2>
    </section>
  );
}
