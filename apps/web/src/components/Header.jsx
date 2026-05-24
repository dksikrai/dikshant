
import React, { useState, useEffect } from 'react';
import { Menu, X, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site.js';

const navLinks = [
  { name: 'About',       href: '#about' },
  { name: 'Expertise',   href: '#expertise' },
  { name: 'Projects',    href: '#projects' },
  { name: 'AI',          href: '#ai-engineering' },
  { name: 'Contact',     href: '#contact' },
];

const LogoMark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    className="w-[18px] h-[18px] shrink-0"
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

const Header = () => {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = (href) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, mobileOpen ? 300 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── Logo ── */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group focus-visible:outline-none"
              aria-label="Back to top"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                <LogoMark />
              </div>
              <span className="font-bold text-[1.1rem] tracking-tight select-none">
                Dikshant Goyal<span className="text-primary">.</span>
              </span>
            </button>

            {/* ── Desktop Nav pill ── */}
            <nav
              className="hidden md:flex items-center gap-0.5 bg-background/60 backdrop-blur-md px-1.5 py-1 rounded-full border border-border/60 shadow-sm"
              aria-label="Primary navigation"
            >
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  id={`nav-${link.name.toLowerCase()}`}
                  onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 rounded-full text-[0.8125rem] font-medium text-foreground/65 hover:text-foreground hover:bg-primary/8 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">
              {/* Hire Me CTA */}
              <a
                id="header-hire-me-btn"
                href={`mailto:${siteConfig.email}`}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[0.8125rem] font-semibold border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-200"
              >
                Hire Me
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              {/* Mobile hamburger */}
              <Button
                id="mobile-menu-toggle"
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden rounded-full w-10 h-10 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-2xl md:hidden"
            aria-modal="true"
            role="dialog"
            aria-label="Mobile navigation"
          >
            {/* Top spacer so content clears header */}
            <div className="h-20 shrink-0" />

            <nav className="flex flex-col flex-1 px-6 pt-4 pb-10 overflow-y-auto">
              {/* Nav links */}
              <motion.ul
                className="flex flex-col gap-1 mb-auto"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    variants={{
                      hidden:  { opacity: 0, x: -16 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    <button
                      id={`mobile-nav-${link.name.toLowerCase()}`}
                      onClick={() => scrollTo(link.href)}
                      className="w-full text-left px-4 py-4 rounded-2xl text-2xl font-bold tracking-tight text-foreground/80 hover:text-foreground hover:bg-primary/6 flex items-center justify-between group transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      {link.name}
                      <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </button>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Bottom CTA cluster */}
              <motion.div
                className="mt-10 flex flex-col gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Download Resume */}
                <a
                  id="mobile-download-resume"
                  href={siteConfig.resume}
                  download={siteConfig.resumeFilename}
                  onClick={() => setMobileOpen(false)}
                  className="w-full h-14 flex items-center justify-center gap-2.5 rounded-2xl border border-border/60 bg-muted/40 backdrop-blur-sm text-base font-semibold text-foreground/80 hover:border-primary/50 hover:text-primary transition-all duration-200"
                >
                  <Download className="w-5 h-5 text-primary" />
                  Download Resume
                </a>

                {/* Hire Me */}
                <a
                  id="mobile-hire-me-btn"
                  href={`mailto:${siteConfig.email}`}
                  onClick={() => setMobileOpen(false)}
                  className="w-full h-14 flex items-center justify-center gap-2.5 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
                >
                  Hire Me
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
