import type { ComponentPropsWithRef, ComponentPropsWithoutRef, ReactNode } from 'react'
import { Input, type InputProps } from './Input.js'
import { classes } from './types.js'

export type TextareaProps = ComponentPropsWithRef<'textarea'>
export function Textarea({ className, ...props }: TextareaProps) {
  return <textarea {...props} className={classes('nx-input nx-textarea', className)} />
}

export type SelectProps = ComponentPropsWithRef<'select'>
export function Select({ className, ...props }: SelectProps) {
  return <select {...props} className={classes('nx-input', className)} />
}

export type TimeInputProps = Omit<InputProps, 'type'>
export function TimeInput(props: TimeInputProps) {
  return <Input {...props} type="time" />
}

export type CheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'children'> & { label: ReactNode }
export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="nx-choice">
      <input {...props} type="checkbox" className={classes('nx-checkbox', className)} />
      <span>{label}</span>
    </label>
  )
}

/** A native group. Each child control retains its name, value and form ownership. */
export interface CheckboxGroupProps extends ComponentPropsWithRef<'fieldset'> {
  legend: ReactNode
}
export function CheckboxGroup({ legend, children, className, ...props }: CheckboxGroupProps) {
  return (
    <fieldset {...props} className={classes('nx-choice-group', className)}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  )
}

export interface FieldActionProps extends ComponentPropsWithoutRef<'div'> {
  action: ReactNode
}
export function FieldAction({ action, children, className, ...props }: FieldActionProps) {
  return (
    <div {...props} className={classes('nx-field-action', className)}>
      <div>{children}</div>
      {action}
    </div>
  )
}

export type DateInputProps = Omit<InputProps, 'type'>
export function DateInput(props: DateInputProps) {
  return <Input {...props} type="date" />
}

export function Radio({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="nx-choice">
      <input {...props} type="radio" className={classes('nx-checkbox', className)} />
      <span>{label}</span>
    </label>
  )
}

export function Switch({ label, ...props }: Omit<CheckboxProps, 'role'>) {
  return <Checkbox {...props} role="switch" label={label} />
}
