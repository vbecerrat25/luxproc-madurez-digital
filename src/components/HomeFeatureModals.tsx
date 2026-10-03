import React from 'react';
import { X, CheckCircle2, Zap, FileDown, BrainCircuit, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ModalProps {
  type: 'free' | 'how-it-works' | 'pdf-sample' | 'improvement-plan' | 'info-maturity' | 'settings' | 'notifications' | null;
  onClose: () => void;
  onStartSurvey: () => void;
  onViewResults?: () => void;
  onRestartTour?: () => void;
  hasRecord?: boolean;
}

export default function HomeFeatureModals({
  type,
  onClose,
  onStartSurvey,
  onViewResults,
  onRestartTour,
  hasRecord
}: ModalProps) {
  const { language } = useLanguage();

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0d1629] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200 text-left"
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
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {language === 'en' ? '100% Free Assessment' : language === 'pt' ? 'Diagnóstico 100% Gratuito' : 'Diagnóstico 100% Gratuito'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {language === 'en'
                  ? 'Our platform was designed to democratize access to high-standard enterprise technology audits.'
                  : language === 'pt'
                  ? 'Nossa plataforma foi projetada para democratizar o acesso a auditorias tecnológicas empresariais de alto padrão.'
                  : 'Nuestra plataforma fue diseñada para democratizar el acceso a auditorías tecnológicas empresariales de alto estándar.'}
              </p>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {language === 'en' ? 'No hidden fees or subscriptions required.' : language === 'pt' ? 'Sem custos ocultos ou assinaturas necessárias.' : 'Sin costos ocultos ni suscripciones requeridas.'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {language === 'en' ? 'Comprehensive evaluation of 20 dimensions across 4 macro-axes.' : language === 'pt' ? 'Avaliação completa de 20 dimensões em 4 macroeixos.' : 'Evaluación completa de 20 dimensiones en 4 macroejes.'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {language === 'en' ? 'Unlimited diagnostic saves and instant access anytime.' : language === 'pt' ? 'Histórico permanente de diagnósticos para acessar quando quiser.' : 'Historial permanente de diagnósticos para acceder cuando desees.'}
                </span>
              </div>
            </div>
            <button
              onClick={() => { onClose(); onStartSurvey(); }}
              className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
            >
              <span>{language === 'en' ? 'Start Now' : language === 'pt' ? 'Iniciar Agora' : 'Comenzar Ahora'}</span>
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
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {language === 'en' ? 'How Does It Work?' : language === 'pt' ? 'Como Funciona?' : '¿Cómo Funciona?'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {language === 'en'
                  ? 'An agile, structured process to evaluate digital maturity in 3 straightforward steps:'
                  : language === 'pt'
                  ? 'Um processo ágil e estruturado para mensurar a maturidade digital em 3 passos simples:'
                  : 'Un proceso ágil y estructurado para medir la madurez digital en 3 simples pasos:'}
              </p>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? 'Guided Assessment (10-15 min)' : language === 'pt' ? 'Questionário Guiado (10-15 min)' : 'Cuestionario Guiado (10-15 min)'}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {language === 'en' ? 'Answer focused questions on processes, technology, people, and data.' : language === 'pt' ? 'Responda a perguntas diretas sobre processos, tecnologia, pessoas e dados.' : 'Responde preguntas directas sobre procesos, tecnología, personas y datos.'}
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? 'Instant Scoring Engine' : language === 'pt' ? 'Cálculo Matemático Imediato' : 'Cálculo Matemático Inmediato'}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {language === 'en' ? 'Weighted algorithm classifying your current state into a 5-level maturity scale.' : language === 'pt' ? 'Algoritmo ponderado que categoriza o estado atual em uma escala de 5 níveis.' : 'Algoritmo ponderado que categoriza el estado actual en una escala de 5 niveles.'}
                  </p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    {language === 'en' ? 'Spider Radar & Roadmap' : language === 'pt' ? 'Radar e Roteiro de Ação' : 'Radar y Hoja de Ruta'}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {language === 'en' ? 'Get your interactive spider radar, printable PDF report, and prioritized recommendations.' : language === 'pt' ? 'Obtenha seu gráfico radar interativo, relatório PDF imprimível e recomendações priorizadas.' : 'Obtén tu gráfico radar interactivo, informe PDF imprimible y recomendaciones priorizadas.'}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => { onClose(); onStartSurvey(); }}
              className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <span>{language === 'en' ? 'Start Assessment' : language === 'pt' ? 'Iniciar Avaliação' : 'Iniciar Evaluación'}</span>
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
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {language === 'en' ? 'Executive PDF Report' : language === 'pt' ? 'Relatório Executivo em PDF' : 'Informe Ejecutivo en PDF'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {language === 'en'
                  ? 'Upon completion, the system generates a formal 5 to 6 page report ready for board and executive committees.'
                  : language === 'pt'
                  ? 'Ao finalizar a avaliação, o sistema compila um relatório formal de 5 a 6 páginas preparado para diretorias e comitês executivos.'
                  : 'Al finalizar el diagnóstico, el sistema compila un reporte formal de 5 a 6 páginas preparado para directorios y comités ejecutivos.'}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 text-xs space-y-2 text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-purple-900 dark:text-purple-300">
                {language === 'en' ? 'Includes:' : language === 'pt' ? 'Inclui:' : 'Incluye:'}
              </p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                <li>{language === 'en' ? 'Corporate cover page with company data and official date.' : language === 'pt' ? 'Capa corporativa com dados da empresa e data oficial.' : 'Portada corporativa con datos de la empresa y fecha oficial.'}</li>
                <li>{language === 'en' ? 'Executive summary with global indicator and symmetry radar.' : language === 'pt' ? 'Resumo executivo com indicador global e radar de simetria.' : 'Resumen ejecutivo con indicador global y radar de simetría.'}</li>
                <li>{language === 'en' ? 'Detailed breakdown of the 4 macro-axes and 20 dimensions.' : language === 'pt' ? 'Detalhamento dos 4 macroeixos e 20 dimensões.' : 'Desglose detallado de los 4 macroejes y 20 dimensiones.'}</li>
                <li>{language === 'en' ? 'Gap analysis matrix and prioritization quadrant.' : language === 'pt' ? 'Matriz de lacunas (Gap Analysis) e tabela de priorização.' : 'Matriz de brechas (Gap Analysis) y tabla de priorización.'}</li>
                <li>{language === 'en' ? 'Phased implementation roadmap (Immediate, Short, and Medium Term).' : language === 'pt' ? 'Roteiro estruturado em fases (Imediato, Curto e Médio Prazo).' : 'Hoja de ruta estructurada en fases (Inmediato, Corto y Mediano Plazo).'}</li>
              </ul>
            </div>
            {hasRecord && onViewResults ? (
              <button
                onClick={() => { onClose(); onViewResults(); }}
                className="w-full mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-500/20"
              >
                <span>{language === 'en' ? 'View My Current Report' : language === 'pt' ? 'Ver Meu Relatório Atual' : 'Ver Mi Informe Actual'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => { onClose(); onStartSurvey(); }}
                className="w-full mt-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-500/20"
              >
                <span>{language === 'en' ? 'Take Assessment to Download' : language === 'pt' ? 'Realizar Avaliação para Baixar' : 'Realizar Diagnóstico para Descargar'}</span>
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
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {language === 'en' ? 'Action Plan & Recommendations' : language === 'pt' ? 'Plano de Ação e Recomendações' : 'Plan de Mejora y Recomendaciones'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {language === 'en'
                  ? 'Every recommendation is dynamically tailored according to responses and gaps identified in your organization.'
                  : language === 'pt'
                  ? 'Cada recomendação é calculada dinamicamente conforme as respostas e lacunas detectadas na avaliação da sua empresa.'
                  : 'Cada recomendación se calcula dinámicamente según las respuestas y brechas detectadas en la evaluación de tu empresa.'}
              </p>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-500 shrink-0" />
                <span>
                  {language === 'en' ? 'Actions classified by business impact and implementation complexity.' : language === 'pt' ? 'Ações classificadas por impacto e esforço técnico.' : 'Acciones clasificadas por impacto y esfuerzo técnico.'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-500 shrink-0" />
                <span>
                  {language === 'en' ? 'Estimated technological ROI calculator.' : language === 'pt' ? 'Calculadora estimada de ROI tecnológico.' : 'Calculadora estimada de ROI tecnológico.'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuchsia-500 shrink-0" />
                <span>
                  {language === 'en' ? 'Benchmark comparison against industry averages.' : language === 'pt' ? 'Benchmarking comparativo frente à média do setor.' : 'Benchmarking comparativo frente al promedio del sector.'}
                </span>
              </div>
            </div>
            {hasRecord && onViewResults ? (
              <button
                onClick={() => { onClose(); onViewResults(); }}
                className="w-full mt-2 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-fuchsia-500/20"
              >
                <span>{language === 'en' ? 'Explore Company Recommendations' : language === 'pt' ? 'Explorar Recomendações da Empresa' : 'Explorar Recomendaciones de Mi Empresa'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => { onClose(); onStartSurvey(); }}
                className="w-full mt-2 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-fuchsia-500/20"
              >
                <span>{language === 'en' ? 'Generate My Action Plan' : language === 'pt' ? 'Gerar Meu Plano de Ação' : 'Generar Mi Plan de Mejora'}</span>
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
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {language === 'en' ? 'Digital Maturity Scale' : language === 'pt' ? 'Escala de Maturidade Digital' : 'Escala de Madurez Digital'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {language === 'en'
                  ? 'Based on the international 5-level digital transformation framework:'
                  : language === 'pt'
                  ? 'Baseado no modelo internacional de 5 níveis de evolução digital:'
                  : 'Basado en el modelo internacional de 5 niveles de evolución digital:'}
              </p>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 font-medium">
                <span className="text-slate-700 dark:text-slate-300">0% - 20%</span>
                <span className="font-bold text-red-500">
                  {language === 'en' ? 'Level 1: Initial / Analog' : language === 'pt' ? 'Nível 1: Inicial / Analógico' : 'Nivel 1: Inicial / Analógico'}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 font-medium">
                <span className="text-slate-700 dark:text-slate-300">21% - 40%</span>
                <span className="font-bold text-amber-500">
                  {language === 'en' ? 'Level 2: Basic / Reactive' : language === 'pt' ? 'Nível 2: Básico / Reativo' : 'Nivel 2: Básico / Reactivo'}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 font-medium">
                <span className="text-slate-700 dark:text-slate-300">41% - 60%</span>
                <span className="font-bold text-blue-500">
                  {language === 'en' ? 'Level 3: Competent / Standardized' : language === 'pt' ? 'Nível 3: Competente / Padronizado' : 'Nivel 3: Competente / Estandarizado'}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 font-medium">
                <span className="text-slate-700 dark:text-slate-300">61% - 80%</span>
                <span className="font-bold text-emerald-500">
                  {language === 'en' ? 'Level 4: Advanced / Connected' : language === 'pt' ? 'Nível 4: Avançado / Conectado' : 'Nivel 4: Avanzado / Conectado'}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 font-medium">
                <span className="text-slate-700 dark:text-slate-300">81% - 100%</span>
                <span className="font-bold text-cyan-500">
                  {language === 'en' ? 'Level 5: Transformative / Intelligent' : language === 'pt' ? 'Nível 5: Transformador / Inteligente' : 'Nivel 5: Transformador / Inteligente'}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer"
            >
              {language === 'en' ? 'Got It' : language === 'pt' ? 'Entendido' : 'Entendido'}
            </button>
          </div>
        )}

        {type === 'notifications' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {language === 'en' ? 'Platform Notifications' : language === 'pt' ? 'Notificações da Plataforma' : 'Notificaciones de la Plataforma'}
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 font-mono">
                  {language === 'en' ? '2026 Update' : language === 'pt' ? 'Atualização 2026' : 'Actualización 2026'}
                </span>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {language === 'en' ? '2026 Diagnostic Model Activated' : language === 'pt' ? 'Modelo de Diagnóstico 2026 Ativado' : 'Modelo de Diagnóstico 2026 Activado'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'en' 
                    ? 'Generative Artificial Intelligence and Data Cybersecurity dimensions have been incorporated.' 
                    : language === 'pt' 
                    ? 'Dimensões de Inteligência Artificial Generativa e Cibersegurança de Dados foram incorporadas.' 
                    : 'Se han incorporado las dimensiones de Inteligencia Artificial Generativa y Ciberseguridad de Datos.'}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {language === 'en' ? 'PDF Export' : language === 'pt' ? 'Exportação PDF' : 'Exportación'}
                </span>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                  {language === 'en' ? 'Direct PDF Download' : language === 'pt' ? 'Download Direto em PDF' : 'Descarga Directa en PDF'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'en'
                    ? 'Generate your high-resolution official report ready for printing with one single click.'
                    : language === 'pt'
                    ? 'Gere seu relatório oficial de alta resolução pronto para impressão com um único clique.'
                    : 'Genera tu informe ejecutivo con un solo clic con resolución de alta calidad para impresión.'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer"
            >
              {language === 'en' ? 'Close' : language === 'pt' ? 'Fechar' : 'Cerrar'}
            </button>
          </div>
        )}

        {type === 'settings' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {language === 'en' ? 'Diagnostic Settings' : language === 'pt' ? 'Configurações do Diagnóstico' : 'Configuración del Diagnóstico'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Session settings and display preferences for the LUXPROC ecosystem.'
                : language === 'pt'
                ? 'Ajustes de sessão e preferências de visualização do ecossistema LUXPROC.'
                : 'Ajustes de sesión y preferencias de visualización del ecosistema LUXPROC.'}
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {language === 'en' ? 'Model Version' : language === 'pt' ? 'Versão do Modelo' : 'Versión del Modelo'}
                </span>
                <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">v2026.3 PRO</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200/60 dark:border-slate-800 pt-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {language === 'en' ? 'Evaluation Storage' : language === 'pt' ? 'Armazenamento de Avaliações' : 'Almacenamiento de Evaluaciones'}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {language === 'en' ? 'Permanent & Unlimited' : language === 'pt' ? 'Permanente e Ilimitado' : 'Permanente e Ilimitado'}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200/60 dark:border-slate-800 pt-2">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {language === 'en' ? 'Authentication Domain' : language === 'pt' ? 'Domínio de Autenticação' : 'Dominio de Autenticación'}
                </span>
                <span className="font-mono text-slate-500 dark:text-slate-400">luxproc.com</span>
              </div>
            </div>

            {onRestartTour && (
              <button
                onClick={() => {
                  onClose();
                  onRestartTour();
                }}
                className="w-full py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-50/50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span>
                  {language === 'en' ? 'Start Interactive Tour (Welcome Guide)' : language === 'pt' ? 'Iniciar Guia Interativo (Tour de Boas-Vindas)' : 'Iniciar Guía Interactiva (Tour de Bienvenida)'}
                </span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              {language === 'en' ? 'Save & Close' : language === 'pt' ? 'Salvar e Fechar' : 'Guardar y Cerrar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
