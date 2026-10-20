import React from 'react';
import { Phone } from 'lucide-react';
import { CHOFFERS_PHONE_NUMBER, CHOFFERS_DISPLAY_PHONE } from '../data/pricingData';

export default function Header({ setCurrentView }) {
  return (
    <header className="bg-white border border-neutral-200/90 rounded-2xl px-4 py-3 shadow-xs flex items-center justify-between">
      
      {/* Solamente el Logo */}
      <button
        type="button"
        onClick={() => setCurrentView('booking')}
        className="focus:outline-none cursor-pointer"
        title="Inicio Choffers"
      >
        <img 
          src="/Recurso-3.webp" 
          alt="Choffers" 
          className="h-8 sm:h-9 w-auto object-contain select-none"
        />
      </button>

      {/* Solamente el botón Llamar */}
      <a
        href={`tel:+${CHOFFERS_PHONE_NUMBER}`}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold transition-colors cursor-pointer text-xs shadow-2xs"
      >
        <Phone className="w-3.5 h-3.5 text-neutral-600" />
        <span>Llamar</span>
        <span className="hidden sm:inline text-neutral-400 font-normal">| {CHOFFERS_DISPLAY_PHONE}</span>
      </a>

    </header>
  );
}
