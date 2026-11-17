/**
 * Conteúdo do site do Chalé Gran Reserva. Tudo o que aparece nas páginas sai daqui.
 *
 * Fontes das informações públicas (pesquisa em 17/11/2026): anúncio no Booking.com
 * (antigo "Chalé em Monte Verde"), agregador minas-gerais-hotels.com e Google Hotels.
 * Itens marcados com CONFIRMAR precisam ser validados pelo proprietário.
 */

/** URL pública definitiva do site (sem barra no final). Definida em .env (VITE_SITE_URL). */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.chalegranreserva.com.br').replace(/\/$/, '');

export const SITE = {
  name: 'Chalé Gran Reserva',
  whatsappNumber: '16981356900',
  whatsappDisplay: '(16) 98135-6900',
  instagramHandle: '@chalegranreserva',
  instagramUrl: 'https://www.instagram.com/chalegranreserva/',
  bookingUrl: 'https://www.booking.com/hotel/br/chale-em-monte-verde-monte-verde.html',
  address: {
    street: 'Rua Um, 4', // CONFIRMAR
    neighborhood: 'Villas de Monte Verde',
    district: 'Monte Verde',
    city: 'Camanducaia',
    state: 'MG',
    country: 'BR',
  },
  mapsQuery: 'Chalé Gran Reserva, Rua Um 4, Villas de Monte Verde, Monte Verde, Camanducaia - MG',
} as const;

export const FULL_ADDRESS = `${SITE.address.street}, ${SITE.address.neighborhood}, ${SITE.address.district}, ${SITE.address.city} - ${SITE.address.state}`;

/* ------------------------------------------------------------------ */
/* Páginas do site (cada uma vira um HTML próprio no build)            */
/* ------------------------------------------------------------------ */

export type PageId = 'inicio' | 'chale' | 'galeria' | 'localizacao' | 'reservas' | 'duvidas' | '404';

interface PageMeta {
  id: PageId;
  path: string;
  /** Nome curto no menu e no breadcrumb. */
  label: string;
  title: string;
  description: string;
}

export const PAGES: PageMeta[] = [
  {
    id: 'inicio',
    path: '/',
    label: 'Início',
    title: 'Chalé em Monte Verde com lareira para 6 pessoas | Chalé Gran Reserva',
    description:
      'Chalé de madeira com lareira, 2 quartos e 2 banheiros, para até 6 pessoas, entre araucárias nas Villas de Monte Verde (MG). Reserve direto com o anfitrião pelo WhatsApp.',
  },
  {
    id: 'chale',
    path: '/o-chale/',
    label: 'O Chalé',
    title: 'O chalé: quartos, cozinha, lareira e comodidades | Chalé Gran Reserva',
    description:
      'Conheça os ambientes do Chalé Gran Reserva em Monte Verde: sala com lareira, 2 quartos, 2 banheiros, cozinha equipada, varanda, deck e jardim. Regras da casa e horários.',
  },
  {
    id: 'galeria',
    path: '/galeria/',
    label: 'Galeria',
    title: 'Fotos do chalé em Monte Verde | Chalé Gran Reserva',
    description:
      'Fotos reais do Chalé Gran Reserva: fachada de madeira entre araucárias, sala com lareira, quartos, cozinha, banheiros, deck e jardim em Monte Verde, MG.',
  },
  {
    id: 'localizacao',
    path: '/localizacao/',
    label: 'Localização',
    title: 'Localização e como chegar | Chalé Gran Reserva, Monte Verde',
    description:
      'O Chalé Gran Reserva fica nas Villas de Monte Verde, a cerca de 5 km do centro. Veja o mapa, as distâncias e o que fazer por perto.',
  },
  {
    id: 'reservas',
    path: '/reservas/',
    label: 'Reservas',
    title: 'Reservas pelo WhatsApp | Chalé Gran Reserva, Monte Verde',
    description:
      'Consulte datas e valores do Chalé Gran Reserva direto com o anfitrião pelo WhatsApp (16) 98135-6900. Check-in das 14h às 22h, check-out até 11h.',
  },
  {
    id: 'duvidas',
    path: '/duvidas/',
    label: 'Dúvidas',
    title: 'Perguntas frequentes | Chalé Gran Reserva, Monte Verde',
    description:
      'Quantas pessoas cabem, horários, pets, lareira, estacionamento e como reservar o Chalé Gran Reserva em Monte Verde.',
  },
  {
    id: '404',
    path: '/404',
    label: 'Página não encontrada',
    title: 'Página não encontrada | Chalé Gran Reserva',
    description: 'A página que você procurou não existe. Volte ao início do site do Chalé Gran Reserva.',
  },
];

