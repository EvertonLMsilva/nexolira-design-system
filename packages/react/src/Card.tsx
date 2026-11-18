import { createElement, useId, type HTMLAttributes, type ReactNode } from 'react'
import { classes } from './types.js'
export interface CardProps extends HTMLAttributes<HTMLElement> {
  heading?: ReactNode
  headingLevel?: 2 | 3 | 4 | 5 | 6
  description?: ReactNode
  action?: ReactNode
}
export function Card({ heading, headingLevel = 2, description, action, children, className, ...props }: CardProps) {
  const headingId = useId()
  const hasHeading = heading !== undefined && heading !== null && heading !== '' && typeof heading !== 'boolean'
  const title = hasHeading ? createElement('h' + headingLevel, { id: headingId, className: 'nx-card__heading' }, heading) : null
  return createElement(hasHeading ? 'section' : 'div', {
    ...props, className: classes('nx-card', className),
    'aria-labelledby': props['aria-labelledby'] ?? (hasHeading ? headingId : undefined),
  }, (hasHeading || description || action) && <div className="nx-card__header"><div>{title}{description && <p className="nx-card__description">{description}</p>}</div>{action && <div className="nx-card__action">{action}</div>}</div>, children)
}
export const Panel = Card
export type PanelProps = CardProps
