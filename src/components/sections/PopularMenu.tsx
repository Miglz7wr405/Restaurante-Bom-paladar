import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'
import { popularTabs } from '@/content/home'
import { menuItemCount, menuSections } from '@/content/menu'
import { formatItemPrice, MENU_URL } from '@/content/restaurant'
import { EASE_SMOOTH } from '@/lib/motion'
import { ButtonLink } from '../ui/Button'
import { DishThumb } from '../ui/DishThumb'
import { SectionHeading } from '../ui/SectionHeading'
import { Tabs } from '../ui/Tabs'

export function PopularMenu() {
  const [active, setActive] = useState(popularTabs[0]?.id ?? '')
  const tab = popularTabs.find((t) => t.id === active) ?? popularTabs[0]
  if (!tab) return null

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
            tabs={popularTabs.map(({ id, label }) => ({ id, label }))}
            active={tab.id}
            onChange={setActive}
          />
        </div>

        <div className="mt-12 min-h-[24rem]">
          <AnimatePresence mode="wait" initial={false}>
            <m.ul
              key={tab.id}
              id={`menu-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`menu-tab-${tab.id}`}
              className="grid gap-x-12 gap-y-4 md:grid-cols-2"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_SMOOTH } }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
            >
              {tab.items.map((item) => (
                <li
                  key={item.id}
                  className="group flex items-center gap-4 rounded-card border border-cream-50/5 bg-ink-900 p-3 transition-colors duration-200 hover:border-gold-400/40 hover:bg-ink-800"
                >
                  <DishThumb item={item} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-display text-lg font-semibold uppercase leading-tight text-cream-50">{item.name}</h3>
                      <span className="hidden flex-1 border-b border-dotted border-gold-400/40 sm:block" aria-hidden="true" />
                      <p className="ml-auto shrink-0 font-display text-lg font-bold text-gold-400">
                        <span className="sr-only">Preço: </span>
                        {formatItemPrice(item.price)}
                      </p>
                    </div>
                    {item.description && <p className="mt-1 text-sm text-cream-100/70">{item.description}</p>}
                  </div>
                </li>
              ))}
            </m.ul>
          </AnimatePresence>
        </div>

        <div className="mt-14 rounded-card border border-gold-400/20 p-6 text-center md:p-10">
          <p className="font-script text-3xl text-gold-400">Há muito mais</p>
          <p className="mt-1 font-display text-2xl uppercase tracking-wider text-cream-50 md:text-3xl">
            {menuItemCount} pratos e bebidas no menu completo
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {menuSections.map((s) => (
              <li key={s.id}>
                <a
                  href={`${MENU_URL}#${s.id}`}
                  className="inline-block rounded-full bg-ink-800 px-4 py-1.5 text-sm text-cream-100/85 transition-colors hover:bg-gold-400 hover:text-ink-950"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink href={MENU_URL} variant="gold" arrow className="mt-8">
            Ver menu completo
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
