import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { build } from 'esbuild'
import { compileTokens } from '../packages/tokens/src/compiler.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
process.chdir(root)
for (const relative of ['.types', 'packages/tokens/dist', 'packages/react/dist']) {
  const target = path.resolve(root, relative)
  if (!target.startsWith(root + path.sep)) throw new Error('Build cleanup escaped workspace')
  fs.rmSync(target, { recursive: true, force: true })
}
const reference = JSON.parse(fs.readFileSync('packages/tokens/reference/tokens.json', 'utf8'))
const generated = compileTokens(reference)
for (const name of ['tokens', 'react']) {
  fs.mkdirSync('packages/' + name + '/dist', { recursive: true })
  fs.writeFileSync('packages/' + name + '/dist/styles.d.ts', 'export {}\n')
}
fs.writeFileSync('packages/tokens/dist/styles.css', generated.css)
fs.writeFileSync('packages/tokens/dist/tokens.json', JSON.stringify(reference, null, 2) + '\n')
fs.copyFileSync('packages/react/src/styles.css', 'packages/react/dist/styles.css')
const entries = [['tokens', 'packages/tokens/src/index.ts'], ['react', 'packages/react/src/index.ts']]
for (const [name, entry] of entries) {
  await build({ entryPoints: [entry], outfile: 'packages/' + name + '/dist/index.js', bundle: true, format: 'esm', platform: 'neutral', target: 'es2022', external: ['react', 'react/*', 'react-dom', 'react-dom/*'], metafile: true }).then(result => {
    if (Object.keys(result.metafile.inputs).some(p => /node_modules[/\\](react|react-dom)[/\\]/.test(p))) throw new Error('React embedded in bundle')
  })
}
execFileSync(process.execPath, ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.types.json'], { stdio: 'inherit' })
for (const name of ['tokens', 'react']) fs.cpSync('.types/' + name + '/src', 'packages/' + name + '/dist', { recursive: true })
console.log('Built ESM, declarations and scoped CSS for @nexolira/tokens and @nexolira/ui.')
