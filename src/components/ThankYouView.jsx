import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, MessageCircle, ArrowLeft, Printer } from 'lucide-react';
import { formatCLP, buildWhatsAppUrl } from '../utils/formatters';
import { CHOFFERS_DISPLAY_PHONE } from '../data/pricingData';

export default function ThankYouView({
  bookingCode,
  mode,
  selectedItem,
  formData,
  totalPrice,
  onBackToBooking
}) {
  const [copied, setCopied] = useState(false);
  const isTransfer = mode === 'transfer';

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const url = buildWhatsAppUrl({
      mode,
      transferService: isTransfer ? selectedItem : null,
      tourService: !isTransfer ? selectedItem : null,
      code: bookingCode,
      ...formData,
      totalPrice
    });
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-lg mx-auto py-6">
      <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4 text-xs">
        
        {/* Success Icon & Header */}
        <div className="text-center space-y-1.5 pb-2">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2 border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Reserva Registrada
          </span>
          <h2 className="text-lg font-bold text-neutral-900">
            ¡Tu solicitud ha sido recibida con éxito!
          </h2>
          <p className="text-neutral-500 text-[11px] max-w-sm mx-auto">
            Hemos registrado tu requerimiento de transporte privado en Puerto Varas y Región de Los Lagos.
          </p>
        </div>

        {/* Code box */}
        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
              Código de Referencia:
            </span>
            <span className="font-mono text-base font-bold text-neutral-900 tracking-wider">
              {bookingCode}
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-[11px] font-medium text-neutral-700 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-neutral-500" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Breakdown table */}
        <div className="space-y-2 border-t border-neutral-100 pt-3">
          <div className="flex justify-between py-1 border-b border-neutral-100 text-neutral-600">
            <span className="text-neutral-500">Servicio:</span>
            <span className="font-semibold text-neutral-900 text-right">{selectedItem?.name}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-neutral-100 text-neutral-600">
            <span className="text-neutral-500">Modalidad:</span>
            <span className="font-medium text-neutral-800">
              {isTransfer ? (formData.tripType === 'roundtrip' ? 'Ida y Vuelta' : 'Solo Ida') : formData.durationMode}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-neutral-100 text-neutral-600">
            <span className="text-neutral-500">Fecha y Hora:</span>
            <span className="font-medium text-neutral-800">
              {formData.date} • {formData.time}
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-neutral-100 text-neutral-600">
            <span className="text-neutral-500">Pasajero:</span>
            <span className="font-medium text-neutral-800">
              {formData.fullName || 'No especificado'} ({formData.phone})
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-neutral-100 text-neutral-600">
            <span className="text-neutral-500">Vehículo:</span>
            <span className="font-medium text-neutral-800">{formData.vehicle?.name}</span>
          </div>

          <div className="flex justify-between pt-2 text-neutral-900 font-bold">
            <span>Tarifa Total Estimada:</span>
            <span className="font-mono text-sm text-[#0c0302]">{formatCLP(totalPrice)} CLP</span>
          </div>
        </div>

        {/* Step Guide */}
        <div className="p-3 bg-neutral-50/80 rounded-xl border border-neutral-200/80 text-[11px] text-neutral-600 space-y-1">
          <p className="font-semibold text-neutral-900">¿Cuáles son los pasos siguientes?</p>
          <ul className="list-disc list-inside space-y-0.5 text-neutral-500 pl-1">
            <li>Un chofer coordinador te escribirá por WhatsApp ({CHOFFERS_DISPLAY_PHONE}).</li>
            <li>Si llegas a El Tepual (PMC), te esperaremos con un cartel a tu nombre.</li>
            <li>El pago se efectúa al finalizar el servicio vía transferencia o Webpay.</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="w-full py-2.5 px-3 bg-[#0c0302] hover:bg-[#1f1a19] text-white rounded-xl font-semibold transition-all cursor-pointer shadow-xs text-xs flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>Enviar Ficha a WhatsApp de Coordinación</span>
          </button>

          <button
            type="button"
            onClick={onBackToBooking}
            className="w-full py-2 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-medium transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-500" />
            <span>Volver al cotizador</span>
          </button>
        </div>

      </div>
    </div>
  );
}
