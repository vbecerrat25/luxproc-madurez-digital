import { Language } from './translations';

export interface ReportI18n {
  officialTitle: string;
  evolutionSubhead: (days: number) => string;
  auditSubhead: string;
  coverDescEvolution: (date: string) => string;
  coverDescStandard: string;
  generalIndex: string;
  baseline: string;
  evolutionText: (delta: number) => string;
  evaluatedCompany: string;
  economicSector: string;
  corporateSize: string;
  auditCode: string;
  issueDateTime: string;
  contactEmail: string;
  legalFooter: string;

  // Page 2
  pageHeader: string;
  sec1Title: string;
  sec1Desc1: (companyName: string) => string;
  sec1Desc2: (score: number, levelTitle: string, levelDesc: string) => string;
  sec2Title: string;
  scaleNote: string;
  colDimension: string;
  colScore: string;
  colBaseline: string;
  colCurrent: string;
  colDelta: string;
  colEvolutionStatus: string;
  colQualitative: string;
  colGap: string;
  leapMaturity: string;
  progressiveImprovement: string;
  consolidated: string;
  requiresReinforcement: string;
  strategicInterpretationTitle: string;
  strategicInterpretationDesc: string;
  pageNumber: (current: number, total: number) => string;

  // Page 3
  sec3Title: string;
  sec3Desc: (companyName: string) => string;
  axisDiagnosis: string;
  priorityFocus: string;

  // Page 4
  sec4Title: string;
  sec4Desc: string;
  radarTitle: string;
  distributionTitle: string;
  techProfileAnalysisTitle: string;
  symmetryTitleEvolution: string;
  symmetryTitleStandard: string;
  symmetryDescEvolution: (date: string, days: number) => string;
  symmetryDescStandard: string;
  ecosystemTransitionTitle: string;
  ecosystemTransitionDesc: string;

  // Page 5
  sec5Title: (sector: string) => string;
  sec5Desc: (companyName: string, sector: string) => string;
  compDimTitle: string;
  sectorAvgLabel: (sectorAvg: number, companyName: string, companyAvg: number, diff: number) => string;
  evolutionCertTitle: (days: number) => string;
  evolutionCertSub: (baseDate: string, baseScore: number, currDate: string, currScore: number) => string;
  globalPerfTitle: string;
  globalPerfDesc: (delta: number, prevLevel: string, currLevel: string) => string;
  topLeapTitle: string;
  topLeapDesc: (maxLeap: number) => string;
  auditOpinionTitle: string;
  auditOpinionDesc: string;
  compAdvantagesTitle: string;
  compAdvantagesDesc: string;
  priorityGapsTitle: string;
  priorityGapsDesc: string;
  strategicGuidelineTitle: string;
  strategicGuidelinePositive: (sector: string) => string;
  strategicGuidelineNegative: (diff: number) => string;
  followUpProtocol: string;

  // Page 6
  sec6Title: string;
  portfolioTag: string;
  sec6Desc: string;
  quadrantQuickWin: string;
  quadrantStrategic: string;
  quadrantOperational: string;
  quadrantFuture: string;
  phase1Title: string;
  phase1Desc: string;
  phase2Title: string;
  phase2Desc: string;
  phase3Title: string;
  phase3Desc: string;
  consultingTeam: string;
  validationTitle: string;
  managementTeam: string;
  acceptanceTitle: string;
  finalLegalNote: (year: number) => string;

  // 16 Initiatives
  initiatives: {
    id: string;
    title: string;
    axis: string;
    quadrant: string;
    impact: string;
    effort: string;
    timeframe: string;
    desc: string;
  }[];
}

