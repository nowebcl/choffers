import React from 'react';
import { MessageCircle, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { CHOFFERS_PHONE_NUMBER, CHOFFERS_DISPLAY_PHONE } from '../utils/formatters';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 pt-12 pb-8 text-slate-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200/70">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center text-white font-bold">
                <span className="text-blue-400 font-extrabold text-sm">CH</span>
              </div>
              <span className="text-base font-extrabold text-navy-950 tracking-tight">
                CHOFFERS • Puerto Varas
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Servicio de transfer privado, traslados corporativos y excursiones turísticas exclusivas en Puerto Varas, Llanquihue, Frutillar y toda la Región de Los Lagos.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Conductores con licencia profesional y seguro de pasajeros</span>
            </div>
          </div>

          {/* Col 2: Cobertura */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950">
              Zonas de Cobertura
            </h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>• Aeropuerto El Tepual (PMC)</li>
              <li>• Puerto Varas Centro & Costanera</li>
              <li>• Frutillar Bajo & Teatro del Lago</li>
              <li>• Saltos del Petrohué & Ensenada</li>
              <li>• Puerto Octay & Las Cascadas</li>
              <li>• Isla Grande de Chiloé</li>
            </ul>
          </div>

          {/* Col 3: Contacto Directo */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy-950">
              Atención 24/7
            </h4>
            <div className="space-y-2 text-slate-600">
              <a
                href={`https://wa.me/${CHOFFERS_PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-emerald-600 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp: {CHOFFERS_DISPLAY_PHONE}</span>
              </a>

              <a
                href={`tel:+${CHOFFERS_PHONE_NUMBER}`}
                className="flex items-center gap-2 hover:text-navy-950 transition"
              >
                <Phone className="w-4 h-4 text-slate-400" />
                <span>Llamadas: {CHOFFERS_DISPLAY_PHONE}</span>
              </a>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Puerto Varas, Región de Los Lagos</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} Choffers.cl (go.choffers.cl) — Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado con precisión minimalista para el Sur de Chile
          </p>
        </div>

      </div>
    </footer>
  );
}
