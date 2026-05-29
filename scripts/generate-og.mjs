#!/usr/bin/env node
// Generates og-image.png + apple-touch-icon.png from scripts/og-template.html
// using the system Chrome via puppeteer-core (no chromium download).

import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML_PATH = resolve(__dirname, 'og-template.html');
const OG_OUTPUT = resolve(__dirname, '../public/og-image.png');
const APPLE_OUTPUT = resolve(__dirname, '../public/apple-touch-icon.png');

const CHROME_PATHS = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Arc.app/Contents/MacOS/Arc',
];

async function findChrome() {
  const { existsSync } = await import('node:fs');
  for (const p of CHROME_PATHS) {
    if (existsSync(p)) return p;
  }
  throw new Error(
    'No system Chrome/Edge/Arc found. Install Google Chrome or set CHROME_PATH env var.',
  );
}

async function main() {
  const executablePath = process.env.CHROME_PATH || (await findChrome());
  console.log(`Using browser: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // OG image (1200x630)
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(HTML_PATH).href, { waitUntil: 'networkidle0' });
    // Give Google Fonts a moment to fully render
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: OG_OUTPUT, type: 'png', omitBackground: false });
    console.log(`✓ Wrote ${OG_OUTPUT}`);

    // Apple touch icon (180x180) — render the favicon SVG mark on cream
    const iconPage = await browser.newPage();
    await iconPage.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
    await iconPage.setContent(
      `<!DOCTYPE html><html><body style="margin:0;width:180px;height:180px;background:#fbf5ef;display:flex;align-items:center;justify-content:center;">
        <svg viewBox="-32 -32 64 64" width="120" height="120">
          <path d="M0 -28 L5 -5 L28 0 L5 5 L0 28 L-5 5 L-28 0 L-5 -5 Z" fill="#c87139"/>
        </svg>
      </body></html>`,
      { waitUntil: 'load' },
    );
    await iconPage.screenshot({ path: APPLE_OUTPUT, type: 'png' });
    console.log(`✓ Wrote ${APPLE_OUTPUT}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
