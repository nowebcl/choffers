import React, { useState } from 'react';
import {
  Lock,
  CreditCard,
  Building2,
  QrCode,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { formatCLP } from '../utils/formatters';

export default function WebpayPage({
  selectedItem,
  formData,
  totalPrice,
  onBack,
  onPaymentSuccess
}) {
  const [paymentType, setPaymentType] = useState('debito'); // 'debito' | 'credito' | 'onepay'
  const [bank, setBank] = useState('Banco de Chile');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8924');
  const [expiry, setExpiry] = useState('09/28');
  const [cvv, setCvv] = useState('842');
  const [installments, setInstallments] = useState('0');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const orderNumber = React.useMemo(() => `OC-${Math.floor(100000 + Math.random() * 900000)}`, []);

  const handlePaySubmit = (e) => {
    e.preventDefault();
    if (isProcessing) return;

    setIsProcessing(true);
    setProcessingStep('Conectando con banco emisor...');

    setTimeout(() => {
      setProcessingStep('Autorizando transacción en Webpay Plus...');
    }, 700);

    setTimeout(() => {
      setProcessingStep('Generando comprobante PDF de tu reserva...');
    }, 1400);

    setTimeout(() => {
      const txId = `TBK-${Math.floor(100000 + Math.random() * 900000)}`;
      const methodLabel =
        paymentType === 'debito'
          ? `Redcompra Débito (${bank})`
          : paymentType === 'credito'
          ? `Tarjeta de Crédito (${installments === '0' ? 'Sin cuotas' : `${installments} cuotas`})`
          : 'Billetera Digital Onepay QR';

      onPaymentSuccess({
        transactionId: txId,
        paymentMethodLabel: methodLabel
      });
    }, 2100);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-2 sm:py-4 animate-fade-in text-xs">
      
      {/* Top Navigation & Security Bar */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold transition-colors cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al resumen</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 text-neutral-700 font-medium text-[11px]">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pasarela Webpay Plus • TLS 256-bit</span>
        </div>
      </div>

      {/* Main Full-Page Checkout Container */}
      <div className="bg-white border border-neutral-200/90 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
        
        {/* Header: Merchant & Total Amount */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-100">
          <div className="flex items-center gap-3.5">
            <img
              src="/Recurso-3.webp"
              alt="Choffers"
              className="h-9 w-auto object-contain select-none"
            />
            <div className="border-l border-neutral-200 pl-3.5">
              <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block">
                Comercio Oficial
              </span>
              <h1 className="text-sm font-bold text-neutral-900">
                Choffers Puerto Varas • Webpay
              </h1>
              <span className="text-[11px] text-neutral-500">
                Orden: <b className="font-mono text-neutral-700">{orderNumber}</b> • {selectedItem?.name}
              </span>
            </div>
          </div>

          <div className="sm:text-right p-3 sm:p-0 rounded-xl bg-neutral-50 sm:bg-transparent border sm:border-0 border-neutral-200/80 flex sm:block items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 block">
              Monto Total a Pagar
            </span>
            <span className="text-xl font-bold font-mono text-neutral-950">
              {formatCLP(totalPrice)} <span className="text-xs font-normal text-neutral-500">CLP</span>
            </span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div>
          <label className="text-[11px] font-semibold text-neutral-600 block mb-2">
            Selecciona tu Medio de Pago Webpay
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setPaymentType('debito')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                paymentType === 'debito'
                  ? 'border-[#0c0302] bg-[#0c0302] text-white shadow-xs'
                  : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800'
              }`}
            >
              <Building2 className={`w-4 h-4 mb-1.5 ${paymentType === 'debito' ? 'text-[#fcbf27]' : 'text-neutral-500'}`} />
              <div>
                <div className="font-semibold text-xs">Redcompra</div>
                <div className={`text-[10px] ${paymentType === 'debito' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Tarjeta de Débito
                </div>
              </div>
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setPaymentType('credito')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                paymentType === 'credito'
                  ? 'border-[#0c0302] bg-[#0c0302] text-white shadow-xs'
                  : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800'
              }`}
            >
              <CreditCard className={`w-4 h-4 mb-1.5 ${paymentType === 'credito' ? 'text-[#fcbf27]' : 'text-neutral-500'}`} />
              <div>
                <div className="font-semibold text-xs">Crédito</div>
                <div className={`text-[10px] ${paymentType === 'credito' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Visa / Mastercard
                </div>
              </div>
            </button>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => setPaymentType('onepay')}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                paymentType === 'onepay'
                  ? 'border-[#0c0302] bg-[#0c0302] text-white shadow-xs'
                  : 'border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800'
              }`}
            >
              <QrCode className={`w-4 h-4 mb-1.5 ${paymentType === 'onepay' ? 'text-[#fcbf27]' : 'text-neutral-500'}`} />
              <div>
                <div className="font-semibold text-xs">Onepay</div>
                <div className={`text-[10px] ${paymentType === 'onepay' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  App Billetera QR
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePaySubmit} className="space-y-4">
          {paymentType !== 'onepay' ? (
            <div className="space-y-3.5 p-4 rounded-xl bg-neutral-50/70 border border-neutral-200/80">
              
              {paymentType === 'debito' && (
                <div>
                  <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                    Banco Emisor
                  </label>
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    disabled={isProcessing}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none focus:border-[#0c0302]"
                  >
                    <option value="Banco de Chile">Banco de Chile / Edwards</option>
                    <option value="Banco Santander">Banco Santander</option>
                    <option value="Banco BCI">Banco BCI / Mach</option>
                    <option value="Banco Estado">BancoEstado</option>
                    <option value="Scotiabank">Scotiabank</option>
                    <option value="Banco Itaú">Banco Itaú</option>
                    <option value="Banco Falabella">Banco Falabella</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Número de Tarjeta (Simulación Lista para Pagar)
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white font-mono text-xs text-neutral-900 outline-none focus:border-[#0c0302]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                    Vencimiento
                  </label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    disabled={isProcessing}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white font-mono text-xs text-neutral-900 outline-none focus:border-[#0c0302]"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                    CVV
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    disabled={isProcessing}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white font-mono text-xs text-neutral-900 outline-none focus:border-[#0c0302]"
                    required
                  />
                </div>

                {paymentType === 'credito' && (
                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                      Cuotas
                    </label>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(e.target.value)}
                      disabled={isProcessing}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none focus:border-[#0c0302]"
                    >
                      <option value="0">Sin cuotas</option>
                      <option value="3">3 cuotas sin interés</option>
                      <option value="6">6 cuotas</option>
                      <option value="12">12 cuotas</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="pt-1 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Titular: <b className="text-neutral-800">{formData.fullName || 'Pasajero Choffers'}</b></span>
                <span className="text-emerald-700 font-medium">✓ Datos de prueba precargados</span>
              </div>

            </div>
          ) : (
            <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-center space-y-2">
              <QrCode className="w-12 h-12 text-neutral-800 mx-auto" />
              <p className="font-semibold text-neutral-900 text-xs">
                Pago Rápido con Onepay / App Bancaria
              </p>
              <p className="text-[11px] text-neutral-500 max-w-sm mx-auto">
                Haz clic en el botón inferior para autorizar inmediatamente la simulación de cobro Onepay y descargar tu comprobante PDF.
              </p>
            </div>
          )}

          {/* Processing Feedback Banner */}
          {isProcessing && (
            <div className="p-3.5 rounded-xl bg-neutral-900 text-white flex items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-center gap-2.5">
                <Loader2 className="w-4 h-4 text-[#fcbf27] animate-spin shrink-0" />
                <span className="font-medium text-xs">{processingStep}</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">WEBPAY</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3.5 px-4 bg-[#0c0302] hover:bg-[#1f1a19] disabled:opacity-60 text-white rounded-xl font-semibold transition-all cursor-pointer shadow-xs text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#fcbf27]" />
            <span>
              {isProcessing
                ? 'Procesando Pago y Descargando PDF...'
                : `Confirmar y Pagar ${formatCLP(totalPrice)}`}
            </span>
          </button>
        </form>

        {/* Footer note */}
        <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Al confirmar el pago se descargará automáticamente tu reserva en PDF</span>
          </div>
          <span>Transbank Webpay Plus</span>
        </div>

      </div>
    </div>
  );
}
