import { categoryLinks } from '@/content/home'
import { MENU_URL } from '@/content/restaurant'
import { Visual } from '../ui/Visual'
import { Reveal, RevealGroup } from '../ui/Reveal'

export function Categories() {
  return (
    <section aria-labelledby="categorias-title" className="relative bg-cream-50 py-14 md:py-20">
      <h2 id="categorias-title" className="sr-only">
        Categorias do menu
      </h2>
      <RevealGroup as="ul" className="container-site grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-6">
        {categoryLinks.map((cat) => (
          <Reveal as="li" key={cat.id}>
            <a
              href={`${MENU_URL}#${cat.section}`}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <span className={`relative grid aspect-square w-full max-w-[8.5rem] place-items-center overflow-hidden rounded-full bg-ink-950 ${cat.photo ? 'p-1.5' : 'p-4'} shadow-card ring-2 ring-gold-400/0 transition-[transform,box-shadow] duration-200 ease-out group-hover:scale-[1.03] group-hover:shadow-card-hover group-hover:ring-gold-400 group-focus-visible:ring-gold-400`}>
                {!cat.photo && <span className="absolute inset-1.5 rounded-full border border-dashed border-gold-400/40" aria-hidden="true" />}
                <Visual
                  visual={{ art: cat.art, tint: cat.tint, photo: cat.photo, alt: '' }}
                  sizes="136px"
                  className={`h-full w-full transition-transform duration-500 ease-smooth ${cat.photo ? 'rounded-full object-cover group-hover:scale-110' : 'group-hover:rotate-12'}`}
                />
              </span>
              <span className="font-display text-base font-semibold uppercase tracking-wider text-ink-950 group-hover:text-ember-600 md:text-lg">
                {cat.label}
              </span>
            </a>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  )
}
