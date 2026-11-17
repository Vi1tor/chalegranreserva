# Chalé Gran Reserva — site

Site do Chalé Gran Reserva (Monte Verde, MG). React 19 + Vite + Tailwind CSS v4.

São 6 páginas (Início, O Chalé, Galeria, Localização, Reservas, Dúvidas) e cada uma é
pré-renderizada no build em seu próprio HTML (`dist/<pagina>/index.html`), com título,
descrição e canonical próprios — o Google lê tudo sem depender de JavaScript.

## Comandos

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:3000
npm run build     # gera dist/ (HTML pré-renderizado + sitemap.xml + robots.txt)
npm run preview   # serve o dist/ localmente
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| URL definitiva do site (canonical, sitemap, Open Graph) | `.env` → `VITE_SITE_URL` |
| Textos, WhatsApp, endereço, notas, comodidades, FAQ, depoimentos | `src/data/site.ts` |
| Fotos (WebP) | `public/images/` |
| Logo (versões do site e favicon) | `public/brand/`, gerado de `design/logo-original.png` |
| Resumo do chalé para assistentes de IA | `public/llms.txt` |
| Cores e fontes | `src/index.css` (`@theme`) |
| Páginas, títulos e descrições para o Google | `src/data/site.ts` (`PAGES`) |
| Conteúdo de cada página | `src/pages/` |

Itens marcados com `CONFIRMAR` em `src/data/site.ts` vieram de pesquisa pública e precisam
ser validados pelo proprietário.

## Antes de publicar

1. Copie `.env.example` para `.env` e coloque o domínio real em `VITE_SITE_URL` (e em `public/llms.txt`).
   O `.env` não vai para o GitHub; na hospedagem (Vercel, Netlify…) cadastre `VITE_SITE_URL` nas
   variáveis de ambiente do projeto. Variáveis `VITE_` ficam visíveis no site: nunca guarde senhas nelas.
2. Preencha `whatsappNumber` em `src/data/site.ts`.
3. `npm run build` e publique a pasta `dist/` (Vercel, Netlify, Cloudflare Pages…).

## Depois de publicar (indexação)

1. Google Search Console: adicione o domínio, verifique e envie `https://SEU-DOMINIO/sitemap.xml`.
2. Use "Inspeção de URL" → "Solicitar indexação" na página inicial.
3. Crie ou reivindique o Perfil da Empresa no Google com o mesmo nome, endereço e telefone do site.
4. Coloque o link do site na bio do Instagram e no anúncio do Booking.
# chalegranreserva

## SEO local: o que fazer fora do site

O site já está otimizado (título e H1 com "Monte Verde" em todas as páginas, conteúdo próprio por página,
dados estruturados, sitemap, telefone clicável). Para aparecer no mapa do Google, o que mais pesa está fora do site:

1. **Perfil da Empresa no Google** (business.google.com): crie ou reivindique "Chalé Gran Reserva", escolha a
   categoria principal mais específica (ex.: "Chalé"), use exatamente o mesmo nome, endereço e telefone do site,
   coloque o link do site, suba fotos reais e marque o pino exato no mapa.
2. **Avaliações**: peça avaliação no Google a cada hóspede, de forma constante (sem longos intervalos), e responda todas.
   Nunca filtre quem pode avaliar.
3. **Bing Places** e **Apple Business Connect**: mesmos dados. O Bing alimenta o ChatGPT e o Copilot.
4. **Mesmos dados em todo lugar**: Booking, Airbnb, TripAdvisor, Instagram (link do site na bio) e guias de Monte Verde.
5. **Coordenadas exatas**: copie latitude/longitude do pino no Google Maps e passe para incluir no `geo` dos dados estruturados.
6. **Search Console**: adicione o domínio, envie `https://SEU-DOMINIO/sitemap.xml` e peça indexação das páginas.
7. **Links locais**: blogs e guias de Monte Verde ("melhores chalés", "chalés com lareira") citando o chalé com link.

Resultados de busca local levam semanas ou meses para aparecer. Ninguém pode garantir posição.
