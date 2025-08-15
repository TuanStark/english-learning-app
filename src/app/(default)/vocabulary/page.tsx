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
  Brain,
  Target,
  TrendingUp,
  Volume2,
  Eye,
  RotateCcw
} from "lucide-react"
import Link from "next/link"

const categories = ['Tất cả', 'IELTS', 'TOEFL', 'Academic', 'Business', 'Daily Life', 'Travel', 'Technology']
const levels = ['Tất cả', 'Beginner', 'Intermediate', 'Advanced']

const mockVocabularySets = [
  {
    id: 1,
    title: 'IELTS Vocabulary - Academic Module',
    description: 'Bộ từ vựng academic quan trọng nhất cho IELTS Writing và Speaking với định nghĩa, ví dụ và cách phát âm chuẩn.',
    category: 'IELTS',
    level: 'Advanced',
    wordCount: 500,
    studyTime: 120,
    completedBy: 2500,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
    isNew: true,
    isFree: true,
    progress: 35
  },
  {
    id: 2,
    title: 'Business English Vocabulary',
    description: 'Từ vựng thiết yếu cho môi trường công sở và kinh doanh hiện đại.',
    category: 'Business',
    level: 'Intermediate',
    wordCount: 300,
    studyTime: 80,
    completedBy: 1800,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    isNew: false,
    isFree: false,
    progress: 0
  },
  {
    id: 3,
    title: 'Daily Conversation Vocabulary',
    description: 'Từ vựng hàng ngày cho giao tiếp thông thường và các tình huống thực tế.',
    category: 'Daily Life',
    level: 'Beginner',
    wordCount: 200,
    studyTime: 50,
    completedBy: 3200,
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop',
    isNew: false,
    isFree: true,
    progress: 80
  },
  {
    id: 4,
    title: 'TOEFL Essential Words',
    description: 'Từ vựng cốt lõi cho kỳ thi TOEFL iBT với các từ xuất hiện thường xuyên nhất.',
    category: 'TOEFL',
    level: 'Advanced',
    wordCount: 400,
    studyTime: 100,
    completedBy: 1500,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    isNew: true,
    isFree: false,
    progress: 0
  },
  {
    id: 5,
    title: 'Travel English Vocabulary',
    description: 'Từ vựng du lịch cần thiết cho các chuyến đi và giao tiếp với người nước ngoài.',
    category: 'Travel',
    level: 'Intermediate',
    wordCount: 250,
    studyTime: 60,
    completedBy: 2100,
    rating: 4.5,
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    isNew: false,
    isFree: true,
    progress: 60
  },
  {
    id: 6,
    title: 'Technology & IT Vocabulary',
    description: 'Từ vựng công nghệ thông tin và các thuật ngữ kỹ thuật hiện đại.',
    category: 'Technology',
    level: 'Advanced',
    wordCount: 350,
    studyTime: 90,
    completedBy: 890,
    rating: 4.4,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
    isNew: false,
    isFree: false,
    progress: 0
  }
]

const studyMethods = [
  {
    name: 'Flashcards',
    description: 'Học từ vựng với thẻ ghi nhớ tương tác',
    icon: Eye,
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Pronunciation',
    description: 'Luyện phát âm với audio chuẩn',
    icon: Volume2,
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'Memory Games',
    description: 'Trò chơi ghi nhớ thú vị',
    icon: Brain,
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Spaced Repetition',
    description: 'Ôn tập theo chu kỳ khoa học',
    icon: RotateCcw,
    color: 'from-orange-500 to-orange-600'
  }
]

export default function VocabularyPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [selectedLevel, setSelectedLevel] = useState('Tất cả')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSets = mockVocabularySets.filter(set => {
    const matchesCategory = selectedCategory === 'Tất cả' || set.category === selectedCategory
    const matchesLevel = selectedLevel === 'Tất cả' || set.level === selectedLevel
    const matchesSearch = searchQuery === '' || 
      set.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      set.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesLevel && matchesSearch
  })

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
            <Brain className="w-4 h-4" />
            Học từ vựng thông minh
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 bg-clip-text text-transparent">
              Học từ vựng
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Mở rộng vốn từ vựng với các bộ từ theo chủ đề và phương pháp học hiệu quả.
            Sử dụng công nghệ Spaced Repetition để ghi nhớ lâu dài.
          </p>
        </div>

        {/* Study methods */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Phương pháp học</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {studyMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{method.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">5000+</div>
              <div className="text-sm text-gray-600">Từ vựng</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">15K+</div>
              <div className="text-sm text-gray-600">Học viên</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm text-gray-600">Tỷ lệ ghi nhớ</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">20</div>
              <div className="text-sm text-gray-600">Từ/ngày</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Tìm kiếm bộ từ vựng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="lg:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Bộ lọc
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Chủ đề:</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Trình độ:</h4>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                    className="rounded-full"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Tìm thấy <span className="font-semibold">{filteredSets.length}</span> bộ từ vựng
          </p>
        </div>

        {/* Vocabulary sets grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSets.map((set) => (
            <Card key={set.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={set.thumbnail}
                  alt={set.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary">{set.category}</Badge>
                  {set.isNew && <Badge variant="destructive">Mới</Badge>}
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(set.level)}`}>
                    {set.level}
                  </div>
                </div>
                {set.isFree && (
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-green-600">Miễn phí</Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {set.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {set.description}
                </p>
                
                {set.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tiến độ</span>
                      <span>{set.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${set.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {set.wordCount} từ
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {set.studyTime} phút
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {set.completedBy} người học
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {set.rating}
                  </div>
                </div>
                
                <Button className="w-full" asChild>
                  <Link href={`/vocabulary/${set.id}`}>
                    <Play className="w-4 h-4 mr-2" />
                    {set.progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredSets.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Không tìm thấy bộ từ vựng
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}

        {/* Daily challenge */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8">
          <div className="text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Thử thách hàng ngày</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Học 10 từ mới mỗi ngày để cải thiện vốn từ vựng
            </p>
            <Button size="lg">
              <Play className="w-5 h-5 mr-2" />
              Bắt đầu thử thách
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
