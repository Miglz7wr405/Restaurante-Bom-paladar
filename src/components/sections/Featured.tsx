import { featured } from '@/content/home'
import { formatPrice } from '@/content/restaurant'
import { ButtonLink } from '../ui/Button'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Visual } from '../ui/Visual'

export function Featured() {
  return (
    <section aria-labelledby="hoje-title" className="section-pad bg-cream-50">
      <div className="container-site">
        <SectionHeading id="hoje-title" script="Hoje em destaque" title="Os favoritos da casa" />

        <RevealGroup
          as="ul"
          className="-mx-gutter mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-gutter pb-6 pt-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:grid-cols-5"
        >
          {featured.map((item) => (
            <Reveal as="li" key={item.id} className="w-[70%] shrink-0 snap-center sm:w-[42%] md:w-auto">
              <article className="card-lift group relative flex h-full flex-col items-center overflow-hidden rounded-card bg-white p-3 pb-5 text-center">
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-ink-950">
                  <Visual
                    visual={item.visual}
                    sizes="(min-width: 1024px) 15rem, (min-width: 768px) 30vw, 70vw"
                    className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 px-2 font-display text-lg font-semibold uppercase leading-tight text-ink-950">{item.name}</h3>
                {item.description && <p className="mt-2 line-clamp-2 text-sm text-muted">{item.description}</p>}
                <p className="mt-auto pt-4">
                  <span className="sr-only">Preço: </span>
                  <span className="inline-block rounded-full bg-ink-950 px-4 py-1.5 font-display text-lg font-bold text-gold-300 transition-[opacity,transform] duration-200 ease-out hover-hover:translate-y-2 hover-hover:opacity-0 hover-hover:group-hover:translate-y-0 hover-hover:group-hover:opacity-100 hover-hover:group-focus-within:translate-y-0 hover-hover:group-focus-within:opacity-100">
                    {formatPrice(item.price)}
                  </span>
                </p>
              </article>
            </Reveal>
          ))}
        </RevealGroup>

        <div className="mt-8 flex justify-center">
          <ButtonLink href="#menu" variant="primary" arrow>
            Ver menu completo
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
