import { Car, MapPin, Phone } from 'lucide-react';
import { EXPERIENCES, ROUTES, SITE, pagePath } from '../data/site';
import { MapEmbed, NearbyList } from '../components/sections';
import { CtaBand, PageHeader, SectionHeading } from '../components/ui';

export function Localizacao() {
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;

  return (
    <>
      <PageHeader
        page="localizacao"
        image="chale-portao-entrada"
        title="Como chegar ao chalé em Monte Verde"
        intro="O Chalé Gran Reserva fica nas Villas de Monte Verde, em Camanducaia (MG), um bairro tranquilo a cerca de 5 km do centro."
      />

      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl text-forest">Endereço</h2>
            <address className="mt-4 space-y-3 text-lg not-italic leading-relaxed">
              <span className="flex gap-3">
                <MapPin className="mt-1.5 h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
                <span>
                  {SITE.name}
                  <br />
                  {SITE.address.street}, {SITE.address.neighborhood}
                  <br />
                  {SITE.address.district}, {SITE.address.city} - {SITE.address.state}
                </span>
              </span>
              <a href={`tel:+55${SITE.whatsappNumber}`} className="flex items-center gap-3 hover:text-copper">
                <Phone className="h-5 w-5 shrink-0 text-copper" aria-hidden="true" />
                {SITE.whatsappDisplay}
              </a>
            </address>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6">
              Abrir rota no Google Maps
            </a>

            <h2 className="mt-14 text-3xl text-forest">Distâncias a partir do chalé</h2>
            <div className="mt-4">
              <NearbyList />
            </div>
          </div>
          <div className="lg:col-span-7">
            <MapEmbed />
          </div>
        </div>
      </section>

      <section aria-labelledby="como-chegar" className="bg-paper-2 py-20 sm:py-28">
        <div className="container-site">
          <h2 id="como-chegar" className="text-3xl text-forest sm:text-4xl lg:text-[2.75rem]">
            Como chegar a Monte Verde
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink/75">
            O acesso é pela Rodovia Fernão Dias (BR-381) até Camanducaia e, de lá, cerca de 30 km de serra asfaltada e
            com curvas. Os tempos são estimativas sem trânsito.
          </p>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {ROUTES.map((route) => (
              <li key={route.from} className="rounded-2xl bg-white p-6 shadow-soft">
                <h3 className="flex items-center gap-3 text-2xl text-forest">
                  <Car className="h-5 w-5 text-copper" aria-hidden="true" />
                  {route.from}
                </h3>
                <p className="mt-1 text-sm font-semibold text-copper">
                  {route.distance} · {route.time}
                </p>
                <p className="mt-3 text-ink/80">{route.how}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-28">
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
          <a href={pagePath('monteverde')} className="btn btn-outline mt-10">
            Ver o guia de Monte Verde
          </a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
