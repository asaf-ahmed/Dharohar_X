// Downloads every Wikimedia Commons image the site references into
// public/assets/, using Commons' Special:FilePath redirect (the standard,
// stable way to fetch a file's current rendition without hand-computing
// its MD5 hash directory). Run with `npm run fetch-images`.
//
// This has to run somewhere with real internet access to commons.wikimedia.org —
// it is NOT run automatically during this build because the environment
// that assembled this project has an outbound allowlist that excludes
// Wikimedia. It runs fine on a normal developer machine or CI runner.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MANIFEST } from './image-manifest.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const UA = 'DharoharX/1.0 (https://github.com/asaf-ahmed/Dharohar--X; educational heritage project)';

function filePathUrl(filename, width = 1600) {
  const encoded = encodeURIComponent(filename.replace(/ /g, '_'));
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=${width}`;
}

async function fetchOne({ key, file, out }) {
  const url = filePathUrl(file);
  const dest = join(ROOT, out);
  process.stdout.write(`Fetching ${key.padEnd(16)} ${url}\n`);
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  process.stdout.write(`  ✓ saved ${out} (${(buf.length / 1024).toFixed(0)} KB)\n`);
}

async function main() {
  const requested = new Set(process.argv.slice(2));
  const entries = requested.size ? MANIFEST.filter((entry) => requested.has(entry.key)) : MANIFEST;
  let failures = 0;
  for (const entry of entries) {
    try {
      await fetchOne(entry);
    } catch (e) {
      failures++;
      console.error(`  ✗ ${entry.key}: ${e.message}`);
    }
  }
  if (failures) {
    console.error(`\n${failures} image(s) failed to download. Site still works — those`);
    console.error('few will fall back to the placeholder icon until re-run succeeds.');
    process.exitCode = 0; // never fail the build over this
  } else {
    console.log(`\nAll ${entries.length} images downloaded to public/assets/.`);
  }
}

main();
