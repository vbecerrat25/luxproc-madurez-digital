import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ShieldAlert } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary capturó un error no controlado:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetDraft = () => {
    try {
      localStorage.removeItem('loopsblock_draft_company');
      localStorage.removeItem('loopsblock_draft_responses');
      localStorage.removeItem('loopsblock_draft_step');
    } catch (e) {
      console.warn('No se pudo limpiar localStorage:', e);
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white dark:bg-[#0c162d] border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Se detectó una interrupción en la vista
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                La aplicación ha evitado que la pantalla quede en blanco. Puedes restablecer el cuestionario o recargar la página para continuar sin problemas.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3.5 bg-slate-100 dark:bg-[#060c18] border border-slate-200 dark:border-slate-800 rounded-xl text-left text-[11px] font-mono text-slate-700 dark:text-slate-300 max-h-32 overflow-y-auto">
                <span className="text-red-500 font-bold block mb-1">Detalle:</span>
                {this.state.error.message || 'Error de renderizado en React'}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recargar Aplicación</span>
              </button>
              
              <button
                type="button"
                onClick={this.handleResetDraft}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Restablecer Borrador</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
