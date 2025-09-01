"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  BookOpen, 
  Clock, 
  User, 
  Eye, 
  Heart,
  MessageCircle,
  Share2,
  ArrowLeft,
  Calendar,
  Tag,
  TrendingUp,
  Star,
  Sparkles,
  Crown,
  Globe,
  Target,
  Brain,
  Award,
  Zap,
  Users,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for blog post
const mockBlogPost = {
  id: 2,
  title: '5 lỗi ngữ pháp phổ biến cần tránh trong IELTS: Hướng dẫn chi tiết',
  excerpt: 'Tìm hiểu những lỗi ngữ pháp thường gặp và cách khắc phục hiệu quả để đạt điểm cao trong kỳ thi IELTS.',
  content: `
    <h2>Giới thiệu</h2>
    <p>Ngữ pháp là một trong những yếu tố quan trọng nhất trong kỳ thi IELTS. Dù bạn có vốn từ vựng phong phú đến đâu, việc mắc lỗi ngữ pháp cơ bản vẫn có thể làm giảm điểm số của bạn một cách đáng kể.</p>
    
    <h2>Lỗi 1: Sử dụng sai thì (Tenses)</h2>
    <p>Đây là lỗi phổ biến nhất trong IELTS. Bạn cần chú ý:</p>
    <ul>
      <li><strong>Present Perfect vs Past Simple:</strong> Sử dụng Present Perfect cho hành động đã hoàn thành nhưng kết quả vẫn còn ảnh hưởng đến hiện tại</li>
      <li><strong>Future Tenses:</strong> Sử dụng "will" cho dự đoán, "going to" cho kế hoạch đã định</li>
      <li><strong>Past Perfect:</strong> Sử dụng cho hành động xảy ra trước một hành động khác trong quá khứ</li>
    </ul>
    
    <h3>Ví dụ:</h3>
    <p><strong>Sai:</strong> I have been to Paris last year.<br>
    <strong>Đúng:</strong> I went to Paris last year.</p>
    
    <h2>Lỗi 2: Thiếu hoặc sai mạo từ (Articles)</h2>
    <p>Mạo từ là một trong những điểm khó nhất trong tiếng Anh:</p>
    <ul>
      <li><strong>"A" vs "An":</strong> Sử dụng "a" trước phụ âm, "an" trước nguyên âm</li>
      <li><strong>"The":</strong> Sử dụng cho danh từ xác định, đã được đề cập trước đó</li>
      <li><strong>Zero Article:</strong> Không sử dụng mạo từ cho danh từ không đếm được hoặc danh từ chung</li>
    </ul>
    
    <h3>Ví dụ:</h3>
    <p><strong>Sai:</strong> I want to be engineer.<br>
    <strong>Đúng:</strong> I want to be an engineer.</p>
    
    <h2>Lỗi 3: Sai cấu trúc câu điều kiện (Conditionals)</h2>
    <p>Câu điều kiện có 4 loại chính, mỗi loại có cấu trúc riêng:</p>
    <ul>
      <li><strong>Type 0:</strong> If + Present Simple, Present Simple (sự thật hiển nhiên)</li>
      <li><strong>Type 1:</strong> If + Present Simple, will + V (khả năng xảy ra trong tương lai)</li>
      <li><strong>Type 2:</strong> If + Past Simple, would + V (giả định không thực tế)</li>
      <li><strong>Type 3:</strong> If + Past Perfect, would have + V3 (giả định về quá khứ)</li>
    </ul>
    
    <h3>Ví dụ:</h3>
    <p><strong>Sai:</strong> If I will have time, I will help you.<br>
    <strong>Đúng:</strong> If I have time, I will help you.</p>
    
    <h2>Lỗi 4: Sai giới từ (Prepositions)</h2>
    <p>Giới từ thường gây nhầm lẫn vì chúng không theo quy tắc cụ thể:</p>
    <ul>
      <li><strong>Time:</strong> in (năm, tháng), on (ngày), at (giờ cụ thể)</li>
      <li><strong>Place:</strong> in (trong), on (trên bề mặt), at (điểm cụ thể)</li>
      <li><strong>Movement:</strong> to (đến), from (từ), into (vào trong)</li>
    </ul>
    
    <h3>Ví dụ:</h3>
    <p><strong>Sai:</strong> I will meet you in Monday.<br>
    <strong>Đúng:</strong> I will meet you on Monday.</p>
    
    <h2>Lỗi 5: Sai cấu trúc câu so sánh (Comparisons)</h2>
    <p>Câu so sánh có nhiều dạng khác nhau:</p>
    <ul>
      <li><strong>Comparative:</strong> Sử dụng "more + adj" hoặc "adj + er"</li>
      <li><strong>Superlative:</strong> Sử dụng "most + adj" hoặc "adj + est"</li>
      <li><strong>As...as:</strong> Sử dụng cho so sánh bằng nhau</li>
    </ul>
    
    <h3>Ví dụ:</h3>
    <p><strong>Sai:</strong> This book is more better than that one.<br>
    <strong>Đúng:</strong> This book is better than that one.</p>
    
    <h2>Cách khắc phục lỗi ngữ pháp</h2>
    <p>Để cải thiện ngữ pháp, bạn nên:</p>
    <ul>
      <li><strong>Luyện tập thường xuyên:</strong> Làm bài tập ngữ pháp mỗi ngày</li>
      <li><strong>Đọc nhiều:</strong> Đọc sách, báo tiếng Anh để quen với cấu trúc câu</li>
      <li><strong>Ghi chép:</strong> Viết lại những lỗi thường mắc và cách sửa</li>
      <li><strong>Luyện viết:</strong> Viết bài luận và nhờ người khác sửa lỗi</li>
      <li><strong>Sử dụng công cụ:</strong> Dùng Grammarly hoặc các ứng dụng kiểm tra ngữ pháp</li>
    </ul>
    
    <h2>Kết luận</h2>
    <p>Việc mắc lỗi ngữ pháp là bình thường khi học tiếng Anh. Quan trọng là bạn phải nhận ra lỗi và cố gắng khắc phục. Với sự luyện tập chăm chỉ và kiên nhẫn, bạn sẽ cải thiện đáng kể khả năng ngữ pháp và đạt được điểm số mong muốn trong IELTS.</p>
  `,
  author: {
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Giảng viên tiếng Anh chuyên ngữ pháp với 8+ năm kinh nghiệm. Chuyên gia về IELTS và TOEFL.',
    expertise: ['Grammar', 'IELTS', 'TOEFL', 'Academic Writing'],
    social: {
      twitter: '@michaelchen',
      linkedin: 'michaelchen',
      website: 'michaelchen.com'
    }
  },
  category: 'Grammar Guide',
  readTime: 8,
  views: 890,
  likes: 67,
  comments: 15,
  publishedAt: '2024-01-12',
  updatedAt: '2024-01-18',
  thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=400&fit=crop',
  isFeatured: false,
  tags: ['Grammar', 'IELTS', 'Common Mistakes', 'Tips', 'Study Guide'],
  relatedPosts: [
    {
      id: 1,
      title: '10 Tips để đạt điểm cao IELTS Speaking',
      excerpt: 'Khám phá những bí quyết giúp bạn tự tin và đạt điểm cao trong phần thi IELTS Speaking.',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop',
      category: 'Tips & Tricks',
      readTime: 12,
      views: 1250
    },
    {
      id: 3,
      title: 'Hướng dẫn chi tiết IELTS Writing Task 2',
      excerpt: 'Phân tích cấu trúc và chiến lược viết bài hiệu quả cho IELTS Writing Task 2.',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      category: 'Test Preparation',
      readTime: 12,
      views: 2100
    }
  ]
}

