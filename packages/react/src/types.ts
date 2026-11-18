export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'error'
export const classes = (...values: (string | undefined | false)[]): string => values.filter(Boolean).join(' ')
