import { MapPin } from 'lucide-react';
import { EXPERIENCES, SITE } from '../data/site';
import { MapEmbed, NearbyList } from '../components/sections';
import { CtaBand, PageHeader, SectionHeading } from '../components/ui';

export function Localizacao() {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;

  return (
    <>
      <PageHeader
        page="localizacao"
        image="vista-varanda-serra"
        title="Localização"
        intro="O chalé fica nas Villas de Monte Verde, um bairro tranquilo a cerca de 5 km do centro."
      />

      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl text-forest">Endereço</h2>
            <address className="mt-4 flex gap-3 text-lg not-italic leading-relaxed">
              <MapPin className="mt-1.5 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
              <span>
                {SITE.address.street}, {SITE.address.neighborhood}
                <br />
                {SITE.address.district}, {SITE.address.city} - {SITE.address.state}
              </span>
            </address>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6">
              Abrir rota no Google Maps
            </a>

            <h2 className="mt-14 text-3xl text-forest">Distâncias</h2>
            <div className="mt-4">
              <NearbyList />
            </div>
          </div>
          <div className="lg:col-span-7">
            <MapEmbed />
          </div>
        </div>
      </section>

      <section className="bg-paper-2 py-20 sm:py-28">
        <div className="container-site">
          <SectionHeading
            title="Monte Verde"
            intro="Distrito de Camanducaia, a cerca de 1.550 m de altitude na Serra da Mantiqueira. Faz frio de verdade no inverno, e o clima é de montanha o ano todo."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {EXPERIENCES.map((item) => (
              <li key={item.title} className="rounded-2xl bg-white p-7 shadow-soft">
                <h3 className="text-2xl text-forest">{item.title}</h3>
                <p className="mt-3 text-ink/80">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
