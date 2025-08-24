"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BookOpen, 
  Clock, 
  Target,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Trophy,
  Star,
  TrendingUp,
  BarChart3,
  FileText,
  User,
  Calendar,
  Award,
  RefreshCw,
  Share2,
  Download,
  Eye
} from "lucide-react"
import Link from "next/link"
import { Exam } from "@/types/global-type"

export default function ExamResultsPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [exam, setExam] = useState<Exam | null>(null)
  const [examAttempt, setExamAttempt] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const examId = params?.id as string
  const attemptId = searchParams?.get('attemptId')
  
  // Get results from URL params (fallback)
  const score = parseInt(searchParams?.get('score') || '0')
  const total = parseInt(searchParams?.get('total') || '0')
  const correct = parseInt(searchParams?.get('correct') || '0')
  const timeSpent = parseInt(searchParams?.get('time') || '0')

  useEffect(() => {
    const fetchExamAndAttempt = async () => {
      if (!examId) return
      
      try {
        setIsLoading(true)
        setError(null)
        
        // Fetch exam data
        const examResponse = await fetch(`http://localhost:8001/exams/${examId}`)
        if (!examResponse.ok) {
          throw new Error(`HTTP error! status: ${examResponse.status}`)
        }
        
        const examData = await examResponse.json()
        console.log('Exam response:', examData)
        
        // Handle both ResponseData format and direct response
        let examToSet = null
        if (examData.data) {
          examToSet = examData.data
        } else if (examData.id) {
          examToSet = examData
        }
        
        if (examToSet) {
          setExam(examToSet)
          console.log('Exam set successfully:', examToSet)
        } else {
          setError('Không thể tải dữ liệu đề thi')
          return
        }

        // Fetch exam attempt data if we have attemptId
        if (attemptId) {
          try {
            const attemptResponse = await fetch(`http://localhost:8001/exam-attempts/${attemptId}`)
            if (attemptResponse.ok) {
              const attemptData = await attemptResponse.json()
              console.log('Attempt response:', attemptData)
              
              // Handle both ResponseData format and direct response
              let attemptToSet = null
              if (attemptData.data) {
                attemptToSet = attemptData.data
              } else if (attemptData.id) {
                attemptToSet = attemptData
              }
              
              if (attemptToSet) {
                setExamAttempt(attemptToSet)
                console.log('Attempt set successfully:', attemptToSet)
              }
            } else {
              console.warn('Could not fetch attempt data:', attemptResponse.status)
            }
          } catch (error) {
            console.warn('Error fetching attempt:', error)
          }
        }
        
      } catch (err) {
        console.error('Error fetching exam:', err)
        setError('Có lỗi xảy ra khi tải dữ liệu đề thi')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExamAndAttempt()
  }, [examId, attemptId])

  const getGrade = (accuracy: number): string => {
    if (accuracy >= 90) return 'A+'
    if (accuracy >= 80) return 'A'
    if (accuracy >= 70) return 'B+'
    if (accuracy >= 60) return 'B'
    if (accuracy >= 50) return 'C+'
    if (accuracy >= 40) return 'C'
    if (accuracy >= 30) return 'D'
    return 'F'
  }

  const getFeedback = (accuracy: number): string => {
    if (accuracy >= 90) return 'Xuất sắc! Bạn đã nắm vững kiến thức về chủ đề này.'
    if (accuracy >= 80) return 'Tốt! Bạn có kiến thức vững chắc về chủ đề này.'
    if (accuracy >= 70) return 'Khá tốt! Bạn hiểu rõ hầu hết các khái niệm.'
    if (accuracy >= 60) return 'Đạt yêu cầu! Bạn có kiến thức cơ bản về chủ đề này.'
    if (accuracy >= 50) return 'Cần cải thiện! Hãy ôn tập thêm để nắm vững kiến thức.'
    if (accuracy >= 40) return 'Yếu! Bạn cần dành nhiều thời gian hơn để học tập.'
    return 'Rất yếu! Hãy xem lại toàn bộ kiến thức và làm lại bài thi.'
  }

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-600 bg-green-100 border-green-200'
      case 'B+':
      case 'B':
        return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'C+':
      case 'C':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'D':
        return 'text-orange-600 bg-orange-100 border-orange-200'
      case 'F':
        return 'text-red-600 bg-red-100 border-red-200'
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getScoreColor = (accuracy: number): string => {
    if (accuracy >= 80) return 'text-green-600'
    if (accuracy >= 60) return 'text-blue-600'
    if (accuracy >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Check session status
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Check if user is authenticated
  if (status === "unauthenticated" || !session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Bạn cần đăng nhập để xem kết quả
            </h3>
            <p className="text-gray-500 mb-4">
              Vui lòng đăng nhập để xem kết quả bài thi của bạn.
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/auth">
                  <User className="h-4 w-4 mr-2" />
                  Đăng nhập
                </Link>
              </Button>
              <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {error || 'Không thể hiển thị kết quả'}
            </h3>
            <p className="text-gray-500 mb-4">
              {error || 'Có lỗi xảy ra khi tải kết quả bài thi.'}
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

  // Use backend data if available, fallback to URL params
  const finalScore = examAttempt?.score || score
  const finalTotal = exam?.questions?.length || total
  const finalCorrect = examAttempt?.correctAnswers || correct
  const finalTimeSpent = examAttempt?.timeSpent || timeSpent
  
  const accuracy = finalTotal > 0 ? Math.round((finalCorrect / finalTotal) * 100) : 0
  const grade = getGrade(accuracy)
  const feedback = getFeedback(accuracy)
  const incorrectAnswers = finalTotal - finalCorrect

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Kết quả bài thi
          </h1>
          <p className="text-lg text-gray-600">
            {exam.title}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Result */}
          <div className="lg:col-span-2 space-y-6">
            {/* Score Card */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl">Kết quả của bạn</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Score */}
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2" style={{ color: getScoreColor(accuracy) }}>
                    {finalScore}
                  </div>
                  <div className="text-2xl text-gray-600 mb-4">
                    / {finalTotal} điểm
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-lg px-4 py-2 border-2 ${getGradeColor(grade)}`}
                  >
                    {grade}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Độ chính xác</span>
                    <span>{accuracy}%</span>
                  </div>
                  <Progress value={accuracy} className="h-3" />
                </div>

                {/* Feedback */}
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-gray-700">{feedback}</p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Stats */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Thống kê chi tiết
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Đúng</p>
                    <p className="text-xl font-bold text-green-600">{finalCorrect}</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Sai</p>
                    <p className="text-xl font-bold text-red-600">{incorrectAnswers}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Tổng câu</p>
                    <p className="text-xl font-bold text-blue-600">{finalTotal}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Thời gian làm</p>
                    <p className="text-xl font-bold text-purple-600">
                      {finalTimeSpent > 0 ? `${Math.floor(finalTimeSpent / 60)}:${(finalTimeSpent % 60).toString().padStart(2, '0')}` : `${exam.duration} phút`}
                    </p>
                  </div>
                </div>
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
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Làm lại bài thi
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Chia sẻ kết quả
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Tải báo cáo
                </Button>
              </CardContent>
            </Card>

            {/* Exam Info */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Thông tin đề thi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Loại đề thi:</span>
                  <Badge variant="secondary">{exam.type || 'N/A'}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mức độ:</span>
                  <Badge variant="outline">{exam.difficulty || 'N/A'}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Thời gian:</span>
                  <span className="font-medium">{exam.duration} phút</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Số câu hỏi:</span>
                  <span className="font-medium">{exam.questions?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ngày làm:</span>
                  <span className="font-medium">
                    {examAttempt?.completedAt 
                      ? new Date(examAttempt.completedAt).toLocaleDateString('vi-VN')
                      : new Date().toLocaleDateString('vi-VN')
                    }
                  </span>
                </div>
                {examAttempt?.status && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    <Badge 
                      variant={examAttempt.status === 'Completed' ? 'default' : 'secondary'}
                      className={examAttempt.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {examAttempt.status === 'Completed' ? 'Hoàn thành' : examAttempt.status}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 text-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/exams">
              <BookOpen className="h-4 w-4 mr-2" />
              Xem tất cả đề thi
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/exams/${examId}/take`}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Làm lại bài thi
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
