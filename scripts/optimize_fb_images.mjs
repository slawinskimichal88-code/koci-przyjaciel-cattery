import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const FB_DIR = path.resolve('public/images/facebook');
const files = fs.readdirSync(FB_DIR).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

console.log(`[Image Optimization] Przetwarzanie ${files.length} grafik Facebook...`);

for (const file of files) {
  const inputPath = path.join(FB_DIR, file);
  const baseName = path.parse(file).name;
  
  const fullWebpPath = path.join(FB_DIR, `${baseName}.webp`);
  const thumbWebpPath = path.join(FB_DIR, `${baseName}_thumb.webp`);

  const statBefore = fs.statSync(inputPath).size;

  // 1. Zoptymalizowana wersja pełna (lightbox)
  await sharp(inputPath)
    .resize({ width: 1080, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(fullWebpPath);

  // 2. Miniatura (do kapsułek na stronie)
  await sharp(inputPath)
    .resize({ width: 160, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(thumbWebpPath);

  const fullStat = fs.statSync(fullWebpPath).size;
  const thumbStat = fs.statSync(thumbWebpPath).size;

  console.log(`  - ${file}: ${(statBefore/1024).toFixed(1)} KB -> Full WebP: ${(fullStat/1024).toFixed(1)} KB, Thumb: ${(thumbStat/1024).toFixed(1)} KB`);
}

// Optymalizacja logo.webp
const logoPath = path.resolve('public/logo.png');
if (fs.existsSync(logoPath)) {
  const logoWebp = path.resolve('public/logo.webp');
  await sharp(logoPath)
    .resize({ width: 360, height: 360, fit: 'cover' })
    .webp({ quality: 85, effort: 6 })
    .toFile(logoWebp);
  console.log(`[Logo] Wygenerowano zoptymalizowane logo.webp: ${(fs.statSync(logoWebp).size/1024).toFixed(1)} KB`);
}
