import React, { useState, useEffect } from 'react';
import { 
  Sun, Moon, Building2, Timer, CheckCircle2, Zap, FileDown, BrainCircuit, 
  ShieldAlert, Sparkles, RefreshCw, Play, ArrowRight, ChevronRight, Activity, 
  Cpu, Laptop, Users, Printer, LogOut, Trash2, Loader2, Bell, ChevronDown, 
  Menu, X, Settings, HelpCircle 
} from 'lucide-react';
import { CompanyInfo, DiagnosticResponse, DiagnosticRecord } from './types';
import { calculateMetrics } from './data';
import SurveyWizard from './components/SurveyWizard';
import ResultsDashboard from './components/ResultsDashboard';
import AdminPanel from './components/AdminPanel';
import LoginScreen from './components/LoginScreen';
import LanguageSelector from './components/LanguageSelector';
import Sidebar from './components/Sidebar';
import HomeDashboardView from './components/HomeDashboardView';
import HomeFeatureModals from './components/HomeFeatureModals';
import InteractiveTourOverlay from './components/InteractiveTourOverlay';
import { useLanguage } from './i18n/LanguageContext';

export default function App() {
  const { t, getMaturityLevelI18n } = useLanguage();
  // -----------------------------------------
  // STATE MANAGEMENT
  // -----------------------------------------
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; picture?: string } | null>(null);
  const [role, setRole] = useState<'user' | 'admin'>('user'); // Simulates 'Usuario Maestro' or normal SME
  const [view, setView] = useState<'home' | 'survey' | 'results' | 'admin' | 'print'>('home');
  const [previousView, setPreviousView] = useState<'home' | 'results' | 'admin'>('home');

  
  const [completedRecords, setCompletedRecords] = useState<DiagnosticRecord[]>([]);
  const [activeRecord, setActiveRecord] = useState<DiagnosticRecord | null>(null);
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [showIframeNotice, setShowIframeNotice] = useState<boolean>(false);
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [showTour, setShowTour] = useState<boolean>(false);

  // -----------------------------------------
  // HOOKS & PERSISTENCE
  // -----------------------------------------
  // Load initial settings and data on mount
  useEffect(() => {
    // 1. Theme Configuration
    const cachedTheme = localStorage.getItem('loopsblock_theme') as 'light' | 'dark' | null;
    let defaultTheme = cachedTheme;
    if (!defaultTheme) {
      // Respect the device's system settings if no preference is saved yet
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      defaultTheme = prefersDark ? 'dark' : 'light';
    }
    setTheme(defaultTheme);
    if (defaultTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 2. Load User Session
    const cachedUser = localStorage.getItem('luxproc_user');
    if (cachedUser) {
      const user = JSON.parse(cachedUser);
      setCurrentUser(user);
      const isAdmin = user.email.toLowerCase().trim() === 'luxproc.11@gmail.com';
      setRole(isAdmin ? 'admin' : 'user');
      
      // Auto-trigger tour if first time logging in
      const tourKey = `luxproc_tour_completed_${user.email.toLowerCase().trim()}`;
      if (localStorage.getItem(tourKey) !== 'true') {
        setTimeout(() => {
          setShowTour(true);
        }, 800);
      }
    }

    // 3. Load permanent evaluations database (purging legacy mock IDs to start 100% blank)
    let parsedRecords: DiagnosticRecord[] = [];
    const cachedRecords = localStorage.getItem('loopsblock_completed_diagnostics');
    if (cachedRecords) {
      try {
        const raw = JSON.parse(cachedRecords);
        const legacyMockIds = new Set(['DIG-2026-981', 'DIG-2026-742', 'DIG-2026-413', 'DIG-2026-105', 'DIG-2026-211', 'DIG-2026-302']);
        parsedRecords = Array.isArray(raw) ? raw.filter((r: DiagnosticRecord) => !legacyMockIds.has(r.id)) : [];
        setCompletedRecords(parsedRecords);
        localStorage.setItem('loopsblock_completed_diagnostics', JSON.stringify(parsedRecords));
      } catch (e) {
        parsedRecords = [];
        setCompletedRecords([]);
      }
    }

    // Check for print view query parameter
    const params = new URLSearchParams(window.location.search);
    const isPrintView = params.get('print') === 'true';
    const printId = params.get('id');
    
    if (isPrintView && printId) {
      const allRecs = parsedRecords;
      const record = allRecs.find(r => r.id === printId);
      if (record) {
        setActiveRecord(record);
        setView('print');
        // Automatically trigger print after elements are loaded
        setTimeout(() => {
          window.print();
        }, 1000);
      }
    }

    // 4. Check for ongoing draft
    if (!isPrintView) {
      const cachedStep = localStorage.getItem('loopsblock_draft_step');
      if (cachedStep && Number(cachedStep) > 0) {
        setHasDraft(true);
      }
    }
  }, []);

  // Listen to print events to temporarily disable dark mode during standard printing
  useEffect(() => {
    const handleBeforePrint = () => {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    };

    const handleAfterPrint = () => {
      const cachedTheme = localStorage.getItem('loopsblock_theme') || 'light';
      if (cachedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  // Sync completed evaluations database to local storage
  // Restricts user to at most 2 records, replacing the oldest
  const saveCompletedRecord = (newRecord: DiagnosticRecord) => {
    const emailToFilter = newRecord.companyInfo.contactEmail.toLowerCase().trim();
    
    // Find existing records for this email
    const userRecs = completedRecords.filter(
      r => r.companyInfo.contactEmail.toLowerCase().trim() === emailToFilter
    );

    let updated = [...completedRecords];

    if (userRecs.length >= 2) {
      // Find the oldest record for this email (since records are prepended, the last item is the oldest)
      const oldestUserRecord = userRecs[userRecs.length - 1];
      // Filter out that oldest record
      updated = updated.filter(r => r.id !== oldestUserRecord.id);
    }

    updated = [newRecord, ...updated];
    setCompletedRecords(updated);
    localStorage.setItem('loopsblock_completed_diagnostics', JSON.stringify(updated));
  };

  // Delete a saved diagnostic record
  const handleDeleteRecord = (id: string) => {
    const updated = completedRecords.filter(r => r.id !== id);
    setCompletedRecords(updated);
    localStorage.setItem('loopsblock_completed_diagnostics', JSON.stringify(updated));
    if (activeRecord?.id === id) {
      setActiveRecord(null);
      setView('home');
    }
    if (deletingId === id) {
      setDeletingId(null);
    }
  };

  // Clear all evaluations database to start 100% blank
  const handleClearAllRecords = () => {
    setCompletedRecords([]);
    localStorage.removeItem('loopsblock_completed_diagnostics');
    localStorage.removeItem('loopsblock_draft_company');
    localStorage.removeItem('loopsblock_draft_responses');
    localStorage.removeItem('loopsblock_draft_step');
    setActiveRecord(null);
    setHasDraft(false);
    setView('home');
  };

  // Toggle Dark/Light Mode
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('loopsblock_theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Convert oklch to hsl as an approximation to avoid crashing html2canvas
  const convertOklchToHsl = (oklchStr: string): string => {
    if (!oklchStr || typeof oklchStr !== 'string') return oklchStr;
    const cleaned = oklchStr.trim().toLowerCase();
    const match = cleaned.match(/oklch\s*\(([^)]+)\)/);
    if (!match) return oklchStr;

    const partsStr = match[1];
    const parts = partsStr.split(/[\s,\/]+/).filter(Boolean);
    if (parts.length < 3) return oklchStr;

    let lVal = parseFloat(parts[0]);
    if (parts[0].includes('%')) {
      lVal = lVal / 100;
    }
    lVal = Math.max(0, Math.min(1, lVal));

    const cVal = parseFloat(parts[1]);
    let hVal = parseFloat(parts[2]);
    if (isNaN(hVal)) hVal = 0;

    const aVal = parts[3] ? parseFloat(parts[3]) : null;

    const h = hVal;
    const s = Math.max(0, Math.min(100, cVal * 250));
    const l = lVal * 100;

    if (aVal !== null && !isNaN(aVal)) {
      return `hsla(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%, ${aVal})`;
    } else {
      return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`;
    }
  };

  // Convert oklab to hsl as an approximation to avoid crashing html2canvas
  const convertOklabToHsl = (oklabStr: string): string => {
    if (!oklabStr || typeof oklabStr !== 'string') return oklabStr;
    const cleaned = oklabStr.trim().toLowerCase();
    const match = cleaned.match(/oklab\s*\(([^)]+)\)/);
    if (!match) return oklabStr;

    const partsStr = match[1];
    const parts = partsStr.split(/[\s,\/]+/).filter(Boolean);
    if (parts.length < 3) return oklabStr;

    let lVal = parseFloat(parts[0]);
    if (parts[0].includes('%')) {
      lVal = lVal / 100;
    }
    lVal = Math.max(0, Math.min(1, lVal));

    const aVal = parseFloat(parts[1]);
    const bVal = parseFloat(parts[2]);
    if (isNaN(aVal) || isNaN(bVal)) return oklabStr;

    const alphaVal = parts[3] ? parseFloat(parts[3]) : null;

    // Convert OKLab coordinates to OKLCH (cylindrical) coordinates
    const cVal = Math.sqrt(aVal * aVal + bVal * bVal);
    let hVal = Math.atan2(bVal, aVal) * (180 / Math.PI);
    if (hVal < 0) hVal += 360;

    // Convert OKLCH to HSL
    const h = hVal;
    const s = Math.max(0, Math.min(100, cVal * 250));
    const l = lVal * 100;

    if (alphaVal !== null && !isNaN(alphaVal)) {
      return `hsla(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%, ${alphaVal})`;
    } else {
      return `hsl(${h.toFixed(1)}, ${s.toFixed(1)}%, ${l.toFixed(1)}%)`;
    }
  };

  const replaceOklchInString = (str: string): string => {
    if (!str || typeof str !== 'string') return str;
    let temp = str;
    temp = temp.replace(/oklch\s*\([^)]+\)/gi, (match) => {
      try {
        return convertOklchToHsl(match);
      } catch (e) {
        return match;
      }
    });
    temp = temp.replace(/oklab\s*\([^)]+\)/gi, (match) => {
      try {
        return convertOklabToHsl(match);
      } catch (e) {
        return match;
      }
    });
    return temp;
  };

  // Generate and download a high-quality client-side PDF file via html2pdf
  const handleDownloadPdf = () => {
    const element = document.getElementById('printable-report-card');
    if (!element) return;

    const html2pdf = (window as any).html2pdf;
    if (!html2pdf) {
      // Fallback: standard system print
      const originalTitle = document.title;
      document.title = `Diagnostico_Madurez_Digital_${activeRecord?.companyInfo.name.replace(/\s+/g, '_')}_${activeRecord?.id}`;
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
      return;
    }

    setIsGeneratingPdf(true);

    const originalGetComputedStyle = window.getComputedStyle;

    // Override getComputedStyle to intercept and replace any oklch or oklab color values with standard hsl
    window.getComputedStyle = function(el, pseudo) {
      const style = originalGetComputedStyle(el, pseudo);
      return new Proxy(style, {
        get(target, prop) {
          if (prop === 'getPropertyValue') {
            return function(propertyName: string) {
              const val = target.getPropertyValue(propertyName);
              if (val && typeof val === 'string' && (val.includes('oklch') || val.includes('oklab'))) {
                return replaceOklchInString(val);
              }
              return val;
            };
          }
          const val = (target as any)[prop];
          if (typeof val === 'string' && (val.includes('oklch') || val.includes('oklab'))) {
            return replaceOklchInString(val);
          }
          if (typeof val === 'function') {
            return val.bind(target);
          }
          return val;
        }
      });
    };

    const opt = {
      margin:       0, // Zero margin to print high-fidelity edge-to-edge pages
      filename:     `Diagnostico_Madurez_Digital_${activeRecord?.companyInfo.name.replace(/\s+/g, '_')}_${activeRecord?.id}.pdf`,
      pagebreak:    { mode: 'css' }, // Pure CSS pagebreaks prevent empty blank intermediate pages
      html2canvas:  { 
        scale: 2, 
        useCORS: true,
        logging: false,
        letterRendering: true,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc: Document) => {
          // Force light mode in the cloned document for clean, high-contrast PDF printing
          clonedDoc.documentElement.classList.remove('dark');
          if (clonedDoc.body) {
            clonedDoc.body.classList.remove('dark');
          }

          // Remove padding and border from report card wrapper for clean pages
          const clonedCard = clonedDoc.getElementById('printable-report-card');
          if (clonedCard) {
            clonedCard.style.setProperty('padding', '0px', 'important');
            clonedCard.style.setProperty('margin', '0px', 'important');
            clonedCard.style.setProperty('border', 'none', 'important');
            clonedCard.style.setProperty('box-shadow', 'none', 'important');
            clonedCard.style.setProperty('border-radius', '0px', 'important');
            clonedCard.style.setProperty('max-width', '794px', 'important');
            clonedCard.style.setProperty('width', '794px', 'important');
            clonedCard.style.setProperty('background-color', 'transparent', 'important');
          }

          // Clean up pages specifically for PDF format to prevent borders, shadows, or rounded corners
          const pages = clonedDoc.querySelectorAll('.pdf-page-container');
          pages.forEach((p: any, idx: number) => {
            p.style.setProperty('box-shadow', 'none', 'important');
            p.style.setProperty('border-radius', '0px', 'important');
            p.style.setProperty('margin', '0px', 'important');
            p.style.setProperty('margin-top', '0px', 'important');
            p.style.setProperty('margin-bottom', '0px', 'important');
            p.style.setProperty('padding', '36px 42px', 'important'); // standard balanced print margins
            p.style.setProperty('width', '794px', 'important');
            p.style.setProperty('height', '1120px', 'important');
            p.style.setProperty('max-height', '1120px', 'important');
            p.style.setProperty('min-height', '1120px', 'important');
            p.style.setProperty('box-sizing', 'border-box', 'important');
            p.style.setProperty('overflow', 'hidden', 'important');
            p.style.setProperty('display', 'flex', 'important');
            p.style.setProperty('flex-direction', 'column', 'important');
            p.style.setProperty('justify-content', 'space-between', 'important');
            p.style.setProperty('page-break-inside', 'avoid', 'important');
            p.style.setProperty('break-inside', 'avoid', 'important');

            // Cover page gets double border; other pages get clean borders
            if (idx === 0) {
              p.style.setProperty('border', '4px double #0f172a', 'important');
            } else {
              p.style.setProperty('border', 'none', 'important');
            }

            // Force a page break after each container except the last one
            if (idx < pages.length - 1) {
              p.style.setProperty('page-break-after', 'always', 'important');
              p.style.setProperty('break-after', 'page', 'important');
            } else {
              p.style.setProperty('page-break-after', 'auto', 'important');
              p.style.setProperty('break-after', 'auto', 'important');
            }
          });

          // Override getComputedStyle of the cloned window as well
          const clonedWindow = clonedDoc.defaultView;
          if (clonedWindow) {
            const originalClonedGetComputedStyle = clonedWindow.getComputedStyle;
            clonedWindow.getComputedStyle = function(el, pseudo) {
              const style = originalClonedGetComputedStyle(el, pseudo);
              return new Proxy(style, {
                get(target, prop) {
                  if (prop === 'getPropertyValue') {
                    return function(propertyName: string) {
                      const val = target.getPropertyValue(propertyName);
                      if (val && typeof val === 'string' && (val.includes('oklch') || val.includes('oklab'))) {
                        return replaceOklchInString(val);
                      }
                      return val;
                    };
                  }
                  const val = (target as any)[prop];
                  if (typeof val === 'string' && (val.includes('oklch') || val.includes('oklab'))) {
                    return replaceOklchInString(val);
                  }
                  if (typeof val === 'function') {
                    return val.bind(target);
                  }
                  return val;
                }
              });
            };
          }

          // Clean up stylesheet rules containing oklch or oklab
          try {
            for (let i = 0; i < clonedDoc.styleSheets.length; i++) {
              const sheet = clonedDoc.styleSheets[i];
              try {
                const rules = sheet.cssRules || sheet.rules;
                if (!rules) continue;
                for (let j = 0; j < rules.length; j++) {
                  const rule = rules[j] as CSSStyleRule;
                  if (rule.style) {
                    for (let k = 0; k < rule.style.length; k++) {
                      const propName = rule.style[k];
                      const val = rule.style.getPropertyValue(propName);
                      if (val && (val.includes('oklch') || val.includes('oklab'))) {
                        const converted = replaceOklchInString(val);
                        rule.style.setProperty(propName, converted);
                      }
                    }
                  }
                }
              } catch (e) {
                // Cross-origin sheets might throw, ignore them
              }
            }
          } catch (e) {
            console.warn("Error patching cloned stylesheets:", e);
          }

          // Also patch any <style> inner text
          const styles = clonedDoc.querySelectorAll('style');
          styles.forEach(styleEl => {
            if (styleEl.innerHTML.includes('oklch') || styleEl.innerHTML.includes('oklab')) {
              styleEl.innerHTML = replaceOklchInString(styleEl.innerHTML);
            }
          });
        }
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        window.getComputedStyle = originalGetComputedStyle;
        setIsGeneratingPdf(false);
      })
      .catch((err: any) => {
        window.getComputedStyle = originalGetComputedStyle;
        console.warn('PDF export fallback to print:', err);
        setIsGeneratingPdf(false);
        // Fallback
        window.print();
      });
  };

  // -----------------------------------------
  // LOGIN / LOGOUT HANDLERS
  // -----------------------------------------
  const handleLoginSuccess = (email: string, name: string, picture?: string) => {
    const user = { email, name, picture };
    setCurrentUser(user);
    localStorage.setItem('luxproc_user', JSON.stringify(user));
    
    const isAdmin = email.toLowerCase().trim() === 'luxproc.11@gmail.com';
    setRole(isAdmin ? 'admin' : 'user');
    
    if (isAdmin) {
      setView('admin');
    } else {
      setView('home');
    }

    // Check if user is logging in for the first time and auto-launch interactive tour
    const tourKey = `luxproc_tour_completed_${email.toLowerCase().trim()}`;
    const hasCompletedTour = localStorage.getItem(tourKey) === 'true';
    if (!hasCompletedTour) {
      setTimeout(() => {
        setView('home');
        setShowTour(true);
      }, 500);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('luxproc_user');
    setView('home');
    setActiveRecord(null);
    setRole('user');
    setShowTour(false);
  };

  const handleTourComplete = () => {
    if (currentUser) {
      const tourKey = `luxproc_tour_completed_${currentUser.email.toLowerCase().trim()}`;
      localStorage.setItem(tourKey, 'true');
    }
    setShowTour(false);
  };

  const handleTourStartDiagnosis = () => {
    handleTourComplete();
    handleStartFresh();
  };

  // -----------------------------------------
  // CORE COMPONENT HANDLERS
  // -----------------------------------------
  const handleSurveyComplete = (info: CompanyInfo, responses: DiagnosticResponse[]) => {
    const calculatedMetrics = calculateMetrics(responses);
    const uniqueId = `DIG-2026-${Math.floor(100 + Math.random() * 900)}`;
    const now = new Date();
    
    const newRecord: DiagnosticRecord = {
      id: uniqueId,
      date: now.toLocaleDateString('es-ES'),
      time: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      companyInfo: info,
      responses,
      metrics: calculatedMetrics
    };

    saveCompletedRecord(newRecord);
    setActiveRecord(newRecord);
    setView('results');
    setHasDraft(false);
  };

  const handleResumeSurvey = () => {
    setView('survey');
  };

  const handleStartFresh = () => {
    localStorage.removeItem('loopsblock_draft_company');
    localStorage.removeItem('loopsblock_draft_responses');
    localStorage.removeItem('loopsblock_draft_step');
    setHasDraft(false);
    setView('survey');
  };

  const handleSelectSidebarTab = (tab: 'home' | 'survey' | 'results' | 'recommendations' | 'reports' | 'settings' | 'admin') => {
    if (tab === 'home') {
      setView('home');
      setActiveRecord(null);
    } else if (tab === 'survey') {
      handleStartFresh();
    } else if (tab === 'results' || tab === 'recommendations') {
      const userRecs = currentUser ? completedRecords.filter(
        r => r.companyInfo.contactEmail.toLowerCase().trim() === currentUser.email.toLowerCase().trim()
      ) : [];
      if (activeRecord) {
        setView('results');
      } else if (userRecs.length > 0) {
        setActiveRecord(userRecs[0]);
        setView('results');
      } else {
        handleStartFresh();
      }
    } else if (tab === 'reports') {
      const userRecs = currentUser ? completedRecords.filter(
        r => r.companyInfo.contactEmail.toLowerCase().trim() === currentUser.email.toLowerCase().trim()
      ) : [];
      if (activeRecord) {
        setPreviousView(view === 'print' ? 'home' : (view as any));
        setView('print');
      } else if (userRecs.length > 0) {
        setActiveRecord(userRecs[0]);
        setPreviousView('home');
        setView('print');
      } else {
        setView('home');
      }
    } else if (tab === 'settings') {
      setShowSettingsModal(true);
    } else if (tab === 'admin') {
      setView('admin');
    }
  };

  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-100/90 dark:bg-[#060b17] font-sans transition-colors duration-300 relative overflow-x-hidden text-slate-800 dark:text-slate-100 selection:bg-blue-500/30 flex flex-col">
      
      {/* -----------------------------------------
          AMBIENT TECHNOLOGICAL BACKGROUND (LUXPROC BRAND COLORS)
          ----------------------------------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none print:hidden">
        {/* Subtle grid mesh overlay adapted to blue theme */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-60 dark:opacity-30" />
        
        {/* Elegant floating light beams in the brand colors */}
        <div className="absolute top-10 left-1/3 w-120 h-120 rounded-full bg-blue-600/8 dark:bg-blue-500/5 blur-3xl animate-float-slow" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-cyan-400/8 dark:bg-cyan-500/5 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-blue-500/8 dark:bg-blue-600/5 blur-3xl animate-float-reverse" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-indigo-500/8 dark:bg-indigo-500/3 blur-3xl animate-float-slow" />
      </div>

      {view !== 'print' ? (
        /* RESPONSIVE CONTAINER WITH TOP HEADER + SIDEBAR + MAIN VIEW */
        <div className="w-full flex-1 flex flex-col relative z-10 min-h-screen">
          
          {/* Header - Identical to desired design */}
          <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#091122]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs shrink-0 w-full">
            <div className="w-full px-3 sm:px-5 md:px-6 h-16 flex items-center justify-between gap-3">
              
              {/* Left: Mobile hamburger + LUXPROC Logo + Vertical Divider + Title */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
                {/* Mobile sidebar button */}
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Abrir menú"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <button
                  onClick={() => { setView('home'); setActiveRecord(null); }}
                  className="flex items-center gap-2 sm:gap-3 cursor-pointer text-left focus:outline-none"
                >
                  <img 
                    src="https://i.imgur.com/WWChkA9.png" 
                    alt="LUXPROC" 
                    className="h-10 sm:h-12 w-auto max-w-[150px] sm:max-w-[200px] object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallbackEl = document.getElementById('logo-text-fallback');
                      if (fallbackEl) fallbackEl.style.display = 'inline-flex';
                    }}
                  />
                  <span id="logo-text-fallback" className="hidden font-black text-lg tracking-tight text-slate-900 dark:text-white">
                    LUX<span className="text-blue-600 dark:text-blue-400">PROC</span>
                  </span>
                  
                  {/* Vertical separator */}
                  <div className="hidden xl:block h-6 w-px bg-slate-200 dark:bg-slate-800" />

                  {/* Digital Maturity Diagnosis Title */}
                  <span className="hidden xl:inline-block font-extrabold text-xs tracking-wider uppercase text-slate-800 dark:text-slate-100">
                    {t('brand.platformSubtitle', 'DIAGNÓSTICO DE MADUREZ DIGITAL')}
                  </span>
                </button>
              </div>

              {/* Right: Language Selector, Theme Toggle, Notifications, Logout Button, User Profile Pill */}
              <div id="tour-header-controls" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                
                {/* Multilingual Selector with Auto-Detect */}
                <LanguageSelector compact />

                {/* View/Dashboard Selector for Admin */}
                {role === 'admin' && (
                  <button
                    onClick={() => { setView(view === 'admin' ? 'home' : 'admin'); }}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      view === 'admin'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-cyan-400 border border-blue-200 dark:border-blue-900'
                    }`}
                    title={view === 'admin' ? t('header.home') : t('header.admin')}
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span className="hidden md:inline">{view === 'admin' ? 'Inicio' : 'Admin'}</span>
                  </button>
                )}

                {/* Theme Toggle button */}
                <button
                  id="theme-toggle-btn"
                  onClick={toggleTheme}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition-all cursor-pointer focus:outline-none shadow-2xs shrink-0"
                  aria-label={t('header.toggleTheme')}
                  title={t('header.toggleTheme')}
                >
                  {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>

                {/* Interactive Tour Guide Button */}
                <button
                  onClick={() => {
                    setView('home');
                    setShowTour(true);
                  }}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 transition-all cursor-pointer shadow-2xs shrink-0"
                  title="Tour interactivo de la plataforma"
                >
                  <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                </button>

                {/* Notification Bell with Badge */}
                <button
                  onClick={() => setShowNotificationModal(true)}
                  className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 transition-all cursor-pointer shadow-2xs shrink-0"
                  title="Notificaciones"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                </button>

                {/* DIRECT LOGOUT BUTTON: Always visible and accessible on mobile, tablet & desktop */}
                {currentUser && (
                  <button
                    id="header-logout-btn"
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-all text-xs font-bold shrink-0 cursor-pointer shadow-2xs"
                    title={t('header.logout', 'Cerrar Sesión')}
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{t('header.logout', 'Cerrar Sesión')}</span>
                  </button>
                )}

                {/* User Profile Pill (Avatar + Name + Empresa + Dropdown) */}
                {currentUser && (
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className="flex items-center gap-1.5 sm:gap-2 p-1 sm:pl-1.5 sm:pr-2.5 rounded-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0d1629] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer shadow-2xs"
                      title={currentUser.name}
                    >
                      <img
                        src={currentUser.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`}
                        alt={currentUser.name}
                        className="w-7 h-7 rounded-full border border-blue-500/40 object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="hidden lg:flex flex-col text-left leading-tight pr-0.5">
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate max-w-[100px]">
                          {currentUser.name || 'Usuario'}
                        </span>
                        <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 leading-none">
                          {role === 'admin' ? 'Administrador' : 'Empresa'}
                        </span>
                      </div>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserDropdown && (
                      <div className="absolute right-0 mt-2 w-52 max-w-[calc(100vw-24px)] rounded-2xl bg-white dark:bg-[#0d1629] border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80">
                          <p className="text-xs font-black text-slate-800 dark:text-white truncate">{currentUser.name}</p>
                          <p className="text-[10.5px] text-slate-400 truncate">{currentUser.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            setView('home');
                            setShowTour(true);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all cursor-pointer mt-1"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                          <span>Guía Interactiva (Tour)</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            setShowSettingsModal(true);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                        >
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Configuración</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowUserDropdown(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>{t('header.logout')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>

            </div>
          </header>

          {/* Core Layout: Left Sidebar + Main Content Area */}
          <div className="flex-1 flex flex-row w-full relative z-10">
            
            {/* Desktop Left Sidebar (Always visible on lg screens) */}
            <div className="hidden lg:block shrink-0">
              <Sidebar
                currentTab={
                  view === 'home' ? 'home' :
                  view === 'survey' ? 'survey' :
                  view === 'results' ? 'results' :
                  view === 'admin' ? 'admin' : 'home'
                }
                onSelectTab={handleSelectSidebarTab}
                hasRecords={completedRecords.length > 0}
                isAdmin={role === 'admin'}
                currentUser={currentUser}
                onLogout={handleLogout}
              />
            </div>

            {/* Mobile Drawer Sidebar */}
            {isMobileSidebarOpen && (
              <div className="fixed inset-0 z-50 lg:hidden flex">
                <div 
                  className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity" 
                  onClick={() => setIsMobileSidebarOpen(false)} 
                />
                <div className="relative w-72 max-w-[85vw] bg-white dark:bg-[#091122] h-full shadow-2xl z-10 flex flex-col">
                  {/* Drawer Header */}
                  <div className="p-3.5 flex justify-between items-center border-b border-slate-200 dark:border-slate-800">
                    <span className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider">Menú de Navegación</span>
                    <button 
                      onClick={() => setIsMobileSidebarOpen(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                      title="Cerrar menú"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* User Profile & Direct Logout in Mobile/Tablet Drawer */}
                  {currentUser && (
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <img
                          src={currentUser.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${currentUser.name}`}
                          alt={currentUser.name}
                          className="w-10 h-10 rounded-full border border-blue-500/40 object-cover shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                          <p className="text-[10.5px] text-slate-400 dark:text-slate-500 truncate">{currentUser.email}</p>
                          <span className="inline-block mt-0.5 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400">
                            {role === 'admin' ? 'Administrador' : 'Empresa'}
                          </span>
                        </div>
                      </div>

                      {/* Prominent Full-Width Cerrar Sesión Button in Mobile Drawer */}
                      <button
                        id="mobile-drawer-logout-btn"
                        onClick={() => {
                          setIsMobileSidebarOpen(false);
                          handleLogout();
                        }}
                        className="w-full mt-3 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 font-bold text-xs transition-all cursor-pointer shadow-xs"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>{t('header.logout', 'Cerrar Sesión')}</span>
                      </button>
                    </div>
                  )}

                  <div className="flex-1 overflow-y-auto">
                    <Sidebar
                      currentTab={
                        view === 'home' ? 'home' :
                        view === 'survey' ? 'survey' :
                        view === 'results' ? 'results' :
                        view === 'admin' ? 'admin' : 'home'
                      }
                      onSelectTab={(tab) => {
                        setIsMobileSidebarOpen(false);
                        handleSelectSidebarTab(tab);
                      }}
                      hasRecords={completedRecords.length > 0}
                      isAdmin={role === 'admin'}
                      currentUser={currentUser}
                      onLogout={handleLogout}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 p-4 sm:p-5 md:p-6 lg:p-7 overflow-x-hidden min-w-0 flex flex-col justify-start">
              
              {/* VIEW: HOME / NEW DASHBOARD SCREEN */}
              {view === 'home' && (
                <HomeDashboardView
                  currentUser={currentUser}
                  completedRecords={completedRecords}
                  hasDraft={hasDraft}
                  deletingId={deletingId}
                  onStartFresh={handleStartFresh}
                  onResumeSurvey={handleResumeSurvey}
                  onViewReport={(rec) => {
                    setActiveRecord(rec);
                    setView('results');
                  }}
                  onExportPdf={(rec) => {
                    setActiveRecord(rec);
                    setPreviousView('home');
                    setView('print');
                  }}
                  onDeleteRecord={handleDeleteRecord}
                  onSetDeletingId={setDeletingId}
                />
              )}

            {/* VIEW: SURVEY WIZARD */}
            {view === 'survey' && (
              <div className="animate-in fade-in duration-500 py-2">
                <SurveyWizard onComplete={handleSurveyComplete} defaultEmail={currentUser.email} />
              </div>
            )}

            {/* VIEW: RESULTS DASHBOARD */}
            {view === 'results' && activeRecord && (
              <div className="animate-in fade-in duration-500">
                <ResultsDashboard 
                  record={activeRecord} 
                  userRecords={completedRecords}
                  onRestart={() => { setView('home'); setActiveRecord(null); }} 
                  onViewPrint={() => {
                    setPreviousView('results');
                    setView('print');
                  }}
                  onBackToAdmin={role === 'admin' ? () => { setView('admin'); } : undefined}
                />
              </div>
            )}

            {/* VIEW: MASTER ADMIN GLOBAL PANEL */}
            {view === 'admin' && (
              <div className="animate-in fade-in duration-500">
                <AdminPanel 
                  userRecords={completedRecords} 
                  onViewRecord={(rec) => {
                    setActiveRecord(rec);
                    setView('results');
                  }} 
                  onPrintRecord={(rec) => {
                    setActiveRecord(rec);
                    setPreviousView('admin');
                    setView('print');
                  }}
                  onDeleteRecord={handleDeleteRecord}
                  onClearAllRecords={handleClearAllRecords}
                />
              </div>
            )}

          </main>

        </div>

        {/* Global Notifications & Settings Modals */}
        <HomeFeatureModals
          type={
            showNotificationModal ? 'notifications' :
            showSettingsModal ? 'settings' : null
          }
          onClose={() => {
            setShowNotificationModal(false);
            setShowSettingsModal(false);
          }}
          onStartSurvey={handleStartFresh}
          onRestartTour={() => {
            setView('home');
            setShowTour(true);
          }}
          hasRecord={completedRecords.length > 0}
        />

        {/* First-Time User Interactive Tour Overlay */}
        <InteractiveTourOverlay
          isOpen={showTour}
          onClose={handleTourComplete}
          onComplete={handleTourComplete}
          onStartDiagnosis={handleTourStartDiagnosis}
          userName={currentUser?.name || 'Usuario'}
        />

      </div>
      ) : (
        /* PRINT VIEW (STAYS FULL-WIDTH) */
        <main className="max-w-4xl w-full mx-auto px-4 py-8 relative z-10 min-h-screen flex flex-col justify-start">
          
          {/* VIEW: PRINT VIEW */}
          {view === 'print' && activeRecord && (
            <div className="animate-in fade-in duration-500 bg-[#f0f4fa] dark:bg-[#060b18] min-h-screen pb-16 pt-6 print:bg-white print:p-0 print:m-0">
              {/* Top helper banner, hidden in print */}
              <div className="max-w-4xl mx-auto mb-4 sm:mb-6 p-3.5 sm:p-5 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 print:hidden shadow-md animate-in slide-in-from-top-4 duration-300">
                <div className="space-y-1 text-left w-full lg:w-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">Vista Previa de Impresión Oficial</span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Para guardar digitalmente, presiona <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Guardar PDF</strong> (descarga directa). Para copias físicas, presiona <strong className="text-blue-600 dark:text-cyan-400 font-bold">Imprimir PDF</strong>.
                  </p>
                  {window.self !== window.top && (
                    <div className="mt-1.5 p-2 sm:p-2.5 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-xl text-[10px] sm:text-[11px] font-medium flex items-start gap-1.5 border border-amber-200/50 dark:border-amber-900/30">
                      <span>⚠️ <strong>Nota:</strong> Si el visor bloquea la impresión directa, usa <strong>Guardar PDF</strong> o abre en una <strong>Pestaña Nueva</strong>.</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto justify-start sm:justify-end">
                  <button
                    onClick={() => setView(previousView)}
                    className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-all focus:outline-none shadow-sm text-center"
                  >
                    ← Volver
                  </button>
                  <button
                    onClick={handleDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-700 dark:hover:bg-emerald-600 font-bold text-xs cursor-pointer flex items-center justify-center gap-2 focus:outline-none shadow-sm transition-all hover:scale-102 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed text-center"
                  >
                    {isGeneratingPdf ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generando...</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4" />
                        <span>Guardar PDF</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      if (window.self !== window.top) {
                        setShowIframeNotice(true);
                      }
                      window.print();
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 font-bold text-xs cursor-pointer flex items-center justify-center gap-2 focus:outline-none shadow-sm transition-all hover:scale-102 active:scale-98 text-center"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir</span>
                  </button>
                </div>
              </div>

              {/* Render the printable report view simulating sheet on-screen */}
              <div id="printable-report-card" className="max-w-4xl mx-auto bg-transparent text-black p-0 border-0 shadow-none rounded-none print:m-0 print:p-0">
                <div className="print-content-wrapper w-full">
                  <ResultsDashboard 
                    record={activeRecord} 
                    userRecords={completedRecords}
                    onRestart={() => {}} 
                    isDirectPrint={true}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Warning Dialog for Iframe browser restrictions */}
          {showIframeNotice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 print:hidden">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 text-left animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
                  <div className="p-2.5 bg-amber-50 dark:bg-amber-950/50 rounded-2xl">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white uppercase tracking-wider">
                    Restricción de Vista Previa
                  </h3>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                  Los navegadores de internet bloquean el menú de impresión nativo si se ejecuta dentro de marcos integrados (iframes) por motivos de seguridad.
                </p>

                <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <p>
                    💡 <strong>Cómo solucionar esto:</strong> Abre la aplicación en una pestaña nueva haciendo clic en el icono de la flecha hacia arriba a la derecha <span className="font-mono bg-slate-200 dark:bg-slate-800 px-1 rounded font-bold">↗</span> en la esquina superior del panel de previsualización.
                  </p>
                  <p>
                    📥 <strong>Descarga Directa:</strong> Si no deseas abrir otra pestaña, haz clic en el botón <strong className="text-emerald-600 dark:text-emerald-400">Guardar PDF</strong> para descargarlo de forma directa e instantánea desde este panel.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    onClick={() => setShowIframeNotice(false)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl cursor-pointer transition-all border border-slate-200 dark:border-slate-700"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => {
                      setShowIframeNotice(false);
                      handleDownloadPdf();
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-900/10"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Guardar PDF</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      )}

    </div>
  );
}
