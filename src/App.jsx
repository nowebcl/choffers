import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TransferForm from './components/TransferForm';
import TourForm from './components/TourForm';
import BookingSummaryCard from './components/BookingSummaryCard';
import ConfirmationModal from './components/ConfirmationModal';
import PopularRoutesGrid from './components/PopularRoutesGrid';
import FleetShowcase from './components/FleetShowcase';
import WhyChooseUs from './components/WhyChooseUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { LOCATIONS, FLEET_OPTIONS, POPULAR_ROUTES, TOUR_PACKAGES } from './data/pricingData';
import { generateBookingCode } from './utils/formatters';

export default function App() {
  const [activeTab, setActiveTab] = useState('transfer'); // 'transfer' | 'tour'

  // Default dates
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const returnDay = new Date(today);
  returnDay.setDate(returnDay.getDate() + 3);
  const returnDayStr = returnDay.toISOString().split('T')[0];

  // Transfer Form State
  const [transferData, setTransferData] = useState({
    tripType: 'oneway', // 'oneway' | 'roundtrip'
    origin: 'pmc',
    originName: 'Aeropuerto El Tepual (PMC) - Puerto Montt',
    originAddress: '',
    destination: 'pv_centro',
    destName: 'Puerto Varas - Centro / Costanera',
    destAddress: '',
    date: tomorrowStr,
    time: '11:30',
    returnDate: returnDayStr,
    returnTime: '17:00',
    flightNumber: '',
    passengers: 2,
    largeBags: 2,
    smallBags: 2,
    selectedVehicleId: 'suv',
    vehicle: FLEET_OPTIONS[0],
    babySeat: false,
    petFriendly: false,
    needInvoice: false,
    sportLuggage: false,
    passengerName: '',
    passengerPhone: '',
    passengerEmail: '',
    notes: ''
  });

  // Tour Form State
  const [tourData, setTourData] = useState({
    selectedTourId: TOUR_PACKAGES[0].id,
    tour: TOUR_PACKAGES[0],
    durationMode: 'Full Day',
    date: tomorrowStr,
    time: '09:00',
    passengers: 2,
    pickupAddress: '',
    selectedVehicleId: 'suv',
    vehicle: FLEET_OPTIONS[0],
    bilingualGuide: false,
    babySeat: false,
    needInvoice: false,
    petFriendly: false,
    passengerName: '',
    passengerPhone: '',
    passengerEmail: '',
    notes: ''
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  // Calculate Transfer Price
  const transferPrice = useMemo(() => {
    const orig = transferData.origin;
    const dest = transferData.destination;
    const vehicleId = transferData.selectedVehicleId;

    // Check if it matches popular routes
    const matchedRoute = POPULAR_ROUTES.find(r => 
      (r.originId === orig && r.destId === dest) ||
      (r.originId === dest && r.destId === orig)
    );

    let base = 28000;
    if (matchedRoute) {
      if (vehicleId === 'van') base = matchedRoute.priceVan;
      else if (vehicleId === 'minibus') base = matchedRoute.priceMinibus;
      else base = matchedRoute.priceSUV;
    } else {
      // Estimate based on vehicle multiplier
      const multiplier = transferData.vehicle?.basePriceMultiplier || 1.0;
      base = Math.round(30000 * multiplier);
    }

    // Roundtrip logic (5% discount on round trip)
    if (transferData.tripType === 'roundtrip') {
      return Math.round(base * 1.95);
    }
    return base;
  }, [
    transferData.origin, 
    transferData.destination, 
    transferData.selectedVehicleId, 
    transferData.tripType, 
    transferData.vehicle
  ]);

  // Calculate Tour Price
  const tourPrice = useMemo(() => {
    const tour = tourData.tour || TOUR_PACKAGES[0];
    const vehicleId = tourData.selectedVehicleId;

    let base = tour.pricePerGroupSUV;
    if (vehicleId === 'van') base = tour.pricePerGroupVan;
    else if (vehicleId === 'minibus') base = tour.pricePerGroupMinibus;

    if (tourData.durationMode === 'Medio Día' && tour.defaultDuration === 'Full Day') {
      base = Math.round(base * 0.8);
    }

    return base;
  }, [tourData.tour, tourData.selectedVehicleId, tourData.durationMode]);

  // Current Active Total Price
  const currentTotalPrice = activeTab === 'transfer' ? transferPrice : tourPrice;
  const currentBookingData = activeTab === 'transfer' ? transferData : tourData;

  const handleOpenModal = () => {
    const code = generateBookingCode();
    setBookingCode(code);
    setIsModalOpen(true);
  };

  const handleSelectQuickRoute = (route) => {
    const origLoc = LOCATIONS.find(l => l.id === route.originId);
    const destLoc = LOCATIONS.find(l => l.id === route.destId);

    setTransferData(prev => ({
      ...prev,
      origin: route.originId,
      originName: origLoc ? origLoc.name : route.originName,
      destination: route.destId,
      destName: destLoc ? destLoc.name : route.destName,
    }));

    setActiveTab('transfer');

    // Smooth scroll to form container
    const formEl = document.getElementById('booking-section');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero & Tabs Switcher */}
      <Hero 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* 3. Main Booking Section (Forms + Sticky Summary) */}
      <main id="booking-section" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Active Form (8 Cols) */}
          <div className="lg:col-span-8">
            {activeTab === 'transfer' ? (
              <TransferForm
                formData={transferData}
                setFormData={setTransferData}
                calculatedPrice={transferPrice}
                onQuickRouteSelect={handleSelectQuickRoute}
              />
            ) : (
              <TourForm
                formData={tourData}
                setFormData={setTourData}
              />
            )}
          </div>

          {/* Right Column: Sticky Summary Card (4 Cols) */}
          <div className="lg:col-span-4">
            <BookingSummaryCard
              mode={activeTab}
              bookingData={currentBookingData}
              totalPrice={currentTotalPrice}
              onOpenConfirmationModal={handleOpenModal}
            />
          </div>

        </div>
      </main>

      {/* 4. Popular Routes Grid */}
      <PopularRoutesGrid onSelectRoute={handleSelectQuickRoute} />

      {/* 5. Fleet Showcase */}
      <FleetShowcase />

      {/* 6. Why Choose Us & Testimonials */}
      <WhyChooseUs />

      {/* 7. FAQ Section */}
      <FAQ />

      {/* 8. Footer */}
      <Footer />

      {/* 9. Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingCode={bookingCode}
        mode={activeTab}
        bookingData={currentBookingData}
        totalPrice={currentTotalPrice}
      />

    </div>
  );
}
