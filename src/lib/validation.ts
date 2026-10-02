export interface ReservationData {
  name: string
  phone: string
  date: string
  time: string
  guests: string
}

export type ReservationErrors = Partial<Record<keyof ReservationData, string>>

export function todayISO(now = new Date()): string {
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

export function validateReservation(data: ReservationData, now = new Date()): ReservationErrors {
  const errors: ReservationErrors = {}
  if (data.name.trim().length < 2) errors.name = 'Indique o seu nome.'
  const digits = data.phone.replace(/[\s()-]/g, '')
  if (!/^\+?\d{9,15}$/.test(digits)) errors.phone = 'Indique um telefone válido (ex.: 84 123 4567).'
  if (!data.date) errors.date = 'Escolha a data.'
  else if (data.date < todayISO(now)) errors.date = 'A data não pode ser no passado.'
  if (!/^\d{2}:\d{2}$/.test(data.time)) errors.time = 'Escolha a hora.'
  const guests = Number(data.guests)
  if (!Number.isInteger(guests) || guests < 1 || guests > 30) errors.guests = 'Entre 1 e 30 pessoas.'
  return errors
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
}

export function whatsappLink(base: string, message: string): string {
  return `${base}?text=${encodeURIComponent(message)}`
}
