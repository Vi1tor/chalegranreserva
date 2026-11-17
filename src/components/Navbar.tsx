import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_PAGES, SITE, pagePath, type PageId } from '../data/site';
import { WhatsAppIcon } from './icons';

interface NavbarProps {
  current: PageId;
  /** Na página inicial o menu começa transparente sobre a foto. */
  overHero?: boolean;
}

export function Navbar({ current, overHero = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const solid = !overHero || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? 'bg-paper/95 text-forest shadow-soft backdrop-blur-md' : 'bg-gradient-to-b from-forest-dark/60 to-transparent text-paper'
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <a href="/" className="flex shrink-0 items-center gap-3" aria-label={`${SITE.name}, página inicial`}>
          <img src="/brand/logo-256.webp" alt="" width={48} height={48} className="h-12 w-12 rounded-full" />
          <span className="font-serif text-lg leading-tight font-medium">Chalé Gran Reserva</span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.95rem] font-medium">
            {NAV_PAGES.map((page) => {
              const active = page.id === current;
              return (
                <li key={page.id}>
                  <a
                    href={page.path}
                    aria-current={active ? 'page' : undefined}
                    className={`relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-copper after:transition-transform ${
                      active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                    } ${solid ? 'hover:text-copper' : 'hover:text-copper-light'}`}
                  >
                    {page.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={pagePath('reservas')} className="btn btn-copper hidden !min-h-0 !py-2.5 sm:inline-flex">
            <WhatsAppIcon className="h-4 w-4" />
            Reservar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movel"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movel" aria-label="Menu" className="container-site pb-6 lg:hidden">
          <ul className="divide-y divide-forest/10 border-y border-forest/10">
            {NAV_PAGES.map((page) => (
              <li key={page.id}>
                <a
                  href={page.path}
                  aria-current={page.id === current ? 'page' : undefined}
                  className={`block py-3.5 text-lg font-medium ${page.id === current ? 'text-copper' : ''}`}
                >
                  {page.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={pagePath('reservas')} className="btn btn-copper mt-5 w-full">
            <WhatsAppIcon className="h-4 w-4" />
            Reservar
          </a>
        </nav>
      )}
    </header>
  );
}
