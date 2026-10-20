import React from 'react';
import { Car, Compass, Check, Sparkles } from 'lucide-react';
import { TRANSFER_SERVICES, TOUR_SERVICES, FLEET_OPTIONS } from '../data/pricingData';
import { formatCLP } from '../utils/formatters';

export default function ServiceSelector({ 
  mode, 
  setMode, 
  selectedItem, 
  onSelectItem, 
  selectedVehicleId 
}) {
  const isTransfer = mode === 'transfer';
  const list = isTransfer ? TRANSFER_SERVICES : TOUR_SERVICES;

  return (
    <div className="space-y-2">
      
      {/* Mode Switcher Segmented Control */}
      <div className="flex items-center gap-1 p-1 bg-neutral-200/60 rounded-2xl mb-2.5">
        <button
          type="button"
          onClick={() => setMode('transfer')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            isTransfer 
              ? 'bg-white text-neutral-900 shadow-xs' 
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Car className="w-3.5 h-3.5 text-neutral-500" />
          <span>Transfers & Aeropuerto</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('tour')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            !isTransfer 
              ? 'bg-white text-neutral-900 shadow-xs' 
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-neutral-500" />
          <span>Tours Privados</span>
        </button>
      </div>

      {/* Services / Tours List */}
      <div className="space-y-2">
        {list.map((item) => {
          const isSelected = selectedItem?.id === item.id;
          
          // Get price based on selected vehicle
          let displayPrice = item.priceSUV;
          if (selectedVehicleId === 'van') displayPrice = item.priceVan;
          if (selectedVehicleId === 'minibus') displayPrice = item.priceMinibus;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectItem(item)}
              className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#0c0302] bg-[#0c0302] text-white shadow-xs'
                  : 'border-neutral-200/90 hover:border-neutral-300 bg-white text-neutral-800'
              }`}
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className="font-semibold text-xs leading-snug">{item.name}</span>
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 text-[#fcbf27] shrink-0" />
                ) : (
                  item.popular && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60 shrink-0">
                      Popular
                    </span>
                  )
                )}
              </div>

              <div className={`text-[11px] mt-1 flex items-center justify-between ${
                isSelected ? 'text-neutral-300' : 'text-neutral-500'
              }`}>
                <span>{item.distance || item.duration}</span>
                <span className={`font-mono font-medium ${
                  isSelected ? 'text-[#fcbf27]' : 'text-neutral-900'
                }`}>
                  {formatCLP(displayPrice)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
