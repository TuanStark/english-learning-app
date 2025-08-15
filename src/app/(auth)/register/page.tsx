import AuthForm from '@/components/auth/auth-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng ký - EnglishMaster',
  description: 'Tạo tài khoản EnglishMaster miễn phí để bắt đầu hành trình chinh phục TOEIC & IELTS.',
}

export default function RegisterPage() {
  return <AuthForm type="register" />
}
