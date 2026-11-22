/**
 * Lets any CTA on the page jump to the contact form with the inquiry type / subject pre-filled.
 * ContactSection is lazy-loaded, so the intent is also stored and read on mount.
 */
let pending = null;

export const consumeContactIntent = () => {
  const p = pending;
  pending = null;
  return p;
};

export const startInquiry = ({ inquiry = 'Consulting', subject = '' } = {}) => {
  pending = { inquiry, subject };
  window.dispatchEvent(new CustomEvent('contact:prefill', { detail: pending }));
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
};
