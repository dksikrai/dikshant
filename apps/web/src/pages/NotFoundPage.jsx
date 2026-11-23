import React from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '@/lib/seo.js';
import { Home } from 'lucide-react';
import { FadeIn } from '@/lib/motion.jsx';
import { LostPathArt } from '@/components/Illustrations.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const NotFoundPage = () => {
  useSeo('/404');
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow flex items-center justify-center relative z-10 py-24 overflow-hidden">

        <div className="site-container z-10"><div className="max-w-xl mx-auto text-center">
          <FadeIn>
            <div className="mb-6"><LostPathArt /></div>
            <div className="mb-4 sm:mb-8">
              <span className="font-medium text-muted-foreground/40 leading-none" style={{ fontSize: 'clamp(6rem, 25vw, 12rem)' }}>
                404
              </span>
            </div>
            
            <h1 className="font-medium tracking-tight text-foreground mb-4 leading-tight" style={{ fontSize: 'clamp(1.75rem, 6vw, 3rem)' }}>
              Page not found
            </h1>
            
            <p className="text-muted-foreground mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0" style={{ fontSize: 'clamp(1rem, 3.5vw, 1.25rem)' }}>
              This page doesn't exist or has moved.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-foreground text-background text-base font-medium hover:bg-foreground/90 active:scale-[0.98] transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to home
            </Link>
          </FadeIn>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
