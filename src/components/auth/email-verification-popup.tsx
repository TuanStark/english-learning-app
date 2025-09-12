'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { 
  Mail, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  RefreshCw,
  X
} from 'lucide-react'

interface EmailVerificationPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  userId: number
  onVerificationSuccess: () => void
}

export default function EmailVerificationPopup({ 
  open, 
  onOpenChange, 
  email, 
  userId,
  onVerificationSuccess 
}: EmailVerificationPopupProps) {
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isResending, setIsResending] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!verificationCode.trim()) {
      setError('Vui lòng nhập mã xác thực')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codeId: verificationCode.trim(),
          id: userId
        }),
      })

      const data = await response.json()

      if (response.ok && data.statusCode === 200) {
        onVerificationSuccess()
        onOpenChange(false)
      } else {
        setError(data.message || 'Mã xác thực không đúng hoặc đã hết hạn')
      }
    } catch (error) {
      console.error('Verification error:', error)
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    setIsResending(true)
    setError('')

    try {
      // Gọi API resend code
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/resend-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: userId,
          email: email 
        }),
      })

      const data = await response.json()

      if (response.ok && data.statusCode === 200) {
        setSuccess(data.message || 'Mã xác thực mới đã được gửi đến email của bạn')
        setVerificationCode('')
      } else {
        setError(data.message || 'Có lỗi xảy ra khi gửi lại mã xác thực')
      }
    } catch (error) {
      console.error('Resend error:', error)
      setError('Có lỗi xảy ra khi gửi lại mã xác thực')
    } finally {
      setIsResending(false)
    }
  }

  const handleClose = () => {
    setVerificationCode('')
    setError('')
    setSuccess('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            Xác thực email
          </DialogTitle>
          <DialogDescription>
            Chúng tôi đã gửi mã xác thực đến <strong>{email}</strong>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="verificationCode" className="text-sm font-medium text-gray-700">
              Mã xác thực
            </label>
            <Input
              id="verificationCode"
              type="text"
              placeholder="Nhập mã xác thực từ email"
              value={verificationCode}
              onChange={(e) => {
                setVerificationCode(e.target.value)
                setError('')
              }}
              className={`${error ? 'border-red-500' : ''}`}
            />
            {error && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error}
              </p>
            )}
            {success && (
              <p className="text-sm text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                {success}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isLoading || !verificationCode.trim()}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang xác thực...
                </>
              ) : (
                'Xác thực'
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Không nhận được email?
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={handleResendCode}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang gửi lại...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Gửi lại mã xác thực
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        <div className="text-xs text-gray-500 text-center">
          <p>Mã xác thực có hiệu lực trong 1 phút</p>
          <p>Kiểm tra cả hộp thư spam nếu không thấy email</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
