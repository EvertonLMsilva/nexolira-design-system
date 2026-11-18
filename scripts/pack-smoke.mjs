import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import http from 'node:http'
import crypto from 'node:crypto'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'
import assert from 'node:assert/strict'
import { chromium, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const npmCli = process.env.npm_execpath
if (!npmCli) throw new Error('Run through npm run pack:verify so the verified npm runtime is available')
function run(args, cwd = root, cli = npmCli) {
  const result = spawnSync(process.execPath, (cli ? [cli, ...args] : args), { cwd, encoding: 'utf8', env: { ...process.env, npm_config_audit: 'false', npm_config_fund: 'false' } })
  if (result.stderr?.trim()) console.log(result.stderr.trim())
  if (result.status !== 0) throw new Error(result.stdout + '\n' + result.stderr)
  return result.stdout
}
function distHashes() {
  const rows = []
  for (const name of ['tokens', 'react']) for (const file of fs.readdirSync(path.join(root, 'packages', name, 'dist')).sort()) {
    const target = path.join(root, 'packages', name, 'dist', file)
    assert(fs.statSync(target).isFile(), 'Unexpected directory in package dist')
    rows.push([name + '/' + file, crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex')])
  }
  return rows
}
run(['scripts/build.mjs'], root, null)
const firstBuild = distHashes()
run(['scripts/build.mjs'], root, null)
assert.deepEqual(distHashes(), firstBuild, 'Build output is not deterministic')
const artifacts = path.join(root, '.artifacts')
fs.mkdirSync(artifacts, { recursive: true })
const packages = []
for (const workspace of ['@nexolira/tokens', '@nexolira/ui']) {
  const packResult = JSON.parse(run(['pack', '--workspace', workspace, '--pack-destination', artifacts, '--ignore-scripts', '--json']))
  const packed = Array.isArray(packResult) ? packResult[0] : packResult[workspace] ?? packResult
  for (const file of packed.files) assert(file.path === 'package.json' || file.path === 'README.md' || /^dist\/[\w.-]+$/.test(file.path), 'Unexpected tarball content: ' + file.path)
  assert(packed.files.some(f => f.path === 'dist/index.d.ts'))
  assert(packed.files.some(f => f.path === 'dist/styles.css'))
  const archive = path.join(artifacts, packed.filename)
  packages.push({ name: packed.name, version: packed.version, archive, sha256: crypto.createHash('sha256').update(fs.readFileSync(archive)).digest('hex'), files: packed.files.map(f => f.path) })
}
const browser = await chromium.launch({ headless: true })
const consumers = []
try {
  for (const version of ['19.2.8', '19.3.1']) {
    const consumer = fs.mkdtempSync(path.join(os.tmpdir(), 'nx-ds-002-consumer-'))
    assert(!path.resolve(consumer).startsWith(root + path.sep), 'Consumer must be outside the workspace')
    fs.writeFileSync(path.join(consumer, 'package.json'), JSON.stringify({ name: 'nx-ds-disposable-consumer', version: '0.0.0', private: true, type: 'module', allowScripts: { esbuild: true } }, null, 2))
    for (const file of ['index.html', 'src.tsx']) fs.copyFileSync(path.join(root, 'test/consumer', file), path.join(consumer, file))
    fs.writeFileSync(path.join(consumer, 'tsconfig.json'), JSON.stringify({ compilerOptions: { target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', jsx: 'react-jsx', strict: true, noEmit: true, resolveJsonModule: true, skipLibCheck: true, lib: ['ES2022', 'DOM'] }, include: ['src.tsx'] }))
    run(['install', ...packages.map(p => p.archive), 'react@' + version, 'react-dom@' + version, 'typescript@6.0.2', 'vite@8.3.8', '@types/react@19.3.0', '@types/react-dom@19.3.0', '--no-audit', '--no-fund'], consumer)
    run(['node_modules/typescript/bin/tsc'], consumer, null)
    run(['node_modules/vite/bin/vite.js', 'build'], consumer, null)
    const require = createRequire(path.join(consumer, 'package.json'))
    const ui = path.join(consumer, 'node_modules/@nexolira/ui')
    assert(!fs.lstatSync(ui).isSymbolicLink(), 'Tarball installation unexpectedly used a symlink')
    for (const name of ['react', 'react-dom']) assert.equal(require.resolve(name), require.resolve(name, { paths: [ui] }), name + ' duplicated')
    const tree = JSON.parse(run(['ls', 'react', 'react-dom', '@nexolira/tokens', '@nexolira/ui', '--all', '--json'], consumer))
    assert.equal(tree.dependencies.react.version, version)
    assert.equal(tree.dependencies['react-dom'].version, version)
    run(['--input-type=module', '-e', "import assert from 'node:assert/strict'; await assert.rejects(import('@nexolira/ui/internal'), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' }); const t=await import('@nexolira/tokens'); assert.equal(t.resolvedTokens['nexolira.light']['card.background'], '#ffffff');"], consumer, null)
    const { resolvedTokens } = await import(pathToFileURL(path.join(consumer, 'node_modules/@nexolira/tokens/dist/index.js')).href)
    const rgb = hex => 'rgb(' + [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(', ') + ')'
    const dist = path.join(consumer, 'dist')
    const server = http.createServer((request, response) => {
      const requested = new URL(request.url, 'http://localhost').pathname
      if (requested === '/favicon.ico') { response.writeHead(204).end(); return }
      const target = path.resolve(dist, '.' + (requested === '/' ? '/index.html' : requested))
      if (!target.startsWith(dist + path.sep) || !fs.existsSync(target) || !fs.statSync(target).isFile()) { response.writeHead(404).end(); return }
      response.setHeader('Content-Type', target.endsWith('.js') ? 'text/javascript' : target.endsWith('.css') ? 'text/css' : 'text/html')
      response.end(fs.readFileSync(target))
    })
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
    const origin = 'http://127.0.0.1:' + server.address().port
    const context = await browser.newContext({ viewport: { width: 1200, height: 1000 } })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (['error', 'warning'].includes(message.type())) errors.push(message.text()) })
    const externalRequests = []
    await page.route('**/*', route => { if (route.request().url().startsWith(origin + '/')) return route.continue(); externalRequests.push(route.request().url()); return route.abort() })
    try {
      await page.goto(origin)
      await expect(page.getByTestId('button-primary-sm').first()).toBeVisible()
      const checks = []
      for (const mode of ['dark', 'light']) {
        const host = page.locator('#' + mode + '-host')
        const palette = resolvedTokens['nexolira.' + mode]
        const expected = rgb(palette['card.background'])
        await expect(host.locator('.nx-card').first()).toHaveCSS('background-color', expected)
        await expect(host.locator('.nx-button').first()).toHaveCSS('min-height', '44px')
        const field = host.getByRole('textbox', { name: 'Contato ' + mode, exact: true })
        await expect(field).toHaveAttribute('data-ref-attached', 'true')
        await expect(host.getByTestId('button-primary-sm')).toHaveAttribute('data-ref-attached', 'true')
        await expect(field).toHaveAttribute('aria-invalid', 'true')
        await expect(field).toHaveAttribute('data-ref-attached', 'true')
        await expect(field).toHaveCSS('border-top-color', rgb(palette['color.status.error']))
        await expect(field).toHaveAccessibleDescription('Exemplo de auxílio Campo obrigatório')
        await field.fill('exemplo@local.test')
        await expect(field).toHaveValue('exemplo@local.test')
        await expect(field).not.toHaveAttribute('aria-invalid')
        await host.getByTestId('button-primary-sm').click()
        await expect(host.getByTestId(mode + '-message')).toHaveText('Executado')
        const primary = host.getByTestId('button-primary-md')
        await page.mouse.move(0, 0)
        await expect(primary).toHaveCSS('background-color', rgb(palette['color.action.primary']))
        await expect(primary).toHaveCSS('color', rgb(palette['color.text.on-primary']))
        await primary.hover()
        await expect(primary).toHaveCSS('background-color', rgb(palette['color.action.primary.hover']))
        await page.mouse.down()
        await expect(primary).toHaveCSS('background-color', rgb(palette['color.action.primary.active']))
        await page.mouse.up()
        await field.focus()
        await expect(field).toHaveCSS('outline-color', rgb(palette['color.focus']))
        checks.push(mode + ': normal/hover/active styles, input, event, label, error, ref')
      }
      await expect(page.getByTestId('nested-card')).toHaveCSS('background-color', 'rgb(255, 255, 255)')
      assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).getPropertyValue('--nx-color-background')), '')
      await expect(page.locator('body')).toHaveCSS('margin-top', '8px')
      await expect(page.locator('#outside')).toHaveCSS('color', 'rgb(0, 0, 0)')
      checks.push('nested aliases, independent React roots, no global style leakage')
      const ids = await page.locator('input').evaluateAll(nodes => nodes.map(node => node.id))
      assert.equal(new Set(ids).size, ids.length, 'Duplicate control IDs across roots')
      assert.equal(await page.locator('body').evaluate(node => getComputedStyle(node).margin), '8px')
      assert.equal(await page.locator('html').evaluate(node => getComputedStyle(node).getPropertyValue('--nx-color-background')), '')
      assert.equal(await page.locator('#outside').evaluate(node => getComputedStyle(node).color), 'rgb(0, 0, 0)')
      checks.push('unscoped html/body/outside text unchanged')
      const dark = page.locator('#dark-host')
      await page.locator('#before-library').focus()
      await page.keyboard.press('Tab')
      await expect(dark.getByTestId('button-primary-sm')).toBeFocused()
      await expect(dark.getByTestId('button-primary-sm')).toHaveCSS('outline-style', 'solid')
      await expect(dark.getByTestId('button-primary-sm')).toHaveCSS('outline-width', '2px')
      await dark.getByTestId('button-ghost-lg').focus()
      await page.keyboard.press('Tab')
      await expect(dark.getByRole('button', { name: 'Atualizar' })).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(dark.getByTestId('dark-message')).toHaveText('Atualizado')
      checks.push('keyboard activation, focus ring, skipped disabled/loading controls')
      await expect(dark.locator('.nx-spinner')).toHaveCSS('animation-name', 'nx-spin')
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await expect(dark.locator('.nx-spinner')).toHaveCSS('animation-name', 'none')
      await expect(dark.getByTestId('button-primary-sm')).toHaveCSS('transition-duration', '0s')
      await page.emulateMedia({ forcedColors: 'active' })
      await dark.getByTestId('button-primary-sm').focus()
      await expect(dark.getByTestId('button-primary-sm')).toHaveCSS('outline-style', 'solid')
      await page.emulateMedia({ forcedColors: 'none' })
      checks.push('reduced motion and forced-colors focus')
      const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
      assert.deepEqual(accessibility.violations.map(v => ({ id: v.id, impact: v.impact })), [], 'Automated accessibility violations')
      await page.setViewportSize({ width: 320, height: 900 })
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Unexpected horizontal page overflow at 320px')
      assert.deepEqual(externalRequests, [])
      assert.deepEqual(errors, [])
      checks.push('axe checks, 320px reflow, zero runtime warnings/errors/external requests')
      consumers.push({ react: version, reactDom: version, path: consumer, install: 'PASS_TARBALLS_NO_SYMLINK', typecheck: 'PASS', build: 'PASS', singleReact: true, browser: 'PASS', accessibilityViolations: 0, checks })
      console.log('Consumer React/DOM ' + version + ': PASS')
    } finally { await context.close(); await new Promise(resolve => server.close(resolve)) }
  }
} finally { await browser.close() }
const report = { checkedAt: new Date().toISOString(), node: process.version, status: 'PASS', deterministicBuild: true, packages, consumers }
fs.writeFileSync(path.join(artifacts, 'pack-smoke.json'), JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify(report, null, 2))
