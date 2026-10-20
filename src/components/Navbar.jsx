import React from 'react';
import { MessageCircle, Phone, ShieldCheck, MapPin } from 'lucide-react';
import { CHOFFERS_PHONE_NUMBER, CHOFFERS_DISPLAY_PHONE } from '../utils/formatters';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy-900 flex items-center justify-center text-white font-bold shadow-sm ring-1 ring-black/5">
            <span className="tracking-tighter text-lg font-extrabold text-blue-400">CH</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg text-navy-900 leading-none">
                CHOFFERS
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                • Puerto Varas
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 tracking-tight mt-0.5">
              Traslados & Turismo Privado
            </span>
          </div>
        </div>

        {/* Center Live Availability Badge (Hidden on smallest mobile, clean on tablet/desktop) */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-700 shadow-subtle">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Disponible 24/7 en Región de Los Lagos</span>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:+${CHOFFERS_PHONE_NUMBER}`}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-navy-900 transition-colors rounded-xl hover:bg-slate-50"
            title="Llamada telefónica inmediata"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>Llamar</span>
          </a>

          <a
            href={`https://wa.me/${CHOFFERS_PHONE_NUMBER}?text=${encodeURIComponent('Hola Choffers.cl, deseo consultar por un servicio de traslado/tour.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] ring-1 ring-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
            <span>WhatsApp Directo</span>
            <span className="hidden lg:inline text-slate-300 font-normal">| {CHOFFERS_DISPLAY_PHONE}</span>
          </a>
        </div>

      </div>
    </header>
  );
}
