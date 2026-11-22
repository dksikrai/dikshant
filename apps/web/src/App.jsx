import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary.jsx';
import ScrollToTop from '@/components/ScrollToTop.jsx';

const HomePage = React.lazy(() => import('@/pages/HomePage.jsx'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage.jsx'));
const ServicesPage = React.lazy(() => import('@/pages/ServicesPage.jsx'));
const ServiceDetailPage = React.lazy(() => import('@/pages/ServiceDetailPage.jsx'));
const ResumePage = React.lazy(() => import('@/pages/ResumePage.jsx'));
import { Toaster } from '@/components/ui/sonner';
import WhatsAppFloat from '@/components/WhatsAppFloat.jsx';
import CustomCursor from '@/components/CustomCursor.jsx';
import ScrollProgress from '@/components/ScrollProgress.jsx';
import { MotionConfig, LazyMotion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { initGlassPointer } from '@/lib/glass.js';
import { IconContext } from 'react-icons';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  useEffect(() => initGlassPointer(), []);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={() => import('@/lib/motionFeatures.js').then((mod) => mod.default)}>
      <IconContext.Provider value={{ attr: { 'aria-hidden': 'true', focusable: 'false' } }}>
      <Router>
        <CustomCursor />
        <ScrollProgress />
        <ScrollToTop />
        <ErrorBoundary>
          <React.Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </React.Suspense>
        </ErrorBoundary>
        <Toaster position="bottom-right" richColors />
        <WhatsAppFloat />
      </Router>
      <Analytics />
      <SpeedInsights />
      </IconContext.Provider>
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
