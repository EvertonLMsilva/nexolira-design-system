import { useId, type HTMLAttributes, type ReactNode, type KeyboardEvent } from 'react'
import { Button } from './Button.js'
import { classes } from './types.js'

export interface PageHeaderProps {
  heading: string
  description?: string
  action?: ReactNode
}
export function PageHeader({ heading, description, action }: PageHeaderProps) {
  return (
    <div className="nx-page-header">
      <div>
        <h1>{heading}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  )
}
export interface BreadcrumbProps {
  items: { label: string; href?: string }[]
  label?: string
}
export function Breadcrumb({ items, label = 'Caminho de navegação' }: BreadcrumbProps) {
  return (
    <nav aria-label={label} className="nx-breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {item.href && index < items.length - 1 ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current={index === items.length - 1 ? 'page' : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  label?: string
}
export function Sidebar({ children, label = 'Navegação principal', className, ...props }: SidebarProps) {
  return (
    <nav {...props} aria-label={label} className={classes('nx-sidebar', className)}>
      {children}
    </nav>
  )
}
export interface NavigationItemProps {
  href: string
  children: ReactNode
  current?: boolean
  onClick?: () => void
}
export function NavigationItem({ href, children, current, onClick }: NavigationItemProps) {
  return (
    <a
      className="nx-navigation-item"
      href={href}
      aria-current={current ? 'page' : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  )
}
export interface AccordionProps {
  heading: ReactNode
  children: ReactNode
  open?: boolean
  onToggle?: (open: boolean) => void
}
export function Accordion({ heading, children, open, onToggle }: AccordionProps) {
  return (
    <details className="nx-accordion" open={open} onToggle={(event) => onToggle?.(event.currentTarget.open)}>
      <summary>{heading}</summary>
      <div>{children}</div>
    </details>
  )
}
export interface TabItem {
  id: string
  label: string
  content: ReactNode
  disabled?: boolean
}
export interface TabsProps {
  items: TabItem[]
  value: string
  onValueChange: (id: string) => void
  label: string
}
export function Tabs({ items, value, onValueChange, label }: TabsProps) {
  const id = useId()
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    const enabled = items.map((item, index) => (item.disabled ? -1 : index)).filter((index) => index >= 0)
    const position = enabled.indexOf(current)
    let next: number | undefined
    if (event.key === 'ArrowRight') next = enabled[(position + 1) % enabled.length]
    if (event.key === 'ArrowLeft') next = enabled[(position - 1 + enabled.length) % enabled.length]
    if (event.key === 'Home') next = enabled[0]
    if (event.key === 'End') next = enabled.at(-1)
    if (next === undefined) return
    event.preventDefault()
    onValueChange(items[next].id)
    event.currentTarget.ownerDocument.getElementById(id + '-tab-' + next)?.focus()
  }
  return (
    <div className="nx-tabs">
      <div role="tablist" aria-label={label}>
        {items.map((item, index) => (
          <button
            type="button"
            role="tab"
            key={item.id}
            id={id + '-tab-' + index}
            aria-controls={id + '-panel-' + index}
            aria-selected={item.id === value}
            tabIndex={item.id === value ? 0 : -1}
            disabled={item.disabled}
            onKeyDown={(event) => keyboard(event, index)}
            onClick={() => onValueChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={id + '-panel-' + index}
          aria-labelledby={id + '-tab-' + index}
          hidden={item.id !== value}
          tabIndex={0}
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
export type StepState = 'completed' | 'current' | 'pending' | 'blocked' | 'review'
export interface StepperProps {
  label: string
  items: { id: string; label: string; state: StepState; description?: string }[]
  onSelect: (id: string) => void
}
const stepLabels: Record<StepState, string> = {
  completed: 'Concluído',
  current: 'Atual',
  pending: 'Pendente',
  blocked: 'Bloqueado',
  review: 'Revisão necessária',
}
export function Stepper({ label, items, onSelect }: StepperProps) {
  return (
    <nav aria-label={label} className="nx-stepper">
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <Button
              variant="ghost"
              aria-current={item.state === 'current' ? 'step' : undefined}
              disabled={item.state === 'blocked'}
              onClick={() => onSelect(item.id)}
            >
              <span aria-hidden="true">{index + 1}.</span> {item.label} — {stepLabels[item.state]}
            </Button>
            {item.description && <p>{item.description}</p>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
export interface ActionFooterProps extends HTMLAttributes<HTMLDivElement> {}
export function ActionFooter({ className, ...props }: ActionFooterProps) {
  return <div {...props} className={classes('nx-action-footer', className)} />
}
export interface AppShellProps {
  navigation: ReactNode
  children: ReactNode
  header?: ReactNode
  mobileNavigation: ReactNode
}
export function AppShell({ navigation, children, header, mobileNavigation }: AppShellProps) {
  return (
    <div className="nx-app-shell">
      <aside className="nx-app-shell__sidebar">{navigation}</aside>
      <div className="nx-app-shell__workspace">
        {header}
        <div className="nx-app-shell__mobile-navigation">{mobileNavigation}</div>
        {children}
      </div>
    </div>
  )
}
