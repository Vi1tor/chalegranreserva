# Graph Report - chalegranreserva  (2026-11-17)

## Corpus Check
- 23 files · ~323,566 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .webmanifest 1, .css 1)

## Summary
- 168 nodes · 385 edges · 10 communities (8 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- sections.tsx
- package.json
- CtaBand
- whatsapp.ts
- compilerOptions
- Chalé Gran Reserva — site
- prerender.mjs
- App.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `CtaBand()` - 15 edges
3. `WhatsAppIcon()` - 12 edges
4. `PageHeader()` - 12 edges
5. `img()` - 12 edges
6. `pagePath()` - 11 edges
7. `Reservas()` - 11 edges
8. `ReservationForm()` - 10 edges
9. `Home()` - 9 edges
10. `lucide-react` - 8 edges

## Surprising Connections (you probably didn't know these)
- `render()` --calls--> `App()`  [EXTRACTED]
  src/entry-server.tsx → src/App.tsx
- `LightboxProps` --references--> `photo`  [EXTRACTED]
  src/components/Lightbox.tsx → src/data/site.ts
- `NavbarProps` --references--> `PageId`  [EXTRACTED]
  src/components/Navbar.tsx → src/data/site.ts
- `ReservationForm()` --calls--> `WhatsAppIcon()`  [EXTRACTED]
  src/components/sections.tsx → src/components/icons.tsx
- `CtaBand()` --calls--> `WhatsAppIcon()`  [EXTRACTED]
  src/components/ui.tsx → src/components/icons.tsx

## Import Cycles
- None detected.

## Communities (10 total, 2 thin omitted)

### Community 0 - "sections.tsx"
Cohesion: 0.12
Nodes (29): Lightbox(), LightboxProps, GalleryGrid(), ICONS, POLICY_ICONS, SpacesList(), useLightbox(), RatingCards() (+21 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (30): dependencies, lucide-react, react, react-dom, @tailwindcss/vite, vite, @vitejs/plugin-react, devDependencies (+22 more)

### Community 2 - "CtaBand"
Cohesion: 0.27
Nodes (12): AmenitiesGrid(), FaqList(), MapEmbed(), NearbyList(), PoliciesBand(), CtaBand(), PageHeader(), SectionHeading() (+4 more)

### Community 3 - "whatsapp.ts"
Cohesion: 0.32
Nodes (11): ReservationForm(), addDaysIso(), buildInquiryMessage(), buildWhatsAppUrl(), calculateNights(), DEFAULT_GREETING, formatDatePtBr(), primaryContactUrl() (+3 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules, jsx, lib, module (+9 more)

### Community 7 - "Chalé Gran Reserva — site"
Cohesion: 0.33
Nodes (5): Antes de publicar, Chalé Gran Reserva — site, Comandos, Depois de publicar (indexação), Onde editar

### Community 10 - "prerender.mjs"
Cohesion: 0.11
Nodes (10): dist, faqPage, lodging, root, serverDir, template, today, urls (+2 more)

### Community 11 - "App.tsx"
Cohesion: 0.19
Nodes (20): lucide-react, react, react-dom, App(), VIEWS, Footer(), InstagramIcon(), WhatsAppIcon() (+12 more)

## Knowledge Gaps
- **61 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+56 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 73 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `sections.tsx`, `package.json`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _61 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sections.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12380952380952381 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `App.tsx` to `sections.tsx`, `package.json`, `CtaBand`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06653225806451613 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `prerender.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._