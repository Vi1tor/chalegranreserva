import { SITE } from '../data/site';

interface ReservationInquiry {
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  notes: string;
}

function sanitizePhoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('55') && digits.length >= 12) return digits;
  if (digits.length >= 10 && digits.length <= 11) return `55${digits}`;
  return digits;
}

export function formatDatePtBr(isoDate: string): string {
  if (!isoDate) return '—';
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDaysIso(iso: string, days: number): string {
  const date = new Date(`${iso}T12:00:00`);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

export function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  const diff = Math.round((end.getTime() - start.getTime()) / 86_400_000);
  return diff > 0 ? diff : 0;
}

export function buildInquiryMessage(inquiry: ReservationInquiry): string {
  const nights = calculateNights(inquiry.checkIn, inquiry.checkOut);
  const lines = [
    `Olá! Gostaria de consultar a disponibilidade do *${SITE.name}* em Monte Verde.`,
    '',
    `*Check-in:* ${formatDatePtBr(inquiry.checkIn)}`,
    `*Check-out:* ${formatDatePtBr(inquiry.checkOut)}`,
    nights > 0 ? `*Diárias:* ${nights} ${nights === 1 ? 'noite' : 'noites'}` : null,
    `*Hóspedes:* ${inquiry.guests} ${inquiry.guests === 1 ? 'pessoa' : 'pessoas'}`,
    inquiry.guestName.trim() ? `*Nome:* ${inquiry.guestName.trim()}` : null,
    inquiry.notes.trim() ? `*Observações:* ${inquiry.notes.trim()}` : null,
    '',
    'Aguardo o retorno com disponibilidade e valores. Obrigado(a)!',
  ].filter((line): line is string => line !== null);
  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string, rawPhone: string = SITE.whatsappNumber): string | null {
  const phone = sanitizePhoneDigits(rawPhone);
  if (!phone) return null;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

const DEFAULT_GREETING = `Olá! Gostaria de saber mais sobre o ${SITE.name} em Monte Verde.`;

/** Link de contato principal: WhatsApp quando configurado, senão Instagram. */
export function whatsappLink(message = DEFAULT_GREETING): string {
  return buildWhatsAppUrl(message) ?? SITE.instagramUrl;
}
