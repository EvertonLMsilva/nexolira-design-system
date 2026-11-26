import { Button } from './Button.js'
import { Dialog, type DialogProps } from './Dialog.js'

export interface ConfirmDialogProps extends Omit<DialogProps, 'children'> {
  onConfirm: () => void
  confirmLabel?: string
  cancelLabel?: string
}
export function ConfirmDialog({
  onConfirm,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  ...props
}: ConfirmDialogProps) {
  return (
    <Dialog {...props}>
      <div className="nx-action-footer">
        <Button variant="secondary" onClick={() => props.onOpenChange(false)}>
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </div>
    </Dialog>
  )
}
