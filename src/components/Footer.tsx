import { MapPin, Phone } from 'lucide-react';
import { FULL_ADDRESS, NAV_PAGES, SITE, pagePath } from '../data/site';
import { whatsappLink } from '../utils/whatsapp';
import { InstagramIcon, WhatsAppIcon } from './icons';

export function Footer() {
  return (
    <footer className="bg-forest-dark text-paper/85">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <a href="/" className="flex items-center gap-4">
            <img src="/brand/logo-256.webp" alt="Logo do Chalé Gran Reserva" width={88} height={88} loading="lazy" className="h-22 w-22 rounded-full" />
            <span className="font-serif text-2xl text-paper">Chalé Gran Reserva</span>
          </a>
          <p className="mt-6 max-w-sm leading-relaxed">
            Chalé de madeira com lareira para até 6 pessoas, entre araucárias, em Monte Verde, na Serra da Mantiqueira.
          </p>
        </div>

        <div className="md:col-span-4">
          <h2 className="font-serif text-lg text-paper">Contato</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-copper-light">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-copper-light" />
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`tel:+55${SITE.whatsappNumber}`} className="flex items-center gap-3 hover:text-copper-light">
                <Phone className="h-4 w-4 shrink-0 text-copper-light" aria-hidden="true" />
                Ligar: {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-copper-light">
                <InstagramIcon className="h-4 w-4 shrink-0 text-copper-light" />
                {SITE.instagramHandle}
              </a>
            </li>
            <li>
              <a href={pagePath('localizacao')} className="flex gap-3 hover:text-copper-light">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-copper-light" aria-hidden="true" />
                <span>{FULL_ADDRESS}</span>
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <h2 className="font-serif text-lg text-paper">Páginas</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_PAGES.map((page) => (
              <li key={page.id}>
                <a href={page.path} className="hover:text-copper-light">
                  {page.label}
                </a>
              </li>
            ))}
            <li>
              <a href={pagePath('reservas')} className="hover:text-copper-light">
                Reservas
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-paper/10">
        <p className="container-site py-6 text-sm text-paper/70">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Chalé Gran Reserva, Monte Verde (MG). Reservas direto com o anfitrião.
        </p>
      </div>
    </footer>
  );
}
