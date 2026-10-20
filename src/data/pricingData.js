// Datos de tarifas, rutas y tours de Choffers.cl

export const LOCATIONS = [
  { id: 'pmc', name: 'Aeropuerto El Tepual (PMC) - Puerto Montt', short: 'Aeropuerto PMC', type: 'airport' },
  { id: 'pv_centro', name: 'Puerto Varas - Centro / Costanera', short: 'Puerto Varas Centro', type: 'city' },
  { id: 'pv_hotel', name: 'Puerto Varas - Hotel / Cabaña / Airbnb', short: 'Hotel en Puerto Varas', type: 'hotel' },
  { id: 'pm_centro', name: 'Puerto Montt - Centro / Terminal de Buses', short: 'Puerto Montt Centro', type: 'city' },
  { id: 'frutillar', name: 'Frutillar Bajo - Teatro del Lago', short: 'Frutillar Bajo', type: 'tourist' },
  { id: 'ensenada', name: 'Ensenada / Saltos del Petrohué', short: 'Ensenada / Petrohué', type: 'nature' },
  { id: 'octay', name: 'Puerto Octay - Lago Llanquihue', short: 'Puerto Octay', type: 'tourist' },
  { id: 'llanquihue', name: 'Llanquihue - Monumento a la Colonización', short: 'Llanquihue', type: 'city' },
  { id: 'cochamo', name: 'Valle de Cochamó / Río Puelo', short: 'Cochamó / Puelo', type: 'nature' },
  { id: 'chiloe', name: 'Chacao / Ancud (Isla de Chiloé)', short: 'Ancud, Chiloé', type: 'island' },
];

export const FLEET_OPTIONS = [
  {
    id: 'suv',
    name: 'SUV / Sedán Ejecutivo',
    description: 'Ideal para ejecutivos, parejas o familias pequeñas. Máximo confort y agilidad.',
    models: 'Subaru Forester / Toyota RAV4 / Hyundai Tucson',
    capacityPax: '1 - 3 Pasajeros',
    maxPax: 3,
    capacityBags: '2 Maletas grandes + 2 de mano',
    tag: 'Más Solicitado',
    basePriceMultiplier: 1.0,
    features: ['Aire Acondicionado Bi-zona', 'Cargadores USB / Tipo C', 'Agua de cortesía', 'Wifi a bordo']
  },
  {
    id: 'van',
    name: 'Van Ejecutiva Confort',
    description: 'Espacio superior para familias, grupos con equipaje abundante o comitivas de trabajo.',
    models: 'Hyundai H1 / Maxus G10 / Mercedes-Benz Vito',
    capacityPax: '4 - 7 Pasajeros',
    maxPax: 7,
    capacityBags: '6-7 Maletas grandes + equipaje de mano',
    tag: 'Grupos & Familias',
    basePriceMultiplier: 1.45,
    features: ['Doble Climatizador', 'Asientos reclinables', 'Maletero extra grande', 'Sillas de niños sin costo']
  },
  {
    id: 'minibus',
    name: 'Minibus Privado Premium',
    description: 'Servicio exclusivo para delegaciones corporativas, bodas y tours de grupos grandes.',
    models: 'Mercedes-Benz Sprinter Executive',
    capacityPax: '8 - 15 Pasajeros',
    maxPax: 15,
    capacityBags: '15 Maletas bodega + bolsos de mano',
    tag: 'Delegaciones',
    basePriceMultiplier: 2.3,
    features: ['Micrófono para guía', 'Butacas ergonómicas', 'Espacio para bicicletas/ski', 'Suspensión reforzada']
  }
];

