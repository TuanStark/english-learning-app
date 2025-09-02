"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft,
  BookOpen,
  Play,
  Volume2,
  CheckCircle,
  XCircle,
  Star,
  Clock,
  Target,
  Brain,
  Zap,
  Sparkles,
  Eye,
  Heart,
  Share2,
  Download,
  Bookmark,
  RotateCcw,
  Shuffle,
  Settings,
  Lightbulb,
  MessageCircle,
  FileText,
  Award
} from "lucide-react"
import Link from "next/link"
import { useGrammar } from '@/hooks/useGrammar'
import { grammarApi, type Grammar } from '@/lib/api'

export default function GrammarDetailPage() {
  const params = useParams()
  const grammarId = parseInt(params?.id as string)
  
  const { grammarLessons, loading, error } = useGrammar()
  const [selectedGrammar, setSelectedGrammar] = useState<Grammar | null>(null)
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [progress, setProgress] = useState(0)
  const [learningMode, setLearningMode] = useState<'lesson' | 'quiz' | 'practice'>('lesson')

  // Find the grammar lesson
  const grammar = grammarLessons.find(g => g.id === grammarId)

  useEffect(() => {
    if (grammar) {
      setSelectedGrammar(grammar)
    }
  }, [grammar])

  const handleNextExample = () => {
    // Mock examples for now - in real app, this would come from backend
    setCurrentExampleIndex(prev => prev + 1)
  }

  const handlePreviousExample = () => {
    setCurrentExampleIndex(prev => Math.max(0, prev - 1))
  }

  const handleCheckAnswer = () => {
    // Mock answer checking - in real app, this would validate against backend
    const correct = userAnswer.toLowerCase().includes('correct')
    setIsCorrect(correct)
    if (correct) {
      setProgress(prev => Math.min(100, prev + 20))
    }
  }

  const handleShuffle = () => {
    setCurrentExampleIndex(0)
    setProgress(0)
    setShowAnswer(false)
    setUserAnswer("")
    setIsCorrect(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "Medium":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "Hard":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  // Mock examples - in real app, this would come from backend
  const mockExamples = [
    {
      id: 1,
      sentence: "I have been studying English for 5 years.",
      explanation: "Present Perfect Continuous - diễn tả hành động bắt đầu trong quá khứ và vẫn tiếp tục đến hiện tại",
      vietnamese: "Tôi đã học tiếng Anh được 5 năm rồi."
    },
    {
      id: 2,
      sentence: "She has lived in London since 2020.",
      explanation: "Present Perfect - diễn tả hành động bắt đầu trong quá khứ và kết quả vẫn còn ở hiện tại",
      vietnamese: "Cô ấy đã sống ở London từ năm 2020."
    },
    {
      id: 3,
      sentence: "They have just finished their homework.",
      explanation: "Present Perfect với 'just' - diễn tả hành động vừa mới hoàn thành",
      vietnamese: "Họ vừa mới hoàn thành bài tập về nhà."
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bài ngữ pháp...</p>
        </div>
      </div>
    )
  }

  if (error || !selectedGrammar) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-32 w-32 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Không thể tải bài ngữ pháp</h2>
          <p className="text-gray-600 mt-2">{error || "Không tìm thấy bài ngữ pháp"}</p>
          <Button asChild className="mt-4">
            <Link href="/grammar">Quay lại Grammar</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/grammar">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại Grammar
            </Link>
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent">
                    {selectedGrammar.title}
                </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    {selectedGrammar.content.substring(0, 100)}...
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{selectedGrammar.orderIndex}</div>
                  <div className="text-sm text-gray-600">Thứ tự</div>
                  </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{Math.round(progress)}%</div>
                  <div className="text-sm text-gray-600">Tiến độ</div>
                  </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{mockExamples.length}</div>
                  <div className="text-sm text-gray-600">Ví dụ</div>
                  </div>
                <div className="text-center">
                  <Badge className={getDifficultyColor(selectedGrammar.difficultyLevel)}>
                    {selectedGrammar.difficultyLevel}
                  </Badge>
                </div>
              </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-900">Tiến độ học tập</span>
                <span className="text-sm text-gray-600">{currentExampleIndex + 1} / {mockExamples.length}</span>
                  </div>
              <Progress value={progress} className="h-3 bg-gray-200">
                <div 
                  className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-pink-600"
                  style={{ width: `${progress}%` }}
                />
              </Progress>
                          </div>
                        </div>
                    </div>

        {/* Learning Mode Tabs */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
              <div className="flex gap-4">
                <Button
                  variant={learningMode === 'lesson' ? 'default' : 'outline'}
                  onClick={() => setLearningMode('lesson')}
                  className="flex-1"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Bài học
                </Button>
                            <Button 
                  variant={learningMode === 'quiz' ? 'default' : 'outline'}
                  onClick={() => setLearningMode('quiz')}
                  className="flex-1"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Quiz
                            </Button>
                          <Button 
                  variant={learningMode === 'practice' ? 'default' : 'outline'}
                  onClick={() => setLearningMode('practice')}
                  className="flex-1"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Thực hành
                          </Button>
                        </div>
                      </div>
          </div>
                      </div>

        {/* Main Learning Area */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              {/* Grammar Content */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Badge className={`${getDifficultyColor(selectedGrammar.difficultyLevel)} px-4 py-2 text-lg`}>
                    {selectedGrammar.difficultyLevel}
                  </Badge>

                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {selectedGrammar.title}
                </h2>

                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-l-4 border-blue-500 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                      Lý thuyết
                    </h3>
                    <p className="text-lg leading-relaxed">{selectedGrammar.content}</p>
                        </div>
                </div>
          </div>

              {/* Examples Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-blue-500" />
                  Ví dụ minh họa
                </h3>

                {mockExamples[currentExampleIndex] && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200">
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Ví dụ {currentExampleIndex + 1}:</h4>
                      <p className="text-lg text-gray-800 font-medium mb-2">
                        "{mockExamples[currentExampleIndex].sentence}"
                      </p>
                      <p className="text-gray-600 mb-2">
                        {mockExamples[currentExampleIndex].vietnamese}
                      </p>
                </div>
                
                    <div className="bg-white p-4 rounded-xl border border-purple-200">
                      <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-purple-500" />
                        Giải thích:
                      </h5>
                      <p className="text-gray-700">
                        {mockExamples[currentExampleIndex].explanation}
                      </p>
                    </div>
                  </div>
                )}
                  
                {/* Example Navigation */}
                <div className="flex items-center justify-between mt-6">
                    <Button 
                    onClick={handlePreviousExample}
                    disabled={currentExampleIndex === 0}
                    variant="outline"
                    className="px-6 py-3"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Ví dụ trước
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleShuffle} className="px-4 py-2">
                      <Shuffle className="h-4 w-4 mr-2" />
                      Xáo trộn
                    </Button>
                    <Button variant="outline" onClick={() => setCurrentExampleIndex(0)} className="px-4 py-2">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Bắt đầu lại
                    </Button>
                  </div>
                  
                  <Button
                    onClick={handleNextExample}
                    disabled={currentExampleIndex === mockExamples.length - 1}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    Ví dụ tiếp theo
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </Button>
                </div>
              </div>

              {/* Quiz Section */}
              {learningMode === 'quiz' && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Target className="h-6 w-6 text-green-500" />
                    Kiểm tra kiến thức
                  </h3>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Câu hỏi:</h4>
                      <p className="text-gray-700">
                        Hãy viết một câu sử dụng {selectedGrammar.title.toLowerCase()} để diễn tả một hành động đã hoàn thành.
                      </p>
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Nhập câu trả lời của bạn..."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-green-500 text-lg"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={handleCheckAnswer} className="bg-green-600 hover:bg-green-700">
                        Kiểm tra
                      </Button>
                      <Button variant="outline" onClick={() => setShowAnswer(!showAnswer)}>
                        {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án mẫu'}
                      </Button>
                    </div>

                    {isCorrect !== null && (
                      <div className={`mt-4 p-4 rounded-2xl ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <div className="flex items-center gap-2">
                          {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                          <span className="font-semibold">
                            {isCorrect ? 'Tuyệt vời! Câu trả lời của bạn rất tốt!' : 'Hãy thử lại! Bạn có thể làm tốt hơn!'}
                          </span>
                    </div>
                  </div>
                    )}

                    {showAnswer && (
                      <div className="mt-4 p-4 bg-white rounded-xl border border-green-200">
                        <h5 className="font-semibold text-gray-900 mb-2">Đáp án mẫu:</h5>
                        <p className="text-gray-700">
                          "I have finished my homework." (Tôi đã hoàn thành bài tập về nhà.)
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          Đây là một ví dụ điển hình sử dụng {selectedGrammar.title.toLowerCase()}.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Practice Section */}
              {learningMode === 'practice' && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Brain className="h-6 w-6 text-orange-500" />
                    Bài tập thực hành
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-orange-500" />
                          Bài tập 1: Điền từ
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">
                          Hoàn thành câu bằng cách sử dụng {selectedGrammar.title.toLowerCase()}.
                        </p>
                        <Button variant="outline" className="w-full">
                          Bắt đầu
                        </Button>
                </CardContent>
              </Card>

                    <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
                <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-orange-500" />
                          Bài tập 2: Viết câu
                        </CardTitle>
                </CardHeader>
                <CardContent>
                        <p className="text-gray-700 mb-4">
                          Viết 3 câu sử dụng {selectedGrammar.title.toLowerCase()}.
                        </p>
                        <Button variant="outline" className="w-full">
                          Bắt đầu
                        </Button>
                      </CardContent>
                    </Card>
                    </div>
                    </div>
              )}
                    </div>
                    </div>
                  </div>

        {/* Related Grammar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Bài ngữ pháp liên quan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <p className="text-center text-gray-600">Bài ngữ pháp liên quan sẽ được cập nhật sau.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
