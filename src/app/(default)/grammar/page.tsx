"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  PenTool, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  Play,
  BookOpen,
  Target,
  TrendingUp,
  CheckCircle,
  Brain,
  FileText,
  Lightbulb
} from "lucide-react"
import Link from "next/link"

const categories = ['Tất cả', 'Tenses', 'Conditionals', 'Passive Voice', 'Modal Verbs', 'Articles', 'Prepositions', 'Relative Clauses', 'Reported Speech']
const difficulties = ['Tất cả', 'Easy', 'Medium', 'Hard']

const mockGrammarLessons = [
  {
    id: 1,
    title: 'Present Perfect vs Past Simple',
    description: 'Phân biệt và sử dụng chính xác thì hiện tại hoàn thành và quá khứ đơn trong giao tiếp và viết.',
    category: 'Tenses',
    difficulty: 'Medium',
    duration: 45,
    exerciseCount: 25,
    completedBy: 3200,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
    isNew: false,
    isFree: true,
    progress: 80
  },
  {
    id: 2,
    title: 'Conditional Sentences (All Types)',
    description: 'Nắm vững 4 loại câu điều kiện và cách sử dụng trong giao tiếp hàng ngày.',
    category: 'Conditionals',
    difficulty: 'Hard',
    duration: 60,
    exerciseCount: 30,
    completedBy: 1800,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
    isNew: true,
    isFree: false,
    progress: 0
  },
  {
    id: 3,
    title: 'Articles: A, An, The',
    description: 'Học cách sử dụng mạo từ một cách chính xác và tự nhiên trong mọi ngữ cảnh.',
    category: 'Articles',
    difficulty: 'Easy',
    duration: 30,
    exerciseCount: 20,
    completedBy: 4500,
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    isNew: false,
    isFree: true,
    progress: 100
  },
  {
    id: 4,
    title: 'Modal Verbs: Can, Could, May, Might',
    description: 'Sử dụng động từ khuyết thiếu để diễn đạt khả năng, xin phép và khả năng xảy ra.',
    category: 'Modal Verbs',
    difficulty: 'Medium',
    duration: 50,
    exerciseCount: 35,
    completedBy: 2100,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    isNew: false,
    isFree: false,
    progress: 45
  },
  {
    id: 5,
    title: 'Passive Voice in All Tenses',
    description: 'Nắm vững cách chuyển đổi và sử dụng câu bị động trong tất cả các thì.',
    category: 'Passive Voice',
    difficulty: 'Hard',
    duration: 55,
    exerciseCount: 40,
    completedBy: 1500,
    rating: 4.5,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    isNew: true,
    isFree: false,
    progress: 0
  },
  {
    id: 6,
    title: 'Prepositions of Time and Place',
    description: 'Sử dụng đúng giới từ chỉ thời gian và địa điểm trong các tình huống khác nhau.',
    category: 'Prepositions',
    difficulty: 'Easy',
    duration: 35,
    exerciseCount: 25,
    completedBy: 3800,
    rating: 4.4,
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop',
    isNew: false,
    isFree: true,
    progress: 60
  }
]

const grammarFeatures = [
  {
    name: 'Lý thuyết chi tiết',
    description: 'Giải thích rõ ràng với ví dụ minh họa',
    icon: FileText,
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Bài tập thực hành',
    description: 'Hàng trăm bài tập đa dạng',
    icon: PenTool,
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'Ghi nhớ hiệu quả',
    description: 'Phương pháp học khoa học',
    icon: Brain,
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Kiểm tra tiến độ',
    description: 'Theo dõi quá trình học tập',
    icon: TrendingUp,
    color: 'from-orange-500 to-orange-600'
  }
]

export default function GrammarPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tất cả')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLessons = mockGrammarLessons.filter(lesson => {
    const matchesCategory = selectedCategory === 'Tất cả' || lesson.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'Tất cả' || lesson.difficulty === selectedDifficulty
    const matchesSearch = searchQuery === '' || 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <PenTool className="w-4 h-4" />
            Ngữ pháp chuyên sâu
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 bg-clip-text text-transparent">
              Ngữ pháp tiếng Anh
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Nắm vững ngữ pháp từ cơ bản đến nâng cao với lý thuyết chi tiết và bài tập thực hành.
            Học theo hệ thống từng bước một cách khoa học.
          </p>
        </div>

        {/* Grammar features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Tính năng học ngữ pháp</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {grammarFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <PenTool className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm text-gray-600">Chủ đề</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-sm text-gray-600">Học viên</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">90%</div>
              <div className="text-sm text-gray-600">Tỷ lệ cải thiện</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-gray-600">Bài tập</div>
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
                placeholder="Tìm kiếm bài học ngữ pháp..."
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
              <h4 className="text-sm font-medium mb-2">Độ khó:</h4>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className="rounded-full"
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Tìm thấy <span className="font-semibold">{filteredLessons.length}</span> bài học
          </p>
        </div>

        {/* Grammar lessons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={lesson.thumbnail}
                  alt={lesson.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary">{lesson.category}</Badge>
                  {lesson.isNew && <Badge variant="destructive">Mới</Badge>}
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </div>
                </div>
                {lesson.isFree && (
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-green-600">Miễn phí</Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {lesson.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {lesson.description}
                </p>
                
                {lesson.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tiến độ</span>
                      <span>{lesson.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${lesson.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration} phút
                  </div>
                  <div className="flex items-center">
                    <PenTool className="w-4 h-4 mr-1" />
                    {lesson.exerciseCount} bài tập
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {lesson.completedBy} người học
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {lesson.rating}
                  </div>
                </div>
                
                <Button className="w-full" asChild>
                  <Link href={`/grammar/${lesson.id}`}>
                    <Play className="w-4 h-4 mr-2" />
                    {lesson.progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <PenTool className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Không tìm thấy bài học
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}

        {/* Grammar tips */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8">
          <div className="text-center">
            <Lightbulb className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Mẹo học ngữ pháp hiệu quả</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Học ngữ pháp từng bước, thực hành thường xuyên và áp dụng vào giao tiếp thực tế
            </p>
            <Button size="lg" variant="outline">
              <BookOpen className="w-5 h-5 mr-2" />
              Xem thêm mẹo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
