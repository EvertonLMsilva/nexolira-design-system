import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { Button } from './Button.js'
import { classes } from './types.js'

export interface TableProps extends ComponentPropsWithoutRef<'table'> {
  caption: string
}
/** Native table semantics inside a locally scrollable, keyboard-accessible region. */
export function Table({ caption, children, className, ...props }: TableProps) {
  const id = useId()
  return (
    <div role="region" aria-labelledby={id} tabIndex={0} className="nx-table-scroll">
      <table {...props} className={classes('nx-table', className)}>
        <caption id={id}>{caption}</caption>
        {children}
      </table>
    </div>
  )
}

export interface MediaPickerProps {
  label: string
  items: ReadonlyArray<{ id: string; label: string; thumbnail?: ReactNode }>
  selected: string | null
  onSelect: (id: string) => void
}
export function MediaPicker({ label, items, selected, onSelect }: MediaPickerProps) {
  return (
    <div role="group" aria-label={label} className="nx-media-picker">
      {items.map((item) => (
        <Button
          key={item.id}
          variant={item.id === selected ? 'primary' : 'secondary'}
          aria-pressed={item.id === selected}
          onClick={() => onSelect(item.id)}
        >
          {item.thumbnail && (
            <span className="nx-media-thumb" aria-hidden="true">
              {item.thumbnail}
            </span>
          )}
          {item.label}
        </Button>
      ))}
    </div>
  )
}
