import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  PlayCircle, 
  BookOpen, 
  Star, 
  Zap, 
  Shield, 
  Award,
  TrendingUp,
  CheckCircle,
  Sparkles
} from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <Shield className="w-3 h-3 mr-1" />
                Uy tín #1
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                <Star className="w-3 h-3 mr-1" />
                4.9/5 sao
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
                <Award className="w-3 h-3 mr-1" />
                Chứng nhận quốc tế
              </Badge>
            </div>

            {/* Main heading with gradient text */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-gray-900">Chinh phục</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  TOEIC & IELTS
                </span>
                <span className="block text-gray-900">thành công</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Nền tảng AI-powered đầu tiên tại Việt Nam với 
                <span className="font-semibold text-blue-600"> 10,000+ câu hỏi thực tế</span>, 
                chấm điểm thông minh và lộ trình học cá nhân hóa.
              </p>
            </div>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                <Link href="/auth">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Bắt đầu miễn phí
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 hover:bg-gray-50" asChild>
                <Link href="/demo">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Xem demo
                </Link>
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600">+10,000 học viên đã tham gia</span>
              </div>
              <div className="flex items-center space-x-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-2">4.9/5 (2,341 đánh giá)</span>
              </div>
            </div>

            {/* Enhanced stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">10K+</div>
                    <div className="text-sm text-gray-600">Câu hỏi thực tế</div>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">95%</div>
                    <div className="text-sm text-gray-600">Tỷ lệ đỗ cao</div>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Hỗ trợ AI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Enhanced illustration */}
          <div className="relative">
            {/* Main dashboard mockup */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-200/50 backdrop-blur-sm">
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">TOEIC Listening</h3>
                    <p className="text-sm text-gray-500">Part 1 - Photographs</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
              
              {/* Progress indicator */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Tiến độ: 15/20 câu</span>
                  <span>08:45 còn lại</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              {/* Question preview */}
              <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Question 15</h4>
                  <Button size="sm" variant="outline" className="text-xs">
                    <PlayCircle className="w-3 h-3 mr-1" />
                    Play Audio
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {['A) The woman is reading a newspaper', 'B) The woman is typing on a computer', 'C) The woman is talking on the phone', 'D) The woman is writing notes'].map((option, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg transition-all cursor-pointer ${
                      index === 1 ? 'bg-blue-100 border-2 border-blue-300' : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium ${
                        index === 1 ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-sm text-gray-700">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-between">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                  Next Question
                </Button>
              </div>
            </div>

            {/* Floating elements with enhanced design */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg animate-pulse">
              <CheckCircle className="w-4 h-4 inline mr-1" />
              AI Powered
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
              <Zap className="w-4 h-4 inline mr-1" />
              Real-time Scoring
            </div>
            <div className="absolute top-1/2 -left-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
              <Star className="w-4 h-4 inline mr-1" />
              Smart Analytics
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
