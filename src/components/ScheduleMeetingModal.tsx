import React from 'react';
import { X, Calendar, ExternalLink, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleMeetingModal({
  isOpen,
  onClose
}: ScheduleMeetingModalProps) {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const handleOpenPlatform = () => {
    window.open('https://luxproc.com/', '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          title="Cerrar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Glow Header Icon */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25 mb-4">
          <Calendar className="w-8 h-8" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
          {language === 'en' ? 'Schedule a Meeting' : language === 'pt' ? 'Agendar uma Reunião' : 'Agendar Reunión'}
        </h3>

        {/* Subtitle / Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed max-w-sm mx-auto">
          {language === 'en'
            ? 'Connect directly with the LUXPROC consulting team to review your assessment findings and define your digital roadmap.'
            : language === 'pt'
            ? 'Conecte-se diretamente com a equipe de consultoria LUXPROC para analisar sua avaliação e planejar os próximos passos.'
            : 'Coordina una sesión estratégica con el equipo consultor de LUXPROC para revisar tus resultados y definir tu plan de acción.'}
        </p>

        {/* Highlight Card */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
            <span>
              {language === 'en' ? 'Official Booking Portal' : language === 'pt' ? 'Portal Oficial de Agendamento' : 'Portal Oficial de Citas'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            {language === 'en'
              ? 'Choose your preferred date, time, and session format directly on our official platform:'
              : language === 'pt'
              ? 'Selecione a data, horário e formato da reunião diretamente em nossa plataforma oficial:'
              : 'Selecciona la fecha, hora y modalidad de tu reunión directamente en nuestra plataforma oficial:'}
          </p>
          <div className="pt-1 font-mono text-xs font-bold text-blue-600 dark:text-cyan-400">
            https://luxproc.com/
          </div>
        </div>

        {/* Action Button: Directly opens luxproc.com */}
        <div className="mt-6 space-y-3">
          <a
            href="https://luxproc.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25 transition-all transform active:scale-[0.99]"
          >
            <span>
              {language === 'en'
                ? 'Book Meeting on luxproc.com'
                : language === 'pt'
                ? 'Agendar Reunião no luxproc.com'
                : 'Agendar Reunión en luxproc.com'}
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer transition-all"
          >
            {language === 'en' ? 'Close' : language === 'pt' ? 'Fechar' : 'Cerrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
