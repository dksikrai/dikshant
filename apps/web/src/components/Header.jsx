import React, { useState, useEffect } from 'react';
import { Menu, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
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

const navLinks = [
  { name: 'About',     href: '#about' },
  { name: 'Expertise', href: '#expertise' },
  { name: 'Projects',  href: '#projects' },
  { name: 'AI',        href: '#ai-engineering' },
  { name: 'Contact',   href: '#contact' },
];

const LogoMark = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] shrink-0" aria-hidden="true">
    <path d="M8 6L2 12L8 18M16 6L22 12L16 18M14 3L10 21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const scrollToHash = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
};

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

const hrefs = navLinks.map((l) => l.href);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(hrefs);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl"
            aria-label="Back to top"
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
          </button>

          {/* Desktop nav with animated active pill */}
          <nav
            className="hidden md:flex items-center gap-0.5 bg-background/60 backdrop-blur-md px-1.5 py-1 rounded-full border border-border/60 shadow-sm"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <button
                  key={link.name}
                  id={`nav-${link.name.toLowerCase()}`}
                  onClick={() => scrollToHash(link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-4 py-2 rounded-full text-[0.8125rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    isActive ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-primary/15 border border-primary/25"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden lg:inline-flex rounded-full text-[0.8125rem] text-foreground/70 hover:text-foreground"
            >
              <a id="header-resume-btn" href={siteConfig.resume} download={siteConfig.resumeFilename}>
                <Download />
                Resume
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:inline-flex rounded-full border-primary/40 bg-transparent text-primary text-[0.8125rem] font-semibold hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20"
            >
              <a id="header-hire-me-btn" href={`mailto:${siteConfig.email}`}>
                Hire Me
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
                  className="md:hidden rounded-full w-10 h-10 hover:bg-primary/10 hover:text-primary"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:max-w-sm bg-background/95 backdrop-blur-2xl flex flex-col">
                <SheetTitle className="text-left font-bold tracking-tight">
                  Dikshant Goyal<span className="text-primary">.</span>
                </SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>

                <nav className="flex flex-col flex-1 pt-6" aria-label="Mobile navigation">
                  <motion.ul
                    className="flex flex-col gap-1 mb-auto"
                    initial="hidden"
                    animate={mobileOpen ? 'visible' : 'hidden'}
                    variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
                  >
                    {navLinks.map((link) => (
                      <motion.li
                        key={link.name}
                        variants={{
                          hidden:  { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: ease.out } },
                        }}
                      >
                        <SheetClose asChild>
                          <button
                            id={`mobile-nav-${link.name.toLowerCase()}`}
                            // Wait for the sheet to unlock body scroll before scrolling.
                            onClick={() => setTimeout(() => scrollToHash(link.href), 320)}
                            className={`w-full text-left px-4 py-4 rounded-2xl text-2xl font-bold tracking-tight flex items-center justify-between group transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                              active === link.href ? 'text-primary bg-primary/10' : 'text-foreground/80 hover:text-foreground hover:bg-primary/5'
                            }`}
                          >
                            {link.name}
                            <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                          </button>
                        </SheetClose>
                      </motion.li>
                    ))}
                  </motion.ul>

                  <div className="mt-10 flex flex-col gap-3">
                    <Button asChild variant="outline" className="h-14 rounded-2xl text-base font-semibold">
                      <a id="mobile-download-resume" href={siteConfig.resume} download={siteConfig.resumeFilename}>
                        <Download className="text-primary" />
                        Download Resume
                      </a>
                    </Button>
                    <Button asChild className="h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/20">
                      <a id="mobile-hire-me-btn" href={`mailto:${siteConfig.email}`}>
                        Hire Me
                        <ArrowRight />
                      </a>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
