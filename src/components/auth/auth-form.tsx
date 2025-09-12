'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import EmailVerificationPopup from './email-verification-popup'
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  BookOpen,
  Shield,
  Zap
} from 'lucide-react'

interface AuthFormProps {
  type: 'login' | 'register'
}

interface FormData {
  name?: string
  email: string
  password: string
  confirmPassword?: string
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

export default function AuthForm({ type }: AuthFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showVerificationPopup, setShowVerificationPopup] = useState(false)
  const [registeredUser, setRegisteredUser] = useState<{ email: string; id: number } | null>(null)

  // Test function để hiển thị popup
  const testPopup = () => {
    setRegisteredUser({
      email: "tuansmart472004@gmail.com",
      id: 16
    })
    setShowVerificationPopup(true)
  }

  const isLogin = type === 'login'
  const title = isLogin ? 'Đăng nhập' : 'Đăng ký'
  const subtitle = isLogin ? 'Chào mừng bạn trở lại!' : 'Tạo tài khoản mới'
  const submitText = isLogin ? 'Đăng nhập' : 'Tạo tài khoản'
  const switchText = isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'
  const switchLinkText = isLogin ? 'Đăng ký ngay' : 'Đăng nhập'
  const switchLink = isLogin ? '/register' : '/login'

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!isLogin && (!formData.name || formData.name.length < 2)) {
      newErrors.name = 'Tên phải có ít nhất 2 ký tự'
    }

    if (!formData.email) {
      newErrors.email = 'Email là bắt buộc'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc'
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted!', { type, formData })
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      if (isLogin) {
        // Login with NextAuth
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (result?.error) {
          setErrors({ 
            general: 'Email hoặc mật khẩu không đúng'
          })
        } else {
          // Redirect to dashboard on success
          window.location.href = '/dashboard'
        }
      } else {
        // Register with backend API
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            fullName: formData.name
          }),
        })

        const data = await response.json()
        console.log('Register response:', data)

        if (response.ok && data.statusCode === 201) {
          // Show verification popup
          console.log('Setting registered user:', { email: formData.email, id: data.data.id })
          setRegisteredUser({
            email: formData.email,
            id: data.data.id
          })
          setShowVerificationPopup(true)
          console.log('Popup should be visible now')
        } else {
          setErrors({ 
            general: data.message || 'Có lỗi xảy ra. Vui lòng thử lại.'
          })
        }
      }
      
    } catch (error) {
      console.error('Auth error:', error)
      setErrors({ 
        general: isLogin 
          ? 'Email hoặc mật khẩu không đúng' 
          : 'Có lỗi xảy ra. Vui lòng thử lại.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleVerificationSuccess = async () => {
    // Auto login after successful verification
    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    })

    if (result?.error) {
      setErrors({ 
        general: 'Xác thực thành công!. Vui lòng đăng nhập thủ công.'
      })
    } else {
      // Redirect to dashboard on success
      window.location.href = '/dashboard'
    }
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' }
    if (password.length < 6) return { strength: 25, text: 'Yếu', color: 'bg-red-500' }
    if (password.length < 8) return { strength: 50, text: 'Trung bình', color: 'bg-yellow-500' }
    if (password.length < 12) return { strength: 75, text: 'Mạnh', color: 'bg-blue-500' }
    return { strength: 100, text: 'Rất mạnh', color: 'bg-green-500' }
  }

  const passwordStrength = getPasswordStrength(formData.password || '')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">EnglishMaster</span>
          </Link>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900">{title}</CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              {subtitle}
            </CardDescription>
            
            {/* Benefits badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Shield className="w-3 h-3 mr-1" />
                Bảo mật cao
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Zap className="w-3 h-3 mr-1" />
                Truy cập ngay
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-12" type="button">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Tiếp tục với Google
              </Button>
              
              <Button variant="outline" className="w-full h-12" type="button">
                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Tiếp tục với Facebook
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Hoặc</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field for register */}
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nhập họ và tên"
                      value={formData.name || ''}
                      onChange={handleChange('name')}
                      className={`pl-10 h-12 ${errors.name ? 'border-red-500' : ''}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>
              )}

              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className={`pl-10 h-12 ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleChange('password')}
                    className={`pl-10 pr-10 h-12 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Password strength indicator for register */}
                {!isLogin && formData.password && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Độ mạnh mật khẩu</span>
                      <span className={`font-medium ${
                        passwordStrength.strength >= 75 ? 'text-green-600' : 
                        passwordStrength.strength >= 50 ? 'text-blue-600' : 
                        passwordStrength.strength >= 25 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password field for register */}
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu"
                      value={formData.confirmPassword || ''}
                      onChange={handleChange('confirmPassword')}
                      className={`pl-10 pr-10 h-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Forgot password link for login */}
              {isLogin && (
                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                    Quên mật khẩu?
                  </Link>
                </div>
              )}

              {/* Terms and conditions for register */}
              {!isLogin && (
                <div className="text-xs text-gray-600">
                  Bằng cách đăng ký, bạn đồng ý với{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                    Điều khoản sử dụng
                  </Link>{' '}
                  và{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                    Chính sách bảo mật
                  </Link>{' '}
                  của chúng tôi.
                </div>
              )}

              {/* General error */}
              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.general}
                  </p>
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {submitText}
                  </>
                )}
              </Button>

              {/* Test popup button - chỉ hiện khi register */}
              {!isLogin && (
                <Button
                  type="button"
                  onClick={testPopup}
                  variant="outline"
                  className="w-full h-10 text-sm"
                >
                  🧪 Test Popup (ID: 16)
                </Button>
              )}
            </form>

            {/* Switch between login/register */}
            <div className="text-center text-sm text-gray-600">
              {switchText}{' '}
              <Link href={switchLink} className="text-blue-600 hover:text-blue-800 font-medium">
                {switchLinkText}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Verification Popup */}
      {registeredUser && (
        <EmailVerificationPopup
          open={showVerificationPopup}
          onOpenChange={setShowVerificationPopup}
          email={registeredUser.email}
          userId={registeredUser.id}
          onVerificationSuccess={handleVerificationSuccess}
        />
      )}
    </div>
  )
}
