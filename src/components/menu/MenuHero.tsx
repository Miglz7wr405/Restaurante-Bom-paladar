import { photos } from '@/content/photos'
import { menuItemCount, menuSections } from '@/content/menu'
import { restaurant } from '@/content/restaurant'
import type { Photo } from '@/content/types'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { Visual } from '../ui/Visual'

const SHOWCASE: { photo: Photo; alt: string; className: string }[] = [
  { photo: photos.pizzaDoubleStack, alt: 'Pizza Double Stack', className: 'left-[2%] top-[18%] w-40 xl:w-52 animate-float-slow' },
  { photo: photos.mariscada, alt: 'Aparelhada de mariscos', className: 'right-[3%] top-[12%] w-44 xl:w-56 animate-float' },
  { photo: photos.mojito, alt: 'Mojito', className: 'right-[16%] bottom-[-8%] w-28 xl:w-36 animate-float' },
]

export function MenuHero() {
  return (
    <header className="brick-wall relative isolate overflow-hidden pb-14 pt-[calc(theme(spacing.nav)+3rem)] text-center text-cream-50 md:pb-20 print:hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,theme(colors.gold.500/0.22),transparent_60%)]" aria-hidden="true" />
      {SHOWCASE.map((s) => (
        <div key={s.alt} className={`pointer-events-none absolute -z-10 hidden lg:block ${s.className}`} aria-hidden="true">
          <Visual visual={{ art: 'pizza', photo: s.photo, alt: '' }} sizes="14rem" className="photo-fade aspect-square w-full object-cover" />
        </div>
      ))}
      <RevealGroup className="container-site mx-auto max-w-2xl">
        <Reveal>
          <p className="font-script text-4xl text-gold-400 md:text-5xl">O nosso</p>
        </Reveal>
        <Reveal>
          <h1 className="font-display text-hero font-bold uppercase">Menu</h1>
        </Reveal>
        <Reveal>
          <p className="mt-4 text-lg text-cream-100/85">
            {menuItemCount} pratos e bebidas em {menuSections.length} secções. Preços em meticais (MT).
          </p>
        </Reveal>
        <Reveal>
          <p className="mt-2 font-script text-2xl text-gold-300">{restaurant.slogan}</p>
        </Reveal>
      </RevealGroup>
    </header>
  )
}
