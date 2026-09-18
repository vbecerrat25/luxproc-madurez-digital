import React from 'react';
import { Compass, Workflow, BadgeDollarSign, ShieldCheck, Users2, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';
import { DiagnosticRecord } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { calculateMacroAxes } from '../utils/macroAxes';

interface MacroAxesSummaryProps {
  record: DiagnosticRecord;
  isPrint?: boolean;
}

export default function MacroAxesSummary({ record, isPrint = false }: MacroAxesSummaryProps) {
  const { language } = useLanguage();
  const macroAxes = calculateMacroAxes(record, language);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5" />;
      case 'BadgeDollarSign':
        return <BadgeDollarSign className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Users2':
        return <Users2 className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-sm space-y-6 ${isPrint ? 'print:border-slate-300 print:shadow-none print:p-4' : ''}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/60 rounded-2xl shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-blue-600 dark:text-cyan-400 uppercase tracking-widest block">
              {language === 'en' ? 'Core Architecture' : language === 'pt' ? 'Arquitetura Estratégica' : 'Estructura Estratégica'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              {language === 'en' ? 'The 5 Strategic Macro-Axes of Business Transformation' : language === 'pt' ? 'Os 5 Macro-Eixos Estratégicos de Maturidade Digital' : 'Los 5 Macro-Ejes Estratégicos de Transformación Empresarial'}
            </h3>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/40">
          5 {language === 'en' ? 'Strategic Macro-Axes' : language === 'pt' ? 'Macro-Eixos' : 'Macro-Ejes Evaluados'}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {language === 'en'
          ? `Comprehensive synthesis consolidating the 8 operational dimensions of ${record.companyInfo.name} into five actionable pillars of business competitiveness:`
          : language === 'pt'
            ? `Síntese executiva que consolida as dimensões avaliadas da ${record.companyInfo.name} em cinco pilares fundamentais de competitividade empresarial:`
            : `Síntesis ejecutiva que consolida las 8 dimensiones evaluadas de ${record.companyInfo.name} en cinco pilares clave de competitividad y sostenibilidad empresarial:`}
      </p>

      {/* Grid of 5 Macro-Axes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {macroAxes.map((axis, index) => {
          let badgeClass = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
          let borderAccent = 'border-slate-200 dark:border-slate-800';

          if (axis.score >= 76) {
            badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900/50';
            borderAccent = 'border-emerald-200 dark:border-emerald-900/40';
          } else if (axis.score >= 51) {
            badgeClass = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900/50';
            borderAccent = 'border-blue-200 dark:border-blue-900/40';
          } else if (axis.score >= 26) {
            badgeClass = 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900/50';
            borderAccent = 'border-amber-200 dark:border-amber-900/40';
          } else {
            badgeClass = 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-900/50';
            borderAccent = 'border-rose-200 dark:border-rose-900/40';
          }

          return (
            <div
              key={axis.id}
              className={`p-5 rounded-2xl bg-slate-50/70 dark:bg-[#070d1a] border-2 ${borderAccent} flex flex-col justify-between space-y-4 hover:shadow-md transition-all ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                {/* Top bar with Icon and Score */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-[#0c1426] border border-slate-200/80 dark:border-slate-800 text-blue-600 dark:text-cyan-400 shadow-2xs">
                    {getIcon(axis.iconName)}
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
                      {axis.score}%
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border block mt-0.5 ${badgeClass}`}>
                      {axis.statusTag}
                    </span>
                  </div>
                </div>

                {/* Title and Description */}
                <h4 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                  {axis.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {axis.description}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
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

              {/* Diagnosis and priority */}
              <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800/80 space-y-1.5 text-xs">
                <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                  {axis.diagnosis}
                </p>
                <div className="text-[11px] text-blue-700 dark:text-cyan-400 font-semibold flex items-start gap-1 pt-1">
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{axis.priorityFocus}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
