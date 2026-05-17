# JM Publicidad — Media Library

This folder is the single source of truth for all media assets used across the website.
Drop files here; reference them with relative imports in components.

## Structure

| Folder | Contents |
|--------|----------|
| `cta/` | CTA section background images (e.g. `entrepreneur-bg.jpg`) |
| `hero/` | Hero section images and watermarks |
| `catalogue/` | Product catalogue PDF and extracted images (`Cata.pdf`, etc.) |
| `portfolio/` | Client project photography from Google Drive libraries |
| `brand/` | Logo variants, brand assets, fonts |

## To replace the entrepreneur CTA background

1. Drop your photo into `cta/entrepreneur-bg.jpg` (overwrite the placeholder)
2. The image renders at ~10% opacity blended over the green — any clear portrait shot works
3. Commit with: `chore: replace cta entrepreneur placeholder with real photo`

## Client photo libraries

- Library 1: https://photos.app.goo.gl/nrkqJvZ1AH7HdjNG8
- Library 2: https://photos.app.goo.gl/dqCPaJMiA7LJJyRV7

Download from these and place into `portfolio/` before client handoff.
