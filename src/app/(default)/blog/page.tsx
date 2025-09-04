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
  Flame,
  User,
  Home,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { useBlog } from '@/hooks/useBlog'



export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  
  const { blogPosts, categories, loading, error, loadPublishedPosts } = useBlog()

  // Load published posts on component mount
  useEffect(() => {
    loadPublishedPosts()
  }, [])

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || post.category?.categoryName === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Get unique category names for filter
  const categoryNames = ["all", ...(categories.map(cat => cat.categoryName) || [])]

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bài viết blog...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Đã xảy ra lỗi</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Thử lại
          </Button>
        </div>
      </div>
    )
  }

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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-blue-600">
              <Home className="h-4 w-4 mr-1" />
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Blog</span>
          </nav>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Học Tiếng Anh</h1>
          <p className="text-gray-600">Khám phá kiến thức, tips và phương pháp học tiếng Anh hiệu quả</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Posts */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-8 bg-blue-600 rounded"></div>
                <h2 className="text-2xl font-bold text-gray-900">Bài Viết Nổi Bật</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      {post.featuredImage ? (
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <BookOpen className="h-12 w-12 text-blue-600" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-lg leading-tight line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                        <span>•</span>
                        <span>5 phút đọc</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Posts */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-8 bg-blue-600 rounded"></div>
                <h2 className="text-2xl font-bold text-gray-900">Bài Viết Mới Nhất</h2>
              </div>
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
                  <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Thumbnail */}
                      <div className="relative h-48 overflow-hidden">
                        {post.featuredImage ? (
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-blue-600" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        {post.excerpt && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {post.excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                          <span>•</span>
                          <span>5 phút</span>
                        </div>
                        
                        <Link 
                          href={`/blog/${post.id}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                        >
                          Đọc tiếp →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Danh mục</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link 
                    href="/" 
                    className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span>Trang Chủ</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  {categories.map((category) => (
                    <Link 
                      key={category.id}
                      href={`/blog?category=${category.categoryName}`}
                      className="flex items-center justify-between text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <span>{category.categoryName}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Bài viết phổ biến</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {blogPosts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                        {post.featuredImage ? (
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link 
                          href={`/blog/${post.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(post.publishedAt || post.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Thẻ phổ biến</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['Tiếng Anh', 'Grammar', 'Vocabulary', 'TOEIC', 'IELTS', 'Speaking', 'Listening', 'Writing'].map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="outline" 
                        className="text-xs hover:bg-blue-50 hover:border-blue-300 cursor-pointer"
                      >
                        {tag}
                      </Badge>
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
