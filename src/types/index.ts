export interface Question {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'listening';
  content: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  audioUrl?: string;
}

export interface Exam {
  id: string;
  title: string;
  type: 'TOEIC' | 'IELTS';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // minutes
  questionCount: number;
  imageUrl: string;
  description: string;
  questions: Question[];
}

export interface ExamResult {
  id: string;
  examId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // minutes
  answers: Record<string, string>;
  completedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  results: ExamResult[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  category: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  isLearned: boolean;
}

export interface GrammarLesson {
  id: string;
  title: string;
  content: string;
  examples: string[];
  exercises: Question[];
  level: 'Basic' | 'Intermediate' | 'Advanced';
}
