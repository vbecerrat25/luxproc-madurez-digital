import React, { useState, useEffect } from 'react';
import { Mail, Lock, ShieldCheck, Check, ArrowRight, Loader2, AlertCircle, User, Eye, EyeOff, X } from 'lucide-react';
import { signInWithGoogle, cancelGoogleSignIn, signInWithEmail, signUpWithEmail } from '../lib/firebase';
import { useLanguage } from '../i18n/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface LoginScreenProps {
  onLoginSuccess: (email: string, name: string, picture?: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isWaitingLong, setIsWaitingLong] = useState(false);

  // Monitor waiting state when loading to inform user if taking longer than expected
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isLoading) {
      timer = setTimeout(() => {
        setIsWaitingLong(true);
      }, 7000);
    } else {
      setIsWaitingLong(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoading]);

  const handleCancel = () => {
    cancelGoogleSignIn();
    setIsLoading(false);
    setIsWaitingLong(false);
    setError(null);
  };

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);
    setIsWaitingLong(false);

    try {
      // 20 second safety timeout for rapid reaction
      const profile = await signInWithGoogle(20000);

      // If user closed popup, cancelled, or timed out
      if (profile.cancelled) {
        setIsLoading(false);
        setIsWaitingLong(false);
        if (profile.timedOut) {
          setError('La conexión con Google tardó demasiado. Puedes reintentar o usar el acceso directo.');
        }
        return;
      }
      
      // Check if they are signing in as master admin
      const isMaster = profile.email === 'luxproc.11@gmail.com';
      const finalName = isMaster ? 'Administrador Maestro' : profile.name;
      const finalAvatar = isMaster 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
        : profile.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(finalName)}`;
      
      onLoginSuccess(profile.email, finalName, finalAvatar);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err?.message === 'POPUP_BLOCKED' || err?.code === 'auth/popup-blocked') {
        setError(t('login.errPopupBlocked', 'La ventana emergente fue bloqueada por el navegador. Por favor permite las ventanas emergentes.'));
      } else if (err?.code === 'auth/operation-not-allowed') {
        setError('El proveedor de Google no está habilitado en Firebase Authentication > Proveedores de acceso.');
      } else if (err?.code === 'auth/unauthorized-domain') {
        setError('El dominio actual no está autorizado en Firebase. Verifica la lista de Dominios Autorizados.');
      } else if (err?.code) {
        setError(`Error (${err.code}): ${err.message || 'No se pudo completar el inicio de sesión.'}`);
      } else {
        setError(err?.message || t('login.errGeneral', 'No se pudo completar el inicio de sesión. Por favor intenta nuevamente.'));
      }
    } finally {
      setIsLoading(false);
      setIsWaitingLong(false);
    }
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const trimmedEmail = email.trim().toLowerCase();

    if (isRegistering) {
      if (!name.trim()) {
        setError(t('login.errEmptyName'));
        setIsLoading(false);
        return;
      }
      try {
        const profile = await signUpWithEmail(trimmedEmail, password, name.trim());
        setIsLoading(false);
        onLoginSuccess(profile.email, profile.name, profile.picture);
      } catch (err: any) {
        setIsLoading(false);
        if (err.code === 'auth/email-already-in-use') {
          setError(t('login.errEmailInUse'));
        } else if (err.code === 'auth/weak-password') {
          setError(t('login.errWeakPass'));
        } else if (err.code === 'auth/invalid-email') {
          setError(t('login.errInvalidEmail'));
        } else {
          console.warn('Registration notice:', err?.code || err?.message || err);
          setError(t('login.errRegister'));
        }
      }
    } else {
      // Check Master Admin login
      if (trimmedEmail === 'luxproc.11@gmail.com') {
        if (password.trim() === 'vfern@ndo987' || password.toLowerCase() === 'vfern@ndo987') {
          setIsLoading(false);
          onLoginSuccess(trimmedEmail, t('login.masterAdminName'), 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100');
          return;
        } else {
          setIsLoading(false);
          setError(t('login.errInvalidCreds'));
          return;
        }
      }

      // Real Firebase sign-in
      try {
        const profile = await signInWithEmail(trimmedEmail, password);
        setIsLoading(false);
        onLoginSuccess(profile.email, profile.name, profile.picture);
      } catch (err: any) {
        setIsLoading(false);
        if (err.code === 'auth/invalid-email') {
          setError(t('login.errInvalidEmail'));
        } else {
          console.warn('Login notice:', err?.code || err?.message || err);
          setError(t('login.errInvalidCreds'));
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4fa] dark:bg-[#060b18] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background graphic accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#a5b4fc_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 dark:bg-blue-500/5 blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-400/10 dark:bg-cyan-500/5 blur-3xl animate-float-reverse" />
      </div>

      {/* Top right language switch */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl border-2 border-slate-200 shadow-2xl shadow-slate-950/20 z-10 p-8 space-y-6 animate-in fade-in zoom-in duration-300 text-slate-900">
        
        {/* LUXPROC Branding Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center pb-1 min-h-[105px]">
            <img 
              src="https://i.imgur.com/WWChkA9.png" 
              alt="LUXPROC" 
              loading="eager"
              decoding="async"
              className="h-28 md:h-32 w-auto object-contain max-w-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallbackEl = document.getElementById('login-logo-fallback');
                if (fallbackEl) fallbackEl.style.display = 'inline-flex';
              }}
            />
            <div id="login-logo-fallback" className="hidden flex-col items-center justify-center gap-1">
              <span className="font-black text-3xl tracking-tight text-slate-900">
                LUX<span className="text-blue-600">PROC</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                INNOVACIÓN & TECNOLOGÍA
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-600 font-extrabold uppercase tracking-widest pt-1">
            {t('brand.platformSubtitle')}
          </p>
        </div>

        {/* Action Selector: Google Login & Credentials */}
        <div className="space-y-4">
          
          {/* REAL GOOGLE SIGN IN BUTTON */}
          <div className="space-y-2">
            <button
              disabled={isLoading}
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-300 transition-all cursor-pointer font-extrabold text-sm text-slate-800 shadow-xs focus:outline-none focus:ring-4 focus:ring-blue-500/15 disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                  <span>{t('login.verifying', 'Verificando acceso...')}</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>{t('login.signInWithGoogle')}</span>
                </>
              )}
            </button>

            {/* Instant Cancel and Fast Feedback when in loading state */}
            {isLoading && (
              <div className="flex flex-col items-center gap-1.5 py-1 animate-in fade-in duration-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancelar intento y volver</span>
                </button>
                {isWaitingLong && (
                  <p className="text-[11px] text-slate-500 text-center font-medium leading-tight">
                    ¿La ventana de Google quedó detrás o demora? Puedes cancelar o usar el acceso directo.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 font-bold py-1">
            <span className="w-full h-px bg-slate-200" />
            <span className="px-3 shrink-0 uppercase tracking-wider text-[10px] text-slate-500 font-extrabold">
              {isRegistering ? t('login.orRegister') : t('login.orCredentials')}
            </span>
            <span className="w-full h-px bg-slate-200" />
          </div>

          {/* CREDENTIALS LOGIN FORM */}
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-start gap-2 text-xs font-semibold animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {isRegistering && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                  {t('login.name')}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder={t('login.namePlaceholder', 'Tu nombre completo')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-600 transition-all shadow-2xs"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                {t('login.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder={t('login.emailPlaceholder', 'ejemplo@luxproc.com')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-600 transition-all shadow-2xs"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                {t('login.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder={t('login.passwordPlaceholder', '••••••••')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-sm text-slate-900 font-medium placeholder-slate-400 focus:bg-white hover:border-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/15 focus:border-blue-600 transition-all shadow-2xs"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none cursor-pointer"
                  title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" />
                  ) : (
                    <Eye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 focus:outline-none disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isRegistering ? t('login.creatingAccount') : t('login.verifying')}</span>
                </>
              ) : (
                <>
                  <span>{isRegistering ? t('login.registerBtn') : t('login.loginBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError(null);
                setPassword('');
                setName('');
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer focus:outline-none"
            >
              {isRegistering 
                ? t('login.haveAccount') 
                : t('login.noAccount')}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
