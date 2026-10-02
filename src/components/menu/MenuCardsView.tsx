import type { MenuItem, MenuSection, Visual as VisualData } from '@/content/types'
import { formatItemPrice, formatPrice } from '@/content/restaurant'
import { LogoMark } from '../ui/Logo'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { Visual } from '../ui/Visual'

function PhotoCard({ item, visual }: { item: MenuItem; visual: VisualData }) {
  const credit = visual.photo?.credit
  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-card bg-white">
      <div className={`relative aspect-[4/3] overflow-hidden ${visual.photo ? 'bg-ink-950' : 'brick-wall grid place-items-center'}`}>
        <Visual
          visual={visual}
          sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className={
            visual.photo
              ? 'h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-110'
              : 'h-[78%] w-auto transition-transform duration-500 ease-smooth group-hover:-rotate-6 group-hover:scale-110'
          }
        />
        {credit && (
          <span className="absolute bottom-2 right-2 rounded-full bg-ink-950/70 px-2 py-0.5 text-[0.65rem] text-cream-100/90">{credit}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold uppercase leading-tight text-ink-950">{item.name}</h3>
        {item.description && <p className="mt-2 text-sm text-muted">{item.description}</p>}
        <p className="mt-auto pt-4">
          <span className="sr-only">Preço: </span>
          <span className="inline-block rounded-full bg-ink-950 px-4 py-1.5 font-display text-lg font-bold text-gold-300">
            {formatItemPrice(item.price)}
          </span>
        </p>
      </div>
    </article>
  )
}

function TextCard({ item }: { item: MenuItem }) {
  return (
    <article className="card-lift relative flex h-full flex-col overflow-hidden rounded-card border-t-4 border-gold-400 bg-white p-5">
      <LogoMark className="absolute -right-2 -top-2 h-16 w-auto text-gold-400/15" />
      <h3 className="relative pr-8 font-display text-lg font-semibold uppercase leading-tight text-ink-950">{item.name}</h3>
      {item.description && <p className="relative mt-2 text-sm text-muted">{item.description}</p>}
      <p className="relative mt-auto flex items-center gap-3 pt-4">
        <span className="h-px flex-1 border-b border-dotted border-gold-500/60" aria-hidden="true" />
        <span className="sr-only">Preço: </span>
        <span className="font-display text-xl font-bold text-ember-600">{formatItemPrice(item.price)}</span>
      </p>
    </article>
  )
}

const GRID = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

export function MenuCardsView({ sections }: { sections: MenuSection[] }) {
  return (
    <div className="bg-cream-100 py-10 md:py-14">
      <div className="container-site space-y-14 md:space-y-20">
        {sections.map((section) => {
          // Cards with a picture first so each grid row has cards of the same height.
          const withVisual = section.items.flatMap((item) => (item.visual ? [{ item, visual: item.visual }] : []))
          const textOnly = section.items.filter((i) => !i.visual)
          return (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-cards-title`} className="!scroll-mt-36">
              <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b-2 border-gold-400/60 pb-3">
                <h2 id={`${section.id}-cards-title`} className="font-display text-3xl font-bold uppercase text-ink-950 md:text-4xl">
                  {section.label}
                </h2>
                {section.note && (
                  <p className="rounded-full bg-ink-950 px-4 py-1 font-display text-sm uppercase tracking-wider text-gold-300">
                    {section.note}
                    {section.flatPrice !== undefined && ` · ${formatPrice(section.flatPrice)}`}
                  </p>
                )}
              </header>
              {withVisual.length > 0 && (
                <RevealGroup as="ul" className={GRID}>
                  {withVisual.map(({ item, visual }) => (
                    <Reveal as="li" key={item.id}>
                      <PhotoCard item={item} visual={visual} />
                    </Reveal>
                  ))}
                </RevealGroup>
              )}
              {textOnly.length > 0 && (
                <RevealGroup as="ul" className={`${GRID} ${withVisual.length ? 'mt-5' : ''}`}>
                  {textOnly.map((item) => (
                    <Reveal as="li" key={item.id}>
                      <TextCard item={item} />
                    </Reveal>
                  ))}
                </RevealGroup>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
