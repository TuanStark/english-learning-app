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
  Clock, 
  Users, 
  Star, 
  Play,
  CheckCircle,
  Lock,
  Calendar,
  Award,
  Target,
  BarChart3,
  FileText,
  Video,
  Bookmark,
  Share2,
  Heart,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  GraduationCap,
  Clock3,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import { courseApi, type Course, type CourseLesson } from '@/lib/api'

interface CourseDetailPageProps {
  // Add any props if needed
}

export default function CourseDetailPage({}: CourseDetailPageProps) {
  const params = useParams()
  const courseId = params?.id as string
  
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [enrolled, setEnrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [expandedLessons, setExpandedLessons] = useState<number[]>([])
  const [currentLesson, setCurrentLesson] = useState<number | null>(null)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true)
        const response = await courseApi.getById(parseInt(courseId))
        if (response.data) {
          setSelectedCourse(response.data)
          // Mock progress for demo
          setProgress(Math.floor(Math.random() * 100))
        } else {
          setError('Không thể tải thông tin khóa học')
        }
      } catch (err) {
        console.error('Error loading course:', err)
        setError('Đã xảy ra lỗi khi tải khóa học')
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      loadCourse()
    }
  }, [courseId])

  const handleEnroll = () => {
    setEnrolled(true)
    // In real app, this would call backend API
    console.log('Enrolling in course:', courseId)
  }

  const toggleLessonExpansion = (lessonId: number) => {
    setExpandedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    )
  }

  const handleLessonClick = (lessonId: number) => {
    if (enrolled) {
      setCurrentLesson(lessonId)
      // In real app, this would navigate to lesson content
      console.log('Opening lesson:', lessonId)
    }
  }

  const handleLike = () => {
    setLiked(!liked)
    // In real app, this would update backend
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    // In real app, this would update backend
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'Beginner': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
      'Intermediate': 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
      'Advanced': 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
      'default': 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
    }
    return colors[difficulty as keyof typeof colors] || colors.default
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải khóa học...</p>
        </div>
      </div>
    )
  }

  if (error || !selectedCourse) {
  return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Không thể tải khóa học</h2>
          <p className="text-gray-600 mt-2">{error || "Không tìm thấy khóa học"}</p>
          <Button asChild className="mt-4">
            <Link href="/courses">Quay lại Khóa học</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Mock lessons data
  const mockLessons: CourseLesson[] = [
    {
      id: 1,
      title: "Giới thiệu khóa học",
      description: "Tổng quan về nội dung và mục tiêu khóa học",
      duration: 15,
      type: "video",
      isCompleted: false,
      isLocked: false,
      order: 1
    },
    {
      id: 2,
      title: "Cơ bản về ngữ pháp",
      description: "Học các quy tắc ngữ pháp cơ bản",
      duration: 45,
      type: "video",
      isCompleted: false,
      isLocked: false,
      order: 2
    },
    {
      id: 3,
      title: "Bài tập thực hành 1",
      description: "Làm bài tập để củng cố kiến thức",
      duration: 30,
      type: "quiz",
      isCompleted: false,
      isLocked: true,
      order: 3
    },
    {
      id: 4,
      title: "Từ vựng chủ đề 1",
      description: "Học từ vựng theo chủ đề",
      duration: 60,
      type: "video",
      isCompleted: false,
      isLocked: true,
      order: 4
    },
    {
      id: 5,
      title: "Kiểm tra giữa khóa",
      description: "Bài kiểm tra để đánh giá tiến độ",
      duration: 90,
      type: "exam",
      isCompleted: false,
      isLocked: true,
      order: 5
    }
  ]

  const completedLessons = mockLessons.filter(lesson => lesson.isCompleted).length
  const totalLessons = mockLessons.length

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/courses">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại Khóa học
            </Link>
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              {/* Course Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  {/* Category & Difficulty */}
                <div className="flex items-center gap-3 mb-4">
                    {selectedCourse.category && (
                      <Badge variant="outline" className="px-3 py-1">
                        {typeof selectedCourse.category === 'string' ? selectedCourse.category : selectedCourse.category.name}
                  </Badge>
                    )}
                    <Badge className={getDifficultyColor(selectedCourse.difficulty || 'default')}>
                      {selectedCourse.difficulty || 'Beginner'}
                    </Badge>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                      <span className="text-gray-500 text-sm">(128 đánh giá)</span>
                    </div>
                </div>
                
                  {/* Title */}
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                    {selectedCourse.title}
                </h1>
                
                  {/* Description */}
                  <p className="text-xl text-gray-600 leading-relaxed mb-6">
                    {selectedCourse.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{selectedCourse.duration}</p>
                      <p className="text-sm text-gray-600">Phút</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                        <BookOpen className="h-6 w-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{totalLessons}</p>
                      <p className="text-sm text-gray-600">Bài học</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{selectedCourse.enrolledCount || 0}</p>
                      <p className="text-sm text-gray-600">Học viên</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mx-auto mb-2">
                        <Award className="h-6 w-6 text-amber-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">Chứng chỉ</p>
                      <p className="text-sm text-gray-600">Có</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    {enrolled ? (
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                        <Play className="h-4 w-4 mr-2" />
                        Tiếp tục học
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleEnroll}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Đăng ký khóa học
                      </Button>
                    )}
                    
                    <Button variant="outline" onClick={handleLike}>
                      <Heart className={`h-4 w-4 mr-2 ${liked ? 'fill-current text-red-500' : ''}`} />
                      {liked ? 'Đã thích' : 'Thích'}
                    </Button>
                    
                    <Button variant="outline" onClick={handleBookmark}>
                      <Bookmark className={`h-4 w-4 mr-2 ${bookmarked ? 'fill-current text-blue-500' : ''}`} />
                      {bookmarked ? 'Đã lưu' : 'Lưu'}
                    </Button>
                    
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Chia sẻ
                    </Button>
                  </div>
                </div>

                {/* Course Preview */}
                <div className="lg:col-span-1">
                  <div className="relative">
                    {selectedCourse.image && (
                      <img
                        src={selectedCourse.image}
                        alt={selectedCourse.title}
                        className="w-full h-48 object-cover rounded-2xl mb-4"
                      />
                    )}
                    
                    {/* Progress Bar */}
                    {enrolled && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Tiến độ</span>
                          <span className="text-sm font-medium text-gray-700">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {completedLessons}/{totalLessons} bài học hoàn thành
                        </p>
                      </div>
                    )}

                    {/* Course Info */}
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Cập nhật: {formatDate(selectedCourse.updatedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span>Mục tiêu: {selectedCourse.objectives || 'Nâng cao kỹ năng tiếng Anh'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        <span>Trình độ: {selectedCourse.level || 'Cơ bản'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  Nội dung khóa học
                </h2>

                {/* Lessons List */}
                <div className="space-y-4">
                  {mockLessons.map((lesson, index) => (
                    <div key={lesson.id} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => toggleLessonExpansion(lesson.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            {lesson.isCompleted ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : lesson.isLocked ? (
                              <Lock className="h-4 w-4 text-gray-400" />
                            ) : (
                              <span className="text-sm font-medium text-blue-600">{lesson.order}</span>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                            <p className="text-sm text-gray-600">{lesson.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-4 w-4" />
                            <span>{formatDuration(lesson.duration)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            {lesson.type === 'video' && <Video className="h-4 w-4" />}
                            {lesson.type === 'quiz' && <FileText className="h-4 w-4" />}
                            {lesson.type === 'exam' && <BarChart3 className="h-4 w-4" />}
                            <span className="capitalize">{lesson.type}</span>
                    </div>
                          {expandedLessons.includes(lesson.id) ? (
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          )}
                        </div>
                      </div>

                      {expandedLessons.includes(lesson.id) && (
                        <div className="px-4 pb-4 border-t border-gray-100">
                          <div className="pt-4">
                            <p className="text-sm text-gray-600 mb-3">
                              {lesson.description}
                            </p>
                            {!lesson.isLocked ? (
                              <Button 
                                onClick={() => handleLessonClick(lesson.id)}
                                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                              >
                                <Play className="h-4 w-4 mr-2" />
                                Bắt đầu học
                              </Button>
                            ) : (
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Lock className="h-4 w-4" />
                                <span>Hoàn thành bài học trước để mở khóa</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                        ))}
                      </div>

                {/* Course Requirements */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Yêu cầu</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Kiến thức cơ bản về tiếng Anh
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Máy tính hoặc thiết bị di động
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Kết nối internet ổn định
                    </li>
                  </ul>
                </div>

                {/* What You'll Learn */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bạn sẽ học được gì?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Nắm vững ngữ pháp cơ bản</span>
                            </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Mở rộng vốn từ vựng</span>
                            </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Cải thiện kỹ năng giao tiếp</span>
                            </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Chuẩn bị cho các kỳ thi</span>
                          </div>
                        </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Enrollment Card */}
                <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Đăng ký khóa học</h3>
                  
                  {enrolled ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-green-600 font-medium mb-4">Bạn đã đăng ký khóa học này!</p>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                        <Play className="h-4 w-4 mr-2" />
                        Tiếp tục học
                    </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-6">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {selectedCourse.price ? `$${selectedCourse.price}` : 'Miễn phí'}
                        </div>
                        {selectedCourse.originalPrice && selectedCourse.originalPrice > (selectedCourse.price || 0) && (
                          <div className="text-lg text-gray-500 line-through">
                            ${selectedCourse.originalPrice}
                      </div>
                    )}
                  </div>
                  
                    <Button 
                        onClick={handleEnroll}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 mb-4"
                    >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Đăng ký ngay
                    </Button>
                      
                      <p className="text-xs text-gray-500 text-center">
                        Truy cập vô thời hạn • Chứng chỉ hoàn thành • Hỗ trợ 24/7
                      </p>
                    </div>
                  )}
                </div>
                  </div>
                  
              {/* Course Stats */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê khóa học</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Tổng thời gian</span>
                      <span className="font-medium">{selectedCourse.duration} phút</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Số bài học</span>
                      <span className="font-medium">{totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Học viên</span>
                      <span className="font-medium">{selectedCourse.enrolledCount || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Đánh giá</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span className="font-medium">4.8</span>
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                  
              {/* Instructor */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Giảng viên</h3>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {selectedCourse.instructor?.fullName || 'Expert Instructor'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Chuyên gia tiếng Anh với 10+ năm kinh nghiệm
                    </p>
                    <Button variant="outline" className="w-full">
                      Xem profile
                    </Button>
                  </div>
                      </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
