import React, { useState } from 'react';
import { DiagnosticRecord, ScoreMetrics } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import RadarChart from './RadarChart';
import { 
  TrendingUp, Calendar, ArrowRight, CheckCircle2, 
  Sparkles, Award, ArrowUpRight, Clock, FileDown, 
  Layers, Lightbulb, AlertCircle
} from 'lucide-react';

interface EvolutionComparisonViewProps {
  currentRecord: DiagnosticRecord;
  previousRecord: DiagnosticRecord | null;
  availablePreviousRecords?: DiagnosticRecord[];
  onSelectPreviousRecord?: (rec: DiagnosticRecord) => void;
  onViewPrint?: () => void;
}

export default function EvolutionComparisonView({
  currentRecord,
  previousRecord,
  availablePreviousRecords = [],
  onSelectPreviousRecord,
  onViewPrint
}: EvolutionComparisonViewProps) {
  const { t, language, getMaturityLevelI18n } = useLanguage();
  const [isDemoSimulation, setIsDemoSimulation] = useState(!previousRecord);

  // Generate a realistic baseline simulation if user doesn't have 2 diagnoses yet
  const simulatedPreviousMetrics: ScoreMetrics = {
    digitalizacion: Math.max(15, Math.round(currentRecord.metrics.digitalizacion * 0.65)),
    automatizacion: Math.max(10, Math.round(currentRecord.metrics.automatizacion * 0.58)),
    innovacion: Math.max(15, Math.round(currentRecord.metrics.innovacion * 0.68)),
    circularidad: Math.max(20, Math.round(currentRecord.metrics.circularidad * 0.75)),
    trazabilidad: Math.max(10, Math.round(currentRecord.metrics.trazabilidad * 0.60)),
    gestion: Math.max(25, Math.round(currentRecord.metrics.gestion * 0.72)),
    seguridad: Math.max(15, Math.round(currentRecord.metrics.seguridad * 0.64)),
    cultura: Math.max(20, Math.round(currentRecord.metrics.cultura * 0.70)),
    general: 0
  };
  simulatedPreviousMetrics.general = Math.round(
    (simulatedPreviousMetrics.digitalizacion +
      simulatedPreviousMetrics.automatizacion +
      simulatedPreviousMetrics.innovacion +
      simulatedPreviousMetrics.circularidad +
      simulatedPreviousMetrics.trazabilidad +
      simulatedPreviousMetrics.gestion +
      simulatedPreviousMetrics.seguridad +
      simulatedPreviousMetrics.cultura) / 8
  );

  const simulatedPreviousRecord: DiagnosticRecord = {
    id: 'DIG-SIMULADO-BASE',
    date: 'Hace 21 días',
    time: '10:00',
    companyInfo: currentRecord.companyInfo,
    responses: [],
    metrics: simulatedPreviousMetrics
  };

  const effectivePreviousRecord = (isDemoSimulation || !previousRecord) 
    ? simulatedPreviousRecord 
    : previousRecord;

  // Time calculations
  const calculateDaysElapsed = () => {
    if (isDemoSimulation || !previousRecord) return 21;
    if (currentRecord.timestamp && previousRecord.timestamp) {
      return Math.max(1, Math.round((currentRecord.timestamp - previousRecord.timestamp) / (1000 * 60 * 60 * 24)));
    }
    return 15;
  };

  const daysElapsed = calculateDaysElapsed();
  const currentMetrics = currentRecord.metrics;
  const prevMetrics = effectivePreviousRecord.metrics;
  const overallDelta = currentMetrics.general - prevMetrics.general;

  const currentLevel = getMaturityLevelI18n(currentMetrics.general);
  const prevLevel = getMaturityLevelI18n(prevMetrics.general);

  // Dimensions comparison list
  const dimensionsKeys: (keyof Omit<ScoreMetrics, 'general'>)[] = [
    'digitalizacion',
    'automatizacion',
    'innovacion',
    'circularidad',
    'trazabilidad',
    'gestion',
    'seguridad',
    'cultura'
  ];

  const dimensionComparison = dimensionsKeys.map(key => {
    const currentVal = currentMetrics[key] || 0;
    const prevVal = prevMetrics[key] || 0;
    const delta = currentVal - prevVal;
    return {
      key,
      name: t(`dim.${key}`, key),
      currentVal,
      prevVal,
      delta
    };
  }).sort((a, b) => b.delta - a.delta);

  const improvedCount = dimensionComparison.filter(d => d.delta > 0).length;
  const topImprovements = dimensionComparison.filter(d => d.delta > 0).slice(0, 3);
  const areasToReinforce = dimensionComparison.filter(d => d.currentVal < 60).slice(0, 3);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Simulation / Notice Banner */}
      {!previousRecord && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <strong className="font-bold block text-sm">
                {language === 'en' ? 'First Diagnostic Registered (Baseline)' : language === 'pt' ? 'Primeiro Diagnóstico Registrado (Linha de Base)' : 'Primer Diagnóstico Registrado (Línea Base)'}
              </strong>
              <p className="mt-0.5 text-amber-800 dark:text-amber-300/90 leading-relaxed">
                {language === 'en' 
                  ? 'To obtain real-world evolution data, re-evaluate your organization after 15 to 30 days. Meanwhile, you can explore this interactive demonstration of your projected growth.'
                  : language === 'pt'
                  ? 'Para obter dados reais de evolução, reavalie sua empresa após 15 a 30 dias. Enquanto isso, você pode explorar esta demonstração interativa do seu crescimento projetado.'
                  : 'Para obtener datos de evolución reales, realiza una re-evaluación transcurridos de 15 a 30 días. Mientras tanto, puedes explorar esta demostración interactiva de tu crecimiento proyectado.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoSimulation(!isDemoSimulation)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 cursor-pointer ${
              isDemoSimulation
                ? 'bg-amber-600 text-white border-amber-700 shadow-xs hover:bg-amber-700'
                : 'bg-white dark:bg-slate-900 text-amber-900 dark:text-amber-200 border-amber-300'
            }`}
          >
            {isDemoSimulation 
              ? (language === 'en' ? 'Demo Active' : language === 'pt' ? 'Demo Ativa' : 'Demostración Activa')
              : (language === 'en' ? 'Show Demo' : language === 'pt' ? 'Ver Demo' : 'Ver Demostración')}
          </button>
        </div>
      )}

      {/* When real previous record exists, show available selector if multiple */}
      {previousRecord && availablePreviousRecords.length > 1 && onSelectPreviousRecord && (
        <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          <span className="font-bold text-slate-600 dark:text-slate-300">
            {language === 'en' ? 'Comparing against:' : language === 'pt' ? 'Comparando com:' : 'Comparando contra:'}
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {availablePreviousRecords.map((rec) => (
              <button
                key={rec.id}
                onClick={() => onSelectPreviousRecord(rec)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  rec.id === effectivePreviousRecord.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {rec.date} ({rec.metrics.general}%)
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main KPI Progression Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Score Progression */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">
              {language === 'en' ? 'Overall Maturity' : language === 'pt' ? 'Maturidade Geral' : 'Madurez General'}
            </span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-mono text-slate-400 dark:text-slate-500 line-through">
              {prevMetrics.general}%
            </span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
            <span className="text-3xl font-black font-mono text-blue-600 dark:text-cyan-400">
              {currentMetrics.general}%
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-full ${
              overallDelta >= 0
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
            }`}>
              <ArrowUpRight className="w-3 h-3" />
              {overallDelta >= 0 ? `+${overallDelta}%` : `${overallDelta}%`}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {language === 'en' ? 'growth delta' : language === 'pt' ? 'ganho de maturidade' : 'ganancia neta'}
            </span>
          </div>
        </div>

        {/* Level Progression */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">
              {language === 'en' ? 'Maturity Stage' : language === 'pt' ? 'Estágio de Maturidade' : 'Nivel de Madurez'}
            </span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="space-y-1">
            <span className="text-xs text-slate-400 dark:text-slate-500 block">
              {prevLevel.title}
            </span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white block">
              ➔ {currentLevel.title}
            </span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {overallDelta > 0 
                ? (language === 'en' ? 'Progress achieved' : language === 'pt' ? 'Evolução atingida' : 'Evolución favorable')
                : (language === 'en' ? 'Stable tier' : language === 'pt' ? 'Estágio estável' : 'Etapa consolidada')}
            </span>
          </div>
        </div>

        {/* Time Elapsed */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">
              {language === 'en' ? 'Evaluation Period' : language === 'pt' ? 'Período Avaliado' : 'Periodo de Implementación'}
            </span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white">
              {daysElapsed} <span className="text-sm font-sans font-bold text-slate-500">{language === 'en' ? 'days' : language === 'pt' ? 'dias' : 'días'}</span>
            </div>
            <div className="text-[10.5px] text-slate-400 font-mono mt-0.5">
              {effectivePreviousRecord.date} ➔ {currentRecord.date}
            </div>
          </div>
          <div className="text-[11px] text-purple-600 dark:text-purple-400 font-bold">
            {daysElapsed >= 15 
              ? (language === 'en' ? 'Optimal follow-up window' : language === 'pt' ? 'Janela ideal de seguimento' : 'Ventana óptima de seguimiento')
              : (language === 'en' ? 'Early check-in' : language === 'pt' ? 'Acompanhamento inicial' : 'Seguimiento temprano')}
          </div>
        </div>

        {/* Improved Dimensions Count */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold uppercase tracking-wider text-[10px]">
              {language === 'en' ? 'Areas Improved' : language === 'pt' ? 'Áreas Melhoradas' : 'Dimensiones con Mejora'}
            </span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white">
              {improvedCount} <span className="text-base text-slate-400 font-normal">/ 8</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'en' ? 'Operational vectors advancing' : language === 'pt' ? 'Vetores operacionais em avanço' : 'Vectores de negocio con avance'}
            </div>
          </div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
            {improvedCount >= 4 ? '🚀 Transformación balanceada' : '🎯 Enfoque selectivo'}
          </div>
        </div>

      </div>

      {/* Visual Comparison: Radar Overlay & Dimensions Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Radar Dual Layer */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  {language === 'en' ? 'Symmetry Expansion' : language === 'pt' ? 'Expansão de Simetria' : 'Expansión de Simetría Tecnológica'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {language === 'en' ? 'Overlay: Baseline (dashed) vs Current' : language === 'pt' ? 'Sobreposição: Linha de Base (tracejada) vs Atual' : 'Superposición: Línea Base (punteada) vs Actual'}
                </p>
              </div>
            </div>
            
            <div className="py-2 flex items-center justify-center">
              <RadarChart 
                metrics={currentMetrics} 
                previousMetrics={prevMetrics}
                previousLabel={`${effectivePreviousRecord.date} (${prevMetrics.general}%)`}
                currentLabel={`${currentRecord.date} (${currentMetrics.general}%)`}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <strong className="text-slate-900 dark:text-white font-bold block text-[11px] uppercase tracking-wide">
              {language === 'en' ? 'Graphic Interpretation' : language === 'pt' ? 'Interpretação Gráfica' : 'Lectura del Perímetro'}
            </strong>
            <p className="text-[11px] leading-relaxed">
              {language === 'en'
                ? 'The outer colored area represents current progress. The expansion reflects workflows transitioned from manual ad-hoc routines to structured and automated practices.'
                : language === 'pt'
                ? 'A área colorida externa representa o progresso atual. A expansão reflete processos que deixaram de ser manuais e se tornaram estruturados e automatizados.'
                : 'El polígono exterior representa tu estado actual. La expansión demuestra procesos que dejaron de realizarse de manera manual o dispersa y ahora cuentan con herramientas o automatización.'}
            </p>
          </div>
        </div>

        {/* Dimension Breakdown Table & Growth Bars */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-0.5">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  {language === 'en' ? 'Dimension-by-Dimension Progress' : language === 'pt' ? 'Progresso por Dimensão' : 'Progreso Dimensión por Dimensión'}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {language === 'en' ? 'Ranked by highest net improvement' : language === 'pt' ? 'Ordenado por maior melhoria líquida' : 'Ordenado por mayor incremento obtenido'}
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-bold">
                8 / 8 {language === 'en' ? 'Dimensions' : language === 'pt' ? 'Dimensões' : 'Dimensiones'}
              </span>
            </div>

            <div className="space-y-3 pt-3">
              {dimensionComparison.map((dim) => (
                <div key={dim.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {dim.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-slate-400 dark:text-slate-500">
                        {dim.prevVal}%
                      </span>
                      <span className="text-slate-400">➔</span>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {dim.currentVal}%
                      </span>
                      <span className={`px-1.5 py-0.2 rounded font-black text-[10px] ${
                        dim.delta > 0
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                          : dim.delta === 0
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                      }`}>
                        {dim.delta > 0 ? `+${dim.delta}%` : `${dim.delta}%`}
                      </span>
                    </div>
                  </div>

                  {/* Dual Bar Progress */}
                  <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex relative">
                    {/* Baseline indicator */}
                    <div 
                      className="h-full bg-slate-300 dark:bg-slate-700 transition-all duration-500 rounded-full"
                      style={{ width: `${dim.prevVal}%` }}
                    />
                    {/* Current overlay delta */}
                    {dim.delta > 0 && (
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
                        style={{ width: `${dim.delta}%` }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wins & Focus Advisory */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40 text-xs space-y-1">
              <strong className="text-emerald-900 dark:text-emerald-300 font-bold block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {language === 'en' ? 'Top Improvements' : language === 'pt' ? 'Principais Ganhos' : 'Mayores Aciertos (Quick Wins)'}
              </strong>
              <p className="text-[10.5px] text-emerald-800 dark:text-emerald-300/80 leading-snug">
                {topImprovements.map(t => `${t.name} (+${t.delta}%)`).join(' • ') || 'Procesos en desarrollo'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-xs space-y-1">
              <strong className="text-blue-900 dark:text-blue-300 font-bold block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                {language === 'en' ? 'Next 15-30 Days Focus' : language === 'pt' ? 'Foco Próximos 15-30 Dias' : 'Prioridades a Reforzar'}
              </strong>
              <p className="text-[10.5px] text-blue-800 dark:text-blue-300/80 leading-snug">
                {areasToReinforce.map(t => `${t.name} (${t.currentVal}%)`).join(' • ') || 'Consolidar automatización'}
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* PDF Export Helper Action */}
      {onViewPrint && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-black text-sm uppercase tracking-wider">
              {language === 'en' ? 'Certified Evolution Report Included in PDF' : language === 'pt' ? 'Relatório de Evolução Certificado Incluído no PDF' : 'Informe Oficial de Evolución Certificado en PDF'}
            </h4>
            <p className="text-xs text-blue-100 max-w-xl leading-relaxed">
              {language === 'en'
                ? 'Your PDF report automatically integrates this temporal evolution audit, comparative tables, and the dual-polygon radar.'
                : language === 'pt'
                ? 'Seu relatório PDF integra automaticamente esta auditoria de evolução temporal, tabelas comparativas e o radar de dupla camada.'
                : 'Tu informe PDF oficial integra automáticamente esta auditoría de evolución temporal, la tabla comparativa de línea base vs re-evaluación y el radar de simetría.'}
            </p>
          </div>
          <button
            onClick={onViewPrint}
            className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs cursor-pointer transition-all flex items-center gap-2 shadow-sm shrink-0"
          >
            <FileDown className="w-4 h-4" />
            <span>{language === 'en' ? 'Generate Evolution PDF' : language === 'pt' ? 'Gerar PDF de Evolução' : 'Descargar PDF con Comparativa'}</span>
          </button>
        </div>
      )}

    </div>
  );
}
