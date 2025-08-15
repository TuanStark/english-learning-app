"use client"

import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Target, 
  Trophy, 
  Clock, 
  TrendingUp,
  Play,
  Star,
  Calendar,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Flame,
  Brain
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bạn chưa đăng nhập</h1>
          <Button asChild>
            <Link href="/auth">Đăng nhập ngay</Link>
          </Button>
        </div>
      </div>
    )
  }

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const currentCourses = [
    {
      id: 1,
      title: 'IELTS Speaking Mastery',
      progress: 67,
      currentLesson: 'Describing Places',
      lessonNumber: 8,
      totalLessons: 12,
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Grammar Fundamentals',
      progress: 75,
      currentLesson: 'Present Perfect',
      lessonNumber: 15,
      totalLessons: 20,
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop'
    }
  ]

  const recentTests = [
    {
      id: 1,
      title: 'IELTS Reading Practice Test 1',
      score: 7.5,
      date: '2 ngày trước',
      type: 'Reading'
    },
    {
      id: 2,
      title: 'Grammar Test: Tenses',
      score: 8.2,
      date: '5 ngày trước',
      type: 'Grammar'
    }
  ]

  const weeklyGoals = [
    { name: 'Hoàn thành 3 bài học', current: 2, target: 3, icon: BookOpen },
    { name: 'Làm 2 bài test', current: 1, target: 2, icon: Target },
    { name: 'Học 50 từ vựng mới', current: 35, target: 50, icon: Brain },
    { name: 'Học 5 ngày liên tiếp', current: 3, target: 5, icon: Flame }
  ]

  const achievements = [
    { name: 'Streak 7 ngày', icon: Flame, color: 'text-orange-500', earned: true },
    { name: 'Hoàn thành khóa học đầu tiên', icon: Trophy, color: 'text-yellow-500', earned: true },
    { name: '100 từ vựng', icon: Brain, color: 'text-purple-500', earned: true },
    { name: 'Điểm test 8.0+', icon: Star, color: 'text-blue-500', earned: false }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-white/20 p-8 mb-8">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 ring-4 ring-brand-100">
                <AvatarImage src={user.image || ""} alt={user.name || ""} />
                <AvatarFallback className="text-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white">
                  {getUserInitials(user.name || "U")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
                  <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
                    Chào mừng trở lại, {user.name}!
                  </span>
                </h1>
                <p className="text-lg text-neutral-600">
                  Hãy tiếp tục hành trình học tiếng Anh của bạn. Bạn đang có tiến bộ tuyệt vời! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-2">
                    Khóa học đã hoàn thành
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">12</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-2">
                    Điểm trung bình
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-success-500 to-success-600 bg-clip-text text-transparent">8.5</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-2xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-2">
                    Streak học tập
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-warning-500 to-warning-600 bg-clip-text text-transparent">15</p>
                  <p className="text-xs text-neutral-500">ngày</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-warning-500 to-warning-600 rounded-2xl flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-soft bg-white/80 backdrop-blur-sm hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 mb-2">
                    Thời gian học
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">45h</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Tiếp tục học tập
                </CardTitle>
                <CardDescription>
                  Hoàn thành các khóa học đang theo dõi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-16 h-12 rounded object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-gray-600">
                            Bài {course.lessonNumber}/{course.totalLessons} - {course.currentLesson}
                          </p>
                          <div className="w-48 bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <Button asChild>
                        <Link href={`/courses/${course.id}`}>
                          Tiếp tục
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Mục tiêu tuần này
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <goal.icon className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">{goal.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          {goal.current}/{goal.target}
                        </span>
                        {goal.current >= goal.target ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(goal.current / goal.target) * 100}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hành động nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/practice">
                    <Target className="mr-2 h-4 w-4" />
                    Luyện đề thi
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/vocabulary">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Học từ vựng
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/grammar">
                    <Star className="mr-2 h-4 w-4" />
                    Ôn ngữ pháp
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/roadmap">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Lộ trình học
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Test Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Kết quả gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm line-clamp-1">{test.title}</h4>
                        <p className="text-xs text-gray-500">{test.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{test.score}</div>
                        <Badge variant="secondary" className="text-xs">{test.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Thành tích
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        achievement.earned ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200 opacity-50'
                      }`}
                    >
                      <achievement.icon className={`h-6 w-6 mb-2 ${achievement.color}`} />
                      <span className="text-xs text-center font-medium">{achievement.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Sắp tới
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="font-medium">IELTS Mock Test</p>
                      <p className="text-gray-600">Hôm nay, 19:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="font-medium">Grammar Review</p>
                      <p className="text-gray-600">Mai, 20:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <div>
                      <p className="font-medium">Vocabulary Quiz</p>
                      <p className="text-gray-600">Thứ 6, 18:30</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
