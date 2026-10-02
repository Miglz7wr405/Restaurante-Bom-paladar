import type { MenuItem } from '@/content/types'
import { LogoMark } from './Logo'
import { Visual } from './Visual'

/** Round dish thumbnail; items without a photo or illustration get the brand mark. */
export function DishThumb({ item, className = 'h-20 w-20' }: { item: MenuItem; className?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-ink-800 p-1 ring-2 ring-gold-400/40 transition-transform duration-300 ease-smooth group-hover:rotate-6 group-hover:scale-105 ${className}`}
    >
      {item.visual ? (
        <Visual visual={item.visual} className="h-full w-full rounded-full object-cover" sizes="96px" />
      ) : (
        <LogoMark className="h-1/2 w-auto text-gold-400/80" />
      )}
    </span>
  )
}
