import React from 'react';
import { Users, Briefcase, Wifi, Shield, CheckCircle2, Snowflake } from 'lucide-react';
import { FLEET_OPTIONS } from '../data/pricingData';

export default function FleetShowcase() {
  return (
    <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Flota Ejecutiva
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-3 tracking-tight">
          Vehículos Diseñados para tu Comodidad
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Unidades modernas, sanitizadas y climatizadas para enfrentar el clima austral con total seguridad.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FLEET_OPTIONS.map((fleet) => (
          <div
            key={fleet.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-navy-900 bg-slate-100 px-3 py-1 rounded-full">
                  {fleet.tag}
                </span>
                <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                  <Snowflake className="w-3.5 h-3.5" /> Climatizado
                </span>
              </div>

              <h3 className="text-lg font-bold text-navy-950">
                {fleet.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {fleet.models}
              </p>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {fleet.description}
              </p>

              {/* Specs */}
              <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Capacidad: <strong>{fleet.capacityPax}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Equipaje: <strong>{fleet.capacityBags}</strong></span>
                </div>
              </div>

              {/* Feature list */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Equipamiento Incluido:
                </span>
                {fleet.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <span className="text-[11px] font-medium text-slate-400">
                Inspección mecánica y documentación al día
              </span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
