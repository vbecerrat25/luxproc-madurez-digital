import React, { useState, useEffect } from 'react';
import { CompanyInfo, DiagnosticResponse, SectorType, CompanySizeType, TargetCustomerType, Question, ScoreMetrics } from '../types';
import TechnicalTermPopover from './TechnicalTermPopover';
import { useLanguage } from '../i18n/LanguageContext';
import { safeStorage } from '../utils/storage';
import { 
  Building2, Mail, Compass, HelpCircle, ArrowRight, ArrowLeft, 
  Check, Play, Save, CheckCircle2, RotateCcw, Building, Users, Activity,
  Store, Briefcase, Hammer, Info, Sparkles
} from 'lucide-react';

interface SurveyWizardProps {
  onComplete: (company: CompanyInfo, responses: DiagnosticResponse[]) => void;
  savedState?: { companyInfo: CompanyInfo; responses: DiagnosticResponse[]; currentStep: number };
  defaultEmail?: string;
}

export default function SurveyWizard({ onComplete, savedState, defaultEmail }: SurveyWizardProps) {
  const { t, currentQuestions = [], currentDimensions = [] } = useLanguage();

  // Dynamic assessment modules based on current language
  const MODULES = [
    {
      id: 1,
      name: t('module.1.title'),
      description: t('module.1.desc'),
      questionIds: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5']
    },
    {
      id: 2,
      name: t('module.2.title'),
      description: t('module.2.desc'),
      questionIds: ['Q6', 'Q8', 'Q10', 'Q17', 'Q18']
    },
    {
      id: 3,
      name: t('module.3.title'),
      description: t('module.3.desc'),
      questionIds: ['Q7', 'Q9', 'Q11', 'Q14', 'Q16']
    },
    {
      id: 4,
      name: t('module.4.title'),
      description: t('module.4.desc'),
      questionIds: ['Q12', 'Q13', 'Q15', 'Q19', 'Q20']
    }
  ];

  // -----------------------------------------
  // 1. STATE INITIALIZATION (W/ SAFE STORAGE FALLBACK)
  // -----------------------------------------
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = Profile Setup, 1-19 = Questions
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    contactEmail: defaultEmail || '',
    sector: 'Comercio',
    targetCustomer: 'BOTH',
    size: 'Micro',
    country: 'Perú'
  });
  const [responses, setResponses] = useState<DiagnosticResponse[]>([]);
  const [isFormTouched, setIsFormTouched] = useState(false);

  // Load from props or safe storage
  useEffect(() => {
    try {
      if (savedState) {
        setCompanyInfo(savedState.companyInfo);
        setResponses(savedState.responses || []);
        setCurrentStep(savedState.currentStep || 0);
      } else {
        const cachedCompany = safeStorage.getJSON<Partial<CompanyInfo> | null>('loopsblock_draft_company', null);
        const cachedResponses = safeStorage.getJSON<DiagnosticResponse[] | null>('loopsblock_draft_responses', null);
        const cachedStep = safeStorage.getItem('loopsblock_draft_step');

        let company: CompanyInfo = {
          name: '',
          contactEmail: defaultEmail || '',
          sector: 'Comercio' as SectorType,
          targetCustomer: 'BOTH' as TargetCustomerType,
          size: 'Micro' as CompanySizeType,
          country: 'Perú'
        };

        if (cachedCompany && typeof cachedCompany === 'object') {
          company = { ...company, ...cachedCompany };
        }
        if (defaultEmail) {
          company.contactEmail = defaultEmail;
        }

        setCompanyInfo(company);
        if (Array.isArray(cachedResponses)) {
          setResponses(cachedResponses);
        }
        if (cachedStep) {
          const stepNum = Number(cachedStep);
          if (!isNaN(stepNum) && stepNum >= 0) {
            setCurrentStep(stepNum);
          }
        }
      }
    } catch (err) {
      console.warn('Error al cargar borrador:', err);
    }
  }, [savedState, defaultEmail]);

  // Keep contactEmail synchronized in real-time with defaultEmail (from Google login)
  useEffect(() => {
    if (defaultEmail) {
      setCompanyInfo(prev => {
        if (prev.contactEmail !== defaultEmail) {
          const nextInfo = { ...prev, contactEmail: defaultEmail };
          safeStorage.setJSON('loopsblock_draft_company', nextInfo);
          return nextInfo;
        }
        return prev;
      });
    }
  }, [defaultEmail]);

  // Persist draft progress changes safely
  const saveProgressDraft = (updatedInfo: CompanyInfo, updatedResponses: DiagnosticResponse[], updatedStep: number) => {
    try {
      safeStorage.setJSON('loopsblock_draft_company', updatedInfo);
      safeStorage.setJSON('loopsblock_draft_responses', updatedResponses);
      safeStorage.setItem('loopsblock_draft_step', updatedStep.toString());
    } catch (e) {
      console.warn('Error al guardar borrador de progreso:', e);
    }
  };

  const resetProgressDraft = () => {
    try {
      safeStorage.removeItem('loopsblock_draft_company');
      safeStorage.removeItem('loopsblock_draft_responses');
      safeStorage.removeItem('loopsblock_draft_step');
    } catch (e) {
      console.warn('Error al limpiar borrador:', e);
    }
    setCompanyInfo({
      name: '',
      contactEmail: defaultEmail || '',
      sector: 'Comercio',
      size: 'Micro',
      country: 'Perú'
    });
    setResponses([]);
    setCurrentStep(0);
    setIsFormTouched(false);
  };

  // -----------------------------------------
  // 2. FORM HANDLERS
  // -----------------------------------------
  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCompanyInfo(prev => {
      const nextInfo = { ...prev, [name]: value };
      saveProgressDraft(nextInfo, responses, currentStep);
      return nextInfo;
    });
  };

  const handleStartSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormTouched(true);

    const safeName = (companyInfo.name || '').trim();
    const safeEmail = (companyInfo.contactEmail || '').trim();
    const safeCountry = (companyInfo.country || '').trim();

    if (!safeName || !safeEmail || !safeCountry) {
      return;
    }

    const nextStep = 1;
    setCurrentStep(nextStep);
    saveProgressDraft(companyInfo, responses, nextStep);
  };

  // -----------------------------------------
  // 3. SELECTION HANDLERS
  // -----------------------------------------
  const getQuestionByStep = (stepIndex: number): Question => {
    if (!currentQuestions || currentQuestions.length === 0) {
      return {
        id: 'Q1',
        dimensionId: 1,
        text: 'Cargando pregunta...',
        type: 'single',
        options: []
      };
    }
    return currentQuestions[stepIndex - 1] || currentQuestions[0];
  };

  const currentQuestion = currentStep > 0 ? getQuestionByStep(currentStep) : null;
  const currentResponse = currentQuestion 
    ? responses.find(r => r.questionId === currentQuestion.id)
    : null;

  const handleOptionToggle = (optionId: string) => {
    if (!currentQuestion) return;

    let nextResponses: DiagnosticResponse[] = [...responses];
    const existingIndex = responses.findIndex(r => r.questionId === currentQuestion.id);

    if (currentQuestion.type === 'multiple') {
      if (existingIndex > -1) {
        const currentSelections = responses[existingIndex].selectedOptionIds;
        const alreadySelected = currentSelections.includes(optionId);
        
        let nextSelections = [];
        if (alreadySelected) {
          nextSelections = currentSelections.filter(id => id !== optionId);
        } else {
          nextSelections = [...currentSelections, optionId];
        }

        nextResponses[existingIndex] = {
          questionId: currentQuestion.id,
          selectedOptionIds: nextSelections
        };
      } else {
        nextResponses.push({
          questionId: currentQuestion.id,
          selectedOptionIds: [optionId]
        });
      }
    } else {
      // Single choice or scale or conditional questions
      if (existingIndex > -1) {
        nextResponses[existingIndex] = {
          questionId: currentQuestion.id,
          selectedOptionIds: [optionId]
        };
      } else {
        nextResponses.push({
          questionId: currentQuestion.id,
          selectedOptionIds: [optionId]
        });
      }
    }

    setResponses(nextResponses);
    saveProgressDraft(companyInfo, nextResponses, currentStep);
  };

  const handleNext = () => {
    if (!currentQuestion || !currentResponse || currentResponse.selectedOptionIds.length === 0) {
      return; // Validation: Not allowed to advance without selection
    }

    if (currentStep < currentQuestions.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveProgressDraft(companyInfo, responses, nextStep);
    } else {
      // Finish diagnostic
      onComplete(companyInfo, responses);
      localStorage.removeItem('loopsblock_draft_company');
      localStorage.removeItem('loopsblock_draft_responses');
      localStorage.removeItem('loopsblock_draft_step');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const nextStep = currentStep - 1;
      setCurrentStep(nextStep);
      saveProgressDraft(companyInfo, responses, nextStep);
    }
  };

  // Find which module the current question belongs to
  const getActiveModule = () => {
    if (currentStep === 0 || !currentQuestion) return null;
    return MODULES.find(m => m.questionIds.includes(currentQuestion.id)) || MODULES[0];
  };

  const activeModule = getActiveModule();
  const currentQuestionIndexInModule = activeModule && currentQuestion
    ? activeModule.questionIds.indexOf(currentQuestion.id) + 1
    : 0;
  const moduleTotalQuestions = activeModule ? activeModule.questionIds.length : 1;
  const moduleProgressPercent = activeModule 
    ? Math.round((currentQuestionIndexInModule / moduleTotalQuestions) * 100)
    : 0;

  // Global questionnaire percentage
  const totalQuestionsCount = (currentQuestions && currentQuestions.length > 0) ? currentQuestions.length : 20;
  const globalProgressPercent = Math.min(100, Math.round((currentStep / totalQuestionsCount) * 100));

  // Helper to check if a technical word is mentioned in the question title
  const renderQuestionWithPopovers = (text: string, helpTerm?: string) => {
    const safeText = typeof text === 'string' ? text : '';
    if (!helpTerm || typeof helpTerm !== 'string' || !safeText.includes(helpTerm)) {
      return <span>{safeText}</span>;
    }

    const parts = safeText.split(helpTerm);
    if (parts.length < 2) return <span>{safeText}</span>;

    return (
      <span>
        {parts[0]}
        <TechnicalTermPopover termKey={helpTerm} />
        {parts.slice(1).join(helpTerm)}
      </span>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      
      {/* Save indicator pill */}
      <div className="flex items-center justify-between mb-4 px-2 print:hidden">
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
          <Save className="w-3.5 h-3.5" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>{t('survey.savedProgress')}</span>
        </div>
        {currentStep > 0 && (
          <button
            onClick={resetProgressDraft}
            className="text-[10px] text-gray-400 hover:text-red-500 transition-colors font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('survey.restartSurvey')}</span>
          </button>
        )}
      </div>

      {/* STEP 0: WELCOME & GENERAL PROFILE FORM */}
      {currentStep === 0 ? (
        <div className="p-4 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-xl shadow-slate-200/50 dark:shadow-black/60 relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 rounded-2xl shrink-0 shadow-2xs">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-blue-600 dark:text-cyan-400 uppercase tracking-widest block">
                {t('survey.initialStep')}
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                {t('survey.companyInfoTitle')}
              </h2>
            </div>
          </div>

          <form onSubmit={handleStartSurvey} className="space-y-6">
            
            {/* Company Name */}
            <div className="space-y-2">
              <label htmlFor="company-name" className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1">
                <span>{t('survey.companyName')}</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                id="company-name"
                name="name"
                type="text"
                required
                value={companyInfo.name}
                onChange={handleCompanyChange}
                placeholder={t('survey.companyNamePlaceholder')}
                className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#060c18] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:bg-white dark:focus:bg-[#0a1222] focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-all shadow-2xs hover:border-slate-300 dark:hover:border-slate-600"
              />
              {isFormTouched && !(companyInfo.name || '').trim() && (
                <span className="text-[11px] text-red-500 font-bold block">{t('survey.nameRequired')}</span>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="company-email" className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1">
                  <span>{t('survey.email')}</span>
                  <span className="text-red-500">*</span>
                </label>
                {defaultEmail && companyInfo.contactEmail === defaultEmail && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 shadow-2xs">
                    <Check className="w-3.5 h-3.5" />
                    <span>{t('survey.syncedGoogle')}</span>
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  id="company-email"
                  name="contactEmail"
                  type="email"
                  required
                  value={companyInfo.contactEmail}
                  onChange={handleCompanyChange}
                  disabled={!!defaultEmail}
                  placeholder="ejemplo@empresa.com"
                  className={`w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#060c18] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:bg-white dark:focus:bg-[#0a1222] focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-all shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 ${
                    defaultEmail ? 'opacity-90 cursor-not-allowed bg-slate-100 dark:bg-slate-900 select-none pr-10' : ''
                  }`}
                />
                {defaultEmail && (
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none select-none">
                    <svg className="w-4 h-4 opacity-90" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                )}
              </div>
              {isFormTouched && !(companyInfo.contactEmail || '').trim() && (
                <span className="text-[11px] text-red-500 font-bold block">{t('survey.emailRequired')}</span>
              )}
            </div>

            {/* Grid for Sector, Target Customer, Size, Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Sector / Giro Principal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="company-sector" className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-blue-500" />
                    <span>{t('survey.sector')} (Actividad Principal)</span>
                  </label>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-cyan-400">
                    {companyInfo.sector}
                  </span>
                </div>
                <select
                  id="company-sector"
                  name="sector"
                  value={companyInfo.sector}
                  onChange={handleCompanyChange}
                  className="w-full px-3.5 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#060c18] text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:bg-white dark:focus:bg-[#0a1222] focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-all shadow-2xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
                >
                  <option value="Comercio">🛒 {t('sector.Comercio')} (Venta minorista o mayorista sin fábrica)</option>
                  <option value="Servicios">💼 {t('sector.Servicios')} (Atención, asesorías, transporte o reparaciones)</option>
                  <option value="Manufactura">🏭 {t('sector.Manufactura')} / Fábrica o Taller de producción</option>
                  <option value="Tecnología">💻 {t('sector.Tecnología')} (Software, soporte y sistemas)</option>
                  <option value="Agropecuario">🌱 {t('sector.Agropecuario')} (Campo, ganadería o pesca)</option>
                  <option value="Construcción">🏗️ {t('sector.Construcción')} (Obras y contratistas)</option>
                  <option value="Otro">📦 {t('sector.Otro')} (Otra actividad comercial)</option>
                </select>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {companyInfo.sector === 'Comercio' && 'Comercio: Venta de mercadería ya terminada (tienda física, minimarket, e-commerce o distribuidora).'}
                  {companyInfo.sector === 'Servicios' && 'Servicios: Brinda actividades o asesoría especializada (salud, educación, mecánica, transporte, finanzas).'}
                  {companyInfo.sector === 'Manufactura' && 'Fábrica / Manufactura: Compra materias primas y las transforma en productos nuevos terminados.'}
                  {companyInfo.sector === 'Tecnología' && 'Tecnología: Desarrollo web, sistemas, aplicaciones, redes o telecomunicaciones.'}
                  {companyInfo.sector === 'Agropecuario' && 'Agropecuario: Producción agrícola, pecuaria, avícola o pesquera.'}
                  {companyInfo.sector === 'Construcción' && 'Construcción: Obras de edificación, remodelaciones o instalaciones especializadas.'}
                  {companyInfo.sector === 'Otro' && 'Otro sector o modelo de negocio no listado.'}
                </p>
              </div>

              {/* Target Customer (B2B vs B2C vs BOTH) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="company-target-customer" className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-500" />
                    <span>¿A quién le vende principalmente?</span>
                  </label>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-cyan-400">
                    {companyInfo.targetCustomer === 'B2B' ? 'B2B' : companyInfo.targetCustomer === 'B2C' ? 'B2C' : 'Mixto'}
                  </span>
                </div>
                <select
                  id="company-target-customer"
                  name="targetCustomer"
                  value={companyInfo.targetCustomer || 'BOTH'}
                  onChange={handleCompanyChange}
                  className="w-full px-3.5 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#060c18] text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:bg-white dark:focus:bg-[#0a1222] focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-all shadow-2xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
                >
                  <option value="B2C">👥 Personas y Familias (Consumidor Final / B2C)</option>
                  <option value="B2B">🏢 Otras Empresas o Negocios (Venta Mayorista / B2B)</option>
                  <option value="BOTH">🤝 A Ambos por igual (Consumidores y Empresas)</option>
                </select>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {companyInfo.targetCustomer === 'B2C' && 'B2C: Tus clientes son personas comunes que compran para su hogar o uso personal.'}
                  {companyInfo.targetCustomer === 'B2B' && 'B2B: Tus clientes son otras empresas, tiendas, talleres, distribuidores o entidades públicas.'}
                  {(!companyInfo.targetCustomer || companyInfo.targetCustomer === 'BOTH') && 'Mixto: Vendes equilibradamente a personas naturales y a otras empresas.'}
                </p>
              </div>

              {/* Size */}
              <div className="space-y-2">
                <label htmlFor="company-size" className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                  <span>{t('survey.size')} (Número de Colaboradores)</span>
                </label>
                <select
                  id="company-size"
                  name="size"
                  value={companyInfo.size}
                  onChange={handleCompanyChange}
                  className="w-full px-3.5 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#060c18] text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:bg-white dark:focus:bg-[#0a1222] focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-all shadow-2xs cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
                >
                  <option value="Micro">🌱 {t('size.Micro')} (1 a 9 colaboradores - Dueño y equipo reducido)</option>
                  <option value="Pequeña">🌿 {t('size.Pequeña')} (10 a 49 colaboradores - Áreas operativas)</option>
                  <option value="Mediana">🌳 {t('size.Mediana')} (50 a 199 colaboradores - Estructura formal)</option>
                  <option value="Grande">🏛️ {t('size.Grande')} (200 o más colaboradores - Corporativo)</option>
                </select>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {companyInfo.size === 'Micro' && 'Microempresa: Estructura ágil de 1 a 9 personas sin departamentos formales.'}
                  {companyInfo.size === 'Pequeña' && 'Pequeña empresa: De 10 a 49 personas con roles y responsabilidades diferenciadas.'}
                  {companyInfo.size === 'Mediana' && 'Mediana empresa: De 50 a 199 colaboradores con gerencias y supervisión.'}
                  {companyInfo.size === 'Grande' && 'Gran empresa: 200+ colaboradores con operación corporativa e infraestructura amplia.'}
                </p>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label htmlFor="company-country" className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-blue-500" />
                  <span>{t('survey.country')} / Ciudad</span>
                </label>
                <input
                  id="company-country"
                  name="country"
                  type="text"
                  required
                  value={companyInfo.country}
                  onChange={handleCompanyChange}
                  placeholder={t('survey.countryPlaceholder')}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#060c18] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium focus:outline-none focus:bg-white dark:focus:bg-[#0a1222] focus:border-blue-600 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-all shadow-2xs hover:border-slate-300 dark:hover:border-slate-600"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Ej. Lima, Perú | Bogotá, Colombia | Ciudad de México | Santiago, Chile
                </p>
              </div>

            </div>

            {/* Profile Confirmation helper banner */}
            <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/25 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3 text-xs text-blue-900 dark:text-blue-200">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">
                  Diagnóstico calibrado según tu contexto:
                </p>
                <p className="text-blue-800/90 dark:text-blue-300/90 leading-relaxed">
                  Evaluaremos a <span className="font-bold">{companyInfo.name || 'tu empresa'}</span> como una{' '}
                  <span className="font-bold underline">{companyInfo.size}</span> en el sector{' '}
                  <span className="font-bold underline">{companyInfo.sector}</span> con clientes orientados a{' '}
                  <span className="font-bold underline">
                    {companyInfo.targetCustomer === 'B2B' ? 'Empresas (B2B)' : companyInfo.targetCustomer === 'B2C' ? 'Consumidor Final (B2C)' : 'Mixto (B2B + B2C)'}
                  </span>. Las recomendaciones y comparativas se adaptarán a esta realidad.
                </p>
              </div>
            </div>

            <button
              id="start-wizard-btn"
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-blue-600 text-white hover:bg-blue-500 font-extrabold text-sm transition-all shadow-md hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{t('survey.startBtn')}</span>
            </button>

          </form>
        </div>
      ) : (
        /* STEPS 1-19: MODULE-BASED QUESTIONS */
        <div className="space-y-6">
          
          {/* Progress Overview Panel */}
          {activeModule && (
            <div className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold text-blue-600 dark:text-cyan-400 uppercase tracking-widest block">
                  {t('survey.moduleHeader')} {activeModule.id} / 4
                </span>
                <h3 className="text-sm font-black text-slate-900 dark:text-white mt-0.5">
                  {activeModule.name}
                </h3>
              </div>

              {/* Modular mini progress bar */}
              <div className="w-full md:w-48 space-y-1.5">
                <div className="flex justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <span>{t('survey.moduleProgress')}</span>
                  <span className="text-blue-600 dark:text-cyan-400">{moduleProgressPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-[#060c18] border border-slate-200 dark:border-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                    style={{ width: `${moduleProgressPercent}%` }}
                  />
                </div>
              </div>

              {/* Global Progress Indicators */}
              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-extrabold text-slate-500 dark:text-slate-400">
                  {t('survey.questionHeader')} {currentStep} / {currentQuestions.length}
                </span>
                <span className="text-xs font-black text-blue-600 dark:text-cyan-400 block mt-0.5">
                  ({globalProgressPercent}% {t('survey.total')})
                </span>
              </div>
            </div>
          )}

          {/* Core Question Layout */}
          {currentQuestion && (
            <div className="p-4 sm:p-7 md:p-10 rounded-2xl sm:rounded-3xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1426] shadow-xl shadow-slate-200/50 dark:shadow-black/60 relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div className="space-y-4">
                {/* Section Badge */}
                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-blue-900/60 uppercase tracking-wider shadow-2xs">
                  <Activity className="w-3.5 h-3.5" />
                  <span>{currentDimensions.find(d => d.id === currentQuestion.dimensionId)?.name}</span>
                </span>

                {/* Question title */}
                <h2 className="text-base sm:text-lg md:text-xl font-black text-slate-900 dark:text-white leading-relaxed">
                  {renderQuestionWithPopovers(currentQuestion.text, currentQuestion.helpTerm)}
                </h2>

                {/* Sub-explanations */}
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-normal">
                  {currentQuestion.type === 'multiple' 
                    ? t('survey.multipleChoiceNote')
                    : t('survey.singleChoiceNote')}
                </p>

                {/* List of selectable options (Casillas de Selección) */}
                <div className="space-y-3 mt-5 sm:mt-6">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = currentResponse?.selectedOptionIds.includes(opt.id) || false;
                    
                    return (
                      <button
                        id={`option-btn-${opt.id}`}
                        key={opt.id}
                        type="button"
                        onClick={() => handleOptionToggle(opt.id)}
                        className={`w-full text-left p-3.5 sm:p-4.5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 text-xs sm:text-sm font-semibold flex items-start gap-3 cursor-pointer transform hover:-translate-y-0.5 ${
                          isSelected
                            ? 'bg-blue-50/95 dark:bg-[#0c1c38] border-blue-600 dark:border-blue-500 text-blue-950 dark:text-white shadow-md ring-2 ring-blue-500/20 dark:ring-blue-400/30'
                            : 'bg-slate-50 hover:bg-blue-50/60 dark:bg-[#060c18] dark:hover:bg-[#0c172d] border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500/80 text-slate-800 dark:text-slate-200 shadow-2xs'
                        }`}
                      >
                        <div className={`w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                            : 'border-slate-300 dark:border-slate-500 bg-white dark:bg-[#0b1428]'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Back / Next Controller */}
              <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 pt-6 mt-8">
                <button
                  id="survey-back-btn"
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 px-4.5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-extrabold uppercase tracking-wider cursor-pointer transition-all shadow-2xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('survey.backBtn')}</span>
                </button>

                <button
                  id="survey-next-btn"
                  type="button"
                  onClick={handleNext}
                  disabled={!currentResponse || currentResponse.selectedOptionIds.length === 0}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    (!currentResponse || currentResponse.selectedOptionIds.length === 0)
                      ? 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed border-2 border-slate-200 dark:border-slate-800'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/20'
                  }`}
                >
                  <span>{currentStep === currentQuestions.length ? t('survey.finishBtn') : t('survey.nextBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

