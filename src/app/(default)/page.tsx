import { Metadata } from 'next'
import HeroSection from "@/components/sections/hero-section"
import FeaturedCourses from "@/components/sections/featured-courses"
import StatsSection from "@/components/sections/stats-section"
import FeaturesDetailed from "@/components/sections/features-detailed"
import TestimonialsSection from "@/components/sections/testimonials-section"
import NewsletterSection from "@/components/sections/newsletter-section"
import { generatePageMetadata, generateCourseStructuredData } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'English Learning App - Học Tiếng Anh Hiệu Quả',
  description: 'Nền tảng học tiếng Anh toàn diện với bài tập, từ vựng, ngữ pháp và AI tutor. Phương pháp học hiện đại, hiệu quả cao.',
  keywords: ['học tiếng anh', 'english learning', 'toeic', 'ielts', 'vocabulary', 'grammar', 'ai tutor'],
  type: 'website',
})

export default function HomePage() {
  // Generate structured data for the main course
  const courseStructuredData = generateCourseStructuredData({
    title: 'English Learning App - Khóa Học Tiếng Anh Toàn Diện',
    description: 'Nền tảng học tiếng Anh toàn diện với bài tập, từ vựng, ngữ pháp và AI tutor',
    url: '/',
    provider: 'English Learning Team',
    courseMode: 'online',
    educationalLevel: 'All Levels',
    teaches: [
      'English Vocabulary',
      'English Grammar', 
      'TOEIC Preparation',
      'IELTS Preparation',
      'Speaking Skills',
      'Listening Skills',
      'Reading Comprehension',
      'Writing Skills'
    ],
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseStructuredData),
        }}
      />
      <div className="min-h-screen">
        <HeroSection />
        <StatsSection />
        <FeaturedCourses />
        <FeaturesDetailed />
        <TestimonialsSection />
        <NewsletterSection />
      </div>
    </>
  )
}
