import { news } from '@/content/home'
import { Icon } from '../ui/Icon'
import { Reveal, RevealGroup } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Visual } from '../ui/Visual'

const dateFormat = new Intl.DateTimeFormat('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })

export function News() {
  return (
    <section id="novidades" aria-labelledby="novidades-title" className="section-pad bg-cream-50">
      <div className="container-site">
        <SectionHeading id="novidades-title" script="Novidades" title="Do nosso balcão" />

        <RevealGroup as="ul" className="mt-12 grid gap-6 md:grid-cols-3">
          {news.map((post, i) => (
            <Reveal as="li" key={post.id}>
              <article className="card-lift group flex h-full flex-col overflow-hidden rounded-card bg-white">
                <div className={`relative grid aspect-[16/10] place-items-center overflow-hidden ${i % 2 ? 'bg-ember-600' : 'brick-wall'}`}>
                  <div className="h-[80%] transition-transform duration-500 ease-smooth group-hover:rotate-6 group-hover:scale-110">
                    <Visual visual={post.visual} className="aspect-square h-full drop-shadow-[0_20px_20px_rgb(0_0_0_/_0.5)]" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-2 text-sm text-muted">
                    <Icon name="calendar" className="h-4 w-4 text-ember-600" />
                    <time dateTime={post.date}>{dateFormat.format(new Date(`${post.date}T12:00:00`))}</time>
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold uppercase leading-tight text-ink-950">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
