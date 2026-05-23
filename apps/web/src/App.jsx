
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import HomePage from '@/pages/HomePage.jsx';
import { Toaster } from '@/components/ui/sonner';
import WhatsAppFloat from '@/components/WhatsAppFloat.jsx';
import CustomCursor from '@/components/CustomCursor.jsx';
import ScrollProgress from '@/components/ScrollProgress.jsx';

function App() {
  return (
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
  );
}

export default App;
