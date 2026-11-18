import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const json = name => JSON.parse(read(name));
const write = (name, value) => fs.writeFileSync(path.join(root, name), JSON.stringify(value, null, 2) + '\n');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const token = json('packages/tokens/reference/tokens.json');
const cssName = key => '--nx-' + key.replaceAll('.', '-');
const alias = value => /^\{([^}]+)\}$/.exec(value)?.[1];
const keys = Object.keys(token.themes['nexolira.dark']);
check(token.draft === true && token.schemaVersion === 'nx-token-contract-0.1', 'Token contract metadata');
const allNames = [...Object.keys(token.primitives), ...keys, ...Object.keys(token.components)];
check(new Set(allNames.map(cssName)).size === allNames.length, 'CSS name collision');
for (const key of allNames) check(/^[a-z][a-z0-9-]*(\.[a-z0-9-]+)+$/.test(key), 'Invalid token name: ' + key);
for (const value of Object.values(token.primitives)) check(typeof value === 'string' && !alias(value), 'Primitive must be literal');
function resolve(key, values, visiting = []) {
  if (visiting.includes(key)) throw new Error('Cyclic token: ' + [...visiting, key].join(' -> '));
  if (!(key in values)) throw new Error('Undefined token: ' + key);
  const value = values[key];
  if (typeof value !== 'string') throw new Error('Non-string token: ' + key);
  return alias(value) ? resolve(alias(value), values, [...visiting, key]) : value;
}
for (const [name, theme] of Object.entries(token.themes)) {
  check(JSON.stringify(Object.keys(theme).sort()) === JSON.stringify([...keys].sort()), 'Incomplete theme: ' + name);
  for (const [key, value] of Object.entries(theme)) check(alias(value) && !(alias(value) in token.components), 'Semantic layer violation: ' + key);
  for (const [key, value] of Object.entries(token.components)) check(alias(value) in theme, 'Component must reference semantic: ' + key);
  for (const key of allNames) { try { resolve(key, { ...token.primitives, ...theme, ...token.components }); } catch (e) { failures.push(name + ': ' + e.message); } }
}
function cssBlock(selector, theme) {
  const declarations = Object.entries({ ...token.primitives, ...theme, ...token.components }).map(([key, value]) => `  ${cssName(key)}: ${alias(value) ? 'var(' + cssName(alias(value)) + ')' : value};`);
  return selector + ' {\n' + declarations.join('\n') + '\n}\n';
}
const css = '/* NX-DS-001 reference only. Generated from tokens.json; no package export. */\n' +
  cssBlock('.nx-scope,\n[data-nx-theme="nexolira"]', token.themes['nexolira.dark']) + '\n' +
  cssBlock('.nx-scope[data-nx-mode="light"],\n[data-nx-theme="nexolira"][data-nx-mode="light"]', token.themes['nexolira.light']);
if (process.argv.includes('--write-css')) fs.writeFileSync(path.join(root, 'packages/tokens/reference/tokens.css'), css);
check(read('packages/tokens/reference/tokens.css') === css, 'CSS projection drift');
check(!/:root|@import|!important|(^|\n)(html|body)\b/.test(css), 'CSS leaks global styles');

