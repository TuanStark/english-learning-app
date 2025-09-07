// global-types.ts

// Role
export interface Role {
    id: number;
    roleName: string;
    description?: string;
    createdAt: string; // ISO string
    updatedAt: string;
  }
  
  // User
  export interface User {
    id: number;
    email: string;
    password?: string; // optional khi trả về frontend
    fullName: string;
    avatar?: string;
    dateOfBirth?: string;
    gender?: "Male" | "Female" | "Other";
    phoneNumber?: string;
    address?: string;
    isActive: boolean;
    emailVerified: boolean;
    roleId: number;
    status: "active" | "inactive" | "banned";
    codeId?: string;
    codeExpired?: string;
    createdAt: string;
    updatedAt: string;
    role?: Role;
  }
  
  // Exam
  export interface Exam {
    id: number;
    title: string;
    description?: string;
    type?: "TOEIC" | "IELTS" | "SAT" | "CUSTOM";
    duration: number;
    difficulty: "Easy" | "Medium" | "Hard";
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    questions?: Question[];
    examAttempts?: ExamAttempt[];
    _count : {
      questions: number,
      examAttempts: number
    }
  }
  
  // Question
  export interface Question {
    id: number;
    examId: number;
    content: string;
    questionType: string;
    orderIndex: number;
    points: number;
    createdAt: string;
    updatedAt: string;
    answerOptions?: AnswerOption[];
    exam?: Exam;
    grammar?: Grammar;
  }
  
  // Answer Option
  export interface AnswerOption {
    id: number;
    questionId: number;
    content: string;
    isCorrect: boolean;
    optionLabel: string; // A, B, C, D
    createdAt: string;
    updatedAt: string;
    question?: Question;
  }
  
  // Exam Attempt
  export interface ExamAttempt {
    id: number;
    userId: number;
    examId: number;
    score?: number;
    totalQuestions: number;
    correctAnswers: number;
    timeSpent?: number;
    status: "InProgress" | "Completed" | "Abandoned";
    detailedResult?: any; // JSON
    startedAt: string;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
    user?: User;
    exam?: Exam;
  }
  
  // Vocabulary
  export interface Vocabulary {
    id: number;
    topicId: number;
    englishWord: string;
    pronunciation?: string;
    vietnameseMeaning: string;
    wordType?: string;
    difficultyLevel: "Easy" | "Medium" | "Hard";
    image?: string;
    audioFile?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    examples?: VocabularyExample[];
  }
  
  // Vocabulary Example
  export interface VocabularyExample {
    id: number;
    vocabularyId: number;
    englishSentence: string;
    vietnameseSentence: string;
    audioFile?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Grammar
  export interface Grammar {
    id: number;
    title: string;
    content: string;
    difficultyLevel: "Easy" | "Medium" | "Hard";
    orderIndex: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    examples?: GrammarExample[];
    questions?: Question[];
  }
  
  // Grammar Example
  export interface GrammarExample {
    id: number;
    grammarId: number;
    englishSentence: string;
    vietnameseSentence: string;
    explanation?: string;
    createdAt: string;
    updatedAt: string;
  }

  // Pagination
  export interface Pagination {
    page: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  }