import { MetadataRoute } from 'next'
import { blogApi, vocabularyApi, grammarApi, examApi } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://english-learning-app.vercel.app'
  const currentDate = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/vocabulary`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/grammar`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/exams`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  try {
    // Dynamic pages - Blog posts
    const blogResponse = await blogApi.getAll()
    const blogPosts = Array.isArray(blogResponse.data) ? blogResponse.data : []
    
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: post.updatedAt || post.createdAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Dynamic pages - Vocabulary topics
    const vocabularyResponse = await vocabularyApi.getTopics()
    const vocabularyTopics = Array.isArray(vocabularyResponse.data) ? vocabularyResponse.data : []
    
    const vocabularyPages: MetadataRoute.Sitemap = vocabularyTopics.map((topic: any) => ({
      url: `${baseUrl}/vocabulary/${topic.id}`,
      lastModified: topic.updatedAt || topic.createdAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    // Dynamic pages - Grammar lessons
    const grammarResponse = await grammarApi.getAll()
    const grammarLessons = Array.isArray(grammarResponse.data.data) ? grammarResponse.data.data : []
    
    const grammarPages: MetadataRoute.Sitemap = grammarLessons.map((grammar: any) => ({
      url: `${baseUrl}/grammar/${grammar.id}`,
      lastModified: grammar.updatedAt || grammar.createdAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    // Dynamic pages - Exams
    const examResponse = await examApi.getAll()
    const exams = Array.isArray(examResponse.data) ? examResponse.data : []
    
    const examPages: MetadataRoute.Sitemap = exams.map((exam: any) => ({
      url: `${baseUrl}/exams/${exam.id}`,
      lastModified: exam.updatedAt || exam.createdAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [
      ...staticPages,
      ...blogPages,
      ...vocabularyPages,
      ...grammarPages,
      ...examPages,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages if dynamic generation fails
    return staticPages
  }
}
