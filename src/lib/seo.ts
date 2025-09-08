import { Metadata } from 'next'

// SEO Configuration
export const SEO_CONFIG = {
  siteName: 'English Learning App',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://english-learning-app.vercel.app',
  defaultTitle: 'English Learning App - Học Tiếng Anh Hiệu Quả',
  defaultDescription: 'Nền tảng học tiếng Anh toàn diện với bài tập, từ vựng, ngữ pháp và AI tutor. Phương pháp học hiện đại, hiệu quả cao.',
  defaultKeywords: ['học tiếng anh', 'english learning', 'toeic', 'ielts', 'vocabulary', 'grammar', 'ai tutor'],
  author: 'English Learning Team',
  twitterHandle: '@englishlearning',
  locale: 'vi_VN',
  type: 'website',
  image: '/images/logo.png',
  imageWidth: 1200,
  imageHeight: 630,
}

// SEO Utility Functions
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}): Metadata {
  const fullTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle
  const fullDescription = description || SEO_CONFIG.defaultDescription
  const fullKeywords = [...SEO_CONFIG.defaultKeywords, ...keywords]
  const fullImage = image ? `${SEO_CONFIG.siteUrl}${image}` : `${SEO_CONFIG.siteUrl}${SEO_CONFIG.image}`
  const fullUrl = url ? `${SEO_CONFIG.siteUrl}${url}` : SEO_CONFIG.siteUrl

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: [{ name: author || SEO_CONFIG.author }],
    creator: SEO_CONFIG.author,
    publisher: SEO_CONFIG.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.locale,
      type: type,
      images: [
        {
          url: fullImage,
          width: SEO_CONFIG.imageWidth,
          height: SEO_CONFIG.imageHeight,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: SEO_CONFIG.twitterHandle,
      site: SEO_CONFIG.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
  }

  return metadata
}

// Structured Data Functions
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SEO_CONFIG.siteUrl}${item.url}`,
    })),
  }
}

export function generateArticleStructuredData({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}: {
  title: string
  description: string
  image?: string
  url: string
  publishedTime: string
  modifiedTime?: string
  author: string
  section?: string
  tags?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: image ? `${SEO_CONFIG.siteUrl}${image}` : `${SEO_CONFIG.siteUrl}${SEO_CONFIG.image}`,
    url: `${SEO_CONFIG.siteUrl}${url}`,
    datePublished: publishedTime,
    ...(modifiedTime && { dateModified: modifiedTime }),
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SEO_CONFIG.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}/images/logo.png`,
      },
    },
    ...(section && { articleSection: section }),
    ...(tags.length > 0 && { keywords: tags.join(', ') }),
  }
}

export function generateCourseStructuredData({
  title,
  description,
  image,
  url,
  provider,
  courseMode,
  educationalLevel,
  teaches,
}: {
  title: string
  description: string
  image?: string
  url: string
  provider: string
  courseMode: 'online' | 'offline' | 'blended'
  educationalLevel: string
  teaches: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description: description,
    image: image ? `${SEO_CONFIG.siteUrl}${image}` : `${SEO_CONFIG.siteUrl}${SEO_CONFIG.image}`,
    url: `${SEO_CONFIG.siteUrl}${url}`,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    courseMode: courseMode,
    educationalLevel: educationalLevel,
    teaches: teaches,
  }
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_CONFIG.siteName,
    url: SEO_CONFIG.siteUrl,
    logo: `${SEO_CONFIG.siteUrl}/images/logo.png`,
    description: SEO_CONFIG.defaultDescription,
    sameAs: [
      'https://facebook.com/englishlearning',
      'https://twitter.com/englishlearning',
      'https://youtube.com/englishlearning',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+84-xxx-xxx-xxx',
      contactType: 'customer service',
      availableLanguage: ['Vietnamese', 'English'],
    },
  }
}

// URL Generation Helpers
export function generateCanonicalUrl(path: string): string {
  return `${SEO_CONFIG.siteUrl}${path}`
}

export function generateImageUrl(imagePath: string): string {
  return `${SEO_CONFIG.siteUrl}${imagePath}`
}

// Meta Tags for specific pages
export const PAGE_METADATA = {
  home: {
    title: 'Trang Chủ',
    description: 'Nền tảng học tiếng Anh toàn diện với bài tập, từ vựng, ngữ pháp và AI tutor',
    keywords: ['học tiếng anh', 'english learning', 'toeic', 'ielts'],
  },
  vocabulary: {
    title: 'Từ Vựng',
    description: 'Học từ vựng tiếng Anh theo chủ đề với phương pháp hiệu quả',
    keywords: ['từ vựng', 'vocabulary', 'học từ vựng'],
  },
  grammar: {
    title: 'Ngữ Pháp',
    description: 'Học ngữ pháp tiếng Anh từ cơ bản đến nâng cao',
    keywords: ['ngữ pháp', 'grammar', 'học ngữ pháp'],
  },
  exams: {
    title: 'Bài Tập',
    description: 'Luyện thi TOEIC, IELTS với các bài tập đa dạng',
    keywords: ['bài tập', 'exams', 'toeic', 'ielts', 'luyện thi'],
  },
  blog: {
    title: 'Blog',
    description: 'Tips học tiếng Anh, phương pháp và kinh nghiệm',
    keywords: ['blog', 'tips', 'phương pháp học'],
  },
  dashboard: {
    title: 'Dashboard',
    description: 'Theo dõi tiến độ học tập của bạn',
    keywords: ['dashboard', 'tiến độ', 'thống kê'],
  },
}
