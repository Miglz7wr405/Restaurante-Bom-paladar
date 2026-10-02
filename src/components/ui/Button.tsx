import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'

type Variant = 'primary' | 'gold' | 'outline' | 'dark'

const VARIANTS: Record<Variant, string> = {
  primary: 'btn-slide bg-ember-500 text-white before:bg-ember-700',
  gold: 'btn-slide bg-gold-400 text-ink-950 before:bg-cream-50',
  outline: 'btn-slide border-2 border-cream-50/70 text-cream-50 before:bg-cream-50 hover:text-ink-950',
  dark: 'btn-slide bg-ink-950 text-cream-50 before:bg-ember-500',
}

const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider'

interface Common {
  variant?: Variant
  arrow?: boolean
  children: ReactNode
  className?: string
}

export function ButtonLink({ variant = 'primary', arrow, children, className = '', ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {arrow && <Icon name="arrow" className="h-4 w-4" />}
    </a>
  )
}

export function Button({ variant = 'primary', arrow, children, className = '', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${className}`} {...rest}>
      <span>{children}</span>
      {arrow && <Icon name="arrow" className="h-4 w-4" />}
    </button>
  )
}
