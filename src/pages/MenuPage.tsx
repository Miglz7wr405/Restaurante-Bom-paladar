import { useEffect, useMemo, useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { MenuCardsView } from '@/components/menu/MenuCardsView'
import { MenuHero } from '@/components/menu/MenuHero'
import { MenuListView } from '@/components/menu/MenuListView'
import { MenuToolbar, type MenuView } from '@/components/menu/MenuToolbar'
import { ButtonLink } from '@/components/ui/Button'
import { barNote, menuSections } from '@/content/menu'
import { MENU_URL, RESERVE_URL, restaurant } from '@/content/restaurant'
import { filterSections } from '@/lib/menuSearch'

const VIEW_PARAM = 'vista'

function initialView(): MenuView {
  return new URLSearchParams(window.location.search).get(VIEW_PARAM) === 'cardapio' ? 'cardapio' : 'cartoes'
}

export default function MenuPage() {
  const [view, setView] = useState<MenuView>(initialView)
  const [query, setQuery] = useState('')
  const [printRequested, setPrintRequested] = useState(false)
  const sections = useMemo(() => filterSections(menuSections, query), [query])

  const changeView = (next: MenuView) => {
    setView(next)
    const url = new URL(window.location.href)
    if (next === 'cardapio') url.searchParams.set(VIEW_PARAM, 'cardapio')
    else url.searchParams.delete(VIEW_PARAM)
    window.history.replaceState(null, '', url)
  }

  // Sections are rendered client-side, so jump to /menu/#section once they exist.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  useEffect(() => {
    if (!printRequested) return
    setPrintRequested(false)
    window.print()
  }, [printRequested])

  const print = () => {
    setQuery('')
    changeView('cardapio')
    setPrintRequested(true)
  }

  return (
    <AppShell current={MENU_URL}>
      <MenuHero />
      <MenuToolbar
        view={view}
        onViewChange={changeView}
        query={query}
        onQueryChange={setQuery}
        onPrint={print}
        sections={sections}
      />

      {sections.length === 0 ? (
        <div className="bg-cream-100 py-24 text-center">
          <p className="font-display text-2xl uppercase text-ink-950">Nada encontrado para “{query}”</p>
          <button type="button" onClick={() => setQuery('')} className="mt-4 text-ember-600 underline underline-offset-4">
            Limpar pesquisa
          </button>
        </div>
      ) : view === 'cartoes' ? (
        <MenuCardsView sections={sections} />
      ) : (
        <MenuListView sections={sections} />
      )}

      <section aria-label="Bebidas e reservas" className="bg-ink-900 py-14 text-center text-cream-50 print:hidden">
        <div className="container-site mx-auto max-w-2xl">
          <p className="font-script text-3xl text-gold-400">Bar</p>
          <p className="mt-2 text-cream-100/85">{barNote}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={RESERVE_URL} arrow>
              Reservar mesa
            </ButtonLink>
            <ButtonLink href={restaurant.phone.href} variant="outline">
              Encomendar: {restaurant.phone.display}
            </ButtonLink>
          </div>
        </div>
      </section>
    </AppShell>
  )
}