function luminance(hex) {
  if (!/^#[\da-f]{6}$/i.test(hex)) throw new Error('Contrast requires opaque sRGB hex: ' + hex);
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a, b) { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
const contrasts = [];
function pair(theme, label, foreground, background, minimum, gate = true) {
  const raw = ratio(foreground, background);
  const result = { theme, label, foreground, background, minimum, ratio: Number(raw.toFixed(4)), pass: raw >= minimum, gate };
  contrasts.push(result);
  if (gate) check(result.pass, `${theme}: ${label} ${result.ratio} < ${minimum}`);
}
for (const [name, theme] of Object.entries(token.themes)) {
  const values = { ...token.primitives, ...theme };
  const value = key => resolve(key, values);
  for (const surface of ['color.background', 'color.surface', 'color.surface.raised']) {
    for (const text of ['color.text.primary', 'color.text.muted', 'color.status.success', 'color.status.warning', 'color.status.error', 'color.status.info']) pair(name, text + ' on ' + surface, value(text), value(surface), 4.5);
    for (const cue of ['color.focus', 'color.border.default']) pair(name, cue + ' on ' + surface, value(cue), value(surface), 3);
  }
  for (const state of ['color.action.primary', 'color.action.primary.hover', 'color.action.primary.active']) pair(name, 'primary text on ' + state, value('color.text.on-primary'), value(state), 4.5);
  pair(name, 'secondary text', value('color.text.on-secondary'), value('color.secondary'), 4.5);
}
// Source diagnostics are evidence of specific pairs, not gates for unchanged products.
pair('mktauto-source', 'on-primary token on primary token (not actual gradient)', '#ffffff', '#008cff', 4.5, false);
pair('mktauto-source', 'primary gradient first endpoint', '#ffffff', '#0875dd', 4.5, false);
pair('mktauto-source', 'hover gradient first endpoint', '#ffffff', '#0879e2', 4.5, false);
pair('plat008-source', 'functional border on surface', '#253244', '#141e2b', 3, false);
const composite = (fg, bg, alpha) => '#' + [1, 3, 5].map(i => Math.round(parseInt(fg.slice(i, i + 2), 16) * alpha + parseInt(bg.slice(i, i + 2), 16) * (1 - alpha)).toString(16).padStart(2, '0')).join('');
pair('market-direction-source', '28% green focus ring composited on surface', composite('#00e699', '#1c202b', 0.28), '#1c202b', 3, false);

const required = ['AGENTS.md', 'README.md', 'package.json', 'docs/STYLE_GUIDE.md', 'docs/PROJECT_WORKFLOW.md', 'docs/TASK_SPEC.md', 'docs/TOPIC_ROADMAP.md', 'docs/ARCHITECTURE.md', 'docs/DECISIONS.md', 'docs/history/ROADMAP_HISTORY.md', 'docs/tasks/NX-DS-001.md', 'docs/templates/TASK_TEMPLATE.md', 'docs/templates/PR_TEMPLATE.md', 'docs/templates/COMPONENT_SPEC.md', 'docs/architecture/COMPONENT_CATALOG.md', 'docs/architecture/TOKEN_CONTRACT.md', 'docs/architecture/THEMES.md', 'docs/architecture/DISTRIBUTION.md', 'docs/audit/AUDIT.md', 'docs/audit/REUSE_MATRIX.csv', 'docs/audit/CONTRAST.md', 'packages/react/CONTRACTS.md'];
for (const file of required) check(fs.existsSync(path.join(root, file)), 'Missing required file: ' + file);
for (const workspace of ['', 'packages/tokens/', 'packages/react/', 'apps/docs/']) {
  const manifest = json(workspace + 'package.json');
  check(manifest.private === true, 'Local packages must remain private: ' + workspace);
  if (workspace === 'packages/tokens/' || workspace === 'packages/react/') {
    check(manifest.version === '0.1.0' && manifest.exports?.['.']?.types && manifest.exports?.['.']?.import && manifest.exports?.['./styles.css'], 'Library export contract: ' + workspace);
    check(JSON.stringify(manifest.files) === JSON.stringify(['dist', 'README.md']), 'Package allowlist: ' + workspace);
  }
  if (workspace === 'packages/react/') {
    check(manifest.peerDependencies?.react === '19.2.8 || 19.3.1' && manifest.peerDependencies?.['react-dom'] === '19.2.8 || 19.3.1', 'Tested peer contract');
    check(manifest.dependencies?.['@nexolira/tokens'] === '0.1.0' && Object.keys(manifest.dependencies).length === 1, 'Only tokens may be a UI runtime dependency');
  }
}
check(JSON.stringify(json('package.json').workspaces) === JSON.stringify(['packages/tokens', 'packages/react', 'apps/docs']), 'Workspace contract mismatch');
const files = [];
function scan(dir = '') { for (const entry of fs.readdirSync(path.join(root, dir), { withFileTypes: true })) { if (['.git', 'node_modules', 'dist', '.types', '.artifacts', 'test-results', 'playwright-report'].includes(entry.name)) continue; const name = path.posix.join(dir, entry.name); if (entry.isDirectory()) scan(name); else files.push(name); } }
scan();
let localLinks = 0;
for (const file of files) {
  const text = read(file);
  check(!/[\t ]+\r?$/m.test(text), 'Trailing whitespace: ' + file);
  if (file.endsWith('.json')) { try { JSON.parse(text); } catch { failures.push('Invalid JSON: ' + file); } }
  if (!file.endsWith('.md')) continue;
  const prose = text.replace(/```[^\n]*\n[\s\S]*?```/g, '');
  for (const match of prose.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].replace(/^<|>$/g, '').split('#')[0];
    if (!target || /^[a-z]+:/i.test(target)) continue;
    localLinks++;
    const destination = path.resolve(root, path.dirname(file), decodeURIComponent(target));
    check(destination.startsWith(root + path.sep) && fs.existsSync(destination), `Broken/escaping link in ${file}: ${target}`);
  }
}
const matrix = read('docs/audit/REUSE_MATRIX.csv').trim().split('\n');
const parseCsv = line => [...line.matchAll(/"((?:[^"]|"")*)"(?:,|$)/g)].map(m => m[1].replaceAll('""', '"'));
const headers = ['SOURCE_PROJECT', 'COMPONENT_OR_TOKEN', 'CURRENT_LOCATION', 'REUSE_CLASSIFICATION', 'DEPENDENCIES', 'ACCESSIBILITY_STATUS', 'TEST_COVERAGE', 'ADAPTATION_REQUIRED', 'RECOMMENDATION'];
check(JSON.stringify(parseCsv(matrix[0])) === JSON.stringify(headers), 'Reuse matrix schema');
for (const [index, line] of matrix.slice(1).entries()) {
  const row = parseCsv(line);
  check(row.length === headers.length && row.every(Boolean), 'Incomplete matrix row: ' + (index + 2));
  check(['REUSE_AS_IS', 'REUSE_WITH_ADAPTATION', 'EXTRACT_CONCEPT', 'APPLICATION_SPECIFIC', 'REPLACE', 'UNVERIFIED'].includes(row[3]), 'Invalid reuse classification: ' + row[3]);
}
check(parseCsv(matrix[0]).join(',') === 'SOURCE_PROJECT,COMPONENT_OR_TOKEN,CURRENT_LOCATION,REUSE_CLASSIFICATION,DEPENDENCIES,ACCESSIBILITY_STATUS,TEST_COVERAGE,ADAPTATION_REQUIRED,RECOMMENDATION', 'Audit matrix header');
for (const line of matrix.slice(1)) { const row = parseCsv(line); check(row.length === 9 && row.every(Boolean), 'Incomplete matrix row'); check(['REUSE_AS_IS', 'REUSE_WITH_ADAPTATION', 'EXTRACT_CONCEPT', 'APPLICATION_SPECIFIC', 'REPLACE', 'UNVERIFIED'].includes(row[3]), 'Invalid reuse classification'); }
let preservation;
if (process.argv.includes('--check-references')) {
  const baseline = json('docs/audit/baseline.json');
  preservation = { checkedAt: new Date().toISOString(), references: [] };
  for (const source of baseline.references) {
    const git = (...args) => execFileSync('git', ['-C', source.path, ...args], { encoding: 'utf8' }).trimEnd();
    try {
      const changedFiles = source.hashes.filter(file => !fs.existsSync(path.join(source.path, file.path)) || crypto.createHash('sha256').update(fs.readFileSync(path.join(source.path, file.path))).digest('hex') !== file.sha256).map(file => file.path);
      const currentHead = git('rev-parse', 'HEAD');
      const gitStatusChanged = git('status', '--porcelain=v1', '--untracked-files=all') !== source.status;
      const observedHashes = changedFiles.filter(name => fs.existsSync(path.join(source.path, name))).map(name => ({ path: name, sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(source.path, name))).digest('hex') }));
      preservation.references.push({ id: source.id, observedHead: currentHead, observedBranch: git('branch', '--show-current'), headUnchanged: currentHead === source.head, gitStatusUnchanged: !gitStatusChanged, filesChecked: source.hashes.length, changedFiles, observedHashes, result: changedFiles.length || gitStatusChanged || currentHead !== source.head ? 'SOURCE_CHANGED_SINCE_SNAPSHOT' : 'UNCHANGED' });
    } catch (e) { preservation.references.push({ id: source.id, result: 'UNVERIFIED', reason: e.message }); }
  }
  if (process.argv.includes('--record')) write('docs/audit/preservation.json', preservation);
}
const report = { checkedAt: new Date().toISOString(), node: process.version, status: failures.length ? 'FAIL' : 'PASS', requiredFiles: required.length, filesChecked: files.length, localLinks, matrixRows: matrix.length - 1, primitives: Object.keys(token.primitives).length, semanticTokensPerTheme: keys.length, componentAliases: Object.keys(token.components).length, contrastGatePairs: contrasts.filter(p => p.gate).length, contrastGateFailures: contrasts.filter(p => p.gate && !p.pass).length, minimumReferenceTextRatio: Math.min(...contrasts.filter(p => p.gate && p.minimum === 4.5).map(p => p.ratio)), minimumReferenceCueRatio: Math.min(...contrasts.filter(p => p.gate && p.minimum === 3).map(p => p.ratio)), failures };
if (process.argv.includes('--record')) { write('docs/audit/contrast.json', contrasts); write('docs/audit/validation.json', report); }
console.log(JSON.stringify({ ...report, preservation }, null, 2));
if (failures.length) process.exitCode = 1;
