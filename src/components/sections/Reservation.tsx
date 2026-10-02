import { m } from 'framer-motion'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { restaurant } from '@/content/restaurant'
import { fadeLeft, fadeRight, viewportOnce } from '@/lib/motion'
import { todayISO, validateReservation, whatsappLink, type ReservationData, type ReservationErrors } from '@/lib/validation'
import { Button } from '../ui/Button'
import { photos } from '@/content/photos'
import { Icon } from '../ui/Icon'
import { Visual } from '../ui/Visual'

const EMPTY: ReservationData = { name: '', phone: '', date: '', time: '', guests: '2' }

const FIELDS: { key: keyof ReservationData; label: string; type: string; autoComplete?: string; placeholder?: string }[] = [
  { key: 'name', label: 'Nome', type: 'text', autoComplete: 'name', placeholder: 'O seu nome' },
  { key: 'phone', label: 'Telefone', type: 'tel', autoComplete: 'tel', placeholder: '+258 84 123 4567' },
  { key: 'date', label: 'Data', type: 'date' },
  { key: 'time', label: 'Hora', type: 'time' },
]

function formatDate(iso: string) {
  const [y, mth, d] = iso.split('-')
  return `${d}/${mth}/${y}`
}

export function Reservation() {
  const [data, setData] = useState<ReservationData>(EMPTY)
  const [errors, setErrors] = useState<ReservationErrors>({})
  const [sentLink, setSentLink] = useState<string | null>(null)

  const update = (key: keyof ReservationData) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value
    setData((d) => ({ ...d, [key]: value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateReservation(data)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      document.getElementById(`res-${firstInvalid}`)?.focus()
      return
    }
    const message = [
      `Olá ${restaurant.legalName}! Gostaria de reservar uma mesa.`,
      `Nome: ${data.name.trim()}`,
      `Telefone: ${data.phone.trim()}`,
      `Data: ${formatDate(data.date)} às ${data.time}`,
      `Pessoas: ${data.guests}`,
    ].join('\n')
    const link = whatsappLink(restaurant.phone.whatsapp, message)
    setSentLink(link)
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="reservas" aria-labelledby="reservas-title" className="section-pad overflow-hidden bg-cream-50">
      <div className="container-site grid items-stretch gap-10 lg:grid-cols-2">
        <m.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="brick-wall relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-card p-8 text-cream-50 md:p-10"
        >
          <div className="absolute -right-10 -top-6 -z-10 w-[70%] max-w-sm animate-float-slow" aria-hidden="true">
            <Visual visual={{ art: 'pizza', photo: photos.pizzaChickenMushroom, alt: '' }} sizes="24rem" className="photo-fade h-full w-full object-cover" />
          </div>
          <div className="absolute right-[38%] top-[26%] -z-10 w-[32%] max-w-[10rem] animate-float" aria-hidden="true">
            <Visual visual={{ art: 'cocktail', tint: 'blue', photo: photos.mojito, alt: '' }} sizes="10rem" className="photo-fade h-full w-full object-cover" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" aria-hidden="true" />
          <p className="font-script text-4xl text-gold-400">Reserve a sua mesa</p>
          <ul className="mt-4 space-y-3 text-cream-100/90">
            <li className="flex items-center gap-3">
              <Icon name="pin" className="h-5 w-5 text-gold-400" />
              {restaurant.address.street}, {restaurant.address.city}
            </li>
            <li className="flex items-center gap-3">
              <Icon name="clock" className="h-5 w-5 text-gold-400" />
              Aberto até às {restaurant.hours[0]?.closes}
            </li>
            <li className="flex items-center gap-3">
              <Icon name="phone" className="h-5 w-5 text-gold-400" />
              <a href={restaurant.phone.href} className="hover:text-gold-300">
                {restaurant.phone.display}
              </a>
            </li>
          </ul>
        </m.div>

        <m.div variants={fadeRight} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <p className="font-script text-3xl text-ember-600 md:text-4xl">Reservas</p>
          <h2 id="reservas-title" className="font-display text-section font-bold uppercase text-ink-950">
            Guarde o seu lugar
          </h2>
          <p className="mt-3 text-muted">
            Preencha os dados e confirmamos a reserva por WhatsApp. Para grupos grandes, ligue-nos.
          </p>

          <form noValidate onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2" aria-describedby="reservas-nota">
            {FIELDS.map((f) => (
              <div key={f.key} className={f.key === 'name' ? 'sm:col-span-2' : undefined}>
                <label htmlFor={`res-${f.key}`} className="mb-1.5 block text-sm font-semibold text-ink-900">
                  {f.label}
                </label>
                <input
                  id={`res-${f.key}`}
                  name={f.key}
                  type={f.type}
                  required
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  min={f.key === 'date' ? todayISO() : undefined}
                  value={data[f.key]}
                  onChange={update(f.key)}
                  aria-invalid={!!errors[f.key]}
                  aria-describedby={errors[f.key] ? `res-${f.key}-error` : undefined}
                  className={`field ${errors[f.key] ? 'border-ember-500' : ''}`}
                />
                {errors[f.key] && (
                  <p id={`res-${f.key}-error`} className="mt-1 text-sm font-medium text-ember-600">
                    {errors[f.key]}
                  </p>
                )}
              </div>
            ))}
            <div>
              <label htmlFor="res-guests" className="mb-1.5 block text-sm font-semibold text-ink-900">
                Nº de pessoas
              </label>
              <select
                id="res-guests"
                name="guests"
                value={data.guests}
                onChange={update('guests')}
                aria-invalid={!!errors.guests}
                aria-describedby={errors.guests ? 'res-guests-error' : undefined}
                className="field"
              >
                {Array.from({ length: 20 }, (_, i) => String(i + 1)).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === '1' ? 'pessoa' : 'pessoas'}
                  </option>
                ))}
              </select>
              {errors.guests && (
                <p id="res-guests-error" className="mt-1 text-sm font-medium text-ember-600">
                  {errors.guests}
                </p>
              )}
            </div>
            <div className="flex items-end">
              <Button type="submit" className="w-full" arrow>
                Pedir reserva
              </Button>
            </div>
            <p id="reservas-nota" className="text-xs text-muted sm:col-span-2">
              A reserva só fica confirmada após a resposta do restaurante.
            </p>
          </form>

          <div aria-live="polite">
            {sentLink && (
              <p className="mt-6 flex items-start gap-3 rounded-xl bg-basil-500/10 p-4 text-sm text-basil-600">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  Pedido preparado! Se o WhatsApp não abriu,{' '}
                  <a href={sentLink} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    toque aqui para enviar
                  </a>
                  .
                </span>
              </p>
            )}
          </div>
        </m.div>
      </div>
    </section>
  )
}
