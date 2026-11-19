import { Mountain, Snowflake, UtensilsCrossed } from 'lucide-react';
import { NEARBY, SEASONS, TRAILS, img, pagePath } from '../data/site';
import { CtaBand, PageHeader } from '../components/ui';

export function MonteVerde() {
  const nearby = NEARBY.filter((place) => !place.name.startsWith('Aeroporto'));

  return (
    <>
      <PageHeader
        page="monteverde"
        image="chale-jardim-flores"
        title="O que fazer em Monte Verde"
        intro="Trilhas, a Avenida Monte Verde e passeios a poucos minutos do chalé. Um guia curto para planejar a viagem."
      />

      <article className="py-20 sm:py-24">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="space-y-16 lg:col-span-8">
            <section aria-labelledby="sobre-mv">
              <h2 id="sobre-mv" className="text-3xl text-forest sm:text-4xl">
                Monte Verde, no Sul de Minas
              </h2>
              <div className="prose-site mt-5 text-lg leading-relaxed text-ink/85">
                <p>
                  Monte Verde é um distrito de Camanducaia, em Minas Gerais, a cerca de 1.550 metros de altitude na Serra
                  da Mantiqueira. Fica perto da divisa com São Paulo e é conhecido pelo frio, pelas araucárias e pela
                  arquitetura de inspiração europeia.
                </p>
                <p>
                  O Chalé Gran Reserva fica nas Villas de Monte Verde, a cerca de 5 km do centro. De carro, são poucos
                  minutos até os restaurantes da avenida.
                </p>
              </div>
            </section>

            <section aria-labelledby="trilhas">
              <h2 id="trilhas" className="flex items-center gap-3 text-3xl text-forest sm:text-4xl">
                <Mountain className="h-7 w-7 text-copper" aria-hidden="true" />
                Trilhas
              </h2>
              <ul className="mt-6 space-y-5">
                {TRAILS.map((trail) => (
                  <li key={trail.name} className="rounded-2xl bg-white p-6 shadow-soft">
                    <h3 className="text-2xl text-forest">{trail.name}</h3>
                    <p className="mt-2 text-ink/80">{trail.text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-ink/75">
                As trilhas costumam fechar em dias de chuva, e algumas pedem agendamento ou cobram entrada. Confira as
                regras antes de sair.
              </p>
            </section>

            <section aria-labelledby="avenida">
              <h2 id="avenida" className="flex items-center gap-3 text-3xl text-forest sm:text-4xl">
                <UtensilsCrossed className="h-7 w-7 text-copper" aria-hidden="true" />
                Avenida Monte Verde
              </h2>
              <div className="prose-site mt-5 text-lg leading-relaxed text-ink/85">
                <p>
                  A avenida principal concentra restaurantes, cafés, lojas e chocolaterias. À noite, o programa clássico é
                  um fondue. No inverno ela fica bem movimentada, principalmente nos fins de semana.
                </p>
                <p>
                  Como o chalé tem cozinha completa, dá para alternar: um jantar fora numa noite, um fondue em casa, perto
                  da lareira, na outra.
                </p>
              </div>
            </section>

            <section aria-labelledby="epoca">
              <h2 id="epoca" className="flex items-center gap-3 text-3xl text-forest sm:text-4xl">
                <Snowflake className="h-7 w-7 text-copper" aria-hidden="true" />
                Melhor época para ir
              </h2>
              <ul className="mt-6 grid gap-5 md:grid-cols-3">
                {SEASONS.map((season) => (
                  <li key={season.name} className="rounded-2xl bg-white p-6 shadow-soft">
                    <h3 className="font-sans text-base font-semibold text-forest">{season.name}</h3>
                    <p className="mt-2 text-ink/80">{season.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl bg-paper-2 p-6">
                <h2 className="text-2xl text-forest">Perto do chalé</h2>
                <ul className="mt-4 divide-y divide-forest/10">
                  {nearby.map((place) => (
                    <li key={place.name} className="flex justify-between gap-4 py-2.5">
                      <span className="text-ink/85">{place.name}</span>
                      <span className="shrink-0 font-medium tabular-nums text-forest">{place.distance}</span>
                    </li>
                  ))}
                </ul>
                <a href={pagePath('localizacao')} className="link mt-4 inline-block">
                  Ver mapa e como chegar
                </a>
              </div>
              <img
                src={img('estrada-araucarias', true)}
                width={600}
                height={800}
                loading="lazy"
                alt="Araucárias à beira da estrada em Monte Verde, perto do chalé"
                className="aspect-[4/5] w-full rounded-2xl object-cover shadow-soft"
              />
            </div>
          </aside>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
