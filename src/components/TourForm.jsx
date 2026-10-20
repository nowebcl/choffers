import React from 'react';
import { 
  Compass, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Check, 
  Sparkles, 
  Languages, 
  Baby, 
  FileText, 
  Info,
  Car
} from 'lucide-react';
import { TOUR_PACKAGES, FLEET_OPTIONS } from '../data/pricingData';
import { formatCLP } from '../utils/formatters';

export default function TourForm({ formData, setFormData }) {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTourSelect = (tour) => {
    setFormData(prev => ({
      ...prev,
      selectedTourId: tour.id,
      tour: tour,
      durationMode: tour.defaultDuration
    }));
  };

  const selectedTour = formData.tour || TOUR_PACKAGES[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 shadow-card space-y-8 animate-fade-in">
      
      {/* 1. Tour Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            1. Elige tu Excursión Privada
          </label>
          <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
            100% Exclusivo para tu grupo
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Sin horarios apresurados ni grupos de desconocidos. El chofer y vehículo se adaptan a tu ritmo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {TOUR_PACKAGES.map((tour) => {
            const isSelected = formData.selectedTourId === tour.id;

            return (
              <div
                key={tour.id}
                onClick={() => handleTourSelect(tour)}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
                      {tour.duration}
                    </span>
                    {tour.popular && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        Imperdible
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-navy-950 leading-snug">
                    {tour.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {tour.subtitle}
                  </p>

                  <div className="mt-3 space-y-1">
                    {tour.highlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0"></span>
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Valor por grupo (SUV):</span>
                  <span className="text-sm font-extrabold text-navy-900">
                    {formatCLP(tour.pricePerGroupSUV)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Duration Mode & Preferred Start Time */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          2. Modalidad y Horarios
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Duration Mode */}
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold text-navy-900 block">Duración del Tour</span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => handleInputChange('durationMode', 'Full Day')}
                className={`py-2 px-2 text-xs font-bold rounded-xl transition ${
                  formData.durationMode === 'Full Day'
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                Full Day (~8h)
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('durationMode', 'Medio Día')}
                className={`py-2 px-2 text-xs font-bold rounded-xl transition ${
                  formData.durationMode === 'Medio Día'
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                Medio Día (~4h)
              </button>
            </div>
          </div>

          {/* Tour Date */}
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-1">
            <label className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              Fecha del Tour
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Tour Start Time */}
          <div className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-1">
            <label className="text-xs font-bold text-navy-900 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Hora de Salida Sugerida
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

        </div>
      </div>

      {/* 3. Passengers & Pickup Location */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          3. Pasajeros y Punto de Partida
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Passenger Counter */}
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-slate-500" />
              <div>
                <p className="text-xs font-bold text-slate-800">Pasajeros</p>
                <p className="text-[11px] text-slate-500">Total en tu grupo</p>
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

          {/* Pickup address */}
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              Lugar de Recogida (Hotel / Cabaña / Airbnb)
            </label>
            <input
              type="text"
              placeholder="Ej: Hotel Cumbres Puerto Varas, Cabañas Ensenada, etc."
              value={formData.pickupAddress}
              onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

        </div>
      </div>

      {/* 4. Vehicle Selection for Tour */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          4. Vehículo Asignado para la Excursión
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FLEET_OPTIONS.map((fleet) => {
            const isSelected = formData.selectedVehicleId === fleet.id;
            let tourPrice = selectedTour.pricePerGroupSUV;
            if (fleet.id === 'van') tourPrice = selectedTour.pricePerGroupVan;
            if (fleet.id === 'minibus') tourPrice = selectedTour.pricePerGroupMinibus;

            return (
              <div
                key={fleet.id}
                onClick={() => {
                  handleInputChange('selectedVehicleId', fleet.id);
                  handleInputChange('vehicle', fleet);
                }}
                className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600 shadow-sm'
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
                  <p className="text-[11px] text-slate-500 mt-1">
                    Capacidad: {fleet.capacityPax}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Total Tour:</span>
                  <span className="text-sm font-extrabold text-navy-900">
                    {formatCLP(tourPrice)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Tour Preferences & Extras */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          5. Preferencias del Tour
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <label className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition ${
            formData.bilingualGuide ? 'bg-blue-50/70 border-blue-400 text-blue-900' : 'bg-slate-50/60 border-slate-200 text-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={formData.bilingualGuide}
              onChange={(e) => handleInputChange('bilingualGuide', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <Languages className="w-3.5 h-3.5 text-blue-600" />
            <span>Chofer Bilingüe (EN)</span>
          </label>

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
            <span>Silla de Niños</span>
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
            formData.petFriendly ? 'bg-blue-50/70 border-blue-400 text-blue-900' : 'bg-slate-50/60 border-slate-200 text-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={formData.petFriendly}
              onChange={(e) => handleInputChange('petFriendly', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Pet Friendly</span>
          </label>
        </div>
      </div>

      {/* 6. Contact Information */}
      <div className="space-y-4 pt-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          6. Datos de Contacto
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Nombre y Apellido <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Macarena Silva"
              value={formData.passengerName}
              onChange={(e) => handleInputChange('passengerName', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/60 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              WhatsApp / Teléfono <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+56 9 8765 4321"
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
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="contacto@ejemplo.com"
              value={formData.passengerEmail}
              onChange={(e) => handleInputChange('passengerEmail', e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/60 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Preferencias o Solicitudes Especiales
            </label>
            <input
              type="text"
              placeholder="Ej: Paradas para almorzar kuchen, fotos en mirador..."
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
