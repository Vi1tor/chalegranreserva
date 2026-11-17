import { ArrowRight } from 'lucide-react';
import { HIGHLIGHTS, REVIEWS, SPACES, img, pagePath, photo } from '../data/site';
import { AmenitiesGrid } from '../components/sections';
import { CtaBand, RatingCards, SectionHeading } from '../components/ui';

export function Home() {
  return (
    <>
      {/* Capa */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-dark text-paper">
        <picture>
          <source media="(min-width: 768px)" srcSet={img('chale-varanda-entrada')} />
          <img
            src={img('chale-fachada-araucarias', true)}
            width={450}
            height={800}
            alt="Chalé Gran Reserva: chalé de madeira entre araucárias, em Monte Verde"
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-dark/90 via-forest-dark/40 to-forest-dark/30" aria-hidden="true" />

        <div className="container-site pt-32 pb-16 sm:pb-24">
          <div className="max-w-3xl motion-safe:animate-hero-in">
            <p className="text-lg text-paper/90">Villas de Monte Verde, Serra da Mantiqueira</p>
            <h1 className="mt-3 text-5xl leading-[1.05] sm:text-7xl lg:text-[5.5rem]">Chalé Gran Reserva</h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-paper/90">
              Chalé de madeira com lareira, para até 6 pessoas, entre araucárias. A casa inteira é sua durante a estadia.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={pagePath('reservas')} className="btn btn-copper">
                Consultar datas
              </a>
              <a href={pagePath('chale')} className="btn btn-ghost-light">
                Conhecer o chalé
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Boas-vindas */}
      <section className="py-20 sm:py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading title="Madeira, lareira e araucárias na Serra da Mantiqueira" />
            <div className="prose-site mt-6 text-lg leading-relaxed text-ink/80">
              <p>
                O Gran Reserva fica nas Villas de Monte Verde, cercado de araucárias e a cerca de 5 km do centro. Por
                dentro é madeira do piso ao teto: sala com lareira de pedra, cozinha completa e dois quartos
                aconchegantes.
              </p>
              <p>
                Da varanda de cima se vê a serra. O chalé é alugado inteiro, só para o seu grupo, e recebe até 6
                pessoas.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-forest/15 pt-6 sm:grid-cols-4">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl text-copper">{item.value}</span>
                    <span className="text-ink/75">{item.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <img
              src={img('chale-fachada-araucarias')}
              srcSet={`${img('chale-fachada-araucarias', true)} 450w, ${img('chale-fachada-araucarias')} 899w`}
              sizes="(min-width: 1024px) 40vw, 90vw"
              width={899}
              height={1599}
              alt="Fachada do chalé de madeira com varanda no andar de cima"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lift"
            />
            <img
              src="/brand/logo-256.webp"
              alt=""
              width={128}
              height={128}
              loading="lazy"
              className="absolute -right-3 -bottom-6 h-28 w-28 rounded-full shadow-soft sm:-right-6 sm:h-32 sm:w-32"
            />
          </div>
        </div>
      </section>

      {/* Ambientes */}
      <section className="bg-paper-2 py-20 sm:py-28">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading title="Os ambientes" intro="Sala com lareira, dois quartos, cozinha equipada e área externa com varanda, deck e jardim." />
            <a href={pagePath('chale')} className="btn btn-outline self-start md:self-auto">
              Ver o chalé completo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SPACES.map((space) => {
              const item = photo(space.image);
              return (
                <li key={space.id}>
                  <a href={`${pagePath('chale')}#${space.id}`} className="group block overflow-hidden rounded-2xl bg-white shadow-soft">
                    <img
                      src={img(item.file, item.hasSmall)}
                      width={800}
                      height={600}
                      alt={item.alt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="block p-5">
                      <span className="block font-serif text-xl text-forest">{space.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink/75">{space.features.join(', ')}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Comodidades (resumo) */}
      <section className="py-20 sm:py-28">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading title="O que tem no chalé" />
            <a href={`${pagePath('chale')}#comodidades`} className="link self-start md:self-auto">
              Ver todas as comodidades
            </a>
          </div>
          <div className="mt-10">
            <AmenitiesGrid limit={8} />
          </div>
        </div>
      </section>

      {/* Fotos (amostra) */}
      <section className="pb-20 sm:pb-28">
        <div className="container-site">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
            {['sala-poltronas-tv', 'quarto-solteiros', 'vista-varanda-serra', 'sala-jantar', 'cozinha-copa'].map((file, i) => {
              const item = photo(file);
              return (
                <a
                  key={file}
                  href={pagePath('galeria')}
                  className={`group overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                  aria-label={`Ver galeria: ${item.title}`}
                >
                  <img
                    src={img(item.file, item.hasSmall)}
                    width={800}
                    height={450}
                    alt={item.alt}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${i === 0 ? 'aspect-square md:aspect-auto' : 'aspect-[4/3]'}`}
                  />
                </a>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <a href={pagePath('galeria')} className="btn btn-outline">
              Ver as 24 fotos
            </a>
          </div>
        </div>
      </section>

      {/* Avaliações */}
      <section id="avaliacoes" className="scroll-mt-24 bg-paper-2 py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading align="center" title="O que os hóspedes acharam" intro="Notas de quem já se hospedou no chalé." />
          <div className="mt-12">
            <RatingCards />
          </div>
          {REVIEWS.length > 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {REVIEWS.map((review) => (
                <figure key={review.author} className="rounded-2xl bg-white p-7 shadow-soft">
                  <blockquote className="font-serif text-lg leading-relaxed text-ink">“{review.quote}”</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-forest">
                    {review.author}
                    {review.origin ? `, ${review.origin}` : ''}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
