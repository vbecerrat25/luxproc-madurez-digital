import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Language, LANGUAGES, UI_TRANSLATIONS, LanguageOption } from './translations';
import { DIMENSIONS_I18N, QUESTIONS_I18N, TECHNICAL_TERMS_I18N, MODULES_I18N, MATURITY_LEVELS_I18N } from './questionsTranslations';
import { Dimension, Question, TechnicalTerm } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isAutoDetect: boolean;
  setAutoDetect: (auto: boolean) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
  currentDimensions: Dimension[];
  currentQuestions: Question[];
  currentTechnicalTerms: Record<string, TechnicalTerm>;
  currentModules: { id: number; name: string }[];
  getMaturityLevelI18n: (score: number) => {
    levelNumber: 1 | 2 | 3 | 4 | 5;
    title: string;
    stageName: string;
    color: string;
    description: string;
    badgeClass: string;
    textClass: string;
    nextStep: string;
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY_LANG = 'luxproc_preferred_language';
const STORAGE_KEY_AUTO = 'luxproc_language_autodetect';

function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined' || !window.navigator) return 'es';
  const navLang = (window.navigator.language || (window.navigator.languages && window.navigator.languages[0]) || 'es').toLowerCase();
  
  if (navLang.startsWith('en')) return 'en';
  if (navLang.startsWith('pt')) return 'pt';
  return 'es';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isAutoDetect, setIsAutoDetectState] = useState<boolean>(() => {
    try {
      const storedAuto = localStorage.getItem(STORAGE_KEY_AUTO);
      return storedAuto !== null ? storedAuto === 'true' : true;
    } catch {
      return true;
    }
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const storedAuto = localStorage.getItem(STORAGE_KEY_AUTO);
      const storedLang = localStorage.getItem(STORAGE_KEY_LANG) as Language;
      
      if (storedAuto === 'false' && (storedLang === 'es' || storedLang === 'en' || storedLang === 'pt')) {
        return storedLang;
      }
      return detectBrowserLanguage();
    } catch {
      return 'es';
    }
  });

  // Mantener el atributo html lang sincronizado con el idioma activo
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Listen to browser language changes if auto-detect is active
  useEffect(() => {
    if (isAutoDetect) {
      const detected = detectBrowserLanguage();
      setLanguageState(detected);
      try {
        localStorage.setItem(STORAGE_KEY_LANG, detected);
      } catch (e) {
        console.warn('Storage notice:', e);
      }
    }
  }, [isAutoDetect]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setIsAutoDetectState(false);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
      localStorage.setItem(STORAGE_KEY_AUTO, 'false');
    } catch (e) {
      console.warn('Storage notice:', e);
    }
  };

  const setAutoDetect = (auto: boolean) => {
    setIsAutoDetectState(auto);
    try {
      localStorage.setItem(STORAGE_KEY_AUTO, auto ? 'true' : 'false');
      if (auto) {
        const detected = detectBrowserLanguage();
        setLanguageState(detected);
        localStorage.setItem(STORAGE_KEY_LANG, detected);
      }
    } catch (e) {
      console.warn('Storage notice:', e);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const dict = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.es;
    if (dict && dict[key]) {
      return dict[key];
    }
    // Fallback to Spanish dictionary
    if (UI_TRANSLATIONS.es && UI_TRANSLATIONS.es[key]) {
      return UI_TRANSLATIONS.es[key];
    }
    return fallback || key;
  };

  const currentDimensions = useMemo(() => DIMENSIONS_I18N[language] || DIMENSIONS_I18N.es, [language]);
  const currentQuestions = useMemo(() => QUESTIONS_I18N[language] || QUESTIONS_I18N.es, [language]);
  const currentTechnicalTerms = useMemo(() => TECHNICAL_TERMS_I18N[language] || TECHNICAL_TERMS_I18N.es, [language]);
  const currentModules = useMemo(() => MODULES_I18N[language] || MODULES_I18N.es, [language]);
  const getMaturityLevelI18n = useMemo(() => MATURITY_LEVELS_I18N[language] || MATURITY_LEVELS_I18N.es, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isAutoDetect,
        setAutoDetect,
        t,
        languages: LANGUAGES,
        currentDimensions,
        currentQuestions,
        currentTechnicalTerms,
        currentModules,
        getMaturityLevelI18n
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
