"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  Calendar,
  ArrowLeft,
  FileText,
  BarChart3,
  Timer,
  User,
  BookMarked,
  Lightbulb,
  AlertCircle,
  Sparkles,
  Brain,
  Zap,
  Eye,
  BarChart
} from "lucide-react"
import Link from "next/link"
import { Exam } from "@/types/global-type"

export default function ExamDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [exam, setExam] = useState<Exam | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const examId = params?.id

  useEffect(() => {
    const fetchExam = async () => {
      if (!examId) return
      
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch(`http://localhost:8001/exams/${examId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Exam detail response:', data)
        
        // Handle both direct response and ResponseData format
        let examData = null
        
        if (data.data) {
          // ResponseData format from backend
          examData = data.data
        } else if (data.id) {
          // Direct response
          examData = data
        }
        
        if (examData) {
          setExam(examData)
          console.log('Exam set successfully:', examData)
        } else {
          setError('Không thể tải dữ liệu đề thi')
        }
      } catch (err) {
        console.error('Error fetching exam:', err)
        setError('Có lỗi xảy ra khi tải dữ liệu đề thi')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExam()
  }, [examId])

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

  const getLevelName = (level: string) => {
    switch (level) {
      case "Easy":
        return "Dễ"
      case "Medium":
        return "Trung bình"
      case "Hard":
        return "Khó"
      default:
        return level
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "TOEIC":
        return <Target className="h-6 w-6 text-blue-600" />
      case "IELTS":
        return <Award className="h-6 w-6 text-purple-600" />
      case "SAT":
        return <Brain className="h-6 w-6 text-green-600" />
      default:
        return <BookOpen className="h-6 w-6 text-gray-600" />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-4xl mb-4">
                Loading Exam...
              </div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-32 bg-gray-200 rounded-lg"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {error || 'Không tìm thấy đề thi'}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {error || 'Đề thi bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
              </p>
              <div className="space-y-3">
                <Button onClick={() => router.back()} variant="outline" className="w-full rounded-xl">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
                <Button asChild className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                  <Link href="/exams">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Xem tất cả đề thi
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-6 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách đề thi
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            {getTypeIcon(exam.type || "CUSTOM")}
            <Badge className="px-4 py-2 rounded-full text-lg font-medium bg-white/80 backdrop-blur-sm border border-gray-200">
              {exam.type || "CUSTOM"}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {exam.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {exam.description || "Luyện tập kỹ năng tiếng Anh với đề thi chất lượng cao"}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Exam Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exam Overview Card */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8" />
                  <div>
                    <CardTitle className="text-2xl">Thông tin đề thi</CardTitle>
                    <CardDescription className="text-blue-100">
                      Chi tiết về cấu trúc và yêu cầu
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-3 rounded-xl">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Thời gian làm bài</p>
                        <p className="font-semibold text-lg">{exam.duration} phút</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 p-3 rounded-xl">
                        <Target className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Số câu hỏi</p>
                        <p className="font-semibold text-lg">{exam.questions?.length || 0} câu</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <Zap className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Độ khó</p>
                        <Badge className={`px-3 py-1 rounded-full font-medium ${getLevelColor(exam.difficulty)}`}>
                          {getLevelName(exam.difficulty)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 p-3 rounded-xl">
                        <Users className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Lượt làm bài</p>
                        <p className="font-semibold text-lg">{exam.examAttempts?.length || 0} người</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exam Structure Card */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <CardHeader className="p-6">
                <div className="flex items-center gap-3">
                  <BarChart className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-xl">Cấu trúc đề thi</CardTitle>
                    <CardDescription>
                      Phân bổ câu hỏi theo từng phần
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-900">Listening</h4>
                          <p className="text-sm text-blue-700">Kỹ năng nghe hiểu</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                        {Math.floor((exam.questions?.length || 0) * 0.4)} câu
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-900">Reading</h4>
                          <p className="text-sm text-purple-700">Kỹ năng đọc hiểu</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                        {Math.floor((exam.questions?.length || 0) * 0.6)} câu
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <CardHeader className="p-6">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                  <div>
                    <CardTitle className="text-xl">Mẹo làm bài</CardTitle>
                    <CardDescription>
                      Hướng dẫn để đạt điểm cao
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg mt-1">
                      <CheckCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quản lý thời gian</h4>
                      <p className="text-sm text-gray-600">
                        Phân bổ thời gian hợp lý cho từng câu hỏi, không dừng lại quá lâu ở một câu.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg mt-1">
                      <CheckCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Đọc kỹ đề bài</h4>
                      <p className="text-sm text-gray-600">
                        Đọc câu hỏi và các đáp án một cách cẩn thận trước khi chọn.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-lg mt-1">
                      <CheckCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Kiểm tra lại</h4>
                      <p className="text-sm text-gray-600">
                        Dành thời gian cuối để kiểm tra lại các câu trả lời.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Action & Stats */}
          <div className="space-y-6">
            {/* Start Exam Card */}
            <Card className="border-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl text-white">
              <CardContent className="p-6 text-center">
                <div className="mb-6">
                  <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Play className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sẵn sàng làm bài?</h3>
                  <p className="text-blue-100 text-sm">
                    Bắt đầu làm bài thi và kiểm tra trình độ tiếng Anh của bạn
                  </p>
                </div>
                
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-semibold py-3"
                >
                  <Link href={`/exams/${exam.id}/take`}>
                    <Play className="h-5 w-5 mr-2" />
                    Bắt đầu làm bài
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <CardHeader className="p-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  <div>
                    <CardTitle className="text-xl">Thống kê</CardTitle>
                    <CardDescription>
                      Thông tin về đề thi
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Điểm trung bình</span>
                    <span className="font-semibold text-gray-900">--</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tỷ lệ hoàn thành</span>
                    <span className="font-semibold text-gray-900">--</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Thời gian trung bình</span>
                    <span className="font-semibold text-gray-900">--</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Attempts */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <CardHeader className="p-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                  <div>
                    <CardTitle className="text-xl">Lần làm gần đây</CardTitle>
                    <CardDescription>
                      Kết quả các lần làm trước
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {exam.examAttempts && exam.examAttempts.length > 0 ? (
                  <div className="space-y-3">
                    {exam.examAttempts.slice(0, 3).map((attempt: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">User {attempt.userId}</p>
                            <p className="text-xs text-gray-500">{attempt.score || 0} điểm</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {attempt.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">Chưa có ai làm bài thi này</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
