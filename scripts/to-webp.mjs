import sharp from 'sharp';
import { stat, unlink } from 'fs/promises';
import { dirname, join } from 'path';

const targets = [
  // Section / hero images
  { in: 'src/assets/sections/service-print.jpg',         quality: 80 },
  { in: 'src/assets/sections/service-exterior.jpg',      quality: 80 },
  { in: 'src/assets/sections/service-digital.jpg',       quality: 80 },
  { in: 'src/assets/sections/service-souvenirs.jpg',     quality: 80 },
  { in: 'src/assets/sections/precision-print.jpg',       quality: 80 },
  { in: 'src/assets/sections/precision-finish.jpg',      quality: 80 },
  // CTA background
  { in: 'src/assets/media/cta/cta-bg.jpg',               quality: 80 },
  // Logo
  { in: 'src/assets/logo.png',                           quality: 90, lossless: false },
  // Client logos (may have transparency)
  { in: 'src/assets/clients/abrus.png',                  quality: 90 },
  { in: 'src/assets/clients/adelca.png',                 quality: 90 },
  { in: 'src/assets/clients/continental.png',            quality: 90 },
  { in: 'src/assets/clients/softlanding.png',            quality: 90 },
  { in: 'src/assets/clients/sucesores.png',              quality: 90 },
  { in: 'src/assets/clients/toscana.png',                quality: 90 },
  // Catalogue transparent PNGs (portfolio page)
  { in: 'src/assets/media/catalogue/rotulos.png',        quality: 85 },
  { in: 'src/assets/media/catalogue/pantallas.png',      quality: 85 },
  { in: 'src/assets/media/catalogue/totems.png',         quality: 85 },
  { in: 'src/assets/media/catalogue/video-wall.png',     quality: 85 },
  { in: 'src/assets/media/catalogue/souvenirs-escritura.png',    quality: 85 },
  { in: 'src/assets/media/catalogue/souvenirs-indumentaria.png', quality: 85 },
  { in: 'src/assets/media/catalogue/souvenirs-accesorios.png',   quality: 85 },
  { in: 'src/assets/media/catalogue/souvenirs-eventos.png',      quality: 85 },
  { in: 'src/assets/media/catalogue/print-papeleria.png',        quality: 85 },
  { in: 'src/assets/media/catalogue/print-impresos.png',         quality: 85 },
  { in: 'src/assets/media/catalogue/vehicular.png',              quality: 85 },
];

async function kb(path) {
  const s = await stat(path).catch(() => null);
  return s ? Math.round(s.size / 1024) : 0;
}

let totalSaved = 0;

for (const { in: src, quality = 85, lossless = false } of targets) {
  const out = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const before = await kb(src);

  try {
    await sharp(src)
      .webp({ quality, lossless, effort: 6 })
      .toFile(out);

    const after = await kb(out);
    const saved = before - after;
    totalSaved += saved;

    if (after < before) {
      await unlink(src);
      console.log(`✓ ${src.split('/').pop().padEnd(40)} ${before}KB → ${after}KB (saved ${saved}KB)`);
    } else {
      await unlink(out);
      console.log(`- ${src.split('/').pop().padEnd(40)} WebP not smaller (${before}KB), kept original`);
    }
  } catch (e) {
    console.error(`✗ ${src}: ${e.message}`);
  }
}

console.log(`\nTotal saved: ${totalSaved}KB (${Math.round(totalSaved/1024 * 10)/10}MB)`);
