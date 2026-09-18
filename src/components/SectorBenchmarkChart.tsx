import React, { useState, useMemo } from 'react';
import { ScoreMetrics, SectorType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Sparkles, 
  BarChart2, 
  RotateCcw, 
  Sliders, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  Building2
} from 'lucide-react';

interface SectorBenchmarkChartProps {
  metrics: ScoreMetrics;
  sector: SectorType;
  isPrint?: boolean;
}

// Industry benchmarks by sector (empirical reference based on regional digital maturity studies)
export const SECTOR_BENCHMARKS: Record<SectorType, Record<string, number>> = {
  'Comercio': { digitalizacion: 72, automatizacion: 54, innovacion: 58, circularidad: 42, trazabilidad: 64, gestion: 68, seguridad: 70, cultura: 62 },
  'Servicios': { digitalizacion: 78, automatizacion: 48, innovacion: 65, circularidad: 38, trazabilidad: 46, gestion: 72, seguridad: 74, cultura: 70 },
  'Manufactura': { digitalizacion: 54, automatizacion: 76, innovacion: 62, circularidad: 64, trazabilidad: 72, gestion: 65, seguridad: 78, cultura: 56 },
  'Tecnología': { digitalizacion: 88, automatizacion: 80, innovacion: 85, circularidad: 52, trazabilidad: 75, gestion: 82, seguridad: 88, cultura: 86 },
  'Agropecuario': { digitalizacion: 44, automatizacion: 52, innovacion: 50, circularidad: 60, trazabilidad: 80, gestion: 56, seguridad: 58, cultura: 48 },
  'Construcción': { digitalizacion: 48, automatizacion: 58, innovacion: 48, circularidad: 54, trazabilidad: 68, gestion: 60, seguridad: 70, cultura: 50 },
  'Otro': { digitalizacion: 60, automatizacion: 56, innovacion: 56, circularidad: 50, trazabilidad: 60, gestion: 62, seguridad: 66, cultura: 60 }
};

export const SECTOR_DESCRIPTIONS: Record<SectorType, { es: string; en: string; pt: string }> = {
  'Comercio': {
    es: 'Enfocado en omnicanalidad, e-commerce, gestión inteligente de inventarios y logística de última milla.',
    en: 'Focused on omnichannel presence, e-commerce, smart stock management, and last-mile logistics.',
    pt: 'Focado em omnichannel, e-commerce, gestão inteligente de estoques e logística de entrega.'
  },
  'Servicios': {
    es: 'Prioriza CRM corporativo, digitalización de pagos, agilidad de procesos remotos y experiencia del cliente.',
    en: 'Prioritizes corporate CRM, digital billing, remote workflows, and customer experience.',
    pt: 'Prioriza CRM corporativo, faturamento digital, trabalho remoto e experiência do cliente.'
  },
  'Manufactura': {
    es: 'Lidera en automatización de planta (OT/IT), control de calidad digital, trazabilidad y mantenimiento predictivo.',
    en: 'Leads in plant automation (OT/IT), digital quality control, traceability, and predictive maintenance.',
    pt: 'Lidera em automação industrial (OT/IT), controle de qualidade digital e manutenção preditiva.'
  },
  'Tecnología': {
    es: 'Máxima madurez en nube, adopción continua de IA, metodologías ágiles y ciberseguridad avanzada.',
    en: 'Highest maturity in cloud, continuous AI adoption, agile delivery, and advanced cybersecurity.',
    pt: 'Máxima maturidade em nuvem, IA contínua, metodologias ágeis e cibersegurança avançada.'
  },
  'Agropecuario': {
    es: 'Fuerte foco en trazabilidad de cosechas/lotes, sustentabilidad circular y sensores de monitoreo de campo.',
    en: 'Strong focus on batch traceability, circular sustainability, and agricultural sensors/monitoring.',
    pt: 'Forte foco em rastreabilidade de safras/lotes, sustentabilidade circular e sensores de campo.'
  },
  'Construcción': {
    es: 'Digitalización orientada a software de planos y presupuestos (BIM), seguridad laboral y control de obra.',
    en: 'Digitization geared towards project estimation software (BIM), work site safety, and logistics.',
    pt: 'Digitalização voltada a softwares de orçamentos (BIM), segurança no canteiro e controle de obras.'
  },
  'Otro': {
    es: 'Promedio representativo multisectorial de pequeñas y medianas empresas de la región.',
    en: 'Representative cross-industry benchmark for regional small and medium enterprises.',
    pt: 'Média representativa multissetorial para pequenas e médias empresas da região.'
  }
};

