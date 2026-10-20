import React from 'react';
import { 
  Plane, 
  ShieldCheck, 
  FileText, 
  Award, 
  Clock, 
  HeartHandshake, 
  Star,
  Quote
} from 'lucide-react';
import { TESTIMONIALS } from '../data/pricingData';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Clock,
      title: 'Puntualidad Militar & Espera en Vuelos',
      description: 'Monitoreamos tu hora de aterrizaje en El Tepual (PMC) en tiempo real. Te esperamos sin costo extra si tu aerolínea se retrasa.'
    },
    {
      icon: ShieldCheck,
      title: 'Conductores Locales Certificados',
      description: 'Profesionales amables con conocimiento exhaustivo de las rutas australes, gastronomía y parajes secretos del Lago Llanquihue.'
    },
    {
      icon: FileText,
      title: 'Facturación Corporativa Inmediata',
      description: 'Emitimos Facturas exentas o afectas y boletas electrónicas de manera instantánea para empresas y pasajeros de negocios.'
    },
    {
      icon: Award,
      title: 'Servicio 100% Exclusivo y Privado',
      description: 'Cero sorpresas ni pasajeros desconocidos. Tu vehículo está reservado exclusivamente para ti, tu familia o tu equipo de trabajo.'
    }
  ];

  return (
    <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-100">
      
      {/* 4 Pillars Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Estándar Choffers.cl
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-3 tracking-tight">
          La Diferencia de Viajar con Choffers
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Diseñado para quienes valoran su tiempo, la tranquilidad y una experiencia de viaje impecable en el sur de Chile.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-subtle hover:shadow-card transition duration-200"
            >
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-navy-950 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Testimonials */}
      <div className="mt-16 pt-10 border-t border-slate-100">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
            <span className="text-xs font-bold text-slate-700 ml-1.5">5.0 de Calificación</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-navy-950">
            Opiniones de Pasajeros Satisfechos
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-3xl border border-slate-200/70 p-5 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-blue-300 mb-2" />
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60">
                <p className="text-xs font-bold text-navy-900">{t.name}</p>
                <p className="text-[11px] text-slate-500">{t.origin} • {t.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