export const NAV_PAGES = PAGES.filter((page) => !['inicio', 'reservas', '404'].includes(page.id));

export function pageByPath(pathname: string): PageMeta {
  const clean = pathname.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
  return (
    PAGES.find((page) => (page.path.replace(/\/+$/, '') || '/') === clean) ?? PAGES.find((page) => page.id === '404')!
  );
}

export function pagePath(id: PageId): string {
  return PAGES.find((page) => page.id === id)!.path;
}

/* ------------------------------------------------------------------ */
/* Conteúdo                                                            */
/* ------------------------------------------------------------------ */

export const RATINGS = [
  // CONFIRMAR: valores da pesquisa pública. Atualize quando mudarem.
  { platform: 'Booking.com', score: '9,6', scale: '/10', label: 'Excepcional', count: '30 avaliações', url: SITE.bookingUrl },
  {
    platform: 'Google',
    score: '4,9',
    scale: '/5',
    label: 'Excelente',
    count: '8 avaliações',
    url: 'https://www.google.com/search?q=Chal%C3%A9+Gran+Reserva+Monte+Verde',
  },
] as const;

export const HIGHLIGHTS = [
  { value: '6', label: 'hóspedes' },
  { value: '2', label: 'quartos' },
  { value: '2', label: 'banheiros' },
  { value: '1', label: 'lareira' },
] as const;

export type PhotoCategory = 'externo' | 'sala' | 'quartos' | 'cozinha' | 'banheiros';

export interface Photo {
  file: string;
  title: string;
  alt: string;
  category: PhotoCategory;
  width: number;
  height: number;
  /** Existe versão reduzida "-sm.webp" (800 px)? */
  hasSmall: boolean;
}

const p = (
  file: string,
  title: string,
  alt: string,
  category: PhotoCategory,
  width: number,
  height: number,
  hasSmall = true,
): Photo => ({ file, title, alt, category, width, height, hasSmall });

export const PHOTOS: Photo[] = [
  p('chale-fachada-araucarias', 'Fachada', 'Fachada do chalé de madeira com varanda no andar de cima, entre araucárias, em Monte Verde', 'externo', 899, 1599),
  p('sala-lareira', 'Sala com lareira', 'Sala revestida de madeira com lareira de pedra, lenha empilhada e TV', 'sala', 1024, 768),
  p('suite-casal', 'Quarto de casal', 'Cama de casal com colcha cinza sob o teto inclinado de madeira', 'quartos', 1024, 768),
  p('chale-varanda-entrada', 'Entrada', 'Varanda de entrada do chalé com porta de madeira, lampiões e banco', 'externo', 1599, 899),
  p('sala-estar', 'Sala de estar', 'Sala com sofás, poltronas e tapete, com janelas para a mata', 'sala', 1024, 768),
  p('cozinha-equipada', 'Cozinha', 'Bancada da cozinha com cooktop, airfryer, chaleira elétrica e micro-ondas, ao lado da geladeira', 'cozinha', 1280, 719),
  p('quarto-solteiros', 'Quarto com camas de solteiro', 'Quarto com teto inclinado de madeira, camas de solteiro e janela com cortina xadrez', 'quartos', 1280, 719),
  p('deck-madeira-mata', 'Deck', 'Deck de madeira com escada e guarda-corpo em X, junto à mata', 'externo', 1599, 899),
  p('sala-jantar', 'Mesa de jantar', 'Mesa de jantar de madeira com cadeiras, cristaleira e pratos decorativos na parede', 'sala', 1024, 768),
  p('banheiro-box', 'Banheiro', 'Banheiro com box de vidro e revestimento de pastilhas cinza', 'banheiros', 768, 1024),
  p('vista-varanda-serra', 'Vista da varanda', 'Vista da varanda de cima para o jardim e as montanhas', 'externo', 1599, 899),
  p('sala-poltronas-tv', 'Poltronas e lareira', 'Poltronas estampadas e sofá virados para a lareira de pedra', 'sala', 1599, 899),
  p('quarto-vista', 'Quarto com janela', 'Quarto com camas arrumadas e janela grande para fora', 'quartos', 899, 1599),
  p('cozinha-copa', 'Copa', 'Copa com bancada e janelas de madeira para o jardim', 'cozinha', 1599, 899),
  p('chale-jardim-escadaria', 'Jardim', 'Chalé visto do gramado, com escada de pedra subindo do jardim', 'externo', 576, 640, false),
  p('mesa-jantar', 'Canto do jantar', 'Mesa de jantar com vaso de flores e cristaleira de madeira', 'sala', 1599, 899),
  p('porta-vista-jardim', 'Porta para o jardim', 'Porta dupla de madeira aberta para o gramado e as montanhas', 'externo', 768, 1024),
  p('quarto-azul', 'Cama de solteiro', 'Cama de solteiro com colcha azul e toalhas dobradas', 'quartos', 899, 1599),
  p('banheiro-suite', 'Segundo banheiro', 'Segundo banheiro com box de vidro e gabinete de madeira', 'banheiros', 719, 1280),
  p('mezanino-sala', 'Sofá junto à escada', 'Sofá e poltronas ao lado da escada de madeira', 'sala', 1599, 899),
  p('cozinha-armario-rustico', 'Armário da cozinha', 'Armário rústico de madeira e geladeira na cozinha', 'cozinha', 1599, 899),
  p('escada-madeira', 'Escada', 'Escada de madeira com balaústres torneados', 'sala', 768, 1024),
  p('chale-jardim-flores', 'Margaridas', 'Margaridas no jardim com o chalé ao fundo', 'externo', 720, 1280),
  p('chale-portao-entrada', 'Portão', 'Portão de madeira branco com o chalé e as araucárias ao fundo', 'externo', 899, 1599),
];

