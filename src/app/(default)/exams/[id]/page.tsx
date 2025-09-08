import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ExamDetailClient from './ExamDetailClient'
import { examApi, type Exam } from '@/lib/api'
import { generatePageMetadata, generateCourseStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo'

interface ExamDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: ExamDetailPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const response = await examApi.getById(parseInt(resolvedParams.id))
    const exam = response.data
    
    if (!exam) {
      return generatePageMetadata({
        title: 'Đề thi không tìm thấy',
        description: 'Đề thi bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
      })
    }

    return generatePageMetadata({
      title: exam.title,
      description: exam.description || `Luyện thi ${exam.type} với đề thi ${exam.title}. Thời gian: ${exam.duration} phút, ${exam.totalQuestions} câu hỏi.`,
      keywords: ['luyện thi', 'tiếng anh', exam.type, exam.title, 'đề thi', 'toeic', 'ielts'],
      url: `/exams/${exam.id}`,
      type: 'article',
    })
  } catch (error) {
    return generatePageMetadata({
      title: 'Đề thi không tìm thấy',
      description: 'Đề thi bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
    })
  }
}

// Disable static generation for now
// // export async function generateStaticParams() {
//   return []
// }

export default async function ExamDetailPage({ params }: ExamDetailPageProps) {
  const resolvedParams = await params
  let exam: Exam | null = null
  
  try {
    const response = await examApi.getById(parseInt(resolvedParams.id))
    exam = response.data
  } catch (error) {
    console.error('Error fetching exam:', error)
  }

  if (!exam) {
    notFound()
  }

  // Generate structured data
  const courseStructuredData = generateCourseStructuredData({
    title: exam.title,
    description: exam.description || `Luyện thi ${exam.type} với đề thi ${exam.title}`,
    url: `/exams/${exam.id}`,
    provider: 'English Learning Team',
    courseMode: 'online',
    educationalLevel: exam.type === 'TOEIC' ? 'Intermediate' : exam.type === 'IELTS' ? 'Advanced' : 'All Levels',
    teaches: [
      exam.type === 'TOEIC' ? 'TOEIC Preparation' : 
      exam.type === 'IELTS' ? 'IELTS Preparation' :
      exam.type === 'GRAMMAR' ? 'English Grammar' : 'English Vocabulary'
    ],
  })

  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Trang chủ', url: '/' },
    { name: 'Bài tập', url: '/exams' },
    { name: exam.title, url: `/exams/${exam.id}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
      <ExamDetailClient exam={exam} />
    </>
  )
}
