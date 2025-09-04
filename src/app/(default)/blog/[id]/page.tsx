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
  XCircle,
  Home,
  ChevronRight
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
  const relatedPosts = getPostsByCategoryName(selectedPost.category?.categoryName || '')
    .filter(post => post.id !== selectedPost.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-blue-600">
              <Home className="h-4 w-4 mr-1" />
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium line-clamp-1">{selectedPost.title}</span>
          </nav>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {selectedPost.title}
          </h1>

          {/* Lead Paragraph */}
          {selectedPost.excerpt && (
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {selectedPost.excerpt}
            </p>
          )}

          {/* Article Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span className="font-medium">{selectedPost.author?.fullName || 'Unknown Author'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(selectedPost.publishedAt || selectedPost.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>6 phút đọc</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {selectedPost.featuredImage && (
          <div className="mb-8">
            <img
              src={selectedPost.featuredImage}
              alt={selectedPost.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
          <div className="whitespace-pre-wrap">{selectedPost.content}</div>
        </div>

        {/* Social Share Buttons */}
        <div className="mb-8 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Chia sẻ:</span>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2"
              >
                <Twitter className="h-4 w-4 text-blue-400" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4 text-blue-700" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? 'Đã copy!' : 'Copy link'}
              </Button>
            </div>
          </div>
        </div>

        {/* Tags */}
        {selectedPost.tags && selectedPost.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
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
        <div className="mb-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Bình luận ({selectedPost.commentCount || 0})
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-blue-600" />
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
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-green-600" />
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

            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-purple-600" />
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
  )
}
