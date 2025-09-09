"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Pagination from "@/components/Pagination"
import usePagination from "@/hooks/usePagination"
import useSWR from "swr"
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
import { blogApi } from '@/lib/api'

export default function BlogClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  
  // Use pagination hook
  const { page, limit, setPage } = usePagination('/blog', 6, 1);

  // SWR fetcher for blog posts
  const fetcher = async (url: string) => {
    console.log('Fetcher called with:', url);
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (searchTerm) params.append('search', searchTerm);
    if (selectedCategory && selectedCategory !== "all") params.append('category', selectedCategory);
    
    console.log('API params:', params.toString());
    const response = await blogApi.getAll(params.toString());
    console.log('API response:', response);
    return response.data; // Return toàn bộ data object
  };

  // SWR fetcher for categories
  const categoriesFetcher = async () => {
    const response = await blogApi.getCategories();
    return response.data;
  };

  // Use SWR with dynamic keys
  const { data, error, isLoading } = useSWR(
    `blog-posts?page=${page}&limit=${limit}&search=${searchTerm}&category=${selectedCategory}`,
    fetcher
  );

  const { data: categoriesData } = useSWR('blog-categories', categoriesFetcher);

  // Transform data
  const blogPosts = Array.isArray((data as any)?.data) ? (data as any).data : [];
  console.log('blogPosts', blogPosts)
  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  // Get pagination info from backend
  const total = (data as any)?.meta?.total || blogPosts.length;

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [searchTerm, selectedCategory])

  // Get unique category names for filter
  const categoryNames = ["all", ...(categories.map(cat => cat.categoryName) || [])]


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
        
        {/* Loading State */}
        {isLoading && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="h-8 w-8 text-blue-500" />
              <h2 className="text-3xl font-bold text-gray-900">Đang tải...</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
        </div>
                </div>
              ))}
            </div>
                </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-16">
            <div className="text-center py-16">
              <div className="text-red-500 mb-4">
                <BookOpen className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lỗi khi tải dữ liệu</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl px-6 py-2"
              >
                Thử lại
              </Button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!isLoading && !error && (
          <>
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
                {blogPosts.slice(0, 3).map((post: any) => (
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
          
              {blogPosts.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
                  <p className="text-gray-600 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                      setPage(1)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Xóa bộ lọc
                  </Button>
            </div>
          ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {blogPosts.map((post: any) => (
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

              {/* Pagination */}
              {total > 0 && (
                <div className="mt-12">
                  <Pagination
                    page={page}
                    limit={limit}
                    setPage={setPage}
                    total={total}
                  />
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
                  {blogPosts.slice(0, 5).map((post: any) => (
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
        </>
        )}
      </div>
    </div>
  )
}
