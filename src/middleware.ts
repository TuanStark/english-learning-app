import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/courses/enrolled",
  "/practice/my-tests",
  "/vocabulary/my-sets",
  "/grammar/my-progress"
]

// Routes that require admin role
const adminRoutes = [
  "/admin"
]

// Routes that require teacher role
const teacherRoutes = [
  "/teacher"
]

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/courses",
  "/practice",
  "/vocabulary", 
  "/grammar",
  "/roadmap",
  "/blog",
  "/auth",
  "/api/auth"
]

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  )
  
  const isAdminRoute = adminRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  )
  
  const isTeacherRoute = teacherRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  )

  // Redirect to auth if trying to access protected route without login
  if (isProtectedRoute && !isLoggedIn) {
    const redirectUrl = new URL("/auth", nextUrl.origin)
    redirectUrl.searchParams.set("callbackUrl", nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Check admin access
  if (isAdminRoute && (!isLoggedIn || req.auth?.user?.role?.roleName !== "admin")) {
    return NextResponse.redirect(new URL("/", nextUrl.origin))
  }

  // Check teacher access
  if (isTeacherRoute && (!isLoggedIn || !["admin", "teacher"].includes(req.auth?.user?.role?.roleName || ""))) {
    return NextResponse.redirect(new URL("/", nextUrl.origin))
  }

  // Redirect logged in users away from auth page
  if (nextUrl.pathname === "/auth" && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
