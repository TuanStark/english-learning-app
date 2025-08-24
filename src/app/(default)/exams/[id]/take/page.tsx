"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
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
  ArrowRight,
  Check,
  FileText,
  AlertCircle,
  Play,
  Pause,
  Timer,
  User,
  Calendar,
  Star
} from "lucide-react"
import Link from "next/link"
import { Exam } from "@/types/global-type"

interface AnswerOption {
  id: number
  questionId: number
  content: string
  isCorrect: boolean
  optionLabel: string
  createdAt: string
  updatedAt: string
}

interface Question {
  id: number
  examId: number
  content: string
  questionType: string
  orderIndex: number
  points: number
  createdAt: string
  updatedAt: string
  answerOptions: AnswerOption[]
}

export default function TakeExamPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [exam, setExam] = useState<Exam | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const examId = params?.id as string

  useEffect(() => {
    const fetchExamAndQuestions = async () => {
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
        console.log('Exam response structure:', {
          status: examResponse.status,
          ok: examResponse.ok,
          data: examData,
          hasData: !!examData.data,
          dataType: typeof examData.data,
          dataKeys: examData.data ? Object.keys(examData.data) : 'no data',
          'fullResponse': examData,
          'responseKeys': Object.keys(examData)
        })

        // Try different response structures
        let examToSet = null

        if (examData.data) {
          examToSet = examData.data
        } else if (examData.exam) {
          examToSet = examData.exam
        } else if (examData.id) {
          examToSet = examData
        } else {
          console.error('No exam data in response:', examData)
          setError('Không thể tải dữ liệu đề thi')
          return // Exit early if no exam data
        }

        if (examToSet) {
          setExam(examToSet)
          setTimeLeft(examToSet.duration * 60) // Convert minutes to seconds
          console.log('Exam set successfully:', examToSet)
        }

        // Fetch questions for this exam
        const questionsResponse = await fetch(`http://localhost:8001/questions/exam/${examId}`)
        if (questionsResponse.ok) {
          const questionsData = await questionsResponse.json()
          console.log('Questions response structure:', {
            status: questionsResponse.status,
            ok: questionsResponse.ok,
            data: questionsData,
            hasData: !!questionsData.data,
            dataType: typeof questionsData.data,
            isArray: Array.isArray(questionsData.data),
            length: questionsData.data ? questionsData.data.length : 'no data',
            'fullResponse': questionsData,
            'responseKeys': Object.keys(questionsData)
          })

          // Try different response structures for questions
          let questionsToSet = null

          if (questionsData.data && Array.isArray(questionsData.data)) {
            questionsToSet = questionsData.data
          } else if (questionsData.questions && Array.isArray(questionsData.questions)) {
            questionsToSet = questionsData.questions
          } else if (Array.isArray(questionsData)) {
            questionsToSet = questionsData
          } else {
            console.warn('No questions data or invalid format:', questionsData)
          }

          if (questionsToSet) {
            setQuestions(questionsToSet)
            console.log('Questions set successfully:', questionsToSet.length, 'questions')
          }
        } else {
          console.warn('Could not fetch questions, status:', questionsResponse.status)
        }

      } catch (err) {
        console.error('Error fetching exam:', err)
        setError('Có lỗi xảy ra khi tải dữ liệu đề thi')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExamAndQuestions()
  }, [examId])

  // Timer effect
  useEffect(() => {
    if (!isStarted || isPaused || isSubmitted || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isStarted, isPaused, isSubmitted, timeLeft])

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmitExam = async () => {
    if (!exam) return

    try {
      // Get user ID from session
      if (!session?.user?.id) {
        throw new Error('Bạn cần đăng nhập để làm bài thi')
      }
      
      const userId = parseInt(session.user.id as string)
      console.log('Using user ID from session:', userId)

      // Create exam attempt
      const attemptResponse = await fetch('http://localhost:8001/exam-attempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          examId: parseInt(examId as string),
          totalQuestions: questions.length,
          status: 'InProgress',
          timeSpent: 0,
          correctAnswers: 0,
        }),
      })

      if (!attemptResponse.ok) {
        const errorText = await attemptResponse.text()
        console.error('Attempt creation failed:', attemptResponse.status, errorText)
        throw new Error(`Failed to create exam attempt: ${attemptResponse.status} - ${errorText}`)
      }

      const attemptData = await attemptResponse.json()
      console.log('Attempt creation response:', attemptData)
      
      const attemptId = attemptData.data?.id || attemptData.id
      if (!attemptId) {
        throw new Error('No attempt ID received from backend')
      }
      console.log('Attempt ID:', attemptId)

      // Prepare answers for submission
      const answers = Object.keys(selectedAnswers).map((questionIndex) => {
        const index = parseInt(questionIndex)
        const question = questions[index]
        const selectedAnswer = selectedAnswers[index]
        
        return {
          questionId: question.id,
          selectedOption: question.answerOptions[selectedAnswer]?.optionLabel || '',
        }
      })

      // Submit exam with answers
      console.log('Submitting answers:', answers)
      
      const submitResponse = await fetch(`http://localhost:8001/exam-attempts/${attemptId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })

      if (!submitResponse.ok) {
        const errorText = await submitResponse.text()
        console.error('Submit response not ok:', submitResponse.status, errorText)
        throw new Error(`Failed to submit exam: ${submitResponse.status} - ${errorText}`)
      }

      const submitData = await submitResponse.json()
      console.log('Submit response:', submitData)
      
      const score = submitData.data?.score || 0
      const correctAnswers = submitData.data?.correctAnswers || 0

      console.log('Exam submitted successfully:', submitData)

      setIsSubmitted(true)

      // Redirect to results page after a short delay
      setTimeout(() => {
        const params = new URLSearchParams({
          score: score.toString(),
          correct: correctAnswers.toString(),
          total: questions.length.toString(),
          time: (exam.duration * 60 - timeLeft).toString(),
          attemptId: attemptId.toString(),
        })
        router.push(`/exams/${examId}/results?${params.toString()}`)
      }, 2000)

    } catch (error) {
      console.error('Error submitting exam:', error)
      // Fallback to local calculation if backend fails
      let correctAnswers = 0
      const totalQuestions = questions.length

      Object.keys(selectedAnswers).forEach((questionIndex) => {
        const index = parseInt(questionIndex)
        const question = questions[index]
        const selectedAnswer = selectedAnswers[index]

        if (question && question.answerOptions && question.answerOptions[selectedAnswer]) {
          const selectedOption = question.answerOptions[selectedAnswer]
          if (selectedOption.isCorrect) {
            correctAnswers++
          }
        }
      })

      const score = Math.round((correctAnswers / totalQuestions) * 100)

      setIsSubmitted(true)

      setTimeout(() => {
        const params = new URLSearchParams({
          score: score.toString(),
          correct: correctAnswers.toString(),
          total: totalQuestions.toString(),
          time: (exam.duration * 60 - timeLeft).toString(),
        })
        router.push(`/exams/${examId}/results?${params.toString()}`)
      }, 2000)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0
  const answeredQuestions = Object.keys(selectedAnswers).length

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
              Bạn cần đăng nhập để làm bài thi
            </h3>
            <p className="text-gray-500 mb-4">
              Vui lòng đăng nhập để tiếp tục làm bài thi.
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

  if (!isStarted) {
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

          {/* Exam Instructions */}
          <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl">{exam.title}</CardTitle>
              <CardDescription className="text-lg">
                Chuẩn bị làm bài thi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Exam Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-blue-600">Thời gian</p>
                  <p className="text-lg font-semibold text-blue-900">{exam.duration} phút</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-600">Số câu hỏi</p>
                  <p className="text-lg font-semibold text-green-900">{questions.length}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-purple-600">Điểm tối đa</p>
                  <p className="text-lg font-semibold text-purple-900">{questions.length * 10}</p>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Hướng dẫn làm bài:</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Đọc kỹ câu hỏi trước khi chọn đáp án</li>
                  <li>• Bạn có thể quay lại câu hỏi trước đó để sửa đáp án</li>
                  <li>• Thời gian làm bài sẽ được tính từ khi bắt đầu</li>
                  <li>• Bài thi sẽ tự động nộp khi hết thời gian</li>
                </ul>
              </div>

              {/* Start Button */}
              <div className="text-center space-y-3">
                <Button
                  onClick={() => {
                    console.log('Start button clicked!')
                    setIsStarted(true)
                    console.log('Setting isStarted to true')
                  }}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
                  disabled={questions.length === 0}
                >
                  <Play className="h-5 w-5 mr-2" />
                  {questions.length === 0 ? 'Đang tải câu hỏi...' : 'Bắt đầu làm bài'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Đã nộp bài thành công!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Bài thi của bạn đã được ghi nhận và đang được chấm điểm.
            </p>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-neutral-200/50 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{exam.title}</h1>
                <p className="text-sm text-gray-600">Câu hỏi {currentQuestionIndex + 1} / {questions.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Timer */}
              <div className="flex items-center gap-2 bg-red-50 px-3 py-2 rounded-lg">
                <Timer className="h-4 w-4 text-red-600" />
                <span className="text-red-600 font-mono font-semibold">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Pause/Resume */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className="min-w-[100px]"
              >
                {isPaused ? (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Tiếp tục
                  </>
                ) : (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Tạm dừng
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Tiến độ: {currentQuestionIndex + 1} / {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question */}
        {questions.length > 0 ? (
          <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Câu hỏi {currentQuestionIndex + 1}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {questions[currentQuestionIndex]?.questionType || 'Multiple Choice'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question Content */}
              <div className="prose max-w-none">
                <p className="text-lg text-gray-900 leading-relaxed">
                  {questions[currentQuestionIndex]?.content || 'Không có nội dung câu hỏi'}
                </p>
              </div>

              {/* Answer Options */}
              {questions[currentQuestionIndex]?.answerOptions && questions[currentQuestionIndex].answerOptions.length > 0 ? (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Chọn đáp án:</h4>
                  {questions[currentQuestionIndex].answerOptions.map((option: AnswerOption, index: number) => (
                    <div
                      key={index}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedAnswers[currentQuestionIndex] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${selectedAnswers[currentQuestionIndex] === index
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-300 text-gray-600'
                          }`}>
                          {selectedAnswers[currentQuestionIndex] === index ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </div>
                        <span className="text-gray-900">{option.content || `Đáp án ${String.fromCharCode(65 + index)}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Không có đáp án nào cho câu hỏi này</p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm mb-6">
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không có câu hỏi nào
              </h3>
              <p className="text-gray-500 mb-4">
                Đề thi này chưa có câu hỏi nào hoặc đang gặp sự cố khi tải dữ liệu.
              </p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Thử lại
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className="min-w-[120px]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Câu trước
          </Button>

          <div className="flex items-center gap-2">
            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                className="min-w-[120px]"
              >
                Câu tiếp
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmitExam}
                className="min-w-[120px] bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Nộp bài
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

