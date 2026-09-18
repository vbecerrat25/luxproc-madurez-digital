import { Language } from './translations';
import { DiagnosticRecord } from '../types';

export interface ActionPlanRecommendation {
  title: string;
  text: string;
  icon: string;
}

export function getTranslatedRecommendations(
  record: DiagnosticRecord,
  lang: Language
): ActionPlanRecommendation[] {
  const { metrics, responses } = record;
  const list: ActionPlanRecommendation[] = [];

  const q3Response = responses?.find(r => r.questionId === 'Q3')?.selectedOptionIds[0] || '';
  const q4Response = responses?.find(r => r.questionId === 'Q4')?.selectedOptionIds[0] || '';
  const q6Response = responses?.find(r => r.questionId === 'Q6')?.selectedOptionIds[0] || '';
  const q7Responses = responses?.find(r => r.questionId === 'Q7')?.selectedOptionIds || [];
  const q15Response = responses?.find(r => r.questionId === 'Q15')?.selectedOptionIds[0] || '';
  const q13Response = responses?.find(r => r.questionId === 'Q13')?.selectedOptionIds[0] || '';

  if (lang === 'en') {
    // 1. Accounting & Finance
    if (q3Response === 'Q3_1' || metrics.gestion < 30) {
      list.push({
        title: 'Accounting & Finance: Step-by-step from Paper to Cloud Spreadsheets',
        text: 'Begin without unnecessary costs: migrate your physical notebooks and paper receipts into structured Google Sheets or Excel templates. Track three essential elements: daily revenue, supplier expenses, and pending accounts receivable. This establishes digital discipline in your team before evaluating costly ERP systems.',
        icon: 'FileSpreadsheet'
      });
    } else if (q3Response === 'Q3_2' || metrics.gestion < 60) {
      list.push({
        title: 'Finance & Invoicing: Automated Formulas and Cloud Invoicing',
        text: 'Since your team already uses spreadsheets daily, enhance them by using lookup formulas (XLOOKUP, SUMIFS) and connect a cloud invoicing system. This avoids manual retyping errors, ensures fiscal compliance, and generates automatic daily sales reports.',
        icon: 'Layers'
      });
    } else {
      list.push({
        title: 'Financial Management: Real-Time Cash Flow Dashboards & ERP',
        text: 'Maximize your existing management system by connecting its database to interactive visual dashboards (like Looker Studio or Power BI) and automatic bank reconciliation feeds, allowing management to review cash position and profitability indicators in real time.',
        icon: 'LayoutDashboard'
      });
    }

    // 2. Inventory & Warehousing
    if (q4Response === 'Q4_1' || metrics.automatizacion < 30) {
      list.push({
        title: 'Inventory: Establish a Weekly Digital Stock Count Routine',
        text: 'Avoid sudden, complex barcode implementations. Instead, schedule a dedicated day every week to physically count your highest-turnover items and record balances in a shared digital inventory sheet. This eliminates stock discrepancies and prevents surprise shortages.',
        icon: 'Boxes'
      });
    } else if (q4Response === 'Q4_2' || metrics.automatizacion < 60) {
      list.push({
        title: 'Inventory: Daily Tracking & Low-Stock Color Alerts',
        text: 'Turn stock logging into a daily operating routine. Apply conditional formatting rules in your spreadsheets (turning cells red when items fall below safety buffers) so purchase orders can be triggered ahead of time before running out of stock.',
        icon: 'AlertTriangle'
      });
    } else {
      list.push({
        title: 'Warehouse: Real-Time Omnichannel Inventory Synchronization',
        text: 'Directly integrate your warehouse management platform with your online store, sales channels, and CRM so units deduct automatically upon purchase confirmation, preventing costly stockouts and double-selling.',
        icon: 'RefreshCw'
      });
    }

    // 3. Machinery & Production Operations
    if (q6Response === 'Q6_1' || q6Response === 'Q6_2' || metrics.automatizacion < 45) {
      list.push({
        title: 'Production: Operating Sheets and Machine Preventive Maintenance',
        text: 'For basic or mechanical machinery, implement digital operating log sheets in Google Sheets to record operating hours, production output per shift, and scheduled preventive maintenance dates, preventing unexpected equipment breakdowns and costly downtime.',
        icon: 'Cpu'
      });
    } else if (q6Response === 'Q6_3' || metrics.automatizacion < 75) {
      list.push({
        title: 'Operations: Standardize Task Cycles and Digital Job Orders',
        text: 'For semi-automatic machines with task or time programming, create clear standard operating procedures (SOPs) for recipe/cycle setup. Connect job cards digitally with cloud work orders to measure actual cycle efficiency versus scheduled target times.',
        icon: 'Layers'
      });
    } else {
      list.push({
        title: 'Smart Industry: Sensor Telemetry and Real-Time OEE Metrics',
        text: 'Connect production lines with IoT sensors or digital machine interfaces to monitor Overall Equipment Effectiveness (OEE) and energy consumption live, anticipating component wear through predictive maintenance alerts.',
        icon: 'Cpu'
      });
    }

    // 4. Commercial & Sales Channels
    const hasOnline = q7Responses.includes('Q7_3') || q7Responses.includes('Q7_4');
    const hasMessaging = q7Responses.includes('Q7_2');
    const hasCRM = q7Responses.includes('Q7_5');

    if (!hasMessaging && !hasOnline && !hasCRM) {
      list.push({
        title: 'Sales: Activate WhatsApp Business with Digital Product Catalog',
        text: 'Empower your sales team immediately by deploying WhatsApp Business (free). Create a structured profile with opening hours, automated quick replies, and a photo catalog with clear pricing, making it easy for customers to order directly from their phones.',
        icon: 'MessageSquare'
      });
    } else if (!hasOnline && !hasCRM) {
      list.push({
        title: 'Sales: Digital Showcase Website & Instant Online Payment Links',
        text: 'Complement WhatsApp chat inquiries with a mobile-friendly showcase website and digital payment links (e.g. Stripe, Mercado Pago). This enables customers to finalize orders immediately with credit/debit cards without tedious bank transfer confirmations.',
        icon: 'CreditCard'
      });
    } else if (!hasCRM) {
      list.push({
        title: 'Commercial: Unified CRM to Track Inquiries from All Channels',
        text: 'Unify incoming leads from WhatsApp, social media, storefront visits, and website forms into a central CRM platform (such as HubSpot or Zoho). Automate follow-up reminders so your sales representatives never let an interested customer slip away.',
        icon: 'TrendingUp'
      });
    } else {
      list.push({
        title: 'Omnichannel: Automated Conversion Funnels & Smart Sales Triggers',
        text: 'Take your connected commercial system to the next tier by automating post-sale follow-ups, re-purchase triggers based on client history, and AI-assisted responses for recurring customer questions.',
        icon: 'TrendingUp'
      });
    }

    // 5. Cybersecurity & Information Protection
    if (q15Response === 'Q15_1' || metrics.seguridad < 40) {
      list.push({
        title: 'Cybersecurity: Password Vault and Two-Factor Authentication (2FA)',
        text: 'Eliminate passwords written on paper or shared over chat. Deploy a secure team password manager (like Bitwarden) and mandate Two-Factor Authentication (2FA) on all email, cloud storage, and banking accounts to shield the business from account takeovers.',
        icon: 'ShieldCheck'
      });
    }

    // 6. Innovation & Team Upskilling
    if (q13Response === 'Q13_1' || metrics.innovacion < 50) {
      list.push({
        title: 'AI & Productivity: Practical Team Workshops with AI Assistants',
        text: 'Hold straightforward, hands-on training sessions for your staff to leverage generative AI assistants for drafting client emails, summarizing supplier proposals, translating documents, and creating social media product descriptions in seconds.',
        icon: 'Sparkles'
      });
    }

  } else if (lang === 'pt') {
    // Portuguese
    if (q3Response === 'Q3_1' || metrics.gestion < 30) {
      list.push({
        title: 'Gestão Financeira: Do Papel para Planilhas Estruturadas em Nuvem',
        text: 'Comece passo a passo e sem custos altos: transfira cadernos e notas físicas para planilhas organizadas no Google Sheets ou Excel. Registre diariamente entradas, despesas com fornecedores e contas a receber. Isso constrói o hábito digital na equipe antes de investir em softwares caros.',
        icon: 'FileSpreadsheet'
      });
    } else if (q3Response === 'Q3_2' || metrics.gestion < 60) {
      list.push({
        title: 'Finanças: Fórmulas Automatizadas e Emissor de Notas em Nuvem',
        text: 'Como a equipe já usa planilhas no dia a dia, dê o próximo passo aplicando fórmulas automáticas (PROCV/X, SOMASE) e conectando um software simples de emissão de notas fiscais em nuvem, eliminando retrabalho e erros de digitação manual.',
        icon: 'Layers'
      });
    } else {
      list.push({
        title: 'Finanças Avançadas: Dashboards de Fluxo de Caixa e Integração ERP',
        text: 'Aproveite seu software de gestão conectando o banco de dados a painéis visuais interativos (como Looker Studio ou Power BI) e conciliação bancária automática, permitindo à diretoria monitorar caixa e lucratividade em tempo real.',
        icon: 'LayoutDashboard'
      });
    }

    // 2. Estoque
    if (q4Response === 'Q4_1' || metrics.automatizacion < 30) {
      list.push({
        title: 'Estoque: Rotina Semanal de Contagem e Controle Digital',
        text: 'Não tente implantar leitores de código de barras ou sistemas pesados de imediato. Defina um dia fixo por semana para contar fisicamente os produtos de maior saída e lançar as informações em uma planilha compartilhada, eliminando perdas e rupturas imprevistas.',
        icon: 'Boxes'
      });
    } else if (q4Response === 'Q4_2' || metrics.automatizacion < 60) {
      list.push({
        title: 'Estoque: Registro Diário e Alertas Visuais de Estoque Mínimo',
        text: 'Transforme o controle de estoque em hábito diário. Configure regras de formatação condicional (células vermelhas quando o item atingir a margem de segurança), disparando ordens de reposição antes que o produto falte.',
        icon: 'AlertTriangle'
      });
    } else {
      list.push({
        title: 'Estoque Omnichannel: Sincronização em Tempo Real',
        text: 'Conecte seu estoque físico diretamente à loja virtual, marketplaces e canais de atendimento, para que as quantidades sejam baixadas instantaneamente no momento da compra, evitando vendas duplicadas.',
        icon: 'RefreshCw'
      });
    }

    // 3. Produção e Maquinário
    if (q6Response === 'Q6_1' || q6Response === 'Q6_2' || metrics.automatizacion < 45) {
      list.push({
        title: 'Produção: Registro de Máquinas e Manutenção Preventiva Básica',
        text: 'Para maquinários mecânicos ou manuais, crie planilhas digitais no Google Sheets para registrar horas de operação, volume produzido por turno e calendário de manutenção preventiva, evitando quebras inesperadas que paralisam a entrega.',
        icon: 'Cpu'
      });
    } else if (q6Response === 'Q6_3' || metrics.automatizacion < 75) {
      list.push({
        title: 'Operações: Padronização de Ciclos e Ordens de Produção por Tempos',
        text: 'Para máquinas semiautomáticas programadas por tarefas ou tempos de ciclo, padronize os parâmetros operacionais em fichas técnicas digitais e acompanhe o rendimento real versus tempo planejado em telas ou planilhas compartilhadas.',
        icon: 'Layers'
      });
    } else {
      list.push({
        title: 'Indústria Inteligente: Telemetria de Sensores e Métricas OEE',
        text: 'Conecte linhas de produção com sensores industriais ou módulos IoT para monitorar o rendimento geral do equipamento (OEE) e acionar alertas preditivos de manutenção antes de falhas mecânicas.',
        icon: 'Cpu'
      });
    }

    // 4. Vendas e Canais Comerciais
    const hasOnlinePt = q7Responses.includes('Q7_3') || q7Responses.includes('Q7_4');
    const hasMessagingPt = q7Responses.includes('Q7_2');
    const hasCRMPt = q7Responses.includes('Q7_5');

    if (!hasMessagingPt && !hasOnlinePt && !hasCRMPt) {
      list.push({
        title: 'Vendas: Ativar WhatsApp Business com Catálogo de Produtos',
        text: 'Prioridade imediata: instale o WhatsApp Business gratuito e cadastre os dados da empresa, horários de atendimento e fotos claras dos produtos no catálogo digital para que os clientes façam pedidos pelo celular.',
        icon: 'MessageSquare'
      });
    } else if (!hasOnlinePt && !hasCRMPt) {
      list.push({
        title: 'Vendas: Página Web de Apresentação e Links de Pagamento Digital',
        text: 'Evolua suas conversas no WhatsApp com uma página web simples para apresentar seu catálogo e links de pagamento digitais, permitindo ao cliente concluir a compra no cartão sem comprovantes manuais de transferência.',
        icon: 'CreditCard'
      });
    } else if (!hasCRMPt) {
      list.push({
        title: 'Comercial: CRM Centralizado para Todos os Canais de Venda',
        text: 'Centralize contatos recebidos por WhatsApp, redes sociais, balcão e formulários em um sistema de CRM fácil de usar. Crie lembretes automáticos para que seus vendedores façam follow-up sem esquecer nenhuma oportunidade.',
        icon: 'TrendingUp'
      });
    } else {
      list.push({
        title: 'Comercial Avançado: Automação de Funil e Retenção de Clientes',
        text: 'Eleve seu sistema comercial conectando réguas automáticas de pós-venda, lembretes de recompra baseados no histórico do cliente e atendimento automatizado com inteligência artificial para dúvidas frequentes.',
        icon: 'TrendingUp'
      });
    }

    // 5. Cibersegurança
    if (q15Response === 'Q15_1' || metrics.seguridad < 40) {
      list.push({
        title: 'Segurança: Gerenciador de Senhas e Verificação em Duas Etapas (2FA)',
        text: 'Elimine senhas anotadas em papéis ou enviadas pelo chat. Adote um gerenciador corporativo gratuito como Bitwarden e ative a verificação em duas etapas em todos os e-mails, nuvens e contas financeiras da empresa.',
        icon: 'ShieldCheck'
      });
    }

    // 6. Inovação e Capacitação
    if (q13Response === 'Q13_1' || metrics.innovacion < 50) {
      list.push({
        title: 'IA e Produtividade: Treinamento Prático da Equipe com Assistentes de IA',
        text: 'Promova oficinas práticas e acessíveis para que a equipe utilize assistentes de inteligência artificial na elaboração de e-mails, resumo de orçamentos e criação de conteúdos promocionais em poucos minutos.',
        icon: 'Sparkles'
      });
    }

  } else {
    // Spanish (Default)
    // 1. Contabilidad y Finanzas
    if (q3Response === 'Q3_1' || metrics.gestion < 30) {
      list.push({
        title: 'Finanzas y Gestión: Paso a Paso del Cuaderno a Hojas de Cálculo en la Nube',
        text: '¡Avance con calma y sin gastos innecesarios! Antes de contratar un sistema contable costoso o un ERP complejo, comience pasando sus registros físicos a una plantilla estructurada en Google Sheets o Excel. Registre diariamente tres datos clave: ingresos por ventas, gastos con proveedores y cuentas pendientes por cobrar. Esto enseña a su equipo disciplina digital sin confusiones.',
        icon: 'FileSpreadsheet'
      });
    } else if (q3Response === 'Q3_2' || metrics.gestion < 60) {
      list.push({
        title: 'Finanzas y Facturación: Fórmulas Automatizadas y Software Simple en la Nube',
        text: 'Dado que su equipo ya maneja planillas de cálculo a diario, el siguiente escalón es aplicar fórmulas automáticas (BUSCARX, SUMAR.SI) e incorporar un software de facturación electrónica en la nube. Esto elimina errores de tipeo manual, garantiza el cumplimiento tributario y genera reportes diarios de ventas en un clic.',
        icon: 'Layers'
      });
    } else {
      list.push({
        title: 'Gestión Financiera: Tableros de Control en Vivo e Integración Bancaria',
        text: 'Aproveche al máximo su software centralizado conectando sus bases de datos con herramientas visuales interactivas (como Looker Studio o Power BI) y conciliación bancaria automática. Así, la gerencia podrá revisar el flujo de caja, la rentabilidad por línea y los cobros pendientes en tiempo real sin esperar el cierre de mes.',
        icon: 'LayoutDashboard'
      });
    }

    // 2. Inventario y Almacén
    if (q4Response === 'Q4_1' || metrics.automatizacion < 30) {
      list.push({
        title: 'Inventario: Establecer una Rutina Semanal de Conteo Digital',
        text: 'No intente instalar lectores de códigos de barra ni sistemas pesados de inmediato. El primer paso recomendado es definir un día y horario fijo cada semana para contar físicamente sus 20 productos de mayor rotación y registrarlos en una planilla compartida en la nube. Esto evita faltantes sorpresa y dinero inmovilizado.',
        icon: 'Boxes'
      });
    } else if (q4Response === 'Q4_2' || metrics.automatizacion < 60) {
      list.push({
        title: 'Inventario: Registro Diario con Alertas Visuales de Stock Mínimo',
        text: 'Convierta el registro de entradas y salidas de mercancía en un hábito diario. Configure en su planilla de cálculo un formato condicional en color rojo que se encienda de manera automática cuando las existencias bajen del nivel mínimo de seguridad, permitiéndole pedir insumos a tiempo a sus proveedores.',
        icon: 'AlertTriangle'
      });
    } else {
      list.push({
        title: 'Almacén: Sincronización Automática con Canales de Venta',
        text: 'Conecte directamente su sistema de almacén con su tienda en línea, sus canales de atención y su facturación. De esta manera, cada vez que un cliente confirma un pedido, el stock se descuenta en tiempo real en todos los puntos, eliminando cancelaciones por falta de stock.',
        icon: 'RefreshCw'
      });
    }

    // 3. Operaciones y Maquinaria
    if (q6Response === 'Q6_1' || q6Response === 'Q6_2' || metrics.automatizacion < 45) {
      list.push({
        title: 'Operaciones: Registro Digital de Trabajo y Mantenimiento Preventivo de Máquinas',
        text: 'Para talleres o plantas con herramientas manuales o máquinas mecánicas básicas (ej. taladros, prensas, cizallas), implemente una planilla digital sencilla en Google Sheets para registrar horas de uso, fallas habituales y un calendario de mantenimiento preventivo. Prevenir averías mecánicas ahorra días enteros de producción paralizada.',
        icon: 'Cpu'
      });
    } else if (q6Response === 'Q6_3' || metrics.automatizacion < 75) {
      list.push({
        title: 'Producción: Estandarización de Tareas y Control de Tiempos por Máquina',
        text: 'Para máquinas semiautomáticas programadas por tareas o tiempos de ciclo, elabore fichas técnicas digitales estándar con los tiempos de inicio, preparación y término por cada lote. Vincular los partes de trabajo en una planilla compartida permite comparar los tiempos reales con los programados y detectar demoras.',
        icon: 'Layers'
      });
    } else {
      list.push({
        title: 'Operaciones Inteligentes: Telemetría con Sensores y Eficiencia en Tiempo Real',
        text: 'Conecte sus máquinas clave a sensores industriales o módulos IoT para medir en tiempo real el rendimiento general (OEE), velocidad de línea y consumo de energía. Esto activa avisos automáticos antes de que ocurra una falla mecánica.',
        icon: 'Cpu'
      });
    }

    // 4. Ventas y Canales Comerciales (Analiza selecciones múltiples de Q7)
    const hasOnlineEs = q7Responses.includes('Q7_3') || q7Responses.includes('Q7_4');
    const hasMessagingEs = q7Responses.includes('Q7_2');
    const hasCRMEs = q7Responses.includes('Q7_5');

    if (!hasMessagingEs && !hasOnlineEs && !hasCRMEs) {
      list.push({
        title: 'Ventas: Instalar WhatsApp Business con Catálogo Digital de Productos',
        text: 'Prioridad comercial inmediata: instale la aplicación gratuita WhatsApp Business en los celulares de venta. Configure el perfil de su empresa con dirección, horario de atención y suba fotos nítidas con precio y descripción en la sección "Catálogo" para que sus clientes elijan y coticen rápidamente desde su teléfono.',
        icon: 'MessageSquare'
      });
    } else if (!hasOnlineEs && !hasCRMEs) {
      list.push({
        title: 'Ventas: Página Web Informativa con Enlaces de Cobro Digital',
        text: 'Fortalezca las ventas que ya recibe por chat creando una página web rápida y clara donde los clientes conozcan todos sus productos o servicios. Agregue enlaces directos de pago digital (Mercado Pago, transbank, Stripe, etc.) para que sus compradores puedan pagar con tarjeta al instante sin depender de transferencias manuales.',
        icon: 'CreditCard'
      });
    } else if (!hasCRMEs) {
      list.push({
        title: 'Gestión Comercial: Centralizar Prospectos en un CRM Fácil de Usar',
        text: 'Unifique los mensajes que llegan por WhatsApp, redes sociales, visitas presenciales y correo en una sola plataforma de CRM (como HubSpot o Zoho). Esto permite asignar clientes a cada vendedor, ver en qué etapa está cada cotización y enviar recordatorios automáticos para no perder ninguna venta.',
        icon: 'TrendingUp'
      });
    } else {
      list.push({
        title: 'Estrategia Comercial: Automatización de Embudo y Fidelización',
        text: 'Aproveche su sistema comercial conectado para programar secuencias automáticas de postventa, recordatorios de recompra basados en el historial del cliente y respuestas asistidas con inteligencia artificial para preguntas frecuentes.',
        icon: 'TrendingUp'
      });
    }

    // 5. Ciberseguridad y Protección de Datos
    if (q15Response === 'Q15_1' || metrics.seguridad < 40) {
      list.push({
        title: 'Ciberseguridad: Gestor de Contraseñas y Doble Factor de Autenticación (2FA)',
        text: 'Elimine de inmediato los papeles o libretas con contraseñas pegadas en pantallas o escritorios. Instale un gestor seguro y gratuito como Bitwarden y active obligatoriamente la verificación en dos pasos (código al celular o app autenticadora) en todos los correos de la empresa y accesos bancarios.',
        icon: 'ShieldCheck'
      });
    }

    // 6. Innovación y Capacitación del Personal
    if (q13Response === 'Q13_1' || metrics.innovacion < 50) {
      list.push({
        title: 'Innovación y Productividad: Talleres Prácticos de Inteligencia Artificial para el Equipo',
        text: 'Capacite a su personal con talleres cortos y prácticos para aprender a usar asistentes de inteligencia artificial generativa. Su equipo aprenderá a redactar correos a clientes, resumir cotizaciones de proveedores, generar ideas para redes sociales y crear reportes en una fracción del tiempo habitual.',
        icon: 'Sparkles'
      });
    }
  }

  return list;
}

