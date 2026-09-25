import type { ReactNode } from 'react';

// TODO (Phase 6.4): SplitText line reveal on scroll; needs 'use client' + useGSAP.
export function SplitHeading({
  as: Tag = 'h2',
  id,
  className,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}