export const PHOTO_CATEGORIES: { id: PhotoCategory | 'todas'; label: string }[] = [
  { id: 'todas', label: 'Todas' },
  { id: 'externo', label: 'Área externa' },
  { id: 'sala', label: 'Sala e jantar' },
  { id: 'quartos', label: 'Quartos' },
  { id: 'cozinha', label: 'Cozinha' },
  { id: 'banheiros', label: 'Banheiros' },
];

export const SPACES = [
  {
    id: 'sala',
    title: 'Sala com lareira',
    text: 'A sala é revestida de madeira e tem lareira de pedra, TV, sofás e poltronas. A mesa de jantar fica no mesmo ambiente e cabe o grupo todo.',
    image: 'sala-lareira',
    features: ['Lareira a lenha', 'TV de tela plana', 'Mesa de jantar', 'Piso de madeira'],
  },
  {
    id: 'quartos',
    title: 'Dois quartos',
    text: 'Os quartos têm teto inclinado de madeira e janela para a mata. Um tem cama de casal e o outro, camas de solteiro.',
    image: 'suite-casal',
    features: ['Quarto de casal', 'Camas de solteiro', 'Roupa de cama', 'Aquecimento'],
  },
  {
    id: 'cozinha',
    title: 'Cozinha equipada',
    text: 'Geladeira, cooktop, micro-ondas, airfryer, chaleira elétrica, louça e panelas. Dá para fazer todas as refeições sem sair de casa.',
    image: 'cozinha-equipada',
    features: ['Geladeira', 'Cooktop e micro-ondas', 'Airfryer e chaleira', 'Louça e panelas'],
  },
  {
    id: 'externo',
    title: 'Varanda, deck e jardim',
    text: 'Varanda no andar de cima com vista para a serra, deck de madeira junto à mata, jardim gramado e vaga para o carro dentro do terreno.',
    image: 'deck-madeira-mata',
    features: ['Varanda com vista', 'Deck de madeira', 'Jardim', 'Estacionamento'],
  },
] as const;

export type AmenityIcon =
  | 'flame'
  | 'wifi'
  | 'car'
  | 'utensils'
  | 'tv'
  | 'thermometer'
  | 'trees'
  | 'mountain'
  | 'paw'
  | 'smoke'
  | 'bath'
  | 'bed';

