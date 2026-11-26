import { createPortal } from 'react-dom'
import { useLayoutEffect, useId, useRef, type KeyboardEvent, type ReactNode, type RefObject } from 'react'
import { Button } from './Button.js'
import { classes } from './types.js'

const scrollLocks = new WeakMap<Document, { count: number; overflow: string }>()
function lockScroll(doc: Document) {
  const lock = scrollLocks.get(doc) ?? { count: 0, overflow: doc.body.style.overflow }
  if (lock.count === 0) doc.body.style.overflow = 'hidden'
  lock.count += 1
  scrollLocks.set(doc, lock)
  return () => {
    if (--lock.count !== 0) return
    if (doc.body.style.overflow === 'hidden') doc.body.style.overflow = lock.overflow
    scrollLocks.delete(doc)
  }
}

function keepTabInDialog(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab' || event.defaultPrevented) return
  const dialog = event.currentTarget
  if (event.target instanceof Element && event.target.closest('dialog') !== dialog) return
  const focusable = Array.from(
    dialog.querySelectorAll<HTMLElement>(
      'button, input, select, textarea, a[href], summary, [tabindex], [contenteditable=true], video[controls], audio[controls]',
    ),
  ).filter(
    (node) =>
      node.tabIndex >= 0 &&
      !node.matches(':disabled') &&
      !node.closest('[inert]') &&
      node.getClientRects().length > 0 &&
      getComputedStyle(node).visibility === 'visible',
  )
  const first = focusable[0],
    last = focusable.at(-1)
  const boundary = event.shiftKey ? first : last
  if (!boundary || dialog.ownerDocument.activeElement !== boundary) return
  event.preventDefault()
  ;(event.shiftKey ? last : first)?.focus()
}

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  closeLabel?: string
  description?: ReactNode
  portalContainer?: HTMLElement
  children: ReactNode
  initialFocusRef?: RefObject<HTMLElement | null>
  className?: string
  id?: string
}

function ModalSurface({
  title,
  closeLabel = 'Fechar',
  description,
  children,
  onOpenChange,
  initialFocusRef,
  className,
  id,
}: Omit<DialogProps, 'open'>) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  useLayoutEffect(() => {
    const dialog = ref.current!
    const trigger = dialog.ownerDocument.activeElement
    dialog.showModal()
    const unlock = lockScroll(dialog.ownerDocument)
    if (initialFocusRef?.current && dialog.contains(initialFocusRef.current)) initialFocusRef.current.focus()
    return () => {
      dialog.close()
      unlock()
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [initialFocusRef])
  return (
    <dialog
      ref={ref}
      id={id}
      className={classes('nx-dialog', className)}
      aria-labelledby={titleId}
      aria-describedby={description ? titleId + '-description' : undefined}
      onKeyDown={keepTabInDialog}
      onCancel={(event) => {
        if (event.target !== event.currentTarget) return
        event.preventDefault()
        onOpenChange(false)
      }}
      onClose={(event) => {
        if (event.target === event.currentTarget && !event.currentTarget.open) onOpenChange(false)
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          onOpenChange(false)
      }}
    >
      <div className="nx-dialog__header">
        <h2 id={titleId}>{title}</h2>
        <Button variant="ghost" onClick={() => onOpenChange(false)}>
          {closeLabel}
        </Button>
      </div>
      {description && <div id={titleId + '-description'}>{description}</div>}
      {children}
    </dialog>
  )
}

export function Dialog({ open, portalContainer, ...props }: DialogProps) {
  if (!open) return null
  const surface = <ModalSurface {...props} />
  return portalContainer ? createPortal(surface, portalContainer) : surface
}

export interface DrawerProps extends DialogProps {
  side?: 'start' | 'end'
}
export function Drawer({ side = 'start', className, ...props }: DrawerProps) {
  return <Dialog {...props} className={classes('nx-drawer nx-drawer--' + side, className)} />
}
