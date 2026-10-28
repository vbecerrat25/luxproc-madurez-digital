import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Globe, 
  KeyRound, 
  X 
} from 'lucide-react';
import { getSecurityAudit } from '../utils/security';
import { useLanguage } from '../i18n/LanguageContext';

interface SecurityShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SecurityShieldModal({
  isOpen,
  onClose
}: SecurityShieldModalProps) {
  const { language } = useLanguage();
  const audit = getSecurityAudit();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-[#0c1424] border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {language === 'en' ? 'Security & Protection Shield' : language === 'pt' ? 'Escudo de Segurança e Proteção' : 'Escudo de Seguridad & Protección'}
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-300/40">
                {language === 'en' ? 'Protected' : language === 'pt' ? 'Protegido' : 'Blindado'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'en'
                ? 'Client-side authenticated encryption, cloud sync and anti-phishing defense active'
                : language === 'pt'
                ? 'Criptografia autenticada, sincronização em nuvem e defesa anti-phishing ativas'
                : 'Cifrado de grado empresarial, respaldo en la nube y defensa anti-phishing activa'}
            </p>
          </div>
        </div>

        {/* Security Health Score Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/25 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center shadow-md shadow-emerald-500/25">
              100%
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {language === 'en' ? 'Persistence & Security: Optimal' : language === 'pt' ? 'Persistência e Segurança: Ótimas' : 'Persistencia y Blindaje: Máximo'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Host: {audit.currentHost}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Lock className="w-4 h-4" />
            <span>AES-256</span>
          </div>
        </div>

        {/* Security Modules List */}
        <div className="space-y-3 mb-6">
          {/* Module 1: Client-Side Authenticated Encryption */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-xs flex-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>
                  {language === 'en' ? 'Data Encryption at Rest (Client-Side)' : language === 'pt' ? 'Criptografia de Dados em Repouso' : 'Cifrado de Datos en Reposo (Cliente)'}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">ACTIVO</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                {language === 'en'
                  ? 'Diagnoses, company names, revenue, phones, and scores are fully encrypted with HMAC integrity tags before touching local browser storage.'
                  : language === 'pt'
                  ? 'Diagnósticos, nomes de empresas, receitas, telefones e notas são totalmente criptografados com tags HMAC antes de serem armazenados.'
                  : 'Los diagnósticos, empresas, teléfonos, correos y respuestas de madurez se cifran con verificación de integridad HMAC antes de guardarse en el navegador.'}
              </p>
            </div>
          </div>

          {/* Module 2: Anti-Phishing & Domain Verifier */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
            <Globe className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div className="text-xs flex-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>
                  {language === 'en' ? 'Anti-Phishing & Fake Domain Detection' : language === 'pt' ? 'Detecção de Phishing e Domínio Falso' : 'Protección Anti-Phishing y Verificación de Dominio'}
                </span>
                <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-mono font-bold">ACTIVO</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                {language === 'en'
                  ? 'Detects malicious clone portals trying to impersonate LUXPROC. Only trusted verified origins are authorized.'
                  : language === 'pt'
                  ? 'Detecta portais clones tentando se passar pela LUXPROC. Somente origens verificadas são autorizadas.'
                  : 'Detecta portales clones fraudulentos que intenten suplantar la identidad de LUXPROC para sustraer credenciales o datos.'}
              </p>
            </div>
          </div>

          {/* Module 3: Anti-XSS & Anti-Clickjacking */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
            <KeyRound className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
            <div className="text-xs flex-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>
                  {language === 'en' ? 'XSS & Session Tamper Shield' : language === 'pt' ? 'Blindagem contra XSS e Injeções' : 'Blindaje contra Inyección XSS y Secuestro de Clics'}
                </span>
                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono font-bold">ACTIVO</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                {language === 'en'
                  ? 'Strict input sanitization filters and secure referrer headers prevent malicious code injection.'
                  : language === 'pt'
                  ? 'Sanitização estrita de entradas e cabeçalhos seguros evitam injeção de código malicioso.'
                  : 'Filtros estrictos de sanitización en todos los formularios y cabeceras de seguridad nosniff para prevenir inyecciones.'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button: Close */}
        <div>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer transition-all shadow-md"
          >
            {language === 'en' ? 'Close' : language === 'pt' ? 'Fechar' : 'Cerrar Escudo'}
          </button>
        </div>
      </div>
    </div>
  );
}
