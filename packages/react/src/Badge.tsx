import type { ComponentPropsWithRef } from 'react'
import { classes, type Tone } from './types.js'
export interface BadgeProps extends ComponentPropsWithRef<'span'> { tone?: Tone }
export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return <span {...props} className={classes('nx-badge', 'nx-tone--' + tone, className)} />
}
