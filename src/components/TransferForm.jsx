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
  FileText, 
  Dog, 
  Sparkles, 
  Check, 
  Info,
  Car
} from 'lucide-react';
import { LOCATIONS, FLEET_OPTIONS, POPULAR_ROUTES } from '../data/pricingData';
import { formatCLP } from '../utils/formatters';

export default function TransferForm({ 
  formData, 
  setFormData, 
  calculatedPrice,
  onQuickRouteSelect 
}) {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSwapLocations = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
      originName: prev.destName,
      destName: prev.originName,
      originAddress: prev.destAddress,
      destAddress: prev.originAddress
    }));
  };

  const handleOriginChange = (e) => {
    const locId = e.target.value;
    const loc = LOCATIONS.find(l => l.id === locId);
    setFormData(prev => ({
      ...prev,
      origin: locId,
      originName: loc ? loc.name : ''
    }));
  };

  const handleDestChange = (e) => {
    const locId = e.target.value;
    const loc = LOCATIONS.find(l => l.id === locId);
    setFormData(prev => ({
      ...prev,
      destination: locId,
      destName: loc ? loc.name : ''
    }));
  };

  const isRoundTrip = formData.tripType === 'roundtrip';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-card space-y-8 animate-fade-in">
      
      {/* 1. Trip Type Switcher */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            1. Tipo de Trayecto
          </label>
          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
            Servicio 100% Privado
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60 max-w-sm">
          <button
            type="button"
            onClick={() => handleInputChange('tripType', 'oneway')}
            className={`py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all duration-150 ${
              !isRoundTrip 
                ? 'bg-white text-navy-900 shadow-sm ring-1 ring-black/5' 
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            Solo Ida (One Way)
          </button>
          <button
            type="button"
            onClick={() => handleInputChange('tripType', 'roundtrip')}
            className={`py-2.5 px-4 text-xs sm:text-sm font-bold rounded-xl transition-all duration-150 ${
              isRoundTrip 
                ? 'bg-white text-navy-900 shadow-sm ring-1 ring-black/5' 
                : 'text-slate-600 hover:text-navy-900'
            }`}
          >
            Ida y Vuelta (Round Trip)
          </button>
        </div>
      </div>

      {/* 2. Pickup & Dropoff Locations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            2. Puntos de Traslado
          </label>
          <span className="text-xs text-slate-500">Cobertura en toda la cuenca del lago</span>
        </div>

        {/* Quick Route Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-medium whitespace-nowrap">Rutas rápidas:</span>
          {POPULAR_ROUTES.slice(0, 4).map(route => (
            <button
              key={route.id}
              type="button"
              onClick={() => onQuickRouteSelect(route)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium whitespace-nowrap transition-colors"
            >
              {route.originName.replace('Aeropuerto El Tepual (PMC)', 'PMC')} → {route.destName.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Origin */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Punto de Origen / Recogida
            </label>
            <div className="relative">
              <select
                value={formData.origin}
                onChange={handleOriginChange}
                className="w-full px-4 py-3 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              >
                <option value="">Selecciona punto de partida...</option>
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Dirección exacta, Hotel, Cabaña o N° de casa..."
              value={formData.originAddress}
              onChange={(e) => handleInputChange('originAddress', e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          {/* Swap Button for Desktop & Mobile */}
          <button
            type="button"
            onClick={handleSwapLocations}
            aria-label="Invertir origen y destino"
            title="Invertir origen y destino"
            className="md:absolute md:top-8 md:left-1/2 md:-translate-x-1/2 z-10 w-9 h-9 mx-auto rounded-full bg-white border border-slate-200 shadow-sm hover:shadow flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-400 active:scale-95 transition-all"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* Destination */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-navy-900"></span>
              Punto de Destino
            </label>
            <div className="relative">
              <select
                value={formData.destination}
                onChange={handleDestChange}
                className="w-full px-4 py-3 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              >
                <option value="">Selecciona punto de llegada...</option>
                {LOCATIONS.map(loc => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Dirección exacta de llegada o nombre de hotel..."
              value={formData.destAddress}
              onChange={(e) => handleInputChange('destAddress', e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

        </div>
      </div>

      {/* 3. Dates & Schedules */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          3. Fecha y Horarios de Recogida
        </label>

        <div className={`grid grid-cols-1 ${isRoundTrip ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-4`}>
          
          {/* Outbound Date & Time */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
            <span className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Viaje de Ida
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-slate-500 font-medium block mb-1">Fecha</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-500 font-medium block mb-1">Hora</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Return Date & Time (Conditional) */}
          {isRoundTrip && (
            <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/70 space-y-3">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Viaje de Retorno
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-500 font-medium block mb-1">Fecha Retorno</label>
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => handleInputChange('returnDate', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-500 font-medium block mb-1">Hora Retorno</label>
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => handleInputChange('returnTime', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Flight Number Box */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-blue-600" />
              N° de Vuelo (Opcional)
            </span>
            <input
              type="text"
              placeholder="Ej: LATAM LA123 o SKY H245"
              value={formData.flightNumber}
              onChange={(e) => handleInputChange('flightNumber', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium uppercase placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <p className="text-[10px] text-slate-500 leading-tight">
              Monitoreamos tu vuelo sin cobro por demoras de aerolínea.
            </p>
          </div>

        </div>
      </div>

      {/* 4. Passengers & Luggage */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          4. Pasajeros y Equipaje
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Passenger count */}
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-xs font-bold text-slate-800">Pasajeros</p>
                <p className="text-[11px] text-slate-500">Adultos y niños</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleInputChange('passengers', Math.max(1, formData.passengers - 1))}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition"
              >
                -
              </button>
              <span className="text-sm font-bold w-5 text-center text-navy-950">
                {formData.passengers}
              </span>
              <button
                type="button"
                onClick={() => handleInputChange('passengers', Math.min(15, formData.passengers + 1))}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Large Luggage */}
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-xs font-bold text-slate-800">Maletas Bodega</p>
                <p className="text-[11px] text-slate-500">23 kg estándar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleInputChange('largeBags', Math.max(0, formData.largeBags - 1))}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition"
              >
                -
              </button>
              <span className="text-sm font-bold w-5 text-center text-navy-950">
                {formData.largeBags}
              </span>
              <button
                type="button"
                onClick={() => handleInputChange('largeBags', Math.min(15, formData.largeBags + 1))}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Hand Luggage */}
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs font-bold text-slate-800">Equipaje de Mano</p>
                <p className="text-[11px] text-slate-500">Mochila o Carry-on</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleInputChange('smallBags', Math.max(0, formData.smallBags - 1))}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition"
              >
                -
              </button>
              <span className="text-sm font-bold w-5 text-center text-navy-950">
                {formData.smallBags}
              </span>
              <button
                type="button"
                onClick={() => handleInputChange('smallBags', Math.min(15, formData.smallBags + 1))}
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition"
              >
                +
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Vehicle Category Selection */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            5. Selección de Vehículo
          </label>
          <span className="text-xs text-slate-500">Vehículos modernos con climatizador</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {FLEET_OPTIONS.map((fleet) => {
            const isSelected = formData.selectedVehicleId === fleet.id;
            // Approximate price preview for this vehicle
            const mult = fleet.basePriceMultiplier;
            const previewPrice = calculatedPrice ? Math.round((calculatedPrice / (formData.vehicle?.basePriceMultiplier || 1)) * mult) : null;

            return (
              <div
                key={fleet.id}
                onClick={() => {
                  handleInputChange('selectedVehicleId', fleet.id);
                  handleInputChange('vehicle', fleet);
                }}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between ${
                  isSelected 
                    ? 'border-blue-600 bg-blue-50/40 shadow-sm ring-1 ring-blue-600' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {fleet.tag}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-navy-900 leading-tight">
                    {fleet.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                    {fleet.description}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span>{fleet.capacityPax}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[11px]">{fleet.capacityBags}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Tarifa trayecto:</span>
                  <span className="text-sm font-extrabold text-navy-900">
                    {previewPrice ? formatCLP(previewPrice) : 'A calcular'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Special Amenities & Extras */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          6. Servicios Adicionales (Sin recargo)
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <label className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition ${
            formData.babySeat ? 'bg-blue-50/70 border-blue-400 text-blue-900' : 'bg-slate-50/60 border-slate-200 text-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={formData.babySeat}
              onChange={(e) => handleInputChange('babySeat', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <Baby className="w-3.5 h-3.5 text-blue-600" />
            <span>Silla de Bebé</span>
          </label>

          <label className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition ${
            formData.petFriendly ? 'bg-blue-50/70 border-blue-400 text-blue-900' : 'bg-slate-50/60 border-slate-200 text-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={formData.petFriendly}
              onChange={(e) => handleInputChange('petFriendly', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <Dog className="w-3.5 h-3.5 text-blue-600" />
            <span>Mascota (Canil)</span>
          </label>

          <label className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition ${
            formData.needInvoice ? 'bg-blue-50/70 border-blue-400 text-blue-900' : 'bg-slate-50/60 border-slate-200 text-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={formData.needInvoice}
              onChange={(e) => handleInputChange('needInvoice', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Factura Empresa</span>
          </label>

          <label className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition ${
            formData.sportLuggage ? 'bg-blue-50/70 border-blue-400 text-blue-900' : 'bg-slate-50/60 border-slate-200 text-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={formData.sportLuggage}
              onChange={(e) => handleInputChange('sportLuggage', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Ski / Bicicleta</span>
          </label>
        </div>
      </div>

      {/* 7. Passenger Contact Information */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          7. Datos de Contacto y Pasajero
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Nombre y Apellido <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={formData.passengerName}
              onChange={(e) => handleInputChange('passengerName', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/60 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              WhatsApp / Teléfono Móvil <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+56 9 1234 5678"
              value={formData.passengerPhone}
              onChange={(e) => handleInputChange('passengerPhone', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/60 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Correo Electrónico (para voucher)
            </label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={formData.passengerEmail}
              onChange={(e) => handleInputChange('passengerEmail', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/60 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Comentarios o Notas para el Chofer
            </label>
            <input
              type="text"
              placeholder="Ej: Esperar en puerta 2, viajamos con persona mayor..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/60 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
