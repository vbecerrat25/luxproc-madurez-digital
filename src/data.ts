import { Dimension, Question, TechnicalTerm, ScoreMetrics, DiagnosticResponse, DiagnosticRecord } from './types';

export const TECHNICAL_TERMS: { [key: string]: TechnicalTerm } = {
  'Estrategia Digital': {
    term: 'Estrategia de Transformación Digital',
    icon: 'Compass',
    definition: 'Plan estructurado que define los objetivos tecnológicos, la asignación de presupuesto y la hoja de ruta de digitalización de la empresa.'
  },
  CRM: {
    term: 'CRM (Customer Relationship Management)',
    icon: 'Users',
    definition: 'Software para gestionar todas las relaciones, interacciones y datos de tus clientes y clientes potenciales. Ayuda a vender más y dar mejor servicio.'
  },
  ERP: {
    term: 'ERP (Enterprise Resource Planning)',
    icon: 'Briefcase',
    definition: 'Sistema integral que unifica las operaciones clave de tu empresa: finanzas, recursos humanos, compras, ventas e inventario, en una sola base de datos.'
  },
  'Google Workspace': {
    term: 'Google Workspace',
    icon: 'Mail',
    definition: 'Conjunto de herramientas en la nube (Gmail, Drive, Docs, Meet) que facilitan el trabajo colaborativo, almacenamiento y comunicación en tiempo real.'
  },
  'Business Intelligence': {
    term: 'Business Intelligence (Inteligencia de Negocios)',
    icon: 'BarChart3',
    definition: 'Uso de datos, analítica y visualizaciones interactivas para tomar decisiones comerciales estratégicas respaldadas en hechos reales, no intuiciones.'
  },
  IoT: {
    term: 'IoT (Internet de las Cosas)',
    icon: 'Cpu',
    definition: 'Red de objetos físicos (sensores, maquinaria, cámaras) que recopilan y transmiten datos en tiempo real por internet sin intervención humana.'
  },
  'Inteligencia Artificial': {
    term: 'Inteligencia Artificial (IA)',
    icon: 'Sparkles',
    definition: 'Tecnología capaz de realizar tareas que requieren inteligencia humana, como redactar contenidos, predecir compras o analizar patrones complejos.'
  },
  'Código QR': {
    term: 'Código QR',
    icon: 'QrCode',
    definition: 'Código de barras bidimensional que almacena datos fácilmente escaneables con un celular para acceder a menús, páginas web o fichas de producto.'
  },
  Trazabilidad: {
    term: 'Trazabilidad',
    icon: 'GitMerge',
    definition: 'Habilidad de rastrear y conocer todo el histórico, ubicación y trayectoria de un producto o servicio desde la materia prima hasta el cliente final.'
  },
  'Economía Circular': {
    term: 'Economía Circular',
    icon: 'RotateCcw',
    definition: 'Modelo sostenible que busca reducir residuos al mínimo mediante el rediseño, reutilización, reciclaje y aprovechamiento de recursos.'
  },
  Dashboard: {
    term: 'Dashboard (Tablero de Control)',
    icon: 'LayoutDashboard',
    definition: 'Pantalla gráfica e interactiva que muestra de forma resumida e instantánea los indicadores clave (KPIs) más importantes del negocio.'
  },
  Automatización: {
    term: 'Automatización',
    icon: 'Activity',
    definition: 'Uso de software para realizar procesos y tareas operativas repetitivas de forma automática, liberando tiempo valioso de tu equipo.'
  },
  'Cloud Computing': {
    term: 'Cloud Computing (Computación en la Nube)',
    icon: 'Cloud',
    definition: 'Almacenamiento y ejecución de sistemas a través de internet (la nube), eliminando la necesidad de servidores locales costosos.'
  }
};

