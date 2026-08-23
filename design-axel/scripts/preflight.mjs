#!/usr/bin/env node
// Preflight design-axel : dit ce qui marche, ce qui ne marche pas, et quoi faire.
// Zéro dépendance. `node scripts/preflight.mjs`
import { execFileSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SKILL = dirname(dirname(fileURLToPath(import.meta.url)));
const SEP = new RegExp(String.fromCharCode(13) + '?' + String.fromCharCode(10));
const out = [];
const ok = (k, v) => out.push(['ok', k, v]);
const ko = (k, v, fix) => out.push(['ko', k, v, fix]);
const warn = (k, v, fix) => out.push(['warn', k, v, fix]);

// 1. Interpréteur Python
let py = null;
for (const cand of ['python3', 'python', 'py']) {
  try {
    const v = execFileSync(cand, ['--version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    py = cand; ok('python', `${cand} → ${v}`); break;
  } catch {}
}
if (!py) ko('python', 'aucun interpréteur trouvé', 'Windows: winget install Python.Python.3.12');

// 2. Moteur ui-ux-pro-max : vrais dossiers, pas des symlinks non résolus
for (const d of ['ui-ux-pro-max/scripts', 'ui-ux-pro-max/data']) {
  const p = join(SKILL, d);
  if (!existsSync(p)) ko(d, 'absent', 'recopier depuis la source du skill');
  else if (!statSync(p).isDirectory())
    ko(d, `fichier de ${statSync(p).size} o au lieu d'un dossier (symlink git non résolu sous Windows)`,
       'remplacer par une vraie copie du dossier');
  else ok(d, 'dossier réel');
}

// 3. Le moteur répond vraiment
if (py) {
  const s = join(SKILL, 'ui-ux-pro-max', 'scripts', 'search.py');
  if (existsSync(s)) {
    try {
      const r = execFileSync(py, [s, 'saas dashboard', '--design-system'],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 60000 });
      ok('moteur ui-ux-pro-max', `répond (${r.split('\n').length} lignes)`);
    } catch (e) { ko('moteur ui-ux-pro-max', String(e.message).split('\n')[0], 'vérifier scripts/ et data/'); }
  } else ko('moteur ui-ux-pro-max', 'search.py introuvable', 'vérifier ui-ux-pro-max/scripts/');
}

// 4. Playwright (export PNG des visuels)
try {
  execFileSync('npx', ['--yes', 'playwright', '--version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 90000, shell: process.platform === 'win32' });
  ok('playwright', 'disponible (export PNG)');
} catch { warn('playwright', 'indisponible', 'npm i -D playwright && npx playwright install chromium'); }

// Rapport
const icon = { ok: '  OK  ', ko: ' ECHEC', warn: ' ATTN ' };
console.log(`\n=== preflight design-axel ===\n${SKILL}\n`);
for (const [st, k, v, fix] of out) {
  console.log(`[${icon[st]}] ${k.padEnd(22)} ${v}`);
  if (fix) console.log(`${' '.repeat(11)}→ ${fix}`);
}
const bloquants = out.filter(o => o[0] === 'ko').length;
console.log(`\n${bloquants ? `${bloquants} bloquant(s).` : 'Aucun bloquant.'} ` +
            `PY=${py ?? '?'}  SKILL=${SKILL}\n`);
process.exit(bloquants ? 1 : 0);
