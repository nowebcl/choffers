import React from 'react';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { CHOFFERS_PHONE_NUMBER, CHOFFERS_DISPLAY_PHONE, CHOFFERS_ALT_PHONE } from '../data/pricingData';

export default function Header({ currentView, setCurrentView }) {
  return (
    <header className="bg-white border border-neutral-200/90 rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      
      {/* Brand & Logo */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/Recurso-3.webp" 
            alt="Choffers Puerto Varas" 
            className="h-8 sm:h-9 w-auto object-contain select-none cursor-pointer"
            onClick={() => setCurrentView('booking')}
          />
          <div className="border-l border-neutral-200 pl-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-neutral-900 tracking-tight">
                Choffers
              </span>
              <span className="bg-[#fcbf27]/20 text-[#855e00] font-semibold text-[10px] px-2 py-0.5 rounded-full">
                Puerto Varas
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 hidden sm:block">
              Radio Taxis, Transfers Aeropuerto PMC & Tours Privados
            </p>
          </div>
        </div>

        {/* Mobile WhatsApp shortcut */}
        <a
          href={`https://wa.me/${CHOFFERS_PHONE_NUMBER}?text=${encodeURIComponent('Hola Choffers.cl, deseo consultar por un traslado o tour.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden p-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[#0c0302] hover:bg-neutral-100 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
        </a>
      </div>

      {/* Right Action Pills */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
        
        {/* Live status badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Disponible 24/7 en Los Lagos</span>
        </div>

        {/* Call button */}
        <a
          href={`tel:+${CHOFFERS_PHONE_NUMBER}`}
          className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-medium transition-colors cursor-pointer text-[11px]"
        >
          <Phone className="w-3.5 h-3.5 text-neutral-500" />
          <span>Llamar</span>
        </a>

        {/* WhatsApp Direct Pill */}
        <a
          href={`https://wa.me/${CHOFFERS_PHONE_NUMBER}?text=${encodeURIComponent('Hola Choffers.cl, deseo coordinar un servicio de traslado.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0c0302] hover:bg-[#1f1a19] text-white font-medium text-[11px] transition-colors cursor-pointer shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          <span>WhatsApp Directo</span>
          <span className="hidden lg:inline text-neutral-300 font-normal">| {CHOFFERS_DISPLAY_PHONE}</span>
        </a>

      </div>

    </header>
  );
}
