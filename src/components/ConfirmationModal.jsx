import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  X, 
  Copy, 
  Check, 
  MessageCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Car, 
  Users, 
  FileCheck2,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatCLP, buildTransferWhatsAppLink, buildTourWhatsAppLink } from '../utils/formatters';

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  bookingCode, 
  mode, 
  bookingData, 
  totalPrice 
}) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isTransfer = mode === 'transfer';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToWhatsApp = () => {
    const link = isTransfer
      ? buildTransferWhatsAppLink({ ...bookingData, bookingCode, totalPrice })
      : buildTourWhatsAppLink({ ...bookingData, bookingCode, totalPrice });
    window.open(link, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm animate-fade-in">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Heading */}
        <div className="text-center pt-2">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-subtle">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Solicitud Registrada
          </span>

          <h2 className="text-2xl font-extrabold text-navy-950 mt-2">
            ¡Tu reserva ha sido recibida!
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
            Hemos asignado un código único a tu servicio de traslado en la Región de Los Lagos.
          </p>
        </div>

        {/* Booking Reference Box */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Código de Reserva
            </span>
            <span className="text-xl font-black text-navy-950 tracking-wider">
              {bookingCode}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 transition shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Voucher Breakdown */}
        <div className="mt-5 space-y-2.5 text-xs sm:text-sm border-t border-slate-100 pt-4">
          <div className="flex justify-between py-1 border-b border-slate-100/60">
            <span className="text-slate-500">Servicio:</span>
            <span className="font-bold text-navy-900">
              {isTransfer ? 'Traslado Privado' : 'Tour Turístico'}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100/60">
            <span className="text-slate-500">Trayecto / Excursión:</span>
            <span className="font-bold text-navy-900 text-right max-w-[240px] truncate">
              {isTransfer ? `${bookingData.originName || 'Origen'} → ${bookingData.destName || 'Destino'}` : bookingData.tour?.title}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100/60">
            <span className="text-slate-500">Fecha y Horario:</span>
            <span className="font-semibold text-slate-800">
              {bookingData.date} • {bookingData.time}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100/60">
            <span className="text-slate-500">Pasajero principal:</span>
            <span className="font-semibold text-slate-800">
              {bookingData.passengerName} ({bookingData.passengerPhone})
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-100/60">
            <span className="text-slate-500">Vehículo:</span>
            <span className="font-semibold text-slate-800">
              {bookingData.vehicle?.name || 'SUV / Sedán Ejecutivo'}
            </span>
          </div>

          <div className="flex justify-between py-2 bg-blue-50/50 -mx-2 px-2 rounded-xl">
            <span className="font-bold text-navy-950">Tarifa Total Estimada:</span>
            <span className="font-extrabold text-navy-950 text-base">
              {formatCLP(totalPrice)} CLP
            </span>
          </div>
        </div>

        {/* Next Steps Guide */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-navy-900 flex items-center gap-1.5">
            <FileCheck2 className="w-4 h-4 text-blue-600" />
            <span>¿Qué sucede ahora?</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-600 pl-1">
            <li>Un coordinador de Choffers te escribirá por WhatsApp para validar los detalles.</li>
            <li>Recibirás el nombre y teléfono del chofer asignado con la patente de tu vehículo.</li>
            <li>El pago se efectúa al finalizar el servicio vía transferencia, Webpay o efectivo.</li>
          </ol>
        </div>

        {/* Primary Buttons */}
        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            onClick={handleSendToWhatsApp}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.99]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Enviar Ficha a WhatsApp de Coordinación</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition"
          >
            Cerrar y volver al inicio
          </button>
        </div>

      </div>

    </div>
  );
}
