import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://english-learning-app.vercel.app'
  
  return {
    name: 'English Learning App',
    short_name: 'EnglishApp',
    description: 'Nền tảng học tiếng Anh toàn diện với bài tập, từ vựng, ngữ pháp và AI tutor',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3B82F6',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'vi',
    categories: ['education', 'productivity'],
    icons: [
      {
        src: '/images/logo-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/logo-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/images/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/screenshot-desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: 'English Learning App - Desktop View',
      },
      {
        src: '/screenshot-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'English Learning App - Mobile View',
      },
    ],
    shortcuts: [
      {
        name: 'Vocabulary',
        short_name: 'Vocab',
        description: 'Học từ vựng tiếng Anh',
        url: '/vocabulary',
        icons: [
          {
            src: '/images/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Grammar',
        short_name: 'Grammar',
        description: 'Học ngữ pháp tiếng Anh',
        url: '/grammar',
        icons: [
          {
            src: '/images/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Exams',
        short_name: 'Exams',
        description: 'Luyện thi TOEIC, IELTS',
        url: '/exams',
        icons: [
          {
            src: '/images/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Tips học tiếng Anh',
        url: '/blog',
        icons: [
          {
            src: '/images/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    ],
    related_applications: [
      {
        platform: 'webapp',
        url: baseUrl,
      },
    ],
    prefer_related_applications: false,
  }
}
