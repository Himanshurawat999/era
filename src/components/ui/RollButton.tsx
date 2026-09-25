// Duplicated-label hover roll. Pure CSS, no GSAP.
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
