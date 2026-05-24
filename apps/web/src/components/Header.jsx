
import React, { useState, useEffect } from 'react';
import { Menu, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import DarkModeToggle from './DarkModeToggle.jsx';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Career', href: '#career' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Projects', href: '#projects' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Pipeline', href: '#pipeline' },
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

            <button
              onClick={() => { const link = document.createElement('a'); link.href = '/resume.pdf'; link.download = 'Dikshant_Goyal_Resume.pdf'; link.click(); }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground border border-border/50 hover:border-primary/50 hover:text-primary smooth-transition"
            >
              <Download className="w-4 h-4" />
              Resume
            </button>

            <a
              href="https://wa.me/919829641370?text=Hi%20Dikshant%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20hire%20you!"
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
              <SheetContent side="right" className="w-[300px] bg-background border-l border-border">
                <SheetTitle className="text-left mb-8">Menu</SheetTitle>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => scrollTo(link.href)}
                      className="px-4 py-3 rounded-xl text-left text-base font-semibold text-foreground hover:text-primary hover:bg-primary/10 smooth-transition w-full"
                    >
                      {link.name}
                    </button>
                  ))}
                  <Button 
                    onClick={() => { setIsOpen(false); const link = document.createElement('a'); link.href = '/resume.pdf'; link.download = 'Dikshant_Goyal_Resume.pdf'; link.click(); }}
                    variant="outline"
                    className="mt-4 w-full rounded-xl"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                  <a
                    href="https://wa.me/919829641370?text=Hi%20Dikshant%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20love%20to%20hire%20you!"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="mt-2 w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 smooth-transition"
                  >
                    Hire Me on WhatsApp
                  </a>
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
