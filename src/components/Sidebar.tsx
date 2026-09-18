import React from 'react';
import { 
  Home, 
  ClipboardCheck, 
  BarChart2, 
  Sparkles, 
  FileText, 
  Settings, 
  Rocket, 
  ShieldAlert,
  LogOut
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface SidebarProps {
  currentTab: 'home' | 'survey' | 'results' | 'recommendations' | 'reports' | 'settings' | 'admin';
  onSelectTab: (tab: 'home' | 'survey' | 'results' | 'recommendations' | 'reports' | 'settings' | 'admin') => void;
  hasRecords: boolean;
  isAdmin?: boolean;
  currentUser?: { name: string; email: string; picture?: string } | null;
  onLogout?: () => void;
}

export default function Sidebar({
  currentTab,
  onSelectTab,
  hasRecords,
  isAdmin = false,
  currentUser,
  onLogout
}: SidebarProps) {
  const { t } = useLanguage();

  const navItems = [
    {
      id: 'home' as const,
      label: t('header.home', 'Inicio'),
      icon: Home,
    },
    {
      id: 'survey' as const,
      label: t('nav.diagnosis', 'Diagnóstico'),
      icon: ClipboardCheck,
    },
    {
      id: 'results' as const,
      label: t('nav.results', 'Resultados'),
      icon: BarChart2,
    },
    {
      id: 'recommendations' as const,
      label: t('nav.recommendations', 'Recomendaciones'),
      icon: Sparkles,
    },
    {
      id: 'reports' as const,
      label: t('nav.reports', 'Reportes'),
      icon: FileText,
    },
    {
      id: 'settings' as const,
      label: t('nav.settings', 'Configuración'),
      icon: Settings,
    },
  ];

  return (
    <aside className="w-56 xl:w-64 shrink-0 flex flex-col justify-between p-3.5 bg-white dark:bg-[#091122] border-r border-slate-200/80 dark:border-slate-800/80 min-h-[calc(100vh-5rem)] select-none">
      {/* Navigation List */}
      <div className="space-y-1.5 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer text-left ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-blue-600 dark:hover:text-cyan-400'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        {isAdmin && (
          <button
            onClick={() => onSelectTab('admin')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer text-left mt-2 ${
              currentTab === 'admin'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40'
            }`}
          >
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="truncate">{t('header.admin', 'Panel Admin')}</span>
          </button>
        )}

        {/* Dedicated Logout Action inside Sidebar */}
        {onLogout && (
          <button
            id="sidebar-logout-btn"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer text-left mt-3 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/40"
            title={t('header.logout', 'Cerrar Sesión')}
          >
            <LogOut className="w-4 h-4 shrink-0 text-rose-500" />
            <span className="truncate">{t('header.logout', 'Cerrar Sesión')}</span>
          </button>
        )}
      </div>

      {/* Bottom Promo Card: "Tu transformación digital comienza aquí" */}
      <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-b from-blue-50/80 via-cyan-50/60 to-white dark:from-slate-900 dark:via-blue-950/40 dark:to-[#091122] border border-blue-100 dark:border-slate-800/80 mt-6 shadow-xs">
        {/* Soft Decorative Wave Background */}
        <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-xl pointer-events-none" />

        {/* Rocket Icon in Glowing Circle */}
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center shadow-md shadow-blue-500/25 mb-3">
          <Rocket className="w-5 h-5 -rotate-45 transform" />
        </div>

        {/* Card Title & Copy */}
        <h4 className="text-xs font-black text-slate-900 dark:text-white leading-snug tracking-tight">
          Tu transformación digital comienza aquí
        </h4>
        <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
          Conoce tu nivel de madurez y da el siguiente paso hacia el crecimiento.
        </p>
      </div>
    </aside>
  );
}

