import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Download, MapPin } from 'lucide-react';
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

const connectLinks = [
  { id: 'footer-github',   label: 'GitHub',      href: siteConfig.links.github,   icon: Github },
  { id: 'footer-linkedin', label: 'LinkedIn',    href: siteConfig.links.linkedin, icon: Linkedin },
  { id: 'footer-twitter',  label: 'Twitter / X', href: siteConfig.links.twitter,  icon: Twitter },
  { id: 'footer-email',    label: 'Email',       href: `mailto:${siteConfig.email}`, icon: Mail },
];

const ColumnTitle = ({ children }) => (
  <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
    {children}
  </h2>
);

const linkClass =
  'group flex min-h-11 items-center gap-2.5 rounded-lg text-sm font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:text-primary';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="relative px-3 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-10 sm:px-6 sm:pb-[calc(2.5rem+env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto max-w-6xl glass-card rounded-[1.75rem] p-5 sm:p-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-[1.3fr_0.8fr_1.4fr_0.9fr]">
          {/* Brand: full width on phones */}
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
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

            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{siteConfig.tagline}</p>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full glass-pill px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="status-dot" />
                Open to consulting
              </span>
              <Button asChild variant="glass" size="sm" className="h-11 rounded-full px-4 text-xs font-semibold">
                <a href={siteConfig.resume} download={siteConfig.resumeFilename}>
                  <Download />
                  Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigation">
            <ColumnTitle>Navigate</ColumnTitle>
            <ul>
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
            <ul>
              {services.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <ColumnTitle>Connect</ColumnTitle>
            <ul>
              {connectLinks.map(({ id, label, href, icon: Icon }) => (
                <li key={id}>
                  <a
                    id={id}
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
            <p className="text-muted-foreground">&copy; {year} Dikshant Goyal</p>
            <p className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3" aria-hidden="true" />
              {siteConfig.location}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex h-11 items-center gap-2 rounded-full glass-pill px-4 text-xs font-semibold text-foreground/85 transition-colors hover:bg-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
