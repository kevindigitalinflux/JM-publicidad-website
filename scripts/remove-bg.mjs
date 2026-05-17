/**
 * Remove backgrounds from catalogue page PNGs.
 * Crops the coloured header banner, removes near-white, and removes the
 * specific catalogue brand colours (blue header, purple pill tag, blue footer).
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Jimp } = require('jimp');
import { readdir } from 'fs/promises';
import path from 'path';

const CATALOGUE_DIR = path.resolve('src/assets/media/catalogue');

const WHITE_THRESHOLD = 213;

// Exact pixel row to crop from top (removes the blue "PUBLICIDAD EXTERIOR" header)
const HEADER_CROP_PX = {
  default:       165,
  'vehicular.png': 0,
};

// Catalogue brand colours to treat as background (with tolerance)
// These are design chrome — header band, pill tags, footer bar
const BRAND_COLORS = [
  { r: 28,  g: 99,  b: 183, tol: 30 },  // blue header / footer
  { r: 95,  g: 50,  b: 153, tol: 25 },  // purple pill tag
  { r: 71,  g: 188, b: 76,  tol: 30 },  // green logo element
  { r: 105, g: 198, b: 67,  tol: 30 },  // lime logo element
  { r: 81,  g: 198, b: 226, tol: 30 },  // cyan logo element
  { r: 169, g: 227, b: 241, tol: 30 },  // light blue logo element
];

function isNearWhite(r, g, b) {
  return r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD;
}

function isBrandColor(r, g, b) {
  return BRAND_COLORS.some(
    ({ r: cr, g: cg, b: cb, tol }) =>
      Math.abs(r - cr) <= tol && Math.abs(g - cg) <= tol && Math.abs(b - cb) <= tol
  );
}

async function processImage(filePath) {
  const filename = path.basename(filePath);
  const image = await Jimp.read(filePath);
  const { width, height } = image.bitmap;

  // Crop the header band
  const cropY = HEADER_CROP_PX[filename] ?? HEADER_CROP_PX.default;
  if (cropY > 0) {
    image.crop({ x: 0, y: cropY, w: width, h: height - cropY });
  }

  const croppedHeight = image.bitmap.height;

  // Top 55px after crop is the pill-tag zone — clear everything there unconditionally.
  // Product photos on all catalogue pages start below this band.
  const PILL_CLEAR_PX = filename === 'souvenirs-eventos.png' ? 0 : 55;

  image.scan(0, 0, image.bitmap.width, croppedHeight, function (x, y, idx) {
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];

    if (y < PILL_CLEAR_PX || isNearWhite(r, g, b) || isBrandColor(r, g, b)) {
      this.bitmap.data[idx + 3] = 0;
    }
  });

  await image.write(filePath);
  console.log(`✓ ${filename}`);
}

const files = (await readdir(CATALOGUE_DIR))
  .filter(f => f.endsWith('.png') && f !== 'vehicular.png');

for (const file of files) {
  await processImage(path.join(CATALOGUE_DIR, file));
}

console.log(`\nDone — ${files.length} files processed.`);
