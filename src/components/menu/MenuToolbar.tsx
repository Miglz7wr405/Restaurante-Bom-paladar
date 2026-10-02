import { useEffect, useRef, useState } from 'react'
import type { MenuSection } from '@/content/types'
import { Icon } from '../ui/Icon'

export type MenuView = 'cartoes' | 'cardapio'

const VIEWS: { id: MenuView; label: string; icon: 'grid' | 'list' }[] = [
  { id: 'cartoes', label: 'Cartões', icon: 'grid' },
  { id: 'cardapio', label: 'Cardápio', icon: 'list' },
]

interface MenuToolbarProps {
  view: MenuView
  onViewChange: (view: MenuView) => void
  query: string
  onQueryChange: (query: string) => void
  onPrint: () => void
  sections: MenuSection[]
}

/** View switch, search and print, followed by the category chips that stay pinned under the navbar (with scroll-spy). */
export function MenuToolbar({ view, onViewChange, query, onQueryChange, onPrint, sections }: MenuToolbarProps) {
  const [active, setActive] = useState(sections[0]?.id ?? '')
  const chipsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const visible = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top)
          else visible.delete(entry.target.id)
        }
        const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0]
        if (top) {
          setActive(top[0])
          return
        }
        // Above the first section (back at the page header): highlight the first category.
        const first = sections[0] && document.getElementById(sections[0].id)
        if (first && sections[0] && first.getBoundingClientRect().top > window.innerHeight * 0.35) setActive(sections[0].id)
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [sections, view])

  // Keep the active chip visible in the horizontally scrolling bar without moving the page.
  useEffect(() => {
    const list = chipsRef.current
    const chip = list?.querySelector<HTMLElement>(`[data-section="${active}"]`)
    if (!list || !chip) return
    list.scrollTo({ left: chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  return (
    <>
      <div className="bg-ink-950 print:hidden">
        <div className="container-site flex flex-wrap items-center gap-3 py-3">
          <div role="group" aria-label="Forma de ver o menu" className="inline-flex rounded-full bg-ink-800 p-1">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={view === v.id}
                onClick={() => onViewChange(v.id)}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 font-display sm:px-4 text-sm font-semibold uppercase tracking-wider transition-colors ${
                  view === v.id ? 'bg-gold-400 text-ink-950' : 'text-cream-50/80 hover:text-gold-300'
                }`}
              >
                <Icon name={v.icon} className="h-4 w-4" />
                {v.label}
              </button>
            ))}
          </div>

          <label className="relative order-last w-full sm:order-none sm:w-auto sm:flex-1">
            <span className="sr-only">Pesquisar no menu</span>
            <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-50/60" />
            <input
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Pesquisar: camarão, pizza, mousse…"
              className="w-full rounded-full border border-cream-50/15 bg-ink-800 py-2.5 pl-11 pr-4 text-sm text-cream-50 placeholder:text-cream-50/50 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
            />
          </label>

          <button
            type="button"
            onClick={onPrint}
            aria-label="Imprimir ou guardar o menu em PDF"
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-gold-400/60 p-2.5 font-display text-sm uppercase tracking-wider text-gold-300 transition-colors hover:bg-gold-400 hover:text-ink-950 sm:ml-0 sm:px-4 sm:py-2"
          >
            <Icon name="print" className="h-4 w-4" />
            <span className="hidden sm:inline" aria-hidden="true">
              Imprimir<span className="hidden md:inline"> / PDF</span>
            </span>
          </button>
        </div>
      </div>

      <nav
        aria-label="Secções do menu"
        className="sticky top-nav z-40 border-y border-gold-400/20 bg-ink-950/95 backdrop-blur-md print:hidden"
      >
        <ul
          ref={chipsRef}
          className="container-site flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((s) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                data-section={s.id}
                aria-current={active === s.id ? 'true' : undefined}
                className={`inline-block whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active === s.id ? 'bg-gold-400 font-semibold text-ink-950' : 'bg-ink-800 text-cream-100/85 hover:text-gold-300'
                }`}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
