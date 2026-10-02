import { m } from 'framer-motion'
import { dishOfMonth } from '@/content/home'
import { formatPrice } from '@/content/restaurant'
import { fadeLeft, fadeRight, viewportOnce } from '@/lib/motion'
import { ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Visual } from '../ui/Visual'

export function DishOfMonth() {
  const { item, kicker, text, points } = dishOfMonth
  return (
    <section id="destaques" aria-labelledby="prato-mes-title" className="section-pad overflow-hidden bg-cream-100">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <m.div className="relative mx-auto w-full max-w-lg" variants={fadeLeft} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <div className="absolute inset-[4%] animate-float-slow rounded-blob bg-gold-400" aria-hidden="true" />
          <div className="absolute inset-[12%] rounded-blob bg-ember-500/90 [transform:rotate(35deg)]" aria-hidden="true" />
          <Visual visual={item.visual} className="relative aspect-square w-full rounded-full object-cover p-[8%] drop-shadow-[0_30px_30px_rgb(0_0_0_/_0.35)]" />
        </m.div>

        <m.div variants={fadeRight} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <p className="font-script text-3xl text-ember-600 md:text-4xl">{kicker}</p>
          <h2 id="prato-mes-title" className="mt-1 font-display text-section font-bold uppercase text-ink-950">
            {item.name}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">{text}</p>
          <ul className="mt-6 space-y-2">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-ink-900">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-basil-500 text-white">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <p className="font-display text-5xl font-bold text-ember-600">{formatPrice(item.price)}</p>
            <ButtonLink href="#reservas" variant="dark" arrow>
              Pedir agora
            </ButtonLink>
          </div>
        </m.div>
      </div>
    </section>
  )
}
