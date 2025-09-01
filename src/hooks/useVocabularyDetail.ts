import { useState, useEffect } from 'react';
import { vocabularyApi, type Vocabulary, type VocabularyTopic } from '@/lib/api';

export function useVocabularyDetail(topicId: number) {
  const [topic, setTopic] = useState<VocabularyTopic | null>(null);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  // Load topic details with embedded vocabularies
  const loadTopic = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading topic with ID:', topicId);
      const response = await vocabularyApi.getTopicById(topicId);
      console.log('Topic response:', response);
      
      if (response) {
        setTopic(response);
        // Extract vocabularies from topic if available
        if (response.vocabularies && Array.isArray(response.vocabularies)) {
          console.log('Found vocabularies in topic:', response.vocabularies.length);
          setVocabularies(response.vocabularies);
        } else {
          console.log('No vocabularies found in topic response');
          setVocabularies([]);
        }
      } else {
        console.log('No data in response');
        setError('Không thể tải thông tin chủ đề từ vựng');
      }
    } catch (err) {
      console.error('Error loading vocabulary topic:', err);
      setError('Đã xảy ra lỗi khi tải chủ đề từ vựng');
    } finally {
      setLoading(false);
    }
  };

  // Load topic stats
  const loadTopicStats = async () => {
    try {
      const response = await vocabularyApi.getTopicStats(topicId);
      if (response.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Error loading topic stats:', err);
    }
  };

  // Get vocabulary by ID
  const getVocabularyById = async (id: number): Promise<Vocabulary | null> => {
    try {
      const response = await vocabularyApi.getById(id);
      return response.data || null;
    } catch (err) {
      console.error('Error loading vocabulary by ID:', err);
      return null;
    }
  };

  // Filter vocabularies by search term
  const filterVocabularies = (searchTerm: string) => {
    if (!searchTerm) return vocabularies;
    
    return vocabularies.filter(vocab => 
      vocab.englishWord.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vocab.vietnameseMeaning.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get vocabularies by difficulty level
  const getVocabulariesByDifficulty = (difficulty: string) => {
    return vocabularies.filter(vocab => vocab.difficultyLevel === difficulty);
  };

  // Get vocabularies count by difficulty
  const getVocabulariesByDifficultyCount = () => {
    const counts = {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };

    vocabularies.forEach(vocab => {
      if (vocab.difficultyLevel in counts) {
        counts[vocab.difficultyLevel as keyof typeof counts]++;
      }
    });

    return counts;
  };

  // Get total vocabularies count
  const getTotalVocabulariesCount = () => {
    return vocabularies.length;
  };

  // Get user progress for a vocabulary
  const getUserProgress = (vocabularyId: number) => {
    const vocab = vocabularies.find(v => v.id === vocabularyId);
    return vocab?.userProgress?.[0] || null;
  };

  // Get mastered vocabularies count
  const getMasteredVocabulariesCount = () => {
    return vocabularies.filter(vocab => 
      vocab.userProgress?.[0]?.status === 'Mastered'
    ).length;
  };

  // Get learning progress percentage
  const getLearningProgress = () => {
    if (vocabularies.length === 0) return 0;
    const masteredCount = getMasteredVocabulariesCount();
    return Math.round((masteredCount / vocabularies.length) * 100);
  };

  useEffect(() => {
    if (topicId) {
      loadTopic();
      loadTopicStats();
    }
  }, [topicId]);

  return {
    // State
    topic,
    vocabularies,
    loading,
    error,
    stats,
    
    // Actions
    loadTopic,
    loadTopicStats,
    getVocabularyById,
    
    // Utilities
    filterVocabularies,
    getVocabulariesByDifficulty,
    getVocabulariesByDifficultyCount,
    getTotalVocabulariesCount,
    getUserProgress,
    getMasteredVocabulariesCount,
    getLearningProgress,
    
    // Refresh functions
    refresh: () => {
      loadTopic();
      loadTopicStats();
    },
  };
}
