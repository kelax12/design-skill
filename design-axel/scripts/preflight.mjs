#!/usr/bin/env node
// design-axel preflight: what works, what doesn't, and what to do about it.
// Zero dependencies. `node scripts/preflight.mjs`
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

// 1. Python interpreter
let py = null;
for (const cand of ['python3', 'python', 'py']) {
  try {
    const v = execFileSync(cand, ['--version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    py = cand; ok('python', `${cand} → ${v}`); break;
  } catch {}
}
if (!py) ko('python', 'no interpreter found', 'Windows: winget install Python.Python.3.12 | macOS: brew install python3 | Debian: apt install python3');

// 2. ui-ux-pro-max engine: real directories, not unresolved symlinks
for (const d of ['ui-ux-pro-max/scripts', 'ui-ux-pro-max/data']) {
  const p = join(SKILL, d);
  if (!existsSync(p)) ko(d, 'missing', 'copy it back from the skill source');
  else if (!statSync(p).isDirectory())
    ko(d, `${statSync(p).size}-byte file instead of a directory (git symlink unresolved on Windows)`,
       'replace it with a real copy of the directory');
  else ok(d, 'real directory');
}

// 3. The engine actually answers
if (py) {
  const s = join(SKILL, 'ui-ux-pro-max', 'scripts', 'search.py');
  if (existsSync(s)) {
    try {
      const r = execFileSync(py, [s, 'saas dashboard', '--design-system'],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 60000 });
      ok('ui-ux-pro-max engine', `answers (${r.split('\n').length} lines)`);
    } catch (e) { ko('ui-ux-pro-max engine', String(e.message).split('\n')[0], 'check scripts/ and data/'); }
  } else ko('ui-ux-pro-max engine', 'search.py not found', 'check ui-ux-pro-max/scripts/');
}

// 4. Playwright (PNG export of visuals)
try {
  execFileSync('npx', ['--yes', 'playwright', '--version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 90000, shell: process.platform === 'win32' });
  ok('playwright', 'available (PNG export)');
} catch { warn('playwright', 'unavailable', 'npm i -D playwright && npx playwright install chromium'); }

// Rapport
const icon = { ok: '  OK  ', ko: ' FAIL ', warn: ' WARN ' };
console.log(`\n=== preflight design-axel ===\n${SKILL}\n`);
for (const [st, k, v, fix] of out) {
  console.log(`[${icon[st]}] ${k.padEnd(22)} ${v}`);
  if (fix) console.log(`${' '.repeat(11)}→ ${fix}`);
}
const blockers = out.filter(o => o[0] === 'ko').length;
console.log(`\n${blockers ? `${blockers} blocker(s).` : 'No blockers.'} ` +
            `PY=${py ?? '?'}  SKILL=${SKILL}\n`);
process.exit(blockers ? 1 : 0);
