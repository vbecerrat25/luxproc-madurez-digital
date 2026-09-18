import { Language } from './translations';
import { Dimension, Question, TechnicalTerm } from '../types';

export const DIMENSIONS_I18N: Record<Language, Dimension[]> = {
  es: [
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
  ],
  en: [
    { id: 1, name: 'Digital Strategy', description: 'Vision, goals, and budget allocated for digital transformation.', iconName: 'Compass' },
    { id: 2, name: 'Digital Infrastructure', description: 'Technical connectivity capacity and enterprise hardware.', iconName: 'Network' },
    { id: 3, name: 'Administrative Management', description: 'Digitization of accounting, invoicing, and corporate finance.', iconName: 'FileSpreadsheet' },
    { id: 4, name: 'Inventories & Stock', description: 'Stock control methods, replenishment, and warehouse technology.', iconName: 'Boxes' },
    { id: 5, name: 'Procurement & Purchasing', description: 'Procurement workflows and digital supplier relationships.', iconName: 'ShoppingCart' },
    { id: 6, name: 'Operations & Production', description: 'Technology level applied to operations or service delivery.', iconName: 'Hammer' },
    { id: 7, name: 'Sales & Channels', description: 'Digitization of commercial channels and customer touchpoints.', iconName: 'BadgeDollarSign' },
    { id: 8, name: 'Logistics & Dispatch', description: 'Physical distribution, dispatching, and route optimization.', iconName: 'Truck' },
    { id: 9, name: 'Human Resources', description: 'Talent management, attendance, and cloud payroll systems.', iconName: 'Users2' },
    { id: 10, name: 'Quality Assurance', description: 'Recordkeeping, standard compliance, and incident tracking.', iconName: 'CheckCircle' },
    { id: 11, name: 'Digital Marketing', description: 'Acquisition strategies, digital advertising, and online reach.', iconName: 'Megaphone' },
    { id: 12, name: 'Process Automation', description: 'Reduction of manual friction through automated workflows.', iconName: 'Workflow' },
    { id: 13, name: 'Artificial Intelligence', description: 'Adoption of generative and predictive AI across business units.', iconName: 'BrainCircuit' },
    { id: 14, name: 'Enterprise Software', description: 'Integration of ERP, CRM, and mission-critical software.', iconName: 'MonitorPlay' },
    { id: 15, name: 'Cybersecurity & Privacy', description: 'Data protection policies, authentication, and information safety.', iconName: 'ShieldAlert' },
    { id: 16, name: 'Data Management & BI', description: 'Data analytics and dashboards for evidence-based decision making.', iconName: 'TrendingUp' },
    { id: 17, name: 'Circular Economy', description: 'Circular design, e-waste recycling, and environmental sustainability.', iconName: 'Leaf' },
    { id: 18, name: 'Traceability', description: 'End-to-end batch and product lifecycle tracking across the supply chain.', iconName: 'Milestone' },
    { id: 19, name: 'Innovation & Agility', description: 'Culture of experimentation and speed to launch new offerings.', iconName: 'Lightbulb' },
    { id: 20, name: 'Digital Culture', description: 'Workforce digital dexterity, mindset, and agility to adopt tech.', iconName: 'UserCheck' }
  ],
  pt: [
    { id: 1, name: 'Estratégia Digital', description: 'Visão, metas e orçamento para transformação digital.', iconName: 'Compass' },
    { id: 2, name: 'Infraestrutura Digital', description: 'Capacidade técnica de conectividade e hardware corporativo.', iconName: 'Network' },
    { id: 3, name: 'Gestão Administrativa', description: 'Digitalização de contabilidade, faturamento e finanças.', iconName: 'FileSpreadsheet' },
    { id: 4, name: 'Estoques e Inventários', description: 'Métodos e tecnologias de controle e rastreio de estoque.', iconName: 'Boxes' },
    { id: 5, name: 'Compras e Suprimentos', description: 'Fluxo de aquisições e relacionamento digital com fornecedores.', iconName: 'ShoppingCart' },
    { id: 6, name: 'Produção e Operações', description: 'Nível tecnológico aplicado a operações ou prestação de serviços.', iconName: 'Hammer' },
    { id: 7, name: 'Vendas e Canais', description: 'Digitalização dos canais comerciais e relacionamento com clientes.', iconName: 'BadgeDollarSign' },
    { id: 8, name: 'Logística e Entregas', description: 'Distribuição física, expedição e roteirização inteligente.', iconName: 'Truck' },
    { id: 9, name: 'Recursos Humanos', description: 'Gestão de talentos, ponto eletrônico e folha via software.', iconName: 'Users2' },
    { id: 10, name: 'Qualidade e Processos', description: 'Registro de não-conformidades, auditorias e melhoria contínua.', iconName: 'CheckCircle' },
    { id: 11, name: 'Marketing Digital', description: 'Estratégias de atração, presença online e campanhas digitais.', iconName: 'Megaphone' },
    { id: 12, name: 'Automação de Processos', description: 'Redução de tarefas manuais através de integrações automáticas.', iconName: 'Workflow' },
    { id: 13, name: 'Inteligência Artificial', description: 'Adoção de IA generativa e preditiva nos processos de negócio.', iconName: 'BrainCircuit' },
    { id: 14, name: 'Softwares Empresariais', description: 'Integração de ERP, CRM e ferramentas essenciais de gestão.', iconName: 'MonitorPlay' },
    { id: 15, name: 'Cibersegurança e Dados', description: 'Protocolos de segurança da informação e proteção de dados.', iconName: 'ShieldAlert' },
    { id: 16, name: 'Gestão de Dados e BI', description: 'Uso de relatórios analíticos e inteligência para tomadas de decisão.', iconName: 'TrendingUp' },
    { id: 17, name: 'Economia Circular', description: 'Práticas de sustentabilidade, reciclagem e ecoeficiência.', iconName: 'Leaf' },
    { id: 18, name: 'Rastreabilidade', description: 'Acompanhamento do ciclo de vida e origem de produtos e insumos.', iconName: 'Milestone' },
    { id: 19, name: 'Inovação e Agilidade', description: 'Cultura de testes contínuos e velocidade de lançamento.', iconName: 'Lightbulb' },
    { id: 20, name: 'Cultura Digital', description: 'Maturidade, capacitação e disposição da equipe com tecnologias.', iconName: 'UserCheck' }
  ]
};

