import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import VocabularyDetailClient from './VocabularyDetailClient'
import { vocabularyApi, type VocabularyTopic } from '@/lib/api'

interface VocabularyDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: VocabularyDetailPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const topic = await vocabularyApi.getTopicById(parseInt(resolvedParams.id))
    
    if (!topic) {
      return {
        title: 'Chủ đề từ vựng không tìm thấy',
        description: 'Chủ đề từ vựng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
      }
    }

    return {
      title: `${topic.topicName} - Học Từ Vựng Tiếng Anh`,
      description: topic.description || `Học từ vựng tiếng Anh về chủ đề ${topic.topicName}. Phương pháp học hiệu quả với flashcard, quiz và luyện tập.`,
      keywords: ['học từ vựng', 'vocabulary', 'tiếng anh', topic.topicName, 'flashcard', 'quiz'],
      openGraph: {
        title: `${topic.topicName} - Học Từ Vựng Tiếng Anh`,
        description: topic.description || `Học từ vựng tiếng Anh về chủ đề ${topic.topicName}`,
        type: 'article',
        images: topic.image ? [topic.image] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${topic.topicName} - Học Từ Vựng Tiếng Anh`,
        description: topic.description || `Học từ vựng tiếng Anh về chủ đề ${topic.topicName}`,
        images: topic.image ? [topic.image] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Chủ đề từ vựng không tìm thấy',
      description: 'Chủ đề từ vựng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.',
    }
  }
}

// export async function generateStaticParams() {
//   try {
//     const topics = await vocabularyApi.getTopics()
//     return topics.data.data.map((topic: VocabularyTopic) => ({
//       id: topic.id.toString(),
//     }))
//   } catch (error) {
//     console.error('Error generating static params for vocabulary:', error)
//     return []
//   }
// }

export default async function VocabularyDetailPage({ params }: VocabularyDetailPageProps) {
  const resolvedParams = await params
  let topic: VocabularyTopic | null = null
  
  try {
    topic = await vocabularyApi.getTopicById(parseInt(resolvedParams.id))
  } catch (error) {
    console.error('Error fetching vocabulary topic:', error)
  }

  if (!topic) {
    notFound()
  }

  return <VocabularyDetailClient topic={topic} />
}
