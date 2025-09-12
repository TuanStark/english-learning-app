import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

// API endpoints
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'
const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`
const PROFILE_ENDPOINT = `${API_BASE_URL}/user/profile`

// Helper function to store user data in localStorage
const storeUserData = (userData: any) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('userData', JSON.stringify(userData))
    } catch (error) {
      console.error('Error storing user data in localStorage:', error)
    }
  }
}

// Helper function to get user data from localStorage
const getUserData = () => {
  if (typeof window !== 'undefined') {
    try {
      const data = localStorage.getItem('userData')
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Error reading user data from localStorage:', error)
      return null
    }
  }
  return null
}

// Helper function to clear user data from localStorage
const clearUserData = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('userData')
    } catch (error) {
      console.error('Error clearing user data from localStorage:', error)
    }
  }
}

export const authConfig: NextAuthConfig = {
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Call backend login API
          const response = await fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            console.error('Login failed:', response.statusText)
            return null
          }

          const loginData = await response.json()
          
          // Fetch user profile data
          const profileResponse = await fetch(PROFILE_ENDPOINT, {
            headers: {
              'Authorization': `Bearer ${loginData.data.accessToken}`,
              'Content-Type': 'application/json',
            },
          })

          if (profileResponse.ok) {
            const profileData = await profileResponse.json()
            
            // Combine login and profile data
            const userData = {
              id: profileData.id || loginData.user?.id,
              name: profileData.name || profileData.fullName || loginData.user?.name,
              email: profileData.email || loginData.user?.email,
              image: profileData.avatar || profileData.image || loginData.user?.image,
              role: profileData.role.roleName,
              token: loginData.data.accessToken,
              ...profileData // Include all profile data
            }

            // Store user data in localStorage
            storeUserData(userData)
            
            return userData
          } else {
            // If profile fetch fails, use login data only
            const userData = {
              id: loginData.user?.id || "1",
              name: loginData.user?.fullName || credentials.email,
              email: loginData.user?.email || credentials.email,
              image: loginData.user?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
              role: loginData.user?.role || "student",
              token: loginData.token || loginData.access_token,
              ...loginData.user
            }
            
            storeUserData(userData)
            return userData
          }

        } catch (error) {
          console.error('Authentication error:', error)
          
          // Fallback to demo credentials for development
          if (credentials.email === "demo@example.com" && credentials.password === "demo123") {
            const demoUser = {
              id: "1",
              name: "Demo User",
              email: "demo@example.com",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
              role: "student"
            }
            storeUserData(demoUser)
            return demoUser
          }

          if (credentials.email === "admin@englishpro.com" && credentials.password === "admin123") {
            const adminUser = {
              id: "2",
              name: "Admin User",
              email: "admin@englishpro.com",
              image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
              role: "admin"
            }
            storeUserData(adminUser)
            return adminUser
          }

          if (credentials.email === "teacher@englishpro.com" && credentials.password === "teacher123") {
            const teacherUser = {
              id: "3",
              name: "Sarah Johnson",
              email: "teacher@englishpro.com",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
              role: "teacher"
            }
            storeUserData(teacherUser)
            return teacherUser
          }

          return null
        }
      }
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    // })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("jwt", user)
      if (user) {
        token.id = String(user.id)
        token.name = user.name
        token.email = user.email
        token.image = user.image
        // Store the entire role object
        token.role = (user as any).role || { roleName: "student" }
        token.provider = account?.provider || "credentials"
        
        // Store additional user data in token
        if ((user as any).token) {
          token.accessToken = (user as any).token
        }
      }

      if (account) {
        token.provider = account.provider
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.image as string
        // Pass the entire role object
        session.user.role = token.role as any
        session.user.provider = token.provider as string
        
        // Add access token to session
        if (token.accessToken) {
          (session as any).accessToken = token.accessToken
        }
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  events: {
    async signOut() {
      // Clear user data from localStorage on sign out
      clearUserData()
    },
    async signIn({ user }) {
      // Ensure user data is stored in localStorage on sign in
      if (user) {
        const existingData = getUserData()
        if (!existingData || existingData.id !== user.id) {
          storeUserData(user)
        }
      }
    }
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

// Export helper functions for external use
export { storeUserData, getUserData, clearUserData }
