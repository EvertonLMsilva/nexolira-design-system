import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Badge, Button, Card, FormField, Input, Panel, StatusMessage } from '@nexolira/ui'
import '@nexolira/tokens/styles.css'
import '@nexolira/ui/styles.css'
if (Panel !== Card) throw new Error('Panel must compose the same Card implementation')
function Demo({ mode }: { mode: string }) {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('Pronto')
  return <div className="demo">
    <div className="demo-buttons">{(['primary', 'secondary', 'ghost'] as const).flatMap(variant => (['sm', 'md', 'lg'] as const).map(size =>
      <Button key={variant + size} variant={variant} size={size} data-testid={'button-' + variant + '-' + size} ref={node => { if (node) node.dataset.refAttached = 'true' }} onClick={() => setMessage('Executado')}>{variant} {size}</Button>
    ))}</div>
    <Button disabled>Indisponível</Button><Button loading>Executando</Button>
    <Panel heading={'Resumo ' + mode} description="Demonstração local" action={<Button onClick={() => setMessage('Atualizado')}>Atualizar</Button>}>Conteúdo independente</Panel>
    <div>{(['neutral', 'info', 'success', 'warning', 'error'] as const).map(tone => <Badge key={tone} tone={tone}>{tone}</Badge>)}</div>
    <StatusMessage announcement="polite" data-testid={mode + '-message'}>{message}</StatusMessage>
    <FormField label={'Contato ' + mode} hint="Exemplo de auxílio" error={value ? undefined : 'Campo obrigatório'} required renderControl={props =>
      <Input {...props} value={value} onChange={event => setValue(event.target.value)} ref={node => { if (node) node.dataset.refAttached = 'true' }} />} />
  </div>
}
for (const mode of ['dark', 'light']) createRoot(document.getElementById(mode + '-root')!, { identifierPrefix: mode + '-' }).render(<Demo mode={mode} />)
createRoot(document.getElementById('nested-root')!, { identifierPrefix: 'nested-' }).render(
  <div className="demo"><Card heading="Raiz independente" data-testid="nested-card">
    <FormField label="Contato aninhado" renderControl={props => <Input {...props} />} />
  </Card></div>,
)
