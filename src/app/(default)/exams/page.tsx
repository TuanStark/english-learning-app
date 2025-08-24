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
  Calendar
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
      
      // Add pagination parameters for backend
      params.append('page', '1');
      params.append('limit', '20');
      
      const url = `http://localhost:8001/exams${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('Fetching from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Raw response:', data);
      
      // Handle both ResponseData format and direct response
      let examsData = [];
      let metaData = { page: 1, limit: 10, total: 0, totalPages: 0 };
      
      if (data.data && Array.isArray(data.data)) {
        // ResponseData format from backend
        examsData = data.data;
        metaData = data.meta || { page: 1, limit: 10, total: 0, totalPages: 0 };
      } else if (Array.isArray(data)) {
        // Direct array response
        examsData = data;
        metaData = { page: 1, limit: 10, total: data.length, totalPages: 1 };
      }
      
      setExams(examsData);
      setPagination(metaData);
      setFilteredExams(examsData);
      
      console.log('Processed exams:', examsData);
      console.log('Pagination meta:', metaData);
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

  // Không cần filter ở frontend nữa vì đã chuyển về backend

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Luyện đề tiếng Anh
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Luyện đề tiếng Anh hiệu quả với các đề thi chất lượng cao từ giảng viên kinh nghiệm.
            Phương pháp hiện đại, tương tác và cá nhân hóa.
          </p>
        </div>

        {/* Simple Search & Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-neutral-200/50 p-4 mb-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="🔍 Tìm kiếm đề thi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-lg border-neutral-200 focus:border-brand-400 focus:ring-1 focus:ring-brand-200"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-neutral-600">Lọc theo:</span>
              
              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Loại đề thi</span>
                <div className="flex gap-1">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`h-7 px-3 text-xs rounded-md transition-all ${
                        selectedCategory === category
                          ? 'bg-brand-500 hover:bg-brand-600 text-white'
                          : 'hover:bg-neutral-50'
                      }`}
                    >
                      {category === 'Tất cả' ? 'Tất cả' : category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-500">Mức độ</span>
                <div className="flex gap-1">
                  {levels.map((level) => (
                    <Button
                      key={level}
                      variant={selectedLevel === level ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedLevel(level)}
                      className={`h-7 px-3 text-xs rounded-md transition-all ${
                        selectedLevel === level
                          ? 'bg-brand-500 hover:bg-brand-600 text-white'
                          : 'hover:bg-neutral-50'
                      }`}
                    >
                      {level === 'Tất cả' ? 'All' : 
                       level === 'Easy' ? 'Beginner' :
                       level === 'Medium' ? 'Intermediate' :
                       level === 'Hard' ? 'Advanced' : level}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {(selectedCategory !== 'Tất cả' || selectedLevel !== 'Tất cả' || searchQuery) && (
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
                <span className="text-xs text-neutral-500">Đang áp dụng:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs">
                    Tìm kiếm: "{searchQuery}"
                  </Badge>
                )}
                {selectedCategory !== 'Tất cả' && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs">
                    Loại: {selectedCategory}
                  </Badge>
                )}
                {selectedLevel !== 'Tất cả' && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs">
                    Mức độ: {selectedLevel === 'Easy' ? 'Dễ' : 
                              selectedLevel === 'Medium' ? 'Trung bình' : 
                              selectedLevel === 'Hard' ? 'Khó' : selectedLevel}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Tất cả');
                    setSelectedLevel('Tất cả');
                  }}
                  className="h-5 px-2 text-xs text-neutral-500 hover:text-neutral-700"
                >
                  ✕ Xóa tất cả
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-lg text-neutral-600">
            Tìm thấy <span className="font-bold text-neutral-900">{pagination.total || filteredExams.length}</span> đề thi phù hợp
            {pagination.totalPages && pagination.totalPages > 1 && (
              <span className="text-sm text-neutral-500 ml-2">
                (Trang {pagination.page || 1} / {pagination.totalPages})
              </span>
            )}
          </p>
        </div>

        {/* Exams grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="group overflow-hidden border-0 shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <div className="relative overflow-hidden">
                <div className="w-full h-56 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white" />
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 text-neutral-700 backdrop-blur-sm">
                    {exam.type}
                  </Badge>
                  {exam.isActive && (
                    <Badge className="bg-gradient-to-r from-warning-500 to-warning-600 text-white">
                      Hoạt động
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${getLevelColor(exam.difficulty)}`}>
                    {exam.difficulty}
                  </div>
                </div>
                {exam.isActive && (
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-green-500 text-white">
                      Sẵn sàng
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg leading-tight">{exam.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                  {exam.description || 'Không có mô tả'}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{exam.duration} phút</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>{exam.questions?.length || 0} câu hỏi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>{exam.examAttempts?.length || 0} lượt luyện đề</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.5/5</span>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/exams/${exam.id}`}>
                    <Play className="h-4 w-4 mr-2" />
                    Xem chi tiết
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {exams.length === 0 ? 'Không thể tải dữ liệu đề thi' : 'Không tìm thấy đề thi nào'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {exams.length === 0 
                ? 'Vui lòng kiểm tra kết nối mạng hoặc thử lại sau'
                : 'Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'
              }
            </p>
            {exams.length === 0 && (
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                variant="outline"
              >
                Thử lại
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
