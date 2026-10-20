import React from 'react';
import { CHOFFERS_DISPLAY_PHONE, CHOFFERS_EMAIL } from '../data/pricingData';

export default function FooterBar() {
  return (
    <footer className="max-w-5xl mx-auto px-3 sm:px-6 py-6 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-neutral-600">Choffers.cl</span>
        <span>•</span>
        <span>Radio Taxis & Turismo Privado en Puerto Varas</span>
      </div>

      <div className="flex items-center gap-4 text-neutral-500">
        <a 
          href="https://wa.me/56953917080" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-neutral-900 transition-colors"
        >
          WhatsApp: {CHOFFERS_DISPLAY_PHONE}
        </a>
        <span>•</span>
        <a 
          href={`mailto:${CHOFFERS_EMAIL}`} 
          className="hover:text-neutral-900 transition-colors"
        >
          {CHOFFERS_EMAIL}
        </a>
      </div>
    </footer>
  );
}
