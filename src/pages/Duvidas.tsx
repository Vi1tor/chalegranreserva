import { FaqList } from '../components/sections';
import { CtaBand, PageHeader } from '../components/ui';

export function Duvidas() {
  return (
    <>
      <PageHeader
        page="duvidas"
        image="porta-vista-jardim"
        title="Perguntas frequentes"
        intro="Capacidade, horários, pets, lareira, estacionamento e como reservar."
      />
      <section className="py-20 sm:py-24">
        <div className="container-site max-w-3xl">
          <FaqList />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
