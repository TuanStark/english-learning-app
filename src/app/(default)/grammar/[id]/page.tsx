import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GrammarDetailClient from './GrammarDetailClient'
import { grammarApi, type Grammar } from '@/lib/api'

interface GrammarDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: GrammarDetailPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const response = await grammarApi.getById(parseInt(resolvedParams.id))
    const grammar = response.data
    
    if (!grammar) {
      return {
        title: 'Bài ngữ pháp không tìm thấy',
        description: 'Bài ngữ pháp bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
      }
    }

    return {
      title: `${grammar.title} - Học Ngữ Pháp Tiếng Anh`,
      description: grammar.content.substring(0, 160) || `Học ngữ pháp tiếng Anh: ${grammar.title}. Phương pháp học hiệu quả với ví dụ minh họa và bài tập thực hành.`,
      keywords: ['học ngữ pháp', 'grammar', 'tiếng anh', grammar.title, 'bài tập ngữ pháp'],
      openGraph: {
        title: `${grammar.title} - Học Ngữ Pháp Tiếng Anh`,
        description: grammar.content.substring(0, 160) || `Học ngữ pháp tiếng Anh: ${grammar.title}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${grammar.title} - Học Ngữ Pháp Tiếng Anh`,
        description: grammar.content.substring(0, 160) || `Học ngữ pháp tiếng Anh: ${grammar.title}`,
      },
    }
  } catch (error) {
    return {
      title: 'Bài ngữ pháp không tìm thấy',
      description: 'Bài ngữ pháp bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
    }
  }
}

export async function generateStaticParams() {
  try {
    const response = await grammarApi.getAll()
    return response.data.data.map((grammar: Grammar) => ({
      id: grammar.id.toString(),
    }))
  } catch (error) {
    console.error('Error generating static params for grammar:', error)
    return []
  }
}

export default async function GrammarDetailPage({ params }: GrammarDetailPageProps) {
  const resolvedParams = await params
  let grammar: Grammar | null = null
  
  try {
    const response = await grammarApi.getById(parseInt(resolvedParams.id))
    grammar = response.data
  } catch (error) {
    console.error('Error fetching grammar lesson:', error)
  }

  if (!grammar) {
    notFound()
  }

  return <GrammarDetailClient grammar={grammar} />
}
