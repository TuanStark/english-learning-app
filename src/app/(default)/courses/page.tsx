"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Briefcase
} from "lucide-react"
import Link from "next/link"

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    title: "IELTS Mastery: Complete Preparation Course",
    description: "Khóa học toàn diện giúp bạn đạt điểm IELTS 7.0+ với phương pháp học hiện đại và thực hành liên tục.",
    instructor: "Sarah Johnson",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    level: "Advanced",
    category: "Test Preparation",
    duration: "12 weeks",
    students: 1250,
    rating: 4.8,
    reviews: 89,
    price: 299,
    originalPrice: 399,
    isPopular: true,
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    features: ["Mock Tests", "1-on-1 Coaching", "Study Materials", "Progress Tracking"],
    tags: ["IELTS", "English", "Test Prep", "Speaking", "Writing"]
  },
  {
    id: 2,
    title: "Business English for Professionals",
    description: "Nâng cao kỹ năng tiếng Anh thương mại để thăng tiến trong sự nghiệp và giao tiếp hiệu quả với đối tác quốc tế.",
    instructor: "Michael Chen",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    level: "Intermediate",
    category: "Business English",
    duration: "8 weeks",
    students: 890,
    rating: 4.7,
    reviews: 67,
    price: 199,
    originalPrice: 249,
    isPopular: false,
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    features: ["Case Studies", "Role Playing", "Business Vocabulary", "Networking Skills"],
    tags: ["Business", "Professional", "Communication", "Vocabulary"]
  },
  {
    id: 3,
    title: "English Conversation Mastery",
    description: "Luyện tập giao tiếp tiếng Anh tự nhiên và trôi chảy với người bản xứ và bạn học từ khắp nơi trên thế giới.",
    instructor: "Emma Wilson",
    instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    level: "Beginner",
    category: "Conversation",
    duration: "6 weeks",
    students: 2100,
    rating: 4.9,
    reviews: 156,
    price: 0,
    originalPrice: 149,
    isPopular: true,
    isFree: true,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    features: ["Live Sessions", "Group Practice", "Pronunciation", "Cultural Insights"],
    tags: ["Conversation", "Speaking", "Beginner", "Free", "Practice"]
  },
  {
    id: 4,
    title: "Advanced Grammar & Writing",
    description: "Học ngữ pháp nâng cao và kỹ thuật viết bài luận, báo cáo chuyên nghiệp bằng tiếng Anh.",
    instructor: "David Thompson",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    level: "Advanced",
    category: "Grammar",
    duration: "10 weeks",
    students: 750,
    rating: 4.6,
    reviews: 45,
    price: 249,
    originalPrice: 299,
    isPopular: false,
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop",
    features: ["Grammar Rules", "Writing Techniques", "Essay Structure", "Peer Review"],
    tags: ["Grammar", "Writing", "Advanced", "Academic"]
  },
  {
    id: 5,
    title: "TOEIC Success Strategy",
    description: "Chiến lược đạt điểm cao TOEIC với các bài tập thực hành và mẹo làm bài thi hiệu quả.",
    instructor: "Lisa Park",
    instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    level: "Intermediate",
    category: "Test Preparation",
    duration: "8 weeks",
    students: 1100,
    rating: 4.8,
    reviews: 78,
    price: 179,
    originalPrice: 229,
    isPopular: true,
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    features: ["Practice Tests", "Listening Skills", "Reading Skills", "Time Management"],
    tags: ["TOEIC", "Test Prep", "Listening", "Reading"]
  },
  {
    id: 6,
    title: "English for Kids: Fun Learning",
    description: "Khóa học tiếng Anh vui nhộn dành cho trẻ em với hoạt động tương tác, bài hát và trò chơi giáo dục.",
    instructor: "Maria Garcia",
    instructorAvatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face",
    level: "Beginner",
    category: "Kids English",
    duration: "12 weeks",
    students: 1800,
    rating: 4.9,
    reviews: 234,
    price: 99,
    originalPrice: 149,
    isPopular: false,
    isFree: false,
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    features: ["Interactive Games", "Songs & Stories", "Progress Rewards", "Parent Dashboard"],
    tags: ["Kids", "Beginner", "Fun", "Interactive", "Games"]
  }
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null)

  const categories = ["all", "Test Preparation", "Business English", "Conversation", "Grammar", "Kids English"]
  const levels = ["all", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    
    return matchesSearch && matchesCategory && matchesLevel
  })

  const getLevelColor = (level: string) => {
    switch (level) {
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
      case "Test Preparation":
        return <Target className="h-4 w-4" />
      case "Business English":
        return <Briefcase className="h-4 w-4" />
      case "Conversation":
        return <MessageCircle className="h-4 w-4" />
      case "Grammar":
        return <BookOpen className="h-4 w-4" />
      case "Kids English":
        return <Heart className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Test Preparation":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
      case "Business English":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "Conversation":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "Grammar":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "Kids English":
        return "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
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
                  Online Courses
                </h1>
                <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Khám phá các khóa học tiếng Anh chất lượng cao với phương pháp học hiện đại, 
                giảng viên chuyên nghiệp và lộ trình học tập cá nhân hóa
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
                    placeholder="Tìm kiếm khóa học..."
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

                {/* Level Filter */}
                <div className="relative">
                  <Zap className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-0 bg-white/50 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>
                        {level === "all" ? "Tất cả cấp độ" : level}
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
              { icon: BookOpen, label: "Tổng khóa học", value: mockCourses.length, color: "from-blue-500 to-cyan-500" },
              { icon: Users, label: "Học viên", value: mockCourses.reduce((sum, course) => sum + course.students, 0), color: "from-purple-500 to-pink-500" },
              { icon: GraduationCap, label: "Giảng viên", value: 12, color: "from-amber-500 to-orange-500" },
              { icon: Star, label: "Đánh giá", value: "4.8/5.0", color: "from-green-500 to-emerald-500" }
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

        {/* Featured Courses */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Crown className="h-8 w-8 text-amber-500" />
            <h2 className="text-3xl font-bold text-gray-900">Khóa học nổi bật</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCourses.filter(course => course.isPopular).map((course) => (
              <div
                key={course.id}
                className="relative group"
                onMouseEnter={() => setHoveredCourse(course.id)}
                onMouseLeave={() => setHoveredCourse(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700`}></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                  {/* Popular Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  </div>

                  {/* Free Badge */}
                  {course.isFree && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Free
                      </Badge>
                    </div>
                  )}

                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category & Level */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`${getCategoryColor(course.category)} px-2 py-1 rounded-full text-xs font-medium`}>
                        {getCategoryIcon(course.category)}
                        <span className="ml-1">{course.category}</span>
                      </Badge>
                      <Badge className={`${getLevelColor(course.level)} px-2 py-1 rounded-full text-xs font-medium`}>
                        {course.level}
                      </Badge>
                    </div>

                    {/* Title */}
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {course.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </CardDescription>

                    {/* Instructor */}
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={course.instructorAvatar} 
                        alt={course.instructor}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700 font-medium">{course.instructor}</span>
                    </div>

                    {/* Course Details */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {/* Price & Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {course.isFree ? (
                          <span className="text-2xl font-bold text-green-600">Miễn phí</span>
                        ) : (
                          <>
                            <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                            {course.originalPrice > course.price && (
                              <span className="text-lg text-gray-400 line-through">${course.originalPrice}</span>
                            )}
                          </>
                        )}
                      </div>
                      <Button 
                        asChild
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl px-6 py-2 transform hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        <Link href={`/courses/${course.id}`}>
                          Xem chi tiết
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-gray-900">Tất cả khóa học</h2>
          </div>
          
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy khóa học</h3>
                  <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                      setSelectedLevel("all")
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
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700`}></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                    {/* Free Badge */}
                    {course.isFree && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Free
                        </Badge>
                      </div>
                    )}

                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category & Level */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`${getCategoryColor(course.category)} px-2 py-1 rounded-full text-xs font-medium`}>
                          {getCategoryIcon(course.category)}
                          <span className="ml-1">{course.category}</span>
                        </Badge>
                        <Badge className={`${getLevelColor(course.level)} px-2 py-1 rounded-full text-xs font-medium`}>
                          {course.level}
                        </Badge>
                      </div>

                      {/* Title */}
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {course.title}
                      </CardTitle>

                      {/* Description */}
                      <CardDescription className="text-gray-600 mb-4 line-clamp-2">
                        {course.description}
                      </CardDescription>

                      {/* Instructor */}
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={course.instructorAvatar} 
                          alt={course.instructor}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-700 font-medium">{course.instructor}</span>
                      </div>

                      {/* Course Details */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      {/* Price & Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {course.isFree ? (
                            <span className="text-2xl font-bold text-green-600">Miễn phí</span>
                          ) : (
                            <>
                              <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                              {course.originalPrice > course.price && (
                                <span className="text-lg text-gray-400 line-through">${course.originalPrice}</span>
                              )}
                            </>
                          )}
                        </div>
                        <Button 
                          asChild
                          variant="outline"
                          className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-2xl px-6 py-2 transform hover:scale-105 transition-all duration-300"
                        >
                          <Link href={`/courses/${course.id}`}>
                            Xem chi tiết
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
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
