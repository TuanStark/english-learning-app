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
  Settings
} from "lucide-react"
import Link from "next/link"
import { useVocabularyDetail } from '@/hooks/useVocabularyDetail'
import { type Vocabulary } from '@/lib/api'

export default function VocabularyDetailPage() {
  const params = useParams()
  const vocabularyId = parseInt(params?.id as string)
  
  const { 
    topic, 
    vocabularies, 
    loading, 
    error, 
    stats,
    getMasteredVocabulariesCount,
    getLearningProgress,
    getUserProgress
  } = useVocabularyDetail(vocabularyId)
  const [selectedVocabulary, setSelectedVocabulary] = useState<Vocabulary | null>(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [userAnswer, setUserAnswer] = useState("")
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [progress, setProgress] = useState(0)
  const [learningMode, setLearningMode] = useState<'flashcard' | 'quiz' | 'practice'>('flashcard')

  useEffect(() => {
    if (vocabularies.length > 0) {
      setSelectedVocabulary(vocabularies[currentWordIndex])
    }
  }, [vocabularies, currentWordIndex])

  // Calculate progress based on user learning progress
  useEffect(() => {
    const learningProgress = getLearningProgress()
    console.log('Learning progress:', learningProgress, '%')
    console.log('Mastered count:', getMasteredVocabulariesCount())
    console.log('Total vocabularies:', vocabularies.length)
    setProgress(learningProgress)
  }, [vocabularies, getLearningProgress])

  const handleNextWord = () => {
    if (currentWordIndex < vocabularies.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
      setShowAnswer(false)
      setUserAnswer("")
      setIsCorrect(null)
    }
  }

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1)
      setShowAnswer(false)
      setUserAnswer("")
      setIsCorrect(null)
    }
  }

  const handleCheckAnswer = () => {
    if (selectedVocabulary) {
      const correct = userAnswer.toLowerCase().trim() === selectedVocabulary.vietnameseMeaning.toLowerCase().trim()
      setIsCorrect(correct)
    }
  }

  const handleShuffle = () => {
    setCurrentWordIndex(0)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải từ vựng...</p>
        </div>
      </div>
    )
  }

  if (error || !topic) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-32 w-32 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Không thể tải từ vựng</h2>
          <p className="text-gray-600 mt-2">{error || "Không tìm thấy chủ đề từ vựng"}</p>
          <Button asChild className="mt-4">
            <Link href="/vocabulary">Quay lại Vocabulary</Link>
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
            <Link href="/vocabulary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại Vocabulary
            </Link>
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    {topic.topicName}
                </h1>
                  <p className="text-gray-600 mt-2 text-lg">
                    {topic.description || `Học từ vựng về chủ đề ${topic.topicName}`}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{vocabularies.length}</div>
                  <div className="text-sm text-gray-600">Tổng từ vựng</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{getMasteredVocabulariesCount()}</div>
                  <div className="text-sm text-gray-600">Đã thuộc</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{Math.round(progress)}%</div>
                  <div className="text-sm text-gray-600">Tiến độ</div>
                </div>
                <div className="text-center">
                  <Badge className={getDifficultyColor(vocabularies[0]?.difficultyLevel || 'Medium')}>
                    {vocabularies[0]?.difficultyLevel || 'Medium'}
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
                <span className="text-sm text-gray-600">{getMasteredVocabulariesCount()} / {vocabularies.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
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
                  variant={learningMode === 'flashcard' ? 'default' : 'outline'}
                  onClick={() => setLearningMode('flashcard')}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Flashcard
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
                  Practice
                          </Button>
                        </div>
                      </div>
                        </div>
                      </div>

        {/* Main Learning Area */}
        {selectedVocabulary && (
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                {/* Word Card */}
                <div className="text-center mb-8">
                  <div className="mb-6">
                    <Badge className={`${getDifficultyColor(selectedVocabulary.difficultyLevel)} px-4 py-2 text-lg mb-4`}>
                      {selectedVocabulary.difficultyLevel}
                    </Badge>
                    <h2 className="text-6xl font-bold text-gray-900 mb-4">
                      {selectedVocabulary.englishWord}
                    </h2>
                    <p className="text-2xl text-gray-600 mb-4">
                      /{selectedVocabulary.pronunciation}/
                    </p>
                    <p className="text-xl text-gray-500 mb-4">
                      {selectedVocabulary.wordType}
                    </p>
                  </div>

                  {/* Audio and Actions */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Button size="lg" variant="outline" className="rounded-full p-4">
                      <Volume2 className="h-6 w-6" />
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full p-4">
                      <Heart className="h-6 w-6" />
                    </Button>
                    <Button size="lg" variant="outline" className="rounded-full p-4">
                      <Bookmark className="h-6 w-6" />
                      </Button>
                    <Button size="lg" variant="outline" className="rounded-full p-4">
                      <Share2 className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Answer Section */}
                  {learningMode === 'quiz' && (
                    <div className="mb-6">
                      <input
                        type="text"
                        placeholder="Nhập nghĩa tiếng Việt..."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 text-lg"
                      />
                      <div className="mt-4">
                        <Button onClick={handleCheckAnswer} className="mr-4">
                          Kiểm tra
                          </Button>
                        <Button variant="outline" onClick={() => setShowAnswer(!showAnswer)}>
                          {showAnswer ? 'Ẩn đáp án' : 'Xem đáp án'}
                          </Button>
                      </div>
                      
                      {isCorrect !== null && (
                        <div className={`mt-4 p-4 rounded-2xl ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          <div className="flex items-center gap-2">
                            {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                            <span className="font-semibold">
                              {isCorrect ? 'Chính xác!' : 'Chưa đúng, hãy thử lại!'}
                            </span>
                          </div>
                        </div>
                      )}
                </div>
                  )}

                  {/* Vietnamese Meaning */}
                  {showAnswer && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Nghĩa tiếng Việt:</h3>
                      <p className="text-xl text-gray-700">{selectedVocabulary.vietnameseMeaning}</p>
                    </div>
                  )}
                </div>
                
                {/* Navigation */}
                <div className="flex items-center justify-between">
                    <Button 
                    onClick={handlePreviousWord}
                    disabled={currentWordIndex === 0}
                    variant="outline"
                    className="px-6 py-3"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Từ trước
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleShuffle} className="px-4 py-2">
                      <Shuffle className="h-4 w-4 mr-2" />
                      Xáo trộn
                    </Button>
                    <Button variant="outline" onClick={() => setCurrentWordIndex(0)} className="px-4 py-2">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Bắt đầu lại
                    </Button>
                  </div>
                  
                  <Button
                    onClick={handleNextWord}
                    disabled={currentWordIndex === vocabularies.length - 1}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Từ tiếp theo
                    <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                  </Button>
                    </div>
                    </div>
                    </div>
                  </div>
        )}

        {/* Word List */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Danh sách từ vựng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vocabularies.map((vocab, index) => {
                  const userProgress = getUserProgress(vocab.id);
                  return (
                    <div
                      key={vocab.id}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        index === currentWordIndex
                          ? 'border-blue-500 bg-blue-50'
                          : userProgress?.status === 'Mastered'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentWordIndex(index)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{vocab.englishWord}</h4>
                        <div className="flex items-center gap-2">
                          {userProgress?.status === 'Mastered' && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                          <Badge className={getDifficultyColor(vocab.difficultyLevel)}>
                            {vocab.difficultyLevel}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{vocab.pronunciation}</p>
                      <p className="text-sm text-gray-700 mt-2">{vocab.vietnameseMeaning}</p>
                      <p className="text-xs text-gray-500 mt-1">{vocab.wordType}</p>
                      {userProgress && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Thuộc: {userProgress.masteryLevel}%</span>
                            <span className="text-gray-500">Luyện: {userProgress.timesPracticed} lần</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
