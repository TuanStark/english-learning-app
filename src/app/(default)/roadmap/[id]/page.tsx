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
  BookOpen,
  Download,
  Share2,
  Heart,
  MessageCircle,
  ChevronRight,
  PlayCircle,
  MapPin,
  Route,
  Flag,
  ArrowLeft,
  Lightbulb,
  Zap,
  Trophy,
  BarChart3,
  Timer,
  Brain,
  PenTool,
  Eye
} from "lucide-react"
import Link from "next/link"

export default function RoadmapDetailPage() {
  const params = useParams()
  const roadmapId = params?.id
  const [enrolledSteps, setEnrolledSteps] = useState<number[]>([1, 2])

  // Mock roadmap data
  const roadmap = {
    id: roadmapId,
    title: 'Lộ trình luyện thi IELTS',
    subtitle: 'Lộ trình hoàn chỉnh để đạt điểm IELTS mong muốn từ 6.0 đến 8.0+ trong 6 tháng',
    description: 'Lộ trình học IELTS được thiết kế khoa học, từng bước một để giúp bạn nâng cao từng kỹ năng một cách có hệ thống. Với sự kết hợp giữa lý thuyết, thực hành và mock tests, bạn sẽ tự tin đạt điểm mục tiêu.',
    level: 'Intermediate',
    duration: '6 tháng',
    courses: 8,
    students: 5678,
    rating: 4.8,
    reviews: 342,
    completionRate: 85.5,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    isRecommended: true,
    targetScore: '7.0+',
    currentLevel: 'Intermediate',
    estimatedTime: '2-3 giờ/ngày',
    skills: ['Listening', 'Reading', 'Writing', 'Speaking'],
    whatYouAchieve: [
      'Nắm vững format và cấu trúc của tất cả 4 kỹ năng IELTS',
      'Phát triển chiến lược làm bài hiệu quả cho từng phần thi',
      'Cải thiện từ vựng academic và ngữ pháp nâng cao',
      'Tự tin giao tiếp và viết bài theo chuẩn IELTS',
      'Đạt điểm mục tiêu 7.0+ trong kỳ thi chính thức',
      'Nhận chứng chỉ hoàn thành lộ trình'
    ],
    steps: [
      {
        id: 1,
        title: 'Đánh giá trình độ',
        description: 'Làm bài test đầu vào để xác định trình độ hiện tại và lập kế hoạch học phù hợp',
        duration: '1 tuần',
        courses: ['Placement Test', 'Study Plan Creation'],
        skills: ['Assessment', 'Planning'],
        completed: true,
        current: false,
        locked: false,
        progress: 100,
        estimatedHours: 5
      },
      {
        id: 2,
        title: 'Listening Foundation',
        description: 'Xây dựng nền tảng kỹ năng Listening với các chiến lược nghe hiệu quả',
        duration: '3 tuần',
        courses: ['IELTS Listening Overview', 'Section 1-4 Strategies', 'Practice Tests'],
        skills: ['Note-taking', 'Prediction', 'Detail Recognition'],
        completed: true,
        current: false,
        locked: false,
        progress: 100,
        estimatedHours: 25
      },
      {
        id: 3,
        title: 'Reading Strategies',
        description: 'Phát triển kỹ năng đọc hiểu và các chiến lược làm bài Reading hiệu quả',
        duration: '4 tuần',
        courses: ['Reading Techniques', 'Question Types', 'Time Management', 'Practice Tests'],
        skills: ['Skimming', 'Scanning', 'Inference', 'Vocabulary'],
        completed: false,
        current: true,
        locked: false,
        progress: 35,
        estimatedHours: 35
      },
      {
        id: 4,
        title: 'Writing Task 1 & 2',
        description: 'Học cách viết Task 1 (biểu đồ, bản đồ) và Task 2 (essay) đạt band 7.0+',
        duration: '6 tuần',
        courses: ['Task 1 Strategies', 'Task 2 Essay Writing', 'Grammar & Vocabulary', 'Writing Practice'],
        skills: ['Task Analysis', 'Essay Structure', 'Academic Writing', 'Grammar'],
        completed: false,
        current: false,
        locked: true,
        progress: 0,
        estimatedHours: 50
      },
      {
        id: 5,
        title: 'Speaking Practice',
        description: 'Luyện tập Speaking với đầy đủ 3 parts và cải thiện fluency, pronunciation',
        duration: '4 tuần',
        courses: ['Speaking Parts 1-3', 'Pronunciation', 'Fluency Training', 'Mock Interviews'],
        skills: ['Fluency', 'Pronunciation', 'Vocabulary Range', 'Grammar'],
        completed: false,
        current: false,
        locked: true,
        progress: 0,
        estimatedHours: 40
      },
      {
        id: 6,
        title: 'Mock Tests',
        description: 'Luyện tập với các bài thi thử hoàn chỉnh và phân tích kết quả chi tiết',
        duration: '2 tuần',
        courses: ['Full Mock Tests', 'Performance Analysis', 'Weak Areas Review', 'Final Preparation'],
        skills: ['Test Strategy', 'Time Management', 'Performance Analysis', 'Confidence'],
        completed: false,
        current: false,
        locked: true,
        progress: 0,
        estimatedHours: 30
      }
    ],
    milestones: [
      { step: 2, title: 'Listening 6.5+', achieved: true },
      { step: 3, title: 'Reading 6.5+', achieved: false },
      { step: 4, title: 'Writing 6.0+', achieved: false },
      { step: 5, title: 'Speaking 6.5+', achieved: false },
      { step: 6, title: 'Overall 7.0+', achieved: false }
    ],
    testimonials: [
      {
        id: 1,
        user: 'Nguyễn Văn A',
        score: '7.5',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        comment: 'Lộ trình rất chi tiết và khoa học. Tôi đã đạt 7.5 overall sau 5 tháng học theo roadmap này.',
        date: '2 tháng trước'
      },
      {
        id: 2,
        user: 'Trần Thị B',
        score: '8.0',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        comment: 'Phần Writing và Speaking được hướng dẫn rất kỹ. Đã cải thiện từ 6.0 lên 8.0 trong 6 tháng.',
        date: '1 tháng trước'
      }
    ],
    stats: {
      totalHours: 185,
      averageCompletion: '5.2 tháng',
      successRate: '92%',
      averageImprovement: '1.5 bands'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-success-100 text-success-800'
      case 'Intermediate': return 'bg-warning-100 text-warning-800'
      case 'Advanced': return 'bg-error-100 text-error-800'
      default: return 'bg-neutral-100 text-neutral-800'
    }
  }

  const getStepStatus = (step: any) => {
    if (step.completed) return { color: 'bg-success-500', text: 'Hoàn thành' }
    if (step.current) return { color: 'bg-brand-500', text: 'Đang học' }
    if (step.locked) return { color: 'bg-neutral-300', text: 'Chưa mở' }
    return { color: 'bg-neutral-400', text: 'Sẵn sàng' }
  }

  const handleEnrollStep = (stepId: number) => {
    setEnrolledSteps([...enrolledSteps, stepId])
  }

  const calculateOverallProgress = () => {
    const totalSteps = roadmap.steps.length
    const completedSteps = roadmap.steps.filter(step => step.completed).length
    const currentProgress = roadmap.steps.find(step => step.current)?.progress || 0
    return Math.round(((completedSteps + currentProgress / 100) / totalSteps) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
          <Link href="/roadmap" className="hover:text-brand-600 transition-colors">
            Lộ trình học tập
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 font-medium">{roadmap.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-brand-700 text-white">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={getLevelColor(roadmap.level)}>
                    {roadmap.level}
                  </Badge>
                  {roadmap.isRecommended && (
                    <Badge className="bg-warning-500 text-white">
                      Đề xuất
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {roadmap.targetScore}
                  </Badge>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {roadmap.title}
                </h1>
                
                <p className="text-lg text-brand-100 mb-6 max-w-2xl">
                  {roadmap.subtitle}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{roadmap.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{roadmap.courses} khóa học</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{roadmap.students} học viên</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{roadmap.rating} ({roadmap.reviews} đánh giá)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Progress */}
            <Card className="border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Tiến độ tổng thể</h3>
                  <span className="text-2xl font-bold text-brand-600">{calculateOverallProgress()}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-brand-500 to-brand-600 h-4 rounded-full transition-all duration-500" 
                    style={{ width: `${calculateOverallProgress()}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">{roadmap.steps.filter(s => s.completed).length}</div>
                    <div className="text-neutral-600">Bước hoàn thành</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{roadmap.stats.totalHours}h</div>
                    <div className="text-neutral-600">Tổng thời gian</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{roadmap.stats.successRate}</div>
                    <div className="text-neutral-600">Tỷ lệ thành công</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{roadmap.stats.averageImprovement}</div>
                    <div className="text-neutral-600">Cải thiện TB</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="roadmap" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-neutral-100 p-1 rounded-2xl">
                <TabsTrigger value="roadmap" className="rounded-xl">Lộ trình</TabsTrigger>
                <TabsTrigger value="overview" className="rounded-xl">Tổng quan</TabsTrigger>
                <TabsTrigger value="milestones" className="rounded-xl">Mốc quan trọng</TabsTrigger>
                <TabsTrigger value="testimonials" className="rounded-xl">Thành công</TabsTrigger>
              </TabsList>

              <TabsContent value="roadmap" className="space-y-6">
                {/* Learning Path */}
                <div className="space-y-6">
                  {roadmap.steps.map((step, index) => {
                    const status = getStepStatus(step)
                    const isEnrolled = enrolledSteps.includes(step.id)
                    
                    return (
                      <Card key={step.id} className={`border-0 shadow-soft ${step.current ? 'ring-2 ring-brand-200' : ''}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-6">
                            {/* Step Number & Status */}
                            <div className="flex flex-col items-center">
                              <div className={`w-12 h-12 rounded-full ${status.color} flex items-center justify-center text-white font-bold`}>
                                {step.completed ? (
                                  <CheckCircle className="w-6 h-6" />
                                ) : (
                                  <span>{index + 1}</span>
                                )}
                              </div>
                              {index < roadmap.steps.length - 1 && (
                                <div className="w-0.5 h-16 bg-neutral-200 mt-4"></div>
                              )}
                            </div>

                            {/* Step Content */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                  <p className="text-neutral-600 mb-3">{step.description}</p>
                                </div>
                                <Badge className={`${status.color.replace('bg-', 'bg-').replace('-500', '-100')} text-${status.color.split('-')[1]}-800`}>
                                  {status.text}
                                </Badge>
                              </div>

                              {/* Progress Bar */}
                              {step.progress > 0 && (
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Tiến độ</span>
                                    <span>{step.progress}%</span>
                                  </div>
                                  <div className="w-full bg-neutral-200 rounded-full h-2">
                                    <div 
                                      className="bg-brand-600 h-2 rounded-full transition-all duration-300" 
                                      style={{ width: `${step.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}

                              {/* Step Details */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                  <Clock className="w-4 h-4" />
                                  <span>{step.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                  <Timer className="w-4 h-4" />
                                  <span>{step.estimatedHours} giờ</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                  <BookOpen className="w-4 h-4" />
                                  <span>{step.courses.length} khóa học</span>
                                </div>
                              </div>

                              {/* Skills */}
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-2">Kỹ năng phát triển:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {step.skills.map((skill, skillIndex) => (
                                    <Badge key={skillIndex} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Courses */}
                              <div className="mb-4">
                                <h4 className="text-sm font-medium mb-2">Khóa học bao gồm:</h4>
                                <ul className="text-sm text-neutral-600 space-y-1">
                                  {step.courses.map((course, courseIndex) => (
                                    <li key={courseIndex} className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
                                      {course}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Action Button */}
                              <div className="flex gap-3">
                                {step.completed ? (
                                  <Button variant="outline" size="sm">
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Đã hoàn thành
                                  </Button>
                                ) : step.current ? (
                                  <Button size="sm">
                                    <Play className="w-4 h-4 mr-2" />
                                    Tiếp tục học
                                  </Button>
                                ) : step.locked ? (
                                  <Button variant="outline" size="sm" disabled>
                                    <span className="w-4 h-4 mr-2">🔒</span>
                                    Chưa mở khóa
                                  </Button>
                                ) : (
                                  <Button 
                                    size="sm"
                                    onClick={() => handleEnrollStep(step.id)}
                                    disabled={isEnrolled}
                                  >
                                    <Play className="w-4 h-4 mr-2" />
                                    {isEnrolled ? 'Đã đăng ký' : 'Bắt đầu'}
                                  </Button>
                                )}
                                
                                {!step.locked && (
                                  <Button variant="ghost" size="sm">
                                    <Eye className="w-4 h-4 mr-2" />
                                    Xem chi tiết
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="overview" className="space-y-6">
                {/* What you'll achieve */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-brand-600" />
                      Bạn sẽ đạt được gì
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {roadmap.whatYouAchieve.map((item, index) => (
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
                    <CardTitle>Mô tả lộ trình</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 leading-relaxed">
                      {roadmap.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <Clock className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{roadmap.stats.totalHours}h</div>
                      <div className="text-sm text-neutral-600">Tổng thời gian</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <TrendingUp className="w-8 h-8 text-success-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{roadmap.stats.successRate}</div>
                      <div className="text-sm text-neutral-600">Tỷ lệ thành công</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <Award className="w-8 h-8 text-warning-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{roadmap.stats.averageImprovement}</div>
                      <div className="text-sm text-neutral-600">Cải thiện TB</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-neutral-900">{roadmap.stats.averageCompletion}</div>
                      <div className="text-sm text-neutral-600">Thời gian TB</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="milestones" className="space-y-6">
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="w-5 h-5 text-warning-500" />
                      Các mốc quan trọng
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roadmap.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl border">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              milestone.achieved ? 'bg-success-100' : 'bg-neutral-100'
                            }`}>
                              {milestone.achieved ? (
                                <Trophy className="w-5 h-5 text-success-600" />
                              ) : (
                                <Flag className="w-5 h-5 text-neutral-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium">{milestone.title}</h4>
                              <p className="text-sm text-neutral-600">Bước {milestone.step}</p>
                            </div>
                          </div>
                          <Badge className={milestone.achieved ? 'bg-success-100 text-success-800' : 'bg-neutral-100 text-neutral-800'}>
                            {milestone.achieved ? 'Đã đạt' : 'Chưa đạt'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-6">
                <div className="space-y-6">
                  {roadmap.testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.user}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <h4 className="font-medium">{testimonial.user}</h4>
                                <Badge className="bg-success-100 text-success-800">
                                  IELTS {testimonial.score}
                                </Badge>
                              </div>
                              <span className="text-sm text-neutral-600">{testimonial.date}</span>
                            </div>
                            <p className="text-neutral-700">{testimonial.comment}</p>
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
              {/* Start Roadmap */}
              <Card className="border-0 shadow-large overflow-hidden">
                <div className="relative">
                  <img
                    src={roadmap.thumbnail}
                    alt={roadmap.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Route className="w-12 h-12 mx-auto mb-2" />
                      <div className="text-lg font-bold">Lộ trình</div>
                      <div className="text-sm">{roadmap.duration}</div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Bắt đầu lộ trình</h3>
                    <p className="text-neutral-600">
                      {roadmap.courses} khóa học • {roadmap.duration}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button 
                      className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-glow"
                      size="lg"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Bắt đầu ngay
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Download className="w-4 h-4 mr-2" />
                      Tải kế hoạch
                    </Button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Lộ trình có hệ thống</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Theo dõi tiến độ</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Chứng chỉ hoàn thành</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Hỗ trợ 24/7</span>
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

              {/* Roadmap Stats */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Thống kê lộ trình</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Trình độ</span>
                      <Badge className={getLevelColor(roadmap.level)}>
                        {roadmap.level}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Đánh giá</span>
                      <span className="font-bold text-lg">{roadmap.rating}/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Tỷ lệ hoàn thành</span>
                      <span className="font-bold text-success-600">{roadmap.completionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Mục tiêu</span>
                      <span className="font-bold">{roadmap.targetScore}</span>
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
                    {roadmap.skills.map((skill, index) => (
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
