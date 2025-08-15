'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Quote, ChevronLeft, ChevronRight, Users, TrendingUp, Award } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Thị Mai",
    role: "Sinh viên ĐH Ngoại Thương",
    score: "TOEIC 890",
    previousScore: "650",
    image: "/avatars/mai.jpg",
    content: "EnglishMaster đã giúp tôi nâng điểm TOEIC từ 650 lên 890 chỉ trong 3 tháng. Hệ thống chấm điểm AI rất chính xác và giải thích chi tiết giúp tôi hiểu rõ lỗi sai.",
    course: "TOEIC Complete",
    timeSpent: "3 tháng",
    rating: 5
  },
  {
    id: 2,
    name: "Trần Minh Đức",
    role: "Kỹ sư IT tại FPT",
    score: "IELTS 7.5",
    previousScore: "6.0",
    image: "/avatars/duc.jpg",
    content: "Tôi làm việc bận rộn nhưng vẫn có thể học mọi lúc mọi nơi. Lộ trình học cá nhân hóa rất phù hợp, giúp tôi tối ưu thời gian và đạt band 7.5 IELTS.",
    course: "IELTS Academic",
    timeSpent: "4 tháng",
    rating: 5
  },
  {
    id: 3,
    name: "Lê Hồng Anh",
    role: "Học sinh lớp 12",
    score: "TOEIC 750",
    previousScore: "400",
    image: "/avatars/anh.jpg",
    content: "Từ một người gần như 'mù' tiếng Anh, EnglishMaster đã giúp em xây dựng nền tảng vững chắc. Các bài giảng ngữ pháp rất dễ hiểu, phù hợp với học sinh.",
    course: "English Foundation",
    timeSpent: "6 tháng",
    rating: 5
  },
  {
    id: 4,
    name: "Phạm Văn Nam",
    role: "Chuyên viên Marketing",
    score: "IELTS 8.0",
    previousScore: "6.5",
    image: "/avatars/nam.jpg",
    content: "Cách tiếp cận của EnglishMaster rất khoa học. Từ việc phân tích điểm yếu đến đưa ra lộ trình học phù hợp, tất cả đều được cá nhân hóa cho từng học viên.",
    course: "IELTS Advanced",
    timeSpent: "5 tháng",
    rating: 5
  },
  {
    id: 5,
    name: "Võ Thị Thu Hà",
    role: "Giảng viên ĐH Bách Khoa",
    score: "TOEIC 950",
    previousScore: "780",
    image: "/avatars/ha.jpg",
    content: "Tôi đã thử nhiều phương pháp khác nhưng không ai bằng EnglishMaster. Đặc biệt là phần luyện nghe với âm thanh chuẩn native speaker và câu hỏi sát đề thi thật.",
    course: "TOEIC Expert",
    timeSpent: "2 tháng",
    rating: 5
  },
  {
    id: 6,
    name: "Hoàng Minh Tuấn",
    role: "Du học sinh tại Canada",
    score: "IELTS 8.5",
    previousScore: "7.0",
    image: "/avatars/tuan.jpg",
    content: "Chuẩn bị du học cần điểm IELTS cao, EnglishMaster đã giúp tôi đạt được 8.5. Đặc biệt phần Writing Task 2 với nhiều templates và feedback chi tiết.",
    course: "IELTS Writing Mastery",
    timeSpent: "3 tháng",
    rating: 5
  }
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      setIsAnimating(false)
    }, 150)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
      setIsAnimating(false)
    }, 150)
  }

  const currentTestimonial = testimonials[currentIndex]
  const scoreImprovement = parseInt(currentTestimonial.score.match(/\d+/)?.[0] || '0') - 
                          parseInt(currentTestimonial.previousScore.match(/\d+/)?.[0] || '0')

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            <Users className="w-4 h-4 mr-1" />
            Câu chuyện thành công
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Học viên nói gì về 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> EnglishMaster</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hơn 10,000 học viên đã tin tưởng và đạt được mục tiêu điểm số với EnglishMaster
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
            <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 text-blue-200">
                  <Quote className="w-16 h-16" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  {/* User Info */}
                  <div className="text-center lg:text-left">
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto lg:mx-0">
                        {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-green-500 text-white rounded-full p-1">
                        <Award className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-1">{currentTestimonial.name}</h3>
                    <p className="text-gray-600 mb-3">{currentTestimonial.role}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 mb-2">
                      {currentTestimonial.course}
                    </Badge>
                    <div className="flex items-center justify-center lg:justify-start space-x-1 mb-2">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="lg:col-span-2">
                    <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                      &ldquo;{currentTestimonial.content}&rdquo;
                    </blockquote>
                    
                    {/* Score Improvement */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Điểm cũ</div>
                        <div className="text-2xl font-bold text-gray-400">{currentTestimonial.previousScore}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Cải thiện</div>
                        <div className="text-2xl font-bold text-green-600 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 mr-1" />
                          +{scoreImprovement}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Điểm mới</div>
                        <div className="text-2xl font-bold text-blue-600">{currentTestimonial.score}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={prevTestimonial}
              disabled={isAnimating}
              className="rounded-full w-12 h-12 p-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={nextTestimonial}
              disabled={isAnimating}
              className="rounded-full w-12 h-12 p-0"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Tỷ lệ đạt mục tiêu</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">+240</div>
            <div className="text-gray-600">Điểm cải thiện trung bình</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">3.5</div>
            <div className="text-gray-600">Tháng học trung bình</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">4.9★</div>
            <div className="text-gray-600">Đánh giá từ học viên</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            Bạn cũng muốn có câu chuyện thành công như vậy?
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4">
            Bắt đầu hành trình của bạn
          </Button>
        </div>
      </div>
    </section>
  )
}
