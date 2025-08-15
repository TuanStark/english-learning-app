"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Target, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  Play,
  BookOpen,
  TrendingUp,
  Award,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

const categories = ['Tất cả', 'IELTS', 'TOEFL', 'Listening', 'Reading', 'Writing', 'Speaking', 'Grammar', 'Vocabulary']
const difficulties = ['Tất cả', 'Beginner', 'Intermediate', 'Advanced']

const mockTests = [
  {
    id: 1,
    title: 'IELTS Academic Reading Practice Test 1',
    description: 'Bài test Reading IELTS Academic với 3 passages và 40 câu hỏi được thiết kế theo format chính thức của IELTS.',
    category: 'IELTS',
    type: 'Reading',
    difficulty: 'Intermediate',
    duration: 60,
    questions: 40,
    attempts: 1250,
    avgScore: 6.5,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
    isNew: true,
    isFree: true
  },
  {
    id: 2,
    title: 'TOEFL iBT Listening Practice',
    description: 'Luyện tập Listening TOEFL với 6 conversations và lectures theo format chuẩn TOEFL iBT.',
    category: 'TOEFL',
    type: 'Listening',
    difficulty: 'Advanced',
    duration: 90,
    questions: 34,
    attempts: 890,
    avgScore: 24.0,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop',
    isNew: false,
    isFree: false
  },
  {
    id: 3,
    title: 'Grammar Test: Tenses & Conditionals',
    description: 'Kiểm tra kiến thức về thì và câu điều kiện trong tiếng Anh với 50 câu hỏi đa dạng.',
    category: 'Grammar',
    type: 'Grammar',
    difficulty: 'Beginner',
    duration: 30,
    questions: 50,
    attempts: 2100,
    avgScore: 7.8,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop',
    isNew: false,
    isFree: true
  },
  {
    id: 4,
    title: 'IELTS Speaking Mock Test',
    description: 'Mô phỏng bài thi Speaking IELTS với đầy đủ 3 parts và hệ thống chấm điểm chi tiết.',
    category: 'IELTS',
    type: 'Speaking',
    difficulty: 'Intermediate',
    duration: 15,
    questions: 12,
    attempts: 567,
    avgScore: 6.0,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
    isNew: true,
    isFree: false
  },
  {
    id: 5,
    title: 'Vocabulary Test: Academic Words',
    description: 'Test từ vựng academic với 100 từ quan trọng nhất cho các kỳ thi quốc tế.',
    category: 'Vocabulary',
    type: 'Vocabulary',
    difficulty: 'Advanced',
    duration: 45,
    questions: 100,
    attempts: 1890,
    avgScore: 8.2,
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop',
    isNew: false,
    isFree: true
  },
  {
    id: 6,
    title: 'TOEFL Writing Task 1 & 2',
    description: 'Luyện tập Writing TOEFL với cả Integrated và Independent tasks theo tiêu chuẩn ETS.',
    category: 'TOEFL',
    type: 'Writing',
    difficulty: 'Advanced',
    duration: 50,
    questions: 2,
    attempts: 445,
    avgScore: 22.5,
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop',
    isNew: true,
    isFree: false
  }
]

export default function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [selectedDifficulty, setSelectedDifficulty] = useState('Tất cả')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTests = mockTests.filter(test => {
    const matchesCategory = selectedCategory === 'Tất cả' || test.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'Tất cả' || test.difficulty === selectedDifficulty
    const matchesSearch = searchQuery === '' || 
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesDifficulty && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Reading': return BookOpen
      case 'Listening': return Users
      case 'Writing': return Target
      case 'Speaking': return Users
      case 'Grammar': return CheckCircle
      case 'Vocabulary': return Star
      default: return Target
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            Luyện tập chuyên nghiệp
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 bg-clip-text text-transparent">
              Luyện đề thi
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Thực hành với các đề thi thử chất lượng cao được thiết kế theo format chính thức.
            Chuẩn bị tốt nhất cho kỳ thi với hệ thống chấm điểm tự động.
          </p>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">150+</div>
              <div className="text-sm text-gray-600">Đề thi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm text-gray-600">Lượt thi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">7.2</div>
              <div className="text-sm text-gray-600">Điểm TB</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-gray-600">Độ chính xác</div>
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
                placeholder="Tìm kiếm đề thi..."
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
              <h4 className="text-sm font-medium mb-2">Loại thi:</h4>
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
            Tìm thấy <span className="font-semibold">{filteredTests.length}</span> đề thi
          </p>
        </div>

        {/* Tests grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => {
            const TypeIcon = getTypeIcon(test.type)
            return (
              <Card key={test.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={test.thumbnail}
                    alt={test.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary">{test.category}</Badge>
                    {test.isNew && <Badge variant="destructive">Mới</Badge>}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(test.difficulty)}`}>
                      {test.difficulty}
                    </div>
                  </div>
                  {test.isFree && (
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-green-600">Miễn phí</Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    <TypeIcon className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-600">{test.type}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {test.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {test.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {test.duration} phút
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {test.questions} câu
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {test.attempts} lượt thi
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      {test.avgScore}
                    </div>
                  </div>
                  
                  <Button className="w-full" asChild>
                    <Link href={`/practice/${test.id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Làm bài ngay
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty state */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Không tìm thấy đề thi
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
