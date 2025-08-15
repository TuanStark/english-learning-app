import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication - EnglishMaster',
  description: 'Đăng nhập hoặc tạo tài khoản EnglishMaster để bắt đầu hành trình học tiếng Anh.',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
