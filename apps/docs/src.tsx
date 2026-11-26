import { StrictMode, useEffect, useState } from 'react'
import { Examples } from './Examples'
import { createRoot } from 'react-dom/client'
import {
  AppShell,
  Breadcrumb,
  NavigationItem,
  PageHeader,
  Sidebar,
  Badge,
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Dialog,
  Accordion,
  Drawer,
  FieldAction,
  FormField,
  Input,
  MediaPicker,
  Select,
  Table,
  StatusMessage,
  Stepper,
  Textarea,
  TimeInput,
} from '@nexolira/ui'
import '@nexolira/tokens/styles.css'
import '@nexolira/ui/styles.css'
import './catalog.css'

const sections = [
  ['paleta', 'Paleta'],
  ['campos', 'Campos e seleção'],
  ['navegacao', 'Navegação'],
  ['colecoes', 'Coleções'],
  ['feedback', 'Feedback'],
] as const
const roles = [
  ['Canvas', 'background'],
  ['Superfície', 'surface'],
  ['Texto', 'text-primary'],
  ['Primária', 'primary'],
  ['Destaque', 'accent'],
  ['Foco', 'focus'],
] as const
const steps = [
  { id: 'prepare', label: 'Preparar' },
  { id: 'review', label: 'Revisar' },
  { id: 'confirm', label: 'Confirmar', disabled: true },
]

function Index({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Sidebar label="Seções do catálogo">
      {sections.map(([id, label]) => (
        <NavigationItem href={'#' + id} key={id} onClick={onNavigate}>
          {label}
        </NavigationItem>
      ))}
    </Sidebar>
  )
}

function Catalog() {
  const [theme, setTheme] = useState('mktauto')
  const [mode, setMode] = useState('light')
  const [drawer, setDrawer] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [step, setStep] = useState('prepare')
  const [description, setDescription] = useState('')
  const [media, setMedia] = useState('original')
  const [saved, setSaved] = useState(false)
  useEffect(() => {
    const desktop = matchMedia('(min-width: 901px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setDrawer(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])
  return (
    <div className="nx-scope catalog" data-nx-theme={theme} data-nx-mode={mode}>
      <a className="catalog-skip" href="#content">
        Ir ao conteúdo
      </a>
      <header>
        <strong>
          Nexolira <span>Design System</span>
        </strong>
        <div className="catalog-toolbar">
          <div>
            <label htmlFor="catalog-theme">Tema</label>
            <Select id="catalog-theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="mktauto">MKTauto</option>
              <option value="nexolira">Nexolira</option>
            </Select>
          </div>
          <div>
            <label htmlFor="catalog-mode">Modo</label>
            <Select id="catalog-mode" value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
            </Select>
          </div>
          <Button className="catalog-menu" variant="secondary" onClick={() => setDrawer(true)}>
            <span aria-hidden="true">☰</span> Menu
          </Button>
        </div>
      </header>
      <AppShell navigation={<Index />} mobileNavigation={null}>
        <main id="content" tabIndex={-1}>
          <Breadcrumb items={[{ label: 'Biblioteca', href: '#content' }, { label: 'Catálogo' }]} />
          <PageHeader
            heading="Catálogo de componentes"
            description="Exemplos interativos da biblioteca local 0.2.0."
          />
          <Card id="paleta" heading="Paleta">
            <div className="catalog-swatches">
              {roles.map(([label, role]) => (
                <div key={role}>
                  <i aria-hidden="true" style={{ backgroundColor: 'var(--nx-color-' + role + ')' }} />
                  <strong>{label}</strong>
                  <code>{role}</code>
                </div>
              ))}
            </div>
          </Card>
          <Card id="campos" heading="Campos e seleção">
            <div className="catalog-grid">
              <FormField label="Nome" renderControl={(p) => <Input {...p} placeholder="Nome do exemplo" />} />
              <FormField label="Horário" renderControl={(p) => <TimeInput {...p} defaultValue="09:30" />} />
              <FormField
                label="Formato"
                renderControl={(p) => (
                  <Select {...p}>
                    <option>Imagem</option>
                    <option>Vídeo</option>
                  </Select>
                )}
              />
              <CheckboxGroup legend="Incluir na seleção">
                <Checkbox label="Original" defaultChecked />
                <Checkbox label="Variação" />
              </CheckboxGroup>
            </div>
            <FieldAction
              action={
                <Button variant="secondary" onClick={() => setDescription('Descrição de exemplo')}>
                  Inserir exemplo
                </Button>
              }
            >
              <FormField
                label="Descrição"
                hint="Texto editável deste exemplo."
                renderControl={(p) => (
                  <Textarea {...p} value={description} onChange={(e) => setDescription(e.target.value)} />
                )}
              />
            </FieldAction>
          </Card>
          <Card id="navegacao" heading="Navegação">
            <Stepper
              label="Etapas do exemplo"
              items={steps.map((item) => ({
                ...item,
                state: item.disabled ? 'blocked' : item.id === step ? 'current' : 'pending',
              }))}
              onSelect={setStep}
            />
            <Accordion heading="Detalhes da etapa">
              <p>Etapa selecionada: {steps.find((item) => item.id === step)?.label}.</p>
            </Accordion>
            <Button onClick={() => setDialog(true)}>Abrir revisão</Button>
          </Card>
          <Card id="colecoes" heading="Coleções">
            <MediaPicker
              label="Escolher mídia de exemplo"
              items={[
                { id: 'original', label: 'Original' },
                { id: 'variant', label: 'Variação' },
              ]}
              selected={media}
              onSelect={setMedia}
            />
            <Table caption="Dados da seleção">
              <thead>
                <tr>
                  <th scope="col">Mídia</th>
                  <th scope="col">Formato de exemplo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{media === 'original' ? 'Original' : 'Variação'}</th>
                  <td>Imagem</td>
                </tr>
              </tbody>
            </Table>
          </Card>
          <Card id="feedback" heading="Feedback">
            <div className="catalog-badges">
              <Badge>Rascunho</Badge>
              <Badge tone="warning">Em revisão</Badge>
              <Badge tone="success">Concluído</Badge>
            </div>
            <StatusMessage tone={saved ? 'success' : 'info'} announcement="polite">
              {saved ? 'Exemplo confirmado.' : 'Aguardando confirmação do exemplo.'}
            </StatusMessage>
          </Card>
          <Examples />
        </main>
      </AppShell>
      <Drawer title="Índice de componentes" closeLabel="Fechar menu" open={drawer} onOpenChange={setDrawer}>
        <Index onNavigate={() => setDrawer(false)} />
      </Drawer>
      <Dialog title="Revisar exemplo" closeLabel="Fechar" open={dialog} onOpenChange={setDialog}>
        <p>{description || 'A descrição está vazia.'}</p>
        <Button
          onClick={() => {
            setSaved(true)
            setDialog(false)
          }}
        >
          Confirmar exemplo
        </Button>
      </Dialog>
    </div>
  )
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Catalog />
  </StrictMode>,
)
