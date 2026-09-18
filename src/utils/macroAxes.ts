import { DiagnosticRecord, ScoreMetrics, MacroAxisScore, SectorType } from '../types';
import { SECTOR_BENCHMARKS } from '../components/SectorBenchmarkChart';
import { Language } from '../i18n/translations';

export interface MacroAxisDefinition {
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  iconName: string;
  dimensionKeys: (keyof ScoreMetrics)[];
  weightFactor: number;
}

export const MACRO_AXES_DEFINITIONS: MacroAxisDefinition[] = [
  {
    id: 'estrategia',
    name: {
      es: 'Estrategia, Liderazgo y Sostenibilidad',
      en: 'Strategy, Leadership & Sustainability',
      pt: 'Estratégia, Liderança e Sustentabilidade'
    },
    description: {
      es: 'Visión de la dirección, presupuesto tecnológico, cultura de innovación y sustentabilidad circular.',
      en: 'Executive vision, tech investment budget, innovation culture, and circular sustainability.',
      pt: 'Visão executiva, orçamento de tecnologia, cultura de inovação e sustentabilidade circular.'
    },
    iconName: 'Compass',
    dimensionKeys: ['innovacion', 'cultura', 'circularidad'],
    weightFactor: 1
  },
  {
    id: 'operaciones',
    name: {
      es: 'Operaciones, Procesos y Logística',
      en: 'Operations, Processes & Logistics',
      pt: 'Operações, Processos e Logística'
    },
    description: {
      es: 'Automatización de flujos de trabajo, control de inventario, trazabilidad de pedidos y operaciones de planta o taller.',
      en: 'Workflow automation, stock management, order traceability, and operational or manufacturing control.',
      pt: 'Automação de fluxos de trabalho, controle de estoque, rastreabilidade de pedidos e operações.'
    },
    iconName: 'Workflow',
    dimensionKeys: ['automatizacion', 'trazabilidad'],
    weightFactor: 1
  },
  {
    id: 'comercial',
    name: {
      es: 'Clientes y Canales Comerciales',
      en: 'Customers & Commercial Channels',
      pt: 'Clientes e Canais Comerciais'
    },
    description: {
      es: 'Canales de venta digitales, presencia web/e-commerce, atención por WhatsApp Business y fidelización mediante CRM.',
      en: 'Digital sales channels, e-commerce presence, WhatsApp Business communication, and CRM engagement.',
      pt: 'Canais de vendas digitais, presença online/e-commerce, WhatsApp Business e retenção via CRM.'
    },
    iconName: 'BadgeDollarSign',
    dimensionKeys: ['digitalizacion'],
    weightFactor: 1
  },
  {
    id: 'tecnologia_datos',
    name: {
      es: 'Tecnología, Datos y Ciberseguridad',
      en: 'Technology, Data & Cybersecurity',
      pt: 'Tecnologia, Dados e Cibersegurança'
    },
    description: {
      es: 'Sistemas administrativos (ERP/facturación), infraestructura en la nube, protección de accesos (2FA) y tableros de BI.',
      en: 'Administrative systems (ERP/invoicing), cloud infrastructure, security policies (2FA), and BI dashboards.',
      pt: 'Sistemas administrativos (ERP/faturamento), infraestrutura em nuvem, segurança (2FA) e painéis de BI.'
    },
    iconName: 'ShieldCheck',
    dimensionKeys: ['gestion', 'seguridad'],
    weightFactor: 1
  },
  {
    id: 'personas_talento',
    name: {
      es: 'Personas, Talento y Habilidades Digitales',
      en: 'People, Talent & Digital Skills',
      pt: 'Pessoas, Talentos e Habilidades Digitais'
    },
    description: {
      es: 'Capacitación continua del equipo, adopción de herramientas de productividad y uso práctico de Inteligencia Artificial.',
      en: 'Continuous workforce upskilling, adoption of productivity tools, and hands-on AI assistant usage.',
      pt: 'Capacitação contínua da equipe, adoção de ferramentas de produtividade e uso prático de IA.'
    },
    iconName: 'Users2',
    dimensionKeys: ['cultura', 'innovacion'],
    weightFactor: 1
  }
];

