import React, { useState } from 'react';
import { DiagnosticRecord } from '../types';
import RadarChart from './RadarChart';
import SectorBenchmarkChart, { SECTOR_BENCHMARKS } from './SectorBenchmarkChart';
export { SECTOR_BENCHMARKS } from './SectorBenchmarkChart';
import MaturityDistributionChart from './MaturityDistributionChart';
import MacroAxesSummary from './MacroAxesSummary';
import GapAnalysisMatrix from './GapAnalysisMatrix';
import PrioritizationMatrix from './PrioritizationMatrix';
import RoiCalculator from './RoiCalculator';
import FullDocumentReport from './FullDocumentReport';
import EvolutionComparisonView from './EvolutionComparisonView';
import PlatformBenchmarkRecharts from './PlatformBenchmarkRecharts';
import { useLanguage } from '../i18n/LanguageContext';
import { getTranslatedRecommendations, getTranslatedRoadmapPhases } from '../i18n/recommendationsTranslations';
import { 
  TrendingUp, Award, CheckCircle, AlertTriangle, ShieldCheck, 
  Printer, Sparkles, ClipboardList, 
  Lightbulb, RefreshCw, Layers,
  ArrowLeft, Calculator, History, Building2
} from 'lucide-react';

interface ResultsDashboardProps {
  record: DiagnosticRecord;
  userRecords?: DiagnosticRecord[];
  onRestart: () => void;
  isDirectPrint?: boolean;
  onViewPrint?: () => void;
  onBackToAdmin?: () => void;
}

