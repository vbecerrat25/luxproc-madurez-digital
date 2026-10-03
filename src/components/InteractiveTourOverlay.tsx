import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Play, 
  Target, 
  BarChart3, 
  Compass, 
  CheckCircle2, 
  Layers,
  HelpCircle,
  Zap
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface TourStep {
  id: string;
  targetSelector: string;
  title: {
    es: string;
    en: string;
    pt: string;
  };
  description: {
    es: string;
    en: string;
    pt: string;
  };
  tip?: {
    es: string;
    en: string;
    pt: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  preferredPlacement?: 'bottom' | 'top' | 'left' | 'right' | 'center';
}

interface InteractiveTourOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  onStartDiagnosis?: () => void;
  userName?: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    targetSelector: '#tour-hero-card',
    title: {
      es: '¡Bienvenido a LUXPROC!',
      en: 'Welcome to LUXPROC!',
      pt: 'Bem-vindo ao LUXPROC!'
    },
    description: {
      es: 'Te damos la bienvenida a la plataforma líder de diagnóstico de madurez digital. Aquí podrás evaluar, medir y acelerar la transformación de tu empresa con estándares internacionales.',
      en: 'Welcome to the leading digital maturity assessment platform. Here you can evaluate, measure, and accelerate your business transformation with global benchmarks.',
      pt: 'Seja bem-vindo à plataforma líder de diagnóstico de maturidade digital. Aqui você pode avaliar e acelerar a transformação da sua empresa com padrões internacionais.'
    },
    tip: {
      es: 'Este breve recorrido te mostrará las funciones principales en menos de 1 minuto.',
      en: 'This short tour will guide you through key features in under 1 minute.',
      pt: 'Este breve tour mostrará os recursos principais em menos de 1 minuto.'
    },
    icon: Compass,
    preferredPlacement: 'bottom'
  },
  {
    id: 'start-diag',
    targetSelector: '#tour-start-diag-btn',
    title: {
      es: 'Comienza tu Diagnóstico Empresarial',
      en: 'Start Your Business Diagnosis',
      pt: 'Inicie seu Diagnóstico Empresarial'
    },
    description: {
      es: 'Inicia una evaluación exhaustiva de 20 dimensiones de negocio críticas (Digitalización, Automatización, IA, Ciberseguridad, Gestión, etc.). Toma entre 10 y 15 minutos.',
      en: 'Launch an in-depth evaluation covering 20 key business dimensions (Digitization, Automation, AI, Cybersecurity, Management, etc.). Takes 10-15 minutes.',
      pt: 'Inicie uma avaliação completa de 20 dimensões de negócios críticas (Digitalização, Automação, IA, Cibersegurança, etc.). Leva de 10 a 15 minutos.'
    },
    tip: {
      es: 'Tus respuestas se guardan automáticamente como borrador si necesitas continuar después.',
      en: 'Your progress is automatically saved as a draft if you need to finish later.',
      pt: 'Seu progresso é salvo como rascunho caso precise continuar depois.'
    },
    icon: Play,
    preferredPlacement: 'bottom'
  },
  {
    id: 'maturity-gauge',
    targetSelector: '#tour-maturity-widget',
    title: {
      es: 'Nivel y Medidor de Madurez Digital',
      en: 'Digital Maturity Gauge & Level',
      pt: 'Nível e Medidor de Maturidade Digital'
    },
    description: {
      es: 'En este widget circular verás tu índice de madurez global actualizado (0-100%) y tu escala clasificada: Inicial, Básico, Desarrollado o Líder Digital.',
      en: 'This circular gauge shows your updated digital maturity score (0-100%) and your classification: Initial, Basic, Developed, or Digital Leader.',
      pt: 'Neste gráfico circular você verá sua pontuação geral de maturidade (0-100%) e seu nível: Inicial, Básico, Desenvolvido ou Líder Digital.'
    },
    tip: {
      es: 'Haz clic en el icono (i) en cualquier momento para ver la escala y criterios de nivel.',
      en: 'Click the (i) icon at any time to inspect maturity level definitions and criteria.',
      pt: 'Clique no ícone (i) a qualquer momento para ver os critérios da escala.'
    },
    icon: Target,
    preferredPlacement: 'left'
  },
  {
    id: 'benefits',
    targetSelector: '#tour-benefit-cards',
    title: {
      es: 'Beneficios y Herramientas Incluidas',
      en: 'Included Tools & Benefits',
      pt: 'Ferramentas e Benefícios Inclusos'
    },
    description: {
      es: 'Tu cuenta incluye acceso 100% gratuito a resultados en tiempo real, informes oficiales en formato PDF con portada ejecutiva y planes de mejora cronológicos.',
      en: 'Your account includes 100% free access to instant analytics, formal PDF executive reports, and chronological roadmap improvement plans.',
      pt: 'Sua conta inclui acesso 100% gratuito a análises instantâneas, relatórios executivos em PDF e planos de melhoria cronológicos.'
    },
    tip: {
      es: 'Genera informes listos para presentar a gerencia o comités directivos.',
      en: 'Generate presentation-ready reports for leadership and board members.',
      pt: 'Gere relatórios prontos para apresentação à diretoria e investidores.'
    },
    icon: Zap,
    preferredPlacement: 'top'
  },
  {
    id: 'saved-history',
    targetSelector: '#tour-saved-history',
    title: {
      es: 'Historial y Visualizaciones Recharts',
      en: 'History & Recharts Benchmarks',
      pt: 'Histórico & Benchmarks Recharts'
    },
    description: {
      es: 'Tus evaluaciones se guardan de forma permanente. Podrás ver el progreso temporal (15-30 días) y comparar tus resultados con el promedio histórico de la plataforma mediante gráficos interactivos de Recharts.',
      en: 'Your diagnostics are securely stored. Track progress over time (15-30 days) and benchmark against the platform historical mean using interactive Recharts graphics.',
      pt: 'Seus diagnósticos são salvos permanentemente. Acompanhe a evolução temporal e compare seus dados com a média histórica da plataforma via gráficos Recharts.'
    },
    tip: {
      es: 'Se conservan tus últimas evaluaciones para análisis comparativos inmediatos.',
      en: 'Your latest evaluations are preserved for seamless follow-up analysis.',
      pt: 'Suas avaliações mais recentes são mantidas para análises comparativas.'
    },
    icon: BarChart3,
    preferredPlacement: 'top'
  },
  {
    id: 'header-controls',
    targetSelector: '#tour-header-controls',
    title: {
      es: 'Personalización, Idioma y Ajustes',
      en: 'Customization, Language & Settings',
      pt: 'Personalização, Idioma e Ajustes'
    },
    description: {
      es: 'Desde la barra superior puedes alternar entre modo oscuro y claro, cambiar de idioma (Español, English, Português), revisar notificaciones o cerrar sesión de forma segura.',
      en: 'From the top bar, you can toggle dark/light theme, switch languages (Spanish, English, Portuguese), inspect notifications, or securely sign out.',
      pt: 'Na barra superior você pode alternar entre modo escuro e claro, trocar de idioma (Espanhol, Inglês, Português) e gerenciar seu perfil.'
    },
    tip: {
      es: '¡Puedes reiniciar este tour cuando lo desees desde el menú de usuario o configuración!',
      en: 'You can restart this tour anytime from your user menu or settings modal!',
      pt: 'Você pode reiniciar este tour quando quiser pelo menu de usuário!'
    },
    icon: Layers,
    preferredPlacement: 'bottom'
  }
];

