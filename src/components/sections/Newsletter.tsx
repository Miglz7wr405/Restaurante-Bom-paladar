import { useState, type FormEvent } from 'react'
import { restaurant } from '@/content/restaurant'
import { isValidEmail, whatsappLink } from '@/lib/validation'
import { Button } from '../ui/Button'
import { photos } from '@/content/photos'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { Visual } from '../ui/Visual'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  // No mailing-list backend yet: the sign-up is sent to the restaurant's WhatsApp.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError('Indique um email válido.')
      return
    }
    setError(null)
    setDone(true)
    window.open(
      whatsappLink(restaurant.phone.whatsapp, `Olá! Quero receber as ofertas do ${restaurant.legalName}. Email: ${email.trim()}`),
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <section aria-labelledby="ofertas-title" className="relative overflow-hidden bg-cream-100 py-16 md:py-24">
      <div className="pointer-events-none absolute -left-20 top-1/2 hidden w-72 -translate-y-1/2 md:block lg:w-80" aria-hidden="true">
        <Visual visual={{ art: 'pizza', photo: photos.pizzaMexicana, alt: '' }} sizes="20rem" className="photo-fade h-full w-full animate-float-slow object-cover" />
      </div>
      <div className="pointer-events-none absolute -right-16 top-1/2 hidden w-64 -translate-y-1/2 md:block lg:w-72" aria-hidden="true">
        <Visual visual={{ art: 'pizza-seafood', photo: photos.pizzaSeafood, alt: '' }} sizes="18rem" className="photo-fade h-full w-full animate-float object-cover" />
      </div>

      <RevealGroup className="container-site relative mx-auto max-w-xl text-center">
        <Reveal>
          <p className="font-script text-3xl text-ember-600 md:text-4xl">Não perca nada</p>
        </Reveal>
        <Reveal>
          <h2 id="ofertas-title" className="font-display text-section font-bold uppercase text-ink-950">
            Junte-se às ofertas
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-3 text-muted">Novos pratos, noites de cocktails e promoções, primeiro para si.</p>
        </Reveal>
        <Reveal>
          {done ? (
            <p role="status" className="mt-8 rounded-full bg-basil-500 px-6 py-4 font-semibold text-white">
              Obrigado! Envie a mensagem no WhatsApp para concluir a inscrição.
            </p>
          ) : (
            <form noValidate onSubmit={onSubmit} className="mt-8">
              <div className="flex flex-col gap-3 rounded-[1.75rem] bg-white p-2 shadow-card sm:flex-row sm:rounded-full">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  placeholder="o-seu@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError(null)
                  }}
                  aria-invalid={!!error}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                  className="min-w-0 flex-1 rounded-full px-5 py-3 text-ink-950 placeholder:text-ink-600/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
                />
                <Button type="submit" variant="primary">
                  Subscrever
                </Button>
              </div>
              {error && (
                <p id="newsletter-error" className="mt-2 text-sm font-medium text-ember-600">
                  {error}
                </p>
              )}
            </form>
          )}
        </Reveal>
      </RevealGroup>
    </section>
  )
}
