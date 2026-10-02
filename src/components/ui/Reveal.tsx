import { m, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger, viewportOnce } from '@/lib/motion'

type Tag = 'div' | 'ul' | 'ol' | 'li' | 'section' | 'article' | 'header'

interface RevealProps {
  children: ReactNode
  className?: string
  as?: Tag
  variants?: Variants
}

/** Reveals itself once when scrolled into view. Use inside a <RevealGroup> to inherit the stagger. */
export function Reveal({ children, className, as = 'div', variants = fadeUp }: RevealProps) {
  const Component = m[as]
  return (
    <Component className={className} variants={variants}>
      {children}
    </Component>
  )
}

/** Triggers its children's reveal once in view, staggered by 80 ms. */
export function RevealGroup({ children, className, as = 'div', delay = 0 }: Omit<RevealProps, 'variants'> & { delay?: number }) {
  const Component = m[as]
  return (
    <Component className={className} variants={stagger(delay)} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </Component>
  )
}
