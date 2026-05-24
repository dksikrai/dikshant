
import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site.js';

const LogoMark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="w-4 h-4 shrink-0"
    aria-hidden="true"
  >
    <path
      d="M8 6L2 12L8 18M16 6L22 12L16 18M14 3L10 21"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const footerNavLinks = [
  { label: 'About',     href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Contact',   href: '#contact' },
];

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const socialLinks = [
  {
    id: 'footer-github',
    label: 'GitHub',
    href: siteConfig.links.github,
    icon: Github,
  },
  {
    id: 'footer-linkedin',
    label: 'LinkedIn',
    href: siteConfig.links.linkedin,
    icon: Linkedin,
  },
  {
    id: 'footer-twitter',
    label: 'Twitter / X',
    href: siteConfig.links.twitter,
    icon: Twitter,
  },
  {
    id: 'footer-email',
    label: 'Email',
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border/40 bg-background"
      aria-label="Site footer"
    >
      {/* ── Main footer row ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Left – Logo + tagline */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group focus-visible:outline-none w-fit"
              aria-label="Back to top"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                <LogoMark />
              </div>
              <span className="font-bold text-base tracking-tight">
                Dikshant Goyal<span className="text-primary">.</span>
              </span>
            </button>
            <p className="text-[0.8125rem] text-muted-foreground pl-0.5 max-w-[240px] leading-snug">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Center – Nav links */}
          <nav
            className="flex flex-wrap gap-x-6 gap-y-2"
            aria-label="Footer navigation"
          >
            {footerNavLinks.map((link) => (
              <button
                key={link.label}
                id={`footer-nav-${link.label.toLowerCase()}`}
                onClick={() => scrollTo(link.href)}
                className="text-[0.8125rem] font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right – Social icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ id, label, href, icon: Icon }) => (
              <a
                key={id}
                id={id}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-full border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/6 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-border/30 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.75rem] text-muted-foreground/60">
          <span>© {year} Dikshant Goyal</span>
          <span className="hidden sm:block">·</span>
          <span>Built with passion in Jaipur, India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
