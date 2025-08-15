"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Target, 
  Clock, 
  Users, 
  Star, 
  CheckCircle,
  Play,
  BookOpen,
  TrendingUp,
  Award,
  ArrowRight,
  MapPin,
  Calendar
} from "lucide-react"
import Link from "next/link"

const learningPaths = [
  {
    id: 1,
    title: 'Lộ trình luyện thi IELTS',
    description: 'Lộ trình hoàn chỉnh để đạt điểm IELTS mong muốn từ 6.0 đến 8.0+',
    level: 'Intermediate',
    duration: '6 tháng',
    courses: 8,
    students: 5678,
    rating: 4.8,
    completionRate: 85.5,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop',
    isRecommended: true,
    steps: [
      { title: 'Đánh giá trình độ', duration: '1 tuần', completed: true },
      { title: 'Listening Foundation', duration: '3 tuần', completed: true },
      { title: 'Reading Strategies', duration: '4 tuần', completed: false },
      { title: 'Writing Task 1 & 2', duration: '6 tuần', completed: false },
      { title: 'Speaking Practice', duration: '4 tuần', completed: false },
      { title: 'Mock Tests', duration: '2 tuần', completed: false }
    ]
  },
  {
    id: 2,
    title: 'Tiếng Anh giao tiếp cơ bản',
    description: 'Từ zero đến hero trong giao tiếp tiếng Anh hàng ngày',
    level: 'Beginner',
    duration: '4 tháng',
    courses: 6,
    students: 8901,
    rating: 4.6,
    completionRate: 92.3,
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=300&fit=crop',
    isRecommended: true,
    steps: [
      { title: 'Alphabet & Pronunciation', duration: '1 tuần', completed: true },
      { title: 'Basic Vocabulary', duration: '2 tuần', completed: true },
      { title: 'Simple Grammar', duration: '3 tuần', completed: true },
      { title: 'Daily Conversations', duration: '4 tuần', completed: false },
      { title: 'Practical Situations', duration: '4 tuần', completed: false },
      { title: 'Confidence Building', duration: '2 tuần', completed: false }
    ]
  },
  {
    id: 3,
    title: 'Tiếng Anh thương mại',
    description: 'Nâng cao kỹ năng tiếng Anh cho môi trường công sở',
    level: 'Intermediate',
    duration: '5 tháng',
    courses: 7,
    students: 3456,
    rating: 4.7,
    completionRate: 78.9,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop',
    isRecommended: false,
    steps: [
      { title: 'Business Vocabulary', duration: '2 tuần', completed: false },
      { title: 'Email Writing', duration: '3 tuần', completed: false },
      { title: 'Presentation Skills', duration: '4 tuần', completed: false },
      { title: 'Meeting English', duration: '3 tuần', completed: false },
      { title: 'Negotiation Skills', duration: '4 tuần', completed: false },
      { title: 'Professional Communication', duration: '4 tuần', completed: false }
    ]
  },
  {
    id: 4,
    title: 'TOEFL iBT Preparation',
    description: 'Chuẩn bị toàn diện cho kỳ thi TOEFL iBT',
    level: 'Advanced',
    duration: '4 tháng',
    courses: 6,
    students: 2345,
    rating: 4.9,
    completionRate: 88.7,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop',
    isRecommended: false,
    steps: [
      { title: 'TOEFL Overview', duration: '1 tuần', completed: false },
      { title: 'Reading Section', duration: '4 tuần', completed: false },
      { title: 'Listening Section', duration: '4 tuần', completed: false },
      { title: 'Speaking Section', duration: '4 tuần', completed: false },
      { title: 'Writing Section', duration: '4 tuần', completed: false },
      { title: 'Practice Tests', duration: '3 tuần', completed: false }
    ]
  }
]

const milestones = [
  {
    level: 'Beginner',
    description: 'Nắm vững cơ bản',
    skills: ['1000 từ vựng', 'Ngữ pháp cơ bản', 'Giao tiếp đơn giản'],
    color: 'from-green-400 to-green-600'
  },
  {
    level: 'Intermediate',
    description: 'Giao tiếp tự tin',
    skills: ['3000 từ vựng', 'Ngữ pháp nâng cao', 'Thảo luận chủ đề'],
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    level: 'Advanced',
    description: 'Thành thạo',
    skills: ['5000+ từ vựng', 'Ngữ pháp phức tạp', 'Thuyết trình chuyên nghiệp'],
    color: 'from-red-400 to-red-600'
  },
  {
    level: 'Expert',
    description: 'Như người bản xứ',
    skills: ['8000+ từ vựng', 'Sử dụng tự nhiên', 'Viết học thuật'],
    color: 'from-purple-400 to-purple-600'
  }
]

export default function RoadmapPage() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Lộ trình cá nhân hóa
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 bg-clip-text text-transparent">
              Lộ trình học tập
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Chọn lộ trình phù hợp với mục tiêu và trình độ của bạn để học tiếng Anh hiệu quả nhất.
            Được thiết kế bởi các chuyên gia với phương pháp khoa học.
          </p>
        </div>

        {/* Learning milestones */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Các mốc học tập</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{milestone.level}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{milestone.description}</p>
                  <ul className="text-xs space-y-1">
                    {milestone.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning paths */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Lộ trình học tập</h2>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Chọn lộ trình phù hợp</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {learningPaths.map((path) => (
              <Card key={path.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={path.thumbnail}
                    alt={path.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(path.level)}`}>
                      {path.level}
                    </div>
                    {path.isRecommended && <Badge variant="destructive">Đề xuất</Badge>}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{path.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {path.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {path.courses} khóa học
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {path.students} học viên
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      {path.rating}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tỷ lệ hoàn thành</span>
                      <span>{path.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${path.completionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Learning steps preview */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Các bước học:</h4>
                    <div className="space-y-2">
                      {path.steps.slice(0, 3).map((step, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${
                            step.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {step.completed && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <span className={step.completed ? 'line-through text-gray-500' : ''}>
                            {step.title}
                          </span>
                          <span className="ml-auto text-gray-400">({step.duration})</span>
                        </div>
                      ))}
                      {path.steps.length > 3 && (
                        <div className="text-sm text-gray-500">
                          +{path.steps.length - 3} bước khác...
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button className="w-full" asChild>
                    <Link href={`/roadmap/${path.id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Bắt đầu lộ trình
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom roadmap CTA */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8">
          <div className="text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Tạo lộ trình cá nhân</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Không tìm thấy lộ trình phù hợp? Hãy để chúng tôi tạo một lộ trình học tập cá nhân dựa trên mục tiêu và trình độ hiện tại của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Tạo lộ trình cá nhân
              </Button>
              <Button size="lg" variant="outline">
                <TrendingUp className="w-5 h-5 mr-2" />
                Đánh giá trình độ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
