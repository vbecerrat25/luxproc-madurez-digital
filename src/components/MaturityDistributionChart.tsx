import React from 'react';
import { ScoreMetrics } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface MaturityDistributionChartProps {
  metrics: ScoreMetrics;
  isPrint?: boolean;
  compact?: boolean;
}

interface Tier {
  name: string;
  min: number;
  max: number;
  colorClass: string;
  textColor: string;
  bgClass: string;
  printColor: string;
  items: { name: string; score: number }[];
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = {
    x: cx + radius * Math.cos(startAngle),
    y: cy + radius * Math.sin(startAngle),
  };
  const end = {
    x: cx + radius * Math.cos(endAngle),
    y: cy + radius * Math.sin(endAngle),
  };

  const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

  // Sweep flag is 1 for clockwise drawing
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
  ].join(" ");
}

export default function MaturityDistributionChart({ metrics, isPrint = false, compact = false }: MaturityDistributionChartProps) {
  const { t } = useLanguage();

  const dimensionData = [
    { name: t('dim.digitalizacion', 'Digitalización'), score: metrics.digitalizacion },
    { name: t('dim.automatizacion', 'Automatización'), score: metrics.automatizacion },
    { name: t('dim.innovacion', 'Innovación'), score: metrics.innovacion },
    { name: t('dim.circularidad', 'Circularidad'), score: metrics.circularidad },
    { name: t('dim.trazabilidad', 'Trazabilidad'), score: metrics.trazabilidad },
    { name: t('dim.gestion', 'Gestión'), score: metrics.gestion },
    { name: t('dim.seguridad', 'Seguridad'), score: metrics.seguridad },
    { name: t('dim.cultura', 'Cultura Digital'), score: metrics.cultura }
  ];

  // Define our 5 formal maturity tiers
  const tiers: Tier[] = [
    {
      name: `${t('level.lider', 'Líder Digital')} (91-100%)`,
      min: 91,
      max: 100,
      colorClass: 'stroke-emerald-500 fill-emerald-500',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      bgClass: 'bg-emerald-500',
      printColor: '#10b981',
      items: []
    },
    {
      name: `${t('level.competitivo', 'Competitivo')} (76-90%)`,
      min: 76,
      max: 90,
      colorClass: 'stroke-cyan-500 fill-cyan-500',
      textColor: 'text-cyan-600 dark:text-cyan-400',
      bgClass: 'bg-cyan-500',
      printColor: '#06b6d4',
      items: []
    },
    {
      name: `${t('level.desarrollado', 'En Desarrollo')} (51-75%)`,
      min: 51,
      max: 75,
      colorClass: 'stroke-blue-500 fill-blue-500',
      textColor: 'text-blue-600 dark:text-blue-400',
      bgClass: 'bg-blue-500',
      printColor: '#3b82f6',
      items: []
    },
    {
      name: `${t('level.basico', 'Principiante')} (26-50%)`,
      min: 26,
      max: 50,
      colorClass: 'stroke-amber-500 fill-amber-500',
      textColor: 'text-amber-600 dark:text-amber-400',
      bgClass: 'bg-amber-500',
      printColor: '#f59e0b',
      items: []
    },
    {
      name: `${t('level.inicial', 'Inicial')} (0-25%)`,
      min: 0,
      max: 25,
      colorClass: 'stroke-red-500 fill-red-500',
      textColor: 'text-red-600 dark:text-red-400',
      bgClass: 'bg-red-500',
      printColor: '#ef4444',
      items: []
    }
  ];

  // Classify each dimension into its corresponding tier
  dimensionData.forEach((dim) => {
    const tier = tiers.find((t) => dim.score >= t.min && dim.score <= t.max);
    if (tier) {
      tier.items.push(dim);
    }
  });

  const totalDimensions = dimensionData.length; // always 8

  // SVG Donut calculations
  const size = compact ? 120 : 160;
  const center = size / 2;
  const r = compact ? 38 : 50;
  const strokeWidth = compact ? 10 : 14;

  return (
    <div className={`w-full ${compact ? 'flex flex-col items-stretch gap-4' : 'grid grid-cols-1 md:grid-cols-12 gap-6 items-center'} ${isPrint ? 'text-black' : 'text-slate-800 dark:text-slate-100'}`}>
      
      {/* LEFT: SVG Donut Chart */}
      <div className={`${compact ? 'w-full flex flex-col items-center justify-center' : 'md:col-span-5 flex flex-col items-center justify-center'}`}>
        <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="-rotate-90"
            style={{ width: `${size}px`, height: `${size}px` }}
          >
            {/* Empty track for dimensions if total is 0 */}
            <circle
              cx={center}
              cy={center}
              r={r}
              fill="transparent"
              stroke={isPrint ? '#f3f4f6' : (!isPrint && typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? '#1e293b' : '#e2e8f0')}
              strokeWidth={strokeWidth}
            />

            {/* Segment calculation */}
            {(() => {
              let accumulatedAngle = 0;
              return tiers.map((tier, idx) => {
                const count = tier.items.length;
                if (count === 0) return null;

                const percentage = count / totalDimensions;
                
                if (percentage === 1) {
                  return (
                    <circle
                      key={idx}
                      cx={center}
                      cy={center}
                      r={r}
                      fill="transparent"
                      stroke={tier.printColor}
                      strokeWidth={strokeWidth}
                    />
                  );
                }

                const angleLength = percentage * 2 * Math.PI;
                const startAngle = accumulatedAngle;
                const endAngle = accumulatedAngle + angleLength;
                accumulatedAngle = endAngle;

                return (
                  <path
                    key={idx}
                    d={describeArc(center, center, r, startAngle, endAngle)}
                    fill="transparent"
                    stroke={tier.printColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="butt"
                  />
                );
              });
            })()}
          </svg>

          {/* Central absolute label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`${compact ? 'text-xl' : 'text-2xl'} font-black ${isPrint ? 'text-black' : 'text-slate-900 dark:text-white'}`}>
              {totalDimensions}
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-widest leading-none ${isPrint ? 'text-gray-500' : 'text-slate-400 dark:text-slate-500'}`}>
              {t('level.areas', 'Áreas')}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: Detailed Tier Legend & Lists */}
      <div className={`${compact ? 'w-full' : 'md:col-span-7 space-y-4'}`}>
        <div className={`grid ${compact ? 'grid-cols-1 sm:grid-cols-2 gap-2' : 'grid-cols-1 sm:grid-cols-2 gap-3.5'}`}>
          {tiers.map((tier, idx) => {
            const count = tier.items.length;
            const percentage = Math.round((count / totalDimensions) * 100);
            const tierLabel = tier.name.split(' (')[0] || tier.name;

            return (
              <div 
                key={idx} 
                className={`p-3 rounded-xl border ${
                  isPrint 
                    ? 'border-gray-200 bg-white' 
                    : 'border-slate-100 dark:border-slate-800/40 bg-slate-50/40 dark:bg-slate-950/20'
                }`}
              >
                {/* Header status */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0" 
                      style={{ backgroundColor: tier.printColor }} 
                    />
                    <span className={`text-[11px] font-extrabold ${isPrint ? 'text-black' : 'text-slate-800 dark:text-slate-200'}`}>
                      {tierLabel}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold shrink-0 ${isPrint ? tier.textColor.split(' ')[0] : tier.textColor}`}>
                    {percentage}%
                  </span>
                </div>

                {/* Subtitle count */}
                <div className={`text-[10px] font-semibold mt-1 ${isPrint ? 'text-gray-500' : 'text-slate-400 dark:text-slate-500'}`}>
                  {count} {count === 1 ? t('level.dimension', 'dimensión') : t('level.dimensions', 'dimensiones')}
                </div>

                {/* Dimension items pills */}
                {count > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {tier.items.map((item, i) => (
                      <span 
                        key={i} 
                        className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                          isPrint 
                            ? 'bg-gray-100 text-gray-800 border border-gray-200' 
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-800/50'
                        }`}
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