export function calculateMacroAxes(
  record: DiagnosticRecord,
  lang: Language = 'es'
): MacroAxisScore[] {
  const metrics = record.metrics;
  const sector = record.companyInfo.sector || 'Comercio';
  const sectorBenchmark = SECTOR_BENCHMARKS[sector] || SECTOR_BENCHMARKS.Comercio;

  return MACRO_AXES_DEFINITIONS.map((def) => {
    // Calculate average score of associated metric dimensions
    let totalScore = 0;
    let totalBench = 0;

    def.dimensionKeys.forEach((key) => {
      totalScore += metrics[key] || 0;
      totalBench += sectorBenchmark[key] || 50;
    });

    const avgScore = Math.round(totalScore / def.dimensionKeys.length);
    const avgBench = Math.round(totalBench / def.dimensionKeys.length);
    const diff = avgScore - avgBench;

    let statusTag = '';
    let statusColor = '';
    let diagnosis = '';
    let priorityFocus = '';

    if (lang === 'en') {
      if (avgScore >= 76) {
        statusTag = 'Optimized';
        statusColor = 'emerald';
        diagnosis = 'Pillar of organizational strength. Solid processes with high level of autonomy.';
        priorityFocus = 'Maintain continuous optimization and evaluate advanced predictive automation.';
      } else if (avgScore >= 51) {
        statusTag = 'In Development';
        statusColor = 'blue';
        diagnosis = 'Standardized workflows with clear roadmap for systems cross-integration.';
        priorityFocus = 'Connect existing software via APIs and eliminate remaining manual spreadsheet entries.';
      } else if (avgScore >= 26) {
        statusTag = 'Basic';
        statusColor = 'amber';
        diagnosis = 'Initial digitized tools present, but operation still relies on isolated manual tasks.';
        priorityFocus = 'Implement a core management tool (cloud ERP/CRM) and train staff on standard routines.';
      } else {
        statusTag = 'Vulnerable';
        statusColor = 'rose';
        diagnosis = 'High manual dependency and risk of data loss. Urgent modernization required.';
        priorityFocus = 'Prioritize immediate migration of critical papers/spreadsheets to basic cloud systems.';
      }
    } else if (lang === 'pt') {
      if (avgScore >= 76) {
        statusTag = 'Otimizado';
        statusColor = 'emerald';
        diagnosis = 'Pilar de força corporativa. Processos sólidos e alto grau de autonomia digital.';
        priorityFocus = 'Manter melhoria contínua e explorar automações avançadas e inteligência artificial.';
      } else if (avgScore >= 51) {
        statusTag = 'Em Desenvolvimento';
        statusColor = 'blue';
        diagnosis = 'Fluxos estruturados com oportunidade de integração direta entre ferramentas.';
        priorityFocus = 'Integrar sistemas existentes e eliminar digitação manual duplicada em planilhas.';
      } else if (avgScore >= 26) {
        statusTag = 'Básico';
        statusColor = 'amber';
        diagnosis = 'Presença de ferramentas isoladas, mas com dependência de controles manuais.';
        priorityFocus = 'Adotar sistema unificado de gestão e capacitar a equipe nas rotinas digitais diárias.';
      } else {
        statusTag = 'Vulnerável';
        statusColor = 'rose';
        diagnosis = 'Alta dependência manual e risco operacional. Modernização básica urgente.';
        priorityFocus = 'Migrar urgentemente dados em papel e arquivos locais para repositórios seguros em nuvem.';
      }
    } else {
      // Spanish (Default)
      if (avgScore >= 76) {
        statusTag = 'Optimizado';
        statusColor = 'emerald';
        diagnosis = 'Fortaleza estratégica del negocio. Procesos consolidados con alto grado de eficiencia.';
        priorityFocus = 'Sostener la disciplina operativa y evaluar analítica predictiva o IA generativa.';
      } else if (avgScore >= 51) {
        statusTag = 'En Desarrollo';
        statusColor = 'blue';
        diagnosis = 'Procesos digitales establecidos con oportunidades claras de integración fluida entre áreas.';
        priorityFocus = 'Conectar sistemas existentes (APIs) y erradicar la duplicación manual de planillas.';
      } else if (avgScore >= 26) {
        statusTag = 'Básico';
        statusColor = 'amber';
        diagnosis = 'Herramientas digitales aisladas. Existen avances pero persiste la fragmentación de datos.';
        priorityFocus = 'Adoptar un sistema de gestión centralizado y estandarizar el uso en el equipo.';
      } else {
        statusTag = 'Vulnerable';
        statusColor = 'rose';
        diagnosis = 'Alta dependencia de procesos manuales o papel. Riesgo de errores y descontrol de tiempos.';
        priorityFocus = 'Digitalizar de inmediato los registros vitales en la nube y asegurar copias de respaldo.';
      }
    }

    return {
      id: def.id,
      name: def.name[lang] || def.name.es,
      description: def.description[lang] || def.description.es,
      iconName: def.iconName,
      score: avgScore,
      benchmark: avgBench,
      diff,
      statusTag,
      statusColor,
      diagnosis,
      priorityFocus,
      dimensionsIncluded: def.dimensionKeys.map(k => String(k))
    };
  });
}
