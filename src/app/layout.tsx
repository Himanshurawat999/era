import type { Metadata } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { site } from '@/lib/content';

// Placeholder faces. Once the licensed fonts are chosen (Phase 1.2), switch to
// next/font/local with the files in src/fonts and keep the same `variable` names.
const display = Instrument_Serif({
  variable: '--font-display-face',
  subsets: ['latin'],
  weight: '400',
});

const body = Geist({
  variable: '--font-body-face',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="bg-paper font-body text-ink">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
