import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react'
import { heroSlides } from '@/content/home'
import { restaurant } from '@/content/restaurant'
import type { DecorationKind } from '@/content/types'
import { EASE_SMOOTH } from '@/lib/motion'
import { ButtonLink } from '../ui/Button'
import { Decoration } from '../ui/Decoration'
import { Icon } from '../ui/Icon'
import { Visual } from '../ui/Visual'

const SLIDE_MS = 5000
const DURATION = 0.7

// Positions around the dish for floating ingredients (percent of the dish column).
const DECO_SLOTS = [
  'left-[2%] top-[8%] h-12 w-12 md:h-16 md:w-16',
  'right-[4%] top-[2%] h-10 w-10 md:h-14 md:w-14',
  'left-[-4%] bottom-[18%] h-14 w-14 md:h-20 md:w-20',
  'right-[-2%] bottom-[26%] h-12 w-12 md:h-16 md:w-16',
  'left-[40%] top-[-6%] h-9 w-9 md:h-12 md:w-12',
] as const

function DecorationLayer({ kinds, slideId }: { kinds: DecorationKind[]; slideId: string }) {
  return (
    <>
      {kinds.map((kind, i) => (
        <m.div
          key={`${slideId}-${i}`}
          className={`absolute ${DECO_SLOTS[i % DECO_SLOTS.length]}`}
          initial={{ opacity: 0, scale: 0.2, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, transition: { duration: DURATION, ease: EASE_SMOOTH, delay: 0.25 + i * 0.08 } }}
          exit={{ opacity: 0, scale: 0.4, transition: { duration: DURATION / 2 } }}
        >
          <div className={i % 2 ? 'animate-float-slow' : 'animate-float'} style={{ animationDelay: `${i * -1.3}s` }}>
            <Decoration kind={kind} className="h-full w-full drop-shadow-[0_10px_12px_rgb(0_0_0_/_0.45)]" />
          </div>
        </m.div>
      ))}
    </>
  )
}

