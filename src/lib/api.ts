// API service layer for integrating with NestJS backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

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
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorId: number;
  categoryId: number;
  status: 'Draft' | 'Published' | 'Archived';
  publishedAt?: string;
  image?: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  author?: {
    id: number;
    fullName: string;
    avatar?: string;
  };
  category?: BlogCategory;
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
  async getVocabularyTopics(): Promise<ApiResponse<VocabularyTopicsResponse>> {
    return this.request<VocabularyTopicsResponse>('/vocabulary-topics');
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
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export individual API functions for convenience
export const vocabularyApi = {
  getTopics: () => apiClient.getVocabularyTopics(),
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
