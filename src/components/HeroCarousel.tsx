import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { HERO_SLIDES, img } from '../data/site';

const INTERVAL_MS = 6000;

/**
 * Capa do Início com as melhores fotos passando ao fundo (crossfade).
 * - No HTML pré-renderizado vai só a primeira foto (carrega rápido); as outras entram depois.
 * - Sem botões visíveis: troca sozinha; no celular também dá para deslizar com o dedo.
 * - Pausa com a aba escondida e com "reduzir movimento" do sistema.
 */
export function HeroCarousel({ children }: { children: ReactNode }) {
  const total = HERO_SLIDES.length;
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchX = useRef<number | null>(null);

  const go = useCallback((next: number) => setIndex(((next % total) + total) % total), [total]);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const autoplay = mounted && !reducedMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') setIndex((i) => (i + 1) % total);
    }, INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [autoplay, total]);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Fotos do chalé"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-dark text-paper"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {HERO_SLIDES.map((slide, i) => {
        // Antes de hidratar, só a primeira foto existe no HTML.
        if (!mounted && i !== 0) return null;
        const active = i === index;
        return (
          <picture
            key={slide.file}
            aria-hidden={!active}
            className={`absolute inset-0 -z-10 transition-opacity duration-1000 ease-in-out ${active ? 'opacity-100' : 'opacity-0'}`}
          >
            <source media="(min-width: 768px)" srcSet={img(slide.file)} />
            <img
              src={img(slide.mobile ?? slide.file, true)}
              alt={active ? slide.alt : ''}
              width={800}
              height={600}
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              className="h-full w-full object-cover"
            />
          </picture>
        );
      })}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-dark/90 via-forest-dark/40 to-forest-dark/30" aria-hidden="true" />

      <div className="container-site pt-32 pb-16 sm:pb-24">{children}</div>
    </section>
  );
}
