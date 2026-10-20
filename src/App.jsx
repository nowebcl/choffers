import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ServiceSelector from './components/ServiceSelector';
import StepBookingCard from './components/StepBookingCard';
import WebpayPage from './components/WebpayPage';
import ThankYouView from './components/ThankYouView';
import FooterBar from './components/FooterBar';
import { TRANSFER_SERVICES, TOUR_SERVICES, FLEET_OPTIONS, LOCATIONS } from './data/pricingData';
import { generateBookingCode } from './utils/formatters';
import { generateAndDownloadReservationPDF } from './utils/pdfGenerator';

export default function App() {
  const [currentView, setCurrentView] = useState('booking'); // 'booking' | 'webpay' | 'thank-you'
  const [mode, setMode] = useState('transfer'); // 'transfer' | 'tour'

  const [selectedTransfer, setSelectedTransfer] = useState(TRANSFER_SERVICES[0]);
  const [selectedTour, setSelectedTour] = useState(TOUR_SERVICES[0]);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const returnDay = new Date(today);
  returnDay.setDate(returnDay.getDate() + 3);
  const returnDayStr = returnDay.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
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

    durationMode: 'Full Day',
    pickupAddress: '',

    babySeat: false,
    petFriendly: false,
    needInvoice: false,
    bilingualGuide: false,

    fullName: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [bookingCode, setBookingCode] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentMethodLabel, setPaymentMethodLabel] = useState('');

  const handleSelectItem = (item) => {
    if (mode === 'transfer') {
      setSelectedTransfer(item);
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

  const handleGoToWebpay = () => {
    setCurrentView('webpay');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSuccess = async ({ transactionId: txId, paymentMethodLabel: methodLabel }) => {
    const code = generateBookingCode();
    setBookingCode(code);
    setTransactionId(txId);
    setPaymentMethodLabel(methodLabel);

    // Descargar automáticamente el PDF con fondo blanco y logo de Choffers
    await generateAndDownloadReservationPDF({
      bookingCode: code,
      transactionId: txId,
      mode,
      selectedItem,
      formData,
      totalPrice,
      paymentMethodLabel: methodLabel
    });

    // Cambiar a la pantalla de confirmación con el mensaje de seguimiento por WhatsApp
    setCurrentView('thank-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-neutral-900 flex flex-col justify-between font-sans selection:bg-[#0c0302] selection:text-white">
      
      {/* Contenedor Principal */}
      <div className="max-w-5xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6 space-y-4 sm:space-y-5">
        
        {/* Header Minimalista: Solo Logo + Solo Llamar */}
        <Header setCurrentView={setCurrentView} />

        {/* Vistas de Página Completa (Sin Pop-ups) */}
        {currentView === 'booking' && (
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch pb-6">
            
            {/* Costado Izquierdo: Selector de Transfers y Tours Privados */}
            <div className="lg:col-span-5 flex flex-col">
              <ServiceSelector
                mode={mode}
                setMode={setMode}
                selectedItem={selectedItem}
                onSelectItem={handleSelectItem}
                selectedVehicleId={formData.selectedVehicleId}
              />
            </div>

            {/* Costado Derecho: Un solo cuadrado del mismo tamaño con Slider por Pasos */}
            <div className="lg:col-span-7 flex flex-col">
              <StepBookingCard
                mode={mode}
                selectedItem={selectedItem}
                formData={formData}
                setFormData={setFormData}
                totalPrice={totalPrice}
                onGoToWebpay={handleGoToWebpay}
              />
            </div>

          </main>
        )}

        {currentView === 'webpay' && (
          <WebpayPage
            selectedItem={selectedItem}
            formData={formData}
            totalPrice={totalPrice}
            onBack={() => setCurrentView('booking')}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {currentView === 'thank-you' && (
          <ThankYouView
            bookingCode={bookingCode}
            transactionId={transactionId}
            paymentMethodLabel={paymentMethodLabel}
            mode={mode}
            selectedItem={selectedItem}
            formData={formData}
            totalPrice={totalPrice}
            onBackToBooking={() => setCurrentView('booking')}
          />
        )}

      </div>

      {/* Footer Minimal */}
      <FooterBar />

    </div>
  );
}
