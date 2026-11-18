import data from '../reference/tokens.json' with { type: 'json' }
import { compileTokens, type TokenModel } from './compiler.js'
export { compileTokens, cssName, resolveToken } from './compiler.js'
export type { TokenModel } from './compiler.js'
export const tokens: TokenModel = data
export const resolvedTokens: Record<string, Record<string, string>> = compileTokens(tokens).resolved
