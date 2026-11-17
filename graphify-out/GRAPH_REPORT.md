# Graph Report - chalegranreserva  (2026-11-17)

## Corpus Check
- 23 files · ~250,517 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .webmanifest 1, .css 1)

## Summary
- 164 nodes · 379 edges · 9 communities (7 shown, 2 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- sections.tsx
- package.json
- Home.tsx
- compilerOptions
- Chalé Gran Reserva — site
- prerender.mjs
- App.tsx

## God Nodes (most connected - your core abstractions)
1. `CtaBand()` - 15 edges
2. `compilerOptions` - 14 edges
3. `WhatsAppIcon()` - 12 edges
4. `PageHeader()` - 12 edges
5. `img()` - 12 edges
6. `pagePath()` - 11 edges
7. `Reservas()` - 11 edges
8. `ReservationForm()` - 10 edges
9. `Home()` - 9 edges
10. `whatsappLink()` - 9 edges

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

## Communities (9 total, 2 thin omitted)

### Community 0 - "sections.tsx"
Cohesion: 0.14
Nodes (26): ICONS, POLICY_ICONS, ReservationForm(), AMENITIES, AmenityIcon, FAQS, FULL_ADDRESS, GuestReview (+18 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (30): dependencies, lucide-react, react, react-dom, @tailwindcss/vite, vite, @vitejs/plugin-react, devDependencies (+22 more)

### Community 2 - "Home.tsx"
Cohesion: 0.15
Nodes (24): Lightbox(), LightboxProps, AmenitiesGrid(), FaqList(), GalleryGrid(), MapEmbed(), NearbyList(), PoliciesBand() (+16 more)

### Community 4 - "compilerOptions"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+7 more)

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
- **58 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+53 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 70 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.tsx` to `sections.tsx`, `package.json`, `Home.tsx`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _58 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sections.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13548387096774195 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `App.tsx` to `sections.tsx`, `package.json`, `Home.tsx`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06653225806451613 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._
- **Should `prerender.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._