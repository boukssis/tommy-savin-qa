import { mkdir, rm, stat, copyFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceLogo =
  process.argv[2] ||
  "C:\\Users\\hbi13\\.cursor\\projects\\c-Users-hbi13-Documents-TommySavin\\assets\\Tommy_Savin_QA_Logo-3d86989e-fdd7-4f3b-a529-37389b47e6a0.jpg";

const brandDir = path.join(root, "public", "brand");
const imageDir = path.join(root, "public", "images");
const candidateDir = path.join(imageDir, "candidates");

function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [h * 360, s, l];
}

function classify(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);
  if (l > 0.93 && s < 0.18) return "paper";
  if (s < 0.16) return "grey";
  if (h >= 28 && h <= 58 && s >= 0.22 && l > 0.22 && l < 0.82) return "gold";
  if (h >= 185 && h <= 250 && s >= 0.12) return "navy";
  if (l < 0.22 && b >= r && b >= g) return "navy";
  return "other";
}

function relLuminance(r, g, b) {
  const lin = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrast(a, b) {
  const l1 = relLuminance(...a);
  const l2 = relLuminance(...b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

await mkdir(brandDir, { recursive: true });
await mkdir(imageDir, { recursive: true });

const { data, info } = await sharp(sourceLogo)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
console.log(`source ${width}x${height}`);

const buckets = new Map();
let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;

function idx(x, y) {
  return (y * width + x) * channels;
}

function isPaperPixel(r, g, b) {
  return r > 246 && g > 246 && b > 246;
}

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const i = idx(x, y);
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isPaperPixel(r, g, b)) continue;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    const key = `${r & 0xf8},${g & 0xf8},${b & 0xf8}`;
    buckets.set(key, (buckets.get(key) || 0) + 1);
  }
}

const topColours = [...buckets.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12);
console.log("dominant colours:");
for (const [key, count] of topColours) {
  const [r, g, b] = key.split(",").map(Number);
  const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  console.log(
    `  ${hex}  n=${count}  onWhite=${contrast([r, g, b], [255, 255, 255]).toFixed(2)}  onNavy=${contrast([r, g, b], [4, 26, 45]).toFixed(2)}`,
  );
}

console.log(
  "palette checks",
  "gold on navy",
  contrast([179, 141, 60], [4, 26, 45]).toFixed(2),
  "goldInk on white",
  contrast([138, 108, 44], [255, 255, 255]).toFixed(2),
  "muted on white",
  contrast([62, 76, 87], [255, 255, 255]).toFixed(2),
);

const pad = 8;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

const gaps = [];
let gapStart = null;
for (let y = minY; y <= maxY; y += 1) {
  let count = 0;
  for (let x = minX; x <= maxX; x += 2) {
    const i = idx(x, y);
    if (!isPaperPixel(data[i], data[i + 1], data[i + 2])) count += 1;
  }
  const empty = count < 2;
  if (empty && gapStart === null) gapStart = y;
  if (!empty && gapStart !== null) {
    if (y - gapStart > 6) gaps.push([gapStart, y - 1]);
    gapStart = null;
  }
}
if (gapStart !== null && maxY - gapStart > 6) gaps.push([gapStart, maxY]);

const contentBands = [];
let cursor = minY;
for (const [gs, ge] of gaps) {
  if (gs - 1 >= cursor) contentBands.push([cursor, gs - 1]);
  cursor = ge + 1;
}
if (cursor <= maxY) contentBands.push([cursor, maxY]);
console.log(
  "bands",
  contentBands.map(([a, b]) => `${a}-${b} (${b - a + 1}px)`).join(" | "),
);

function bandBox(y0, y1) {
  let x0 = width;
  let x1 = 0;
  let yy0 = height;
  let yy1 = 0;
  for (let y = y0; y <= y1; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const i = idx(x, y);
      if (isPaperPixel(data[i], data[i + 1], data[i + 2])) continue;
      if (x < x0) x0 = x;
      if (y < yy0) yy0 = y;
      if (x > x1) x1 = x;
      if (y > yy1) yy1 = y;
    }
  }
  if (x1 < x0) return null;
  return {
    x0: Math.max(0, x0 - 6),
    y0: Math.max(0, yy0 - 6),
    x1: Math.min(width - 1, x1 + 6),
    y1: Math.min(height - 1, yy1 + 6),
  };
}

function renderBox(box) {
  const w = box.x1 - box.x0 + 1;
  const h = box.y1 - box.y0 + 1;
  const light = Buffer.alloc(w * h * 4);
  const dark = Buffer.alloc(w * h * 4);
  const counts = { navy: 0, gold: 0, grey: 0, other: 0, paper: 0 };
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const si = idx(x + box.x0, y + box.y0);
      const r = data[si];
      const g = data[si + 1];
      const b = data[si + 2];
      const di = (y * w + x) * 4;
      const [hue, sat, lightN] = rgbToHsl(r, g, b);
      const pale = lightN > 0.78 || (lightN > 0.68 && sat < 0.18);
      let kind = "paper";
      if (!pale) {
        if (hue >= 30 && hue <= 58 && sat >= 0.2) kind = "gold";
        else if (hue >= 185 && hue <= 255 && lightN < 0.62) kind = "navy";
        else if (lightN < 0.25 && b + 12 >= r) kind = "navy";
        else if (sat < 0.22) kind = "grey";
        else kind = "other";
      }
      counts[kind] += 1;
      if (kind === "paper") continue;

      let alpha = 255;
      if (lightN > 0.55 && sat < 0.55) {
        alpha = Math.round(Math.max(0, Math.min(1, (0.78 - lightN) / 0.23)) * 255);
      }
      if (alpha < 12) continue;

      light[di] = r;
      light[di + 1] = g;
      light[di + 2] = b;
      light[di + 3] = alpha;

      if (kind === "navy") {
        dark[di] = 247;
        dark[di + 1] = 248;
        dark[di + 2] = 250;
      } else if (kind === "grey") {
        dark[di] = Math.min(255, r + 42);
        dark[di + 1] = Math.min(255, g + 42);
        dark[di + 2] = Math.min(255, b + 40);
      } else {
        dark[di] = r;
        dark[di + 1] = g;
        dark[di + 2] = b;
      }
      dark[di + 3] = alpha;
    }
  }
  return { light, dark, w, h, counts };
}