export default function ResultsDashboard({ record, userRecords = [], onRestart, isDirectPrint = false, onViewPrint, onBackToAdmin }: ResultsDashboardProps) {
  const { companyInfo, metrics, id, date, time } = record;
  const { t, language, getMaturityLevelI18n } = useLanguage();
  const levelInfo = getMaturityLevelI18n(metrics.general);
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison' | 'roadmap' | 'roi' | 'evolution'>('overview');
  const [comparisonScope, setComparisonScope] = useState<'both' | 'platform' | 'sector'>('both');
  const [showPrintMenu, setShowPrintMenu] = useState(false);

  // Find previous records for this user (same email, different id)
  const contactEmail = companyInfo.contactEmail.toLowerCase().trim();
  const priorRecords = (userRecords || []).filter(
    r => r.id !== id && r.companyInfo.contactEmail.toLowerCase().trim() === contactEmail
  ).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const [selectedPrevId, setSelectedPrevId] = useState<string>(
    priorRecords.length > 0 ? priorRecords[0].id : ''
  );

  const effectivePreviousRecord = priorRecords.find(r => r.id === selectedPrevId) || (priorRecords.length > 0 ? priorRecords[0] : null);
  const evolutionDelta = effectivePreviousRecord ? metrics.general - effectivePreviousRecord.metrics.general : null;

  // Localized dimensions and descriptions
  const dimensionsScores = [
    { key: 'digitalizacion', name: t('dim.digitalizacion', 'Digitalización'), score: metrics.digitalizacion, icon: 'TrendingUp', desc: t('dashboard.dimDesc.digitalizacion') },
    { key: 'automatizacion', name: t('dim.automatizacion', 'Automatización'), score: metrics.automatizacion, icon: 'Cpu', desc: t('dashboard.dimDesc.automatizacion') },
    { key: 'innovacion', name: t('dim.innovacion', 'Innovación'), score: metrics.innovacion, icon: 'Lightbulb', desc: t('dashboard.dimDesc.innovacion') },
    { key: 'circularidad', name: t('dim.circularidad', 'Circularidad'), score: metrics.circularidad, icon: 'Leaf', desc: t('dashboard.dimDesc.circularidad') },
    { key: 'trazabilidad', name: t('dim.trazabilidad', 'Trazabilidad'), score: metrics.trazabilidad, icon: 'Milestone', desc: t('dashboard.dimDesc.trazabilidad') },
    { key: 'gestion', name: t('dim.gestion', 'Gestión'), score: metrics.gestion, icon: 'Building2', desc: t('dashboard.dimDesc.gestion') },
    { key: 'seguridad', name: t('dim.seguridad', 'Seguridad'), score: metrics.seguridad, icon: 'ShieldAlert', desc: t('dashboard.dimDesc.seguridad') },
    { key: 'cultura', name: t('dim.cultura', 'Cultura Digital'), score: metrics.cultura, icon: 'UserCheck', desc: t('dashboard.dimDesc.cultura') }
  ];

  const strengths = dimensionsScores.filter(d => d.score >= 70);
  const elementsToImprove = dimensionsScores.filter(d => d.score < 70);

  // Sector benchmarks calculations for Section 4 and comparative diagnostics
  const sectorBenchmarks = SECTOR_BENCHMARKS[companyInfo.sector] || SECTOR_BENCHMARKS['Otro'];
  const benchmarkValues = Object.values(sectorBenchmarks);
  const sectorAverage = Math.round(benchmarkValues.reduce((a, b) => a + b, 0) / benchmarkValues.length);
  const companyAverage = metrics.general;
  const overallDiff = companyAverage - sectorAverage;

  const comparisonData = dimensionsScores.map(d => {
    const bench = sectorBenchmarks[d.key] || 0;
    const diff = d.score - bench;
    return { ...d, bench, diff };
  });

  const sectorAdvantages = comparisonData.filter(d => d.diff > 3).sort((a, b) => b.diff - a.diff);
  const sectorGaps = comparisonData.filter(d => d.diff < -3).sort((a, b) => a.diff - b.diff);

  // Sorted dimensions for Page 3 Radar and Distribution analysis
  const sortedByScore = [...dimensionsScores].sort((a, b) => b.score - a.score);
  const topDimensions = sortedByScore.slice(0, 2);
  const lowestDimensions = [...sortedByScore].reverse().slice(0, 2);

  const leaderCount = dimensionsScores.filter(d => d.score > 75).length;
  const developedCount = dimensionsScores.filter(d => d.score > 50 && d.score <= 75).length;
  const basicCount = dimensionsScores.filter(d => d.score > 25 && d.score <= 50).length;
  const initialCount = dimensionsScores.filter(d => d.score <= 25).length;
  const consolidatedPct = Math.round(((leaderCount + developedCount) / dimensionsScores.length) * 100);

  // Dynamic automatic recommendations & roadmap translated into current language
  const recommendations = getTranslatedRecommendations(record, language);
  const roadmap = getTranslatedRoadmapPhases(metrics.general, language);

  const getQualitativeTag = (score: number) => {
    if (score > 75) return `${t('dashboard.statusExcellent')} (${language === 'en' ? 'Leader' : 'Líder'})`;
    if (score > 50) return `${t('dashboard.statusDeveloped')} (${language === 'en' ? 'Stable' : language === 'pt' ? 'Estável' : 'Estable'})`;
    if (score > 25) return `${t('dashboard.statusInProgress')} (${language === 'en' ? 'Improving' : language === 'pt' ? 'Em Progresso' : 'En Mejora'})`;
    return `${t('dashboard.statusCritical')} (${language === 'en' ? 'Critical' : language === 'pt' ? 'Crítico' : 'Crítico'})`;
  };

  const handlePrint = () => {
    window.print();
  };

  const localizedSector = t(`sector.${companyInfo.sector}`) || companyInfo.sector;
  const localizedSize = t(`size.${companyInfo.size}`) || companyInfo.size;

  // Direct print view (dedicated clean white container for PDF generator or print window)
  if (isDirectPrint) {
    return (
      <div className="block text-black bg-white w-full" style={{ color: '#000', backgroundColor: '#fff' }}>
        <FullDocumentReport record={record} previousRecord={effectivePreviousRecord} isPrint={true} />
      </div>
    );
  }

  return (
    <div id="results-root" className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {onBackToAdmin ? (
        <button
          onClick={onBackToAdmin}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs font-bold cursor-pointer shadow-sm focus:outline-none print:hidden mb-4"
        >
          <ArrowLeft className="w-4 h-4 text-blue-500" />
          <span>{t('dashboard.backAdmin')}</span>
        </button>
      ) : (
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs font-bold cursor-pointer shadow-sm focus:outline-none print:hidden mb-4"
        >
          <ArrowLeft className="w-4 h-4 text-blue-500" />
          <span>{t('dashboard.backHome')}</span>
        </button>
      )}

      {/* Header and Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">{t('dashboard.moduleTag')}</span>
            <span>ID: {id}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white mt-1.5">
            {t('dashboard.diagResultsTitle')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t('dashboard.conductedOn')} {date} {t('dashboard.atTime')} {time} {t('dashboard.forCompany')} <strong className="text-slate-800 dark:text-white">{companyInfo.name}</strong> ({localizedSector})
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          
          <div className="relative flex-1 sm:flex-initial">
            <button
              id="print-pdf-btn"
              onClick={() => setShowPrintMenu(!showPrintMenu)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm font-semibold cursor-pointer shadow-sm focus:outline-none"
            >
              <Printer className="w-4 h-4 text-blue-500" />
              <span>{t('dashboard.printPdf')}</span>
              <span className="text-[10px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded ml-1 font-mono">PDF</span>
            </button>
            
            {showPrintMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowPrintMenu(false)} />
                <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-3.5 space-y-2 animate-in fade-in slide-in-from-top-3 duration-200 text-left">
                  <div className="px-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t('dashboard.downloadOptions')}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      if (onViewPrint) {
                        onViewPrint();
                      } else {
                        window.print();
                      }
                      setShowPrintMenu(false);
                    }}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-slate-700 dark:text-slate-300 transition-all text-xs group text-left cursor-pointer focus:outline-none"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all shrink-0">
                      <Printer className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-bold">{t('dashboard.previewPdf')}</strong>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 block leading-normal">{t('dashboard.previewPdfDesc')}</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      handlePrint();
                      setShowPrintMenu(false);
                    }}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all text-xs group text-left cursor-pointer focus:outline-none border-t border-slate-100 dark:border-slate-800 pt-2.5"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-500/10 text-slate-500 group-hover:bg-slate-500 group-hover:text-white transition-all shrink-0">
                      <Printer className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white font-bold">{t('dashboard.quickPrint')}</strong>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 block leading-normal">{t('dashboard.quickPrintDesc')}</span>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>

          <button
            id="restart-diag-btn"
            onClick={onRestart}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all text-sm font-semibold cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t('dashboard.newDiagnostic')}</span>
          </button>
        </div>
      </div>

      {/* Main Results Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:hidden">
        
        {/* LEFT COLUMN: Summary Card and Radar Chart */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Executive Score Card */}
          <div id="executive-score-card" className="p-6 md:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-xl shadow-slate-200/50 dark:shadow-black/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t('dashboard.executiveSummary')}</span>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500 dark:from-blue-400 dark:to-emerald-400">
                {metrics.general}%
              </span>
              <div className="flex flex-col">
                <span className={`text-xs font-black px-3 py-1 rounded-full ${levelInfo.badgeClass} w-fit shadow-2xs border`}>
                  {levelInfo.title}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">{t('dashboard.generalScore')}</span>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed mt-4 bg-slate-50 dark:bg-[#060c18] p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-750">
              {levelInfo.description}
            </p>

            {/* Quick KPIs Grid */}
            <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-200 dark:border-slate-800/80">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">{t('dashboard.companySize')}</span>
                <span className="text-sm font-black text-slate-900 dark:text-slate-100">{localizedSize}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">{t('dashboard.sector')}</span>
                <span className="text-sm font-black text-slate-900 dark:text-slate-100">{localizedSector}</span>
              </div>
            </div>
          </div>

          {/* Radar Chart Card */}
          <div id="radar-card" className="p-6 md:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-xl shadow-slate-200/50 dark:shadow-black/60">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>{t('dashboard.spiderRadar')}</span>
            </h3>
            <RadarChart 
              metrics={metrics} 
              previousMetrics={effectivePreviousRecord?.metrics}
              previousLabel={effectivePreviousRecord ? `${effectivePreviousRecord.date} (${effectivePreviousRecord.metrics.general}%)` : undefined}
              currentLabel={`${date} (${metrics.general}%)`}
            />
          </div>

          {/* Maturity Distribution Card */}
          <div id="maturity-distribution-card" className="p-6 md:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-xl shadow-slate-200/50 dark:shadow-black/60">
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <ClipboardList className="w-4 h-4 text-cyan-500" />
              <span>{t('dashboard.distribution')}</span>
            </h3>
            <MaturityDistributionChart metrics={metrics} />
          </div>
        </div>

        {/* RIGHT COLUMN: Tabbed Details & Action Plan */}
        <div className="lg:col-span-7 space-y-8">

          {/* Comparative Follow-up Banner if prior record exists */}
          {effectivePreviousRecord && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-slate-50 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-slate-900 border border-blue-200 dark:border-blue-900/60 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs shrink-0">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-extrabold text-blue-950 dark:text-blue-100 block text-xs">
                    {language === 'en' ? 'Comparative Follow-up Active' : language === 'pt' ? 'Acompanhamento Comparativo Ativo' : 'Diagnóstico de Seguimiento Activo'}
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 text-[11px] block mt-0.5">
                    {language === 'en'
                      ? `Benchmarked against baseline from ${effectivePreviousRecord.date}. Net growth:`
                      : language === 'pt'
                      ? `Comparado com a linha de base de ${effectivePreviousRecord.date}. Ganho líquido:`
                      : `Comparando contra tu línea base del ${effectivePreviousRecord.date}. Avance neto:`}{' '}
                    <strong className="text-emerald-700 dark:text-emerald-400 font-extrabold">
                      {evolutionDelta !== null && evolutionDelta >= 0 ? `+${evolutionDelta}%` : `${evolutionDelta}%`}
                    </strong>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('evolution')}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs cursor-pointer transition-all shadow-xs"
              >
                {language === 'en' ? 'View Evolution Analysis' : language === 'pt' ? 'Ver Análise de Evolução' : 'Ver Análisis de Evolución'}
              </button>
            </div>
          )}
          
          {/* Navigation Tabs */}
          <div className="flex p-1 sm:p-1.5 rounded-2xl bg-slate-100 dark:bg-[#060c18] border-2 border-slate-200 dark:border-slate-800 print:hidden overflow-x-auto gap-1">
            <button
              id="tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-white dark:bg-[#0c1426] text-blue-600 dark:text-cyan-400 shadow-md border-2 border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{language === 'en' ? 'Overview & Axes' : language === 'pt' ? 'Visão Geral & Eixos' : 'Visión General y Ejes'}</span>
            </button>
            <button
              id="tab-evolution"
              onClick={() => setActiveTab('evolution')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'evolution'
                  ? 'bg-white dark:bg-[#0c1426] text-blue-600 dark:text-cyan-400 shadow-md border-2 border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{language === 'en' ? 'Evolution (15d+)' : language === 'pt' ? 'Evolução (15d+)' : 'Evolución (15-30 días)'}</span>
              {evolutionDelta !== null && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                  evolutionDelta >= 0 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'
                }`}>
                  {evolutionDelta >= 0 ? `+${evolutionDelta}%` : `${evolutionDelta}%`}
                </span>
              )}
            </button>
            <button
              id="tab-comparison"
              onClick={() => setActiveTab('comparison')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'comparison'
                  ? 'bg-white dark:bg-[#0c1426] text-blue-600 dark:text-cyan-400 shadow-md border-2 border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{language === 'en' ? 'Gaps & Benchmark' : language === 'pt' ? 'Lacunas & Benchmark' : 'Brechas y Benchmark'}</span>
            </button>
            <button
              id="tab-roadmap"
              onClick={() => setActiveTab('roadmap')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'roadmap'
                  ? 'bg-white dark:bg-[#0c1426] text-blue-600 dark:text-cyan-400 shadow-md border-2 border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{language === 'en' ? 'Prioritization & Plan' : language === 'pt' ? 'Priorização & Plano' : 'Priorización y Plan'}</span>
            </button>
            <button
              id="tab-roi"
              onClick={() => setActiveTab('roi')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'roi'
                  ? 'bg-white dark:bg-[#0c1426] text-blue-600 dark:text-cyan-400 shadow-md border-2 border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{language === 'en' ? 'Impact & ROI' : language === 'pt' ? 'Impacto & ROI' : 'Impacto y ROI'}</span>
            </button>
          </div>

          {/* TAB CONTENT: SEMAPHORES & OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* 5 Strategic Macro-Axes Summary */}
              <MacroAxesSummary record={record} />

              {/* Executive Advisory Synthesis */}
              <div className="p-6 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/20 dark:from-[#0d162d] dark:via-[#0c142b] dark:to-[#091022] shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2.5 text-blue-600 dark:text-cyan-400">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <h3 className="text-base font-bold tracking-tight">{t('dashboard.executiveSynthesisTitle')}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="md:col-span-2 space-y-3">
                    <p className="text-xs text-slate-600 dark:text-slate-200 leading-relaxed">
                      {language === 'en' ? (
                        <>The diagnostic assessment for <strong className="text-slate-900 dark:text-white">{companyInfo.name}</strong> reveals an overall maturity rate of <strong className="text-slate-900 dark:text-white">{metrics.general}%</strong>, categorizing the organization as <strong className="text-blue-600 dark:text-cyan-400 font-bold">{levelInfo.title}</strong>. This indicates an operational environment with {metrics.general > 50 ? 'solid automation foundations alongside opportunities for smart integration and cross-departmental alignment.' : 'foundational opportunities in workflow digitization, legacy system modernization, and agile governance.'}</>
                      ) : language === 'pt' ? (
                        <>A avaliação diagnóstica para <strong className="text-slate-900 dark:text-white">{companyInfo.name}</strong> revela uma taxa de maturidade de <strong className="text-slate-900 dark:text-white">{metrics.general}%</strong>, enquadrando-se como <strong className="text-blue-600 dark:text-cyan-400 font-bold">{levelInfo.title}</strong>. Isso indica um ecossistema com {metrics.general > 50 ? 'bases consolidadas de automação, mas com oportunidades em integrações inteligentes.' : 'oportunidades fundamentais de digitalização de processos, modernização de infraestrutura legada e governança ágil.'}</>
                      ) : (
                        <>La evaluación diagnóstica para <strong className="text-slate-900 dark:text-white">{companyInfo.name}</strong> revela una tasa de madurez del <strong className="text-slate-900 dark:text-white">{metrics.general}%</strong>, situándose en la categoría de <strong className="text-blue-600 dark:text-cyan-400 font-bold">{levelInfo.title}</strong>. Esto indica un ecosistema operativo con {metrics.general > 50 ? 'bases consolidadas de automatización pero con brechas de integración inteligente y redundancias metodológicas.' : 'oportunidades fundamentales de automatización de procesos, modernización de infraestructura heredada y gobernanza ágil.'}</>
                      )}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
                      {language === 'en'
                        ? 'Under the LUXPROC framework, it is recommended to target technology investments on resolving technical debt and standardizing core workflows before scaling advanced AI models.'
                        : language === 'pt'
                          ? 'Sob a metodologia LUXPROC, recomenda-se orientar os recursos para sanar a dívida técnica e unificar dados antes de escalar para IA generativa.'
                          : 'Bajo la metodología de consultoría LUXPROC, se recomienda orientar los recursos de inversión tecnológica en subsanar la deuda técnica y unificar silos de información antes de escalar a implementaciones avanzadas de Inteligencia Artificial Generativa.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#070d1a] border border-slate-100 dark:border-slate-800/40 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t('dashboard.generalRecommendation')}</span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1.5 leading-relaxed">
                        {metrics.general < 40 
                          ? (language === 'en' ? 'Prioritize core software infrastructure modernization and unified CRM/ERP adoption.' : language === 'pt' ? 'Priorizar a modernização de software básico e adoção de CRM/ERP unificado.' : 'Priorizar la modernización de la infraestructura básica de software y la adopción de CRM/ERP unificados.')
                          : metrics.general < 70 
                            ? (language === 'en' ? 'Strengthen agile automation of repetitive workflows and direct API integrations.' : language === 'pt' ? 'Fortalecer a automação ágil de fluxos de trabalho repetitivos e integrações via API.' : 'Fortalecer la automatización ágil de flujos repetitivos de trabajo e integraciones directas vía APIs.')
                            : (language === 'en' ? 'Foster continuous innovation driven by predictive AI models and data analytics.' : language === 'pt' ? 'Fomentar a cultura de inovação contínua baseada em modelos preditivos e IA.' : 'Fomentar la cultura de innovación continua basada en modelos predictivos e inteligencia artificial generativa.')}
                      </p>
                    </div>
                    <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-widest mt-4">LUXPROC Smart Engine</span>
                  </div>
                </div>
              </div>

              {/* RECHARTS PLATFORM HISTORICAL BENCHMARK */}
              <PlatformBenchmarkRecharts
                metrics={metrics}
                userRecords={userRecords}
                companyName={companyInfo.name}
                sector={companyInfo.sector}
              />

              {/* Interactive Sector Comparison Teaser Banner */}
              <div className="p-5 rounded-2xl border-2 border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-cyan-50/40 dark:from-[#0c162e] dark:via-[#0b1328] dark:to-[#071120] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                    <span className="text-[11px] font-black text-blue-700 dark:text-cyan-400 uppercase tracking-wider">
                      {language === 'en' ? 'Industry Benchmark vs' : 'Comparativa Sectorial vs'} {localizedSector}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                      overallDiff >= 0
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                    }`}>
                      {overallDiff >= 0 ? `+${overallDiff}% vs Sector` : `${overallDiff}% vs Sector`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {overallDiff >= 0 ? (
                      language === 'en'
                        ? <>Your company leads other organizations in <strong>{localizedSector}</strong> with a general score of <strong>{metrics.general}%</strong> compared to the market benchmark of <strong>{sectorAverage}%</strong>.</>
                        : <>Tu empresa supera la media de otras organizaciones en el sector <strong>{localizedSector}</strong> con una madurez del <strong>{metrics.general}%</strong> frente al promedio sectorial de <strong>{sectorAverage}%</strong>.</>
                    ) : (
                      language === 'en'
                        ? <>Your company stands at <strong>{metrics.general}%</strong> against a <strong>{sectorAverage}%</strong> market average in <strong>{localizedSector}</strong>. Exploring strategic gaps will accelerate your roadmap.</>
                        : <>Tu empresa se sitúa en un <strong>{metrics.general}%</strong> frente a la media del <strong>{sectorAverage}%</strong> en <strong>{localizedSector}</strong>. Explora la diferencia y simula mejoras en tiempo real.</>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('comparison')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/20 cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>{language === 'en' ? 'View Real-Time Comparison' : 'Ver Comparación en Tiempo Real'}</span>
                </button>
              </div>

              {/* Bento-Grid Prioritization Matrix */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#091122] shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                  <div>
                    <h3 className="text-base font-bold text-slate-950 dark:text-white">
                      {t('dashboard.prioritizationMatrix')}
                    </h3>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                      {t('dashboard.prioritizationDesc')}
                    </p>
                  </div>
                  <span className="self-start sm:self-auto text-[10px] font-bold bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-md font-mono tracking-wider">{t('dashboard.impactVsComplexity')}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Quadrant 1: Quick Wins */}
                  <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-950/40 bg-emerald-50/10 dark:bg-emerald-950/5 space-y-2">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">{t('dashboard.quickWinsTitle')}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('dashboard.quickWinsDesc')}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {dimensionsScores.filter(d => d.score >= 50 && d.score < 80).map((d, i) => (
                        <span key={i} className="text-[10px] bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-full font-semibold">
                          {d.name} ({d.score}%)
                        </span>
                      ))}
                      {dimensionsScores.filter(d => d.score >= 50 && d.score < 80).length === 0 && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 italic">{t('dashboard.noneInQuadrant')}</span>
                      )}
                    </div>
                  </div>

                  {/* Quadrant 2: Critical Priorities */}
                  <div className="p-4 rounded-xl border border-rose-100 dark:border-rose-950/40 bg-rose-50/10 dark:bg-rose-950/5 space-y-2">
                    <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest block">{t('dashboard.criticalPrioritiesTitle')}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('dashboard.criticalPrioritiesDesc')}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {dimensionsScores.filter(d => d.score < 50).map((d, i) => (
                        <span key={i} className="text-[10px] bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30 px-2 py-0.5 rounded-full font-semibold">
                          {d.name} ({d.score}%)
                        </span>
                      ))}
                      {dimensionsScores.filter(d => d.score < 50).length === 0 && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 italic">{t('dashboard.noCritical')}</span>
                      )}
                    </div>
                  </div>

                  {/* Quadrant 3: Pillars to Maintain */}
                  <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-950/40 bg-blue-50/10 dark:bg-blue-950/5 space-y-2">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block">{t('dashboard.pillarsTitle')}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('dashboard.pillarsDesc')}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {dimensionsScores.filter(d => d.score >= 80).map((d, i) => (
                        <span key={i} className="text-[10px] bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/30 px-2 py-0.5 rounded-full font-semibold">
                          {d.name} ({d.score}%)
                        </span>
                      ))}
                      {dimensionsScores.filter(d => d.score >= 80).length === 0 && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 italic">{t('dashboard.noOver80')}</span>
                      )}
                    </div>
                  </div>

                  {/* Quadrant 4: Next Level */}
                  <div className="p-4 rounded-xl border border-amber-100 dark:border-amber-950/40 bg-amber-50/10 dark:bg-amber-950/5 space-y-2">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">{t('dashboard.nextLevelTitle')}</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{t('dashboard.nextLevelDesc')}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[10px] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-full font-semibold">
                        {t('dashboard.predictiveAI')}
                      </span>
                      <span className="text-[10px] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-full font-semibold">
                        {t('dashboard.dataGov')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Semaphore List Card */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#091122] shadow-sm">
                <h3 className="text-base font-bold text-slate-950 dark:text-white mb-4">
                  {t('dashboard.keyDimensionsState')}
                </h3>
                
                <div className="space-y-4">
                  {dimensionsScores.map((dim, i) => {
                    let semColor = 'bg-red-500';
                    let semText = t('dashboard.statusCritical');
                    let semBg = 'bg-red-50 dark:bg-red-950/40 text-red-500 border-red-200 dark:border-red-900/40';

                    if (dim.score > 75) {
                      semColor = 'bg-emerald-500';
                      semText = t('dashboard.statusExcellent');
                      semBg = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40';
                    } else if (dim.score > 50) {
                      semColor = 'bg-blue-500';
                      semText = t('dashboard.statusDeveloped');
                      semBg = 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40';
                    } else if (dim.score > 25) {
                      semColor = 'bg-amber-500';
                      semText = t('dashboard.statusInProgress');
                      semBg = 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40';
                    }

                    return (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/40">
                        <div className="flex items-center gap-3">
                          <span className={`w-3.5 h-3.5 rounded-full ${semColor} animate-pulse shrink-0`} />
                          <div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white block leading-tight">
                              {dim.name}
                            </span>
                            <span className="text-xs text-slate-400 dark:text-slate-500 block">
                              {dim.desc}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 self-end sm:self-center">
                          <span className="text-sm font-mono font-bold text-slate-800 dark:text-slate-300">
                            {dim.score}%
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${semBg}`}>
                            {semText}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Strengths & Weaknesses Split Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Fortalezas (Green) */}
                <div className="p-5 rounded-2xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/10 shadow-sm">
                  <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                    <CheckCircle className="w-4 h-4" />
                    <span>{t('dashboard.strengths')} ({strengths.length})</span>
                  </h4>
                  {strengths.length === 0 ? (
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {t('dashboard.noStrengths')}
                    </p>
                  ) : (
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      {strengths.map((str, idx) => (
                        <li key={idx} className="flex items-center gap-2 p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-500/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="font-semibold">{str.name} ({str.score}%)</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Debilidades / Puntos a mejorar (Amber) */}
                <div className="p-5 rounded-2xl border border-orange-200/60 dark:border-orange-900/40 bg-orange-50/30 dark:bg-orange-950/10 shadow-sm">
                  <h4 className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{t('dashboard.improvements')} ({elementsToImprove.length})</span>
                  </h4>
                  {elementsToImprove.length === 0 ? (
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {t('dashboard.noImprovements')}
                    </p>
                  ) : (
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      {elementsToImprove.slice(0, 4).map((str, idx) => (
                        <li key={idx} className="flex items-center justify-between p-1.5 rounded-xl bg-white dark:bg-slate-900 border border-orange-500/10">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span className="font-semibold">{str.name}</span>
                          </div>
                          <span className="font-mono font-bold text-orange-500">{str.score}%</span>
                        </li>
                      ))}
                      {elementsToImprove.length > 4 && (
                        <li className="text-[10px] text-slate-400 text-center font-semibold italic mt-1">
                          + {elementsToImprove.length - 4} {t('dashboard.additionalToPrioritize')}
                        </li>
                      )}
                    </ul>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB CONTENT: SECTOR BENCHMARK & REAL-TIME COMPARISON */}
          {activeTab === 'comparison' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Comparative Scope Switcher: Platform Historical (Recharts) vs Sector Benchmark */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 block">
                    {language === 'en' ? 'Select Comparison Scope' : 'Selecciona el Alcance Comparativo'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'en' ? 'Toggle between Platform Historical Average (Recharts) and Sector Benchmark' : 'Alterna entre el Histórico General de la Plataforma (Recharts) y el Benchmark Sectorial'}
                  </span>
                </div>
                <div className="flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800 gap-1 self-start sm:self-auto">
                  <button
                    onClick={() => setComparisonScope('both')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      comparisonScope === 'both'
                        ? 'bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {language === 'en' ? 'Both Benchmarks' : 'Ambos'}
                  </button>
                  <button
                    onClick={() => setComparisonScope('platform')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      comparisonScope === 'platform'
                        ? 'bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {language === 'en' ? 'Platform Historical (Recharts)' : 'Histórico Plataforma (Recharts)'}
                  </button>
                  <button
                    onClick={() => setComparisonScope('sector')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                      comparisonScope === 'sector'
                        ? 'bg-white dark:bg-blue-600 text-blue-700 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {language === 'en' ? `Sector (${localizedSector})` : `Sectorial (${localizedSector})`}
                  </button>
                </div>
              </div>

              {/* 1. Recharts Platform Historical Benchmark Visualization */}
              {(comparisonScope === 'both' || comparisonScope === 'platform') && (
                <PlatformBenchmarkRecharts 
                  metrics={metrics}
                  userRecords={userRecords}
                  companyName={companyInfo.name}
                  sector={companyInfo.sector}
                />
              )}

              {/* 2. Prominent Sector Benchmark with Real-Time Switcher, Dynamic Dual Bars, Overlay Radar & Live Simulator */}
              {(comparisonScope === 'both' || comparisonScope === 'sector') && (
                <SectorBenchmarkChart metrics={metrics} sector={companyInfo.sector} />
              )}

              {/* Gap Analysis Matrix Component */}
              <div className="border-t border-slate-100 dark:border-slate-800/80 pt-6">
                <GapAnalysisMatrix record={record} />
              </div>

              {/* Diagnostic metadata block */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs text-blue-750 dark:text-blue-400 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  <strong>{t('dashboard.integrationStrategy')}</strong> {t('dashboard.integrationStrategyDesc')}
                </p>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SYSTEMATIC ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Comprehensive Prioritization Matrix (Impact vs Effort) */}
              <PrioritizationMatrix record={record} />

              {/* Recommendations Card */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <h3 className="text-base font-bold text-slate-950 dark:text-white mb-1">
                  {t('dashboard.smartRecommendations')}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-5">
                  {t('dashboard.smartRecommendationsDesc')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/40 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span>{rec.title}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                          {rec.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step by Step Timeline Improvement Plan */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <h3 className="text-base font-bold text-slate-950 dark:text-white mb-5">
                  {t('dashboard.timelineTitle')}
                </h3>

                <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 space-y-6 pl-6">
                  
                  {/* Step 1 */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 flex items-center justify-center w-6.5 h-6.5 rounded-full bg-blue-600 text-white font-mono text-xs font-bold">
                      1
                    </span>
                    <h4 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider">
                      {roadmap.f1Title}
                    </h4>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold block mt-0.5">{roadmap.f1Subtitle}</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {roadmap.f1Desc}
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 flex items-center justify-center w-6.5 h-6.5 rounded-full bg-indigo-500 text-white font-mono text-xs font-bold">
                      2
                    </span>
                    <h4 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider">
                      {roadmap.f2Title}
                    </h4>
                    <span className="text-xs text-indigo-500 dark:text-indigo-400 font-bold block mt-0.5">{roadmap.f2Subtitle}</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {roadmap.f2Desc}
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className="absolute -left-[31px] top-1 flex items-center justify-center w-6.5 h-6.5 rounded-full bg-purple-500 text-white font-mono text-xs font-bold">
                      3
                    </span>
                    <h4 className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider">
                      {roadmap.f3Title}
                    </h4>
                    <span className="text-xs text-purple-500 dark:text-purple-400 font-bold block mt-0.5">{roadmap.f3Subtitle}</span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {roadmap.f3Desc}
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB CONTENT: ROI & BUSINESS IMPACT CALCULATOR */}
          {activeTab === 'roi' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <RoiCalculator companyInfo={companyInfo} metrics={metrics} />
            </div>
          )}

          {/* TAB CONTENT: EVOLUTION & TEMPORAL COMPARISON (15+ DAYS) */}
          {activeTab === 'evolution' && (
            <EvolutionComparisonView
              currentRecord={record}
              previousRecord={effectivePreviousRecord}
              availablePreviousRecords={priorRecords}
              onSelectPreviousRecord={(rec) => setSelectedPrevId(rec.id)}
              onViewPrint={onViewPrint}
            />
          )}

        </div>

      </div>

      {/* FULL HIDDEN/PRINTABLE CONTAINER */}
      {/* This section is used for browser printing and PDF generation */}
      <div id="print-section" className="hidden print:block print:p-0 print:text-black print:bg-white" style={{ color: '#000', backgroundColor: '#fff' }}>
        <FullDocumentReport record={record} previousRecord={effectivePreviousRecord} isPrint={true} />
      </div>

    </div>
  );
}
