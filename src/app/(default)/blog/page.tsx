"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Clock, 
  User, 
  Eye, 
  Filter,
  Search,
  Calendar,
  TrendingUp,
  Star,
  MessageCircle,
  Share2,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const categories = ['Tất cả', 'Tips & Tricks', 'Grammar Guide', 'Vocabulary', 'Test Preparation', 'Study Methods', 'Motivation', 'Culture']

const mockBlogPosts = [
  {
    id: 1,
    title: '10 Tips để đạt điểm cao IELTS Speaking',
    excerpt: 'Khám phá những bí quyết giúp bạn tự tin và đạt điểm cao trong phần thi IELTS Speaking.',
    content: 'Nội dung chi tiết về 10 tips IELTS Speaking...',
    author: 'Sarah Johnson',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    category: 'Tips & Tricks',
    readTime: 8,
    views: 1250,
    likes: 89,
    comments: 23,
    publishedAt: '2024-01-15',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop',
    isFeatured: true,
    tags: ['IELTS', 'Speaking', 'Tips']
  },
  {
    id: 2,
    title: '5 lỗi ngữ pháp phổ biến cần tránh',
    excerpt: 'Tìm hiểu những lỗi ngữ pháp thường gặp và cách khắc phục hiệu quả.',
    content: 'Nội dung chi tiết về các lỗi ngữ pháp...',
    author: 'Michael Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    category: 'Grammar Guide',
    readTime: 6,
    views: 890,
    likes: 67,
    comments: 15,
    publishedAt: '2024-01-12',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=300&fit=crop',
    isFeatured: false,
    tags: ['Grammar', 'Common Mistakes', 'Tips']
  },
  {
    id: 3,
    title: 'Hướng dẫn chi tiết IELTS Writing Task 2',
    excerpt: 'Phân tích cấu trúc và chiến lược viết bài hiệu quả cho IELTS Writing Task 2.',
    content: 'Nội dung chi tiết về IELTS Writing Task 2...',
    author: 'Emma Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    category: 'Test Preparation',
    readTime: 12,
    views: 2100,
    likes: 156,
    comments: 45,
    publishedAt: '2024-01-10',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop',
    isFeatured: true,
    tags: ['IELTS', 'Writing', 'Task 2', 'Strategy']
  },
  {
    id: 4,
    title: 'Cách học từ vựng hiệu quả với Spaced Repetition',
    excerpt: 'Khám phá phương pháp học từ vựng khoa học giúp ghi nhớ lâu dài.',
    content: 'Nội dung chi tiết về Spaced Repetition...',
    author: 'David Brown',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    category: 'Study Methods',
    readTime: 10,
    views: 1567,
    likes: 123,
    comments: 34,
    publishedAt: '2024-01-08',
    thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=300&fit=crop',
    isFeatured: false,
    tags: ['Vocabulary', 'Memory', 'Study Methods']
  },
  {
    id: 5,
    title: 'Tại sao bạn nên học tiếng Anh mỗi ngày?',
    excerpt: 'Lợi ích của việc học tiếng Anh đều đặn và cách duy trì động lực.',
    content: 'Nội dung chi tiết về học tiếng Anh hàng ngày...',
    author: 'Lisa Anderson',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    category: 'Motivation',
    readTime: 7,
    views: 945,
    likes: 78,
    comments: 19,
    publishedAt: '2024-01-05',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop',
    isFeatured: false,
    tags: ['Motivation', 'Daily Practice', 'Habits']
  },
  {
    id: 6,
    title: 'Khác biệt văn hóa trong giao tiếp tiếng Anh',
    excerpt: 'Hiểu về văn hóa để giao tiếp tiếng Anh tự nhiên và hiệu quả hơn.',
    content: 'Nội dung chi tiết về văn hóa giao tiếp...',
    author: 'James Wilson',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    category: 'Culture',
    readTime: 9,
    views: 723,
    likes: 56,
    comments: 12,
    publishedAt: '2024-01-03',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop',
    isFeatured: false,
    tags: ['Culture', 'Communication', 'Social Skills']
  }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = mockBlogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Tất cả' || post.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = mockBlogPosts.filter(post => post.isFeatured)
  const popularPosts = [...mockBlogPosts].sort((a, b) => b.views - a.views).slice(0, 5)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Kiến thức chuyên sâu
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 bg-clip-text text-transparent">
              Blog học tiếng Anh
            </span>
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá những bài viết hữu ích về phương pháp học, tips và kinh nghiệm từ các chuyên gia.
            Cập nhật kiến thức mới nhất về học tiếng Anh.
          </p>
        </div>

        {/* Featured posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Bài viết nổi bật</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="destructive">Nổi bật</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.authorAvatar}
                          alt={post.author}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium">{post.author}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime} phút
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {post.views}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Search and filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="lg:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  Bộ lọc
                </Button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Danh mục:</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300">
                Tìm thấy <span className="font-semibold">{filteredPosts.length}</span> bài viết
              </p>
            </div>

            {/* Blog posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{formatDate(post.publishedAt)}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 line-clamp-2">
                          <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm font-medium">{post.author}</span>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.readTime} phút
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {post.views}
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Empty state */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Không tìm thấy bài viết
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Popular posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Bài viết phổ biến
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularPosts.map((post, index) => (
                      <div key={post.id} className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-2 mb-1">
                            <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
                              {post.title}
                            </Link>
                          </h4>
                          <div className="flex items-center text-xs text-gray-500">
                            <Eye className="w-3 h-3 mr-1" />
                            {post.views} lượt xem
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter signup */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Đăng ký nhận bài viết mới</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Nhận thông báo khi có bài viết mới về học tiếng Anh
                    </p>
                    <div className="space-y-3">
                      <Input type="email" placeholder="Email của bạn" />
                      <Button className="w-full">
                        Đăng ký
                      </Button>
                    </div>
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
