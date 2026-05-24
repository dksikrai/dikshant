import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home } from 'lucide-react';
import { FadeIn } from '@/lib/motion.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>404 - Page Not Found | Dikshant Goyal</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="flex-grow flex items-center justify-center relative z-10 py-24 overflow-hidden">
        {/* Subtle static background gradients */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,hsl(var(--primary)/0.05),transparent_70%)]" />
        </div>

        <div className="max-w-xl mx-auto px-6 sm:px-8 text-center relative z-10 w-full">
          <FadeIn>
            <div className="mb-4 sm:mb-8">
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50 drop-shadow-sm leading-none" style={{ fontSize: 'clamp(6rem, 25vw, 12rem)' }}>
                404
              </span>
            </div>
            
            <h1 className="font-bold tracking-tight text-foreground mb-4 leading-tight" style={{ fontSize: 'clamp(1.75rem, 6vw, 3rem)' }}>
              Page Not Found
            </h1>
            
            <p className="text-muted-foreground mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0" style={{ fontSize: 'clamp(1rem, 3.5vw, 1.25rem)' }}>
              Sorry, the page you are looking for doesn't exist or has been moved. Let's get you back home.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-lg font-bold shadow-lg shadow-primary/20 hover:from-primary/90 hover:to-primary active:scale-95 transition-all"
            >
              <Home className="w-5 h-5" />
              Return Home
            </Link>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