async function writePng(buffer, w, h, file) {
  await sharp(buffer, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(file);
  const meta = await sharp(file).metadata();
  console.log(`${path.basename(file)} ${meta.width}x${meta.height}`);
}

const boxes = contentBands.map(([y0, y1]) => bandBox(y0, y1)).filter(Boolean);
const fullBox = { x0: minX, y0: minY, x1: maxX, y1: maxY };
const full = renderBox(fullBox);
console.log("full counts", full.counts);
await writePng(full.light, full.w, full.h, path.join(brandDir, "logo.png"));
await writePng(full.dark, full.w, full.h, path.join(brandDir, "logo-on-dark.png"));

const renderedBands = boxes.map((box) => ({ box, ...renderBox(box) }));
renderedBands.forEach((band, i) => {
  console.log(`band ${i}`, band.w, band.h, band.counts);
});

if (renderedBands[0]) {
  await writePng(
    renderedBands[0].light,
    renderedBands[0].w,
    renderedBands[0].h,
    path.join(brandDir, "mark.png"),
  );
  await writePng(
    renderedBands[0].dark,
    renderedBands[0].w,
    renderedBands[0].h,
    path.join(brandDir, "mark-on-dark.png"),
  );
}

const wordBand = renderedBands[1];
if (wordBand) {
  await writePng(wordBand.light, wordBand.w, wordBand.h, path.join(brandDir, "wordmark.png"));
  await writePng(
    wordBand.dark,
    wordBand.w,
    wordBand.h,
    path.join(brandDir, "wordmark-on-dark.png"),
  );

  const markHeight = 420;
  const markBuf = await sharp(path.join(brandDir, "mark-on-dark.png"))
    .resize({ height: markHeight })
    .png()
    .toBuffer();
  const wordBuf = await sharp(path.join(brandDir, "wordmark-on-dark.png"))
    .resize({ height: Math.round(markHeight * 0.58) })
    .png()
    .toBuffer();
  const markMeta = await sharp(markBuf).metadata();
  const wordMeta = await sharp(wordBuf).metadata();
  const gap = 40;
  const canvasW = markMeta.width + gap + wordMeta.width;
  const canvasH = markHeight;
  await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: markBuf, left: 0, top: 0 },
      {
        input: wordBuf,
        left: markMeta.width + gap,
        top: Math.round((canvasH - wordMeta.height) / 2),
      },
    ])
    .png()
    .toFile(path.join(brandDir, "lockup-on-dark.png"));
  const lock = await sharp(path.join(brandDir, "lockup-on-dark.png")).metadata();
  console.log(`lockup-on-dark.png ${lock.width}x${lock.height}`);
}

const iconSize = 512;
const markTrimmed = await sharp(path.join(brandDir, "mark.png")).trim().png().toBuffer();
const inner = await sharp(markTrimmed)
  .resize({ width: 360, height: 360, fit: "inside" })
  .png()
  .toBuffer();
const innerMeta = await sharp(inner).metadata();
const icon = sharp({
  create: {
    width: iconSize,
    height: iconSize,
    channels: 4,
    background: { r: 247, g: 248, b: 249, alpha: 1 },
  },
}).composite([
  {
    input: inner,
    left: Math.round((iconSize - innerMeta.width) / 2),
    top: Math.round((iconSize - innerMeta.height) / 2),
  },
]);
await icon.png().toFile(path.join(root, "app", "icon.png"));
await sharp(path.join(root, "app", "icon.png"))
  .resize(180, 180)
  .png()
  .toFile(path.join(root, "app", "apple-icon.png"));
console.log("icons written");

const photos = [
  ["crane.jpg", "hero.jpg", 2200],
  ["whitearch.jpg", "about.jpg", 1800],
  ["site.jpg", "inspection.jpg", 2000],
  ["glass.jpg", "commercial.jpg", 1800],
  ["u-steel.jpg", "structure.jpg", 1800],
  ["columns.jpg", "craft.jpg", 1600],
  ["p-beam.jpg", "residential.jpg", 1600],
  ["facade.jpg", "facade.jpg", 1800],
];

for (const [from, to, widthLimit] of photos) {
  const input = path.join(candidateDir, from);
  const output = path.join(imageDir, to);
  await sharp(input)
    .rotate()
    .resize({ width: widthLimit, withoutEnlargement: true })
    .jpeg({ quality: 76, mozjpeg: true })
    .toFile(output);
  const meta = await sharp(output).metadata();
  const file = await stat(output);
  console.log(`${to} ${meta.width}x${meta.height} ${Math.round(file.size / 1024)}kb`);
}

await copyFile(sourceLogo, path.join(brandDir, "logo-original.jpg"));
await rm(candidateDir, { recursive: true, force: true });
console.log("candidates removed");