export const DIMENSIONS: Dimension[] = [
  { id: 1, name: 'Estrategia Digital', description: 'Visión, objetivos y presupuesto destinado a la transformación digital.', iconName: 'Compass' },
  { id: 2, name: 'Infraestructura Digital', description: 'Capacidad técnica de conectividad y hardware empresarial.', iconName: 'Network' },
  { id: 3, name: 'Gestión Administrativa', description: 'Digitalización de la contabilidad, facturación y finanzas.', iconName: 'FileSpreadsheet' },
  { id: 4, name: 'Inventarios', description: 'Métodos y tecnologías de control de existencias.', iconName: 'Boxes' },
  { id: 5, name: 'Compras', description: 'Flujo de adquisiciones y relación digital con proveedores.', iconName: 'ShoppingCart' },
  { id: 6, name: 'Producción', description: 'Nivel tecnológico aplicado a operaciones o prestación de servicios.', iconName: 'Hammer' },
  { id: 7, name: 'Ventas', description: 'Digitalización de canales de venta y contacto comercial.', iconName: 'BadgeDollarSign' },
  { id: 8, name: 'Logística', description: 'Distribución física, despachos y planificación de rutas.', iconName: 'Truck' },
  { id: 9, name: 'Recursos Humanos', description: 'Gestión del talento, asistencia y nóminas mediante software.', iconName: 'Users2' },
  { id: 10, name: 'Calidad', description: 'Registro, control de estándares e incidentes operativos.', iconName: 'CheckCircle' },
  { id: 11, name: 'Marketing Digital', description: 'Estrategias de captación, pauta y presencia digital activa.', iconName: 'Megaphone' },
  { id: 12, name: 'Automatización', description: 'Reducción de flujos manuales mediante integraciones automáticas.', iconName: 'Workflow' },
  { id: 13, name: 'Inteligencia Artificial', description: 'Incorporación de IA generativa y predictiva en el negocio.', iconName: 'BrainCircuit' },
  { id: 14, name: 'Software Empresarial', description: 'Integración de ERP, CRM u otras herramientas core.', iconName: 'MonitorPlay' },
  { id: 15, name: 'Ciberseguridad', description: 'Protocolos de protección de datos y seguridad informática.', iconName: 'ShieldAlert' },
  { id: 16, name: 'Gestión de Datos', description: 'Uso de analítica de datos para la toma de decisiones.', iconName: 'TrendingUp' },
  { id: 17, name: 'Economía Circular', description: 'Prácticas de circularidad, reciclaje y sustentabilidad tecnológica.', iconName: 'Leaf' },
  { id: 18, name: 'Trazabilidad', description: 'Seguimiento sistemático del producto o cadena de valor.', iconName: 'Milestone' },
  { id: 19, name: 'Innovación', description: 'Cultura de experimentación y velocidad de lanzamiento de nuevos productos.', iconName: 'Lightbulb' },
  { id: 20, name: 'Cultura Digital', description: 'Adaptación, competencias y actitud del equipo frente a tecnologías.', iconName: 'UserCheck' }
];