const ALL_SECTORS: SectorType[] = ['Comercio', 'Servicios', 'Manufactura', 'Tecnología', 'Agropecuario', 'Construcción', 'Otro'];

export default function SectorBenchmarkChart({ metrics, sector, isPrint = false }: SectorBenchmarkChartProps) {
  const { language, t } = useLanguage();

  // Dynamic interactive state
  const [selectedSector, setSelectedSector] = useState<SectorType>(sector || 'Comercio');
  const [viewMode, setViewMode] = useState<'bars' | 'radar' | 'simulator'>('bars');
  const [hoveredAxisKey, setHoveredAxisKey] = useState<string | null>(null);

  // Simulation adjustments state (allows adjusting scores live)
  const [simulatedDeltas, setSimulatedDeltas] = useState<Record<string, number>>({
    digitalizacion: 0,
    automatizacion: 0,
    innovacion: 0,
    circularidad: 0,
    trazabilidad: 0,
    gestion: 0,
    seguridad: 0,
    cultura: 0
  });

  const hasSimulation = useMemo(() => {
    return Object.values(simulatedDeltas).some(val => val !== 0);
  }, [simulatedDeltas]);

  const handleResetSimulation = () => {
    setSimulatedDeltas({
      digitalizacion: 0,
      automatizacion: 0,
      innovacion: 0,
      circularidad: 0,
      trazabilidad: 0,
      gestion: 0,
      seguridad: 0,
      cultura: 0
    });
  };

  const handleDeltaChange = (key: string, deltaVal: number) => {
    setSimulatedDeltas(prev => ({
      ...prev,
      [key]: deltaVal
    }));
  };

  // Effective metrics with live simulation applied
  const effectiveMetrics = useMemo(() => {
    const updated: ScoreMetrics = { ...metrics };
    (Object.keys(simulatedDeltas) as (keyof ScoreMetrics)[]).forEach((k) => {
      if (typeof updated[k] === 'number') {
        const base = metrics[k] || 0;
        const adjusted = Math.min(100, Math.max(0, base + (simulatedDeltas[k as string] || 0)));
        (updated as unknown as Record<string, number>)[k] = adjusted;
      }
    });
    // Recalculate general score if simulation is applied
    if (hasSimulation) {
      const vals = [
        updated.digitalizacion,
        updated.automatizacion,
        updated.innovacion,
        updated.circularidad,
        updated.trazabilidad,
        updated.gestion,
        updated.seguridad,
        updated.cultura
      ];
      updated.general = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    }
    return updated;
  }, [metrics, simulatedDeltas, hasSimulation]);

  const benchmarks = SECTOR_BENCHMARKS[selectedSector] || SECTOR_BENCHMARKS['Otro'];

  const axes: { key: keyof ScoreMetrics; label: string; desc: string; icon: string }[] = [
    { 
      key: 'digitalizacion', 
      label: t('dim.digitalizacion') || 'Digitalización',
      desc: language === 'en' ? 'Core systems, cloud storage, paperless processes' : language === 'pt' ? 'Sistemas em nuvem, arquivos digitais e processos sem papel' : 'Sistemas en la nube, archivos digitales y procesos sin papel.',
      icon: '🌐'
    },
    { 
      key: 'automatizacion', 
      label: t('dim.automatizacion') || 'Automatización',
      desc: language === 'en' ? 'Automated workflows, bots, and robotic process automation' : language === 'pt' ? 'Automação de tarefas repetitivas e rotinas inteligentes' : 'Flujos automatizados, alertas y eliminación de tareas repetitivas.',
      icon: '⚡'
    },
    { 
      key: 'innovacion', 
      label: t('dim.innovacion') || 'Innovación',
      desc: language === 'en' ? 'Speed to test ideas, budget for tech, digital roadmap' : language === 'pt' ? 'Velocidade de testes, orçamento de TI e roadmap digital' : 'Velocidad para probar ideas, presupuesto tecnológico y estrategia digital.',
      icon: '💡'
    },
    { 
      key: 'circularidad', 
      label: t('dim.circularidad') || 'Circularidad',
      desc: language === 'en' ? 'E-waste recycling, green tech, and sustainable operations' : language === 'pt' ? 'Descarte ecológico de hardware e sustentabilidade' : 'Reciclaje de equipos tecnológicos y sostenibilidad ambiental.',
      icon: '🌱'
    },
    { 
      key: 'trazabilidad', 
      label: t('dim.trazabilidad') || 'Trazabilidad',
      desc: language === 'en' ? 'Batch tracking, QR/barcodes, supply chain visibility' : language === 'pt' ? 'Rastreio de lotes, códigos QR e visibilidade da cadeia' : 'Seguimiento por códigos QR/barras y trazabilidad de pedidos.',
      icon: '📦'
    },
    { 
      key: 'gestion', 
      label: t('dim.gestion') || 'Gestión',
      desc: language === 'en' ? 'Electronic invoicing, accounting software, and admin cloud' : language === 'pt' ? 'Faturamento eletrônico e gestão contábil integrada' : 'Facturación electrónica, gestión contable y administración en la nube.',
      icon: '📊'
    },
    { 
      key: 'seguridad', 
      label: t('dim.seguridad') || 'Seguridad',
      desc: language === 'en' ? 'Access control, 2FA, data backups, and cyber protection' : language === 'pt' ? 'Backups automáticos, 2FA e proteção de dados confidenciais' : 'Copias de seguridad, doble factor (2FA) y protección de datos.',
      icon: '🛡️'
    },
    { 
      key: 'cultura', 
      label: t('dim.cultura') || 'Cultura Digital',
      desc: language === 'en' ? 'Team tech dexterity, eagerness to learn, and change agility' : language === 'pt' ? 'Disposição da equipe para adotar softwares e aprender' : 'Disposición del equipo para aprender y adoptar nuevas herramientas.',
      icon: '👥'
    }
  ];

  // Comparative KPIs
  const comparisonStats = useMemo(() => {
    let companySum = 0;
    let sectorSum = 0;
    let leading = 0;
    let lagging = 0;

    let bestLead = { key: '', delta: -Infinity, name: '' };
    let biggestGap = { key: '', delta: Infinity, name: '' };

    axes.forEach(axis => {
      const cScore = effectiveMetrics[axis.key] || 0;
      const sScore = benchmarks[axis.key as string] || 0;
      const delta = cScore - sScore;

      companySum += cScore;
      sectorSum += sScore;

      if (delta >= 0) {
        leading++;
      } else {
        lagging++;
      }

      if (delta > bestLead.delta) {
        bestLead = { key: axis.key as string, delta, name: axis.label };
      }
      if (delta < biggestGap.delta) {
        biggestGap = { key: axis.key as string, delta, name: axis.label };
      }
    });

    const companyAvg = Math.round(companySum / axes.length);
    const sectorAvg = Math.round(sectorSum / axes.length);
    const netDelta = companyAvg - sectorAvg;

    return {
      companyAvg,
      sectorAvg,
      netDelta,
      leading,
      lagging,
      bestLead,
      biggestGap
    };
  }, [effectiveMetrics, benchmarks, axes]);

  // ==========================================
  // PRINT VERSION (Clean High-Contrast SVG)
  // ==========================================
  if (isPrint) {
    const width = 640;
    const height = 290;
    const paddingLeft = 130;
    const paddingRight = 55;
    const paddingTop = 20;
    const paddingBottom = 30;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;
    const ticks = [0, 25, 50, 75, 100];

    return (
      <div className="w-full flex flex-col items-center text-black">
        <div className="w-full flex justify-center overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto"
            style={{ width: '100%', maxWidth: `${width}px`, height: 'auto', display: 'block' }}
          >
            {/* Grid lines */}
            {ticks.map((tick) => {
              const x = paddingLeft + (tick / 100) * chartWidth;
              return (
                <g key={`grid-${tick}`}>
                  <line
                    x1={x}
                    y1={paddingTop}
                    x2={x}
                    y2={paddingTop + chartHeight}
                    stroke="#cbd5e1"
                    strokeWidth="1"
                    strokeDasharray={tick === 0 ? 'none' : '3 3'}
                  />
                  <text
                    x={x}
                    y={paddingTop + chartHeight + 14}
                    textAnchor="middle"
                    fill="#475569"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="monospace, monospace"
                  >
                    {tick}%
                  </text>
                </g>
              );
            })}

            {/* Render bar pairs */}
            {axes.map((axis, index) => {
              const yOffset = paddingTop + (index * chartHeight) / axes.length;
              const barPairHeight = chartHeight / axes.length - 8;

              const companyScore = metrics[axis.key] || 0;
              const benchmarkScore = benchmarks[axis.key as string] || 0;

              const companyWidth = (companyScore / 100) * chartWidth;
              const benchmarkWidth = (benchmarkScore / 100) * chartWidth;

              const singleBarHeight = Math.floor(barPairHeight / 2) - 1;
              const barY1 = yOffset;
              const barY2 = yOffset + singleBarHeight + 2;

              return (
                <g key={axis.key}>
                  <text
                    x={paddingLeft - 10}
                    y={yOffset + barPairHeight / 2}
                    textAnchor="end"
                    dominantBaseline="central"
                    fill="#0f172a"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="system-ui, sans-serif"
                  >
                    {axis.label}
                  </text>

                  {/* Company Bar */}
                  <rect
                    x={paddingLeft}
                    y={barY1}
                    width={Math.max(companyWidth, 2)}
                    height={singleBarHeight}
                    rx={2}
                    fill="#1e293b"
                  />
                  <text
                    x={paddingLeft + companyWidth + 5}
                    y={barY1 + singleBarHeight / 2}
                    dominantBaseline="central"
                    fill="#0f172a"
                    fontSize="10"
                    fontWeight="800"
                    fontFamily="monospace, monospace"
                  >
                    {companyScore}%
                  </text>

                  {/* Sector Benchmark Bar */}
                  <rect
                    x={paddingLeft}
                    y={barY2}
                    width={Math.max(benchmarkWidth, 2)}
                    height={singleBarHeight}
                    rx={2}
                    fill="#94a3b8"
                  />
                  <text
                    x={paddingLeft + benchmarkWidth + 5}
                    y={barY2 + singleBarHeight / 2}
                    dominantBaseline="central"
                    fill="#475569"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="monospace, monospace"
                  >
                    {benchmarkScore}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex justify-center items-center gap-6 mt-3 text-xs font-semibold text-gray-900">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-slate-900" />
            <span>{t('admin.colCompany') || 'Tu Empresa'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-slate-400" />
            <span>{t('dashboard.benchmarkTitle') || 'Promedio Sectorial'} ({t(`sector.${sector}`) || sector})</span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // LIVE INTERACTIVE & REAL-TIME DASHBOARD VIEW
  // ==========================================
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">

      {/* 1. SECTOR SELECTOR PILLS (Real-time switching) */}
      <div className="p-4 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              {language === 'en' ? 'Select Comparison Sector (Live Benchmarking):' : language === 'pt' ? 'Selecionar Setor de Comparação (Tempo Real):' : 'Selecciona el Sector de Comparación (En Tiempo Real):'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
            {language === 'en' ? 'Click any sector to dynamically update charts' : language === 'pt' ? 'Clique em qualquer setor para atualizar os gráficos' : 'Haz clic en cualquier sector para ver la diferencia'}
          </span>
        </div>

        {/* Sector Buttons */}
        <div className="flex flex-wrap gap-2 pt-1">
          {ALL_SECTORS.map((sec) => {
            const isSelected = selectedSector === sec;
            const isActualSector = sector === sec;

            return (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]'
                    : 'bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{t(`sector.${sec}`) || sec}</span>
                {isActualSector && (
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-full border ${
                    isSelected ? 'bg-white/20 text-white border-white/30' : 'bg-blue-500/10 text-blue-600 dark:text-cyan-400 border-blue-500/20'
                  }`}>
                    {language === 'en' ? 'Your Sector' : language === 'pt' ? 'Seu Setor' : 'Tu Sector'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed">
          <strong className="text-slate-700 dark:text-slate-300 font-bold">{t(`sector.${selectedSector}`) || selectedSector}:</strong>{' '}
          {SECTOR_DESCRIPTIONS[selectedSector]?.[language] || SECTOR_DESCRIPTIONS['Otro'][language]}
        </p>
      </div>

      {/* 2. REAL-TIME DIFFERENTIAL KPIS SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Company Average */}
        <div className="p-4 rounded-2xl border-2 border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {language === 'en' ? 'Your Company Score' : language === 'pt' ? 'Sua Empresa' : 'Tu Empresa (Madurez)'}
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black font-mono text-blue-600 dark:text-cyan-400">
              {comparisonStats.companyAvg}%
            </span>
            {hasSimulation && (
              <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                {language === 'en' ? 'Simulated' : language === 'pt' ? 'Simulado' : 'Simulado'}
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {language === 'en' ? 'Average across 8 operational axes' : language === 'pt' ? 'Média dos 8 eixos operacionais' : 'Promedio en los 8 ejes de negocio'}
          </p>
        </div>

        {/* KPI 2: Sector Average */}
        <div className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {language === 'en' ? 'Sector Average' : language === 'pt' ? 'Média do Setor' : 'Promedio Sectorial'} ({t(`sector.${selectedSector}`) || selectedSector})
          </span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-black font-mono text-slate-800 dark:text-slate-200">
              {comparisonStats.sectorAvg}%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {language === 'en' ? 'Regional reference benchmark' : language === 'pt' ? 'Referência média regional' : 'Línea base regional de referencia'}
          </p>
        </div>

        {/* KPI 3: Differential Gap */}
        <div className={`p-4 rounded-2xl border-2 shadow-sm flex flex-col justify-between ${
          comparisonStats.netDelta >= 0
            ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20'
            : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
              comparisonStats.netDelta >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
            }`}>
              {language === 'en' ? 'Net Differential (Gap)' : language === 'pt' ? 'Diferença Líquida' : 'Diferencia / Brecha'}
            </span>
            {comparisonStats.netDelta >= 0 ? (
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            )}
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className={`text-3xl font-black font-mono ${
              comparisonStats.netDelta >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            }`}>
              {comparisonStats.netDelta >= 0 ? `+${comparisonStats.netDelta}%` : `${comparisonStats.netDelta}%`}
            </span>
          </div>
          <p className={`text-[11px] font-bold mt-1 ${
            comparisonStats.netDelta >= 0 ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'
          }`}>
            {comparisonStats.netDelta >= 0
              ? (language === 'en' ? 'Above sector benchmark' : language === 'pt' ? 'Acima da média do setor' : 'Por encima de la media del sector')
              : (language === 'en' ? 'Below sector benchmark' : language === 'pt' ? 'Abaixo da média do setor' : 'Por debajo de la media del sector')}
          </p>
        </div>

        {/* KPI 4: Balance of Axes */}
        <div className="p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-sm flex flex-col justify-between">
          <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {language === 'en' ? 'Competitive Advantage' : language === 'pt' ? 'Vantagem Competitiva' : 'Posición Competitiva'}
          </span>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono font-black text-lg">
              <CheckCircle2 className="w-4 h-4" />
              <span>{comparisonStats.leading}</span>
              <span className="text-[10px] text-slate-400 font-normal uppercase">{language === 'en' ? 'leads' : 'líder'}</span>
            </div>
            <div className="flex items-center gap-1 text-rose-500 dark:text-rose-400 font-mono font-black text-lg">
              <AlertCircle className="w-4 h-4" />
              <span>{comparisonStats.lagging}</span>
              <span className="text-[10px] text-slate-400 font-normal uppercase">{language === 'en' ? 'gaps' : 'brechas'}</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {comparisonStats.bestLead.delta > 0 && (
              <span>
                {language === 'en' ? 'Strength:' : 'Mayor ventaja:'} <strong className="text-slate-800 dark:text-slate-200">{comparisonStats.bestLead.name}</strong> (+{comparisonStats.bestLead.delta}%)
              </span>
            )}
          </p>
        </div>

      </div>

      {/* 3. VIEW MODE CONTROLS (Bars vs Radar vs Live Simulator) */}
      <div className="p-4 sm:p-6 rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-xl shadow-slate-200/50 dark:shadow-black/60 space-y-6">
        
        {/* Navigation Bar for View Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
              <span>
                {language === 'en' 
                  ? 'Interactive Digitalization Gap vs Sector' 
                  : language === 'pt' 
                    ? 'Diferença de Digitalização vs Setor em Tempo Real' 
                    : 'Diferencia de Digitalización vs Otras Empresas del Sector'}
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'en' 
                ? 'Visualizing your operational performance directly against the market average.' 
                : language === 'pt' 
                  ? 'Visualize seu desempenho operacional diretamente contra a média do mercado.' 
                  : 'Compara tu madurez eje por eje contra el promedio del mercado de forma dinámica.'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setViewMode('bars')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === 'bars'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Bars' : 'Barras'}</span>
            </button>
            <button
              onClick={() => setViewMode('radar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === 'radar'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Radar Overlay' : 'Radar Sectorial'}</span>
            </button>
            <button
              onClick={() => setViewMode('simulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                viewMode === 'simulator'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Live Simulator' : 'Simulador en Vivo'}</span>
              {hasSimulation && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
          </div>
        </div>

        {/* ========================================================
            VIEW MODE 1: DYNAMIC BARS WITH GAP INDICATORS
        ======================================================== */}
        {viewMode === 'bars' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            
            {/* Chart Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-bold pb-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-gradient-to-r from-blue-600 to-cyan-500 shadow-2xs" />
                  <span className="text-slate-800 dark:text-slate-200">{language === 'en' ? 'Your Company' : 'Tu Empresa'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-slate-400 dark:bg-slate-600 shadow-2xs" />
                  <span className="text-slate-600 dark:text-slate-400">{t('dashboard.benchmarkTitle') || 'Promedio Sector'} ({t(`sector.${selectedSector}`) || selectedSector})</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                {language === 'en' ? 'Hover or click any row to inspect strategic recommendations' : 'Pasa el cursor sobre cualquier eje para ver la recomendación'}
              </span>
            </div>

            {/* List of Comparative Bars */}
            <div className="space-y-3.5">
              {axes.map((axis) => {
                const companyVal = effectiveMetrics[axis.key] || 0;
                const sectorVal = benchmarks[axis.key as string] || 0;
                const delta = companyVal - sectorVal;
                const isHovered = hoveredAxisKey === axis.key;

                return (
                  <div
                    key={axis.key}
                    onMouseEnter={() => setHoveredAxisKey(axis.key as string)}
                    onMouseLeave={() => setHoveredAxisKey(null)}
                    onClick={() => setHoveredAxisKey(isHovered ? null : (axis.key as string))}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isHovered
                        ? 'border-blue-500/50 bg-blue-50/30 dark:bg-blue-950/20 shadow-md'
                        : 'border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#080e1c] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{axis.icon}</span>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                          {axis.label}
                        </h4>
                      </div>

                      {/* Differential Pill */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                          {companyVal}% vs {sectorVal}%
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full font-mono shadow-2xs border ${
                          delta > 0
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            : delta < 0
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                              : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20'
                        }`}>
                          {delta > 0 ? `+${delta}%` : delta < 0 ? `${delta}%` : '0%'}
                          {delta > 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : delta < 0 ? (
                            <TrendingDown className="w-3 h-3" />
                          ) : (
                            <Minus className="w-3 h-3" />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Dual Progress Bars */}
                    <div className="space-y-1.5">
                      {/* Company Bar */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold w-14 text-blue-600 dark:text-cyan-400 shrink-0 uppercase">
                          {language === 'en' ? 'Company' : 'Empresa'}
                        </span>
                        <div className="w-full h-3 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden relative">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${Math.max(companyVal, 2)}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-black text-blue-600 dark:text-cyan-400 w-10 text-right shrink-0">
                          {companyVal}%
                        </span>
                      </div>

                      {/* Sector Benchmark Bar */}
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold w-14 text-slate-500 dark:text-slate-400 shrink-0 uppercase">
                          {language === 'en' ? 'Sector' : 'Sector'}
                        </span>
                        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden relative">
                          <div
                            className="h-full bg-slate-400 dark:bg-slate-600 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${Math.max(sectorVal, 2)}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 w-10 text-right shrink-0">
                          {sectorVal}%
                        </span>
                      </div>
                    </div>

                    {/* Expandable Strategic Insight on Hover/Click */}
                    {isHovered && (
                      <div className="mt-3 pt-2.5 border-t border-blue-200/50 dark:border-blue-900/40 text-xs animate-in fade-in duration-200">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          <strong>{axis.label}:</strong> {axis.desc}
                        </p>
                        <p className="text-[11px] font-semibold text-blue-700 dark:text-cyan-300 mt-1">
                          {delta > 0 ? (
                            <span>
                              🌟 <strong>{language === 'en' ? 'Market Advantage:' : 'Ventaja de Mercado:'}</strong> {language === 'en' ? `You surpass the ${selectedSector} average by ${delta} points. Leverage this as a commercial differentiator.` : `Superas el promedio de ${selectedSector} por ${delta} puntos. Aprovéchalo como ventaja competitiva frente a tus clientes.`}
                            </span>
                          ) : delta < 0 ? (
                            <span>
                              🎯 <strong>{language === 'en' ? 'Improvement Priority:' : 'Oportunidad de Cierre:'}</strong> {language === 'en' ? `You trail behind the ${selectedSector} average by ${Math.abs(delta)} points. Recommended focus for your next technology milestone.` : `Te sitúas ${Math.abs(delta)} puntos por debajo de otras empresas del sector. Es una prioridad clave para tu plan de transformación.`}
                            </span>
                          ) : (
                            <span>
                              ⚖️ <strong>{language === 'en' ? 'Parity:' : 'En Paridad:'}</strong> {language === 'en' ? `You are aligned with the ${selectedSector} industry average.` : `Te encuentras exactamente alineado con la media del sector.`}
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW MODE 2: RADAR OVERLAY (COMPANY VS SECTOR POLYGONS)
        ======================================================== */}
        {viewMode === 'radar' && (
          <div className="flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-300 py-4">
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-cyan-500 border border-cyan-400 shadow-sm" />
                <span className="text-slate-800 dark:text-white">{language === 'en' ? 'Your Company' : 'Tu Empresa'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border border-dashed border-amber-400 shadow-sm" />
                <span className="text-slate-600 dark:text-slate-400">{t('dashboard.benchmarkTitle') || 'Promedio Sector'} ({t(`sector.${selectedSector}`) || selectedSector})</span>
              </div>
            </div>

            {/* Superimposed SVG Radar */}
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              <svg
                viewBox="0 0 360 360"
                className="w-full h-full overflow-visible"
              >
                {/* Background grid octagons */}
                {[25, 50, 75, 100].map((level) => {
                  const points = axes.map((_, i) => {
                    const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
                    const dist = (level / 100) * 115;
                    return `${180 + dist * Math.cos(angle)},${180 + dist * Math.sin(angle)}`;
                  }).join(' ');

                  return (
                    <g key={level}>
                      <polygon
                        points={points}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-slate-200 dark:text-slate-800/80"
                        strokeDasharray={level === 100 ? 'none' : '2 2'}
                      />
                      <text
                        x={180 + (level / 100) * 115}
                        y={180 - 4}
                        fontSize="9"
                        fill="currentColor"
                        className="text-slate-400 font-mono font-bold"
                      >
                        {level}%
                      </text>
                    </g>
                  );
                })}

                {/* Radar Axis lines */}
                {axes.map((_, i) => {
                  const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
                  const x = 180 + 115 * Math.cos(angle);
                  const y = 180 + 115 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={180}
                      y1={180}
                      x2={x}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-slate-200 dark:text-slate-800"
                    />
                  );
                })}

                {/* SECTOR BENCHMARK POLYGON (Amber Dashed) */}
                {(() => {
                  const sectorPoints = axes.map((axis, i) => {
                    const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
                    const val = benchmarks[axis.key as string] || 0;
                    const dist = (val / 100) * 115;
                    return `${180 + dist * Math.cos(angle)},${180 + dist * Math.sin(angle)}`;
                  }).join(' ');

                  return (
                    <polygon
                      points={sectorPoints}
                      fill="rgba(245, 158, 11, 0.15)"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray="4 3"
                    />
                  );
                })()}

                {/* COMPANY SCORE POLYGON (Cyan / Blue Solid) */}
                {(() => {
                  const companyPoints = axes.map((axis, i) => {
                    const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
                    const val = effectiveMetrics[axis.key] || 0;
                    const dist = (val / 100) * 115;
                    return `${180 + dist * Math.cos(angle)},${180 + dist * Math.sin(angle)}`;
                  }).join(' ');

                  return (
                    <polygon
                      points={companyPoints}
                      fill="rgba(34, 211, 238, 0.25)"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                    />
                  );
                })()}

                {/* Points on vertexes */}
                {axes.map((axis, i) => {
                  const angle = (i * 2 * Math.PI) / axes.length - Math.PI / 2;
                  const cVal = effectiveMetrics[axis.key] || 0;
                  const sVal = benchmarks[axis.key as string] || 0;

                  const cx = 180 + (cVal / 100) * 115 * Math.cos(angle);
                  const cy = 180 + (cVal / 100) * 115 * Math.sin(angle);

                  const sx = 180 + (sVal / 100) * 115 * Math.cos(angle);
                  const sy = 180 + (sVal / 100) * 115 * Math.sin(angle);

                  // Label positions
                  const lx = 180 + 138 * Math.cos(angle);
                  const ly = 180 + 138 * Math.sin(angle);

                  return (
                    <g key={axis.key}>
                      {/* Sector vertex dot */}
                      <circle cx={sx} cy={sy} r="3" fill="#f59e0b" />
                      
                      {/* Company vertex dot */}
                      <circle cx={cx} cy={cy} r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />

                      {/* Label */}
                      <text
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="10"
                        fontWeight="800"
                        fill="currentColor"
                        className="text-slate-800 dark:text-slate-200"
                      >
                        {axis.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs text-blue-900 dark:text-cyan-200 flex items-center gap-2.5 max-w-xl text-center">
              <Info className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
              <span>
                {language === 'en' 
                  ? 'The cyan shape represents your company; the amber dashed outline represents the average company in your selected sector.'
                  : 'El área cian representa a tu empresa; la línea discontinua dorada representa el promedio de las empresas en este sector.'}
              </span>
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW MODE 3: REAL-TIME WHAT-IF SIMULATOR
        ======================================================== */}
        {viewMode === 'simulator' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-cyan-400 block">
                  {language === 'en' ? 'Real-Time Scenario Simulator' : 'Simulador de Escenarios de Mejora en Tiempo Real'}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">
                  {language === 'en' 
                    ? 'Adjust the sliders below to simulate how modernizing each dimension closes gaps and boosts your standing vs. the sector!'
                    : 'Mueve los controles deslizantes para simular el impacto de nuevas inversiones tecnológicas y ver en tiempo real cómo cambia tu posición sectorial.'}
                </p>
              </div>

              {hasSimulation && (
                <button
                  onClick={handleResetSimulation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer shrink-0 shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Reset to Actual' : 'Restablecer Valores Reales'}</span>
                </button>
              )}
            </div>

            {/* Interactive Dimension Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {axes.map((axis) => {
                const currentVal = effectiveMetrics[axis.key] || 0;
                const baseVal = metrics[axis.key] || 0;
                const deltaSimulation = simulatedDeltas[axis.key as string] || 0;
                const sectorVal = benchmarks[axis.key as string] || 0;
                const gap = currentVal - sectorVal;

                return (
                  <div
                    key={axis.key}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#070e1c] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{axis.icon}</span>
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white uppercase">
                          {axis.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-xs font-black text-blue-600 dark:text-cyan-400">
                          {currentVal}%
                        </span>
                        {deltaSimulation !== 0 && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            deltaSimulation > 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                          }`}>
                            {deltaSimulation > 0 ? `+${deltaSimulation}` : deltaSimulation}
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          gap >= 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                        }`}>
                          {gap >= 0 ? `+${gap}% vs sector` : `${gap}% vs sector`}
                        </span>
                      </div>
                    </div>

                    {/* Slider Control */}
                    <div className="space-y-1">
                      <input
                        type="range"
                        min="-20"
                        max="40"
                        step="5"
                        value={deltaSimulation}
                        onChange={(e) => handleDeltaChange(axis.key as string, parseInt(e.target.value, 10))}
                        className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                        <span>-20% ({baseVal - 20 < 0 ? 0 : baseVal - 20}%)</span>
                        <span className="text-slate-600 dark:text-slate-300 font-mono">Real: {baseVal}%</span>
                        <span>+40% ({baseVal + 40 > 100 ? 100 : baseVal + 40}%)</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Simulated Outcome Banner */}
            {hasSimulation && (
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300 tracking-wider">
                    {language === 'en' ? 'Simulated Business Impact:' : 'Impacto del Escenario Simulado:'}
                  </h4>
                  <p className="text-xs text-emerald-900/80 dark:text-emerald-200/90 mt-1">
                    {language === 'en'
                      ? `With these improvements, your maturity increases to ${comparisonStats.companyAvg}%, placing you ${comparisonStats.netDelta >= 0 ? `+${comparisonStats.netDelta}% ahead of the ${selectedSector} sector` : `${Math.abs(comparisonStats.netDelta)}% closer to the sector benchmark`}.`
                      : `Con estas optimizaciones, tu madurez digital subiría al ${comparisonStats.companyAvg}%, situándote ${comparisonStats.netDelta >= 0 ? `+${comparisonStats.netDelta}% por encima de otras empresas en ${selectedSector}` : `a solo ${Math.abs(comparisonStats.netDelta)}% de igualar a las empresas líderes de ${selectedSector}`}.`}
                  </p>
                </div>
                <button
                  onClick={() => setViewMode('bars')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs hover:bg-emerald-500 transition-all cursor-pointer shrink-0 shadow-md"
                >
                  {language === 'en' ? 'View Bars with Simulation' : 'Ver Gráficas con Simulación'}
                </button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
