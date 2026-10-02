import { team } from '@/content/home'
import { socials } from '@/content/restaurant'
import { Icon } from '../ui/Icon'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Visual } from '../ui/Visual'

export function Team() {
  return (
    <section id="equipa" aria-labelledby="equipa-title" className="section-pad bg-cream-100">
      <div className="container-site">
        <SectionHeading
          id="equipa-title"
          script="A nossa equipa"
          title="Quem faz o Bom Paladar"
          text="Da cozinha ao bar, uma equipa que trata cada prato e cada cocktail como se fosse para casa."
        />

        <RevealGroup as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => {
            const links = (member.socials.length ? member.socials : socials).filter((s) => s.href)
            return (
              <Reveal as="li" key={member.id}>
                <article className="card-lift group relative overflow-hidden rounded-card bg-ink-950 text-cream-50">
                  <div className="brick-wall relative aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-[6%] transition-transform duration-500 ease-smooth group-hover:scale-110">
                      <Visual visual={member.visual} sizes="(min-width: 1024px) 18rem, 90vw" className="photo-fade h-full w-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent" aria-hidden="true" />
                    <ul
                      className="absolute inset-x-0 bottom-4 flex justify-center gap-2 transition-[opacity,transform] duration-300 ease-out hover-hover:translate-y-4 hover-hover:opacity-0 hover-hover:group-hover:translate-y-0 hover-hover:group-hover:opacity-100 hover-hover:group-focus-within:translate-y-0 hover-hover:group-focus-within:opacity-100"
                      aria-label={`Contactos — ${member.name}`}
                    >
                      {links.map((s) => (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target={s.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="grid h-10 w-10 place-items-center rounded-full bg-gold-400 text-ink-950 transition-colors hover:bg-cream-50"
                          >
                            <Icon name={s.icon} className="h-4 w-4" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5">
                    <p className="font-display text-sm uppercase tracking-[0.25em] text-gold-400">{member.role}</p>
                    <h3 className="mt-1 font-display text-2xl font-bold uppercase">{member.name}</h3>
                    <p className="mt-2 text-sm text-cream-100/75">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
