/**
 * Remove backgrounds from catalogue page PNGs.
 * Pipeline:
 * 1. Crop the coloured header banner (165 px)
 * 2. Clear the pill-tag zone (top 55 px after crop)
 * 3. Remove near-white and catalogue brand colours
 * 4. A few erosion passes to clean up anti-aliased text edges
 * 5. Connected-component size filter — remove any opaque region smaller than
 *    MIN_COMPONENT_PX pixels.  Text characters / labels are tiny isolated blobs
 *    (< 3 000 px each); product photos are large (> 20 000 px).
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { Jimp } = require('jimp');
import { readdir } from 'fs/promises';
import path from 'path';

const CATALOGUE_DIR    = path.resolve('src/assets/media/catalogue');
const WHITE_THRESHOLD  = 213;
const TEXT_DARK_LIMIT  = 80;
const EROSION_PASSES   = 8;
const MIN_COMPONENT_PX = 4000;  // blobs smaller than this are removed (text, icons, noise)
const HEADER_CROP_PX   = 165;
const PILL_CLEAR_PX    = 55;

const BRAND_COLORS = [
  { r: 28,  g: 99,  b: 183, tol: 30 },
  { r: 95,  g: 50,  b: 153, tol: 25 },
  { r: 71,  g: 188, b: 76,  tol: 30 },
  { r: 105, g: 198, b: 67,  tol: 30 },
  { r: 81,  g: 198, b: 226, tol: 30 },
  { r: 169, g: 227, b: 241, tol: 30 },
];

const isNearWhite   = (r, g, b) => r > WHITE_THRESHOLD && g > WHITE_THRESHOLD && b > WHITE_THRESHOLD;
const isBrandColor  = (r, g, b) => BRAND_COLORS.some(({ r:cr, g:cg, b:cb, tol }) =>
  Math.abs(r-cr) <= tol && Math.abs(g-cg) <= tol && Math.abs(b-cb) <= tol);
const isDarkText    = (r, g, b) => r < TEXT_DARK_LIMIT && g < TEXT_DARK_LIMIT && b < TEXT_DARK_LIMIT;

/** Single erosion pass: remove dark pixels adjacent to transparent */
function erodeOnce(data, w, h) {
  const alpha = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) alpha[i] = data[i * 4 + 3];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (alpha[i] === 0) continue;
      const idx = i * 4;
      if (!isDarkText(data[idx], data[idx+1], data[idx+2])) continue;
      outer: for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const nx = x+dx, ny = y+dy;
          if (nx < 0 || nx >= w || ny < 0 || ny >= h || alpha[ny*w+nx] === 0) {
            data[idx+3] = 0; break outer;
          }
        }
      }
    }
  }
}

/**
 * BFS flood fill — returns array of pixel indices in component.
 * Uses 4-connectivity so characters on the same line stay separate.
 */
function floodFill(alpha, w, h, visited, startX, startY) {
  const component = [];
  const queue = [startY * w + startX];
  visited[startY * w + startX] = 1;

  while (queue.length) {
    const i = queue.pop();
    component.push(i);
    const x = i % w, y = (i / w) | 0;
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = x+dx, ny = y+dy;
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const ni = ny*w+nx;
      if (visited[ni] || alpha[ni] === 0) continue;
      visited[ni] = 1;
      queue.push(ni);
    }
  }
  return component;
}

/** Remove all connected components with fewer than minSize opaque pixels */
function removeSmallComponents(data, w, h, minSize) {
  const alpha = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) alpha[i] = data[i * 4 + 3];

  const visited = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      if (visited[i] || alpha[i] === 0) continue;
      const component = floodFill(alpha, w, h, visited, x, y);
      if (component.length < minSize) {
        for (const pi of component) data[pi * 4 + 3] = 0;
      }
    }
  }
}

async function processImage(filePath) {
  const filename = path.basename(filePath);
  const image = await Jimp.read(filePath);
  const { width, height } = image.bitmap;

  // 1. Crop header
  const cropY = filename === 'vehicular.png' ? 0 : HEADER_CROP_PX;
  if (cropY > 0) image.crop({ x: 0, y: cropY, w: width, h: height - cropY });

  const w = image.bitmap.width;
  const h = image.bitmap.height;
  const data = image.bitmap.data;

  // 2. Remove near-white, brand colours, pill zone
  const pillClear = filename === 'souvenirs-eventos.png' ? 0 : PILL_CLEAR_PX;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      if (y < pillClear || isNearWhite(r, g, b) || isBrandColor(r, g, b)) data[idx+3] = 0;
    }
  }

  // 3. Erosion — thin out anti-aliased text edges
  const passes = filename === 'souvenirs-eventos.png' ? 4 : EROSION_PASSES;
  for (let p = 0; p < passes; p++) erodeOnce(data, w, h);

  // 4. Connected-component filter — nuke small isolated blobs (text labels)
  removeSmallComponents(data, w, h, MIN_COMPONENT_PX);

  await image.write(filePath);
  console.log(`✓ ${filename}`);
}

const files = (await readdir(CATALOGUE_DIR))
  .filter(f => f.endsWith('.png') && f !== 'vehicular.png');

for (const file of files) {
  await processImage(path.join(CATALOGUE_DIR, file));
}

console.log(`\nDone — ${files.length} files processed.`);
