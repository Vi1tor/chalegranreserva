/**
 * Pré-renderiza cada página do site em HTML estático depois do `vite build`.
 * - dist/<rota>/index.html para cada página, com título, descrição, canonical e Open Graph próprios
 * - dados estruturados (JSON-LD): hospedagem, caminho de navegação e perguntas frequentes
 * - dist/404.html, dist/sitemap.xml e dist/robots.txt com a URL definitiva do site
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

const { render, SITE, SITE_URL, FAQS, PHOTOS, PAGES } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);

const abs = (p) => `${SITE_URL}${p}`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ld = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const lodging = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': `${SITE_URL}/#chale`,
  name: SITE.name,
  url: `${SITE_URL}/`,
  description:
    'Chalé de madeira com lareira, para até 6 pessoas em Monte Verde (Camanducaia, MG), na Serra da Mantiqueira. 2 quartos, 2 banheiros, cozinha equipada, varanda, deck, jardim e estacionamento no terreno.',
  image: PHOTOS.slice(0, 6).map((p) => abs(`/images/${p.file}.webp`)),
  logo: abs('/brand/logo-512.webp'),
  telephone: `+55${SITE.whatsappNumber}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${SITE.address.street}, ${SITE.address.neighborhood}`,
    addressLocality: `${SITE.address.district}, ${SITE.address.city}`,
    addressRegion: SITE.address.state,
    addressCountry: SITE.address.country,
  },
  containedInPlace: { '@type': 'Place', name: 'Monte Verde, Camanducaia - MG' },
  sameAs: [SITE.instagramUrl, SITE.bookingUrl],
  numberOfRooms: 2,
  petsAllowed: 'Mediante consulta',
  smokingAllowed: false,
  checkinTime: '14:00',
  checkoutTime: '11:00',
  amenityFeature: ['Lareira', 'Wi-Fi gratuito', 'Estacionamento privativo gratuito', 'Cozinha equipada', 'Aquecimento', 'TV de tela plana', 'Varanda', 'Jardim'].map(
    (name) => ({ '@type': 'LocationFeatureSpecification', name, value: true }),
  ),
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#site`,
  name: SITE.name,
  url: `${SITE_URL}/`,
  inLanguage: 'pt-BR',
};

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const breadcrumb = (page) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: page.label, item: abs(page.path) },
  ],
});

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--page-head-->')) {
  throw new Error('Marcadores <!--app-html--> ou <!--page-head--> não encontrados em index.html');
}

const written = [];
for (const page of PAGES) {
  const isNotFound = page.id === '404';
  const canonical = abs(page.path);
  const blocks = [];
  if (page.id === 'inicio') blocks.push(ld(website), ld(lodging));
  else if (!isNotFound) blocks.push(ld(breadcrumb(page)));
  if (page.id === 'duvidas') blocks.push(ld(faqPage));

  const head = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    isNotFound ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${canonical}" />`,
    isNotFound ? '' : '<meta name="robots" content="index, follow, max-image-preview:large" />',
    `<meta property="og:url" content="${isNotFound ? `${SITE_URL}/` : canonical}" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    page.id === 'inicio'
      ? '<link rel="preload" as="image" href="/images/chale-varanda-entrada.webp" media="(min-width: 768px)" fetchpriority="high" />\n    <link rel="preload" as="image" href="/images/chale-fachada-araucarias-sm.webp" media="(max-width: 767px)" fetchpriority="high" />'
      : '',
    ...blocks,
  ]
    .filter(Boolean)
    .join('\n    ');

  const html = template.replace('<!--page-head-->', head).replace('<!--app-html-->', render(page.path));
  const out = isNotFound ? path.join(dist, '404.html') : path.join(dist, page.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  written.push(path.relative(dist, out));
}

const today = new Date().toISOString().slice(0, 10);
const urls = PAGES.filter((p) => p.id !== '404')
  .map((p) => {
    const images =
      p.id === 'galeria'
        ? '\n' + PHOTOS.map((ph) => `    <image:image><image:loc>${abs(`/images/${ph.file}.webp`)}</image:loc></image:image>`).join('\n')
        : '';
    return `  <url>\n    <loc>${abs(p.path)}</loc>\n    <lastmod>${today}</lastmod>${images}\n  </url>`;
  })
  .join('\n');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`,
);

fs.writeFileSync(path.join(dist, 'robots.txt'), `# Buscadores e assistentes de IA podem ler o site inteiro.\nUser-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);

fs.rmSync(serverDir, { recursive: true, force: true });
console.log(`Pré-renderizado (${SITE_URL}): ${written.join(', ')} + sitemap.xml + robots.txt`);