export const TECHNICAL_TERMS_I18N: Record<Language, Record<string, TechnicalTerm>> = {
  es: {
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
    },
    B2B: {
      term: 'B2B (Venta Empresa a Empresa)',
      icon: 'Briefcase',
      definition: 'Modelo donde sus clientes son otras empresas, talleres, comercios, distribuidores o el Estado, en vez de consumidores particulares.'
    },
    B2C: {
      term: 'B2C (Venta a Consumidor Final)',
      icon: 'Users',
      definition: 'Modelo donde vende directamente a personas particulares o familias que adquieren su producto o servicio para uso personal.'
    },
    'Fábrica': {
      term: 'Fábrica o Manufactura',
      icon: 'Hammer',
      definition: 'Negocios que compran insumos o materias primas y los transforman en productos físicos terminados (ej. alimentos, confección, imprenta, muebles).'
    },
    'Manufactura': {
      term: 'Manufactura y Producción',
      icon: 'Hammer',
      definition: 'Transformación física de materiales en bienes terminados mediante maquinaria, herramientas o procesos manuales/artesanales.'
    },
    'Servicios': {
      term: 'Empresa de Servicios',
      icon: 'Activity',
      definition: 'Negocios que entregan conocimientos, asesoría, atención o mano de obra especializada (reparaciones, transporte, salud, educación, diseño).'
    },
    'Comercio': {
      term: 'Empresa Comercial o Tienda',
      icon: 'ShoppingCart',
      definition: 'Negocios que compran mercadería ya terminada y la venden al por mayor o al consumidor final sin transformar el producto.'
    }
  },
  en: {
    'Estrategia Digital': {
      term: 'Digital Transformation Strategy',
      icon: 'Compass',
      definition: 'Structured plan defining technological objectives, budget allocation, and the digital roadmap for the company.'
    },
    CRM: {
      term: 'CRM (Customer Relationship Management)',
      icon: 'Users',
      definition: 'Software to manage all customer interactions, leads, and sales pipelines, improving conversion rates and client satisfaction.'
    },
    ERP: {
      term: 'ERP (Enterprise Resource Planning)',
      icon: 'Briefcase',
      definition: 'An all-in-one system integrating key corporate functions: accounting, procurement, HR, inventory, and sales into a single source of truth.'
    },
    'Google Workspace': {
      term: 'Google Workspace',
      icon: 'Mail',
      definition: 'Cloud collaboration suite (Gmail, Drive, Docs, Meet) enabling real-time collaboration, file storage, and business communication.'
    },
    'Business Intelligence': {
      term: 'Business Intelligence (BI)',
      icon: 'BarChart3',
      definition: 'Leveraging data pipelines, analytics, and dynamic dashboards to make evidence-based decisions rather than relying on intuition.'
    },
    IoT: {
      term: 'IoT (Internet of Things)',
      icon: 'Cpu',
      definition: 'Network of physical devices (sensors, meters, machines) capturing and transmitting real-time operational telemetry over the internet.'
    },
    'Inteligencia Artificial': {
      term: 'Artificial Intelligence (AI)',
      icon: 'Sparkles',
      definition: 'Advanced computing models performing tasks requiring human cognition: content synthesis, predictive demand, and anomaly detection.'
    },
    'Código QR': {
      term: 'QR Code',
      icon: 'QrCode',
      definition: 'Two-dimensional matrix barcode easily scanned via smartphone cameras to access menus, digital product sheets, or track batches.'
    },
    Trazabilidad: {
      term: 'Traceability',
      icon: 'GitMerge',
      definition: 'The capability to trace and verify the historical lifecycle, location, and origin of an item across the whole supply chain.'
    },
    'Economía Circular': {
      term: 'Circular Economy',
      icon: 'RotateCcw',
      definition: 'Sustainable economic model aiming to minimize waste and emissions through closed loops: reuse, remanufacture, and material recycling.'
    },
    Dashboard: {
      term: 'Dashboard (Executive KPI Board)',
      icon: 'LayoutDashboard',
      definition: 'Visual display of critical business indicators and operational metrics updated in real time for rapid decision-making.'
    },
    Automatización: {
      term: 'Workflow Automation',
      icon: 'Activity',
      definition: 'Using digital tools and scripts to trigger repetitive operational processes automatically, saving labor and cutting errors.'
    },
    'Cloud Computing': {
      term: 'Cloud Computing',
      icon: 'Cloud',
      definition: 'Delivering hosted computing services (servers, storage, databases, software) over the internet, eliminating on-premise hardware constraints.'
    },
    B2B: {
      term: 'B2B (Business-to-Business)',
      icon: 'Briefcase',
      definition: 'Commercial model where your clients are other businesses, merchants, corporate partners, or government bodies, rather than individual consumers.'
    },
    B2C: {
      term: 'B2C (Business-to-Consumer)',
      icon: 'Users',
      definition: 'Commercial model where you sell products or services directly to individual people or households for personal use.'
    },
    'Fábrica': {
      term: 'Factory / Manufacturing',
      icon: 'Hammer',
      definition: 'Enterprises purchasing materials/components to process and fabricate physical finished goods (food, apparel, woodworking, metalcraft).'
    },
    'Manufactura': {
      term: 'Manufacturing & Workshop',
      icon: 'Hammer',
      definition: 'Physical transformation of raw materials into finished merchandise using machinery, tools, or artisanal handwork.'
    },
    'Servicios': {
      term: 'Service Provider',
      icon: 'Activity',
      definition: 'Businesses delivering knowledge, expertise, labor, or care rather than manufacturing physical goods (repairs, transport, healthcare, education).'
    },
    'Comercio': {
      term: 'Commerce & Retail',
      icon: 'ShoppingCart',
      definition: 'Businesses focused on purchasing finished items and reselling them wholesale or retail to end consumers without modifying the product.'
    }
  },
  pt: {
    'Estrategia Digital': {
      term: 'Estratégia de Transformação Digital',
      icon: 'Compass',
      definition: 'Plano estruturado que define metas tecnológicas, alocação de orçamento e o roteiro de digitalização da empresa.'
    },
    CRM: {
      term: 'CRM (Gestão de Relacionamento com o Cliente)',
      icon: 'Users',
      definition: 'Software para gerenciar todas as interações, oportunidades e histórico de clientes, aumentando as vendas e a fidelização.'
    },
    ERP: {
      term: 'ERP (Planejamento de Recursos Empresariais)',
      icon: 'Briefcase',
      definition: 'Sistema integrado que unifica áreas essenciais da empresa: financeiro, compras, estoques, vendas e recursos humanos em um único banco de dados.'
    },
    'Google Workspace': {
      term: 'Google Workspace',
      icon: 'Mail',
      definition: 'Conjunto de ferramentas em nuvem (Gmail, Drive, Docs, Meet) que facilitam o trabalho em equipe, armazenamento e comunicação contínua.'
    },
    'Business Intelligence': {
      term: 'Business Intelligence (Inteligência de Negócios)',
      icon: 'BarChart3',
      definition: 'Uso de dados, dashboards e relatórios analíticos para embasar decisões estratégicas em fatos reais e previsões concretas.'
    },
    IoT: {
      term: 'IoT (Internet das Coisas)',
      icon: 'Cpu',
      definition: 'Rede de sensores, equipamentos e máquinas conectadas que coletam e transmitem dados operacionais em tempo real.'
    },
    'Inteligencia Artificial': {
      term: 'Inteligência Artificial (IA)',
      icon: 'Sparkles',
      definition: 'Tecnologia capaz de executar tarefas cognitivas como redação, previsões comerciais e análise de grandes volumes de informação.'
    },
    'Código QR': {
      term: 'Código QR (QR Code)',
      icon: 'QrCode',
      definition: 'Código de barras 2D que pode ser escaneado rapidamente por câmeras de celular para abrir páginas, catálogos ou rastrear lotes.'
    },
    Trazabilidad: {
      term: 'Rastreabilidade',
      icon: 'GitMerge',
      definition: 'Capacidade de acompanhar o histórico completo, origem e localização de produtos e insumos ao longo de toda a cadeia de suprimentos.'
    },
    'Economía Circular': {
      term: 'Economia Circular',
      icon: 'RotateCcw',
      definition: 'Modelo sustentável focado em reduzir resíduos através do reaproveitamento, logística reversa, reparo e reciclagem contínua de recursos.'
    },
    Dashboard: {
      term: 'Dashboard (Painel de Indicadores)',
      icon: 'LayoutDashboard',
      definition: 'Tela gráfica interativa que exibe em tempo real os principais indicadores (KPIs) de desempenho da organização.'
    },
    Automatización: {
      term: 'Automação de Processos',
      icon: 'Activity',
      definition: 'Uso de softwares e regras automáticas para executar rotinas operacionais repetitivas, liberando tempo produtivo da equipe.'
    },
    'Cloud Computing': {
      term: 'Cloud Computing (Computação em Nuvem)',
      icon: 'Cloud',
      definition: 'Armazenamento e execução de softwares e servidores pela internet, dispensando infraestruturas físicas locais de alto custo.'
    },
    B2B: {
      term: 'B2B (Venda para Empresas)',
      icon: 'Briefcase',
      definition: 'Modelo comercial em que os clientes são outras empresas, órgãos públicos ou revendedores corporativos, e não pessoas físicas.'
    },
    B2C: {
      term: 'B2C (Venda para Consumidor Final)',
      icon: 'Users',
      definition: 'Modelo em que o negócio vende diretamente para pessoas físicas ou famílias que utilizam o produto/serviço para uso próprio.'
    },
    'Fábrica': {
      term: 'Fábrica ou Manufatura',
      icon: 'Hammer',
      definition: 'Empresas que adquirem insumos e matéria-prima para produzir bens físicos acabados (alimentos, confecção, marcenaria, metalurgia).'
    },
    'Manufactura': {
      term: 'Manufatura e Produção',
      icon: 'Hammer',
      definition: 'Transformação de matérias-primas em produtos finais com uso de máquinas, ferramentas ou processos manuais.'
    },
    'Servicios': {
      term: 'Prestação de Serviços',
      icon: 'Activity',
      definition: 'Empresas focadas em trabalho especializado, assessoria ou assistência técnica (reparos, saúde, transporte, consultoria).'
    },
    'Comercio': {
      term: 'Comércio ou Varejo',
      icon: 'ShoppingCart',
      definition: 'Empresas voltadas à compra de produtos prontos para revenda no atacado ou varejo, sem alteração física dos itens.'
    }
  }
};

