import React from 'react';
import { MapPin, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { POPULAR_ROUTES } from '../data/pricingData';
import { formatCLP } from '../utils/formatters';

export default function PopularRoutesGrid({ onSelectRoute }) {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Tarifas Transparentes & Fijas
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-3 tracking-tight">
          Rutas Frecuentes en la Región de Los Lagos
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Valores referenciales sin costos ocultos. Todos los traslados incluyen peajes, combustible y chofer exclusivo.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {POPULAR_ROUTES.map((route) => (
          <div
            key={route.id}
            className="group bg-white rounded-3xl border border-slate-200/90 p-5 shadow-card hover:shadow-card-hover hover:border-blue-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Badges */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/50">
                  {route.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {route.duration}
                </span>
              </div>

              {/* Route Titles */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                  <p className="text-xs font-medium text-slate-500 truncate">
                    {route.originName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-navy-900 flex-shrink-0"></span>
                  <h3 className="text-sm sm:text-base font-bold text-navy-950 truncate">
                    {route.destName}
                  </h3>
                </div>
              </div>

              {/* Note */}
              <p className="text-[11px] text-slate-500 mb-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
                {route.note}
              </p>

              {/* Pricing Breakdown preview */}
              <div className="space-y-1.5 py-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">SUV Ejecutiva (1-3 pax):</span>
                  <span className="font-bold text-navy-900">{formatCLP(route.priceSUV)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Van Confort (4-7 pax):</span>
                  <span className="font-bold text-navy-900">{formatCLP(route.priceVan)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400">
                  <span>Minibus (8-15 pax):</span>
                  <span>{formatCLP(route.priceMinibus)}</span>
                </div>
              </div>
            </div>

            {/* Select Button */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onSelectRoute(route)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-navy-900 text-slate-700 hover:text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 hover:border-transparent transition-all duration-150"
              >
                <span>Agendar esta ruta</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
