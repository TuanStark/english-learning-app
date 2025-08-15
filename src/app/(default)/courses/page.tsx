"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  Play,
  CheckCircle,
  Award,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

const categories = ['Tất cả', 'IELTS', 'TOEFL', 'Giao tiếp', 'Ngữ pháp', 'Từ vựng', 'Phát âm']
const levels = ['Tất cả', 'Beginner', 'Intermediate', 'Advanced']

const mockCourses = [
  {
    id: 1,
    title: 'IELTS Complete Course',
    description: 'Khóa học IELTS toàn diện từ 0 đến 8.0+ với đầy đủ 4 kỹ năng',
    instructor: 'Sarah Johnson',
    category: 'IELTS',
    level: 'Intermediate',
    duration: '120 giờ',
    students: 5678,
    rating: 4.8,
    price: 1500000,
    originalPrice: 2000000,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
    isPopular: true,
    isFree: false
  },
  {
    id: 2,
    title: 'English Grammar Fundamentals',
    description: 'Nắm vững nền tảng ngữ pháp tiếng Anh từ cơ bản đến nâng cao',
    instructor: 'Michael Chen',
    category: 'Ngữ pháp',
    level: 'Beginner',
    duration: '80 giờ',
    students: 3456,
    rating: 4.6,
    price: 0,
    originalPrice: 0,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
    isPopular: false,
    isFree: true
  },
  {
    id: 3,
    title: 'TOEFL iBT Preparation',
    description: 'Chuẩn bị thi TOEFL iBT với chiến lược và kỹ thuật hiệu quả',
    instructor: 'Emma Wilson',
    category: 'TOEFL',
    level: 'Advanced',
    duration: '100 giờ',
    students: 2345,
    rating: 4.9,
    price: 1800000,
    originalPrice: 2200000,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    isPopular: true,
    isFree: false
  },
  {
    id: 4,
    title: 'Business English Communication',
    description: 'Tiếng Anh thương mại cho môi trường công sở hiện đại',
    instructor: 'David Brown',
    category: 'Giao tiếp',
    level: 'Intermediate',
    duration: '60 giờ',
    students: 1890,
    rating: 4.7,
    price: 1200000,
    originalPrice: 1500000,
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop',
    isPopular: false,
    isFree: false
  },
  {
    id: 5,
    title: 'Vocabulary Building Masterclass',
    description: '3000+ từ vựng thiết yếu với phương pháp ghi nhớ hiệu quả',
    instructor: 'Lisa Anderson',
    category: 'Từ vựng',
    level: 'Beginner',
    duration: '40 giờ',
    students: 4567,
    rating: 4.5,
    price: 0,
    originalPrice: 0,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    isPopular: false,
    isFree: true
  },
  {
    id: 6,
    title: 'English Pronunciation Perfect',
    description: 'Cải thiện phát âm tiếng Anh với kỹ thuật IPA và thực hành',
    instructor: 'James Wilson',
    category: 'Phát âm',
    level: 'Intermediate',
    duration: '30 giờ',
    students: 1234,
    rating: 4.4,
    price: 800000,
    originalPrice: 1000000,
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    isPopular: false,
    isFree: false
  }
]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [selectedLevel, setSelectedLevel] = useState('Tất cả')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCourses = mockCourses.filter(course => {
    const matchesCategory = selectedCategory === 'Tất cả' || course.category === selectedCategory
    const matchesLevel = selectedLevel === 'Tất cả' || course.level === selectedLevel
    const matchesSearch = searchQuery === '' || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesLevel && matchesSearch
  })

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí'
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

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
            <BookOpen className="w-4 h-4" />
            Khóa học chất lượng cao
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 bg-clip-text text-transparent">
              Khóa học tiếng Anh
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Học tiếng Anh hiệu quả với các khóa học chất lượng cao từ giảng viên kinh nghiệm.
            Phương pháp hiện đại, tương tác và cá nhân hóa.
          </p>
        </div>

        {/* Search and filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-white/20 p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-2xl border-neutral-200 focus:border-brand-300 focus:ring-brand-200"
              />
            </div>
            <Button variant="outline" className="lg:w-auto h-12 px-6 rounded-2xl border-neutral-200 hover:border-brand-300">
              <Filter className="w-5 h-5 mr-2" />
              Bộ lọc nâng cao
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold mb-4 text-neutral-800">Danh mục:</h4>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-2xl px-4 py-2 transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow'
                        : 'border-neutral-200 hover:border-brand-300 hover:bg-brand-50'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-base font-semibold mb-4 text-neutral-800">Trình độ:</h4>
              <div className="flex flex-wrap gap-3">
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                    className={`rounded-2xl px-4 py-2 transition-all duration-200 ${
                      selectedLevel === level
                        ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-glow'
                        : 'border-neutral-200 hover:border-brand-300 hover:bg-brand-50'
                    }`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-lg text-neutral-600">
            Tìm thấy <span className="font-bold text-neutral-900">{filteredCourses.length}</span> khóa học phù hợp
          </p>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group overflow-hidden border-0 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <div className="relative overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 text-neutral-700 backdrop-blur-sm">
                    {course.category}
                  </Badge>
                  {course.isPopular && (
                    <Badge className="bg-gradient-to-r from-warning-500 to-warning-600 text-white">
                      Phổ biến
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getLevelColor(course.level)}`}>
                    {course.level}
                  </div>
                </div>
                {course.isFree && (
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-gradient-to-r from-success-500 to-success-600 text-white">
                      Miễn phí
                    </Badge>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="lg" className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                    <Play className="w-5 h-5 mr-2" />
                    Xem chi tiết
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-brand-600 transition-colors">
                  <Link href={`/courses/${course.id}`}>
                    {course.title}
                  </Link>
                </h3>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center text-sm text-neutral-500 mb-4">
                  <span className="font-medium">Giảng viên: {course.instructor}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-neutral-500 mb-6">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-brand-500" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-brand-500" />
                    {course.students} học viên
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
                    {course.rating}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2 text-brand-500" />
                    {course.level}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
                      {formatPrice(course.price)}
                    </span>
                    {course.originalPrice > course.price && course.originalPrice > 0 && (
                      <span className="text-sm text-neutral-500 line-through ml-2">
                        {formatPrice(course.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-glow" asChild>
                    <Link href={`/courses/${course.id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Xem chi tiết
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Không tìm thấy khóa học
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
