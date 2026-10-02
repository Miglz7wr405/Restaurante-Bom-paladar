import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { navLinks } from '@/content/restaurant'
import { useScrolled } from '@/hooks/useScrolled'
import { ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Logo } from '../ui/Logo'

export function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid ? 'bg-ink-950/95 shadow-card backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-site flex h-nav items-center justify-between gap-4">
        <a href="#inicio" aria-label="Bom Paladar, voltar ao início" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative py-2 font-display text-sm uppercase tracking-widest text-cream-50/90 transition-colors hover:text-gold-400"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-gold-400 transition-transform duration-300 ease-smooth group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="#reservas" variant="primary" className="hidden px-5 py-2.5 sm:inline-flex">
            Reservar
          </ButtonLink>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-cream-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Navegação móvel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-cream-50/10 bg-ink-950 lg:hidden"
          >
            <ul className="container-site flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-lg uppercase tracking-widest text-cream-50 hover:text-gold-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <ButtonLink href="#reservas" onClick={() => setOpen(false)} className="w-full">
                  Reservar mesa
                </ButtonLink>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
