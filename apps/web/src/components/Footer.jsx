
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Instagram, TerminalSquare } from 'lucide-react';

const WHATSAPP_URL = "https://wa.me/919829641370?text=Hi%20Dikshant%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20hire%20you!";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border relative overflow-hidden">
      {/* Top Hire Me strip */}
      <div className="bg-gradient-to-r from-[#25D366]/90 via-[#25D366] to-[#1ebe5d]/90 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-semibold text-base">
            🚀 <strong>Open for freelance projects</strong> — Laravel, SaaS, APIs & Automation
          </p>
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#25D366] font-bold text-sm shadow-lg hover:shadow-xl smooth-transition shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Hire Me Now
          </motion.a>
        </div>
      </div>

      {/* Main footer */}
      <div className="pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-4 h-4 shrink-0">
                    <defs>
                      <filter id="footer-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="1.2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <path d="M8 6L2 12L8 18M16 6L22 12L16 18M14 3L10 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#footer-glow)" />
                  </svg>
                </div>
                <span className="font-bold text-xl tracking-tight">Dikshant Goyal</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-sm">
                Senior Full-Stack Developer &amp; Architect in Jaipur, India. Designing high-performance React/Next.js frontends, secure Node.js/Laravel backends, and robust cloud infrastructures globally.
              </p>
              <div className="flex gap-3">
                <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
                  href="https://in.linkedin.com/in/csdikshant" target="_blank" rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-full bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary smooth-transition">
                  <Linkedin className="w-4 h-4" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
                  href="https://instagram.com/dksikrai" target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="p-2.5 rounded-full bg-background border border-border text-muted-foreground hover:text-accent hover:border-accent smooth-transition">
                  <Instagram className="w-4 h-4" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}
                  href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="p-2.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white smooth-transition">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </motion.a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a href="mailto:webwithdikshant@gmail.com" className="flex items-start gap-2.5 text-sm text-muted-foreground hover:text-primary smooth-transition group">
                    <Mail className="w-4 h-4 mt-0.5 group-hover:text-primary smooth-transition shrink-0" />
                    webwithdikshant@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919829641370" className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary smooth-transition group">
                    <Phone className="w-4 h-4 group-hover:text-primary smooth-transition shrink-0" />
                    +91 9829641370
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-sm text-[#25D366] hover:text-[#1ebe5d] smooth-transition font-medium group">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Me
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 shrink-0" />
                  Jaipur, India (IST)
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-foreground mb-5 text-sm uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-3">
                {[
                  { label: 'Career', href: '#career' },
                  { label: 'Expertise', href: '#expertise' },
                  { label: 'Projects', href: '#projects' },
                  { label: 'Skills', href: '#skills' },
                  { label: 'Contact', href: '#contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-muted-foreground hover:text-primary smooth-transition flex items-center gap-1.5 group">
                      <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 smooth-transition" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Dikshant Goyal. Crafted with precision &amp; passion.
            </p>
            <p className="text-xs text-muted-foreground/60 font-mono">
              React • Next.js • Node.js • Laravel • AWS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
