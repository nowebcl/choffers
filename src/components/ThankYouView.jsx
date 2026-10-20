import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  ArrowLeft,
  Download,
  FileText
} from 'lucide-react';
import { formatCLP, buildWhatsAppUrl } from '../utils/formatters';
import { CHOFFERS_DISPLAY_PHONE, CHOFFERS_PHONE_NUMBER } from '../data/pricingData';
import { generateAndDownloadReservationPDF } from '../utils/pdfGenerator';

export default function ThankYouView({
  bookingCode,
  transactionId,
  paymentMethodLabel,
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

  const handleDownloadPdfAgain = () => {
    generateAndDownloadReservationPDF({
      bookingCode,
      transactionId,
      mode,
      selectedItem,
      formData,
      totalPrice,
      paymentMethodLabel
    });
  };

  const handleFollowServiceWhatsApp = () => {
    const url = buildWhatsAppUrl({
      mode,
      transferService: isTransfer ? selectedItem : null,
      tourService: !isTransfer ? selectedItem : null,
      code: `${bookingCode} (PAGADO WEBPAY ${transactionId})`,
      ...formData,
      totalPrice
    });
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-xl mx-auto py-3 sm:py-5 animate-fade-in">
      <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-5 text-xs">
        
        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
            <span>Pago Aprobado • Comprobante PDF Descargado</span>
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-neutral-900">
            ¡Tu reserva en Choffers está confirmada!
          </h1>
          <p className="text-neutral-500 text-xs max-w-md mx-auto">
            Se ha descargado automáticamente el comprobante PDF con el logo de Choffers y el detalle completo de tu reserva.
          </p>
        </div>

        {/* DESTACADO: Mensaje en pantalla con el WhatsApp de Choffers para seguir el servicio */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 block">
                Seguimiento en Vivo del Servicio
              </span>
              <h2 className="text-sm font-bold text-neutral-900">
                WhatsApp Oficial Choffers: {CHOFFERS_DISPLAY_PHONE}
              </h2>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Por medio de nuestro WhatsApp <b>{CHOFFERS_DISPLAY_PHONE}</b> puedes hacer el seguimiento de tu servicio en tiempo real, recibir los datos de tu conductor asignado y coordinar cualquier detalle de tu traslado.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFollowServiceWhatsApp}
            className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold transition-all cursor-pointer shadow-xs text-xs flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Seguir mi servicio por WhatsApp ({CHOFFERS_DISPLAY_PHONE})</span>
          </button>
        </div>

        {/* Código de Reserva & Transacción */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
                Código de Reserva
              </span>
              <span className="font-mono text-sm font-bold text-neutral-900">
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

          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
                Transacción Webpay
              </span>
              <span className="font-mono text-sm font-bold text-neutral-900">
                {transactionId}
              </span>
            </div>
            <span className="text-[10px] font-semibold bg-neutral-200/70 text-neutral-700 px-2 py-0.5 rounded">
              Pagado
            </span>
          </div>
        </div>

        {/* Resumen compacto */}
        <div className="space-y-1.5 border-t border-neutral-100 pt-3">
          <div className="flex justify-between py-1 border-b border-neutral-100 text-neutral-600">
            <span className="text-neutral-400">Servicio:</span>
            <span className="font-semibold text-neutral-900 text-right">{selectedItem?.name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-neutral-100 text-neutral-600">
            <span className="text-neutral-400">Fecha y Hora:</span>
            <span className="font-medium text-neutral-800">{formData.date} • {formData.time} hrs</span>
          </div>
          <div className="flex justify-between py-1 border-b border-neutral-100 text-neutral-600">
            <span className="text-neutral-400">Pasajero Titular:</span>
            <span className="font-medium text-neutral-800">{formData.fullName} ({formData.phone})</span>
          </div>
          <div className="flex justify-between py-1 border-b border-neutral-100 text-neutral-600">
            <span className="text-neutral-400">Vehículo:</span>
            <span className="font-medium text-neutral-800">{formData.vehicle?.name}</span>
          </div>
          <div className="flex justify-between pt-2 text-neutral-900 font-bold text-sm">
            <span>Total Pagado Webpay:</span>
            <span className="font-mono text-[#0c0302]">{formatCLP(totalPrice)} CLP</span>
          </div>
        </div>

        {/* Botones de Descarga PDF y Volver */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleDownloadPdfAgain}
            className="py-2.5 px-3 bg-[#0c0302] hover:bg-[#1f1a19] text-white rounded-xl font-semibold transition-all cursor-pointer shadow-xs text-xs flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-[#fcbf27]" />
            <span>Descargar PDF nuevamente</span>
          </button>

          <button
            type="button"
            onClick={onBackToBooking}
            className="py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-semibold transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-500" />
            <span>Nueva Reserva</span>
          </button>
        </div>

      </div>
    </div>
  );
}
