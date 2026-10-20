import { CHOFFERS_PHONE_NUMBER } from '../data/pricingData';

export const formatCLP = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0';
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(amount);
};

export const generateBookingCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'CH-';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const buildWhatsAppUrl = (data) => {
  const isTransfer = data.mode === 'transfer';
  const tripTypeLabel = data.tripType === 'roundtrip' ? '🔄 Ida y Vuelta' : '➡️ Solo Ida';
  const serviceName = isTransfer ? (data.transferService?.name || 'Transfer Privado') : (data.tourService?.name || 'Tour Privado');

  let text = `*SOLICITUD DE RESERVA • CHOFFERS.CL*\n`;
  if (data.code) {
    text += `🔖 *Código Ref:* \`${data.code}\`\n`;
  }
  text += `──────────────────────\n`;
  text += `🚘 *Servicio:* ${serviceName}\n`;
  if (isTransfer) {
    text += `📍 *Modalidad:* ${tripTypeLabel}\n`;
    text += `🛫 *Origen:* ${data.originName || 'Aeropuerto PMC'}\n`;
    text += `🏁 *Destino:* ${data.destName || 'Puerto Varas'}\n`;
    if (data.originAddress) text += `📌 *Dirección origen:* ${data.originAddress}\n`;
    if (data.destAddress) text += `📌 *Dirección destino:* ${data.destAddress}\n`;
    if (data.flightNumber) text += `✈️ *Vuelo:* ${data.flightNumber.toUpperCase()}\n`;
  } else {
    text += `⏱️ *Modalidad:* ${data.durationMode || 'Full Day'}\n`;
    text += `🏨 *Lugar de Recogida:* ${data.pickupAddress || 'Puerto Varas'}\n`;
  }

  text += `📅 *Fecha:* ${data.date || 'Por coordinar'}\n`;
  text += `⏰ *Hora:* ${data.time || '10:00'}\n`;

  if (isTransfer && data.tripType === 'roundtrip') {
    text += `🔄 *Regreso:* ${data.returnDate || 'Mismo día'} a las ${data.returnTime || '18:00'}\n`;
  }

  text += `👥 *Pasajeros:* ${data.passengers || 2}\n`;
  text += `🚙 *Vehículo:* ${data.vehicle?.name || 'SUV Ejecutiva'}\n`;

  // Extras
  const extras = [];
  if (data.babySeat) extras.push('👶 Silla de niños');
  if (data.petFriendly) extras.push('🐾 Mascota en canil');
  if (data.needInvoice) extras.push('💼 Requiere Factura');
  if (data.bilingualGuide) extras.push('🗣️ Chofer bilingüe');

  if (extras.length > 0) {
    text += `✨ *Extras:* ${extras.join(', ')}\n`;
  }

  text += `\n👤 *CLIENTE:* ${data.fullName || 'No especificado'} (${data.phone || 'Sin teléfono'})\n`;
  if (data.email) text += `📧 *Email:* ${data.email}\n`;
  if (data.notes) text += `📝 *Notas:* ${data.notes}\n`;

  text += `──────────────────────\n`;
  text += `💰 *Tarifa Estimada:* *${formatCLP(data.totalPrice)}*\n`;
  text += `_Enviado desde go.choffers.cl_`;

  return `https://wa.me/${CHOFFERS_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
};
