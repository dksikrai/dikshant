import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

/** Shared chrome for the non-home pages: skip link, header, <main>, footer. */
const PageShell = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[10000] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      Skip to content
    </a>
    <Header />
    <main id="main" tabIndex={-1} className="flex-grow relative z-10 focus:outline-none pt-28 md:pt-32">
      {children}
    </main>
    <Footer />
  </div>
);

export const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="mb-6">
    <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground m-0 p-0 list-none">
      {items.map((it, i) => (
        <li key={it.label} className="flex items-center gap-1.5">
          {it.to ? (
            <Link to={it.to} className="hover:text-foreground transition-colors">
              {it.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-foreground/80">{it.label}</span>
          )}
          {i < items.length - 1 && <span aria-hidden="true">/</span>}
        </li>
      ))}
    </ol>
  </nav>
);

export default PageShell;
