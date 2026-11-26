import { type ReactNode } from 'react'
import { Button } from './Button.js'
import { Checkbox } from './Fields.js'
import { Dialog, type DialogProps } from './Dialog.js'
import { Card, type CardProps } from './Card.js'

export interface PaginationProps {
  hasPrevious: boolean
  hasNext: boolean
  onPrevious: () => void
  onNext: () => void
  label?: string
  loading?: boolean
  children?: ReactNode
}
export function Pagination({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  label = 'Paginação',
  loading,
  children,
}: PaginationProps) {
  return (
    <nav className="nx-pagination" aria-label={label}>
      {children}
      <Button variant="secondary" disabled={!hasPrevious || loading} onClick={onPrevious}>
        Anterior
      </Button>
      <Button variant="secondary" disabled={!hasNext || loading} onClick={onNext}>
        Próxima
      </Button>
    </nav>
  )
}
export interface SelectionListProps {
  label: string
  items: { id: string; label: string; description?: string; disabled?: boolean }[]
  selected: string[]
  onSelectionChange: (ids: string[]) => void
}
export function SelectionList({ label, items, selected, onSelectionChange }: SelectionListProps) {
  return (
    <fieldset className="nx-selection-list">
      <legend>{label}</legend>
      {items.map((item) => (
        <div key={item.id}>
          <Checkbox
            label={item.label}
            checked={selected.includes(item.id)}
            disabled={item.disabled}
            onChange={(event) =>
              onSelectionChange(
                event.currentTarget.checked
                  ? [...selected, item.id]
                  : selected.filter((id) => id !== item.id),
              )
            }
          />
          {item.description && <p>{item.description}</p>}
        </div>
      ))}
    </fieldset>
  )
}
export interface ProgressProps {
  label: string
  value?: number
  max?: number
}
export function Progress({ label, value, max = 100 }: ProgressProps) {
  return (
    <label className="nx-progress">
      {label}
      <progress max={max} value={value === undefined ? undefined : Math.min(Math.max(0, value), max)} />
      {value === undefined && <span>Em andamento</span>}
    </label>
  )
}
export interface MetricCardProps extends Omit<CardProps, 'children'> {
  value: ReactNode
  trend?: { label: string; direction: 'up' | 'down' | 'neutral' }
}
export function MetricCard({ value, trend, ...props }: MetricCardProps) {
  return (
    <Card {...props}>
      <strong className="nx-metric-value">{value}</strong>
      {trend && (
        <p className={'nx-trend nx-trend--' + trend.direction}>
          {trend.direction === 'up' ? '↑ ' : trend.direction === 'down' ? '↓ ' : '— '}
          {trend.label}
        </p>
      )}
    </Card>
  )
}
export interface DetailListProps {
  items: { label: string; value: ReactNode }[]
}
export function DetailList({ items }: DetailListProps) {
  return (
    <dl className="nx-detail-list">
      {items.map((item, index) => (
        <div key={index}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
export interface EmptyStateProps {
  heading: string
  description?: string
  action?: ReactNode
}
export function EmptyState({ heading, description, action }: EmptyStateProps) {
  return (
    <div className="nx-empty-state">
      <h3>{heading}</h3>
      {description && <p>{description}</p>}
      {action}
    </div>
  )
}
export interface SkeletonProps {
  label?: string
}
export function Skeleton({ label = 'Carregando conteúdo' }: SkeletonProps) {
  return (
    <div className="nx-skeleton" role="status" aria-label={label}>
      <span aria-hidden="true"> </span>
    </div>
  )
}
export function Divider() {
  return <hr className="nx-divider" />
}
export interface MediaItem {
  id: string
  label: string
  src?: string
  kind: 'image' | 'video'
  group?: string
}
export interface MediaGalleryProps {
  label: string
  items: MediaItem[]
  selected: string[]
  onSelectionChange: (ids: string[]) => void
  onPreview: (item: MediaItem) => void
}
export function MediaGallery({ label, items, selected, onSelectionChange, onPreview }: MediaGalleryProps) {
  const groups = [...new Set(items.map((item) => item.group ?? 'Mídias'))]
  return (
    <section aria-label={label} className="nx-gallery">
      {groups.map((group) => (
        <fieldset key={group}>
          <legend>{group}</legend>
          <ul>
            {items
              .filter((item) => (item.group ?? 'Mídias') === group)
              .map((item) => (
                <li key={item.id}>
                  <Checkbox
                    label={item.label}
                    checked={selected.includes(item.id)}
                    onChange={(event) =>
                      onSelectionChange(
                        event.currentTarget.checked
                          ? [...selected, item.id]
                          : selected.filter((id) => id !== item.id),
                      )
                    }
                  />
                  <Button
                    variant="ghost"
                    onClick={() => onPreview(item)}
                    aria-label={'Ampliar ' + item.label}
                  >
                    {item.kind === 'image' && item.src ? (
                      <img src={item.src} alt="" loading="lazy" />
                    ) : (
                      <span>{item.kind === 'video' ? 'Vídeo' : 'Imagem indisponível'}</span>
                    )}
                  </Button>
                </li>
              ))}
          </ul>
        </fieldset>
      ))}
    </section>
  )
}
export interface MediaViewerProps extends Omit<DialogProps, 'title' | 'children'> {
  item: MediaItem | null
  captions?: { src: string; language: string; label: string }
}
export function MediaViewer({ item, captions, ...props }: MediaViewerProps) {
  return (
    <Dialog {...props} title={item?.label ?? 'Prévia de mídia'}>
      {item?.src ? (
        item.kind === 'image' ? (
          <img className="nx-media-preview" src={item.src} alt={item.label} />
        ) : (
          <video
            className="nx-media-preview"
            controls
            preload="metadata"
            aria-label={item.label}
            src={item.src}
          >
            {captions && (
              <track
                kind="captions"
                src={captions.src}
                srcLang={captions.language}
                label={captions.label}
                default
              />
            )}
          </video>
        )
      ) : (
        <EmptyState heading="Mídia indisponível" />
      )}
    </Dialog>
  )
}
