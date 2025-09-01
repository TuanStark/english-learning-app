"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { 
  Search, 
  Filter, 
  BookOpen, 
  Users, 
  Star, 
  Clock, 
  Play,
  Sparkles,
  Brain,
  Zap,
  Target,
  GraduationCap,
  Heart,
  Crown,
  TrendingUp,
  Award,
  Globe,
  Lightbulb,
  Rocket,
  Eye,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  BookMarked,
  Flame
} from "lucide-react"
import Link from "next/link"

// Mock data for grammar lessons
const mockGrammarLessons = [
  {
    id: 1,
    title: "Present Perfect Tense: Complete Guide",
    description: "Học cách sử dụng thì hiện tại hoàn thành một cách chính xác và tự nhiên trong giao tiếp hàng ngày.",
    instructor: "Dr. Sarah Johnson",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    level: "Intermediate",
    category: "Verb Tenses",
    duration: "45 minutes",
    students: 1250,
    rating: 4.8,
    reviews: 89,
    progress: 75,
    isNew: true,
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop",
    features: ["Video Lessons", "Practice Exercises", "Quizzes", "Progress Tracking"],
    tags: ["Present Perfect", "Verb Tenses", "Grammar", "Intermediate"]
  },
  {
    id: 2,
    title: "Conditional Sentences: Zero to Third",
    description: "Nắm vững tất cả các loại câu điều kiện từ cơ bản đến nâng cao với ví dụ thực tế.",
    instructor: "Prof. Michael Chen",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    level: "Advanced",
    category: "Conditionals",
    duration: "60 minutes",
    students: 890,
    rating: 4.7,
    reviews: 67,
    progress: 100,
    isNew: false,
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    features: ["Interactive Examples", "Real-world Usage", "Advanced Patterns", "Writing Practice"],
    tags: ["Conditionals", "Advanced Grammar", "Writing", "Speaking"]
  },
  {
    id: 3,
    title: "Articles: A, An, The - When to Use",
    description: "Học cách sử dụng mạo từ chính xác trong tiếng Anh với quy tắc rõ ràng và bài tập thực hành.",
    instructor: "Emma Wilson",
    instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    level: "Beginner",
    category: "Articles",
    duration: "30 minutes",
    students: 2100,
    rating: 4.9,
    reviews: 156,
    progress: 0,
    isNew: false,
    isFree: true,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    features: ["Clear Rules", "Practice Exercises", "Common Mistakes", "Pronunciation"],
    tags: ["Articles", "Beginner", "Basic Grammar", "Free"]
  },
  {
    id: 4,
    title: "Modal Verbs: Can, Could, May, Might",
    description: "Hiểu sâu về động từ khiếm khuyết và cách sử dụng chúng để diễn đạt ý nghĩa chính xác.",
    instructor: "David Thompson",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    level: "Intermediate",
    category: "Modal Verbs",
    duration: "50 minutes",
    students: 750,
    rating: 4.6,
    reviews: 45,
    progress: 25,
    isNew: false,
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    features: ["Modal Meanings", "Usage Examples", "Practice Dialogues", "Speaking Exercises"],
    tags: ["Modal Verbs", "Intermediate", "Speaking", "Grammar"]
  },
  {
    id: 5,
    title: "Passive Voice: Construction & Usage",
    description: "Học cách xây dựng và sử dụng câu bị động một cách tự nhiên trong văn viết và giao tiếp.",
    instructor: "Lisa Park",
    instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    level: "Advanced",
    category: "Passive Voice",
    duration: "55 minutes",
    students: 1100,
    rating: 4.8,
    reviews: 78,
    progress: 50,
    isNew: true,
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    features: ["Structure Patterns", "Formal Writing", "Academic Usage", "Style Guide"],
    tags: ["Passive Voice", "Advanced", "Writing", "Academic"]
  },
  {
    id: 6,
    title: "Relative Clauses: Who, Which, That",
    description: "Làm chủ mệnh đề quan hệ để tạo câu phức tạp và mạch lạc trong tiếng Anh.",
    instructor: "Maria Garcia",
    instructorAvatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face",
    level: "Intermediate",
    category: "Clauses",
    duration: "40 minutes",
    students: 1800,
    rating: 4.9,
    reviews: 234,
    progress: 0,
    isNew: false,
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    features: ["Clause Types", "Punctuation Rules", "Writing Practice", "Speaking Exercises"],
    tags: ["Relative Clauses", "Intermediate", "Writing", "Complex Sentences"]
  }
]