export interface RoadmapPhases {
  f1Title: string;
  f1Subtitle: string;
  f1Desc: string;
  f2Title: string;
  f2Subtitle: string;
  f2Desc: string;
  f3Title: string;
  f3Subtitle: string;
  f3Desc: string;
}

export function getTranslatedRoadmapPhases(score: number, lang: Language): RoadmapPhases {
  if (lang === 'en') {
    if (score < 40) {
      return {
        f1Title: 'Phase 1 (Months 1 to 3): Basic Digital Foundation',
        f1Subtitle: 'Migrate from paper notes to structured cloud spreadsheets',
        f1Desc: 'Standardize daily records for sales, supplier purchases, and stock on Google Sheets or Excel templates. Set up WhatsApp Business with complete contact information, clear service hours, and a photo catalog of core products. Ensure every team computer has an updated antivirus and cloud backups.',
        f2Title: 'Phase 2 (Months 4 to 6): Digital Tools, Payments & Work Orders',
        f2Subtitle: 'Speed up customer checkout and organize daily operations',
        f2Desc: 'Integrate simple digital payment links and debit/credit card readers to eliminate cash reliance. Digitalize customer service work orders and machine operating logs so every job has a clear start, finish, and responsible team member.',
        f3Title: 'Phase 3 (Month 7+): First Connected Systems',
        f3Subtitle: 'Integrate operational routines without excess software costs',
        f3Desc: 'Adopt an entry-level cloud invoicing and inventory platform that issues compliant electronic receipts and tracks minimum stock levels automatically. Provide hands-on training to staff on shared cloud collaboration tools.'
      };
    } else if (score < 75) {
      return {
        f1Title: 'Phase 1 (Months 1 to 3): Process Consolidation & Cloud Security',
        f1Subtitle: 'Centralize company information in secure cloud suites',
        f1Desc: 'Standardize company operations on Google Workspace or Microsoft 365. Enforce Two-Factor Authentication (2FA) across all team email and bank accounts, and configure daily automated cloud backups to safeguard corporate data.',
        f2Title: 'Phase 2 (Months 4 to 6): CRM Pipeline & Operational Automation',
        f2Subtitle: 'Connect customer sales with warehouse replenishment and machine schedules',
        f2Desc: 'Deploy an accessible CRM to centralize inquiries from WhatsApp, social media, storefront, and web. Link inventory levels with supplier re-order notifications, and standardize machine cycle times to optimize daily production schedules.',
        f3Title: 'Phase 3 (Month 7+): Real-Time Dashboards & Workflow Optimization',
        f3Subtitle: 'Data-driven decision making and paperless administrative flows',
        f3Desc: 'Create visual real-time executive dashboards (in Looker Studio or Power BI) to monitor cash flow, sales conversion, and production efficiency. Replace paper authorizations with legally binding digital signatures.'
      };
    } else {
      return {
        f1Title: 'Phase 1 (Months 1 to 3): Cybersecurity Hardening & Governance',
        f1Subtitle: 'Protect high-scale digital infrastructure and data assets',
        f1Desc: 'Conduct a thorough corporate cybersecurity audit, deploy end-to-end database encryption, set up role-based access permissions, and conduct continuous phishing defense training for all staff members.',
        f2Title: 'Phase 2 (Months 4 to 6): Intelligent Process Automation (RPA & APIs)',
        f2Subtitle: 'Eliminate manual bottlenecks with automated integrations',
        f2Desc: 'Integrate core ERP, warehouse, and CRM backends using robust APIs and webhooks. Deploy robotic process automation (RPA) scripts to handle repetitive bank reconciliations, vendor invoice logging, and live order tracking.',
        f3Title: 'Phase 3 (Month 7+): Generative AI & Circular Tech Innovation',
        f3Subtitle: 'Industry technological leadership and sustainable digital lifecycle',
        f3Desc: 'Deploy predictive machine learning models for demand forecasting and build conversational AI concierges for 24/7 customer assistance. Formalize corporate circular hardware recycling policies and green IT practices.'
      };
    }
  } else if (lang === 'pt') {
    if (score < 40) {
      return {
        f1Title: 'Fase 1 (Mês 1 a 3): Organização Digital Básica',
        f1Subtitle: 'Migrar do papel para planilhas estruturadas em nuvem',
        f1Desc: 'Padronizar o registro diário de compras, vendas e controle de estoque em planilhas do Google Sheets ou Excel. Configurar o WhatsApp Business com perfil completo da empresa, horário de atendimento e catálogo digital com fotos dos principais produtos.',
        f2Title: 'Fase 2 (Mês 4 a 6): Ferramentas, Cobranças Digitais e Ordens de Trabalho',
        f2Subtitle: 'Agilizar o atendimento ao cliente e organizar rotinas produtivas',
        f2Desc: 'Implementar links de pagamento online e cartões para reduzir o uso de dinheiro físico. Digitalizar ordens de serviço e apontamentos de máquinas para acompanhar tempos de produção e responsáveis por cada entrega.',
        f3Title: 'Fase 3 (Mês 7+): Primeiros Sistemas Integrados',
        f3Subtitle: 'Integrar rotinas operacionais sem complexidade ou custos excessivos',
        f3Desc: 'Adotar software simples de emissão de notas fiscais e controle de estoque em nuvem com alertas de estoque mínimo. Capacitar a equipe no uso seguro de ferramentas digitais e colaboração em tempo real.'
      };
    } else if (score < 75) {
      return {
        f1Title: 'Fase 1 (Mês 1 a 3): Consolidação de Processos e Segurança em Nuvem',
        f1Subtitle: 'Centralizar informações corporativas na nuvem com proteção',
        f1Desc: 'Padronizar a rotina de trabalho no Google Workspace ou Microsoft 365. Ativar verificação em duas etapas (2FA) em todas as contas e configurar backups diários automáticos para garantir a segurança dos dados da empresa.',
        f2Title: 'Fase 2 (Mês 4 a 6): Gestão Comercial (CRM) e Automação Operacional',
        f2Subtitle: 'Conectar funil de vendas, estoque e planejamento de máquinas',
        f2Desc: 'Implementar um CRM prático para centralizar contatos de WhatsApp, redes sociais, balcão e site. Integrar o controle de estoque com avisos automáticos para fornecedores e padronizar os tempos de ciclo das máquinas semiautomáticas.',
        f3Title: 'Fase 3 (Mês 7+): Painéis de Controle (Dashboards) e Otimização',
        f3Subtitle: 'Tomada de decisão baseada em dados e eliminação de papel',
        f3Desc: 'Criar painéis visuais interativos (Looker Studio ou Power BI) para monitorar vendas, lucratividade e rendimento produtivo em tempo real. Substituir formulários físicos por assinaturas eletrônicas com validade jurídica.'
      };
    } else {
      return {
        f1Title: 'Fase 1 (Mês 1 a 3): Cibersegurança Avançada e Governança',
        f1Subtitle: 'Blindar a infraestrutura tecnológica e proteger dados estratégicos',
        f1Desc: 'Realizar auditoria técnica de segurança, implementar criptografia ponta a ponta em bases de dados, estabelecer controle rigoroso de acessos por função e capacitar toda a equipe contra ataques de engenharia social e phishing.',
        f2Title: 'Fase 2 (Mês 4 a 6): Automação Inteligente de Processos (RPA e APIs)',
        f2Subtitle: 'Eliminar gargalos operacionais e tarefas manuais repetitivas',
        f2Desc: 'Integrar os sistemas centrais (ERP, CRM e chão de fábrica) por meio de APIs e webhooks. Implementar rotinas automáticas de conciliação bancária e integração de dados operacionais.',
        f3Title: 'Fase 3 (Mês 7+): Inteligência Artificial e Práticas de Economia Circular',
        f3Subtitle: 'Liderança tecnológica, inovação e sustentabilidade corporativa',
        f3Desc: 'Implantar modelos preditivos de demanda, agentes de IA generativa para suporte ao cliente 24/7 e consolidar políticas de economia circular com reciclagem e descarte certificado de equipamentos eletrônicos.'
      };
    }
  } else {
    // Spanish (Default)
    if (score < 40) {
      return {
        f1Title: 'Fase 1 (Mes 1 a 3): Organización Digital Básica',
        f1Subtitle: 'Migrar de cuadernos y papel a registros estructurados en la nube',
        f1Desc: 'Estandarizar el registro diario de compras a proveedores, ventas a clientes e inventarios en planillas de Excel o Google Sheets. Configurar WhatsApp Business en los celulares de venta con perfil completo, horario de atención y catálogo digital con fotos claras y precios de sus principales productos. Respaldar archivos importantes en Google Drive o OneDrive.',
        f2Title: 'Fase 2 (Mes 4 a 6): Cobros Digitales, Turnos y Órdenes de Trabajo',
        f2Subtitle: 'Agilizar la cobranza a clientes y ordenar las tareas de producción o servicio',
        f2Desc: 'Implementar enlaces de cobro digital (Mercado Pago, tarjetas de débito/crédito, transferencias estructuradas) para reducir el manejo riesgoso de efectivo. Digitalizar los partes de trabajo diario o el uso de máquinas en planillas compartidas para saber con claridad quién realizó cada trabajo, los tiempos dedicados y los insumos utilizados.',
        f3Title: 'Fase 3 (Mes 7+): Primeros Sistemas de Gestión Conectados',
        f3Subtitle: 'Integrar la administración sin costos excesivos ni programas complejos',
        f3Desc: 'Adoptar un software sencillo de facturación electrónica y control de inventario en la nube que emita comprobantes autorizados y envíe alertas cuando las existencias estén por debajo del stock mínimo. Capacitar al personal en el uso diario de estas herramientas colaborativas.'
      };
    } else if (score < 75) {
      return {
        f1Title: 'Fase 1 (Mes 1 a 3): Consolidación de Procesos y Seguridad en la Nube',
        f1Subtitle: 'Centralizar la información corporativa en plataformas seguras',
        f1Desc: 'Estandarizar el trabajo diario en Google Workspace o Microsoft 365 con correos corporativos. Activar obligatoriamente el doble factor de autenticación (2FA) en todas las cuentas de la empresa y programar copias de seguridad automáticas diarias para proteger la información contra pérdidas o virus.',
        f2Title: 'Fase 2 (Mes 4 a 6): Gestión Comercial (CRM) y Tiempos de Operación',
        f2Subtitle: 'Conectar ventas, control de existencias y programación de tareas',
        f2Desc: 'Implementar un CRM fácil de usar para centralizar consultas de WhatsApp, redes sociales, visitas presenciales y sitio web sin perder clientes. Integrar el control de stock con alertas automáticas de compra a proveedores y estandarizar los tiempos y turnos de trabajo en máquinas semiautomáticas.',
        f3Title: 'Fase 3 (Mes 7+): Tableros de Control (Dashboards) y Cero Papel',
        f3Subtitle: 'Tomar decisiones basadas en datos reales y digitalizar firmas',
        f3Desc: 'Crear tableros visuales interactivos (en Looker Studio o Power BI) para que los líderes puedan revisar ventas, margen de ganancia y rendimiento operativo en tiempo real desde el celular. Reemplazar formularios y autorizaciones en papel mediante firmas electrónicas válidas.'
      };
    } else {
      return {
        f1Title: 'Fase 1 (Mes 1 a 3): Blindaje de Ciberseguridad y Estandarización',
        f1Subtitle: 'Proteger la infraestructura tecnológica y los datos sensibles del negocio',
        f1Desc: 'Realizar una auditoría formal de seguridad informática, configurar encriptación de datos, establecer permisos de acceso según el rol de cada empleado y dictar capacitaciones prácticas para evitar robos de identidad y ataques por correo falso (phishing).',
        f2Title: 'Fase 2 (Mes 4 a 6): Automatización Inteligente de Procesos (RPA y Conexión de Sistemas)',
        f2Subtitle: 'Eliminar cuellos de botella y tareas manuales repetitivas',
        f2Desc: 'Integrar los sistemas principales de la empresa (ERP, CRM y planta productiva) mediante APIs y flujos automatizados. Configurar robots de software (RPA) para tareas de alta frecuencia como digitación de facturas, conciliación bancaria y actualización masiva de inventario.',
        f3Title: 'Fase 3 (Mes 7+): Inteligencia Artificial Aplicada y Economía Circular',
        f3Subtitle: 'Liderazgo tecnológico, eficiencia continua y sostenibilidad ambiental',
        f3Desc: 'Implementar modelos predictivos de inteligencia artificial para pronosticar la demanda de clientes y asistentes virtuales generativos para atención continua 24/7. Consolidar políticas formales de economía circular con reciclaje y disposición certificada de equipos electrónicos.'
      };
    }
  }
}
