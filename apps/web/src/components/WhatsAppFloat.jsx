import React, { useState, useEffect } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { siteConfig } from '@/config/site.js';

const WHATSAPP_URL = siteConfig.whatsappUrl;


const WhatsAppFloat = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem('whatsapp_tooltip_dismissed') === 'true';
    } catch {
      return false; // storage can be blocked (e.g. Safari private mode)
    }
  });

  useEffect(() => {
    if (!dismissed) {
      const show = setTimeout(() => setShowTooltip(true), 3500);
      const hide = setTimeout(() => setShowTooltip(false), 12000); // don't linger over content
      return () => { clearTimeout(show); clearTimeout(hide); };
    }
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    try { localStorage.setItem('whatsapp_tooltip_dismissed', 'true'); } catch { /* ignore */ }
  };

  return (
    <aside aria-label="Contact shortcut" className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-[999] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="relative hidden sm:block pointer-events-auto glass-surface rounded-2xl p-3 sm:p-4 w-[180px] sm:w-auto sm:max-w-[220px]"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-1 right-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-xs sm:text-sm font-medium text-foreground mb-1 pr-4">Let's talk about your project</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
              Message me on WhatsApp. I typically reply within 1 hour.
            </p>
            {/* Arrow */}
            <div className="absolute bottom-[-7px] right-6 sm:right-8 w-3.5 h-3.5 bg-[hsl(222_26%_16%)] border-r border-b border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Float button — entrance animation only, no perpetual bounce */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] border border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_24px_-6px_rgba(0,0,0,0.5)] flex items-center justify-center text-white relative select-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 1.8 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleDismiss}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {/* Online indicator — static, no animation */}
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-[hsl(var(--background))]" aria-hidden="true" />
      </motion.a>
    </aside>
  );
};

export default WhatsAppFloat;
