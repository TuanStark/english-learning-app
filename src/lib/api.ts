const API_BASE_URL = "http://localhost:8001"

interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

interface RegisterData {
  fullName: string
  email: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

interface UserProfile {
  id: string
  fullName: string
  email: string
  role?: string
  avatar?: string
  [key: string]: any
}

class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, defaultOptions)
    
    if (!response.ok) {
      let errorData: any = {}
      
      try {
        errorData = await response.json()
      } catch {
        // If response is not JSON, use status text
        errorData = { message: response.statusText }
      }

      throw new ApiError(
        response.status,
        errorData.message || `HTTP ${response.status}`,
        errorData.errors
      )
    }

    // Try to parse JSON response
    try {
      return await response.json()
    } catch {
      // If no JSON content, return empty object
      return {} as T
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // Network or other errors
    throw new ApiError(
      0,
      error instanceof Error ? error.message : 'Network error occurred'
    )
  }
}

export const authApi = {
  async register(data: RegisterData): Promise<ApiResponse> {
    return apiCall<ApiResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async login(data: LoginData): Promise<ApiResponse> {
    return apiCall<ApiResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  async getProfile(token: string): Promise<UserProfile> {
    return apiCall<UserProfile>('/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
  },
}

export { ApiError }
export type { ApiResponse, RegisterData, LoginData, UserProfile }