export const POPULAR_ROUTES = [
  {
    id: 'pmc_pv',
    originId: 'pmc',
    destId: 'pv_centro',
    originName: 'Aeropuerto El Tepual (PMC)',
    destName: 'Puerto Varas (Centro / Hoteles)',
    duration: '25 - 30 min',
    distance: '31 km',
    priceSUV: 28000,
    priceVan: 40000,
    priceMinibus: 65000,
    badge: 'Ruta Más Frecuente',
    note: 'Monitoreo de vuelo incluido sin costo por demoras'
  },
  {
    id: 'pmc_pm',
    originId: 'pmc',
    destId: 'pm_centro',
    originName: 'Aeropuerto El Tepual (PMC)',
    destName: 'Puerto Montt Centro / Terminal',
    duration: '20 - 25 min',
    distance: '18 km',
    priceSUV: 25000,
    priceVan: 36000,
    priceMinibus: 58000,
    badge: 'Corporativo',
    note: 'Conexión directa vía Ruta 5 o Av. Cardonal'
  },
  {
    id: 'pv_frutillar',
    originId: 'pv_centro',
    destId: 'frutillar',
    originName: 'Puerto Varas',
    destName: 'Frutillar Bajo (Teatro del Lago)',
    duration: '25 min',
    distance: '28 km',
    priceSUV: 32000,
    priceVan: 46000,
    priceMinibus: 75000,
    badge: 'Turismo & Cultura',
    note: 'Paseo escénico bordeando el Lago Llanquihue'
  },
  {
    id: 'pv_petrohue',
    originId: 'pv_centro',
    destId: 'ensenada',
    originName: 'Puerto Varas',
    destName: 'Saltos del Petrohué / Ensenada',
    duration: '45 - 55 min',
    distance: '58 km',
    priceSUV: 48000,
    priceVan: 68000,
    priceMinibus: 110000,
    badge: 'Parque Vicente Pérez Rosales',
    note: 'Ideal para excursiones al Lago Todos Los Santos'
  },
  {
    id: 'pmc_frutillar',
    originId: 'pmc',
    destId: 'frutillar',
    originName: 'Aeropuerto El Tepual (PMC)',
    destName: 'Frutillar (Hoteles / Centro)',
    duration: '40 min',
    distance: '48 km',
    priceSUV: 42000,
    priceVan: 58000,
    priceMinibus: 95000,
    badge: 'Directo al Hotel',
    note: 'Traslado puerta a puerta sin transbordos'
  },
  {
    id: 'pv_chiloe',
    originId: 'pv_centro',
    destId: 'chiloe',
    originName: 'Puerto Varas',
    destName: 'Ancud (Cruce Canal de Chacao)',
    duration: '1h 50 min',
    distance: '105 km',
    priceSUV: 95000,
    priceVan: 135000,
    priceMinibus: 210000,
    badge: 'Isla de Chiloé',
    note: 'Incluye coordinación de transbordador marítimo'
  }
];