export default function GrammarPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [hoveredLesson, setHoveredLesson] = useState<number | null>(null)

  const categories = ["all", "Verb Tenses", "Conditionals", "Articles", "Modal Verbs", "Passive Voice", "Clauses"]
  const difficulties = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredLessons = mockGrammarLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || lesson.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || lesson.level === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "Intermediate":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "Advanced":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Verb Tenses":
        return <Clock className="h-4 w-4" />
      case "Conditionals":
        return <Target className="h-4 w-4" />
      case "Articles":
        return <BookOpen className="h-4 w-4" />
      case "Modal Verbs":
        return <Zap className="h-4 w-4" />
      case "Passive Voice":
        return <MessageCircle className="h-4 w-4" />
      case "Clauses":
        return <Brain className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress === 0) return "bg-gray-200"
    if (progress < 50) return "bg-red-500"
    if (progress < 100) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getProgressText = (progress: number) => {
    if (progress === 0) return "Chưa bắt đầu"
    if (progress < 50) return "Đang học"
    if (progress < 100) return "Gần hoàn thành"
    return "Đã hoàn thành"
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        <div className="absolute top-1/3 left-1/3 w-36 h-36 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-blue-600 animate-pulse" />
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Grammar Mastery
                </h1>
                <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Làm chủ ngữ pháp tiếng Anh với các bài học tương tác, ví dụ thực tế và bài tập thực hành 
                từ cơ bản đến nâng cao
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bài học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 rounded-2xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "Tất cả danh mục" : category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Filter */}
                <div className="relative">
                  <Zap className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty === "all" ? "Tất cả cấp độ" : difficulty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, label: "Tổng bài học", value: mockGrammarLessons.length, color: "from-blue-500 to-cyan-500" },
              { icon: CheckCircle, label: "Đã hoàn thành", value: mockGrammarLessons.filter(l => l.progress === 100).length, color: "from-green-500 to-emerald-500" },
              { icon: Brain, label: "Đang học", value: mockGrammarLessons.filter(l => l.progress > 0 && l.progress < 100).length, color: "from-amber-500 to-orange-500" },
              { icon: Star, label: "Điểm trung bình", value: "4.8/5.0", color: "from-purple-500 to-pink-500" }
            ].map((stat, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-30`}></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 text-center shadow-2xl border border-white/20 transform group-hover:scale-105 transition-all duration-500">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-2xl mb-4 shadow-lg`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Lessons */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Crown className="h-8 w-8 text-amber-500" />
            <h2 className="text-3xl font-bold text-gray-900">Bài học nổi bật</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockGrammarLessons.filter(lesson => lesson.isNew || lesson.isFree).map((lesson) => (
              <div
                key={lesson.id}
                className="relative group"
                onMouseEnter={() => setHoveredLesson(lesson.id)}
                onMouseLeave={() => setHoveredLesson(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700`}></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                  {/* New Badge */}
                  {lesson.isNew && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                        <Sparkles className="h-3 w-3 mr-1" />
                        New
                      </Badge>
                    </div>
                  )}

                  {/* Free Badge */}
                  {lesson.isFree && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Free
                      </Badge>
                    </div>
                  )}

                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                    <img 
                      src={lesson.thumbnail} 
                      alt={lesson.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category & Difficulty */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {getCategoryIcon(lesson.category)}
                        <span className="ml-1">{lesson.category}</span>
                      </Badge>
                      <Badge className={`${getDifficultyColor(lesson.level)} px-2 py-1 rounded-full text-xs font-medium`}>
                        {lesson.level}
                      </Badge>
                    </div>

                    {/* Title */}
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {lesson.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                      {lesson.description}
                    </CardDescription>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Tiến độ học tập</span>
                        <span className="font-medium">{lesson.progress}%</span>
                      </div>
                      <Progress value={lesson.progress} className="h-2 bg-gray-200">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${lesson.progress}%`,
                            backgroundColor: lesson.progress === 0 ? '#e5e7eb' : 
                                           lesson.progress < 50 ? '#ef4444' : 
                                           lesson.progress < 100 ? '#f59e0b' : '#10b981'
                          }}
                        />
                      </Progress>
                      <div className="text-xs text-gray-500 mt-1">{getProgressText(lesson.progress)}</div>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={lesson.instructorAvatar} 
                        alt={lesson.instructor}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700 font-medium">{lesson.instructor}</span>
                    </div>

                    {/* Lesson Details */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{lesson.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{lesson.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{lesson.rating}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl py-3 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <Link href={`/grammar/${lesson.id}`}>
                        {lesson.progress === 0 ? 'Bắt đầu học' : 
                         lesson.progress < 100 ? 'Tiếp tục học' : 'Đã hoàn thành'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Lessons */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-gray-900">Tất cả bài học</h2>
          </div>
          
          {filteredLessons.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài học</h3>
                  <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                      setSelectedDifficulty("all")
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl px-6 py-2"
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredLesson(lesson.id)}
                  onMouseLeave={() => setHoveredLesson(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700`}></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                    {/* Free Badge */}
                    {lesson.isFree && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Free
                        </Badge>
                      </div>
                    )}

                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                      <img 
                        src={lesson.thumbnail} 
                        alt={lesson.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category & Difficulty */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {getCategoryIcon(lesson.category)}
                          <span className="ml-1">{lesson.category}</span>
                        </Badge>
                        <Badge className={`${getDifficultyColor(lesson.level)} px-2 py-1 rounded-full text-xs font-medium`}>
                          {lesson.level}
                        </Badge>
                      </div>

                      {/* Title */}
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {lesson.title}
                      </CardTitle>

                      {/* Description */}
                      <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                        {lesson.description}
                      </CardDescription>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Tiến độ học tập</span>
                          <span className="font-medium">{lesson.progress}%</span>
                        </div>
                        <Progress value={lesson.progress} className="h-2 bg-gray-200">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${lesson.progress}%`,
                              backgroundColor: lesson.progress === 0 ? '#e5e7eb' : 
                                             lesson.progress < 50 ? '#ef4444' : 
                                             lesson.progress < 100 ? '#f59e0b' : '#10b981'
                            }}
                          />
                        </Progress>
                        <div className="text-xs text-gray-500 mt-1">{getProgressText(lesson.progress)}</div>
                      </div>

                      {/* Instructor */}
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={lesson.instructorAvatar} 
                          alt={lesson.instructor}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-700 font-medium">{lesson.instructor}</span>
                      </div>

                      {/* Lesson Details */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{lesson.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{lesson.rating}</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        asChild
                        variant="outline"
                        className="w-full border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-2xl py-3 transform hover:scale-105 transition-all duration-300"
                      >
                        <Link href={`/grammar/${lesson.id}`}>
                          {lesson.progress === 0 ? 'Bắt đầu học' : 
                           lesson.progress < 100 ? 'Tiếp tục học' : 'Đã hoàn thành'}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
