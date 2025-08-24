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
  AlertCircle
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
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {error || 'Không tìm thấy đề thi'}
            </h3>
            <p className="text-gray-500 mb-4">
              {error || 'Đề thi bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
            </p>
            <div className="space-x-4">
              <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
              <Button asChild>
                <Link href="/exams">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Xem tất cả đề thi
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exam Header */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <div className="relative overflow-hidden">
                <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <BookOpen className="h-20 w-20 text-white" />
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 text-neutral-700 backdrop-blur-sm">
                    {exam.type}
                  </Badge>
                  {exam.isActive && (
                    <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                      Hoạt động
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm border ${getLevelColor(exam.difficulty)}`}>
                    {getLevelName(exam.difficulty)}
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl leading-tight">{exam.title}</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {exam.description || 'Không có mô tả'}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
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
              </CardContent>
            </Card>

            {/* Exam Questions Preview */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Xem trước câu hỏi
                </CardTitle>
                <CardDescription>
                  Xem trước một số câu hỏi mẫu từ đề thi này
                </CardDescription>
              </CardHeader>
              <CardContent>
                {exam.questions && exam.questions.length > 0 ? (
                  <div className="space-y-4">
                    {exam.questions.slice(0, 3).map((question, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 mb-2">
                              {question.content}
                            </p>
                            {question.answerOptions && question.answerOptions.length > 0 && (
                              <div className="space-y-1">
                                {question.answerOptions.slice(0, 4).map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center gap-2 text-xs text-gray-600">
                                    <span className="w-4 h-4 bg-gray-100 rounded flex items-center justify-center">
                                      {String.fromCharCode(65 + optIndex)}
                                    </span>
                                    <span>{option.content}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {exam.questions.length > 3 && (
                      <div className="text-center pt-2">
                        <p className="text-sm text-gray-500">
                          Và {exam.questions.length - 3} câu hỏi khác...
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Chưa có câu hỏi nào trong đề thi này</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Attempts */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Lượt luyện đề gần đây
                </CardTitle>
                <CardDescription>
                  Xem các lượt luyện đề gần đây của người dùng
                </CardDescription>
              </CardHeader>
              <CardContent>
                {exam.examAttempts && exam.examAttempts.length > 0 ? (
                  <div className="space-y-3">
                    {exam.examAttempts.slice(0, 5).map((attempt, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Người dùng #{attempt.userId || index + 1}
                            </p>
                            <p className="text-xs text-gray-500">
                              {attempt.completedAt ? new Date(attempt.completedAt).toLocaleDateString('vi-VN') : 'Chưa hoàn thành'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {attempt.score || 0}/{exam.questions?.length || 0}
                          </p>
                          <p className="text-xs text-gray-500">
                            {attempt.score && exam.questions ? 
                              Math.round((attempt.score / exam.questions.length) * 100) : 0}%
                          </p>
                        </div>
                      </div>
                    ))}
                    {exam.examAttempts.length > 5 && (
                      <div className="text-center pt-2">
                        <p className="text-sm text-gray-500">
                          Và {exam.examAttempts.length - 5} lượt luyện đề khác...
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Chưa có lượt luyện đề nào</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Hành động nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full">
                  <Link href={`/exams/${examId}/take`}>
                    <Play className="h-4 w-4 mr-2" />
                    Bắt đầu làm bài
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <BookMarked className="h-4 w-4 mr-2" />
                  Lưu vào danh sách yêu thích
                </Button>
                <Button variant="outline" className="w-full">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Xem hướng dẫn
                </Button>
              </CardContent>
            </Card>

            {/* Exam Stats */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Thống kê đề thi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tổng câu hỏi:</span>
                  <span className="font-medium">{exam.questions?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Thời gian:</span>
                  <span className="font-medium">{exam.duration} phút</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Lượt luyện đề:</span>
                  <span className="font-medium">{exam.examAttempts?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mức độ:</span>
                  <Badge variant="outline" className={getLevelColor(exam.difficulty)}>
                    {getLevelName(exam.difficulty)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Loại đề thi:</span>
                  <Badge variant="secondary">{exam.type}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Trạng thái:</span>
                  <Badge variant={exam.isActive ? "default" : "secondary"}>
                    {exam.isActive ? "Hoạt động" : "Không hoạt động"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Mẹo làm bài
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Đọc kỹ câu hỏi trước khi chọn đáp án</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Quản lý thời gian hiệu quả</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Kiểm tra lại đáp án trước khi nộp bài</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
