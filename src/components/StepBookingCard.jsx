import React, { useState } from 'react';
import {
  ArrowRightLeft,
  Plane,
  Users,
  Briefcase,
  Baby,
  Dog,
  FileText,
  Car,
  Calendar,
  MapPin,
  CheckCircle2,
  MessageCircle,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  UserCheck
} from 'lucide-react';
import { LOCATIONS, FLEET_OPTIONS } from '../data/pricingData';
import { formatCLP, buildWhatsAppUrl } from '../utils/formatters';

export default function StepBookingCard({
  mode,
  selectedItem,
  formData,
  setFormData,
  totalPrice,
  onGoToWebpay
}) {
  const [step, setStep] = useState(1); // 1: Ruta & Horario | 2: Vehículo & Datos | 3: Resumen de la Reserva
  const [validationError, setValidationError] = useState('');

  const isTransfer = mode === 'transfer';

  const handleChange = (field, value) => {
    setValidationError('');
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSwap = () => {
    setFormData(prev => ({
      ...prev,
      originId: prev.destId,
      destId: prev.originId,
      originName: prev.destName,
      destName: prev.originName,
      originAddress: prev.destAddress,
      destAddress: prev.originAddress
    }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!formData.date) {
        setValidationError('Por favor selecciona la fecha del servicio.');
        return;
      }
      setValidationError('');
      setStep(2);
    } else if (step === 2) {
      if (!formData.fullName.trim() || !formData.phone.trim()) {
        setValidationError('Ingresa tu Nombre y Teléfono / WhatsApp para continuar.');
        return;
      }
      setValidationError('');
      setStep(3);
    }
  };

  const handleWhatsAppConfirm = () => {
    const url = buildWhatsAppUrl({
      mode,
      transferService: isTransfer ? selectedItem : null,
      tourService: !isTransfer ? selectedItem : null,
      ...formData,
      totalPrice
    });
    window.open(url, '_blank');
  };

  const stepsInfo = [
    { num: 1, label: 'Trayecto y Fecha' },
    { num: 2, label: 'Vehículo y Datos' },
    { num: 3, label: 'Resumen de la Reserva' }
  ];

  return (
    <div className="border border-neutral-200/90 bg-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between h-full text-xs">
      
      {/* TOP HEADER & STEPPER BAR */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
              {step === 3 ? 'Paso Final' : isTransfer ? 'Configurar Traslado' : 'Configurar Excursión'}
            </span>
            <h2 className="font-bold text-sm text-neutral-900 leading-snug">
              {step === 3 ? 'Resumen de la Reserva' : selectedItem?.name}
            </h2>
          </div>

          <span className="self-start sm:self-auto bg-neutral-100 text-neutral-700 font-semibold text-[11px] px-2.5 py-1 rounded-lg">
            Paso {step} de 3
          </span>
        </div>

        {/* Step Navigation Pills */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-xl mt-3 mb-4">
          {stepsInfo.map((s) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num === 3 && (!formData.fullName.trim() || !formData.phone.trim())) {
                    setStep(2);
                    setValidationError('Completa tu nombre y teléfono antes de ir al resumen.');
                    return;
                  }
                  setValidationError('');
                  setStep(s.num);
                }}
                className={`py-2 px-2 rounded-lg font-semibold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1.5 truncate ${
                  isActive
                    ? 'bg-[#0c0302] text-white shadow-xs'
                    : isDone
                    ? 'bg-white text-neutral-800 border border-neutral-200/70'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold shrink-0 ${
                  isActive ? 'bg-[#fcbf27] text-[#0c0302]' : isDone ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {s.num}
                </span>
                <span className="truncate">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* STEP 1: RUTA Y HORARIO */}
        {step === 1 && (
          <div className="space-y-3.5 animate-fade-in">
            {isTransfer ? (
              <>
                {/* Tipo de Trayecto */}
                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Tipo de Trayecto
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleChange('tripType', 'oneway')}
                      className={`py-2 px-3 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                        formData.tripType === 'oneway'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Solo Ida
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('tripType', 'roundtrip')}
                      className={`py-2 px-3 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                        formData.tripType === 'roundtrip'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Ida y Vuelta
                    </button>
                  </div>
                </div>

                {/* Origen y Destino */}
                <div className="space-y-2.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700 block">
                      Punto de Origen (Recogida)
                    </label>
                    <select
                      value={formData.originId}
                      onChange={(e) => {
                        const loc = LOCATIONS.find(l => l.id === e.target.value);
                        handleChange('originId', e.target.value);
                        handleChange('originName', loc ? loc.name : '');
                      }}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs cursor-pointer"
                    >
                      {LOCATIONS.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Dirección exacta, Hotel, Cabaña o N°..."
                      value={formData.originAddress}
                      onChange={(e) => handleChange('originAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
                    />
                  </div>

                  <div className="flex justify-center -my-1">
                    <button
                      type="button"
                      onClick={handleSwap}
                      className="p-1.5 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
                      title="Invertir origen y destino"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700 block">
                      Punto de Destino
                    </label>
                    <select
                      value={formData.destId}
                      onChange={(e) => {
                        const loc = LOCATIONS.find(l => l.id === e.target.value);
                        handleChange('destId', e.target.value);
                        handleChange('destName', loc ? loc.name : '');
                      }}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs cursor-pointer"
                    >
                      {LOCATIONS.map(loc => (
                        <option key={loc.id} value={loc.id}>{loc.name}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Dirección exacta de llegada o hotel..."
                      value={formData.destAddress}
                      onChange={(e) => handleChange('destAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                {/* Fechas y Horas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700 block">
                      Fecha y Hora de Ida
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleChange('date', e.target.value)}
                        className="w-full px-2.5 py-2 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
                      />
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleChange('time', e.target.value)}
                        className="w-full px-2.5 py-2 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
                      />
                    </div>
                  </div>

                  {formData.tripType === 'roundtrip' ? (
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700 block">
                        Fecha y Hora de Retorno
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="date"
                          value={formData.returnDate}
                          onChange={(e) => handleChange('returnDate', e.target.value)}
                          className="w-full px-2.5 py-2 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
                        />
                        <input
                          type="time"
                          value={formData.returnTime}
                          onChange={(e) => handleChange('returnTime', e.target.value)}
                          className="w-full px-2.5 py-2 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1">
                        <Plane className="w-3.5 h-3.5 text-neutral-400" />
                        <span>N° Vuelo PMC (Opcional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: LA123 / SKY H245"
                        value={formData.flightNumber}
                        onChange={(e) => handleChange('flightNumber', e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400 uppercase"
                      />
                    </div>
                  )}
                </div>

                {formData.tripType === 'roundtrip' && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1">
                      <Plane className="w-3.5 h-3.5 text-neutral-400" />
                      <span>N° de Vuelo PMC (Opcional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: LATAM LA123 o SKY H245"
                      value={formData.flightNumber}
                      onChange={(e) => handleChange('flightNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400 uppercase"
                    />
                  </div>
                )}
              </>
            ) : (
              /* TOUR STEP 1 */
              <>
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 text-neutral-600 text-[11px] leading-relaxed">
                  {selectedItem?.subtitle}
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                    Modalidad de Duración
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleChange('durationMode', 'Full Day')}
                      className={`py-2 px-3 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                        formData.durationMode === 'Full Day'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Full Day (~8h)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('durationMode', 'Medio Día')}
                      className={`py-2 px-3 rounded-lg font-semibold text-xs transition-all cursor-pointer ${
                        formData.durationMode === 'Medio Día'
                          ? 'bg-white text-neutral-900 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Medio Día (~4h)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700 block">
                      Fecha de la Excursión
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-neutral-700 block">
                      Hora Salida Sugerida
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleChange('time', e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-neutral-700 block">
                    Lugar de Recogida (Hotel / Cabaña / Domicilio)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Hotel Cumbres Puerto Varas, Cabañas Ensenada..."
                    value={formData.pickupAddress}
                    onChange={(e) => handleChange('pickupAddress', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 2: VEHÍCULO Y CONTACTO */}
        {step === 2 && (
          <div className="space-y-3.5 animate-fade-in">
            
            {/* Categoría de Vehículo */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-neutral-700 block">
                Selecciona Categoría de Vehículo
              </label>
              <div className="grid grid-cols-3 gap-2">
                {FLEET_OPTIONS.map((fleet) => {
                  const isSel = formData.selectedVehicleId === fleet.id;
                  return (
                    <button
                      key={fleet.id}
                      type="button"
                      onClick={() => {
                        handleChange('selectedVehicleId', fleet.id);
                        handleChange('vehicle', fleet);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        isSel
                          ? 'border-[#0c0302] bg-[#0c0302] text-white shadow-xs'
                          : 'border-neutral-200 bg-neutral-50/60 hover:bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      <div className="font-semibold text-xs">{fleet.shortName}</div>
                      <div className={`text-[10px] mt-0.5 ${isSel ? 'text-[#fcbf27]' : 'text-neutral-500'}`}>
                        {fleet.capacityPax}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pasajeros y Maletas */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="text-[11px] font-medium text-neutral-700">Pasajeros</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange('passengers', Math.max(1, formData.passengers - 1))}
                    className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-semibold text-xs text-neutral-900 w-4 text-center">
                    {formData.passengers}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleChange('passengers', Math.min(15, formData.passengers + 1))}
                    className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {isTransfer ? (
                <div className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-[11px] font-medium text-neutral-700">Maletas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleChange('bags', Math.max(0, formData.bags - 1))}
                      className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-semibold text-xs text-neutral-900 w-4 text-center">
                      {formData.bags}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleChange('bags', Math.min(15, formData.bags + 1))}
                      className="w-6 h-6 rounded-lg bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-600 hover:bg-neutral-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-neutral-700">Servicio</span>
                  <span className="font-semibold text-[11px] text-neutral-900">100% Privado</span>
                </div>
              )}
            </div>

            {/* Extras */}
            <div>
              <label className="text-[11px] font-semibold text-neutral-600 block mb-1.5">
                Adicionales Sin Costo
              </label>
              <div className="grid grid-cols-3 gap-2">
                <label className={`flex items-center gap-1.5 p-2 rounded-xl border text-[11px] cursor-pointer transition-colors ${
                  formData.babySeat ? 'bg-neutral-100 border-neutral-400 font-semibold text-neutral-900' : 'border-neutral-200 bg-white text-neutral-600'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.babySeat}
                    onChange={(e) => handleChange('babySeat', e.target.checked)}
                    className="rounded text-neutral-900 focus:ring-0"
                  />
                  <Baby className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Silla niños</span>
                </label>

                <label className={`flex items-center gap-1.5 p-2 rounded-xl border text-[11px] cursor-pointer transition-colors ${
                  formData.petFriendly ? 'bg-neutral-100 border-neutral-400 font-semibold text-neutral-900' : 'border-neutral-200 bg-white text-neutral-600'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.petFriendly}
                    onChange={(e) => handleChange('petFriendly', e.target.checked)}
                    className="rounded text-neutral-900 focus:ring-0"
                  />
                  <Dog className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Mascota</span>
                </label>

                <label className={`flex items-center gap-1.5 p-2 rounded-xl border text-[11px] cursor-pointer transition-colors ${
                  formData.needInvoice ? 'bg-neutral-100 border-neutral-400 font-semibold text-neutral-900' : 'border-neutral-200 bg-white text-neutral-600'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.needInvoice}
                    onChange={(e) => handleChange('needInvoice', e.target.checked)}
                    className="rounded text-neutral-900 focus:ring-0"
                  />
                  <FileText className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Factura</span>
                </label>
              </div>
            </div>

            {/* Datos de Contacto */}
            <div className="space-y-2 pt-2 border-t border-neutral-100">
              <label className="text-[11px] font-semibold text-neutral-700 block">
                Datos del Pasajero Titular
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Nombre y Apellido *"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp / Teléfono *"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="email"
                  placeholder="Correo Electrónico (Opcional)"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
                />
                <input
                  type="text"
                  placeholder="Notas adicionales para el chofer..."
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
                />
              </div>
            </div>

          </div>
        )}

        {/* STEP 3: RESUMEN DE LA RESERVA */}
        {step === 3 && (
          <div className="space-y-3.5 animate-fade-in">
            
            {/* Desglose del Servicio */}
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200/80 space-y-2.5">
              
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-neutral-200/60">
                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Servicio Seleccionado</span>
                    <span className="font-bold text-neutral-900 text-xs">{selectedItem?.name}</span>
                  </div>
                </div>
                <span className="bg-[#fcbf27]/25 text-[#7a5600] font-semibold text-[10px] px-2 py-0.5 rounded-full shrink-0">
                  {isTransfer ? (formData.tripType === 'roundtrip' ? 'Ida y Vuelta' : 'Solo Ida') : formData.durationMode}
                </span>
              </div>

              {isTransfer ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-neutral-400 block">Origen:</span>
                    <span className="font-semibold text-neutral-800">{formData.originName}</span>
                    {formData.originAddress && <span className="block text-neutral-500 text-[10px]">{formData.originAddress}</span>}
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Destino:</span>
                    <span className="font-semibold text-neutral-800">{formData.destName}</span>
                    {formData.destAddress && <span className="block text-neutral-500 text-[10px]">{formData.destAddress}</span>}
                  </div>
                </div>
              ) : (
                <div className="text-[11px]">
                  <span className="text-neutral-400 block">Lugar de Recogida:</span>
                  <span className="font-semibold text-neutral-800">{formData.pickupAddress || 'Puerto Varas (Por coordinar)'}</span>
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-neutral-200/60 text-[11px]">
                <div>
                  <span className="text-neutral-400 block">Fecha y Hora:</span>
                  <span className="font-semibold text-neutral-800">{formData.date} • {formData.time}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Vehículo:</span>
                  <span className="font-semibold text-neutral-800">{formData.vehicle?.name}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-neutral-400 block">Pasajero Titular:</span>
                  <span className="font-semibold text-neutral-800 truncate block">{formData.fullName} ({formData.phone})</span>
                </div>
              </div>

            </div>

            {/* Inclusiones */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[11px] text-neutral-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Peajes y combustible</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Espera en Aeropuerto PMC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Chofer profesional</span>
              </div>
            </div>

            {/* Total Box */}
            <div className="p-3.5 rounded-xl bg-neutral-100/80 border border-neutral-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-neutral-900 text-xs block">Total de la Reserva</span>
                <span className="text-[10px] text-neutral-500">Tarifa final garantizada sin recargos ocultos</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-lg font-mono text-neutral-950">{formatCLP(totalPrice)}</span>
                <span className="text-[10px] text-neutral-500 font-mono ml-1">CLP</span>
              </div>
            </div>

            {/* Botones principales de Resumen: 1. Confirmar por WhatsApp | 2. Abajo Pagar */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleWhatsAppConfirm}
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold transition-all cursor-pointer shadow-xs text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Confirmar por WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={onGoToWebpay}
                className="w-full py-3 px-4 bg-[#0c0302] hover:bg-[#1f1a19] text-white rounded-xl font-semibold transition-all cursor-pointer shadow-xs text-xs flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-[#fcbf27]" />
                <span>Pagar ({formatCLP(totalPrice)})</span>
              </button>
            </div>

          </div>
        )}

        {/* Validation Error message */}
        {validationError && (
          <div className="mt-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium">
            {validationError}
          </div>
        )}
      </div>

      {/* BOTTOM SLIDER NAVIGATION BAR */}
      <div className="pt-3 mt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => {
              setValidationError('');
              setStep(step - 1);
            }}
            className="py-2 px-3 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Paso Anterior</span>
          </button>
        ) : (
          <div className="flex items-baseline gap-1.5">
            <span className="text-[11px] text-neutral-400">Tarifa estimada:</span>
            <span className="font-mono font-bold text-sm text-neutral-900">{formatCLP(totalPrice)}</span>
          </div>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="py-2.5 px-4 rounded-xl bg-[#0c0302] hover:bg-[#1f1a19] text-white font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ml-auto"
          >
            <span>{step === 1 ? 'Siguiente: Vehículo y Datos' : 'Ver Resumen de la Reserva'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#fcbf27]" />
          </button>
        ) : (
          <span className="text-[11px] text-neutral-400 ml-auto">
            Pago seguro vía Webpay Plus
          </span>
        )}
      </div>

    </div>
  );
}
