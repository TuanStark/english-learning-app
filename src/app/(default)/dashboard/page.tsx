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
  Award,
  CheckCircle,
  BarChart3,
  Brain,
  Flame
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface DashboardData {
  examStats: {
    total: number
    completed: number
    inProgress: number
    cancelled: number
    averageScore: number
  }
  vocabStats: {
    totalWords: number
    masteredWords: number
    learningWords: number
    needsReviewWords: number
  }
  grammarStats: {
    totalTopics: number
    masteredTopics: number
    learningTopics: number
    needsReviewTopics: number
  }
  overallStats: {
    totalLearningTime: number
    learningStreak: number
    totalCompleted: number
    averageScore: number
  }
  recentExams: Array<{
    id: number
    title: string
    type: string
    score: number
    completedAt: string
  }>
}

interface RecentActivity {
  type: 'exam' | 'vocabulary' | 'grammar'
  id: number
  title: string
  description: string
  status: string
  score?: number
  timestamp: string
  action: string
}

interface Achievement {
  name: string
  icon: string
  earned: boolean
  description: string
}

interface WeeklyGoal {
  name: string
  current: number
  target: number
  icon: string
  progress: number
}

interface WeeklyGoals {
  currentWeek: {
    startDate: string
    endDate: string
    goals: WeeklyGoal[]
  }
  lastWeek: {
    startDate: string
    endDate: string
    goals: WeeklyGoal[]
  }
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoals | null>(null)
  const [learningStreak, setLearningStreak] = useState<number>(0)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    if (user?.id) {
      fetchDashboardData()
    }
  }, [user?.id])

  const fetchDashboardData = async () => {
    if (!user?.id) return
    
    setIsLoadingData(true)
    try {
      // Fetch exam stats from existing endpoint
      const examStatsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/exam-attempts/user/${user.id}/stats`)
      if (examStatsResponse.ok) {
        const examStatsData = await examStatsResponse.json()
        const examStats = examStatsData.data
        
        // Calculate total learning time from exam attempts
        const examAttemptsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/exam-attempts/user/${user.id}`)
        if (examAttemptsResponse.ok) {
          const examAttemptsData = await examAttemptsResponse.json()
          const examAttempts = examAttemptsData.data || []
          
          // Calculate total learning time (sum of timeSpent from completed exams)
          const totalLearningTime = examAttempts
            .filter((attempt: any) => attempt.status === 'Completed' && attempt.timeSpent)
            .reduce((total: number, attempt: any) => total + (attempt.timeSpent || 0), 0)
          
          // Get recent exams for display
          const recentExams = examAttempts
            .filter((attempt: any) => attempt.status === 'Completed')
            .slice(0, 5)
          
          setDashboardData({
            examStats: {
              total: examStats.total,
              completed: examStats.completed,
              inProgress: examStats.inProgress,
              cancelled: examStats.cancelled,
              averageScore: examStats.averageScore || 0,
            },
            vocabStats: {
              totalWords: 0, // Will be fetched separately
              masteredWords: 0,
              learningWords: 0,
              needsReviewWords: 0,
            },
            grammarStats: {
              totalTopics: 0, // Will be fetched separately
              masteredTopics: 0,
              learningTopics: 0,
              needsReviewTopics: 0,
            },
            overallStats: {
              totalLearningTime: Math.round(totalLearningTime / 3600), // Convert seconds to hours
              learningStreak: 0, // Will be calculated
              totalCompleted: examStats.completed,
              averageScore: examStats.averageScore || 0,
            },
            recentExams: recentExams.map((exam: any) => ({
              id: exam.id,
              title: exam.exam?.title || 'Unknown Exam',
              type: exam.exam?.type || 'Unknown',
              score: exam.score,
              completedAt: exam.completedAt,
            })),
          })
        }
      }

      // Fetch vocabulary progress stats
      const vocabStatsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/user-vocabularies-progress/user/${user.id}/stats`)
      if (vocabStatsResponse.ok) {
        const vocabStatsData = await vocabStatsResponse.json()
        const vocabStats = vocabStatsData.data
        
        // Update dashboard data with vocabulary stats
        setDashboardData(prev => prev ? {
          ...prev,
          vocabStats: {
            totalWords: vocabStats.total || 0,
            masteredWords: vocabStats.mastered || 0,
            learningWords: vocabStats.learning || 0,
            needsReviewWords: vocabStats.needsReview || 0,
          }
        } : null)
      }

      // Fetch grammar progress stats
      const grammarStatsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/user-grammar-progress/user/${user.id}/stats`)
      if (grammarStatsResponse.ok) {
        const grammarStatsData = await grammarStatsResponse.json()
        const grammarStats = grammarStatsData.data
        
        // Update dashboard data with grammar stats
        setDashboardData(prev => prev ? {
          ...prev,
          grammarStats: {
            totalTopics: grammarStats.total || 0,
            masteredTopics: grammarStats.mastered || 0,
            learningTopics: grammarStats.learning || 0,
            needsReviewTopics: grammarStats.needsReview || 0,
          }
        } : null)
      }

      // Fetch recent activities (exam attempts)
      const recentExamsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/exam-attempts/user/${user.id}`)
      if (recentExamsResponse.ok) {
        const recentExamsData = await recentExamsResponse.json()
        const recentExams = recentExamsData.data || []
        
        const activities = recentExams.slice(0, 10).map((exam: any) => ({
          type: 'exam',
          id: exam.id,
          title: exam.exam?.title || 'Unknown Exam',
          description: `${exam.exam?.type || 'Unknown'} exam`,
          status: exam.status,
          score: exam.score,
          timestamp: exam.updatedAt,
          action: exam.status === 'Completed' ? 'Completed' : exam.status === 'InProgress' ? 'Started' : 'Cancelled',
        }))
        
        setRecentActivities(activities)
      }

      // Calculate learning streak based on recent activities
      const learningStreak = await calculateLearningStreak(user.id)
      setLearningStreak(learningStreak)
      
      // Update dashboard data with learning streak
      setDashboardData(prev => prev ? {
        ...prev,
        overallStats: {
          ...prev.overallStats,
          learningStreak: learningStreak,
        }
      } : null)

      // Generate achievements based on stats
      const achievements = generateAchievements(dashboardData, learningStreak)
      setAchievements(achievements)

      // Generate weekly goals based on current week
      const weeklyGoals = generateWeeklyGoals()
      setWeeklyGoals(weeklyGoals)

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoadingData(false)
    }
  }

  // Helper function to calculate learning streak
  const calculateLearningStreak = async (userId: string | number): Promise<number> => {
    try {
      // Get exam attempts from last 30 days
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8001'}/exam-attempts/user/${userId}`)
      if (response.ok) {
        const data = await response.json()
        const attempts = data.data || []
        
        const today = new Date()
        let currentStreak = 0
        const currentDate = new Date(today)
        
        // Check last 30 days for activity
        for (let i = 0; i < 30; i++) {
          const hasActivity = attempts.some((attempt: any) => {
            const attemptDate = new Date(attempt.updatedAt)
            return attemptDate.toDateString() === currentDate.toDateString()
          })
          
          if (hasActivity) {
            currentStreak++
          } else {
            break
          }
          
          currentDate.setDate(currentDate.getDate() - 1)
        }
        
        return currentStreak
      }
    } catch (error) {
      console.error('Error calculating learning streak:', error)
    }
    
    return 0
  }

  // Helper function to generate achievements
  const generateAchievements = (data: DashboardData | null, streak: number): Achievement[] => {
    const achievements: Achievement[] = []
    
    if (!data) return achievements
    
    // Exam achievements
    if (data.examStats.total >= 1) achievements.push({ name: 'First Exam', icon: '🎯', earned: true, description: 'Complete your first exam' })
    if (data.examStats.completed >= 5) achievements.push({ name: 'Exam Master', icon: '🏆', earned: true, description: 'Complete 5 exams' })
    if (data.examStats.averageScore >= 8.0) achievements.push({ name: 'High Achiever', icon: '⭐', earned: true, description: 'Maintain 8.0+ average score' })
    
    // Vocabulary achievements
    if (data.vocabStats.totalWords >= 50) achievements.push({ name: 'Vocabulary Builder', icon: '📚', earned: true, description: 'Learn 50+ words' })
    if (data.vocabStats.masteredWords >= 100) achievements.push({ name: 'Word Master', icon: '🧠', earned: true, description: 'Master 100+ words' })
    
    // Grammar achievements
    if (data.grammarStats.masteredTopics >= 10) achievements.push({ name: 'Grammar Expert', icon: '📝', earned: true, description: 'Master 10+ grammar topics' })
    
    // Streak achievements
    if (streak >= 7) achievements.push({ name: 'Week Warrior', icon: '🔥', earned: true, description: '7-day learning streak' })
    if (streak >= 30) achievements.push({ name: 'Monthly Master', icon: '💪', earned: true, description: '30-day learning streak' })
    
    // Time achievements
    if (data.overallStats.totalLearningTime >= 10) achievements.push({ name: 'Dedicated Learner', icon: '⏰', earned: true, description: '10+ hours of learning' })
    if (data.overallStats.totalLearningTime >= 50) achievements.push({ name: 'Time Master', icon: '⌛', earned: true, description: '50+ hours of learning' })
    
    return achievements
  }

  // Helper function to generate weekly goals
  const generateWeeklyGoals = (): WeeklyGoals => {
    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - now.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    
    return {
      currentWeek: {
        startDate: startOfWeek.toISOString(),
        endDate: endOfWeek.toISOString(),
        goals: [
          {
            name: 'Complete lessons',
            current: 0, // Will be calculated from data
            target: 5,
            icon: '📖',
            progress: 0,
          },
          {
            name: 'Take exams',
            current: 0, // Will be calculated from data
            target: 2,
            icon: '📝',
            progress: 0,
          },
          {
            name: 'Learn vocabulary',
            current: 0, // Will be calculated from data
            target: 30,
            icon: '🧠',
            progress: 0,
          },
          {
            name: 'Study days',
            current: 0, // Will be calculated from data
            target: 5,
            icon: '📅',
            progress: 0,
          },
        ],
      },
      lastWeek: {
        startDate: new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date(startOfWeek.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        goals: [
          {
            name: 'Complete lessons',
            current: 0,
            target: 5,
            icon: '📖',
            progress: 0,
          },
          {
            name: 'Take exams',
            current: 0,
            target: 2,
            icon: '📝',
            progress: 0,
          },
          {
            name: 'Learn vocabulary',
            current: 0,
            target: 30,
            icon: '🧠',
            progress: 0,
          },
          {
            name: 'Study days',
            current: 0,
            target: 5,
            icon: '📅',
            progress: 0,
          },
        ],
      },
    }
  }

  if (isLoading || isLoadingData) {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Hôm qua'
    if (diffDays === 0) return 'Hôm nay'
    if (diffDays < 7) return `${diffDays} ngày trước`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`
    return `${Math.floor(diffDays / 30)} tháng trước`
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'exam': return <BarChart3 className="h-4 w-4" />
      case 'vocabulary': return <Brain className="h-4 w-4" />
      case 'grammar': return <BookOpen className="h-4 w-4" />
      default: return <Star className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'exam': return 'text-blue-600'
      case 'vocabulary': return 'text-purple-600'
      case 'grammar': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        {/* Welcome Section - Improved */}
        <div className="mb-8 lg:mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              <Avatar className="h-16 w-16 lg:h-20 lg:w-20 ring-4 ring-blue-100 shadow-lg">
                <AvatarImage src={user.image || ""} alt={user.name || ""} />
                <AvatarFallback className="text-lg lg:text-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold">
                  {getUserInitials(user.name || "U")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Chào mừng trở lại, {user.name}! 👋
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-gray-600 max-w-2xl">
                  {learningStreak > 0 
                    ? `Tuyệt vời! Bạn đã duy trì streak ${learningStreak} ngày liên tiếp. Hãy tiếp tục phát huy! 🔥`
                    : "Hãy bắt đầu hành trình học tiếng Anh của bạn ngay hôm nay! 🚀"
                  }
                </p>
                {learningStreak > 0 && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Flame className="h-4 w-4" />
                    {learningStreak} ngày học liên tiếp
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Improved Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Bài thi đã hoàn thành
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-600">
                    {dashboardData?.overallStats.totalCompleted || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {dashboardData?.examStats.total ? `${Math.round((dashboardData.overallStats.totalCompleted / dashboardData.examStats.total) * 100)}% hoàn thành` : 'Chưa có bài thi nào'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Điểm trung bình
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-600">
                    {dashboardData?.overallStats.averageScore?.toFixed(1) || '0.0'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {dashboardData?.overallStats.averageScore && dashboardData.overallStats.averageScore >= 8.0 
                      ? 'Xuất sắc! 🎯' 
                      : dashboardData?.overallStats.averageScore && dashboardData.overallStats.averageScore >= 6.0 
                        ? 'Khá tốt! 💪' 
                        : 'Cần cải thiện 📚'
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Streak học tập
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-orange-600">
                    {learningStreak}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {learningStreak >= 7 ? '🔥 Tuần này' : learningStreak >= 3 ? '💪 Đang phát triển' : 'Bắt đầu thôi!'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Thời gian học
                  </p>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-600">
                    {dashboardData?.overallStats.totalLearningTime || 0}h
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {dashboardData?.overallStats.totalLearningTime && dashboardData.overallStats.totalLearningTime >= 10 
                      ? 'Chăm chỉ! ⏰' 
                      : 'Hãy dành thêm thời gian 📖'
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid - Improved Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Recent Results - Improved */}
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Kết quả gần đây</div>
                    <div className="text-sm font-normal text-gray-600">Các bài thi và hoạt động học tập gần đây</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData?.recentExams && dashboardData.recentExams.length > 0 ? (
                    dashboardData.recentExams.slice(0, 5).map((exam) => (
                      <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                          <div className="w-14 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-sm">
                            <BarChart3 className="h-5 w-5 text-white" />
                          </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">{exam.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                {exam.type}
                              </Badge>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{formatDate(exam.completedAt)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600 mb-1">
                            {exam.score?.toFixed(1) || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">điểm</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có bài thi nào</h3>
                      <p className="text-gray-500 mb-4">Hãy bắt đầu với bài thi đầu tiên để xem kết quả của bạn!</p>
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/exams">
                          <Target className="mr-2 h-4 w-4" />
                          Làm bài thi ngay
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goals - Improved */}
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Mục tiêu tuần này</div>
                    <div className="text-sm font-normal text-gray-600">Theo dõi tiến độ học tập của bạn</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyGoals?.currentWeek.goals.map((goal, index) => {
                    const progress = goal.current >= goal.target ? 100 : Math.round((goal.current / goal.target) * 100)
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                            <span className="text-2xl">{goal.icon}</span>
                            <span className="font-medium text-gray-900">{goal.name}</span>
                      </div>
                          <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">
                          {goal.current}/{goal.target}
                        </span>
                        {goal.current >= goal.target ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-5 w-5" />
                                <span className="text-xs font-medium">Hoàn thành!</span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">{progress}%</span>
                            )}
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className={`h-2.5 rounded-full transition-all duration-500 ${
                              goal.current >= goal.target 
                                ? 'bg-green-500' 
                                : progress >= 70 
                                  ? 'bg-yellow-500' 
                                  : progress >= 40 
                                    ? 'bg-blue-500' 
                                    : 'bg-gray-400'
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Improved */}
          <div className="space-y-6">
            {/* Quick Actions - Improved */}
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold">Hành động nhanh</CardTitle>
                <CardDescription className="text-sm text-gray-600">Bắt đầu học ngay bây giờ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start h-12" variant="outline" asChild>
                  <Link href="/exams">
                    <Target className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Luyện đề thi</div>
                      <div className="text-xs text-gray-500">Kiểm tra kiến thức</div>
                    </div>
                  </Link>
                </Button>
                <Button className="w-full justify-start h-12" variant="outline" asChild>
                  <Link href="/vocabulary">
                    <BookOpen className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Học từ vựng</div>
                      <div className="text-xs text-gray-500">Mở rộng vốn từ</div>
                    </div>
                  </Link>
                </Button>
                <Button className="w-full justify-start h-12" variant="outline" asChild>
                  <Link href="/grammar">
                    <Star className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Ôn ngữ pháp</div>
                      <div className="text-xs text-gray-500">Củng cố kiến thức</div>
                    </div>
                  </Link>
                </Button>
                <Button className="w-full justify-start h-12" variant="outline" asChild>
                  <Link href="/roadmap">
                    <TrendingUp className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Lộ trình học</div>
                      <div className="text-xs text-gray-500">Kế hoạch học tập</div>
                    </div>
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activities - Improved */}
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <BarChart3 className="h-5 w-5" />
                  Hoạt động gần đây
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.length > 0 ? (
                    recentActivities.slice(0, 6).map((activity) => (
                      <div key={`${activity.type}-${activity.id}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className={`p-2 rounded-lg ${getActivityColor(activity.type)} bg-white shadow-sm`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900 line-clamp-1">{activity.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                activity.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                activity.status === 'InProgress' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {activity.action}
                            </Badge>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{formatDate(activity.timestamp)}</span>
                          </div>
                        </div>
                        {activity.score && (
                          <div className="text-right">
                            <div className="text-sm font-bold text-green-600">{activity.score}</div>
                            <div className="text-xs text-gray-500">điểm</div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BarChart3 className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500">Chưa có hoạt động nào</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Achievements - Improved */}
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Award className="h-5 w-5" />
                  Thành tích
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">Những cột mốc đáng nhớ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.length > 0 ? (
                    achievements.slice(0, 6).map((achievement, index) => (
                    <div 
                      key={index} 
                        className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-200 ${
                          achievement.earned 
                            ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-md' 
                            : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                      >
                        <span className="text-2xl mb-2">{achievement.icon}</span>
                        <span className="text-xs text-center font-medium text-gray-700">{achievement.name}</span>
                        {achievement.earned && (
                          <div className="mt-1 text-xs text-blue-600 font-medium">Đạt được!</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500">Chưa có thành tích nào</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Learning Progress - Improved */}
            <Card className="border-0 shadow-md bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <TrendingUp className="h-5 w-5" />
                  Tiến độ học tập
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">Theo dõi sự tiến bộ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">Từ vựng</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {dashboardData?.vocabStats.masteredWords || 0}/{dashboardData?.vocabStats.totalWords || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${dashboardData?.vocabStats.totalWords ? Math.min((dashboardData.vocabStats.masteredWords / dashboardData.vocabStats.totalWords) * 100, 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    {dashboardData?.vocabStats.totalWords ? 
                      `${Math.round((dashboardData.vocabStats.masteredWords / dashboardData.vocabStats.totalWords) * 100)}% hoàn thành` : 
                      'Chưa có từ vựng nào'
                    }
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900">Ngữ pháp</span>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {dashboardData?.grammarStats.masteredTopics || 0}/{dashboardData?.grammarStats.totalTopics || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${dashboardData?.grammarStats.totalTopics ? Math.min((dashboardData.grammarStats.masteredTopics / dashboardData.grammarStats.totalTopics) * 100, 100) : 0}%` 
                      }}
                    ></div>
                    </div>
                  <div className="text-xs text-gray-500 text-center">
                    {dashboardData?.grammarStats.totalTopics ? 
                      `${Math.round((dashboardData.grammarStats.masteredTopics / dashboardData.grammarStats.totalTopics) * 100)}% hoàn thành` : 
                      'Chưa có chủ đề nào'
                    }
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
