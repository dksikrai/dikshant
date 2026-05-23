
import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import HomePage from '@/pages/HomePage.jsx';
import { Toaster } from '@/components/ui/sonner';
import WhatsAppFloat from '@/components/WhatsAppFloat.jsx';
import CustomCursor from '@/components/CustomCursor.jsx';
import ScrollProgress from '@/components/ScrollProgress.jsx';

// Detect iOS Safari — it has a broken IntersectionObserver with framer-motion whileInView
const isIOSSafari = () => {
  if (typeof window === 'undefined') return false;
  const ua = window.navigator.userAgent;
  return /iP(hone|od|ad)/.test(ua) && /WebKit/.test(ua) && !/CriOS|FxiOS/.test(ua);
};

function App() {
  const [iosDevice, setIosDevice] = useState(false);

  useEffect(() => {
    setIosDevice(isIOSSafari());
  }, []);

  return (
    <MotionConfig reducedMotion={iosDevice ? 'always' : 'never'}>
      <Router>
        <CustomCursor />
        <ScrollProgress />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Catch-all route to redirect 404s to home page where smooth scrolling anchors exist */}
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Toaster position="bottom-right" richColors />
        <WhatsAppFloat />
      </Router>
    </MotionConfig>
  );
}

export default App;
