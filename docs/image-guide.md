# Gyro Labs — Image Guide

All images live under `assets/images/`. Every file referenced by the site is already included as an SVG. Photos are optional upgrades.

## Naming rules

1. Lowercase letters, numbers and hyphens only. No spaces, no capitals, no underscores.
2. Pattern: `<type>-<subject>[-<variant>].<ext>`
3. Types: `icon-`, `hero-`, `concept-`, `render-`, `og-`, `founder-`, `project-`, `photo-`.
4. Size suffixes are only used when the same image exists in several sizes: `-800w`, `-1600w`.
5. Keep SVG for logos, icons and illustrations. Use JPG for photographs and PNG only when transparency or the social-share card needs it.

## Folder map

| Folder | Holds | Status |
| --- | --- | --- |
| `assets/images/logo/` | Your logo: mark, full logo, favicon | Included |
| `assets/images/hero/` | Home page hero artwork | Included |
| `assets/images/concepts/` | Interface visualizations (always labelled "concept") | Included |
| `assets/images/icons/` | Service and value icons, 64×64 viewBox | Included |
| `assets/images/photos/` | Real photographs (founder portrait) | Included |
| `assets/images/renders/` | Illustrative workcell renders | Included |
| `assets/images/og/` | Social-share card | Included (replace with your own design if you like) |
| `assets/images/projects/` | Future real project images | Empty until you have approved work |

## Images still worth adding

| File name | Folder | Size | Format | Used on | Notes |
| --- | --- | --- | --- | --- | --- |
| `gyro-labs-logo-full.svg` | `logo/` | vector | SVG | Optional | A vector version of your logo gives the sharpest result at every size. The site currently uses PNG files made from your logo image. |

## Optional images (only add real ones)

| File name | Folder | Size | Notes |
| --- | --- | --- | --- |
| `photo-workcell-wide.jpg` | `photos/` | 1600 × 900 | Only if you have your own or properly licensed workcell photo. |
| `project-<short-name>-01.jpg` | `projects/` | 1600 × 1000 | Only approved, non-confidential project images. Check customer permission first. |
| `concept-<short-name>.svg` | `concepts/` | 640 × 440 | Additional interface concepts. Always show "Concept" on them. |

## Rules for what goes on the site

- No client logos, certifications, or project photos without written permission.
- Do not use ABB logos or screenshots of ABB software. Some included images show ABB robots; keep them captioned as illustrative or concept, and never as Gyro Labs projects.
- Mockups must stay labelled as concepts with example content.
- Compress photos (squoosh.app or similar) to under 200 KB each.
- Always write real `alt` text for photos. Decorative icons keep `alt=""`.
