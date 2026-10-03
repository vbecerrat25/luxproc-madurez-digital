import React from 'react';
import { X, Bell, CheckCheck, Trash2, Calendar, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  category: 'system' | 'report' | 'meeting' | 'update';
  date: string;
  read: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onMarkAsRead: (id: string) => void;
}

export default function NotificationsModal({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearAll,
  onMarkAsRead
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
                  : 'Actividades, actualizaciones y alertas de reuniones.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title="Cerrar"
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
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {language === 'en' ? 'No notifications' : language === 'pt' ? 'Nenhuma notificação' : 'No tienes notificaciones'}
              </p>
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'You are completely up to date.' : language === 'pt' ? 'Você está totalmente em dia.' : 'Estás al día con todas las novedades.'}
              </p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => onMarkAsRead(item.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer text-left relative ${
                  item.read
                    ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-80'
                    : 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200/80 dark:border-blue-900/60 shadow-2xs'
                }`}
              >
                {!item.read && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-rose-500" />
                )}
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {item.category === 'meeting' && (
                      <div className="w-7 h-7 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {item.category === 'report' && (
                      <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {item.category === 'update' && (
                      <div className="w-7 h-7 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {item.category === 'system' && (
                      <div className="w-7 h-7 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                        <Bell className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 pr-3">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {item.message}
                    </p>
                    <span className="text-[9.5px] font-mono text-slate-400 block mt-1.5">
                      {item.date}
                    </span>
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
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs cursor-pointer"
          >
            {language === 'en' ? 'Close' : language === 'pt' ? 'Fechar' : 'Cerrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
