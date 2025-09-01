"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Target, 
  Clock, 
  Users, 
  Star, 
  Play,
  CheckCircle,
  Award,
  TrendingUp,
  Calendar,
  BarChart3,
  Download,
  Share2,
  Heart,
  MessageCircle,
  ChevronRight,
  PlayCircle,
  FileText,
  Headphones,
  PenTool,
  BookOpen,
  ArrowLeft,
  Timer,
  Trophy,
  Brain,
  Zap
} from "lucide-react"
import Link from "next/link"

export default function PracticeDetailPage() {
  const params = useParams()
  const testId = params?.id
  const [hasStarted, setHasStarted] = useState(false)

  // Mock test data
  const test = {
    id: testId,
    title: 'IELTS Academic Reading Practice Test 1',
    subtitle: 'Bài test Reading IELTS Academic với 3 passages và 40 câu hỏi được thiết kế theo format chính thức của IELTS',
    description: 'Đây là bài test Reading IELTS Academic hoàn chỉnh được thiết kế dựa trên format chính thức của Cambridge IELTS. Bài test bao gồm 3 passages với độ khó tăng dần và 40 câu hỏi đa dạng.',
    category: 'IELTS',
    type: 'Reading',
    difficulty: 'Intermediate',
    duration: 60,
    questions: 40,
    attempts: 1250,
    avgScore: 6.5,
    maxScore: 9.0,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    isNew: true,
    isFree: true,
    skills: ['Skimming & Scanning', 'Detail Reading', 'Inference', 'Vocabulary'],
    format: 'Multiple Choice, True/False/Not Given, Matching',
    lastUpdated: '2024-01-15',
    passages: [
      {
        title: 'The History of Coffee',
        wordCount: 850,
        questions: 13,
        types: ['Multiple Choice', 'True/False/Not Given'],
        difficulty: 'Easy'
      },
      {
        title: 'Climate Change and Agriculture',
        wordCount: 920,
        questions: 14,
        types: ['Matching Headings', 'Summary Completion'],
        difficulty: 'Medium'
      },
      {
        title: 'Artificial Intelligence in Healthcare',
        wordCount: 980,
        questions: 13,
        types: ['Multiple Choice', 'Matching Information'],
        difficulty: 'Hard'
      }
    ],
    tips: [
      'Đọc lướt toàn bộ bài trước khi làm câu hỏi',
      'Chú ý đến từ khóa trong câu hỏi',
      'Quản lý thời gian: 20 phút cho mỗi passage',
      'Đọc kỹ hướng dẫn của từng dạng câu hỏi',
      'Không bỏ trống câu nào, đoán nếu không chắc chắn'
    ],
    recentScores: [
      { user: 'Nguyễn A', score: 7.5, date: '2 giờ trước' },
      { user: 'Trần B', score: 6.0, date: '5 giờ trước' },
      { user: 'Lê C', score: 8.0, date: '1 ngày trước' },
      { user: 'Phạm D', score: 6.5, date: '1 ngày trước' },
      { user: 'Hoàng E', score: 7.0, date: '2 ngày trước' }
    ],
    reviews: [
      {
        id: 1,
        user: 'Nguyễn Văn A',
        rating: 5,
        date: '1 tuần trước',
        comment: 'Bài test rất hay, câu hỏi sát với format thật. Đã giúp tôi cải thiện kỹ năng Reading rất nhiều.',
        helpful: 15
      },
      {
        id: 2,
        user: 'Trần Thị B',
        rating: 4,
        date: '2 tuần trước',
        comment: 'Passages khá thú vị, độ khó vừa phải. Tuy nhiên passage 3 hơi khó so với trình độ của tôi.',
        helpful: 8
      }
    ]
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success-100 text-success-800'
      case 'Medium': return 'bg-warning-100 text-warning-800'
      case 'Hard': return 'bg-error-100 text-error-800'
      default: return 'bg-neutral-100 text-neutral-800'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-success-600'
    if (score >= 6.5) return 'text-warning-600'
    return 'text-error-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
          <Link href="/practice" className="hover:text-brand-600 transition-colors">
            Luyện đề thi
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 font-medium">{test.title}</span>
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
                    {test.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {test.type}
                  </Badge>
                  {test.isNew && (
                    <Badge className="bg-warning-500 text-white">
                      Mới
                    </Badge>
                  )}
                  {test.isFree && (
                    <Badge className="bg-success-500 text-white">
                      Miễn phí
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {test.title}
                </h1>
                
                <p className="text-lg text-brand-100 mb-6 max-w-2xl">
                  {test.subtitle}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    <span>{test.duration} phút</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>{test.questions} câu hỏi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{test.attempts} lượt thi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>Điểm TB: {test.avgScore}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-neutral-100 p-1 rounded-2xl">
                <TabsTrigger value="overview" className="rounded-xl">Tổng quan</TabsTrigger>
                <TabsTrigger value="structure" className="rounded-xl">Cấu trúc</TabsTrigger>
                <TabsTrigger value="leaderboard" className="rounded-xl">Bảng xếp hạng</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl">Đánh giá</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Test Description */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Mô tả bài test</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 leading-relaxed mb-6">
                      {test.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">Kỹ năng được đánh giá:</h4>
                        <div className="space-y-2">
                          {test.skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-success-500" />
                              <span className="text-neutral-700">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-3">Thông tin bài test:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Độ khó:</span>
                            <Badge className={getDifficultyColor(test.difficulty)}>
                              {test.difficulty}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Format:</span>
                            <span className="font-medium">{test.format}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Cập nhật:</span>
                            <span className="font-medium">{test.lastUpdated}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Điểm tối đa:</span>
                            <span className="font-medium">{test.maxScore}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-warning-500" />
                      Mẹo làm bài
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {test.tips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-warning-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-warning-700">{index + 1}</span>
                          </div>
                          <span className="text-neutral-700">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="structure" className="space-y-4">
                {test.passages.map((passage, index) => (
                  <Card key={index} className="border-0 shadow-soft">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Passage {index + 1}: {passage.title}
                        </CardTitle>
                        <Badge className={getDifficultyColor(passage.difficulty)}>
                          {passage.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-neutral-900">{passage.wordCount}</div>
                          <div className="text-sm text-neutral-600">từ</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-neutral-900">{passage.questions}</div>
                          <div className="text-sm text-neutral-600">câu hỏi</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-neutral-900">20</div>
                          <div className="text-sm text-neutral-600">phút</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-neutral-900">{passage.types.length}</div>
                          <div className="text-sm text-neutral-600">dạng bài</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Dạng câu hỏi:</h4>
                        <div className="flex flex-wrap gap-2">
                          {passage.types.map((type, typeIndex) => (
                            <Badge key={typeIndex} variant="outline">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="leaderboard" className="space-y-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-warning-500" />
                      Điểm số gần đây
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {test.recentScores.map((score, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-brand-600">#{index + 1}</span>
                            </div>
                            <div>
                              <div className="font-medium">{score.user}</div>
                              <div className="text-sm text-neutral-600">{score.date}</div>
                            </div>
                          </div>
                          <div className={`text-xl font-bold ${getScoreColor(score.score)}`}>
                            {score.score}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <BarChart3 className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{test.avgScore}</div>
                      <div className="text-sm text-neutral-600">Điểm trung bình</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <Target className="w-8 h-8 text-success-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{test.maxScore}</div>
                      <div className="text-sm text-neutral-600">Điểm cao nhất</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{test.attempts}</div>
                      <div className="text-sm text-neutral-600">Lượt thi</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="space-y-6">
                  {test.reviews.map((review) => (
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
              {/* Start Test */}
              <Card className="border-0 shadow-large overflow-hidden">
                <div className="relative">
                  <img
                    src={test.thumbnail}
                    alt={test.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Timer className="w-12 h-12 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{test.duration}</div>
                      <div className="text-sm">phút</div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Sẵn sàng làm bài?</h3>
                    <p className="text-neutral-600">
                      {test.questions} câu hỏi • {test.duration} phút
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button 
                      className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-glow"
                      size="lg"
                      onClick={() => setHasStarted(true)}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {hasStarted ? 'Tiếp tục làm bài' : 'Bắt đầu làm bài'}
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Xem đáp án
                    </Button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Không giới hạn lần thi</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Chấm điểm tự động</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Giải thích chi tiết</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Lưu kết quả</span>
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

              {/* Test Stats */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Thống kê</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Độ khó</span>
                      <Badge className={getDifficultyColor(test.difficulty)}>
                        {test.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Điểm trung bình</span>
                      <span className="font-bold text-lg">{test.avgScore}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Tỷ lệ pass</span>
                      <span className="font-bold text-success-600">78%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Thời gian TB</span>
                      <span className="font-bold">52 phút</span>
                    </div>
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
