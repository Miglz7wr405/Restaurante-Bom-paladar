import { menuCategories } from '@/content/menu'
import { navLinks, restaurant, socials } from '@/content/restaurant'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'

export function Footer() {
  const year = new Date().getFullYear()
  const { address, phone, hours } = restaurant
  return (
    <footer id="contactos" className="bg-ink-950 text-cream-100/80">
      <div className="container-site grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm">{restaurant.description}</p>
          <ul className="mt-6 flex gap-2" aria-label="Redes sociais e contactos">
            {socials
              .filter((s) => s.href)
              .map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-cream-50/15 text-cream-50 transition-colors hover:border-gold-400 hover:bg-gold-400 hover:text-ink-950"
                  >
                    <Icon name={s.icon} className="h-5 w-5" />
                  </a>
                </li>
              ))}
          </ul>
        </div>

        <nav aria-label="Ligações do rodapé">
          <h2 className="font-display text-lg uppercase tracking-wider text-cream-50">Navegar</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-gold-300">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#reservas" className="hover:text-gold-300">
                Reservas
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg uppercase tracking-wider text-cream-50">Menu</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {menuCategories.map((c) => (
              <li key={c.id}>
                <a href="#menu" className="hover:text-gold-300">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="font-display text-lg uppercase tracking-wider text-cream-50">Visite-nos</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <Icon name="pin" className="h-5 w-5 shrink-0 text-gold-400" />
              <a href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
                {address.street}, {address.city}, {address.country}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="h-5 w-5 shrink-0 text-gold-400" />
              <a href={phone.href} className="hover:text-gold-300">
                {phone.display}
              </a>
            </li>
            {hours.map((h) => (
              <li key={h.days} className="flex gap-3">
                <Icon name="clock" className="h-5 w-5 shrink-0 text-gold-400" />
                <span>
                  {h.opens ? `${h.days}: ${h.opens} – ${h.closes}` : `Aberto até às ${h.closes}`}
                </span>
              </li>
            ))}
          </ul>
        </address>
      </div>
      <div className="border-t border-cream-50/10">
        <p className="container-site py-6 text-center text-xs text-cream-100/60">
          © {year} {restaurant.legalName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
