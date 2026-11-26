import { useId, type ComponentPropsWithRef, type ReactNode } from 'react'
import { Button, type ButtonProps } from './Button.js'
import { Input } from './Input.js'
import { classes } from './types.js'

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'aria-label'> {
  'aria-label': string
  children: ReactNode
}
export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <Button {...props} className={classes('nx-icon-button', className)}>
      <span aria-hidden="true">{children}</span>
    </Button>
  )
}
export interface CharacterCountProps {
  value: string
  maxLength: number
  id?: string
}
export function CharacterCount({ value, maxLength, id }: CharacterCountProps) {
  return (
    <span id={id} className="nx-field-note" data-invalid={value.length > maxLength || undefined}>
      {value.length} / {maxLength} caracteres
    </span>
  )
}
export interface FileUploadProps extends Omit<ComponentPropsWithRef<'input'>, 'type'> {
  label: string
  hint?: string
}
export function FileUpload({ label, hint, id, ...props }: FileUploadProps) {
  const generated = useId()
  const controlId = id ?? generated
  return (
    <div className="nx-form-field">
      <label htmlFor={controlId}>{label}</label>
      <Input
        {...props}
        id={controlId}
        type="file"
        aria-describedby={
          [props['aria-describedby'], hint ? controlId + '-hint' : undefined].filter(Boolean).join(' ') ||
          undefined
        }
      />
      {hint && (
        <span className="nx-field-note" id={controlId + '-hint'}>
          {hint}
        </span>
      )}
    </div>
  )
}
