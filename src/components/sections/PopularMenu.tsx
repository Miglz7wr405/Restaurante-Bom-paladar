import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { menuCategories, otherMenuSections } from '@/content/menu'
import { formatPrice, restaurant } from '@/content/restaurant'
import { EASE_SMOOTH } from '@/lib/motion'
import { MENU_TAB_EVENT } from '@/lib/menuTabs'
import { SectionHeading } from '../ui/SectionHeading'
import { Tabs } from '../ui/Tabs'
import { Visual } from '../ui/Visual'

export function PopularMenu() {
  const [active, setActive] = useState(menuCategories[0]?.id ?? '')
  const category = menuCategories.find((c) => c.id === active) ?? menuCategories[0]

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (menuCategories.some((c) => c.id === id)) setActive(id)
    }
    window.addEventListener(MENU_TAB_EVENT, onSelect)
    return () => window.removeEventListener(MENU_TAB_EVENT, onSelect)
  }, [])

  if (!category) return null

  return (
    <section id="menu" aria-labelledby="menu-title" className="section-pad relative bg-ink-950 text-cream-50">
      <div className="container-site">
        <SectionHeading
          id="menu-title"
          tone="dark"
          script="O nosso menu"
          title="Os mais pedidos"
          text="Preços em meticais (MT). Pergunte ao empregado pelas sugestões do dia."
        />

        <div className="mt-10 flex justify-center">
          <Tabs
            idPrefix="menu"
            label="Categorias do menu"
            tabs={menuCategories.map(({ id, label }) => ({ id, label }))}
            active={category.id}
            onChange={setActive}
          />
        </div>

        <div className="mt-12 min-h-[24rem]">
          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={category.id}
              id={`menu-panel-${category.id}`}
              role="tabpanel"
              aria-labelledby={`menu-tab-${category.id}`}
              className="grid gap-x-12 gap-y-4 md:grid-cols-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_SMOOTH} }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            >
              {category.items.map((item) => (
                <li
                  key={item.id}
                  className="group flex items-center gap-4 rounded-card border border-cream-50/5 bg-ink-900 p-3 transition-colors duration-200 hover:border-gold-400/40 hover:bg-ink-800"
                >
                  <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-ink-800 p-1 ring-2 ring-gold-400/40 transition-transform duration-300 ease-smooth group-hover:rotate-6 group-hover:scale-105">
                    <Visual visual={item.visual} size="thumb" className="h-full w-full rounded-full object-cover" sizes="80px" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-lg font-semibold uppercase leading-tight text-cream-50">{item.name}</h3>
                      <span className="hidden flex-1 border-b border-dotted border-gold-400/40 sm:block" aria-hidden="true" />
                      <p className="ml-auto shrink-0 font-display text-lg font-bold text-gold-400">
                        <span className="sr-only">Preço: </span>
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    {item.description && <p className="mt-1 text-sm text-cream-100/70">{item.description}</p>}
                  </div>
                </li>
              ))}
            </m.ul>
          </AnimatePresence>
        </div>

        <div className="mt-14 rounded-card border border-gold-400/20 p-6 text-center md:p-8">
          <p className="font-display text-lg uppercase tracking-wider text-gold-300">Também no menu completo</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {otherMenuSections.map((s) => (
              <li key={s} className="rounded-full bg-ink-800 px-4 py-1.5 text-sm text-cream-100/85">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-cream-100/70">
            Peça a carta completa no restaurante ou ligue para{' '}
            <a href={restaurant.phone.href} className="font-semibold text-gold-300 underline-offset-4 hover:underline">
              {restaurant.phone.display}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
