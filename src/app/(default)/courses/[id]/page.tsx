"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Globe,
  Download,
  Share2,
  Heart,
  MessageCircle,
  ChevronRight,
  PlayCircle,
  FileText,
  Video,
  Headphones,
  PenTool,
  Target,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock course data - trong thực tế sẽ fetch từ API
  const course = {
    id: courseId,
    title: 'IELTS Complete Course',
    subtitle: 'Khóa học IELTS toàn diện từ 0 đến 8.0+ với đầy đủ 4 kỹ năng',
    description: 'Khóa học IELTS hoàn chỉnh được thiết kế dành cho những ai muốn đạt điểm cao trong kỳ thi IELTS. Với phương pháp giảng dạy hiện đại và tài liệu cập nhật, bạn sẽ được trang bị đầy đủ kiến thức và kỹ năng cần thiết.',
    instructor: {
      name: 'Sarah Johnson',
      title: 'IELTS Expert & Former Examiner',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      students: 15000,
      courses: 12,
      bio: 'Sarah có hơn 10 năm kinh nghiệm giảng dạy IELTS và từng là examiner chính thức của British Council. Cô đã giúp hàng nghìn học viên đạt được điểm số mong muốn.'
    },
    category: 'IELTS',
    level: 'Intermediate',
    duration: '120 giờ',
    students: 5678,
    rating: 4.8,
    reviews: 1234,
    price: 1500000,
    originalPrice: 2000000,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    isPopular: true,
    isFree: false,
    language: 'Tiếng Việt',
    lastUpdated: '2024-01-15',
    certificate: true,
    lifetime: true,
    downloadable: true,
    skills: ['Listening', 'Reading', 'Writing', 'Speaking'],
    requirements: [
      'Trình độ tiếng Anh cơ bản (tương đương 4.0 IELTS)',
      'Máy tính hoặc điện thoại có kết nối internet',
      'Tai nghe để luyện Listening',
      'Quyết tâm học tập 2-3 giờ/ngày'
    ],
    whatYouLearn: [
      'Nắm vững cấu trúc và format của tất cả 4 kỹ năng IELTS',
      'Học các chiến lược làm bài hiệu quả cho từng phần thi',
      'Luyện tập với hơn 500 câu hỏi thực tế',
      'Cải thiện từ vựng và ngữ pháp academic',
      'Phát triển kỹ năng quản lý thời gian trong thi',
      'Tự tin đạt điểm 7.0+ trong kỳ thi IELTS'
    ],
    curriculum: [
      {
        title: 'Introduction to IELTS',
        lessons: 5,
        duration: '2 hours',
        topics: [
          { title: 'IELTS Overview & Test Format', type: 'video', duration: '15 min', free: true },
          { title: 'Scoring System Explained', type: 'video', duration: '20 min', free: true },
          { title: 'Study Plan & Strategy', type: 'text', duration: '10 min', free: false },
          { title: 'Common Mistakes to Avoid', type: 'video', duration: '25 min', free: false },
          { title: 'Practice Test Assessment', type: 'quiz', duration: '60 min', free: false }
        ]
      },
      {
        title: 'IELTS Listening Mastery',
        lessons: 12,
        duration: '8 hours',
        topics: [
          { title: 'Listening Test Overview', type: 'video', duration: '20 min', free: false },
          { title: 'Section 1: Social Situations', type: 'video', duration: '45 min', free: false },
          { title: 'Section 2: Monologues', type: 'video', duration: '45 min', free: false },
          { title: 'Section 3: Academic Discussions', type: 'video', duration: '50 min', free: false },
          { title: 'Section 4: Academic Lectures', type: 'video', duration: '50 min', free: false }
        ]
      },
      {
        title: 'IELTS Reading Strategies',
        lessons: 10,
        duration: '6 hours',
        topics: [
          { title: 'Reading Test Format', type: 'video', duration: '15 min', free: false },
          { title: 'Skimming & Scanning Techniques', type: 'video', duration: '30 min', free: false },
          { title: 'True/False/Not Given Questions', type: 'video', duration: '40 min', free: false },
          { title: 'Multiple Choice Strategies', type: 'video', duration: '35 min', free: false },
          { title: 'Matching Headings', type: 'video', duration: '35 min', free: false }
        ]
      }
    ],
    reviews_data: [
      {
        id: 1,
        user: 'Nguyễn Văn A',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        date: '2 tuần trước',
        comment: 'Khóa học rất chi tiết và dễ hiểu. Tôi đã cải thiện được 1.5 band score sau 2 tháng học.',
        helpful: 23
      },
      {
        id: 2,
        user: 'Trần Thị B',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        rating: 5,
        date: '1 tháng trước',
        comment: 'Sarah giảng dạy rất hay, các chiến lược làm bài rất hiệu quả. Đã đạt 7.5 overall!',
        helpful: 18
      }
    ]
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí'
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video
      case 'text': return FileText
      case 'audio': return Headphones
      case 'quiz': return PenTool
      default: return PlayCircle
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
          <Link href="/courses" className="hover:text-brand-600 transition-colors">
            Khóa học
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 font-medium">{course.title}</span>
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
                    {course.category}
                  </Badge>
                  {course.isPopular && (
                    <Badge className="bg-warning-500 text-white">
                      Phổ biến
                    </Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {course.title}
                </h1>
                
                <p className="text-lg text-brand-100 mb-6 max-w-2xl">
                  {course.subtitle}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-brand-200">({course.reviews} đánh giá)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{course.students} học viên</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{course.language}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-neutral-100 p-1 rounded-2xl">
                <TabsTrigger value="overview" className="rounded-xl">Tổng quan</TabsTrigger>
                <TabsTrigger value="curriculum" className="rounded-xl">Nội dung</TabsTrigger>
                <TabsTrigger value="instructor" className="rounded-xl">Giảng viên</TabsTrigger>
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
                      {course.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Course Description */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Mô tả khóa học</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-700 leading-relaxed">
                      {course.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Requirements */}
                <Card className="border-0 shadow-soft">
                  <CardHeader>
                    <CardTitle>Yêu cầu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="curriculum" className="space-y-4">
                {course.curriculum.map((section, index) => (
                  <Card key={index} className="border-0 shadow-soft">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <div className="text-sm text-neutral-600">
                          {section.lessons} bài • {section.duration}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {section.topics.map((topic, topicIndex) => {
                          const IconComponent = getTypeIcon(topic.type)
                          return (
                            <div key={topicIndex} className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 transition-colors">
                              <div className="flex items-center gap-3">
                                <IconComponent className="w-4 h-4 text-brand-600" />
                                <span className="font-medium">{topic.title}</span>
                                {topic.free && (
                                  <Badge variant="outline" className="text-xs">
                                    Miễn phí
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-neutral-600">
                                <Clock className="w-3 h-3" />
                                {topic.duration}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-1">{course.instructor.name}</h3>
                        <p className="text-brand-600 font-medium mb-4">{course.instructor.title}</p>
                        
                        <div className="grid grid-cols-3 gap-6 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-neutral-900">{course.instructor.rating}</div>
                            <div className="text-sm text-neutral-600">Đánh giá</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-neutral-900">{course.instructor.students.toLocaleString()}</div>
                            <div className="text-sm text-neutral-600">Học viên</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-neutral-900">{course.instructor.courses}</div>
                            <div className="text-sm text-neutral-600">Khóa học</div>
                          </div>
                        </div>
                        
                        <p className="text-neutral-700 leading-relaxed">
                          {course.instructor.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-0 shadow-soft text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-neutral-900 mb-2">{course.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-sm text-neutral-600">{course.reviews} đánh giá</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  {course.reviews_data.map((review) => (
                    <Card key={review.id} className="border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} alt={review.user} />
                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
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
              {/* Course Preview */}
              <Card className="border-0 shadow-large overflow-hidden">
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button size="lg" className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                      <Play className="w-6 h-6 mr-2" />
                      Xem trước
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-neutral-900 mb-1">
                      {formatPrice(course.price)}
                    </div>
                    {course.originalPrice > course.price && (
                      <div className="text-lg text-neutral-500 line-through">
                        {formatPrice(course.originalPrice)}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <Button 
                      className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-glow"
                      size="lg"
                      onClick={() => setIsEnrolled(true)}
                    >
                      {isEnrolled ? 'Đã đăng ký' : 'Đăng ký ngay'}
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Truy cập trọn đời</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Chứng chỉ hoàn thành</span>
                      <CheckCircle className="w-4 h-4 text-success-500" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Tải về offline</span>
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

              {/* Course Features */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Tính năng khóa học</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-brand-600" />
                        </div>
                        <span className="font-medium">{skill}</span>
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
