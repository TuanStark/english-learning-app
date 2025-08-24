"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  BookOpen, 
  Clock, 
  User, 
  Eye, 
  Calendar,
  Share2,
  Heart,
  MessageCircle,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  TrendingUp,
  ArrowLeft,
  Tag
} from "lucide-react"
import Link from "next/link"

export default function BlogDetailPage() {
  const params = useParams()
  const postId = params?.id as string
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Mock blog post data
  const post = {
    id: postId,
    title: '10 Tips để đạt điểm cao IELTS Speaking',
    excerpt: 'Khám phá những bí quyết giúp bạn tự tin và đạt điểm cao trong phần thi IELTS Speaking.',
    content: `
      <p>IELTS Speaking là một trong những phần thi khiến nhiều thí sinh lo lắng nhất. Tuy nhiên, với sự chuẩn bị kỹ lưỡng và những chiến lược phù hợp, bạn hoàn toàn có thể đạt được điểm số mong muốn.</p>

      <h2>1. Luyện tập thường xuyên</h2>
      <p>Việc luyện tập hàng ngày là chìa khóa để cải thiện kỹ năng Speaking. Hãy dành ít nhất 30 phút mỗi ngày để nói tiếng Anh, dù chỉ là tự nói với bản thân.</p>

      <h2>2. Mở rộng vốn từ vựng</h2>
      <p>Một vốn từ vựng phong phú sẽ giúp bạn diễn đạt ý tưởng một cách chính xác và ấn tượng. Hãy học từ vựng theo chủ đề và sử dụng chúng trong các câu hoàn chỉnh.</p>

      <h2>3. Làm quen với format bài thi</h2>
      <p>IELTS Speaking gồm 3 phần: Introduction, Long turn, và Discussion. Hiểu rõ yêu cầu của từng phần sẽ giúp bạn chuẩn bị tốt hơn.</p>

      <h2>4. Ghi âm và tự đánh giá</h2>
      <p>Hãy ghi âm lại khi bạn nói và nghe lại để tự đánh giá. Điều này giúp bạn nhận ra những lỗi phát âm và cải thiện dần.</p>

      <h2>5. Tự tin và tự nhiên</h2>
      <p>Đừng quá lo lắng về việc mắc lỗi. Hãy tự tin thể hiện bản thân và nói một cách tự nhiên nhất có thể.</p>
    `,
    author: {
      name: 'Sarah Johnson',
      title: 'IELTS Expert & Former Examiner',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      bio: 'Sarah có hơn 10 năm kinh nghiệm giảng dạy IELTS và từng là examiner chính thức của British Council.'
    },
    category: 'Tips & Tricks',
    readTime: 8,
    views: 1250,
    likes: 89,
    comments: 23,
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-16',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    tags: ['IELTS', 'Speaking', 'Tips', 'Study Methods'],
    relatedPosts: [
      {
        id: 2,
        title: '5 lỗi ngữ pháp phổ biến cần tránh',
        thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop',
        readTime: 6,
        category: 'Grammar Guide'
      },
      {
        id: 3,
        title: 'Hướng dẫn chi tiết IELTS Writing Task 2',
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
        readTime: 12,
        category: 'Test Preparation'
      },
      {
        id: 4,
        title: 'Cách học từ vựng hiệu quả với Spaced Repetition',
        thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=200&fit=crop',
        readTime: 10,
        category: 'Study Methods'
      }
    ],
    comments_data: [
      {
        id: 1,
        user: 'Nguyễn Văn A',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        date: '2 ngày trước',
        comment: 'Bài viết rất hữu ích! Tôi đã áp dụng những tips này và cảm thấy tự tin hơn rất nhiều.',
        likes: 5,
        replies: [
          {
            id: 11,
            user: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            date: '1 ngày trước',
            comment: 'Cảm ơn bạn! Chúc bạn thành công trong kỳ thi sắp tới.',
            likes: 2
          }
        ]
      },
      {
        id: 2,
        user: 'Trần Thị B',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        date: '3 ngày trước',
        comment: 'Tip số 4 về ghi âm rất hay. Tôi sẽ thử ngay hôm nay.',
        likes: 3,
        replies: []
      }
    ]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = post.title
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`)
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`)
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-brand-50/30">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-600 mb-6">
          <Link href="/blog" className="hover:text-brand-600 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/blog?category=${post.category}`} className="hover:text-brand-600 transition-colors">
            {post.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 font-medium line-clamp-1">{post.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="space-y-8">
              {/* Hero Image */}
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                    {post.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {post.title}
                  </h1>
                  <p className="text-lg text-white/90 max-w-2xl">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-b">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{post.author.name}</div>
                    <div className="text-sm text-neutral-600">{post.author.title}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-neutral-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime} phút đọc
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views} lượt xem
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 py-6 border-t">
                <span className="text-sm font-medium text-neutral-600 mr-2">Tags:</span>
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="hover:bg-brand-50 hover:border-brand-200 cursor-pointer">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Social Actions */}
              <div className="flex items-center justify-between py-6 border-t border-b">
                <div className="flex items-center gap-4">
                  <Button
                    variant={isLiked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className="gap-2"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    {post.likes + (isLiked ? 1 : 0)}
                  </Button>
                  
                  <Button variant="outline" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </Button>
                  
                  <Button
                    variant={isBookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="gap-2"
                  >
                    <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                    Lưu
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-600 mr-2">Chia sẻ:</span>
                  <Button variant="ghost" size="sm" onClick={() => handleShare('twitter')}>
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleShare('facebook')}>
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleShare('linkedin')}>
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleShare('copy')}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Author Bio */}
              <Card className="border-0 shadow-soft">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Về tác giả</h3>
                      <h4 className="font-medium text-brand-600 mb-2">{post.author.name}</h4>
                      <p className="text-neutral-700 leading-relaxed mb-4">
                        {post.author.bio}
                      </p>
                      <Button variant="outline" size="sm">
                        Xem thêm bài viết
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comments */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Bình luận ({post.comments})</h3>
                
                {/* Comment Form */}
                <Card className="border-0 shadow-soft">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <textarea
                        className="w-full p-4 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-500"
                        rows={4}
                        placeholder="Viết bình luận của bạn..."
                      />
                      <div className="flex justify-end">
                        <Button>Gửi bình luận</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments List */}
                <div className="space-y-6">
                  {post.comments_data.map((comment) => (
                    <Card key={comment.id} className="border-0 shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={comment.avatar} alt={comment.user} />
                            <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{comment.user}</h4>
                              <span className="text-sm text-neutral-600">{comment.date}</span>
                            </div>
                            <p className="text-neutral-700 mb-3">{comment.comment}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center gap-1 text-neutral-600 hover:text-brand-600 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                {comment.likes}
                              </button>
                              <button className="text-neutral-600 hover:text-brand-600 transition-colors">
                                Trả lời
                              </button>
                            </div>
                            
                            {/* Replies */}
                            {comment.replies.length > 0 && (
                              <div className="mt-4 pl-6 border-l-2 border-neutral-200 space-y-4">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="flex items-start gap-3">
                                    <Avatar className="w-8 h-8">
                                      <AvatarImage src={reply.avatar} alt={reply.user} />
                                      <AvatarFallback>{reply.user.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h5 className="font-medium text-sm">{reply.user}</h5>
                                        <span className="text-xs text-neutral-600">{reply.date}</span>
                                      </div>
                                      <p className="text-sm text-neutral-700 mb-2">{reply.comment}</p>
                                      <button className="flex items-center gap-1 text-xs text-neutral-600 hover:text-brand-600 transition-colors">
                                        <ThumbsUp className="w-3 h-3" />
                                        {reply.likes}
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Related Posts */}
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Bài viết liên quan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {post.relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                        <div className="flex gap-3 hover:bg-neutral-50 p-2 rounded-lg transition-colors cursor-pointer">
                          <img
                            src={relatedPost.thumbnail}
                            alt={relatedPost.title}
                            className="w-16 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2 mb-1">
                              {relatedPost.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-neutral-600">
                              <Badge variant="outline" className="text-xs">
                                {relatedPost.category}
                              </Badge>
                              <span>{relatedPost.readTime} phút</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="text-center">
                    <BookOpen className="w-12 h-12 text-brand-600 mx-auto mb-4" />
                    <h3 className="font-bold mb-2">Đăng ký nhận bài viết mới</h3>
                    <p className="text-sm text-neutral-600 mb-4">
                      Nhận thông báo khi có bài viết mới về học tiếng Anh
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Email của bạn"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
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
