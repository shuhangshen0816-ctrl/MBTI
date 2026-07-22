export type LikertValue = 1 | 2 | 3 | 4 | 5;

export interface QuestionWeights {
  // MBTI dichotomies (+ = right pole)
  EI?: number; // + E, - I
  SN?: number; // + S, - N
  TF?: number; // + T, - F
  JP?: number; // + J, - P
  // Big Five (+ = higher trait)
  O?: number; // Openness
  C?: number; // Conscientiousness
  E?: number; // Extraversion
  A?: number; // Agreeableness
  N?: number; // Neuroticism
  // Enneagram types 1-9
  e1?: number;
  e2?: number;
  e3?: number;
  e4?: number;
  e5?: number;
  e6?: number;
  e7?: number;
  e8?: number;
  e9?: number;
  // DnD alignment axes
  LC?: number; // + Lawful, - Chaotic
  GE?: number; // + Good, - Evil
  // Instinctual variants
  sp?: number;
  sx?: number;
  so?: number;
}

export interface Question {
  id: number;
  text: string;
  weights: QuestionWeights;
}

export interface Answers {
  [questionId: number]: LikertValue;
}

export interface MBTIResult {
  type: string;
  dimensions: {
    EI: { letter: 'E' | 'I'; score: number };
    SN: { letter: 'S' | 'N'; score: number };
    TF: { letter: 'T' | 'F'; score: number };
    JP: { letter: 'J' | 'P'; score: number };
  };
}

export interface BigFiveResult {
  O: number;
  C: number;
  E: number;
  A: number;
  N: number;
}

export interface EnneagramResult {
  type: number;
  wing: number;
  scores: Record<number, number>;
  name: string;
}

export interface AlignmentResult {
  alignment: string;
  nameCn: string;
  lawfulChaotic: number;
  goodEvil: number;
}

export interface InstinctResult {
  primary: 'sp' | 'sx' | 'so';
  secondary: 'sp' | 'sx' | 'so';
  scores: { sp: number; sx: number; so: number };
  labels: { sp: string; sx: string; so: string };
}

export interface TestResults {
  mbti: MBTIResult;
  bigFive: BigFiveResult;
  enneagram: EnneagramResult;
  alignment: AlignmentResult;
  instinct: InstinctResult;
}

export type AppPhase = 'welcome' | 'quiz' | 'results';