export default function InteractiveTourOverlay({
  isOpen,
  onClose,
  onComplete,
  onStartDiagnosis,
  userName = 'Usuario'
}: InteractiveTourOverlayProps) {
  const { language } = useLanguage();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const currentStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TOUR_STEPS.length - 1;

  // Track window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update target rect and smoothly scroll element into view
  const updateTargetRect = useCallback(() => {
    if (!isOpen) return;

    const selector = currentStep.targetSelector;
    const element = document.querySelector(selector);

    if (element) {
      // Scroll element smoothly into center view
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });

      // Give a tiny moment for smooth scroll to finish before calculating rect
      setTimeout(() => {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      }, 150);
    } else {
      setTargetRect(null);
    }
  }, [isOpen, currentStep]);

  useLayoutEffect(() => {
    updateTargetRect();
  }, [updateTargetRect, currentStepIndex]);

  // Listen to window scroll and resize to update spotlight position dynamically
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => {
      const element = document.querySelector(currentStep.targetSelector);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen, currentStep]);

  // Keyboard navigation: Escape (exit), ArrowRight/Enter (next), ArrowLeft (prev)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (isLastStep) {
          onComplete();
        } else {
          setCurrentStepIndex(prev => Math.min(TOUR_STEPS.length - 1, prev + 1));
        }
      } else if (e.key === 'ArrowLeft') {
        if (!isFirstStep) {
          setCurrentStepIndex(prev => Math.max(0, prev - 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFirstStep, isLastStep, onClose, onComplete]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleFinishAndStart = () => {
    onComplete();
    if (onStartDiagnosis) {
      onStartDiagnosis();
    }
  };

  // Card position calculations relative to target rect
  const padding = 8;
  const viewportWidth = windowSize.width || window.innerWidth;
  const viewportHeight = windowSize.height || window.innerHeight;
  const isMobile = viewportWidth < 640;
  const cardWidth = Math.min(380, viewportWidth - 32); // ensure card is never wider than screen
  const cardHeight = 280;

  let tooltipStyle: React.CSSProperties = {};
  let placement = currentStep.preferredPlacement || 'bottom';

  if (isMobile) {
    // On mobile devices, dock card cleanly near the bottom with safe margins
    tooltipStyle = {
      bottom: '16px',
      left: '12px',
      right: '12px',
      maxWidth: 'calc(100vw - 24px)',
      width: 'auto',
    };
  } else if (targetRect) {
    const spaceBelow = viewportHeight - (targetRect.bottom + padding);
    const spaceAbove = targetRect.top - padding;
    const spaceRight = viewportWidth - (targetRect.right + padding);
    const spaceLeft = targetRect.left - padding;

    // Adjust placement if space is constrained
    if (placement === 'bottom' && spaceBelow < cardHeight && spaceAbove > spaceBelow) {
      placement = 'top';
    } else if (placement === 'top' && spaceAbove < cardHeight && spaceBelow > spaceAbove) {
      placement = 'bottom';
    } else if (placement === 'left' && spaceLeft < cardWidth && spaceRight > spaceLeft) {
      placement = 'right';
    }

    if (placement === 'bottom') {
      const top = targetRect.bottom + padding + 12;
      const left = Math.max(16, Math.min(viewportWidth - cardWidth - 16, targetRect.left + (targetRect.width / 2) - (cardWidth / 2)));
      tooltipStyle = { top: `${top}px`, left: `${left}px`, maxWidth: `${cardWidth}px` };
    } else if (placement === 'top') {
      const top = Math.max(16, targetRect.top - padding - cardHeight - 12);
      const left = Math.max(16, Math.min(viewportWidth - cardWidth - 16, targetRect.left + (targetRect.width / 2) - (cardWidth / 2)));
      tooltipStyle = { top: `${top}px`, left: `${left}px`, maxWidth: `${cardWidth}px` };
    } else if (placement === 'left') {
      const left = Math.max(16, targetRect.left - padding - cardWidth - 12);
      const top = Math.max(16, Math.min(viewportHeight - cardHeight - 16, targetRect.top + (targetRect.height / 2) - (cardHeight / 2)));
      tooltipStyle = { top: `${top}px`, left: `${left}px`, maxWidth: `${cardWidth}px` };
    } else if (placement === 'right') {
      const left = Math.min(viewportWidth - cardWidth - 16, targetRect.right + padding + 12);
      const top = Math.max(16, Math.min(viewportHeight - cardHeight - 16, targetRect.top + (targetRect.height / 2) - (cardHeight / 2)));
      tooltipStyle = { top: `${top}px`, left: `${left}px`, maxWidth: `${cardWidth}px` };
    }
  } else {
    // Center modal if target is not found
    tooltipStyle = {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: `${cardWidth}px`,
      width: 'calc(100% - 32px)'
    };
  }

  const StepIcon = currentStep.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      
      {/* SVG SPOTLIGHT MASK OVERLAY */}
      <svg 
        className="fixed inset-0 w-full h-full pointer-events-auto cursor-default transition-all duration-300"
        onClick={onClose}
      >
        <defs>
          <mask id="tour-spotlight-mask">
            {/* White area covers everything (obscured) */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            
            {/* Black cutout creates the transparent spotlight hole */}
            {targetRect && (
              <rect
                x={Math.max(0, targetRect.left - padding)}
                y={Math.max(0, targetRect.top - padding)}
                width={targetRect.width + padding * 2}
                height={targetRect.height + padding * 2}
                rx="18"
                ry="18"
                fill="black"
              />
            )}
          </mask>
        </defs>

        {/* Semi-transparent dark dimmed background */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(8, 14, 28, 0.78)"
          mask="url(#tour-spotlight-mask)"
          className="backdrop-blur-xs"
        />
      </svg>

      {/* GLOWING HIGHLIGHT RING AROUND SPOTLIGHT TARGET */}
      {targetRect && (
        <div
          className="fixed pointer-events-none z-50 rounded-2xl border-2 border-cyan-400 ring-4 ring-cyan-400/30 transition-all duration-300 shadow-[0_0_35px_rgba(34,211,238,0.35)]"
          style={{
            top: Math.max(0, targetRect.top - padding),
            left: Math.max(0, targetRect.left - padding),
            width: targetRect.width + padding * 2,
            height: targetRect.height + padding * 2,
          }}
        />
      )}

      {/* FLOATING INTERACTIVE TOOLTIP CARD */}
      <div
        className={`fixed z-50 pointer-events-auto ${isMobile ? 'p-0' : 'w-full p-4'}`}
        style={tooltipStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-3xl bg-white dark:bg-[#0c162d] border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/50 p-5 md:p-6 text-slate-800 dark:text-slate-100 animate-in zoom-in-95 duration-200 overflow-hidden">
          
          {/* Subtle Ambient Light Corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 dark:bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
          
          {/* Top Row: Step Tag + Progress Dots + Close Button */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-cyan-950 text-blue-700 dark:text-cyan-400 text-[10px] font-black tracking-wider uppercase border border-blue-200 dark:border-cyan-800/60">
                {language === 'en' ? `Step ${currentStepIndex + 1} of ${TOUR_STEPS.length}` : `Paso ${currentStepIndex + 1} de ${TOUR_STEPS.length}`}
              </span>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center gap-1.5">
              {TOUR_STEPS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentStepIndex
                      ? 'bg-blue-600 dark:bg-cyan-400 w-5'
                      : idx < currentStepIndex
                      ? 'bg-blue-300 dark:bg-cyan-800'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  title={`Ir al paso ${idx + 1}`}
                />
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title={language === 'en' ? 'Close tour' : 'Cerrar tour'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="pt-3.5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <StepIcon className="w-4 h-4" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                {currentStep.title[language] || currentStep.title.es}
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              {currentStep.description[language] || currentStep.description.es}
            </p>

            {/* Helpful Pro-Tip Box */}
            {currentStep.tip && (
              <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-cyan-200 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {currentStep.tip[language] || currentStep.tip.es}
                </span>
              </div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
            
            {/* Skip Button */}
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 px-2 py-1.5 transition-colors cursor-pointer"
            >
              {language === 'en' ? 'Skip' : 'Omitir'}
            </button>

            {/* Navigation Buttons: Previous & Next / Finish */}
            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Back' : 'Anterior'}</span>
                </button>
              )}

              {isLastStep ? (
                <button
                  onClick={handleFinishAndStart}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-black text-xs shadow-md shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'en' ? 'Start Diagnosis' : '¡Comenzar Diagnóstico!'}</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>{language === 'en' ? 'Next' : 'Siguiente'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
