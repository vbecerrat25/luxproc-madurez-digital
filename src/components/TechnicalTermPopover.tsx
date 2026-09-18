import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X, Users, Briefcase, Mail, BarChart3, Cpu, Sparkles, QrCode, GitMerge, RotateCcw, LayoutDashboard, Activity, Cloud, Hammer, ShoppingCart } from 'lucide-react';
import { TECHNICAL_TERMS } from '../data';

interface TechnicalTermPopoverProps {
  termKey: string;
}

// Icon mapper helper
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Users': return <Users className="w-4 h-4" />;
    case 'Briefcase': return <Briefcase className="w-4 h-4" />;
    case 'Mail': return <Mail className="w-4 h-4" />;
    case 'BarChart3': return <BarChart3 className="w-4 h-4" />;
    case 'Cpu': return <Cpu className="w-4 h-4" />;
    case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />;
    case 'QrCode': return <QrCode className="w-4 h-4" />;
    case 'GitMerge': return <GitMerge className="w-4 h-4" />;
    case 'RotateCcw': return <RotateCcw className="w-4 h-4" />;
    case 'LayoutDashboard': return <LayoutDashboard className="w-4 h-4" />;
    case 'Activity': return <Activity className="w-4 h-4" />;
    case 'Cloud': return <Cloud className="w-4 h-4" />;
    case 'Hammer': return <Hammer className="w-4 h-4" />;
    case 'ShoppingCart': return <ShoppingCart className="w-4 h-4" />;
    default: return <HelpCircle className="w-4 h-4" />;
  }
};

export default function TechnicalTermPopover({ termKey }: TechnicalTermPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const termData = TECHNICAL_TERMS[termKey];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!termData) {
    return <span className="font-semibold underline decoration-dotted">{termKey}</span>;
  }

  return (
    <span ref={popoverRef} className="relative inline-flex items-center gap-1 mx-1">
      <span className="font-semibold border-b border-dashed border-blue-400 dark:border-cyan-400 text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-cyan-300 transition-colors" onClick={() => setIsOpen(!isOpen)}>
        {termKey}
      </span>
      <button
        id={`help-btn-${termKey.replace(/\s+/g, '-')}`}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-0.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-blue-500 dark:text-cyan-400 transition-all focus:outline-none focus:ring-1 focus:ring-blue-500"
        aria-label={`Explicación de ${termKey}`}
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 font-bold text-xs text-blue-600 dark:text-cyan-400">
              {getIcon(termData.icon)}
              <span>{termData.term}</span>
            </div>
            <button
              id={`close-help-${termKey.replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed font-normal">
            {termData.definition}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-3.5 h-3.5 rotate-45 border-r border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900" />
        </div>
      )}
    </span>
  );
}
