import AuthForm from '@/components/auth/auth-form'
import DemoCredentials from '../demo-credentials'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng nhập - EnglishMaster',
  description: 'Đăng nhập vào tài khoản EnglishMaster để tiếp tục hành trình học tiếng Anh của bạn.',
}

export default function LoginPage() {
  return (
    <>
      <AuthForm type="login" />
    </>
  )
}
