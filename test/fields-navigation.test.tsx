import { createRef, useState } from 'react'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Accordion,
  FieldAction,
  FormField,
  Select,
  Stepper,
  Textarea,
  TimeInput,
} from '../packages/react/src/index.js'

it('submits independent native values and preserves the group disabled state', async () => {
  const { container, rerender } = render(
    <form>
      <CheckboxGroup legend="Canais">
        <Checkbox name="channel" value="a" label="Um" />
        <Checkbox name="channel" value="b" label="Dois" />
      </CheckboxGroup>
    </form>,
  )
  await userEvent.click(screen.getByLabelText('Um'))
  await userEvent.click(screen.getByLabelText('Dois'))
  expect(new FormData(container.querySelector('form')!).getAll('channel')).toEqual(['a', 'b'])
  rerender(
    <CheckboxGroup legend="Canais" disabled>
      <Checkbox label="Um" defaultChecked />
    </CheckboxGroup>,
  )
  expect(screen.getByLabelText('Um')).toBeDisabled()
})

it('associates text, select and time with native labels, errors and refs', async () => {
  const ref = createRef<HTMLTextAreaElement>()
  render(
    <>
      <FieldAction action={<Button>Ação</Button>}>
        <FormField
          label="Descrição"
          error="Verifique o texto"
          renderControl={(p) => <Textarea {...p} ref={ref} />}
        />
      </FieldAction>
      <FormField
        label="Formato"
        renderControl={(p) => (
          <Select {...p}>
            <option>Imagem</option>
            <option>Vídeo</option>
          </Select>
        )}
      />
      <FormField label="Hora" renderControl={(p) => <TimeInput {...p} min="08:30" defaultValue="08:45" />} />
    </>,
  )
  expect(screen.getByRole('textbox', { name: 'Descrição' })).toBe(ref.current)
  expect(ref.current).toHaveAccessibleDescription('Verifique o texto')
  await userEvent.selectOptions(screen.getByRole('combobox'), 'Vídeo')
  expect(screen.getByRole('combobox')).toHaveValue('Vídeo')
  expect(screen.getByLabelText('Hora')).toHaveAttribute('type', 'time')
  expect(screen.getByLabelText('Hora')).toHaveValue('08:45')
})

it('keeps step choice controlled and routes native disclosure activation to details', async () => {
  const choose = vi.fn()
  function Example() {
    const [current, setCurrent] = useState('a')
    return (
      <>
        <Stepper
          label="Etapas"
          items={[
            { id: 'a', label: 'Um', state: current === 'a' ? 'current' : 'completed' },
            { id: 'b', label: 'Dois', state: current === 'b' ? 'current' : 'pending' },
            { id: 'c', label: 'Três', state: 'blocked' },
          ]}
          onSelect={(id) => {
            setCurrent(id)
            choose(id)
          }}
        />
        <Accordion heading="Mais detalhes">Texto da etapa</Accordion>
      </>
    )
  }
  render(<Example />)
  await userEvent.click(screen.getByRole('button', { name: /Três/ }))
  expect(choose).not.toHaveBeenCalled()
  await userEvent.click(screen.getByRole('button', { name: /Dois/ }))
  expect(screen.getByRole('button', { name: /Dois/ })).toHaveAttribute('aria-current', 'step')
  await userEvent.click(screen.getByText('Mais detalhes'))
  expect(screen.getByText('Mais detalhes').closest('details')).toHaveAttribute('open')
})