export const MODULES_I18N: Record<Language, { id: number; name: string }[]> = {
  es: [
    { id: 1, name: 'Fundamentos Tecnológicos y Administrativos' },
    { id: 2, name: 'Operaciones, Cadena de Suministro y Calidad' },
    { id: 3, name: 'Canales Comerciales, Automatización e IA' },
    { id: 4, name: 'Seguridad, Datos, Sostenibilidad y Cultura' }
  ],
  en: [
    { id: 1, name: 'Technological & Administrative Foundations' },
    { id: 2, name: 'Operations, Supply Chain & Quality' },
    { id: 3, name: 'Commercial Channels, Automation & AI' },
    { id: 4, name: 'Security, Data, Sustainability & Culture' }
  ],
  pt: [
    { id: 1, name: 'Fundamentos Tecnológicos e Administrativos' },
    { id: 2, name: 'Operações, Cadeia de Suprimentos e Qualidade' },
    { id: 3, name: 'Canais Comerciais, Automação e IA' },
    { id: 4, name: 'Segurança, Dados, Sustentabilidade e Cultura' }
  ]
};

export const MATURITY_LEVELS_I18N: Record<Language, (score: number) => {
  levelNumber: 1 | 2 | 3 | 4 | 5;
  title: string;
  stageName: string;
  color: string;
  description: string;
  badgeClass: string;
  textClass: string;
  nextStep: string;
}> = {
  es: (score: number) => {
    if (score <= 25) {
      return {
        levelNumber: 1,
        stageName: 'Nivel 1 de 5',
        title: 'Inicial (Analógico)',
        color: '#EF4444',
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
        color: '#F59E0B',
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
        color: '#3B82F6',
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
        color: '#06B6D4',
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
        color: '#10B981',
        badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
        textClass: 'text-emerald-600 dark:text-emerald-400',
        description: 'Nivel de excelencia. Ecosistema digital completamente integrado, con flujos automatizados (RPA), adopción estratégica de Inteligencia Artificial generativa y cultura de innovación sostenible continua.',
        nextStep: 'Escalar modelos de negocio digitales, desarrollar integraciones exclusivas y liderar la innovación tecnológica en su industria.'
      };
    }
  },
  en: (score: number) => {
    if (score <= 25) {
      return {
        levelNumber: 1,
        stageName: 'Level 1 of 5',
        title: 'Initial (Analog)',
        color: '#EF4444',
        badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
        textClass: 'text-red-600 dark:text-red-400',
        description: 'The organization carries out most operations manually or using paper records. Technology adoption is minimal, creating high dependency on non-digitized workflows.',
        nextStep: 'Migrate core documents to cloud storage (Google Drive or OneDrive) and implement basic electronic invoicing.'
      };
    } else if (score <= 50) {
      return {
        levelNumber: 2,
        stageName: 'Level 2 of 5',
        title: 'Beginner (Aware)',
        color: '#F59E0B',
        badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
        textClass: 'text-amber-600 dark:text-amber-400',
        description: 'The company uses standalone digital tools (spreadsheets, email, WhatsApp for sales). Digital awareness has started, but tools lack integration and work is often duplicated.',
        nextStep: 'Adopt a centralized management system (entry-level cloud ERP or inventory tool) and train team members on daily digital routines.'
      };
    } else if (score <= 75) {
      return {
        levelNumber: 3,
        stageName: 'Level 3 of 5',
        title: 'Developing (Connected)',
        color: '#3B82F6',
        badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
        textClass: 'text-blue-600 dark:text-blue-400',
        description: 'Key operations are systematically integrated via cloud platforms (billing, cashflow, orders). Information flows smoothly across units with agile team collaboration.',
        nextStep: 'Connect sales with inventory and collections automatically, implement a commercial CRM, and activate automated cloud backups.'
      };
    } else if (score <= 90) {
      return {
        levelNumber: 4,
        stageName: 'Level 4 of 5',
        title: 'Competitive (Optimized)',
        color: '#06B6D4',
        badgeClass: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20',
        textClass: 'text-cyan-600 dark:text-cyan-400',
        description: 'Advanced maturity. The business makes data-backed decisions using live metrics. Operational procedures are standardized and digital channels drive significant revenue.',
        nextStep: 'Incorporate AI productivity assistants for customer inquiries and predictive analytics, and strengthen formal cybersecurity safeguards.'
      };
    } else {
      return {
        levelNumber: 5,
        stageName: 'Level 5 of 5',
        title: 'Transformational (Digital Leader)',
        color: '#10B981',
        badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
        textClass: 'text-emerald-600 dark:text-emerald-400',
        description: 'Optimal maturity level. Real-time data telemetry, automated workflows (RPA), strategic generative AI integration, robust security protocols, and sustainable circular innovation.',
        nextStep: 'Scale digital business models, build proprietary software integrations, and lead digital benchmarks across your sector.'
      };
    }
  },
  pt: (score: number) => {
    if (score <= 25) {
      return {
        levelNumber: 1,
        stageName: 'Nível 1 de 5',
        title: 'Inicial (Analógico)',
        color: '#EF4444',
        badgeClass: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
        textClass: 'text-red-600 dark:text-red-400',
        description: 'A organização opera predominantemente de forma manual ou em papel. O uso de tecnologia é pontual ou inexistente, com alta dependência física de processos.',
        nextStep: 'Migrar documentos e planilhas vitais para nuvem (Google Drive ou OneDrive) e emitir notas fiscais eletrônicas.'
      };
    } else if (score <= 50) {
      return {
        levelNumber: 2,
        stageName: 'Nível 2 de 5',
        title: 'Iniciante (Consciente)',
        color: '#F59E0B',
        badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
        textClass: 'text-amber-600 dark:text-amber-400',
        description: 'A empresa utiliza ferramentas digitais isoladas (planilhas básicas de Excel, WhatsApp para vendas). Há conscientização digital, mas os sistemas não são integrados.',
        nextStep: 'Implantar software de gestão unificado (ERP inicial ou controle de estoque) e treinar colaboradores em rotinas digitais.'
      };
    } else if (score <= 75) {
      return {
        levelNumber: 3,
        stageName: 'Nível 3 de 5',
        title: 'Em Desenvolvimento (Conectado)',
        color: '#3B82F6',
        badgeClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
        textClass: 'text-blue-600 dark:text-blue-400',
        description: 'Processos centrais estão conectados via software de gestão em nuvem (faturamento, pedidos e caixa). As informações fluem e a equipe colabora com agilidade.',
        nextStep: 'Conectar vendas ao controle de estoque de forma automática, implementar CRM de clientes e programar backups automáticos.'
      };
    } else if (score <= 90) {
      return {
        levelNumber: 4,
        stageName: 'Nível 4 de 5',
        title: 'Competitivo (Otimizado)',
        color: '#06B6D4',
        badgeClass: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20',
        textClass: 'text-cyan-600 dark:text-cyan-400',
        description: 'Maturidade avançada. Tomada de decisões com base em dados e indicadores em tempo real. Processos padronizados e canais digitais com alto volume comercial.',
        nextStep: 'Integrar assistentes de Inteligência Artificial para atendimento e análise preditiva, além de consolidar políticas de segurança da informação.'
      };
    } else {
      return {
        levelNumber: 5,
        stageName: 'Nível 5 de 5',
        title: 'Transformador (Líder Digital)',
        color: '#10B981',
        badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
        textClass: 'text-emerald-600 dark:text-emerald-400',
        description: 'Nível de excelência. Operações em tempo real com dashboards unificados, automações de ponta a ponta (RPA), IA aplicada, segurança sólida e sustentabilidade contínua.',
        nextStep: 'Escalar modelos de negócios digitais, desenvolver integrações exclusivas e liderar a inovação em seu mercado.'
      };
    }
  }
};

