import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

// Role interface to match backend structure
interface UserRole {
  id: number
  roleName: string
  description: string
  createdAt: string
  updatedAt: string
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      provider?: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    role?: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    role: UserRole
    provider?: string
    accessToken?: string
  }
}
