import { useId, type HTMLAttributes, type ReactNode } from 'react'
import { classes } from './types.js'
export interface FormControlProps {
  id: string
  'aria-describedby'?: string
  'aria-invalid'?: true
  required?: boolean
}
export interface FormFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label: ReactNode
  hint?: ReactNode
  error?: ReactNode
  required?: boolean
  renderControl: (props: FormControlProps) => ReactNode
}
export function FormField({ id, label, hint, error, required, renderControl, className, ...props }: FormFieldProps) {
  const generated = useId()
  const controlId = id ?? 'nx-field-' + generated
  const description = [hint ? controlId + '-hint' : undefined, error ? controlId + '-error' : undefined].filter(Boolean).join(' ') || undefined
  return <div {...props} className={classes('nx-form-field', className)}>
    <label className="nx-form-field__label" htmlFor={controlId}>{label}{required && <span aria-hidden="true"> *</span>}</label>
    {renderControl({ id: controlId, 'aria-describedby': description, 'aria-invalid': error ? true : undefined, required: required || undefined })}
    {hint && <div className="nx-form-field__hint" id={controlId + '-hint'}>{hint}</div>}
    {error && <div className="nx-form-field__error" id={controlId + '-error'}>{error}</div>}
  </div>
}
