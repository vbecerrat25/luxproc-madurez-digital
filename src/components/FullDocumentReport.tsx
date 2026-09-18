import React from 'react';
import { 
  Compass, Workflow, BadgeDollarSign, ShieldCheck, Users2, 
  Rocket, Star, Wrench, Clock, CheckCircle2, Award, Calendar, 
  Building2, Mail, Hash, BarChart3, TrendingUp,
  Lock, MessageSquare, Cloud, ShoppingBag, Database, Cpu, Sparkles, AlertCircle
} from 'lucide-react';
import { DiagnosticRecord, ScoreMetrics, CompanyInfo } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { calculateMacroAxes } from '../utils/macroAxes';
import RadarChart from './RadarChart';
import MaturityDistributionChart from './MaturityDistributionChart';
import SectorBenchmarkChart, { SECTOR_BENCHMARKS } from './SectorBenchmarkChart';

interface FullDocumentReportProps {
  record: DiagnosticRecord;
  previousRecord?: DiagnosticRecord | null;
  isPrint?: boolean;
}

export default function FullDocumentReport({ record, previousRecord, isPrint = true }: FullDocumentReportProps) {
  const { language } = useLanguage();
  const { companyInfo, metrics, id, date, time } = record;

  const hasPrevious = Boolean(previousRecord);
  const prevMetrics = previousRecord?.metrics;
  const globalDelta = prevMetrics ? metrics.general - prevMetrics.general : 0;

  const getDaysElapsed = () => {
    if (record.timestamp && previousRecord?.timestamp) {
      return Math.max(1, Math.round((record.timestamp - previousRecord.timestamp) / (1000 * 60 * 60 * 24)));
    }
    return 15;
  };
  const daysElapsed = hasPrevious ? getDaysElapsed() : 0;

  const macroAxes = calculateMacroAxes(record, language);

  // Sector translation helper
  const sectorNames: Record<string, Record<string, string>> = {
    Comercio: { es: 'Comercio / Retail', en: 'Commerce / Retail', pt: 'Comércio / Varejo' },
    Servicios: { es: 'Servicios Profesionales', en: 'Professional Services', pt: 'Serviços Profissionais' },
    Manufactura: { es: 'Manufactura e Industria', en: 'Manufacturing & Industry', pt: 'Manufatura e Indústria' },
    Tecnologia: { es: 'Tecnología y Software', en: 'Technology & Software', pt: 'Tecnologia e Software' },
    Salud: { es: 'Salud y Farmacia', en: 'Healthcare & Medical', pt: 'Saúde e Farmácia' },
    Educacion: { es: 'Educación y Formación', en: 'Education & Training', pt: 'Educação e Treinamento' },
    Construccion: { es: 'Construcción e Inmobiliaria', en: 'Construction & Real Estate', pt: 'Construção e Imobiliária' },
    Gastronomia: { es: 'Gastronomía y Hotelería', en: 'Gastronomy & Hospitality', pt: 'Gastronomia e Hotelaria' },
    Logistica: { es: 'Transporte y Logística', en: 'Logistics & Transport', pt: 'Transporte e Logística' },
    Agropecuario: { es: 'Agropecuario y Alimentos', en: 'Agriculture & Food', pt: 'Agropecuária e Alimentos' }
  };

  const localizedSector = sectorNames[companyInfo.sector]?.[language] || companyInfo.sector;
  const localizedSize = companyInfo.size;

  // Level classification
  const getLevelInfo = (score: number) => {
    if (score >= 80) {
      return {
        title: language === 'en' ? 'Digital Leader' : language === 'pt' ? 'Líder Digital' : 'Líder Digital',
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        description: language === 'en' 
          ? 'Highly sophisticated digital architecture, automated end-to-end workflows, and an innovation-driven culture.'
          : language === 'pt'
            ? 'Arquitetura digital avançada, fluxos de ponta a ponta automatizados e cultura orientada a dados.'
            : 'Arquitectura digital altamente sofisticada, procesos automatizados de punta a punta y cultura orientada a la innovación continua.'
      };
    }
    if (score >= 60) {
      return {
        title: language === 'en' ? 'Developed' : language === 'pt' ? 'Desenvolvido' : 'Desarrollado',
        badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
        description: language === 'en'
          ? 'Solid foundational technology. Optimization and cross-departmental integration are the main focal points.'
          : language === 'pt'
            ? 'Bases tecnológicas sólidas. A otimização e a integração entre setores são as prioridades centrais.'
            : 'Herramientas tecnológicas consolidadas en áreas clave. El foco principal debe ser la integración entre departamentos.'
      };
    }
    if (score >= 40) {
      return {
        title: language === 'en' ? 'Basic' : language === 'pt' ? 'Básico' : 'Básico',
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        description: language === 'en'
          ? 'Partial digitization of operations. Disconnected tools and manual spreadsheets cause operational friction.'
          : language === 'pt'
            ? 'Digitalização pontual de processos. Ferramentas isoladas e controles manuais geram retrabalho.'
            : 'Digitalización incipiente en áreas aisladas. El uso persistente de hojas de cálculo y papel genera cuellos de botella.'
      };
    }
    return {
      title: language === 'en' ? 'Initial' : language === 'pt' ? 'Inicial' : 'Inicial',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      description: language === 'en'
        ? 'High vulnerability to technological obsolescence. Immediate adoption of core digital basics is critical.'
        : language === 'pt'
          ? 'Alta vulnerabilidade operacional. É urgente a implementação de infraestrutura digital elementar.'
          : 'Elevada dependencia de procesos manuales y documentación física. Se recomienda priorizar victorias rápidas de automatización.'
    };
  };

  const levelInfo = getLevelInfo(metrics.general);
  const prevLevelInfo = previousRecord ? getLevelInfo(previousRecord.metrics.general) : null;

  // 8 Dimensions table data
  const dimensionsScores = [
    { key: 'gestion', name: language === 'en' ? 'Management & Organization' : language === 'pt' ? 'Gestão e Organização' : 'Gestión y Organización', score: metrics.gestion },
    { key: 'digitalizacion', name: language === 'en' ? 'Process Digitization' : language === 'pt' ? 'Digitalização de Processos' : 'Digitalización de Procesos', score: metrics.digitalizacion },
    { key: 'trazabilidad', name: language === 'en' ? 'Supply Chain & Traceability' : language === 'pt' ? 'Rastreabilidade e Logística' : 'Trazabilidad y Logística', score: metrics.trazabilidad },
    { key: 'automatizacion', name: language === 'en' ? 'Workflow Automation' : language === 'pt' ? 'Automação de Operações' : 'Automatización de Operaciones', score: metrics.automatizacion },
    { key: 'seguridad', name: language === 'en' ? 'Security & Data Governance' : language === 'pt' ? 'Segurança e Dados' : 'Seguridad y Datos', score: metrics.seguridad },
    { key: 'innovacion', name: language === 'en' ? 'Innovation Strategy' : language === 'pt' ? 'Estratégia de Inovação' : 'Estrategia de Innovación', score: metrics.innovacion },
    { key: 'cultura', name: language === 'en' ? 'Digital Culture & Training' : language === 'pt' ? 'Cultura Digital e Pessoas' : 'Cultura Digital y Personas', score: metrics.cultura },
    { key: 'circularidad', name: language === 'en' ? 'Sustainability & Paperless' : language === 'pt' ? 'Sustentabilidade e Circularidade' : 'Sostenibilidad y Circularidad', score: metrics.circularidad }
  ];

  const getQualitativeTag = (score: number) => {
    if (score >= 80) return language === 'en' ? 'Consolidated / High Maturity' : language === 'pt' ? 'Consolidado / Alto' : 'Consolidado / Madurez Alta';
    if (score >= 60) return language === 'en' ? 'Developed / Stable' : language === 'pt' ? 'Desenvolvido / Estável' : 'Desarrollado / Nivel Favorable';
    if (score >= 40) return language === 'en' ? 'Basic / Needs Structure' : language === 'pt' ? 'Básico / Requer Estrutura' : 'Básico / En Desarrollo';
    return language === 'en' ? 'Critical / Immediate Priority' : language === 'pt' ? 'Crítico / Prioridade Imediata' : 'Crítico / Atención Prioritaria';
  };

  // Benchmark stats
  const sectorBenchmarkValues = SECTOR_BENCHMARKS[companyInfo.sector] || {
    gestion: 60, digitalizacion: 55, trazabilidad: 50, automatizacion: 45,
    seguridad: 55, innovacion: 40, cultura: 50, circularidad: 45
  };
  const benchmarkArray = Object.values(sectorBenchmarkValues);
  const sectorAverage = Math.round(benchmarkArray.reduce((acc, curr) => acc + curr, 0) / benchmarkArray.length);
  const companyAverage = metrics.general;
  const overallDiff = companyAverage - sectorAverage;

  // Complete catalog of 16 initiatives across all 4 quadrants
  const all16Initiatives = [
    // 1. Quick Wins (Impacto Alto, Esfuerzo Bajo)
    {
      id: 'qw-2fa',
      title: 'Verificación en 2 Pasos (2FA) en Correos y WhatsApp',
      axis: 'Tecnología, Datos y Ciberseguridad',
      quadrant: 'Victoria Rápida',
      impact: 'Alto',
      effort: 'Bajo',
      timeframe: '1 a 2 días',
      desc: 'Blindar correos corporativos y WhatsApp Business contra accesos no autorizados sin costo de licencias.'
    },
    {
      id: 'qw-whatsapp',
      title: 'Estandarizar WhatsApp Business y Catálogo Digital',
      axis: 'Clientes y Canales Comerciales',
      quadrant: 'Victoria Rápida',
      impact: 'Alto',
      effort: 'Bajo',
      timeframe: '3 a 5 días',
      desc: 'Catálogo de productos con precios, respuestas rápidas y etiquetas por estado de cotización.'
    },
    {
      id: 'qw-cloud-docs',
      title: 'Centralizar Documentos Compartidos en la Nube',
      axis: 'Operaciones, Procesos y Logística',
      quadrant: 'Victoria Rápida',
      impact: 'Alto',
      effort: 'Bajo',
      timeframe: '1 semana',
      desc: 'Sustituir archivos dispersos en PCs individuales por carpetas en Google Drive o OneDrive con permisos por rol.'
    },
    {
      id: 'qw-qr-payments',
      title: 'Enlaces de Pago Digital y Códigos QR (Yape / Plin)',
      axis: 'Clientes y Canales Comerciales',
      quadrant: 'Victoria Rápida',
      impact: 'Alto',
      effort: 'Bajo',
      timeframe: '3 a 7 días',
      desc: 'Facilitar pagos inmediatos eliminando la fricción de transferencias manuales y validación de depósitos.'
    },

    // 2. Proyectos Estratégicos (Impacto Alto, Esfuerzo Medio/Alto)
    {
      id: 'st-erp',
      title: 'Sistema de Gestión (ERP) y Facturación SUNAT',
      axis: 'Operaciones, Procesos y Logística',
      quadrant: 'Proyecto Estratégico',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: '1 a 3 meses',
      desc: 'Integrar ventas, compras, cobranzas, stock en tiempo real y facturación electrónica en una sola plataforma.'
    },
    {
      id: 'st-crm',
      title: 'Embudo Comercial (CRM) y Gestión de Clientes',
      axis: 'Clientes y Canales Comerciales',
      quadrant: 'Proyecto Estratégico',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: '2 a 3 meses',
      desc: 'Registrar oportunidades, cotizaciones y fechas de seguimiento para evitar prospectos desatendidos.'
    },
    {
      id: 'st-workflow',
      title: 'Automatización de Flujos entre Áreas (APIs)',
      axis: 'Tecnología, Datos y Ciberseguridad',
      quadrant: 'Proyecto Estratégico',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: '1 a 2 meses',
      desc: 'Conectar pedidos con facturación y despacho automáticamente vía Make/Zapier, eliminando doble digitación.'
    },
    {
      id: 'st-data-governance',
      title: 'Plan de Gobernanza de Datos y Copias de Seguridad',
      axis: 'Tecnología, Datos y Ciberseguridad',
      quadrant: 'Proyecto Estratégico',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: '2 a 4 meses',
      desc: 'Políticas de seguridad, respaldos automáticos diarios externos en la nube y plan de contingencia operativa.'
    },

    // 3. Mejoras Operativas (Impacto Medio, Esfuerzo Bajo)
    {
      id: 'op-checklists',
      title: 'Formularios Móviles para Operaciones (AppSheet)',
      axis: 'Operaciones, Procesos y Logística',
      quadrant: 'Mejora Operativa',
      impact: 'Medio',
      effort: 'Bajo',
      timeframe: '1 a 2 semanas',
      desc: 'Sustituir hojas impresas de recepción u órdenes de trabajo por formularios digitales en el móvil.'
    },
    {
      id: 'op-passwords',
      title: 'Gestor de Contraseñas del Equipo (Bitwarden)',
      axis: 'Tecnología, Datos y Ciberseguridad',
      quadrant: 'Mejora Operativa',
      impact: 'Medio',
      effort: 'Bajo',
      timeframe: '1 semana',
      desc: 'Eliminar contraseñas en post-its o WhatsApp. Gestor corporativo cifrado con accesos departamentales.'
    },
    {
      id: 'op-stock',
      title: 'Control de Stock con Alertas de Reorden Mínimo',
      axis: 'Operaciones, Procesos y Logística',
      quadrant: 'Mejora Operativa',
      impact: 'Medio',
      effort: 'Bajo',
      timeframe: '2 a 3 semanas',
      desc: 'Estandarizar códigos de producto (SKU) con avisos automáticos para evitar quiebres de mercadería.'
    },
    {
      id: 'op-circularity',
      title: 'Protocolo Cero Papel y Reducción de Mermas',
      axis: 'Estrategia, Liderazgo y Sostenibilidad',
      quadrant: 'Mejora Operativa',
      impact: 'Medio',
      effort: 'Bajo',
      timeframe: '2 a 4 semanas',
      desc: 'Reemplazar firmas en papel por aprobaciones digitales y establecer indicadores de reducción de consumibles.'
    },

    // 4. Iniciativas Futuras y de Escala (Impacto Alto, Esfuerzo Alto)
    {
      id: 'fu-ai',
      title: 'Asistente de IA para Atención y Cotizaciones 24/7',
      axis: 'Tecnología, Datos y Ciberseguridad',
      quadrant: 'Iniciativa Futura / IA',
      impact: 'Alto',
      effort: 'Alto',
      timeframe: '4 a 8 meses',
      desc: 'Agente conversacional entrenado con su catálogo y lista de precios para responder consultas al instante.'
    },
    {
      id: 'fu-bi',
      title: 'Tablero de Control Automatizado (BI) en Tiempo Real',
      axis: 'Estrategia, Liderazgo y Sostenibilidad',
      quadrant: 'Iniciativa Futura / IA',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: '3 a 6 meses',
      desc: 'Conectar ventas, cobranzas y margen en Looker Studio o Power BI sin informes manuales en hojas de cálculo.'
    },
    {
      id: 'fu-ecommerce',
      title: 'Portal de Pedidos Online y Autoservicio para Clientes',
      axis: 'Clientes y Canales Comerciales',
      quadrant: 'Iniciativa Futura / IA',
      impact: 'Alto',
      effort: 'Alto',
      timeframe: '6 a 10 meses',
      desc: 'Portal B2B/B2C con disponibilidad de stock en tiempo real y generación autónoma de órdenes de compra.'
    },
    {
      id: 'fu-talent',
      title: 'Programa Continuo de Capacitación Digital y Productividad',
      axis: 'Personas, Talento y Habilidades Digitales',
      quadrant: 'Iniciativa Futura / IA',
      impact: 'Alto',
      effort: 'Medio',
      timeframe: 'Continuo',
      desc: 'Talleres prácticos mensuales en herramientas digitales, automatizaciones básicas y uso productivo de IA.'
    }
  ];

  return (
    <div className="full-document-report w-full bg-white text-slate-900 print:text-black font-sans">
      
      {/* ========================================================================= */}
      {/* PÁGINA 1: PORTADA EJECUTIVA OFICIAL */}
      {/* ========================================================================= */}
      <div 
        className="pdf-page-container flex flex-col justify-between border-4 border-double border-slate-900 p-8 sm:p-12 bg-white"
        style={{ minHeight: '1060px', maxHeight: '1060px', height: '1060px', boxSizing: 'border-box', overflow: 'hidden', pageBreakInside: 'avoid', breakInside: 'avoid', pageBreakAfter: 'always', breakAfter: 'page' }}
      >
        {/* Header Branding */}
        <div className="flex justify-between items-center border-b-2 border-slate-900 pb-6">
          <div>
            <span className="text-sm font-black tracking-wider text-slate-900 uppercase">LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.</span>
          </div>
          <img 
            src="https://i.imgur.com/WWChkA9.png" 
            alt="LUXPROC Logo" 
            className="h-16 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Title and General Score */}
        <div className="space-y-7 my-auto text-center py-6">
          <div className="inline-block px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-extrabold text-blue-700 tracking-widest uppercase">
            {hasPrevious 
              ? `Auditoría y Seguimiento Evolutivo — Re-evaluación (${daysElapsed}+ Días)`
              : 'Auditoría y Plan Estratégico de Transformación Digital'}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase leading-tight">
            Informe Oficial de Madurez Digital
          </h1>
          
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {hasPrevious
              ? `Informe comparativo de evolución tecnológica y salto de capacidades frente a la línea base del ${previousRecord?.date}.`
              : 'Evaluación integral de capacidades tecnológicas, procesos operativos, canales comerciales y hoja de ruta de modernización.'}
          </p>

          <div className="pt-2 flex flex-col items-center justify-center">
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-300 shadow-sm flex flex-col items-center min-w-[280px]">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">Índice General de Madurez</span>
              <div className="text-6xl font-black font-mono text-slate-900 my-2">
                {metrics.general}%
              </div>
              <span className={`text-xs font-black px-4 py-1 rounded-full border ${levelInfo.badgeClass}`}>
                {levelInfo.title.toUpperCase()}
              </span>
              {hasPrevious && previousRecord && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-2">
                  <span className="text-slate-500 text-[11px]">Línea Base: <strong>{previousRecord.metrics.general}%</strong></span>
                  <span className="text-slate-400">➔</span>
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded ${
                    globalDelta >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {globalDelta >= 0 ? `+${globalDelta}% Evolución` : `${globalDelta}%`}
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-3 max-w-md text-center italic">
              {levelInfo.description}
            </p>
          </div>
        </div>

        {/* Metadata Footer Box */}
        <div className="border-t-2 border-slate-900 pt-6 text-xs text-slate-700">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Empresa Evaluada</span>
              <strong className="text-slate-900 text-sm">{companyInfo.name}</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Sector Económico</span>
              <strong className="text-slate-900 text-sm">{localizedSector}</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Tamaño Corporativo</span>
              <strong className="text-slate-900 text-sm">{localizedSize}</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Código de Auditoría</span>
              <span className="font-mono font-bold text-slate-900">{id}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Fecha y Hora de Emisión</span>
              <span className="text-slate-900 font-medium">{date} {time}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Contacto de Enlace</span>
              <span className="text-slate-900 font-medium">{companyInfo.contactEmail}</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-400 text-center">
            Documento técnico certificado emitido por LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. con validez para planificación de inversiones y modernización de procesos.
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 2: RESUMEN EJECUTIVO Y MATRIZ DE DIMENSIONES EVALUADAS */}
      {/* ========================================================================= */}
      <div 
        className="pdf-page-container flex flex-col justify-between p-8 sm:p-12 bg-white"
        style={{ minHeight: '1060px', maxHeight: '1060px', height: '1060px', boxSizing: 'border-box', overflow: 'hidden', pageBreakInside: 'avoid', breakInside: 'avoid', pageBreakAfter: 'always', breakAfter: 'page' }}
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. — INFORME DE MADUREZ DIGITAL</span>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{companyInfo.name}</span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-2">
              1. Resumen Ejecutivo y Diagnóstico Situacional
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed mt-3">
              El presente informe técnico consolida los resultados recabados a través del diagnóstico oficial de Madurez Digital de <strong>LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.</strong> para la empresa <strong>{companyInfo.name}</strong>. El propósito fundamental de esta auditoría es evaluar el grado de digitalización de los procesos clave, la consistencia de los sistemas integrados de información, la protección de activos críticos y la capacidad del equipo para adoptar herramientas digitales modernas.
            </p>
            <p className="text-xs text-slate-700 leading-relaxed mt-2">
              Con un resultado global de <strong>{metrics.general}%</strong>, la organización se posiciona en un nivel de madurez digital clasificado como <strong>{levelInfo.title}</strong>. {levelInfo.description}
            </p>
          </div>

          <div className="pt-1">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1.5 flex items-center justify-between">
              <span>2. Matriz de las 8 Dimensiones Operativas Evaluadas</span>
              <span className="text-[11px] font-normal text-slate-500 lowercase">escala de 0% a 100%</span>
            </h3>

            <table className="w-full text-left text-xs border-collapse border border-slate-300 mt-3">
              <thead>
                <tr className="bg-slate-100 text-slate-900">
                  <th className="p-2 border border-slate-300 font-bold">Dimensión de Análisis</th>
                  {hasPrevious && previousRecord ? (
                    <>
                      <th className="p-2 border border-slate-300 font-bold text-center w-24">Línea Base</th>
                      <th className="p-2 border border-slate-300 font-bold text-center w-24">Actual</th>
                      <th className="p-2 border border-slate-300 font-bold text-center w-24">Variación</th>
                      <th className="p-2 border border-slate-300 font-bold">Estado Evolutivo</th>
                    </>
                  ) : (
                    <>
                      <th className="p-2.5 border border-slate-300 font-bold text-center w-24">Puntaje</th>
                      <th className="p-2.5 border border-slate-300 font-bold">Evaluación Cualitativa</th>
                      <th className="p-2.5 border border-slate-300 font-bold text-center w-28">Brecha a Meta</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {dimensionsScores.map((dim, i) => {
                  const prevScore = previousRecord ? (previousRecord.metrics[dim.key as keyof typeof previousRecord.metrics] || 0) : null;
                  const delta = prevScore !== null ? dim.score - prevScore : null;
                  const gap = 100 - dim.score;

                  return (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="p-2 border border-slate-300 font-bold text-slate-900">
                        {dim.name}
                      </td>
                      {hasPrevious && previousRecord ? (
                        <>
                          <td className="p-2 border border-slate-300 font-mono font-bold text-center text-slate-500">
                            {prevScore}%
                          </td>
                          <td className="p-2 border border-slate-300 font-mono font-bold text-center text-blue-900">
                            {dim.score}%
                          </td>
                          <td className="p-2 border border-slate-300 font-mono text-center font-bold">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                              (delta || 0) > 0 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : (delta || 0) === 0 
                                ? 'bg-slate-100 text-slate-600' 
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {(delta || 0) > 0 ? `+${delta}%` : `${delta}%`}
                            </span>
                          </td>
                          <td className="p-2 border border-slate-300 text-slate-700 font-medium text-[11px]">
                            {(delta || 0) >= 15 
                              ? '🚀 Salto de Madurez' 
                              : (delta || 0) > 0 
                              ? '✅ Mejora Progresiva' 
                              : (delta || 0) === 0 
                              ? '⚖️ Consolidado' 
                              : '⚠️ Requiere Refuerzo'}
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-2.5 border border-slate-300 font-mono font-bold text-center text-slate-900">
                            {dim.score}%
                          </td>
                          <td className="p-2.5 border border-slate-300 text-slate-700 font-medium">
                            {getQualitativeTag(dim.score)}
                          </td>
                          <td className="p-2.5 border border-slate-300 font-mono text-center font-bold text-slate-600">
                            -{gap}%
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 text-xs text-blue-950 space-y-2">
            <strong className="block text-xs uppercase tracking-wider font-extrabold text-blue-900">
              Interpretación Estratégica del Diagnóstico
            </strong>
            <p className="leading-relaxed text-[11px]">
              Las dimensiones con mayor puntaje constituyen los pilares que garantizan la estabilidad operativa inmediata de la empresa. Por el contrario, aquellas dimensiones con puntajes por debajo del 60% representan áreas donde persisten registros manuales en papel, información dispersa o procesos dependientes de personas específicas, limitando la escalabilidad comercial y aumentando los costos ocultos por reprocesos.
            </p>
          </div>
        </div>

        <div className="pt-4 text-center text-[10px] text-slate-500 border-t border-slate-200">
          Página 2 de 6 — LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 3: LOS 5 MACRO-EJES ESTRATÉGICOS */}
      {/* ========================================================================= */}
      <div 
        className="pdf-page-container flex flex-col justify-between p-8 sm:p-12 bg-white"
        style={{ minHeight: '1060px', maxHeight: '1060px', height: '1060px', boxSizing: 'border-box', overflow: 'hidden', pageBreakInside: 'avoid', breakInside: 'avoid', pageBreakAfter: 'always', breakAfter: 'page' }}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. — INFORME DE MADUREZ DIGITAL</span>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{companyInfo.name}</span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-2">
              3. Los 5 Macro-Ejes Estratégicos de Madurez Digital
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed mt-2.5">
              Para facilitar la toma de decisiones a nivel de gerencia y directorio, las 8 dimensiones operativas se integran en los <strong>5 Macro-Ejes Estratégicos</strong> de transformación empresarial. A continuación se presenta el diagnóstico específico de cada eje para <strong>{companyInfo.name}</strong>:
            </p>
          </div>

          {/* The 5 Macro-Axes List */}
          <div className="space-y-3 pt-1">
            {macroAxes.map((axis, index) => {
              let badgeStyle = 'bg-slate-100 text-slate-800 border-slate-300';
              let barColor = 'bg-slate-600';
              if (axis.score >= 76) {
                badgeStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
                barColor = 'bg-emerald-600';
              } else if (axis.score >= 51) {
                badgeStyle = 'bg-blue-50 text-blue-800 border-blue-300';
                barColor = 'bg-blue-600';
              } else if (axis.score >= 26) {
                badgeStyle = 'bg-amber-50 text-amber-800 border-amber-300';
                barColor = 'bg-amber-600';
              } else {
                badgeStyle = 'bg-rose-50 text-rose-800 border-rose-300';
                barColor = 'bg-rose-600';
              }

              return (
                <div 
                  key={axis.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">
                        {axis.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                        {axis.statusTag}
                      </span>
                      <span className="text-sm font-black font-mono text-slate-900">
                        {axis.score}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className={`h-full ${barColor}`} style={{ width: `${Math.max(5, axis.score)}%` }} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10.5px] pt-1">
                    <div>
                      <span className="text-[9.5px] font-bold text-slate-500 uppercase block">Diagnóstico del Eje:</span>
                      <p className="text-slate-700 leading-snug">{axis.diagnosis}</p>
                    </div>
                    <div>
                      <span className="text-[9.5px] font-bold text-blue-700 uppercase block">Foco Prioritario de Acción:</span>
                      <p className="text-slate-900 font-medium leading-snug">{axis.priorityFocus}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 text-center text-[10px] text-slate-500 border-t border-slate-200">
          Página 3 de 6 — LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 4: DIAGNÓSTICO GRÁFICO DE MADUREZ (RADAR & DISTRIBUCIÓN) */}
      {/* ========================================================================= */}
      <div 
        className="pdf-page-container flex flex-col justify-between p-8 sm:p-12 bg-white"
        style={{ minHeight: '1060px', maxHeight: '1060px', height: '1060px', boxSizing: 'border-box', overflow: 'hidden', pageBreakInside: 'avoid', breakInside: 'avoid', pageBreakAfter: 'always', breakAfter: 'page' }}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. — INFORME DE MADUREZ DIGITAL</span>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{companyInfo.name}</span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-2">
              4. Diagnóstico Gráfico de Madurez Tecnológica
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed mt-2">
              Los siguientes diagramas detallan la simetría tecnológica entre las capacidades evaluadas y la distribución de madurez en la organización:
            </p>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-2 gap-4 items-stretch pt-1">
            <div className="border border-slate-200 p-3 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center">
              <h4 className="text-[11px] font-bold text-slate-900 mb-2 uppercase tracking-wider text-center">
                A) Radar de Simetría Tecnológica
              </h4>
              <div className="w-full flex items-center justify-center">
                <RadarChart 
                  metrics={metrics} 
                  previousMetrics={previousRecord?.metrics}
                  previousLabel={previousRecord ? `Línea Base (${previousRecord.date})` : undefined}
                  currentLabel={`Actual (${date})`}
                  isPrint={true} 
                />
              </div>
            </div>
            <div className="border border-slate-200 p-4 rounded-2xl bg-slate-50/50 flex flex-col justify-center">
              <h4 className="text-[11px] font-bold text-slate-900 mb-3 uppercase tracking-wider text-center">
                B) Distribución por Niveles de Madurez
              </h4>
              <div className="w-full">
                <MaturityDistributionChart metrics={metrics} isPrint={true} compact={true} />
              </div>
            </div>
          </div>

          {/* Graphical Analysis & Findings */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <strong className="text-xs uppercase tracking-wider font-extrabold text-slate-900 block border-b border-slate-200 pb-1.5">
              Análisis e Interpretación del Perfil Tecnológico
            </strong>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="space-y-1">
                <strong className="text-blue-900 block font-bold">
                  {hasPrevious ? 'Expansión de Simetría Tecnológica:' : 'Equilibrio y Simetría Operativa:'}
                </strong>
                <p className="text-slate-700 leading-relaxed">
                  {hasPrevious && previousRecord
                    ? `La superposición gráfica evidencia la expansión del perímetro operativo frente a la evaluación del ${previousRecord.date}. La ampliación hacia los vértices más rezagados confirma que las iniciativas ejecutadas en estos ${daysElapsed} días redujeron la dispersión entre departamentos.`
                    : 'El radar refleja el balance entre las áreas de la empresa. Una alta dispersión indica departamentos que han avanzado digitalmente de forma aislada, creando asimetrías donde el área comercial genera prospectos que la logística interna o los controles manuales demoran en procesar.'}
                </p>
              </div>
              <div className="space-y-1">
                <strong className="text-blue-900 block font-bold">Transición del Ecosistema:</strong>
                <p className="text-slate-700 leading-relaxed">
                  La concentración de dimensiones en niveles básicos o formativos subraya la necesidad de estandarizar procesos repetitivos antes de adoptar herramientas complejas, asegurando que la inversión tecnológica produzca aumentos inmediatos en rentabilidad y orden interno.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 text-center text-[10px] text-slate-500 border-t border-slate-200">
          Página 4 de 6 — LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 5: COMPARATIVA Y BENCHMARK SECTORIAL */}
      {/* ========================================================================= */}
      <div 
        className="pdf-page-container flex flex-col justify-between p-8 sm:p-12 bg-white"
        style={{ minHeight: '1060px', maxHeight: '1060px', height: '1060px', boxSizing: 'border-box', overflow: 'hidden', pageBreakInside: 'avoid', breakInside: 'avoid', pageBreakAfter: 'always', breakAfter: 'page' }}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. — INFORME DE MADUREZ DIGITAL</span>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{companyInfo.name}</span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-2">
              5. Comparativa de Benchmark Sectorial vs. {localizedSector}
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed mt-2">
              Evaluación comparativa del desempeño de <strong>{companyInfo.name}</strong> frente al promedio sectorial de empresas en el rubro de <strong>{localizedSector}</strong>:
            </p>
          </div>

          {/* Sector Benchmark Chart */}
          <div className="border border-slate-200 p-4 rounded-2xl bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Desempeño Comparado por Dimensión
              </h4>
              <span className="text-[10px] font-mono font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                Promedio Sector: {sectorAverage}% | {companyInfo.name}: {companyAverage}% ({overallDiff >= 0 ? `+${overallDiff}%` : `${overallDiff}%`})
              </span>
            </div>
            <div className="w-full overflow-hidden">
              <SectorBenchmarkChart metrics={metrics} sector={companyInfo.sector} isPrint={true} />
            </div>
          </div>

          {/* Comparative Evolution Certification or 3-Pillar Sector Strategy */}
          {hasPrevious && previousRecord ? (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200 text-xs space-y-2.5">
              <div className="flex justify-between items-center border-b border-blue-200/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                  <strong className="text-xs uppercase tracking-wider font-extrabold text-blue-950">
                    Certificación de Evolución Temporal (Re-evaluación a {daysElapsed}+ Días)
                  </strong>
                </div>
                <span className="text-[11px] font-mono font-black text-blue-900 bg-white px-2.5 py-0.5 rounded-full border border-blue-300">
                  Línea Base: {previousRecord.date} ({previousRecord.metrics.general}%) ➔ Actual: {date} ({metrics.general}%)
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-[11px]">
                <div className="p-2.5 rounded-xl bg-white border border-blue-100 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">1. Rendimiento Global</span>
                  <p className="text-slate-700 leading-snug">
                    Incremento neto de <strong>+{globalDelta}%</strong> en madurez digital. La empresa ascendió de nivel <strong>{prevLevelInfo?.title || 'Inicial'}</strong> a <strong>{levelInfo.title}</strong>.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-100 space-y-1">
                  <span className="text-[10px] font-bold text-blue-800 uppercase block">2. Mayor Salto Cualitativo</span>
                  <p className="text-slate-700 leading-snug">
                    Las áreas de mayor aceleración registraron aumentos de hasta +{Math.max(...dimensionsScores.map(d => d.score - (previousRecord.metrics[d.key as keyof typeof previousRecord.metrics] || 0)))}%, confirmando asimilación efectiva de herramientas.
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-100 space-y-1">
                  <span className="text-[10px] font-bold text-purple-800 uppercase block">3. Dictamen de Auditoría</span>
                  <p className="text-slate-700 leading-snug">
                    Velocidad de transformación calificada como <strong>Favorable</strong>. Se recomienda mantener el ciclo de re-evaluación periódica para consolidar procesos.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 block">
                    1. Ventajas Competitivas
                  </strong>
                  <p className="text-[10.5px] text-slate-700 leading-snug">
                    Capacidades donde la empresa iguala o supera al sector, funcionando como ventajas diferenciadoras frente a competidores directos.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-[11px] uppercase tracking-wider font-bold text-amber-800 block">
                    2. Brechas Prioritarias
                  </strong>
                  <p className="text-[10.5px] text-slate-700 leading-snug">
                    Procesos que registran desventaja frente al promedio y requieren modernización para evitar pérdida de cuota de mercado.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-[11px] uppercase tracking-wider font-bold text-blue-800 block">
                    3. Directriz Estratégica
                  </strong>
                  <p className="text-[10.5px] text-slate-700 leading-snug">
                    {overallDiff >= 0
                      ? `Consolidar la automatización entre departamentos para blindar la delantera competitiva en ${localizedSector}.`
                      : `Acelerar la integración de sistemas y canales digitales para cerrar la brecha de ${Math.abs(overallDiff)}% con el sector.`}
                  </p>
                </div>
              </div>

              {/* Follow-up Protocol Note */}
              <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 text-[10.5px] text-blue-900 flex items-center justify-between gap-3">
                <span className="font-bold">
                  ℹ️ Protocolo de Seguimiento Temporal: Al realizar tu segundo diagnóstico (a partir de los 15 a 30 días), este informe activará automáticamente el Certificado de Evolución y la comparativa de avance.
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 text-center text-[10px] text-slate-500 border-t border-slate-200">
          Página 5 de 6 — LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 6: MATRIZ DE PRIORIZACIÓN COMPLETA Y VALIDACIÓN TÉCNICA */}
      {/* ========================================================================= */}
      <div 
        className="pdf-page-container flex flex-col justify-between p-8 sm:p-12 bg-white"
        style={{ minHeight: '1060px', maxHeight: '1060px', height: '1060px', boxSizing: 'border-box', overflow: 'hidden', pageBreakInside: 'avoid', breakInside: 'avoid' }}
      >
        <div className="space-y-3.5">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. — INFORME DE MADUREZ DIGITAL</span>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{companyInfo.name}</span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-1">
                6. Matriz de Priorización y Plan de Acción (16 Iniciativas)
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                Portafolio Integral Completo
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug mt-1">
              Catálogo completo de las 16 iniciativas de modernización organizadas en los 4 cuadrantes de ejecución estratégica:
            </p>
          </div>

          {/* 16 Initiatives in Compact High-Legibility Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {all16Initiatives.map((item, idx) => {
              let qClass = 'border-l-4 border-l-emerald-500 bg-emerald-50/15';
              let qBadge = 'bg-emerald-100 text-emerald-800';
              if (item.quadrant.includes('Estratégico')) {
                qClass = 'border-l-4 border-l-blue-500 bg-blue-50/15';
                qBadge = 'bg-blue-100 text-blue-800';
              } else if (item.quadrant.includes('Operativa')) {
                qClass = 'border-l-4 border-l-amber-500 bg-amber-50/15';
                qBadge = 'bg-amber-100 text-amber-800';
              } else if (item.quadrant.includes('Futura')) {
                qClass = 'border-l-4 border-l-purple-500 bg-purple-50/15';
                qBadge = 'bg-purple-100 text-purple-800';
              }

              return (
                <div 
                  key={item.id}
                  className={`p-2 rounded-lg border border-slate-200 ${qClass} space-y-0.5`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded ${qBadge}`}>
                      {item.quadrant}
                    </span>
                    <span className="text-[8.5px] font-mono text-slate-500 font-bold">
                      {item.timeframe}
                    </span>
                  </div>
                  <h4 className="text-[10px] font-bold text-slate-900 leading-snug">
                    {idx + 1}. {item.title}
                  </h4>
                  <p className="text-[9px] text-slate-600 leading-tight line-clamp-1">
                    {item.desc}
                  </p>
                  <div className="text-[8.5px] text-slate-500 pt-0.5 flex justify-between border-t border-slate-200/50">
                    <span>Eje: <strong>{item.axis}</strong></span>
                    <span>Impacto: <strong>{item.impact}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Implementation Roadmap in 3 Phases */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2.5 text-[9.5px]">
            <div>
              <strong className="text-slate-900 uppercase block font-black">Fase 1: Victorias Rápidas (Mes 1)</strong>
              <p className="text-slate-600 leading-tight">2FA, WhatsApp Business, plantillas en la nube y cobros QR (Yape/Plin).</p>
            </div>
            <div>
              <strong className="text-slate-900 uppercase block font-black">Fase 2: Integración (Mes 2-4)</strong>
              <p className="text-slate-600 leading-tight">Sistema ERP, facturación SUNAT, embudo CRM y checklists móviles.</p>
            </div>
            <div>
              <strong className="text-slate-900 uppercase block font-black">Fase 3: Escala & IA (Mes 5+)</strong>
              <p className="text-slate-600 leading-tight">Asistentes de IA, tableros de BI en tiempo real y portal de clientes.</p>
            </div>
          </div>

          {/* Formal Signoff & Technical Validation */}
          <div className="border-t border-slate-300 pt-3">
            <div className="grid grid-cols-2 gap-8 text-center text-xs">
              <div className="space-y-0.5">
                <div className="h-7 flex items-end justify-center">
                  <span className="font-serif italic text-slate-800 text-xs">Equipo Consultor Especializado</span>
                </div>
                <div className="border-t border-slate-400 w-44 mx-auto pt-1 font-bold text-slate-900 text-[11px]">
                  LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.
                </div>
                <span className="text-[9.5px] text-slate-500 block">Emisión y Validación Técnica</span>
              </div>
              <div className="space-y-0.5">
                <div className="h-7 flex items-end justify-center">
                  <span className="font-mono text-slate-800 text-[11px] font-bold">{companyInfo.name}</span>
                </div>
                <div className="border-t border-slate-400 w-44 mx-auto pt-1 font-bold text-slate-900 text-[11px]">
                  Dirección / Gerencia General
                </div>
                <span className="text-[9.5px] text-slate-500 block">Recepción y Conformidad del Plan</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2.5 text-center text-[10px] text-slate-500 border-t border-slate-200">
          Página 6 de 6 — LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. © {new Date().getFullYear()} — Documento técnico de validez empresarial.
        </div>
      </div>

    </div>
  );
}
