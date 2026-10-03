import React, { useState } from 'react';
import { 
  BarChart3, 
  Play, 
  ArrowRight, 
  Timer, 
  Info, 
  Target, 
  Zap, 
  FileDown, 
  BrainCircuit, 
  FileText, 
  ChevronRight, 
  Trash2,
  Clock,
  CheckCircle2,
  FileClock
} from 'lucide-react';
import { DiagnosticRecord } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import IsometricTechCity from './IsometricTechCity';
import HomeFeatureModals from './HomeFeatureModals';

interface HomeDashboardViewProps {
  currentUser: { email: string; name: string; picture?: string };
  completedRecords: DiagnosticRecord[];
  hasDraft: boolean;
  deletingId: string | null;
  onStartFresh: () => void;
  onResumeSurvey: () => void;
  onViewReport: (record: DiagnosticRecord) => void;
  onExportPdf: (record: DiagnosticRecord) => void;
  onDeleteRecord: (id: string) => void;
  onSetDeletingId: (id: string | null) => void;
}

export default function HomeDashboardView({
  currentUser,
  completedRecords,
  hasDraft,
  deletingId,
  onStartFresh,
  onResumeSurvey,
  onViewReport,
  onExportPdf,
  onDeleteRecord,
  onSetDeletingId,
}: HomeDashboardViewProps) {
  const { t, getMaturityLevelI18n } = useLanguage();
  const [modalType, setModalType] = useState<'free' | 'how-it-works' | 'pdf-sample' | 'improvement-plan' | 'info-maturity' | null>(null);

  // Filter user records by logged-in email
  const userRecords = completedRecords.filter(
    r => r.companyInfo.contactEmail.toLowerCase().trim() === currentUser.email.toLowerCase().trim()
  );
  const latestRecord = userRecords.length > 0 ? userRecords[0] : null;
  const latestScore = latestRecord ? latestRecord.metrics.general : 0;
  const latestLevel = latestRecord ? getMaturityLevelI18n(latestScore) : null;

  // Donut Gauge SVG calculation
  const gaugeRadius = 46;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeOffset = gaugeCircumference - (latestScore / 100) * gaugeCircumference;

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-500">
      
      {/* Draft Resume Alert (if user has an incomplete evaluation) */}
      {hasDraft && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 text-blue-950 dark:text-cyan-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold shadow-xs">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400 animate-pulse shrink-0" />
            <span>{t('home.draftPrompt', 'Tienes un diagnóstico parcial de tu empresa guardado. Retómalo ahora:')}</span>
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-center shrink-0">
            <button
              onClick={onResumeSurvey}
              className="px-4 py-1.5 sm:py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-all"
            >
              {t('home.resumeBtn', 'Reanudar')}
            </button>
            <button
              onClick={onStartFresh}
              className="px-3.5 py-1.5 sm:py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer transition-all"
            >
              {t('home.freshBtn', 'De Cero')}
            </button>
          </div>
        </div>
      )}

      {/* -----------------------------------------
          1. HERO SECTION: 2 CARDS IN TOP ROW
          ----------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* LEFT HERO BANNER (~68% on Desktop / 8 cols) */}
        <div id="tour-hero-card" className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-[#0c234b] via-[#0b3a6b] to-[#04596b] border border-cyan-500/20 shadow-xl relative overflow-hidden p-6 sm:p-7 md:p-8 flex flex-col justify-between text-white">
          
          {/* Subtle Cyber Grid & Ambient Highlights */}
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Row inside Hero: Badge + Quote */}
          <div className="flex items-center justify-between gap-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-cyan-400/30 text-cyan-300 text-[10px] font-black tracking-wider uppercase shadow-xs">
              <BarChart3 className="w-3 h-3 text-cyan-400" />
              <span>{t('home.badge', 'EVALUACIÓN AVANZADA 2026')}</span>
            </div>

            <p className="hidden sm:block text-[11px] text-cyan-200/85 italic font-medium max-w-[220px] text-right leading-tight">
              {t('home.quote', '"La digitalización no es un destino, es un proceso."')}
            </p>
          </div>

          {/* Middle Body: Headline + Copy + 3D Isometric Illustration */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-4 relative z-10">
            
            {/* Left Texts & CTA */}
            <div className="md:col-span-7 space-y-3">
              <h1 className="text-2xl sm:text-3xl xl:text-3.5xl font-black tracking-tight leading-tight">
                {t('home.title', 'Diagnóstico de Madurez Digital Empresarial')}
              </h1>
              
              <p className="text-xs sm:text-[13px] text-blue-100/85 leading-relaxed max-w-md">
                {t('home.subtitle', 'Conoce el nivel de transformación digital de tu empresa mediante una evaluación de 20 dimensiones críticas de negocio.')}
              </p>

              {/* Start Diagnosis Button */}
              <div className="pt-2">
                <button
                  id="tour-start-diag-btn"
                  onClick={onStartFresh}
                  className="group px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 hover:from-blue-400 hover:to-teal-300 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{t('home.startBtn', 'Comenzar Diagnóstico')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right 3D Isometric Building City Graphic */}
            <div className="md:col-span-5 flex items-center justify-center">
              <IsometricTechCity />
            </div>

          </div>

          {/* Bottom Duration Badge */}
          <div className="flex items-center gap-1.5 text-[11px] text-cyan-200/90 font-medium relative z-10 mt-1">
            <Timer className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('home.estimatedTime', 'Tiempo estimado:')} <strong>{t('home.estimatedTimeVal', '10 a 15 minutos')}</strong></span>
          </div>

        </div>

        {/* RIGHT WIDGET: "Tu nivel de madurez digital" (~32% on Desktop / 4 cols) */}
        <div id="tour-maturity-widget" className="lg:col-span-4 rounded-3xl bg-white dark:bg-[#0d1629] border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          
          {/* Header of Widget */}
          <div className="flex items-center justify-between gap-2 pb-2">
            <h3 className="font-extrabold text-xs text-slate-800 dark:text-slate-100">
              {t('home.maturityTitle', 'Tu nivel de madurez digital')}
            </h3>
            <button
              onClick={() => setModalType('info-maturity')}
              className="text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors p-1 cursor-pointer"
              title={t('home.maturityInfoTitle', 'Información sobre la escala de madurez')}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {/* Circular Donut Gauge Graphic */}
          <div className="py-4 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                {/* Background Ring */}
                <circle
                  cx="60"
                  cy="60"
                  r={gaugeRadius}
                  className="text-slate-100 dark:text-slate-800"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                />
                {/* Progress Active Ring */}
                <circle
                  cx="60"
                  cy="60"
                  r={gaugeRadius}
                  className="text-blue-500 dark:text-cyan-400 transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={gaugeCircumference}
                  strokeDashoffset={latestScore > 0 ? gaugeOffset : gaugeCircumference}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                />
              </svg>

              {/* Central Text inside Gauge */}
              <div className="absolute flex flex-col items-center justify-center text-center select-none">
                <span className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                  {latestScore}%
                </span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                  {latestLevel ? latestLevel.title : t('home.completedStatus', 'Completado')}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Sub-card Status Notice */}
          <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-start gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100/70 text-blue-600 dark:bg-blue-900/50 dark:text-cyan-400 shrink-0 mt-0.5">
              <Target className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              {latestRecord ? (
                <>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 font-medium leading-tight truncate">
                    {t('home.latestAssessment', 'Última evaluación:')} <strong>{latestRecord.companyInfo.name}</strong>
                  </p>
                  <button
                    onClick={() => onViewReport(latestRecord)}
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    <span>{t('home.viewAnalysis', 'Ver resultados y análisis')}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                    {t('home.savedEmpty', 'Aún no has registrado ningún diagnóstico con tu correo.')}
                  </p>
                  <button
                    onClick={onStartFresh}
                    className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
                  >
                    <span>{t('home.savedEvaluateNow', 'Realizar evaluación ahora')}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* -----------------------------------------
          2. FOUR BENEFIT CARDS (4-COLUMN ROW)
          ----------------------------------------- */}
      <div id="tour-benefit-cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: 100% Gratuito */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0d1629] border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group">
          {/* Subtle Bottom-Right Wave Accent */}
          <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/20 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-cyan-400 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center mb-3.5">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">{t('home.featureFreeTitle', '100% Gratuito')}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {t('home.featureFreeDesc', 'Acceso ilimitado para cualquier sector productivo o comercial.')}
            </p>
          </div>

          <button
            onClick={() => setModalType('free')}
            className="mt-4 inline-flex items-center gap-1 text-[11px] font-extrabold text-blue-600 dark:text-cyan-400 group-hover:gap-1.5 transition-all cursor-pointer text-left"
          >
            <span>{t('home.learnMore', 'Conocer más')}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 2: Resultado Inmediato */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0d1629] border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400/10 to-teal-400/20 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-center mb-3.5">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">{t('home.featureInstantTitle', 'Resultado Inmediato')}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {t('home.featureInstantDesc', 'Obtén tus calificaciones por ejes al instante de enviar tus respuestas.')}
            </p>
          </div>

          <button
            onClick={() => setModalType('how-it-works')}
            className="mt-4 inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 group-hover:gap-1.5 transition-all cursor-pointer text-left"
          >
            <span>{t('home.seeHowItWorks', 'Ver cómo funciona')}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 3: Informe PDF Completo */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0d1629] border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br from-purple-400/10 to-indigo-400/20 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-100 dark:border-purple-900/60 flex items-center justify-center mb-3.5">
              <FileDown className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">{t('home.featurePdfTitle', 'Informe PDF Completo')}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {t('home.featurePdfDesc', 'Descarga un documento formal con portada y resumen ejecutivo.')}
            </p>
          </div>

          <button
            onClick={() => {
              if (latestRecord) {
                onExportPdf(latestRecord);
              } else {
                setModalType('pdf-sample');
              }
            }}
            className="mt-4 inline-flex items-center gap-1 text-[11px] font-extrabold text-purple-600 dark:text-purple-400 group-hover:gap-1.5 transition-all cursor-pointer text-left"
          >
            <span>{latestRecord ? t('home.downloadPdf', 'Descargar PDF') : t('home.downloadSample', 'Descargar ejemplo')}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 4: Plan de Mejora */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#0d1629] border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group">
          <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br from-fuchsia-400/10 to-pink-400/20 blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

          <div>
            <div className="w-10 h-10 rounded-2xl bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/60 dark:text-fuchsia-400 border border-fuchsia-100 dark:border-fuchsia-900/60 flex items-center justify-center mb-3.5">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">{t('home.featureRoadmapTitle', 'Plan de Mejora')}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {t('home.featureRoadmapDesc', 'Recomendaciones automatizadas y estructuradas en fases cronológicas.')}
            </p>
          </div>

          <button
            onClick={() => {
              if (latestRecord) {
                onViewReport(latestRecord);
              } else {
                setModalType('improvement-plan');
              }
            }}
            className="mt-4 inline-flex items-center gap-1 text-[11px] font-extrabold text-fuchsia-600 dark:text-fuchsia-400 group-hover:gap-1.5 transition-all cursor-pointer text-left"
          >
            <span>{t('home.viewPlan', 'Ver plan de mejora')}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

      {/* -----------------------------------------
          3. MIS DIAGNÓSTICOS GUARDADOS
          ----------------------------------------- */}
      <div id="tour-saved-history" className="pt-3 space-y-3">
        {/* Title */}
        <div>
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>{t('home.savedTitle', 'Mis Diagnósticos Guardados')}</span>
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-none mt-0.5">
            {t('home.savedSubtitle', 'Historial de evaluaciones guardadas para consultar o descargar cuando lo desees.')}
          </p>
        </div>

        {/* List of Saved Records or Empty State */}
        {userRecords.length === 0 ? (
          <div className="p-7 sm:p-8 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#0d1629]/40 flex flex-col items-center justify-center gap-2">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-cyan-400 flex items-center justify-center">
              <FileClock className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {t('home.savedEmpty', 'Aún no has registrado ningún diagnóstico con tu correo.')}
            </p>
            <button
              onClick={onStartFresh}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline cursor-pointer"
            >
              <span>{t('home.savedEvaluateNow', 'Realizar evaluación ahora')}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {userRecords.map((rec) => {
              const level = getMaturityLevelI18n(rec.metrics.general);
              return (
                <div 
                  key={rec.id} 
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1629] shadow-xs flex flex-col justify-between gap-3 hover:border-blue-400 dark:hover:border-blue-700 transition-all"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 font-mono block leading-none">{rec.date} • {rec.time}</span>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white mt-1 truncate max-w-[180px]">{rec.companyInfo.name}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                        {t(`sector.${rec.companyInfo.sector}`, rec.companyInfo.sector)} • {t(`size.${rec.companyInfo.size}`, rec.companyInfo.size)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xl font-black text-blue-600 dark:text-cyan-400 block leading-none">{rec.metrics.general}%</span>
                      <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mt-0.5">{level.title}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
                    <button
                      onClick={() => onViewReport(rec)}
                      className="flex-1 py-1.5 px-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-950/70 text-blue-600 dark:text-cyan-400 font-bold text-xs cursor-pointer transition-all text-center border border-blue-100 dark:border-blue-900/30"
                    >
                      {t('home.viewReport', 'Ver Informe')}
                    </button>
                    <button
                      onClick={() => onExportPdf(rec)}
                      className="flex-1 py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer transition-all text-center"
                    >
                      {t('home.exportPdf', 'Exportar PDF')}
                    </button>
                    {deletingId === rec.id ? (
                      <div className="flex items-center gap-1 shrink-0 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 rounded-xl p-0.5 animate-in fade-in duration-150">
                        <button
                          onClick={() => onDeleteRecord(rec.id)}
                          className="py-1 px-2 rounded-lg bg-rose-600 text-white font-extrabold text-[10px] hover:bg-rose-500 transition-all cursor-pointer"
                        >
                          Borrar
                        </button>
                        <button
                          onClick={() => onSetDeletingId(null)}
                          className="py-1 px-2 rounded-lg text-slate-600 dark:text-slate-400 font-bold text-[10px] hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSetDeletingId(rec.id)}
                        title="Eliminar este diagnóstico"
                        className="p-1.5 rounded-xl border border-rose-200 dark:border-rose-950 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer flex items-center justify-center shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Information Modals */}
      <HomeFeatureModals
        type={modalType}
        onClose={() => setModalType(null)}
        onStartSurvey={onStartFresh}
        onViewResults={latestRecord ? () => onViewReport(latestRecord) : undefined}
        hasRecord={!!latestRecord}
      />

    </div>
  );
}