export const QUESTIONS: Question[] = [
  // Dimensión 1: Estrategia Digital
  {
    id: 'Q1',
    dimensionId: 1,
    text: '¿Cuenta su empresa con una estrategia o plan formal para incorporar tecnología y digitalizar sus procesos?',
    type: 'single',
    helpTerm: 'Estrategia Digital',
    options: [
      { id: 'Q1_1', text: 'No contamos con planes ni presupuesto tecnológico; resolvemos problemas sobre la marcha.', score: 20 },
      { id: 'Q1_2', text: 'Existe la intención de digitalizar, pero sin un plan estructurado ni presupuesto formal.', score: 40 },
      { id: 'Q1_3', text: 'Tenemos iniciativas y metas digitales básicas definidas para algunas áreas clave.', score: 60 },
      { id: 'Q1_4', text: 'Contamos con una hoja de ruta tecnológica clara y un presupuesto anual asignado.', score: 80 },
      { id: 'Q1_5', text: 'La transformación digital es un pilar estratégico central del negocio con seguimiento continuo.', score: 100 }
    ]
  },
  // Dimensión 2
  {
    id: 'Q2',
    dimensionId: 2,
    text: '¿Cómo guardan y comparten los archivos y documentos importantes de su empresa?',
    type: 'single',
    helpTerm: 'Cloud Computing',
    options: [
      { id: 'Q2_1', text: 'En papeles físicos, carpetas o cuadernos en la oficina.', score: 20 },
      { id: 'Q2_2', text: 'En una sola computadora o en memorias USB (pendrive).', score: 40 },
      { id: 'Q2_3', text: 'En internet mediante carpetas gratuitas (como Google Drive, Dropbox o OneDrive).', score: 60 },
      { id: 'Q2_4', text: 'Usamos cuentas corporativas en la nube con copias de seguridad continuas.', score: 80 },
      { id: 'Q2_5', text: 'Todo el negocio opera en la nube y accedemos de forma segura desde cualquier lugar.', score: 100 }
    ]
  },
  // Dimensión 3
  {
    id: 'Q3',
    dimensionId: 3,
    text: '¿Cómo llevan las cuentas, ventas y pagos del negocio?',
    type: 'single',
    helpTerm: 'ERP',
    options: [
      { id: 'Q3_1', text: 'En cuadernos de apuntes o recibos en papel.', score: 20 },
      { id: 'Q3_2', text: 'En hojas de cálculo en la computadora (Excel o Google Sheets).', score: 40 },
      { id: 'Q3_3', text: 'Con un sistema o portal básico para emitir boletas y facturas electrónicas.', score: 60 },
      { id: 'Q3_4', text: 'Con un programa de ventas y cobranzas que controla caja y bancos.', score: 80 },
      { id: 'Q3_5', text: 'Con un sistema integrado que une automáticamente ventas, compras, caja y contabilidad.', score: 100 }
    ]
  },
  // Dimensión 4
  {
    id: 'Q4',
    dimensionId: 4,
    text: '¿Cómo saben qué productos o insumos tienen disponibles en el almacén?',
    type: 'single',
    helpTerm: 'Dashboard',
    options: [
      { id: 'Q4_1', text: 'Mirando visualmente el estante o cuando el producto ya se terminó.', score: 20 },
      { id: 'Q4_2', text: 'Anotando en un cuaderno o en un archivo Excel que actualizamos de vez en cuando.', score: 40 },
      { id: 'Q4_3', text: 'Con un archivo Excel compartido o programa básico que actualizamos todos los días.', score: 60 },
      { id: 'Q4_4', text: 'Con un sistema digital que descuenta el stock automáticamente con cada venta.', score: 80 },
      { id: 'Q4_5', text: 'Con lectores de código de barras y avisos automáticos cuando falta mercadería.', score: 100 }
    ]
  },
  // Dimensión 5
  {
    id: 'Q5',
    dimensionId: 5,
    text: '¿Cómo hacen los pedidos y compras a sus proveedores?',
    type: 'single',
    options: [
      { id: 'Q5_1', text: 'Por llamadas telefónicas o mensajes rápidos de WhatsApp sin guardar orden escrita.', score: 20 },
      { id: 'Q5_2', text: 'Por correos electrónicos y revisando cotizaciones manualmente.', score: 40 },
      { id: 'Q5_3', text: 'Usando formatos u órdenes de compra estructuradas para autorizar los pagos.', score: 60 },
      { id: 'Q5_4', text: 'Registramos y aprobamos cada compra dentro de un sistema digital.', score: 80 },
      { id: 'Q5_5', text: 'El sistema calcula automáticamente lo que falta y genera las órdenes a los proveedores.', score: 100 }
    ]
  },
  // Dimensión 6
  {
    id: 'Q6',
    dimensionId: 6,
    text: '¿Qué tipo de herramientas o máquinas usan para fabricar productos o brindar sus servicios?',
    type: 'single',
    helpTerm: 'IoT',
    options: [
      { id: 'Q6_1', text: 'Trabajo principalmente manual con herramientas tradicionales o mecánicas simples.', score: 20 },
      { id: 'Q6_2', text: 'Máquinas básicas operadas de forma directa sin programación digital (ej. taladros, cizallas, prensas mecánicas).', score: 40 },
      { id: 'Q6_3', text: 'Máquinas semiautomáticas programables por tareas específicas o por control de tiempos y ciclos.', score: 60 },
      { id: 'Q6_4', text: 'Líneas de producción automatizadas con sensores y sistemas que monitorean rendimiento y tiempos en pantalla.', score: 80 },
      { id: 'Q6_5', text: 'Maquinaria inteligente conectada a internet (IoT e Industria 4.0) con monitoreo en tiempo real y mantenimiento predictivo.', score: 100 }
    ]
  },
  // Dimensión 7
  {
    id: 'Q7',
    dimensionId: 7,
    text: '¿Por cuáles de estos medios reciben consultas o realizan ventas a sus clientes?',
    type: 'multiple',
    helpTerm: 'CRM',
    options: [
      { id: 'Q7_1', text: 'Atención presencial en local físico, tienda o visitas a clientes.', score: 15 },
      { id: 'Q7_2', text: 'Por WhatsApp o redes sociales (Facebook, Instagram, TikTok).', score: 25 },
      { id: 'Q7_3', text: 'Página web donde los clientes pueden ver nuestro catálogo o servicios.', score: 20 },
      { id: 'Q7_4', text: 'Tienda virtual en internet con carrito de compras o plataformas de venta online.', score: 20 },
      { id: 'Q7_5', text: 'Sistema comercial conectado que atiende por todos los canales y guarda el historial de cada cliente.', score: 20 }
    ]
  },
  // Dimensión 8
  {
    id: 'Q8',
    dimensionId: 8,
    text: '¿Cómo coordinan y entregan los pedidos o visitas a sus clientes?',
    type: 'single',
    helpTerm: 'Trazabilidad',
    options: [
      { id: 'Q8_1', text: 'El repartidor o técnico decide el camino según su experiencia.', score: 20 },
      { id: 'Q8_2', text: 'Revisamos direcciones antes de salir usando Google Maps o Waze en el celular.', score: 40 },
      { id: 'Q8_3', text: 'Enviamos con empresas de mensajería o transporte externas.', score: 60 },
      { id: 'Q8_4', text: 'Usamos un sistema que envía al cliente un enlace o aviso con el estado de su entrega.', score: 80 },
      { id: 'Q8_5', text: 'Control por GPS en vivo que organiza las rutas más rápidas automáticamente.', score: 100 }
    ]
  },
  // Dimensión 9
  {
    id: 'Q9',
    dimensionId: 9,
    text: '¿Cómo llevan la asistencia del personal y el pago de sueldos?',
    type: 'single',
    options: [
      { id: 'Q9_1', text: 'Firmando cuadernos de asistencia en papel y pagos en efectivo o cheque.', score: 20 },
      { id: 'Q9_2', text: 'En una plantilla de Excel donde calculamos horas y sueldos.', score: 40 },
      { id: 'Q9_3', text: 'Con reloj marcador (huella o tarjeta) y un programa para emitir las boletas de pago.', score: 60 },
      { id: 'Q9_4', text: 'Con un sistema de planillas que calcula sueldos, descuentos y leyes sociales.', score: 80 },
      { id: 'Q9_5', text: 'Portal web donde los trabajadores consultan sus boletas, piden vacaciones y permisos.', score: 100 }
    ]
  },
  // Dimensión 10
  {
    id: 'Q10',
    dimensionId: 10,
    text: '¿Cómo registran las quejas, reclamos o problemas con productos y servicios?',
    type: 'single',
    options: [
      { id: 'Q10_1', text: 'Se atienden en el momento de palabra, sin llevar un registro anotado.', score: 20 },
      { id: 'Q10_2', text: 'Anotamos los reclamos en un cuaderno o en una lista de Excel.', score: 40 },
      { id: 'Q10_3', text: 'Revisamos los problemas en reuniones periódicas para buscar soluciones.', score: 60 },
      { id: 'Q10_4', text: 'Usamos un sistema de atención al cliente que avisa a los encargados hasta solucionar el reclamo.', score: 80 },
      { id: 'Q10_5', text: 'Sistema de calidad completo que mide la satisfacción del cliente y detecta fallas al instante.', score: 100 }
    ]
  },
  // Dimensión 11
  {
    id: 'Q11',
    dimensionId: 11,
    text: '¿Cuáles de estas actividades de publicidad o promoción realizan para conseguir clientes?',
    type: 'multiple',
    options: [
      { id: 'Q11_1', text: 'Publicar fotos, videos o mensajes en redes sociales sin pagar publicidad.', score: 15 },
      { id: 'Q11_2', text: 'Pagar anuncios de vez en cuando en Facebook, Instagram, TikTok o Google.', score: 25 },
      { id: 'Q11_3', text: 'Enviar mensajes o correos promocionales a una lista de clientes conocidos.', score: 20 },
      { id: 'Q11_4', text: 'Página web diseñada para recibir datos de personas interesadas (formularios de contacto).', score: 20 },
      { id: 'Q11_5', text: 'Campañas de publicidad digital con seguimiento exacto de cuántas ventas genera cada anuncio.', score: 20 }
    ]
  },
  // Dimensión 12
  {
    id: 'Q12',
    dimensionId: 12,
    text: '¿Tienen tareas que hoy se realicen solas o de forma automática en su negocio?',
    type: 'single',
    helpTerm: 'Automatización',
    options: [
      { id: 'Q12_1', text: 'No, todo el trabajo de oficina y papeleo se hace a mano.', score: 20 },
      { id: 'Q12_2', text: 'Usamos fórmulas en Excel o plantillas preparadas para ahorrar tiempo.', score: 40 },
      { id: 'Q12_3', text: 'Tenemos respuestas automáticas sencillas en correos, WhatsApp o recordatorios en el calendario.', score: 60 },
      { id: 'Q12_4', text: 'Conectamos programas entre sí (por ejemplo, guardar contactos de WhatsApp en una hoja de cálculo).', score: 80 },
      { id: 'Q12_5', text: 'Las tareas rutinarias se ejecutan solas entre los sistemas sin requerir trabajo manual.', score: 100 }
    ]
  },
  // Dimensión 13
  {
    id: 'Q13',
    dimensionId: 13,
    text: '¿Utilizan herramientas de Inteligencia Artificial (como ChatGPT) en su día a día?',
    type: 'single',
    helpTerm: 'Inteligencia Artificial',
    options: [
      { id: 'Q13_1', text: 'No utilizamos Inteligencia Artificial en el negocio.', score: 20 },
      { id: 'Q13_2', text: 'Algunos miembros del equipo la usan de forma personal para redactar textos o buscar ideas.', score: 40 },
      { id: 'Q13_3', text: 'La usamos oficialmente para crear contenidos, responder mensajes o redactar propuestas.', score: 60 },
      { id: 'Q13_4', text: 'Está integrada en nuestros programas de trabajo habituales como asistente diario.', score: 80 },
      { id: 'Q13_5', text: 'Usamos modelos avanzados de inteligencia artificial para predecir ventas o tomar decisiones.', score: 100 }
    ]
  },
  // Dimensión 14
  {
    id: 'Q14',
    dimensionId: 14,
    text: '¿Cuáles de estos programas informáticos utilizan en el trabajo de todos los días?',
    type: 'multiple',
    helpTerm: 'Google Workspace',
    options: [
      { id: 'Q14_1', text: 'Correo con el nombre de la empresa (ej: contacto@miempresa.com) y calendario compartido.', score: 20 },
      { id: 'Q14_2', text: 'Paquete de trabajo en la nube (Google Workspace o Microsoft 365 con Word, Excel en línea).', score: 20 },
      { id: 'Q14_3', text: 'Aplicaciones para hablar o hacer videollamadas con el equipo (Zoom, Teams, Slack, Meet).', score: 20 },
      { id: 'Q14_4', text: 'Programa de seguimiento de clientes y prospectos comerciales.', score: 20 },
      { id: 'Q14_5', text: 'Sistema de gestión de la empresa que conecta inventarios, compras y ventas.', score: 20 }
    ]
  },
  // Dimensión 15
  {
    id: 'Q15',
    dimensionId: 15,
    text: '¿Qué cuidados toman para proteger la información y contraseñas de su empresa?',
    type: 'single',
    options: [
      { id: 'Q15_1', text: 'Las contraseñas están anotadas en papeles, pegadas en la pantalla o se comparten entre todos.', score: 20 },
      { id: 'Q15_2', text: 'Cada persona tiene su contraseña y las computadoras tienen antivirus básico.', score: 40 },
      { id: 'Q15_3', text: 'Usamos contraseñas seguras y guardamos copias de seguridad de los archivos con frecuencia.', score: 60 },
      { id: 'Q15_4', text: 'Usamos verificación con código al celular (doble factor) y copias automáticas en la nube.', score: 80 },
      { id: 'Q15_5', text: 'Reglas estrictas de seguridad digital, permisos según el cargo y revisiones periódicas.', score: 100 }
    ]
  },
  // Dimensión 16
  {
    id: 'Q16',
    dimensionId: 16,
    text: '¿En qué se apoyan los dueños o gerentes para tomar decisiones importantes en el negocio?',
    type: 'single',
    helpTerm: 'Business Intelligence',
    options: [
      { id: 'Q16_1', text: 'En la experiencia personal y la intuición del día a día.', score: 20 },
      { id: 'Q16_2', text: 'Revisando de vez en cuando reportes antiguos en papel o resúmenes del mes.', score: 40 },
      { id: 'Q16_3', text: 'Revisando planillas de Excel con las ventas y gastos cada semana o fin de mes.', score: 60 },
      { id: 'Q16_4', text: 'Mirando paneles con gráficos y números actualizados al momento en la computadora o celular.', score: 80 },
      { id: 'Q16_5', text: 'Con análisis avanzados de datos que proyectan ventas futuras y tendencias del mercado.', score: 100 }
    ]
  },
  // Dimensión 17
  {
    id: 'Q17',
    dimensionId: 17,
    text: '¿Qué acciones realizan en su empresa para ahorrar recursos y cuidar el medio ambiente?',
    type: 'single',
    helpTerm: 'Economía Circular',
    options: [
      { id: 'Q17_1', text: 'Por ahora no contamos con planes de cuidado ambiental.', score: 20 },
      { id: 'Q17_2', text: 'Acciones básicas como apagar luces, reducir impresiones en papel y reciclar botellas.', score: 40 },
      { id: 'Q17_3', text: 'Aprovechar al máximo los materiales para no generar mermas ni desperdicios.', score: 60 },
      { id: 'Q17_4', text: 'Disposición responsable de residuos, empaques ecológicos y reciclaje de aparatos electrónicos.', score: 80 },
      { id: 'Q17_5', text: 'Negocio sostenible donde los productos o insumos se reutilizan y se mide el impacto ecológico.', score: 100 }
    ]
  },
  // Dimensión 18
  {
    id: 'Q18',
    dimensionId: 18,
    text: '¿Cómo hacen el seguimiento de un pedido o producto desde que entra hasta que llega al cliente?',
    type: 'single',
    helpTerm: 'Trazabilidad',
    options: [
      { id: 'Q18_1', text: 'Revisando boletas, facturas o guías de papel.', score: 20 },
      { id: 'Q18_2', text: 'Anotando en un archivo Excel los números de serie, fechas o entregas.', score: 40 },
      { id: 'Q18_3', text: 'Con un programa básico o aplicación móvil donde se anota cada entrega realizada.', score: 60 },
      { id: 'Q18_4', text: 'Escaneando códigos de barras o códigos QR en cada paso del proceso.', score: 80 },
      { id: 'Q18_5', text: 'Sistema digital que muestra el recorrido exacto en vivo a nosotros y a los clientes.', score: 100 }
    ]
  },
  // Dimensión 19
  {
    id: 'Q19',
    dimensionId: 19,
    text: '¿Con qué frecuencia prueban nuevas ideas o mejoras en sus productos y formas de trabajar?',
    type: 'single',
    options: [
      { id: 'Q19_1', text: 'Preferimos mantener las cosas como siempre han funcionado.', score: 20 },
      { id: 'Q19_2', text: 'Hacemos cambios sólo cuando los clientes o la competencia nos obligan.', score: 40 },
      { id: 'Q19_3', text: 'Buscamos y aplicamos mejoras pequeñas de manera continua.', score: 60 },
      { id: 'Q19_4', text: 'Destinamos tiempo y presupuesto cada año para probar proyectos o servicios nuevos.', score: 80 },
      { id: 'Q19_5', text: 'Innovamos todo el tiempo, probando nuevos productos o tecnologías con rapidez.', score: 100 }
    ]
  },
  // Dimensión 20
  {
    id: 'Q20',
    dimensionId: 20,
    text: '¿Qué tan cómoda y dispuesta se siente su gente para aprender a usar nuevas herramientas digitales?',
    type: 'scale',
    options: [
      { id: 'Q20_1', text: 'Prefieren los métodos de siempre y les cuesta o necesitan ayuda constante con la tecnología.', score: 20 },
      { id: 'Q20_2', text: 'Tienen interés en aprender si se les explica con paciencia y capacitaciones paso a paso.', score: 40 },
      { id: 'Q20_3', text: 'Manejan bien programas comunes (computadora, celular) y aprenden rápido nuevos sistemas.', score: 60 },
      { id: 'Q20_4', text: 'Adoptan herramientas digitales con agrado y entusiasmo para mejorar su trabajo.', score: 80 },
      { id: 'Q20_5', text: 'El equipo propone por iniciativa propia nuevas herramientas digitales y aprende solo.', score: 100 }
    ]
  }
];

