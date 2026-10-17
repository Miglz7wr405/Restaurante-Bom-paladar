import type { GalleryEntry, MenuItem, MenuSection, Visual as VisualData } from '@/content/types'
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

/** Buffet option: photo, price per person and every course that is served. */
function BuffetCard({ item }: { item: MenuItem }) {
  return (
    <article className="card-lift flex h-full flex-col overflow-hidden rounded-card bg-ink-950 text-cream-50">
      {item.visual && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Visual visual={item.visual} sizes="(min-width: 1024px) 30vw, 92vw" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-5 bottom-4 flex flex-wrap items-end justify-between gap-2">
            <h3 className="font-display text-3xl font-bold uppercase leading-none">{item.name}</h3>
            <p className="rounded-full bg-gold-400 px-4 py-1.5 font-display text-lg font-bold text-ink-950">
              <span className="sr-only">Preço: </span>
              {formatItemPrice(item.price)}
              {item.priceUnit && <span className="ml-1 text-sm font-semibold">{item.priceUnit}</span>}
            </p>
          </div>
        </div>
      )}
      <div className="flex-1 p-5">
        {item.description && <p className="text-sm text-gold-200/85">{item.description}</p>}
        <dl className="mt-4 space-y-3">
          {item.groups?.map((group) => (
            <div key={group.label} className="border-t border-cream-50/10 pt-3">
              <dt className="font-display text-sm font-semibold uppercase tracking-wider text-gold-400">{group.label}</dt>
              <dd className="mt-1 text-sm text-cream-100/85">{group.items.join(' · ')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}

function Gallery({ entries }: { entries: GalleryEntry[] }) {
  return (
    <RevealGroup as="ul" className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
      {entries.map((entry) => (
        <Reveal as="li" key={entry.label}>
          <figure className="group relative aspect-square overflow-hidden rounded-xl bg-ink-950">
            <Visual
              visual={entry.visual}
              sizes="(min-width: 1280px) 11rem, (min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
              className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-110"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/95 to-transparent px-3 pb-2.5 pt-8 text-sm font-semibold leading-tight text-cream-50">
              {entry.label}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </RevealGroup>
  )
}

const GRID = 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'

export function MenuCardsView({ sections }: { sections: MenuSection[] }) {
  return (
    <div className="bg-cream-100 py-10 md:py-14">
      <div className="container-site space-y-14 md:space-y-20">
        {sections.map((section) => {
          // Cards with a picture first so each grid row has cards of the same height.
          const buffets = section.items.filter((i) => i.groups)
          const dishes = section.items.filter((i) => !i.groups)
          const withVisual = dishes.flatMap((item) => (item.visual ? [{ item, visual: item.visual }] : []))
          const textOnly = dishes.filter((i) => !i.visual)
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
              {section.intro && <p className="-mt-2 mb-6 max-w-3xl text-lg text-muted">{section.intro}</p>}
              {section.cover?.photo && (
                <div className="mb-6 aspect-[16/9] overflow-hidden rounded-card bg-ink-950 sm:aspect-[3/1]">
                  <Visual visual={section.cover} sizes="(min-width: 1280px) 76rem, 100vw" className="h-full w-full object-cover" />
                </div>
              )}
              {section.gallery && <Gallery entries={section.gallery} />}
              {buffets.length > 0 && (
                <RevealGroup as="ul" className="grid gap-5 lg:grid-cols-3">
                  {buffets.map((item) => (
                    <Reveal as="li" key={item.id}>
                      <BuffetCard item={item} />
                    </Reveal>
                  ))}
                </RevealGroup>
              )}
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