export const AMENITIES: { icon: AmenityIcon; title: string; text: string }[] = [
  { icon: 'flame', title: 'Lareira', text: 'A lenha, na sala' },
  { icon: 'wifi', title: 'Wi-Fi', text: 'Gratuito' },
  { icon: 'car', title: 'Estacionamento', text: 'No terreno, gratuito' },
  { icon: 'utensils', title: 'Cozinha equipada', text: 'Para todas as refeições' },
  { icon: 'tv', title: 'TV de tela plana', text: 'Com canais via satélite' },
  { icon: 'thermometer', title: 'Aquecimento', text: 'Para as noites frias' },
  { icon: 'bed', title: 'Roupa de cama', text: 'Nos dois quartos' },
  { icon: 'bath', title: '2 banheiros', text: 'Com box de vidro e toalhas' },
  { icon: 'mountain', title: 'Varanda', text: 'Com vista para a serra' },
  { icon: 'trees', title: 'Jardim e deck', text: 'Entre araucárias' },
  { icon: 'paw', title: 'Pets', text: 'Aceitos mediante consulta' },
  { icon: 'smoke', title: 'Não fumantes', text: 'Proibido fumar dentro' },
];

export const POLICIES = [
  { title: 'Check-in', text: 'Das 14h às 22h' },
  { title: 'Check-out', text: 'Até as 11h' },
  { title: 'Pets', text: 'Aceitos mediante consulta prévia' },
  { title: 'Fumo', text: 'Não é permitido fumar dentro do chalé' },
] as const;

export const NEARBY = [
  { name: 'Quadriventure (quadriciclo)', distance: '500 m' },
  { name: 'Vila Europa', distance: '600 m' },
  { name: 'Escola de Falcoaria', distance: '1,2 km' },
  { name: 'Portal de Monte Verde', distance: '4 km' },
  { name: 'Orquidário MV', distance: '4,6 km' },
  { name: 'Centro de Monte Verde', distance: 'cerca de 5 km' },
  { name: 'Aeroporto de Guarulhos', distance: '156 km' },
] as const;

export const EXPERIENCES = [
  { title: 'Gastronomia de serra', text: 'Fondues, trutas, vinhos e cafés nos restaurantes da Avenida Monte Verde.' },
  { title: 'Trilhas e mirantes', text: 'Caminhadas entre araucárias até pedras e mirantes da Serra da Mantiqueira.' },
  { title: 'Passeios ao ar livre', text: 'Quadriciclo, falcoaria e cavalgadas a poucos minutos do chalé.' },
] as const;

interface GuestReview {
  author: string;
  origin?: string;
  quote: string;
}

/** Depoimentos reais copiados do Booking, Google ou Instagram. Vazio = mostra só as notas. */
export const REVIEWS: GuestReview[] = [];

export const FAQS = [
  {
    q: 'Quantas pessoas cabem no chalé?',
    a: 'Até 6 pessoas. São 2 quartos (um de casal e um com camas de solteiro) e 2 banheiros.',
  },
  {
    q: 'Qual o horário de check-in e check-out?',
    a: 'O check-in é das 14h às 22h e o check-out até as 11h. Se precisar de outro horário, pergunte na hora de reservar.',
  },
  {
    q: 'Posso levar meu cachorro?',
    a: 'Pets são aceitos mediante consulta. Conte o porte e quantos são na mensagem de reserva.',
  },
  {
    q: 'O chalé tem lareira? E aquecimento?',
    a: 'Tem lareira a lenha na sala e aquecimento para as noites frias.',
  },
  {
    q: 'Onde estaciono?',
    a: 'Dentro do terreno do chalé. O estacionamento é gratuito.',
  },
  {
    q: 'Fica longe do centro de Monte Verde?',
    a: 'Cerca de 5 km, nas Villas de Monte Verde. De carro são poucos minutos até a Avenida Monte Verde.',
  },
  {
    q: 'Tem Wi-Fi?',
    a: 'Sim, o Wi-Fi é gratuito.',
  },
  {
    q: 'Como faço para reservar?',
    a: 'Mande as datas e o número de pessoas pelo WhatsApp (16) 98135-6900 ou use o formulário da página de reservas. O anfitrião responde com a disponibilidade, o valor e as formas de pagamento.',
  },
] as const;

export function img(file: string, small = false) {
  return `/images/${file}${small ? '-sm' : ''}.webp`;
}

export function photo(file: string): Photo {
  const found = PHOTOS.find((item) => item.file === file);
  if (!found) throw new Error(`Foto não encontrada: ${file}`);
  return found;
}
