"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
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
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Square,
  Timer,
  User,
  FileText,
  Check,
  X,
  Brain,
  Zap,
  Sparkles,
  Award
} from "lucide-react"
import Link from "next/link"
import { Exam } from "@/types/global-type"

interface ExamAttempt {
  id: number
  userId: number
  examId: number
  score: number | null
  completedAt: Date | null
  answers: Record<number, number> // questionId -> selectedAnswerIndex
}

export default function TakeExamPage() {
  const params = useParams()
  const router = useRouter()
  const [exam, setExam] = useState<Exam | null>(null)
  const [questions, setQuestions] = useState<any[]>([])
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

        // Fetch questions
        const questionsResponse = await fetch(`http://localhost:8001/exams/${examId}/questions`)
        if (questionsResponse.ok) {
          const questionsData = await questionsResponse.json()
          console.log('Questions response:', questionsData)
          
          if (questionsData.data) {
            setQuestions(questionsData.data)
          } else if (questionsData.questions) {
            setQuestions(questionsData.questions)
          } else if (Array.isArray(questionsData)) {
            setQuestions(questionsData)
          } else {
            console.error('Unexpected questions response structure:', questionsData)
          }
        } else {
          console.error('Failed to fetch questions:', questionsResponse.status)
        }

      } catch (error) {
        console.error('Error fetching exam data:', error)
        setError('Không thể tải dữ liệu đề thi. Vui lòng thử lại.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchExamAndQuestions()
  }, [examId])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isStarted && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitExam()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isStarted, isPaused, timeLeft])

  const handleStartExam = () => {
    setIsStarted(true)
    setIsPaused(false)
  }

  const handlePauseExam = () => {
    setIsPaused(!isPaused)
  }

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsToShow.length - 1) {
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
      // Calculate score based on answered questions
      let correctAnswers = 0
      const totalQuestions = questionsToShow.length

      // Check answers against backend questions
      Object.keys(selectedAnswers).forEach((questionIndex) => {
        const index = parseInt(questionIndex)
        const question = questionsToShow[index]
        const selectedAnswer = selectedAnswers[index]

        if (question && question.answerOptions && question.answerOptions[selectedAnswer]) {
          // Check if selected answer is correct
          // Backend might use different field names, so we'll check multiple possibilities
          const selectedOption = question.answerOptions[selectedAnswer]
          if (selectedOption.isCorrect || selectedOption.correct || selectedOption.isCorrectAnswer) {
            correctAnswers++
          }
        }
      })

      const score = Math.round((correctAnswers / totalQuestions) * 100)

      console.log('Submitting exam with score:', score, 'correct:', correctAnswers, 'total:', totalQuestions)

      setIsSubmitted(true)

      // Redirect to results page after a short delay
      setTimeout(() => {
        router.push(`/exams/${examId}/results?score=${score}&total=${totalQuestions}&correct=${correctAnswers}`)
      }, 2000)

    } catch (error) {
      console.error('Error submitting exam:', error)
    }
  }

  const currentQuestion = exam?.questions?.[currentQuestionIndex]
  const totalQuestions = exam?.questions?.length || 0
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0
  const answeredQuestions = Object.keys(selectedAnswers).length

  // Use questions from backend, fallback to mock if needed
  const questionsToShow = questions.length > 0 ? questions : []
  const currentQuestionToShow = questionsToShow[currentQuestionIndex]
  const totalQuestionsToShow = questionsToShow.length

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    console.log('Rendering loading screen')
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
    console.log('Rendering error screen because:', { error, exam: !!exam })
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
                {error || 'Đề thi bạn đang tìm kiếm không tồ tại hoặc đã bị xóa.'}
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

  // Pre-exam screen
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900 mb-6 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại
          </Button>

          <Card className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <Sparkles className="h-8 w-8" />
                <h1 className="text-3xl font-bold">Exam Ready</h1>
                <Sparkles className="h-8 w-8" />
              </div>
              <p className="text-blue-100 text-lg">Bạn đã sẵn sàng bắt đầu làm bài thi chưa?</p>
            </div>

            <CardContent className="p-8">
              {/* Exam Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Tên đề thi</p>
                      <p className="font-semibold text-lg">{exam.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-500">Loại đề</p>
                      <p className="font-semibold text-lg">{exam.type || "CUSTOM"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Thời gian</p>
                      <p className="font-semibold text-lg">{exam.duration} phút</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Độ khó</p>
                      <Badge className={`px-3 py-1 rounded-full font-medium ${
                        exam.difficulty === "Easy" ? "bg-emerald-100 text-emerald-700 border-emerald-200" :
                        exam.difficulty === "Medium" ? "bg-amber-100 text-amber-700 border-amber-200" :
                        "bg-rose-100 text-rose-700 border-rose-200"
                      }`}>
                        {exam.difficulty}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Hướng dẫn làm bài
                </h3>
                <ul className="space-y-2 text-blue-800 text-sm">
                  <li>• Đọc kỹ câu hỏi trước khi chọn đáp án</li>
                  <li>• Bạn có thể quay lại sửa đáp án bất cứ lúc nào</li>
                  <li>• Bài thi sẽ tự động nộp khi hết thời gian</li>
                  <li>• Đảm bảo kết nối internet ổn định</li>
                </ul>
              </div>

              {/* Start Button */}
              <div className="text-center">
                <Button
                  onClick={() => {
                    console.log('Start button clicked!')
                    handleStartExam()
                  }}
                  size="lg"
                  className="px-12 py-4 text-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-bold transform hover:scale-105 transition-all duration-300"
                  disabled={questions.length === 0}
                >
                  <Play className="h-6 w-6 mr-3" />
                  {questions.length === 0 ? 'Đang tải câu hỏi...' : 'Bắt đầu làm bài'}
                </Button>
                {questions.length === 0 && (
                  <p className="text-gray-500 mt-3">Vui lòng đợi hệ thống tải câu hỏi...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Đã nộp bài thi thành công!
              </h3>
              <p className="text-gray-600 mb-6">
                Đang chuyển hướng đến trang kết quả...
              </p>
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  console.log('Rendering exam screen - final return')
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-6 rounded-xl"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        {/* Header */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{exam.title}</h1>
                <p className="text-gray-600">Câu hỏi {currentQuestionIndex + 1} / {totalQuestionsToShow}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer */}
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">
                <Timer className="h-5 w-5 text-red-600" />
                <span className={`font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-gray-700'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Pause/Resume */}
              <Button
                variant="outline"
                size="lg"
                onClick={handlePauseExam}
                className="min-w-[120px] rounded-xl"
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
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <span>Tiến độ làm bài</span>
              <span>{answeredQuestions} / {totalQuestionsToShow} câu đã trả lời</span>
            </div>
            <Progress value={progress} className="h-3 rounded-full" />
          </div>
        </div>

        {/* Question Card */}
        {currentQuestionToShow && (
          <Card className="border-0 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {currentQuestionIndex + 1}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">Câu hỏi {currentQuestionIndex + 1}</CardTitle>
                    <CardDescription className="text-gray-600">Chọn đáp án đúng nhất</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="px-3 py-1 rounded-full">
                  {currentQuestionToShow.points || 1} điểm
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Question Content */}
              <div className="mb-8">
                <p className="text-lg text-gray-800 leading-relaxed">
                  {currentQuestionToShow.content}
                </p>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {currentQuestionToShow.answerOptions?.map((option: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedAnswers[currentQuestionIndex] === index && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="font-medium text-gray-700">
                        {option.optionLabel}. {option.content}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            size="lg"
            className="rounded-xl px-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Câu trước
          </Button>

          <div className="flex items-center gap-3">
            <span className="text-gray-600">
              {currentQuestionIndex + 1} / {totalQuestionsToShow}
            </span>
          </div>

          {currentQuestionIndex === totalQuestionsToShow - 1 ? (
            <Button
              onClick={handleSubmitExam}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl px-8"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Nộp bài
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === totalQuestionsToShow - 1}
              variant="outline"
              size="lg"
              className="rounded-xl px-6"
            >
              Câu tiếp
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

