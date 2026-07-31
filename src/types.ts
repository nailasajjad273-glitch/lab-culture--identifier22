export type TabType = 'identifier' | 'matrix' | 'ast' | 'atlas' | 'quiz' | 'reports';

export interface ColonyMorphology {
  form: string; // e.g. Circular, Irregular, Filamentous
  elevation: string; // e.g. Convex, Flat, Umbonate
  margin: string; // e.g. Entire, Undulate, Erose
  colorAndPigment: string; // e.g. Golden-yellow, Pyocyanin green, Pink
  hemolysis: string; // e.g. Alpha, Beta, Gamma, N/A
  texture: string; // e.g. Smooth, Mucoid, Rough, Dry
  opacity?: string; // e.g. Opaque, Translucent
}

export interface DifferentialDiagnosis {
  organism: string;
  probability: number;
  keyDistinguishingFeature: string;
}

export interface BiochemicalProfile {
  gramStain: string; // "Gram +ve", "Gram -ve", "Yeast", "Acid-fast"
  catalase: string; // "Positive", "Negative", "Variable", "N/A"
  oxidase: string; // "Positive", "Negative", "Variable", "N/A"
  coagulase?: string;
  indole?: string;
  citrate?: string;
  urease?: string;
  fermentation?: string;
  motility?: string;
}

export interface CultureIdentificationResult {
  id?: string;
  timestamp?: string;
  specimenSource?: string;
  agarMedium?: string;
  organismName: string;
  commonName: string;
  category: string;
  confidenceScore: number;
  detectedMedium?: string;
  colonyMorphology: ColonyMorphology;
  differentialDiagnoses: DifferentialDiagnosis[];
  biochemicalProfile: BiochemicalProfile;
  clinicalSignificance: string;
  associatedInfections: string[];
  biosafetyLevel: string; // "BSL-1" | "BSL-2" | "BSL-3"
  biosafetyPrecautions: string;
  recommendedConfirmatoryTests: string[];
  treatmentSusceptibilitySummary: string;
  detailedExplanation: string;
  imagePreviewUrl?: string;
  technologistNotes?: string;
}

export interface ReferenceOrganism {
  id: string;
  name: string;
  commonName: string;
  category: 'Gram-Positive Bacteria' | 'Gram-Negative Bacteria' | 'Fungi/Yeast' | 'Acid-Fast Bacteria';
  gramReaction: 'Gram-Positive' | 'Gram-Negative' | 'Fungi' | 'Acid-Fast';
  shape: 'Cocci' | 'Bacilli' | 'Coccobacilli' | 'Yeast/Hyphae' | 'Spirilla';
  primaryMedia: string[];
  colonyTraits: {
    color: string;
    form: string;
    elevation: string;
    margin: string;
    hemolysis?: string;
    uniqueFeature: string;
  };
  biochemicals: {
    catalase: string;
    oxidase: string;
    coagulase?: string;
    indole?: string;
    citrate?: string;
    urease?: string;
    lactoseFermentation?: string;
  };
  biosafetyLevel: 'BSL-1' | 'BSL-2' | 'BSL-3';
  clinicalSummary: string;
  commonInfections: string[];
  imageUrl: string;
  bgGradient: string;
}

export interface PresetSampleSpecimen {
  id: string;
  title: string;
  organismName: string;
  agarMedium: string;
  description: string;
  imageUrl: string;
  specimenSource: string;
  observedTraits: string;
}

export interface ASTAntibiotic {
  name: string;
  potency: string; // e.g. "10 µg"
  susceptibleMinMm: number; // e.g. >= 22
  resistantMaxMm: number; // e.g. <= 17
}

export interface ASTTestItem {
  id: string;
  antibioticName: string;
  potency: string;
  zoneMm: number;
  interpretation: 'Sensitive' | 'Intermediate' | 'Resistant';
}

export interface ASTEvaluationResult {
  organismName: string;
  tests: ASTTestItem[];
  resistancePhenotypeAlert?: string; // e.g. "MRSA (Methicillin Resistant S. aureus)"
  recommendedAction: string;
}

export interface ClinicalQuizCase {
  caseTitle: string;
  patientVignette: string;
  specimenType: string;
  agarMediumUsed: string;
  colonyDescription: string;
  gramStainResult: string;
  initialBiochemicals: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  clinicalPearls: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: 'Senior Microbiologist' | 'Pathology Resident' | 'Lab Technologist' | 'Medical Student';
  facility: string;
  token: string;
  loginTimestamp: string;
}

