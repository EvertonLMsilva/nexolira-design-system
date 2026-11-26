import { useEffect, useState } from 'react'
import {
  ActionFooter,
  Button,
  Card,
  CharacterCount,
  ConfirmDialog,
  DateInput,
  DetailList,
  Divider,
  EmptyState,
  FileUpload,
  FormField,
  IconButton,
  Input,
  MediaGallery,
  MediaViewer,
  MetricCard,
  Pagination,
  Panel,
  Progress,
  Radio,
  Select,
  SelectionList,
  Skeleton,
  StatusMessage,
  Switch,
  Tabs,
  type MediaItem,
} from '@nexolira/ui'

const choices = [
  { id: 'square', label: 'Quadrado' },
  { id: 'circle', label: 'Círculo' },
  { id: 'line', label: 'Linha' },
]
const exampleImage =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="140"><rect width="240" height="140" fill="#eaf0ff"/><circle cx="120" cy="70" r="45" fill="#244bf1"/></svg>',
  )

function Collections() {
  const [query, setQuery] = useState('')
  const [choice, setChoice] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(0)
  const [confirm, setConfirm] = useState(false)
  const options = choices.filter((item) =>
    item.label.toLocaleLowerCase('pt-BR').includes(query.trim().toLocaleLowerCase('pt-BR')),
  )
  const current = options[page]
  return (
    <>
      <div className="catalog-grid">
        <FormField
          label="Pesquisar forma"
          renderControl={(p) => (
            <Input
              {...p}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setPage(0)
                setChoice('')
              }}
            />
          )}
        />
        <FormField
          label="Formas encontradas"
          renderControl={(p) => (
            <Select
              {...p}
              value={choice}
              onChange={(e) => {
                setChoice(e.target.value)
                setPage(
                  Math.max(
                    0,
                    options.findIndex((x) => x.id === e.target.value),
                  ),
                )
              }}
            >
              <option value="">Escolher forma</option>
              {options.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Select>
          )}
        />
      </div>
      {current ? (
        <DetailList items={[{ label: 'Forma exibida', value: current.label }]} />
      ) : (
        <EmptyState
          heading="Nenhuma forma encontrada"
          action={
            <Button
              onClick={() => {
                setQuery('')
                setPage(0)
              }}
            >
              Limpar pesquisa
            </Button>
          }
        />
      )}
      <Pagination
        hasPrevious={page > 0}
        hasNext={page + 1 < options.length}
        onPrevious={() => {
          setPage(page - 1)
          setChoice(options[page - 1].id)
        }}
        onNext={() => {
          setPage(page + 1)
          setChoice(options[page + 1].id)
        }}
      />
      <Divider />
      <SelectionList
        label="Seleção em grupo"
        items={choices}
        selected={selected}
        onSelectionChange={setSelected}
      />
      <ActionFooter>
        <Button variant="secondary" disabled={!selected.length} onClick={() => setConfirm(true)}>
          Limpar seleção
        </Button>
        <span>{selected.length} selecionada(s)</span>
      </ActionFooter>
      <ConfirmDialog
        title="Limpar seleção?"
        description="As formas continuarão disponíveis."
        open={confirm}
        onOpenChange={setConfirm}
        onConfirm={() => {
          setSelected([])
          setConfirm(false)
        }}
      />
    </>
  )
}

function Gallery() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<MediaItem | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [localUrl, setLocalUrl] = useState('')
  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setLocalUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])
  const items: MediaItem[] = [
    { id: 'example', label: 'Círculo azul', group: 'Amostras', kind: 'image', src: exampleImage },
  ]
  if (file && localUrl)
    items.push({
      id: 'local',
      label: file.name,
      group: 'Arquivo local',
      kind: file.type.startsWith('video/') ? 'video' : 'image',
      src: localUrl,
    })
  return (
    <>
      <FileUpload
        label="Escolher imagem ou vídeo"
        accept="image/*,video/*"
        hint="A prévia usa o arquivo neste navegador."
        onChange={(e) => {
          setLocalUrl('')
          setPreview(null)
          setSelected((ids) => ids.filter((id) => id !== 'local'))
          setFile(e.currentTarget.files?.[0] ?? null)
        }}
      />
      <MediaGallery
        label="Galeria de exemplo"
        items={items}
        selected={selected}
        onSelectionChange={setSelected}
        onPreview={setPreview}
      />
      <MediaViewer
        open={!!preview}
        item={preview}
        onOpenChange={(open) => {
          if (!open) setPreview(null)
        }}
      />
    </>
  )
}

export function Examples() {
  const [tab, setTab] = useState('selection')
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [portal, setPortal] = useState<HTMLDivElement | null>(null)
  const [confirm, setConfirm] = useState(false)
  return (
    <>
      <Card heading="Formulários">
        <div className="catalog-grid">
          <FormField label="Data local" renderControl={(p) => <DateInput {...p} />} />
          <fieldset className="nx-choice-group">
            <legend>Orientação</legend>
            <Radio label="Horizontal" name="orientation" defaultChecked />
            <Radio label="Vertical" name="orientation" />
          </fieldset>
          <FormField
            label="Nota curta"
            error={notes.length > 20 ? 'Use até 20 caracteres.' : undefined}
            hint={<CharacterCount value={notes} maxLength={20} />}
            renderControl={(p) => <Input {...p} value={notes} onChange={(e) => setNotes(e.target.value)} />}
          />
          <Switch label="Mostrar carregamento" checked={busy} onChange={(e) => setBusy(e.target.checked)} />
        </div>
      </Card>
      <Panel heading="Listas e mídias">
        <Tabs
          label="Exemplos de coleção"
          value={tab}
          onValueChange={setTab}
          items={[
            { id: 'selection', label: 'Listas', content: <Collections /> },
            { id: 'gallery', label: 'Galeria', content: <Gallery /> },
          ]}
        />
      </Panel>
      <Card heading="Estados de leitura">
        <div className="catalog-grid">
          <MetricCard
            heading="Itens de exemplo"
            value="0"
            trend={{ direction: 'neutral', label: 'Sem variação' }}
          />
          <MetricCard heading="Métrica indisponível" value="Sem observação" />
        </div>
        <Progress label="Progresso do exemplo" value={busy ? undefined : 50} />
        {busy && <Skeleton label="Carregando exemplo" />}
        <Button loading={busy} onClick={() => setBusy(true)}>
          Carregar exemplo
        </Button>
        <IconButton aria-label="Limpar carregamento" variant="ghost" onClick={() => setBusy(false)}>
          ×
        </IconButton>
        <StatusMessage tone="error">Exemplo de erro de leitura.</StatusMessage>
      </Card>
      <div ref={setPortal} />
      <ActionFooter>
        <Button variant="secondary" onClick={() => setConfirm(true)}>
          Abrir confirmação em portal
        </Button>
      </ActionFooter>
      {portal && (
        <ConfirmDialog
          open={confirm}
          portalContainer={portal}
          title="Confirmar alteração?"
          description="Este diálogo usa um contêiner de portal dentro do tema."
          onOpenChange={setConfirm}
          onConfirm={() => setConfirm(false)}
        />
      )}
    </>
  )
}
