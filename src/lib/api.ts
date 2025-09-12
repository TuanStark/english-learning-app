import { ExamAttempt } from "@/types/global-type";

// API service layer for integrating with NestJS backend
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001';

// Common response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Vocabulary Types
export interface VocabularyTopic {
  id: number;
  topicName: string;
  description?: string;
  image?: string;
  orderIndex: number;
  isActive: boolean;
  vocabularies?: Vocabulary[];
  _count?: {
    vocabularies: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Vocabulary {
  id: number;
  topicId?: number;
  englishWord: string;
  pronunciation?: string;
  vietnameseMeaning: string;
  wordType?: string;
  difficultyLevel: 'Easy' | 'Medium' | 'Hard';
  image?: string;
  audioFile?: string;
  isActive?: boolean;
  topic?: VocabularyTopic;
  createdAt?: string;
  updatedAt?: string;
  userProgress?: Array<{
    id: number;
    userId: number;
    vocabularyId: number;
    status: string;
    masteryLevel: number;
    timesPracticed: number;
    lastPracticedAt: string;
    firstLearnedAt: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

// Paginated response for vocabulary topics
export interface VocabularyTopicsResponse {
  data: VocabularyTopic[];
  meta: {
    total: number;
    pageNumber: number;
    limitNumber: number;
    totalPages: number;
  };
}

// Grammar Types
export interface Grammar {
  id: number;
  title: string;
  content: string;
  difficultyLevel: 'Easy' | 'Medium' | 'Hard';
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  examples?: GrammarExample[];
  userProgress?: Array<{
    id: number;
    userId: number;
    status: string;
    masteryLevel: number;
  }>;
  _count?: {
    examples: number;
    userProgress: number;
  };
}

export interface GrammarExample {
  id: number;
  englishSentence: string;
  vietnameseSentence: string;
}

// Blog Types
export interface BlogCategory {
  id: number;
  categoryName: string;
  slug: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  authorId: number;
  categoryId: number;
  status: 'Draft' | 'Published' | 'Archived';
  publishedAt?: string;
  seoKeywords?: string;
  seoDescription?: string;
  viewCount?: number;
  commentCount?: number;
  tags?: string[];
  author?: any;
  category?: BlogCategory;
  blogComments?: BlogComment[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogComment {
  id: number;
  content: string;
  blogPostId: number;
  userId: number;
  parentCommentId?: number;
  user?: {
    id: number;
    fullName: string;
    avatar?: string;
  };
  replies?: BlogComment[];
  createdAt: string;
  updatedAt: string;
}

// Course Types
export interface Course {
  id: number;
  title: string;
  description: string;
  instructorId: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string | { name: string };
  difficulty?: string;
  duration: string;
  price: number;
  originalPrice?: number;
  isActive: boolean;
  thumbnail?: string;
  image?: string;
  features: string[];
  tags: string[];
  enrolledCount?: number;
  objectives?: string;
  instructor?: {
    id: number;
    fullName: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CourseLesson {
  id: number;
  title: string;
  description: string;
  duration: number;
  type: 'video' | 'quiz' | 'exam' | 'text';
  isCompleted: boolean;
  isLocked: boolean;
  order: number;
}

export interface Exam {
  id: number;
  title: string;
  description?: string;
  type: 'TOEIC' | 'IELTS' | 'GRAMMAR' | 'VOCABULARY';
  duration: number;
  totalQuestions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  _count: {
    questions: number;
    examAttempts: number;
  };
  examAttempts?: ExamAttempt[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  questions?: ExamQuestion[];
}

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
  examId: number;
  exam?: Exam;
  createdAt: string;
  updatedAt: string;
}

// API Client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
  endpoint: string,
  options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
  
    const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
    };

  try {
      const response = await fetch(url, config);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Vocabulary API
  async getVocabularyTopics(params?: string): Promise<ApiResponse<VocabularyTopicsResponse>> {
    const url = params ? `/vocabulary-topics?${params}` : '/vocabulary-topics';
    return this.request<VocabularyTopicsResponse>(url);
  }

  async getVocabularyTopicById(id: number): Promise<VocabularyTopic> {
    const response = await this.request<any>(`/vocabulary-topics/${id}`);
    // This endpoint returns the topic directly, not wrapped in ApiResponse
    return response.data || response;
  }

  async getVocabularyTopicStats(id: number): Promise<ApiResponse<any>> {
    return this.request<any>(`/vocabulary-topics/${id}/stats`);
  }

  async getVocabularies(params?: {
    topicId?: number;
    difficultyLevel?: string;
    includeInactive?: boolean;
  }): Promise<ApiResponse<Vocabulary[]>> {
    const queryParams = new URLSearchParams();
    if (params?.topicId) queryParams.append('topicId', params.topicId.toString());
    if (params?.difficultyLevel) queryParams.append('difficultyLevel', params.difficultyLevel);
    if (params?.includeInactive) queryParams.append('includeInactive', params.includeInactive.toString());
    
    const endpoint = `/vocabularies${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<Vocabulary[]>(endpoint);
  }

  async getVocabularyById(id: number): Promise<ApiResponse<Vocabulary>> {
    return this.request<Vocabulary>(`/vocabularies/${id}`);
  }

  async getVocabulariesByTopic(topicId: number): Promise<ApiResponse<Vocabulary[]>> {
    return this.request<Vocabulary[]>(`/vocabularies/topic/${topicId}`);
  }

  // Grammar API
  async getGrammar(params?: {
    difficultyLevel?: string;
    includeInactive?: boolean;
  }): Promise<ApiResponse<{ data: Grammar[]; meta: any }>> {
    const queryParams = new URLSearchParams();
    if (params?.difficultyLevel) queryParams.append('difficultyLevel', params.difficultyLevel);
    if (params?.includeInactive) queryParams.append('includeInactive', params.includeInactive.toString());
    
    const endpoint = `/grammar${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<{ data: Grammar[]; meta: any }>(endpoint);
  }

  async searchGrammar(query: string): Promise<ApiResponse<Grammar[]>> {
    return this.request<Grammar[]>(`/grammar/search?q=${encodeURIComponent(query)}`);
  }

  async getGrammarById(id: number): Promise<ApiResponse<Grammar>> {
    return this.request<Grammar>(`/grammar/${id}`);
  }

  // Blog API
  async getBlogCategories(): Promise<ApiResponse<BlogCategory[]>> {
    return this.request<BlogCategory[]>('/blog-categories');
  }

  async getBlogPosts(params?: {
    categoryId?: number;
    authorId?: number;
    status?: string;
  }): Promise<ApiResponse<BlogPost[]>> {
    const queryParams = new URLSearchParams();
    if (params?.categoryId) queryParams.append('categoryId', params.categoryId.toString());
    if (params?.authorId) queryParams.append('authorId', params.authorId.toString());
    if (params?.status) queryParams.append('status', params.status);
    
    const endpoint = `/blog-posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<BlogPost[]>(endpoint);
  }

  async getPublishedBlogPosts(): Promise<ApiResponse<BlogPost[]>> {
    return this.request<BlogPost[]>('/blog-posts/published');
  }

  async searchBlogPosts(query: string): Promise<ApiResponse<BlogPost[]>> {
    return this.request<BlogPost[]>(`/blog-posts/search?q=${encodeURIComponent(query)}`);
  }

  async getBlogPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/blog-posts/slug/${slug}`);
  }

  async getBlogPostById(id: number): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/blog-posts/${id}`);
  }

  async getBlogPostStats(id: number): Promise<ApiResponse<any>> {
    return this.request<any>(`/blog-posts/${id}/stats`);
  }

  // Blog Comments API
  async getBlogComments(params?: {
    blogPostId?: number;
    userId?: number;
    parentCommentId?: number;
  }): Promise<ApiResponse<BlogComment[]>> {
    const queryParams = new URLSearchParams();
    if (params?.blogPostId) queryParams.append('blogPostId', params.blogPostId.toString());
    if (params?.userId) queryParams.append('userId', params.userId.toString());
    if (params?.parentCommentId) queryParams.append('parentCommentId', params.parentCommentId.toString());
    
    const endpoint = `/blog-comments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<BlogComment[]>(endpoint);
  }

  async getCommentsByPost(blogPostId: number): Promise<ApiResponse<BlogComment[]>> {
    return this.request<BlogComment[]>(`/blog-comments/post/${blogPostId}`);
  }

  async getCommentStats(blogPostId: number): Promise<ApiResponse<any>> {
    return this.request<any>(`/blog-comments/post/${blogPostId}/stats`);
  }

  // Course API (if available)
  async getCourses(): Promise<ApiResponse<Course[]>> {
    return this.request<Course[]>('/courses');
  }

  async getCourseById(id: number): Promise<ApiResponse<Course>> {
    return this.request<Course>(`/courses/${id}`);
  }

  // Dashboard API
  async getDashboardStats(): Promise<ApiResponse<any>> {
    return this.request<any>('/dashboard/stats');
  }

  async getVocabularyStats(): Promise<ApiResponse<any>> {
    return this.request<any>('/dashboard/vocabulary/stats');
  }

  async getGrammarStats(): Promise<ApiResponse<any>> {
    return this.request<any>('/dashboard/grammar/stats');
  }

  // Exam API
  async getExams(params?: any): Promise<ApiResponse<Exam[]>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });
    }
    const query = queryParams.toString();
    return this.request<Exam[]>(`/exams${query ? `?${query}` : ''}`);
  }

  async getExamById(id: number): Promise<ApiResponse<Exam>> {
    return this.request<Exam>(`/exams/${id}`);
  }

  async getExamQuestions(examId: number): Promise<ApiResponse<ExamQuestion[]>> {
    return this.request<ExamQuestion[]>(`/exams/${examId}/questions`);
  }

  // Auth API
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    return this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any): Promise<ApiResponse<any>> {
    return this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<any>> {
    return this.request<any>('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<any>> {
    return this.request<any>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async forgotPassword(email: string): Promise<ApiResponse<any>> {
    return this.request<any>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse<any>> {
    return this.request<any>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }

  async checkCode(codeId: string, userId: number): Promise<ApiResponse<any>> {
    return this.request<any>('/auth/check-code', {
      method: 'POST',
      body: JSON.stringify({ codeId, id: userId.toString() }),
    });
  }

  async resendCode(userId: number, email: string): Promise<ApiResponse<any>> {
    return this.request<any>('/auth/resend-code', {
      method: 'POST',
      body: JSON.stringify({ id: userId.toString(), email }),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL || '');

// Export individual API functions for convenience
export const vocabularyApi = {
  getTopics: (params?: string) => apiClient.getVocabularyTopics(params),
  getTopicById: (id: number) => apiClient.getVocabularyTopicById(id),
  getTopicStats: (id: number) => apiClient.getVocabularyTopicStats(id),
  getAll: (params?: any) => apiClient.getVocabularies(params),
  getById: (id: number) => apiClient.getVocabularyById(id),
  getByTopic: (topicId: number) => apiClient.getVocabulariesByTopic(topicId),
};

export const grammarApi = {
  getAll: (params?: any) => apiClient.getGrammar(params),
  search: (query: string) => apiClient.searchGrammar(query),
  getById: (id: number) => apiClient.getGrammarById(id),
};

export const blogApi = {
  getCategories: () => apiClient.getBlogCategories(),
  getAll: (params?: any) => apiClient.getBlogPosts(params),
  getPublished: () => apiClient.getPublishedBlogPosts(),
  search: (query: string) => apiClient.searchBlogPosts(query),
  getBySlug: (slug: string) => apiClient.getBlogPostBySlug(slug),
  getById: (id: number) => apiClient.getBlogPostById(id),
  getStats: (id: number) => apiClient.getBlogPostStats(id),
  getComments: (params?: any) => apiClient.getBlogComments(params),
  getCommentsByPost: (blogPostId: number) => apiClient.getCommentsByPost(blogPostId),
  getCommentStats: (blogPostId: number) => apiClient.getCommentStats(blogPostId),
};

export const courseApi = {
  getAll: () => apiClient.getCourses(),
  getById: (id: number) => apiClient.getCourseById(id),
};

export const dashboardApi = {
  getStats: () => apiClient.getDashboardStats(),
  getVocabularyStats: () => apiClient.getVocabularyStats(),
  getGrammarStats: () => apiClient.getGrammarStats(),
};

export const examApi = {
  getAll: (params?: any) => apiClient.getExams(params),
  getById: (id: number) => apiClient.getExamById(id),
  getQuestions: (examId: number) => apiClient.getExamQuestions(examId),
};

// Auth API
export const authApi = {
  login: (email: string, password: string) => apiClient.login(email, password),
  register: (userData: any) => apiClient.register(userData),
  logout: () => apiClient.logout(),
  refreshToken: (refreshToken: string) => apiClient.refreshToken(refreshToken),
  forgotPassword: (email: string) => apiClient.forgotPassword(email),
  resetPassword: (token: string, password: string) => apiClient.resetPassword(token, password),
  checkCode: (codeId: string, userId: number) => apiClient.checkCode(codeId, userId),
  resendCode: (userId: number, email: string) => apiClient.resendCode(userId, email),
};

// Error class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
