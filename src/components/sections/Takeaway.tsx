import { m } from 'framer-motion'
import { takeaway } from '@/content/home'
import { restaurant } from '@/content/restaurant'
import { fadeRight, viewportOnce } from '@/lib/motion'
import { ButtonLink } from '../ui/Button'
import { DishArt } from '../ui/DishArt'
import { Icon } from '../ui/Icon'
import { Reveal, RevealGroup } from '../ui/Reveal'

function TakeawayBag() {
  return (
    <svg viewBox="0 0 320 300" className="h-full w-full" aria-hidden="true" focusable="false">
      <ellipse cx="160" cy="286" rx="146" ry="10" className="fill-ink-950/20" />
      <g>
        <path d="M168 96h120l12 186H156z" className="fill-ink-950" />
        <path d="M168 96h120l2 22H166z" className="fill-ink-800" />
        <path d="M200 100c0-38 56-38 56 0" className="stroke-ink-950" strokeWidth="9" fill="none" strokeLinecap="round" />
        <circle cx="228" cy="176" r="38" className="fill-gold-400" />
        <circle cx="228" cy="176" r="31" fill="none" className="stroke-ink-950" strokeWidth="2" strokeDasharray="4 4" />
        <text x="228" y="188" textAnchor="middle" className="fill-ink-950 font-script" fontSize="34">
          BP
        </text>
        <text x="228" y="248" textAnchor="middle" className="fill-gold-300 font-display" fontSize="13" letterSpacing="3">
          BOM PALADAR
        </text>
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${24 + i * 4} ${226 - i * 30})`}>
          <path d="M0 8h124v40H0z" className="fill-cream-100" />
          <path d="M0 8h124v40H0z" fill="none" className="stroke-ink-950" strokeWidth="2.5" />
          <path d="M-4 0h132l-4 10H0z" className="fill-cream-50 stroke-ink-950" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M10 28h104" className="stroke-cream-200" strokeWidth="2" />
        </g>
      ))}
      <rect x="44" y="182" width="96" height="24" rx="12" className="fill-ember-500" />
      <text x="92" y="199" textAnchor="middle" className="fill-white font-display" fontSize="13" letterSpacing="3">
        PIZZA
      </text>
      <g className="animate-float">
        <path d="M110 92c10-16 30-16 36 0-12 8-26 8-36 0z" className="fill-basil-500" />
      </g>
    </svg>
  )
}

export function Takeaway() {
  return (
    <section aria-labelledby="takeaway-title" className="relative overflow-hidden bg-gold-400 text-ink-950">
      <div className="absolute -left-16 -top-16 h-64 w-64 animate-spin-slow opacity-15" aria-hidden="true">
        <DishArt kind="pizza" className="h-full w-full" />
      </div>
      <div className="container-site relative grid items-center gap-10 py-16 md:py-20 lg:grid-cols-[1.1fr_1fr]">
        <RevealGroup>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-4 py-1.5 font-display text-sm uppercase tracking-widest text-gold-300">
              <Icon name="bag" className="h-4 w-4" /> {takeaway.kicker}
            </p>
          </Reveal>
          <Reveal>
            <h2 id="takeaway-title" className="mt-5 font-display text-section font-bold uppercase">
              <span className="block">{takeaway.title[0]}</span>
              <span className="block text-ember-700">{takeaway.title[1]}</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-4 max-w-lg text-lg text-ink-900">{takeaway.text}</p>
          </Reveal>
          <Reveal as="ul" className="mt-6 grid gap-3 sm:grid-cols-3">
            {takeaway.features.map((f) => (
              <li key={f} className="flex items-center gap-2 rounded-xl bg-cream-50/60 px-3 py-2 text-sm font-semibold">
                <Icon name="check" className="h-4 w-4 shrink-0 text-basil-600" />
                {f}
              </li>
            ))}
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={restaurant.phone.href} variant="dark">
              <span className="inline-flex items-center gap-2">
                <Icon name="phone" className="h-4 w-4" /> {restaurant.phone.display}
              </span>
            </ButtonLink>
            <ButtonLink href={restaurant.phone.whatsapp} target="_blank" rel="noopener noreferrer" variant="primary">
              <span className="inline-flex items-center gap-2">
                <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
              </span>
            </ButtonLink>
          </Reveal>
        </RevealGroup>

        <m.div
          className="mx-auto w-full max-w-md"
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <TakeawayBag />
        </m.div>
      </div>
    </section>
  )
}
