import React from 'react';
import { 
  ArrowRightLeft, 
  MapPin, 
  Calendar, 
  Clock, 
  Plane, 
  Users, 
  Briefcase, 
  Baby, 
  Dog, 
  FileText, 
  Info,
  Car
} from 'lucide-react';
import { LOCATIONS, FLEET_OPTIONS } from '../data/pricingData';

export default function BookingForm({
  mode,
  selectedItem,
  formData,
  setFormData
}) {
  const isTransfer = mode === 'transfer';

  const handleChange = (field, value) => {
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

  return (
    <div className="border border-neutral-200/90 bg-white rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 text-xs">
      
      {/* Top Header of the form */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block">
            {isTransfer ? 'Configurar Traslado' : 'Configurar Excursión'}
          </span>
          <h2 className="font-bold text-sm text-neutral-900 leading-snug">
            {selectedItem?.name}
          </h2>
        </div>

        <span className="bg-neutral-100 text-neutral-700 font-medium text-[11px] px-2.5 py-1 rounded-lg">
          {isTransfer ? (formData.tripType === 'roundtrip' ? 'Ida y Vuelta' : 'Solo Ida') : formData.durationMode}
        </span>
      </div>

      {/* TRANSFER FIELDS */}
      {isTransfer && (
        <>
          {/* Trip Type Segment */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
              Tipo de Trayecto
            </label>
            <div className="grid grid-cols-2 gap-1 p-1 bg-neutral-100 rounded-xl">
              <button
                type="button"
                onClick={() => handleChange('tripType', 'oneway')}
                className={`py-1.5 px-3 rounded-lg font-medium text-xs transition-all cursor-pointer ${
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
                className={`py-1.5 px-3 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                  formData.tripType === 'roundtrip'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Ida y Vuelta
              </button>
            </div>
          </div>

          {/* Origin & Destination */}
          <div className="space-y-2.5">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-700 flex items-center justify-between">
                <span>Punto de Origen (Recogida)</span>
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

            {/* Swap button */}
            <div className="flex justify-center -my-1">
              <button
                type="button"
                onClick={handleSwap}
                className="p-1 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
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

          {/* Dates & Times */}
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
                  className="w-full px-2.5 py-1.5 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
                />
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange('time', e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
                />
              </div>
            </div>

            {formData.tripType === 'roundtrip' && (
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-neutral-700 block">
                  Fecha y Hora de Retorno
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => handleChange('returnDate', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
                  />
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => handleChange('returnTime', e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Flight Number (Optional) */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-neutral-700 flex items-center gap-1.5">
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
            <p className="text-[10px] text-neutral-400">
              Monitoreamos tu vuelo en tiempo real. No cobramos recargos por retrasos.
            </p>
          </div>
        </>
      )}

      {/* TOUR FIELDS */}
      {!isTransfer && (
        <>
          {/* Duration Selector */}
          <div>
            <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
              Modalidad de Duración
            </label>
            <div className="grid grid-cols-2 gap-1 p-1 bg-neutral-100 rounded-xl">
              <button
                type="button"
                onClick={() => handleChange('durationMode', 'Full Day')}
                className={`py-1.5 px-3 rounded-lg font-medium text-xs transition-all cursor-pointer ${
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
                className={`py-1.5 px-3 rounded-lg font-medium text-xs transition-all cursor-pointer ${
                  formData.durationMode === 'Medio Día'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Medio Día (~4h)
              </button>
            </div>
          </div>

          {/* Tour Date & Time */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-700 block">
                Fecha del Tour
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-neutral-700 block">
                Hora de Salida Sugerida
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-2.5 py-1.5 border border-neutral-200 rounded-xl bg-white text-xs text-neutral-800 outline-none"
              />
            </div>
          </div>

          {/* Pickup Address */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-neutral-700 block">
              Lugar de Recogida (Hotel / Cabaña / Airbnb)
            </label>
            <input
              type="text"
              placeholder="Ej: Hotel Cumbres, Cabañas Ensenada, etc."
              value={formData.pickupAddress}
              onChange={(e) => handleChange('pickupAddress', e.target.value)}
              className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
            />
          </div>
        </>
      )}

      {/* VEHICLE CATEGORY SELECTOR */}
      <div className="space-y-1.5 pt-1">
        <label className="text-[11px] font-semibold text-neutral-700 block">
          Categoría de Vehículo
        </label>
        <div className="grid grid-cols-3 gap-1.5">
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
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  isSel
                    ? 'border-[#0c0302] bg-[#0c0302] text-white shadow-xs'
                    : 'border-neutral-200 bg-neutral-50/50 hover:bg-neutral-100 text-neutral-800'
                }`}
              >
                <div className="font-semibold text-xs">{fleet.shortName}</div>
                <div className={`text-[10px] ${isSel ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {fleet.capacityPax}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PASSENGERS & LUGGAGE COUNTERS */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-neutral-500" />
            <span className="text-[11px] font-medium text-neutral-700">Pasajeros</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleChange('passengers', Math.max(1, formData.passengers - 1))}
              className="w-5 h-5 rounded bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-600 hover:bg-neutral-100"
            >
              -
            </button>
            <span className="font-semibold text-xs text-neutral-900 w-3 text-center">
              {formData.passengers}
            </span>
            <button
              type="button"
              onClick={() => handleChange('passengers', Math.min(15, formData.passengers + 1))}
              className="w-5 h-5 rounded bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-600 hover:bg-neutral-100"
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
                className="w-5 h-5 rounded bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-600 hover:bg-neutral-100"
              >
                -
              </button>
              <span className="font-semibold text-xs text-neutral-900 w-3 text-center">
                {formData.bags}
              </span>
              <button
                type="button"
                onClick={() => handleChange('bags', Math.min(15, formData.bags + 1))}
                className="w-5 h-5 rounded bg-white border border-neutral-200 flex items-center justify-center font-bold text-neutral-600 hover:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/40 flex items-center justify-between">
            <span className="text-[11px] font-medium text-neutral-700">Tipo de Tour</span>
            <span className="font-semibold text-[11px] text-neutral-900">100% Privado</span>
          </div>
        )}
      </div>

      {/* AMENITIES / EXTRAS */}
      <div className="pt-1">
        <label className="text-[11px] font-semibold text-neutral-600 block mb-1.5">
          Requerimientos Opcionales
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          <label className={`flex items-center gap-1.5 p-2 rounded-xl border text-[11px] cursor-pointer transition-colors ${
            formData.babySeat ? 'bg-neutral-100 border-neutral-400 font-semibold text-neutral-900' : 'border-neutral-200 bg-white text-neutral-600'
          }`}>
            <input
              type="checkbox"
              checked={formData.babySeat}
              onChange={(e) => handleChange('babySeat', e.target.checked)}
              className="rounded text-neutral-900 focus:ring-0"
            />
            <Baby className="w-3 h-3 text-neutral-500" />
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
            <Dog className="w-3 h-3 text-neutral-500" />
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
            <FileText className="w-3 h-3 text-neutral-500" />
            <span>Factura</span>
          </label>
        </div>
      </div>

      {/* CUSTOMER CONTACT FIELDS */}
      <div className="space-y-2 pt-2 border-t border-neutral-100">
        <label className="text-[11px] font-semibold text-neutral-700 block">
          Datos de Contacto
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Nombre y Apellido *"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
            required
          />
          <input
            type="tel"
            placeholder="WhatsApp / Teléfono *"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="email"
            placeholder="Email (opcional para voucher)"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
          />
          <input
            type="text"
            placeholder="Notas o requerimientos..."
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-200 rounded-xl outline-none focus:border-[#0c0302] bg-white text-xs placeholder:text-neutral-400"
          />
        </div>
      </div>

    </div>
  );
}
