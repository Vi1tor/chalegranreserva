import { useEffect, type ComponentType } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { FloatingWhatsApp } from './components/ui';
import { pageByPath, type PageId } from './data/site';
import { Chale } from './pages/Chale';
import { Duvidas } from './pages/Duvidas';
import { Galeria } from './pages/Galeria';
import { Home } from './pages/Home';
import { Localizacao } from './pages/Localizacao';
import { MonteVerde } from './pages/MonteVerde';
import { NotFound } from './pages/NotFound';
import { Reservas } from './pages/Reservas';

const VIEWS: Record<PageId, ComponentType> = {
  inicio: Home,
  chale: Chale,
  galeria: Galeria,
  monteverde: MonteVerde,
  localizacao: Localizacao,
  reservas: Reservas,
  duvidas: Duvidas,
  '404': NotFound,
};

/** Cada página é um HTML próprio (gerado no build). Os links são <a href> normais. */
export default function App({ pathname }: { pathname: string }) {
  const page = pageByPath(pathname);
  const View = VIEWS[page.id];

  useEffect(() => {
    // No build o <title> já vem no HTML; aqui só ajuda no modo de desenvolvimento.
    document.title = page.title;
  }, [page.title]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-forest focus:px-4 focus:py-2 focus:text-paper"
      >
        Pular para o conteúdo
      </a>
      <Navbar current={page.id} overHero={page.id === 'inicio'} />
      <main id="conteudo">
        <View />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