export function calculateMetrics(responses: DiagnosticResponse[]): ScoreMetrics {
  // Map dimension scores based on answered questions
  const getScoreByQuestionId = (qId: string): number => {
    const q = QUESTIONS.find((question) => question.id === qId);
    if (!q) return 0;
    const response = responses.find((r) => r.questionId === qId);
    if (!response || response.selectedOptionIds.length === 0) return 0;

    if (q.type === 'multiple') {
      // average of selected options (cap at 100) or sum up depending on design.
      // Let's take the highest or average of selected options. Let's take the sum up to 100, which incentivizes checking multiple options!
      const totalScore = response.selectedOptionIds.reduce((acc, optId) => {
        const opt = q.options.find((o) => o.id === optId);
        return acc + (opt ? opt.score : 0);
      }, 0);
      return Math.min(totalScore, 100);
    } else {
      const optId = response.selectedOptionIds[0];
      const opt = q.options.find((o) => o.id === optId);
      return opt ? opt.score : 0;
    }
  };

  // Scores by Dimension Question
  const q1 = getScoreByQuestionId('Q1'); // Estrategia Digital
  const q2 = getScoreByQuestionId('Q2'); // Infraestructura
  const q3 = getScoreByQuestionId('Q3'); // Gestión Adm
  const q4 = getScoreByQuestionId('Q4'); // Inventarios
  const q5 = getScoreByQuestionId('Q5'); // Compras
  const q6 = getScoreByQuestionId('Q6'); // Producción
  const q7 = getScoreByQuestionId('Q7'); // Ventas
  const q8 = getScoreByQuestionId('Q8'); // Logística
  const q9 = getScoreByQuestionId('Q9'); // RRHH
  const q10 = getScoreByQuestionId('Q10'); // Calidad
  const q11 = getScoreByQuestionId('Q11'); // Marketing
  const q12 = getScoreByQuestionId('Q12'); // Automatización
  const q13 = getScoreByQuestionId('Q13'); // IA
  const q14 = getScoreByQuestionId('Q14'); // Software
  const q15 = getScoreByQuestionId('Q15'); // Ciberseguridad
  const q16 = getScoreByQuestionId('Q16'); // Gestión Datos
  const q17 = getScoreByQuestionId('Q17'); // Economía Circular
  const q18 = getScoreByQuestionId('Q18'); // Trazabilidad
  const q19 = getScoreByQuestionId('Q19'); // Innovación
  const q20 = getScoreByQuestionId('Q20'); // Cultura Digital

  // Formulate output metrics based on dimension averages
  
  // 1. Digitalización (Infraestructura, Software, Ventas, Marketing)
  const digitalizacion = Math.round((q2 + q14 + q7 + q11) / 4);

  // 2. Automatización (Automatización, Producción, Inventarios)
  const automatizacion = Math.round((q12 + q6 + q4) / 3);

  // 3. Innovación (Estrategia Digital, Innovación, Inteligencia Artificial)
  const innovacion = Math.round((q1 + q19 + q13) / 3);

  // 4. Circularidad / Sostenibilidad (Economía Circular)
  const circularidad = Math.round(q17);

  // 5. Trazabilidad (Trazabilidad, Logística, Calidad)
  const trazabilidad = Math.round((q18 + q8 + q10) / 3);

  // 6. Gestión (Estrategia, Gestión Adm, Compras, Recursos Humanos, Gestión Datos)
  const gestion = Math.round((q1 + q3 + q5 + q9 + q16) / 5);

  // 7. Seguridad (Ciberseguridad)
  const seguridad = Math.round(q15);

  // 8. Cultura Digital (Cultura Digital)
  const cultura = Math.round(q20);

  // 9. General (Average of everything)
  const general = Math.round(
    (digitalizacion + automatizacion + innovacion + circularidad + trazabilidad + gestion + seguridad + cultura) / 8
  );

  return {
    digitalizacion,
    automatizacion,
    innovacion,
    circularidad,
    trazabilidad,
    gestion,
    seguridad,
    cultura,
    general
  };
}

