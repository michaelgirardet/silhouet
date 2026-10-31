#!/usr/bin/env node
/**
 * Validation end-to-end de la promesse "privacy-first" de Silhouet.
 *
 * Reproduit le protocole manuel (docs/protocole-validation.md) dans un
 * Chrome headless piloté en CDP :
 *   1. chargement de / et /remove-bg : toutes les requêtes doivent être
 *      sur localhost (aucune police tierce),
 *   2. premier détourage : aucune requête vers un domaine tiers,
 *   3. deuxième détourage : les modèles ne sont pas re-téléchargés,
 *   4. mode avion : le détourage fonctionne intégralement hors-ligne,
 *   5. zéro erreur console, zéro violation CSP.
 *
 * Sortie : code 0 si tout passe, 1 sinon.
 *
 * Prérequis : serveur de production démarré (npm run build && npm start).
 * Usage   : BASE_URL=http://localhost:3000 node scripts/e2e/validate.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
const path = require('path');
const zlib = require('zlib');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const ORIGIN = new URL(BASE_URL).origin;
const RESULT_TIMEOUT_MS = Number(process.env.RESULT_TIMEOUT_MS || 180000);

// ---------------------------------------------------------------------------
// Génération d'images de test (PNG RGB minimal, sans dépendance)
// ---------------------------------------------------------------------------

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function pngChunk(type, data) {
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function makeTestPng(w, h, color) {
  const raw = Buffer.alloc((w * 3 + 1) * h);
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) / 3;
  let p = 0;
  for (let y = 0; y < h; y++) {
    raw[p++] = 0; // filtre "none"
    for (let x = 0; x < w; x++) {
      const inside = (x - cx) ** 2 + (y - cy) ** 2 < r * r;
      const [cr, cg, cb] = inside ? color : [235, 235, 235];
      raw[p++] = cr;
      raw[p++] = cg;
      raw[p++] = cb;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // profondeur
  ihdr[9] = 2; // truecolor RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', zlib.deflateSync(raw)),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function writeTestImages() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'silhouet-e2e-'));
  const specs = [
    ['test1.png', 400, 300, [200, 60, 60]],
    ['test2.png', 320, 240, [60, 60, 200]],
    ['test3.png', 360, 280, [60, 160, 60]],
  ];
  const files = specs.map(([name, w, h, color]) => {
    const f = path.join(dir, name);
    fs.writeFileSync(f, makeTestPng(w, h, color));
    return f;
  });
  return { dir, files };
}

// ---------------------------------------------------------------------------
// Assertions
// ---------------------------------------------------------------------------

let failures = 0;
function check(name, ok, detail = '') {
  const line = `${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`;
  console.log(line);
  if (!ok) failures++;
}

// ---------------------------------------------------------------------------
// Scénario
// ---------------------------------------------------------------------------

(async () => {
  const { files } = writeTestImages();

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  const client = await page.createCDPSession();
  await client.send('Network.enable');

  let phase = 'avant';
  const reqs = new Map();
  client.on('Network.requestWillBeSent', (e) => {
    reqs.set(e.requestId, { url: e.request.url, phase });
  });
  client.on('Network.responseReceived', (e) => {
    const r = reqs.get(e.requestId);
    if (r) r.fromCache = !!(e.response.fromDiskCache || e.response.fromPrefetchCache);
  });
  client.on('Network.requestServedFromCache', (e) => {
    const r = reqs.get(e.requestId);
    if (r) r.servedFromCache = true;
  });
  client.on('Network.loadingFailed', (e) => {
    const r = reqs.get(e.requestId);
    if (r) {
      r.failed = true;
      r.error = e.errorText;
    }
  });

  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => consoleErrors.push('PAGEERROR: ' + String(e)));

  async function detourage(img, label) {
    const input = await page.waitForSelector('input[type="file"]');
    await input.uploadFile(img);
    await page.waitForSelector('img[alt="Prévisualisation résultat"]', {
      timeout: RESULT_TIMEOUT_MS,
    });
    const rendered = await page.evaluate(() => {
      const i = document.querySelector('img[alt="Prévisualisation résultat"]');
      return i ? i.naturalWidth : 0;
    });
    check(`${label} : résultat affiché et rendu`, rendered > 0, `naturalWidth=${rendered}`);
  }

  async function recommencer() {
    await page.evaluate(() => {
      const b = [...document.querySelectorAll('button')].find((x) =>
        x.textContent.includes('Recommencer')
      );
      if (b) b.click();
    });
  }

  const inPhase = (p) => [...reqs.values()].filter((r) => r.phase === p);
  const isLocal = (url) => {
    try {
      const u = new URL(url);
      return u.hostname === new URL(BASE_URL).hostname;
    } catch {
      return false;
    }
  };
  // Les blob: créés par l'app elle-même (blob:http://host/...) sont locaux :
  // contenu en mémoire, jamais une ressource distante.
  const isLocalBlob = (url) => url.startsWith(`blob:${ORIGIN}/`);
  const thirdParty = (list) =>
    list.filter((r) => !isLocal(r.url) && !isLocalBlob(r.url));
  const benignAborts = (list) =>
    list.filter((r) => r.failed && r.error === 'net::ERR_ABORTED' && r.url.includes('?_rsc='));

  try {
    // --- 1. Chargement des pages -------------------------------------------
    phase = 'chargement';
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.goto(`${BASE_URL}/remove-bg`, { waitUntil: 'networkidle0', timeout: 60000 });
    check(
      'Chargement / et /remove-bg : uniquement localhost (aucune police tierce)',
      thirdParty(inPhase('chargement')).length === 0,
      JSON.stringify(
        [...new Set(inPhase('chargement').map((r) => new URL(r.url).hostname))]
      )
    );

    // --- 2. Premier détourage ----------------------------------------------
    phase = 'détourage-1';
    await detourage(files[0], 'Premier détourage');
    const d1 = inPhase('détourage-1');
    check('Premier détourage : aucun domaine tiers contacté', thirdParty(d1).length === 0);
    const modelChunks = d1.filter((r) => r.url.includes('/models/'));
    check(
      'Premier détourage : le moteur est chargé depuis /models/ (self-hosté)',
      modelChunks.length > 0,
      `${modelChunks.length} requêtes /models/`
    );

    // --- 3. Deuxième détourage : pas de re-téléchargement --------------------
    phase = 'entre-détourages';
    await recommencer();
    phase = 'détourage-2';
    await detourage(files[1], 'Deuxième détourage');
    const d2 = inPhase('détourage-2');
    const networkModelFetches = d2.filter(
      (r) => r.url.includes('/models/') && !r.fromCache && !r.servedFromCache
    );
    check(
      'Deuxième détourage : modèles non re-téléchargés (mémoire ou cache HTTP)',
      networkModelFetches.length === 0,
      `${networkModelFetches.length} requêtes /models/ hors cache`
    );

    // --- 4. Mode avion -------------------------------------------------------
    phase = 'rechargement';
    await page.reload({ waitUntil: 'networkidle0', timeout: 60000 });
    await client.send('Network.emulateNetworkConditions', {
      offline: true,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
    phase = 'détourage-hors-ligne';
    await detourage(files[2], 'Détourage hors-ligne (mode avion)');
    const offline = inPhase('détourage-hors-ligne');
    check('Mode avion : aucun domaine tiers', thirdParty(offline).length === 0);
    const offlineFailures = offline.filter((r) => r.failed);
    check(
      'Mode avion : aucune requête échouée (tout servi depuis le cache)',
      offlineFailures.length === 0,
      offlineFailures.map((r) => `${r.error} ${r.url}`).join(' ; ')
    );
    const offlineModelCache = offline.filter((r) => r.url.includes('/models/'));
    check(
      'Mode avion : /models/ servi depuis le cache HTTP',
      offlineModelCache.length > 0 &&
        offlineModelCache.every((r) => r.fromCache || r.servedFromCache),
      `${offlineModelCache.filter((r) => r.fromCache || r.servedFromCache).length}/${offlineModelCache.length}`
    );

    // --- 5. Page /convert (smoke test) ---------------------------------------
    phase = 'convert';
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
    await page.goto(`${BASE_URL}/convert`, { waitUntil: 'networkidle0', timeout: 60000 });
    const input = await page.waitForSelector('input[type="file"]');
    await input.uploadFile(files[0]);
    await page.waitForSelector('img[alt="résultat WebP"]', { timeout: 60000 });
    check('Conversion WebP : résultat affiché', true);

    // --- 6. Console et CSP ----------------------------------------------------
    const cspErrors = consoleErrors.filter((m) => /Content Security Policy/i.test(m));
    check('Console : zéro violation CSP', cspErrors.length === 0);
    if (consoleErrors.length) {
      for (const e of consoleErrors.slice(0, 10)) console.log(`  CONSOLE: ${e.slice(0, 200)}`);
    }
    check('Console : zéro erreur', consoleErrors.length === 0, `${consoleErrors.length} erreur(s)`);

    // --- 7. Requêtes interrompues : uniquement des prefetchs RSC annulés -------
    const aborted = [...reqs.values()].filter((r) => r.failed);
    check(
      'Aucune requête échouée hors prefetchs RSC annulés (net::ERR_ABORTED ?_rsc=)',
      aborted.every((r) => benignAborts([r]).length > 0)
    );
  } catch (e) {
    check('Scénario complet exécuté', false, String(e).slice(0, 300));
  } finally {
    await browser.close();
  }

  console.log(failures === 0 ? 'VALIDATION: OK' : `VALIDATION: ${failures} échec(s)`);
  process.exitCode = failures === 0 ? 0 : 1;
})().catch((e) => {
  console.error('FATAL', e);
  process.exitCode = 1;
});
