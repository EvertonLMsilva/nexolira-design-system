import type { ComponentPropsWithRef } from 'react'
import { classes } from './types.js'
export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}
export function Button({ variant = 'primary', size = 'md', loading = false, disabled, type = 'button', className, children, ref, ...props }: ButtonProps) {
  return <button {...props} ref={ref} type={type} disabled={disabled || loading} aria-busy={loading || props['aria-busy']} className={classes('nx-button', 'nx-button--' + variant, 'nx-button--' + size, className)}>
    {loading && <span className="nx-spinner" aria-hidden="true" />}
    {children}
  </button>
}
