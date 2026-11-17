import { NAV_PAGES } from '../data/site';

export function NotFound() {
  return (
    <section className="container-site flex min-h-[70svh] flex-col justify-center pt-32 pb-20">
      <h1 className="text-4xl text-forest sm:text-5xl">Esta página não existe</h1>
      <p className="mt-4 max-w-xl text-lg text-ink/80">O endereço pode ter mudado. Escolha uma das páginas abaixo.</p>
      <ul className="mt-8 flex flex-wrap gap-3">
        <li>
          <a href="/" className="btn btn-copper">
            Página inicial
          </a>
        </li>
        {NAV_PAGES.map((page) => (
          <li key={page.id}>
            <a href={page.path} className="btn btn-outline">
              {page.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
