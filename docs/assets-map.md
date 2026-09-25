# Assets map

Which file fills each slot on the page. Paths are relative to `public/`, and code reads them from `src/lib/content.ts`.

> **Source:** everything below came from `Downloads/assets`, which was saved from the reference site (Webflow asset IDs in the original filenames). These are **development stand-ins**. The roadmap calls for our own assets, so replace each file before any public deploy unless we have the rights to use it. Keep the filename and the swap needs no code change.

## Assigned

| Section       | Slot                                                       | File                                                                                           | Confidence |
| ------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------- |
| Preloader     | Landscape drawing                                          | `svg/landscape.svg`                                                                            | High       |
| Preloader     | Background                                                 | `svg/preloader-bg.svg`                                                                         | High       |
| Hero          | Day image                                                  | `images/gated-community-day.webp`                                                              | High       |
| Hero          | Night image                                                | `images/gated-community-night.webp`                                                            | High       |
| Concept       | Cut-out building (alpha)                                   | `images/building-cutout.webp`                                                                  | High       |
| Location map  | Cloud layers                                               | `images/cloud-02.avif`, `cloud-33.avif`, `cloud-47.avif`                                       | High       |
| Location map  | Route path                                                 | `svg/loc-path.svg`                                                                             | High       |
| Location map  | Path labels                                                | `svg/loc-path-labels.svg`                                                                      | High       |
| Master plan   | Aerial                                                     | `images/master-plan.webp`                                                                      | High       |
| Amenities     | Gated community / Pool / Parking / Spa & gym / Landscaping | `images/gated-community.webp`, `pool.webp`, `parking.webp`, `spa-gym.webp`, `landscaping.webp` | High       |
| Final CTA     | Sea-view image                                             | `images/cta.webp`                                                                              | High       |
| Architecture  | Credit logo                                                | `svg/unreal-logo.svg`                                                                          | High       |
| Flower videos | 7 floating videos                                          | `videos/flower-01…07.{webm,mov}` (git-ignored → R2)                                            | High       |

## To assign in Phase 1

Check these against the reference to find their slots.

| File                                                                  | Likely slot                                                         |
| --------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `images/cam-02.webp`, `cam-03.webp`, `cam-07.webp`                    | Reasons slider (3 cards)? Golden Mile?                              |
| `images/ground-floor-basement.webp`                                   | Apartment types slider                                              |
| `images/terrace.webp`, `garden.webp`, `garden-2.webp`, `kitchen.webp` | Interior gallery (4) / The space to live in                         |
| `svg/unsorted/svg-10.svg` (40×40 mark)                                | Brand mark, likely the reference's logo. Replace with ours.         |
| `svg/unsorted/svg-11.svg` (120×120 lettered badge)                    | Circular badge, likely the reference's branding. Replace with ours. |
| `svg/unsorted/svg-25.svg` (48×48 glyph)                               | Unknown                                                             |

## Icons

`svg/icons/`: `chevron-left`, `chevron-right`, `plus`, `arrow-left`, `arrow-right`. All use `currentColor`.

## Not imported

| Original                                                                                                                        | Why                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Duplicates (3× terrace, 2× landscaping, 2× cam-02, cam-09 = ground-floor-basement, and every SVG in both `images/` and `svgs/`) | One copy kept                                                                         |
| `icons/svg-45.svg` (1.5 MB)                                                                                                     | A captured frame of a Lottie animation with embedded bitmaps, not a usable SVG        |
| `svgs/svg-19.svg`                                                                                                               | Snapshot of an animated progress ring, so build it in code                            |
| `svgs/svg-21.svg`                                                                                                               | Circular text path containing the reference's copy, so build it in code with our text |
| `svg-55/56/57/58.svg`                                                                                                           | 1px divider lines (invalid `viewBox`), so use CSS borders                             |

## Missing

- Fonts: none supplied. `layout.tsx` uses placeholders (Instrument Serif and Geist).
- Our own logo, favicon and OG image.
- Developer and sales logos for the Architecture section.