export function getMaturityLevel(score: number): {
  levelNumber: 1 | 2 | 3 | 4 | 5;
  title: string;
  stageName: string;
  color: string;
  description: string;
  badgeClass: string;
  textClass: string;
  nextStep: string;
} {
  if (score <= 25) {
    return {
      levelNumber: 1,
      title: 'Inicial (Analógico)',
      stageName: 'Nivel 1 de 5',
      color: '#EF4444', // red
      badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
      textClass: 'text-red-600 dark:text-red-400',
      description: 'La organización realiza la gran mayoría de sus operaciones de forma tradicional o manual. El uso de tecnologías es mínimo o inexistente, con alta dependencia de procesos físicos y registros en papel.',
      nextStep: 'Migrar archivos y registros clave a la nube (Google Drive o OneDrive) y comenzar a emitir facturas y boletas electrónicas.'
    };
  } else if (score <= 50) {
    return {
      levelNumber: 2,
      stageName: 'Nivel 2 de 5',
      title: 'Principiante (Consciente)',
      color: '#F59E0B', // amber
      badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
      textClass: 'text-amber-600 dark:text-amber-400',
      description: 'La empresa cuenta con herramientas digitales aisladas (correo, planillas básicas de Excel, WhatsApp para ventas). Existe conciencia del cambio, pero las áreas no están conectadas y se duplican tareas manualmente.',
      nextStep: 'Adoptar un software de gestión centralizado (ERP básico o sistema de stock) y capacitar al equipo en rutinas digitales diarias.'
    };
  } else if (score <= 75) {
    return {
      levelNumber: 3,
      stageName: 'Nivel 3 de 5',
      title: 'En Desarrollo (Conectado)',
      color: '#3B82F6', // blue
      badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
      textClass: 'text-blue-600 dark:text-blue-400',
      description: 'La organización tiene sus operaciones principales sistematizadas en la nube (facturación, control de caja y ventas). La información fluye y el equipo colabora de manera ágil.',
      nextStep: 'Conectar ventas con inventario y cobranzas de forma automática, implementar un CRM comercial y activar copias de respaldo automatizadas.'
    };
  } else if (score <= 90) {
    return {
      levelNumber: 4,
      stageName: 'Nivel 4 de 5',
      title: 'Competitivo (Optimizado)',
      color: '#06B6D4', // cyan
      badgeClass: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20',
      textClass: 'text-cyan-600 dark:text-cyan-400',
      description: 'Nivel avanzado. La empresa toma decisiones basadas en datos e indicadores en tiempo real. Los procesos operativos están estandarizados y los canales digitales son una fuente primaria de ingresos.',
      nextStep: 'Incorporar asistentes de Inteligencia Artificial para atención y análisis predictivo, y robustecer políticas formales de ciberseguridad.'
    };
  } else {
    return {
      levelNumber: 5,
      stageName: 'Nivel 5 de 5',
      title: 'Transformador (Líder Digital)',
      color: '#10B981', // emerald
      badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
      textClass: 'text-emerald-600 dark:text-emerald-400',
      description: 'Nivel de excelencia. Ecosistema digital completamente integrado, con flujos automatizados (RPA), adopción estratégica de Inteligencia Artificial generativa y cultura de innovación sostenible continua.',
      nextStep: 'Escalar modelos de negocio digitales, desarrollar integraciones exclusivas y liderar la innovación tecnológica en su industria.'
    };
  }
}

// Static list of corporate assessments starts completely blank (no dummy/mock data)
export const MOCK_ADMIN_RECORDS: DiagnosticRecord[] = [];

