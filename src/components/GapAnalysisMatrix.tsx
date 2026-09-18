import React from 'react';
import { Target, TrendingDown, TrendingUp, Minus, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { DiagnosticRecord, SectorType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { calculateMacroAxes } from '../utils/macroAxes';

interface GapAnalysisMatrixProps {
  record: DiagnosticRecord;
  isPrint?: boolean;
}

export default function GapAnalysisMatrix({ record, isPrint = false }: GapAnalysisMatrixProps) {
  const { language } = useLanguage();
  const macroAxes = calculateMacroAxes(record, language);

  // Find the most critical gap
  const criticalGapAxis = [...macroAxes].sort((a, b) => a.diff - b.diff)[0];
  // Find the top competitive advantage
  const topAdvantageAxis = [...macroAxes].sort((a, b) => b.diff - a.diff)[0];

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-sm space-y-6 ${isPrint ? 'print:border-slate-300 print:shadow-none print:p-4' : ''}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-900/60 rounded-2xl shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest block">
              {language === 'en' ? 'Sector Competitive Benchmarking' : language === 'pt' ? 'Benchmarking Setorial' : 'Comparativa Sectorial de Mercado'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              {language === 'en' ? 'Gap Analysis vs. Industry Average' : language === 'pt' ? 'Matriz de Brechas (Gap Analysis) vs. Setor' : 'Matriz de Brechas (Gap Analysis) vs. Su Sector'}
            </h3>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          {language === 'en' ? 'Benchmark Sector:' : language === 'pt' ? 'Setor Referência:' : 'Sector de Referencia:'} <strong>{record.companyInfo.sector}</strong>
        </span>
      </div>

      {/* Synthesis Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Critical Gap Card */}
        <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
              {language === 'en' ? 'Most Critical Sector Gap' : language === 'pt' ? 'Brecha Mais Crítica do Negócio' : 'Brecha Más Crítica vs. El Sector'}
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {criticalGapAxis.name} ({criticalGapAxis.diff > 0 ? `+${criticalGapAxis.diff}%` : `${criticalGapAxis.diff}%`})
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {criticalGapAxis.priorityFocus}
            </p>
          </div>
        </div>

        {/* Advantage Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
              {language === 'en' ? 'Key Competitive Strength' : language === 'pt' ? 'Principal Força Competitiva' : 'Principal Ventaja Competitiva'}
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
              {topAdvantageAxis.name} ({topAdvantageAxis.diff > 0 ? `+${topAdvantageAxis.diff}%` : `${topAdvantageAxis.diff}%`})
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {topAdvantageAxis.diagnosis}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Axis Breakdown Table / List */}
      <div className="space-y-4">
        {macroAxes.map((axis) => {
          const isAhead = axis.diff >= 5;
          const isParity = axis.diff >= -5 && axis.diff < 5;
          const isLagging = axis.diff < -5;

          return (
            <div
              key={axis.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50/60 dark:bg-[#070d1a] border border-slate-200/80 dark:border-slate-800 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {axis.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {axis.description}
                  </p>
                </div>
                
                {/* Semaphore Pill */}
                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  {isAhead ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
                      <TrendingUp className="w-3 h-3" />
                      <span>{language === 'en' ? 'Ahead (+ ' : language === 'pt' ? 'Adiantado (+ ' : 'Adelantado (+ '}{axis.diff}%)</span>
                    </span>
                  ) : isParity ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40">
                      <Minus className="w-3 h-3" />
                      <span>{language === 'en' ? 'Industry Parity' : language === 'pt' ? 'Na Média' : 'En Paridad'} ({axis.diff >= 0 ? `+${axis.diff}%` : `${axis.diff}%`})</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40">
                      <TrendingDown className="w-3 h-3" />
                      <span>{language === 'en' ? 'Lagging (' : language === 'pt' ? 'Abaixo da Média (' : 'Rezagado ('}{axis.diff}%)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bars comparing Enterprise vs Sector */}
              <div className="space-y-2 pt-1">
                {/* Enterprise Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                    <span>{record.companyInfo.name}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{axis.score}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        axis.score >= 76
                          ? 'bg-emerald-500'
                          : axis.score >= 51
                            ? 'bg-blue-500'
                            : axis.score >= 26
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.max(5, axis.score)}%` }}
                    />
                  </div>
                </div>

                {/* Sector Benchmark Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                    <span>{language === 'en' ? 'Sector Average (' : language === 'pt' ? 'Média do Setor (' : 'Promedio del Sector ('}{record.companyInfo.sector})</span>
                    <span className="font-mono font-bold text-slate-600 dark:text-slate-400">{axis.benchmark}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200/70 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-400 dark:bg-slate-500 rounded-full"
                      style={{ width: `${Math.max(5, axis.benchmark)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Specific Recommendation */}
              <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                <strong className="text-slate-900 dark:text-white shrink-0">
                  {language === 'en' ? 'Immediate Action:' : language === 'pt' ? 'Ação Imediata:' : 'Acción Inmediata:'}
                </strong>
                <span>{axis.priorityFocus}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
