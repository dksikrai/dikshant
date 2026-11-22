import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUp, ArrowRight, Download, MapPin, MessageCircle } from 'lucide-react';
import { m as motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site.js';
import { services } from '@/config/offer.js';
import { navLinks, NavEntry } from '@/lib/nav.jsx';

const LogoMark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] shrink-0" aria-hidden="true">
    <path d="M8 6L2 12L8 18M16 6L22 12L16 18M14 3L10 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const socialIcons = [
  { id: 'github', label: 'GitHub', href: siteConfig.links.github, icon: Github },
  { id: 'linkedin', label: 'LinkedIn', href: siteConfig.links.linkedin, icon: Linkedin },
  { id: 'twitter', label: 'Twitter / X', href: siteConfig.links.twitter, icon: Twitter },
  { id: 'whatsapp', label: 'WhatsApp', href: siteConfig.whatsappUrl, icon: MessageCircle },
  { id: 'email', label: 'Email', href: siteConfig.mailtoUrl, icon: Mail },
];

const ColumnTitle = ({ children }) => (
  <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
    {children}
  </h2>
);

const linkClass =
  'group flex min-h-10 sm:min-h-11 items-center gap-2.5 rounded-lg text-[0.8125rem] sm:text-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:text-primary';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="relative pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-10 sm:pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
    >
      <div className="site-container">
        <div className="glass-card rounded-[1.75rem] p-5 sm:p-8">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-[1.3fr_0.8fr_1.3fr_0.9fr] md:gap-x-8 md:gap-y-8">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex min-h-11 w-fit items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                aria-label="Dikshant Goyal, home"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl glass-pill text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <LogoMark />
                </span>
                <span className="text-lg font-bold tracking-tight">
                  Dikshant Goyal<span className="text-primary">.</span>
                </span>
              </Link>

              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground m-0">{siteConfig.tagline}</p>

              <span className="inline-flex w-fit items-center gap-2 rounded-full glass-pill px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="status-dot" />
                Available for consulting &amp; new projects
              </span>

              <div className="flex gap-2.5">
                <Button asChild className="h-12 flex-1 rounded-full px-5 font-semibold shadow-lg shadow-primary/30 sm:h-11 sm:flex-none sm:px-6">
                  <Link to="/#contact">
                    <span className="sm:hidden">Book a Call</span>
                    <span className="hidden sm:inline">Book a Consultation</span>
                    <ArrowRight strokeWidth={2.5} />
                  </Link>
                </Button>
                <Button asChild variant="glass" className="h-12 rounded-full px-5 font-semibold sm:h-11">
                  <a href={siteConfig.resume} download={siteConfig.resumeFilename}>
                    <Download />
                    Resume
                  </a>
                </Button>
              </div>

              {/* Social icons: phones only (desktop shows the labelled Connect list) */}
              <ul className="m-0 flex list-none gap-2.5 p-0 md:hidden" aria-label="Social links">
                {socialIcons.map(({ id, label, href, icon: Icon }) => (
                  <li key={id}>
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full glass-pill text-foreground/80 transition active:scale-95 active:bg-white/[0.14]"
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigate */}
            <nav aria-label="Footer navigation">
              <ColumnTitle>Navigate</ColumnTitle>
              <ul className="m-0 grid list-none grid-cols-2 gap-x-4 p-0 md:grid-cols-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavEntry link={link} id={`footer-nav-${link.name.toLowerCase()}`} className={`${linkClass} w-full text-left`}>
                      {link.name}
                    </NavEntry>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Services (internal links for users and crawlers) */}
            <nav aria-label="Services">
              <ColumnTitle>Services</ColumnTitle>
              <ul className="m-0 grid list-none grid-cols-2 gap-x-4 p-0 md:grid-cols-1">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link to={`/services/${s.id}`} className={linkClass}>
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect: desktop only */}
            <div className="hidden md:block">
              <ColumnTitle>Connect</ColumnTitle>
              <ul className="m-0 list-none p-0">
                {socialIcons.map(({ id, label, href, icon: Icon }) => (
                  <li key={id}>
                    <a
                      id={`footer-${id}`}
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-foreground/50 transition-colors group-hover:text-primary" aria-hidden="true" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-6 bg-white/[0.08]" />

          {/* Bottom bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="m-0 leading-normal">&copy; {year} Dikshant Goyal</p>
              <p className="m-0 flex items-center gap-1.5 leading-normal">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                {siteConfig.location}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex h-11 shrink-0 items-center gap-2 rounded-full glass-pill px-4 text-xs font-semibold text-foreground/85 transition-colors hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Back to top
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
