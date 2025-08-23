"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  User, 
  Settings, 
  BookOpen, 
  LogOut, 
  Shield, 
  GraduationCap,
  ChevronDown 
} from "lucide-react"
import Link from "next/link"

export function UserMenu() {
  const { user, isAuthenticated, isAdmin, isTeacher } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/auth">Đăng nhập</Link>
        </Button>
        <Button asChild>
          <Link href="/auth">Đăng ký</Link>
        </Button>
      </div>
    )
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const getRoleBadge = () => {
    if (isAdmin) return { label: "Admin", icon: Shield, color: "text-red-600" }
    if (isTeacher) return { label: "Giảng viên", icon: GraduationCap, color: "text-blue-600" }
    return { label: "Học viên", icon: User, color: "text-green-600" }
  }

  const roleBadge = getRoleBadge()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-auto p-2 focus:outline-none">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback className="text-xs">
              {getUserInitials(user.name || "U")}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium">{user.name}</span>
            <div className="flex items-center gap-1">
              <roleBadge.icon className={`h-3 w-3 ${roleBadge.color}`} />
              <span className={`text-xs ${roleBadge.color}`}>{roleBadge.label}</span>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Hồ sơ cá nhân
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Cài đặt
          </Link>
        </DropdownMenuItem>
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Quản trị
              </Link>
            </DropdownMenuItem>
          </>
        )}
        
        {isTeacher && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/teacher" className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                Giảng dạy
              </Link>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={handleSignOut}
          disabled={isLoading}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoading ? "Đang đăng xuất..." : "Đăng xuất"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
