"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PenTool, 
  Clock, 
  Users, 
  Star, 
  Play,
  CheckCircle,
  Award,
  TrendingUp,
  Calendar,
  BookOpen,
  Download,
  Share2,
  Heart,
  MessageCircle,
  ChevronRight,
  PlayCircle,
  FileText,
  Brain,
  Target,
  ArrowLeft,
  Lightbulb,
  Zap,
  Trophy,
  BarChart3
} from "lucide-react"
import Link from "next/link"

export default function GrammarDetailPage() {
  const params = useParams()
  const lessonId = params.id
  const [currentStep, setCurrentStep] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [completedExercises, setCompletedExercises] = useState<number[]>([])

  // Mock grammar lesson data
  const lesson = {
    id: lessonId,
    title: 'Present Perfect vs Past Simple',
    subtitle: 'Phân biệt và sử dụng chính xác thì hiện tại hoàn thành và quá khứ đơn trong giao tiếp và viết',
    description: 'Bài học này sẽ giúp bạn hiểu rõ sự khác biệt giữa Present Perfect và Past Simple, hai thì thường gây nhầm lẫn nhất trong tiếng Anh. Thông qua lý thuyết chi tiết và bài tập thực hành, bạn sẽ nắm vững cách sử dụng chúng.',
    category: 'Tenses',
    difficulty: 'Medium',
    duration: 45,
    exerciseCount: 25,
    completedBy: 3200,
    rating: 4.8,
    reviews: 156,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop',
    isNew: false,
    isFree: true,
    progress: 80,
    lastUpdated: '2024-01-10',
    skills: ['Grammar Rules', 'Sentence Structure', 'Time Expressions', 'Context Usage'],
    whatYouLearn: [
      'Hiểu rõ cấu trúc và cách sử dụng Present Perfect',
      'Nắm vững quy tắc và cách dùng Past Simple',
      'Phân biệt được khi nào dùng thì nào',
      'Sử dụng đúng các time expressions',
      'Áp dụng vào giao tiếp và viết thực tế',
      'Tránh được những lỗi phổ biến'
    ],
    sections: [
      {
        title: 'Lý thuyết cơ bản',
        type: 'theory',
        duration: 15,
        content: 'Giới thiệu về Present Perfect và Past Simple',
        completed: true
      },
      {
        title: 'Cấu trúc Present Perfect',
        type: 'theory',
        duration: 10,
        content: 'Cách thành lập và sử dụng Present Perfect',
        completed: true
      },
      {
        title: 'Cấu trúc Past Simple',
        type: 'theory',
        duration: 8,
        content: 'Cách thành lập và sử dụng Past Simple',
        completed: true
      },
      {
        title: 'So sánh và phân biệt',
        type: 'theory',
        duration: 12,
        content: 'Khi nào dùng Present Perfect, khi nào dùng Past Simple',
        completed: false
      },
      {
        title: 'Bài tập thực hành 1',
        type: 'exercise',
        duration: 15,
        content: 'Luyện tập với 10 câu hỏi cơ bản',
        completed: false
      },
      {
        title: 'Bài tập thực hành 2',
        type: 'exercise',
        duration: 20,
        content: 'Bài tập nâng cao với 15 câu hỏi',
        completed: false
      }
    ],
    exercises: [
      {
        id: 1,
        title: 'Basic Practice',
        questions: 10,
        difficulty: 'Easy',
        type: 'Multiple Choice',
        completed: true,
        score: 8
      },
      {
        id: 2,
        title: 'Intermediate Practice',
        questions: 15,
        difficulty: 'Medium',
        type: 'Fill in the blanks',
        completed: false,
        score: null
      },
      {
        id: 3,
        title: 'Advanced Practice',
        questions: 12,
        difficulty: 'Hard',
        type: 'Error Correction',
        completed: false,
        score: null
      }
    ],
    tips: [
      'Present Perfect thường đi với "already", "just", "yet", "ever", "never"',
      'Past Simple dùng với thời gian cụ thể như "yesterday", "last week"',
      'Present Perfect không dùng với thời gian cụ thể trong quá khứ',
      'Chú ý đến ngữ cảnh để chọn thì phù hợp',
      'Luyện tập thường xuyên để tạo phản xạ tự nhiên'
    ],
    examples: [
      {
        correct: "I have lived in Hanoi for 5 years.",
        incorrect: "I lived in Hanoi for 5 years.",
        explanation: "Dùng Present Perfect vì hành động bắt đầu trong quá khứ và tiếp tục đến hiện tại."
      },
      {
        correct: "I went to the cinema yesterday.",
        incorrect: "I have gone to the cinema yesterday.",
        explanation: "Dùng Past Simple vì có thời gian cụ thể 'yesterday'."
      }
    ],
    reviews_data: [
      {
        id: 1,
        user: 'Nguyễn Văn A',
        rating: 5,
        date: '1 tuần trước',
        comment: 'Bài học rất chi tiết và dễ hiểu. Cuối cùng tôi cũng phân biệt được 2 thì này!',
        helpful: 12
      },
      {
        id: 2,
        user: 'Trần Thị B',
        rating: 4,
        date: '2 tuần trước',
        comment: 'Các ví dụ rất thực tế. Tuy nhiên mong có thêm bài tập nâng cao.',
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'theory': return BookOpen
      case 'exercise': return PenTool
      case 'quiz': return Brain
      default: return PlayCircle
    }
  }

  const handleStartLesson = () => {
    setHasStarted(true)
    setCurrentStep(0)
  }

  const handleCompleteExercise = (exerciseId: number, score: number) => {
    setCompletedExercises([...completedExercises, exerciseId])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
          <Link href="/grammar" className="hover:text-brand-600 transition-colors">
            Ngữ pháp
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/grammar?category=${lesson.category}`} className="hover:text-brand-600 transition-colors">
            {lesson.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 font-medium">{lesson.title}</span>
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
                    {lesson.category}
                  </Badge>
                  <Badge className={getDifficultyColor(lesson.difficulty)}>
                    {lesson.difficulty}
                  </Badge>
                  {lesson.isFree && (
                    <Badge className="bg-success-500 text-white">
                      Miễn phí
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {lesson.title}
                </h1>
                
                <p className="text-lg text-brand-100 mb-6 max-w-2xl">
                  {lesson.subtitle}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration} phút</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PenTool className="w-4 h-4" />
                    <span>{lesson.exerciseCount} bài tập</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{lesson.completedBy} người học</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{lesson.rating} ({lesson.reviews} đánh giá)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {lesson.progress > 0 && (
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Tiến độ học tập</span>
                    <span className="text-sm text-neutral-600">{lesson.progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-brand-500 to-brand-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-neutral-100 p-1 rounded-2xl">
                <TabsTrigger value="overview" className="rounded-xl">Tổng quan</TabsTrigger>
                <TabsTrigger value="content" className="rounded-xl">Nội dung</TabsTrigger>
                <TabsTrigger value="exercises" className="rounded-xl">Bài tập</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl">Đánh giá</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* What you'll learn */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-brand-600" />
                      Bạn sẽ học được gì
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {lesson.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Mô tả bài học</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 leading-relaxed">
                      {lesson.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-warning-500" />
                      Mẹo học tập
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {lesson.tips.map((tip, index) => (
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

                {/* Examples */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-500" />
                      Ví dụ minh họa
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {lesson.examples.map((example, index) => (
                        <div key={index} className="space-y-3">
                          <div className="p-4 bg-success-50 border border-success-200 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-success-600" />
                              <span className="text-sm font-medium text-success-800">Đúng</span>
                            </div>
                            <p className="text-success-900 font-medium">{example.correct}</p>
                          </div>
                          <div className="p-4 bg-error-50 border border-error-200 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="w-4 h-4 text-error-600">✗</span>
                              <span className="text-sm font-medium text-error-800">Sai</span>
                            </div>
                            <p className="text-error-900 font-medium line-through">{example.incorrect}</p>
                          </div>
                          <div className="p-4 bg-brand-50 border border-brand-200 rounded-xl">
                            <p className="text-brand-900 text-sm">{example.explanation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-4">
                {lesson.sections.map((section, index) => {
                  const IconComponent = getTypeIcon(section.type)
                  return (
                    <Card key={index} className="border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              section.completed ? 'bg-success-100' : 'bg-neutral-100'
                            }`}>
                              {section.completed ? (
                                <CheckCircle className="w-5 h-5 text-success-600" />
                              ) : (
                                <IconComponent className="w-5 h-5 text-neutral-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{section.title}</h3>
                              <p className="text-sm text-neutral-600">{section.content}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-sm text-neutral-600">
                              <Clock className="w-4 h-4 inline mr-1" />
                              {section.duration} phút
                            </div>
                            <Button 
                              size="sm" 
                              variant={section.completed ? "outline" : "default"}
                              disabled={section.completed}
                            >
                              {section.completed ? 'Hoàn thành' : 'Bắt đầu'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </TabsContent>

              <TabsContent value="exercises" className="space-y-4">
                {lesson.exercises.map((exercise, index) => (
                  <Card key={exercise.id} className="border-0 shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            exercise.completed ? 'bg-success-100' : 'bg-brand-100'
                          }`}>
                            {exercise.completed ? (
                              <Trophy className="w-5 h-5 text-success-600" />
                            ) : (
                              <PenTool className="w-5 h-5 text-brand-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{exercise.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-neutral-600">
                              <span>{exercise.questions} câu hỏi</span>
                              <Badge className={getDifficultyColor(exercise.difficulty)}>
                                {exercise.difficulty}
                              </Badge>
                              <span>{exercise.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {exercise.completed && exercise.score && (
                            <div className="text-right">
                              <div className="text-lg font-bold text-success-600">
                                {exercise.score}/{exercise.questions}
                              </div>
                              <div className="text-xs text-neutral-600">điểm</div>
                            </div>
                          )}
                          <Button 
                            size="sm"
                            variant={exercise.completed ? "outline" : "default"}
                            onClick={() => !exercise.completed && handleCompleteExercise(exercise.id, 8)}
                          >
                            {exercise.completed ? 'Làm lại' : 'Bắt đầu'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-neutral-900 mb-2">{lesson.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-sm text-neutral-600">{lesson.reviews} đánh giá</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {lesson.reviews_data.map((review) => (
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
                    src={lesson.thumbnail}
                    alt={lesson.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Brain className="w-12 h-12 mx-auto mb-2" />
                      <div className="text-lg font-bold">Ngữ pháp</div>
                      <div className="text-sm">Học & Luyện tập</div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Bắt đầu học ngay</h3>
                    <p className="text-neutral-600">
                      {lesson.duration} phút • {lesson.exerciseCount} bài tập
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button 
                      className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-glow"
                      size="lg"
                      onClick={handleStartLesson}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {hasStarted ? 'Tiếp tục học' : 'Bắt đầu học'}
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Download className="w-4 h-4 mr-2" />
                      Tải tài liệu
                    </Button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Lý thuyết chi tiết</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Bài tập thực hành</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Ví dụ minh họa</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Chấm điểm tự động</span>
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

              {/* Lesson Stats */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Thống kê bài học</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Độ khó</span>
                      <Badge className={getDifficultyColor(lesson.difficulty)}>
                        {lesson.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Đánh giá</span>
                      <span className="font-bold text-lg">{lesson.rating}/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Tỷ lệ hoàn thành</span>
                      <span className="font-bold text-success-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Cập nhật</span>
                      <span className="font-bold">{lesson.lastUpdated}</span>
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
                    {lesson.skills.map((skill, index) => (
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
