"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

  Award,
  Zap,
  Users,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Lightbulb,
  Target,
  Brain,
  BookOpenIcon,
  CheckCircleIcon,
  ArrowUpRight
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for blog post
const mockBlogPost = {
  id: 1,
  title: '10 Tips để đạt điểm cao IELTS Speaking: Hướng dẫn chi tiết từ chuyên gia',
  excerpt: 'Khám phá những bí quyết giúp bạn tự tin và đạt điểm cao trong phần thi IELTS Speaking. Bài viết này sẽ cung cấp cho bạn 10 tips quan trọng nhất từ các chuyên gia IELTS hàng đầu.',
  content: `
    <h2>Giới thiệu</h2>
    <p>IELTS Speaking là một trong những phần thi quan trọng nhất trong kỳ thi IELTS. Nhiều thí sinh cảm thấy lo lắng và không tự tin khi đối mặt với giám khảo. Tuy nhiên, với những tips và chiến lược đúng đắn, bạn hoàn toàn có thể đạt được điểm số mong muốn.</p>
    
    <h2>Tip 1: Luyện tập phát âm chuẩn</h2>
    <p>Phát âm là yếu tố quan trọng nhất trong IELTS Speaking. Bạn cần:</p>
    <ul>
      <li>Học cách phát âm các âm khó trong tiếng Anh</li>
      <li>Luyện tập intonation và stress</li>
      <li>Ghi âm và nghe lại để tự đánh giá</li>
    </ul>
    
    <h2>Tip 2: Mở rộng vốn từ vựng</h2>
    <p>Vốn từ vựng phong phú sẽ giúp bạn:</p>
    <ul>
      <li>Diễn đạt ý tưởng một cách chính xác</li>
      <li>Tránh lặp lại từ ngữ</li>
      <li>Ghi điểm với giám khảo</li>
    </ul>
    
    <h2>Tip 3: Luyện tập trả lời câu hỏi</h2>
    <p>Bạn nên luyện tập trả lời các dạng câu hỏi phổ biến:</p>
    <ul>
      <li>Câu hỏi về sở thích và thói quen</li>
      <li>Câu hỏi về kinh nghiệm cá nhân</li>
      <li>Câu hỏi về ý kiến và quan điểm</li>
    </ul>
    
    <h2>Tip 4: Sử dụng linking words</h2>
    <p>Linking words giúp câu trả lời của bạn mạch lạc và logic hơn:</p>
    <ul>
      <li>However, Nevertheless, On the other hand</li>
      <li>Furthermore, Moreover, In addition</li>
      <li>Therefore, As a result, Consequently</li>
    </ul>
    
    <h2>Tip 5: Luyện tập với partner</h2>
    <p>Luyện tập với bạn bè hoặc giáo viên sẽ giúp bạn:</p>
    <ul>
      <li>Quen với việc nói tiếng Anh</li>
      <li>Nhận feedback về phát âm và ngữ pháp</li>
      <li>Tăng sự tự tin</li>
    </ul>
    
    <h2>Tip 6: Chuẩn bị cho Part 2</h2>
    <p>Part 2 là phần khó nhất, bạn cần:</p>
    <ul>
      <li>Luyện tập kể chuyện trong 2 phút</li>
      <li>Chuẩn bị template cho các chủ đề phổ biến</li>
      <li>Luyện tập với timer</li>
    </ul>
    
    <h2>Tip 7: Sử dụng examples và details</h2>
    <p>Luôn đưa ra ví dụ cụ thể và chi tiết để:</p>
    <ul>
      <li>Làm rõ ý tưởng của bạn</li>
      <li>Chứng minh khả năng sử dụng ngôn ngữ</li>
      <li>Ghi điểm với giám khảo</li>
    </ul>
    
    <h2>Tip 8: Luyện tập với mock tests</h2>
    <p>Làm mock tests sẽ giúp bạn:</p>
    <ul>
      <li>Quen với format của bài thi</li>
      <li>Quản lý thời gian hiệu quả</li>
      <li>Giảm stress trong ngày thi thật</li>
    </ul>
    
    <h2>Tip 9: Tập trung vào fluency</h2>
    <p>Fluency quan trọng hơn accuracy trong IELTS Speaking:</p>
    <ul>
      <li>Nói liên tục, không ngắt quãng</li>
      <li>Không lo lắng về việc mắc lỗi nhỏ</li>
      <li>Tập trung vào việc truyền đạt ý tưởng</li>
    </ul>
    
    <h2>Tip 10: Giữ bình tĩnh và tự tin</h2>
    <p>Cuối cùng, hãy nhớ:</p>
    <ul>
      <li>Hít thở sâu trước khi bắt đầu</li>
      <li>Nhìn thẳng vào mắt giám khảo</li>
      <li>Thể hiện sự nhiệt tình và quan tâm</li>
    </ul>
    
    <h2>Kết luận</h2>
    <p>IELTS Speaking không khó như bạn nghĩ. Với 10 tips trên và sự luyện tập chăm chỉ, bạn hoàn toàn có thể đạt được điểm số mong muốn. Hãy bắt đầu luyện tập ngay hôm nay!</p>
    `,
  author: {
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Chuyên gia IELTS với 10+ năm kinh nghiệm giảng dạy. Đã giúp hơn 1000+ học viên đạt điểm IELTS 7.0+',
    expertise: ['IELTS Speaking', 'Pronunciation', 'Test Preparation'],
    social: {
      twitter: '@sarahjohnson',
      linkedin: 'sarahjohnson',
      website: 'sarahjohnson.com'
    }
  },
  category: 'Tips & Tricks',
  readTime: 12,
  views: 1250,
  likes: 89,
  comments: 23,
  publishedAt: '2024-01-15',
  updatedAt: '2024-01-20',
  thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
  isFeatured: true,
  tags: ['IELTS', 'Speaking', 'Tips', 'Test Preparation', 'Pronunciation'],
  relatedPosts: [
    {
      id: 2,
      title: '5 lỗi ngữ pháp phổ biến cần tránh trong IELTS',
      excerpt: 'Tìm hiểu những lỗi ngữ pháp thường gặp và cách khắc phục hiệu quả.',
      thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop',
      category: 'Grammar Guide',
      readTime: 6,
      views: 890
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
  const [isPlaying, setIsPlaying] = useState(false)

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
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      case "Grammar Guide":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "Test Preparation":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Floating Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <Button 
              asChild 
              variant="outline" 
              className="rounded-2xl hover:bg-white/80 hover:shadow-xl transition-all duration-500 backdrop-blur-sm border-white/20 bg-white/10 text-gray-700 hover:text-gray-900"
            >
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại Blog
              </Link>
            </Button>

            {/* Floating Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{mockBlogPost.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-gray-700">{mockBlogPost.likes}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section with Floating Elements */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-white/5 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            {/* Featured Badge */}
            {mockBlogPost.isFeatured && (
              <div className="absolute -top-4 -right-4">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg transform rotate-12">
                  <Crown className="h-5 w-5 inline mr-2" />
                  FEATURED
                </div>
              </div>
            )}

            {/* Category & Meta */}
            <div className="flex items-center gap-4 mb-6">
              <Badge className={`${getCategoryColor(mockBlogPost.category)} px-4 py-2 rounded-2xl font-medium shadow-lg`}>
                {getCategoryIcon(mockBlogPost.category)}
                <span className="ml-2">{mockBlogPost.category}</span>
              </Badge>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-gray-100/80 rounded-xl px-3 py-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(mockBlogPost.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100/80 rounded-xl px-3 py-1">
                  <Clock className="h-4 w-4" />
                  <span>{mockBlogPost.readTime} phút đọc</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {mockBlogPost.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl">
              {mockBlogPost.excerpt}
            </p>

            {/* Interactive Action Bar */}
            <div className="flex items-center gap-4 flex-wrap">
              <Button
                onClick={handleLike}
                variant={isLiked ? "default" : "outline"}
                className={`rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                  isLiked 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg' 
                    : 'hover:bg-red-50 hover:border-red-200'
                }`}
              >
                <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Đã thích' : 'Thích'} ({mockBlogPost.likes})
              </Button>
              
              <Button
                onClick={handleBookmark}
                variant={isBookmarked ? "default" : "outline"}
                className={`rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                  isBookmarked 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg' 
                    : 'hover:bg-blue-50 hover:border-blue-200'
                }`}
              >
                <Bookmark className={`h-5 w-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Đã lưu' : 'Lưu bài viết'}
              </Button>

              <div className="relative">
                <Button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  variant="outline"
                  className="rounded-2xl hover:bg-purple-50 hover:border-purple-200 transition-all duration-500 transform hover:scale-105"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Chia sẻ
                </Button>

                {showShareMenu && (
                  <div className="absolute top-full left-0 mt-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-3 z-10 min-w-[220px] animate-in slide-in-from-top-2">
                    <Button 
                      onClick={() => handleShare('facebook')}
                      variant="ghost"
                      className="w-full justify-start rounded-xl hover:bg-blue-50 transition-all duration-300"
                    >
                      <Facebook className="h-4 w-4 mr-3 text-blue-600" />
                      Facebook
                    </Button>
                    <Button 
                      onClick={() => handleShare('twitter')}
                      variant="ghost"
                      className="w-full justify-start rounded-xl hover:bg-blue-50 transition-all duration-300"
                    >
                      <Twitter className="h-4 w-4 mr-3 text-blue-400" />
                      Twitter
                    </Button>
                    <Button 
                      onClick={() => handleShare('linkedin')}
                      variant="ghost"
                      className="w-full justify-start rounded-xl hover:bg-blue-50 transition-all duration-300"
                    >
                      <Linkedin className="h-4 w-4 mr-3 text-blue-700" />
                      LinkedIn
                    </Button>
                    <Button 
                      onClick={() => handleShare('copy')}
                      variant="ghost"
                      className="w-full justify-start rounded-xl hover:bg-blue-50 transition-all duration-300"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 mr-3 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 mr-3" />
                      )}
                      {copied ? 'Đã sao chép!' : 'Sao chép link'}
                    </Button>
                  </div>
                )}
              </div>

              {/* Audio Player Simulation */}
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="outline"
                className="rounded-2xl hover:bg-green-50 hover:border-green-200 transition-all duration-500 transform hover:scale-105"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 mr-2 text-green-600" />
                ) : (
                  <Play className="h-5 w-5 mr-2 text-green-600" />
                )}
                {isPlaying ? 'Tạm dừng' : 'Nghe bài viết'}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Image with Floating Effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-[1.02] transition-all duration-700">
                <img 
                  src={mockBlogPost.thumbnail} 
                  alt={mockBlogPost.title}
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-8 prose-p:leading-relaxed prose-p:mb-4"
                dangerouslySetInnerHTML={{ __html: mockBlogPost.content }}
              />
            </div>

            {/* Interactive Tags */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <Tag className="h-6 w-6 text-white" />
                <h3 className="text-xl font-bold text-white">Tags liên quan</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {mockBlogPost.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="px-4 py-2 rounded-2xl text-sm font-medium hover:bg-white/20 hover:border-white/40 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105 border-white/30 text-gray-300"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Section with Floating Design */}
            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20 ring-4 ring-white/50 shadow-lg">
                      <AvatarImage src={mockBlogPost.author.avatar} alt={mockBlogPost.author.name} />
                      <AvatarFallback className="text-2xl font-bold bg-white text-black">
                        {mockBlogPost.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white flex items-center justify-center">
                      <CheckCircleIcon className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-white">
                        {mockBlogPost.author.name}
                      </h3>
                      <Badge className="bg-white text-black px-3 py-1 rounded-full text-sm">
                        Chuyên gia
                      </Badge>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed text-lg">
                      {mockBlogPost.author.bio}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3">Chuyên môn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {mockBlogPost.author.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="px-3 py-1 rounded-full text-sm bg-white/20 text-white border-white/30">
                            <Target className="h-3 w-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="lg" className="rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 border-white/30 text-white">
                        <User className="h-5 w-5 mr-2" />
                        Xem profile
                      </Button>
                      <Button variant="outline" size="lg" className="rounded-2xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 border-white/30 text-white">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Liên hệ
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Table of Contents */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="bg-white p-6 text-black">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                      <BookOpen className="h-6 w-6" />
                      Mục lục
                    </h3>
                  </div>
                  <div className="p-6">
                    <nav className="space-y-3">
                      {['Giới thiệu', 'Tip 1: Luyện tập phát âm chuẩn', 'Tip 2: Mở rộng vốn từ vựng', 'Tip 3: Luyện tập trả lời câu hỏi', 'Tip 4: Sử dụng linking words', 'Tip 5: Luyện tập với partner', 'Tip 6: Chuẩn bị cho Part 2', 'Tip 7: Sử dụng examples và details', 'Tip 8: Luyện tập với mock tests', 'Tip 9: Tập trung vào fluency', 'Tip 10: Giữ bình tĩnh và tự tin', 'Kết luận'].map((item, index) => (
                        <a
                          key={index}
                          href={`#section-${index + 1}`}
                          className="block text-sm text-gray-300 hover:text-white transition-all duration-300 py-2 px-3 rounded-xl hover:bg-white/10 border-l-2 border-transparent hover:border-white pl-4 transform hover:translate-x-1"
                        >
                          {item}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/5 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="bg-white p-6 text-black">
                    <h3 className="text-xl font-bold flex items-center gap-3">
                      <TrendingUp className="h-6 w-6" />
                      Bài viết liên quan
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {mockBlogPost.relatedPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                          <div className="flex gap-3 p-3 rounded-2xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                            <div className="flex-shrink-0">
                              <img 
                                src={post.thumbnail} 
                                alt={post.title}
                                className="w-20 h-16 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Badge className={`${getCategoryColor(post.category)} px-2 py-1 rounded-full text-xs mb-2`}>
                                {post.category}
                              </Badge>
                              <h4 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-gray-300 transition-colors">
                                {post.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
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
                  </div>
                </div>
              </div>

              {/* Newsletter Signup with Floating Effect */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700"></div>
                <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform group-hover:scale-105 transition-all duration-700">
                  <div className="p-6 text-center">
                    <div className="relative">
                      <Sparkles className="h-16 w-16 mx-auto mb-4 text-blue-200 animate-pulse" />
                      <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Đăng ký nhận bài viết mới</h3>
                    <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                      Nhận thông báo khi có bài viết mới về học tiếng Anh từ các chuyên gia hàng đầu
                    </p>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="Email của bạn"
                        className="w-full px-4 py-3 rounded-2xl border-0 text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/50 focus:outline-none transition-all duration-300"
                      />
                      <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 rounded-2xl font-bold py-3 transform hover:scale-105 transition-all duration-300 shadow-lg">
                        <ArrowUpRight className="h-5 w-5 mr-2" />
                        Đăng ký ngay
                      </Button>
                    </div>
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
