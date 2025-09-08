import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogDetailClient from './BlogDetailClient'
import { blogApi, type BlogPost } from '@/lib/api'
import { generatePageMetadata, generateArticleStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo'

interface BlogDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const response = await blogApi.getById(parseInt(resolvedParams.id))
    const post = response.data
    
    if (!post) {
      return generatePageMetadata({
        title: 'Bài viết không tìm thấy',
        description: 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
      })
    }

    return generatePageMetadata({
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      keywords: post.tags || ['học tiếng anh', 'english learning', 'blog'],
      image: post.featuredImage,
      url: `/blog/${post.id}`,
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      author: post.author?.fullName || 'Unknown Author',
      section: post.category?.categoryName,
      tags: post.tags || [],
    })
  } catch (error) {
    return generatePageMetadata({
      title: 'Bài viết không tìm thấy',
      description: 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
    })
  }
}

export async function generateStaticParams() {
  try {
    const response = await blogApi.getAll()
    return response.data.map((post: BlogPost) => ({
      id: post.id.toString(),
    }))
  } catch (error) {
    console.error('Error generating static params for blog:', error)
    return []
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params
  let post: BlogPost | null = null
  
  try {
    const response = await blogApi.getById(parseInt(resolvedParams.id))
    post = response.data
  } catch (error) {
    console.error('Error fetching blog post:', error)
  }

  if (!post) {
    notFound()
  }

  // Generate structured data
  const structuredData = generateArticleStructuredData({
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    image: post.featuredImage,
    url: `/blog/${post.id}`,
    publishedTime: post.publishedAt || post.createdAt,
    author: post.author?.fullName || 'Unknown Author',
    section: post.category?.categoryName,
    tags: post.tags || [],
  })

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Trang chủ', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.id}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <BlogDetailClient post={post} />
    </>
  )
}
