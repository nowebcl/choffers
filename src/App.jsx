import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ServiceSelector from './components/ServiceSelector';
import BookingForm from './components/BookingForm';
import SummaryCard from './components/SummaryCard';
import ThankYouView from './components/ThankYouView';
import FooterBar from './components/FooterBar';
import { TRANSFER_SERVICES, TOUR_SERVICES, FLEET_OPTIONS, LOCATIONS } from './data/pricingData';
import { generateBookingCode } from './utils/formatters';

export default function App() {
  const [currentView, setCurrentView] = useState('booking'); // 'booking' | 'thank-you'
  const [mode, setMode] = useState('transfer'); // 'transfer' | 'tour'

  const [selectedTransfer, setSelectedTransfer] = useState(TRANSFER_SERVICES[0]);
  const [selectedTour, setSelectedTour] = useState(TOUR_SERVICES[0]);

  // Tomorrow date string
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const returnDay = new Date(today);
  returnDay.setDate(returnDay.getDate() + 3);
  const returnDayStr = returnDay.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    // Transfer fields
    tripType: 'oneway',
    originId: 'pmc',
    originName: 'Aeropuerto El Tepual (PMC) - Puerto Montt',
    originAddress: '',
    destId: 'pv_centro',
    destName: 'Puerto Varas - Centro / Costanera',
    destAddress: '',
    date: tomorrowStr,
    time: '11:00',
    returnDate: returnDayStr,
    returnTime: '17:00',
    flightNumber: '',
    passengers: 2,
    bags: 2,
    selectedVehicleId: 'suv',
    vehicle: FLEET_OPTIONS[0],

    // Tour fields
    durationMode: 'Full Day',
    pickupAddress: '',

    // Extras
    babySeat: false,
    petFriendly: false,
    needInvoice: false,
    bilingualGuide: false,

    // Customer
    fullName: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [bookingCode, setBookingCode] = useState('');

  // Handle service selection
  const handleSelectItem = (item) => {
    if (mode === 'transfer') {
      setSelectedTransfer(item);
      // update origin/dest if exists
      const origLoc = LOCATIONS.find(l => l.id === item.originId);
      const destLoc = LOCATIONS.find(l => l.id === item.destId);
      setFormData(prev => ({
        ...prev,
        originId: item.originId || prev.originId,
        originName: origLoc ? origLoc.name : prev.originName,
        destId: item.destId || prev.destId,
        destName: destLoc ? destLoc.name : prev.destName,
      }));
    } else {
      setSelectedTour(item);
      setFormData(prev => ({
        ...prev,
        durationMode: item.defaultDuration
      }));
    }
  };

  const selectedItem = mode === 'transfer' ? selectedTransfer : selectedTour;

  // Price Calculation
  const totalPrice = useMemo(() => {
    let base = selectedItem.priceSUV;
    if (formData.selectedVehicleId === 'van') base = selectedItem.priceVan;
    if (formData.selectedVehicleId === 'minibus') base = selectedItem.priceMinibus;

    if (mode === 'transfer') {
      if (formData.tripType === 'roundtrip') {
        return Math.round(base * 1.95);
      }
      return base;
    } else {
      if (formData.durationMode === 'Medio Día' && selectedItem.defaultDuration === 'Full Day') {
        return Math.round(base * 0.8);
      }
      return base;
    }
  }, [mode, selectedItem, formData.selectedVehicleId, formData.tripType, formData.durationMode]);

  const handleConfirmOnline = () => {
    const code = generateBookingCode();
    setBookingCode(code);
    setCurrentView('thank-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-neutral-900 flex flex-col justify-between font-sans selection:bg-[#0c0302] selection:text-white">
      
      {/* Central app wrapper */}
      <div className="max-w-5xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6 space-y-4 sm:space-y-5">
        
        {/* Minimal Glass Header */}
        <Header 
          currentView={currentView}
          setCurrentView={setCurrentView}
        />

        {/* View Switcher: Booking vs Thank You */}
        {currentView === 'booking' ? (
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start pb-6">
            
            {/* Col 1: Service / Tour Selector (4 cols) */}
            <div className="lg:col-span-4">
              <ServiceSelector
                mode={mode}
                setMode={setMode}
                selectedItem={selectedItem}
                onSelectItem={handleSelectItem}
                selectedVehicleId={formData.selectedVehicleId}
              />
            </div>

            {/* Col 2: Configuration Form (5 cols) */}
            <div className="lg:col-span-5">
              <BookingForm
                mode={mode}
                selectedItem={selectedItem}
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            {/* Col 3: Summary & Order Action (3 cols) */}
            <div className="lg:col-span-3">
              <SummaryCard
                mode={mode}
                selectedItem={selectedItem}
                formData={formData}
                totalPrice={totalPrice}
                onConfirmOnline={handleConfirmOnline}
              />
            </div>

          </main>
        ) : (
          <ThankYouView
            bookingCode={bookingCode}
            mode={mode}
            selectedItem={selectedItem}
            formData={formData}
            totalPrice={totalPrice}
            onBackToBooking={() => setCurrentView('booking')}
          />
        )}

      </div>

      {/* Clean Minimal Footer */}
      <FooterBar />

    </div>
  );
}
