import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';

const htmlPath = process.argv[2];
const outDir = process.argv[3];

if (!htmlPath || !outDir) {
  console.error('Uso: node render-slides.mjs <input.html> <output-dir>');
  process.exit(1);
}

const absHtml = path.resolve(htmlPath);
const absOut = path.resolve(outDir);
await fs.mkdir(absOut, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 1600 }, deviceScaleFactor: 1 });
await page.goto(`file://${absHtml}`, { waitUntil: 'networkidle' });

const posters = await page.$$('.poster');
for (let i = 0; i < posters.length; i++) {
  const file = path.join(absOut, `slide-${String(i + 1).padStart(2, '0')}.png`);
  await posters[i].screenshot({ path: file });
  console.log(file);
}

await browser.close();
