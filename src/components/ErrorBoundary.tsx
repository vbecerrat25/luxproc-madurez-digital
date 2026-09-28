import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, ArrowRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showTechnicalDetails: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showTechnicalDetails: false,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    const msg = error?.message || '';
    // Si el error es originado por la traducción del navegador (Google Translate / Safari), no bloquear la vista
    const isTranslationDomError =
      msg.includes('removeChild') ||
      msg.includes('insertBefore') ||
      msg.includes('not a child') ||
      msg.includes('The node to be removed');

    if (isTranslationDomError) {
      return {
        hasError: false,
        error: null,
        errorInfo: null,
        showTechnicalDetails: false,
      };
    }

    return {
      hasError: true,
      error,
      errorInfo: null,
      showTechnicalDetails: false,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const msg = error?.message || '';
    const isTranslationDomError =
      msg.includes('removeChild') ||
      msg.includes('insertBefore') ||
      msg.includes('not a child') ||
      msg.includes('The node to be removed');

    if (isTranslationDomError) {
      console.warn('Recuperado automáticamente de mutación DOM por traducción del navegador.');
      this.setState({ hasError: false, error: null, errorInfo: null });
      return;
    }

    console.warn('ErrorBoundary capturó una excepción:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleContinue = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleReset = () => {
    try {
      localStorage.removeItem('loopsblock_draft_company');
      localStorage.removeItem('loopsblock_draft_responses');
      localStorage.removeItem('loopsblock_draft_step');
    } catch (e) {
      console.warn('No se pudo limpiar almacenamiento local:', e);
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = window.location.pathname;
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-[#050b14] dark:via-[#091322] dark:to-[#070d19] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white/95 dark:bg-[#0c162d]/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            {/* Logo de LUXPROC */}
            <div className="flex justify-center mb-2">
              <img
                src="https://i.imgur.com/WWChkA9.png"
                alt="LUXPROC"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm"
              />
            </div>

            {/* Icono sutil de actualización / progreso */}
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/80 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Continuar con tu Evaluación
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Hemos preservado tus respuestas y optimizado la sincronización con tu navegador para que continúes sin inconvenientes.
              </p>
            </div>

            {/* Botones de acción principales */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={this.handleContinue}
                className="w-full py-3.5 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-blue-500/25 active:scale-[0.98]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Continuar Diagnóstico</span>
              </button>
              
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-3 px-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Ir al menú principal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Detalles técnicos colapsables para depuración discreta */}
            {this.state.error && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <button
                  type="button"
                  onClick={() => this.setState(prev => ({ showTechnicalDetails: !prev.showTechnicalDetails }))}
                  className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <span>{this.state.showTechnicalDetails ? 'Ocultar información técnica' : 'Ver información técnica'}</span>
                  {this.state.showTechnicalDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {this.state.showTechnicalDetails && (
                  <div className="mt-3 p-3 bg-slate-50 dark:bg-[#060c18] border border-slate-200 dark:border-slate-800 rounded-xl text-left text-[11px] font-mono text-slate-600 dark:text-slate-400 max-h-28 overflow-y-auto">
                    {this.state.error.message || 'Error de sincronización de vista'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
