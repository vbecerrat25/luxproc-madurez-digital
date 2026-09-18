import React, { useState } from 'react';
import { Rocket, Star, Wrench, Clock, CheckCircle2, ArrowUpRight, Sparkles, Shield, Users, BarChart3, Database, MessageSquare, Cloud, Lock, ShoppingBag, Cpu } from 'lucide-react';
import { DiagnosticRecord, ScoreMetrics, CompanyInfo } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface PrioritizationMatrixProps {
  record: DiagnosticRecord;
  isPrint?: boolean;
}

export interface InitiativeCard {
  id: string;
  title: string;
  description: string;
  quadrant: 'quick_wins' | 'strategic' | 'operational' | 'future';
  axis: string;
  impact: 'Alto' | 'Medio';
  effort: 'Bajo' | 'Medio' | 'Alto';
  timeframe: string;
  priorityStatus: 'urgent' | 'recommended' | 'consolidation';
  icon: string;
}

export default function PrioritizationMatrix({ record, isPrint = false }: PrioritizationMatrixProps) {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'quick_wins' | 'strategic' | 'operational' | 'future'>('all');

  const { metrics, companyInfo } = record;

  // Complete catalog of initiatives across all 5 strategic axes and 4 quadrants
  // All initiatives are always displayed, with dynamically calculated urgency/status based on diagnostic scores
  const allInitiatives: InitiativeCard[] = [
    // 1. Quick Wins (Impacto Alto, Esfuerzo Bajo)
    {
      id: 'qw-2fa',
      title: language === 'en' ? 'Turn on 2-Factor Authentication (2FA)' : language === 'pt' ? 'Ativar Verificação em 2 Etapas (2FA)' : 'Activar Verificación en 2 Pasos (2FA)',
      description: language === 'en' 
        ? 'Protect corporate emails, Microsoft 365/Google accounts and WhatsApp numbers against unauthorized takeovers. Zero software licensing cost.'
        : language === 'pt'
          ? 'Proteger e-mails corporativos, contas Google/Microsoft e WhatsApp contra acessos não autorizados. Custo zero de software.'
          : 'Proteger correos corporativos, cuentas de almacenamiento y números de WhatsApp de accesos no autorizados. Costo cero de licencias.',
      quadrant: 'quick_wins',
      axis: language === 'en' ? 'Technology & Cybersecurity' : language === 'pt' ? 'Tecnologia e Cibersegurança' : 'Tecnología y Ciberseguridad',
      impact: 'Alto',
      effort: 'Bajo',
      timeframe: '1 a 2 días',
      priorityStatus: metrics.seguridad < 60 ? 'urgent' : metrics.seguridad < 80 ? 'recommended' : 'consolidation',
      icon: 'Lock'
    },
    {
      id: 'qw-whatsapp',
      title: language === 'en' ? 'Professionalize WhatsApp Business' : language === 'pt' ? 'Padronizar WhatsApp Business com Respostas Rápidas' : 'Estandarizar WhatsApp Business y Catálogo Digital',
      description: language === 'en'
        ? 'Set up welcome greetings, fast response templates, digital product catalog, and order labels to prevent losing sales leads.'
        : language === 'pt'
          ? 'Configurar mensagens de boas-vindas, catálogo digital e etiquetas de clientes por status de pedido para não perder orçamentos.'
          : 'Configurar catálogo de productos/servicios, respuestas rápidas predefinidas y etiquetas de clientes por estado de cotización.',
      quadrant: 'quick_wins',
      axis: language === 'en' ? 'Customers & Commercial Channels' : language === 'pt' ? 'Clientes e Canais Comerciais' : 'Clientes y Canales Comerciales',
      impact: 'Alto',
      effort: 'Bajo',
      timeframe: '3 a 5 días',
      priorityStatus: metrics.digitalizacion < 65 ? 'urgent' : metrics.digitalizacion < 80 ? 'recommended' : 'consolidation',
      icon: 'MessageSquare'
    },
    {
      id: 'qw-cloud-docs',
      title: language === 'en' ? 'Centralize Files in Secure Cloud Storage' : language === 'pt' ? 'Centralizar Documentos e Planilhas em Nuvem' : 'Centralizar Documentos y Plantillas en la Nube',
      description: language === 'en'
        ? 'Stop saving isolated files only on personal laptops or pendrives. Establish structured Google Workspace or OneDrive folders with access controls.'
        : language === 'pt'
          ? 'Substituir arquivos soltos em computadores e pendrives por pastas compartilhadas em nuvem com permissões de acesso.'
          : 'Reemplazar archivos dispersos en PCs y memorias USB por carpetas compartidas en Google Drive o OneDrive con permisos por rol.',
      quadrant: 'quick_wins',
      axis: language === 'en' ? 'Operations & Processes' : language === 'pt' ? 'Operações e Processos' : 'Operaciones y Procesos',
      impact: 'Alto',
      effort: 'Bajo',
      timeframe: '1 semana',
      priorityStatus: metrics.gestion < 65 ? 'urgent' : metrics.gestion < 80 ? 'recommended' : 'consolidation',
      icon: 'Cloud'
    },
    {
      id: 'qw-qr-payments',
      title: language === 'en' ? 'Digital QR Codes & Instant Payment Links' : language === 'pt' ? 'Links de Pagamento e Chaves PIX/QR' : 'Enlaces de Pago Digital y Códigos QR Inmediatos',
      description: language === 'en'
        ? 'Enable instant customer payments (Yape, Plin, debit card links) to eliminate manual bank receipt reconciliation delays.'
        : language === 'pt'
          ? 'Facilitar pagamentos instantâneos com links e QR codes, reduzindo o tempo de conferência manual de comprovantes.'
          : 'Facilitar pagos inmediatos (Yape, Plin, pasarelas) eliminando fricción y confirmaciones manuales de depósitos.',
      quadrant: 'quick_wins',
      axis: language === 'en' ? 'Customers & Commercial Channels' : language === 'pt' ? 'Clientes e Canais Comerciais' : 'Clientes y Canales Comerciales',
      impact: 'Alto',
      effort: 'Bajo',
      timeframe: '3 a 7 días',
      priorityStatus: metrics.digitalizacion < 70 ? 'urgent' : 'recommended',
      icon: 'ShoppingBag'
    },

    // 2. Strategic Projects (Impacto Alto, Esfuerzo Medio)
    {
      id: 'st-erp',
      title: language === 'en' ? 'Deploy Cloud ERP & Electronic Invoicing' : language === 'pt' ? 'Implantar ERP em Nuvem e Faturamento Integrado' : 'Implantar Sistema de Gestión (ERP) y Facturación Electrónica',
      description: language === 'en'
        ? 'Integrate sales, purchasing, inventory, and SUNAT fiscal compliance into a unified real-time cloud management platform.'
        : language === 'pt'
          ? 'Unificar vendas, compras, contas a receber, estoque e emissão fiscal em uma plataforma integrada e centralizada.'
          : 'Integrar ventas, compras, cuentas por cobrar, stock y facturación electrónica SUNAT en una sola plataforma centralizada.',
      quadrant: 'strategic',
      axis: language === 'en' ? 'Operations & Processes' : language === 'pt' ? 'Operações e Processos' : 'Operaciones y Procesos',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: '1 a 3 meses',
      priorityStatus: metrics.automatizacion < 65 || metrics.gestion < 65 ? 'urgent' : 'recommended',
      icon: 'Database'
    },
    {
      id: 'st-crm',
      title: language === 'en' ? 'Deploy Customer Pipeline & Sales CRM' : language === 'pt' ? 'Adotar CRM Comercial de Vendas' : 'Implementar Embudo Comercial (CRM) y Gestión de Clientes',
      description: language === 'en'
        ? 'Record all sales opportunities, follow-up deadlines, and quotations to ensure zero prospective buyers fall through the cracks.'
        : language === 'pt'
          ? 'Registrar oportunidades, propostas e datas de contato para que nenhum cliente em potencial fique sem retorno ágil.'
          : 'Registrar oportunidades, cotizaciones y fechas de seguimiento para que ningún prospecto se quede sin atención oportuna.',
      quadrant: 'strategic',
      axis: language === 'en' ? 'Customers & Commercial Channels' : language === 'pt' ? 'Clientes e Canais Comerciais' : 'Clientes y Canales Comerciales',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: '2 a 3 meses',
      priorityStatus: metrics.digitalizacion < 70 ? 'urgent' : 'recommended',
      icon: 'Users'
    },
    {
      id: 'st-workflow-automation',
      title: language === 'en' ? 'Cross-System API & Workflow Automation' : language === 'pt' ? 'Automação de Fluxos entre Sistemas (APIs/Zapier)' : 'Automatización de Procesos entre Áreas (APIs / Webhooks)',
      description: language === 'en'
        ? 'Connect sales channels with billing and dispatch automatically using Make/Zapier, eliminating manual data retyping.'
        : language === 'pt'
          ? 'Conectar pedidos de vendas com faturamento e expedição automaticamente, eliminando digitação duplicada entre sistemas.'
          : 'Conectar pedidos recibidos con facturación y despacho automáticamente, eliminando la duplicación manual de datos.',
      quadrant: 'strategic',
      axis: language === 'en' ? 'Technology & Cybersecurity' : language === 'pt' ? 'Tecnologia e Cibersegurança' : 'Tecnología y Ciberseguridad',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: '1 a 2 meses',
      priorityStatus: metrics.automatizacion < 60 ? 'urgent' : 'recommended',
      icon: 'Rocket'
    },
    {
      id: 'st-data-governance',
      title: language === 'en' ? 'Cybersecurity Governance & Backup Policy' : language === 'pt' ? 'Governança de Dados e Política de Segurança' : 'Plan de Gobernanza de Datos y Ciberseguridad Integral',
      description: language === 'en'
        ? 'Formalize access privilege policies, automated daily off-site cloud backups, and disaster recovery procedures.'
        : language === 'pt'
          ? 'Definir regras de privilégios de acesso, rotina diária de backups automáticos em nuvem e plano de recuperação operacional.'
          : 'Definir niveles de acceso por puesto, respaldos automáticos externos diarios y plan de contingencia ante incidentes.',
      quadrant: 'strategic',
      axis: language === 'en' ? 'Technology & Cybersecurity' : language === 'pt' ? 'Tecnologia e Cibersegurança' : 'Tecnología y Ciberseguridad',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: '2 a 4 meses',
      priorityStatus: metrics.seguridad < 70 ? 'urgent' : 'recommended',
      icon: 'Shield'
    },

    // 3. Operational Improvements (Impacto Medio, Esfuerzo Bajo)
    {
      id: 'op-checklists',
      title: language === 'en' ? 'Mobile Digital Forms & Operational Checklists' : language === 'pt' ? 'Formulários Digitais e Checklists Móveis' : 'Formularios Digitales y Checklists Móviles para Operaciones',
      description: language === 'en'
        ? 'Replace printed paper logs, vehicle inspections, and receiving sheets with smartphone Google Forms or AppSheet.'
        : language === 'pt'
          ? 'Substituir pranchetas de papel, vistorias e fichas de recebimento por formulários digitais no celular.'
          : 'Sustituir hojas impresas de recepción, órdenes de trabajo o inspecciones por formularios móviles en Google Forms.',
      quadrant: 'operational',
      axis: language === 'en' ? 'Operations & Processes' : language === 'pt' ? 'Operações e Processos' : 'Operaciones y Procesos',
      impact: 'Medio',
      effort: 'Bajo',
      timeframe: '1 a 2 semanas',
      priorityStatus: metrics.trazabilidad < 70 ? 'urgent' : 'recommended',
      icon: 'CheckCircle2'
    },
    {
      id: 'op-passwords',
      title: language === 'en' ? 'Team Password Manager Deployment' : language === 'pt' ? 'Gerenciador Seguro de Senhas Compartilhadas' : 'Gestor de Contraseñas del Equipo de Trabajo',
      description: language === 'en'
        ? 'Eliminate shared credentials scribbled on sticky notes. Deploy Bitwarden or 1Password with encrypted sharing.'
        : language === 'pt'
          ? 'Eliminar senhas escritas em anotações ou repassadas por chat. Usar cofre criptografado como Bitwarden.'
          : 'Eliminar contraseñas anotadas en libretas o post-its. Implementar un gestor seguro como Bitwarden o Google Workspace.',
      quadrant: 'operational',
      axis: language === 'en' ? 'Technology & Cybersecurity' : language === 'pt' ? 'Tecnologia e Cibersegurança' : 'Tecnología y Ciberseguridad',
      impact: 'Medio',
      effort: 'Bajo',
      timeframe: '1 semana',
      priorityStatus: metrics.seguridad < 75 ? 'urgent' : 'recommended',
      icon: 'Lock'
    },
    {
      id: 'op-stock-matrix',
      title: language === 'en' ? 'Real-Time Inventory & Minimum Stock Alerts' : language === 'pt' ? 'Controle de Estoque com Alertas de Mínimos' : 'Control de Stock con Alertas de Punto de Reorden',
      description: language === 'en'
        ? 'Establish digital SKU catalogs with automatic low-stock notifications to eliminate unexpected stockouts.'
        : language === 'pt'
          ? 'Estandardizar catálogo de códigos SKU com alertas automáticos de reposição para evitar rupturas de estoque.'
          : 'Estandarizar códigos de producto (SKUs) con alertas de stock mínimo para evitar pérdidas de venta por desabastecimiento.',
      quadrant: 'operational',
      axis: language === 'en' ? 'Operations & Processes' : language === 'pt' ? 'Operações e Processos' : 'Operaciones y Procesos',
      impact: 'Medio',
      effort: 'Bajo',
      timeframe: '2 a 3 semanas',
      priorityStatus: metrics.gestion < 70 ? 'urgent' : 'recommended',
      icon: 'Wrench'
    },
    {
      id: 'op-circularity',
      title: language === 'en' ? 'Paperless Protocol & Sustainable Waste Tracking' : language === 'pt' ? 'Protocolo Paperless e Sustentabilidade Operacional' : 'Protocolo Cero Papel y Monitoreo de Desperdicios',
      description: language === 'en'
        ? 'Transition internal approvals to digital signatures and establish metrics for material and energy reduction.'
        : language === 'pt'
          ? 'Eliminar impressões internas com assinaturas digitais e mensurar redução de desperdícios de materiais.'
          : 'Reemplazar firmas físicas por aprobaciones digitales y medir reducción de insumos y mermas en la operación.',
      quadrant: 'operational',
      axis: language === 'en' ? 'Strategy, Leadership & Sustainability' : language === 'pt' ? 'Estratégia, Liderança e Sustentabilidade' : 'Estrategia, Liderazgo y Sostenibilidad',
      impact: 'Medio',
      effort: 'Bajo',
      timeframe: '2 a 4 semanas',
      priorityStatus: metrics.circularidad < 65 ? 'urgent' : 'recommended',
      icon: 'Sparkles'
    },

    // 4. Future Initiatives & Scaling (Impacto Alto, Esfuerzo Alto)
    {
      id: 'fu-ai',
      title: language === 'en' ? 'Custom AI Copilot for Customer Service' : language === 'pt' ? 'Copiloto de IA para Atendimento e Vendas' : 'Asistente de Inteligencia Artificial para Atención y Ventas',
      description: language === 'en'
        ? 'Train an AI conversational agent on your product specifications and price sheets to handle frequent inquiries 24/7.'
        : language === 'pt'
          ? 'Treinar um assistente de IA com a tabela de produtos para atender dúvidas frequentes e qualificar leads 24h.'
          : 'Entrenar un agente de IA con su catálogo de productos y preguntas frecuentes para atender consultas las 24 horas.',
      quadrant: 'future',
      axis: language === 'en' ? 'Technology & Cybersecurity' : language === 'pt' ? 'Tecnologia e Cibersegurança' : 'Tecnología y Ciberseguridad',
      impact: 'Alto',
      effort: 'Alto',
      timeframe: '4 a 8 meses',
      priorityStatus: metrics.innovacion > 60 ? 'recommended' : 'consolidation',
      icon: 'Cpu'
    },
    {
      id: 'fu-bi',
      title: language === 'en' ? 'Automated Executive BI Dashboard' : language === 'pt' ? 'Painel Executivo Automatizado de BI (Power BI / Looker)' : 'Tablero de Control Automatizado (BI) en Tiempo Real',
      description: language === 'en'
        ? 'Consolidate sales, cash collections, and margins into live visual analytics in Looker Studio or Power BI without manual reporting.'
        : language === 'pt'
          ? 'Conectar fontes de vendas, faturamento e margem em dashboards visuais no Power BI sem necessidade de relatórios manuais.'
          : 'Conectar ventas, cobranzas y margen en un tablero visual en Looker Studio o Power BI sin armar reportes manuales.',
      quadrant: 'future',
      axis: language === 'en' ? 'Strategy, Leadership & Sustainability' : language === 'pt' ? 'Estratégia, Liderança e Sustentabilidade' : 'Estrategia, Liderazgo y Sostenibilidad',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: '3 a 6 meses',
      priorityStatus: metrics.gestion > 60 ? 'recommended' : 'consolidation',
      icon: 'BarChart3'
    },
    {
      id: 'fu-ecommerce',
      title: language === 'en' ? 'Omnichannel B2B/B2C E-Commerce Portal' : language === 'pt' ? 'Portal de Vendas Online Integrado B2B/B2C' : 'Plataforma de Comercio Electrónico y Autoservicio',
      description: language === 'en'
        ? 'Deploy self-service client ordering with live inventory checking, automated quotes, and direct payment processing.'
        : language === 'pt'
          ? 'Implantar catálogo de pedidos online com consulta de estoque em tempo real e cálculo automático de frete.'
          : 'Habilitar portal digital de pedidos con consulta de disponibilidad en tiempo real y cotizaciones automáticas.',
      quadrant: 'future',
      axis: language === 'en' ? 'Customers & Commercial Channels' : language === 'pt' ? 'Clientes e Canais Comerciais' : 'Clientes y Canales Comerciales',
      impact: 'Alto',
      effort: 'Alto',
      timeframe: '6 a 10 meses',
      priorityStatus: metrics.digitalizacion > 55 ? 'recommended' : 'consolidation',
      icon: 'ShoppingBag'
    },
    {
      id: 'fu-talent-academy',
      title: language === 'en' ? 'Continuous Digital Skills & AI Training Academy' : language === 'pt' ? 'Programa de Capacitação Digital Contínua da Equipe' : 'Programa Continuo de Capacitación Digital y Herramientas IA',
      description: language === 'en'
        ? 'Formalize monthly hands-on workshops in office productivity, prompt engineering, and agile project delivery for all team members.'
        : language === 'pt'
          ? 'Criar trilhas de capacitação prática em ferramentas digitais, uso produtivo de IA e colaboração ágil para a equipe.'
          : 'Establecer talleres mensuales de capacitación en herramientas digitales de productividad, uso de IA y metodologías ágiles.',
      quadrant: 'future',
      axis: language === 'en' ? 'People, Talent & Digital Skills' : language === 'pt' ? 'Pessoas, Talentos e Habilidades Digitais' : 'Personas, Talento y Habilidades Digitales',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: 'Continuo',
      priorityStatus: metrics.cultura < 70 ? 'urgent' : 'recommended',
      icon: 'Users'
    }
  ];

  const filteredInitiatives = activeFilter === 'all' 
    ? allInitiatives 
    : allInitiatives.filter(i => i.quadrant === activeFilter);

  const getStatusBadge = (status: 'urgent' | 'recommended' | 'consolidation') => {
    switch (status) {
      case 'urgent':
        return {
          label: language === 'en' ? 'Urgent Priority' : language === 'pt' ? 'Prioridade Urgente' : 'Prioridad Urgente',
          classes: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/40'
        };
      case 'recommended':
        return {
          label: language === 'en' ? 'Recommended' : language === 'pt' ? 'Recomendado' : 'Recomendado',
          classes: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/40'
        };
      default:
        return {
          label: language === 'en' ? 'Consolidation' : language === 'pt' ? 'Consolidação' : 'Consolidación',
          classes: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
        };
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-sm space-y-6 ${isPrint ? 'print:border-slate-300 print:shadow-none print:p-4' : ''}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/60 rounded-2xl shrink-0">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-blue-600 dark:text-cyan-400 uppercase tracking-widest block">
              {language === 'en' ? 'Complete Decision Roadmap' : language === 'pt' ? 'Matriz Completa de Priorização' : 'Plan y Matriz Completa de Priorización'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              {language === 'en' ? 'Prioritization Matrix: Effort vs. Business Impact' : language === 'pt' ? 'Matriz de Priorização: Esforço vs. Impacto no Negócio' : 'Matriz de Priorización "Esfuerzo vs. Impacto"'}
            </h3>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/40">
          {filteredInitiatives.length} / {allInitiatives.length} {language === 'en' ? 'initiatives' : language === 'pt' ? 'iniciativas totais' : 'iniciativas del plan'}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {language === 'en'
          ? `Here is the full portfolio of 16 strategic and operational initiatives for ${companyInfo.name}, organized across four implementation horizons to maximize execution clarity:`
          : language === 'pt'
            ? `Apresentamos o plano integral com as 16 iniciativas de modernização para a ${companyInfo.name}, distribuídas em quatro quadrantes de execução para garantir retorno rápido sem sobrecarregar a operação:`
            : `A continuación se detalla el plan integral con las 16 iniciativas de modernización para ${companyInfo.name}, estructuradas en cuatro horizontes estratégicos para priorizar proyectos de retorno inmediato sin desatender la transformación profunda:`}
      </p>

      {/* Filter Tabs (Hidden in Print) */}
      {!isPrint && (
        <div className="flex flex-wrap gap-2 pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {language === 'en' ? 'All Initiatives (16)' : language === 'pt' ? 'Mostrar Todas (16)' : 'Mostrar Todo (16 Iniciativas)'}
          </button>
          <button
            onClick={() => setActiveFilter('quick_wins')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'quick_wins'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Quick Wins (4)' : language === 'pt' ? 'Vitórias Rápidas (4)' : 'Victorias Rápidas (4)'}</span>
          </button>
          <button
            onClick={() => setActiveFilter('strategic')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'strategic'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Strategic (4)' : language === 'pt' ? 'Projetos Estratégicos (4)' : 'Proyectos Estratégicos (4)'}</span>
          </button>
          <button
            onClick={() => setActiveFilter('operational')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'operational'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 hover:bg-amber-100'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Operational (4)' : language === 'pt' ? 'Melhorias Operacionais (4)' : 'Mejoras Operativas (4)'}</span>
          </button>
          <button
            onClick={() => setActiveFilter('future')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'future'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 hover:bg-purple-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Future & AI (4)' : language === 'pt' ? 'Futuras e IA (4)' : 'Iniciativas Futuras e IA (4)'}</span>
          </button>
        </div>
      )}

      {/* Grid of Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInitiatives.map((item) => {
          let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40';
          let borderAccent = 'border-l-4 border-l-emerald-500';
          let quadrantLabel = language === 'en' ? 'Quick Win (Immediate)' : language === 'pt' ? 'Vitória Rápida' : 'Victoria Rápida (Inmediato)';

          if (item.quadrant === 'strategic') {
            badgeColor = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/40';
            borderAccent = 'border-l-4 border-l-blue-500';
            quadrantLabel = language === 'en' ? 'Strategic Project' : language === 'pt' ? 'Projeto Estratégico' : 'Proyecto Estratégico';
          } else if (item.quadrant === 'operational') {
            badgeColor = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/40';
            borderAccent = 'border-l-4 border-l-amber-500';
            quadrantLabel = language === 'en' ? 'Operational Tuning' : language === 'pt' ? 'Melhoria Operacional' : 'Mejora Operativa';
          } else if (item.quadrant === 'future') {
            badgeColor = 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/40';
            borderAccent = 'border-l-4 border-l-purple-500';
            quadrantLabel = language === 'en' ? 'Future Initiative' : language === 'pt' ? 'Iniciativa Futura / IA' : 'Iniciativa Futura / IA';
          }

          const statusBadge = getStatusBadge(item.priorityStatus);

          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-[#070d1a] border border-slate-200/80 dark:border-slate-800 ${borderAccent} flex flex-col justify-between space-y-3 transition-all hover:shadow-md`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                      {quadrantLabel}
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${statusBadge.classes}`}>
                      {statusBadge.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.timeframe}
                  </span>
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  {item.axis}
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] pt-2.5 border-t border-slate-200/70 dark:border-slate-800/80">
                <span className="text-slate-500 dark:text-slate-400">
                  {language === 'en' ? 'Impact:' : language === 'pt' ? 'Impacto:' : 'Impacto:'} <strong className="text-slate-900 dark:text-slate-200">{item.impact}</strong>
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {language === 'en' ? 'Effort:' : language === 'pt' ? 'Esforço:' : 'Esfuerzo:'} <strong className="text-slate-900 dark:text-slate-200">{item.effort}</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
