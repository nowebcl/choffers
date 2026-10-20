import React from 'react';
import { Car, Compass, ShieldCheck, Clock, Plane, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Hero({ activeTab, setActiveTab }) {
  return (
    <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      
      {/* Top pill badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60 text-blue-700 text-xs font-semibold tracking-wide uppercase mb-4 shadow-subtle">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        <span>Servicio Ejecutivo & Turístico • Puerto Varas</span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-950 tracking-tight leading-[1.15] max-w-3xl mx-auto">
        Reserva tu traslado o tour privado en el sur de Chile
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed">
        Puntualidad garantizada, vehículos de alta gama y conductores profesionales en Puerto Varas y alrededores.
      </p>

      {/* Trust Badges Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-600 font-medium">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>Vuelos monitoreados 24/7</span>
        </div>
        <div className="hidden sm:inline text-slate-300">•</div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>Vehículos climatizados y sanitizados</span>
        </div>
        <div className="hidden sm:inline text-slate-300">•</div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>Sillas infantiles sin costo</span>
        </div>
      </div>

      {/* Segmented Control / Main Mode Switcher */}
      <div className="mt-8 sm:mt-10 inline-flex p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 shadow-inner max-w-xl w-full">
        <button
          type="button"
          onClick={() => setActiveTab('transfer')}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeTab === 'transfer'
              ? 'bg-white text-navy-950 shadow-sm ring-1 ring-black/5'
              : 'text-slate-600 hover:text-navy-900 hover:bg-white/40'
          }`}
        >
          <Car className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'transfer' ? 'text-blue-600' : 'text-slate-500'}`} />
          <span>Agendar Transfer / Aeropuerto</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tour')}
          className={`flex-1 flex items-center justify-center gap-2.5 py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
            activeTab === 'tour'
              ? 'bg-white text-navy-950 shadow-sm ring-1 ring-black/5'
              : 'text-slate-600 hover:text-navy-900 hover:bg-white/40'
          }`}
        >
          <Compass className={`w-4 h-4 sm:w-5 sm:h-5 ${activeTab === 'tour' ? 'text-blue-600' : 'text-slate-500'}`} />
          <span>Agendar Tour Turístico</span>
        </button>
      </div>

    </section>
  );
}
