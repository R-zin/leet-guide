export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Language = 'python' | 'javascript' | 'cpp' | 'java';

export type ProblemStatus = 'unsolved' | 'solved' | 'review';

export interface CodeExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: any[];
  expected: any;
}

export interface RunnableConfig {
  functionName: string;
  starterCode: string;
  testCases: TestCase[];
}

export interface Solution {
  language: Language;
  code: string;
  explanation: string;
}

export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  topic: string;
  topicName: string;
  pattern: string;
  leetcodeUrl: string;
  companies: string[];
  description: string;
  examples: CodeExample[];
  constraints: string[];
  intuition: string;
  algorithmSteps: string[];
  solutions: Record<Language, string>;
  timeComplexity: string;
  spaceComplexity: string;
  complexityAnalysis: string;
  commonPitfalls: string[];
  similarProblems?: { title: string; slug: string; difficulty: Difficulty }[];
  runnable?: RunnableConfig;
  visualizerType?: 'two-pointers' | 'binary-search' | 'sliding-window' | 'stack';
}

export interface KeyConcept {
  title: string;
  explanation: string;
  codeSnippet?: string;
}

export interface CodeTemplate {
  name: string;
  language: string;
  code: string;
  explanation: string;
}

export interface Topic {
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  longOverview: string;
  difficultyFocus: string;
  keyConcepts: KeyConcept[];
  whenToUse: string[];
  templates: CodeTemplate[];
  commonMistakes: string[];
  problemSlugs: string[];
}

export interface BigOComplexityItem {
  structure: string;
  access: string;
  search: string;
  insertion: string;
  deletion: string;
  space: string;
  notes: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  pattern: string;
}
