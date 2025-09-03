"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Search,
  Play,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  Calendar,
  Filter,
  Sparkles,
  Brain,
  Zap
} from "lucide-react"
import Link from "next/link"
import { Exam } from "@/types/global-type"
import { Pagination } from "@/types/global-type"

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [filteredExams, setFilteredExams] = useState<Exam[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedLevel, setSelectedLevel] = useState("Tất cả")

  const fetchExams = async (search?: string, type?: string, difficulty?: string) => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (type && type !== 'Tất cả') params.append('type', type);
      if (difficulty && difficulty !== 'Tất cả') params.append('difficulty', difficulty);
      
      const url = `http://localhost:8001/exams${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('Fetching from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.data) {
        setExams(data.data);
        setPagination(data.meta || { page: 1, limit: 10, total: 0, totalPages: 0 });
        setFilteredExams(data.data);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Sử dụng các giá trị cố định cho loại đề thi và mức độ
  const categories = ["Tất cả", "TOEIC", "IELTS"]
  const levels = ["Tất cả", "Easy", "Medium", "Hard"]

  useEffect(() => {
    fetchExams();
  }, [])

  // Debounce search để tránh gọi API quá nhiều
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoading) {
        fetchExams(searchQuery, selectedCategory, selectedLevel);
      }
    }, 500); // Delay 500ms

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedLevel])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Easy":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Medium":
        return "bg-amber-100 text-amber-700 border-amber-200"
      case "Hard":
        return "bg-rose-100 text-rose-700 border-rose-200"
      default:
        return "bg-blue-100 text-blue-700 border-blue-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "TOEIC":
        return <Target className="h-5 w-5 text-blue-600" />
      case "IELTS":
        return <Award className="h-5 w-5 text-purple-600" />
      case "SAT":
        return <Brain className="h-5 w-5 text-green-600" />
      default:
        return <BookOpen className="h-5 w-5 text-gray-600" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-4xl mb-4">
                Practice Exams
              </div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-64">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-5xl mb-4">
            <Sparkles className="h-12 w-12 text-blue-600" />
            Practice Exams
            <Sparkles className="h-12 w-12 text-purple-600" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Luyện tập với các đề thi TOEIC, IELTS chất lượng cao. 
            Cải thiện kỹ năng tiếng Anh của bạn với hệ thống đánh giá chi tiết.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Tìm kiếm đề thi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-12 px-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-gray-500" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="h-12 px-4 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-white"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Tổng đề thi</p>
                <p className="text-3xl font-bold">{exams.length}</p>
              </div>
              <BookOpen className="h-12 w-12 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Đã hoàn thành</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <CheckCircle className="h-12 w-12 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Điểm trung bình</p>
                <p className="text-3xl font-bold">--</p>
              </div>
              <TrendingUp className="h-12 w-12 text-emerald-200" />
            </div>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="relative">
                {/* Type Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 border-gray-200 px-3 py-1 rounded-full font-medium">
                    {getTypeIcon(exam.type || "CUSTOM")}
                    <span className="ml-2">{exam.type || "CUSTOM"}</span>
                  </Badge>
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge className={`${getLevelColor(exam.difficulty)} px-3 py-1 rounded-full font-medium border`}>
                    {exam.difficulty}
                  </Badge>
                </div>

                {/* Header Image */}
                <div className="h-32 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-2" />
                    <p className="text-blue-800 font-medium text-sm">English Practice</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {exam.title}
                </CardTitle>
                
                <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                  {exam.description || "Luyện tập kỹ năng tiếng Anh với đề thi chất lượng cao"}
                </CardDescription>

                {/* Exam Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span>{exam.duration} phút</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target className="h-4 w-4 text-purple-500" />
                    <span>Độ khó: {exam.difficulty}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-green-500" />
                    <span>{exam._count.examAttempts} người đã làm</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link href={`/exams/${exam.id}/take`}>
                    <Play className="h-5 w-5 mr-2" />
                    Bắt đầu làm bài
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredExams.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy đề thi
              </h3>
              <p className="text-gray-500 mb-4">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("Tất cả")
                  setSelectedLevel("Tất cả")
                }}
                variant="outline"
                className="rounded-xl"
              >
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages && pagination.totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-2 border border-gray-100">
              <Button
                variant="ghost"
                size="sm"
                disabled={pagination.page === 1}
                className="rounded-lg"
              >
                Trước
              </Button>
              
              {[...Array(pagination.totalPages)].map((_, i) => (
                <Button
                  key={i + 1}
                  variant={pagination.page === i + 1 ? "default" : "ghost"}
                  size="sm"
                  className="rounded-lg"
                >
                  {i + 1}
                </Button>
              ))}
              
              <Button
                variant="ghost"
                size="sm"
                disabled={pagination.page === pagination.totalPages}
                className="rounded-lg"
              >
                Sau
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
