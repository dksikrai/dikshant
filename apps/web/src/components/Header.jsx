
import React, { useState, useEffect } from 'react';
import { Menu, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle.jsx';
import { siteConfig } from '@/config/site.js';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Career', href: '#career' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 smooth-transition ${
        isScrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-3 group" aria-label="Scroll to top">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground smooth-transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5 shrink-0">
                <defs>
                  <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <path d="M8 6L2 12L8 18M16 6L22 12L16 18M14 3L10 21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#logo-glow)" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">
              Dikshant<span className="text-primary">.</span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-background/60 backdrop-blur-md px-2 py-1 rounded-full border border-border/60 shadow-sm">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 rounded-full text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-primary/10 smooth-transition"
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <DarkModeToggle />

            <a
              href="/resume.pdf"
              download="Dikshant_Goyal_Resume.pdf"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-primary smooth-transition"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>

            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 smooth-transition shadow-md shadow-primary/20"
            >
              Hire Me
            </a>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[360px] bg-background/80 backdrop-blur-2xl border-l border-white/10 dark:border-white/5 flex flex-col h-full sm:max-h-screen">
                <SheetTitle className="text-left mb-6 mt-4 text-3xl font-bold text-gradient-primary tracking-tight">Menu</SheetTitle>
                <nav className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pb-16 pt-2">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="flex flex-col gap-2"
                  >
                    {navLinks.map((link) => (
                      <motion.button
                        key={link.name}
                        onClick={() => scrollTo(link.href)}
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                        }}
                        className="px-4 py-4 rounded-xl text-left text-2xl font-extrabold text-foreground/80 hover:text-foreground hover:bg-primary/5 smooth-transition w-full flex items-center justify-between group tracking-tight"
                      >
                        {link.name}
                        <span className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 smooth-transition">→</span>
                      </motion.button>
                    ))}
                  </motion.div>
                  
                  <div className="mt-auto mb-8 flex flex-col gap-4">
                    <a 
                      href="/resume.pdf"
                      download="Dikshant_Goyal_Resume.pdf"
                      className="w-full rounded-2xl flex items-center justify-center border border-border/50 bg-card/50 backdrop-blur-md hover:border-primary/50 hover:text-primary h-14 px-4 py-2 text-base font-bold shadow-sm premium-shadow smooth-transition"
                    >
                      <Download className="w-5 h-5 mr-3 text-primary" />
                      Download Resume
                    </a>
                    <a
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center gap-3 h-14 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-lg premium-shadow shadow-primary/20 hover:from-primary/90 hover:to-primary active:scale-95 transition-all"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 shrink-0" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Hire Me
                    </a>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