export const QUESTIONS_I18N: Record<Language, Question[]> = {
  es: [
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
  ],
  en: [
    {
      id: 'Q1',
      dimensionId: 1,
      text: 'Does your company have a formal strategy or plan to adopt technology and digitize core workflows?',
      type: 'single',
      helpTerm: 'Estrategia Digital',
      options: [
        { id: 'Q1_1', text: 'We do not have tech plans or dedicated budgets; we address needs ad hoc as they arise.', score: 20 },
        { id: 'Q1_2', text: 'There is general interest in digitizing, but no structured roadmap or formal budget.', score: 40 },
        { id: 'Q1_3', text: 'We have basic digital initiatives and goals set for several priority operations.', score: 60 },
        { id: 'Q1_4', text: 'We maintain a well-defined technology roadmap and an allocated annual digital budget.', score: 80 },
        { id: 'Q1_5', text: 'Digital transformation is a core strategic pillar of our enterprise with continuous reviews.', score: 100 }
      ]
    },
    {
      id: 'Q2',
      dimensionId: 2,
      text: 'How do you store and share your company’s important files and documents?',
      type: 'single',
      helpTerm: 'Cloud Computing',
      options: [
        { id: 'Q2_1', text: 'On physical paper, folders, or office notebooks.', score: 20 },
        { id: 'Q2_2', text: 'On a single computer or on USB flash drives.', score: 40 },
        { id: 'Q2_3', text: 'On the internet using free shared cloud folders (like Google Drive, Dropbox, or OneDrive).', score: 60 },
        { id: 'Q2_4', text: 'We use official corporate cloud accounts with regular backups.', score: 80 },
        { id: 'Q2_5', text: 'Our entire business runs in the cloud and can be accessed securely from anywhere.', score: 100 }
      ]
    },
    {
      id: 'Q3',
      dimensionId: 3,
      text: 'How do you track sales, accounts, and payments in your business?',
      type: 'single',
      helpTerm: 'ERP',
      options: [
        { id: 'Q3_1', text: 'In handwritten notebooks or paper receipts.', score: 20 },
        { id: 'Q3_2', text: 'In computer spreadsheets (Excel or Google Sheets).', score: 40 },
        { id: 'Q3_3', text: 'Using basic software or an online portal to issue electronic invoices.', score: 60 },
        { id: 'Q3_4', text: 'With dedicated sales and billing software that manages cash flow and bank accounts.', score: 80 },
        { id: 'Q3_5', text: 'With an integrated system that automatically unites sales, purchases, cash, and accounting.', score: 100 }
      ]
    },
    {
      id: 'Q4',
      dimensionId: 4,
      text: 'How do you know what products or supplies you have in stock in your warehouse?',
      type: 'single',
      helpTerm: 'Dashboard',
      options: [
        { id: 'Q4_1', text: 'By looking at the shelves or when an item runs out.', score: 20 },
        { id: 'Q4_2', text: 'Writing in a notebook or an Excel file updated once in a while.', score: 40 },
        { id: 'Q4_3', text: 'With a shared Excel sheet or basic inventory software updated daily.', score: 60 },
        { id: 'Q4_4', text: 'With a digital inventory program that subtracts items automatically with each sale.', score: 80 },
        { id: 'Q4_5', text: 'With barcode scanners and automatic alerts whenever stock runs low.', score: 100 }
      ]
    },
    {
      id: 'Q5',
      dimensionId: 5,
      text: 'How do you place orders and make purchases from your suppliers?',
      type: 'single',
      options: [
        { id: 'Q5_1', text: 'Via phone calls or quick WhatsApp chats without formal written records.', score: 20 },
        { id: 'Q5_2', text: 'Via email, manually reviewing price quotes.', score: 40 },
        { id: 'Q5_3', text: 'Using structured purchase order forms to authorize payments.', score: 60 },
        { id: 'Q5_4', text: 'We register and approve every purchase inside a digital management software.', score: 80 },
        { id: 'Q5_5', text: 'The system automatically calculates replenishment needs and generates orders to suppliers.', score: 100 }
      ]
    },
    {
      id: 'Q6',
      dimensionId: 6,
      text: 'What kind of tools or machinery do you use to produce goods or deliver services?',
      type: 'single',
      helpTerm: 'IoT',
      options: [
        { id: 'Q6_1', text: 'Mainly manual labor using traditional or simple mechanical hand tools.', score: 20 },
        { id: 'Q6_2', text: 'Basic machinery operated directly with no digital programming (e.g., standard drills, mechanical presses).', score: 40 },
        { id: 'Q6_3', text: 'Semi-automatic machinery programmable by specific tasks or by timer/cycle controls.', score: 60 },
        { id: 'Q6_4', text: 'Automated production lines with digital sensors and screen monitoring of speed and output.', score: 80 },
        { id: 'Q6_5', text: 'Smart IoT-connected machinery (Industry 4.0) with live cloud telemetry and predictive maintenance.', score: 100 }
      ]
    },
    {
      id: 'Q7',
      dimensionId: 7,
      text: 'Which of these channels do you use to receive inquiries or make sales to clients?',
      type: 'multiple',
      helpTerm: 'CRM',
      options: [
        { id: 'Q7_1', text: 'In-person service at physical storefronts, offices, or client visits.', score: 15 },
        { id: 'Q7_2', text: 'Via WhatsApp or social media chats (Facebook, Instagram, TikTok).', score: 25 },
        { id: 'Q7_3', text: 'Company website where clients can view our product or service catalog.', score: 20 },
        { id: 'Q7_4', text: 'Online store with a shopping cart or sales through online marketplaces.', score: 20 },
        { id: 'Q7_5', text: 'Connected commercial system that unifies all channels and saves client history.', score: 20 }
      ]
    },
    {
      id: 'Q8',
      dimensionId: 8,
      text: 'How do you coordinate and deliver orders or service visits to your customers?',
      type: 'single',
      helpTerm: 'Trazabilidad',
      options: [
        { id: 'Q8_1', text: 'The driver or technician picks the route based on their personal experience.', score: 20 },
        { id: 'Q8_2', text: 'We look up addresses before leaving using Google Maps or Waze on a mobile phone.', score: 40 },
        { id: 'Q8_3', text: 'We ship packages through third-party parcel or courier companies.', score: 60 },
        { id: 'Q8_4', text: 'We use a tracking system that sends clients a link or alert with shipment status.', score: 80 },
        { id: 'Q8_5', text: 'Live GPS tracking that automatically plans the fastest and most efficient routes.', score: 100 }
      ]
    },
    {
      id: 'Q9',
      dimensionId: 9,
      text: 'How do you track staff attendance and calculate employee payroll?',
      type: 'single',
      options: [
        { id: 'Q9_1', text: 'Signing paper attendance books and paying via cash or physical check.', score: 20 },
        { id: 'Q9_2', text: 'Using an Excel spreadsheet to calculate hours worked and wages.', score: 40 },
        { id: 'Q9_3', text: 'With a time clock (fingerprint or badge) and software to issue pay slips.', score: 60 },
        { id: 'Q9_4', text: 'With dedicated payroll software calculating taxes, benefits, and deductions.', score: 80 },
        { id: 'Q9_5', text: 'An online employee portal where staff can view pay stubs, request vacation, and time off.', score: 100 }
      ]
    },
    {
      id: 'Q10',
      dimensionId: 10,
      text: 'How do you log complaints, returns, or quality issues with products and services?',
      type: 'single',
      options: [
        { id: 'Q10_1', text: 'Handled verbally on the spot without saving written records.', score: 20 },
        { id: 'Q10_2', text: 'Writing complaints in a notebook or in an Excel spreadsheet.', score: 40 },
        { id: 'Q10_3', text: 'Reviewing issues in regular team meetings to find solutions.', score: 60 },
        { id: 'Q10_4', text: 'Using customer service software that notifies managers until the issue is resolved.', score: 80 },
        { id: 'Q10_5', text: 'Comprehensive quality management system measuring satisfaction and catching issues instantly.', score: 100 }
      ]
    },
    {
      id: 'Q11',
      dimensionId: 11,
      text: 'Which of these advertising or promotional activities do you run to attract clients?',
      type: 'multiple',
      options: [
        { id: 'Q11_1', text: 'Posting free photos, videos, or messages on social media.', score: 15 },
        { id: 'Q11_2', text: 'Paying for occasional ads on Facebook, Instagram, TikTok, or Google.', score: 25 },
        { id: 'Q11_3', text: 'Sending promotional messages or emails to a list of known contacts.', score: 20 },
        { id: 'Q11_4', text: 'A website designed to collect information from interested leads (contact forms).', score: 20 },
        { id: 'Q11_5', text: 'Digital ad campaigns with precise tracking of sales generated by each ad.', score: 20 }
      ]
    },
    {
      id: 'Q12',
      dimensionId: 12,
      text: 'Do you have tasks that run on their own or automatically in your business today?',
      type: 'single',
      helpTerm: 'Automatización',
      options: [
        { id: 'Q12_1', text: 'No, all administrative and routine office work is done by hand.', score: 20 },
        { id: 'Q12_2', text: 'We use formulas in Excel or pre-made templates to save time.', score: 40 },
        { id: 'Q12_3', text: 'We have basic automatic replies in emails, WhatsApp, or calendar reminders.', score: 60 },
        { id: 'Q12_4', text: 'We connect apps together (for example, saving WhatsApp contacts straight to an Excel sheet).', score: 80 },
        { id: 'Q12_5', text: 'Routine workflows run automatically across systems without manual work.', score: 100 }
      ]
    },
    {
      id: 'Q13',
      dimensionId: 13,
      text: 'Do you use Artificial Intelligence tools (like ChatGPT) in your daily work?',
      type: 'single',
      helpTerm: 'Inteligencia Artificial',
      options: [
        { id: 'Q13_1', text: 'We do not use Artificial Intelligence in our business.', score: 20 },
        { id: 'Q13_2', text: 'Some team members use it individually to write texts or brainstorm ideas.', score: 40 },
        { id: 'Q13_3', text: 'We use it officially to create content, answer messages, or draft proposals.', score: 60 },
        { id: 'Q13_4', text: 'It is built right into our daily work programs as a routine assistant.', score: 80 },
        { id: 'Q13_5', text: 'We use advanced artificial intelligence to forecast sales or guide business decisions.', score: 100 }
      ]
    },
    {
      id: 'Q14',
      dimensionId: 14,
      text: 'Which of these software tools does your business use in its everyday work?',
      type: 'multiple',
      helpTerm: 'Google Workspace',
      options: [
        { id: 'Q14_1', text: 'Company-branded email (e.g., info@mycompany.com) and shared digital calendar.', score: 20 },
        { id: 'Q14_2', text: 'Cloud productivity suite (Google Workspace or Microsoft 365 with Word, Excel online).', score: 20 },
        { id: 'Q14_3', text: 'Apps for team chat or video calls (Zoom, Teams, Slack, Meet).', score: 20 },
        { id: 'Q14_4', text: 'Software for tracking customer interactions and commercial leads (CRM).', score: 20 },
        { id: 'Q14_5', text: 'A central management software connecting inventory, purchasing, and sales.', score: 20 }
      ]
    },
    {
      id: 'Q15',
      dimensionId: 15,
      text: 'What precautions do you take to protect your company’s information and passwords?',
      type: 'single',
      options: [
        { id: 'Q15_1', text: 'Passwords are written on sticky notes, saved in plain view, or shared among everyone.', score: 20 },
        { id: 'Q15_2', text: 'Each person has their own password and office computers have basic antivirus.', score: 40 },
        { id: 'Q15_3', text: 'We enforce strong passwords and make regular backup copies of key files.', score: 60 },
        { id: 'Q15_4', text: 'We use mobile phone verification codes (2-factor auth) and automatic cloud backups.', score: 80 },
        { id: 'Q15_5', text: 'Strict digital security guidelines, role-based access permissions, and periodic audits.', score: 100 }
      ]
    },
    {
      id: 'Q16',
      dimensionId: 16,
      text: 'What do owners or managers rely on to make important business decisions?',
      type: 'single',
      helpTerm: 'Business Intelligence',
      options: [
        { id: 'Q16_1', text: 'On personal experience, intuition, and day-to-day gut feeling.', score: 20 },
        { id: 'Q16_2', text: 'Occasionally looking back at old printed reports or monthly summaries.', score: 40 },
        { id: 'Q16_3', text: 'Reviewing Excel spreadsheets with sales and expenses weekly or monthly.', score: 60 },
        { id: 'Q16_4', text: 'Checking digital dashboards with live, up-to-date numbers on PC or phone.', score: 80 },
        { id: 'Q16_5', text: 'Advanced data analysis that forecasts future sales and market trends.', score: 100 }
      ]
    },
    {
      id: 'Q17',
      dimensionId: 17,
      text: 'What actions does your company take to save resources and care for the environment?',
      type: 'single',
      helpTerm: 'Economía Circular',
      options: [
        { id: 'Q17_1', text: 'We currently do not have specific environmental care plans.', score: 20 },
        { id: 'Q17_2', text: 'Basic actions like turning off unused lights, printing less paper, and recycling bottles.', score: 40 },
        { id: 'Q17_3', text: 'Optimizing materials to avoid scrap, waste, and excess consumption in operations.', score: 60 },
        { id: 'Q17_4', text: 'Certified waste disposal, eco-friendly packaging, and electronic recycling programs.', score: 80 },
        { id: 'Q17_5', text: 'Sustainable business model where materials are reused and ecological impact is measured.', score: 100 }
      ]
    },
    {
      id: 'Q18',
      dimensionId: 18,
      text: 'How do you trace an order or product from when it is received until it reaches the client?',
      type: 'single',
      helpTerm: 'Trazabilidad',
      options: [
        { id: 'Q18_1', text: 'Checking paper receipts, invoices, or delivery slips.', score: 20 },
        { id: 'Q18_2', text: 'Logging serial numbers, batch codes, or delivery dates in an Excel spreadsheet.', score: 40 },
        { id: 'Q18_3', text: 'Using a basic software or mobile app where each completed delivery is recorded.', score: 60 },
        { id: 'Q18_4', text: 'Scanning barcodes or QR codes at each step of the process.', score: 80 },
        { id: 'Q18_5', text: 'Digital tracking system that shows the exact real-time journey to us and to clients.', score: 100 }
      ]
    },
    {
      id: 'Q19',
      dimensionId: 19,
      text: 'How often do you test new ideas or improvements in your products and work methods?',
      type: 'single',
      options: [
        { id: 'Q19_1', text: 'We prefer to keep things working the way they always have.', score: 20 },
        { id: 'Q19_2', text: 'We only make changes when customers or competitors force us to.', score: 40 },
        { id: 'Q19_3', text: 'We continuously look for and implement small improvements.', score: 60 },
        { id: 'Q19_4', text: 'We set aside dedicated time and budget every year to try new projects or services.', score: 80 },
        { id: 'Q19_5', text: 'We innovate constantly, rapidly testing new products, workflows, or technologies.', score: 100 }
      ]
    },
    {
      id: 'Q20',
      dimensionId: 20,
      text: 'How comfortable and willing is your team to learn and use new digital tools?',
      type: 'scale',
      options: [
        { id: 'Q20_1', text: 'They prefer traditional methods and need constant step-by-step assistance with technology.', score: 20 },
        { id: 'Q20_2', text: 'They are willing to learn when provided with patient, step-by-step training.', score: 40 },
        { id: 'Q20_3', text: 'They handle everyday computer and mobile tools well and learn new systems quickly.', score: 60 },
        { id: 'Q20_4', text: 'They enthusiastically adopt new digital tools to improve their daily work.', score: 80 },
        { id: 'Q20_5', text: 'The team proactively suggests new digital tools and learns independently.', score: 100 }
      ]
    }
  ],
  pt: [
    {
      id: 'Q1',
      dimensionId: 1,
      text: 'Sua empresa possui uma estratégia ou plano formal para incorporar tecnologia e digitalizar seus processos?',
      type: 'single',
      helpTerm: 'Estrategia Digital',
      options: [
        { id: 'Q1_1', text: 'Não temos planos ou orçamento de TI; resolvemos as necessidades conforme aparecem.', score: 20 },
        { id: 'Q1_2', text: 'Existe a intenção de digitalizar, mas sem um roteiro estruturado ou orçamento formal.', score: 40 },
        { id: 'Q1_3', text: 'Temos iniciativas e metas digitais básicas definidas para algumas áreas prioritárias.', score: 60 },
        { id: 'Q1_4', text: 'Possuímos um roteiro tecnológico claro e um orçamento anual dedicado a melhorias.', score: 80 },
        { id: 'Q1_5', text: 'A transformação digital é pilar estratégico central da empresa com acompanhamento contínuo.', score: 100 }
      ]
    },
    {
      id: 'Q2',
      dimensionId: 2,
      text: 'Como vocês guardam e compartilham os arquivos e documentos importantes da empresa?',
      type: 'single',
      helpTerm: 'Cloud Computing',
      options: [
        { id: 'Q2_1', text: 'Em papéis físicos, pastas ou cadernos no escritório.', score: 20 },
        { id: 'Q2_2', text: 'Em um único computador ou em pendrives.', score: 40 },
        { id: 'Q2_3', text: 'Na internet usando pastas gratuitas (como Google Drive, Dropbox ou OneDrive).', score: 60 },
        { id: 'Q2_4', text: 'Usamos contas corporativas na nuvem com cópias de segurança frequentes.', score: 80 },
        { id: 'Q2_5', text: 'Toda a operação está na nuvem e acessamos com segurança de qualquer lugar.', score: 100 }
      ]
    },
    {
      id: 'Q3',
      dimensionId: 3,
      text: 'Como vocês controlam as contas, vendas e pagamentos do negócio?',
      type: 'single',
      helpTerm: 'ERP',
      options: [
        { id: 'Q3_1', text: 'Em cadernos de anotações ou recibos de papel.', score: 20 },
        { id: 'Q3_2', text: 'Em planilhas no computador (Excel ou Google Sheets).', score: 40 },
        { id: 'Q3_3', text: 'Com um sistema ou portal básico para emitir notas fiscais eletrônicas.', score: 60 },
        { id: 'Q3_4', text: 'Com um programa de vendas e cobranças que controla caixa e bancos.', score: 80 },
        { id: 'Q3_5', text: 'Com um sistema integrado que une automaticamente vendas, compras, caixa e contabilidade.', score: 100 }
      ]
    },
    {
      id: 'Q4',
      dimensionId: 4,
      text: 'Como vocês sabem quais produtos ou materiais estão disponíveis no estoque?',
      type: 'single',
      helpTerm: 'Dashboard',
      options: [
        { id: 'Q4_1', text: 'Olhando visualmente as prateleiras ou quando o produto acaba.', score: 20 },
        { id: 'Q4_2', text: 'Anotando em um caderno ou planilha que atualizamos de vez em quando.', score: 40 },
        { id: 'Q4_3', text: 'Com uma planilha compartilhada ou programa básico atualizado todos os dias.', score: 60 },
        { id: 'Q4_4', text: 'Com um sistema digital que dá baixa no estoque automaticamente a cada venda.', score: 80 },
        { id: 'Q4_5', text: 'Com leitores de código de barras e avisos automáticos quando falta mercadoria.', score: 100 }
      ]
    },
    {
      id: 'Q5',
      dimensionId: 5,
      text: 'Como vocês fazem os pedidos e compras com seus fornecedores?',
      type: 'single',
      options: [
        { id: 'Q5_1', text: 'Por ligações telefônicas ou mensagens de WhatsApp sem registro formal por escrito.', score: 20 },
        { id: 'Q5_2', text: 'Por e-mails e conferindo orçamentos manualmente.', score: 40 },
        { id: 'Q5_3', text: 'Usando formulários ou ordens de compra estruturadas para autorizar pagamentos.', score: 60 },
        { id: 'Q5_4', text: 'Registramos e aprovamos cada compra dentro de um sistema digital.', score: 80 },
        { id: 'Q5_5', text: 'O sistema calcula o que está em falta e gera os pedidos aos fornecedores automaticamente.', score: 100 }
      ]
    },
    {
      id: 'Q6',
      dimensionId: 6,
      text: 'Que tipo de ferramentas ou máquinas vocês usam para fabricar produtos ou prestar serviços?',
      type: 'single',
      helpTerm: 'IoT',
      options: [
        { id: 'Q6_1', text: 'Trabalho predominantemente manual com ferramentas mecânicas tradicionais.', score: 20 },
        { id: 'Q6_2', text: 'Máquinas básicas operadas diretamente sem programação digital (ex: furadeiras, prensas mecânicas).', score: 40 },
        { id: 'Q6_3', text: 'Máquinas semiautomáticas programáveis por tarefas específicas ou controle de tempos e ciclos.', score: 60 },
        { id: 'Q6_4', text: 'Linhas de produção automatizadas com sensores e telas de monitoramento de rendimento e tempos.', score: 80 },
        { id: 'Q6_5', text: 'Maquinário inteligente conectado à internet (IoT e Indústria 4.0) com telemetria ao vivo e manutenção preditiva.', score: 100 }
      ]
    },
    {
      id: 'Q7',
      dimensionId: 7,
      text: 'Por quais destes canais vocês recebem contatos ou realizam vendas para clientes?',
      type: 'multiple',
      helpTerm: 'CRM',
      options: [
        { id: 'Q7_1', text: 'Atendimento presencial no balcão físico, loja ou visitas a clientes.', score: 15 },
        { id: 'Q7_2', text: 'Por WhatsApp ou redes sociais (Facebook, Instagram, TikTok).', score: 25 },
        { id: 'Q7_3', text: 'Site na internet onde os clientes veem nosso catálogo ou serviços.', score: 20 },
        { id: 'Q7_4', text: 'Loja virtual com carrinho de compras ou vendas em marketplaces.', score: 20 },
        { id: 'Q7_5', text: 'Sistema comercial conectado que atende por todos os canais e guarda o histórico do cliente.', score: 20 }
      ]
    },
    {
      id: 'Q8',
      dimensionId: 8,
      text: 'Como vocês coordenam e entregam os pedidos ou visitas aos seus clientes?',
      type: 'single',
      helpTerm: 'Trazabilidad',
      options: [
        { id: 'Q8_1', text: 'O entregador ou técnico decide o trajeto com base na sua própria experiência.', score: 20 },
        { id: 'Q8_2', text: 'Consultamos os endereços antes de sair usando Google Maps ou Waze no celular.', score: 40 },
        { id: 'Q8_3', text: 'Enviamos através de transportadoras ou serviços de entrega terceirizados.', score: 60 },
        { id: 'Q8_4', text: 'Usamos um sistema que envia ao cliente um link ou aviso com o status da entrega.', score: 80 },
        { id: 'Q8_5', text: 'Rastreamento por GPS ao vivo que traça as rotas mais rápidas automaticamente.', score: 100 }
      ]
    },
    {
      id: 'Q9',
      dimensionId: 9,
      text: 'Como vocês controlam a frequência dos funcionários e o pagamento de salários?',
      type: 'single',
      options: [
        { id: 'Q9_1', text: 'Assinando folhas de ponto de papel e pagamentos em dinheiro ou cheque.', score: 20 },
        { id: 'Q9_2', text: 'Em uma planilha de Excel onde calculamos horas e salários.', score: 40 },
        { id: 'Q9_3', text: 'Com relógio de ponto (biometria ou cartão) e software para emissão de holerites.', score: 60 },
        { id: 'Q9_4', text: 'Com um sistema de folha de pagamento que calcula salários, descontos e tributos.', score: 80 },
        { id: 'Q9_5', text: 'Portal online onde os colaboradores consultam holerites, pedem férias e folgas.', score: 100 }
      ]
    },
    {
      id: 'Q10',
      dimensionId: 10,
      text: 'Como vocês registram reclamações, dúvidas ou problemas com produtos e serviços?',
      type: 'single',
      options: [
        { id: 'Q10_1', text: 'Atendemos na hora de boca, sem manter um registro anotado.', score: 20 },
        { id: 'Q10_2', text: 'Anotamos as queixas em um caderno ou em uma planilha de Excel.', score: 40 },
        { id: 'Q10_3', text: 'Revisamos os problemas em reuniões periódicas para encontrar soluções.', score: 60 },
        { id: 'Q10_4', text: 'Usamos um sistema de atendimento que avisa os responsáveis até resolver o problema.', score: 80 },
        { id: 'Q10_5', text: 'Sistema de qualidade completo que mede a satisfação e detecta falhas na hora.', score: 100 }
      ]
    },
    {
      id: 'Q11',
      dimensionId: 11,
      text: 'Quais destas ações de divulgação ou publicidade vocês realizam para atrair clientes?',
      type: 'multiple',
      options: [
        { id: 'Q11_1', text: 'Postar fotos, vídeos ou avisos nas redes sociais sem pagar anúncios.', score: 15 },
        { id: 'Q11_2', text: 'Pagar anúncios esporádicos no Facebook, Instagram, TikTok ou Google.', score: 25 },
        { id: 'Q11_3', text: 'Enviar mensagens ou e-mails promocionais para uma lista de contatos conhecidos.', score: 20 },
        { id: 'Q11_4', text: 'Site criado para receber dados de pessoas interessadas (formulários de contato).', score: 20 },
        { id: 'Q11_5', text: 'Campanhas de anúncios com controle exato de quantas vendas cada anúncio traz.', score: 20 }
      ]
    },
    {
      id: 'Q12',
      dimensionId: 12,
      text: 'Existem tarefas que hoje funcionam sozinhas ou de forma automática no seu negócio?',
      type: 'single',
      helpTerm: 'Automatización',
      options: [
        { id: 'Q12_1', text: 'Não, todo o trabalho administrativo e rotineiro é feito à mão.', score: 20 },
        { id: 'Q12_2', text: 'Usamos fórmulas no Excel ou modelos prontos para economizar tempo.', score: 40 },
        { id: 'Q12_3', text: 'Temos respostas automáticas simples no e-mail, WhatsApp ou lembretes na agenda.', score: 60 },
        { id: 'Q12_4', text: 'Conectamos programas entre si (por exemplo, salvar contatos do WhatsApp direto numa planilha).', score: 80 },
        { id: 'Q12_5', text: 'As rotinas funcionam sozinhas entre os sistemas sem exigir trabalho manual.', score: 100 }
      ]
    },
    {
      id: 'Q13',
      dimensionId: 13,
      text: 'Vocês usam ferramentas de Inteligência Artificial (como o ChatGPT) no dia a dia?',
      type: 'single',
      helpTerm: 'Inteligencia Artificial',
      options: [
        { id: 'Q13_1', text: 'Não usamos Inteligência Artificial no negócio.', score: 20 },
        { id: 'Q13_2', text: 'Algumas pessoas da equipe usam individualmente para escrever textos ou buscar ideias.', score: 40 },
        { id: 'Q13_3', text: 'Usamos oficialmente para criar conteúdos, responder clientes ou redigir propostas.', score: 60 },
        { id: 'Q13_4', text: 'Está integrada nos nossos programas de trabalho como assistente diário.', score: 80 },
        { id: 'Q13_5', text: 'Usamos modelos avançados de inteligência artificial para prever vendas ou tomar decisões.', score: 100 }
      ]
    },
    {
      id: 'Q14',
      dimensionId: 14,
      text: 'Quais destes programas de computador vocês utilizam no trabalho todos os dias?',
      type: 'multiple',
      helpTerm: 'Google Workspace',
      options: [
        { id: 'Q14_1', text: 'E-mail com o nome da empresa (ex: contato@minhaempresa.com) e agenda compartilhada.', score: 20 },
        { id: 'Q14_2', text: 'Pacote de trabalho na nuvem (Google Workspace ou Microsoft 365 com Word, Excel online).', score: 20 },
        { id: 'Q14_3', text: 'Aplicativos para conversar ou fazer chamadas de vídeo com o time (Zoom, Teams, Slack, Meet).', score: 20 },
        { id: 'Q14_4', text: 'Programa de acompanhamento de clientes e oportunidades comerciais.', score: 20 },
        { id: 'Q14_5', text: 'Sistema de gestão da empresa que conecta estoque, compras e vendas.', score: 20 }
      ]
    },
    {
      id: 'Q15',
      dimensionId: 15,
      text: 'Que cuidados vocês tomam para proteger as informações e senhas da sua empresa?',
      type: 'single',
      options: [
        { id: 'Q15_1', text: 'As senhas ficam anotadas em papéis, coladas na tela ou são compartilhadas por todos.', score: 20 },
        { id: 'Q15_2', text: 'Cada pessoa tem sua senha e os computadores contam com antivírus básico.', score: 40 },
        { id: 'Q15_3', text: 'Usamos senhas seguras e guardamos cópias de segurança dos arquivos com frequência.', score: 60 },
        { id: 'Q15_4', text: 'Usamos verificação com código no celular (duas etapas) e cópias automáticas na nuvem.', score: 80 },
        { id: 'Q15_5', text: 'Regras rigorosas de segurança digital, acessos restritos por função e auditorias periódicas.', score: 100 }
      ]
    },
    {
      id: 'Q16',
      dimensionId: 16,
      text: 'Em que os donos ou gerentes se apoiam para tomar decisões importantes no negócio?',
      type: 'single',
      helpTerm: 'Business Intelligence',
      options: [
        { id: 'Q16_1', text: 'Na experiência pessoal e na intuição do dia a dia.', score: 20 },
        { id: 'Q16_2', text: 'Revisando de vez em quando relatórios antigos em papel ou resumos do mês.', score: 40 },
        { id: 'Q16_3', text: 'Conferindo planilhas de Excel com vendas e gastos toda semana ou fim de mês.', score: 60 },
        { id: 'Q16_4', text: 'Olhando painéis com gráficos e números atualizados na hora no computador ou celular.', score: 80 },
        { id: 'Q16_5', text: 'Com análises avançadas de dados que projetam vendas futuras e tendências de mercado.', score: 100 }
      ]
    },
    {
      id: 'Q17',
      dimensionId: 17,
      text: 'Quais ações a sua empresa realiza para economizar recursos e cuidar do meio ambiente?',
      type: 'single',
      helpTerm: 'Economía Circular',
      options: [
        { id: 'Q17_1', text: 'Por enquanto não temos planos formais de cuidado ambiental.', score: 20 },
        { id: 'Q17_2', text: 'Ações básicas como apagar luzes, imprimir menos em papel e reciclar materiais.', score: 40 },
        { id: 'Q17_3', text: 'Aproveitamento máximo dos materiais para não gerar perdas nem desperdícios.', score: 60 },
        { id: 'Q17_4', text: 'Descarte correto de resíduos, embalagens ecológicas e reciclagem de eletrônicos.', score: 80 },
        { id: 'Q17_5', text: 'Negócio sustentável onde produtos e sobras são reaproveitados e o impacto ecológico é medido.', score: 100 }
      ]
    },
    {
      id: 'Q18',
      dimensionId: 18,
      text: 'Como vocês acompanham um pedido ou produto desde a entrada até chegar ao cliente?',
      type: 'single',
      helpTerm: 'Trazabilidad',
      options: [
        { id: 'Q18_1', text: 'Conferindo notas fiscais, recibos ou guias de papel.', score: 20 },
        { id: 'Q18_2', text: 'Anotando números de lote, série ou entregas em uma planilha de Excel.', score: 40 },
        { id: 'Q18_3', text: 'Com um aplicativo ou programa básico onde se registra cada entrega feita.', score: 60 },
        { id: 'Q18_4', text: 'Escaneando códigos de barras ou QR Codes em etapas principais do caminho.', score: 80 },
        { id: 'Q18_5', text: 'Sistema digital que mostra o trajeto exato em tempo real para nós e para os clientes.', score: 100 }
      ]
    },
    {
      id: 'Q19',
      dimensionId: 19,
      text: 'Com que frequência vocês testam novas ideias ou melhorias nos produtos e na forma de trabalhar?',
      type: 'single',
      options: [
        { id: 'Q19_1', text: 'Preferimos manter as coisas funcionando do jeito que sempre deram certo.', score: 20 },
        { id: 'Q19_2', text: 'Fazemos mudanças somente quando os clientes ou a concorrência nos forçam.', score: 40 },
        { id: 'Q19_3', text: 'Buscamos e aplicamos pequenas melhorias de forma contínua.', score: 60 },
        { id: 'Q19_4', text: 'Reservamos tempo e orçamento a cada ano para testar novos projetos ou serviços.', score: 80 },
        { id: 'Q19_5', text: 'Inovamos o tempo todo, testando novos produtos ou tecnologias com rapidez.', score: 100 }
      ]
    },
    {
      id: 'Q20',
      dimensionId: 20,
      text: 'Quão confortável e disposta a sua equipe se sente para aprender a usar novas ferramentas digitais?',
      type: 'scale',
      options: [
        { id: 'Q20_1', text: 'Preferem os métodos tradicionais e precisam de ajuda constante com tecnologia.', score: 20 },
        { id: 'Q20_2', text: 'Têm interesse em aprender se receberem orientações práticas passo a passo.', score: 40 },
        { id: 'Q20_3', text: 'Usam bem programas do dia a dia (celular, computador) e aprendem rápido novos sistemas.', score: 60 },
        { id: 'Q20_4', text: 'Adotam novas ferramentas digitais com facilidade e entusiasmo para melhorar o trabalho.', score: 80 },
        { id: 'Q20_5', text: 'A equipe propõe inovações por iniciativa própria e aprende de forma independente.', score: 100 }
      ]
    }
  ]
};
