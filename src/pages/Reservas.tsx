import { SITE, pagePath } from '../data/site';
import { whatsappLink } from '../utils/whatsapp';
import { InstagramIcon, WhatsAppIcon } from '../components/icons';
import { FaqList, PoliciesBand, ReservationForm } from '../components/sections';
import { PageHeader, RatingCards } from '../components/ui';

export function Reservas() {
  return (
    <>
      <PageHeader
        page="reservas"
        image="sala-lareira"
        title="Reserve o chalé em Monte Verde"
        intro="A reserva é feita direto com o anfitrião, sem taxa de plataforma. Mande as datas e o número de pessoas."
      />

      <section className="py-20 sm:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-3xl text-forest">Fale com o anfitrião</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink/80">
              Pelo WhatsApp a resposta vem com a disponibilidade, o valor da estadia e as formas de pagamento.
            </p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft hover:shadow-lift">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-ink/70">WhatsApp</span>
                <span className="block font-serif text-2xl text-forest tabular-nums">{SITE.whatsappDisplay}</span>
              </span>
            </a>
            <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-soft hover:shadow-lift">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-paper">
                <InstagramIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm text-ink/70">Instagram</span>
                <span className="block font-serif text-2xl text-forest">{SITE.instagramHandle}</span>
              </span>
            </a>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-3xl text-forest">Formulário de reserva</h2>
            <p className="mt-2 mb-6 text-ink/75">Preencha e a mensagem abre pronta no WhatsApp.</p>
            <ReservationForm />
          </div>
        </div>
      </section>

      <PoliciesBand />

      <section className="py-20 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-3xl text-forest">Antes de reservar</h2>
            <p className="mt-4 text-lg text-ink/80">As dúvidas mais comuns sobre a estadia.</p>
            <a href={pagePath('duvidas')} className="link mt-4 inline-block">
              Ver todas as dúvidas
            </a>
            <div className="mt-10">
              <RatingCards compact />
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqList limit={4} />
          </div>
        </div>
      </section>
    </>
  );
}
