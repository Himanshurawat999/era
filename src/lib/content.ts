// All copy, data and asset paths for the page. Components read from here, never hard-code.
// Values marked TODO are placeholders. Asset slots are mapped in docs/assets-map.md.

export const site = {
  name: 'TODO: Project name',
  description: 'TODO: One-line description for search results.',
};

// TODO: placeholder copy. Arrays are one entry per line.
export const preloader = {
  sideLeft: 'Sun',
  title: ['Project', 'Name'],
  script: 'Seaside',
  sideRight: 'Sea',
  tagline: ['Project Name', 'Where the days slow down.'],
} as const;

export const sections = {
  hero: { id: 'hero', label: 'Hero' },
  reasons: { id: 'reasons', label: 'Reasons' },
  concept: { id: 'concept', label: 'Concept' },
  goldenMile: { id: 'golden-mile', label: 'Golden Mile' },
  location: { id: 'location', label: 'Location' },
  masterPlan: { id: 'master-plan', label: 'Master plan' },
  apartments: { id: 'apartments', label: 'Apartment types' },
  amenities: { id: 'amenities', label: 'Amenities' },
  liveIn: { id: 'live-in', label: 'The space to live in' },
  gallery: { id: 'gallery', label: 'Interior gallery' },
  architecture: { id: 'architecture', label: 'Architecture' },
  finalCta: { id: 'contact', label: 'Final CTA' },
} as const;

export const images = {
  heroDay: '/images/gated-community-day.webp',
  heroNight: '/images/gated-community-night.webp',
  conceptBuilding: '/images/building-cutout.webp',
  clouds: ['/images/cloud-02.avif', '/images/cloud-33.avif', '/images/cloud-47.avif'],
  masterPlan: '/images/master-plan.webp',
  finalCta: '/images/cta.webp',
} as const;

export const amenities = [
  { id: 'gated-community', label: 'Gated community', image: '/images/gated-community.webp' },
  { id: 'pool', label: 'Pool', image: '/images/pool.webp' },
  { id: 'parking', label: 'Parking', image: '/images/parking.webp' },
  { id: 'spa-gym', label: 'Spa & gym', image: '/images/spa-gym.webp' },
  { id: 'landscaping', label: 'Landscaping', image: '/images/landscaping.webp' },
] as const;

export const svgs = {
  preloaderLandscape: '/svg/landscape.svg',
  preloaderBg: '/svg/preloader-bg.svg',
  mapPath: '/svg/loc-path.svg',
  mapLabels: '/svg/loc-path-labels.svg',
} as const;

/** Names passed to <AlphaVideo />; each has a .webm and a .mov under NEXT_PUBLIC_ASSETS_URL. */
export const flowerVideos = [
  'flower-01',
  'flower-02',
  'flower-03',
  'flower-04',
  'flower-05',
  'flower-06',
  'flower-07',
] as const;
