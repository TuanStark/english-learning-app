'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Check, 
  Star, 
  Users, 
  Shield,
  Clock,
  Award,
  Sparkles,
  Gift
} from 'lucide-react'

const plans = [
  {
    id: 'free',
    name: 'Miễn phí',
    subtitle: 'Bắt đầu hành trình',
    price: '0đ',
    period: 'mãi mãi',
    originalPrice: null,
    badge: null,
    color: 'from-gray-500 to-gray-600',
    description: 'Hoàn hảo để khám phá và bắt đầu học',
    features: [
      { text: '5 đề thi mỗi tháng', included: true },
      { text: '100 câu từ vựng', included: true },
      { text: 'Báo cáo cơ bản', included: true },
      { text: 'Community support', included: true },
      { text: 'Mobile app', included: true },
      { text: 'Chấm điểm tự động', included: false },
      { text: 'Lộ trình cá nhân', included: false },
      { text: 'Video giảng dạy', included: false },
      { text: 'Hỗ trợ 1-1', included: false }
    ],
    cta: 'Bắt đầu miễn phí',
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium',
    subtitle: 'Lựa chọn phổ biến',
    price: '299K',
    period: '/ tháng',
    originalPrice: '499K',
    badge: 'Phổ biến nhất',
    color: 'from-blue-500 to-purple-600',
    description: 'Tối ưu cho việc luyện thi hiệu quả',
    features: [
      { text: 'Unlimited đề thi', included: true },
      { text: '5,000+ câu từ vựng', included: true },
      { text: 'Báo cáo chi tiết', included: true },
      { text: 'Community + Email support', included: true },
      { text: 'Mobile + Web app', included: true },
      { text: 'Chấm điểm AI thông minh', included: true },
      { text: 'Lộ trình cá nhân hóa', included: true },
      { text: '100+ video giảng dạy', included: true },
      { text: 'Live webinar hàng tuần', included: false }
    ],
    cta: 'Nâng cấp Premium',
    popular: true
  },
  {
    id: 'expert',
    name: 'Expert',
    subtitle: 'Học chuyên sâu',
    price: '599K',
    period: '/ tháng',
    originalPrice: '899K',
    badge: 'Giá trị tốt nhất',
    color: 'from-purple-600 to-pink-600',
    description: 'Dành cho mục tiêu điểm số cao',
    features: [
      { text: 'Tất cả tính năng Premium', included: true },
      { text: '10,000+ câu từ vựng chuyên sâu', included: true },
      { text: 'Analytics nâng cao với AI', included: true },
      { text: 'Priority support 24/7', included: true },
      { text: 'All platforms + Desktop', included: true },
      { text: 'Chấm điểm + Feedback chi tiết', included: true },
      { text: 'Lộ trình + Mock tests thật', included: true },
      { text: '300+ video + Live sessions', included: true },
      { text: 'Mentoring 1-1 với expert', included: true }
    ],
    cta: 'Trở thành Expert',
    popular: false
  }
]

const faqs = [
  {
    question: 'Tôi có thể hủy subscription bất cứ lúc nào không?',
    answer: 'Có, bạn có thể hủy subscription bất cứ lúc nào mà không mất phí. Bạn vẫn có thể sử dụng premium features đến hết kỳ thanh toán.'
  },
  {
    question: 'Có bảo đảm hoàn tiền không?',
    answer: 'Chúng tôi có chính sách hoàn tiền 100% trong vòng 7 ngày đầu nếu bạn không hài lòng với dịch vụ.'
  },
  {
    question: 'Tôi có thể thay đổi gói sau khi đăng ký không?',
    answer: 'Có, bạn có thể nâng cấp hoặc hạ cấp gói bất cứ lúc nào. Phí sẽ được tính tỷ lệ theo thời gian sử dụng.'
  }
]

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const getDiscountedPrice = (price: string) => {
    if (!isAnnual) return price
    const numPrice = parseInt(price.replace(/\D/g, ''))
    const discounted = Math.round(numPrice * 0.8) // 20% discount for annual
    return `${discounted}K`
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800 border-green-200">
            <Gift className="w-4 h-4 mr-1" />
            Giá cả minh bạch
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Chọn gói phù hợp 
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> với bạn</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Bắt đầu miễn phí, nâng cấp khi cần. Tất cả gói đều được thiết kế để giúp bạn đạt mục tiêu
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Thanh toán hàng tháng
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Thanh toán hàng năm
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-800 text-xs">
                Tiết kiệm 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm">
                    <Star className="w-3 h-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <Card className={`relative h-full ${plan.popular ? 'border-2 border-blue-500 shadow-xl scale-105' : 'border border-gray-200 shadow-lg'} transition-all duration-300 hover:shadow-xl`}>
                <CardHeader className={`bg-gradient-to-r ${plan.color} text-white p-8 rounded-t-lg`}>
                  <div className="text-center">
                    <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                    <p className="text-white/90 mb-4">{plan.subtitle}</p>
                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2">
                        {plan.originalPrice && (
                          <span className="text-white/60 line-through text-sm">
                            {isAnnual ? getDiscountedPrice(plan.originalPrice) : plan.originalPrice}
                          </span>
                        )}
                        <span className="text-4xl font-bold">
                          {isAnnual && plan.price !== '0đ' ? getDiscountedPrice(plan.price) : plan.price}
                        </span>
                        <span className="text-white/90">
                          {plan.price !== '0đ' && isAnnual ? '/ năm' : plan.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-white/90 text-sm">{plan.description}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="p-8">
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-400'}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 text-center">
          <div className="flex flex-col items-center">
            <Shield className="w-12 h-12 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Bảo mật tuyệt đối</h3>
            <p className="text-sm text-gray-600">SSL encryption & PCI compliant</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-12 h-12 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Hủy bất cứ lúc nào</h3>
            <p className="text-sm text-gray-600">Không cam kết dài hạn</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-12 h-12 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">Hoàn tiền 100%</h3>
            <p className="text-sm text-gray-600">Trong vòng 7 ngày đầu</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-12 h-12 text-orange-600 mb-3" />
            <h3 className="font-semibold text-gray-900 mb-1">10K+ học viên</h3>
            <p className="text-sm text-gray-600">Tin tưởng EnglishMaster</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Câu hỏi thường gặp
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <span className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}>
                      <Check className="w-5 h-5 text-gray-400" />
                    </span>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Bắt đầu hành trình học tập ngay hôm nay
          </h3>
          <p className="text-gray-600 mb-6">
            Tham gia cùng hàng nghìn học viên đã đạt được mục tiêu điểm số của mình
          </p>
          <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg px-8 py-4">
            <Sparkles className="w-5 h-5 mr-2" />
            Dùng thử miễn phí
          </Button>
        </div>
      </div>
    </section>
  )
}
