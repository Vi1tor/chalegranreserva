import { useEffect, useState, type ReactNode } from 'react';
import { Star, X } from 'lucide-react';
import { PAGES, RATINGS, img, pagePath, type PageId } from '../data/site';
import { whatsappLink } from '../utils/whatsapp';
import { WhatsAppIcon } from './icons';

export function SectionHeading({ title, intro, align = 'left' }: { title: string; intro?: ReactNode; align?: 'left' | 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <h2 className="text-3xl text-forest sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-ink/75">{intro}</p>}
    </div>
  );
}

/** Cabeçalho das páginas internas: foto larga com o título por cima e o caminho de navegação. */
export function PageHeader({ page, title, intro, image }: { page: PageId; title: string; intro: string; image: string }) {
  const meta = PAGES.find((item) => item.id === page)!;
  return (
    <header className="relative isolate overflow-hidden bg-forest-dark pt-[4.5rem] text-paper">
      <img src={img(image)} alt="" width={1600} height={900} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-dark via-forest-dark/50 to-forest-dark/20" aria-hidden="true" />
      <div className="container-site py-16 sm:py-24">
        <nav aria-label="Você está em" className="text-sm text-paper/80">
          <ol className="flex items-center gap-2">
            <li>
              <a href="/" className="hover:text-copper-light">
                Início
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{meta.label}</li>
          </ol>
        </nav>
        <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-paper/85">{intro}</p>
      </div>
    </header>
  );
}

export function RatingCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${compact ? '' : 'mx-auto max-w-3xl'}`}>
      {RATINGS.map((rating) => (
        <a
          key={rating.platform}
          href={rating.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-5 rounded-2xl bg-white/80 p-6 shadow-soft transition-shadow hover:shadow-lift"
        >
          <span className="font-serif text-5xl text-forest">
            {rating.score}
            <span className="text-xl text-ink/75">{rating.scale}</span>
          </span>
          <span>
            <span className="flex gap-0.5 text-copper" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span className="mt-1 block font-semibold text-forest">{rating.label}</span>
            <span className="block text-sm text-ink/70 group-hover:text-copper">
              {rating.platform}, {rating.count}
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}

/** Faixa de chamada para reserva, usada no fim das páginas. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-titulo" className="relative isolate overflow-hidden bg-forest text-paper">
      <img src={img('deck-madeira-mata')} alt="" width={1600} height={900} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20" />
      <div className="container-site flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 id="cta-titulo" className="text-3xl sm:text-4xl">
            Vamos ver suas datas?
          </h2>
          <p className="mt-3 text-lg text-paper/85">
            Mande as datas e quantas pessoas vão. O anfitrião responde com a disponibilidade e o valor.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon className="h-5 w-5" />
            Chamar no WhatsApp
          </a>
          <a href={pagePath('reservas')} className="btn btn-ghost-light">
            Ver formulário de reserva
          </a>
        </div>
      </div>
    </section>
  );
}

const BUBBLE_KEY = 'gr-whatsapp-balao-fechado';

/** Botão fixo do WhatsApp com um balão de conversa ao lado, que aparece alguns segundos depois. */
export function FloatingWhatsApp() {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(BUBBLE_KEY) === '1';
    } catch {
      dismissed = false;
    }
    if (dismissed) return;
    const timer = window.setTimeout(() => setShowBubble(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  const closeBubble = () => {
    setShowBubble(false);
    try {
      sessionStorage.setItem(BUBBLE_KEY, '1');
    } catch {
      // sem armazenamento: o balão volta na próxima página, sem problema
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-30 flex items-end gap-3 sm:right-6 sm:bottom-6">
      {showBubble && (
        <div
          role="status"
          className="relative mb-2 w-[min(17rem,calc(100vw-6.5rem))] rounded-2xl rounded-br-md bg-white p-4 pr-10 text-ink shadow-lift motion-safe:animate-bubble-in"
        >
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" onClick={closeBubble} className="block">
            <span className="block text-sm font-semibold text-forest">Chalé Gran Reserva</span>
            <span className="mt-1 block text-[0.95rem] leading-snug">Olá! Quer consultar datas? Chame a gente no WhatsApp.</span>
          </a>
          <button
            type="button"
            onClick={closeBubble}
            aria-label="Fechar mensagem"
            className="absolute top-1.5 right-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/70 hover:bg-paper-2 hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
          <span aria-hidden="true" className="absolute -right-1.5 bottom-3 h-3 w-3 rotate-45 bg-white" />
        </div>
      )}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white shadow-lift transition-transform hover:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
