const pad = (n: number) => String(n).padStart(2, '0');

/** "01 / 03" style counter. `current` is 1-based. */
export function SlideCounter({
  current,
  total,
  className,
}: {
  current: number;
  total: number;
  className?: string;
}) {
  return (
    <p className={className}>
      <span>{pad(current)}</span> / <span>{pad(total)}</span>
    </p>
  );
}
