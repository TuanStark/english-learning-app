"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft,
  BookOpen,
  Clock,
  Eye,
  Heart,
  Share2,
  MessageCircle,
  User,
  Calendar,
  Tag,
  ThumbsUp,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle,
  XCircle
} from "lucide-react"
import Link from "next/link"
import { useBlog } from '@/hooks/useBlog'
import { blogApi, type BlogPost, type BlogCategory } from '@/lib/api'

export default function BlogDetailPage() {
  const params = useParams()
  const blogId = params?.id as string
  
  const { blogPosts, categories, loading, error, getBlogPostById, getPostsByCategoryName } = useBlog()
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [commentText, setCommentText] = useState("")
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await getBlogPostById(parseInt(blogId))
        if (post) {
          setSelectedPost(post)
        }
      } catch (err) {
        console.error('Error loading blog post:', err)
      }
    }

    if (blogId) {
      loadPost()
    }
  }, [blogId, getBlogPostById])

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      // In real app, this would submit to backend
      console.log('Comment submitted:', commentText)
      setCommentText("")
    }
  }

  const handleShare = (platform: string) => {
    if (selectedPost) {
      const url = window.location.href
      const title = selectedPost.title
      
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
  }

  const handleLike = () => {
    setLiked(!liked)
    // In real app, this would update backend
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    // In real app, this would update backend
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (categoryName: string) => {
    const colors = {
      'Tips & Tricks': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
      'Grammar Guide': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
      'Test Preparation': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
      'Learning Methods': 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
      'default': 'bg-gradient-to-r from-gray-500 to-slate-500 text-white'
    }
    return colors[categoryName as keyof typeof colors] || colors.default
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    )
  }

  if (error || !selectedPost) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mt-4">Không thể tải bài viết</h2>
          <p className="text-gray-600 mt-2">{error || "Không tìm thấy bài viết"}</p>
          <Button asChild className="mt-4">
            <Link href="/blog">Quay lại Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Get related posts
  const relatedPosts = getPostsByCategoryName(selectedPost.category?.name || '')
    .filter(post => post.id !== selectedPost.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại Blog
            </Link>
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
              {/* Category & Meta */}
              <div className="flex items-center gap-3 mb-6">
                {selectedPost.category && (
                  <Badge className={getCategoryColor(selectedPost.category.name)}>
                    {selectedPost.category.name}
                  </Badge>
                )}
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(selectedPost.publishedAt || selectedPost.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye className="h-4 w-4" />
                  <span>{selectedPost.viewCount} lượt xem</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                {selectedPost.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {selectedPost.excerpt}
              </p>

              {/* Author & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedPost.author?.fullName || 'Unknown Author'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(selectedPost.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    onClick={handleLike}
                    className="flex items-center gap-2"
                  >
                    <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                    {selectedPost.likeCount + (liked ? 1 : 0)}
                  </Button>

                  <Button
                    variant={bookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={handleBookmark}
                  >
                    <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </Button>

                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowShareMenu(!showShareMenu)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>

                    {showShareMenu && (
                      <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-50">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare('facebook')}
                          className="w-full justify-start"
                        >
                          <Facebook className="h-4 w-4 mr-2 text-blue-600" />
                          Facebook
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare('twitter')}
                          className="w-full justify-start"
                        >
                          <Twitter className="h-4 w-4 mr-2 text-blue-400" />
                          Twitter
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare('linkedin')}
                          className="w-full justify-start"
                        >
                          <Linkedin className="h-4 w-4 mr-2 text-blue-700" />
                          LinkedIn
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare('copy')}
                          className="w-full justify-start"
                        >
                          {copied ? (
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 mr-2" />
                          )}
                          {copied ? 'Đã copy!' : 'Copy link'}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                {/* Featured Image */}
                {selectedPost.image && (
                  <div className="mb-8">
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      className="w-full h-64 md:h-96 object-cover rounded-2xl"
                    />
                  </div>
                )}

                {/* Article Body */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                  <div className="whitespace-pre-wrap">{selectedPost.content}</div>
                </div>

                {/* Tags */}
                {selectedPost.tags && selectedPost.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <MessageCircle className="h-6 w-6" />
                    Bình luận ({selectedPost.commentCount})
                  </h3>

                  {/* Comment Form */}
                  <form onSubmit={handleCommentSubmit} className="mb-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder="Viết bình luận của bạn..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="mb-3"
 />
                        <Button type="submit" disabled={!commentText.trim()}>
                          Gửi bình luận
                        </Button>
                      </div>
                    </div>
                  </form>

                  {/* Mock Comments */}
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">Nguyễn Văn A</span>
                          <span className="text-sm text-gray-500">2 giờ trước</span>
                        </div>
                        <p className="text-gray-700 mb-2">
                          Bài viết rất hữu ích! Tôi đã học được nhiều điều mới.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4" />
                            Thích (5)
                          </button>
                          <button className="hover:text-blue-600">Trả lời</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-900">Trần Thị B</span>
                          <span className="text-sm text-gray-500">1 ngày trước</span>
                        </div>
                        <p className="text-gray-700 mb-2">
                          Cảm ơn tác giả đã chia sẻ những kiến thức quý báu này!
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4" />
                            Thích (3)
                          </button>
                          <button className="hover:text-blue-600">Trả lời</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Author Info */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Về tác giả</h3>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {selectedPost.author?.fullName || 'Unknown Author'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Chuyên gia tiếng Anh với nhiều năm kinh nghiệm giảng dạy
                    </p>
                    <Button variant="outline" className="w-full">
                      Xem profile
                    </Button>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bài viết liên quan</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((post) => (
                      <div key={post.id} className="group cursor-pointer">
                        <div className="flex gap-3">
                          {post.image && (
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Danh mục</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/blog?category=${category.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-gray-700">{category.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {getPostsByCategoryName(category.name).length}
                        </Badge>
                      </Link>
                    ))}
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
