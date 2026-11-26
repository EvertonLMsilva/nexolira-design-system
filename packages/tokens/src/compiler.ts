export interface TokenModel {
  schemaVersion: string
  draft: boolean
  primitives: Record<string, string>
  themes: Record<string, Record<string, string>>
  components: Record<string, string>
}
export const cssName = (key: string): string => '--nx-' + key.replaceAll('.', '-')
const alias = (value: string): string | undefined => /^\{([^}]+)\}$/.exec(value)?.[1]

export function resolveToken(key: string, values: Record<string, string>, visiting: string[] = []): string {
  if (visiting.includes(key)) throw new Error('Cyclic token: ' + [...visiting, key].join(' -> '))
  if (!Object.hasOwn(values, key)) throw new Error('Undefined token: ' + key)
  const value = values[key]
  if (typeof value !== 'string') throw new Error('Non-string token: ' + key)
  return alias(value) ? resolveToken(alias(value)!, values, [...visiting, key]) : value
}

/** Validates the complete contract before emitting any CSS. No global selectors. */
export function compileTokens(model: TokenModel): { css: string; resolved: Record<string, Record<string, string>> } {
  const names = Object.keys(model.themes)
  if (!names.every(name => /^[a-z][a-z0-9-]*\.(dark|light)$/.test(name))) throw new Error('Invalid theme name')
  const brands = [...new Set(names.map(name => name.split('.')[0]))].filter(brand => brand !== 'nexolira').sort()
  const modes = ['nexolira', ...brands].flatMap(brand => [brand + '.dark', brand + '.light'])
  if (!modes.every(mode => Object.hasOwn(model.themes, mode))) throw new Error('Expected complete dark and light pairs')
  const semanticKeys = Object.keys(model.themes[modes[0]]).sort()
  const keys = [...Object.keys(model.primitives), ...semanticKeys, ...Object.keys(model.components)]
  if (new Set(keys.map(cssName)).size !== keys.length) throw new Error('CSS name collision')
  for (const key of keys) if (!/^[a-z][a-z0-9-]*(\.[a-z0-9-]+)+$/.test(key)) throw new Error('Invalid token name: ' + key)
  for (const [key, value] of Object.entries(model.primitives)) {
    if (typeof value !== 'string' || alias(value)) throw new Error('Primitive must be literal: ' + key)
  }
  const resolved: Record<string, Record<string, string>> = {}
  const blocks: string[] = []
  for (const mode of modes) {
    const theme = model.themes[mode]
    if (Object.keys(theme).sort().join() !== semanticKeys.join()) throw new Error('Incomplete theme: ' + mode)
    for (const [key, value] of Object.entries(theme)) {
      if (typeof value !== 'string' || !alias(value) || Object.hasOwn(model.components, alias(value)!)) throw new Error('Semantic layer violation: ' + key)
    }
    for (const [key, value] of Object.entries(model.components)) {
      if (typeof value !== 'string' || !alias(value) || !Object.hasOwn(theme, alias(value)!)) throw new Error('Component must reference semantic token: ' + key)
    }
    const values = { ...model.primitives, ...theme, ...model.components }
    resolved[mode] = Object.fromEntries(keys.map(key => [key, resolveToken(key, values)]))
    const declarations = Object.entries(values).map(([key, value]) => '  ' + cssName(key) + ': ' + (alias(value) ? 'var(' + cssName(alias(value)!) + ')' : value) + ';')
    const [brand, scheme] = mode.split('.')
    const host = '[data-nx-theme="' + brand + '"]'
    const suffix = scheme === 'light' ? '[data-nx-mode="light"]' : ''
    const selector = (brand === 'nexolira' ? '.nx-scope' + suffix + ',\n' : '') + host + suffix
    blocks.push(selector + ' {\n' + declarations.join('\n') + '\n}\n')
  }
  return { css: '/* Nexolira tokens — generated; scoped defaults, no global reset. */\n' + blocks.join('\n'), resolved }
}
