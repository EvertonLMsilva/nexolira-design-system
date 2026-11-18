import type { ComponentPropsWithRef } from 'react'
import { classes } from './types.js'
export interface InputProps extends ComponentPropsWithRef<'input'> {}
export function Input({ className, ref, ...props }: InputProps) {
  return <input {...props} ref={ref} className={classes('nx-input', className)} />
}
