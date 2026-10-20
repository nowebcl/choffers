import { jsPDF } from 'jspdf';
import { formatCLP } from './formatters';
import { CHOFFERS_DISPLAY_PHONE, CHOFFERS_EMAIL } from '../data/pricingData';

// Helper to load /Recurso-3.webp onto a white/transparent canvas and get PNG data URL for jsPDF
const loadLogoAsPngDataUrl = (src) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width || 498;
      canvas.height = img.height || 240;
      const ctx = canvas.getContext('2d');
      // Fill white background so logo looks clean on white PDF
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      resolve({
        dataUrl: canvas.toDataURL('image/png'),
        width: canvas.width,
        height: canvas.height
      });
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

export const generateAndDownloadReservationPDF = async ({
  bookingCode,
  transactionId,
  mode,
  selectedItem,
  formData,
  totalPrice,
  paymentMethodLabel
}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const isTransfer = mode === 'transfer';

  // Ensure pure white background on entire page
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, 'F');

  // 1. Load and place Choffers Logo on top left
  const logoData = await loadLogoAsPngDataUrl('/Recurso-3.webp');
  if (logoData) {
    const logoWidth = 42;
    const logoHeight = (logoData.height / logoData.width) * logoWidth;
    doc.addImage(logoData.dataUrl, 'PNG', 20, 18, logoWidth, logoHeight);
  } else {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(12, 3, 2);
    doc.text('CHOFFERS', 20, 28);
  }

  // Right header: Comprobante Title & Code
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(12, 3, 2);
  doc.text('COMPROBANTE DE RESERVA Y PAGO', 190, 24, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(115, 115, 115);
  doc.text(`Código de Reserva: ${bookingCode}`, 190, 30, { align: 'right' });
  doc.text(`Transacción Webpay: ${transactionId || 'TBK-APROBADO'}`, 190, 35, { align: 'right' });
  doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString('es-CL')}`, 190, 40, { align: 'right' });

  // Horizontal subtle divider
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.4);
  doc.line(20, 46, 190, 46);

  // Status Badge Box
  doc.setFillColor(245, 253, 248);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(20, 52, 170, 12, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(22, 101, 52);
  doc.text('ESTADO: RESERVA CONFIRMADA Y PAGADA VÍA WEBPAY PLUS', 26, 59.5);

  // Section 1: Detalles del Servicio
  let y = 76;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(12, 3, 2);
  doc.text('1. DETALLES DEL SERVICIO RESERVADO', 20, y);

  y += 4;
  doc.setDrawColor(240, 240, 240);
  doc.line(20, y, 190, y);

  const addRow = (label, value) => {
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(115, 115, 115);
    doc.text(label, 20, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(23, 23, 23);
    doc.text(String(value || '-'), 85, y);
  };

  addRow('Tipo de Servicio:', isTransfer ? 'Transfer Privado / Aeropuerto' : 'Tour Turístico Exclusivo');
  addRow('Ruta / Excursión:', selectedItem?.name || '-');
  addRow(
    'Modalidad:',
    isTransfer
      ? formData.tripType === 'roundtrip'
        ? 'Ida y Vuelta (Round Trip)'
        : 'Solo Ida (One Way)'
      : formData.durationMode || 'Full Day'
  );

  if (isTransfer) {
    addRow('Punto de Origen:', `${formData.originName || ''} ${formData.originAddress ? `(${formData.originAddress})` : ''}`);
    addRow('Punto de Destino:', `${formData.destName || ''} ${formData.destAddress ? `(${formData.destAddress})` : ''}`);
    if (formData.flightNumber) {
      addRow('N° de Vuelo (PMC):', formData.flightNumber.toUpperCase());
    }
  } else {
    addRow('Lugar de Recogida:', formData.pickupAddress || 'Hotel / Domicilio en Puerto Varas');
  }

  addRow('Fecha y Hora de Ida:', `${formData.date || '-'} a las ${formData.time || '-'} hrs`);
  if (isTransfer && formData.tripType === 'roundtrip') {
    addRow('Fecha y Hora Regreso:', `${formData.returnDate || '-'} a las ${formData.returnTime || '-'} hrs`);
  }

  addRow('Vehículo Asignado:', `${formData.vehicle?.name || 'SUV Ejecutiva'} (${formData.vehicle?.capacityPax || ''})`);
  addRow('Pasajeros / Equipaje:', `${formData.passengers} pasajero(s)${isTransfer ? ` • ${formData.bags} maleta(s)` : ''}`);

  const extras = [];
  if (formData.babySeat) extras.push('Silla niños');
  if (formData.petFriendly) extras.push('Mascota');
  if (formData.needInvoice) extras.push('Factura empresa');
  if (extras.length > 0) {
    addRow('Requerimientos Extra:', extras.join(', '));
  }

  // Section 2: Datos del Pasajero
  y += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(12, 3, 2);
  doc.text('2. DATOS DEL PASAJERO TITULAR', 20, y);

  y += 4;
  doc.setDrawColor(240, 240, 240);
  doc.line(20, y, 190, y);

  addRow('Nombre Titular:', formData.fullName || 'Pasajero Confirmado');
  addRow('Teléfono / WhatsApp:', formData.phone || '-');
  if (formData.email) addRow('Correo Electrónico:', formData.email);
  if (formData.notes) addRow('Observaciones:', formData.notes);

  // Section 3: Resumen de Pago Webpay
  y += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(12, 3, 2);
  doc.text('3. DETALLE DEL PAGO (TRANSBANK WEBPAY)', 20, y);

  y += 4;
  doc.setDrawColor(240, 240, 240);
  doc.line(20, y, 190, y);

  addRow('Medio de Pago:', paymentMethodLabel || 'Webpay Plus (Tarjeta Débito / Crédito)');
  addRow('Código Autorización:', transactionId || 'TBK-948201');
  addRow('Incluye:', 'Combustible, peajes, espera en aeropuerto y seguro de pasajeros');

  // Total Box
  y += 10;
  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(220, 220, 220);
  doc.roundedRect(20, y, 170, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(12, 3, 2);
  doc.text('TOTAL PAGADO:', 26, y + 10);

  doc.setFontSize(13);
  doc.text(`${formatCLP(totalPrice)} CLP`, 184, y + 10, { align: 'right' });

  // Footer box with WhatsApp & Tracking info
  y += 28;
  doc.setFillColor(255, 251, 235);
  doc.setDrawColor(252, 191, 39);
  doc.roundedRect(20, y, 170, 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(12, 3, 2);
  doc.text('SEGUIMIENTO DIRECTO DE TU SERVICIO VÍA WHATSAPP', 26, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text(
    `Para seguimiento en tiempo real y contacto con tu conductor asignado, escríbenos al WhatsApp ${CHOFFERS_DISPLAY_PHONE}`,
    26,
    y + 14
  );
  doc.text(`indicando tu código de reserva ${bookingCode}. Correo oficial: ${CHOFFERS_EMAIL}`, 26, y + 19);

  // Trigger download
  doc.save(`Reserva-Choffers-${bookingCode}.pdf`);
};