export const TOUR_PACKAGES = [
  {
    id: 'volcan_petrohue',
    title: 'Volcán Osorno & Saltos del Petrohué',
    subtitle: 'El clásico indiscutido del Parque Nacional Vicente Pérez Rosales',
    duration: 'Medio Día (5 hrs) o Full Day (8 hrs)',
    defaultDuration: 'Full Day',
    pricePerGroupSUV: 120000,
    pricePerGroupVan: 165000,
    pricePerGroupMinibus: 260000,
    highlights: [
      'Visita a los emblemáticos Saltos del Río Petrohué',
      'Ascenso al Centro de Ski Volcán Osorno (2.000 m.s.n.m.)',
      'Paradas fotográficas con vista panorámica al Lago Llanquihue',
      'Pueblo lacustre de Ensenada y cafeterías típicas'
    ],
    includes: ['Conductor privado exclusivo', 'Combustible y peajes', 'Tiempo libre para fotos y telesillas', 'Paradas gastronómicas sugeridas'],
    popular: true,
    imageDesc: 'Volcán Osorno nevado con aguas turquesas del Río Petrohué'
  },
  {
    id: 'frutillar_llanquihue',
    title: 'Frutillar Colonial & Llanquihue Tradicional',
    subtitle: 'Historia de la colonización alemana, arquitectura y repostería típica',
    duration: 'Medio Día (4-5 hrs)',
    defaultDuration: 'Medio Día',
    pricePerGroupSUV: 95000,
    pricePerGroupVan: 135000,
    pricePerGroupMinibus: 210000,
    highlights: [
      'Paseo por la costanera y muelle histórico de Frutillar Bajo',
      'Visita exterior al imponente Teatro del Lago',
      'Degustación de kuchenes y gastronomía alemana tradicional',
      'Monumento a los Colonos y miradores de Llanquihue'
    ],
    includes: ['Vehículo exclusivo con chofer guía local', 'Flexibilidad horaria total', 'Recomendaciones culinarias de autor', 'Regreso a hotel'],
    popular: false,
    imageDesc: 'Muelle de Frutillar y Teatro del Lago con fondo del volcán'
  },
  {
    id: 'circuito_completo_lago',
    title: 'Circuito 360° Lago Llanquihue Completo',
    subtitle: 'Vuelta completa al segundo lago más grande de Chile',
    duration: 'Día Completo (8 - 9 hrs)',
    defaultDuration: 'Full Day',
    pricePerGroupSUV: 155000,
    pricePerGroupVan: 210000,
    pricePerGroupMinibus: 330000,
    highlights: [
      'Recorrido por Puerto Varas, Llanquihue y Frutillar',
      'Pueblo patrimonial de Puerto Octay y Bahía Mansa',
      'Cascadas y playas vírgenes de Las Cascadas',
      'Borde costero de Ensenada y vistas continuas a 3 volcanes'
    ],
    includes: ['Circuito vehicular privado completo (180 km)', 'Paradas a tu propio ritmo', 'Chofer conocedor de rincones secretos', 'Agua de cortesía'],
    popular: true,
    imageDesc: 'Panorámica 360 del Lago Llanquihue y sus pueblos costeros'
  },
  {
    id: 'chiloe_magico',
    title: 'Chiloé Mágico: Canal de Chacao, Ancud & Pingüineras',
    subtitle: 'Navegación en transbordador, mitología chilota y fauna marina',
    duration: 'Día Completo (9 - 10 hrs)',
    defaultDuration: 'Full Day',
    pricePerGroupSUV: 175000,
    pricePerGroupVan: 240000,
    pricePerGroupMinibus: 380000,
    highlights: [
      'Cruce marítimo en transbordador avistando toninas y lobos marinos',
      'Fuerte San Antonio e historia colonial en Ancud',
      'Mercado municipal de artesanías y gastronomía marina',
      'Opción de visita a Pingüineras de Puñihuil (en temporada)'
    ],
    includes: ['Traslado ida y vuelta con cruce marítimo', 'Chofer disponible toda la jornada', 'Apoyo con reservas de restaurantes típicos'],
    popular: true,
    imageDesc: 'Transbordador en Canal de Chacao y costa mística de Chiloé'
  },
  {
    id: 'cochamo_puelo',
    title: 'Valle de Cochamó & Cuenca del Río Puelo',
    subtitle: 'El "Yosemite de Sudamérica": paredes de granito y aguas turquesas',
    duration: 'Día Completo (8 - 9 hrs)',
    defaultDuration: 'Full Day',
    pricePerGroupSUV: 165000,
    pricePerGroupVan: 225000,
    pricePerGroupMinibus: 350000,
    highlights: [
      'Costanera de Cochamó y su histórica iglesia de alerce',
      'Desembocadura del Río Petrohué en el Estuario de Reloncaví',
      'Miradores del Río Puelo y Lago Tagua Tagua',
      'Paisajes vírgenes de bosque valdiviano y cordillera'
    ],
    includes: ['Vehículo 4x4 / Tracción integral acondicionado', 'Chofer con experiencia en rutas australes', 'Paradas fotográficas ilimitadas'],
    popular: false,
    imageDesc: 'Paredes de granito del Valle de Cochamó y estuario Reloncaví'
  },
  {
    id: 'termas_relajacion',
    title: 'Día de Bienestar: Termas del Sol / Puyehue',
    subtitle: 'Relajo total en aguas termales naturales en medio de la selva fría',
    duration: 'Día Completo (7 - 8 hrs)',
    defaultDuration: 'Full Day',
    pricePerGroupSUV: 160000,
    pricePerGroupVan: 220000,
    pricePerGroupMinibus: 340000,
    highlights: [
      'Pozas termales naturales al aire libre entre 36°C y 45°C',
      'Pasarelas de madera sobre bosque nativo milenario',
      'Tiempo libre para almuerzo y descanso profundo',
      'Traslado privado con espera del chofer sin apuros'
    ],
    includes: ['Traslado privado ida, espera y retorno', 'Chofer dedicado exclusivamente a tu grupo', 'Climatización garantizada'],
    popular: false,
    imageDesc: 'Pozas de agua termal humeantes entre la exuberante vegetación'
  },
  {
    id: 'tour_a_medida',
    title: 'Tour Exclusivo a Medida / Personalizado',
    subtitle: 'Diseña tu propio itinerario por el sur con chofer a tu completa disposición',
    duration: 'Por horas o jornada completa',
    defaultDuration: 'A convenir',
    pricePerGroupSUV: 130000,
    pricePerGroupVan: 180000,
    pricePerGroupMinibus: 290000,
    highlights: [
      'Tú eliges los destinos, horarios y paradas',
      'Vehículo y chofer 100% dedicados a ti',
      'Asesoría previa por WhatsApp para armar la mejor ruta',
      'Ideal para eventos privados, sesiones de fotos o compras'
    ],
    includes: ['Chofer bilingüe disponible', 'Flexibilidad ante el clima', 'Servicio VIP personalizado'],
    popular: false,
    imageDesc: 'Ruta abierta con volcanes y lagos del sur de Chile'
  }
];

