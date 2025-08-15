'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Bot, 
  Brain, 
  BarChart3, 
  Headphones, 
  Smartphone,
  Zap,
  Target,
  CheckCircle,
  TrendingUp,
  Play,
  Pause
} from 'lucide-react'

const features = [
  {
    id: 'ai-powered',
    title: 'AI-Powered Learning',
    subtitle: 'Trí tuệ nhân tạo tiên tiến',
    description: 'Hệ thống AI phân tích điểm mạnh, điểm yếu và tạo lộ trình học cá nhân hóa phù hợp với từng học viên.',
    icon: Bot,
    color: 'from-blue-500 to-cyan-500',
    benefits: [
      'Phân tích học tập thông minh',
      'Gợi ý câu hỏi phù hợp',
      'Tối ưu thời gian học',
      'Dự đoán điểm số chính xác'
    ],
    stats: { label: 'Độ chính xác', value: '98%' }
  },
  {
    id: 'smart-analytics',
    title: 'Smart Analytics',
    subtitle: 'Phân tích chi tiết tiến độ',
    description: 'Theo dõi tiến độ học tập chi tiết với biểu đồ trực quan, báo cáo định kỳ và thống kê hiệu suất.',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    benefits: [
      'Dashboard trực quan',
      'Báo cáo tiến độ hàng tuần',
      'Phân tích điểm yếu cụ thể',
      'So sánh với học viên khác'
    ],
    stats: { label: 'Cải thiện hiệu quả', value: '3.2x' }
  },
  {
    id: 'adaptive-practice',
    title: 'Adaptive Practice',
    subtitle: 'Luyện tập thích ứng',
    description: 'Hệ thống tự động điều chỉnh độ khó và loại câu hỏi dựa trên khả năng và mục tiêu của học viên.',
    icon: Target,
    color: 'from-green-500 to-emerald-500',
    benefits: [
      'Độ khó tự động điều chỉnh',
      'Focus vào điểm yếu',
      'Không bỏ lỡ kiến thức nào',
      'Học hiệu quả hơn 40%'
    ],
    stats: { label: 'Tiết kiệm thời gian', value: '40%' }
  },
  {
    id: 'real-audio',
    title: 'Real Native Audio',
    subtitle: 'Âm thanh chuẩn native',
    description: 'Thu âm từ native speaker với nhiều giọng địa phương khác nhau, giúp học viên làm quen với đa dạng accent.',
    icon: Headphones,
    color: 'from-orange-500 to-red-500',
    benefits: [
      'Âm thanh chuẩn native speaker',
      'Đa dạng giọng địa phương',
      'Chất lượng studio cao',
      'Tốc độ điều chỉnh được'
    ],
    stats: { label: 'Giọng điệu khác nhau', value: '12+' }
  },
  {
    id: 'instant-feedback',
    title: 'Instant Feedback',
    subtitle: 'Phản hồi tức thì',
    description: 'Nhận phản hồi chi tiết ngay sau mỗi câu trả lời với giải thích cụ thể và gợi ý cải thiện.',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    benefits: [
      'Chấm điểm tức thì',
      'Giải thích chi tiết từng câu',
      'Gợi ý cải thiện cụ thể',
      'Theo dõi lỗi thường mắc'
    ],
    stats: { label: 'Thời gian phản hồi', value: '<1s' }
  },
  {
    id: 'mobile-first',
    title: 'Mobile-First Design',
    subtitle: 'Học mọi lúc mọi nơi',
    description: 'Thiết kế tối ưu cho mobile, đồng bộ dữ liệu real-time giữa các thiết bị để học liên tục.',
    icon: Smartphone,
    color: 'from-indigo-500 to-purple-500',
    benefits: [
      'Responsive hoàn hảo',
      'Đồng bộ cross-platform',
      'Offline mode',
      'Tối ưu battery'
    ],
    stats: { label: 'Tương thích thiết bị', value: '100%' }
  }
]

export default function FeaturesDetailed() {
  const [activeFeature, setActiveFeature] = useState(features[0])
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-800 border-purple-200">
            <Brain className="w-4 h-4 mr-1" />
            Công nghệ tiên tiến
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Tính năng 
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> đột phá</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sức mạnh của AI và công nghệ hiện đại được tích hợp để mang đến trải nghiệm học tập tốt nhất
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Feature Navigation */}
          <div className="space-y-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  activeFeature.id === feature.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">{feature.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{feature.stats.value}</div>
                    <div className="text-xs text-gray-500">{feature.stats.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Detail */}
          <div className="sticky top-8">
            <Card className="overflow-hidden border-0 shadow-2xl">
              <CardHeader className={`bg-gradient-to-r ${activeFeature.color} text-white p-8`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    <activeFeature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">{activeFeature.title}</CardTitle>
                    <p className="text-white/90">{activeFeature.subtitle}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {activeFeature.description}
                </p>

                {/* Interactive Demo */}
                {activeFeature.id === 'real-audio' && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">Audio Demo</h4>
                      <Button
                        size="sm"
                        onClick={togglePlay}
                        className="rounded-full w-10 h-10 p-0"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div className={`bg-orange-500 h-2 rounded-full transition-all duration-1000 ${
                        isPlaying ? 'w-full' : 'w-0'
                      }`}></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      &ldquo;The woman is discussing the quarterly financial results...&rdquo;
                    </p>
                  </div>
                )}

                {/* Benefits List */}
                <div className="space-y-3 mb-6">
                  {activeFeature.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">{activeFeature.stats.value}</div>
                      <div className="text-sm text-gray-600">{activeFeature.stats.label}</div>
                    </div>
                    <TrendingUp className="w-12 h-12 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Trải nghiệm tất cả tính năng miễn phí
            </h3>
            <p className="text-gray-600">
              Không cần thẻ tín dụng. Bắt đầu ngay hôm nay và khám phá sức mạnh của công nghệ AI trong việc học tiếng Anh.
            </p>
          </div>
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
            <Zap className="w-5 h-5 mr-2" />
            Dùng thử miễn phí ngay
          </Button>
        </div>
      </div>
    </section>
  )
}
