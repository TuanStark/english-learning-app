"use client"

import { useState, useEffect, Suspense } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Mail, Lock, User, Chrome, Facebook, AlertCircle, CheckCircle } from "lucide-react"
import { authApi, ApiError } from "@/lib/api"
import EmailVerificationPopup from "@/components/auth/email-verification-popup"

function AuthContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [showVerificationPopup, setShowVerificationPopup] = useState(false)
  const [registeredUser, setRegisteredUser] = useState<{ email: string; id: number; password: string } | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/"

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  useEffect(() => {
    // Check if user is already logged in
    getSession().then((session) => {
      if (session) {
        router.push(callbackUrl)
      }
    })
  }, [callbackUrl, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Email hoặc mật khẩu không đúng")
      } else {
        setSuccess("Đăng nhập thành công!")
        router.push(callbackUrl)
      }
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (registerData.password !== registerData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự")
      setIsLoading(false)
      return
    }

    try {
      console.log("registerData", registerData)
      
      // Prepare data for API - remove confirmPassword and ensure proper field names
      const apiData = {
        fullName: registerData.fullName,
        email: registerData.email,
        password: registerData.password
      }
      
      const result = await authApi.register(apiData)
      console.log("Registration result:", result)
      
      // Show verification popup
      setRegisteredUser({
        email: registerData.email,
        id: result.data.id,
        password: registerData.password
      })
      setShowVerificationPopup(true)
      
      // Reset form
      setRegisterData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
      })
    } catch (error) {
      console.error('Registration error:', error)
      
      if (error instanceof ApiError) {
        if (error.status === 400) {
          if (error.errors) {
            const errorMessages = Object.values(error.errors).flat()
            setError(`Lỗi validation: ${errorMessages.join(', ')}`)
          } else {
            setError(`Lỗi đăng ký: ${error.message}`)
          }
        } else if (error.status === 409) {
          setError("Email đã tồn tại. Vui lòng sử dụng email khác.")
        } else {
          setError(`Lỗi đăng ký: ${error.message}`)
        }
      } else {
        setError("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl })
    } catch (error) {
      setError("Có lỗi xảy ra khi đăng nhập")
      setIsLoading(false)
    }
  }

  const handleVerificationSuccess = async () => {
    // Show success message
    setSuccess('Xác thực email thành công! Đang chuyển đến trang đăng nhập...')
    setShowVerificationPopup(false)
    
    // Auto-fill login form
    if (registeredUser) {
      setLoginData({
        email: registeredUser.email,
        password: registeredUser.password
      })
    }
    
    // Switch to login tab
    const loginTab = document.querySelector('[value="login"]') as HTMLElement
    if (loginTab) {
      loginTab.click()
    }
    
    // Clear registered user data
    setRegisteredUser(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EnglishPro</h1>
          <p className="text-gray-600">Nền tảng học tiếng Anh hàng đầu</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Chào mừng bạn!</CardTitle>
            <CardDescription>
              Đăng nhập hoặc tạo tài khoản để bắt đầu học tập
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                <TabsTrigger value="register">Đăng ký</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-fullName">Họ và tên</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-fullName"
                        type="text"
                        placeholder="Nhập họ và tên"
                        className="pl-10"
                        value={registerData.fullName}
                        onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="pl-10"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Xác nhận mật khẩu</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Đang đăng ký..." : "Đăng ký"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Social login */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Hoặc đăng nhập với</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                >
                  <Chrome className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={isLoading}
                >
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>
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

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  )
}
