import { PHOTOS } from '../data/site';
import { GalleryGrid } from '../components/sections';
import { CtaBand, PageHeader } from '../components/ui';

export function Galeria() {
  return (
    <>
      <PageHeader
        page="galeria"
        image="chale-varanda-entrada"
        title="Fotos do chalé em Monte Verde"
        intro={`${PHOTOS.length} fotos tiradas no próprio chalé. Toque em uma foto para ampliar.`}
      />
      <section aria-label="Fotos" className="py-16 sm:py-20">
        <div className="container-site">
          <p className="mb-10 max-w-3xl text-lg leading-relaxed text-ink/80">
            O Chalé Gran Reserva é todo de madeira e fica entre araucárias nas Villas de Monte Verde (MG). Nas fotos
            estão a fachada e o jardim, a sala com lareira de pedra, a mesa de jantar, os 2 quartos, a cozinha
            equipada, os 2 banheiros, a varanda de cima e o deck junto à mata. Use os filtros para ver cada ambiente.
          </p>
          <GalleryGrid />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
