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
import { REPORT_TRANSLATIONS } from '../i18n/reportTranslations';
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
  const tr = REPORT_TRANSLATIONS[language] || REPORT_TRANSLATIONS.es;
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
    Tecnología: { es: 'Tecnología y Software', en: 'Technology & Software', pt: 'Tecnologia e Software' },
    Tecnologia: { es: 'Tecnología y Software', en: 'Technology & Software', pt: 'Tecnologia e Software' },
    Salud: { es: 'Salud y Farmacia', en: 'Healthcare & Medical', pt: 'Saúde e Farmácia' },
    Educación: { es: 'Educación y Formación', en: 'Education & Training', pt: 'Educação e Treinamento' },
    Educacion: { es: 'Educación y Formación', en: 'Education & Training', pt: 'Educação e Treinamento' },
    Construcción: { es: 'Construcción e Inmobiliaria', en: 'Construction & Real Estate', pt: 'Construção e Imobiliária' },
    Construccion: { es: 'Construcción e Inmobiliaria', en: 'Construction & Real Estate', pt: 'Construção e Imobiliária' },
    Gastronomía: { es: 'Gastronomía y Hotelería', en: 'Gastronomy & Hospitality', pt: 'Gastronomia e Hotelaria' },
    Gastronomia: { es: 'Gastronomía y Hotelería', en: 'Gastronomy & Hospitality', pt: 'Gastronomia e Hotelaria' },
    Logística: { es: 'Transporte y Logística', en: 'Logistics & Transport', pt: 'Transporte e Logística' },
    Logistica: { es: 'Transporte y Logística', en: 'Logistics & Transport', pt: 'Transporte e Logística' },
    Agropecuario: { es: 'Agropecuario y Alimentos', en: 'Agriculture & Food', pt: 'Agropecuária e Alimentos' },
    Otro: { es: 'General y Multisectorial', en: 'General / Multisector', pt: 'Geral e Multissetorial' }
  };

  const localizedSector = sectorNames[companyInfo.sector]?.[language] || companyInfo.sector;
  
  const sizeNames: Record<string, Record<string, string>> = {
    Micro: { es: 'Microempresa (1-10)', en: 'Micro (1-10)', pt: 'Microempresa (1-10)' },
    Pequeña: { es: 'Pequeña Empresa (11-50)', en: 'Small Business (11-50)', pt: 'Pequena Empresa (11-50)' },
    Mediana: { es: 'Mediana Empresa (51-200)', en: 'Medium Enterprise (51-200)', pt: 'Média Empresa (51-200)' },
    Grande: { es: 'Gran Corporación (200+)', en: 'Large Enterprise (200+)', pt: 'Grande Empresa (200+)' }
  };
  const localizedSize = sizeNames[companyInfo.size]?.[language] || companyInfo.size;

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
              ? tr.evolutionSubhead(daysElapsed)
              : tr.auditSubhead}
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 uppercase leading-tight">
            {tr.officialTitle}
          </h1>
          
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {hasPrevious
              ? tr.coverDescEvolution(previousRecord?.date || '')
              : tr.coverDescStandard}
          </p>

          <div className="pt-2 flex flex-col items-center justify-center">
            <div className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-300 shadow-sm flex flex-col items-center min-w-[280px]">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500">{tr.generalIndex}</span>
              <div className="text-6xl font-black font-mono text-slate-900 my-2">
                {metrics.general}%
              </div>
              <span className={`text-xs font-black px-4 py-1 rounded-full border ${levelInfo.badgeClass}`}>
                {levelInfo.title.toUpperCase()}
              </span>
              {hasPrevious && previousRecord && (
                <div className="mt-3 pt-2.5 border-t border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-2">
                  <span className="text-slate-500 text-[11px]">{tr.baseline}: <strong>{previousRecord.metrics.general}%</strong></span>
                  <span className="text-slate-400">➔</span>
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded ${
                    globalDelta >= 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {tr.evolutionText(globalDelta)}
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
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{tr.evaluatedCompany}</span>
              <strong className="text-slate-900 text-sm">{companyInfo.name}</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{tr.economicSector}</span>
              <strong className="text-slate-900 text-sm">{localizedSector}</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{tr.corporateSize}</span>
              <strong className="text-slate-900 text-sm">{localizedSize}</strong>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{tr.auditCode}</span>
              <span className="font-mono font-bold text-slate-900">{id}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{tr.issueDateTime}</span>
              <span className="text-slate-900 font-medium">{date} {time}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">{tr.contactEmail}</span>
              <span className="text-slate-900 font-medium">{companyInfo.contactEmail}</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-400 text-center">
            {tr.legalFooter}
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
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{tr.pageHeader}</span>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{companyInfo.name}</span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-2">
              {tr.sec1Title}
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed mt-3">
              {tr.sec1Desc1(companyInfo.name)}
            </p>
            <p className="text-xs text-slate-700 leading-relaxed mt-2">
              {tr.sec1Desc2(metrics.general, levelInfo.title, levelInfo.description)}
            </p>
          </div>

          <div className="pt-1">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider border-b border-slate-300 pb-1.5 flex items-center justify-between">
              <span>{tr.sec2Title}</span>
              <span className="text-[11px] font-normal text-slate-500 lowercase">{tr.scaleNote}</span>
            </h3>

            <table className="w-full text-left text-xs border-collapse border border-slate-300 mt-3">
              <thead>
                <tr className="bg-slate-100 text-slate-900">
                  <th className="p-2 border border-slate-300 font-bold">{tr.colDimension}</th>
                  {hasPrevious && previousRecord ? (
                    <>
                      <th className="p-2 border border-slate-300 font-bold text-center w-24">{tr.colBaseline}</th>
                      <th className="p-2 border border-slate-300 font-bold text-center w-24">{tr.colCurrent}</th>
                      <th className="p-2 border border-slate-300 font-bold text-center w-24">{tr.colDelta}</th>
                      <th className="p-2 border border-slate-300 font-bold">{tr.colEvolutionStatus}</th>
                    </>
                  ) : (
                    <>
                      <th className="p-2.5 border border-slate-300 font-bold text-center w-24">{tr.colScore}</th>
                      <th className="p-2.5 border border-slate-300 font-bold">{tr.colQualitative}</th>
                      <th className="p-2.5 border border-slate-300 font-bold text-center w-28">{tr.colGap}</th>
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
                              ? tr.leapMaturity
                              : (delta || 0) > 0 
                              ? tr.progressiveImprovement
                              : (delta || 0) === 0 
                              ? tr.consolidated
                              : tr.requiresReinforcement}
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
              {tr.strategicInterpretationTitle}
            </strong>
            <p className="leading-relaxed text-[11px]">
              {tr.strategicInterpretationDesc}
            </p>
          </div>
        </div>

        <div className="pt-4 text-center text-[10px] text-slate-500 border-t border-slate-200">
          {tr.pageNumber(2, 6)}
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
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{tr.pageHeader}</span>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{companyInfo.name}</span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-2">
              {tr.sec3Title}
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed mt-2.5">
              {tr.sec3Desc(companyInfo.name)}
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
                      <span className="text-[9.5px] font-bold text-slate-500 uppercase block">{tr.axisDiagnosis}</span>
                      <p className="text-slate-700 leading-snug">{axis.diagnosis}</p>
                    </div>
                    <div>
                      <span className="text-[9.5px] font-bold text-blue-700 uppercase block">{tr.priorityFocus}</span>
                      <p className="text-slate-900 font-medium leading-snug">{axis.priorityFocus}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4 text-center text-[10px] text-slate-500 border-t border-slate-200">
          {tr.pageNumber(3, 6)}
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
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{tr.pageHeader}</span>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{companyInfo.name}</span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-2">
              {tr.sec4Title}
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed mt-2">
              {tr.sec4Desc}
            </p>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-2 gap-4 items-stretch pt-1">
            <div className="border border-slate-200 p-3 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center">
              <h4 className="text-[11px] font-bold text-slate-900 mb-2 uppercase tracking-wider text-center">
                {tr.radarTitle}
              </h4>
              <div className="w-full flex items-center justify-center">
                <RadarChart 
                  metrics={metrics} 
                  previousMetrics={previousRecord?.metrics}
                  previousLabel={previousRecord ? `${tr.baseline} (${previousRecord.date})` : undefined}
                  currentLabel={`${tr.colCurrent} (${date})`}
                  isPrint={true} 
                />
              </div>
            </div>
            <div className="border border-slate-200 p-4 rounded-2xl bg-slate-50/50 flex flex-col justify-center">
              <h4 className="text-[11px] font-bold text-slate-900 mb-3 uppercase tracking-wider text-center">
                {tr.distributionTitle}
              </h4>
              <div className="w-full">
                <MaturityDistributionChart metrics={metrics} isPrint={true} compact={true} />
              </div>
            </div>
          </div>

          {/* Graphical Analysis & Findings */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
            <strong className="text-xs uppercase tracking-wider font-extrabold text-slate-900 block border-b border-slate-200 pb-1.5">
              {tr.techProfileAnalysisTitle}
            </strong>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="space-y-1">
                <strong className="text-blue-900 block font-bold">
                  {hasPrevious ? tr.symmetryTitleEvolution : tr.symmetryTitleStandard}
                </strong>
                <p className="text-slate-700 leading-relaxed">
                  {hasPrevious && previousRecord
                    ? tr.symmetryDescEvolution(previousRecord.date, daysElapsed)
                    : tr.symmetryDescStandard}
                </p>
              </div>
              <div className="space-y-1">
                <strong className="text-blue-900 block font-bold">{tr.ecosystemTransitionTitle}</strong>
                <p className="text-slate-700 leading-relaxed">
                  {tr.ecosystemTransitionDesc}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 text-center text-[10px] text-slate-500 border-t border-slate-200">
          {tr.pageNumber(4, 6)}
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
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{tr.pageHeader}</span>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{companyInfo.name}</span>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-2">
              {tr.sec5Title(localizedSector)}
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed mt-2">
              {tr.sec5Desc(companyInfo.name, localizedSector)}
            </p>
          </div>

          {/* Sector Benchmark Chart */}
          <div className="border border-slate-200 p-4 rounded-2xl bg-slate-50/50 space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {tr.compDimTitle}
              </h4>
              <span className="text-[10px] font-mono font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                {tr.sectorAvgLabel(sectorAverage, companyInfo.name, companyAverage, overallDiff)}
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
                    {tr.evolutionCertTitle(daysElapsed)}
                  </strong>
                </div>
                <span className="text-[11px] font-mono font-black text-blue-900 bg-white px-2.5 py-0.5 rounded-full border border-blue-300">
                  {tr.evolutionCertSub(previousRecord.date, previousRecord.metrics.general, date, metrics.general)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-[11px]">
                <div className="p-2.5 rounded-xl bg-white border border-blue-100 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">{tr.globalPerfTitle}</span>
                  <p className="text-slate-700 leading-snug">
                    {tr.globalPerfDesc(globalDelta, prevLevelInfo?.title || 'Inicial', levelInfo.title)}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-100 space-y-1">
                  <span className="text-[10px] font-bold text-blue-800 uppercase block">{tr.topLeapTitle}</span>
                  <p className="text-slate-700 leading-snug">
                    {tr.topLeapDesc(Math.max(...dimensionsScores.map(d => d.score - (previousRecord.metrics[d.key as keyof typeof previousRecord.metrics] || 0))))}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-blue-100 space-y-1">
                  <span className="text-[10px] font-bold text-purple-800 uppercase block">{tr.auditOpinionTitle}</span>
                  <p className="text-slate-700 leading-snug">
                    {tr.auditOpinionDesc}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 block">
                    {tr.compAdvantagesTitle}
                  </strong>
                  <p className="text-[10.5px] text-slate-700 leading-snug">
                    {tr.compAdvantagesDesc}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-[11px] uppercase tracking-wider font-bold text-amber-800 block">
                    {tr.priorityGapsTitle}
                  </strong>
                  <p className="text-[10.5px] text-slate-700 leading-snug">
                    {tr.priorityGapsDesc}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-[11px] uppercase tracking-wider font-bold text-blue-800 block">
                    {tr.strategicGuidelineTitle}
                  </strong>
                  <p className="text-[10.5px] text-slate-700 leading-snug">
                    {overallDiff >= 0
                      ? tr.strategicGuidelinePositive(localizedSector)
                      : tr.strategicGuidelineNegative(Math.abs(overallDiff))}
                  </p>
                </div>
              </div>

              {/* Follow-up Protocol Note */}
              <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 text-[10.5px] text-blue-900 flex items-center justify-between gap-3">
                <span className="font-bold">
                  {tr.followUpProtocol}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 text-center text-[10px] text-slate-500 border-t border-slate-200">
          {tr.pageNumber(5, 6)}
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
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{tr.pageHeader}</span>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">{companyInfo.name}</span>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-1">
                {tr.sec6Title}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                {tr.portfolioTag}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug mt-1">
              {tr.sec6Desc}
            </p>
          </div>

          {/* 16 Initiatives in Compact High-Legibility Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            {tr.initiatives.map((item, idx) => {
              let qClass = 'border-l-4 border-l-emerald-500 bg-emerald-50/15';
              let qBadge = 'bg-emerald-100 text-emerald-800';
              if (item.quadrant.includes('Estratégic') || item.quadrant.includes('Strategic')) {
                qClass = 'border-l-4 border-l-blue-500 bg-blue-50/15';
                qBadge = 'bg-blue-100 text-blue-800';
              } else if (item.quadrant.includes('Operativ') || item.quadrant.includes('Operational')) {
                qClass = 'border-l-4 border-l-amber-500 bg-amber-50/15';
                qBadge = 'bg-amber-100 text-amber-800';
              } else if (item.quadrant.includes('Futur') || item.quadrant.includes('IA') || item.quadrant.includes('AI')) {
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
                    <span>{language === 'en' ? 'Axis:' : language === 'pt' ? 'Eixo:' : 'Eje:'} <strong>{item.axis}</strong></span>
                    <span>{language === 'en' ? 'Impact:' : language === 'pt' ? 'Impacto:' : 'Impacto:'} <strong>{item.impact}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Implementation Roadmap in 3 Phases */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-2.5 text-[9.5px]">
            <div>
              <strong className="text-slate-900 uppercase block font-black">{tr.phase1Title}</strong>
              <p className="text-slate-600 leading-tight">{tr.phase1Desc}</p>
            </div>
            <div>
              <strong className="text-slate-900 uppercase block font-black">{tr.phase2Title}</strong>
              <p className="text-slate-600 leading-tight">{tr.phase2Desc}</p>
            </div>
            <div>
              <strong className="text-slate-900 uppercase block font-black">{tr.phase3Title}</strong>
              <p className="text-slate-600 leading-tight">{tr.phase3Desc}</p>
            </div>
          </div>

          {/* Formal Signoff & Technical Validation */}
          <div className="border-t border-slate-300 pt-3">
            <div className="grid grid-cols-2 gap-8 text-center text-xs">
              <div className="space-y-0.5">
                <div className="h-7 flex items-end justify-center">
                  <span className="font-serif italic text-slate-800 text-xs">{tr.consultingTeam}</span>
                </div>
                <div className="border-t border-slate-400 w-44 mx-auto pt-1 font-bold text-slate-900 text-[11px]">
                  LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.
                </div>
                <span className="text-[9.5px] text-slate-500 block">{tr.validationTitle}</span>
              </div>
              <div className="space-y-0.5">
                <div className="h-7 flex items-end justify-center">
                  <span className="font-mono text-slate-800 text-[11px] font-bold">{companyInfo.name}</span>
                </div>
                <div className="border-t border-slate-400 w-44 mx-auto pt-1 font-bold text-slate-900 text-[11px]">
                  {tr.managementTeam}
                </div>
                <span className="text-[9.5px] text-slate-500 block">{tr.acceptanceTitle}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2.5 text-center text-[10px] text-slate-500 border-t border-slate-200">
          {tr.finalLegalNote(new Date().getFullYear())}
        </div>
      </div>

    </div>
  );
}
