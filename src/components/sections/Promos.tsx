import { promos } from '@/content/home'
import { ButtonLink } from '../ui/Button'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { Visual } from '../ui/Visual'

export function Promos() {
  return (
    <section aria-label="Promoções" className="bg-cream-50 py-16 md:py-24">
      <RevealGroup className="container-site grid gap-6 md:grid-cols-2">
        {promos.map((promo) => (
          <Reveal key={promo.id}>
            <article
              className={`card-lift group relative isolate flex min-h-[19rem] items-center overflow-hidden rounded-card p-8 md:min-h-[22rem] md:p-10 ${
                promo.tone === 'ember' ? 'bg-ember-600' : 'brick-wall'
              }`}
            >
              <div
                className="absolute -right-12 top-1/2 -z-10 aspect-square w-[62%] -translate-y-1/2 transition-transform duration-700 ease-smooth group-hover:rotate-12 group-hover:scale-105 sm:-right-6 sm:w-[52%]"
                aria-hidden="true"
              >
                <Visual visual={promo.visual} className="h-full w-full drop-shadow-[0_20px_30px_rgb(0_0_0_/_0.5)]" />
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/85 via-ink-950/55 to-ink-950/0" aria-hidden="true" />
              <div className="max-w-[60%] text-cream-50">
                <p className="font-script text-3xl text-gold-300">{promo.kicker}</p>
                <h3 className="mt-1 font-display text-4xl font-bold uppercase leading-none md:text-5xl">{promo.title}</h3>
                <p className="mt-3 text-sm text-cream-100/90 md:text-base">{promo.text}</p>
                <ButtonLink href={promo.href} variant="gold" arrow className="mt-6">
                  {promo.cta}
                </ButtonLink>
              </div>
            </article>
          </Reveal>
        ))}
      </RevealGroup>
    </section>
  )
}
