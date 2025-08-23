"use client"

import { useSession } from "next-auth/react"

export function useAuth() {
  const { data: session, status } = useSession()

  // Helper function to get role name from role object or string
  const getRoleName = (role: any): string => {
    if (typeof role === 'string') {
      return role
    }
    if (role && typeof role === 'object' && role.roleName) {
      return role.roleName
    }
    return 'student' // default fallback
  }

  // Helper function to check if user has specific role
  const hasRole = (roleName: string): boolean => {
    const userRole = getRoleName(session?.user?.role)
    return userRole.toLowerCase() === roleName.toLowerCase()
  }

  return {
    user: session?.user,
    isLoading: status === "loading",
    isAuthenticated: !!session,
    // Role checks using the new structure
    isAdmin: hasRole('admin'),
    isTeacher: hasRole('teacher') || hasRole('admin'),
    isStudent: hasRole('student'),
    // Additional role utilities
    roleName: getRoleName(session?.user?.role),
    role: session?.user?.role,
    // Access token
    accessToken: (session as any)?.accessToken,
    // Provider info
    provider: session?.user?.provider,
  }
}
