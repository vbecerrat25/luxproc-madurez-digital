export type SectorType = 'Comercio' | 'Servicios' | 'Manufactura' | 'Tecnología' | 'Agropecuario' | 'Construcción' | 'Otro';
export type CompanySizeType = 'Micro' | 'Pequeña' | 'Mediana' | 'Grande';
export type TargetCustomerType = 'B2C' | 'B2B' | 'BOTH' | 'Personas' | 'Empresas' | 'Ambos';

export interface CompanyInfo {
  name: string;
  contactEmail: string;
  sector: SectorType;
  size: CompanySizeType;
  country: string;
  targetCustomer?: TargetCustomerType;
}

export type QuestionType = 'single' | 'multiple' | 'scale' | 'conditional';

export interface Option {
  id: string;
  text: string;
  score: number; // raw value for scoring
  weightModifier?: { [key: string]: number }; // modifies specific metric weights
}

export interface Question {
  id: string;
  dimensionId: number;
  text: string;
  type: QuestionType;
  options: Option[];
  placeholder?: string;
  helpTerm?: string; // key of the technical term for explanations
  conditionalParentId?: string; // if dependent on another question
  conditionalParentValue?: string; // parent option id that triggers this question
}

export interface Dimension {
  id: number;
  name: string;
  description: string;
  iconName: string;
}

export interface DiagnosticResponse {
  questionId: string;
  selectedOptionIds: string[]; // single choice will have 1 item
}

export interface ScoreMetrics {
  digitalizacion: number; // 0-100
  automatizacion: number; // 0-100
  innovacion: number; // 0-100
  circularidad: number; // 0-100
  trazabilidad: number; // 0-100
  gestion: number; // 0-100
  seguridad: number; // 0-100
  cultura: number; // 0-100
  general: number; // 0-100
}

export interface DiagnosticRecord {
  id: string;
  date: string;
  time: string;
  timestamp?: number; // millisecond timestamp for timeline calculations
  companyInfo: CompanyInfo;
  responses: DiagnosticResponse[];
  metrics: ScoreMetrics;
}

export interface TechnicalTerm {
  term: string;
  icon: string;
  definition: string;
}

export interface MaturityLevelDetail {
  levelNumber: 1 | 2 | 3 | 4 | 5;
  title: string;
  stageName: string;
  color: string;
  badgeClass: string;
  textClass: string;
  description: string;
  nextStep: string;
}

export interface MacroAxisScore {
  id: string;
  name: string;
  description: string;
  iconName: string;
  score: number;
  benchmark: number;
  diff: number;
  statusTag: string;
  statusColor: string;
  diagnosis: string;
  priorityFocus: string;
  dimensionsIncluded: string[];
}

export interface PrioritizationItem {
  id: string;
  title: string;
  description: string;
  quadrant: 'quick_wins' | 'strategic' | 'operational' | 'future';
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  icon: string;
  badge: string;
}
