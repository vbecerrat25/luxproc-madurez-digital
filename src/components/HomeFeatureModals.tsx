import React from 'react';
import { X, CheckCircle2, Zap, FileDown, BrainCircuit, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ModalProps {
  type: 'free' | 'how-it-works' | 'pdf-sample' | 'improvement-plan' | 'info-maturity' | 'settings' | 'notifications' | null;
  onClose: () => void;
  onStartSurvey: () => void;
  onViewResults?: () => void;
  hasRecord?: boolean;
}

export default function HomeFeatureModals({
  type,
  onClose,
  onStartSurvey,
  onViewResults,
  hasRecord
}: ModalProps) {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0d1629] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {type === 'free' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-cyan-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Diagnóstico 100% Gratuito</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Nuestra plataforma fue diseñada para democratizar el acceso a auditorías tecnológicas empresariales de alto estándar.
              </p>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Sin costos ocultos ni suscripciones requeridas.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Evaluación completa de 20 dimensiones en 4 macroejes.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Permite hasta 2 evaluaciones comparativas por empresa.</span>
              </div>
            </div>
            <button
              onClick={() => { onClose(); onStartSurvey(); }}
              className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
            >
              <span>Comenzar Ahora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {type === 'how-it-works' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">¿Cómo Funciona?</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Un proceso ágil y estructurado para medir la madurez digital en 3 simples pasos:
              </p>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Cuestionario Guiado (10-15 min)</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Responde preguntas directas sobre procesos, tecnología, personas y datos.</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Cálculo Matemático Inmediato</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Algoritmo ponderado que categoriza el estado actual en una escala de 5 niveles.</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Radar y Hoja de Ruta</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Obtén tu gráfico radar interactivo, informe PDF imprimible y recomendaciones priorizadas.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => { onClose(); onStartSurvey(); }}
              className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <span>Iniciar Evaluación</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {type === 'pdf-sample' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 flex items-center justify-center">
              <FileDown className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Informe Ejecutivo en PDF</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Al finalizar el diagnóstico, el sistema compila un reporte formal de 5 a 6 páginas preparado para directorios y comités ejecutivos.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-purple-900 dark:text-purple-300">Incluye:</p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                <li>Portada corporativa con datos de la empresa y fecha oficial.</li>
                <li>Resumen ejecutivo con indicador global y radar de simetría.</li>
                <li>Desglose detallado de los 4 macroejes y 20 dimensiones.</li>
                <li>Matriz de brechas (Gap Analysis) y tabla de priorización.</li>
                <li>Hoja de ruta estructurada en fases (Inmediato, Corto y Mediano Plazo).</li>
              </ul>
            </div>
            {hasRecord && onViewResults ? (
              <button
                onClick={() => { onClose(); onViewResults(); }}
                className="w-full mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-500/20"
              >
                <span>Ver Mi Informe Actual</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => { onClose(); onStartSurvey(); }}
                className="w-full mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-500/20"
              >
                <span>Realizar Diagnóstico para Descargar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {type === 'improvement-plan' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-950/50 dark:text-fuchsia-400 flex items-center justify-center">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Plan de Mejora y Recomendaciones</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Cada recomendación se calcula dinámicamente según las respuestas y brechas detectadas en la evaluación de tu empresa.
              </p>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-500 shrink-0" />
                <span>Acciones clasificadas por impacto y esfuerzo técnico.</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-500 shrink-0" />
                <span>Calculadora estimada de ROI tecnológico.</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-500 shrink-0" />
                <span>Benchmarking comparativo frente al promedio del sector.</span>
              </div>
            </div>
            {hasRecord && onViewResults ? (
              <button
                onClick={() => { onClose(); onViewResults(); }}
                className="w-full mt-2 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-fuchsia-500/20"
              >
                <span>Explorar Recomendaciones de Mi Empresa</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => { onClose(); onStartSurvey(); }}
                className="w-full mt-2 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-fuchsia-500/20"
              >
                <span>Generar Mi Plan de Mejora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {type === 'info-maturity' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Escala de Madurez Digital</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Basado en el modelo internacional de 5 niveles de evolución digital:
              </p>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 font-medium">
                <span className="text-slate-700 dark:text-slate-300">0% - 20%</span>
                <span className="font-bold text-red-500">Nivel 1: Inicial / Analógico</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 font-medium">
                <span className="text-slate-700 dark:text-slate-300">21% - 40%</span>
                <span className="font-bold text-amber-500">Nivel 2: Básico / Reactivo</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 font-medium">
                <span className="text-slate-700 dark:text-slate-300">41% - 60%</span>
                <span className="font-bold text-blue-500">Nivel 3: Competente / Estandarizado</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 font-medium">
                <span className="text-slate-700 dark:text-slate-300">61% - 80%</span>
                <span className="font-bold text-emerald-500">Nivel 4: Avanzado / Conectado</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 font-medium">
                <span className="text-slate-700 dark:text-slate-300">81% - 100%</span>
                <span className="font-bold text-cyan-500">Nivel 5: Transformador / Inteligente</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer"
            >
              Entendido
            </button>
          </div>
        )}

        {type === 'notifications' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Notificaciones de la Plataforma</h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 font-mono">Actualización 2026</span>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Modelo de Diagnóstico 2026 Activado</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Se han incorporado las dimensiones de Inteligencia Artificial Generativa y Ciberseguridad de Datos.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">Exportación</span>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Descarga Directa en PDF</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Genera tu informe ejecutivo con un solo clic con resolución de alta calidad para impresión.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}

        {type === 'settings' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Configuración del Diagnóstico</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ajustes de sesión y preferencias de visualización del ecosistema LUXPROC.
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 dark:text-slate-300">Versión del Modelo</span>
                <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">v2026.3 PRO</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200/60 dark:border-slate-800 pt-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Almacenamiento Local</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Activo (2 Máx)</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200/60 dark:border-slate-800 pt-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">Dominio de Autenticación</span>
                <span className="font-mono text-slate-500 dark:text-slate-400">luxproc.com</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              Guardar y Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
