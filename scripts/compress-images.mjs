import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const targets = [
  // Service card backgrounds — displayed at 7% opacity, fine at low quality
  { in: 'src/assets/sections/service-print.jpg',    out: 'src/assets/sections/service-print.jpg',    w: 1200, q: 55 },
  { in: 'src/assets/sections/service-exterior.jpg', out: 'src/assets/sections/service-exterior.jpg', w: 1200, q: 60 },
  { in: 'src/assets/sections/service-digital.jpg',  out: 'src/assets/sections/service-digital.jpg',  w: 1200, q: 55 },
  { in: 'src/assets/sections/service-souvenirs.jpg',out: 'src/assets/sections/service-souvenirs.jpg',w: 1200, q: 55 },
  // Precision section photos
  { in: 'src/assets/sections/precision-print.jpg',  out: 'src/assets/sections/precision-print.jpg',  w: 1200, q: 72 },
  { in: 'src/assets/sections/precision-finish.jpg', out: 'src/assets/sections/precision-finish.jpg', w: 1200, q: 72 },
  // CTA background — displayed at 13% opacity, fine at low quality
  { in: 'src/assets/media/cta/cta-bg.jpg',          out: 'src/assets/media/cta/cta-bg.jpg',          w: 1600, q: 60 },
  // Logo
  { in: 'src/assets/logo.png',                      out: 'src/assets/logo.png',                      w: 400,  png: true },
];

async function kb(path) {
  const s = await stat(path).catch(() => null);
  return s ? Math.round(s.size / 1024) : 0;
}

for (const { in: src, out, w, q = 75, png = false } of targets) {
  const before = await kb(src);
  try {
    const img = sharp(src).resize({ width: w, withoutEnlargement: true });
    if (png) {
      await img.png({ compressionLevel: 9, palette: true }).toFile(out + '.tmp');
    } else {
      await img.jpeg({ quality: q, progressive: true, mozjpeg: true }).toFile(out + '.tmp');
    }
    // Rename .tmp over original only if smaller
    const { rename, unlink } = await import('fs/promises');
    const after = await kb(out + '.tmp');
    if (after < before) {
      await rename(out + '.tmp', out);
      console.log(`✓ ${src.split('/').pop().padEnd(35)} ${before}KB → ${after}KB (saved ${before - after}KB)`);
    } else {
      await unlink(out + '.tmp');
      console.log(`- ${src.split('/').pop().padEnd(35)} already optimal (${before}KB)`);
    }
  } catch (e) {
    console.error(`✗ ${src}: ${e.message}`);
  }
}
