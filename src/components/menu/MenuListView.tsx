import type { MenuSection } from '@/content/types'
import { formatItemPrice, formatPrice, restaurant } from '@/content/restaurant'
import { Logo } from '../ui/Logo'

/** Printed-menu look: black board, gold ribbons, dotted price leaders. Also the layout used for printing. */
export function MenuListView({ sections }: { sections: MenuSection[] }) {
  return (
    <div className="bg-ink-950 py-12 text-cream-50 md:py-16 print:bg-white print:py-0 print:text-ink-950">
      <div className="container-site">
        <div className="mb-10 hidden items-center justify-between border-b-2 border-gold-500 pb-4 print:flex">
          <Logo />
          <p className="font-script text-2xl text-gold-600">{restaurant.slogan}</p>
        </div>

        <div className="gap-12 lg:columns-2 print:columns-2 print:gap-8">
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-list-title`}
              className="mb-12 !scroll-mt-36 break-inside-avoid-column print:mb-6"
            >
              <header className="mb-5 flex items-center gap-3">
                <span className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-gold-400 print:bg-gold-500" aria-hidden="true" />
                <h2
                  id={`${section.id}-list-title`}
                  className="rounded-md border-2 border-gold-400 bg-ink-900 px-5 py-2 text-center font-display text-xl font-bold uppercase tracking-wider text-cream-50 shadow-[0_0_0_4px_theme(colors.ink.950),0_0_0_5px_theme(colors.gold.600)] print:border-gold-600 print:bg-white print:text-base print:text-ink-950 print:shadow-none"
                >
                  {section.label}
                  {section.note && (
                    <span className="ml-2 font-sans text-sm font-semibold normal-case tracking-normal text-gold-300 print:text-gold-600">
                      ({section.note}
                      {section.flatPrice !== undefined && ` ${formatPrice(section.flatPrice)}`})
                    </span>
                  )}
                </h2>
                <span className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-gold-400 print:bg-gold-500" aria-hidden="true" />
              </header>

              <ul className="space-y-3 print:space-y-1.5">
                {section.items.map((item) => (
                  <li key={item.id} className="break-inside-avoid">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-display text-base font-semibold uppercase tracking-wide text-cream-50 md:text-lg print:text-sm print:text-ink-950">
                        {item.name}
                      </h3>
                      {section.flatPrice === undefined && (
                        <>
                          <span className="min-w-6 flex-1 translate-y-[-0.3em] border-b-2 border-dotted border-gold-400/50 print:border-ink-600/50" aria-hidden="true" />
                          <p className="shrink-0 font-display text-base font-bold text-gold-400 md:text-lg print:text-sm print:text-ink-950">
                            <span className="sr-only">Preço: </span>
                            {formatItemPrice(item.price)}
                          </p>
                        </>
                      )}
                    </div>
                    {item.description && (
                      <p className="mt-0.5 text-sm text-gold-200/75 print:text-xs print:text-ink-600">{item.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
