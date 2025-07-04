export interface User {
  id: string;
  email: string;
  name: string;
  school?: string;
  grades?: string[];
  subjects?: string[];
  language?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedContent {
  id: string;
  userId: string;
  type: 'story' | 'explanation' | 'poem' | 'dialogue' | 'activity';
  title: string;
  content: string;
  language: string;
  gradeLevel: string;
  topic: string;
  subject?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DifferentiatedMaterial {
  id: string;
  userId: string;
  originalImageUrl: string;
  title: string;
  subject: string;
  materials: {
    grade: string;
    level: string;
    title: string;
    description: string;
    difficulty: string;
    downloadUrl?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface KnowledgeQuery {
  id: string;
  userId: string;
  question: string;
  answer: string;
  language: string;
  level: 'simple' | 'moderate' | 'detailed';
  subject?: string;
  createdAt: Date;
}

export interface VisualAid {
  id: string;
  userId: string;
  title: string;
  description: string;
  diagramType: string;
  complexity: string;
  svgContent: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonPlan {
  id: string;
  userId: string;
  subject: string;
  topic: string;
  duration: number;
  grades: string[];
  objectives: string[];
  timeline: {
    time: string;
    activity: string;
    type: string;
  }[];
  resources: string[];
  differentiation: Record<string, string[]>;
  assessment: Record<string, string[]>;
  createdAt: Date;
  updatedAt: Date;
}

export interface EducationalGame {
  id: string;
  userId: string;
  title: string;
  subject: string;
  topic: string;
  gameType: string;
  gradeLevel: string;
  questions: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AudioAssessment {
  id: string;
  userId: string;
  studentName?: string;
  readingText: string;
  language: string;
  audioUrl: string;
  results: {
    overallScore: number;
    fluency: number;
    pronunciation: number;
    pace: number;
    accuracy: number;
    feedback: {
      type: 'positive' | 'suggestion';
      text: string;
    }[];
    detailedAnalysis: {
      wordsPerMinute: number;
      correctWords: number;
      totalWords: number;
      mispronunciations: string[];
      suggestions: string[];
    };
  };
  createdAt: Date;
}