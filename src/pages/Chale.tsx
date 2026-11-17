import { AmenitiesGrid, PoliciesBand, SpacesList } from '../components/sections';
import { CtaBand, PageHeader } from '../components/ui';

export function Chale() {
  return (
    <>
      <PageHeader
        page="chale"
        image="sala-poltronas-tv"
        title="O chalé"
        intro="Um chalé de madeira com sala e lareira, dois quartos, dois banheiros, cozinha equipada, varanda, deck e jardim."
      />

      <section aria-labelledby="ambientes-titulo" className="py-20 sm:py-28">
        <div className="container-site">
          <h2 id="ambientes-titulo" className="sr-only">
            Ambientes
          </h2>
          <SpacesList />
        </div>
      </section>

      <section id="comodidades" aria-labelledby="comodidades-titulo" className="scroll-mt-24 bg-paper-2 py-20 sm:py-28">
        <div className="container-site">
          <h2 id="comodidades-titulo" className="text-3xl text-forest sm:text-4xl lg:text-[2.75rem]">
            Comodidades
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">Tudo o que já está no chalé quando você chega.</p>
          <div className="mt-10">
            <AmenitiesGrid />
          </div>
          <PoliciesBand embedded />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
