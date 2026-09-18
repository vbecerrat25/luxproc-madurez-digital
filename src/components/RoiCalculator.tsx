import React, { useState } from 'react';
import { Calculator, Coins, Clock, TrendingUp, ShieldCheck, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { CompanyInfo, ScoreMetrics } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface RoiCalculatorProps {
  companyInfo: CompanyInfo;
  metrics: ScoreMetrics;
  isPrint?: boolean;
}

export default function RoiCalculator({ companyInfo, metrics, isPrint = false }: RoiCalculatorProps) {
  const { language, t } = useLanguage();

  // Initial staff estimate based on company size
  const defaultStaff = companyInfo.size === 'Micro' ? 3 : companyInfo.size === 'Pequeña' ? 10 : companyInfo.size === 'Mediana' ? 35 : 120;
  
  const [adminStaff, setAdminStaff] = useState<number>(defaultStaff);
  const [hourlyRate, setHourlyRate] = useState<number>(20); // S/ 20/hora por defecto

  // Automation & digitization gaps (lower score = higher potential hours saved by eliminating manual friction)
  const autoGap = Math.max(10, 100 - metrics.automatizacion);
  const digitGap = Math.max(10, 100 - metrics.digitalizacion);
  const avgGapFactor = (autoGap + digitGap) / 200; // 0.1 to 0.9

  // Estimated hours saved per employee per month (between 6 and 24 hours depending on gap)
  const hoursSavedPerEmployee = Math.round(6 + avgGapFactor * 18);
  const totalMonthlyHoursSaved = adminStaff * hoursSavedPerEmployee;
  const monthlySavings = totalMonthlyHoursSaved * hourlyRate;
  const annualSavings = monthlySavings * 12;

  // Expected error reduction percentage
  const errorReductionPercent = Math.min(45, Math.round(15 + avgGapFactor * 25));
  // Conversion uplift
  const conversionUplift = Math.min(30, Math.round(8 + ((100 - metrics.digitalizacion) / 100) * 18));

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-sm space-y-6 ${isPrint ? 'print:border-slate-300 print:shadow-none print:p-4' : ''}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
              {language === 'en' ? 'Economic Impact & Business Case' : language === 'pt' ? 'Impacto Econômico e Retorno' : 'Impacto Económico y Retorno'}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
              {language === 'en' ? 'Tangible ROI & Operational Savings Calculator' : language === 'pt' ? 'Calculadora de ROI e Economia Operacional' : 'Calculadora de Retorno de Inversión (ROI) y Ahorro Estimado'}
            </h3>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40">
          {language === 'en' ? 'Model: Hours Recovered' : language === 'pt' ? 'Modelo: Horas Recuperadas' : 'Modelo: Horas Recuperadas'}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {language === 'en' 
          ? `Based on your digital maturity scores, eliminating manual duplicate entries (receipts, stock sheets, untracked messages) recovers significant productive time for ${companyInfo.name}:`
          : language === 'pt'
            ? `Com base nas notas do diagnóstico, a eliminação de retrabalhos manuais (planilhas soltas, notas em papel, mensagens perdidas) libera tempo produtivo relevante para a ${companyInfo.name}:`
            : `Con base en sus calificaciones de madurez digital, la eliminación de reprocesos manuales (planillas dispersas, papel, cotizaciones sin seguimiento y recuentos físicos) libera tiempo productivo inmediato para ${companyInfo.name}:`}
      </p>

      {/* Interactive Controls (Hidden in Print mode, values static) */}
      {!isPrint && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#070d1a] border border-slate-200/80 dark:border-slate-800">
          {/* Slider 1: Staff */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {language === 'en' ? 'Admin, Sales & Operations Team:' : language === 'pt' ? 'Equipe em rotinas admin/vendas:' : 'Equipo en tareas administrativas y ventas:'}
              </span>
              <span className="font-mono font-black text-blue-600 dark:text-cyan-400 text-sm">
                {adminStaff} {language === 'en' ? 'people' : language === 'pt' ? 'colaboradores' : 'personas'}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={companyInfo.size === 'Grande' ? 250 : companyInfo.size === 'Mediana' ? 80 : 30}
              value={adminStaff}
              onChange={(e) => setAdminStaff(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>1</span>
              <span>{companyInfo.size === 'Grande' ? '250+' : companyInfo.size === 'Mediana' ? '80' : '30'}</span>
            </div>
          </div>

          {/* Slider 2: Hourly labor rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                {language === 'en' ? 'Estimated cost per hour (S/ / hr):' : language === 'pt' ? 'Custo estimado por hora (S/ / h):' : 'Costo estimado por hora (S/ / h):'}
              </span>
              <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                S/ {hourlyRate} / h
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={80}
              step={1}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>S/ 5 / h</span>
              <span>S/ 80 / h</span>
            </div>
          </div>
        </div>
      )}

      {/* Highlight KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Monthly Hours Saved */}
        <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
              {language === 'en' ? 'Hours Saved' : language === 'pt' ? 'Horas Poupadas' : 'Horas Recuperadas'}
            </span>
            <Clock className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
              {totalMonthlyHoursSaved} h
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
              {language === 'en' 
                ? `~${hoursSavedPerEmployee}h / month per person`
                : language === 'pt' 
                  ? `~${hoursSavedPerEmployee}h / mês por pessoa`
                  : `~${hoursSavedPerEmployee}h / mes por persona`}
            </span>
          </div>
        </div>

        {/* Metric 2: Monthly Monetary Savings */}
        <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              {language === 'en' ? 'Monthly Savings' : language === 'pt' ? 'Economia Mensal' : 'Ahorro Mensual'}
            </span>
            <Coins className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              S/ {monthlySavings.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
              {language === 'en' ? 'Estimated monthly value' : language === 'pt' ? 'Estimativa mensal' : 'Cálculo mensual estimado'}
            </span>
          </div>
        </div>

        {/* Metric 3: Annual Projection */}
        <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              {language === 'en' ? 'Annual Savings' : language === 'pt' ? 'Economia Anual' : 'Ahorro Anual'}
            </span>
            <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">
              S/ {annualSavings.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
              {language === 'en' ? 'Projected over 12 months' : language === 'pt' ? 'Projetado em 12 meses' : 'Proyección a 12 meses'}
            </span>
          </div>
        </div>

        {/* Metric 4: Commercial conversion */}
        <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              {language === 'en' ? 'Sales Conversion' : language === 'pt' ? 'Conversão Vendas' : 'Cierres de Venta'}
            </span>
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
              +{conversionUplift}%
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
              {language === 'en' ? 'Fast WhatsApp / CRM follow-up' : language === 'pt' ? 'Resposta ágil WhatsApp / CRM' : 'Por respuesta inmediata y CRM'}
            </span>
          </div>
        </div>

      </div>

      {/* Step-by-Step Transparent Mathematical Breakdown */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 dark:from-[#070d1a] dark:to-blue-950/20 border-2 border-blue-100 dark:border-blue-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>
              {language === 'en' ? 'Step-by-Step Transparent Formula Breakdown' : language === 'pt' ? 'Desdobramento Transparente do Cálculo Passo a Passo' : '¿Cómo se calcula este retorno? Fórmula Transparente Paso a Paso'}
            </span>
          </h4>
          <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-blue-100/70 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
            Perú (S/)
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {language === 'en'
            ? 'The economic benefit is measured directly from the administrative time currently spent on repetitive manual tasks (filling spreadsheets, chasing paper invoices, unorganized WhatsApp chats) that digital tools eliminate:'
            : language === 'pt'
              ? 'O retorno financeiro é calculado a partir das horas administrativas gastas hoje em controles manuais e retrabalhos (planilhas soltas, busca de notas fiscais, mensagens sem padrão) que a digitalização elimina:'
              : 'El retorno económico no es un número arbitrario: se sustenta en las horas de trabajo administrativo que hoy se pierden en reprocesos manuales (pasar datos a Excel, buscar comprobantes, conciliar depósitos, atender mensajes repetitivos) y que las herramientas digitales eliminan de inmediato:'}
        </p>

        {/* Step Formula Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {/* Step 1 */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1426] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                {language === 'en' ? 'Step 1: Recovered Hours' : language === 'pt' ? 'Passo 1: Horas Recuperadas' : 'Paso 1: Horas Recuperadas'}
              </span>
              <Clock className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
              <div className="flex justify-between py-0.5">
                <span>{language === 'en' ? 'Staff team:' : 'Colaboradores:'}</span>
                <strong>{adminStaff} pers.</strong>
              </div>
              <div className="flex justify-between py-0.5">
                <span>{language === 'en' ? 'Saved/person:' : 'Ahorro/persona:'}</span>
                <strong>~{hoursSavedPerEmployee} h / mes</strong>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-900 dark:text-white">{language === 'en' ? 'Total monthly:' : 'Total mensual:'}</span>
              <span className="text-sm font-black font-mono text-blue-600 dark:text-cyan-400">{totalMonthlyHoursSaved} horas / mes</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1426] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {language === 'en' ? 'Step 2: Monthly Value (S/)' : language === 'pt' ? 'Passo 2: Valor Mensal (S/)' : 'Paso 2: Valorización Mensual'}
              </span>
              <Coins className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
              <div className="flex justify-between py-0.5">
                <span>{language === 'en' ? 'Total hours:' : 'Total horas mes:'}</span>
                <strong>{totalMonthlyHoursSaved} h</strong>
              </div>
              <div className="flex justify-between py-0.5">
                <span>{language === 'en' ? 'Cost per hour:' : 'Costo por hora:'}</span>
                <strong>S/ {hourlyRate} / h</strong>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-900 dark:text-white">{language === 'en' ? 'Monthly savings:' : 'Ahorro al mes:'}</span>
              <span className="text-sm font-black font-mono text-emerald-600 dark:text-emerald-400">S/ {monthlySavings.toLocaleString()}</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#0c1426] border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                {language === 'en' ? 'Step 3: Annual Projection' : language === 'pt' ? 'Passo 3: Projeção Anual' : 'Paso 3: Proyección Anual'}
              </span>
              <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
              <div className="flex justify-between py-0.5">
                <span>{language === 'en' ? 'Monthly rate:' : 'Ahorro mensual:'}</span>
                <strong>S/ {monthlySavings.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between py-0.5">
                <span>{language === 'en' ? 'Time horizon:' : 'Horizonte anual:'}</span>
                <strong>× 12 meses</strong>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-900 dark:text-white">{language === 'en' ? 'Annual savings:' : 'Ahorro al año:'}</span>
              <span className="text-sm font-black font-mono text-purple-600 dark:text-purple-400">S/ {annualSavings.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <span>
            {language === 'en'
              ? 'Reference note: In Peru, a standard gross monthly salary between S/ 1,500 and S/ 2,400 (160 working hours) equates to approximately S/ 10 to S/ 16 / hour. For specialized managers or sales leads (S/ 3,000 to S/ 5,000 / month), the hourly rate is S/ 20 to S/ 32 / hour.'
              : language === 'pt'
                ? 'Nota de referência: No Peru, um salário mensal entre S/ 1.500 e S/ 2.400 (160 horas mensais) equivale a aproximadamente S/ 10 a S/ 16 / hora. Para cargos de coordenação ou especialistas (S/ 3.000 a S/ 5.000), o valor é de S/ 20 a S/ 32 / hora.'
                : 'Nota de referencia Perú: Un sueldo promedio de S/ 1,500 a S/ 2,400 al mes (160 horas laborales) equivale a un costo hora de S/ 10 a S/ 16 por hora. Para supervisores, jefaturas o analistas clave (S/ 3,000 a S/ 5,000 al mes), el costo hora oscila entre S/ 20 y S/ 32 por hora.'}
          </span>
        </div>
      </div>

    </div>
  );
}
