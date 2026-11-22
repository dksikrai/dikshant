import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Download, ArrowRight, ChevronRight, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { navLinks, NavEntry, useIsActive } from '@/lib/nav.jsx';
import { startInquiry } from '@/lib/contactIntent.js';
import { m as motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { siteConfig } from '@/config/site.js';
import { ease } from '@/lib/motion.jsx';
import { enableRefraction } from '@/lib/glass.js';

const socials = [
  { label: 'GitHub',   href: siteConfig.links.github,   icon: Github },
  { label: 'LinkedIn', href: siteConfig.links.linkedin, icon: Linkedin },
  { label: 'Twitter / X', href: siteConfig.links.twitter, icon: Twitter },
  { label: 'Email',    href: siteConfig.mailtoUrl, icon: Mail },
];

const LogoMark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] shrink-0" aria-hidden="true">
    <path d="M8 6L2 12L8 18M16 6L22 12L16 18M14 3L10 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Tracks which section is currently in the viewport band (scrollspy). */
const useActiveSection = (hrefs) => {
  const [active, setActive] = useState('');

  useEffect(() => {
    const targets = hrefs
      .map((h) => document.querySelector(h))
      .filter(Boolean);
    if (!targets.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    targets.forEach((t) => observer.observe(t));

    // Sections are lazy-loaded, so re-scan once they have had time to mount.
    const rescan = setTimeout(() => {
      hrefs.forEach((h) => {
        const el = document.querySelector(h);
        if (el && !targets.includes(el)) observer.observe(el);
      });
    }, 1500);

    return () => {
      clearTimeout(rescan);
      observer.disconnect();
    };
  }, [hrefs]);

  return active;
};

const hrefs = navLinks.filter((l) => l.href).map((l) => l.href);

const DesktopNavItem = ({ link, active }) => {
  const isActive = useIsActive(link, active);
  return (
    <NavEntry
      link={link}
      id={`nav-${link.name.toLowerCase()}`}
      aria-current={isActive ? 'true' : undefined}
      className={`relative px-4 py-2 rounded-full text-[0.8125rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
        isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative z-10">{link.name}</span>
    </NavEntry>
  );
};

const MobileNavItem = ({ link, active, mobileOpen }) => {
  const Icon = link.icon;
  const isActive = useIsActive(link, active);
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: ease.out } },
      }}
    >
      <SheetClose asChild>
        <NavEntry
          link={link}
          id={`mobile-nav-${link.name.toLowerCase()}`}
          aria-current={isActive ? 'true' : undefined}
          className={`group flex min-h-[3.5rem] w-full items-center gap-3.5 px-4 text-left text-[1.0625rem] font-semibold tracking-tight transition-colors duration-150 active:bg-white/[0.08] focus-visible:outline-none focus-visible:bg-white/[0.08] ${
            isActive ? 'bg-primary/15 text-foreground' : 'text-foreground/85'
          }`}
        >
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isActive ? 'bg-primary/25 text-primary' : 'bg-white/[0.07] text-foreground/70'}`}>
            <Icon className="h-4 w-4" />
          </span>
          <span className="flex-1">{link.name}</span>
          <ChevronRight className="h-4 w-4 text-foreground/35 transition-transform group-active:translate-x-0.5" />
        </NavEntry>
      </SheetClose>
    </motion.li>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(hrefs);
  const capsuleRef = useRef(null);

  // Real refraction on desktop Chromium; other browsers keep the CSS glass.
  useEffect(() => enableRefraction(capsuleRef.current, { bezel: 20, scale: 30 }), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: ease.out }}
      className="fixed top-0 left-0 right-0 z-50 pt-[calc(env(safe-area-inset-top)+0.625rem)] sm:pt-[calc(env(safe-area-inset-top)+0.875rem)] pointer-events-none"
    >
      <div className="site-container">
        {/* Floating liquid-glass capsule */}
        <div
          ref={capsuleRef}
          className={`pointer-events-auto flex items-center justify-between gap-2 rounded-full glass-pill pl-2 pr-1.5 py-1 transition-shadow duration-300 ${
            isScrolled ? 'shadow-2xl shadow-black/60' : ''
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
            aria-label="Dikshant Goyal, home"
          >
            <motion.div
              whileHover={{ rotate: -8, scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200"
            >
              <LogoMark />
            </motion.div>
            <span className="font-bold text-[1.1rem] tracking-tight select-none">
              Dikshant Goyal<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop nav with animated active pill */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <DesktopNavItem key={link.name} link={link} active={active} />
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">

            <Button
              asChild
              size="sm"
              className="hidden md:inline-flex rounded-full text-[0.8125rem] font-semibold shadow-md shadow-primary/30"
            >
              <a
                id="header-hire-me-btn"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  startInquiry({ inquiry: 'Consulting', subject: 'Consultation request' });
                }}
              >
                Book a Call
                <ArrowRight />
              </a>
            </Button>

            {/* Mobile menu — shadcn Sheet (focus trap, ESC, scroll lock handled by Radix) */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  id="mobile-menu-toggle"
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full w-11 h-11 hover:bg-primary/10 hover:text-primary"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              {/* Floating glass panel (not full-bleed) so the blurred page stays visible behind it */}
              <SheetContent
                side="right"
                showClose={false}
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="!inset-y-3 !left-3 !right-3 h-auto w-auto sm:!left-auto sm:w-[22rem] glass-sheet flex flex-col gap-5 overflow-y-auto rounded-[1.75rem] p-5 pt-[calc(1.25rem+env(safe-area-inset-top)*0.5)] pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl glass-pill text-primary">
                      <LogoMark />
                    </span>
                    <SheetTitle className="text-base font-bold tracking-tight">
                      Dikshant Goyal<span className="text-primary">.</span>
                    </SheetTitle>
                  </div>
                  <SheetClose asChild>
                    <Button variant="glass" size="icon" className="h-11 w-11 rounded-full" aria-label="Close menu">
                      <X />
                    </Button>
                  </SheetClose>
                </div>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>

                {/* iOS-style grouped list */}
                <nav aria-label="Mobile navigation">
                  <motion.ul
                    className="overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.06] divide-y divide-white/[0.07]"
                    initial="hidden"
                    animate={mobileOpen ? 'visible' : 'hidden'}
                    variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } } }}
                  >
                    {navLinks.map((link) => (
                      <MobileNavItem key={link.name} link={link} active={active} mobileOpen={mobileOpen} />
                    ))}
                  </motion.ul>
                </nav>

                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-2.5">
                    {socials.map(({ label, href, icon: SocialIcon }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith('mailto') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-11 w-11 items-center justify-center rounded-full glass-pill text-foreground/75 active:scale-95 active:bg-white/[0.14] transition"
                      >
                        <SocialIcon className="h-[18px] w-[18px]" />
                      </a>
                    ))}
                  </div>
                  <Button asChild variant="glass" className="h-12 rounded-2xl text-[0.9375rem] font-semibold">
                    <a id="mobile-download-resume" href={siteConfig.resume} download={siteConfig.resumeFilename}>
                      <Download className="text-primary" />
                      Download Resume
                    </a>
                  </Button>
                  <Button asChild className="h-12 rounded-2xl text-[0.9375rem] font-bold shadow-lg shadow-primary/30">
                    <a
                      id="mobile-hire-me-btn"
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileOpen(false);
                        setTimeout(() => startInquiry({ inquiry: 'Consulting', subject: 'Consultation request' }), 320);
                      }}
                    >
                      Book a Call
                      <ArrowRight />
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
