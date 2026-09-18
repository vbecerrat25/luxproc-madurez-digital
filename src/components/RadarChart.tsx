import React from 'react';
import { ScoreMetrics } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface RadarChartProps {
  metrics: ScoreMetrics;
  previousMetrics?: ScoreMetrics | null;
  previousLabel?: string;
  currentLabel?: string;
  isPrint?: boolean;
}

export default function RadarChart({ 
  metrics, 
  previousMetrics = null,
  previousLabel,
  currentLabel,
  isPrint = false 
}: RadarChartProps) {
  const { t } = useLanguage();

  const axes: { key: keyof ScoreMetrics; label: string; dotColor: string }[] = [
    { key: 'digitalizacion', label: t('dim.digitalizacion', 'Digitalización'), dotColor: '#3b82f6' },
    { key: 'automatizacion', label: t('dim.automatizacion', 'Automatización'), dotColor: '#10b981' },
    { key: 'innovacion', label: t('dim.innovacion', 'Innovación'), dotColor: '#a855f7' },
    { key: 'circularidad', label: t('dim.circularidad', 'Circularidad'), dotColor: '#14b8a6' },
    { key: 'trazabilidad', label: t('dim.trazabilidad', 'Trazabilidad'), dotColor: '#f97316' },
    { key: 'gestion', label: t('dim.gestion', 'Gestión'), dotColor: '#6366f1' },
    { key: 'seguridad', label: t('dim.seguridad', 'Seguridad'), dotColor: '#ef4444' },
    { key: 'cultura', label: t('dim.cultura', 'Cultura Digital'), dotColor: '#ec4899' }
  ];

  const size = 360;
  const center = 180;
  const radius = 86;
  const totalAxes = axes.length;

  // Helper to calculate X and Y coordinates on the radar grid
  const getCoordinates = (index: number, value: number, customRadius = radius) => {
    // Offset by -90 degrees so the first axis points straight up
    const angle = (index * 2 * Math.PI) / totalAxes - Math.PI / 2;
    const distance = (value / 100) * customRadius;
    const x = center + distance * Math.cos(angle);
    const y = center + distance * Math.sin(angle);
    return { x, y };
  };

  // Generate grid octagons (at 25%, 50%, 75%, 100%)
  const gridLevels = [25, 50, 75, 100];
  const gridPaths = gridLevels.map((level) => {
    const points = [];
    for (let i = 0; i < totalAxes; i++) {
      const { x, y } = getCoordinates(i, level);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  });

  // Calculate coordinates for the company score polygon
  const scorePointsArray = axes.map((axis, index) => {
    const scoreVal = metrics[axis.key] || 0;
    const { x, y } = getCoordinates(index, scoreVal);
    return { x, y, label: axis.label, score: scoreVal };
  });
  const scorePath = scorePointsArray.map((p) => `${p.x},${p.y}`).join(' ');

  // Calculate coordinates for the previous baseline polygon if available
  const prevPointsArray = previousMetrics ? axes.map((axis, index) => {
    const prevVal = previousMetrics[axis.key] || 0;
    const { x, y } = getCoordinates(index, prevVal);
    return { x, y, label: axis.label, score: prevVal };
  }) : [];
  const prevScorePath = prevPointsArray.length > 0 ? prevPointsArray.map((p) => `${p.x},${p.y}`).join(' ') : null;

  // Static colors to ensure 100% sharp rendering in both html2canvas/print and live screen
  const isDark = !isPrint && typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

  const axisStroke = isPrint ? '#cbd5e1' : (isDark ? '#334155' : '#cbd5e1');
  const gridStroke = isPrint ? '#e2e8f0' : (isDark ? '#1e293b' : '#f1f5f9');
  const textFill = isPrint ? '#64748b' : (isDark ? '#64748b' : '#94a3b8');
  
  const activeFill = isPrint ? 'rgba(37, 99, 235, 0.20)' : (isDark ? 'rgba(34, 211, 238, 0.20)' : 'rgba(37, 99, 235, 0.20)');
  const activeStroke = isPrint ? '#1d4ed8' : (isDark ? '#22d3ee' : '#2563eb');
  
  const circleFill = isPrint ? '#1d4ed8' : (isDark ? '#22d3ee' : '#2563eb');
  const circleStroke = isPrint ? '#ffffff' : (isDark ? '#020617' : '#ffffff');
  
  const scoreTextFill = isPrint ? '#1e3a8a' : (isDark ? '#38bdf8' : '#1e40af');
  const labelTextFill = isPrint ? '#0f172a' : (isDark ? '#f1f5f9' : '#0f172a');

  return (
    <div id="radar-container" className="flex flex-col items-center justify-center w-full">
      {/* SVG Container with controlled responsive dimensions */}
      <div 
        className="relative flex items-center justify-center"
        style={{ 
          width: isPrint ? '275px' : '290px', 
          height: isPrint ? '275px' : '290px',
          minWidth: isPrint ? '275px' : '290px',
          minHeight: isPrint ? '275px' : '290px'
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="360"
          height="360"
          viewBox="0 0 360 360"
          className="w-full h-full"
        >
          {/* Radial Axis Lines */}
          {axes.map((_, i) => {
            const { x, y } = getCoordinates(i, 100);
            return (
              <line
                key={`line-${i}`}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke={axisStroke}
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Grid Octagons */}
          {gridPaths.map((points, index) => (
            <polygon
              key={`grid-${index}`}
              points={points}
              fill="none"
              stroke={gridStroke}
              strokeWidth="1.2"
            />
          ))}

          {/* Grid Level Text Labels (at top axis) */}
          {gridLevels.map((level) => {
            const { x, y } = getCoordinates(0, level);
            return (
              <text
                key={`text-${level}`}
                x={x + 4}
                y={y + 3}
                fill={textFill}
                fontSize="9.5"
                fontFamily="system-ui, monospace"
                fontWeight="600"
              >
                {level}%
              </text>
            );
          })}

          {/* Previous Baseline Polygon if comparing */}
          {prevScorePath && (
            <g>
              <polygon
                points={prevScorePath}
                fill={isPrint ? 'rgba(100, 116, 139, 0.12)' : (isDark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(100, 116, 139, 0.12)')}
                stroke={isPrint ? '#475569' : (isDark ? '#94a3b8' : '#64748b')}
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              {prevPointsArray.map((point, index) => (
                <circle
                  key={`prev-point-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="3.5"
                  fill={isPrint ? '#475569' : (isDark ? '#94a3b8' : '#64748b')}
                  stroke={isPrint ? '#ffffff' : (isDark ? '#0f172a' : '#ffffff')}
                  strokeWidth="1"
                />
              ))}
            </g>
          )}

          {/* Active Corporate Score Polygon */}
          <polygon
            points={scorePath}
            fill={activeFill}
            stroke={activeStroke}
            strokeWidth="2.8"
          />

          {/* Dots on the Vertex Points with White Halo for crisp contrast */}
          {scorePointsArray.map((point, index) => (
            <g key={`point-group-${index}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4.5"
                fill={circleFill}
                stroke={circleStroke}
                strokeWidth="1.5"
              />
              <text
                x={point.x}
                y={point.y - 7}
                textAnchor="middle"
                fill={scoreTextFill}
                stroke={isPrint ? '#ffffff' : (isDark ? '#020617' : '#ffffff')}
                strokeWidth="3.5"
                paintOrder="stroke"
                fontSize="11.5"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {point.score}%
              </text>
            </g>
          ))}

          {/* Perimeter Text Labels for Axes */}
          {axes.map((axis, i) => {
            const { x, y } = getCoordinates(i, 132);
            let textAnchor = 'middle';
            if (x < center - 15) {
              textAnchor = 'end';
            } else if (x > center + 15) {
              textAnchor = 'start';
            }

            return (
              <text
                key={`label-${i}`}
                x={x}
                y={y + 4}
                textAnchor={textAnchor}
                fill={labelTextFill}
                fontSize="11"
                fontWeight="800"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              >
                {axis.label}
              </text>
            );
          })}
        </svg>
      </div>

      {/* Series Comparison Legend */}
      {previousMetrics ? (
        <div 
          className={
            isPrint 
              ? "w-full mt-2 p-2 rounded-xl bg-white border border-slate-200 text-slate-900"
              : "w-full mt-2 p-2 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
          }
        >
          <div className="grid grid-cols-2 gap-2 text-center divide-x divide-slate-200 dark:divide-slate-700">
            {/* Current Evaluation Series */}
            <div className="flex flex-col items-center justify-center px-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-3.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 inline-block shrink-0" />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isPrint ? 'text-slate-600' : 'text-slate-600 dark:text-slate-300'}`}>
                  {currentLabel || 'Evaluación Actual'}
                </span>
              </div>
              <span className={`text-base font-black ${isPrint ? 'text-blue-700' : 'text-blue-600 dark:text-cyan-400'}`}>
                {metrics.general}%
              </span>
            </div>

            {/* Baseline Series */}
            <div className="flex flex-col items-center justify-center px-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-3.5 h-0.5 border-b-2 border-dashed border-slate-500 inline-block shrink-0" />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isPrint ? 'text-slate-600' : 'text-slate-600 dark:text-slate-300'}`}>
                  {previousLabel || 'Línea Base'}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-base font-black ${isPrint ? 'text-slate-700' : 'text-slate-700 dark:text-slate-300'}`}>
                  {previousMetrics.general}%
                </span>
                {metrics.general !== previousMetrics.general && (
                  <span className={`text-[9.5px] font-black px-1.5 py-0.2 rounded-full ${
                    metrics.general >= previousMetrics.general 
                      ? (isPrint ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800')
                      : (isPrint ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800')
                  }`}>
                    {metrics.general >= previousMetrics.general ? `+${metrics.general - previousMetrics.general}%` : `${metrics.general - previousMetrics.general}%`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Single Series Legend */
        <div 
          className={
            isPrint
              ? "w-full mt-2 py-1.5 px-3 rounded-xl bg-white border border-slate-200 text-center"
              : "w-full mt-2 py-1.5 px-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-center"
          }
        >
          <div className="flex items-center justify-center gap-2 text-xs">
            <span className="w-3 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 inline-block" />
            <span className={`font-bold ${isPrint ? 'text-slate-700' : 'text-slate-700 dark:text-slate-300'}`}>
              Polígono de Madurez Corporativa:
            </span>
            <span className={`font-black ${isPrint ? 'text-blue-700' : 'text-blue-600 dark:text-cyan-400'}`}>
              {metrics.general}%
            </span>
          </div>
        </div>
      )}

      {/* Structured 2-Column Grid for the 8 Dimensions (Replaces messy wrapped inline text) */}
      <div 
        className={
          isPrint 
            ? "w-full mt-2 p-2 rounded-xl bg-slate-50 border border-slate-200"
            : "w-full mt-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800"
        }
      >
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10.5px]">
          {axes.map((axis) => {
            const currentVal = metrics[axis.key] || 0;
            const prevVal = previousMetrics ? (previousMetrics[axis.key] || 0) : null;
            const delta = prevVal !== null ? currentVal - prevVal : null;

            return (
              <div 
                key={axis.key} 
                className={`flex items-center justify-between py-0.5 border-b ${
                  isPrint ? 'border-slate-200/70' : 'border-slate-200/70 dark:border-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0 pr-1">
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ backgroundColor: axis.dotColor }}
                  />
                  <span className={`truncate font-bold ${isPrint ? 'text-slate-700' : 'text-slate-700 dark:text-slate-300'}`}>
                    {axis.label}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className={`font-black ${isPrint ? 'text-slate-900' : 'text-slate-900 dark:text-slate-100'}`}>
                    {currentVal}%
                  </span>
                  {delta !== null && delta !== 0 && (
                    <span className={`text-[9px] font-black px-1 rounded ${
                      delta > 0 
                        ? (isPrint ? 'text-emerald-800 bg-emerald-100' : 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-950')
                        : (isPrint ? 'text-rose-800 bg-rose-100' : 'text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-950')
                    }`}>
                      {delta > 0 ? `+${delta}%` : `${delta}%`}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
