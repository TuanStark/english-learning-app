'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function DemoCredentials() {
  const [copied, setCopied] = useState<string | null>(null)

  const credentials = [
    {
      name: "Demo User 1",
      email: "demo@example.com",
      password: "demo123",
      description: "Tài khoản demo chính"
    },
    {
      name: "Demo User 2", 
      email: "test@example.com",
      password: "test123",
      description: "Tài khoản demo phụ"
    }
  ]

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 shadow-2xl border-blue-200 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            Demo Credentials
          </CardTitle>
          <CardDescription>
            Sử dụng để test đăng nhập NextAuth
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {credentials.map((cred, index) => (
            <div key={index} className="space-y-2 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {cred.name}
                </Badge>
                <span className="text-xs text-gray-500">{cred.description}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Email:</span>
                  <div className="flex items-center space-x-1">
                    <code className="text-xs bg-white px-2 py-1 rounded border">
                      {cred.email}
                    </code>
                    <button
                      onClick={() => copyToClipboard(cred.email, `email-${index}`)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copied === `email-${index}` ? (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Password:</span>
                  <div className="flex items-center space-x-1">
                    <code className="text-xs bg-white px-2 py-1 rounded border">
                      {cred.password}
                    </code>
                    <button
                      onClick={() => copyToClipboard(cred.password, `password-${index}`)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      {copied === `password-${index}` ? (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-xs text-gray-500 text-center pt-2 border-t">
            Chỉ dùng để test - không phải tài khoản thật
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
