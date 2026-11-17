import { PHOTOS } from '../data/site';
import { GalleryGrid } from '../components/sections';
import { CtaBand, PageHeader } from '../components/ui';

export function Galeria() {
  return (
    <>
      <PageHeader
        page="galeria"
        image="chale-varanda-entrada"
        title="Galeria de fotos"
        intro={`${PHOTOS.length} fotos tiradas no próprio chalé. Toque em uma foto para ampliar.`}
      />
      <section aria-label="Fotos" className="py-16 sm:py-20">
        <div className="container-site">
          <GalleryGrid />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
