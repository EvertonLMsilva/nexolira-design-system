import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import { compileTokens, resolveToken, tokens } from '../packages/tokens/src/index.js'

describe('token contract', () => {
  it('resolves different themes and re-emits component aliases at every boundary', () => {
    const result = compileTokens(tokens)
    expect(result.resolved['nexolira.dark']['color.background']).toBe('#0e1520')
    expect(result.resolved['nexolira.light']['color.background']).toBe('#f6f8fc')
    expect(result.resolved['nexolira.light']['card.background']).toBe('#ffffff')
    expect(result.css.match(/--nx-card-background:/g)).toHaveLength(2)
    expect(result.css).not.toMatch(/:root|@import|(^|\n)(html|body)\b/)
    expect(compileTokens(tokens).css).toBe(result.css)
  })
  it('rejects undefined aliases and cycles rather than emitting invalid CSS', () => {
    expect(() => resolveToken('missing', {})).toThrow('Undefined token')
    expect(() => resolveToken('a', { a: '{b}', b: '{a}' })).toThrow('Cyclic token')
    const model = structuredClone(tokens)
    model.themes['nexolira.dark']['color.background'] = '{color.missing}'
    expect(() => compileTokens(model)).toThrow('Undefined token')
  })
  it('rejects CSS name collisions, incomplete themes and invalid layer crossings', () => {
    const collision = structuredClone(tokens)
    collision.primitives['primitive.example.a.b'] = '1rem'
    collision.primitives['primitive.example.a-b'] = '2rem'
    expect(() => compileTokens(collision)).toThrow('CSS name collision')
    const incomplete = structuredClone(tokens)
    delete incomplete.themes['nexolira.light']['color.background']
    expect(() => compileTokens(incomplete)).toThrow('Incomplete theme')
    const layers = structuredClone(tokens)
    layers.themes['nexolira.dark']['color.background'] = '{card.background}'
    expect(() => compileTokens(layers)).toThrow('Semantic layer violation')
  })
  it('keeps component styles opt-in, free of theme literals and remote assets', () => {
    const css = fs.readFileSync('packages/react/src/styles.css', 'utf8')
    expect(css).not.toMatch(/:root|@import|#[\da-f]{3,8}\b|(^|\n)(html|body|button|input)\s*[{,]/i)
    expect(css).toContain('prefers-reduced-motion')
    expect(css).toContain(':focus-visible')
  })
})
