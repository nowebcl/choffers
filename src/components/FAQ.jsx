import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/pricingData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIndex(prev => prev === idx ? null : idx);
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto border-t border-slate-100">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          Dudas Frecuentes
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mt-3 tracking-tight">
          Preguntas Frecuentes sobre el Servicio
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Resolvemos tus inquietudes para que viajes con total seguridad y certeza.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-200 shadow-subtle"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-navy-950 hover:text-blue-600 transition"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                  isOpen ? 'rotate-180 text-blue-600' : ''
                }`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
