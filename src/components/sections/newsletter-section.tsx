'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Gift, 
  BookOpen, 
  TrendingUp, 
  Users,
  Bell,
  Calendar,
  Download
} from 'lucide-react'

const benefits = [
  {
    icon: BookOpen,
    title: 'Tips học tập hàng tuần',
    description: 'Nhận tips và chiến lược học hiệu quả từ các chuyên gia'
  },
  {
    icon: TrendingUp,
    title: 'Thống kê tiến độ',
    description: 'Báo cáo chi tiết về quá trình học và cải thiện điểm số'
  },
  {
    icon: Gift,
    title: 'Ưu đãi độc quyền',
    description: 'Nhận mã giảm giá và ưu đãi đặc biệt dành riêng cho subscriber'
  },
  {
    icon: Users,
    title: 'Cộng đồng học tập',
    description: 'Kết nối với cộng đồng học viên và chia sẻ kinh nghiệm'
  }
]

const features = [
  'Tips học tập hàng tuần từ chuyên gia',
  'Đề thi mới và câu hỏi hot nhất',
  'Webinar miễn phí với native speaker',
  'Cập nhật tính năng mới và công nghệ',
  'Success stories từ học viên',
  'Ưu đãi và giảm giá độc quyền'
]

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-green-200">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Chào mừng bạn đến với cộng đồng EnglishMaster! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Cảm ơn bạn đã đăng ký newsletter. Bạn sẽ nhận được email đầu tiên trong vòng 24h tới.
            </p>
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-green-900 mb-2">Điều gì sẽ đến tiếp theo?</h3>
              <ul className="text-sm text-green-800 space-y-1 text-left max-w-md mx-auto">
                <li>✨ Email chào mừng với ebook miễn phí</li>
                <li>📚 Tips học TOEIC/IELTS hiệu quả</li>
                <li>🎯 Lộ trình học cá nhân hóa</li>
                <li>🎁 Mã giảm giá 20% cho khóa Premium</li>
              </ul>
            </div>
            <Button onClick={() => setIsSubscribed(false)} variant="outline">
              Đăng ký email khác
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <Badge className="mb-6 bg-blue-500/20 text-blue-200 border-blue-400/30">
              <Mail className="w-4 h-4 mr-1" />
              Newsletter miễn phí
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Nâng cao trình độ 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> tiếng Anh</span> mỗi tuần
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Tham gia cộng đồng 25,000+ học viên nhận tips học tập, đề thi mới và ưu đãi độc quyền qua email hàng tuần.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <benefit.icon className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-sm text-blue-200">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-blue-200">
                <div className="font-semibold">25,000+ subscribers</div>
                <div className="text-sm">Đánh giá 4.9⭐ từ độc giả</div>
              </div>
            </div>
          </div>

          {/* Right Content - Newsletter Form */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 lg:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Đăng ký nhận newsletter
              </h3>
              <p className="text-gray-600">
                Miễn phí 100% • Hủy bất cứ lúc nào • Không spam
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full h-12 text-lg"
                  required
                />
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Đăng ký miễn phí
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4 text-center">
                Bạn sẽ nhận được:
              </h4>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Bell className="w-4 h-4" />
                  <span>Mỗi thứ 3</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Không spam</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>Ebook miễn phí</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">25,000+</div>
            <div className="text-blue-200">Newsletter subscribers</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-blue-200">Open rate</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">4.9⭐</div>
            <div className="text-blue-200">Subscriber rating</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="text-blue-200">Emails gửi ra</div>
          </div>
        </div>
      </div>
    </section>
  )
}