export default function BlogPostPage() {
  const params = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = mockBlogPost.title
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`)
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
    setShowShareMenu(false)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tips & Tricks":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Grammar Guide":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Test Preparation":
        return "bg-amber-100 text-amber-700 border-amber-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Tips & Tricks":
        return <Star className="h-4 w-4 text-blue-600" />
      case "Grammar Guide":
        return <BookOpen className="h-4 w-4 text-purple-600" />
      case "Test Preparation":
        return <Award className="h-4 w-4 text-amber-600" />
      default:
        return <BookOpen className="h-4 w-4 text-gray-600" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            asChild 
            variant="outline" 
            className="rounded-xl hover:bg-white hover:shadow-md transition-all duration-300"
          >
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách bài viết
            </Link>
          </Button>
        </div>

        {/* Main Article */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Article Header */}
              <div className="p-6 pb-4">
                {/* Category */}
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={`${getCategoryColor(mockBlogPost.category)} px-3 py-1 rounded-full font-medium border`}>
                    {getCategoryIcon(mockBlogPost.category)}
                    <span className="ml-2">{mockBlogPost.category}</span>
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {mockBlogPost.title}
                </h1>

                {/* Excerpt */}
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {mockBlogPost.excerpt}
                </p>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Đăng ngày {formatDate(mockBlogPost.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{mockBlogPost.readTime} phút đọc</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>{mockBlogPost.views.toLocaleString()} lượt xem</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mb-6">
                  <Button 
                    onClick={handleLike}
                    variant={isLiked ? "default" : "outline"}
                    className={`rounded-xl transition-all duration-300 ${isLiked ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Đã thích' : 'Thích'} ({mockBlogPost.likes})
                  </Button>

                  <Button 
                    onClick={handleBookmark}
                    variant={isBookmarked ? "default" : "outline"}
                    className={`rounded-xl transition-all duration-300 ${isBookmarked ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                  >
                    <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                    {isBookmarked ? 'Đã lưu' : 'Lưu bài viết'}
                  </Button>

                  <div className="relative">
                    <Button 
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      variant="outline"
                      className="rounded-xl"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Chia sẻ
                    </Button>

                    {showShareMenu && (
                      <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-2 z-10 min-w-[200px]">
                        <Button 
                          onClick={() => handleShare('facebook')}
                          variant="ghost"
                          className="w-full justify-start rounded-lg hover:bg-blue-50"
                        >
                          <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                          Facebook
                        </Button>
                        <Button 
                          onClick={() => handleShare('twitter')}
                          variant="ghost"
                          className="w-full justify-start rounded-lg hover:bg-blue-50"
                        >
                          <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                          Twitter
                        </Button>
                        <Button 
                          onClick={() => handleShare('linkedin')}
                          variant="ghost"
                          className="w-full justify-start rounded-lg hover:bg-blue-50"
                        >
                          <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                          LinkedIn
                        </Button>
                        <Button 
                          onClick={() => handleShare('copy')}
                          variant="ghost"
                          className="w-full justify-start rounded-lg hover:bg-blue-50"
                        >
                          {copied ? (
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 mr-2" />
                          )}
                          {copied ? 'Đã sao chép!' : 'Sao chép link'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="px-6 mb-6">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src={mockBlogPost.thumbnail} 
                    alt={mockBlogPost.title}
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              {/* Article Content */}
              <div className="px-6 pb-6">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: mockBlogPost.content }}
                />
              </div>

              {/* Tags */}
              <div className="px-6 pb-6">
                <Separator className="mb-4" />
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mockBlogPost.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1 rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>

            {/* Author Section */}
            <Card className="mt-8 bg-white/80 backdrop-blur-sm border-0 rounded-2xl shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mockBlogPost.author.avatar} alt={mockBlogPost.author.name} />
                    <AvatarFallback className="text-lg font-semibold">
                      {mockBlogPost.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Về tác giả: {mockBlogPost.author.name}
                    </h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">
                      {mockBlogPost.author.bio}
                    </p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Chuyên môn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockBlogPost.author.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="px-2 py-1 rounded-full text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <User className="h-4 w-4 mr-2" />
                        Xem profile
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Liên hệ
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Table of Contents */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-2xl shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Mục lục
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <nav className="space-y-2">
                    {['Giới thiệu', 'Lỗi 1: Sử dụng sai thì (Tenses)', 'Lỗi 2: Thiếu hoặc sai mạo từ (Articles)', 'Lỗi 3: Sai cấu trúc câu điều kiện (Conditionals)', 'Lỗi 4: Sai giới từ (Prepositions)', 'Lỗi 5: Sai cấu trúc câu so sánh (Comparisons)', 'Cách khắc phục lỗi ngữ pháp', 'Kết luận'].map((item, index) => (
                      <a
                        key={index}
                        href={`#section-${index + 1}`}
                        className="block text-sm text-gray-600 hover:text-blue-600 transition-colors py-1 border-l-2 border-transparent hover:border-blue-500 pl-3"
                      >
                        {item}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 rounded-2xl shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Bài viết liên quan
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {mockBlogPost.relatedPosts.map((post) => (
                      <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <img 
                              src={post.thumbnail} 
                              alt={post.title}
                              className="w-20 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Badge className={`${getCategoryColor(post.category)} px-2 py-1 rounded-full text-xs mb-1`}>
                              {post.category}
                            </Badge>
                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readTime} phút</span>
                              <Eye className="h-3 w-3" />
                              <span>{post.views.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 rounded-2xl shadow-lg">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-blue-200" />
                  <h3 className="text-xl font-bold mb-2">Đăng ký nhận bài viết mới</h3>
                  <p className="text-blue-100 mb-4 text-sm">
                    Nhận thông báo khi có bài viết mới về học tiếng Anh
                  </p>
                  <div className="space-y-3">
                    <input 
                      type="email" 
                      placeholder="Email của bạn" 
                      className="w-full px-4 py-2 rounded-xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    />
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-semibold">
                      Đăng ký
                    </Button>
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
