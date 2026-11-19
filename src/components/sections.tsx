import { useEffect, useState, type FormEvent } from 'react';
import {
  Bath,
  BedDouble,
  Car,
  Check,
  CigaretteOff,
  Clock,
  Flame,
  LogOut,
  Mountain,
  PawPrint,
  Plus,
  Thermometer,
  Trees,
  Tv,
  UtensilsCrossed,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import {
  AMENITIES,
  FAQS,
  FULL_ADDRESS,
  NEARBY,
  PHOTOS,
  PHOTO_CATEGORIES,
  POLICIES,
  SITE,
  SPACES,
  img,
  photo,
  type AmenityIcon,
  type Photo,
  type PhotoCategory,
} from '../data/site';
import {
  addDaysIso,
  buildInquiryMessage,
  buildWhatsAppUrl,
  calculateNights,
  formatDatePtBr,
  toIsoDate,
} from '../utils/whatsapp';
import { WhatsAppIcon } from './icons';
import { Lightbox } from './Lightbox';

/* ------------------------------------------------------------------ */
/* Lightbox compartilhado                                              */
/* ------------------------------------------------------------------ */

function useLightbox() {
  const [state, setState] = useState<{ photos: Photo[]; index: number | null }>({ photos: [], index: null });
  const open = (photos: Photo[], index: number) => setState({ photos, index });
  const element = (
    <Lightbox
      photos={state.photos}
      index={state.index}
      onClose={() => setState((s) => ({ ...s, index: null }))}
      onChange={(index) => setState((s) => ({ ...s, index }))}
    />
  );
  return { open, element };
}

/* ------------------------------------------------------------------ */
/* Ambientes                                                           */
/* ------------------------------------------------------------------ */

export function SpacesList() {
  const lightbox = useLightbox();
  return (
    <div className="space-y-16 sm:space-y-24">
      {SPACES.map((space, index) => {
        const item = photo(space.image);
        const reversed = index % 2 === 1;
        return (
          <article key={space.id} id={space.id} className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <button
              type="button"
              onClick={() => lightbox.open([item], 0)}
              aria-label={`Ampliar foto: ${item.title}`}
              className={`group block cursor-zoom-in overflow-hidden rounded-2xl shadow-lift ${reversed ? 'lg:order-2' : ''}`}
            >
              <img
                src={img(item.file)}
                srcSet={item.hasSmall ? `${img(item.file, true)} 800w, ${img(item.file)} ${item.width}w` : undefined}
                sizes="(min-width: 1024px) 50vw, 100vw"
                width={item.width}
                height={item.height}
                alt={item.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </button>
            <div className={reversed ? 'lg:order-1' : ''}>
              <h3 className="text-3xl text-forest sm:text-4xl">{space.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink/80">{space.text}</p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {space.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-ink/85">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper/12 text-copper">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        );
      })}
      {lightbox.element}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Comodidades e regras                                                */
/* ------------------------------------------------------------------ */

const ICONS: Record<AmenityIcon, LucideIcon> = {
  flame: Flame,
  wifi: Wifi,
  car: Car,
  utensils: UtensilsCrossed,
  tv: Tv,
  thermometer: Thermometer,
  trees: Trees,
  mountain: Mountain,
  paw: PawPrint,
  smoke: CigaretteOff,
  bath: Bath,
  bed: BedDouble,
};

export function AmenitiesGrid({ limit }: { limit?: number }) {
  const list = limit ? AMENITIES.slice(0, limit) : AMENITIES;
  return (
    <ul className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {list.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <li key={item.title} className="rounded-xl bg-white/80 p-5 shadow-soft sm:p-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-copper/10 text-copper">
              <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-sans text-base font-semibold text-forest">{item.title}</h3>
            <p className="mt-0.5 text-sm text-ink/70">{item.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

const POLICY_ICONS: LucideIcon[] = [Clock, LogOut, PawPrint, CigaretteOff];

export function PoliciesBand({ embedded = false }: { embedded?: boolean }) {
  if (embedded) {
    return (
      <div className="mt-16 border-t border-forest/15 pt-12">
        <h2 className="text-2xl text-forest sm:text-3xl">Regras da casa</h2>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POLICIES.map((policy, i) => {
            const Icon = POLICY_ICONS[i];
            return (
              <li key={policy.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest text-paper">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-forest">{policy.title}</span>
                  <span className="block text-ink/75">{policy.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return (
    <section aria-labelledby="regras-titulo" className="bg-forest py-14 text-paper sm:py-16">
      <div className="container-site">
        <h2 id="regras-titulo" className="text-2xl sm:text-3xl">
          Regras da casa
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POLICIES.map((policy, i) => {
            const Icon = POLICY_ICONS[i];
            return (
              <li key={policy.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-copper-light/50 text-copper-light">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold">{policy.title}</span>
                  <span className="block text-paper/80">{policy.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Galeria                                                             */
/* ------------------------------------------------------------------ */

export function GalleryGrid({ limit, filters = true }: { limit?: number; filters?: boolean }) {
  const [filter, setFilterState] = useState<PhotoCategory | 'todas'>('todas');
  const lightbox = useLightbox();

  // O filtro fica no endereço (?ambiente=quartos): dá para compartilhar o link já filtrado.
  useEffect(() => {
    if (!filters) return;
    const fromUrl = new URLSearchParams(window.location.search).get('ambiente');
    if (fromUrl && PHOTO_CATEGORIES.some((c) => c.id === fromUrl)) setFilterState(fromUrl as PhotoCategory);
  }, [filters]);

  const setFilter = (next: PhotoCategory | 'todas') => {
    setFilterState(next);
    const url = new URL(window.location.href);
    if (next === 'todas') url.searchParams.delete('ambiente');
    else url.searchParams.set('ambiente', next);
    window.history.replaceState(null, '', url);
  };
  const filtered = filter === 'todas' ? PHOTOS : PHOTOS.filter((item) => item.category === filter);
  const list = limit ? filtered.slice(0, limit) : filtered;

  return (
    <div>
      {filters && (
        <div role="group" aria-label="Filtrar fotos" className="mb-8 flex flex-wrap gap-2">
          {PHOTO_CATEGORIES.map((category) => {
            const active = filter === category.id;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(category.id)}
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-forest text-paper' : 'border border-forest/20 bg-white/70 text-forest hover:border-forest/50'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      )}

      <ul className="grid grid-flow-dense auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-3 lg:grid-cols-4 lg:auto-rows-[13rem]">
        {list.map((item, index) => {
          const tall = item.height > item.width;
          return (
            <li key={item.file} className={tall ? 'row-span-2' : ''}>
              <button
                type="button"
                onClick={() => lightbox.open(list, index)}
                aria-label={`Ampliar foto: ${item.title}`}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden rounded-xl bg-paper-2"
              >
                <img
                  src={img(item.file, item.hasSmall)}
                  width={tall ? 450 : 800}
                  height={tall ? 800 : 450}
                  loading="lazy"
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-dark/75 to-transparent p-3 pt-10 text-left text-sm font-medium text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {item.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {lightbox.element}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reserva                                                             */
/* ------------------------------------------------------------------ */

const field =
  'mt-1.5 w-full rounded-lg border border-forest/20 bg-white px-4 py-3 text-base text-ink tabular-nums placeholder:text-ink/45 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/25';
const label = 'text-sm font-semibold text-forest';

export function ReservationForm() {
  // As datas são definidas no navegador para não congelar a data do build no HTML.
  const [today, setToday] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [notes, setNotes] = useState('');
  // Erro ligado ao campo que precisa ser corrigido (aparece embaixo dele e recebe o foco).
  const [error, setError] = useState<{ field: 'checkin' | 'checkout'; text: string } | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const now = toIsoDate(new Date());
    setToday(now);
    setCheckIn(addDaysIso(now, 7));
    setCheckOut(addDaysIso(now, 9));
  }, []);

  const nights = calculateNights(checkIn, checkOut);
  const message = buildInquiryMessage({ checkIn, checkOut, guests, guestName, notes });

  const onCheckInChange = (value: string) => {
    setError(null);
    setCheckIn(value);
    if (value && (!checkOut || checkOut <= value)) setCheckOut(addDaysIso(value, 2));
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    const fail = (field: 'checkin' | 'checkout', text: string) => {
      setError({ field, text });
      document.getElementById(field)?.focus();
    };
    if (!checkIn) return fail('checkin', 'Escolha a data de entrada.');
    if (!checkOut) return fail('checkout', 'Escolha a data de saída.');
    if (today && checkIn < today) return fail('checkin', 'Essa data já passou. Escolha a partir de hoje.');
    if (checkOut <= checkIn) return fail('checkout', 'Escolha uma saída depois da entrada.');
    const url = buildWhatsAppUrl(message);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      setSent(true);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Pedido de reserva" className="rounded-2xl bg-white p-6 shadow-lift sm:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="checkin" className={label}>
            Entrada
          </label>
          <input
            id="checkin"
            name="checkin"
            type="date"
            autoComplete="off"
            min={today || undefined}
            value={checkIn}
            onChange={(e) => onCheckInChange(e.target.value)}
            required
            aria-invalid={error?.field === 'checkin' || undefined}
            aria-describedby={error?.field === 'checkin' ? 'erro-checkin' : undefined}
            className={field}
          />
          <FieldError id="erro-checkin" text={error?.field === 'checkin' ? error.text : null} />
        </div>
        <div>
          <label htmlFor="checkout" className={label}>
            Saída
          </label>
          <input
            id="checkout"
            name="checkout"
            type="date"
            autoComplete="off"
            min={checkIn ? addDaysIso(checkIn, 1) : today || undefined}
            value={checkOut}
            onChange={(e) => {
              setError(null);
              setCheckOut(e.target.value);
            }}
            required
            aria-invalid={error?.field === 'checkout' || undefined}
            aria-describedby={error?.field === 'checkout' ? 'erro-checkout' : undefined}
            className={field}
          />
          <FieldError id="erro-checkout" text={error?.field === 'checkout' ? error.text : null} />
        </div>
        <div>
          <label htmlFor="guests" className={label}>
            Pessoas
          </label>
          <select id="guests" name="guests" autoComplete="off" value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={field}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'pessoa' : 'pessoas'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name" className={label}>
            Seu nome <span className="font-normal text-ink/75">(opcional)</span>
          </label>
          <input id="name" name="name" type="text" autoComplete="name" value={guestName} onChange={(e) => setGuestName(e.target.value)} className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="notes" className={label}>
            Observações <span className="font-normal text-ink/75">(opcional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            autoComplete="off"
            rows={3}
            placeholder="Horário de chegada, se vai levar pet, crianças…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={field}
          />
        </div>
      </div>

      <p className="mt-5 rounded-lg bg-paper-2 px-4 py-3 text-ink/85 tabular-nums" aria-live="polite">
        {nights > 0
          ? `${formatDatePtBr(checkIn)} a ${formatDatePtBr(checkOut)}: ${nights} ${nights === 1 ? 'noite' : 'noites'}, ${guests} ${guests === 1 ? 'pessoa' : 'pessoas'}.`
          : 'Escolha um período válido.'}
      </p>

      <button type="submit" className="btn btn-whatsapp mt-6 w-full sm:w-auto">
        <WhatsAppIcon className="h-5 w-5" />
        Enviar pedido pelo WhatsApp
      </button>
      {sent && (
        <p className="mt-3 text-sm text-ink/75" role="status">
          Abrimos o WhatsApp com a mensagem pronta. Se não abriu, chame no {SITE.whatsappDisplay}.
        </p>
      )}
    </form>
  );
}

function FieldError({ id, text }: { id: string; text: string | null }) {
  return (
    <p id={id} role="alert" className="mt-1.5 min-h-0 text-sm font-medium text-[#9b2c1f]">
      {text}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Dúvidas                                                             */
/* ------------------------------------------------------------------ */

/** Usa <details> nativo: funciona sem JavaScript e o texto fica no HTML para o Google. */
export function FaqList({ limit }: { limit?: number }) {
  const list = limit ? FAQS.slice(0, limit) : FAQS;
  return (
    <div className="space-y-3">
      {list.map((item, i) => (
        <details key={item.q} open={i === 0} className="group rounded-xl bg-white/80 shadow-soft open:bg-white">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 px-6 py-4">
            <h3 className="text-lg text-forest sm:text-xl">{item.q}</h3>
            <Plus className="h-5 w-5 shrink-0 text-copper transition-transform duration-200 group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="px-6 pb-6 text-ink/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Localização                                                         */
/* ------------------------------------------------------------------ */

export function NearbyList() {
  return (
    <ul className="divide-y divide-forest/10">
      {NEARBY.map((place) => (
        <li key={place.name} className="flex items-center justify-between gap-4 py-3">
          <span className="text-ink/85">{place.name}</span>
          <span className="shrink-0 rounded-full bg-paper-2 px-3 py-1 text-sm font-medium tabular-nums text-forest">{place.distance}</span>
        </li>
      ))}
    </ul>
  );
}

export function MapEmbed() {
  const [show, setShow] = useState(false);
  const query = encodeURIComponent(SITE.mapsQuery);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-2 shadow-lift lg:aspect-auto lg:h-full lg:min-h-[26rem]">
      {show ? (
        <iframe
          title={`Mapa: ${FULL_ADDRESS}`}
          src={`https://www.google.com/maps?q=${query}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      ) : (
        <>
          <img src={img('estrada-araucarias', true)} width={600} height={800} loading="lazy" alt="Araucárias à beira da estrada, perto do chalé" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-forest-dark/70 to-transparent p-6">
            <button type="button" onClick={() => setShow(true)} className="btn btn-copper">
              Carregar mapa do Google
            </button>
          </div>
        </>
      )}
    </div>
  );
}
