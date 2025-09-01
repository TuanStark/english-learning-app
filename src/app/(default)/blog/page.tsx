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
  BookMarked,
  Flame
} from "lucide-react"
import Link from "next/link"

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: 1,
    title: "10 Tips để đạt điểm cao IELTS Speaking: Hướng dẫn chi tiết từ chuyên gia",
    excerpt: "Khám phá những bí quyết giúp bạn tự tin và đạt điểm cao trong phần thi IELTS Speaking. Bài viết này sẽ cung cấp cho bạn 10 tips quan trọng nhất từ các chuyên gia IELTS hàng đầu.",
    author: "Sarah Johnson",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    category: "Tips & Tricks",
    readTime: 12,
    views: 1250,
    likes: 89,
    comments: 23,
    publishedAt: "2024-01-15",
    thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
    isFeatured: true,
    tags: ["IELTS", "Speaking", "Tips", "Test Preparation"]
  },
  {
    id: 2,
    title: "5 lỗi ngữ pháp phổ biến cần tránh trong IELTS",
    excerpt: "Tìm hiểu những lỗi ngữ pháp thường gặp và cách khắc phục hiệu quả để đạt điểm cao trong kỳ thi IELTS.",
    author: "Michael Chen",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    category: "Grammar Guide",
    readTime: 8,
    views: 890,
    likes: 67,
    comments: 15,
    publishedAt: "2024-01-12",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop",
    isFeatured: false,
    tags: ["IELTS", "Grammar", "Common Mistakes", "Test Preparation"]
  },
  {
    id: 3,
    title: "Hướng dẫn chi tiết IELTS Writing Task 2",
    excerpt: "Phân tích cấu trúc và chiến lược viết bài hiệu quả cho IELTS Writing Task 2 với các ví dụ thực tế.",
    author: "Emma Wilson",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    category: "Test Preparation",
    readTime: 15,
    views: 2100,
    likes: 156,
    comments: 34,
    publishedAt: "2024-01-10",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
    isFeatured: true,
    tags: ["IELTS", "Writing", "Task 2", "Test Preparation"]
  },
  {
    id: 4,
    title: "Cách học từ vựng hiệu quả: Phương pháp Spaced Repetition",
    excerpt: "Khám phá phương pháp học từ vựng hiệu quả dựa trên khoa học về trí nhớ và cách áp dụng vào thực tế.",
    author: "David Thompson",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    category: "Learning Methods",
    readTime: 10,
    views: 1560,
    likes: 123,
    comments: 28,
    publishedAt: "2024-01-08",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    isFeatured: false,
    tags: ["Vocabulary", "Learning Methods", "Memory", "Study Tips"]
  },
  {
    id: 5,
    title: "Business English: Từ vựng và cụm từ cần thiết cho công sở",
    excerpt: "Làm chủ 100+ từ vựng và cụm từ tiếng Anh thương mại cần thiết cho môi trường công sở chuyên nghiệp.",
    author: "Lisa Park",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    category: "Business English",
    readTime: 12,
    views: 980,
    likes: 78,
    comments: 19,
    publishedAt: "2024-01-05",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    isFeatured: false,
    tags: ["Business English", "Vocabulary", "Workplace", "Professional"]
  },
  {
    id: 6,
    title: "Luyện nghe tiếng Anh: Chiến lược và bài tập thực hành",
    excerpt: "Cải thiện kỹ năng nghe tiếng Anh với các chiến lược hiệu quả và bài tập thực hành đa dạng.",
    author: "Maria Garcia",
    authorAvatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=150&h=150&fit=crop&crop=face",
    category: "Listening Skills",
    readTime: 14,
    views: 1340,
    likes: 95,
    comments: 22,
    publishedAt: "2024-01-03",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    isFeatured: false,
    tags: ["Listening", "English Skills", "Practice", "Study Methods"]
  }
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)

  const categories = ["all", "Tips & Tricks", "Grammar Guide", "Test Preparation", "Learning Methods", "Business English", "Listening Skills"]

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tips & Tricks":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "Grammar Guide":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "Test Preparation":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
      case "Learning Methods":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
      case "Business English":
        return "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
      case "Listening Skills":
        return "bg-gradient-to-r from-red-500 to-pink-500 text-white"
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500 text-white"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Tips & Tricks":
        return <Star className="h-4 w-4" />
      case "Grammar Guide":
        return <BookOpen className="h-4 w-4" />
      case "Test Preparation":
        return <Award className="h-4 w-4" />
      case "Learning Methods":
        return <Brain className="h-4 w-4" />
      case "Business English":
        return <Target className="h-4 w-4" />
      case "Listening Skills":
        return <MessageCircle className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
                  English Learning Blog
                </h1>
                <Sparkles className="h-8 w-8 text-purple-600 animate-pulse" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Khám phá kiến thức, tips và phương pháp học tiếng Anh hiệu quả từ các chuyên gia 
                và giáo viên có kinh nghiệm
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
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
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, label: "Tổng bài viết", value: mockBlogPosts.length, color: "from-blue-500 to-cyan-500" },
              { icon: Eye, label: "Tổng lượt xem", value: mockBlogPosts.reduce((sum, post) => sum + post.views, 0), color: "from-purple-500 to-pink-500" },
              { icon: Users, label: "Tác giả", value: 6, color: "from-amber-500 to-orange-500" },
              { icon: Heart, label: "Lượt thích", value: mockBlogPosts.reduce((sum, post) => sum + post.likes, 0), color: "from-green-500 to-emerald-500" }
            ].map((stat, index) => (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-30`}></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 text-center shadow-2xl border border-white/20 transform group-hover:scale-105 transition-all duration-500">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-2xl mb-4 shadow-lg`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Crown className="h-8 w-8 text-amber-500" />
            <h2 className="text-3xl font-bold text-gray-900">Bài viết nổi bật</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockBlogPosts.filter(post => post.isFeatured).map((post) => (
              <div
                key={post.id}
                className="relative group"
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700`}></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                  {/* Featured Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
                      <Crown className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>

                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                    <img 
                      src={post.thumbnail} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`${getCategoryColor(post.category)} px-2 py-1 rounded-full text-xs font-medium`}>
                        {getCategoryIcon(post.category)}
                        <span className="ml-1">{post.category}</span>
                      </Badge>
                    </div>

                    {/* Title */}
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </CardTitle>

                    {/* Excerpt */}
                    <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>

                    {/* Author */}
                    <div className="flex items-center gap-3 mb-4">
                      <img 
                        src={post.authorAvatar} 
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700 font-medium">{post.author}</span>
                    </div>

                    {/* Post Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} phút</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{post.likes}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="px-2 py-1 rounded-full text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl py-3 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      <Link href={`/blog/${post.id}`}>
                        Đọc bài viết
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-gray-900">Tất cả bài viết</h2>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
                  <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
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
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700`}></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={`${getCategoryColor(post.category)} px-2 py-1 rounded-full text-xs font-medium`}>
                          {getCategoryIcon(post.category)}
                          <span className="ml-1">{post.category}</span>
                        </Badge>
                      </div>

                      {/* Title */}
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {post.title}
                      </CardTitle>

                      {/* Excerpt */}
                      <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </CardDescription>

                      {/* Author */}
                      <div className="flex items-center gap-3 mb-4">
                        <img 
                          src={post.authorAvatar} 
                          alt={post.author}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-700 font-medium">{post.author}</span>
                      </div>

                      {/* Post Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime} phút</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>{post.likes}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="px-2 py-1 rounded-full text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Action Button */}
                      <Button 
                        asChild
                        variant="outline"
                        className="w-full border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 rounded-2xl py-3 transform hover:scale-105 transition-all duration-300"
                      >
                        <Link href={`/blog/${post.id}`}>
                          Đọc thêm
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
