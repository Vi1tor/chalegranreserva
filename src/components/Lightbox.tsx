import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { img, type Photo } from '../data/site';

interface LightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function Lightbox({ photos, index, onClose, onChange }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const open = index !== null && photos[index] !== undefined;

  useEffect(() => {
    if (!open || index === null) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange((index + 1) % photos.length);
      if (event.key === 'ArrowLeft') onChange((index - 1 + photos.length) % photos.length);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus?.();
    };
  }, [open, index, photos.length]);

  if (!open || index === null) return null;
  const photo = photos[index];
  const prev = () => onChange((index - 1 + photos.length) % photos.length);
  const next = () => onChange((index + 1) % photos.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ampliada: ${photo.title}`}
      className="fixed inset-0 z-50 flex flex-col overscroll-contain bg-forest-dark/95 text-paper backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(delta) > 50) (delta < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm tabular-nums text-paper/70">
          {index + 1} / {photos.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-paper/25 hover:border-copper-light hover:text-copper-light"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20">
        <img
          key={photo.file}
          src={img(photo.file)}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          onClick={(e) => e.stopPropagation()}
          className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
        />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Foto anterior"
              className="absolute left-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest-dark/70 hover:text-copper-light sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Próxima foto"
              className="absolute right-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-forest-dark/70 hover:text-copper-light sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      <div className="px-4 py-5 text-center sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="font-serif text-xl sm:text-2xl">{photo.title}</p>
      </div>
    </div>
  );
}
