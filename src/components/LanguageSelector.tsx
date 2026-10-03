import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Globe, Check, Sparkles, ChevronDown } from 'lucide-react';
import { Language } from '../i18n/translations';

interface LanguageSelectorProps {
  compact?: boolean;
}

export default function LanguageSelector({ compact = false }: LanguageSelectorProps) {
  const { language, setLanguage, isAutoDetect, setAutoDetect, languages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="language-selector-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#080e1a] text-slate-700 dark:text-slate-200 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        title={t('header.language')}
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
        <span className="text-sm sm:text-base leading-none">{currentOption.flag}</span>
        <span className="text-[11px] font-bold uppercase tracking-wider">{currentOption.code}</span>
        {isAutoDetect && (
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold border border-blue-500/20 hidden md:inline-flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            Auto
          </span>
        )}
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          id="language-dropdown-menu"
          className="absolute right-0 mt-1.5 w-56 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0d1526] shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>{t('header.language')}</span>
            {isAutoDetect && (
              <span className="text-blue-500 dark:text-blue-400 flex items-center gap-1 font-medium lowercase">
                <Sparkles className="w-3 h-3" />
                {language === 'en' ? 'auto-active' : language === 'pt' ? 'auto-ativo' : 'auto-activo'}
              </span>
            )}
          </div>

          {/* Auto detect toggle option */}
          <button
            type="button"
            onClick={() => {
              setAutoDetect(!isAutoDetect);
              setIsOpen(false);
            }}
            className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
              isAutoDetect 
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>{t('header.autoDetect')} {language === 'en' ? '(Browser)' : '(Navegador)'}</span>
            </div>
            {isAutoDetect && <Check className="w-3.5 h-3.5 text-blue-500" />}
          </button>

          <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

          {/* Languages list */}
          {languages.map((lang) => {
            const isSelected = language === lang.code && !isAutoDetect;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
