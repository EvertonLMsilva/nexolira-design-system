import type { ComponentPropsWithRef } from 'react'
import { classes, type Tone } from './types.js'
export interface StatusMessageProps extends Omit<ComponentPropsWithRef<'div'>, 'role' | 'aria-live'> {
  tone?: Tone
  announcement?: 'off' | 'polite' | 'assertive'
  busy?: boolean
}
export function StatusMessage({ tone = 'info', announcement = 'off', busy = false, className, children, ...props }: StatusMessageProps) {
  const role = announcement === 'polite' ? 'status' : announcement === 'assertive' ? 'alert' : undefined
  return <div {...props} className={classes('nx-status-message', 'nx-tone--' + tone, className)} role={role} aria-live={announcement === 'off' ? undefined : announcement} aria-busy={busy || props['aria-busy']}>
    {busy && <span className="nx-spinner" aria-hidden="true" />}
    <div>{children}</div>
  </div>
}
