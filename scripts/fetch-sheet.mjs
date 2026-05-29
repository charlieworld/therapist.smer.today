#!/usr/bin/env node
// Fetches the Google Sheet (CSV export), normalizes rows, writes public/data.json.
// The sheet must be set to "Anyone with the link can view" — no API key required.

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Papa from 'papaparse';

const SHEET_ID = '1zyTtdvSDtiKjAVUbcNXFGKP2IQ_0DleBmZwXZxLacTk';
const GID = '1534828108';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;
const SOURCE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit?gid=${GID}`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, '../public/data.json');

const REMOTE_TOKENS = ['遠距', '線上', '可遠距'];
const SPLIT_REGEX = /[、，,\/]/;
const TOPIC_SPLIT_REGEX = /[、，,\n]/;

function splitRegions(raw) {
  return raw
    .split(SPLIT_REGEX)
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitTopics(raw) {
  return raw
    .split(TOPIC_SPLIT_REGEX)
    .map((s) => s.trim())
    .filter(Boolean);
}

function isRemote(region) {
  return REMOTE_TOKENS.some((token) => region.includes(token));
}

function normalize(row) {
  const region = (row['執業地區'] || '').trim();
  return {
    name: (row['姓名'] || '').trim(),
    gender: (row['性別'] || '').trim(),
    title: (row['職稱'] || '').trim(),
    region,
    regions: splitRegions(region),
    is_remote: isRemote(region),
    agency: (row['執業機構'] || '').trim(),
    booking: (row['預約方式'] || '').trim(),
    topics: splitTopics(row['擅長之BDSM相關議題'] || ''),
    notes: (row['備註欄'] || '').trim(),
  };
}

async function main() {
  console.log(`Fetching: ${CSV_URL}`);
  const res = await fetch(CSV_URL, { redirect: 'follow' });
  if (!res.ok) {
    throw new Error(`Failed to fetch sheet: HTTP ${res.status} ${res.statusText}`);
  }
  const csv = await res.text();

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    console.warn('CSV parse warnings:');
    for (const e of parsed.errors) console.warn(' -', e.message);
  }

  const resources = parsed.data
    .map(normalize)
    .filter((r) => r.name);

  const payload = {
    updated_at: new Date().toISOString(),
    source: SOURCE_URL,
    count: resources.length,
    resources,
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');

  console.log(`Wrote ${resources.length} records to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
