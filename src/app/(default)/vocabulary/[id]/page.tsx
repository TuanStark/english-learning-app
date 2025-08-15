"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Play,
  CheckCircle,
  Award,
  TrendingUp,
  Calendar,
  Download,
  Share2,
  Heart,
  MessageCircle,
  ChevronRight,
  PlayCircle,
  Volume2,
  Eye,
  Brain,
  Target,
  ArrowLeft,
  Lightbulb,
  Zap,
  Trophy,
  BarChart3,
  RotateCcw,
  Shuffle
} from "lucide-react"
import Link from "next/link"

export default function VocabularyDetailPage() {
  const params = useParams()
  const setId = params.id
  const [currentMode, setCurrentMode] = useState('flashcard')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [masteredWords, setMasteredWords] = useState<number[]>([])

  // Mock vocabulary set data
  const vocabularySet = {
    id: setId,
    title: 'IELTS Vocabulary - Academic Module',
    subtitle: 'Bộ từ vựng academic quan trọng nhất cho IELTS Writing và Speaking với định nghĩa, ví dụ và cách phát âm chuẩn',
    description: 'Bộ từ vựng này tập hợp những từ academic quan trọng nhất thường xuất hiện trong các bài thi IELTS. Mỗi từ đều có định nghĩa chi tiết, ví dụ thực tế và file âm thanh phát âm chuẩn.',
    category: 'IELTS',
    level: 'Advanced',
    wordCount: 500,
    studyTime: 120,
    completedBy: 2500,
    rating: 4.8,
    reviews: 234,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    isNew: true,
    isFree: true,
    progress: 35,
    lastUpdated: '2024-01-12',
    skills: ['Academic Writing', 'Formal Speaking', 'Reading Comprehension', 'Vocabulary Range'],
    studyMethods: [
      { name: 'Flashcards', icon: Eye, description: 'Học từ vựng với thẻ ghi nhớ tương tác' },
      { name: 'Pronunciation', icon: Volume2, description: 'Luyện phát âm với audio chuẩn' },
      { name: 'Memory Games', icon: Brain, description: 'Trò chơi ghi nhớ thú vị' },
      { name: 'Spaced Repetition', icon: RotateCcw, description: 'Ôn tập theo chu kỳ khoa học' }
    ],
    words: [
      {
        id: 1,
        word: 'Substantial',
        pronunciation: '/səbˈstænʃəl/',
        partOfSpeech: 'adjective',
        definition: 'Lớn về số lượng, kích thước hoặc tầm quan trọng; đáng kể',
        vietnamese: 'đáng kể, lớn lao',
        example: 'The company made substantial profits this year.',
        exampleVietnamese: 'Công ty đã có lợi nhuận đáng kể trong năm nay.',
        difficulty: 'Medium',
        mastered: false,
        audio: '/audio/substantial.mp3'
      },
      {
        id: 2,
        word: 'Comprehensive',
        pronunciation: '/ˌkɒmprɪˈhensɪv/',
        partOfSpeech: 'adjective',
        definition: 'Bao gồm tất cả hoặc gần như tất cả các yếu tố hoặc khía cạnh',
        vietnamese: 'toàn diện, bao quát',
        example: 'We need a comprehensive analysis of the market.',
        exampleVietnamese: 'Chúng ta cần một phân tích toàn diện về thị trường.',
        difficulty: 'Hard',
        mastered: true,
        audio: '/audio/comprehensive.mp3'
      },
      {
        id: 3,
        word: 'Significant',
        pronunciation: '/sɪɡˈnɪfɪkənt/',
        partOfSpeech: 'adjective',
        definition: 'Đủ lớn hoặc quan trọng để đáng chú ý hoặc có tác động',
        vietnamese: 'quan trọng, đáng kể',
        example: 'There has been a significant increase in sales.',
        exampleVietnamese: 'Đã có sự gia tăng đáng kể trong doanh số.',
        difficulty: 'Easy',
        mastered: false,
        audio: '/audio/significant.mp3'
      }
    ],
    categories: [
      { name: 'Academic Writing', count: 150, color: 'bg-blue-100 text-blue-800' },
      { name: 'Business', count: 120, color: 'bg-green-100 text-green-800' },
      { name: 'Science', count: 100, color: 'bg-purple-100 text-purple-800' },
      { name: 'Social Issues', count: 80, color: 'bg-orange-100 text-orange-800' },
      { name: 'Environment', count: 50, color: 'bg-emerald-100 text-emerald-800' }
    ],
    stats: {
      totalWords: 500,
      masteredWords: 175,
      studyStreak: 12,
      averageScore: 8.5
    },
    reviews_data: [
      {
        id: 1,
        user: 'Nguyễn Văn A',
        rating: 5,
        date: '1 tuần trước',
        comment: 'Bộ từ vựng rất hữu ích cho IELTS. Audio phát âm rất chuẩn và ví dụ thực tế.',
        helpful: 18
      },
      {
        id: 2,
        user: 'Trần Thị B',
        rating: 4,
        date: '2 tuần trước',
        comment: 'Từ vựng academic rất phong phú. Tuy nhiên mong có thêm bài tập thực hành.',
        helpful: 12
      }
    ]
  }

  const currentWord = vocabularySet.words[currentWordIndex]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success-100 text-success-800'
      case 'Medium': return 'bg-warning-100 text-warning-800'
      case 'Hard': return 'bg-error-100 text-error-800'
      default: return 'bg-neutral-100 text-neutral-800'
    }
  }

  const handleNextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % vocabularySet.words.length)
    setShowAnswer(false)
  }

  const handlePrevWord = () => {
    setCurrentWordIndex((prev) => (prev - 1 + vocabularySet.words.length) % vocabularySet.words.length)
    setShowAnswer(false)
  }

  const handleMarkMastered = (wordId: number) => {
    setMasteredWords([...masteredWords, wordId])
  }

  const playAudio = (audioPath: string) => {
    // In a real app, this would play the audio file
    console.log('Playing audio:', audioPath)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
          <Link href="/vocabulary" className="hover:text-brand-600 transition-colors">
            Từ vựng
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/vocabulary?category=${vocabularySet.category}`} className="hover:text-brand-600 transition-colors">
            {vocabularySet.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 font-medium">{vocabularySet.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-brand-700 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {vocabularySet.category}
                  </Badge>
                  <Badge className="bg-warning-500 text-white">
                    {vocabularySet.level}
                  </Badge>
                  {vocabularySet.isNew && (
                    <Badge className="bg-success-500 text-white">
                      Mới
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {vocabularySet.title}
                </h1>
                
                <p className="text-lg text-brand-100 mb-6 max-w-2xl">
                  {vocabularySet.subtitle}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{vocabularySet.wordCount} từ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{vocabularySet.studyTime} phút</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{vocabularySet.completedBy} người học</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{vocabularySet.rating} ({vocabularySet.reviews} đánh giá)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {vocabularySet.progress > 0 && (
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Tiến độ học tập</span>
                    <span className="text-sm text-neutral-600">{vocabularySet.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-brand-500 to-brand-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${vocabularySet.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-600 mt-2">
                    <span>{vocabularySet.stats.masteredWords} từ đã thuộc</span>
                    <span>{vocabularySet.stats.totalWords - vocabularySet.stats.masteredWords} từ còn lại</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Study Methods */}
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle>Chọn phương pháp học</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vocabularySet.studyMethods.map((method, index) => (
                    <Button
                      key={index}
                      variant={currentMode === method.name.toLowerCase() ? "default" : "outline"}
                      className="h-auto p-4 justify-start"
                      onClick={() => setCurrentMode(method.name.toLowerCase())}
                    >
                      <method.icon className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{method.name}</div>
                        <div className="text-xs text-neutral-600">{method.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Flashcard Study Mode */}
            {currentMode === 'flashcards' && (
              <Card className="border-0 shadow-large">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-sm text-neutral-600 mb-2">
                      Từ {currentWordIndex + 1} / {vocabularySet.words.length}
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2 mb-4">
                      <div 
                        className="bg-brand-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${((currentWordIndex + 1) / vocabularySet.words.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="min-h-[400px] flex flex-col justify-center">
                    {!showAnswer ? (
                      <div className="text-center">
                        <div className="text-4xl font-bold text-neutral-900 mb-4">
                          {currentWord.word}
                        </div>
                        <div className="text-lg text-neutral-600 mb-2">
                          {currentWord.pronunciation}
                        </div>
                        <div className="text-sm text-neutral-500 mb-6">
                          {currentWord.partOfSpeech}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => playAudio(currentWord.audio)}
                          className="mb-8"
                        >
                          <Volume2 className="w-4 h-4 mr-2" />
                          Phát âm
                        </Button>
                        <div>
                          <Button onClick={() => setShowAnswer(true)} size="lg">
                            Xem nghĩa
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-neutral-900 mb-4">
                          {currentWord.definition}
                        </div>
                        <div className="text-lg text-brand-600 mb-6">
                          {currentWord.vietnamese}
                        </div>
                        <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                          <div className="text-sm font-medium text-neutral-700 mb-2">Ví dụ:</div>
                          <div className="text-neutral-800 mb-2">{currentWord.example}</div>
                          <div className="text-neutral-600 text-sm">{currentWord.exampleVietnamese}</div>
                        </div>
                        <div className="flex justify-center gap-4">
                          <Button variant="outline" onClick={() => setShowAnswer(false)}>
                            Chưa thuộc
                          </Button>
                          <Button onClick={() => {
                            handleMarkMastered(currentWord.id)
                            handleNextWord()
                          }}>
                            Đã thuộc
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-8 pt-6 border-t">
                    <Button variant="outline" onClick={handlePrevWord}>
                      ← Từ trước
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Shuffle className="w-4 h-4" />
                      </Button>
                      <Badge className={getDifficultyColor(currentWord.difficulty)}>
                        {currentWord.difficulty}
                      </Badge>
                    </div>
                    <Button variant="outline" onClick={handleNextWord}>
                      Từ sau →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-neutral-100 p-1 rounded-2xl">
                <TabsTrigger value="overview" className="rounded-xl">Tổng quan</TabsTrigger>
                <TabsTrigger value="wordlist" className="rounded-xl">Danh sách từ</TabsTrigger>
                <TabsTrigger value="categories" className="rounded-xl">Chủ đề</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl">Đánh giá</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Description */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Mô tả bộ từ vựng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 leading-relaxed">
                      {vocabularySet.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <BookOpen className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{vocabularySet.stats.totalWords}</div>
                      <div className="text-sm text-neutral-600">Tổng từ vựng</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <Trophy className="w-8 h-8 text-success-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{vocabularySet.stats.masteredWords}</div>
                      <div className="text-sm text-neutral-600">Đã thuộc</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <Zap className="w-8 h-8 text-warning-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{vocabularySet.stats.studyStreak}</div>
                      <div className="text-sm text-neutral-600">Ngày liên tiếp</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{vocabularySet.stats.averageScore}</div>
                      <div className="text-sm text-neutral-600">Điểm TB</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="wordlist" className="space-y-4">
                {vocabularySet.words.map((word, index) => (
                  <Card key={word.id} className="border-0 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold">{word.word}</h3>
                            <Badge className={getDifficultyColor(word.difficulty)}>
                              {word.difficulty}
                            </Badge>
                            {word.mastered && (
                              <Badge className="bg-success-100 text-success-800">
                                Đã thuộc
                              </Badge>
                            )}
                          </div>
                          <div className="text-neutral-600 mb-2">
                            {word.pronunciation} • {word.partOfSpeech}
                          </div>
                          <div className="text-neutral-800 mb-2">{word.definition}</div>
                          <div className="text-brand-600 mb-3">{word.vietnamese}</div>
                          <div className="bg-neutral-50 rounded-lg p-3">
                            <div className="text-sm text-neutral-700">{word.example}</div>
                            <div className="text-sm text-neutral-600 mt-1">{word.exampleVietnamese}</div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => playAudio(word.audio)}
                          >
                            <Volume2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant={word.mastered ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleMarkMastered(word.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {vocabularySet.categories.map((category, index) => (
                    <Card key={index} className="border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-neutral-600">{category.count} từ vựng</p>
                          </div>
                          <Badge className={category.color}>
                            {category.count}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-neutral-900 mb-2">{vocabularySet.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-sm text-neutral-600">{vocabularySet.reviews} đánh giá</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {vocabularySet.reviews_data.map((review) => (
                    <Card key={review.id} className="border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                            <span className="font-bold text-brand-600">{review.user.charAt(0)}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{review.user}</h4>
                              <span className="text-sm text-neutral-600">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`} 
                                />
                              ))}
                            </div>
                            <p className="text-neutral-700 mb-3">{review.comment}</p>
                            <div className="flex items-center gap-4 text-sm text-neutral-600">
                              <button className="flex items-center gap-1 hover:text-brand-600 transition-colors">
                                <Heart className="w-4 h-4" />
                                Hữu ích ({review.helpful})
                              </button>
                              <button className="flex items-center gap-1 hover:text-brand-600 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                Trả lời
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Start Learning */}
              <Card className="border-0 shadow-large overflow-hidden">
                <div className="relative">
                  <img
                    src={vocabularySet.thumbnail}
                    alt={vocabularySet.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Brain className="w-12 h-12 mx-auto mb-2" />
                      <div className="text-lg font-bold">Từ vựng</div>
                      <div className="text-sm">Học & Ghi nhớ</div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Bắt đầu học ngay</h3>
                    <p className="text-neutral-600">
                      {vocabularySet.wordCount} từ • {vocabularySet.studyTime} phút
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button 
                      className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-glow"
                      size="lg"
                      onClick={() => setCurrentMode('flashcards')}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {vocabularySet.progress > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Download className="w-4 h-4 mr-2" />
                      Tải danh sách
                    </Button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Phát âm chuẩn</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Ví dụ thực tế</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Spaced Repetition</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Theo dõi tiến độ</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t">
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Chia sẻ
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      Yêu thích
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Study Stats */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Thống kê học tập</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Trình độ</span>
                      <Badge className="bg-warning-100 text-warning-800">
                        {vocabularySet.level}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Đánh giá</span>
                      <span className="font-bold text-lg">{vocabularySet.rating}/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Tỷ lệ hoàn thành</span>
                      <span className="font-bold text-success-600">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Cập nhật</span>
                      <span className="font-bold">{vocabularySet.lastUpdated}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Kỹ năng phát triển</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {vocabularySet.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-brand-600" />
                        </div>
                        <span className="font-medium text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
