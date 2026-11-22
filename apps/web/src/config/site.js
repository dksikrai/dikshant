/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  EDIT YOUR CONTACT DETAILS HERE, AND ONLY HERE.
 *
 *  Change PHONE or EMAIL below and every place on the site updates itself:
 *  contact form, WhatsApp button, header, footer, contact section, resume page,
 *  structured data (JSON-LD), prerendered HTML and llms.txt.
 *
 *  PHONE: international format with country code, e.g. "+919829641370".
 *  (resume.pdf is a separate file: re-export the PDF if the number changes.)
 * ═══════════════════════════════════════════════════════════════════════════
 */
const PHONE = '+919829641370';
const EMAIL = 'webwithdikshant@gmail.com';

/**
 * BOOKING_URL: your Cal.com / Calendly link, e.g. "https://cal.com/yourname/20min".
 * Leave it empty and the "Book a call" buttons send a WhatsApp request for a call instead.
 */
const BOOKING_URL = '';

const digits = PHONE.replace(/\D/g, '');

/** "+919829641370" -> "+91 98296 41370" (Indian format); other countries stay as typed. */
const formatPhone = (p) => {
  const d = p.replace(/\D/g, '');
  return p.startsWith('+91') && d.length === 12 ? `+91 ${d.slice(2, 7)} ${d.slice(7)}` : p;
};

const CALL_REQUEST_TEXT = "Hi Dikshant, I'd like to book a 20-minute call to discuss a project. When are you free?";
const DEFAULT_WHATSAPP_TEXT = "Hi Dikshant, I saw your portfolio and I'd like to discuss a project with you!";

export const siteConfig = {
  name: 'Dikshant Goyal',
  tagline: 'Full-Stack Developer & Technical Consultant. Web apps, APIs, AI automation and cloud, built end to end.',
  headline: 'I build scalable backend systems, AI workflows & production-ready SaaS platforms.',
  location: 'Jaipur, India (IST)',

  // ── Contact (derived from PHONE / EMAIL above) ──
  email: EMAIL,
  phone: PHONE,
  phoneDisplay: formatPhone(PHONE),
  telUrl: `tel:${PHONE}`,
  mailtoUrl: `mailto:${EMAIL}`,
  /** wa.me link that opens WhatsApp with a pre-filled message. */
  whatsappUrlFor: (text = DEFAULT_WHATSAPP_TEXT) => `https://wa.me/${digits}?text=${encodeURIComponent(text)}`,
  whatsappUrl: `https://wa.me/${digits}?text=${encodeURIComponent(DEFAULT_WHATSAPP_TEXT)}`,
  mailtoFor: ({ subject = '', body = '' } = {}) =>
    `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,

  // ── Book a call ──
  hasBooking: Boolean(BOOKING_URL),
  bookingUrl: BOOKING_URL || `https://wa.me/${digits}?text=${encodeURIComponent(CALL_REQUEST_TEXT)}`,

  links: {
    linkedin: 'https://in.linkedin.com/in/csdikshant',
    github: 'https://github.com/dksikrai',
    twitter: 'https://twitter.com/csdikshant',
    instagram: 'https://instagram.com/dksikrai',
  },
  resume: '/resume.pdf',
  resumeFilename: 'Dikshant_Goyal_Resume.pdf',
};
