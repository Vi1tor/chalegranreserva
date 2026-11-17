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

1. Coloque o domínio real em `.env` (`VITE_SITE_URL`) e em `public/llms.txt`.
2. Preencha `whatsappNumber` em `src/data/site.ts`.
3. `npm run build` e publique a pasta `dist/` (Vercel, Netlify, Cloudflare Pages…).

## Depois de publicar (indexação)

1. Google Search Console: adicione o domínio, verifique e envie `https://SEU-DOMINIO/sitemap.xml`.
2. Use "Inspeção de URL" → "Solicitar indexação" na página inicial.
3. Crie ou reivindique o Perfil da Empresa no Google com o mesmo nome, endereço e telefone do site.
4. Coloque o link do site na bio do Instagram e no anúncio do Booking.
# chalegranreserva
