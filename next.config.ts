import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // next/image only serves WebP by default; opt in to AVIF too.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