export function Hero() {
  const [index, setIndex] = useState(0)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const paused = hoverPaused || userPaused || !!reduceMotion

  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const dishRef = useRef<HTMLDivElement>(null)
  const decoRef = useRef<HTMLDivElement>(null)
  const touchX = useRef<number | null>(null)

  const total = heroSlides.length
  const slide = heroSlides[index] ?? heroSlides[0]!
  const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total])

  useEffect(() => {
    if (paused) return
    const t = window.setTimeout(() => go(index + 1), SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [index, paused, go])

  // Three-layer scroll parallax. GSAP is loaded lazily so it stays out of the critical bundle.
  useEffect(() => {
    if (reduceMotion) return
    let cleanup: (() => void) | undefined
    let cancelled = false
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !sectionRef.current) return
      gsap.registerPlugin(ScrollTrigger)
      const ctx = gsap.context(() => {
        const scrollTrigger = { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true }
        gsap.to(bgRef.current, { yPercent: 12, ease: 'none', scrollTrigger })
        gsap.to(dishRef.current, { yPercent: 22, ease: 'none', scrollTrigger })
        gsap.to(decoRef.current, { yPercent: 55, ease: 'none', scrollTrigger })
      }, sectionRef)
      cleanup = () => ctx.revert()
    })
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [reduceMotion])

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchX.current
    const end = e.changedTouches[0]?.clientX
    touchX.current = null
    if (start == null || end == null || Math.abs(end - start) < 40) return
    go(index + (end < start ? 1 : -1))
  }

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-roledescription="carrossel"
      aria-label="Destaques do Bom Paladar"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pb-24 pt-nav text-cream-50"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={() => setHoverPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="sr-only">
        {restaurant.legalName}, {restaurant.address.city}
      </h1>

      <div ref={bgRef} className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]" aria-hidden="true">
        <div className="brick-wall absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,theme(colors.gold.500/0.28),transparent_55%)]" />
        <div className="wood-floor absolute inset-x-0 bottom-0 h-[34%] [transform:perspective(600px)_rotateX(28deg)] [transform-origin:bottom]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/40 to-transparent" />
      </div>

      <div className="container-site grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-4">
        <div className="order-2 lg:order-1" aria-live={paused ? 'polite' : 'off'}>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={slide.id}
              role="group"
              aria-roledescription="diapositivo"
              aria-label={`${index + 1} de ${total}: ${slide.title.join(' ')}`}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                exit: { opacity: 0, transition: { duration: DURATION / 2 } },
              }}
            >
              {[
                <p key="k" className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">
                  {slide.kicker}
                </p>,
                <h2 key="t" className="mt-4 font-display text-hero font-bold uppercase">
                  <span className="block">{slide.title[0]}</span>
                  <span className="block text-gold-300">{slide.title[1]}</span>
                </h2>,
                <p key="s" className="mt-5 max-w-md text-base text-cream-100/85 md:text-lg">
                  {slide.subtitle}
                </p>,
                <div key="c" className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="#menu" arrow>
                    Ver menu
                  </ButtonLink>
                  <ButtonLink href="#reservas" variant="outline">
                    Reservar mesa
                  </ButtonLink>
                </div>,
              ].map((node, i) => (
                <m.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE_SMOOTH } },
                  }}
                >
                  {node}
                </m.div>
              ))}
            </m.div>
          </AnimatePresence>

          <p className="mt-8 flex items-center gap-2 text-sm text-cream-100/75">
            <Icon name="star" className="h-4 w-4 text-gold-400" />
            <span>
              <strong className="text-cream-50">{restaurant.rating.value.toLocaleString('pt-PT')}</strong> no{' '}
              {restaurant.rating.source} · Aberto até às {restaurant.hours[0]?.closes}
            </span>
          </p>
        </div>

        <div className="relative order-1 mx-auto aspect-square w-[78%] max-w-[34rem] sm:w-[60%] lg:order-2 lg:w-full">
          <div ref={dishRef} className="absolute inset-0">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={slide.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, transition: { duration: DURATION, ease: EASE_SMOOTH } }}
                exit={{ opacity: 0, scale: 0.9, rotate: 10, transition: { duration: DURATION / 2 } }}
              >
                <div className="absolute inset-[6%] rounded-full shadow-glow" aria-hidden="true" />
                <div className={slide.visual.art.startsWith('pizza') ? 'h-full w-full animate-spin-slow' : 'h-full w-full'}>
                  <Visual visual={slide.visual} priority className="h-full w-full drop-shadow-[0_30px_40px_rgb(0_0_0_/_0.6)]" />
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-2 top-[4%] -rotate-12 font-script text-6xl text-gold-400 drop-shadow-[0_4px_8px_rgb(0_0_0_/_0.6)] md:text-8xl"
                >
                  {slide.script}
                </span>
                {slide.badge && (
                  <div className="absolute right-[2%] top-[10%] grid h-20 w-20 place-items-center rounded-full bg-ember-500 text-center font-display uppercase leading-none text-white shadow-card-hover md:h-24 md:w-24">
                    <span className="absolute inset-1.5 animate-spin-slow rounded-full border-2 border-dashed border-white/50" aria-hidden="true" />
                    <span>
                      <span className="block text-xl font-bold md:text-2xl">{slide.badge.top}</span>
                      <span className="block text-xs tracking-widest">{slide.badge.bottom}</span>
                    </span>
                  </div>
                )}
              </m.div>
            </AnimatePresence>
          </div>
          <div ref={decoRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
            <AnimatePresence initial={false}>
              <DecorationLayer key={slide.id} kinds={slide.decorations} slideId={slide.id} />
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10">
        <div className="container-site flex items-center justify-center gap-3 lg:justify-start">
          <div className="flex items-center gap-1" role="tablist" aria-label="Escolher destaque">
            {heroSlides.map((s, i) => {
              const active = i === index
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Destaque ${i + 1}: ${s.title.join(' ')}`}
                  onClick={() => go(i)}
                  className="group grid h-11 place-items-center px-1"
                >
                  <span
                    className={`relative block h-1.5 overflow-hidden rounded-full transition-all duration-500 ease-smooth ${
                      active ? 'w-12 bg-cream-50/25' : 'w-6 bg-cream-50/40 group-hover:bg-cream-50/70'
                    }`}
                  >
                    {active && (
                      <span
                        key={`${index}-${paused}`}
                        className={`absolute inset-0 origin-left bg-gold-400 ${paused ? '' : 'animate-slide-progress'}`}
                      />
                    )}
                  </span>
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={() => setUserPaused((v) => !v)}
            aria-label={userPaused ? 'Retomar carrossel' : 'Pausar carrossel'}
            className="grid h-11 w-11 place-items-center rounded-full text-cream-50/80 hover:text-gold-400"
          >
            <Icon name={userPaused ? 'play' : 'pause'} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
