import React from 'react';
import { 
  Car, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Briefcase, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Plane,
  ChevronRight
} from 'lucide-react';
import { formatCLP, buildTransferWhatsAppLink, buildTourWhatsAppLink } from '../utils/formatters';

export default function BookingSummaryCard({ 
  mode, 
  bookingData, 
  totalPrice,
  onOpenConfirmationModal 
}) {
  const isTransfer = mode === 'transfer';
  
  const handleWhatsAppClick = () => {
    const link = isTransfer 
      ? buildTransferWhatsAppLink({ ...bookingData, totalPrice })
      : buildTourWhatsAppLink({ ...bookingData, totalPrice });
    window.open(link, '_blank');
  };

  const isFormValid = () => {
    if (!bookingData.passengerName || !bookingData.passengerPhone) return false;
    if (isTransfer) {
      return !!(bookingData.origin && bookingData.destination && bookingData.date);
    } else {
      return !!(bookingData.selectedTourId && bookingData.date);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-card hover:shadow-card-hover transition-all duration-300 sticky top-24">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
            Resumen en Tiempo Real
          </span>
          <h3 className="text-base font-bold text-navy-950">
            {isTransfer ? 'Traslado Privado' : 'Tour Exclusivo'}
          </h3>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Tarifa Garantizada</span>
        </div>
      </div>

      {/* Details List */}
      <div className="py-4 space-y-3 text-xs sm:text-sm">
        
        {/* Route or Tour Title */}
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] text-slate-500 font-medium block">
              {isTransfer ? 'Trayecto seleccionado' : 'Excursión'}
            </span>
            <p className="font-bold text-navy-900 truncate">
              {isTransfer ? (
                <>
                  {bookingData.originName || 'Punto de partida'}
                  <span className="text-blue-600 mx-1">→</span>
                  {bookingData.destName || 'Punto de destino'}
                </>
              ) : (
                bookingData.tour?.title || 'Tour seleccionado'
              )}
            </p>
            {isTransfer && bookingData.tripType === 'roundtrip' && (
              <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-bold text-slate-700">
                🔄 Ida y Vuelta
              </span>
            )}
          </div>
        </div>

        {/* Schedule */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex-1">
            <span className="text-[11px] text-slate-500 font-medium block">Fecha y Hora</span>
            <p className="font-semibold text-slate-800">
              {bookingData.date || 'Fecha por definir'} • {bookingData.time || 'Hora por definir'}
            </p>
          </div>
        </div>

        {/* Vehicle & Capacity */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center flex-shrink-0">
            <Car className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex-1">
            <span className="text-[11px] text-slate-500 font-medium block">Vehículo asignado</span>
            <p className="font-semibold text-slate-800">
              {bookingData.vehicle?.name || 'SUV / Sedán Ejecutivo'}
            </p>
          </div>
        </div>

        {/* Passengers & Bags */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex-1">
            <span className="text-[11px] text-slate-500 font-medium block">Capacidad requerida</span>
            <p className="font-semibold text-slate-800">
              {bookingData.passengers} {bookingData.passengers === 1 ? 'pasajero' : 'pasajeros'}
              {isTransfer && ` • ${bookingData.largeBags} maletas`}
            </p>
          </div>
        </div>

        {/* Flight Number if present */}
        {isTransfer && bookingData.flightNumber && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Plane className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] text-slate-500 font-medium block">Monitoreo de vuelo</span>
              <p className="font-semibold text-blue-700 uppercase">
                {bookingData.flightNumber}
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Price Display */}
      <div className="mt-2 pt-4 border-t border-slate-100 bg-slate-50/70 -mx-6 px-6 py-4 rounded-b-2xl">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 block">Total Estimado</span>
            <span className="text-[11px] text-slate-400">Tarifa fija con peajes</span>
          </div>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
              {formatCLP(totalPrice)}
            </span>
            <span className="text-xs font-semibold text-slate-500 block">CLP</span>
          </div>
        </div>

        {/* Inclusions list */}
        <div className="mt-3 pt-3 border-t border-slate-200/60 space-y-1.5 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>Combustible y todos los peajes incluidos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>Espera con cartel personalizado en PMC</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>Pago al finalizar el trayecto o con factura</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 space-y-2.5">
          
          {/* WhatsApp Primary CTA */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all duration-200 active:scale-[0.99]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Confirmar vía WhatsApp Directo</span>
          </button>

          {/* Online Confirmation CTA */}
          <button
            type="button"
            onClick={onOpenConfirmationModal}
            className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99]"
          >
            <span>Agendar Reserva en Línea</span>
            <ArrowRight className="w-4 h-4 text-slate-300" />
          </button>

        </div>

        {/* Trust Note */}
        <p className="mt-3 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Sin cobros por adelantado requeridos</span>
        </p>

      </div>

    </div>
  );
}