export const REPORT_TRANSLATIONS: Record<Language, ReportI18n> = {
  es: {
    officialTitle: 'Informe Oficial de Madurez Digital',
    evolutionSubhead: (days) => `Auditoría y Seguimiento Evolutivo — Re-evaluación (${days}+ Días)`,
    auditSubhead: 'Auditoría y Plan Estratégico de Transformación Digital',
    coverDescEvolution: (date) => `Informe comparativo de evolución tecnológica y salto de capacidades frente a la línea base del ${date}.`,
    coverDescStandard: 'Evaluación integral de capacidades tecnológicas, procesos operativos, canales comerciales y hoja de ruta de modernización.',
    generalIndex: 'Índice General de Madurez',
    baseline: 'Línea Base',
    evolutionText: (delta) => `${delta >= 0 ? `+${delta}%` : `${delta}%`} Evolución`,
    evaluatedCompany: 'Empresa Evaluada',
    economicSector: 'Sector Económico',
    corporateSize: 'Tamaño Corporativo',
    auditCode: 'Código de Auditoría',
    issueDateTime: 'Fecha y Hora de Emisión',
    contactEmail: 'Contacto de Enlace',
    legalFooter: 'Documento técnico certificado emitido por LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. con validez para planificación de inversiones y modernización de procesos.',

    pageHeader: 'LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. — INFORME DE MADUREZ DIGITAL',
    sec1Title: '1. Resumen Ejecutivo y Diagnóstico Situacional',
    sec1Desc1: (name) => `El presente informe técnico consolida los resultados recabados a través del diagnóstico oficial de Madurez Digital de LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. para la empresa ${name}. El propósito fundamental de esta auditoría es evaluar el grado de digitalización de los procesos clave, la consistencia de los sistemas integrados de información, la protección de activos críticos y la capacidad del equipo para adoptar herramientas digitales modernas.`,
    sec1Desc2: (score, title, desc) => `Con un resultado global de ${score}%, la organización se posiciona en un nivel de madurez digital clasificado como ${title}. ${desc}`,
    sec2Title: '2. Matriz de las 8 Dimensiones Operativas Evaluadas',
    scaleNote: 'escala de 0% a 100%',
    colDimension: 'Dimensión de Análisis',
    colScore: 'Puntaje',
    colBaseline: 'Línea Base',
    colCurrent: 'Actual',
    colDelta: 'Variación',
    colEvolutionStatus: 'Estado Evolutivo',
    colQualitative: 'Evaluación Cualitativa',
    colGap: 'Brecha a Meta',
    leapMaturity: '🚀 Salto de Madurez',
    progressiveImprovement: '✅ Mejora Progresiva',
    consolidated: '⚖️ Consolidado',
    requiresReinforcement: '⚠️ Requiere Refuerzo',
    strategicInterpretationTitle: 'Interpretación Estratégica del Diagnóstico',
    strategicInterpretationDesc: 'Las dimensiones con mayor puntaje constituyen los pilares que garantizan la estabilidad operativa inmediata de la empresa. Por el contrario, aquellas dimensiones con puntajes por debajo del 60% representan áreas donde persisten registros manuales en papel, información dispersa o procesos dependientes de personas específicas, limitando la escalabilidad comercial y aumentando los costos ocultos por reprocesos.',
    pageNumber: (curr, total) => `Página ${curr} de ${total} — LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C.`,

    sec3Title: '3. Los 5 Macro-Ejes Estratégicos de Madurez Digital',
    sec3Desc: (name) => `Para facilitar la toma de decisiones a nivel de gerencia y directorio, las 8 dimensiones operativas se integran en los 5 Macro-Ejes Estratégicos de transformación empresarial. A continuación se presenta el diagnóstico específico de cada eje para ${name}:`,
    axisDiagnosis: 'Diagnóstico del Eje:',
    priorityFocus: 'Foco Prioritario de Acción:',

    sec4Title: '4. Diagnóstico Gráfico de Madurez Tecnológica',
    sec4Desc: 'Los siguientes diagramas detallan la simetría tecnológica entre las capacidades evaluadas y la distribución de madurez en la organización:',
    radarTitle: 'A) Radar de Simetría Tecnológica',
    distributionTitle: 'B) Distribución por Niveles de Madurez',
    techProfileAnalysisTitle: 'Análisis e Interpretación del Perfil Tecnológico',
    symmetryTitleEvolution: 'Expansión de Simetría Tecnológica:',
    symmetryTitleStandard: 'Equilibrio y Simetría Operativa:',
    symmetryDescEvolution: (date, days) => `La superposición gráfica evidencia la expansión del perímetro operativo frente a la evaluación del ${date}. La ampliación hacia los vértices más rezagados confirma que las iniciativas ejecutadas en estos ${days} días redujeron la dispersión entre departamentos.`,
    symmetryDescStandard: 'El radar refleja el balance entre las áreas de la empresa. Una alta dispersión indica departamentos que han avanzado digitalmente de forma aislada, creando asimetrías donde el área comercial genera prospectos que la logística interna o los controles manuales demoran en procesar.',
    ecosystemTransitionTitle: 'Transición del Ecosistema:',
    ecosystemTransitionDesc: 'La concentración de dimensiones en niveles básicos o formativos subraya la necesidad de estandarizar procesos repetitivos antes de adoptar herramientas complejas, asegurando que la inversión tecnológica produzca aumentos inmediatos en rentabilidad y orden interno.',

    sec5Title: (sector) => `5. Comparativa de Benchmark Sectorial vs. ${sector}`,
    sec5Desc: (name, sector) => `Evaluación comparativa del desempeño de ${name} frente al promedio sectorial de empresas en el rubro de ${sector}:`,
    compDimTitle: 'Desempeño Comparado por Dimensión',
    sectorAvgLabel: (avg, name, compAvg, diff) => `Promedio Sector: ${avg}% | ${name}: ${compAvg}% (${diff >= 0 ? `+${diff}%` : `${diff}%`})`,
    evolutionCertTitle: (days) => `Certificación de Evolución Temporal (Re-evaluación a ${days}+ Días)`,
    evolutionCertSub: (baseDate, baseScore, currDate, currScore) => `Línea Base: ${baseDate} (${baseScore}%) ➔ Actual: ${currDate} (${currScore}%)`,
    globalPerfTitle: '1. Rendimiento Global',
    globalPerfDesc: (delta, prev, curr) => `Incremento neto de +${delta}% en madurez digital. La empresa ascendió de nivel ${prev} a ${curr}.`,
    topLeapTitle: '2. Mayor Salto Cualitativo',
    topLeapDesc: (maxLeap) => `Las áreas de mayor aceleración registraron aumentos de hasta +${maxLeap}%, confirmando asimilación efectiva de herramientas.`,
    auditOpinionTitle: '3. Dictamen de Auditoría',
    auditOpinionDesc: 'Velocidad de transformación calificada como Favorable. Se recomienda mantener el ciclo de re-evaluación periódica para consolidar procesos.',
    compAdvantagesTitle: '1. Ventajas Competitivas',
    compAdvantagesDesc: 'Capacidades donde la empresa iguala o supera al sector, funcionando como ventajas diferenciadoras frente a competidores directos.',
    priorityGapsTitle: '2. Brechas Prioritarias',
    priorityGapsDesc: 'Procesos que registran desventaja frente al promedio y requieren modernización para evitar pérdida de cuota de mercado.',
    strategicGuidelineTitle: '3. Directriz Estratégica',
    strategicGuidelinePositive: (sector) => `Consolidar la automatización entre departamentos para blindar la delantera competitiva en ${sector}.`,
    strategicGuidelineNegative: (diff) => `Acelerar la integración de sistemas y canales digitales para cerrar la brecha de ${diff}% con el sector.`,
    followUpProtocol: 'ℹ️ Protocolo de Seguimiento Temporal: Al realizar tu segundo diagnóstico (a partir de los 15 a 30 días), este informe activará automáticamente el Certificado de Evolución y la comparativa de avance.',

    sec6Title: '6. Matriz de Priorización y Plan de Acción (16 Iniciativas)',
    portfolioTag: 'Portafolio Integral Completo',
    sec6Desc: 'Catálogo completo de las 16 iniciativas de modernización organizadas en los 4 cuadrantes de ejecución estratégica:',
    quadrantQuickWin: 'Victoria Rápida',
    quadrantStrategic: 'Proyecto Estratégico',
    quadrantOperational: 'Mejora Operativa',
    quadrantFuture: 'Iniciativa Futura / IA',
    phase1Title: 'Fase 1: Victorias Rápidas (Mes 1)',
    phase1Desc: '2FA, WhatsApp Business, plantillas en la nube y cobros QR (Yape/Plin).',
    phase2Title: 'Fase 2: Integración (Mes 2-4)',
    phase2Desc: 'Sistema ERP, facturación electrónica, embudo CRM y checklists móviles.',
    phase3Title: 'Fase 3: Escala & IA (Mes 5+)',
    phase3Desc: 'Asistentes de IA, tableros de BI en tiempo real y portal de clientes.',
    consultingTeam: 'Equipo Consultor Especializado',
    validationTitle: 'Emisión y Validación Técnica',
    managementTeam: 'Dirección / Gerencia General',
    acceptanceTitle: 'Recepción y Conformidad del Plan',
    finalLegalNote: (year) => `Página 6 de 6 — LUXPROC INNOVACIÓN Y TECNOLOGÍA S.A.C. © ${year} — Documento técnico de validez empresarial.`,

    initiatives: [
      { id: 'qw-2fa', title: 'Verificación en 2 Pasos (2FA) en Correos y WhatsApp', axis: 'Tecnología, Datos y Ciberseguridad', quadrant: 'Victoria Rápida', impact: 'Alto', effort: 'Bajo', timeframe: '1 a 2 días', desc: 'Blindar correos corporativos y WhatsApp Business contra accesos no autorizados sin costo de licencias.' },
      { id: 'qw-whatsapp', title: 'Estandarizar WhatsApp Business y Catálogo Digital', axis: 'Clientes y Canales Comerciales', quadrant: 'Victoria Rápida', impact: 'Alto', effort: 'Bajo', timeframe: '3 a 5 días', desc: 'Catálogo de productos con precios, respuestas rápidas y etiquetas por estado de cotización.' },
      { id: 'qw-cloud-docs', title: 'Centralizar Documentos Compartidos en la Nube', axis: 'Operaciones, Procesos y Logística', quadrant: 'Victoria Rápida', impact: 'Alto', effort: 'Bajo', timeframe: '1 semana', desc: 'Sustituir archivos dispersos en PCs individuales por carpetas en Google Drive o OneDrive con permisos por rol.' },
      { id: 'qw-qr-payments', title: 'Enlaces de Pago Digital y Códigos QR', axis: 'Clientes y Canales Comerciales', quadrant: 'Victoria Rápida', impact: 'Alto', effort: 'Bajo', timeframe: '3 a 7 días', desc: 'Facilitar pagos inmediatos eliminando la fricción de transferencias manuales y validación de depósitos.' },
      { id: 'st-erp', title: 'Sistema de Gestión (ERP) y Facturación Electrónica', axis: 'Operaciones, Procesos y Logística', quadrant: 'Proyecto Estratégico', impact: 'Alto', effort: 'Medio', timeframe: '1 a 3 meses', desc: 'Integrar ventas, compras, cobranzas, stock en tiempo real y facturación electrónica en una sola plataforma.' },
      { id: 'st-crm', title: 'Embudo Comercial (CRM) y Gestión de Clientes', axis: 'Clientes y Canales Comerciales', quadrant: 'Proyecto Estratégico', impact: 'Alto', effort: 'Medio', timeframe: '2 a 3 meses', desc: 'Registrar oportunidades, cotizaciones y fechas de seguimiento para evitar prospectos desatendidos.' },
      { id: 'st-workflow', title: 'Automatización de Flujos entre Áreas (APIs)', axis: 'Tecnología, Datos y Ciberseguridad', quadrant: 'Proyecto Estratégico', impact: 'Alto', effort: 'Medio', timeframe: '1 a 2 meses', desc: 'Conectar pedidos con facturación y despacho automáticamente vía Make/Zapier, eliminando doble digitación.' },
      { id: 'st-data-gov', title: 'Plan de Gobernanza de Datos y Copias de Seguridad', axis: 'Tecnología, Datos y Ciberseguridad', quadrant: 'Proyecto Estratégico', impact: 'Alto', effort: 'Medio', timeframe: '2 a 4 meses', desc: 'Políticas de seguridad, respaldos automáticos diarios externos en la nube y plan de contingencia operativa.' },
      { id: 'op-checklists', title: 'Formularios Móviles para Operaciones (AppSheet)', axis: 'Operaciones, Procesos y Logística', quadrant: 'Mejora Operativa', impact: 'Medio', effort: 'Bajo', timeframe: '1 a 2 semanas', desc: 'Sustituir hojas impresas de recepción u órdenes de trabajo por formularios digitales en el móvil.' },
      { id: 'op-passwords', title: 'Gestor de Contraseñas del Equipo (Bitwarden)', axis: 'Tecnología, Datos y Ciberseguridad', quadrant: 'Mejora Operativa', impact: 'Medio', effort: 'Bajo', timeframe: '1 semana', desc: 'Eliminar contraseñas en notas adhesivas o chats. Gestor corporativo cifrado con accesos departamentales.' },
      { id: 'op-stock', title: 'Control de Stock con Alertas de Reorden Mínimo', axis: 'Operaciones, Procesos y Logística', quadrant: 'Mejora Operativa', impact: 'Medio', effort: 'Bajo', timeframe: '2 a 3 semanas', desc: 'Estandarizar códigos de producto (SKU) con avisos automáticos para evitar quiebres de mercadería.' },
      { id: 'op-portal-colab', title: 'Manuales de Puestos y Capacitaciones en Notion', axis: 'Personas, Talento y Habilidades Digitales', quadrant: 'Mejora Operativa', impact: 'Medio', effort: 'Bajo', timeframe: '2 semanas', desc: 'Base de conocimiento digital para inducción ágil de nuevos empleados y estandarización de tareas.' },
      { id: 'fu-ai-assistants', title: 'Asistentes de IA para Atención al Cliente y Cotizaciones', axis: 'Clientes y Canales Comerciales', quadrant: 'Iniciativa Futura / IA', impact: 'Alto', effort: 'Alto', timeframe: '3 a 5 meses', desc: 'Agentes inteligentes que responden preguntas frecuentes 24/7 y precalifican prospectos comerciales.' },
      { id: 'fu-bi-analytics', title: 'Tablero de Control de Negocio (Business Intelligence)', axis: 'Tecnología, Datos y Ciberseguridad', quadrant: 'Iniciativa Futura / IA', impact: 'Alto', effort: 'Medio', timeframe: '3 a 6 meses', desc: 'Conectar ventas, cobranzas y margen en Looker Studio o Power BI sin informes manuales en hojas de cálculo.' },
      { id: 'fu-ecommerce', title: 'Portal de Pedidos Online y Autoservicio para Clientes', axis: 'Clientes y Canales Comerciales', quadrant: 'Iniciativa Futura / IA', impact: 'Alto', effort: 'Alto', timeframe: '6 a 10 meses', desc: 'Portal B2B/B2C con disponibilidad de stock en tiempo real y generación autónoma de órdenes de compra.' },
      { id: 'fu-talent', title: 'Programa Continuo de Capacitación Digital y Productividad', axis: 'Personas, Talento y Habilidades Digitales', quadrant: 'Iniciativa Futura / IA', impact: 'Alto', effort: 'Medio', timeframe: 'Continuo', desc: 'Talleres prácticos mensuales en herramientas digitales, automatizaciones básicas y uso productivo de IA.' }
    ]
  },

  pt: {
    officialTitle: 'Relatório Oficial de Maturidade Digital',
    evolutionSubhead: (days) => `Auditoria e Acompanhamento Evolutivo — Reavaliação (${days}+ Dias)`,
    auditSubhead: 'Auditoria e Plano Estratégico de Transformação Digital',
    coverDescEvolution: (date) => `Relatório comparativo de evolução tecnológica e avanço de competências frente à linha de base de ${date}.`,
    coverDescStandard: 'Avaliação completa de capacidades tecnológicas, fluxos operacionais, canais comerciais e roteiro de modernização.',
    generalIndex: 'Índice Geral de Maturidade',
    baseline: 'Linha de Base',
    evolutionText: (delta) => `${delta >= 0 ? `+${delta}%` : `${delta}%`} Evolução`,
    evaluatedCompany: 'Empresa Avaliada',
    economicSector: 'Setor Econômico',
    corporateSize: 'Porte Corporativo',
    auditCode: 'Código de Auditoria',
    issueDateTime: 'Data e Hora de Emissão',
    contactEmail: 'Contato Institucional',
    legalFooter: 'Documento técnico certificado emitido por LUXPROC INOVAÇÃO E TECNOLOGIA para planejamento de investimentos e modernização de processos.',

    pageHeader: 'LUXPROC INOVAÇÃO E TECNOLOGIA — RELATÓRIO DE MATURIDADE DIGITAL',
    sec1Title: '1. Resumo Executivo e Diagnóstico Situacional',
    sec1Desc1: (name) => `O presente relatório técnico consolida os resultados obtidos por meio da avaliação oficial de Maturidade Digital da LUXPROC para a empresa ${name}. O objetivo principal desta auditoria é mensurar o nível de digitalização dos processos centrais, a coerência dos sistemas de informação, a proteção de dados críticos e a capacitação da equipe na utilização de ferramentas digitais modernas.`,
    sec1Desc2: (score, title, desc) => `Com uma pontuação geral de ${score}%, a organização posiciona-se no nível de maturidade digital classificado como ${title}. ${desc}`,
    sec2Title: '2. Matriz das 8 Dimensões Operacionais Avaliadas',
    scaleNote: 'escala de 0% a 100%',
    colDimension: 'Dimensão de Análise',
    colScore: 'Pontuação',
    colBaseline: 'Linha de Base',
    colCurrent: 'Atual',
    colDelta: 'Variação',
    colEvolutionStatus: 'Estado Evolutivo',
    colQualitative: 'Avaliação Qualitativa',
    colGap: 'Lacuna para Meta',
    leapMaturity: '🚀 Salto de Maturidade',
    progressiveImprovement: '✅ Melhoria Progressiva',
    consolidated: '⚖️ Consolidado',
    requiresReinforcement: '⚠️ Requer Reforço',
    strategicInterpretationTitle: 'Interpretação Estratégica do Diagnóstico',
    strategicInterpretationDesc: 'As dimensões com pontuações elevadas constituem os pilares de sustentabilidade operacional da empresa. Em contrapartida, as áreas com notas inferiores a 60% apontam processos manuais, registros descentralizados ou dependência individual excessiva, restringindo o crescimento comercial e gerando custos operacionais desnecessários.',
    pageNumber: (curr, total) => `Página ${curr} de ${total} — LUXPROC INOVAÇÃO E TECNOLOGIA`,

    sec3Title: '3. Os 5 Macro-Eixos Estratégicos de Maturidade Digital',
    sec3Desc: (name) => `Para orientar a tomada de decisão da diretoria e liderança, as 8 dimensões operacionais integram-se nos 5 Macro-Eixos Estratégicos de transformação. Abaixo segue a análise específica de cada eixo para ${name}:`,
    axisDiagnosis: 'Diagnóstico do Eixo:',
    priorityFocus: 'Foco Prioritário de Ação:',

    sec4Title: '4. Diagnóstico Gráfico de Maturidade Tecnológica',
    sec4Desc: 'Os diagramas abaixo ilustram a simetria tecnológica entre as áreas avaliadas e a distribuição de maturidade corporativa:',
    radarTitle: 'A) Radar de Simetria Tecnológica',
    distributionTitle: 'B) Distribuição por Níveis de Maturidade',
    techProfileAnalysisTitle: 'Análise e Interpretação do Perfil Tecnológico',
    symmetryTitleEvolution: 'Expansão da Simetria Tecnológica:',
    symmetryTitleStandard: 'Equilíbrio e Simetria Operacional:',
    symmetryDescEvolution: (date, days) => `A sobreposição gráfica evidencia a ampliação da capacidade tecnológica em comparação com a avaliação de ${date}. A evolução nos eixos anteriormente críticos confirma que as ações implementadas nestes ${days} dias reduziram discrepâncias entre setores.`,
    symmetryDescStandard: 'O radar expressa o equilíbrio entre os setores da empresa. Dispersões acentuadas revelam áreas que avançaram tecnologicamente de forma isolada, gerando gargalos em que a captação de clientes sobrecarrega a logística ou o faturamento manual.',
    ecosystemTransitionTitle: 'Transição do Ecossistema:',
    ecosystemTransitionDesc: 'A concentração em estágios iniciais ou intermediários reforça a relevância de padronizar fluxos repetitivos antes de adotar softwares sofisticados, garantindo retorno financeiro imediato e governança interna.',

    sec5Title: (sector) => `5. Comparativo Setorial vs. ${sector}`,
    sec5Desc: (name, sector) => `Avaliação comparativa do desempenho de ${name} em relação à média setorial de empresas do segmento de ${sector}:`,
    compDimTitle: 'Desempenho Comparado por Dimensão',
    sectorAvgLabel: (avg, name, compAvg, diff) => `Média do Setor: ${avg}% | ${name}: ${compAvg}% (${diff >= 0 ? `+${diff}%` : `${diff}%`})`,
    evolutionCertTitle: (days) => `Certificação de Evolução Temporal (Reavaliação de ${days}+ Dias)`,
    evolutionCertSub: (baseDate, baseScore, currDate, currScore) => `Linha de Base: ${baseDate} (${baseScore}%) ➔ Atual: ${currDate} (${currScore}%)`,
    globalPerfTitle: '1. Desempenho Geral',
    globalPerfDesc: (delta, prev, curr) => `Avanço líquido de +${delta}% em maturidade digital. A organização ascendeu do nível ${prev} para ${curr}.`,
    topLeapTitle: '2. Maior Salto Qualitativo',
    topLeapDesc: (maxLeap) => `As frentes de maior aceleração alcançaram incrementos de até +${maxLeap}%, atestando a assimilação eficaz das novas soluções.`,
    auditOpinionTitle: '3. Parecer da Auditoria',
    auditOpinionDesc: 'Velocidade de transformação qualificada como Favorável. Recomenda-se manter ciclos de auditoria periódicos para consolidar avanços.',
    compAdvantagesTitle: '1. Vantagens Competitivas',
    compAdvantagesDesc: 'Capacidades nas quais a empresa supera ou empata com o setor, servindo de diferenciais estratégicos frente à concorrência.',
    priorityGapsTitle: '2. Lacunas Prioritárias',
    priorityGapsDesc: 'Processos que se encontram abaixo da média do mercado e exigem modernização para evitar perda de clientes e competitividade.',
    strategicGuidelineTitle: '3. Diretriz Estratégica',
    strategicGuidelinePositive: (sector) => `Consolidar a integração entre setores para blindar a liderança competitiva em ${sector}.`,
    strategicGuidelineNegative: (diff) => `Acelerar a automação de sistemas e canais digitais para superar a diferença de ${diff}% em relação ao setor.`,
    followUpProtocol: 'ℹ️ Protocolo de Acompanhamento: Ao realizar sua segunda avaliação (em 15 a 30 dias), este relatório habilitará automaticamente o Certificado de Evolução e a comparação temporal.',

    sec6Title: '6. Matriz de Priorização e Plano de Ação (16 Iniciativas)',
    portfolioTag: 'Portfólio Integral Estratégico',
    sec6Desc: 'Catálogo abrangente de 16 iniciativas de modernização distribuídas nos 4 quadrantes de execução estratégica:',
    quadrantQuickWin: 'Vitória Rápida',
    quadrantStrategic: 'Projeto Estratégico',
    quadrantOperational: 'Melhoria Operacional',
    quadrantFuture: 'Iniciativa Futura / IA',
    phase1Title: 'Fase 1: Vitórias Rápidas (Mês 1)',
    phase1Desc: '2FA, WhatsApp Business, modelos em nuvem e pagamentos via QR Code/Pix.',
    phase2Title: 'Fase 2: Integração (Meses 2-4)',
    phase2Desc: 'Sistema ERP integrado, emissão fiscal, funil de CRM e formulários móveis.',
    phase3Title: 'Fase 3: Escala & IA (Mês 5+)',
    phase3Desc: 'Agentes inteligentes de IA, painéis de BI em tempo real e portal de clientes.',
    consultingTeam: 'Equipe Especializada de Consultoria',
    validationTitle: 'Emissão e Validação Técnica',
    managementTeam: 'Diretoria / Gestão Geral',
    acceptanceTitle: 'Recebimento e Conformidade do Plano',
    finalLegalNote: (year) => `Página 6 de 6 — LUXPROC INOVAÇÃO E TECNOLOGIA © ${year} — Documento de validade técnica empresarial.`,

    initiatives: [
      { id: 'qw-2fa', title: 'Autenticação em 2 Etapas (2FA) em E-mails e WhatsApp', axis: 'Tecnologia, Dados e Cibersegurança', quadrant: 'Vitória Rápida', impact: 'Alto', effort: 'Baixo', timeframe: '1 a 2 dias', desc: 'Proteger e-mails e WhatsApp corporativos contra invasões sem custos de licenciamento.' },
      { id: 'qw-whatsapp', title: 'Padronizar WhatsApp Business e Catálogo Digital', axis: 'Clientes e Canais Comerciais', quadrant: 'Vitória Rápida', impact: 'Alto', effort: 'Baixo', timeframe: '3 a 5 dias', desc: 'Catálogo de itens com valores, respostas rápidas automáticas e etiquetas por etapa de negociação.' },
      { id: 'qw-cloud-docs', title: 'Centralizar Documentação Corporativa na Nuvem', axis: 'Operações, Processos e Logística', quadrant: 'Vitória Rápida', impact: 'Alto', effort: 'Baixo', timeframe: '1 semana', desc: 'Eliminar planilhas isoladas em computadores locais por pastas em Google Drive ou OneDrive com permissões.' },
      { id: 'qw-qr-payments', title: 'Links de Pagamento Digital e Códigos QR / Pix', axis: 'Clientes e Canais Comerciais', quadrant: 'Vitória Rápida', impact: 'Alto', effort: 'Baixo', timeframe: '3 a 7 dias', desc: 'Agilizar cobranças imediatas eliminando atritos de comprovantes e conferências manuais.' },
      { id: 'st-erp', title: 'Sistema de Gestão Integrado (ERP) e Emissão Fiscal', axis: 'Operações, Processos e Logística', quadrant: 'Projeto Estratégico', impact: 'Alto', effort: 'Médio', timeframe: '1 a 3 meses', desc: 'Conectar pedidos, compras, faturamento, estoque e notas fiscais em um único ecossistema.' },
      { id: 'st-crm', title: 'Funil Comercial (CRM) e Gestão de Clientes', axis: 'Clientes e Canais Comerciais', quadrant: 'Projeto Estratégico', impact: 'Alto', effort: 'Médio', timeframe: '2 a 3 meses', desc: 'Acompanhar propostas, cotações e prazos de retorno sem perder oportunidades de vendas.' },
      { id: 'st-workflow', title: 'Automação de Fluxos entre Departamentos (APIs)', axis: 'Tecnologia, Dados e Cibersegurança', quadrant: 'Projeto Estratégico', impact: 'Alto', effort: 'Médio', timeframe: '1 a 2 meses', desc: 'Integrar pedidos, faturamento e expedição via Make/Zapier, eliminando digitação duplicada.' },
      { id: 'st-data-gov', title: 'Governança de Dados e Rotinas de Backup', axis: 'Tecnologia, Dados e Cibersegurança', quadrant: 'Projeto Estratégico', impact: 'Alto', effort: 'Médio', timeframe: '2 a 4 meses', desc: 'Políticas de controle de acesso, cópias de segurança diárias em nuvem e plano de recuperação.' },
      { id: 'op-checklists', title: 'Formulários Móveis para Campo e Operações', axis: 'Operações, Processos e Logística', quadrant: 'Melhoria Operacional', impact: 'Médio', effort: 'Baixo', timeframe: '1 a 2 semanas', desc: 'Trocar pranchetas de papel por formulários digitais no smartphone com envio imediato.' },
      { id: 'op-passwords', title: 'Gerenciador Seguro de Senhas Corporativas', axis: 'Tecnologia, Dados e Cibersegurança', quadrant: 'Melhoria Operacional', impact: 'Médio', effort: 'Baixo', timeframe: '1 semana', desc: 'Eliminar senhas em papéis ou chats. Gerenciador criptografado com acessos por setor.' },
      { id: 'op-stock', title: 'Controle de Estoque com Alertas de Ponto de Pedido', axis: 'Operações, Processos e Logística', quadrant: 'Melhoria Operacional', impact: 'Médio', effort: 'Baixo', timeframe: '2 a 3 semanas', desc: 'Padronizar códigos de produtos com avisos automáticos para evitar desabastecimento.' },
      { id: 'op-portal-colab', title: 'Base de Conhecimento e Integração no Notion', axis: 'Pessoas, Talentos e Habilidades Digitais', quadrant: 'Melhoria Operacional', impact: 'Médio', effort: 'Baixo', timeframe: '2 semanas', desc: 'Central de manuais operacionais para onboarding rápido e padronização de rotinas.' },
      { id: 'fu-ai-assistants', title: 'Agentes de IA para Atendimento e Pré-Venda', axis: 'Clientes e Canais Comerciais', quadrant: 'Iniciativa Futura / IA', impact: 'Alto', effort: 'Alto', timeframe: '3 a 5 meses', desc: 'Assistentes inteligentes que respondem a dúvidas 24/7 e qualificam clientes potenciais.' },
      { id: 'fu-bi-analytics', title: 'Painéis Gerenciais de Inteligência de Negócio (BI)', axis: 'Tecnologia, Datos e Cibersegurança', quadrant: 'Iniciativa Futura / IA', impact: 'Alto', effort: 'Médio', timeframe: '3 a 6 meses', desc: 'Visualizar receitas, margens e metas em dashboards visuais sem relatórios manuais.' },
      { id: 'fu-ecommerce', title: 'Portal Online de Autosserviço e Pedidos B2B/B2C', axis: 'Clientes e Canais Comerciais', quadrant: 'Iniciativa Futura / IA', impact: 'Alto', effort: 'Alto', timeframe: '6 a 10 meses', desc: 'Plataforma para clientes visualizarem estoque em tempo real e emitirem pedidos autonomamente.' },
      { id: 'fu-talent', title: 'Programa Contínuo de Capacitação em IA e Ferramentas', axis: 'Pessoas, Talentos e Habilidades Digitais', quadrant: 'Iniciativa Futura / IA', impact: 'Alto', effort: 'Médio', timeframe: 'Contínuo', desc: 'Treinamentos práticos mensais sobre produtividade digital, automação e inteligência artificial.' }
    ]
  },

  en: {
    officialTitle: 'Official Digital Maturity Report',
    evolutionSubhead: (days) => `Evolutionary Tracking & Audit — Re-assessment (${days}+ Days)`,
    auditSubhead: 'Digital Transformation Audit & Strategic Action Plan',
    coverDescEvolution: (date) => `Comparative evaluation of technological evolution and capability leaps against the baseline from ${date}.`,
    coverDescStandard: 'Comprehensive audit of technological capabilities, operational workflows, commercial channels, and modernization roadmap.',
    generalIndex: 'Overall Digital Maturity Index',
    baseline: 'Baseline',
    evolutionText: (delta) => `${delta >= 0 ? `+${delta}%` : `${delta}%`} Evolution`,
    evaluatedCompany: 'Evaluated Organization',
    economicSector: 'Industry Sector',
    corporateSize: 'Company Size',
    auditCode: 'Audit Code',
    issueDateTime: 'Date & Time of Issue',
    contactEmail: 'Liaison Email',
    legalFooter: 'Certified technical document issued by LUXPROC INNOVATION & TECHNOLOGY for investment planning and process modernization.',

    pageHeader: 'LUXPROC INNOVATION & TECHNOLOGY — DIGITAL MATURITY REPORT',
    sec1Title: '1. Executive Summary & Situational Diagnosis',
    sec1Desc1: (name) => `This technical report consolidates the findings gathered through the official Digital Maturity Assessment by LUXPROC INNOVATION & TECHNOLOGY for ${name}. The primary objective of this audit is to evaluate the degree of digitization in core workflows, enterprise system integration, critical asset protection, and workforce digital proficiency.`,
    sec1Desc2: (score, title, desc) => `With an overall maturity score of ${score}%, the organization is positioned at the digital maturity level classified as ${title}. ${desc}`,
    sec2Title: '2. Matrix of the 8 Operational Dimensions Evaluated',
    scaleNote: 'scale from 0% to 100%',
    colDimension: 'Analytical Dimension',
    colScore: 'Score',
    colBaseline: 'Baseline',
    colCurrent: 'Current',
    colDelta: 'Delta',
    colEvolutionStatus: 'Evolution Status',
    colQualitative: 'Qualitative Rating',
    colGap: 'Target Gap',
    leapMaturity: '🚀 Maturity Leap',
    progressiveImprovement: '✅ Progressive Improvement',
    consolidated: '⚖️ Consolidated',
    requiresReinforcement: '⚠️ Needs Reinforcement',
    strategicInterpretationTitle: 'Strategic Interpretation of the Audit',
    strategicInterpretationDesc: 'High-scoring dimensions represent the operational pillars securing short-term business stability. Conversely, dimensions scoring under 60% indicate areas where manual paper records, disconnected systems, or individual-dependent processes remain, constraining business scalability and introducing hidden rework costs.',
    pageNumber: (curr, total) => `Page ${curr} of ${total} — LUXPROC INNOVATION & TECHNOLOGY`,

    sec3Title: '3. The 5 Strategic Macro-Axes of Digital Transformation',
    sec3Desc: (name) => `To facilitate executive decision-making, the 8 operational dimensions are synthesized into 5 Strategic Macro-Axes. Below is the tailored diagnosis for each axis regarding ${name}:`,
    axisDiagnosis: 'Axis Diagnosis:',
    priorityFocus: 'Priority Action Focus:',

    sec4Title: '4. Graphical Diagnostic of Technological Maturity',
    sec4Desc: 'The following diagrams detail the technological symmetry across evaluated competencies and the maturity distribution throughout the organization:',
    radarTitle: 'A) Technological Symmetry Radar',
    distributionTitle: 'B) Maturity Level Distribution',
    techProfileAnalysisTitle: 'Technological Profile Analysis & Interpretation',
    symmetryTitleEvolution: 'Expansion of Technological Symmetry:',
    symmetryTitleStandard: 'Operational Symmetry & Balance:',
    symmetryDescEvolution: (date, days) => `The chart overlay highlights the operational capability expansion compared to the baseline assessment from ${date}. Expansion toward lagging vertices confirms that initiatives executed over these ${days} days reduced inter-departmental fragmentation.`,
    symmetryDescStandard: 'The radar reflects balance across enterprise departments. High dispersion indicates units that have modernized in silos, creating friction where commercial channels generate demand that manual logistics or billing struggle to fulfill.',
    ecosystemTransitionTitle: 'Ecosystem Transition:',
    ecosystemTransitionDesc: 'The concentration of dimensions in initial or basic tiers emphasizes the necessity to standardize repetitive workflows prior to implementing complex software, ensuring digital investments yield immediate profitability.',

    sec5Title: (sector) => `5. Industry Benchmark Comparison vs. ${sector}`,
    sec5Desc: (name, sector) => `Benchmarking performance of ${name} against peer averages in the ${sector} industry:`,
    compDimTitle: 'Dimension-by-Dimension Benchmark',
    sectorAvgLabel: (avg, name, compAvg, diff) => `Industry Avg: ${avg}% | ${name}: ${compAvg}% (${diff >= 0 ? `+${diff}%` : `${diff}%`})`,
    evolutionCertTitle: (days) => `Temporal Evolution Certificate (${days}+ Days Re-assessment)`,
    evolutionCertSub: (baseDate, baseScore, currDate, currScore) => `Baseline: ${baseDate} (${baseScore}%) ➔ Current: ${currDate} (${currScore}%)`,
    globalPerfTitle: '1. Overall Performance',
    globalPerfDesc: (delta, prev, curr) => `Net gain of +${delta}% in digital maturity. The organization advanced from ${prev} to ${curr}.`,
    topLeapTitle: '2. Highest Qualitative Leap',
    topLeapDesc: (maxLeap) => `Fastest advancing departments achieved increases of up to +${maxLeap}%, confirming effective adoption of digital solutions.`,
    auditOpinionTitle: '3. Audit Opinion',
    auditOpinionDesc: 'Transformation velocity is rated Favorable. Regular re-assessment cycles are recommended to cement continuous process optimization.',
    compAdvantagesTitle: '1. Competitive Advantages',
    compAdvantagesDesc: 'Capabilities where the organization equals or surpasses industry averages, serving as strategic market differentiators.',
    priorityGapsTitle: '2. Priority Gaps',
    priorityGapsDesc: 'Processes lagging behind industry standards, requiring urgent modernization to safeguard market share.',
    strategicGuidelineTitle: '3. Strategic Directive',
    strategicGuidelinePositive: (sector) => `Consolidate cross-departmental automation to reinforce competitive leadership in ${sector}.`,
    strategicGuidelineNegative: (diff) => `Accelerate digital systems and channel integration to close the ${diff}% gap with the industry.`,
    followUpProtocol: 'ℹ️ Temporal Monitoring Protocol: Upon conducting your 2nd evaluation (15 to 30 days after baseline), this report automatically unlocks the Evolution Certificate.',

    sec6Title: '6. Prioritization Matrix & Action Roadmap (16 Initiatives)',
    portfolioTag: 'Comprehensive Strategic Portfolio',
    sec6Desc: 'Complete catalog of 16 modernization initiatives organized into 4 strategic execution quadrants:',
    quadrantQuickWin: 'Quick Win',
    quadrantStrategic: 'Strategic Project',
    quadrantOperational: 'Operational Improvement',
    quadrantFuture: 'Future Initiative / AI',
    phase1Title: 'Phase 1: Quick Wins (Month 1)',
    phase1Desc: '2FA security, WhatsApp Business, cloud templates, and digital payment links.',
    phase2Title: 'Phase 2: Integration (Months 2-4)',
    phase2Desc: 'Core ERP system, digital invoicing, CRM sales pipeline, and mobile checklists.',
    phase3Title: 'Phase 3: Scale & AI (Month 5+)',
    phase3Desc: 'Smart AI assistants, real-time BI analytics dashboards, and customer portal.',
    consultingTeam: 'Specialized Consulting Team',
    validationTitle: 'Technical Emission & Validation',
    managementTeam: 'Executive Management / Board',
    acceptanceTitle: 'Receipt & Plan Conformity',
    finalLegalNote: (year) => `Page 6 of 6 — LUXPROC INNOVATION & TECHNOLOGY © ${year} — Business Technical Document.`,

    initiatives: [
      { id: 'qw-2fa', title: '2-Factor Authentication (2FA) on Email & WhatsApp', axis: 'Technology, Data & Cybersecurity', quadrant: 'Quick Win', impact: 'High', effort: 'Low', timeframe: '1 to 2 days', desc: 'Secure corporate accounts and WhatsApp Business against unauthorized access at zero license cost.' },
      { id: 'qw-whatsapp', title: 'Standardize WhatsApp Business & Digital Catalog', axis: 'Customers & Commercial Channels', quadrant: 'Quick Win', impact: 'High', effort: 'Low', timeframe: '3 to 5 days', desc: 'Product catalog with prices, quick canned responses, and lead stage tags.' },
      { id: 'qw-cloud-docs', title: 'Centralize Shared Corporate Documents in the Cloud', axis: 'Operations, Processes & Logistics', quadrant: 'Quick Win', impact: 'High', effort: 'Low', timeframe: '1 week', desc: 'Replace scattered PC files with organized Google Drive or OneDrive folders with role permissions.' },
      { id: 'qw-qr-payments', title: 'Digital Payment Links & QR Codes', axis: 'Customers & Commercial Channels', quadrant: 'Quick Win', impact: 'High', effort: 'Low', timeframe: '3 to 7 days', desc: 'Enable instant payment processing, eliminating friction from manual bank transfer validation.' },
      { id: 'st-erp', title: 'Core Enterprise ERP System & Electronic Invoicing', axis: 'Operations, Processes & Logistics', quadrant: 'Strategic Project', impact: 'High', effort: 'Medium', timeframe: '1 to 3 months', desc: 'Unify sales, purchasing, inventory, receivables, and digital invoicing into a single real-time platform.' },
      { id: 'st-crm', title: 'Commercial Sales CRM & Pipeline Management', axis: 'Customers & Commercial Channels', quadrant: 'Strategic Project', impact: 'High', effort: 'Medium', timeframe: '2 to 3 months', desc: 'Log sales leads, quotes, and follow-up alerts to prevent missed client opportunities.' },
      { id: 'st-workflow', title: 'Cross-Departmental Workflow Automation (APIs)', axis: 'Technology, Data & Cybersecurity', quadrant: 'Strategic Project', impact: 'High', effort: 'Medium', timeframe: '1 to 2 months', desc: 'Link orders, billing, and fulfillment automatically via Make/Zapier, eliminating double data entry.' },
      { id: 'st-data-gov', title: 'Data Governance Framework & Cloud Backup Protocol', axis: 'Technology, Data & Cybersecurity', quadrant: 'Strategic Project', impact: 'High', effort: 'Medium', timeframe: '2 to 4 months', desc: 'Access security policies, automated daily cloud backups, and disaster recovery procedures.' },
      { id: 'op-checklists', title: 'Mobile Field Operations Checklists (AppSheet)', axis: 'Operations, Processes & Logistics', quadrant: 'Operational Improvement', impact: 'Medium', effort: 'Low', timeframe: '1 to 2 weeks', desc: 'Replace printed clipboards with digital mobile forms submitted instantly to headquarters.' },
      { id: 'op-passwords', title: 'Encrypted Team Password Manager (Bitwarden)', axis: 'Technology, Data & Cybersecurity', quadrant: 'Operational Improvement', impact: 'Medium', effort: 'Low', timeframe: '1 week', desc: 'Eliminate passwords on sticky notes. Departmental encrypted vaults with controlled team access.' },
      { id: 'op-stock', title: 'Inventory Control with Minimum Reorder Alerts', axis: 'Operations, Processes & Logistics', quadrant: 'Operational Improvement', impact: 'Medium', effort: 'Low', timeframe: '2 to 3 weeks', desc: 'Standardize SKUs with automated threshold notifications to prevent stockouts.' },
      { id: 'op-portal-colab', title: 'Digital Knowledge Base & Employee Onboarding', axis: 'People, Talent & Digital Skills', quadrant: 'Operational Improvement', impact: 'Medium', effort: 'Low', timeframe: '2 weeks', desc: 'Centralized process documentation on Notion for seamless new hire onboarding.' },
      { id: 'fu-ai-assistants', title: 'AI Customer Service & Quote Qualification Agents', axis: 'Customers & Commercial Channels', quadrant: 'Future Initiative / AI', impact: 'High', effort: 'High', timeframe: '3 to 5 months', desc: '24/7 intelligent agents answering client inquiries and qualifying inbound leads.' },
      { id: 'fu-bi-analytics', title: 'Executive BI Analytics Dashboard (Power BI / Looker)', axis: 'Technology, Data & Cybersecurity', quadrant: 'Future Initiative / AI', impact: 'High', effort: 'Medium', timeframe: '3 to 6 months', desc: 'Connect sales, margins, and operational KPIs into automated visual dashboards without spreadsheet churn.' },
      { id: 'fu-ecommerce', title: 'Customer Online Self-Service & Ordering Portal', axis: 'Customers & Commercial Channels', quadrant: 'Future Initiative / AI', impact: 'High', effort: 'High', timeframe: '6 to 10 months', desc: 'B2B/B2C self-service portal with live inventory visibility and automated purchase order generation.' },
      { id: 'fu-talent', title: 'Continuous Digital Skills & AI Productivity Training', axis: 'People, Talent & Digital Skills', quadrant: 'Future Initiative / AI', impact: 'High', effort: 'Medium', timeframe: 'Ongoing', desc: 'Monthly hands-on workshops on modern digital tools, workflow automation, and practical AI adoption.' }
    ]
  }
};
