'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Lock, 
  BookOpen, 
  User, 
  Star,
  TrendingUp,
  Award
} from 'lucide-react'
import Link from 'next/link'

interface AuthGuardProps {
  children: React.ReactNode
  requiredAuth?: boolean
}

export default function AuthGuard({ children, requiredAuth = true }: AuthGuardProps) {
  const { data: session, status } = useSession()
  const loading = status === 'loading'
  const user = session?.user

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (requiredAuth && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center space-y-6">
              {/* Lock Icon */}
              <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-10 h-10 text-blue-600" />
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Cần đăng nhập
                </h2>
                <p className="text-gray-600">
                  Bạn cần đăng nhập để truy cập tính năng này
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-blue-900 text-sm">
                  Với tài khoản EnglishMaster, bạn sẽ có:
                </h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Lưu kết quả luyện tập</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Theo dõi tiến độ học tập</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4" />
                    <span>Nhận chứng chỉ hoàn thành</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Hỗ trợ cá nhân hóa</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/login">
                    Đăng nhập
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/register">
                    Tạo tài khoản miễn phí
                  </Link>
                </Button>
              </div>

              {/* Back to home */}
              <div className="pt-4 border-t border-gray-200">
                <Button variant="ghost" asChild>
                  <Link href="/" className="text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Quay về trang chủ
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Higher-order component để wrap pages cần auth
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  requiredAuth = true
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <AuthGuard requiredAuth={requiredAuth}>
        <Component {...props} />
      </AuthGuard>
    )
  }
}
