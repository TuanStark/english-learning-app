"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Play, Pause, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Exam {
  id: number
  title: string
  description: string
  type: string
  duration: number
  difficulty: string
  isActive: boolean
  questions: Question[]
}

interface Question {
  id: number
  content: string
  questionType: string
  orderIndex: number
  points: number
  answerOptions: AnswerOption[]
}

interface AnswerOption {
  id: number
  content: string
  isCorrect: boolean
  optionLabel: string
}

export default function TakeExamPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const [exam, setExam] = useState<Exam | null>(null)
  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [isStarted, setIsStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [examAttemptId, setExamAttemptId] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  const examId = params?.id as string

  // Helper function to convert selectedAnswers to backend format
  const convertAnswersToBackendFormat = (answers: Record<number, number>) => {
    return Object.entries(answers).map(([questionIndex, answerIndex]) => {
      const question = questions[parseInt(questionIndex)]
      return {
        questionId: question.id,
        selectedOption: question.answerOptions[answerIndex]?.optionLabel || String.fromCharCode(65 + answerIndex)
      }
    })
  }

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await fetch(`http://localhost:8001/exams/${examId}`)
        if (response.ok) {
          const examData = await response.json()
          console.log('Exam response:', examData)
          setExam(examData)
          setTimeLeft(examData.duration * 60) // Convert minutes to seconds
          
          // Fetch questions for this exam
          const questionsResponse = await fetch(`http://localhost:8001/exams/${examId}/questions`)
          if (questionsResponse.ok) {
            const questionsData = await questionsResponse.json()
            console.log('Questions response:', questionsData)
            setQuestions(questionsData)
          } else {
            console.error('Failed to fetch questions:', questionsResponse.status)
          }
        } else {
          console.error('Failed to fetch exam:', response.status)
          setError('Failed to load exam')
        }
      } catch (error) {
        console.error('Error fetching exam:', error)
        setError('Error loading exam')
      } finally {
        setIsLoading(false)
      }
    }

    if (examId) {
      fetchExam()
    }
  }, [examId])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isStarted && !isPaused && !isSubmitted && timeLeft > 0) {
              interval = setInterval(() => {
          setTimeLeft((prev: number) => {
            if (prev <= 1) {
              // Time's up, auto-submit
              handleSubmitExam()
              return 0
            }
            return prev - 1
          })
        }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isStarted, isPaused, timeLeft])

  // Create exam attempt when starting
  const createExamAttempt = async () => {
    if (!exam || !session?.user?.id) return

    try {
      const response = await fetch('http://localhost:8001/exam-attempts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parseInt(session.user.id),
          examId: parseInt(examId),
          totalQuestions: questions.length,
          status: 'InProgress',
          detailedResult: JSON.stringify({ answers: {} })
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Attempt response:', data)
        if (data.data?.id) {
          setExamAttemptId(data.data.id)
          console.log('Attempt set successfully:', data.data)
        }
      }
    } catch (error) {
      console.error('Error creating exam attempt:', error)
    }
  }

  const handleStartExam = async () => {
    await createExamAttempt()
    setIsStarted(true)
    setIsPaused(false)
    setStartTime(new Date())
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

    setIsSubmitting(true)
    console.log('Starting exam submission...')

    try {
      // Calculate score
      let correctAnswers = 0
      const totalQuestions = questionsToShow.length

      for (let i = 0; i < totalQuestions; i++) {
        const selectedAnswer = selectedAnswers[i]
        if (selectedAnswer !== undefined) {
          const question = questionsToShow[i]
          if (question && question.answerOptions && question.answerOptions[selectedAnswer]) {
            // Check if selected answer is correct
            const selectedOption = question.answerOptions[selectedAnswer]
            if (selectedOption.isCorrect) {
              correctAnswers++
            }
          }
        }
      }

      const score = Math.round((correctAnswers / totalQuestions) * 100)
      const timeSpent = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0

      console.log('Submitting exam with score:', score, 'correct:', correctAnswers, 'total:', totalQuestions)

      // Convert answers to backend format
      const answersArray = convertAnswersToBackendFormat(selectedAnswers)
      console.log('Submitting answers in backend format:', answersArray)

      // Submit to backend
      if (examAttemptId) {
        const submitResponse = await fetch(`http://localhost:8001/exam-attempts/${examAttemptId}/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers: answersArray,
            timeSpent: timeSpent
          }),
        })

        if (submitResponse.ok) {
          const submitData = await submitResponse.json()
          console.log('Exam submitted successfully:', submitData)
          
          // Get score from backend response
          const backendScore = submitData.data?.score || score
          const backendCorrect = submitData.data?.correctAnswers || correctAnswers
          
          setIsSubmitted(true)
          setIsSubmitting(false)

          // Redirect to results page
          router.push(`/exams/${examId}/results?attemptId=${examAttemptId}&score=${backendScore}&total=${totalQuestions}&correct=${backendCorrect}&time=${timeSpent}`)
        } else {
          console.error('Failed to submit exam:', submitResponse.status)
          // Fallback redirect
          setIsSubmitted(true)
          setIsSubmitting(false)
          router.push(`/exams/${examId}/results?score=${score}&total=${totalQuestions}&correct=${correctAnswers}&time=${timeSpent}`)
        }
      } else {
        // No attempt ID, redirect without it
        setIsSubmitted(true)
        setIsSubmitting(false)
        router.push(`/exams/${examId}/results?score=${score}&total=${totalQuestions}&correct=${correctAnswers}&time=${timeSpent}`)
      }

    } catch (error) {
      console.error('Error submitting exam:', error)
      setIsSubmitting(false)
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
        </div>
      </div>
    )
  }

  // Check if user is authenticated
  if (sessionStatus === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-6"></div>
              <p className="text-gray-600 text-lg">Đang kiểm tra đăng nhập...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto">
              <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Cần đăng nhập
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Bạn cần đăng nhập để làm bài thi này.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                  <Link href="/auth">
                    Đăng nhập ngay
                  </Link>
                </Button>
                <Button onClick={() => router.back()} variant="outline" className="w-full rounded-xl">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
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
                {error || 'Không tìm thấy bài thi'}
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                {error || 'Bài thi này không tồn tại hoặc đã bị xóa.'}
              </p>
              <Button onClick={() => router.back()} variant="outline" className="w-full rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {exam.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {exam.description}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Thời gian: {exam.duration} phút</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">Số câu hỏi: {totalQuestionsToShow}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary">{exam.difficulty}</Badge>
                  <span className="text-gray-700">Độ khó</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{exam.type}</Badge>
                  <span className="text-gray-700">Loại bài thi</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Hướng dẫn:</h3>
                <ul className="text-gray-600 space-y-2 text-sm">
                  <li>• Đọc kỹ câu hỏi trước khi trả lời</li>
                  <li>• Bạn có thể quay lại sửa câu trả lời</li>
                  <li>• Bài thi sẽ tự động nộp khi hết thời gian</li>
                  <li>• Không thể thoát khỏi bài thi khi đã bắt đầu</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleStartExam}
                className="px-8 py-3 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Play className="h-5 w-5 mr-2" />
                Bắt đầu làm bài
              </Button>
            </div>
          </div>
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
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Đã nộp bài thi
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Bài thi của bạn đã được nộp thành công. Đang chuyển hướng đến trang kết quả...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{exam.title}</h1>
              <p className="text-gray-600">Câu hỏi {currentQuestionIndex + 1} / {totalQuestionsToShow}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="font-mono text-lg font-semibold text-gray-900">
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              <Button
                onClick={handlePauseExam}
                variant="outline"
                size="sm"
                className="rounded-xl"
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

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Tiến độ: {answeredQuestions} / {totalQuestionsToShow} câu đã trả lời</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Câu {currentQuestionIndex + 1}: {currentQuestionToShow?.content}
            </h2>
            
            <div className="space-y-3">
              {currentQuestionToShow?.answerOptions?.map((option: AnswerOption, optionIndex: number) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(currentQuestionIndex, optionIndex)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedAnswers[currentQuestionIndex] === optionIndex
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestionIndex] === optionIndex
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestionIndex] === optionIndex && (
                        <div className="w-3 h-3 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="font-medium">{option.optionLabel}.</span>
                    <span>{option.content}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="rounded-xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Câu trước
            </Button>

            <div className="flex space-x-3">
              {Array.from({ length: totalQuestionsToShow }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-10 h-10 rounded-lg border-2 text-sm font-medium transition-all ${
                    index === currentQuestionIndex
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : selectedAnswers[index] !== undefined
                      ? 'border-green-500 bg-green-100 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <div className="flex space-x-3">
              {currentQuestionIndex < totalQuestionsToShow - 1 ? (
                <Button
                  onClick={handleNextQuestion}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Câu tiếp
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitExam}
                  disabled={isSubmitting}
                  className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang nộp bài...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Nộp bài
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

