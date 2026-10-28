import React from 'react';
import { 
  X, Bell, CheckCheck, Trash2, Calendar, FileText, 
  Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Play 
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  category: 'system' | 'report' | 'meeting' | 'update';
  date: string;
  read: boolean;
  actionType?: 'survey' | 'results' | 'pdf' | 'security' | 'meeting' | 'admin' | 'recommendations' | 'tour';
  targetRecordId?: string;
  actionLabel?: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onMarkAsRead: (id: string) => void;
  onNotificationClick: (notification: AppNotification) => void;
  onDismissNotification: (id: string) => void;
}

function getNotificationActionLabel(item: AppNotification, language: string): string {
  if (item.actionLabel) return item.actionLabel;

  const t = item.title.toLowerCase();
  const m = item.message.toLowerCase();
  const cat = item.category;
  const action = item.actionType;

  if (action === 'survey' || t.includes('comienza') || t.includes('bienvenido') || t.includes('modelo 2026') || m.includes('comienza tu diagnóstico')) {
    return language === 'en' ? 'Start Assessment' : language === 'pt' ? 'Iniciar Avaliação' : 'Comenzar Diagnóstico';
  }
  if (action === 'pdf' || t.includes('pdf') || m.includes('pdf') || t.includes('informe')) {
    return language === 'en' ? 'View PDF Report' : language === 'pt' ? 'Ver Relatório PDF' : 'Ver Informe PDF';
  }
  if (action === 'results' || t.includes('completada') || m.includes('evaluación')) {
    return language === 'en' ? 'View Results' : language === 'pt' ? 'Ver Resultados' : 'Ver Resultados';
  }
  if (action === 'security' || t.includes('cifrado') || m.includes('cifrado') || t.includes('seguridad')) {
    return language === 'en' ? 'Security & Encryption' : language === 'pt' ? 'Segurança e Criptografia' : 'Ver Cifrado AES-256';
  }
  if (action === 'meeting' || cat === 'meeting' || t.includes('reunión')) {
    return language === 'en' ? 'Schedule Meeting' : language === 'pt' ? 'Agendar Reunião' : 'Agendar Reunión';
  }
  if (action === 'admin') {
    return language === 'en' ? 'Admin Panel' : language === 'pt' ? 'Painel Admin' : 'Panel de Administración';
  }
  return language === 'en' ? 'Open now' : language === 'pt' ? 'Abrir agora' : 'Ir ahora';
}

export default function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll,
  onMarkAsRead,
  onNotificationClick,
  onDismissNotification
}: NotificationsModalProps) {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                  {language === 'en' ? 'Notifications' : language === 'pt' ? 'Notificações' : 'Notificaciones'}
                </h3>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
                    {unreadCount}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en' 
                  ? 'Activity, system updates, and meeting alerts.' 
                  : language === 'pt' 
                  ? 'Atividades, atualizações e alertas de reuniões.' 
                  : 'Actividades, actualizaciones y accesos directos.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title={language === 'en' ? 'Close' : 'Cerrar'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        {notifications.length > 0 && (
          <div className="flex items-center justify-between pt-3 pb-2 text-[11px]">
            <span className="text-slate-400 font-medium">
              {unreadCount > 0 
                ? (language === 'en' ? `${unreadCount} unread` : language === 'pt' ? `${unreadCount} não lidas` : `${unreadCount} sin leer`) 
                : (language === 'en' ? 'All caught up' : language === 'pt' ? 'Tudo lido' : 'Todo al día')}
            </span>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="flex items-center gap-1 text-blue-600 dark:text-cyan-400 hover:underline font-bold cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'Mark all as read' : language === 'pt' ? 'Marcar como lidas' : 'Marcar leídas'}</span>
                </button>
              )}
              <button
                onClick={onClearAll}
                className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors font-semibold cursor-pointer"
                title={language === 'en' ? 'Clear all' : 'Eliminar todas'}
              >
                <Trash2 className="w-3 h-3" />
                <span>{language === 'en' ? 'Clear' : language === 'pt' ? 'Limpar' : 'Limpiar'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 py-2 pr-1">
          {notifications.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {language === 'en' ? 'No pending notifications' : language === 'pt' ? 'Sem notificações pendentes' : 'Sin notificaciones pendientes'}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                {language === 'en' 
                  ? 'All notifications have been completed or cleared. You are completely up to date.' 
                  : language === 'pt' 
                  ? 'Todas as notificações foram concluídas ou limpas. Você está em dia.' 
                  : 'Todas las actividades y notificaciones fueron atendidas o descartadas.'}
              </p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => onNotificationClick(item)}
                className={`group p-3.5 rounded-2xl border transition-all cursor-pointer text-left relative hover:border-blue-400 dark:hover:border-cyan-500/80 hover:shadow-md hover:bg-white dark:hover:bg-[#0e172a] ${
                  item.read
                    ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60'
                    : 'bg-blue-50/50 dark:bg-blue-950/25 border-blue-200/80 dark:border-blue-900/60 shadow-2xs'
                }`}
                title={language === 'en' ? 'Click to open and complete' : 'Clic para ir y completar'}
              >
                {/* Dismiss button (X) */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-cyan-400 animate-pulse" />
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDismissNotification(item.id);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all cursor-pointer"
                    title={language === 'en' ? 'Dismiss' : 'Descartar'}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {item.category === 'meeting' && (
                      <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                    )}
                    {item.category === 'report' && (
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                    )}
                    {item.category === 'update' && (
                      <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    )}
                    {item.category === 'system' && (
                      <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                        {item.title.toLowerCase().includes('cifrado') ? (
                          <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Bell className="w-4 h-4" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 pr-6">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                      {item.message}
                    </p>

                    {/* Action link & Date */}
                    <div className="mt-2.5 pt-2 border-t border-slate-150 dark:border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.date}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                        <span>{getNotificationActionLabel(item, language)}</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer transition-colors"
          >
            {language === 'en' ? 'Close' : language === 'pt' ? 'Fechar' : 'Cerrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
