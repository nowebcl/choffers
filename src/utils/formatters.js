// Utilidades de formato y generadores de enlaces para WhatsApp

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

export const CHOFFERS_PHONE_NUMBER = '56995554665';
export const CHOFFERS_DISPLAY_PHONE = '+56 9 9555 4665';

export const buildTransferWhatsAppLink = (booking) => {
  const tripTypeLabel = booking.tripType === 'roundtrip' ? '🔄 Ida y Vuelta' : '➡️ Solo Ida';
  const vehicleName = booking.vehicle?.name || 'SUV / Sedán Ejecutivo';
  
  let msg = `*NUEVA SOLICITUD DE TRANSFER • CHOFFERS.CL*\n`;
  if (booking.bookingCode) {
    msg += `🔖 *Código Ref:* \`${booking.bookingCode}\`\n`;
  }
  msg += `─────────────────────────\n`;
  msg += `🚘 *Tipo de Viaje:* ${tripTypeLabel}\n`;
  msg += `📍 *Origen:* ${booking.originName || booking.customOrigin || 'No especificado'}\n`;
  msg += `🏁 *Destino:* ${booking.destName || booking.customDest || 'No especificado'}\n`;
  if (booking.originAddress) {
    msg += `📌 *Dirección exacta origen:* ${booking.originAddress}\n`;
  }
  if (booking.destAddress) {
    msg += `📌 *Dirección exacta destino:* ${booking.destAddress}\n`;
  }
  msg += `📅 *Fecha de Ida:* ${booking.date || 'Por coordinar'}\n`;
  msg += `⏰ *Hora de Ida:* ${booking.time || 'Por coordinar'}\n`;
  
  if (booking.tripType === 'roundtrip') {
    msg += `\n🔄 *DATOS DE RETORNO:*\n`;
    msg += `📅 *Fecha Retorno:* ${booking.returnDate || 'Mismo día'}\n`;
    msg += `⏰ *Hora Retorno:* ${booking.returnTime || 'Por coordinar'}\n`;
  }

  if (booking.flightNumber) {
    msg += `✈️ *N° de Vuelo:* ${booking.flightNumber.toUpperCase()}\n`;
  }

  msg += `\n👥 *Pasajeros:* ${booking.passengers || 1}\n`;
  msg += `🧳 *Equipaje:* ${booking.largeBags || 0} maletas grandes, ${booking.smallBags || 0} de mano\n`;
  msg += `🚙 *Vehículo solicitado:* ${vehicleName}\n`;

  // Extras
  const extras = [];
  if (booking.babySeat) extras.push('👶 Silla de bebé/niño (Gratis)');
  if (booking.petFriendly) extras.push('🐾 Viaja con mascota en canil');
  if (booking.needInvoice) extras.push('💼 Requiere Factura para empresa');
  if (booking.sportLuggage) extras.push('⛷️ Equipamiento especial / ski / bicicleta');

  if (extras.length > 0) {
    msg += `\n✨ *Requerimientos Adicionales:*\n${extras.map(e => `• ${e}`).join('\n')}\n`;
  }

  msg += `\n👤 *DATOS DEL PASAJERO:*\n`;
  msg += `• Nombre: ${booking.passengerName || 'Sin especificar'}\n`;
  msg += `• Teléfono: ${booking.passengerPhone || 'Sin especificar'}\n`;
  if (booking.passengerEmail) {
    msg += `• Email: ${booking.passengerEmail}\n`;
  }
  if (booking.notes) {
    msg += `• Comentarios/Notas: ${booking.notes}\n`;
  }

  msg += `─────────────────────────\n`;
  msg += `💰 *Tarifa Estimada:* *${formatCLP(booking.totalPrice)}*\n`;
  msg += `_Solicitado desde go.choffers.cl - ¿Me confirman disponibilidad por favor?_`;

  return `https://wa.me/${CHOFFERS_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
};

export const buildTourWhatsAppLink = (booking) => {
  const tourName = booking.tour?.title || 'Tour Privado en Puerto Varas';
  const vehicleName = booking.vehicle?.name || 'SUV / Sedán';

  let msg = `*NUEVA SOLICITUD DE TOUR PRIVADO • CHOFFERS.CL*\n`;
  if (booking.bookingCode) {
    msg += `🔖 *Código Ref:* \`${booking.bookingCode}\`\n`;
  }
  msg += `─────────────────────────\n`;
  msg += `🏔️ *Tour:* *${tourName}*\n`;
  msg += `⏱️ *Modalidad:* ${booking.durationMode || 'Día Completo'}\n`;
  msg += `📅 *Fecha Solicitada:* ${booking.date || 'Por coordinar'}\n`;
  msg += `⏰ *Hora Salida Sugerida:* ${booking.time || '09:00 hrs'}\n`;
  msg += `👥 *Pasajeros:* ${booking.passengers || 2} personas\n`;
  msg += `🏨 *Lugar de Recogida:* ${booking.pickupAddress || 'Hotel / Alojamiento en Puerto Varas'}\n`;
  msg += `🚙 *Categoría de Vehículo:* ${vehicleName}\n`;

  // Extras
  const extras = [];
  if (booking.bilingualGuide) extras.push('🗣️ Chofer / Asistencia bilingüe (EN/ES)');
  if (booking.babySeat) extras.push('👶 Silla para niños sin costo');
  if (booking.needInvoice) extras.push('💼 Requiere Factura para empresa');
  if (booking.petFriendly) extras.push('🐾 Pet friendly');

  if (extras.length > 0) {
    msg += `\n✨ *Detalles Adicionales:*\n${extras.map(e => `• ${e}`).join('\n')}\n`;
  }

  msg += `\n👤 *DATOS DEL CONTACTO:*\n`;
  msg += `• Nombre: ${booking.passengerName || 'Sin especificar'}\n`;
  msg += `• WhatsApp: ${booking.passengerPhone || 'Sin especificar'}\n`;
  if (booking.passengerEmail) {
    msg += `• Email: ${booking.passengerEmail}\n`;
  }
  if (booking.notes) {
    msg += `• Comentarios/Preferencias: ${booking.notes}\n`;
  }

  msg += `─────────────────────────\n`;
  msg += `💰 *Tarifa Estimada del Tour:* *${formatCLP(booking.totalPrice)}*\n`;
  msg += `_Solicitado desde go.choffers.cl - ¿Tienen disponibilidad para esta fecha?_`;

  return `https://wa.me/${CHOFFERS_PHONE_NUMBER}?text=${encodeURIComponent(msg)}`;
};
