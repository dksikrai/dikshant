import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import HomePage from '@/pages/HomePage.jsx';
import { Toaster } from '@/components/ui/sonner';
import WhatsAppFloat from '@/components/WhatsAppFloat.jsx';
import CustomCursor from '@/components/CustomCursor.jsx';
import ScrollProgress from '@/components/ScrollProgress.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

/**
 * Preloader lives at the App level so it:
 * 1. Never re-triggers on route changes or HomePage re-mounts
 * 2. Uses sessionStorage so it runs exactly once per browser session
 *    (shows on first tab open, skipped on subsequent navigations/refreshes within the session)
 */
const PRELOADER_KEY = 'dg_preloader_shown';

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-5">
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-8 h-8 shrink-0"
            aria-hidden="true"
          >
            <path
              d="M8 6L2 12L8 18M16 6L22 12L16 18M14 3L10 21"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Dikshant<span className="text-primary">.</span>
        </motion.p>

        {/* Progress bar */}
        <div className="w-32 h-0.5 bg-muted rounded-full overflow-hidden relative">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(() => {
    // Only show preloader if this session hasn't seen it yet
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem(PRELOADER_KEY);
    }
    return false;
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem(PRELOADER_KEY, '1');
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      <Router>
        <CustomCursor />
        <ScrollProgress />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Toaster position="bottom-right" richColors />
        <WhatsAppFloat />
      </Router>
      <Analytics />
    </>
  );
}

export default App;
