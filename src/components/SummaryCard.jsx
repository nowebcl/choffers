import React from 'react';
import { MessageCircle, CheckCircle2, ShieldCheck, ArrowRight, Car, Calendar, Users, MapPin } from 'lucide-react';
import { formatCLP, buildWhatsAppUrl } from '../utils/formatters';

export default function SummaryCard({
  mode,
  selectedItem,
  formData,
  totalPrice,
  onConfirmOnline
}) {
  const isTransfer = mode === 'transfer';

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl({
      mode,
      transferService: isTransfer ? selectedItem : null,
      tourService: !isTransfer ? selectedItem : null,
      ...formData,
      totalPrice
    });
    window.open(url, '_blank');
  };

  return (
    <div className="border border-neutral-200/90 bg-white rounded-2xl p-4 sm:p-5 space-y-3.5 text-xs shadow-xs sticky top-4">
      
      {/* Title */}
      <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100">
        <span className="font-bold text-xs text-neutral-900">
          Resumen de Reserva
        </span>
        <span className="text-[10px] font-semibold text-[#855e00] bg-[#fcbf27]/20 px-2 py-0.5 rounded-full">
          Tarifa Fija
        </span>
      </div>

      {/* Details Stack */}
      <div className="space-y-2 text-neutral-600">
        
        {/* Service */}
        <div className="flex items-start gap-2">
          <Car className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-neutral-400 block">Servicio:</span>
            <span className="font-semibold text-neutral-900 block truncate">
              {selectedItem?.name}
            </span>
            {isTransfer && (
              <span className="text-[10px] text-neutral-500">
                {formData.tripType === 'roundtrip' ? '🔄 Ida y Vuelta' : '➡️ Solo Ida'}
              </span>
            )}
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-start gap-2">
          <Calendar className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] text-neutral-400 block">Fecha y Horario:</span>
            <span className="font-medium text-neutral-800">
              {formData.date || 'Sin fecha'} • {formData.time || '10:00'}
            </span>
            {isTransfer && formData.tripType === 'roundtrip' && (
              <p className="text-[10px] text-neutral-500 mt-0.5">
                Regreso: {formData.returnDate} ({formData.returnTime})
              </p>
            )}
          </div>
        </div>

        {/* Passengers & Vehicle */}
        <div className="flex items-start gap-2">
          <Users className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] text-neutral-400 block">Capacidad:</span>
            <span className="font-medium text-neutral-800">
              {formData.passengers} {formData.passengers === 1 ? 'pasajero' : 'pasajeros'} • {formData.vehicle?.name}
            </span>
          </div>
        </div>

      </div>

      {/* Inclusions checklist */}
      <div className="pt-2 border-t border-neutral-100 space-y-1 text-[11px] text-neutral-500">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>Peajes y combustible incluidos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>Espera con cartel en El Tepual (PMC)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>Seguro de pasajeros y conductor profesional</span>
        </div>
      </div>

      {/* Price total */}
      <div className="pt-3 border-t border-neutral-200/60 flex items-baseline justify-between">
        <span className="text-xs font-semibold text-neutral-700">Total a Pagar:</span>
        <div className="text-right">
          <span className="font-bold text-base font-mono text-neutral-950">
            {formatCLP(totalPrice)}
          </span>
          <span className="text-[10px] text-neutral-400 font-mono ml-1">CLP</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="w-full py-2.5 px-3 bg-[#0c0302] hover:bg-[#1f1a19] text-white rounded-xl font-semibold transition-all cursor-pointer shadow-xs text-xs flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          <span>Confirmar vía WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={onConfirmOnline}
          className="w-full py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-semibold transition-all cursor-pointer text-xs flex items-center justify-center gap-1"
        >
          <span>Agendar en Línea & Voucher</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
        </button>
      </div>

      {/* Security Footnote */}
      <div className="text-[10px] text-neutral-400 text-center flex items-center justify-center gap-1 pt-1">
        <ShieldCheck className="w-3 h-3 text-neutral-400" />
        <span>Sin pagos por adelantado requeridos</span>
      </div>

    </div>
  );
}
