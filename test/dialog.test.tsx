import { render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it, vi } from 'vitest'
import { Dialog, Drawer } from '../packages/react/src/index.js'

// JSDOM provides the element but omits the native modal methods.
Object.defineProperties(HTMLDialogElement.prototype, {
  showModal: {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.open = true
    },
  },
  close: {
    configurable: true,
    value(this: HTMLDialogElement) {
      this.open = false
    },
  },
})

it('cancels only the inner dialog when it renders in a portal', () => {
  const closeDrawer = vi.fn()
  const closeDialog = vi.fn()
  render(
    <Drawer open title="Painel" onOpenChange={closeDrawer}>
      <Dialog open title="Confirmação" onOpenChange={closeDialog} portalContainer={document.body}>
        Confirmar alterações
      </Dialog>
    </Drawer>,
  )

  const inner = screen.getByRole('dialog', { name: 'Confirmação' })
  const cancel = new Event('cancel', { cancelable: true })
  inner.dispatchEvent(cancel)

  expect(cancel.defaultPrevented).toBe(true)
  expect(closeDialog).toHaveBeenCalledExactlyOnceWith(false)
  expect(closeDrawer).not.toHaveBeenCalled()
})

it('keeps rich content in the accessible description after HTML parsing', () => {
  const markup = renderToStaticMarkup(
    <Dialog
      open
      title="Revisão"
      onOpenChange={vi.fn()}
      description={<ul><li>Direitos pendentes</li></ul>}
    >
      Revisar campanha
    </Dialog>,
  )
  const parsed = new DOMParser().parseFromString(markup, 'text/html')
  const descriptionId = parsed.querySelector('dialog')!.getAttribute('aria-describedby')!
  const description = parsed.getElementById(descriptionId)

  expect(description?.querySelector('li')?.textContent).toBe('Direitos pendentes')
})
