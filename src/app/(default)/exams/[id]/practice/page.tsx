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
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Trophy,
  Star,
  BarChart3,
  FileText,
  User,
  Calendar,
  Award,
  RefreshCw,
  Eye,
  Clock,
  Target,
  Play,
  Pause,
  RotateCcw,
  Check,
  X,
  Bot,
  MessageCircle,
  Lightbulb,
  HelpCircle,
  Send,
  Sparkles,
  Brain,
  Zap
} from "lucide-react"
import Link from "next/link"
import { Exam } from "@/types/global-type"

interface Question {
  id: number
  content: string
  questionType: string
  orderIndex: number
  points: number
  answerOptions: {
    id: number
    content: string
    isCorrect: boolean
    optionLabel: string
  }[]
}

interface Answer {
  questionId: number
  selectedOption: string | null
  isCorrect: boolean
}

export default function ExamPracticePage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [exam, setExam] = useState<Exam | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // AI Tutor states
  const [showAITutor, setShowAITutor] = useState(false)
  const [aiExplanation, setAiExplanation] = useState<string>('')
  const [aiLoading, setAiLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', content: string}>>([])
  const [chatInput, setChatInput] = useState('')
  const [showHints, setShowHints] = useState(false)

  const examId = params?.id as string
  const currentQuestion = questions[currentQuestionIndex]

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

        // Fetch questions
        const questionsResponse = await fetch(`http://localhost:8001/exams/${examId}/questions`)
        if (!questionsResponse.ok) {
          throw new Error(`HTTP error! status: ${questionsResponse.status}`)
        }
        
        const questionsData = await questionsResponse.json()
        console.log('Questions response:', questionsData)
        
        // Handle both ResponseData format and direct response
        let questionsToSet = []
        if (questionsData.data) {
          questionsToSet = questionsData.data
        } else if (Array.isArray(questionsData)) {
          questionsToSet = questionsData
        }
        
        if (questionsToSet && questionsToSet.length > 0) {
          setQuestions(questionsToSet)
          console.log('Questions set successfully:', questionsToSet)
        } else {
          setError('Không thể tải câu hỏi')
          return
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

  const handleAnswerSelect = (optionLabel: string) => {
    if (showResults) return // Don't allow changes after showing results
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionLabel
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

  const handleSubmitPractice = () => {
    setShowResults(true)
  }

  const handleResetPractice = () => {
    setAnswers({})
    setCurrentQuestionIndex(0)
    setShowResults(false)
    setShowAITutor(false)
    setAiExplanation('')
    setChatMessages([])
    setShowHints(false)
  }

  // AI Tutor functions
  const getAIExplanation = async (questionId: number) => {
    if (!currentQuestion) return
    
    setAiLoading(true)
    try {
      // Simulate AI API call - replace with actual AI service
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockExplanation = `Đây là câu hỏi về ${currentQuestion.questionType === 'MultipleChoice' ? 'trắc nghiệm' : 'tự luận'}. 

**Phân tích câu hỏi:**
${currentQuestion.content}

**Gợi ý giải:**
- Đọc kỹ câu hỏi và các lựa chọn
- Loại bỏ các đáp án rõ ràng sai
- Chú ý đến từ khóa quan trọng
- Xem xét ngữ cảnh và ngữ pháp

**Mẹo làm bài:**
- Nếu không chắc chắn, hãy chọn đáp án có vẻ hợp lý nhất
- Đọc lại câu hỏi sau khi chọn đáp án
- Chú ý đến thì của động từ và chủ ngữ

Bạn có câu hỏi gì về câu này không?`
      
      setAiExplanation(mockExplanation)
    } catch (error) {
      console.error('Error getting AI explanation:', error)
      setAiExplanation('Xin lỗi, tôi không thể tạo lời giải thích lúc này. Vui lòng thử lại sau.')
    } finally {
      setAiLoading(false)
    }
  }

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return
    
    const userMessage = chatInput.trim()
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setChatInput('')
    
    // Simulate AI response
    setAiLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const aiResponse = `Tôi hiểu câu hỏi của bạn: "${userMessage}"

Dựa trên câu hỏi hiện tại, tôi có thể giúp bạn:
- Giải thích chi tiết về ngữ pháp
- Phân tích các lựa chọn đáp án
- Đưa ra mẹo làm bài hiệu quả
- Giải thích tại sao đáp án này đúng/sai

Bạn muốn tôi giải thích điều gì cụ thể?`
      
      setChatMessages(prev => [...prev, { role: 'ai', content: aiResponse }])
    } catch (error) {
      console.error('Error sending chat message:', error)
      setChatMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'Xin lỗi, tôi không thể trả lời lúc này. Vui lòng thử lại sau.' 
      }])
    } finally {
      setAiLoading(false)
    }
  }

  const getHints = () => {
    if (!currentQuestion) return []
    
    const hints = [
      "Đọc kỹ câu hỏi và xác định từ khóa chính",
      "Loại bỏ các đáp án rõ ràng không phù hợp",
      "Chú ý đến ngữ pháp và thì của động từ",
      "Xem xét ngữ cảnh và ý nghĩa của câu",
      "Nếu không chắc, hãy chọn đáp án có vẻ hợp lý nhất"
    ]
    
    return hints
  }

  const getAnswerResult = (questionId: number): Answer => {
    const selectedOption = answers[questionId]
    const question = questions.find(q => q.id === questionId)
    
    if (!question || !selectedOption) {
      return { questionId, selectedOption: null, isCorrect: false }
    }
    
    const correctOption = question.answerOptions.find(opt => opt.isCorrect)
    const isCorrect = correctOption?.optionLabel === selectedOption
    
    return { questionId, selectedOption, isCorrect }
  }

  const getScore = () => {
    if (questions.length === 0) return { correct: 0, total: 0, percentage: 0 }
    
    let correct = 0
    questions.forEach(question => {
      const result = getAnswerResult(question.id)
      if (result.isCorrect) correct++
    })
    
    const total = questions.length
    const percentage = Math.round((correct / total) * 100)
    
    return { correct, total, percentage }
  }

  const getGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B+'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C+'
    if (percentage >= 40) return 'C'
    if (percentage >= 30) return 'D'
    return 'F'
  }

  const getFeedback = (percentage: number): string => {
    if (percentage >= 90) return 'Xuất sắc! Bạn đã nắm vững kiến thức về chủ đề này.'
    if (percentage >= 80) return 'Tốt! Bạn có kiến thức vững chắc về chủ đề này.'
    if (percentage >= 70) return 'Khá tốt! Bạn hiểu rõ hầu hết các khái niệm.'
    if (percentage >= 60) return 'Đạt yêu cầu! Bạn có kiến thức cơ bản về chủ đề này.'
    if (percentage >= 50) return 'Cần cải thiện! Hãy ôn tập thêm để nắm vững kiến thức.'
    if (percentage >= 40) return 'Yếu! Bạn cần dành nhiều thời gian hơn để học tập.'
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

  const getScoreColor = (percentage: number): string => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-blue-600'
    if (percentage >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Check session status
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Bạn cần đăng nhập để làm bài thi
            </h3>
            <p className="text-gray-500 mb-4">
              Vui lòng đăng nhập để làm bài thi thực hành.
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

  if (error || !exam || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {error || 'Không thể hiển thị đề thi'}
            </h3>
            <p className="text-gray-500 mb-4">
              {error || 'Có lỗi xảy ra khi tải đề thi thực hành.'}
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

  const score = getScore()
  const grade = getGrade(score.percentage)
  const feedback = getFeedback(score.percentage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Thực hành
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            {exam.title}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Chế độ thực hành - Không giới hạn thời gian
          </p>
        </div>

        {!showResults ? (
          /* Practice Mode */
          <div className="space-y-6">
            {/* Progress */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-sm">
                      Câu {currentQuestionIndex + 1} / {questions.length}
                    </Badge>
                    <div className="text-sm text-gray-600">
                      {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% hoàn thành
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600">
                      Đã trả lời: {Object.keys(answers).length} / {questions.length}
                    </div>
                    <Button
                      onClick={() => setShowAITutor(!showAITutor)}
                      variant="outline"
                      size="sm"
                      className="ml-4"
                    >
                      <Bot className="h-4 w-4 mr-2" />
                      AI Tutor
                    </Button>
                  </div>
                </div>
                <Progress 
                  value={((currentQuestionIndex + 1) / questions.length) * 100} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            {/* Question Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          Câu hỏi {currentQuestionIndex + 1}
                        </CardTitle>
                        <CardDescription>
                          {currentQuestion?.questionType === 'MultipleChoice' ? 'Chọn một đáp án đúng' : 'Trả lời câu hỏi'}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setShowHints(!showHints)}
                          variant="outline"
                          size="sm"
                        >
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Gợi ý
                        </Button>
                        <Button
                          onClick={() => getAIExplanation(currentQuestion?.id || 0)}
                          variant="outline"
                          size="sm"
                          disabled={aiLoading}
                        >
                          {aiLoading ? (
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Brain className="h-4 w-4 mr-2" />
                          )}
                          AI Giải thích
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Question Content */}
                    <div className="text-lg text-gray-800 leading-relaxed">
                      {currentQuestion?.content}
                    </div>

                    {/* Hints */}
                    {showHints && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="h-5 w-5 text-yellow-600" />
                          <h4 className="font-semibold text-yellow-800">Gợi ý làm bài</h4>
                        </div>
                        <ul className="space-y-2">
                          {getHints().map((hint, index) => (
                            <li key={index} className="text-sm text-yellow-700 flex items-start gap-2">
                              <span className="text-yellow-600 mt-1">•</span>
                              <span>{hint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Answer Options */}
                    <div className="space-y-3">
                      {currentQuestion?.answerOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswerSelect(option.optionLabel)}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                            answers[currentQuestion.id] === option.optionLabel
                              ? 'border-blue-500 bg-blue-50 text-blue-900'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              answers[currentQuestion.id] === option.optionLabel
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {answers[currentQuestion.id] === option.optionLabel && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="font-medium">{option.optionLabel}.</span>
                            <span>{option.content}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Tutor Panel */}
              <div className="lg:col-span-1">
                {showAITutor && (
                  <Card className="border-0 shadow-soft bg-gradient-to-br from-purple-50 to-blue-50 backdrop-blur-sm h-fit">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Bot className="h-5 w-5 text-purple-600" />
                        AI Tutor
                      </CardTitle>
                      <CardDescription>
                        Trợ lý AI giúp bạn học tập hiệu quả
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* AI Explanation */}
                      {aiExplanation && (
                        <div className="bg-white rounded-lg p-4 border border-purple-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-4 w-4 text-purple-600" />
                            <h4 className="font-semibold text-purple-800">Giải thích AI</h4>
                          </div>
                          <div className="text-sm text-gray-700 whitespace-pre-line">
                            {aiExplanation}
                          </div>
                        </div>
                      )}

                      {/* Chat Interface */}
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-3 border border-purple-200 max-h-48 overflow-y-auto">
                          {chatMessages.length === 0 ? (
                            <div className="text-center text-gray-500 text-sm py-4">
                              <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                              <p>Hỏi AI về câu hỏi này</p>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {chatMessages.map((message, index) => (
                                <div
                                  key={index}
                                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                  <div
                                    className={`max-w-[80%] p-2 rounded-lg text-sm ${
                                      message.role === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 text-gray-800'
                                    }`}
                                  >
                                    {message.content}
                                  </div>
                                </div>
                              ))}
                              {aiLoading && (
                                <div className="flex justify-start">
                                  <div className="bg-gray-100 p-2 rounded-lg text-sm">
                                    <div className="flex items-center gap-2">
                                      <RefreshCw className="h-3 w-3 animate-spin" />
                                      AI đang suy nghĩ...
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Chat Input */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                            placeholder="Hỏi AI về câu hỏi này..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            disabled={aiLoading}
                          />
                          <Button
                            onClick={sendChatMessage}
                            size="sm"
                            disabled={!chatInput.trim() || aiLoading}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => getAIExplanation(currentQuestion?.id || 0)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                          disabled={aiLoading}
                        >
                          <Brain className="h-4 w-4 mr-2" />
                          Giải thích chi tiết
                        </Button>
                        <Button
                          onClick={() => setShowHints(!showHints)}
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Lightbulb className="h-4 w-4 mr-2" />
                          {showHints ? 'Ẩn' : 'Hiện'} gợi ý
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Câu trước
              </Button>

              <div className="flex items-center gap-2">
                {Object.keys(answers).length === questions.length && (
                  <Button
                    onClick={handleSubmitPractice}
                    className="bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Kiểm tra kết quả
                  </Button>
                )}
              </div>

              <Button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                variant="outline"
              >
                Câu tiếp
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            </div>
          </div>
        ) : (
          /* Results Mode */
          <div className="space-y-6">
            {/* Score Card */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl">Kết quả thực hành</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Score */}
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2" style={{ color: getScoreColor(score.percentage) }}>
                    {score.correct}
                  </div>
                  <div className="text-2xl text-gray-600 mb-4">
                    / {score.total} câu đúng
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-lg px-4 py-2 border-2 ${getGradeColor(grade)}`}
                  >
                    {grade} - {score.percentage}%
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Độ chính xác</span>
                    <span>{score.percentage}%</span>
                  </div>
                  <Progress value={score.percentage} className="h-3" />
                </div>

                {/* Feedback */}
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-gray-700">{feedback}</p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Chi tiết từng câu hỏi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const result = getAnswerResult(question.id)
                    const correctOption = question.answerOptions.find(opt => opt.isCorrect)
                    
                    return (
                      <div key={question.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-gray-900">
                            Câu {index + 1}: {question.content}
                          </h4>
                          <div className="flex items-center gap-2">
                            {result.selectedOption ? (
                              result.isCorrect ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <X className="h-5 w-5 text-red-600" />
                              )
                            ) : (
                              <AlertCircle className="h-5 w-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium text-gray-600">Đáp án của bạn: </span>
                            <span className={result.selectedOption ? (result.isCorrect ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}>
                              {result.selectedOption || 'Chưa trả lời'}
                            </span>
                          </div>
                          
                          {!result.isCorrect && correctOption && (
                            <div className="text-sm">
                              <span className="font-medium text-gray-600">Đáp án đúng: </span>
                              <span className="text-green-600">{correctOption.optionLabel}. {correctOption.content}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4">
              <Button
                onClick={handleResetPractice}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Làm lại
              </Button>
              <Button asChild>
                <Link href={`/exams/${examId}/take`}>
                  <Play className="h-4 w-4 mr-2" />
                  Làm thi thật
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/exams">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Xem tất cả đề thi
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