export const FAQS = [
  {
    q: '¿Cómo me encuentra el conductor en el Aeropuerto El Tepual (PMC)?',
    a: 'Tu conductor te estará esperando en la sala de llegadas nacionales con un cartel personalizado con tu nombre. Además, te escribirá previamente por WhatsApp para coordinar tu salida sin demoras.'
  },
  {
    q: '¿Qué sucede si mi vuelo sufre un retraso?',
    a: 'Monitoreamos tu número de vuelo en tiempo real a través del sistema de tráfico aéreo. Si tu vuelo se retrasa, reprogramamos la recogida automáticamente sin ningún tipo de cobro extra o penalización.'
  },
  {
    q: '¿Los traslados y tours son 100% privados?',
    a: 'Sí, absolutamente. En Choffers no realizamos viajes compartidos con desconocidos. El vehículo, el conductor y los horarios están reservados de manera exclusiva para ti y tus acompañantes.'
  },
  {
    q: '¿Tienen sillas de seguridad para bebés o niños?',
    a: 'Sí, contamos con sillas infantiles homologadas (huevito y alzador). Puedes solicitarla al completar el formulario y la incluiremos sin costo adicional para la seguridad de tu familia.'
  },
  {
    q: '¿Qué medios de pago aceptan y emiten factura?',
    a: 'Aceptamos Transferencia bancaria directa, tarjetas de crédito/débito vía Webpay / Transbank y efectivo. Emitimos boleta electrónica o Factura exenta/afecta para empresas que requieran rendición corporativa.'
  },
  {
    q: '¿Con cuánta anticipación debo reservar?',
    a: 'Recomendamos agendar con al menos 12 a 24 horas de anticipación para garantizar disponibilidad de flota. Sin embargo, para emergencias o reservas del mismo día, puedes escribirnos directamente a nuestro WhatsApp 24/7 (+56 9 9555 4665).'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Carolina Echeverría',
    origin: 'Santiago de Chile',
    service: 'Transfer Aeropuerto PMC a Puerto Varas (Ida y Vuelta)',
    rating: 5,
    comment: 'Impecable servicio. Llegamos a Puerto Montt con 40 minutos de retraso en el vuelo y el chofer ya estaba esperándonos con una sonrisa y el auto calentito. La SUV impecable y súper cómodo el viaje.',
    date: 'Hace 3 días'
  },
  {
    name: 'Matías Schmidt & Familia',
    origin: 'Buenos Aires, Argentina',
    service: 'Tour Volcán Osorno & Saltos del Petrohué (Van 6 pax)',
    rating: 5,
    comment: 'Excelente experiencia con Choffers. Contratamos la Van para recorrer Petrohué y subir al volcán. El chofer don Juan conocía datos históricos buenísimos y nos dio tiempo libre para almorzar sin ningún apuro. Muy recomendado.',
    date: 'Hace 1 semana'
  },
  {
    name: 'Roberto Valenzuela M.',
    origin: 'Gerente Comercial, Santiago',
    service: 'Traslado Corporativo Puerto Varas - Frutillar',
    rating: 5,
    comment: 'Puntualidad suiza y facturación inmediata para mi empresa. Vehículo moderno, chofer con excelente presentación personal y conducción muy segura. Seguirán siendo mi opción cada vez que viaje a la zona.',
    date: 'Hace 2 semanas'
  }
];
